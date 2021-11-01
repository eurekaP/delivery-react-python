from django.db import transaction
from django.db.models import Value, CharField
from django.db.models.functions import Concat, Cast
from django.http import Http404

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import serializers

from common_helpers.drf.fields import RelatedResourceUrlField
from common_helpers.drf.views import OutputSerializerViewSetMixin, NoUpdateViewSet, NestedViewSetMixin
from common_helpers.attr import get_attrib
from common_helpers.dicts import dictAttr

#from lib.filters import make_filter_class
from core.models import Fleet
from core.views import FleetViewSet, RepairshopViewSet
from users.views import PasswordField, _validate_password, login_token_response
from users.models import User

from . import models


class CompanyContextSerializerMixin:
    def create(self, validated_data):
        data = dict(validated_data)
        data['company'] = self.get_company()
        return super().create(data)

    def get_company( self):
        parent_context = self.context['view'].get_parents_query_dict()
        fleet_id = parent_context.get('company')
        if fleet_id and fleet_id.isdigit():
            return Fleet.objects.get(pk=fleet_id)


class TeamspaceViewSetMixin( NestedViewSetMixin):
    def check_permissions(self, request):
        super().check_permissions( request)
        parents_query_dict = self.get_parents_query_dict()
        fleet_id = list(parents_query_dict.values())[0]
        allowed = models.Fleet.objects.filter(
            members__user=self.request.user, id=fleet_id,
        ).exists()
        if not allowed:
            raise Http404


class MemberSerializer( serializers.ModelSerializer):
    company = serializers.SerializerMethodField()

    class Meta:
        model = models.Member
        fields = ['company', 'role']

    def get_company( self, obj):
        company = obj.company
        ser = FleetViewSet.serializer_class if isinstance( company, Fleet) else RepairshopViewSet.serializer_class
        return ser( context=self.context).to_representation(
            instance=company
        )


class InvitationAcceptView( CreateAPIView):
    permission_classes = [ AllowAny]

    class serializer_class( serializers.Serializer):
        token = serializers.CharField()
        name = serializers.CharField( max_length=150, allow_blank=True, required=False)
        password = PasswordField( required=True)

        def validate_password( self, password):
            return _validate_password( password)

        def validate( self, attrs):
            try:
                self.invitation = models.Invitation.get_by_token( attrs['token'])
            except models.Invitation.DoesNotExist:
                raise serializers.ValidationError('invalid token')
            user, created = User.objects.get_or_create(
                email = self.invitation.email,
                name = attrs.get('name'),
                defaults= dict(
                    is_active= True,
                    )
                )
            user.set_password( attrs['password'])
            user.save()

            if models.Member.objects.filter(
                    user = user,
                    company_id = self.invitation.company_id,
                ).exists():
                raise serializers.ValidationError('member already exists')
            return attrs

    class serializer_class_output( MemberSerializer):
        pass


    def create( self, request, *args, **kwargs):
        serializer = self.get_serializer( data= request.data)
        serializer.is_valid( raise_exception=True)
        user = User.objects.filter(
            email__iexact = serializer.invitation.email,
            is_active = True,
            ).first()
        member = serializer.invitation.accept( user)
        return login_token_response( request, user)


class UserDetailsViewMixin:
    class serializer_class( serializers.Serializer):
        memberships = serializers.SerializerMethodField()
        class Meta:
            fields = ['memberships']

        def get_memberships( self, obj):
            return MemberSerializer( context=self.context, many=True
                ).to_representation( data=obj.memberships.all()
                )


class RegistrationViewMixin:
    def perform_create(self, serializer):
        user = super().perform_create( serializer)
        company = Fleet.objects.create()
        models.Member.objects.create(
            user=user,
            company=company,
            role=models.Member._roles.OWNER
        )
        return user


class GoogleLoginViewMixin:
    @transaction.atomic
    def login(self):
        r = super().login()
        is_signup = getattr( self.serializer.social_login, 'signup_hint', False)
        if is_signup:
            company = Fleet.objects.create()
            models.Member.objects.create(
                user=self.user,
                company=company,
                role=models.Member._roles.OWNER
            )
        return r


class FleetViewSetMixin:
    class serializer_class( serializers.Serializer):
        members = RelatedResourceUrlField('fleet-members-list', parent_lookup_company='pk')

    def get_queryset(self):
        return super().get_queryset().filter(
            members__user=self.request.user
        )

    @transaction.atomic
    def perform_create(self, serializer):
        super().perform_create( serializer)
        models.Member.objects.create(
            company = serializer.instance,
            user = serializer.context['request'].user,
            role = models.Member._roles.OWNER
        )


def member_getattr( obj, attr, attr2):
    if isinstance( obj, models.Member):
        return get_attrib( obj, attr, None) if attr else None
    return get_attrib( obj, attr2, None) if attr2 else None

def get_model_from_api_key( api_key):
    return models.Member if api_key[ 0] == 'r' else models.Invitation

def get_pk_from_api_key( api_key):
    return api_key[ 1:]

