import axios from 'axios';

// Use environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

export const analyzeImage = async (imageData, type) => {
  try {
    if (type === 'webcam') {
      // Webcam capture - send as base64
      return await api.post('/predict', { image_data: imageData });
    } else {
      // File upload - send as FormData
      const formData = new FormData();
      
      // Convert base64 to blob for file upload
      const response = await fetch(imageData);
      const blob = await response.blob();
      formData.append('image', blob, 'image.jpg');
      
      return await api.post('/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.error || 'Failed to analyze image');
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response;
  } catch (error) {
    console.error('Health check failed:', error);
    throw new Error('Backend server is not responding');
  }
};

export default api;