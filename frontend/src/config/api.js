const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  endpoints: {
    predict: '/predict',
    health: '/health'
  }
};

export default API_CONFIG;