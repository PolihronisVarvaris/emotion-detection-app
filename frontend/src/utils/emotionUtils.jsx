import React from 'react';

export const getEmotionColor = (emotion) => {
  const colors = {
    happy: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    sad: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    angry: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
    surprised: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
    neutral: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
    fear: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
    disgust: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  };
  
  return colors[emotion?.toLowerCase()] || colors.neutral;
};

// Simple icon components without complex JSX
export const HappyIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
  </svg>
);

export const SadIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
  </svg>
);

export const AngryIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
  </svg>
);

export const getEmotionIcon = (emotion) => {
  const icons = {
    happy: HappyIcon,
    sad: SadIcon,
    angry: AngryIcon,
    surprised: HappyIcon, // Reuse for now
    neutral: HappyIcon,   // Reuse for now
    fear: SadIcon,        // Reuse for now
    disgust: AngryIcon,   // Reuse for now
  };
  
  return icons[emotion?.toLowerCase()] || HappyIcon;
};