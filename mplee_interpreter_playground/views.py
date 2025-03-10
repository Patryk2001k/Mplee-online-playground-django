from django.shortcuts import render
from django.http import HttpResponse

def mplee_playground(request):
    return render(request, "mplee_interpreter/mplee_playground.html")