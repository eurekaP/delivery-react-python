from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, DestroyAPIView

class CreateDeleteImageMixin( CreateAPIView, DestroyAPIView):

    def create(self, request, *args, **kwargs):
        instance = self._get_instance( request, *args, **kwargs)
        serializer = self.get_serializer( instance= instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        output_serializer = self.serializer_class_output( instance, context=self.get_serializer_context())
        return Response( output_serializer.data)

    def delete( self, request, *args, **kwargs):
        instance = self._get_instance( request, *args, **kwargs)
        self.image_getter( instance).delete( save= True)
        output_serializer = self.serializer_class_output( instance, context=self.get_serializer_context())
        return Response( output_serializer.data)


