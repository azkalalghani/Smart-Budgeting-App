import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
  FilterList as FilterIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const ExpenseModal = ({ isOpen, onClose, onSave, expense, categories }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    is_recurring: false
  });
  
  useEffect(() => {
    if (expense) {
      setFormData({
        description: expense.description,
        amount: expense.amount,
        category: expense.category.id,
        date: expense.date,
        is_recurring: expense.is_recurring || false
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        category: categories.length > 0 ? categories[0].id : '',
        date: format(new Date(), 'yyyy-MM-dd'),
        is_recurring: false
      });
    }
  }, [expense, categories]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      return;
    }
    
    const category = categories.find(c => c.id.toString() === formData.category.toString());
    
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
      category,
      transaction_type: 'EXPENSE',
      id: expense ? expense.id : Date.now() // Mock ID for new expenses
    };
    
    onSave(expenseData);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            ></motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-xl w-full max-w-md z-10 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">
                  {expense ? 'Edit Expense' : 'Add New Expense'}
                </h2>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <CloseIcon />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                      Description
                    </label>
                    <input
                      id="description"
                      name="description"
                      type="text"
                      className="input-field"
                      placeholder="What did you spend on?"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="amount">
                      Amount
                    </label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      className="input-field"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="input-field"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="date">
                      Date
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className="input-field"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="is_recurring"
                      name="is_recurring"
                      type="checkbox"
                      className="h-4 w-4 text-primary-main border-gray-300 rounded"
                      checked={formData.is_recurring}
                      onChange={handleChange}
                    />
                    <label htmlFor="is_recurring" className="ml-2 block text-gray-700">
                      This is a recurring expense
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    {expense ? 'Update' : 'Add'} Expense
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    category: 'all',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: ''
  });
  
  // For editing
  const [editingExpense, setEditingExpense] = useState(null);
  
  useEffect(() => {
    // Fetch expenses and categories
    const fetchData = async () => {
      try {
        // Mock categories data
        const mockCategories = [
          { id: 1, name: 'Food', color: '#ffca28' },
          { id: 2, name: 'Transport', color: '#66bb6a' },
          { id: 3, name: 'Utilities', color: '#ab47bc' },
          { id: 4, name: 'Entertainment', color: '#ec407a' },
          { id: 5, name: 'Housing', color: '#42a5f5' },
          { id: 6, name: 'Others', color: '#7e57c2' }
        ];
        
        // Mock expenses data
        const mockExpenses = [
          {
            id: 1,
            description: 'Grocery Shopping',
            amount: 85.20,
            category: mockCategories[0],
            date: '2023-06-15',
            transaction_type: 'EXPENSE'
          },
          {
            id: 2,
            description: 'Internet Bill',
            amount: 60.00,
            category: mockCategories[2],
            date: '2023-06-08',
            transaction_type: 'EXPENSE'
          },
          {
            id: 3,
            description: 'Movie Theater',
            amount: 25.50,
            category: mockCategories[3],
            date: '2023-06-05',
            transaction_type: 'EXPENSE'
          },
          {
            id: 4,
            description: 'Gasoline',
            amount: 45.75,
            category: mockCategories[1],
            date: '2023-06-12',
            transaction_type: 'EXPENSE'
          }
        ];
        
        setCategories(mockCategories);
        setExpenses(mockExpenses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleAddExpense = (newExpense) => {
    // In a real app, you'd post to your API then update state
    setExpenses([newExpense, ...expenses]);
    setShowAddModal(false);
  };
  
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowAddModal(true);
  };
  
  const handleUpdateExpense = (updatedExpense) => {
    // In a real app, you'd put to your API then update state
    setExpenses(expenses.map(exp => 
      exp.id === updatedExpense.id ? updatedExpense : exp
    ));
    setShowAddModal(false);
    setEditingExpense(null);
  };
  
  const handleDeleteExpense = (id) => {
    // In a real app, you'd delete from your API then update state
    setExpenses(expenses.filter(exp => exp.id !== id));
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setCurrentFilters({
      ...currentFilters,
      [name]: value
    });
  };
  
  const applyFilters = () => {
    // Apply filters logic here
    console.log('Applying filters:', currentFilters);
    // Fetch filtered data from API or filter locally
    setShowFilterPanel(false);
  };
  
  const resetFilters = () => {
    setCurrentFilters({
      category: 'all',
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: ''
    });
    // Fetch unfiltered data
  };
  
  const handleModalSave = (expenseData) => {
    if (editingExpense) {
      handleUpdateExpense(expenseData);
    } else {
      handleAddExpense(expenseData);
    }
  };
  
  if (loading) {
    return <div className="flex h-full items-center justify-center">Loading expenses...</div>;
  }
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold">Expenses</h1>
        <div className="flex space-x-2">
          <button 
            className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            <FilterIcon />
          </button>
          <button 
            className="btn-primary flex items-center"
            onClick={() => {
              setEditingExpense(null);
              setShowAddModal(true);
            }}
          >
            <AddIcon className="mr-1" /> Add Expense
          </button>
        </div>
      </motion.div>
      
      {/* Filter Panel */}
      <AnimatePresence>
        {showFilterPanel && (
          <motion.div 
            className="card"
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Filter Expenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
                <select 
                  name="category" 
                  value={currentFilters.category}
                  onChange={handleFilterChange}
                  className="input-field"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">From Date</label>
                <input 
                  type="date" 
                  name="startDate"
                  value={currentFilters.startDate}
                  onChange={handleFilterChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">To Date</label>
                <input 
                  type="date" 
                  name="endDate"
                  value={currentFilters.endDate}
                  onChange={handleFilterChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Min Amount</label>
                <input 
                  type="number" 
                  name="minAmount"
                  value={currentFilters.minAmount}
                  onChange={handleFilterChange}
                  className="input-field"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Max Amount</label>
                <input 
                  type="number" 
                  name="maxAmount"
                  value={currentFilters.maxAmount}
                  onChange={handleFilterChange}
                  className="input-field"
                  placeholder="1000"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={resetFilters}
              >
                Reset
              </button>
              <button 
                className="btn-primary"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Expenses List */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {expenses.length === 0 ? (
          <div className="text-center py-8">
            <ReceiptIcon style={{ fontSize: 48 }} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No expenses found</h3>
            <p className="text-gray-500 mb-4">Start tracking your expenses by adding your first one</p>
            <button 
              className="btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              Add Your First Expense
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        style={{
                          backgroundColor: `${expense.category.color}20`,
                          color: expense.category.color
                        }}
                      >
                        {expense.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(expense.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-500">
                      -${expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditExpense(expense)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <EditIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
      
      {/* Add/Edit Expense Modal */}
      <ExpenseModal 
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingExpense(null);
        }}
        onSave={handleModalSave}
        expense={editingExpense}
        categories={categories}
      />
    </div>
  );
};

export default Expenses;