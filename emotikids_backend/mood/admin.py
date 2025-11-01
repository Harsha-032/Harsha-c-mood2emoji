from django.contrib import admin
from .models import MoodDetection

@admin.register(MoodDetection)
class MoodDetectionAdmin(admin.ModelAdmin):
    list_display = ['mood', 'emoji', 'polarity', 'created_at']
    list_filter = ['mood', 'created_at']
    search_fields = ['text']
    readonly_fields = ['created_at']