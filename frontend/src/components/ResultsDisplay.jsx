import React from 'react';
import { useEmotion } from '../context/EmotionContext';
import { getEmotionColor, getEmotionIcon } from '../utils/emotionUtils';

const ResultsDisplay = () => {
  const { results, isLoading } = useEmotion();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Analysis Results</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Analysis Results</h2>
        <div className="text-center py-8 text-gray-500">
          Capture an image or upload a photo to see emotion analysis results
        </div>
      </div>
    );
  }

  const { dominant_emotion, emotions, face_detected } = results;

  if (!face_detected) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Analysis Results</h2>
        <div className="text-center py-8 text-red-500">
          No face detected. Please try again with a clearer image.
        </div>
      </div>
    );
  }

  const emotionColor = getEmotionColor(dominant_emotion);
  const EmotionIcon = getEmotionIcon(dominant_emotion);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Analysis Results</h2>
      
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${emotionColor.bg} ${emotionColor.text} mb-3`}>
          <EmotionIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Dominant Emotion</h3>
        <p className={`text-2xl font-bold ${emotionColor.text}`}>{dominant_emotion}</p>
      </div>

      <div className="space-y-3">
        {Object.entries(emotions).map(([emotion, confidence]) => (
          <div key={emotion} className="flex items-center justify-between">
            <span className="text-gray-600 capitalize">{emotion.toLowerCase()}</span>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 w-12">
                {(confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;