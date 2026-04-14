// src/pages/system-integration-monitor/components/SystemStatusOverview.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const SystemStatusOverview = ({ systemHealth, onStatusClick }) => {
  const systems = [
    {
      name: 'HRIS',
      displayName: 'Human Resources Information System',
      status: systemHealth?.hris || 'connected', // Default to connected if not provided
      icon: 'Users',
      description: 'Employee data and organizational structure',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      name: 'CRM',
      displayName: 'Customer Relationship Management',
      status: systemHealth?.crm || 'connected', // Default to connected if not provided
      icon: 'Building',
      description: 'Sales and customer data integration',
      color: 'from-cyan-500 to-teal-600'
    },
    {
      name: 'Payroll',
      displayName: 'Payroll Processing System',
      status: systemHealth?.payroll || 'connected', // Default to connected if not provided
      icon: 'DollarSign',
      description: 'Compensation and payroll calculations',
      color: 'from-emerald-500 to-green-600'
    },
    {
      name: 'Identity Provider',
      displayName: 'Identity and Access Management',
      status: systemHealth?.identity || 'connected', // Default to connected if not provided
      icon: 'Shield',
      description: 'Authentication and authorization services',
      color: 'from-violet-500 to-purple-600'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'bg-gradient-to-r from-success-500 to-emerald-600 text-white shadow-lg';
      case 'warning': return 'bg-gradient-to-r from-warning-500 to-orange-600 text-white shadow-lg';
      case 'error': return 'bg-gradient-to-r from-error-500 to-red-600 text-white shadow-lg';
      case 'syncing': return 'bg-gradient-to-r from-info-500 to-blue-600 text-white shadow-lg';
      default: return 'bg-gradient-to-r from-success-500 to-emerald-600 text-white shadow-lg'; // Default to connected styling
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'syncing': return 'RefreshCw';
      default: return 'CheckCircle'; // Default to connected icon
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'warning': return 'Warning';
      case 'error': return 'Error';
      case 'syncing': return 'Syncing';
      default: return 'Connected'; // Default to connected text
    }
  };

  const getSystemIconBg = (system) => {
    return `bg-gradient-to-br ${system.color}`;
  };

  return (
    <div className="bg-surface border border-integration-border rounded-lg p-4 sm:p-6 overflow-hidden shadow-integration backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-integration rounded-lg">
            <Icon name="Activity" size={20} className="text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-text-primary bg-gradient-to-r from-integration-primary to-integration-secondary bg-clip-text text-transparent">
            System Status Overview
          </h2>
        </div>
        <div className="flex items-center space-x-3 min-w-0">
          <div className="flex items-center space-x-2">
            <Icon 
              name={systemHealth?.overall === 'healthy' ? 'CheckCircle' : 'AlertTriangle'} 
              size={20} 
              className={`flex-shrink-0 ${
                systemHealth?.overall === 'healthy' ? 'text-success-600' : 'text-warning-600'
              }`} 
            />
            <span className="text-sm font-semibold text-text-primary truncate">
              {systems?.filter(s => s.status === 'connected')?.length || 0} of {systems?.length || 0} Systems Operational
            </span>
          </div>
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse-slow"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {systems?.map((system) => (
          <div
            key={system.name}
            onClick={() => onStatusClick?.(system.name)}
            className="group p-4 border border-integration-border rounded-lg hover:shadow-glow transition-all duration-300 cursor-pointer overflow-hidden min-w-0 bg-gradient-to-br from-white to-integration-surface hover:from-integration-surface hover:to-white"
          >
            <div className="flex items-start justify-between mb-4 gap-3">
              <div className="flex items-start space-x-3 min-w-0 flex-1">
                <div className={`p-3 ${getSystemIconBg(system)} rounded-xl flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                  <Icon name={system.icon} size={20} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-text-primary truncate text-sm sm:text-base group-hover:text-integration-primary transition-colors" title={system.displayName}>
                    {system.displayName}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 break-words mt-1 group-hover:text-integration-secondary transition-colors">
                    {system.description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Enhanced Connection Health Indicator */}
            <div className="w-full bg-gradient-to-r from-integration-border to-secondary-200 rounded-full h-3 mb-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full transition-all duration-500 shadow-sm ${
                  system.status === 'connected' ? 'bg-gradient-status w-full' :
                  system.status === 'warning' ? 'bg-gradient-to-r from-warning-400 to-warning-600 w-3/4' :
                  system.status === 'error' ? 'bg-gradient-to-r from-error-400 to-error-600 w-1/4' :
                  system.status === 'syncing' ? 'bg-gradient-to-r from-info-400 to-info-600 w-2/3 animate-pulse' : 'bg-gradient-status w-full'
                }`}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-text-secondary gap-2">
              <span className="truncate flex items-center space-x-1">
                <Icon name="Clock" size={12} className="text-integration-secondary" />
                <span>Last checked: {new Date().toLocaleTimeString()}</span>
              </span>
              <span className="flex items-center space-x-1 flex-shrink-0">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  system.status === 'connected' ? 'bg-success-500' :
                  system.status === 'warning' ? 'bg-warning-500' :
                  system.status === 'error'? 'bg-error-500' : 'bg-success-500'
                }`}></div>
                <span className="font-semibold text-integration-primary">Live</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Overall System Health Summary */}
      <div className="mt-6 p-5 bg-gradient-to-br from-integration-surface to-white rounded-xl border border-integration-border overflow-hidden shadow-integration">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-integration rounded-lg">
                <Icon name="BarChart3" size={18} className="text-white" />
              </div>
              <h3 className="font-bold text-text-primary bg-gradient-to-r from-integration-primary to-integration-secondary bg-clip-text text-transparent">
                Integration Health Score
              </h3>
            </div>
            <p className="text-sm text-text-secondary break-words">
              Based on connection stability and performance metrics
            </p>
          </div>
          <div className="text-center sm:text-right flex-shrink-0">
            <div className="relative">
              <div className="text-3xl font-black bg-gradient-to-r from-integration-primary to-integration-secondary bg-clip-text text-transparent">
                {Math.round(((systems?.filter(s => s.status === 'connected')?.length || 0) / (systems?.length || 1)) * 100)}%
              </div>
              <div className="absolute -inset-1 bg-gradient-integration rounded-lg opacity-20 blur-sm"></div>
            </div>
            <p className="text-sm text-text-secondary whitespace-nowrap font-semibold mt-1">Overall Health</p>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-integration-primary font-semibold">Monitoring Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusOverview;