from django_elasticsearch_dsl import Document, TextField, NestedField, IntegerField
from django_elasticsearch_dsl.registries import registry
#from elasticsearch_dsl import MetaField

#from vmrs.models import CodeKey2, CodeKey34
from . import models

def make_vmrs_nested_props():
    return dict( properties={
        'meaning':     TextField(),
        'description': TextField(),
        'code':        TextField(),
        })

@registry.register_document
class TruckDocument(Document):
    #to use:
    #1 go to site-packages/django_elasticsearch_dsl/documents.py _prepare_action and add _routing: {value} to res
    #2 lib/filters add to params
    #3 class Meta:
        #routing = MetaField( required = True)

    vmrs_manufacturer = NestedField( **make_vmrs_nested_props())
    vmrs_equipment_category = NestedField( **make_vmrs_nested_props())

    #because using multi_match query with type "phrase_prefix" - no integer fields
    #TODO try Index.analyzer to stringify model_year
    model_year = TextField()

    fleet = NestedField( properties = dict( id = TextField() ))

    class Index:
        name = 'truck'
        #settings = { 'number_of_shards': 6 } #routing, maybe hack it to use function

    class Django:
        model = models.Truck
        fields = 'name unit_number vin registration_plate registration_state model color status'.split()

        #to ensure Truck will be re-saved when VMRS... is updated
        #related_models = [ VMRS_CodeKey_2, VMRS_CodeKey_34 ]

    #def get_queryset(self):
    #    """Not mandatory but to improve performance we can select related in one sql request"""
    #    return super(CarDocument, self).get_queryset().select_related(
    #        'manufacturer'
    #        )

    #def get_instances_from_related(self, related_instance):
    #    """If related_models is set, define how to retrieve the Car instance(s) from the related model.
    #    The related_models option should be used with caution because it can lead in the index
    #    to the updating of a lot of items.
    #    """
    #    if isinstance(related_instance, Manufacturer):
    #        return related_instance.car_set.all()
    #    elif isinstance(related_instance, Ad):
    #        return related_instance.car

# vim:ts=4:sw=4:expandtab
