// /home/ubuntu/app/sales_compensation_dashboard/src/components/ui/PageHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const PageHeader = ({ 
  title, 
  description, 
  icon = 'BarChart3', 
  statusIndicators = [], 
  actionButtons = [],
  breadcrumbs = []
}) => {
  return (
    <motion.div 
      className="glass-morphism-elevated backdrop-blur-xl border-b border-glass-border p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* Left Section - Title and Description */}
        <motion.div 
          className="flex items-start space-x-4 mb-4 lg:mb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Icon */}
          <motion.div 
            className="w-12 h-12 bg-gradient-neon rounded-2xl flex items-center justify-center glow-indigo flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon name={icon} size={24} className="text-white" />
          </motion.div>

          {/* Title and Description */}
          <div className="flex-1">
            <motion.h1 
              className="text-2xl font-bold font-heading text-text-primary-dark mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h1>
            {description && (
              <motion.p 
                className="text-text-secondary-dark max-w-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {description}
              </motion.p>
            )}

            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <motion.nav 
                className="flex items-center space-x-2 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Icon name="ChevronRight" size={14} className="text-text-muted-dark" />
                    )}
                    <span 
                      className={`text-sm ${
                        index === breadcrumbs.length - 1 
                          ? 'text-text-primary-dark font-medium' :'text-text-secondary-dark hover:text-text-primary-dark cursor-pointer'
                      }`}
                    >
                      {crumb}
                    </span>
                  </React.Fragment>
                ))}
              </motion.nav>
            )}
          </div>
        </motion.div>

        {/* Right Section - Status and Actions */}
        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Status Indicators */}
          {statusIndicators.length > 0 && (
            <div className="flex items-center space-x-4">
              {statusIndicators.map((indicator, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-2 glass-morphism px-3 py-2 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={indicator.animated ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: indicator.animated ? Infinity : 0 }}
                  >
                    <Icon 
                      name={indicator.icon} 
                      size={16} 
                      className={indicator.iconClass || 'text-neon-indigo'} 
                    />
                  </motion.div>
                  <span className="text-sm font-medium text-text-secondary-dark">
                    {indicator.label}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          {actionButtons.length > 0 && (
            <div className="flex items-center space-x-3">
              {actionButtons.map((button, index) => (
                <motion.button
                  key={index}
                  onClick={button.onClick}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
                    ${button.variant === 'primary' ?'btn-glass-primary' :'btn-glass-secondary'
                    }
                  `}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name={button.icon} size={16} />
                  <span>{button.label}</span>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PageHeader;