class TrucksFleetRelatedField( serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        fleet_id = self.parent.get_fleet_id()
        return models.Truck.objects.filter( fleet_id=fleet_id)


def get_inv_member_api_id( self, obj):
    if isinstance( obj, models.Member):
        return f'r{obj.id}'
    return f'i{obj.id}'


class ImageField4Member( serializers.ImageField):
    def to_representation( self, value):
        print( 1100, value)
        return super().to_representation( value)

class MemberViewSet( TeamspaceViewSetMixin, OutputSerializerViewSetMixin, NoUpdateViewSet):
    queryset = models.Invitation.objects.all()
    permission_classes = [ IsAuthenticated ]
    lookup_field = 'api_key'

    #filter_class = make_filter_class( models.Member, all_fields = 'role truck team'.split()
        #filter_text_required_fleet=True,
        #)

    class serializer_class( CompanyContextSerializerMixin, serializers.ModelSerializer):
        class Meta:
            model = models.Invitation
            exclude = ['company']
            read_only_fields = ['status']

        def validate( self, attrs):
            if models.Invitation.objects.filter( company=self.get_company(), email=attrs['email']).exists():
                raise serializers.ValidationError('An invite has been already sent to this email')
            if models.Member.objects.filter( company=self.get_company(), user__email=attrs['email'] ).exists():
                raise serializers.ValidationError('A role with this email already exists')
            return super().validate( attrs)

    class serializer_class_output( serializers.Serializer):
        #id is for react admin
        id = serializers.SerializerMethodField()
        get_id = get_inv_member_api_id
        is_invitation = serializers.SerializerMethodField()
        def get_is_invitation( self, obj):
            return isinstance( obj, models.Invitation)
        user = serializers.SerializerMethodField()
        def get_user( self, obj):
            return obj.user.id if isinstance( obj, models.Member) else None
        #avatar = ImageField4Member()
        avatar = serializers.SerializerMethodField()
        def get_avatar( self, obj):
            if isinstance( obj, models.Member):
                if obj.user.avatar:
                    request = self.context.get('request', None) #copied from ImageFIeld.to_representation
                    if request is not None:
                        return request.build_absolute_uri( obj.user.avatar.url)
        #strname = serializers.SerializerMethodField()
        #get_strname = lambda self, obj: str( obj)

        method_fields = dict(    #Member  #Invitation
            role      = ['role',          'role'    ],
            api_key   = ['api_key',       'api_key' ],
            truck     = ['truck.id',      'truck.id'],
            email     = ['user.email',    'email'   ],
            address   = ['user.address',  'address' ],
            zip_code  = ['user.zip_code', 'zip_code'],
            state     = ['user.state',    'state'   ],
            city      = ['user.city',     'city'    ],
            phone     = ['user.phone',    'phone'   ],
            name      = ['user.name',     'name'    ],
            )
        locals().update( (name, serializers.SerializerMethodField() ) for name in method_fields)
        locals().update(
            ('get_' + name, lambda self, obj, attrs=attrs: member_getattr( obj, *attrs))
            for name, attrs in method_fields.items()
        )

    @transaction.atomic
    def create( self, request, *args, **kwargs):
        serializer = self.get_serializer( data=request.data)
        serializer.is_valid( raise_exception=True)
        o = serializer.save( created_by=self.request.user,)
        o.send()
        output_serializer = self.serializer_class_output( o, context=self.get_serializer_context())
        return Response( output_serializer.data)

    def get_invitations_qs( self, **filter_kargs):
        return self.filter_queryset(
            self.filter_queryset_by_parents_lookups( models.Invitation.objects.filter( **filter_kargs))
        ).annotate(
            #4 assign_truck route
            api_key = Concat( Value('i'), Cast('pk', output_field=CharField()), output_field=CharField())
        )

    def get_members_qs( self, **filter_kargs):
        return self.filter_queryset(
            self.filter_queryset_by_parents_lookups( models.Member.objects.filter( **filter_kargs))
        ).annotate(
            api_key = Concat( Value('r'), Cast('pk', output_field=CharField()), output_field=CharField())
        )

    def list( self, request, *args, **kwargs):
        #handle filtering
        mfilter_kargs = {}
        ifilter_kargs = {}

        #register func here to avoid suppling m/i...kargs
        def add_to_both_m_and_i_fkargs( api_attr_name, a4member =None, a4inv =None):
            a4member = a4member or api_attr_name
            a4inv = a4inv or api_attr_name
            attr = request.query_params.get( api_attr_name)
            if attr:
                mfilter_kargs[ a4member +'__contains'] = attr
                ifilter_kargs[ a4inv    +'__contains'] = attr

        add_to_both_m_and_i_fkargs( 'role')
        add_to_both_m_and_i_fkargs( 'name', a4member = 'user__name')
        add_to_both_m_and_i_fkargs( 'email', a4member = 'user__email')

        invitation_status = request.query_params.get('invitation_status') # 'NONE' means this is a Member
        if invitation_status and invitation_status != 'NONE':
            mfilter_kargs['id'] = None #empty query

        members_serializer = self.get_serializer( self.get_members_qs( **mfilter_kargs), many=True)

        if invitation_status == 'NONE':
            return Response( members_serializer.data)

        if invitation_status:
           ifilter_kargs['status'] = invitation_status
        invitations_serializer = self.get_serializer( self.get_invitations_qs( **ifilter_kargs), many=True)
        return Response( invitations_serializer.data + members_serializer.data)

    def get_object(self):
        _filter_queryset = self.filter_queryset

        def get_custom_qs( _self):
            self.filter_queryset = _filter_queryset

            api_key = self.kwargs.get('api_key')

            none_qs = models.Invitation.objects.none()
            if not api_key:
                return none_qs

            hint = api_key[0]
            if not ( hint == 'i' or hint == 'r' ):
                return none_qs

            return self.get_invitations_qs() if hint == 'i' else self.get_members_qs()

        self.filter_queryset = get_custom_qs
        return super().get_object()

    class assign_truck_to_driver_serializer_class( CompanyContextSerializerMixin, serializers.Serializer):
        trucks = TrucksFleetRelatedField( queryset = models.Truck.objects.none())

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated], serializer_class=assign_truck_to_driver_serializer_class)
    @transaction.atomic
    def assign_truck( self, request, pk=None, parent_lookup_company=None, api_key=None):
        #if api_key[0] != 'r': #TODO dont show this extra action at all
        #    return Response('Only members can be assigned Truck')

        serializer = self.get_serializer( data=request.data)
        serializer.is_valid( raise_exception=True)

        truck_id = serializer.data['trucks']
        model = get_model_from_api_key( api_key)
        pk = get_pk_from_api_key( api_key)
        member = model.objects.get( pk=pk)
        member.truck_id = truck_id
        member.save()
        return Response('ok')


