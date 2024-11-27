from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse, HttpResponseNotFound
from .serializers import postSerializer, NewUserSerializer, UserManager
from .models import post, NewUser

class postView(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = postSerializer
    queryset = post.objects.all()

    def create(self,request):
        #user = request.user.pk
        new_post = post()#request.body.decode('utf-8'))
        new_post.title = request.POST.get('title')
        new_post.body = request.POST.get('body')
        new_post.status = request.POST.get('status')
        new_post.user = NewUser.objects.get(pk=request.user.pk)
        new_post.full_clean()
        new_post.save()
        return Response("Post created")

    def update(self,request,pk=None):#PUT request
        editPost = self.get_object()
        #return Response(editPost.user)
        if editPost.user == NewUser.objects.get(pk=request.user.pk):
            editPost.title = request.POST.get('title')
            editPost.body = request.POST.get('body')
            editPost.status = request.POST.get('status')
            editPost.full_clean()
            editPost.save()
            return Response("Post edited successfully")
        return Response("Not owner",status=403)

class NewUserView(viewsets.ModelViewSet):
    serializer_class = NewUserSerializer
    queryset = NewUser.objects.all()


class Home(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        content = {'message':'Hello, World!'}
        return Response(content)
