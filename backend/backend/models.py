from django.db import models

# Create your models here.
class users(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=18, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

class roles(models.Model):
    role_id = models.IntegerField(primary_key=True)
    role_name = models.CharField(max_length=8, unique=True)

class user_role(models.Model):
    user = models.ForeignKey(users, on_delete=models.CASCADE)
    role = models.ForeignKey(roles, on_delete=models.DO_NOTHING)

class posts(models.Model):
    post_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(users, on_delete = models.SET_NULL, null=True)
    title = models.CharField(max_length=30)
    body = models.CharField(max_length=1000)
    status = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
