// src/pages/system-integration-monitor/components/PerformanceMetrics.jsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const PerformanceMetrics = ({ performanceData, onViewDetails }) => {
  const [selectedMetric, setSelectedMetric] = useState('responseTime');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  const metricTypes = [
    { value: 'responseTime', label: 'API Response Times', unit: 'ms' },
    { value: 'dataTransfer', label: 'Data Transfer Volumes', unit: 'MB' },
    { value: 'availability', label: 'System Availability', unit: '%' }
  ];

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  // Mock historical data for charts
  const generateChartData = () => {
    const hours = 24;
    return Array.from({ length: hours }, (_, i) => {
      const time = new Date(Date.now() - (hours - i) * 60 * 60 * 1000);
      return {
        time: time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        HRIS: selectedMetric === 'responseTime' ? 200 + Math.random() * 100 :
              selectedMetric === 'dataTransfer' ? 100 + Math.random() * 50 :
              98 + Math.random() * 2,
        CRM: selectedMetric === 'responseTime' ? 150 + Math.random() * 80 :
             selectedMetric === 'dataTransfer' ? 70 + Math.random() * 30 :
             99 + Math.random() * 1,
        Payroll: selectedMetric === 'responseTime' ? 400 + Math.random() * 200 :
                 selectedMetric === 'dataTransfer' ? 40 + Math.random() * 20 :
                 97 + Math.random() * 3,
        Identity: selectedMetric === 'responseTime' ? 700 + Math.random() * 300 :
                  selectedMetric === 'dataTransfer' ? 10 + Math.random() * 10 :
                  94 + Math.random() * 4
      };
    });
  };

  const chartData = generateChartData();

  const getCurrentMetricData = () => {
    switch (selectedMetric) {
      case 'responseTime':
        return performanceData?.apiResponseTimes || {};
      case 'dataTransfer':
        return performanceData?.dataTransferVolumes || {};
      case 'availability':
        return performanceData?.availability || {};
      default:
        return {};
    }
  };

  const currentData = getCurrentMetricData();
  const currentMetricInfo = metricTypes.find(m => m.value === selectedMetric);

  const getMetricStatus = (system, value) => {
    if (selectedMetric === 'responseTime') {
      if (value < 300) return 'excellent';
      if (value < 500) return 'good';
      if (value < 1000) return 'warning';
      return 'critical';
    }
    if (selectedMetric === 'availability') {
      if (value >= 99) return 'excellent';
      if (value >= 95) return 'good';
      if (value >= 90) return 'warning';
      return 'critical';
    }
    return 'good';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-info';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-secondary-600';
    }
  };

  const formatValue = (value, unit) => {
    if (unit === 'ms') return `${Math.round(value)}ms`;
    if (unit === 'MB') return `${value.toFixed(1)}MB`;
    if (unit === '%') return `${value.toFixed(1)}%`;
    return value;
  };

  return (
    <div className="bg-surface border border-border rounded-sm p-4 sm:p-6 overflow-hidden">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary">Performance Metrics</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-border rounded-sm bg-surface text-text-primary text-sm flex-1 sm:flex-none"
          >
            {metricTypes.map(metric => (
              <option key={metric.value} value={metric.value}>{metric.label}</option>
            ))}
          </select>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-border rounded-sm bg-surface text-text-primary text-sm flex-1 sm:flex-none"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          <button
            onClick={() => onViewDetails?.(selectedMetric)}
            className="flex items-center justify-center space-x-2 px-3 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth whitespace-nowrap"
          >
            <Icon name="BarChart3" size={16} />
            <span className="hidden sm:inline">Details</span>
          </button>
        </div>
      </div>

      {/* Current Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(currentData).map(([system, value]) => {
          const status = getMetricStatus(system, value);
          return (
            <div key={system} className="p-3 sm:p-4 border border-border rounded-sm hover:bg-secondary-50 transition-smooth min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-text-secondary uppercase truncate">{system}</span>
                <Icon 
                  name={status === 'excellent' ? 'TrendingUp' : status === 'critical' ? 'TrendingDown' : 'Minus'} 
                  size={16} 
                  className={`${getStatusColor(status)} flex-shrink-0`} 
                />
              </div>
              <div className={`text-xl sm:text-2xl font-bold ${getStatusColor(status)} truncate`}>
                {formatValue(value, currentMetricInfo?.unit)}
              </div>
              <div className="text-xs text-text-secondary capitalize truncate">
                {status} performance
              </div>
            </div>
          );
        })}
      </div>

      {/* Historical Chart */}
      <div className="mb-6">
        <h3 className="font-medium text-text-primary mb-4 text-sm sm:text-base truncate">
          {currentMetricInfo?.label} - {timeRanges.find(r => r.value === selectedTimeRange)?.label}
        </h3>
        
        <div className="h-48 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                fontSize={10}
                tick={{ fill: '#6b7280' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={10}
                tick={{ fill: '#6b7280' }}
                width={40}
                label={{ 
                  value: currentMetricInfo?.unit, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#6b7280', fontSize: '10px' }
                }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
                labelStyle={{ color: '#374151', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="HRIS" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 1, r: 3 }} />
              <Line type="monotone" dataKey="CRM" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 1, r: 3 }} />
              <Line type="monotone" dataKey="Payroll" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', strokeWidth: 1, r: 3 }} />
              <Line type="monotone" dataKey="Identity" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', strokeWidth: 1, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-secondary-50 rounded-sm overflow-hidden">
          <h4 className="font-medium text-text-primary mb-3 text-sm sm:text-base">Best Performing System</h4>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success-100 rounded-sm flex-shrink-0">
              <Icon name="Award" size={20} className="text-success" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-text-primary truncate">CRM System</div>
              <div className="text-sm text-text-secondary truncate">Consistently high performance</div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-secondary-50 rounded-sm overflow-hidden">
          <h4 className="font-medium text-text-primary mb-3 text-sm sm:text-base">Needs Attention</h4>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-sm flex-shrink-0">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-text-primary truncate">Identity Provider</div>
              <div className="text-sm text-text-secondary truncate">Response times elevated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;