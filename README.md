# emotion-detection-app

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
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   ├── package.json
│   ├── tailwind.config.js
│   └── Dockerfile
├── model_training/
│   ├── emotion_training.ipynb
│   ├── data/
│   └── models/
├── docker-compose.yml
└── README.md




🛠️ Tech Stack Specification
Backend

    Framework: Flask 

    ML: TensorFlow/Keras + OpenCV + NumPy

    Image Processing: OpenCV, PIL

    API: RESTful endpoints

    Deployment: Docker + Render


Frontend

    Framework: React 18 + Vite

    Styling: TailwindCSS + Framer Motion

    Webcam: react-webcam

    Charts: Chart.js with react-chartjs-2

    HTTP Client: Axios

    Deployment: Vercel