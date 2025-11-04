from deepface import DeepFace
import cv2
import numpy as np
import os
from typing import Dict, Any

class RealEmotionDetector:
    def __init__(self):
        self.emotion_labels = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']
        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        print("✓ Real Emotion Detector with DeepFace initialized")
    
    def detect_emotions(self, image: np.ndarray) -> Dict[str, Any]:
        """Detect emotions using DeepFace pre-trained model"""
        try:
            # Save temporary image for DeepFace processing
            temp_path = "temp_face.jpg"
            cv2.imwrite(temp_path, image)
            
            # Use DeepFace for emotion analysis
            try:
                analysis = DeepFace.analyze(
                    img_path=temp_path,
                    actions=['emotion'],
                    enforce_detection=False,
                    detector_backend='opencv'
                )
                
                # Clean up temp file
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                
                if isinstance(analysis, list):
                    analysis = analysis[0]  # Take first face found
                
                # Extract emotions from DeepFace results
                emotions = analysis['emotion']
                
                # Convert to our format and ensure all emotions are present
                formatted_emotions = {}
                for emotion in self.emotion_labels:
                    if emotion in emotions:
                        formatted_emotions[emotion] = emotions[emotion] / 100.0  # Convert to 0-1 scale
                    else:
                        formatted_emotions[emotion] = 0.01  # Small probability for missing emotions
                
                # Get dominant emotion
                dominant_emotion = max(formatted_emotions.items(), key=lambda x: x[1])[0]
                
                # Also get face coordinates using OpenCV for display
                gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                faces = self.face_cascade.detectMultiScale(gray, 1.1, 4)
                
                face_coords = {"x": 0, "y": 0, "w": 100, "h": 100}
                if len(faces) > 0:
                    x, y, w, h = faces[0]
                    face_coords = {"x": int(x), "y": int(y), "w": int(w), "h": int(h)}
                
                print(f"✓ DeepFace analysis: {dominant_emotion} ({formatted_emotions[dominant_emotion]:.1%})")
                
                return {
                    "face_detected": True,
                    "emotions": formatted_emotions,
                    "dominant_emotion": dominant_emotion,
                    "face_coordinates": face_coords
                }
                
            except Exception as e:
                print(f"DeepFace analysis error: {e}")
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                return self._no_face_detected()
                
        except Exception as e:
            print(f"Error in emotion detection: {e}")
            return self._no_face_detected()
    
    def _no_face_detected(self) -> Dict[str, Any]:
        return {
            "face_detected": False,
            "emotions": {},
            "dominant_emotion": "No face detected"
        }