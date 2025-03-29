// src/services/transactionService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const transactionService = {
  // Get all transactions
  getTransactions: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/transactions/`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  // Add a new transaction
  addTransaction: async (transactionData) => {
    try {
      // If there's a receipt file, handle the file upload
      if (transactionData.receipt && transactionData.receipt instanceof File) {
        const formData = new FormData();
        
        // Add all transaction data to form
        Object.keys(transactionData).forEach(key => {
          if (key === 'receipt') {
            formData.append('receipt', transactionData.receipt);
          } else {
            formData.append(key, transactionData[key]);
          }
        });
        
        const response = await axios.post(`${API_URL}/transactions/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        return response.data;
      } else {
        // Regular JSON request if no file
        const response = await axios.post(`${API_URL}/transactions/`, transactionData);
        return response.data;
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  },

  // Delete a transaction
  deleteTransaction: async (id) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}/`);
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },

  // Update a transaction
  updateTransaction: async (id, transactionData) => {
    try {
      const response = await axios.put(`${API_URL}/transactions/${id}/`, transactionData);
      return response.data;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },
};