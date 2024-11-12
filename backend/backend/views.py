from rest_framework import viewsets
from .serializers import postSerializer, NewUserSerializer
from .models import post, NewUser

class postView(viewsets.ModelViewSet):
    serializer_class = postSerializer
    queryset = post.objects.all()

class NewUserView(viewsets.ModelViewSet):
    serializer_class = NewUserSerializer
    queryset = NewUser.objects.all()
    