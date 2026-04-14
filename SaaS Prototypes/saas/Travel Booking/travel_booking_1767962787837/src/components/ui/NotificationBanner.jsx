import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationBanner = ({ 
  notifications = [], 
  onDismiss, 
  autoHideDuration = 5000,
  position = 'top' 
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  const handleDismiss = (notificationId) => {
    setVisibleNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
    if (onDismiss) {
      onDismiss(notificationId);
    }
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success-100 border-success text-success-600';
      case 'warning':
        return 'bg-warning-100 border-warning text-warning-600';
      case 'error':
        return 'bg-error-100 border-error text-error-600';
      case 'info':
      default:
        return 'bg-primary-100 border-primary text-primary-700';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  if (visibleNotifications.length === 0) {
    return null;
  }

  return (
    <div className={`fixed left-0 right-0 z-notification ${
      position === 'top' ? 'top-16' : 'bottom-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          {visibleNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between p-4 rounded-lg border-l-4 shadow-sm animation-slide-up ${
                getNotificationStyles(notification.type)
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getNotificationIcon(notification.type)} 
                  size={20} 
                />
                <div className="flex-1">
                  {notification.title && (
                    <h4 className="text-sm font-body-medium">
                      {notification.title}
                    </h4>
                  )}
                  <p className="text-sm">
                    {notification.message}
                  </p>
                  {notification.action && (
                    <button
                      onClick={notification.action.onClick}
                      className="mt-2 text-sm font-body-medium underline hover:no-underline transition-all duration-200 ease-out"
                    >
                      {notification.action.label}
                    </button>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => handleDismiss(notification.id)}
                className="ml-4 p-1 rounded-md hover:bg-white hover:bg-opacity-20 transition-all duration-200 ease-out"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Auto-hide functionality
const AutoHideNotificationBanner = (props) => {
  const [notifications, setNotifications] = useState(props.notifications || []);

  useEffect(() => {
    setNotifications(props.notifications || []);
  }, [props.notifications]);

  useEffect(() => {
    if (props.autoHideDuration && notifications.length > 0) {
      const timers = notifications.map(notification => {
        if (!notification.persistent) {
          return setTimeout(() => {
            setNotifications(prev => 
              prev.filter(n => n.id !== notification.id)
            );
          }, props.autoHideDuration);
        }
        return null;
      }).filter(Boolean);

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [notifications, props.autoHideDuration]);

  const handleDismiss = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
    if (props.onDismiss) {
      props.onDismiss(notificationId);
    }
  };

  return (
    <NotificationBanner
      {...props}
      notifications={notifications}
      onDismiss={handleDismiss}
    />
  );
};

export default AutoHideNotificationBanner;
export { NotificationBanner };