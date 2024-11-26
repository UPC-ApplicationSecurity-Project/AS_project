from rest_framework import serializers
from django.contrib.auth.models import User
from .models import post, NewUser

class postSerializer(serializers.ModelSerializer):
    class Meta:
        model = post
        fields = '__all__'
        

class NewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = '__all__'

class UserManager(serializers.ModelSerializer):
    model = NewUser
    fields = '__all__'
    def create_user(self,email,username,password, alias=None):
        NewUser.save(username,password,email)
        return User
