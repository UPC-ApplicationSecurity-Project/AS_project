from rest_framework import serializers
from .models import *

# Create your serializers.here.
class userSerializer(serilizers.ModelSerilizer):
    user_id = serializers.IntegerField()
    username = serializers.CharField(max_length=18)
    created_at = serializers.DateTimeField()
    class Meta:
        model = users
        fiels=('user_id','username')

class roleSerializer(serilizers.ModelSerilizer):
    role_id = serializers.IntegerField()
    role_name = serializers.CharField(max_length=8,)
    class Meta:
        model = role 
        fiels=('role_id','role_name')

class user_roleSerializer(serilizers.ModelSerilizer):
    user = serializers.IntegerField()
    role = serializers.IntegerField()
    class Meta:
        model = users
        fiels=('user','role')

class postSerializer(serilizers.ModelSerilizer):
    post_id = serializers.IntegerField()
    user_id = serializers.IntegerField()
    title = serializers.CharField(max_length=30)
    body = serializers.CharField(max_length=1000)
    status = serializers.CharField(max_length=10)
    created_at = serializers.DateTimeField()
    class Meta:
        model = users
        fiels=('post_id','user_id','title','body','status','created_at')
