from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "EmotiKids API is running 🚀"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('mood.urls')),
    path('', home),
]