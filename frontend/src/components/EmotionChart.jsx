import React from 'react';
import { useEmotion } from '../context/EmotionContext.jsx';

const EmotionChart = () => {
  const { results } = useEmotion();

  if (!results || !results.face_detected) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Emotion Distribution</h2>
        <div className="text-center py-8 text-gray-500">
          Chart will appear here after analysis
        </div>
      </div>
    );
  }

  const { emotions } = results;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Emotion Distribution</h2>
      <div className="space-y-3">
        {Object.entries(emotions).map(([emotion, confidence]) => (
          <div key={emotion} className="flex items-center justify-between">
            <span className="text-gray-600 capitalize w-24">{emotion.toLowerCase()}</span>
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 w-12 text-right">
                {(confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionChart;