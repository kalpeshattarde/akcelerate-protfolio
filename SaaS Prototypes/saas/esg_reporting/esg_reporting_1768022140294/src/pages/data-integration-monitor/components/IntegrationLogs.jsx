import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IntegrationLogs = ({ selectedIntegration }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filters, setFilters] = useState({
    level: 'all',
    integration: 'all',
    timeRange: '24h',
    search: ''
  });
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  const logLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'ERROR', label: 'Error' },
    { value: 'WARN', label: 'Warning' },
    { value: 'INFO', label: 'Info' },
    { value: 'DEBUG', label: 'Debug' }
  ];

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const integrationOptions = [
    { value: 'all', label: 'All Integrations' },
    { value: 'sap-erp', label: 'SAP ERP System' },
    { value: 'facility-mgmt', label: 'Facility Management' },
    { value: 'sustainability-platform', label: 'Sustainability Platform' },
    { value: 'iot-sensors', label: 'IoT Sensors' },
    { value: 'external-api', label: 'External APIs' }
  ];

  useEffect(() => {
    // Mock log data
    const mockLogs = [
      {
        id: 1,
        timestamp: '2025-01-07 04:58:32',
        level: 'INFO',
        integration: 'SAP ERP System',
        integrationId: 'sap-erp',
        message: 'Data synchronization completed successfully',
        details: `Processed 1,247 energy consumption records for December 2024.\nTotal processing time: 2.3 seconds\nMemory usage: 45MB`,
        category: 'sync',
        userId: 'system',
        correlationId: 'sync-20250107-045832'
      },
      {
        id: 2,
        timestamp: '2025-01-07 04:55:15',
        level: 'WARN',
        integration: 'Facility Management',
        integrationId: 'facility-mgmt',
        message: 'Rate limit threshold approaching',
        details: `Current API usage: 85/100 requests per minute\nRecommendation: Implement request throttling\nNext reset: 2025-01-07 05:00:00`,
        category: 'performance',
        userId: 'system',
        correlationId: 'perf-20250107-045515'
      },
      {
        id: 3,
        timestamp: '2025-01-07 04:52:08',
        level: 'ERROR',
        integration: 'IoT Sensors',
        integrationId: 'iot-sensors',
        message: 'Data validation failed for sensor reading',
        details: `Sensor ID: TEMP_001\nExpected: Numeric temperature value\nReceived: "sensor_offline"\nAction: Skipped record, flagged for manual review`,
        category: 'validation',
        userId: 'system',
        correlationId: 'val-20250107-045208'
      },
      {
        id: 4,
        timestamp: '2025-01-07 04:48:45',
        level: 'INFO',
        integration: 'Sustainability Platform',
        integrationId: 'sustainability-platform',
        message: 'Connection health check passed',
        details: `Response time: 145ms\nStatus code: 200\nEndpoint: https://api.sustainability.com/v2/health\nNext check: 2025-01-07 05:48:45`,
        category: 'health',
        userId: 'system',
        correlationId: 'health-20250107-044845'
      },
      {
        id: 5,
        timestamp: '2025-01-07 04:45:22',
        level: 'ERROR',
        integration: 'External APIs',
        integrationId: 'external-api',
        message: 'Authentication token expired',
        details: `Token expired at: 2025-01-07 04:45:00\nAttempting automatic renewal...\nRenewal status: Failed - Manual intervention required\nContact: api-support@external.com`,
        category: 'auth',
        userId: 'system',
        correlationId: 'auth-20250107-044522'
      },
      {
        id: 6,
        timestamp: '2025-01-07 04:42:10',
        level: 'DEBUG',
        integration: 'SAP ERP System',
        integrationId: 'sap-erp',
        message: 'Database connection pool status',
        details: `Active connections: 8/20\nIdle connections: 12\nWaiting requests: 0\nAverage connection time: 12ms`,
        category: 'debug',
        userId: 'system',
        correlationId: 'debug-20250107-044210'
      },
      {
        id: 7,
        timestamp: '2025-01-07 04:40:33',
        level: 'INFO',
        integration: 'Facility Management',
        integrationId: 'facility-mgmt',
        message: 'Scheduled maintenance window started',
        details: `Maintenance type: Database optimization\nExpected duration: 15 minutes\nImpact: Read-only mode enabled\nScheduled by: admin@company.com`,
        category: 'maintenance',
        userId: 'admin',
        correlationId: 'maint-20250107-044033'
      },
      {
        id: 8,
        timestamp: '2025-01-07 04:38:17',
        level: 'WARN',
        integration: 'IoT Sensors',
        integrationId: 'iot-sensors',
        message: 'Sensor communication timeout',
        details: `Sensor ID: WATER_003\nLocation: Building A - Floor 2\nLast successful reading: 2025-01-07 04:35:00\nRetry attempts: 3/3 failed`,
        category: 'connectivity',
        userId: 'system',
        correlationId: 'conn-20250107-043817'
      }
    ];

    setLogs(mockLogs);
  }, []);

  useEffect(() => {
    // Filter logs based on current filters
    let filtered = logs;

    if (filters?.level !== 'all') {
      filtered = filtered?.filter(log => log?.level === filters?.level);
    }

    if (filters?.integration !== 'all') {
      filtered = filtered?.filter(log => log?.integrationId === filters?.integration);
    }

    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(log => 
        log?.message?.toLowerCase()?.includes(searchTerm) ||
        log?.details?.toLowerCase()?.includes(searchTerm) ||
        log?.integration?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply time range filter
    const now = new Date();
    const timeRangeMs = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };

    if (timeRangeMs?.[filters?.timeRange]) {
      const cutoffTime = new Date(now.getTime() - timeRangeMs[filters.timeRange]);
      filtered = filtered?.filter(log => new Date(log.timestamp) >= cutoffTime);
    }

    setFilteredLogs(filtered);
  }, [logs, filters]);

  useEffect(() => {
    // Auto-refresh logs
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        // In a real app, this would fetch new logs from the API
        console.log('Auto-refreshing logs...');
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isAutoRefresh]);

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'ERROR': return 'text-error bg-error/10 border-error/20';
      case 'WARN': return 'text-warning bg-warning/10 border-warning/20';
      case 'INFO': return 'text-primary bg-primary/10 border-primary/20';
      case 'DEBUG': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-foreground bg-card border-border';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'sync': return 'RefreshCw';
      case 'performance': return 'TrendingUp';
      case 'validation': return 'Shield';
      case 'health': return 'Heart';
      case 'auth': return 'Lock';
      case 'debug': return 'Bug';
      case 'maintenance': return 'Settings';
      case 'connectivity': return 'Wifi';
      default: return 'FileText';
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Level', 'Integration', 'Message', 'Category', 'Correlation ID'],
      ...filteredLogs?.map(log => [
        log?.timestamp,
        log?.level,
        log?.integration,
        log?.message,
        log?.category,
        log?.correlationId
      ])
    ]?.map(row => row?.map(cell => `"${cell}"`)?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `integration-logs-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-foreground">Integration Logs</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAutoRefresh ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
            <span className="text-sm text-muted-foreground">
              {isAutoRefresh ? 'Live' : 'Paused'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
          >
            <Icon name={isAutoRefresh ? "Pause" : "Play"} size={14} className="mr-2" />
            {isAutoRefresh ? 'Pause' : 'Resume'}
          </Button>
          <Button variant="outline" size="sm" onClick={exportLogs}>
            <Icon name="Download" size={14} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            label="Log Level"
            options={logLevels}
            value={filters?.level}
            onChange={(value) => handleFilterChange('level', value)}
          />
          <Select
            label="Integration"
            options={integrationOptions}
            value={filters?.integration}
            onChange={(value) => handleFilterChange('integration', value)}
          />
          <Select
            label="Time Range"
            options={timeRanges}
            value={filters?.timeRange}
            onChange={(value) => handleFilterChange('timeRange', value)}
          />
          <Input
            label="Search"
            type="search"
            placeholder="Search logs..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
          />
        </div>
      </div>
      {/* Results Summary */}
      <div className="px-4 py-2 bg-muted/20 border-b border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Showing {filteredLogs?.length} of {logs?.length} log entries
          </span>
          <div className="flex items-center space-x-4">
            <span className="text-error">
              {filteredLogs?.filter(log => log?.level === 'ERROR')?.length} errors
            </span>
            <span className="text-warning">
              {filteredLogs?.filter(log => log?.level === 'WARN')?.length} warnings
            </span>
          </div>
        </div>
      </div>
      {/* Logs List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredLogs?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredLogs?.map((log) => (
              <div key={log?.id} className="p-4 hover:bg-muted/30 transition-colors duration-150">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium border ${getLogLevelColor(log?.level)}`}>
                      {log?.level}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name={getCategoryIcon(log?.category)} size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground capitalize">{log?.category}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{log?.integration}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{log?.timestamp}</div>
                </div>
                
                <div className="mb-2">
                  <div className="font-medium text-foreground mb-1">{log?.message}</div>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">{log?.details}</div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Correlation ID: {log?.correlationId}</span>
                  <span>User: {log?.userId}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Search" size={32} className="mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">No logs found matching your criteria</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => setFilters({ level: 'all', integration: 'all', timeRange: '24h', search: '' })}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationLogs;