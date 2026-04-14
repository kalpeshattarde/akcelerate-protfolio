import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 h-16 glass-morphism backdrop-blur-xl border-b border-glass-border z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>

      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Empty space where search was */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}>
          {/* Search section removed */}
        </motion.div>

        {/* Right side - Actions and Profile */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}>

          {/* Time Display */}
          <div className="hidden lg:block text-right">
            <p className="text-sm font-medium text-text-primary-dark">{formatTime(currentTime)}</p>
            <p className="text-xs text-text-secondary-dark">{formatDate(currentTime)}</p>
          </div>

          {/* Notifications */}
          <motion.button
            className="relative p-2 glass-morphism hover:glass-morphism-hover rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>

            <Icon name="Bell" size={20} className="text-neon-indigo" />
            {notifications > 0 &&
            <motion.span
              className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs rounded-full flex items-center justify-center font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}>

                {notifications}
              </motion.span>
            }
          </motion.button>

          {/* Settings */}
          <motion.button
            className="p-2 glass-morphism hover:glass-morphism-hover rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}>

            <Icon name="Settings" size={20} className="text-neon-indigo" />
          </motion.button>

          {/* Profile Avatar */}
          <motion.div
            className="flex items-center space-x-3 glass-morphism px-3 py-2 rounded-xl cursor-pointer hover:glass-morphism-hover transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>

            <motion.div
              className="w-8 h-8 bg-gradient-purple-blue rounded-full flex items-center justify-center glow-purple"
              whileHover={{ scale: 1.1 }}>

              <span className="text-sm font-medium text-white">JD</span>
            </motion.div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-text-primary-dark">John Doe</p>
              <p className="text-xs text-text-secondary-dark">Operations</p>
            </div>
            <Icon name="ChevronDown" size={16} className="text-neon-indigo hidden md:block" />
          </motion.div>
        </motion.div>
      </div>
    </motion.header>);

};

export default Header;