from time import perf_counter

from django.http import JsonResponse
from django.shortcuts import render

from mplee_interpreter.mplee_run import interpret_code


def mplee_playground(request):
    return render(request, "mplee_interpreter/mplee_playground.html")


def mplee_execute_code(request):
    if request.method == "POST":
        code = request.POST.get("code", "")
        start = perf_counter()
        result = interpret_code(code)
        end = perf_counter()
        if result["errors"] == None:
            return JsonResponse({"result": result["output"], "time": end - start})
        else:
            return JsonResponse({"result": result["errors"], "time": end - start})

    return JsonResponse({"error": "Invalid request"}, status=400)
