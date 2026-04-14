import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastHeartbeat, setLastHeartbeat] = useState(new Date());
  const [dataLatency, setDataLatency] = useState(45);
  const [activeConnections, setActiveConnections] = useState(3);

  useEffect(() => {
    // Simulate connection monitoring
    const interval = setInterval(() => {
      // Simulate occasional connection issues
      const random = Math.random();
      if (random < 0.05) {
        setConnectionStatus('disconnected');
      } else if (random < 0.1) {
        setConnectionStatus('connecting');
      } else {
        setConnectionStatus('connected');
        setLastHeartbeat(new Date());
        setDataLatency(Math.floor(Math.random() * 100) + 20);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
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

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Wifi';
      case 'connecting':
        return 'Loader2';
      case 'disconnected':
        return 'WifiOff';
      default:
        return 'Wifi';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Reconnecting...';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  return (
    <div className="flex items-center space-x-4 text-sm">
      {/* Main Connection Status */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={getStatusIcon()} 
          size={16} 
          className={`${getStatusColor()} ${connectionStatus === 'connecting' ? 'animate-spin' : ''}`}
        />
        <span className={getStatusColor()}>
          {getStatusText()}
        </span>
      </div>

      {/* Connection Details */}
      {connectionStatus === 'connected' && (
        <>
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Clock" size={14} />
            <span>Latency: {dataLatency}ms</span>
          </div>
          
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Users" size={14} />
            <span>{activeConnections} active</span>
          </div>
          
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Activity" size={14} />
            <span>Last: {formatTimeAgo(lastHeartbeat)}</span>
          </div>
        </>
      )}

      {/* Reconnect Button for Disconnected State */}
      {connectionStatus === 'disconnected' && (
        <button
          onClick={() => setConnectionStatus('connecting')}
          className="flex items-center space-x-1 px-2 py-1 bg-error/10 text-error rounded text-xs hover:bg-error/20 transition-colors"
        >
          <Icon name="RefreshCw" size={12} />
          <span>Reconnect</span>
        </button>
      )}
    </div>
  );
};

export default ConnectionStatus;