class MembersFleetRelatedField( serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        return get_inv_member_api_id( self, value)

    def get_queryset( self):
        company = self.parent.get_company( company_context_pfx='')
        if company:
            members_qs = models.Member.objects.filter(
                company=company,
                role=models.Member._roles.MEMBER
            )
            invitations_qs = models.Invitation.objects.filter(
                company=company,
                role=models.Member._roles.MEMBER
            )
            r = list( members_qs) + list( invitations_qs)
            return r

    def to_internal_value(self, data):
        return dictAttr( id = data)


class TruckViewSetMixin( TeamspaceViewSetMixin):
    class serializer_class( serializers.Serializer):
        driver = serializers.SerializerMethodField()
        driver_strname = serializers.SerializerMethodField()

        def get_driver( self, obj):
            if getattr( obj, 'driver', None):
                return f'r{obj.driver.pk}'
            if getattr( obj, 'invited_driver', None):
                return f'i{obj.invited_driver.pk}'

        def get_driver_strname( self, obj):
            if getattr( obj, 'driver', None):
                return obj.driver.user.email
            if getattr( obj, 'invited_driver', None):
                return obj.invited_driver.email

    class assign_driver_to_truck_serializer_class( CompanyContextSerializerMixin, serializers.Serializer):
        drivers = MembersFleetRelatedField( queryset=models.Member.objects.none())

    @action( detail=True, methods=['post'], permission_classes=[IsAuthenticated], serializer_class=assign_driver_to_truck_serializer_class)
    @transaction.atomic
    def assign_driver( self, request, pk=None, parent_lookup_company=None):
        data = request.data
        api_key = data['drivers']
        driver_id = api_key

        #if isinstance( driver, str) and ( driver.startswith('r') or driver.startswith('i') ):
        driver_id = driver_id[ 1:] #remove role/invitation hint if using ui
        data = dict( data) #query dict is immutable and get_seriazlizer cant get obj if pk == {r/i}pk
        data['drivers'] = driver_id

        serializer = self.get_serializer( data=data)
        serializer.is_valid( raise_exception=True)
        driver_id = serializer.data['drivers']
        #why is this needed again... #if isinstance( driver_id, str) and ( driver_id.startswith('r') or driver_id.startswith('i') ):
        driver_id = driver_id[ 1:]

        model = get_model_from_api_key( api_key)

        driver = model.objects.get( id=driver_id)
        #driver.truck = truck will not clean the other model - clear both drivers to be sure
        truck = models.Truck.objects.get( pk=pk)

        #clear the other backref
        if isinstance( driver, models.Member):
            if getattr( truck, 'driver', None):
                tdriver = truck.driver
                tdriver.truck = None
                tdriver.save()
        else:
            if getattr( truck, 'invited_driver', None):
                tidriver = truck.invited_driver
                tidriver.truck = None
                tidriver.save()

        #doesn't work
        #if getattr( truck, 'driver', None):
        #    truck.driver = None
        #if getattr( truck, 'invited_driver', None):
        #    truck.invited_driver = None
        #truck.save()

        driver.truck_id = pk
        driver.save()
        return Response({ 'id': 'React Admin Chill pls' })


# vim:ts=4:sw=4:expandtab
