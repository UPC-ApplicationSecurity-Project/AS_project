from rest_framework import serializers
from .models import post, NewUser

class postSerializer(serializers.ModelSerializer):
    class Meta:
        model = post
        fields = '__all__'
        

class NewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = '__all__'
