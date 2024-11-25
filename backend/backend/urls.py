from django.urls import path, include
from rest_framework import routers
#from rest_framework.documentation import include_docs_urls
from backend import views

#api versioning
router_post = routers.DefaultRouter()
router_post.register(r'list_post', views.postView, 'list_post')

router_NewUser = routers.DefaultRouter()
router_NewUser.register(r'list_NewUser', views.NewUserView, 'list_NewUser')

post_urlpatterns = [
    path("api/", include(router_post.urls)),
]

NewUser_urlpatterns = [
    path("api/", include(router_NewUser.urls)),
]

Home_urlpatterns = [
    path("",views.Home.as_view()),
]
