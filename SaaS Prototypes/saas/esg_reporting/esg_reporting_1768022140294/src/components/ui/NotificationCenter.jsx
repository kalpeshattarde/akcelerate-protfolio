import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = ({ 
  isOpen = false, 
  onClose, 
  userRole = 'esg-manager',
  position = 'top-right' 
}) => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate real-time notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Data Sync Complete',
        message: 'Q4 emissions data successfully synchronized from external systems.',
        time: '2 minutes ago',
        read: false,
        category: 'data',
        priority: 'medium'
      },
      {
        id: 2,
        type: 'warning',
        title: 'Compliance Deadline Approaching',
        message: 'TCFD report submission due in 5 days. Current progress: 78%',
        time: '1 hour ago',
        read: false,
        category: 'compliance',
        priority: 'high'
      },
      {
        id: 3,
        type: 'info',
        title: 'System Maintenance Scheduled',
        message: 'Planned maintenance window: Dec 15, 2:00 AM - 4:00 AM UTC',
        time: '3 hours ago',
        read: true,
        category: 'system',
        priority: 'low'
      },
      {
        id: 4,
        type: 'error',
        title: 'Data Validation Error',
        message: 'Scope 3 emissions data contains inconsistencies. Review required.',
        time: '5 hours ago',
        read: false,
        category: 'data',
        priority: 'high'
      },
      {
        id: 5,
        type: 'success',
        title: 'Report Generated',
        message: 'Monthly sustainability report has been generated and is ready for review.',
        time: '1 day ago',
        read: true,
        category: 'reporting',
        priority: 'medium'
      }
    ];

    // Filter notifications based on user role
    const roleBasedNotifications = mockNotifications?.filter(notification => {
      if (userRole === 'admin') return true;
      if (userRole === 'compliance-officer') {
        return ['compliance', 'reporting', 'system']?.includes(notification?.category);
      }
      if (userRole === 'esg-manager') {
        return ['data', 'compliance', 'reporting']?.includes(notification?.category);
      }
      return ['data', 'reporting']?.includes(notification?.category);
    });

    setNotifications(roleBasedNotifications);
  }, [userRole]);

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'unread') return !notification?.read;
    if (filter === 'high') return notification?.priority === 'high';
    return true;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;
  const highPriorityCount = notifications?.filter(n => n?.priority === 'high' && !n?.read)?.length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error text-error-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-muted text-muted-foreground'
    };
    
    return colors?.[priority] || colors?.low;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      {/* Notification Panel */}
      <div className={`fixed z-50 bg-card border border-border rounded-lg shadow-modal transition-all duration-300 ${
        position === 'top-right' ?'top-20 right-4 w-96 max-w-[calc(100vw-2rem)]' :'top-20 left-4 w-96 max-w-[calc(100vw-2rem)]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {unreadCount} new
              </span>
            )}
            {highPriorityCount > 0 && (
              <span className="px-2 py-1 bg-error text-error-foreground text-xs rounded-full">
                {highPriorityCount} urgent
              </span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 p-4 border-b border-border">
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'high', label: 'Urgent' }
            ]?.map((filterOption) => (
              <button
                key={filterOption?.key}
                onClick={() => setFilter(filterOption?.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                  filter === filterOption?.key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {filterOption?.label}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications?.length > 0 ? (
            filteredNotifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 border-b border-border last:border-b-0 transition-all duration-150 hover:bg-muted/50 cursor-pointer ${
                  !notification?.read ? 'bg-primary/5' : ''
                }`}
                onClick={() => markAsRead(notification?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 ${getNotificationColor(notification?.type)}`}>
                    <Icon name={getNotificationIcon(notification?.type)} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium text-foreground pr-2">
                        {notification?.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-1.5 py-0.5 text-xs rounded-full ${getPriorityBadge(notification?.priority)}`}>
                          {notification?.priority}
                        </span>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {notification?.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {notification?.time}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {notification?.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Icon name="Bell" size={32} className="mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">
                {filter === 'unread' ? 'No unread notifications' :
                 filter === 'high' ? 'No urgent notifications' :
                 'No notifications'}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {filteredNotifications?.length > 0 && (
          <div className="p-4 border-t border-border">
            <Button variant="ghost" size="sm" className="w-full">
              <Icon name="ExternalLink" size={14} className="mr-2" />
              View all in notification center
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationCenter;