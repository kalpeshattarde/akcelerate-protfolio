import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PerformanceMonitoring = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('response-time');
  const [performanceData, setPerformanceData] = useState({
    responseTime: [],
    throughput: [],
    errorRate: [],
    systemLoad: []
  });
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    avgResponseTime: 0,
    requestsPerSecond: 0,
    errorRate: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0
  });

  useEffect(() => {
    // Generate mock performance data
    const generateData = () => {
      const now = new Date();
      const data = [];
      const points = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
      
      for (let i = points - 1; i >= 0; i--) {
        const time = new Date(now.getTime() - i * (timeRange === '24h' ? 3600000 : timeRange === '7d' ? 86400000 : 86400000));
        data?.push({
          time: timeRange === '24h' ? time?.getHours() + ':00' : time?.toLocaleDateString(),
          responseTime: 50 + Math.random() * 100,
          throughput: 800 + Math.random() * 400,
          errorRate: Math.random() * 3,
          cpuUsage: 20 + Math.random() * 60,
          memoryUsage: 40 + Math.random() * 40,
          diskIO: 10 + Math.random() * 30
        });
      }
      return data;
    };

    const data = generateData();
    setPerformanceData({
      responseTime: data,
      throughput: data,
      errorRate: data,
      systemLoad: data
    });

    // Update real-time metrics
    setRealTimeMetrics({
      avgResponseTime: 75 + Math.random() * 50,
      requestsPerSecond: 950 + Math.random() * 100,
      errorRate: Math.random() * 2,
      cpuUsage: 35 + Math.random() * 30,
      memoryUsage: 55 + Math.random() * 20,
      diskUsage: 68 + Math.random() * 10
    });

    // Set up real-time updates
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        avgResponseTime: Math.max(20, prev?.avgResponseTime + (Math.random() - 0.5) * 10),
        requestsPerSecond: Math.max(500, prev?.requestsPerSecond + (Math.random() - 0.5) * 50),
        errorRate: Math.max(0, Math.min(5, prev?.errorRate + (Math.random() - 0.5) * 0.5)),
        cpuUsage: Math.max(10, Math.min(90, prev?.cpuUsage + (Math.random() - 0.5) * 5)),
        memoryUsage: Math.max(20, Math.min(85, prev?.memoryUsage + (Math.random() - 0.5) * 3)),
        diskUsage: Math.max(50, Math.min(95, prev?.diskUsage + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [timeRange]);

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const metricOptions = [
    { value: 'response-time', label: 'Response Time' },
    { value: 'throughput', label: 'Throughput' },
    { value: 'error-rate', label: 'Error Rate' },
    { value: 'system-load', label: 'System Load' }
  ];

  const getMetricColor = (value, type) => {
    switch (type) {
      case 'response-time':
        return value > 100 ? 'text-error' : value > 75 ? 'text-warning' : 'text-success';
      case 'error-rate':
        return value > 2 ? 'text-error' : value > 1 ? 'text-warning' : 'text-success';
      case 'usage':
        return value > 80 ? 'text-error' : value > 60 ? 'text-warning' : 'text-success';
      default:
        return 'text-foreground';
    }
  };

  const capacityData = [
    { name: 'CPU', value: realTimeMetrics?.cpuUsage, color: '#10B981' },
    { name: 'Memory', value: realTimeMetrics?.memoryUsage, color: '#3B82F6' },
    { name: 'Disk', value: realTimeMetrics?.diskUsage, color: '#F59E0B' }
  ];

  const renderChart = () => {
    const data = performanceData?.[selectedMetric?.replace('-', '')] || performanceData?.responseTime;
    
    switch (selectedMetric) {
      case 'response-time':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="responseTime" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'throughput':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="throughput" 
                stroke="var(--color-success)" 
                fill="var(--color-success)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'error-rate':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="errorRate" fill="var(--color-error)" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'system-load':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="cpuUsage" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="CPU Usage"
              />
              <Line 
                type="monotone" 
                dataKey="memoryUsage" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                name="Memory Usage"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Avg Response Time</span>
            </div>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
          <div className={`text-2xl font-bold ${getMetricColor(realTimeMetrics?.avgResponseTime, 'response-time')}`}>
            {realTimeMetrics?.avgResponseTime?.toFixed(0)}ms
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} className="text-success" />
              <span className="text-sm font-medium text-muted-foreground">Requests/sec</span>
            </div>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-success">
            {realTimeMetrics?.requestsPerSecond?.toFixed(0)}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <span className="text-sm font-medium text-muted-foreground">Error Rate</span>
            </div>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
          <div className={`text-2xl font-bold ${getMetricColor(realTimeMetrics?.errorRate, 'error-rate')}`}>
            {realTimeMetrics?.errorRate?.toFixed(2)}%
          </div>
        </div>
      </div>
      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Performance Trends</h3>
              <div className="flex space-x-2">
                <Select
                  options={metricOptions}
                  value={selectedMetric}
                  onChange={setSelectedMetric}
                  className="w-40"
                />
                <Select
                  options={timeRangeOptions}
                  value={timeRange}
                  onChange={setTimeRange}
                  className="w-32"
                />
              </div>
            </div>
          </div>
          <div className="p-4">
            {renderChart()}
          </div>
        </div>

        <div className="space-y-4">
          {/* System Capacity */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-4">System Capacity</h4>
            <div className="space-y-4">
              {capacityData?.map((item) => (
                <div key={item?.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{item?.name}</span>
                    <span className={`text-sm font-medium ${getMetricColor(item?.value, 'usage')}`}>
                      {item?.value?.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${item?.value}%`,
                        backgroundColor: item?.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" fullWidth>
                <Icon name="RefreshCw" size={14} className="mr-2" />
                Refresh Metrics
              </Button>
              <Button variant="outline" size="sm" fullWidth>
                <Icon name="Download" size={14} className="mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm" fullWidth>
                <Icon name="Settings" size={14} className="mr-2" />
                Configure Alerts
              </Button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-4">System Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm text-success">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Gateway</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm text-success">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cache Layer</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full" />
                  <span className="text-sm text-warning">Degraded</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">File Storage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm text-success">Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitoring;