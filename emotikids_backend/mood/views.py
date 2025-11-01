from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from textblob import TextBlob
from .models import MoodDetection

@api_view(['POST'])
def detect_mood(request):
    """
    Detect mood from text input
    Expected JSON: {"text": "I am happy today"}
    """
    print("Received request:", request.data)  # Debug print
    try:
        text = request.data.get('text', '')
        print("Extracted text:", text)  # Debug print
        if text is None:
            return Response(
                {"error": "Text field is missing"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        text = text.strip().lower()
        print("Processed text:", text)  # Debug print
    except Exception as e:
        print("Error:", str(e))  # Debug print
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    # Input validation
    if not text:
        return Response(
            {"error": "Text field is required"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if len(text) > 500:
        return Response(
            {"error": "Text too long. Maximum 500 characters allowed."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Specific mood/activity detection
    if any(word in text for word in ['rain', 'rainy', 'raining']):
        response_data = {
            "mood": "rainy",
            "emoji": "🌧️",
            "message": "It sounds like it's rainy!",
            "polarity": 0.0
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)
    
    if any(word in text for word in ['angry', 'mad', 'frustrated']):
        response_data = {
            "mood": "angry",
            "emoji": "😠",
            "message": "You seem angry!",
            "polarity": -0.8 # A strong negative polarity
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)
    
    if any(word in text for word in ['play', 'playing', 'fun', 'game']):
        response_data = {
            "mood": "playful",
            "emoji": "⚽",
            "message": "Sounds like fun and play!",
            "polarity": 0.5 # A positive polarity
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)
    
    if any(word in text for word in ['excited', 'thrilled', 'eager', "can't wait", 'cant wait']):
        response_data = {
            "mood": "excited",
            "emoji": "🤩",
            "message": "You're so excited!",
            "polarity": 0.9 # Very positive
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)

    if any(word in text for word in ['tired', 'sleepy', 'exhausted', 'drowsy']):
        response_data = {
            "mood": "tired",
            "emoji": "😴",
            "message": "You seem tired.",
            "polarity": -0.3 # Slightly negative
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)

    if any(word in text for word in ['confused', 'puzzled', 'unsure', "don't understand", 'dont understand']):
        response_data = {
            "mood": "confused",
            "emoji": "🤔",
            "message": "That's a bit confusing.",
            "polarity": 0.0 # Neutral
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)
    
    if any(word in text for word in ['surprised', 'shocked', 'amazed', 'wow']):
        response_data = {
            "mood": "surprised",
            "emoji": "😮",
            "message": "What a surprise!",
            "polarity": 0.4 # Positive
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)

    if any(word in text for word in ['scared', 'frightened', 'afraid', 'spooky']):
        response_data = {
            "mood": "scared",
            "emoji": "😨",
            "message": "That sounds scary!",
            "polarity": -0.7 # Very negative
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)

    if any(word in text for word in ['bored', 'boring', 'dull', 'nothing to do']):
        response_data = {
            "mood": "bored",
            "emoji": "😑",
            "message": "You seem bored.",
            "polarity": -0.2 # Slightly negative
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)
    
    if any(word in text for word in ['proud', 'achieved', 'accomplished', 'success']):
        response_data = {
            "mood": "proud",
            "emoji": "🏆",
            "message": "You should be proud!",
            "polarity": 0.8 # Very positive
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)

    if any(word in text for word in ['curious', 'wonder', 'inquisitive', 'question']):
        response_data = {
            "mood": "curious",
            "emoji": "🧐",
            "message": "That's very curious!",
            "polarity": 0.1 # Slightly positive
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)

    if any(word in text for word in ['thankful', 'grateful', 'appreciate', 'blessed']):
        response_data = {
            "mood": "thankful",
            "emoji": "🙏",
            "message": "That's a thankful feeling.",
            "polarity": 0.7 # Positive
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)
    
    if any(word in text for word in ['lonely', 'alone', 'isolated']):
        response_data = {
            "mood": "lonely",
            "emoji": "😔",
            "message": "You seem to be feeling lonely.",
            "polarity": -0.5 # Negative
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)

    if any(word in text for word in ['calm', 'peaceful', 'relaxed', 'tranquil']):
        response_data = {
            "mood": "calm",
            "emoji": "😌",
            "message": "You sound calm and peaceful.",
            "polarity": 0.3 # Positive
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)

    if any(word in text for word in ['frustrated', 'annoyed', 'irritated', 'exasperated']):
        response_data = {
            "mood": "frustrated",
            "emoji": "😤",
            "message": "You seem frustrated.",
            "polarity": -0.6 # Negative
        }
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        return Response(response_data)
    
    # Kid-safety filter - inappropriate words
    inappropriate_words = [
        'hate', 'stupid', 'idiot', 'kill', 'hurt', 'violence', 'fight', 
        'weapon', 'gun', 'drug', 'alcohol', 'cigarette', 'damn', 'hell'
    ]
    
    # Check for inappropriate content
    if any(word in text for word in inappropriate_words):
        response_data = {
            "mood": "inappropriate",
            "emoji": "🚫",
            "message": "Inappropriate content detected.",
            "polarity": 0.0
        }
        
        # Save to database
        MoodDetection.objects.create(
            text=text,
            mood=response_data["mood"],
            emoji=response_data["emoji"],
            polarity=response_data["polarity"]
        )
        
        return Response(response_data)
    
    # Analyze sentiment with TextBlob
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    
    # Determine mood based on polarity
    if polarity > 0.6:
        mood_data = {
            "mood": "very happy",
            "emoji": "😄",
            "message": "You're super happy!",
            "polarity": round(polarity, 2)
        }
    elif polarity > 0.1:
        mood_data = {
            "mood": "happy",
            "emoji": "😀",
            "message": "Sounds happy!",
            "polarity": round(polarity, 2)
        }
    elif polarity < -0.6:
        mood_data = {
            "mood": "very sad", 
            "emoji": "😭",
            "message": "Oh no, you seem very sad.",
            "polarity": round(polarity, 2)
        }
    elif polarity < -0.1:
        mood_data = {
            "mood": "sad", 
            "emoji": "😞",
            "message": "Sounds sad.",
            "polarity": round(polarity, 2)
        }
    else:
        mood_data = {
            "mood": "neutral",
            "emoji": "😐", 
            "message": "Seems neutral.",
            "polarity": round(polarity, 2)
        }
    
    # Save to database
    MoodDetection.objects.create(
        text=text,
        mood=mood_data["mood"],
        emoji=mood_data["emoji"],
        polarity=mood_data["polarity"]
    )
    
    return Response(mood_data)

@api_view(['GET'])
def get_mood_history(request):
    """Get recent mood detections"""
    recent_detections = MoodDetection.objects.all().order_by('-created_at')[:10]
    
    history = []
    for detection in recent_detections:
        history.append({
            "text": detection.text,
            "mood": detection.mood,
            "emoji": detection.emoji,
            "polarity": detection.polarity,
            "timestamp": detection.created_at.isoformat()
        })
    
    return Response({"history": history})