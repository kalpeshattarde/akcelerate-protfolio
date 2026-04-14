import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const WorkflowProperties = ({ selectedNode, onNodeUpdate, workflow, onWorkflowUpdate }) => {
  const [activeTab, setActiveTab] = useState('properties');

  const approverOptions = [
    { value: 'john.doe', label: 'John Doe - Contract Admin' },
    { value: 'jane.smith', label: 'Jane Smith - Legal Counsel' },
    { value: 'mike.johnson', label: 'Mike Johnson - Finance Director' },
    { value: 'sarah.wilson', label: 'Sarah Wilson - Procurement Manager' },
    { value: 'david.brown', label: 'David Brown - VP Operations' }
  ];

  const roleOptions = [
    { value: 'contract_admin', label: 'Contract Administrator' },
    { value: 'legal_counsel', label: 'Legal Counsel' },
    { value: 'finance_director', label: 'Finance Director' },
    { value: 'procurement_manager', label: 'Procurement Manager' },
    { value: 'department_head', label: 'Department Head' },
    { value: 'vp_operations', label: 'VP Operations' }
  ];

  const conditionOptions = [
    { value: 'amount_greater', label: 'Contract Amount >' },
    { value: 'amount_less', label: 'Contract Amount <' },
    { value: 'contract_type', label: 'Contract Type Equals' },
    { value: 'department', label: 'Department Equals' },
    { value: 'vendor_type', label: 'Vendor Type Equals' },
    { value: 'risk_level', label: 'Risk Level Equals' }
  ];

  const contractTypeOptions = [
    { value: 'service', label: 'Service Agreement' },
    { value: 'purchase', label: 'Purchase Order' },
    { value: 'nda', label: 'Non-Disclosure Agreement' },
    { value: 'employment', label: 'Employment Contract' },
    { value: 'vendor', label: 'Vendor Agreement' }
  ];

  const handlePropertyChange = (property, value) => {
    if (selectedNode) {
      onNodeUpdate(selectedNode?.id, {
        ...selectedNode,
        properties: {
          ...selectedNode?.properties,
          [property]: value
        }
      });
    }
  };

  const handleWorkflowPropertyChange = (property, value) => {
    onWorkflowUpdate({
      ...workflow,
      properties: {
        ...workflow?.properties,
        [property]: value
      }
    });
  };

  const renderNodeProperties = () => {
    if (!selectedNode) {
      return (
        <div className="p-6 text-center">
          <Icon name="MousePointer" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No Node Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a workflow node to view and edit its properties
          </p>
        </div>
      );
    }

    const { type, properties = {} } = selectedNode;

    return (
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            {selectedNode?.label} Properties
          </h3>
        </div>
        {/* Common Properties */}
        <div className="space-y-4">
          <Input
            label="Node Name"
            value={properties?.name || selectedNode?.label}
            onChange={(e) => handlePropertyChange('name', e?.target?.value)}
            placeholder="Enter node name"
          />

          <Input
            label="Description"
            value={properties?.description || ''}
            onChange={(e) => handlePropertyChange('description', e?.target?.value)}
            placeholder="Enter description"
          />
        </div>
        {/* Type-specific Properties */}
        {type === 'approval' && (
          <div className="space-y-4">
            <Select
              label="Approver"
              options={approverOptions}
              value={properties?.approver || ''}
              onChange={(value) => handlePropertyChange('approver', value)}
              placeholder="Select approver"
            />

            <Select
              label="Fallback Approver"
              options={approverOptions}
              value={properties?.fallbackApprover || ''}
              onChange={(value) => handlePropertyChange('fallbackApprover', value)}
              placeholder="Select fallback approver"
            />

            <Input
              label="Timeout (hours)"
              type="number"
              value={properties?.timeout || '24'}
              onChange={(e) => handlePropertyChange('timeout', e?.target?.value)}
              placeholder="24"
            />

            <Checkbox
              label="Allow delegation"
              checked={properties?.allowDelegation || false}
              onChange={(e) => handlePropertyChange('allowDelegation', e?.target?.checked)}
            />

            <Checkbox
              label="Require comments"
              checked={properties?.requireComments || false}
              onChange={(e) => handlePropertyChange('requireComments', e?.target?.checked)}
            />
          </div>
        )}
        {type === 'multi-approval' && (
          <div className="space-y-4">
            <Select
              label="Approval Type"
              options={[
                { value: 'all', label: 'All approvers must approve' },
                { value: 'any', label: 'Any approver can approve' },
                { value: 'majority', label: 'Majority must approve' }
              ]}
              value={properties?.approvalType || 'all'}
              onChange={(value) => handlePropertyChange('approvalType', value)}
            />

            <Select
              label="Approvers"
              options={approverOptions}
              value={properties?.approvers || []}
              onChange={(value) => handlePropertyChange('approvers', value)}
              multiple
              placeholder="Select multiple approvers"
            />

            <Input
              label="Timeout (hours)"
              type="number"
              value={properties?.timeout || '48'}
              onChange={(e) => handlePropertyChange('timeout', e?.target?.value)}
              placeholder="48"
            />
          </div>
        )}
        {type === 'decision' && (
          <div className="space-y-4">
            <Select
              label="Condition Type"
              options={conditionOptions}
              value={properties?.conditionType || ''}
              onChange={(value) => handlePropertyChange('conditionType', value)}
              placeholder="Select condition"
            />

            {properties?.conditionType === 'amount_greater' || properties?.conditionType === 'amount_less' ? (
              <Input
                label="Amount Threshold"
                type="number"
                value={properties?.threshold || ''}
                onChange={(e) => handlePropertyChange('threshold', e?.target?.value)}
                placeholder="Enter amount"
              />
            ) : properties?.conditionType === 'contract_type' ? (
              <Select
                label="Contract Type"
                options={contractTypeOptions}
                value={properties?.contractType || ''}
                onChange={(value) => handlePropertyChange('contractType', value)}
                placeholder="Select contract type"
              />
            ) : null}

            <Input
              label="True Path Label"
              value={properties?.trueLabel || 'Yes'}
              onChange={(e) => handlePropertyChange('trueLabel', e?.target?.value)}
              placeholder="Yes"
            />

            <Input
              label="False Path Label"
              value={properties?.falseLabel || 'No'}
              onChange={(e) => handlePropertyChange('falseLabel', e?.target?.value)}
              placeholder="No"
            />
          </div>
        )}
        {type === 'notification' && (
          <div className="space-y-4">
            <Select
              label="Notification Type"
              options={[
                { value: 'email', label: 'Email' },
                { value: 'sms', label: 'SMS' },
                { value: 'system', label: 'System Notification' },
                { value: 'all', label: 'All Methods' }
              ]}
              value={properties?.notificationType || 'email'}
              onChange={(value) => handlePropertyChange('notificationType', value)}
            />

            <Select
              label="Recipients"
              options={approverOptions}
              value={properties?.recipients || []}
              onChange={(value) => handlePropertyChange('recipients', value)}
              multiple
              placeholder="Select recipients"
            />

            <Input
              label="Subject Template"
              value={properties?.subject || 'Contract Approval Required'}
              onChange={(e) => handlePropertyChange('subject', e?.target?.value)}
              placeholder="Enter subject template"
            />

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Message Template
              </label>
              <textarea
                value={properties?.message || 'A contract requires your attention.'}
                onChange={(e) => handlePropertyChange('message', e?.target?.value)}
                className="w-full h-24 px-3 py-2 border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Enter message template"
              />
            </div>
          </div>
        )}
        {type === 'timer' && (
          <div className="space-y-4">
            <Input
              label="Delay Duration"
              type="number"
              value={properties?.duration || '1'}
              onChange={(e) => handlePropertyChange('duration', e?.target?.value)}
              placeholder="1"
            />

            <Select
              label="Time Unit"
              options={[
                { value: 'minutes', label: 'Minutes' },
                { value: 'hours', label: 'Hours' },
                { value: 'days', label: 'Days' },
                { value: 'weeks', label: 'Weeks' }
              ]}
              value={properties?.timeUnit || 'hours'}
              onChange={(value) => handlePropertyChange('timeUnit', value)}
            />

            <Checkbox
              label="Business days only"
              checked={properties?.businessDaysOnly || false}
              onChange={(e) => handlePropertyChange('businessDaysOnly', e?.target?.checked)}
            />
          </div>
        )}
      </div>
    );
  };

  const renderWorkflowSettings = () => (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Workflow Settings</h3>
      </div>

      <Input
        label="Workflow Name"
        value={workflow?.name || ''}
        onChange={(e) => handleWorkflowPropertyChange('name', e?.target?.value)}
        placeholder="Enter workflow name"
      />

      <Input
        label="Description"
        value={workflow?.description || ''}
        onChange={(e) => handleWorkflowPropertyChange('description', e?.target?.value)}
        placeholder="Enter workflow description"
      />

      <Select
        label="Contract Types"
        options={contractTypeOptions}
        value={workflow?.properties?.contractTypes || []}
        onChange={(value) => handleWorkflowPropertyChange('contractTypes', value)}
        multiple
        placeholder="Select applicable contract types"
      />

      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          Workflow Triggers
        </label>
        <div className="space-y-2">
          <Checkbox
            label="New contract creation"
            checked={workflow?.properties?.triggers?.newContract || false}
            onChange={(e) => handleWorkflowPropertyChange('triggers', {
              ...workflow?.properties?.triggers,
              newContract: e?.target?.checked
            })}
          />
          <Checkbox
            label="Contract modification"
            checked={workflow?.properties?.triggers?.modification || false}
            onChange={(e) => handleWorkflowPropertyChange('triggers', {
              ...workflow?.properties?.triggers,
              modification: e?.target?.checked
            })}
          />
          <Checkbox
            label="Contract renewal"
            checked={workflow?.properties?.triggers?.renewal || false}
            onChange={(e) => handleWorkflowPropertyChange('triggers', {
              ...workflow?.properties?.triggers,
              renewal: e?.target?.checked
            })}
          />
        </div>
      </div>

      <Input
        label="Priority"
        type="number"
        value={workflow?.properties?.priority || '1'}
        onChange={(e) => handleWorkflowPropertyChange('priority', e?.target?.value)}
        placeholder="1"
        description="Higher numbers indicate higher priority"
      />

      <Checkbox
        label="Active"
        checked={workflow?.properties?.active !== false}
        onChange={(e) => handleWorkflowPropertyChange('active', e?.target?.checked)}
      />
    </div>
  );

  const tabs = [
    { id: 'properties', label: 'Properties', icon: 'Settings' },
    { id: 'workflow', label: 'Workflow', icon: 'GitBranch' }
  ];

  return (
    <div className="w-full h-full bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'bg-surface text-text-primary shadow-soft'
                  : 'text-muted-foreground hover:text-text-primary'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'properties' && renderNodeProperties()}
        {activeTab === 'workflow' && renderWorkflowSettings()}
      </div>
      {/* Actions */}
      {selectedNode && activeTab === 'properties' && (
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Reset node properties
                onNodeUpdate(selectedNode?.id, {
                  ...selectedNode,
                  properties: {}
                });
              }}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                // Delete node logic would go here
                console.log('Delete node:', selectedNode?.id);
              }}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowProperties;