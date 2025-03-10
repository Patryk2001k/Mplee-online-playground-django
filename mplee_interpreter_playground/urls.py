from django.urls import path
from . import views

urlpatterns = [
    path('', views.mplee_playground, name='mplee_interpreter_playground')
]
