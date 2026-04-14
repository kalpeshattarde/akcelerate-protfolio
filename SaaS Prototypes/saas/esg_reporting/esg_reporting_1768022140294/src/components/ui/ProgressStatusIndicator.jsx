import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ProgressStatusIndicator = ({
  isCompact = false,
  showDetails = false,
  onToggleDetails
}) => {
  const [progressData, setProgressData] = useState({
    overall: 0,
    frameworks: {},
    deadlines: [],
    lastUpdated: null
  });

  useEffect(() => {
    // Simulate real-time progress data with exact specifications
    const mockProgressData = {
      overall: 78,
      frameworks: {
        'GRI Standards': { progress: 85, status: 'on-track', dueDate: '2024-12-31' },
        'SASB Standards': { progress: 72, status: 'at-risk', dueDate: '2024-12-15' },
        'TCFD Recommendations': { progress: 65, status: 'behind', dueDate: '2024-12-20' },
        'EU Taxonomy': { progress: 90, status: 'ahead', dueDate: '2024-12-25' }
      },
      deadlines: [
      { name: 'SASB Report', daysLeft: 8, status: 'urgent' },
      { name: 'TCFD Disclosure', daysLeft: 13, status: 'warning' },
      { name: 'GRI Report', daysLeft: 24, status: 'normal' }],

      lastUpdated: new Date()?.toISOString()
    };

    setProgressData(mockProgressData);

    // Simulate periodic updates
    const interval = setInterval(() => {
      setProgressData((prev) => ({
        ...prev,
        overall: Math.min(100, prev?.overall + Math.random() * 2),
        lastUpdated: new Date()?.toISOString()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ahead':return 'text-success';
      case 'on-track':return 'text-primary';
      case 'at-risk':return 'text-warning';
      case 'behind':return 'text-error';
      case 'urgent':return 'text-error';
      case 'warning':return 'text-warning';
      case 'normal':return 'text-muted-foreground';
      default:return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ahead':return 'TrendingUp';
      case 'on-track':return 'CheckCircle';
      case 'at-risk':return 'AlertTriangle';
      case 'behind':return 'AlertCircle';
      case 'urgent':return 'Clock';
      case 'warning':return 'AlertTriangle';
      case 'normal':return 'Calendar';
      default:return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ahead':return 'Ahead';
      case 'on-track':return 'On Track';
      case 'at-risk':return 'At Risk';
      case 'behind':return 'Behind';
      case 'urgent':return 'Urgent';
      case 'warning':return 'Warning';
      case 'normal':return 'Normal';
      default:return status;
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const updated = new Date(dateString);
    const diffInMinutes = Math.floor((now - updated) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (isCompact) {
    return (
      <div
        className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2 cursor-pointer hover:bg-muted/80 transition-colors duration-150"
        onClick={onToggleDetails}>
        {/* Circular Progress */}
        <div className="relative w-8 h-8">
          <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border" />
            <circle
              cx="16"
              cy="16"
              r="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${progressData?.overall * 0.75} 75`}
              className="text-success transition-all duration-300" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-medium text-foreground text-[10px]">
              {Math.round(progressData?.overall)}%
            </span>
          </div>
        </div>
        {/* Progress Info */}
        <div className="text-xs">
          <div className="font-medium text-foreground">Q4 Progress</div>
          <div className="text-muted-foreground">
            {progressData?.deadlines?.length} deadlines
          </div>
        </div>
        {/* Expand Icon */}
        <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
      </div>);

  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Target" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Compliance Progress</h3>
            <p className="text-sm text-muted-foreground">
              Updated {formatTimeAgo(progressData?.lastUpdated)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            {Math.round(progressData?.overall)}%
          </div>
          <div className="text-sm text-muted-foreground">Overall</div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Q4 2024 Progress</span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progressData?.overall)}/100%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-to-r from-success to-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressData?.overall}%` }} />
        </div>
      </div>

      {/* Framework Status */}
      <div className="p-4 border-b border-border">
        <h4 className="font-medium text-foreground mb-3">Framework Status</h4>
        <div className="space-y-3">
          {Object.entries(progressData?.frameworks)?.map(([framework, data]) =>
          <div key={framework} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon
                name={getStatusIcon(data?.status)}
                size={16}
                className={getStatusColor(data?.status)} />
                <div>
                  <div className="text-sm font-medium text-foreground">{framework}</div>
                  <div className="text-xs text-muted-foreground">
                    Due {new Date(data?.dueDate)?.toLocaleDateString('en-GB')}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {data?.progress}%
                </div>
                <div className={`text-xs ${getStatusColor(data?.status)}`}>
                  {getStatusText(data?.status)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="p-4 border-b border-border">
        <h4 className="font-medium text-foreground mb-3">Upcoming Deadlines</h4>
        <div className="space-y-2">
          {progressData?.deadlines?.map((deadline, index) =>
          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3">
                <Icon
                name={getStatusIcon(deadline?.status)}
                size={14}
                className={getStatusColor(deadline?.status)} />
                <span className="text-sm font-medium text-foreground">
                  {deadline?.name}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {deadline?.daysLeft} days
                </div>
                <div className={`text-xs capitalize ${getStatusColor(deadline?.status)}`}>
                  {getStatusText(deadline?.status)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-150">
            <Icon name="FileText" size={14} />
            <span>Generate Report</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors duration-150">
            <Icon name="RefreshCw" size={14} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>);

};

export default ProgressStatusIndicator;