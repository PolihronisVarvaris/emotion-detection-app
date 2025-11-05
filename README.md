![Application Demo](img/gb.png)

# Emotion Detection Web App

![React](https://img.shields.io/badge/React-18.2-%2361DAFB?logo=react)
![Flask](https://img.shields.io/badge/Flask-2.3-%23000?logo=flask)
![Python](https://img.shields.io/badge/Python-3.10+-%233776AB?logo=python)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-%2306B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-blue)

A professional-grade web application that detects human emotions in real-time using deep learning and computer vision.

---

## Features

- Real-time Emotion Detection using webcam  
- Image Upload for emotion analysis  
- Live Emotion Probability Charts  
- Modern, Responsive UI built with React and TailwindCSS  
- RESTful API with Flask backend  
- Deep Learning Model trained on FER2013 dataset  

---

## Project Structure

```bash
emotion-detection-app/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models/
│   │   │   ├── emotion_model.h5
│   │   │   └── model_loader.py
│   │   ├── services/
│   │   │   ├── emotion_detector.py
│   │   │   └── image_processor.py
│   │   ├── routes/
│   │   │   ├── predictions.py
│   │   │   └── video_stream.py
│   │   └── utils/
│   │       └── helpers.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── run.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── WebcamCapture.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── ResultsDisplay.jsx
│   │   │   └── EmotionChart.jsx
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   ├── utils/
│   │   │   └── emotionUtils.js
│   │   └── context/
│   │       └── EmotionContext.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── Dockerfile
├── model_training/
│   ├── emotion_training.ipynb
│   ├── data/
│   └── models/
├── docker-compose.yml
└── README.md
```
# Tech Stack
## Backend

Python 3.10+ with Flask

TensorFlow / Keras for deep learning

OpenCV for computer vision

NumPy & PIL for image processing

## Frontend

React 18 with Vite

TailwindCSS for styling

Chart.js for data visualization

React-Webcam for camera access

Deployment

Docker for containerization

Render for backend hosting

Vercel / Netlify for frontend hosting

Installation
Prerequisites

Python 3.10+

Node.js 18+

Git

# Backend Setup
## Clone the repository
git clone https://github.com/yourusername/emotion-detection-app.git
cd emotion-detection-app/backend

## Create virtual environment
python -m venv venv

## Activate virtual environment
### Windows:
venv\Scripts\activate
### Mac/Linux:
source venv/bin/activate

## Install dependencies
pip install -r requirements.txt

## Run the backend server
python run.py

# Frontend Setup
## Open new terminal and navigate to frontend
cd frontend

## Install dependencies
npm install

## Start development server
npm run dev

# Usage

Start Backend: The Flask API will run on http://localhost:5000

Start Frontend: The React app will run on http://localhost:3000

Webcam Detection: Click "Start Camera" and "Capture & Analyze"

Image Upload: Drag & drop or click to upload an image

View Results: See emotion probabilities and dominant emotion

# API Endpoints
GET /health

Check API status
{
  "status": "healthy",
  "message": "Emotion Detection API is running"
}

# Tech Stack Specification
## Backend

Framework: Flask

ML: TensorFlow / Keras + OpenCV + NumPy

Image Processing: OpenCV, PIL

API: RESTful endpoints

## Frontend

Framework: React 18 + Vite

Styling: TailwindCSS + Framer Motion

Webcam: react-webcam

Charts: Chart.js with react-chartjs-2

HTTP Client: Axios
