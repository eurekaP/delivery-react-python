import jwt

from django.db import models
from django.db import transaction
from django.conf import settings
from django.contrib.auth import get_user_model

from common_helpers.django.models import Link
from common_helpers.django.send_email import make_email_message
from lib.models import AddressPhoneAbstract, enum, optional, states

from core.models import Fleet, Repairshop, Truck


User = get_user_model()


class Member( models.Model):
    class Meta:
        unique_together = ('user', 'company')

    company = models.ForeignKey( Fleet, related_name='members', on_delete=models.CASCADE)
    user = Link( User, related_name='memberships')
    role = enum( 'OWNER MEMBER')
    _roles = role.all

    truck = models.OneToOneField( Truck, null=True, related_name='driver', on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.user.email}: {self.role}'


class Invitation( AddressPhoneAbstract):
    class Meta:
        unique_together = ('email', 'company')

    company = models.ForeignKey( Fleet, related_name='invitations', on_delete=models.CASCADE)
    email = models.EmailField()

    name = User._meta.get_field( 'name')
    #locals().update( [(name, User._meta.get_field( name)) for name in 'name'.split()])

    #status = enum( 'PENDING ACCEPTED', default= 'PENDING')
    #_statuses = status.all
    role = enum( Member._roles)

    created = models.DateTimeField( auto_now_add=True)
    created_by = models.ForeignKey( User, on_delete=models.SET_NULL, null=True,
        editable=False, related_name='+'
    )

    truck = models.OneToOneField( Truck, null=True, related_name='invited_driver', on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.email}: {self.role}'

    def make_token( self):
        payload = dict( id= self.pk)
        return jwt.encode( payload, settings.SECRET_KEY, algorithm='HS256')

    @classmethod
    def get_by_token( cls, token):
        try:
            payload = jwt.decode( token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.InvalidTokenError:
            raise cls.DoesNotExist()
        return cls.objects.get( pk= payload['id'])#, status= cls._statuses.PENDING)

    def send( self):
        token = self.make_token()
        url_accept = settings.INVITATIONS_ACCEPT_URL.format( token= token)
        from os.path import join as os_path_join

        msg = make_email_message(
            self.email,
            from_email= settings.DEFAULT_FROM_EMAIL,
            context= dict(
                invitation = self,
                site_name = settings.PROJECT_NAME,
                url_accept = url_accept,
                action_url = url_accept,
            ),
            subject_template_name   = 'invitations/email_subject.txt',
            plain_body_template_name= 'invitations/email_body.txt',
            html_body_template_name = 'invitations/email_body.html',
            html_body_template_images= [os_path_join( settings.STATIC_ROOT, 'Logo.png')]

        )
        msg.send()

    @transaction.atomic
    def accept( self, user):
        #self.status = self._statuses.ACCEPTED
        #self.save()
        member, created = Member.objects.get_or_create(
            user = user,
            company_id = self.company_id,
            defaults = dict(
                role = self.role,
                truck = self.truck
            )
        )
        self.delete()
        return member

    def get_full_name( self):
        return self.name

# vim:ts=4:sw=4:expandtab
