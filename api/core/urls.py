"""
URL configuration for athenas project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core.controllers.pessoa import PessoaViewSet, PessoaListView

urlpatterns = [
    path('create/', PessoaViewSet.as_view({'post': 'create'}), name='create'),
    path('update/<str:pk>/', PessoaViewSet.as_view({'put': 'update'}), name='update'),
    path('delete/<str:pk>/', PessoaViewSet.as_view({'delete': 'destroy'}), name='delete'),
    path('retrieve/<str:pk>/', PessoaViewSet.as_view({'get': 'retrieve'}), name='retrieve'),
    path('calculate_weight/<str:pk>/', PessoaViewSet.as_view({'get': 'calculate_weight'}), name='calculate_weight'),
    path('', PessoaListView.as_view(), name='list'),
]
