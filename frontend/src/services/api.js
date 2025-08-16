import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API endpoints
export const dashboardAPI = {
  // Get KPIs
  getKPIs: (params = {}) => {
    return api.get('/kpis', { params });
  },

  // Get revenue over time
  getRevenue: (params = {}) => {
    return api.get('/revenue', { params });
  },

  // Get product performance
  getProducts: (params = {}) => {
    return api.get('/products', { params });
  },

  // Get marketing channels
  getMarketing: (params = {}) => {
    return api.get('/marketing', { params });
  },

  // Get state performance
  getStates: (params = {}) => {
    return api.get('/states', { params });
  },

  // Get device performance
  getDevices: (params = {}) => {
    return api.get('/devices', { params });
  },

  // Health check
  getHealth: () => {
    return api.get('/health');
  },
};

export default api;