import cv2
import base64
from flask import Response, jsonify
from services.emotion_detector import EmotionDetector

class VideoStream:
    def __init__(self):
        self.detector = EmotionDetector()
    
    def generate_frames(self):
        camera = cv2.VideoCapture(0)
        
        while True:
            success, frame = camera.read()
            if not success:
                break
            
            # Detect emotions
            results = self.detector.detect_emotions(frame)
            
            # Draw bounding box and emotion text
            if results["face_detected"]:
                x, y, w, h = results["face_coordinates"].values()
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
                cv2.putText(frame, results["dominant_emotion"], 
                           (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
            
            # Encode frame
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        
        camera.release()