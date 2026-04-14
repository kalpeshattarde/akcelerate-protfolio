import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AlertManagement = () => {
  const [alerts, setAlerts] = useState([]);
  const [alertRules, setAlertRules] = useState([]);
  const [showCreateRule, setShowCreateRule] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [newRule, setNewRule] = useState({
    name: '',
    metric: 'cpu-usage',
    condition: 'greater-than',
    threshold: '',
    duration: '5',
    severity: 'warning',
    enabled: true,
    notifications: {
      email: true,
      slack: false,
      sms: false
    }
  });

  useEffect(() => {
    // Mock active alerts
    const mockAlerts = [
      {
        id: 1,
        title: 'High CPU Usage',
        message: 'CPU usage has exceeded 85% for more than 10 minutes',
        severity: 'error',
        timestamp: '2025-01-07T04:35:00Z',
        status: 'active',
        metric: 'cpu-usage',
        value: 87.3,
        threshold: 85,
        source: 'system-monitor'
      },
      {
        id: 2,
        title: 'API Response Time Alert',
        message: 'Average API response time is above normal levels',
        severity: 'warning',
        timestamp: '2025-01-07T04:20:00Z',
        status: 'acknowledged',
        metric: 'response-time',
        value: 125,
        threshold: 100,
        source: 'api-gateway'
      },
      {
        id: 3,
        title: 'Failed Login Attempts',
        message: 'Multiple failed login attempts detected from IP 192.168.1.100',
        severity: 'error',
        timestamp: '2025-01-07T04:10:00Z',
        status: 'resolved',
        metric: 'security-events',
        value: 15,
        threshold: 10,
        source: 'security-monitor'
      },
      {
        id: 4,
        title: 'Low Disk Space',
        message: 'Available disk space is below 20%',
        severity: 'warning',
        timestamp: '2025-01-07T03:45:00Z',
        status: 'active',
        metric: 'disk-usage',
        value: 82,
        threshold: 80,
        source: 'system-monitor'
      }
    ];

    // Mock alert rules
    const mockRules = [
      {
        id: 1,
        name: 'High CPU Usage',
        metric: 'cpu-usage',
        condition: 'greater-than',
        threshold: 85,
        duration: 10,
        severity: 'error',
        enabled: true,
        notifications: { email: true, slack: true, sms: false },
        lastTriggered: '2025-01-07T04:35:00Z'
      },
      {
        id: 2,
        name: 'API Response Time',
        metric: 'response-time',
        condition: 'greater-than',
        threshold: 100,
        duration: 5,
        severity: 'warning',
        enabled: true,
        notifications: { email: true, slack: false, sms: false },
        lastTriggered: '2025-01-07T04:20:00Z'
      },
      {
        id: 3,
        name: 'Memory Usage Alert',
        metric: 'memory-usage',
        condition: 'greater-than',
        threshold: 90,
        duration: 15,
        severity: 'error',
        enabled: false,
        notifications: { email: true, slack: true, sms: true },
        lastTriggered: null
      }
    ];

    setAlerts(mockAlerts);
    setAlertRules(mockRules);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'error': return 'bg-error/10';
      case 'warning': return 'bg-warning/10';
      case 'info': return 'bg-primary/10';
      default: return 'bg-muted/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-error';
      case 'acknowledged': return 'text-warning';
      case 'resolved': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'AlertCircle';
      case 'acknowledged': return 'Clock';
      case 'resolved': return 'CheckCircle';
      default: return 'Circle';
    }
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

  const handleAlertAction = (alertId, action) => {
    setAlerts(prev => prev?.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: action }
        : alert
    ));
  };

  const handleCreateRule = () => {
    const rule = {
      id: alertRules?.length + 1,
      ...newRule,
      threshold: parseFloat(newRule?.threshold),
      duration: parseInt(newRule?.duration),
      lastTriggered: null
    };
    
    setAlertRules(prev => [...prev, rule]);
    setNewRule({
      name: '',
      metric: 'cpu-usage',
      condition: 'greater-than',
      threshold: '',
      duration: '5',
      severity: 'warning',
      enabled: true,
      notifications: { email: true, slack: false, sms: false }
    });
    setShowCreateRule(false);
  };

  const toggleRuleStatus = (ruleId) => {
    setAlertRules(prev => prev?.map(rule => 
      rule?.id === ruleId 
        ? { ...rule, enabled: !rule?.enabled }
        : rule
    ));
  };

  const metricOptions = [
    { value: 'cpu-usage', label: 'CPU Usage' },
    { value: 'memory-usage', label: 'Memory Usage' },
    { value: 'disk-usage', label: 'Disk Usage' },
    { value: 'response-time', label: 'Response Time' },
    { value: 'error-rate', label: 'Error Rate' },
    { value: 'security-events', label: 'Security Events' }
  ];

  const conditionOptions = [
    { value: 'greater-than', label: 'Greater Than' },
    { value: 'less-than', label: 'Less Than' },
    { value: 'equals', label: 'Equals' }
  ];

  const severityOptions = [
    { value: 'info', label: 'Info' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' }
  ];

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertCircle" size={20} className="text-error" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {alerts?.filter(a => a?.status === 'active')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {alerts?.filter(a => a?.status === 'acknowledged')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Acknowledged</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {alerts?.filter(a => a?.status === 'resolved')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {alertRules?.filter(r => r?.enabled)?.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Rules</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Recent Alerts</h3>
              <Button variant="outline" size="sm">
                <Icon name="RefreshCw" size={14} className="mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          <div className="divide-y divide-border max-h-96 overflow-y-auto">
            {alerts?.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-muted/50 transition-colors duration-150">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 ${getSeverityBg(alert.severity)} rounded-lg flex items-center justify-center`}>
                      <Icon 
                        name={getStatusIcon(alert.status)} 
                        size={16} 
                        className={getStatusColor(alert.status)}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>{formatTimeAgo(alert.timestamp)}</span>
                        <span>•</span>
                        <span className={getSeverityColor(alert.severity)}>
                          {alert.severity?.toUpperCase()}
                        </span>
                        <span>•</span>
                        <span>{alert.source}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {alert.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAlertAction(alert.id, 'acknowledged')}
                      >
                        Acknowledge
                      </Button>
                    )}
                    {alert.status !== 'resolved' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAlertAction(alert.id, 'resolved')}
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Rules */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Alert Rules</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowCreateRule(true)}
              >
                <Icon name="Plus" size={14} className="mr-2" />
                Add Rule
              </Button>
            </div>
          </div>

          <div className="divide-y divide-border max-h-96 overflow-y-auto">
            {alertRules?.map((rule) => (
              <div key={rule?.id} className="p-4 hover:bg-muted/50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${getSeverityBg(rule?.severity)} rounded-lg flex items-center justify-center`}>
                      <Icon 
                        name={rule?.enabled ? "CheckCircle" : "Circle"} 
                        size={14} 
                        className={rule?.enabled ? getSeverityColor(rule?.severity) : 'text-muted-foreground'}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{rule?.name}</h4>
                      <div className="text-sm text-muted-foreground">
                        {rule?.metric?.replace('-', ' ')} {rule?.condition?.replace('-', ' ')} {rule?.threshold}
                        {rule?.metric?.includes('usage') ? '%' : rule?.metric === 'response-time' ? 'ms' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRuleStatus(rule?.id)}
                      className={rule?.enabled ? 'text-success' : 'text-muted-foreground'}
                    >
                      {rule?.enabled ? 'Enabled' : 'Disabled'}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="Settings" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Create Rule Modal */}
      {showCreateRule && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Create Alert Rule</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCreateRule(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              <Input
                label="Rule Name"
                value={newRule?.name}
                onChange={(e) => setNewRule(prev => ({ ...prev, name: e?.target?.value }))}
                placeholder="Enter rule name"
              />

              <Select
                label="Metric"
                options={metricOptions}
                value={newRule?.metric}
                onChange={(value) => setNewRule(prev => ({ ...prev, metric: value }))}
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Condition"
                  options={conditionOptions}
                  value={newRule?.condition}
                  onChange={(value) => setNewRule(prev => ({ ...prev, condition: value }))}
                />
                <Input
                  label="Threshold"
                  type="number"
                  value={newRule?.threshold}
                  onChange={(e) => setNewRule(prev => ({ ...prev, threshold: e?.target?.value }))}
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Duration (minutes)"
                  type="number"
                  value={newRule?.duration}
                  onChange={(e) => setNewRule(prev => ({ ...prev, duration: e?.target?.value }))}
                  min="1"
                />
                <Select
                  label="Severity"
                  options={severityOptions}
                  value={newRule?.severity}
                  onChange={(value) => setNewRule(prev => ({ ...prev, severity: value }))}
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Notifications</div>
                <div className="space-y-2">
                  <Checkbox
                    label="Email"
                    checked={newRule?.notifications?.email}
                    onChange={(e) => setNewRule(prev => ({
                      ...prev,
                      notifications: { ...prev?.notifications, email: e?.target?.checked }
                    }))}
                  />
                  <Checkbox
                    label="Slack"
                    checked={newRule?.notifications?.slack}
                    onChange={(e) => setNewRule(prev => ({
                      ...prev,
                      notifications: { ...prev?.notifications, slack: e?.target?.checked }
                    }))}
                  />
                  <Checkbox
                    label="SMS"
                    checked={newRule?.notifications?.sms}
                    onChange={(e) => setNewRule(prev => ({
                      ...prev,
                      notifications: { ...prev?.notifications, sms: e?.target?.checked }
                    }))}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateRule(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRule} disabled={!newRule?.name || !newRule?.threshold}>
                Create Rule
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertManagement;