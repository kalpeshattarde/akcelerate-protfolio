import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const DataRefreshIndicator = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds

  useEffect(() => {
    let interval;
    
    if (autoRefresh) {
      interval = setInterval(() => {
        handleAutoRefresh();
      }, refreshInterval * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, refreshInterval]);

  const handleAutoRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const handleManualRefresh = () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1500);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'connecting':
        return 'text-warning';
      case 'disconnected':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Wifi';
      case 'connecting':
        return 'WifiOff';
      case 'disconnected':
        return 'WifiOff';
      default:
        return 'Wifi';
    }
  };

  return (
    <div className="flex items-center space-x-3 text-sm">
      {/* Connection Status */}
      <div className="flex items-center space-x-1">
        <Icon 
          name={getConnectionStatusIcon()} 
          size={14} 
          className={`${getConnectionStatusColor()} ${connectionStatus === 'connecting' ? 'animate-pulse' : ''}`}
        />
        <span className={`hidden lg:inline ${getConnectionStatusColor()}`}>
          {connectionStatus === 'connected' ? 'Live' : 
           connectionStatus === 'connecting' ? 'Connecting...' : 'Offline'}
        </span>
      </div>

      {/* Last Updated */}
      <div className="flex items-center space-x-2 text-text-secondary">
        <Icon 
          name="Clock" 
          size={14} 
          className="text-text-secondary"
        />
        <span className="hidden sm:inline">
          Updated {formatTimeAgo(lastUpdated)}
        </span>
        <span className="sm:hidden">
          {formatTimeAgo(lastUpdated)}
        </span>
      </div>

      {/* Manual Refresh Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleManualRefresh}
        disabled={isRefreshing}
        iconName="RefreshCw"
        iconSize={14}
        className={`text-text-secondary hover:text-primary ${isRefreshing ? 'animate-spin' : ''}`}
        title="Refresh data"
      />

      {/* Auto Refresh Toggle */}
      <div className="hidden md:flex items-center space-x-2">
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`
            flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors
            ${autoRefresh 
              ? 'bg-success/10 text-success hover:bg-success/20' :'bg-muted text-text-secondary hover:bg-muted/80'
            }
          `}
          title={`Auto-refresh is ${autoRefresh ? 'enabled' : 'disabled'}`}
        >
          <Icon 
            name={autoRefresh ? "Play" : "Pause"} 
            size={12} 
          />
          <span>Auto</span>
        </button>

        {/* Refresh Interval Selector */}
        {autoRefresh && (
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="text-xs bg-transparent border border-border rounded px-1 py-0.5 text-text-secondary focus:outline-none focus:border-primary"
          >
            <option value={15}>15s</option>
            <option value={30}>30s</option>
            <option value={60}>1m</option>
            <option value={300}>5m</option>
          </select>
        )}
      </div>

      {/* Data Freshness Indicator */}
      <div className="flex items-center">
        <div className={`
          w-2 h-2 rounded-full transition-colors
          ${Date.now() - lastUpdated.getTime() < 60000 
            ? 'bg-success animate-pulse' 
            : Date.now() - lastUpdated.getTime() < 300000 
            ? 'bg-warning' :'bg-error'
          }
        `} />
      </div>
    </div>
  );
};

export default DataRefreshIndicator;