import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionButton from '../../components/ui/QuickActionButton';
import MetricsCard from './components/MetricsCard';
import UsageChart from './components/UsageChart';
import PerformanceMonitor from './components/PerformanceMonitor';
import UsageBreakdown from './components/UsageBreakdown';
import ReportsSection from './components/ReportsSection';
import AlertsConfiguration from './components/AlertsConfiguration';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AnalyticsDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for metrics cards
  const metricsData = [
    {
      title: 'Total Meetings',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Video',
      color: 'primary',
      subtitle: 'This month'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Users',
      color: 'success',
      subtitle: 'Monthly active'
    },
    {
      title: 'Avg Meeting Duration',
      value: '42 min',
      change: '-3.1%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'warning',
      subtitle: 'Per meeting'
    },
    {
      title: 'System Uptime',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive',
      icon: 'Activity',
      color: 'success',
      subtitle: 'Last 30 days'
    },
    {
      title: 'Storage Used',
      value: '2.4 TB',
      change: '+15.3%',
      changeType: 'positive',
      icon: 'HardDrive',
      color: 'accent',
      subtitle: 'Of 10 TB total'
    },
    {
      title: 'Bandwidth Usage',
      value: '847 GB',
      change: '+22.1%',
      changeType: 'positive',
      icon: 'Wifi',
      color: 'primary',
      subtitle: 'This month'
    }
  ];

  // Mock data for usage charts
  const meetingTrendsData = [
    { name: 'Mon', value: 45 },
    { name: 'Tue', value: 52 },
    { name: 'Wed', value: 48 },
    { name: 'Thu', value: 61 },
    { name: 'Fri', value: 55 },
    { name: 'Sat', value: 23 },
    { name: 'Sun', value: 18 }
  ];

  const participantEngagementData = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1450 },
    { name: 'Mar', value: 1380 },
    { name: 'Apr', value: 1620 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2100 },
    { name: 'Jul', value: 2350 },
    { name: 'Aug', value: 2847 }
  ];

  const timeRangeOptions = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleExportData = () => {
    console.log('Exporting analytics data...');
    // Implement export functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        notificationCount={3}
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole="admin"
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive insights into video conferencing usage and performance metrics
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e?.target?.value)}
                className="px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {timeRangeOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                loading={refreshing}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={handleExportData}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          </div>

          {/* Metrics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
                subtitle={metric?.subtitle}
                loading={loading}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <UsageChart
              data={meetingTrendsData}
              title="Meeting Trends"
              type="area"
              color="#2563EB"
              height={300}
              loading={loading}
            />
            
            <UsageChart
              data={participantEngagementData}
              title="Participant Engagement"
              type="line"
              color="#059669"
              height={300}
              loading={loading}
            />
          </div>

          {/* Performance Monitor */}
          <div className="mb-8">
            <PerformanceMonitor loading={loading} />
          </div>

          {/* Usage Breakdown */}
          <div className="mb-8">
            <UsageBreakdown loading={loading} />
          </div>

          {/* Reports and Alerts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <ReportsSection loading={loading} />
            <AlertsConfiguration loading={loading} />
          </div>

          {/* Additional Insights */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} className="text-success" />
                  <span className="text-sm font-medium text-foreground">Peak Usage</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Meeting activity peaks between 10 AM - 2 PM on weekdays, with 40% higher usage than average.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">User Engagement</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Average meeting participation rate is 85%, with screen sharing used in 60% of meetings.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Globe" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">Global Distribution</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  42% of meetings originate from North America, 31% from Europe, and 19% from Asia Pacific.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <QuickActionButton userRole="admin" />
    </div>
  );
};

export default AnalyticsDashboard;