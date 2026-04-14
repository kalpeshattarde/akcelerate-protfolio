import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ApprovalWorkflow = ({ workflow, onChange, onSave }) => {
  const [workflowData, setWorkflowData] = useState(workflow || {
    name: 'Standard Contract Approval',
    type: 'sequential',
    steps: [],
    conditions: [],
    notifications: true,
    escalation: true
  });

  const [showAddStep, setShowAddStep] = useState(false);
  const [newStep, setNewStep] = useState({
    name: '',
    approver: '',
    type: 'approval',
    required: true,
    timeout: 3
  });

  const workflowTypes = [
    { value: 'sequential', label: 'Sequential (One after another)' },
    { value: 'parallel', label: 'Parallel (All at once)' },
    { value: 'conditional', label: 'Conditional (Based on rules)' }
  ];

  const stepTypes = [
    { value: 'approval', label: 'Approval Required' },
    { value: 'review', label: 'Review Only' },
    { value: 'notification', label: 'Notification' },
    { value: 'signature', label: 'Electronic Signature' }
  ];

  const approvers = [
    { value: 'john.doe', label: 'John Doe - Legal Counsel' },
    { value: 'sarah.smith', label: 'Sarah Smith - Finance Director' },
    { value: 'mike.johnson', label: 'Mike Johnson - Procurement Manager' },
    { value: 'lisa.brown', label: 'Lisa Brown - Department Head' },
    { value: 'david.wilson', label: 'David Wilson - CEO' },
    { value: 'amy.davis', label: 'Amy Davis - Compliance Officer' }
  ];

  const predefinedWorkflows = [
    {
      name: 'Standard Service Agreement',
      steps: [
        { name: 'Legal Review', approver: 'john.doe', type: 'review', required: true, timeout: 2 },
        { name: 'Finance Approval', approver: 'sarah.smith', type: 'approval', required: true, timeout: 3 },
        { name: 'Department Head Sign-off', approver: 'lisa.brown', type: 'approval', required: true, timeout: 2 }
      ]
    },
    {
      name: 'High-Value Contract (>$100K)',
      steps: [
        { name: 'Legal Review', approver: 'john.doe', type: 'review', required: true, timeout: 3 },
        { name: 'Compliance Check', approver: 'amy.davis', type: 'approval', required: true, timeout: 2 },
        { name: 'Finance Approval', approver: 'sarah.smith', type: 'approval', required: true, timeout: 3 },
        { name: 'CEO Approval', approver: 'david.wilson', type: 'approval', required: true, timeout: 5 }
      ]
    },
    {
      name: 'NDA - Simple',
      steps: [
        { name: 'Legal Review', approver: 'john.doe', type: 'approval', required: true, timeout: 1 }
      ]
    }
  ];

  const handleAddStep = () => {
    if (newStep?.name && newStep?.approver) {
      const updatedSteps = [...workflowData?.steps, { ...newStep, id: Date.now() }];
      const updatedWorkflow = { ...workflowData, steps: updatedSteps };
      setWorkflowData(updatedWorkflow);
      onChange(updatedWorkflow);
      setNewStep({ name: '', approver: '', type: 'approval', required: true, timeout: 3 });
      setShowAddStep(false);
    }
  };

  const handleRemoveStep = (stepId) => {
    const updatedSteps = workflowData?.steps?.filter(step => step?.id !== stepId);
    const updatedWorkflow = { ...workflowData, steps: updatedSteps };
    setWorkflowData(updatedWorkflow);
    onChange(updatedWorkflow);
  };

  const handleMoveStep = (stepId, direction) => {
    const steps = [...workflowData?.steps];
    const currentIndex = steps?.findIndex(step => step?.id === stepId);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex >= 0 && newIndex < steps?.length) {
      [steps[currentIndex], steps[newIndex]] = [steps?.[newIndex], steps?.[currentIndex]];
      const updatedWorkflow = { ...workflowData, steps };
      setWorkflowData(updatedWorkflow);
      onChange(updatedWorkflow);
    }
  };

  const handleLoadTemplate = (template) => {
    const updatedWorkflow = {
      ...workflowData,
      name: template?.name,
      steps: template?.steps?.map((step, index) => ({ ...step, id: Date.now() + index }))
    };
    setWorkflowData(updatedWorkflow);
    onChange(updatedWorkflow);
  };

  const getStepIcon = (type) => {
    switch (type) {
      case 'approval': return 'CheckCircle';
      case 'review': return 'Eye';
      case 'notification': return 'Bell';
      case 'signature': return 'PenTool';
      default: return 'Circle';
    }
  };

  const getStepColor = (type) => {
    switch (type) {
      case 'approval': return 'text-success';
      case 'review': return 'text-accent';
      case 'notification': return 'text-warning';
      case 'signature': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Approval Workflow</h3>
          <Button
            variant="default"
            size="sm"
            onClick={() => onSave(workflowData)}
            iconName="Save"
            iconPosition="left"
          >
            Save Workflow
          </Button>
        </div>

        {/* Workflow Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Workflow Name
            </label>
            <input
              type="text"
              value={workflowData?.name}
              onChange={(e) => {
                const updated = { ...workflowData, name: e?.target?.value };
                setWorkflowData(updated);
                onChange(updated);
              }}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <Select
            label="Workflow Type"
            options={workflowTypes}
            value={workflowData?.type}
            onChange={(value) => {
              const updated = { ...workflowData, type: value };
              setWorkflowData(updated);
              onChange(updated);
            }}
          />
        </div>
      </div>
      <div className="flex-1 flex">
        {/* Templates Sidebar */}
        <div className="w-64 border-r border-border p-4">
          <h4 className="text-sm font-medium text-text-primary mb-3">Quick Templates</h4>
          <div className="space-y-2">
            {predefinedWorkflows?.map((template, index) => (
              <button
                key={index}
                onClick={() => handleLoadTemplate(template)}
                className="w-full text-left p-3 border border-border rounded-lg hover:bg-muted transition-smooth"
              >
                <div className="font-medium text-sm text-text-primary mb-1">
                  {template?.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {template?.steps?.length} steps
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-text-primary mb-3">Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={workflowData?.notifications}
                  onChange={(e) => {
                    const updated = { ...workflowData, notifications: e?.target?.checked };
                    setWorkflowData(updated);
                    onChange(updated);
                  }}
                  className="rounded border-border"
                />
                <span className="text-sm text-text-primary">Email Notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={workflowData?.escalation}
                  onChange={(e) => {
                    const updated = { ...workflowData, escalation: e?.target?.checked };
                    setWorkflowData(updated);
                    onChange(updated);
                  }}
                  className="rounded border-border"
                />
                <span className="text-sm text-text-primary">Auto Escalation</span>
              </label>
            </div>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-text-primary">Workflow Steps</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddStep(true)}
              iconName="Plus"
            >
              Add Step
            </Button>
          </div>

          {/* Steps List */}
          <div className="space-y-3">
            {workflowData?.steps?.map((step, index) => (
              <div
                key={step?.id}
                className="flex items-center space-x-4 p-4 border border-border rounded-lg bg-muted/30"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-accent">{index + 1}</span>
                  </div>
                  <Icon
                    name={getStepIcon(step?.type)}
                    size={20}
                    className={getStepColor(step?.type)}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-medium text-text-primary">{step?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {approvers?.find(a => a?.value === step?.approver)?.label || step?.approver}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {step?.type} • {step?.timeout} days timeout
                    {step?.required && ' • Required'}
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveStep(step?.id, 'up')}
                    disabled={index === 0}
                    iconName="ChevronUp"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveStep(step?.id, 'down')}
                    disabled={index === workflowData?.steps?.length - 1}
                    iconName="ChevronDown"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveStep(step?.id)}
                    iconName="Trash2"
                    className="text-error hover:text-error"
                  />
                </div>
              </div>
            ))}
          </div>

          {workflowData?.steps?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="GitBranch" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium text-text-primary mb-2">No workflow steps</h4>
              <p className="text-muted-foreground mb-4">
                Add steps to create your approval workflow
              </p>
              <Button variant="outline" onClick={() => setShowAddStep(true)}>
                Add First Step
              </Button>
            </div>
          )}

          {/* Add Step Form */}
          {showAddStep && (
            <div className="mt-6 p-4 border border-border rounded-lg bg-surface">
              <h5 className="font-medium text-text-primary mb-4">Add New Step</h5>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Step Name
                  </label>
                  <input
                    type="text"
                    value={newStep?.name}
                    onChange={(e) => setNewStep({ ...newStep, name: e?.target?.value })}
                    placeholder="e.g., Legal Review"
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <Select
                  label="Step Type"
                  options={stepTypes}
                  value={newStep?.type}
                  onChange={(value) => setNewStep({ ...newStep, type: value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Select
                  label="Approver"
                  options={approvers}
                  value={newStep?.approver}
                  onChange={(value) => setNewStep({ ...newStep, approver: value })}
                  searchable
                />
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Timeout (days)
                  </label>
                  <input
                    type="number"
                    value={newStep?.timeout}
                    onChange={(e) => setNewStep({ ...newStep, timeout: parseInt(e?.target?.value) })}
                    min="1"
                    max="30"
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newStep?.required}
                    onChange={(e) => setNewStep({ ...newStep, required: e?.target?.checked })}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-text-primary">Required Step</span>
                </label>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddStep(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleAddStep}
                    disabled={!newStep?.name || !newStep?.approver}
                  >
                    Add Step
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalWorkflow;