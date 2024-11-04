from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import posts
from .serilizers import postSerializer

# Create your views here.
'''
class Home(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        content = {'message':'Hello, World!'}
        return Responsi(content)
'''

@api_view(['GET','POST'])
def user(request):


@api_view(['GET','POST'])
def posts(request):


@api_view(['GET','POST'])
def post(request):


@api_view(['GET','POST'])
def admin(request):


@api_view(['GET','POST'])
def tmp(request):


@api_view(['GET','POST'])
def tmp2(request):


