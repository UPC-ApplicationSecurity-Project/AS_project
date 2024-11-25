from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
# Create your models here.
    
class NewUser(User):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Usuario', 'Usuario'),
    ]
    #username = models.CharField(max_length=18, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='Usuario')
    #password = models.CharField(max_length=500)  # Store the hashed password

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
    ROLE_CHOICES_POST = [
        ('Private', 'Private'),
        ('Public', 'Public'),
    ]
    #id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null=True)
    title = models.CharField(max_length=30)
    body = models.TextField(blank = True)
    status = models.CharField(max_length=10, choices=ROLE_CHOICES_POST, default='Public')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
         return self.title
