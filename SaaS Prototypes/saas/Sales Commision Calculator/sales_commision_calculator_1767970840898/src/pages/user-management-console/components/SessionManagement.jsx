// src/pages/user-management-console/components/SessionManagement.jsx
import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'components/AppIcon';
import { format } from 'date-fns';

const SessionManagement = ({ users }) => {
  const [activeSessions, setActiveSessions] = useState([]);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [showTerminateModal, setShowTerminateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'lastActivity', direction: 'desc' });

  // Generate mock session data
  useEffect(() => {
    const sessions = users.filter(user => user.status === 'active').map(user => ({
      id: `session_${user.id}_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      sessionId: `sess_${Math.random().toString(36).substring(2, 15)}`,
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      location: ['New York', 'San Francisco', 'Chicago', 'Austin', 'Seattle'][Math.floor(Math.random() * 5)],
      loginTime: new Date(Date.now() - Math.floor(Math.random() * 8 * 60 * 60 * 1000)),
      lastActivity: new Date(Date.now() - Math.floor(Math.random() * 30 * 60 * 1000)),
      status: Math.random() > 0.1 ? 'active' : 'idle',
      deviceType: ['Desktop', 'Mobile', 'Tablet'][Math.floor(Math.random() * 3)],
      suspicious: Math.random() > 0.9
    }));
    setActiveSessions(sessions);
  }, [users]);

  // Sort sessions
  const sortedSessions = React.useMemo(() => {
    if (!sortConfig.key) return activeSessions;

    return [...activeSessions].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'loginTime' || sortConfig.key === 'lastActivity') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [activeSessions, sortConfig]);

  // Filter sessions
  const filteredSessions = sortedSessions.filter(session => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'suspicious') return session.suspicious;
    return session.status === filterStatus;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSessionSelect = (sessionId) => {
    if (selectedSessions.includes(sessionId)) {
      setSelectedSessions(selectedSessions.filter(id => id !== sessionId));
    } else {
      setSelectedSessions([...selectedSessions, sessionId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedSessions.length === filteredSessions.length) {
      setSelectedSessions([]);
    } else {
      setSelectedSessions(filteredSessions.map(session => session.id));
    }
  };

  const handleTerminateSession = (sessionId) => {
    setActiveSessions(sessions => sessions.filter(session => session.id !== sessionId));
    setSelectedSessions(selected => selected.filter(id => id !== sessionId));
  };

  const handleBulkTerminate = () => {
    selectedSessions.forEach(sessionId => {
      handleTerminateSession(sessionId);
    });
    setShowTerminateModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'idle': return 'text-warning';
      case 'suspicious': return 'text-error';
      default: return 'text-secondary-600';
    }
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'Desktop': return 'Monitor';
      case 'Mobile': return 'Smartphone';
      case 'Tablet': return 'Tablet';
      default: return 'Monitor';
    }
  };

  const formatDuration = (loginTime) => {
    const now = new Date();
    const duration = now - new Date(loginTime);
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatLastActivity = (lastActivity) => {
    const now = new Date();
    const diff = now - new Date(lastActivity);
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    return format(new Date(lastActivity), 'MMM dd, HH:mm');
  };

  const isAllSelected = selectedSessions.length === filteredSessions.length && filteredSessions.length > 0;
  const isIndeterminate = selectedSessions.length > 0 && selectedSessions.length < filteredSessions.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Session Management</h2>
          <p className="text-text-secondary">Monitor active user sessions with remote logout capabilities for security incidents</p>
        </div>
        
        {selectedSessions.length > 0 && (
          <button
            onClick={() => setShowTerminateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-error text-white rounded-sm hover:bg-error-700 transition-smooth"
          >
            <Icon name="LogOut" size={16} />
            <span>Terminate Selected ({selectedSessions.length})</span>
          </button>
        )}
      </div>

      {/* Filters and Stats */}
      <div className="bg-secondary-50 p-4 rounded-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-text-primary">Filter:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Sessions</option>
                <option value="active">Active</option>
                <option value="idle">Idle</option>
                <option value="suspicious">Suspicious</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-success">{filteredSessions.filter(s => s.status === 'active').length}</div>
              <div className="text-xs text-text-secondary">Active</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-warning">{filteredSessions.filter(s => s.status === 'idle').length}</div>
              <div className="text-xs text-text-secondary">Idle</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-error">{filteredSessions.filter(s => s.suspicious).length}</div>
              <div className="text-xs text-text-secondary">Suspicious</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-surface border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="w-12 px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                    className="rounded border-border focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <Icon 
                      name={sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  IP Address
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                  onClick={() => handleSort('loginTime')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Duration</span>
                    <Icon 
                      name={sortConfig.key === 'loginTime' ? (sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                  onClick={() => handleSort('lastActivity')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Last Activity</span>
                    <Icon 
                      name={sortConfig.key === 'lastActivity' ? (sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSessions.map((session) => {
                const isSelected = selectedSessions.includes(session.id);
                return (
                  <tr 
                    key={session.id} 
                    className={`hover:bg-secondary-50 transition-smooth ${
                      isSelected ? 'bg-primary-50' : ''
                    } ${session.suspicious ? 'border-l-4 border-l-error' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSessionSelect(session.id)}
                        className="rounded border-border focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {session.userName?.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text-primary flex items-center space-x-2">
                            <span>{session.userName}</span>
                            {session.suspicious && (
                              <Icon name="AlertTriangle" size={14} className="text-error" title="Suspicious Activity" />
                            )}
                          </div>
                          <div className="text-xs text-text-secondary">{session.userEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          session.status === 'active' ? 'bg-success' : 
                          session.status === 'idle' ? 'bg-warning' : 'bg-error'
                        }`}></div>
                        <span className={`text-sm capitalize ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Icon name={getDeviceIcon(session.deviceType)} size={16} className="text-secondary-600" />
                        <span className="text-sm text-text-primary">{session.deviceType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-primary">
                      {session.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary font-mono">
                      {session.ipAddress}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-primary">
                      {formatDuration(session.loginTime)}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {formatLastActivity(session.lastActivity)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 text-secondary-600 hover:text-info transition-smooth"
                          title="View Details"
                        >
                          <Icon name="Eye" size={16} />
                        </button>
                        <button
                          onClick={() => handleTerminateSession(session.id)}
                          className="p-1 text-secondary-600 hover:text-error transition-smooth"
                          title="Terminate Session"
                        >
                          <Icon name="LogOut" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredSessions.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Monitor" size={48} className="mx-auto text-secondary-300 mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No active sessions</h3>
              <p className="text-text-secondary">No sessions match your current filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Terminate Confirmation Modal */}
      {showTerminateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300">
          <div className="bg-surface border border-border rounded-sm p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-error" />
              <h3 className="text-lg font-medium text-text-primary">Terminate Sessions</h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              Are you sure you want to terminate {selectedSessions.length} selected session{selectedSessions.length > 1 ? 's' : ''}? 
              Users will be logged out immediately and will need to sign in again.
            </p>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBulkTerminate}
                className="px-4 py-2 bg-error text-white rounded-sm hover:bg-error-700 transition-smooth"
              >
                Terminate Sessions
              </button>
              <button
                onClick={() => setShowTerminateModal(false)}
                className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-sm hover:bg-secondary-200 transition-smooth"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionManagement;