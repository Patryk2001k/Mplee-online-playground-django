from django.urls import path

from . import views

urlpatterns = [
    path("", views.mplee_playground, name="mplee_interpreter_playground"),
    path("mplee_execute_code/", views.mplee_execute_code, name="mplee_execute_code"),
]
