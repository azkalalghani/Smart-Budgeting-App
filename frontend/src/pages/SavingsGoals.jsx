import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Add as AddIcon } from '@mui/icons-material';

const SavingsGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch savings goals
    const fetchGoals = async () => {
      try {
        // Mock data for now
        setTimeout(() => {
          setGoals([
            {
              id: 1,
              name: 'Emergency Fund',
              target_amount: 10000,
              current_amount: 6500,
              target_date: '2023-12-31',
              icon: '🏦'
            },
            {
              id: 2,
              name: 'New Car',
              target_amount: 25000,
              current_amount: 5000,
              target_date: '2024-05-15',
              icon: '🚗'
            },
            {
              id: 3,
              name: 'Vacation',
              target_amount: 3000,
              current_amount: 1500,
              target_date: '2023-08-01',
              icon: '✈️'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching savings goals:', err);
        setLoading(false);
      }
    };
    
    fetchGoals();
  }, []);
  
  if (loading) {
    return <div className="flex h-full items-center justify-center">Loading savings goals...</div>;
  }
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold">Savings Goals</h1>
        <button className="btn-primary flex items-center">
          <AddIcon className="mr-1" /> Add Goal
        </button>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, index) => {
          const progress = (goal.current_amount / goal.target_amount) * 100;
          
          return (
            <motion.div 
              key={goal.id}
              className="card card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">{goal.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg">{goal.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Target: {new Date(goal.target_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">${goal.current_amount.toLocaleString()}</span>
                  <span className="text-gray-600">${goal.target_amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full bg-primary-main"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-right">
                  <span className="text-sm text-gray-500">{progress.toFixed(0)}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  ${(goal.target_amount - goal.current_amount).toLocaleString()} to go
                </span>
                <button className="btn-primary text-sm py-1">
                  Add Funds
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsGoals;