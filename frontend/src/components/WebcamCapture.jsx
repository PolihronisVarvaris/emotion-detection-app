import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useEmotion } from '../context/EmotionContext.jsx';

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
      
      <div className="relative rounded-lg overflow-hidden mb-4 bg-gray-800">
        {isCapturing ? (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-64 object-cover"
            audio={false}
            mirrored={true}
          />
        ) : (
          <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p>Camera is off</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {!isCapturing ? (
          <button
            onClick={startCapture}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Camera
          </button>
        ) : (
          <>
            <button
              onClick={capture}
              disabled={isLoading}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium"
            >
              {isLoading ? 'Analyzing...' : 'Capture & Analyze'}
            </button>
            <button
              onClick={stopCapture}
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
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