import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEmotion } from '../context/EmotionContext';
import { getEmotionColor } from '../utils/emotionUtils';

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const data = {
    labels: Object.keys(emotions).map(emotion => emotion.charAt(0).toUpperCase() + emotion.slice(1).toLowerCase()),
    datasets: [
      {
        data: Object.values(emotions).map(score => score * 100),
        backgroundColor: Object.keys(emotions).map(emotion => getEmotionColor(emotion).bg.replace('bg-', '')),
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed.toFixed(1)}%`;
          }
        }
      }
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Emotion Distribution</h2>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default EmotionChart;