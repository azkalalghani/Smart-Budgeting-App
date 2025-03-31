import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-railway-app-name.up.railway.app/api'  // Replace with your Railway URL
  : 'http://localhost:8000/api';  // Development URL

// Configure axios defaults
axios.defaults.baseURL = API_URL;

// Add a request interceptor to attach the token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Transactions API
export const transactionsAPI = {
  getAll: (filters = {}) => axios.get('/transactions/', { params: filters }),
  getById: (id) => axios.get(`/transactions/${id}/`),
  create: (data) => axios.post('/transactions/', data),
  update: (id, data) => axios.put(`/transactions/${id}/`, data),
  delete: (id) => axios.delete(`/transactions/${id}/`),
  getStats: () => axios.get('/transactions/summary/')
};

// Categories API
export const categoriesAPI = {
  getAll: () => axios.get('/categories/'),
  create: (data) => axios.post('/categories/', data),
  update: (id, data) => axios.put(`/categories/${id}/`, data),
  delete: (id) => axios.delete(`/categories/${id}/`)
};

// Budgets API
export const budgetsAPI = {
  getAll: () => axios.get('/budgets/'),
  getById: (id) => axios.get(`/budgets/${id}/`),
  create: (data) => axios.post('/budgets/', data),
  update: (id, data) => axios.put(`/budgets/${id}/`, data),
  delete: (id) => axios.delete(`/budgets/${id}/`)
};

// Savings Goals API
export const savingsGoalsAPI = {
  getAll: () => axios.get('/savings-goals/'),
  getById: (id) => axios.get(`/savings-goals/${id}/`),
  create: (data) => axios.post('/savings-goals/', data),
  update: (id, data) => axios.put(`/savings-goals/${id}/`, data),
  delete: (id) => axios.delete(`/savings-goals/${id}/`),
  addFunds: (id, amount) => axios.post(`/savings-goals/${id}/add_funds/`, { amount })
};

// Reminders API
export const remindersAPI = {
  getAll: () => axios.get('/reminders/'),
  getById: (id) => axios.get(`/reminders/${id}/`),
  create: (data) => axios.post('/reminders/', data),
  update: (id, data) => axios.put(`/reminders/${id}/`, data),
  delete: (id) => axios.delete(`/reminders/${id}/`)
};

// Notifications API
export const notificationsAPI = {
  getAll: () => axios.get('/notifications/'),
  markAsRead: (id) => axios.post(`/notifications/${id}/mark_as_read/`),
  markAllAsRead: () => axios.post('/notifications/mark_all_as_read/')
};

// User Profile API
export const profileAPI = {
  get: () => axios.get('/profiles/me/'),
  update: (data) => axios.put('/profiles/me/', data)
};

export default {
  transactionsAPI,
  categoriesAPI,
  budgetsAPI,
  savingsGoalsAPI,
  remindersAPI,
  notificationsAPI,
  profileAPI
};