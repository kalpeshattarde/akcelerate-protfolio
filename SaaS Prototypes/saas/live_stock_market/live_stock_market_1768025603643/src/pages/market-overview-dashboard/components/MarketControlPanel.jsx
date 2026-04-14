import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MarketControlPanel = ({ onMarketChange, onTimeRangeChange, onRefresh }) => {
  const [selectedMarket, setSelectedMarket] = useState('NSE');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1D');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  const marketOptions = [
    { value: 'NSE', label: 'NSE (National Stock Exchange)' },
    { value: 'BSE', label: 'BSE (Bombay Stock Exchange)' },
    { value: 'GLOBAL', label: 'Global Markets' },
    { value: 'CRYPTO', label: 'Cryptocurrency' }
  ];

  const timeRangeOptions = [
    { value: '1D', label: '1 Day' },
    { value: '1W', label: '1 Week' },
    { value: '1M', label: '1 Month' },
    { value: '3M', label: '3 Months' },
    { value: '1Y', label: '1 Year' },
    { value: '5Y', label: '5 Years' }
  ];

  const handleMarketChange = (value) => {
    setSelectedMarket(value);
    onMarketChange?.(value);
  };

  const handleTimeRangeChange = (value) => {
    setSelectedTimeRange(value);
    onTimeRangeChange?.(value);
  };

  const handleRefresh = () => {
    onRefresh?.();
    // Simulate connection refresh
    setConnectionStatus('connecting');
    setTimeout(() => setConnectionStatus('connected'), 1000);
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'connecting': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return 'Wifi';
      case 'connecting': return 'Loader';
      case 'disconnected': return 'WifiOff';
      default: return 'Wifi';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Market Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-3">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Market Overview</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select
              options={marketOptions}
              value={selectedMarket}
              onChange={handleMarketChange}
              placeholder="Select Market"
              className="w-48"
            />
            
            <Select
              options={timeRangeOptions}
              value={selectedTimeRange}
              onChange={handleTimeRangeChange}
              placeholder="Time Range"
              className="w-32"
            />
          </div>
        </div>

        {/* Right Section - Status and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Connection Status */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-lg">
            <Icon 
              name={getConnectionStatusIcon()} 
              size={14} 
              className={`${getConnectionStatusColor()} ${connectionStatus === 'connecting' ? 'animate-spin' : ''}`}
            />
            <span className={`text-sm font-medium ${getConnectionStatusColor()}`}>
              {connectionStatus === 'connected' ? 'Live Data' : 
               connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
            </span>
          </div>

          {/* Auto Refresh Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`
                flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                ${autoRefresh 
                  ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground border border-border'
                }
              `}
            >
              <Icon name={autoRefresh ? "Play" : "Pause"} size={14} />
              <span>Auto Refresh</span>
            </button>
          </div>

          {/* Manual Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            iconName="RefreshCw"
            iconPosition="left"
            disabled={connectionStatus === 'connecting'}
          >
            Refresh
          </Button>

          {/* Settings Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            title="Dashboard Settings"
          />
        </div>
      </div>
      {/* Market Status Bar */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Market:</span>
            <span className="font-medium text-success">Open</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Trading Hours:</span>
            <span className="font-medium text-foreground">9:15 AM - 3:30 PM IST</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Last Update:</span>
            <span className="font-medium text-foreground">{new Date()?.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">Data Provider:</span>
          <span className="font-medium text-foreground">NSE Real-time</span>
          <div className="w-2 h-2 bg-success rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MarketControlPanel;