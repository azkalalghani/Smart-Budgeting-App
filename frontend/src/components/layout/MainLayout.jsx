import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

// Import icons
import {
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  AccountBalance as BudgetIcon,
  SaveAlt as GoalIcon,
  BarChart as ReportIcon,
  Notifications as NotificationIcon,
  Person as ProfileIcon,
  Menu as MenuIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';

const MainLayout = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/expenses', name: 'Expenses', icon: <ReceiptIcon /> },
    { path: '/budgets', name: 'Budgets', icon: <BudgetIcon /> },
    { path: '/goals', name: 'Savings Goals', icon: <GoalIcon /> },
    { path: '/reports', name: 'Reports', icon: <ReportIcon /> },
    { path: '/notifications', name: 'Notifications', icon: <NotificationIcon /> },
    { path: '/profile', name: 'Profile', icon: <ProfileIcon /> },
  ];
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.div 
        className={`bg-white shadow-lg overflow-y-auto ${sidebarOpen ? 'w-64' : 'w-20'}`}
        initial={{ width: sidebarOpen ? '16rem' : '5rem' }}
        animate={{ width: sidebarOpen ? '16rem' : '5rem' }}
        transition={{ duration: 0.3 }}
      >
        {/* App Logo */}
        <div className="flex items-center justify-between p-4 border-b">
          {sidebarOpen && (
            <h1 className="text-2xl font-bold text-primary-main">SmartBudget</h1>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <MenuIcon />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="p-2">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path} className="mb-2">
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors
                    ${location.pathname === item.path 
                      ? 'bg-primary-light bg-opacity-20 text-primary-main' 
                      : 'hover:bg-gray-100'
                    }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
            
            {/* Logout Button */}
            <li className="mt-8">
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
              >
                <span className="text-xl"><LogoutIcon /></span>
                {sidebarOpen && <span className="ml-3">Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold">
              {menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h2>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <NotificationIcon className="cursor-pointer text-gray-600 hover:text-primary-main" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-main text-white flex items-center justify-center">
                  {currentUser?.first_name?.[0] || currentUser?.username?.[0] || 'U'}
                </div>
                {sidebarOpen && (
                  <div className="ml-2">
                    <p className="font-medium">{currentUser?.first_name || currentUser?.username}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;