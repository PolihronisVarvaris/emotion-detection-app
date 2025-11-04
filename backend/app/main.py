from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from PIL import Image
import io
import base64

from services.emotion_detector import EmotionDetector

app = Flask(__name__)
CORS(app)

# Initialize emotion detector
detector = EmotionDetector()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Emotion Detection API is running"})

@app.route('/predict', methods=['POST'])
def predict_emotion():
    try:
        if 'image' not in request.files and 'image_data' not in request.json:
            return jsonify({"error": "No image provided"}), 400
        
        if 'image' in request.files:
            # File upload
            image_file = request.files['image']
            image = Image.open(image_file.stream)
        else:
            # Base64 data from webcam
            image_data = request.json['image_data'].split(',')[1]
            image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        
        # Convert to OpenCV format
        image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Detect emotions
        results = detector.detect_emotions(image_cv)
        
        return jsonify({
            "success": True,
            "emotions": results["emotions"],
            "dominant_emotion": results["dominant_emotion"],
            "face_detected": results["face_detected"]
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)