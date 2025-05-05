import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensure cookies/token handling
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for attaching JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth service
export const authService = {
  login: async (credentials) =>
    apiClient.post('token/', credentials, {
      headers: { 'Content-Type': 'application/json' }, // Explicit header
      withCredentials: true,
    }),

  register: (userData) =>
    apiClient.post('register/', userData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }),

  logout: () => {
    localStorage.removeItem('token');
  },
};

// Item service
export const itemService = {
  getAll: () => apiClient.get('items/'),
  getById: (id) => apiClient.get(`items/${id}/`),
  create: (data) => apiClient.post('items/', data),
  update: (id, data) => apiClient.put(`items/${id}/`, data),
  delete: (id) => apiClient.delete(`items/${id}/`),
};

export default apiClient;
