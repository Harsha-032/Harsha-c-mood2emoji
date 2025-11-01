from django.urls import path
from .views import detect_mood, get_mood_history

urlpatterns = [
    path('detect/', detect_mood, name='detect_mood'),
    path('history/', get_mood_history, name='mood_history'),
]