import React, { createContext, useState, useContext } from 'react';
import { analyzeImage, healthCheck } from '../services/api.js';

const EmotionContext = createContext();

export const useEmotion = () => {
  const context = useContext(EmotionContext);
  if (!context) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
};

export const EmotionProvider = ({ children }) => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Check backend connection on startup
  React.useEffect(() => {
    const checkBackend = async () => {
      try {
        await healthCheck();
        setIsBackendConnected(true);
        setError(null);
      } catch (err) {
        setIsBackendConnected(false);
        setError('Backend server is not connected. Please make sure the Flask server is running on port 5000.');
      }
    };

    checkBackend();
  }, []);

  const analyzeImageData = async (imageData, type) => {
    if (!isBackendConnected) {
      setError('Backend server is not connected. Please start the Flask server first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await analyzeImage(imageData, type);
      setResults(response.data);
    } catch (err) {
      setError(err.message || 'Analysis failed');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setError(null);
  };

  return (
    <EmotionContext.Provider
      value={{
        results,
        isLoading,
        error,
        isBackendConnected,
        analyzeImage: analyzeImageData,
        clearResults,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};