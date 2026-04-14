import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserProfilePanel = ({ selectedUser, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);

  useEffect(() => {
    if (selectedUser) {
      setEditedUser({ ...selectedUser });
      
      // Mock audit logs
      setAuditLogs([
        {
          id: 1,
          action: 'Login',
          timestamp: '2025-01-07 09:30:15',
          ipAddress: '192.168.1.45',
          userAgent: 'Chrome 120.0.0.0',
          status: 'success'
        },
        {
          id: 2,
          action: 'Password Changed',
          timestamp: '2025-01-05 14:22:33',
          ipAddress: '192.168.1.45',
          userAgent: 'Chrome 120.0.0.0',
          status: 'success'
        },
        {
          id: 3,
          action: 'Failed Login',
          timestamp: '2025-01-04 08:15:22',
          ipAddress: '203.0.113.42',
          userAgent: 'Firefox 121.0',
          status: 'failed'
        },
        {
          id: 4,
          action: 'Role Updated',
          timestamp: '2025-01-03 16:45:11',
          ipAddress: '192.168.1.10',
          userAgent: 'Chrome 120.0.0.0',
          status: 'success',
          details: 'Role changed from Analyst to Manager'
        },
        {
          id: 5,
          action: 'MFA Enabled',
          timestamp: '2025-01-02 10:30:45',
          ipAddress: '192.168.1.45',
          userAgent: 'Chrome 120.0.0.0',
          status: 'success'
        }
      ]);

      // Mock active sessions
      setActiveSessions([
        {
          id: 1,
          device: 'Desktop - Chrome',
          location: 'New York, NY',
          ipAddress: '192.168.1.45',
          lastActivity: '2025-01-07 10:45:22',
          isCurrent: true
        },
        {
          id: 2,
          device: 'Mobile - Safari',
          location: 'New York, NY',
          ipAddress: '192.168.1.46',
          lastActivity: '2025-01-07 08:30:15',
          isCurrent: false
        }
      ]);
    }
  }, [selectedUser]);

  const handleSave = () => {
    if (onUserUpdate) {
      onUserUpdate(editedUser);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...selectedUser });
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-error bg-error/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getActionColor = (action, status) => {
    if (status === 'failed') return 'text-error';
    if (action?.includes('Login')) return 'text-primary';
    if (action?.includes('Password') || action?.includes('MFA')) return 'text-warning';
    if (action?.includes('Role') || action?.includes('Permission')) return 'text-secondary';
    return 'text-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const permissionCategories = [
    {
      name: 'ESG Data',
      permissions: [
        { key: 'esg_read', label: 'View ESG Data', enabled: true },
        { key: 'esg_write', label: 'Edit ESG Data', enabled: true },
        { key: 'esg_delete', label: 'Delete ESG Data', enabled: false },
        { key: 'esg_export', label: 'Export ESG Data', enabled: true }
      ]
    },
    {
      name: 'Reporting',
      permissions: [
        { key: 'report_view', label: 'View Reports', enabled: true },
        { key: 'report_create', label: 'Create Reports', enabled: true },
        { key: 'report_publish', label: 'Publish Reports', enabled: false },
        { key: 'report_schedule', label: 'Schedule Reports', enabled: false }
      ]
    },
    {
      name: 'Administration',
      permissions: [
        { key: 'user_view', label: 'View Users', enabled: false },
        { key: 'user_manage', label: 'Manage Users', enabled: false },
        { key: 'system_config', label: 'System Configuration', enabled: false },
        { key: 'audit_access', label: 'Audit Trail Access', enabled: false }
      ]
    }
  ];

  if (!selectedUser) {
    return (
      <div className="h-full bg-card flex items-center justify-center">
        <div className="text-center">
          <Icon name="UserCircle" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">No User Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a user from the directory to view their profile and manage permissions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{selectedUser?.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Icon name="Edit" size={14} className="mr-1" />
                Edit
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Status and Quick Info */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedUser?.status)}`}>
              {selectedUser?.status}
            </span>
            <div className="text-xs text-muted-foreground mt-1">Status</div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              {selectedUser?.mfaEnabled ? 'Enabled' : 'Disabled'}
            </div>
            <div className="text-xs text-muted-foreground">MFA</div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              {selectedUser?.loginCount}
            </div>
            <div className="text-xs text-muted-foreground">Logins</div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {[
            { key: 'profile', label: 'Profile', icon: 'User' },
            { key: 'permissions', label: 'Permissions', icon: 'Shield' },
            { key: 'sessions', label: 'Sessions', icon: 'Monitor' },
            { key: 'audit', label: 'Audit Log', icon: 'FileText' }
          ]?.map((tab) => (
            <button
              key={tab?.key}
              onClick={() => setActiveTab(tab?.key)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-150 ${
                activeTab === tab?.key
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Username</label>
                <input
                  type="text"
                  value={editedUser?.username || ''}
                  onChange={(e) => setEditedUser(prev => ({ ...prev, username: e?.target?.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={editedUser?.name || ''}
                  onChange={(e) => setEditedUser(prev => ({ ...prev, name: e?.target?.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={editedUser?.email || ''}
                  onChange={(e) => setEditedUser(prev => ({ ...prev, email: e?.target?.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                <select
                  value={editedUser?.role || ''}
                  onChange={(e) => setEditedUser(prev => ({ ...prev, role: e?.target?.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="ESG Manager">ESG Manager</option>
                  <option value="Environmental Analyst">Environmental Analyst</option>
                  <option value="Sustainability Officer">Sustainability Officer</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="Facility Manager">Facility Manager</option>
                  <option value="Data Collector">Data Collector</option>
                  <option value="Finance Manager">Finance Manager</option>
                  <option value="Cost Analyst">Cost Analyst</option>
                  <option value="Compliance Officer">Compliance Officer</option>
                  <option value="System Admin">System Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                <select
                  value={editedUser?.department || ''}
                  onChange={(e) => setEditedUser(prev => ({ ...prev, department: e?.target?.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Sustainability">Sustainability</option>
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                  <option value="Compliance">Compliance</option>
                  <option value="IT Administration">IT Administration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={editedUser?.status || ''}
                  onChange={(e) => setEditedUser(prev => ({ ...prev, status: e?.target?.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-medium text-foreground mb-3">Account Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <span className="ml-2 text-foreground">{new Date(selectedUser.createdDate)?.toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Login:</span>
                  <span className="ml-2 text-foreground">{formatTimeAgo(selectedUser?.lastLogin)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Logins:</span>
                  <span className="ml-2 text-foreground">{selectedUser?.loginCount}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">MFA Status:</span>
                  <span className={`ml-2 ${selectedUser?.mfaEnabled ? 'text-success' : 'text-error'}`}>
                    {selectedUser?.mfaEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-6">
            {permissionCategories?.map((category) => (
              <div key={category?.name} className="border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">{category?.name}</h4>
                <div className="space-y-2">
                  {category?.permissions?.map((permission) => (
                    <div key={permission?.key} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{permission?.label}</span>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={permission?.enabled}
                          disabled={!isEditing}
                          className="rounded border-border"
                        />
                        {permission?.enabled ? (
                          <Icon name="Check" size={14} className="text-success" />
                        ) : (
                          <Icon name="X" size={14} className="text-error" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Active Sessions</h4>
              <Button variant="outline" size="sm">
                <Icon name="LogOut" size={14} className="mr-1" />
                End All Sessions
              </Button>
            </div>
            {activeSessions?.map((session) => (
              <div key={session?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Monitor" size={16} className="text-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {session?.device}
                        {session?.isCurrent && (
                          <span className="ml-2 px-2 py-0.5 bg-success/10 text-success text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {session?.location} • {session?.ipAddress}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-foreground">{formatTimeAgo(session?.lastActivity)}</div>
                    {!session?.isCurrent && (
                      <Button variant="ghost" size="sm" className="text-error hover:text-error">
                        End Session
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Recent Activity</h4>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={14} className="mr-1" />
                Export Log
              </Button>
            </div>
            <div className="space-y-2">
              {auditLogs?.map((log) => (
                <div key={log?.id} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        log?.status === 'success' ? 'bg-success' : 'bg-error'
                      }`} />
                      <div>
                        <div className={`text-sm font-medium ${getActionColor(log?.action, log?.status)}`}>
                          {log?.action}
                        </div>
                        {log?.details && (
                          <div className="text-xs text-muted-foreground">{log?.details}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <div>{formatTimeAgo(log?.timestamp)}</div>
                      <div>{log?.ipAddress}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePanel;