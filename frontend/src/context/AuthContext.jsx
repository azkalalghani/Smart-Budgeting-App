import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      checkUserStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const checkUserStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/me/');
      setCurrentUser(response.data);
      setLoading(false);
    } catch (err) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setError('Session expired. Please log in again.');
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password
      });
      
      const { key } = response.data;
      localStorage.setItem('token', key);
      axios.defaults.headers.common['Authorization'] = `Token ${key}`;
      
      await checkUserStatus();
      return true;
    } catch (err) {
      setError(err.response?.data?.non_field_errors?.[0] || 'Login failed. Please try again.');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/registration/', userData);
      
      const { key } = response.data;
      localStorage.setItem('token', key);
      axios.defaults.headers.common['Authorization'] = `Token ${key}`;
      
      await checkUserStatus();
      return true;
    } catch (err) {
      const errorMessage = Object.values(err.response?.data || {})
        .flat()
        .join('. ');
      setError(errorMessage || 'Registration failed. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout/');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
    }
  };

  const clearError = () => setError(null);

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};