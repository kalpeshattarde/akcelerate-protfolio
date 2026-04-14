import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConfigurationForms = () => {
  const [activeSection, setActiveSection] = useState('data-retention');
  const [configurations, setConfigurations] = useState({
    dataRetention: {
      esgData: '7',
      auditLogs: '10',
      userSessions: '1',
      reportArchives: '5',
      autoCleanup: true
    },
    backupSchedule: {
      frequency: 'daily',
      time: '02:00',
      retention: '30',
      compression: true,
      encryption: true,
      location: 's3-primary'
    },
    security: {
      sessionTimeout: '30',
      passwordExpiry: '90',
      mfaRequired: true,
      ipWhitelist: true,
      apiRateLimit: '1000',
      encryptionLevel: 'aes-256'
    },
    notifications: {
      systemAlerts: true,
      securityEvents: true,
      maintenanceWindows: true,
      performanceThresholds: true,
      emailRecipients: "admin@company.com, security@company.com",
      slackWebhook: "https://hooks.slack.com/services/..."
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const sections = [
    { id: 'data-retention', label: 'Data Retention', icon: 'Database' },
    { id: 'backup-schedule', label: 'Backup Schedule', icon: 'HardDrive' },
    { id: 'security', label: 'Security Settings', icon: 'Shield' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  const handleConfigChange = (section, field, value) => {
    setConfigurations(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value
      }
    }));
  };

  const handleSave = async (section) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastSaved(new Date()?.toISOString());
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDataRetentionForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="ESG Data Retention"
          type="number"
          value={configurations?.dataRetention?.esgData}
          onChange={(e) => handleConfigChange('dataRetention', 'esgData', e?.target?.value)}
          description="Years to retain ESG data"
          min="1"
          max="20"
        />
        <Input
          label="Audit Log Retention"
          type="number"
          value={configurations?.dataRetention?.auditLogs}
          onChange={(e) => handleConfigChange('dataRetention', 'auditLogs', e?.target?.value)}
          description="Years to retain audit logs"
          min="1"
          max="20"
        />
        <Input
          label="User Session Logs"
          type="number"
          value={configurations?.dataRetention?.userSessions}
          onChange={(e) => handleConfigChange('dataRetention', 'userSessions', e?.target?.value)}
          description="Years to retain session data"
          min="1"
          max="5"
        />
        <Input
          label="Report Archives"
          type="number"
          value={configurations?.dataRetention?.reportArchives}
          onChange={(e) => handleConfigChange('dataRetention', 'reportArchives', e?.target?.value)}
          description="Years to retain generated reports"
          min="1"
          max="10"
        />
      </div>
      
      <div className="border-t border-border pt-6">
        <Checkbox
          label="Enable Automatic Cleanup"
          description="Automatically delete data beyond retention periods"
          checked={configurations?.dataRetention?.autoCleanup}
          onChange={(e) => handleConfigChange('dataRetention', 'autoCleanup', e?.target?.checked)}
        />
      </div>
    </div>
  );

  const renderBackupScheduleForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Backup Frequency"
          options={[
            { value: 'hourly', label: 'Every Hour' },
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' }
          ]}
          value={configurations?.backupSchedule?.frequency}
          onChange={(value) => handleConfigChange('backupSchedule', 'frequency', value)}
        />
        <Input
          label="Backup Time"
          type="time"
          value={configurations?.backupSchedule?.time}
          onChange={(e) => handleConfigChange('backupSchedule', 'time', e?.target?.value)}
          description="Time to run daily backups (UTC)"
        />
        <Input
          label="Backup Retention"
          type="number"
          value={configurations?.backupSchedule?.retention}
          onChange={(e) => handleConfigChange('backupSchedule', 'retention', e?.target?.value)}
          description="Days to retain backup files"
          min="1"
          max="365"
        />
        <Select
          label="Storage Location"
          options={[
            { value: 's3-primary', label: 'AWS S3 - Primary' },
            { value: 's3-secondary', label: 'AWS S3 - Secondary' },
            { value: 'azure-blob', label: 'Azure Blob Storage' },
            { value: 'local-storage', label: 'Local Storage' }
          ]}
          value={configurations?.backupSchedule?.location}
          onChange={(value) => handleConfigChange('backupSchedule', 'location', value)}
        />
      </div>
      
      <div className="border-t border-border pt-6 space-y-4">
        <Checkbox
          label="Enable Compression"
          description="Compress backup files to save storage space"
          checked={configurations?.backupSchedule?.compression}
          onChange={(e) => handleConfigChange('backupSchedule', 'compression', e?.target?.checked)}
        />
        <Checkbox
          label="Enable Encryption"
          description="Encrypt backup files for security"
          checked={configurations?.backupSchedule?.encryption}
          onChange={(e) => handleConfigChange('backupSchedule', 'encryption', e?.target?.checked)}
        />
      </div>
    </div>
  );

  const renderSecurityForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Session Timeout"
          type="number"
          value={configurations?.security?.sessionTimeout}
          onChange={(e) => handleConfigChange('security', 'sessionTimeout', e?.target?.value)}
          description="Minutes before session expires"
          min="5"
          max="480"
        />
        <Input
          label="Password Expiry"
          type="number"
          value={configurations?.security?.passwordExpiry}
          onChange={(e) => handleConfigChange('security', 'passwordExpiry', e?.target?.value)}
          description="Days before password expires"
          min="30"
          max="365"
        />
        <Input
          label="API Rate Limit"
          type="number"
          value={configurations?.security?.apiRateLimit}
          onChange={(e) => handleConfigChange('security', 'apiRateLimit', e?.target?.value)}
          description="Requests per hour per user"
          min="100"
          max="10000"
        />
        <Select
          label="Encryption Level"
          options={[
            { value: 'aes-128', label: 'AES-128' },
            { value: 'aes-192', label: 'AES-192' },
            { value: 'aes-256', label: 'AES-256' }
          ]}
          value={configurations?.security?.encryptionLevel}
          onChange={(value) => handleConfigChange('security', 'encryptionLevel', value)}
        />
      </div>
      
      <div className="border-t border-border pt-6 space-y-4">
        <Checkbox
          label="Require Multi-Factor Authentication"
          description="Force MFA for all user accounts"
          checked={configurations?.security?.mfaRequired}
          onChange={(e) => handleConfigChange('security', 'mfaRequired', e?.target?.checked)}
        />
        <Checkbox
          label="Enable IP Whitelist"
          description="Restrict access to approved IP addresses"
          checked={configurations?.security?.ipWhitelist}
          onChange={(e) => handleConfigChange('security', 'ipWhitelist', e?.target?.checked)}
        />
      </div>
    </div>
  );

  const renderNotificationsForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Alert Types</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="System Alerts"
            description="Critical system events and errors"
            checked={configurations?.notifications?.systemAlerts}
            onChange={(e) => handleConfigChange('notifications', 'systemAlerts', e?.target?.checked)}
          />
          <Checkbox
            label="Security Events"
            description="Login attempts and security breaches"
            checked={configurations?.notifications?.securityEvents}
            onChange={(e) => handleConfigChange('notifications', 'securityEvents', e?.target?.checked)}
          />
          <Checkbox
            label="Maintenance Windows"
            description="Scheduled maintenance notifications"
            checked={configurations?.notifications?.maintenanceWindows}
            onChange={(e) => handleConfigChange('notifications', 'maintenanceWindows', e?.target?.checked)}
          />
          <Checkbox
            label="Performance Thresholds"
            description="System performance warnings"
            checked={configurations?.notifications?.performanceThresholds}
            onChange={(e) => handleConfigChange('notifications', 'performanceThresholds', e?.target?.checked)}
          />
        </div>
      </div>
      
      <div className="border-t border-border pt-6 space-y-4">
        <Input
          label="Email Recipients"
          type="email"
          value={configurations?.notifications?.emailRecipients}
          onChange={(e) => handleConfigChange('notifications', 'emailRecipients', e?.target?.value)}
          description="Comma-separated email addresses"
        />
        <Input
          label="Slack Webhook URL"
          type="url"
          value={configurations?.notifications?.slackWebhook}
          onChange={(e) => handleConfigChange('notifications', 'slackWebhook', e?.target?.value)}
          description="Slack webhook for team notifications"
        />
      </div>
    </div>
  );

  const renderForm = () => {
    switch (activeSection) {
      case 'data-retention': return renderDataRetentionForm();
      case 'backup-schedule': return renderBackupScheduleForm();
      case 'security': return renderSecurityForm();
      case 'notifications': return renderNotificationsForm();
      default: return renderDataRetentionForm();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">System Configuration</h3>
          {lastSaved && (
            <div className="text-sm text-muted-foreground">
              Last saved: {new Date(lastSaved)?.toLocaleString()}
            </div>
          )}
        </div>
      </div>
      <div className="flex">
        {/* Section Navigation */}
        <div className="w-64 border-r border-border p-4">
          <nav className="space-y-2">
            {sections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  activeSection === section?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-6">
          {renderForm()}
          
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-border">
            <Button variant="outline">
              Reset to Defaults
            </Button>
            <Button 
              onClick={() => handleSave(activeSection)}
              loading={isLoading}
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationForms;