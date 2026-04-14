import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemConfigTab = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const configSections = [
    { id: 'general', label: 'General Settings', icon: 'Settings' },
    { id: 'workflows', label: 'Workflow Templates', icon: 'GitBranch' },
    { id: 'notifications', label: 'Notification Templates', icon: 'Bell' },
    { id: 'business-rules', label: 'Business Rules', icon: 'BookOpen' },
    { id: 'contract-types', label: 'Contract Types', icon: 'FileText' },
    { id: 'security', label: 'Security Policies', icon: 'Shield' }
  ];

  const contractTypes = [
    { id: 1, name: 'Service Agreement', category: 'Services', fields: 12, workflows: 3, status: 'Active' },
    { id: 2, name: 'Purchase Order', category: 'Procurement', fields: 8, workflows: 2, status: 'Active' },
    { id: 3, name: 'NDA', category: 'Legal', fields: 6, workflows: 1, status: 'Active' },
    { id: 4, name: 'Employment Contract', category: 'HR', fields: 15, workflows: 4, status: 'Draft' }
  ];

  const workflowTemplates = [
    { id: 1, name: 'Standard Approval', steps: 3, departments: ['Legal', 'Finance'], usage: 85 },
    { id: 2, name: 'Executive Approval', steps: 5, departments: ['Legal', 'Finance', 'Executive'], usage: 12 },
    { id: 3, name: 'Quick Approval', steps: 2, departments: ['Legal'], usage: 45 },
    { id: 4, name: 'Compliance Review', steps: 4, departments: ['Legal', 'Compliance'], usage: 28 }
  ];

  const businessRules = [
    { id: 1, name: 'Contract Value Threshold', condition: 'Value > $50,000', action: 'Require Executive Approval', status: 'Active' },
    { id: 2, name: 'Auto-renewal Warning', condition: '30 days before expiry', action: 'Send notification', status: 'Active' },
    { id: 3, name: 'Vendor Risk Assessment', condition: 'New vendor registration', action: 'Trigger risk evaluation', status: 'Active' },
    { id: 4, name: 'Payment Terms Validation', condition: 'Payment terms > 90 days', action: 'Flag for review', status: 'Inactive' }
  ];

  const handleSaveChanges = () => {
    console.log('Saving configuration changes...');
    setHasUnsavedChanges(false);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Organization Settings</h3>
          <Input
            label="Organization Name"
            defaultValue="ContractFlow Pro Enterprise"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <Input
            label="Default Currency"
            defaultValue="USD"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <Select
            label="Default Time Zone"
            options={[
              { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
              { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
              { value: 'UTC+0', label: 'UTC' }
            ]}
            value="UTC-5"
            onChange={() => setHasUnsavedChanges(true)}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">System Preferences</h3>
          <Select
            label="Date Format"
            options={[
              { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
              { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
              { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
            ]}
            value="MM/DD/YYYY"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <Input
            label="Session Timeout (minutes)"
            type="number"
            defaultValue="30"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <div className="space-y-3">
            <Checkbox
              label="Enable audit logging"
              checked
              onChange={() => setHasUnsavedChanges(true)}
            />
            <Checkbox
              label="Require two-factor authentication"
              checked
              onChange={() => setHasUnsavedChanges(true)}
            />
            <Checkbox
              label="Enable email notifications"
              checked
              onChange={() => setHasUnsavedChanges(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkflowTemplates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-text-primary">Workflow Templates</h3>
          <p className="text-sm text-muted-foreground">Configure approval workflows and routing rules</p>
        </div>
        <Button iconName="Plus" iconPosition="left">
          Create Template
        </Button>
      </div>
      
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-text-primary">Template Name</th>
              <th className="text-left p-4 font-medium text-text-primary">Steps</th>
              <th className="text-left p-4 font-medium text-text-primary">Departments</th>
              <th className="text-left p-4 font-medium text-text-primary">Usage</th>
              <th className="text-right p-4 font-medium text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workflowTemplates?.map((template) => (
              <tr key={template?.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-4">
                  <div className="font-medium text-text-primary">{template?.name}</div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                    {template?.steps} steps
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {template?.departments?.map((dept, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary">{template?.usage}% of contracts</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit" />
                    <Button variant="ghost" size="sm" iconName="Copy" />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContractTypes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-text-primary">Contract Types</h3>
          <p className="text-sm text-muted-foreground">Define contract categories and their configurations</p>
        </div>
        <Button iconName="Plus" iconPosition="left">
          Add Contract Type
        </Button>
      </div>
      
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-text-primary">Type Name</th>
              <th className="text-left p-4 font-medium text-text-primary">Category</th>
              <th className="text-left p-4 font-medium text-text-primary">Custom Fields</th>
              <th className="text-left p-4 font-medium text-text-primary">Workflows</th>
              <th className="text-left p-4 font-medium text-text-primary">Status</th>
              <th className="text-right p-4 font-medium text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contractTypes?.map((type) => (
              <tr key={type?.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-4">
                  <div className="font-medium text-text-primary">{type?.name}</div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                    {type?.category}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary">{type?.fields} fields</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary">{type?.workflows} workflows</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    type?.status === 'Active' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                  }`}>
                    {type?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit" />
                    <Button variant="ghost" size="sm" iconName="Settings" />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBusinessRules = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-text-primary">Business Rules</h3>
          <p className="text-sm text-muted-foreground">Configure automated business logic and triggers</p>
        </div>
        <Button iconName="Plus" iconPosition="left">
          Create Rule
        </Button>
      </div>
      
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-text-primary">Rule Name</th>
              <th className="text-left p-4 font-medium text-text-primary">Condition</th>
              <th className="text-left p-4 font-medium text-text-primary">Action</th>
              <th className="text-left p-4 font-medium text-text-primary">Status</th>
              <th className="text-right p-4 font-medium text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businessRules?.map((rule) => (
              <tr key={rule?.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-4">
                  <div className="font-medium text-text-primary">{rule?.name}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary font-mono bg-muted px-2 py-1 rounded">
                    {rule?.condition}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary">{rule?.action}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    rule?.status === 'Active' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                  }`}>
                    {rule?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit" />
                    <Button variant="ghost" size="sm" iconName="Play" />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
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
      case 'general':
        return renderGeneralSettings();
      case 'workflows':
        return renderWorkflowTemplates();
      case 'contract-types':
        return renderContractTypes();
      case 'business-rules':
        return renderBusinessRules();
      case 'notifications':
        return (
          <div className="text-center py-12">
            <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">Notification Templates</h3>
            <p className="text-muted-foreground">Configure email and system notification templates</p>
          </div>
        );
      case 'security':
        return (
          <div className="text-center py-12">
            <Icon name="Shield" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">Security Policies</h3>
            <p className="text-muted-foreground">Manage security settings and access policies</p>
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
          <h3 className="text-sm font-medium text-text-primary mb-4">Configuration Sections</h3>
          <nav className="space-y-1">
            {configSections?.map((section) => (
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
        
        {/* Save Changes Bar */}
        {hasUnsavedChanges && (
          <div className="fixed bottom-6 right-6 bg-warning text-warning-foreground px-4 py-3 rounded-lg shadow-elevated flex items-center space-x-3">
            <Icon name="AlertTriangle" size={20} />
            <span className="text-sm font-medium">You have unsaved changes</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveChanges}
              className="bg-warning-foreground text-warning hover:bg-warning-foreground/90"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemConfigTab;