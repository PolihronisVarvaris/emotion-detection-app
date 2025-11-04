import numpy as np
import random

class MockEmotionDetector:
    def detect_emotions(self, image):
        emotions = {
            "angry": max(0.01, random.gauss(0.05, 0.02)),
            "disgust": max(0.01, random.gauss(0.03, 0.01)),
            "fear": max(0.01, random.gauss(0.04, 0.02)),
            "happy": max(0.01, random.gauss(0.70, 0.1)),
            "sad": max(0.01, random.gauss(0.08, 0.03)),
            "surprise": max(0.01, random.gauss(0.06, 0.02)),
            "neutral": max(0.01, random.gauss(0.10, 0.05))
        }
        
        total = sum(emotions.values())
        emotions = {k: v/total for k, v in emotions.items()}
        
        dominant_emotion = max(emotions.items(), key=lambda x: x[1])[0]
        
        return {
            "face_detected": True,
            "emotions": emotions,
            "dominant_emotion": dominant_emotion,
            "face_coordinates": {"x": 100, "y": 100, "w": 200, "h": 200}
        }