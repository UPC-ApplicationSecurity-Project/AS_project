from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
#from django.http import HttpResponse, HttpResponseNotFound
from .serializers import postSerializer, NewUserSerializer, UserManager
from .models import post, NewUser

class postView(viewsets.ModelViewSet):
    serializer_class = postSerializer
    queryset = post.objects.all()

class NewUserView(viewsets.ModelViewSet):
    serializer_class = NewUserSerializer
    queryset = NewUser.objects.all()


class Home(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        content = {'message':'Hello, World!'}
        return Response(content)
