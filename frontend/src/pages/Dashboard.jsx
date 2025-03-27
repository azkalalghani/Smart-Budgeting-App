import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AttachMoney, TrendingUp, TrendingDown, 
  AccountBalance, ShowChart, Savings 
} from '@mui/icons-material';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    savings: 0,
    savingsPercentage: 0
  });
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // Mock data for now
        // In a real app, you'd fetch this from your API
        setStats({
          totalIncome: 3500,
          totalExpenses: 2100,
          savings: 1400,
          savingsPercentage: 40
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  if (loading) {
    return <div className="flex h-full items-center justify-center">Loading dashboard...</div>;
  }
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-600">
          Here's a summary of your financial status for this month.
        </p>
      </motion.div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="card card-hover bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100">Total Income</p>
              <h3 className="text-2xl font-bold">${stats.totalIncome}</h3>
            </div>
            <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
              <AttachMoney fontSize="large" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-blue-100">
            <TrendingUp fontSize="small" />
            <span className="ml-1 text-sm">+5% from last month</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="card card-hover bg-gradient-to-r from-red-500 to-red-600 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-red-100">Total Expenses</p>
              <h3 className="text-2xl font-bold">${stats.totalExpenses}</h3>
            </div>
            <div className="bg-red-400 bg-opacity-30 rounded-full p-3">
              <AccountBalance fontSize="large" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-red-100">
            <TrendingDown fontSize="small" />
            <span className="ml-1 text-sm">-2% from last month</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="card card-hover bg-gradient-to-r from-green-500 to-green-600 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100">Total Savings</p>
              <h3 className="text-2xl font-bold">${stats.savings}</h3>
            </div>
            <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
              <Savings fontSize="large" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-green-100">
            <TrendingUp fontSize="small" />
            <span className="ml-1 text-sm">{stats.savingsPercentage}% of income</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="card card-hover bg-gradient-to-r from-purple-500 to-purple-600 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-100">Upcoming Bills</p>
              <h3 className="text-2xl font-bold">$850</h3>
            </div>
            <div className="bg-purple-400 bg-opacity-30 rounded-full p-3">
              <ShowChart fontSize="large" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-purple-100">
            <span className="ml-1 text-sm">3 bills due this week</span>
          </div>
        </motion.div>
      </div>
      
      {/* Chart placeholders will be implemented with Chart.js */}
      {/* For now we just use placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Income/Expense Chart will be here</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Expense Breakdown Chart will be here</p>
          </div>
        </motion.div>
      </div>
      
      {/* Financial Tips */}
      <motion.div 
        className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-primary-main"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3 className="text-lg font-semibold mb-2">Smart Tip 💡</h3>
        <p className="text-gray-700">
          You're spending 15% more on entertainment this month compared to your average. 
          Consider setting a budget limit for this category to help meet your savings goals.
        </p>
      </motion.div>
    </div>
  );
};

export default Dashboard;