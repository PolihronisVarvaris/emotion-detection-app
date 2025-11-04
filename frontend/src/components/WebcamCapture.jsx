import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useEmotion } from '../context/EmotionContext';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const { analyzeImage, isLoading } = useEmotion();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      analyzeImage(imageSrc, 'webcam');
    }
  }, [analyzeImage]);

  const startCapture = () => {
    setIsCapturing(true);
  };

  const stopCapture = () => {
    setIsCapturing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Emotion Detection</h2>
      
      <div className="relative rounded-lg overflow-hidden mb-4">
        {isCapturing ? (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-64 object-cover"
            audio={false}
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Camera preview</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {!isCapturing ? (
          <button
            onClick={startCapture}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Camera
          </button>
        ) : (
          <>
            <button
              onClick={capture}
              disabled={isLoading}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? 'Analyzing...' : 'Capture & Analyze'}
            </button>
            <button
              onClick={stopCapture}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Stop Camera
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;