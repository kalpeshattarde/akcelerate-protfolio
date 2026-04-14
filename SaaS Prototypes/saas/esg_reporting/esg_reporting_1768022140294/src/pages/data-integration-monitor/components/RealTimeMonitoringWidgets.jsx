import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const RealTimeMonitoringWidgets = () => {
  const [realTimeData, setRealTimeData] = useState({
    activeSyncJobs: 3,
    queueDepth: 127,
    avgResponseTime: 145,
    errorRate: 2.1,
    throughput: 1247
  });

  const [syncJobs, setSyncJobs] = useState([
    { id: 1, name: 'SAP ERP Sync', progress: 75, status: 'running', eta: '2 min' },
    { id: 2, name: 'Facility Data Import', progress: 45, status: 'running', eta: '5 min' },
    { id: 3, name: 'IoT Sensor Sync', progress: 90, status: 'running', eta: '30 sec' }
  ]);

  const [systemHealth, setSystemHealth] = useState([
    { name: 'Healthy', value: 18, color: 'var(--color-success)' },
    { name: 'Warning', value: 4, color: 'var(--color-warning)' },
    { name: 'Error', value: 2, color: 'var(--color-error)' }
  ]);

  const [apiMetrics, setApiMetrics] = useState([
    { time: '04:50', requests: 85, errors: 2 },
    { time: '04:52', requests: 92, errors: 1 },
    { time: '04:54', requests: 78, errors: 0 },
    { time: '04:56', requests: 105, errors: 3 },
    { time: '04:58', requests: 88, errors: 1 }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        queueDepth: Math.max(0, prev?.queueDepth + Math.floor(Math.random() * 20 - 10)),
        avgResponseTime: Math.max(50, prev?.avgResponseTime + Math.floor(Math.random() * 40 - 20)),
        throughput: Math.max(0, prev?.throughput + Math.floor(Math.random() * 200 - 100))
      }));

      // Update sync job progress
      setSyncJobs(prev => prev?.map(job => ({
        ...job,
        progress: Math.min(100, job?.progress + Math.floor(Math.random() * 10))
      })));

      // Add new API metric
      const now = new Date();
      const timeStr = `${now?.getHours()?.toString()?.padStart(2, '0')}:${now?.getMinutes()?.toString()?.padStart(2, '0')}`;
      setApiMetrics(prev => [
        ...prev?.slice(-4),
        {
          time: timeStr,
          requests: Math.floor(Math.random() * 50 + 60),
          errors: Math.floor(Math.random() * 4)
        }
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-primary bg-primary/10';
      case 'completed': return 'text-success bg-success/10';
      case 'error': return 'text-error bg-error/10';
      case 'paused': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">{realTimeData?.activeSyncJobs}</div>
              <div className="text-sm text-muted-foreground">Active Syncs</div>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="RefreshCw" size={20} className="text-primary animate-spin" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">{realTimeData?.queueDepth}</div>
              <div className="text-sm text-muted-foreground">Queue Depth</div>
            </div>
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-secondary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">{realTimeData?.avgResponseTime}ms</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">{realTimeData?.errorRate}%</div>
              <div className="text-sm text-muted-foreground">Error Rate</div>
            </div>
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-error" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">{realTimeData?.throughput?.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Records/Hour</div>
            </div>
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-accent" />
            </div>
          </div>
        </div>
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health Pie Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">System Health</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={systemHealth}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {systemHealth?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {systemHealth?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }}></div>
                <span className="text-sm text-muted-foreground">{item?.name} ({item?.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* API Metrics Bar Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">API Activity</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Real-time</span>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apiMetrics}>
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
                <Bar dataKey="requests" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="errors" fill="var(--color-error)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Active Sync Jobs */}
      <div className="bg-card border border-border rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Active Sync Jobs</h3>
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={14} className="text-primary animate-spin" />
            <span className="text-sm text-muted-foreground">{syncJobs?.length} running</span>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {syncJobs?.map((job) => (
            <div key={job?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job?.status)}`}>
                  {job?.status}
                </div>
                <div>
                  <div className="font-medium text-foreground">{job?.name}</div>
                  <div className="text-sm text-muted-foreground">ETA: {job?.eta}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium text-foreground">{job?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${job?.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1 hover:bg-muted rounded">
                    <Icon name="Pause" size={14} className="text-muted-foreground" />
                  </button>
                  <button className="p-1 hover:bg-muted rounded">
                    <Icon name="X" size={14} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoringWidgets;