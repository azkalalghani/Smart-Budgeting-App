import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    
    if (formData.password1 !== formData.password2) {
      setIsLoading(false);
      return;
    }
    
    const success = await register(formData);
    
    setIsLoading(false);
    if (success) {
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-main mb-2">Create Account</h1>
          <p className="text-gray-600">Join Smart Budget and take control of your finances</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="first_name">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                className="input-field"
                placeholder="John"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="last_name">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                className="input-field"
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="input-field"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-field"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password1">
              Password
            </label>
            <input
              id="password1"
              name="password1"
              type="password"
              className="input-field"
              placeholder="Create a strong password"
              value={formData.password1}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password2">
              Confirm Password
            </label>
            <input
              id="password2"
              name="password2"
              type="password"
              className="input-field"
              placeholder="Confirm your password"
              value={formData.password2}
              onChange={handleChange}
              required
            />
            {formData.password1 !== formData.password2 && formData.password2 && (
              <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary-main text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300 disabled:opacity-70"
            disabled={isLoading || (formData.password1 !== formData.password2 && formData.password2)}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-main hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;