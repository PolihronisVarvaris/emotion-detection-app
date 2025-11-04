import tensorflow as tf
import cv2
import numpy as np
from typing import Dict, List, Any

class EmotionDetector:
    def __init__(self, model_path: str = 'models/emotion_model.h5'):
        self.model = tf.keras.models.load_model(model_path)
        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        self.emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']
        
    def preprocess_face(self, face_image: np.ndarray) -> np.ndarray:
        """Preprocess face for emotion prediction"""
        # Convert to grayscale
        gray = cv2.cvtColor(face_image, cv2.COLOR_BGR2GRAY)
        # Resize to model input size (48x48 for FER2013)
        resized = cv2.resize(gray, (48, 48))
        # Normalize pixel values
        normalized = resized / 255.0
        # Reshape for model input
        reshaped = normalized.reshape(1, 48, 48, 1)
        return reshaped
    
    def detect_emotions(self, image: np.ndarray) -> Dict[str, Any]:
        """Detect faces and predict emotions"""
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = self.face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30)
        )
        
        if len(faces) == 0:
            return {
                "face_detected": False,
                "emotions": {},
                "dominant_emotion": "No face detected"
            }
        
        # Process first face found
        x, y, w, h = faces[0]
        face_roi = image[y:y+h, x:x+w]
        
        # Preprocess and predict
        processed_face = self.preprocess_face(face_roi)
        predictions = self.model.predict(processed_face, verbose=0)
        
        # Convert predictions to readable format
        emotion_scores = {
            self.emotion_labels[i]: float(predictions[0][i]) 
            for i in range(len(self.emotion_labels))
        }
        
        # Get dominant emotion
        dominant_idx = np.argmax(predictions[0])
        dominant_emotion = self.emotion_labels[dominant_idx]
        
        return {
            "face_detected": True,
            "emotions": emotion_scores,
            "dominant_emotion": dominant_emotion,
            "face_coordinates": {"x": int(x), "y": int(y), "w": int(w), "h": int(h)}
        }