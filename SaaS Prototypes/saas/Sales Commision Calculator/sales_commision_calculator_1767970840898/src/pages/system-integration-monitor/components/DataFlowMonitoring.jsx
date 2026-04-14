// src/pages/system-integration-monitor/components/DataFlowMonitoring.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DataFlowMonitoring = ({ syncActivities, onRefreshData }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [filterStatus, setFilterStatus] = useState('all');

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const statusFilters = [
    { value: 'all', label: 'All Status' },
    { value: 'success', label: 'Success' },
    { value: 'running', label: 'Running' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success-600 bg-success-50 border-success-200';
      case 'running': return 'text-info-600 bg-info-50 border-info-200';
      case 'warning': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'error': return 'text-error-600 bg-error-50 border-error-200';
      default: return 'text-secondary-400 bg-secondary-50 border-secondary-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return 'CheckCircle';
      case 'running': return 'RefreshCw';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getSystemGradient = (system) => {
    switch (system) {
      case 'HRIS': return 'from-purple-500 to-indigo-600';
      case 'CRM': return 'from-cyan-500 to-teal-600';
      case 'Payroll': return 'from-emerald-500 to-green-600';
      case 'Identity Provider': return 'from-violet-500 to-purple-600';
      default: return 'from-secondary-400 to-secondary-600';
    }
  };

  const filteredActivities = syncActivities?.filter(activity => {
    if (filterStatus !== 'all' && activity.status !== filterStatus) {
      return false;
    }
    return true;
  });

  const formatDuration = (minutes) => {
    if (!minutes) return 'In progress';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 24 * 60) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / (24 * 60))}d ago`;
  };

  return (
    <div className="bg-surface border border-integration-border rounded-lg p-4 sm:p-6 overflow-hidden shadow-integration backdrop-blur-sm">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-integration rounded-lg">
            <Icon name="GitBranch" size={20} className="text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-text-primary bg-gradient-to-r from-integration-primary to-integration-secondary bg-clip-text text-transparent">
            Data Flow Monitoring
          </h2>
          <div className="w-2 h-2 bg-integration-secondary rounded-full animate-pulse"></div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border border-integration-border rounded-lg bg-gradient-to-r from-surface to-integration-surface text-text-primary text-sm flex-1 sm:flex-none focus:ring-2 focus:ring-integration-primary focus:border-integration-primary transition-all"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-integration-border rounded-lg bg-gradient-to-r from-surface to-integration-surface text-text-primary text-sm flex-1 sm:flex-none focus:ring-2 focus:ring-integration-primary focus:border-integration-primary transition-all"
          >
            {statusFilters.map(filter => (
              <option key={filter.value} value={filter.value}>{filter.label}</option>
            ))}
          </select>
          <button
            onClick={onRefreshData}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-integration text-white rounded-lg hover:shadow-glow transition-all duration-200 whitespace-nowrap font-semibold"
          >
            <Icon name="RefreshCw" size={16} className="animate-spin" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Enhanced Summary Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-success-50 to-emerald-50 rounded-xl border border-success-200 overflow-hidden min-w-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xl sm:text-2xl font-black text-success-600 mb-1">
            {filteredActivities?.filter(a => a.status === 'success')?.length || 0}
          </div>
          <p className="text-xs sm:text-sm text-success-700 truncate font-semibold">Successful Syncs</p>
          <div className="w-full bg-success-200 rounded-full h-1 mt-2">
            <div className="bg-success-500 h-1 rounded-full w-full"></div>
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-info-50 to-blue-50 rounded-xl border border-info-200 overflow-hidden min-w-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xl sm:text-2xl font-black text-info-600 mb-1 truncate">
            {filteredActivities?.reduce((sum, a) => sum + (a.recordsProcessed || 0), 0)?.toLocaleString() || 0}
          </div>
          <p className="text-xs sm:text-sm text-info-700 truncate font-semibold">Records Processed</p>
          <div className="w-full bg-info-200 rounded-full h-1 mt-2">
            <div className="bg-info-500 h-1 rounded-full w-4/5 animate-pulse"></div>
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-warning-50 to-orange-50 rounded-xl border border-warning-200 overflow-hidden min-w-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xl sm:text-2xl font-black text-warning-600 mb-1">
            {filteredActivities?.reduce((sum, a) => sum + (a.errorCount || 0), 0) || 0}
          </div>
          <p className="text-xs sm:text-sm text-warning-700 truncate font-semibold">Total Errors</p>
          <div className="w-full bg-warning-200 rounded-full h-1 mt-2">
            <div className="bg-warning-500 h-1 rounded-full w-1/4"></div>
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-integration-surface to-purple-50 rounded-xl border border-integration-border overflow-hidden min-w-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-integration-primary to-integration-secondary bg-clip-text text-transparent mb-1">
            {Math.round(filteredActivities?.reduce((sum, a) => sum + (a.successRate || 0), 0) / (filteredActivities?.length || 1) || 0)}%
          </div>
          <p className="text-xs sm:text-sm text-text-secondary truncate font-semibold">Avg Success Rate</p>
          <div className="w-full bg-integration-border rounded-full h-1 mt-2">
            <div className="bg-gradient-integration h-1 rounded-full w-5/6"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Recent Sync Activities */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Activity" size={18} className="text-integration-primary" />
          <h3 className="font-bold text-text-primary">Recent Synchronization Activities</h3>
        </div>
        
        <div className="max-h-80 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-integration-border scrollbar-track-integration-surface">
          {filteredActivities?.length === 0 ? (
            <div className="text-center py-12 text-text-secondary">
              <div className="p-4 bg-gradient-to-br from-integration-surface to-secondary-50 rounded-xl inline-block mb-4">
                <Icon name="Database" size={48} className="text-secondary-400" />
              </div>
              <p className="font-semibold">No sync activities found for the selected filters</p>
            </div>
          ) : (
            filteredActivities?.map((activity) => (
              <div key={activity.id} className="group p-5 border border-integration-border rounded-xl hover:shadow-glow hover:border-integration-primary transition-all duration-300 overflow-hidden bg-gradient-to-r from-surface to-integration-surface">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                  <div className="flex items-center space-x-4 min-w-0 flex-1">
                    <div className={`p-3 bg-gradient-to-br ${getSystemGradient(activity.system)} rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-200 flex-shrink-0`}>
                      <Icon name="Server" size={16} className="text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(activity.status)} group-hover:scale-105 transition-transform duration-200`}>
                          <Icon 
                            name={getStatusIcon(activity.status)} 
                            size={14} 
                            className={activity.status === 'running' ? 'animate-spin' : ''}
                          />
                          <span>{activity.system}</span>
                        </span>
                      </div>
                      <span className="text-text-primary font-bold truncate text-sm block">{activity.type}</span>
                    </div>
                  </div>
                  
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-integration-primary">
                      {formatTimeAgo(activity.lastUpdate)}
                    </div>
                    <div className="text-xs text-text-secondary">
                      Duration: {formatDuration(activity.duration)}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="min-w-0 p-3 bg-gradient-to-r from-success-50 to-emerald-50 rounded-lg border border-success-200">
                    <span className="text-success-700 font-semibold truncate inline-block w-full">Success Rate:</span>
                    <div className={`text-lg font-black mt-1 ${
                      activity.successRate >= 95 ? 'text-success-600' :
                      activity.successRate >= 85 ? 'text-warning-600' : 'text-error-600'
                    }`}>
                      {activity.successRate}%
                    </div>
                  </div>
                  <div className="min-w-0 p-3 bg-gradient-to-r from-info-50 to-blue-50 rounded-lg border border-info-200">
                    <span className="text-info-700 font-semibold truncate inline-block w-full">Records:</span>
                    <div className="text-lg font-black text-info-600 mt-1 truncate">
                      {activity.recordsProcessed?.toLocaleString()}
                    </div>
                  </div>
                  <div className="min-w-0 p-3 bg-gradient-to-r from-warning-50 to-orange-50 rounded-lg border border-warning-200">
                    <span className="text-warning-700 font-semibold truncate inline-block w-full">Errors:</span>
                    <div className={`text-lg font-black mt-1 ${
                      activity.errorCount === 0 ? 'text-success-600' :
                      activity.errorCount < 10 ? 'text-warning-600' : 'text-error-600'
                    }`}>
                      {activity.errorCount}
                    </div>
                  </div>
                </div>

                {/* Enhanced progress bar for running activities */}
                {activity.status === 'running' && (
                  <div className="mt-4">
                    <div className="w-full bg-gradient-to-r from-integration-border to-secondary-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-info-400 to-info-600 h-3 rounded-full transition-all duration-300 shadow-sm animate-pulse"
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-text-secondary mt-2">
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-info-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold">Processing...</span>
                      </span>
                      <span className="font-bold text-info-600">65% complete</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DataFlowMonitoring;