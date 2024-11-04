from rest_framework import serializers

# Create your models here.
class userSerializer(serilizers.ModelSerilizer):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=18, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

class roleSerializer(serilizers.ModelSerilizer):
    role_id = models.IntegerField(primary_key=True)
    role_name = models.CharField(max_length=8, unique=True)

class user_roleSerializer(serilizers.ModelSerilizer):
    user = models.ForeignKey(users, on_delete=models.CASCADE)
    role = models.ForeignKey(roles, on_delete=models.DO_NOTHING)

class postSerializer(serilizers.ModelSerilizer):
    post_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(users, on_delete = models.SET_NULL, null=True)
    title = models.CharField(max_length=30)
    body = models.CharField(max_length=1000)
    status = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
