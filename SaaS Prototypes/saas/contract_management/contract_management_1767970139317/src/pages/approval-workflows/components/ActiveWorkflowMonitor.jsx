import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ActiveWorkflowMonitor = ({ onWorkflowSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const activeWorkflows = [
    {
      id: 'wf-001',
      contractId: 'CNT-2024-001',
      contractTitle: 'Software License Agreement - Microsoft Office 365',
      currentStep: 'Legal Review',
      assignee: 'Jane Smith',
      status: 'pending',
      priority: 'high',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      value: 125000,
      progress: 60,
      slaStatus: 'on-track',
      steps: [
        { name: 'Initiation', status: 'completed', assignee: 'John Doe' },
        { name: 'Department Review', status: 'completed', assignee: 'Mike Johnson' },
        { name: 'Legal Review', status: 'active', assignee: 'Jane Smith' },
        { name: 'Finance Approval', status: 'pending', assignee: 'Sarah Wilson' },
        { name: 'Final Approval', status: 'pending', assignee: 'David Brown' }
      ]
    },
    {
      id: 'wf-002',
      contractId: 'CNT-2024-002',
      contractTitle: 'Vendor Service Agreement - IT Support Services',
      currentStep: 'Finance Approval',
      assignee: 'Sarah Wilson',
      status: 'overdue',
      priority: 'critical',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      value: 75000,
      progress: 80,
      slaStatus: 'overdue',
      steps: [
        { name: 'Initiation', status: 'completed', assignee: 'John Doe' },
        { name: 'Procurement Review', status: 'completed', assignee: 'Mike Johnson' },
        { name: 'Legal Review', status: 'completed', assignee: 'Jane Smith' },
        { name: 'Finance Approval', status: 'overdue', assignee: 'Sarah Wilson' },
        { name: 'Final Approval', status: 'pending', assignee: 'David Brown' }
      ]
    },
    {
      id: 'wf-003',
      contractId: 'CNT-2024-003',
      contractTitle: 'Employment Contract - Senior Developer',
      currentStep: 'HR Review',
      assignee: 'Lisa Chen',
      status: 'active',
      priority: 'medium',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      value: 95000,
      progress: 40,
      slaStatus: 'on-track',
      steps: [
        { name: 'Initiation', status: 'completed', assignee: 'John Doe' },
        { name: 'HR Review', status: 'active', assignee: 'Lisa Chen' },
        { name: 'Legal Review', status: 'pending', assignee: 'Jane Smith' },
        { name: 'Department Head Approval', status: 'pending', assignee: 'Mike Johnson' },
        { name: 'Final Approval', status: 'pending', assignee: 'David Brown' }
      ]
    },
    {
      id: 'wf-004',
      contractId: 'CNT-2024-004',
      contractTitle: 'NDA - Strategic Partnership Discussion',
      currentStep: 'Legal Review',
      assignee: 'Jane Smith',
      status: 'escalated',
      priority: 'high',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      value: 0,
      progress: 70,
      slaStatus: 'at-risk',
      steps: [
        { name: 'Initiation', status: 'completed', assignee: 'John Doe' },
        { name: 'Business Review', status: 'completed', assignee: 'Mike Johnson' },
        { name: 'Legal Review', status: 'escalated', assignee: 'Jane Smith' },
        { name: 'Executive Approval', status: 'pending', assignee: 'David Brown' }
      ]
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'escalated', label: 'Escalated' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const filteredWorkflows = activeWorkflows?.filter(workflow => {
    const matchesSearch = workflow?.contractTitle?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         workflow?.contractId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         workflow?.assignee?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow?.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || workflow?.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-accent';
      case 'pending': return 'text-warning';
      case 'overdue': return 'text-error';
      case 'escalated': return 'text-error';
      case 'completed': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-accent/10';
      case 'pending': return 'bg-warning/10';
      case 'overdue': return 'bg-error/10';
      case 'escalated': return 'bg-error/10';
      case 'completed': return 'bg-success/10';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getSlaStatusColor = (slaStatus) => {
    switch (slaStatus) {
      case 'on-track': return 'text-success';
      case 'at-risk': return 'text-warning';
      case 'overdue': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatDueDate = (date) => {
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const formatCurrency = (amount) => {
    if (amount === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="w-full h-full bg-surface">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Active Workflows</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor and manage ongoing approval processes
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <Input
              type="search"
              placeholder="Search workflows, contracts, or assignees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
            className="w-48"
          />
          <Select
            options={priorityOptions}
            value={priorityFilter}
            onChange={setPriorityFilter}
            placeholder="Filter by priority"
            className="w-48"
          />
        </div>
      </div>
      {/* Workflow List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">
          {filteredWorkflows?.map((workflow) => (
            <div
              key={workflow?.id}
              onClick={() => onWorkflowSelect(workflow)}
              className="bg-background border border-border rounded-lg p-6 hover:border-accent hover:shadow-soft transition-all duration-200 cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {workflow?.contractTitle}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(workflow?.status)} ${getStatusColor(workflow?.status)}`}>
                      {workflow?.status?.charAt(0)?.toUpperCase() + workflow?.status?.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-muted ${getPriorityColor(workflow?.priority)}`}>
                      {workflow?.priority?.charAt(0)?.toUpperCase() + workflow?.priority?.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{workflow?.contractId}</span>
                    <span>•</span>
                    <span>{formatCurrency(workflow?.value)}</span>
                    <span>•</span>
                    <span className={getSlaStatusColor(workflow?.slaStatus)}>
                      {formatDueDate(workflow?.dueDate)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-text-primary mb-1">
                    Current Step: {workflow?.currentStep}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Assigned to: {workflow?.assignee}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-text-primary">{workflow?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent rounded-full h-2 transition-all duration-300"
                    style={{ width: `${workflow?.progress}%` }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {workflow?.steps?.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2 flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      step?.status === 'completed' ? 'bg-success text-success-foreground' :
                      step?.status === 'active' ? 'bg-accent text-accent-foreground' :
                      step?.status === 'overdue' ? 'bg-error text-error-foreground' :
                      step?.status === 'escalated' ? 'bg-error text-error-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {step?.status === 'completed' ? (
                        <Icon name="Check" size={14} />
                      ) : step?.status === 'active' ? (
                        <Icon name="Clock" size={14} />
                      ) : step?.status === 'overdue' || step?.status === 'escalated' ? (
                        <Icon name="AlertTriangle" size={14} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-text-primary">{step?.name}</div>
                      <div className="text-muted-foreground">{step?.assignee}</div>
                    </div>
                    {index < workflow?.steps?.length - 1 && (
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground mx-2" />
                    )}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Started {new Date(workflow.startDate)?.toLocaleDateString()}</span>
                  <span>•</span>
                  <span className={getSlaStatusColor(workflow?.slaStatus)}>
                    SLA: {workflow?.slaStatus?.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Comments
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="History" size={16} className="mr-2" />
                    History
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    View Contract
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Summary Stats */}
      <div className="border-t border-border p-6">
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {filteredWorkflows?.length}
            </div>
            <div className="text-sm text-muted-foreground">Active Workflows</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">
              {filteredWorkflows?.filter(w => w?.status === 'overdue')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Overdue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {filteredWorkflows?.filter(w => w?.slaStatus === 'at-risk')?.length}
            </div>
            <div className="text-sm text-muted-foreground">At Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {Math.round(filteredWorkflows?.reduce((acc, w) => acc + w?.progress, 0) / filteredWorkflows?.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveWorkflowMonitor;