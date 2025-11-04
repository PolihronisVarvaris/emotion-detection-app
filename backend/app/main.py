from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import base64
from io import BytesIO
from PIL import Image
import cv2
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)
CORS(app)

try:
    from services.real_emotion_detector import RealEmotionDetector
    detector = RealEmotionDetector()
    print("✓ Real Emotion Detector loaded successfully")
except ImportError as e:
    print(f"✗ Error loading real detector: {e}")
    try:
        # Fallback to mock detector
        from services.emotion_detector import MockEmotionDetector
        detector = MockEmotionDetector()
        print("✓ Mock Emotion Detector loaded as fallback")
    except ImportError as e2:
        print(f"✗ Error loading mock detector: {e2}")
        # Ultimate fallback - define MockEmotionDetector here
        class MockEmotionDetector:
            def detect_emotions(self, image):
                emotions = {
                    "happy": 0.85,
                    "sad": 0.05,
                    "angry": 0.03,
                    "surprised": 0.02,
                    "neutral": 0.05
                }
                return {
                    "face_detected": True,
                    "emotions": emotions,
                    "dominant_emotion": "happy",
                    "face_coordinates": {"x": 100, "y": 100, "w": 200, "h": 200}
                }
        detector = MockEmotionDetector()
        print("✓ Basic Mock Emotion Detector created")

@app.route('/', methods=['GET'])
def home():
    detector_type = "real" if "RealEmotionDetector" in str(type(detector)) else "mock"
    return jsonify({
        "message": "Emotion Detection API", 
        "status": "running",
        "model": detector_type,
        "endpoints": {
            "health": "/health (GET)",
            "predict": "/predict (POST)"
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    detector_type = "real" if "RealEmotionDetector" in str(type(detector)) else "mock"
    return jsonify({
        "status": "healthy", 
        "message": "Emotion Detection API is running",
        "model": detector_type
    })

@app.route('/predict', methods=['POST'])
def predict_emotion():
    try:
        print("Received prediction request")  # Debug log
        
        if 'image' not in request.files and ('image_data' not in request.json if request.is_json else True):
            return jsonify({"error": "No image provided"}), 400
        
        if 'image' in request.files:
            # File upload
            image_file = request.files['image']
            image = Image.open(image_file.stream)
            image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            print("Processed file upload")
        else:
            # Base64 data from webcam
            if not request.is_json:
                return jsonify({"error": "JSON data required for image_data"}), 400
                
            image_data = request.json.get('image_data', '')
            if not image_data:
                return jsonify({"error": "No image_data provided"}), 400
                
            # Handle base64 data (remove data:image/jpeg;base64, prefix if present)
            if ',' in image_data:
                image_data = image_data.split(',')[1]
                
            image = Image.open(BytesIO(base64.b64decode(image_data)))
            image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            print("Processed base64 upload")
        
        # Detect emotions with real detector
        results = detector.detect_emotions(image_cv)
        print(f"Detection results: {results['dominant_emotion']}")
        
        detector_type = "real" if "RealEmotionDetector" in str(type(detector)) else "mock"
        
        return jsonify({
            "success": True,
            "emotions": results["emotions"],
            "dominant_emotion": results["dominant_emotion"],
            "face_detected": results["face_detected"],
            "model_type": detector_type
        })
        
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)