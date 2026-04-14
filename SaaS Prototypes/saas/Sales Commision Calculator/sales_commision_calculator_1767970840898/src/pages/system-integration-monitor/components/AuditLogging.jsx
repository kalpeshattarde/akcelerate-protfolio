// src/pages/system-integration-monitor/components/AuditLogging.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AuditLogging = ({ auditEvents, onExportLogs, userRole }) => {
  const [filterPeriod, setFilterPeriod] = useState('24h');
  const [filterAction, setFilterAction] = useState('all');
  const [filterSystem, setFilterSystem] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const periodFilters = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const actionFilters = [
    { value: 'all', label: 'All Actions' },
    { value: 'Automatic sync initiated', label: 'Auto Sync' },
    { value: 'Manual sync triggered', label: 'Manual Sync' },
    { value: 'Configuration updated', label: 'Config Change' },
    { value: 'Connection established', label: 'Connection' },
    { value: 'Error resolved', label: 'Error Resolution' }
  ];

  const systemFilters = [
    { value: 'all', label: 'All Systems' },
    { value: 'HRIS', label: 'HRIS' },
    { value: 'CRM', label: 'CRM' },
    { value: 'Payroll', label: 'Payroll' },
    { value: 'Identity Provider', label: 'Identity Provider' },
    { value: 'system', label: 'System' }
  ];

  const getActionIcon = (action) => {
    if (action.includes('sync')) return 'RefreshCw';
    if (action.includes('Configuration')) return 'Settings';
    if (action.includes('Connection')) return 'Link';
    if (action.includes('Error')) return 'AlertTriangle';
    if (action.includes('User')) return 'User';
    return 'Activity';
  };

  const getActionColor = (action) => {
    if (action.includes('Error') || action.includes('failed')) return 'text-error';
    if (action.includes('Warning') || action.includes('timeout')) return 'text-warning';
    if (action.includes('sync') || action.includes('Connection')) return 'text-success';
    if (action.includes('Configuration')) return 'text-info';
    return 'text-text-primary';
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

  const filteredEvents = auditEvents?.filter(event => {
    if (filterAction !== 'all' && !event.action.includes(filterAction)) {
      return false;
    }
    if (filterSystem !== 'all' && event.system !== filterSystem) {
      return false;
    }
    if (searchTerm && !(
      event.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    )) {
      return false;
    }
    return true;
  });

  const handleSelectEvent = (eventId) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEvents(filteredEvents?.map(event => event.id) || []);
  };

  const handleClearSelection = () => {
    setSelectedEvents([]);
  };

  const handleExportSelected = () => {
    const selectedEventData = filteredEvents?.filter(event => 
      selectedEvents.includes(event.id)
    );
    onExportLogs?.(selectedEventData);
  };

  const getDetailedEventInfo = (event) => {
    return {
      'Event ID': event.id,
      'Transaction ID': event.transactionId,
      'Timestamp': new Date(event.timestamp).toISOString(),
      'User': event.user,
      'Action': event.action,
      'System': event.system,
      'Details': event.details,
      'IP Address': '192.168.1.100', // Mock data
      'User Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', // Mock data
      'Session ID': 'SES-' + Math.random().toString(36).substr(2, 9) // Mock data
    };
  };

  return (
    <div className="bg-surface border border-border rounded-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Audit Logging</h2>
        <div className="flex items-center space-x-3">
          {selectedEvents.length > 0 && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-info-50 border border-info-200 rounded-sm">
              <Icon name="CheckSquare" size={16} className="text-info" />
              <span className="text-sm font-medium text-info">
                {selectedEvents.length} selected
              </span>
            </div>
          )}
          
          <button
            onClick={selectedEvents.length > 0 ? handleExportSelected : () => onExportLogs?.(filteredEvents)}
            className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
          >
            <Icon name="Download" size={16} />
            <span>{selectedEvents.length > 0 ? 'Export Selected' : 'Export All'}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
          />
        </div>
        
        <select
          value={filterPeriod}
          onChange={(e) => setFilterPeriod(e.target.value)}
          className="px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
        >
          {periodFilters.map(filter => (
            <option key={filter.value} value={filter.value}>{filter.label}</option>
          ))}
        </select>
        
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
        >
          {actionFilters.map(filter => (
            <option key={filter.value} value={filter.value}>{filter.label}</option>
          ))}
        </select>
        
        <select
          value={filterSystem}
          onChange={(e) => setFilterSystem(e.target.value)}
          className="px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
        >
          {systemFilters.map(filter => (
            <option key={filter.value} value={filter.value}>{filter.label}</option>
          ))}
        </select>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSelectAll}
            className="text-sm text-primary hover:text-primary-700 transition-smooth"
          >
            Select All
          </button>
          {selectedEvents.length > 0 && (
            <button
              onClick={handleClearSelection}
              className="text-sm text-text-secondary hover:text-text-primary transition-smooth"
            >
              Clear Selection
            </button>
          )}
        </div>
        
        <div className="text-sm text-text-secondary">
          Showing {filteredEvents?.length || 0} of {auditEvents?.length || 0} events
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents?.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="FileText" size={48} className="mx-auto mb-3 text-secondary-400" />
            <p>No audit events found for the selected filters</p>
          </div>
        ) : (
          filteredEvents?.map((event) => (
            <div key={event.id} className="border border-border rounded-sm p-4 hover:bg-secondary-50 transition-smooth">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event.id)}
                    onChange={() => handleSelectEvent(event.id)}
                    className="mt-1 rounded border-border"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`flex items-center space-x-2 ${getActionColor(event.action)}`}>
                        <Icon name={getActionIcon(event.action)} size={16} />
                        <span className="font-medium">{event.action}</span>
                      </div>
                      
                      <span className="text-xs px-2 py-1 bg-secondary-100 text-secondary-600 rounded">
                        {event.system}
                      </span>
                      
                      <span className="text-xs text-text-secondary">
                        {formatTimeAgo(event.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-text-primary mb-2">{event.details}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span>User: {event.user}</span>
                      <span>•</span>
                      <span>TXN: {event.transactionId}</span>
                      <span>•</span>
                      <span>{new Date(event.timestamp).toLocaleString()}</span>
                    </div>
                    
                    {expandedEvent === event.id && (
                      <div className="mt-4 p-3 bg-surface border border-border rounded-sm">
                        <h4 className="font-medium text-text-primary mb-3">Event Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {Object.entries(getDetailedEventInfo(event)).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-text-secondary">{key}:</span>
                              <span className="ml-2 font-medium text-text-primary">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                  className="p-2 hover:bg-surface rounded-sm transition-smooth ml-4"
                  title="View details"
                >
                  <Icon 
                    name={expandedEvent === event.id ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                    className="text-text-secondary" 
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredEvents?.length > 20 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-text-secondary">
            Showing 1-20 of {filteredEvents.length} events
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-border rounded-sm hover:bg-secondary-50 transition-smooth">
              <Icon name="ChevronLeft" size={16} className="text-text-secondary" />
            </button>
            <span className="px-3 py-2 bg-primary text-white rounded-sm text-sm">1</span>
            <button className="px-3 py-2 border border-border rounded-sm hover:bg-secondary-50 transition-smooth text-sm">
              2
            </button>
            <button className="px-3 py-2 border border-border rounded-sm hover:bg-secondary-50 transition-smooth text-sm">
              3
            </button>
            <button className="p-2 border border-border rounded-sm hover:bg-secondary-50 transition-smooth">
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>
      )}

      {/* Compliance Notice */}
      <div className="mt-6 p-4 bg-info-50 border border-info-200 rounded-sm">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-info" />
          <span className="text-sm text-info font-medium">
            Audit logs are retained for compliance purposes and cannot be modified
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuditLogging;