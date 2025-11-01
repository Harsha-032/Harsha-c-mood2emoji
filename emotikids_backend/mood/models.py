from django.db import models

class MoodDetection(models.Model):
    text = models.TextField()
    mood = models.CharField(max_length=20)
    emoji = models.CharField(max_length=10)
    polarity = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.mood} - {self.text[:50]}"