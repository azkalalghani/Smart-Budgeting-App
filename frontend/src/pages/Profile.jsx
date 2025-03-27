import { useState } from 'react';
import { motion } from 'framer-motion';
import { Person as PersonIcon } from '@mui/icons-material';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: 'johndoe',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    preferred_currency: 'USD',
    monthly_income: 3500,
    phone_number: '(123) 456-7890',
    profile_picture: null,
    notification_enabled: true
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd make an API call to update the profile
    setProfile(formData);
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-2xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        My Profile
      </motion.h1>
      
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-primary-main rounded-full flex items-center justify-center text-white text-3xl">
            {profile.profile_picture ? (
              <img 
                src={profile.profile_picture} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <PersonIcon style={{ fontSize: 40 }} />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.first_name} {profile.last_name}</h2>
            <p className="text-gray-600">@{profile.username}</p>
          </div>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="first_name">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  className="input-field"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
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
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone_number">
                  Phone Number
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  className="input-field"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="monthly_income">
                  Monthly Income
                </label>
                <input
                  id="monthly_income"
                  name="monthly_income"
                  type="number"
                  className="input-field"
                  value={formData.monthly_income}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="preferred_currency">
                  Preferred Currency
                </label>
                <select
                  id="preferred_currency"
                  name="preferred_currency"
                  className="input-field"
                  value={formData.preferred_currency}
                  onChange={handleChange}
                  required
                >
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                  <option value="JPY">Japanese Yen (¥)</option>
                  <option value="CNY">Chinese Yuan (¥)</option>
                  <option value="IDR">Indonesian Rupiah (Rp)</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <input
                id="notification_enabled"
                name="notification_enabled"
                type="checkbox"
                className="h-4 w-4 text-primary-main border-gray-300 rounded"
                checked={formData.notification_enabled}
                onChange={handleChange}
              />
              <label htmlFor="notification_enabled" className="ml-2 block text-gray-700">
                Enable notifications
              </label>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Username</h3>
                <p>{profile.username}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p>{profile.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                <p>{profile.phone_number || 'Not set'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Monthly Income</h3>
                <p>{profile.preferred_currency} {profile.monthly_income.toLocaleString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Preferred Currency</h3>
                <p>{profile.preferred_currency}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notifications</h3>
                <p>{profile.notification_enabled ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                className="btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </motion.div>
      
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-6">Security</h2>
        
        <div className="space-y-4">
          <button className="btn-secondary w-full text-left justify-start">
            Change Password
          </button>
          <button className="btn-secondary w-full text-left justify-start">
            Two-Factor Authentication
          </button>
          <button className="btn-secondary w-full text-left justify-start">
            Connected Accounts
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;