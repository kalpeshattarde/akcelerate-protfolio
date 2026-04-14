import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const SystemMonitoring = ({ searchQuery }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('response-time');

  const timeRanges = [
    { id: '1h', label: 'Last Hour' },
    { id: '24h', label: 'Last 24 Hours' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' }
  ];

  const systemMetrics = [
    {
      id: 'users',
      label: 'Active Users',
      value: 127,
      change: '+12%',
      trend: 'up',
      icon: 'Users',
      color: 'text-primary'
    },
    {
      id: 'response',
      label: 'Avg Response Time',
      value: '1.2s',
      change: '-8%',
      trend: 'down',
      icon: 'Zap',
      color: 'text-success'
    },
    {
      id: 'uptime',
      label: 'System Uptime',
      value: '99.8%',
      change: '+0.1%',
      trend: 'up',
      icon: 'Activity',
      color: 'text-success'
    },
    {
      id: 'errors',
      label: 'Error Rate',
      value: '0.2%',
      change: '-15%',
      trend: 'down',
      icon: 'AlertTriangle',
      color: 'text-warning'
    }
  ];

  const responseTimeData = [
    { time: '00:00', responseTime: 1.1, requests: 45 },
    { time: '04:00', responseTime: 0.9, requests: 23 },
    { time: '08:00', responseTime: 1.8, requests: 89 },
    { time: '12:00', responseTime: 2.1, requests: 156 },
    { time: '16:00', responseTime: 1.9, requests: 134 },
    { time: '20:00', responseTime: 1.4, requests: 78 }
  ];

  const userActivityData = [
    { hour: '00', users: 12 },
    { hour: '04', users: 8 },
    { hour: '08', users: 45 },
    { hour: '12', users: 89 },
    { hour: '16', users: 127 },
    { hour: '20', users: 67 }
  ];

  const databasePerformance = [
    { name: 'Query Performance', value: 85, color: '#10B981' },
    { name: 'Connection Pool', value: 92, color: '#3B82F6' },
    { name: 'Cache Hit Rate', value: 78, color: '#F59E0B' },
    { name: 'Index Usage', value: 95, color: '#8B5CF6' }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Memory Usage',
      message: 'Server memory usage has exceeded 85% threshold',
      timestamp: '2024-01-15 10:45 AM',
      severity: 'Medium',
      resolved: false
    },
    {
      id: 2,
      type: 'error',
      title: 'Database Connection Timeout',
      message: 'Multiple database connection timeouts detected',
      timestamp: '2024-01-15 10:30 AM',
      severity: 'High',
      resolved: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance window scheduled for tonight',
      timestamp: '2024-01-15 09:15 AM',
      severity: 'Low',
      resolved: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily database backup completed successfully',
      timestamp: '2024-01-15 02:00 AM',
      severity: 'Low',
      resolved: true
    }
  ];

  const serverStatus = [
    {
      id: 'web-01',
      name: 'Web Server 01',
      status: 'Healthy',
      cpu: 45,
      memory: 67,
      disk: 34,
      uptime: '15 days',
      location: 'US-East'
    },
    {
      id: 'web-02',
      name: 'Web Server 02',
      status: 'Healthy',
      cpu: 52,
      memory: 71,
      disk: 28,
      uptime: '15 days',
      location: 'US-West'
    },
    {
      id: 'db-01',
      name: 'Database Server',
      status: 'Warning',
      cpu: 78,
      memory: 89,
      disk: 56,
      uptime: '15 days',
      location: 'US-Central'
    },
    {
      id: 'cache-01',
      name: 'Cache Server',
      status: 'Healthy',
      cpu: 23,
      memory: 45,
      disk: 12,
      uptime: '15 days',
      location: 'US-East'
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      default: return 'text-primary';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-error-100 text-error-700';
      case 'Medium': return 'bg-warning-100 text-warning-700';
      case 'Low': return 'bg-success-100 text-success-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getServerStatusColor = (status) => {
    switch (status) {
      case 'Healthy': return 'text-success';
      case 'Warning': return 'text-warning';
      case 'Critical': return 'text-error';
      default: return 'text-secondary';
    }
  };

  const getUsageColor = (usage) => {
    if (usage >= 90) return 'bg-error-500';
    if (usage >= 75) return 'bg-warning-500';
    return 'bg-success-500';
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading-semibold text-text-primary mb-2">System Monitoring</h2>
          <p className="text-text-secondary">Monitor system performance, user activity, and health metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {timeRanges.map((range) => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* System Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {systemMetrics.map((metric) => (
          <div key={metric.id} className="bg-surface border border-border rounded-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                metric.color === 'text-primary' ? 'bg-primary-100' :
                metric.color === 'text-success' ? 'bg-success-100' :
                metric.color === 'text-warning'? 'bg-warning-100' : 'bg-secondary-100'
              }`}>
                <Icon name={metric.icon} size={20} className={metric.color} />
              </div>
              <span className={`text-sm font-body-medium ${
                metric.trend === 'up' ? 'text-success' : 'text-error'
              }`}>
                {metric.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-heading-bold text-text-primary mb-1">{metric.value}</p>
              <p className="text-sm text-text-secondary">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Response Time Chart */}
        <div className="bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading-semibold text-text-primary">Response Time Trends</h3>
            <Icon name="TrendingUp" size={20} className="text-text-secondary" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading-semibold text-text-primary">User Activity</h3>
            <Icon name="Users" size={20} className="text-text-secondary" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="hour" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="users" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Server Status and Database Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Server Status */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading-semibold text-text-primary">Server Status</h3>
            <Icon name="Server" size={20} className="text-text-secondary" />
          </div>
          <div className="space-y-4">
            {serverStatus.map((server) => (
              <div key={server.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-card">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    server.status === 'Healthy' ? 'bg-success-500' :
                    server.status === 'Warning'? 'bg-warning-500' : 'bg-error-500'
                  }`}></div>
                  <div>
                    <p className="font-body-medium text-text-primary">{server.name}</p>
                    <p className="text-sm text-text-secondary">{server.location} • Uptime: {server.uptime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-xs text-text-secondary">CPU</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-secondary-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.cpu)}`}
                          style={{ width: `${server.cpu}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-body-medium">{server.cpu}%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-text-secondary">Memory</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-secondary-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.memory)}`}
                          style={{ width: `${server.memory}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-body-medium">{server.memory}%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-text-secondary">Disk</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-secondary-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.disk)}`}
                          style={{ width: `${server.disk}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-body-medium">{server.disk}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Performance */}
        <div className="bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading-semibold text-text-primary">Database Performance</h3>
            <Icon name="Database" size={20} className="text-text-secondary" />
          </div>
          <div className="space-y-4">
            {databasePerformance.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">{metric.name}</span>
                  <span className="text-sm font-body-medium text-text-primary">{metric.value}%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${metric.value}%`,
                      backgroundColor: metric.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading-semibold text-text-primary">System Alerts</h3>
          <button className="flex items-center px-3 py-1.5 border border-border rounded-button hover:bg-secondary-50 transition-smooth text-sm">
            <Icon name="Settings" size={14} className="mr-1" />
            Alert Settings
          </button>
        </div>
        <div className="bg-surface border border-border rounded-card overflow-hidden">
          <div className="space-y-0">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 border-b border-border last:border-b-0 ${alert.resolved ? 'opacity-60' : ''}`}>
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getAlertIcon(alert.type)} 
                    size={20} 
                    className={`mt-0.5 ${getAlertColor(alert.type)}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-body-medium text-text-primary">{alert.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        {alert.resolved && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium bg-success-100 text-success-700">
                            Resolved
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{alert.message}</p>
                    <p className="text-xs text-text-secondary">{alert.timestamp}</p>
                  </div>
                  {!alert.resolved && (
                    <button className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-button transition-smooth">
                      <Icon name="X" size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;