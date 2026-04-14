import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecurityManagementTab = () => {
  const [activeSection, setActiveSection] = useState('policies');
  const [showSessionModal, setShowSessionModal] = useState(false);

  const securitySections = [
    { id: 'policies', label: 'Security Policies', icon: 'Shield' },
    { id: 'sessions', label: 'Session Management', icon: 'Clock' },
    { id: 'authentication', label: 'Authentication', icon: 'Key' },
    { id: 'permissions', label: 'Access Control', icon: 'Lock' },
    { id: 'monitoring', label: 'Security Monitoring', icon: 'Eye' }
  ];

  const activeSessions = [
    {
      id: 1,
      user: "John Doe",
      email: "john.doe@company.com",
      ipAddress: "192.168.1.100",
      location: "New York, US",
      device: "Windows 10 - Chrome",
      loginTime: "2025-01-04 07:30:00",
      lastActivity: "2025-01-04 07:45:00",
      status: "Active"
    },
    {
      id: 2,
      user: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      ipAddress: "192.168.1.105",
      location: "Los Angeles, US",
      device: "macOS - Safari",
      loginTime: "2025-01-04 06:15:00",
      lastActivity: "2025-01-04 07:42:00",
      status: "Active"
    },
    {
      id: 3,
      user: "Michael Chen",
      email: "michael.chen@company.com",
      ipAddress: "192.168.1.110",
      location: "Chicago, US",
      device: "Windows 11 - Edge",
      loginTime: "2025-01-04 05:45:00",
      lastActivity: "2025-01-04 07:20:00",
      status: "Idle"
    }
  ];

  const securityAlerts = [
    {
      id: 1,
      type: "Failed Login Attempt",
      severity: "High",
      user: "Unknown",
      ipAddress: "203.0.113.45",
      timestamp: "2025-01-04 07:40:00",
      details: "Multiple failed login attempts from suspicious IP",
      status: "Active"
    },
    {
      id: 2,
      type: "Unusual Access Pattern",
      severity: "Medium",
      user: "Michael Chen",
      ipAddress: "192.168.1.110",
      timestamp: "2025-01-04 07:25:00",
      details: "Access from new device without 2FA verification",
      status: "Investigating"
    },
    {
      id: 3,
      type: "Permission Escalation",
      severity: "Critical",
      user: "System Admin",
      ipAddress: "192.168.1.1",
      timestamp: "2025-01-04 07:15:00",
      details: "Unauthorized attempt to modify admin permissions",
      status: "Resolved"
    }
  ];

  const passwordPolicies = {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventReuse: 5,
    expirationDays: 90,
    lockoutAttempts: 5,
    lockoutDuration: 30
  };

  const handleTerminateSession = (sessionId) => {
    console.log('Terminating session:', sessionId);
  };

  const handleResolveAlert = (alertId) => {
    console.log('Resolving alert:', alertId);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'text-error bg-error/10';
      case 'High':
        return 'text-warning bg-warning/10';
      case 'Medium':
        return 'text-accent bg-accent/10';
      case 'Low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const renderSecurityPolicies = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">Password Policy</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Minimum Length"
                type="number"
                value={passwordPolicies?.minLength}
                onChange={() => {}}
              />
              <Input
                label="Expiration (days)"
                type="number"
                value={passwordPolicies?.expirationDays}
                onChange={() => {}}
              />
            </div>
            <div className="space-y-3">
              <Checkbox
                label="Require uppercase letters"
                checked={passwordPolicies?.requireUppercase}
                onChange={() => {}}
              />
              <Checkbox
                label="Require lowercase letters"
                checked={passwordPolicies?.requireLowercase}
                onChange={() => {}}
              />
              <Checkbox
                label="Require numbers"
                checked={passwordPolicies?.requireNumbers}
                onChange={() => {}}
              />
              <Checkbox
                label="Require special characters"
                checked={passwordPolicies?.requireSpecialChars}
                onChange={() => {}}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Prevent reuse (last N passwords)"
                type="number"
                value={passwordPolicies?.preventReuse}
                onChange={() => {}}
              />
              <Input
                label="Lockout after attempts"
                type="number"
                value={passwordPolicies?.lockoutAttempts}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">Session Security</h3>
          <div className="space-y-4">
            <Input
              label="Session Timeout (minutes)"
              type="number"
              defaultValue="30"
            />
            <Input
              label="Idle Timeout (minutes)"
              type="number"
              defaultValue="15"
            />
            <div className="space-y-3">
              <Checkbox
                label="Force logout on browser close"
                checked
                onChange={() => {}}
              />
              <Checkbox
                label="Require re-authentication for sensitive actions"
                checked
                onChange={() => {}}
              />
              <Checkbox
                label="Log all session activities"
                checked
                onChange={() => {}}
              />
              <Checkbox
                label="Block concurrent sessions"
               
                onChange={() => {}}
              />
            </div>
            <Select
              label="Maximum concurrent sessions per user"
              options={[
                { value: '1', label: '1 session' },
                { value: '3', label: '3 sessions' },
                { value: '5', label: '5 sessions' },
                { value: 'unlimited', label: 'Unlimited' }
              ]}
              value="3"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSessionManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-text-primary">Active Sessions</h3>
          <p className="text-sm text-muted-foreground">Monitor and manage user sessions</p>
        </div>
        <Button
          variant="outline"
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh
        </Button>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-text-primary">User</th>
              <th className="text-left p-4 font-medium text-text-primary">Device & Location</th>
              <th className="text-left p-4 font-medium text-text-primary">Login Time</th>
              <th className="text-left p-4 font-medium text-text-primary">Last Activity</th>
              <th className="text-left p-4 font-medium text-text-primary">Status</th>
              <th className="text-right p-4 font-medium text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeSessions?.map((session) => (
              <tr key={session?.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-4">
                  <div>
                    <div className="font-medium text-text-primary">{session?.user}</div>
                    <div className="text-sm text-muted-foreground">{session?.email}</div>
                    <div className="text-xs text-muted-foreground">{session?.ipAddress}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="text-sm text-text-primary">{session?.device}</div>
                    <div className="text-xs text-muted-foreground">{session?.location}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary">
                    {new Date(session.loginTime)?.toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(session.loginTime)?.toLocaleTimeString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary">
                    {new Date(session.lastActivity)?.toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(session.lastActivity)?.toLocaleTimeString()}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    session?.status === 'Active' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      session?.status === 'Active' ? 'bg-success' : 'bg-warning'
                    }`} />
                    {session?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => handleTerminateSession(session?.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSecurityMonitoring = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-text-primary">Security Alerts</h3>
          <p className="text-sm text-muted-foreground">Monitor security events and threats</p>
        </div>
        <Button
          variant="outline"
          iconName="Settings"
          iconPosition="left"
        >
          Configure Alerts
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">
                {securityAlerts?.filter(alert => alert?.status === 'Active')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-warning" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">
                {securityAlerts?.filter(alert => alert?.severity === 'Critical')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Critical Events</div>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">
                {securityAlerts?.filter(alert => alert?.status === 'Resolved')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Resolved Today</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-text-primary">Alert Type</th>
              <th className="text-left p-4 font-medium text-text-primary">Severity</th>
              <th className="text-left p-4 font-medium text-text-primary">User/IP</th>
              <th className="text-left p-4 font-medium text-text-primary">Timestamp</th>
              <th className="text-left p-4 font-medium text-text-primary">Status</th>
              <th className="text-right p-4 font-medium text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {securityAlerts?.map((alert) => (
              <tr key={alert?.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-4">
                  <div>
                    <div className="font-medium text-text-primary">{alert?.type}</div>
                    <div className="text-xs text-muted-foreground">{alert?.details}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
                    {alert?.severity}
                  </span>
                </td>
                <td className="p-4">
                  <div>
                    <div className="text-sm text-text-primary">{alert?.user}</div>
                    <div className="text-xs text-muted-foreground">{alert?.ipAddress}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary">
                    {new Date(alert.timestamp)?.toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp)?.toLocaleTimeString()}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    alert?.status === 'Active' ?'bg-error/10 text-error' 
                      : alert?.status === 'Investigating' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                  }`}>
                    {alert?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="CheckCircle"
                      onClick={() => handleResolveAlert(alert?.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'policies':
        return renderSecurityPolicies();
      case 'sessions':
        return renderSessionManagement();
      case 'monitoring':
        return renderSecurityMonitoring();
      case 'authentication':
        return (
          <div className="text-center py-12">
            <Icon name="Key" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">Authentication Settings</h3>
            <p className="text-muted-foreground">Configure SSO, MFA, and authentication policies</p>
          </div>
        );
      case 'permissions':
        return (
          <div className="text-center py-12">
            <Icon name="Lock" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">Access Control</h3>
            <p className="text-muted-foreground">Manage role-based permissions and access policies</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-surface border-r border-border">
        <div className="p-4">
          <h3 className="text-sm font-medium text-text-primary mb-4">Security Management</h3>
          <nav className="space-y-1">
            {securitySections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-smooth ${
                  activeSection === section?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default SecurityManagementTab;