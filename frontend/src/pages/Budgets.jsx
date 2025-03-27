import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Add as AddIcon } from '@mui/icons-material';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch budgets
    const fetchBudgets = async () => {
      try {
        // Mock data for now
        setTimeout(() => {
          setBudgets([
            {
              id: 1,
              category: { name: 'Food', color: '#ffca28' },
              amount: 500,
              spent: 350,
              month: 6,
              year: 2023
            },
            {
              id: 2,
              category: { name: 'Entertainment', color: '#ec407a' },
              amount: 200,
              spent: 150,
              month: 6,
              year: 2023
            },
            {
              id: 3,
              category: { name: 'Transportation', color: '#66bb6a' },
              amount: 300,
              spent: 275,
              month: 6,
              year: 2023
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching budgets:', err);
        setLoading(false);
      }
    };
    
    fetchBudgets();
  }, []);
  
  if (loading) {
    return <div className="flex h-full items-center justify-center">Loading budgets...</div>;
  }
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <button className="btn-primary flex items-center">
          <AddIcon className="mr-1" /> Add Budget
        </button>
      </motion.div>
      
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-6">June 2023 Budgets</h2>
        
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.amount) * 100;
            const isOverBudget = percentage > 100;
            
            return (
              <div key={budget.id} className="card hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: budget.category.color }}
                    ></div>
                    <h3 className="font-medium">{budget.category.name}</h3>
                  </div>
                  <span className="text-gray-500">${budget.spent} / ${budget.amount}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-primary-main'}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-sm ${isOverBudget ? 'text-red-500' : 'text-gray-500'}`}>
                    {percentage.toFixed(0)}% used
                  </span>
                  <span className="text-sm text-gray-500">
                    ${(budget.amount - budget.spent).toFixed(2)} remaining
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-primary-main hover:underline">
            View Previous Months
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Budgets;