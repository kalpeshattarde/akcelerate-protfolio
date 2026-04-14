import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsConfiguration = ({ loading = false }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: 'High CPU Usage',
      metric: 'cpu',
      condition: 'greater_than',
      threshold: 80,
      enabled: true,
      recipients: ['admin@company.com'],
      lastTriggered: '2025-08-23 15:30'
    },
    {
      id: 2,
      name: 'Low Connection Quality',
      metric: 'connection_quality',
      condition: 'less_than',
      threshold: 70,
      enabled: true,
      recipients: ['support@company.com'],
      lastTriggered: null
    },
    {
      id: 3,
      name: 'Meeting Capacity Warning',
      metric: 'concurrent_meetings',
      condition: 'greater_than',
      threshold: 50,
      enabled: false,
      recipients: ['admin@company.com', 'manager@company.com'],
      lastTriggered: '2025-08-22 09:15'
    }
  ]);

  const [showAddAlert, setShowAddAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    name: '',
    metric: 'cpu',
    condition: 'greater_than',
    threshold: '',
    recipients: ['']
  });

  const metricOptions = [
    { value: 'cpu', label: 'CPU Usage (%)' },
    { value: 'memory', label: 'Memory Usage (%)' },
    { value: 'bandwidth', label: 'Bandwidth Usage (%)' },
    { value: 'connection_quality', label: 'Connection Quality (%)' },
    { value: 'concurrent_meetings', label: 'Concurrent Meetings' },
    { value: 'failed_connections', label: 'Failed Connections' }
  ];

  const conditionOptions = [
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' },
    { value: 'equals', label: 'Equals' }
  ];

  const toggleAlert = (alertId) => {
    setAlerts(alerts?.map(alert => 
      alert?.id === alertId 
        ? { ...alert, enabled: !alert?.enabled }
        : alert
    ));
  };

  const deleteAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  const addRecipient = () => {
    setNewAlert({
      ...newAlert,
      recipients: [...newAlert?.recipients, '']
    });
  };

  const updateRecipient = (index, value) => {
    const updatedRecipients = [...newAlert?.recipients];
    updatedRecipients[index] = value;
    setNewAlert({
      ...newAlert,
      recipients: updatedRecipients
    });
  };

  const removeRecipient = (index) => {
    setNewAlert({
      ...newAlert,
      recipients: newAlert?.recipients?.filter((_, i) => i !== index)
    });
  };

  const handleAddAlert = () => {
    if (newAlert?.name && newAlert?.threshold) {
      const alert = {
        id: Date.now(),
        ...newAlert,
        threshold: parseFloat(newAlert?.threshold),
        enabled: true,
        lastTriggered: null,
        recipients: newAlert?.recipients?.filter(email => email?.trim() !== '')
      };
      setAlerts([...alerts, alert]);
      setNewAlert({
        name: '',
        metric: 'cpu',
        condition: 'greater_than',
        threshold: '',
        recipients: ['']
      });
      setShowAddAlert(false);
    }
  };

  const getMetricLabel = (metric) => {
    const option = metricOptions?.find(opt => opt?.value === metric);
    return option ? option?.label : metric;
  };

  const getConditionLabel = (condition) => {
    const option = conditionOptions?.find(opt => opt?.value === condition);
    return option ? option?.label : condition;
  };

  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-48 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="h-20 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Alert Configuration</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddAlert(!showAddAlert)}
        >
          <Icon name="Plus" size={14} className="mr-2" />
          Add Alert
        </Button>
      </div>
      {/* Add Alert Form */}
      {showAddAlert && (
        <div className="border border-border rounded-lg p-4 mb-6 bg-muted/20">
          <h4 className="text-sm font-medium text-foreground mb-4">Create New Alert</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Alert Name</label>
              <input
                type="text"
                value={newAlert?.name}
                onChange={(e) => setNewAlert({ ...newAlert, name: e?.target?.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter alert name"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Metric</label>
              <select
                value={newAlert?.metric}
                onChange={(e) => setNewAlert({ ...newAlert, metric: e?.target?.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {metricOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Condition</label>
              <select
                value={newAlert?.condition}
                onChange={(e) => setNewAlert({ ...newAlert, condition: e?.target?.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {conditionOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Threshold</label>
              <input
                type="number"
                value={newAlert?.threshold}
                onChange={(e) => setNewAlert({ ...newAlert, threshold: e?.target?.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter threshold value"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-xs font-medium text-foreground mb-2">Recipients</label>
            {newAlert?.recipients?.map((recipient, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="email"
                  value={recipient}
                  onChange={(e) => updateRecipient(index, e?.target?.value)}
                  className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter email address"
                />
                {newAlert?.recipients?.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRecipient(index)}
                  >
                    <Icon name="X" size={14} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={addRecipient}
              className="mt-2"
            >
              <Icon name="Plus" size={14} className="mr-2" />
              Add Recipient
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="default" size="sm" onClick={handleAddAlert}>
              Create Alert
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowAddAlert(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Existing Alerts */}
      <div className="space-y-4">
        {alerts?.map((alert) => (
          <div key={alert?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  alert?.enabled ? 'bg-success/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={alert?.enabled ? 'Bell' : 'BellOff'} 
                    size={20} 
                    className={alert?.enabled ? 'text-success' : 'text-muted-foreground'}
                  />
                </div>
                <div>
                  <h5 className="text-sm font-medium text-foreground">{alert?.name}</h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getMetricLabel(alert?.metric)} {getConditionLabel(alert?.condition)} {alert?.threshold}
                    {alert?.metric?.includes('usage') || alert?.metric?.includes('quality') ? '%' : ''}
                  </p>
                  {alert?.lastTriggered && (
                    <p className="text-xs text-warning mt-1">
                      Last triggered: {alert?.lastTriggered}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleAlert(alert?.id)}
                >
                  <Icon name={alert?.enabled ? 'Pause' : 'Play'} size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteAlert(alert?.id)}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p className="mb-1">Recipients:</p>
              <div className="flex flex-wrap gap-1">
                {alert?.recipients?.map((email, index) => (
                  <span key={index} className="bg-muted px-2 py-1 rounded text-xs">
                    {email}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsConfiguration;