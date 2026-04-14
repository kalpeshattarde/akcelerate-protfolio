import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const AuditTrailPanel = ({ onClose }) => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock audit trail data
  const mockAuditLogs = [
    {
      id: 'AUD-001',
      timestamp: new Date('2024-02-05T16:20:00'),
      action: 'scenario_created',
      user: 'Robert Kim',
      userRole: 'Compensation Analyst',
      scenarioId: 'SCN-006',
      scenarioName: 'Mid-Year Adjustment Plan',
      details: 'Created new scenario with 42 affected representatives and $3.15M total payout',
      changes: {
        spifPercentage: { from: null, to: 4.2 },
        acceleratorRate: { from: null, to: 1.9 },
        bonusMultiplier: { from: null, to: 1.4 }
      },
      ipAddress: '192.168.1.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'AUD-002',
      timestamp: new Date('2024-02-02T09:10:00'),
      action: 'scenario_modified',
      user: 'Amanda Foster',
      userRole: 'Customer Success Director',
      scenarioId: 'SCN-005',
      scenarioName: 'Customer Retention Focus',
      details: 'Updated modifier values and affected representative count',
      changes: {
        spifPercentage: { from: 5.5, to: 6.0 },
        affectedRepCount: { from: 15, to: 18 }
      },
      ipAddress: '192.168.1.32',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: 'AUD-003',
      timestamp: new Date('2024-02-01T10:30:00'),
      action: 'scenario_approved',
      user: 'Sarah Johnson',
      userRole: 'Finance Manager',
      scenarioId: 'SCN-004',
      scenarioName: 'Product Launch Incentive',
      details: 'Approved scenario for implementation with 35 affected representatives',
      changes: {
        status: { from: 'pending', to: 'approved' }
      },
      ipAddress: '192.168.1.28',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'AUD-004',
      timestamp: new Date('2024-01-30T15:45:00'),
      action: 'scenario_modified',
      user: 'James Thompson',
      userRole: 'Product Marketing Manager',
      scenarioId: 'SCN-004',
      scenarioName: 'Product Launch Incentive',
      details: 'Adjusted bonus multiplier based on market analysis feedback',
      changes: {
        bonusMultiplier: { from: 1.5, to: 1.6 },
        description: { from: 'Initial product launch incentive...', to: 'Comprehensive incentive program...' }
      },
      ipAddress: '192.168.1.41',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: 'AUD-005',
      timestamp: new Date('2024-01-28T13:30:00'),
      action: 'scenario_modified',
      user: 'Lisa Wang',
      userRole: 'VP Sales Operations',
      scenarioId: 'SCN-003',
      scenarioName: 'Territory Expansion Bonus',
      details: 'Updated SPIF percentage and accelerator rate for territory expansion',
      changes: {
        spifPercentage: { from: 6.8, to: 7.2 },
        acceleratorRate: { from: 2.5, to: 2.8 }
      },
      ipAddress: '192.168.1.15',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'AUD-006',
      timestamp: new Date('2024-01-25T11:20:00'),
      action: 'scenario_modified',
      user: 'David Rodriguez',
      userRole: 'Sales Director',
      scenarioId: 'SCN-002',
      scenarioName: 'New Hire Ramp Plan',
      details: 'Increased affected representative count for Q1 new hires',
      changes: {
        affectedRepCount: { from: 6, to: 8 },
        totalProjectedPayout: { from: 360000, to: 480000 }
      },
      ipAddress: '192.168.1.22',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: 'AUD-007',
      timestamp: new Date('2024-01-22T09:15:00'),
      action: 'scenario_approved',
      user: 'Michael Chen',
      userRole: 'CFO',
      scenarioId: 'SCN-001',
      scenarioName: 'Q4 Accelerated Commission Plan',
      details: 'Final approval granted for Q4 accelerated commission structure',
      changes: {
        status: { from: 'pending', to: 'approved' },
        approvedBy: { from: null, to: 'Michael Chen' }
      },
      ipAddress: '192.168.1.10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'AUD-008',
      timestamp: new Date('2024-01-20T14:45:00'),
      action: 'scenario_modified',
      user: 'Sarah Johnson',
      userRole: 'Finance Manager',
      scenarioId: 'SCN-001',
      scenarioName: 'Q4 Accelerated Commission Plan',
      details: 'Final adjustments before approval submission',
      changes: {
        acceleratorRate: { from: 2.0, to: 2.2 },
        bonusMultiplier: { from: 1.7, to: 1.8 }
      },
      ipAddress: '192.168.1.28',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  ];

  useEffect(() => {
    setAuditLogs(mockAuditLogs);
  }, []);

  const filterOptions = [
    { value: 'all', label: 'All Actions' },
    { value: 'scenario_created', label: 'Created' },
    { value: 'scenario_modified', label: 'Modified' },
    { value: 'scenario_approved', label: 'Approved' },
    { value: 'scenario_archived', label: 'Archived' },
    { value: 'scenario_deleted', label: 'Deleted' }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesFilter = filter === 'all' || log.action === filter;
    const matchesSearch = !searchQuery || 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.scenarioName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'scenario_created': return 'Plus';
      case 'scenario_modified': return 'Edit';
      case 'scenario_approved': return 'CheckCircle';
      case 'scenario_archived': return 'Archive';
      case 'scenario_deleted': return 'Trash2';
      default: return 'Activity';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'scenario_created': return 'text-success';
      case 'scenario_modified': return 'text-primary';
      case 'scenario_approved': return 'text-accent';
      case 'scenario_archived': return 'text-warning';
      case 'scenario_deleted': return 'text-error';
      default: return 'text-secondary-600';
    }
  };

  const formatActionLabel = (action) => {
    return action.replace('scenario_', '').replace('_', ' ').toUpperCase();
  };

  const formatChangeValue = (value) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div className="bg-surface border border-border rounded-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-medium text-text-primary">Audit Trail</h3>
          <p className="text-sm text-text-secondary">System activity log</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-secondary-100 rounded-sm transition-smooth"
        >
          <Icon name="X" size={16} className="text-secondary-600" />
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-border space-y-3">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Filter by Action
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Search
          </label>
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
            <input
              type="text"
              placeholder="Search user, scenario, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {/* Audit Log List */}
      <div className="flex-1 overflow-y-auto">
        {filteredLogs.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-secondary-50 transition-smooth">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-secondary-100 ${getActionColor(log.action)}`}>
                    <Icon name={getActionIcon(log.action)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded-sm ${getActionColor(log.action)} bg-opacity-10`}>
                        {formatActionLabel(log.action)}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                    
                    <div className="mb-2">
                      <p className="text-sm font-medium text-text-primary">{log.user}</p>
                      <p className="text-xs text-text-secondary">{log.userRole}</p>
                    </div>
                    
                    <div className="mb-2">
                      <p className="text-sm text-text-primary">{log.scenarioName}</p>
                      <p className="text-xs text-text-secondary">{log.scenarioId}</p>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-2">{log.details}</p>
                    
                    {/* Changes Details */}
                    {log.changes && Object.keys(log.changes).length > 0 && (
                      <div className="bg-secondary-50 rounded-sm p-2 mt-2">
                        <p className="text-xs font-medium text-text-primary mb-1">Changes:</p>
                        <div className="space-y-1">
                          {Object.entries(log.changes).map(([key, change]) => (
                            <div key={key} className="text-xs">
                              <span className="font-medium text-text-primary">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                              </span>
                              {change.from !== null && (
                                <span className="text-error ml-1">
                                  {formatChangeValue(change.from)}
                                </span>
                              )}
                              <Icon name="ArrowRight" size={12} className="inline mx-1 text-secondary-400" />
                              <span className="text-success">
                                {formatChangeValue(change.to)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Technical Details */}
                    <div className="mt-2 pt-2 border-t border-border">
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <span>IP: {log.ipAddress}</span>
                        <span>ID: {log.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="FileText" size={32} className="mx-auto text-secondary-300 mb-2" />
            <p className="text-sm text-text-secondary">No audit logs found</p>
            <p className="text-xs text-text-secondary mt-1">
              Try adjusting your filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-secondary-50">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>{filteredLogs.length} of {auditLogs.length} entries</span>
          <span>Last updated: {formatTimestamp(new Date())}</span>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailPanel;