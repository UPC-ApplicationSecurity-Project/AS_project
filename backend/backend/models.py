from django.db import models
from django.contrib.auth.models import AbstractBaseUser, User
from django.contrib.auth.hashers import make_password
from django.conf import settings

# Create your models here.
    
class NewUser(User):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Usuario', 'Usuario'),
    ]
    created_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='Usuario')

    def save(self, *args, **kwargs):
        # Hash the password only if it’s not already hashed
        self.is_active = True
        if not self.password.startswith('pbkdf2_'):  # Check if password is already hashed
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} - {self.role}"


class post(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name="posts", null=True)
    title = models.CharField(max_length=30)
    body = models.TextField(blank = True)
    link = models.TextField(null=True, max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
         return self.title
