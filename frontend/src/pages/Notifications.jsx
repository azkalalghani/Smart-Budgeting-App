import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Notifications as NotificationsIcon,
  Check as CheckIcon
} from '@mui/icons-material';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        // Mock data for now
        setTimeout(() => {
          setNotifications([
            {
              id: 1,
              title: 'Budget Alert',
              message: 'You have reached 90% of your Entertainment budget for this month.',
              notification_type: 'BUDGET_LIMIT',
              is_read: false,
              created_at: '2023-06-20T14:30:00Z'
            },
            {
              id: 2,
              title: 'Bill Due',
              message: 'Your internet bill of $60 is due tomorrow.',
              notification_type: 'BILL_DUE',
              is_read: false,
              created_at: '2023-06-19T09:15:00Z'
            },
            {
              id: 3,
              title: 'Savings Goal',
              message: 'Congratulations! You have reached 50% of your "Emergency Fund" goal.',
              notification_type: 'SAVING_GOAL',
              is_read: true,
              created_at: '2023-06-15T16:45:00Z'
            },
            {
              id: 4,
              title: 'System Notification',
              message: 'We have updated our privacy policy. Please review the changes.',
              notification_type: 'SYSTEM',
              is_read: true,
              created_at: '2023-06-10T11:00:00Z'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);
  
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notif => 
        notif.id === id ? { ...notif, is_read: true } : notif
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notif => ({ ...notif, is_read: true }))
    );
  };
  
  if (loading) {
    return <div className="flex h-full items-center justify-center">Loading notifications...</div>;
  }
  
  const unreadCount = notifications.filter(n => !n.is_read).length;
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button 
            className="text-primary-main hover:underline"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        )}
      </motion.div>
      
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <NotificationsIcon style={{ fontSize: 48 }} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification, index) => {
              let iconColor;
              switch (notification.notification_type) {
                case 'BUDGET_LIMIT':
                  iconColor = 'text-yellow-500';
                  break;
                case 'BILL_DUE':
                  iconColor = 'text-red-500';
                  break;
                case 'SAVING_GOAL':
                  iconColor = 'text-green-500';
                  break;
                default:
                  iconColor = 'text-blue-500';
              }
              
              return (
                <motion.div 
                  key={notification.id}
                  className={`p-4 border rounded-lg flex ${notification.is_read ? 'bg-white' : 'bg-blue-50'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <div className={`mr-4 ${iconColor}`}>
                    <NotificationsIcon />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{notification.title}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                  </div>
                  {!notification.is_read && (
                    <button 
                      className="ml-4 text-primary-main"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CheckIcon />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Notifications;