import { useState } from 'react';
import { motion } from 'framer-motion';

const Reports = () => {
  const [period, setPeriod] = useState('month');
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold">Financial Reports</h1>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button 
            className={`px-4 py-1 rounded-md ${period === 'month' ? 'bg-white shadow-sm' : ''}`} 
            onClick={() => setPeriod('month')}
          >
            Month
          </button>
          <button 
            className={`px-4 py-1 rounded-md ${period === 'quarter' ? 'bg-white shadow-sm' : ''}`} 
            onClick={() => setPeriod('quarter')}
          >
            Quarter
          </button>
          <button 
            className={`px-4 py-1 rounded-md ${period === 'year' ? 'bg-white shadow-sm' : ''}`} 
            onClick={() => setPeriod('year')}
          >
            Year
          </button>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold mb-4">Income vs Expenses</h2>
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Income/Expense Trend Chart</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4">Expense Categories</h2>
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Expense Category Pie Chart</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="card lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-4">Monthly Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">January</td>
                  <td className="px-6 py-4 whitespace-nowrap">$3,200</td>
                  <td className="px-6 py-4 whitespace-nowrap">$2,100</td>
                  <td className="px-6 py-4 whitespace-nowrap">$1,100</td>
                  <td className="px-6 py-4 whitespace-nowrap">34.4%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">February</td>
                  <td className="px-6 py-4 whitespace-nowrap">$3,400</td>
                  <td className="px-6 py-4 whitespace-nowrap">$2,300</td>
                  <td className="px-6 py-4 whitespace-nowrap">$1,100</td>
                  <td className="px-6 py-4 whitespace-nowrap">32.4%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">March</td>
                  <td className="px-6 py-4 whitespace-nowrap">$3,100</td>
                  <td className="px-6 py-4 whitespace-nowrap">$1,900</td>
                  <td className="px-6 py-4 whitespace-nowrap">$1,200</td>
                  <td className="px-6 py-4 whitespace-nowrap">38.7%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold mb-4">Insights</h2>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <h3 className="font-medium text-blue-800">Spending Pattern</h3>
            <p className="text-sm text-blue-600">Your highest spending category is Food (30%), followed by Housing (25%).</p>
          </div>
          <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-r-md">
            <h3 className="font-medium text-green-800">Savings Trend</h3>
            <p className="text-sm text-green-600">Your savings rate has increased by 5% compared to last month. Keep it up!</p>
          </div>
          <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-md">
            <h3 className="font-medium text-yellow-800">Suggestion</h3>
            <p className="text-sm text-yellow-600">Consider reducing entertainment expenses to reach your savings goal faster.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;