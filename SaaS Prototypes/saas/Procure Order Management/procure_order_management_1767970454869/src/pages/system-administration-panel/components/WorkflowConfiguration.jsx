import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const WorkflowConfiguration = ({ searchQuery }) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState('purchase-order');
  const [editingRule, setEditingRule] = useState(null);

  const workflows = [
    {
      id: 'purchase-order',
      name: 'Purchase Order Approval',
      description: 'Standard procurement approval workflow',
      status: 'Active',
      lastModified: '2024-01-10'
    },
    {
      id: 'supplier-onboarding',
      name: 'Supplier Onboarding',
      description: 'New supplier registration and verification',
      status: 'Active',
      lastModified: '2024-01-08'
    },
    {
      id: 'budget-approval',
      name: 'Budget Approval',
      description: 'Department budget allocation workflow',
      status: 'Draft',
      lastModified: '2024-01-12'
    }
  ];

  const approvalRules = [
    {
      id: 1,
      condition: 'Amount < $1,000',
      approver: 'Department Manager',
      escalation: 'Auto-approve after 24h',
      department: 'All Departments',
      priority: 'Low'
    },
    {
      id: 2,
      condition: '$1,000 - $10,000',
      approver: 'Finance Manager',
      escalation: 'Director after 48h',
      department: 'All Departments',
      priority: 'Medium'
    },
    {
      id: 3,
      condition: '$10,000 - $50,000',
      approver: 'Finance Director',
      escalation: 'CFO after 72h',
      department: 'All Departments',
      priority: 'High'
    },
    {
      id: 4,
      condition: 'Amount > $50,000',
      approver: 'CFO + CEO',
      escalation: 'Board approval required',
      department: 'All Departments',
      priority: 'Critical'
    }
  ];

  const budgetAllocations = [
    {
      id: 1,
      department: 'IT',
      monthlyBudget: 25000,
      yearlyBudget: 300000,
      spent: 18500,
      remaining: 6500,
      approvalLimit: 5000
    },
    {
      id: 2,
      department: 'Marketing',
      monthlyBudget: 15000,
      yearlyBudget: 180000,
      spent: 12300,
      remaining: 2700,
      approvalLimit: 3000
    },
    {
      id: 3,
      department: 'Operations',
      monthlyBudget: 35000,
      yearlyBudget: 420000,
      spent: 28900,
      remaining: 6100,
      approvalLimit: 7500
    },
    {
      id: 4,
      department: 'HR',
      monthlyBudget: 8000,
      yearlyBudget: 96000,
      spent: 5200,
      remaining: 2800,
      approvalLimit: 2000
    }
  ];

  const workflowSteps = [
    {
      id: 1,
      name: 'Request Submission',
      type: 'start',
      description: 'User submits purchase order request',
      position: { x: 100, y: 100 }
    },
    {
      id: 2,
      name: 'Amount Validation',
      type: 'condition',
      description: 'Check purchase order amount against approval limits',
      position: { x: 300, y: 100 }
    },
    {
      id: 3,
      name: 'Manager Approval',
      type: 'approval',
      description: 'Department manager reviews and approves',
      position: { x: 500, y: 50 }
    },
    {
      id: 4,
      name: 'Finance Review',
      type: 'approval',
      description: 'Finance team validates budget and compliance',
      position: { x: 500, y: 150 }
    },
    {
      id: 5,
      name: 'Order Processing',
      type: 'action',
      description: 'Generate purchase order and send to supplier',
      position: { x: 700, y: 100 }
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-error-100 text-error-700';
      case 'High': return 'bg-warning-100 text-warning-700';
      case 'Medium': return 'bg-primary-100 text-primary-700';
      case 'Low': return 'bg-success-100 text-success-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getBudgetStatus = (spent, budget) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return { color: 'bg-error-500', status: 'Critical' };
    if (percentage >= 75) return { color: 'bg-warning-500', status: 'Warning' };
    return { color: 'bg-success-500', status: 'Good' };
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading-semibold text-text-primary mb-2">Workflow Configuration</h2>
          <p className="text-text-secondary">Configure approval workflows and business rules</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-border rounded-button hover:bg-secondary-50 transition-smooth">
            <Icon name="Download" size={16} className="mr-2" />
            Export Rules
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth">
            <Icon name="Plus" size={16} className="mr-2" />
            New Workflow
          </button>
        </div>
      </div>

      {/* Workflow Selector */}
      <div className="mb-6">
        <div className="flex space-x-4">
          {workflows.map((workflow) => (
            <button
              key={workflow.id}
              onClick={() => setSelectedWorkflow(workflow.id)}
              className={`flex items-center px-4 py-3 rounded-card border transition-smooth ${
                selectedWorkflow === workflow.id
                  ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface hover:bg-secondary-50'
              }`}
            >
              <div className="text-left">
                <p className="font-body-medium">{workflow.name}</p>
                <p className="text-xs text-text-secondary">{workflow.description}</p>
              </div>
              <span className={`ml-3 px-2 py-1 rounded-full text-xs ${
                workflow.status === 'Active' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
              }`}>
                {workflow.status}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Workflow Builder */}
      <div className="mb-8">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4">Visual Workflow Builder</h3>
        <div className="bg-surface border border-border rounded-card p-6">
          <div className="relative h-64 bg-secondary-50 rounded-card overflow-hidden">
            <svg className="w-full h-full">
              {/* Workflow connections */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
                </marker>
              </defs>
              
              {/* Connection lines */}
              <line x1="150" y1="100" x2="250" y2="100" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="350" y1="100" x2="450" y2="75" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="350" y1="100" x2="450" y2="125" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="550" y1="75" x2="650" y2="100" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="550" y1="125" x2="650" y2="100" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrowhead)" />
            </svg>

            {/* Workflow steps */}
            {workflowSteps.map((step) => (
              <div
                key={step.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  step.type === 'start' ? 'bg-success text-white' :
                  step.type === 'condition' ? 'bg-warning text-white' :
                  step.type === 'approval'? 'bg-primary text-white' : 'bg-secondary text-white'
                } rounded-card px-3 py-2 text-xs font-body-medium shadow-elevation-sm cursor-pointer hover:shadow-elevation-md transition-smooth`}
                style={{ left: step.position.x, top: step.position.y }}
                title={step.description}
              >
                {step.name}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-success rounded mr-2"></div>
                Start
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-warning rounded mr-2"></div>
                Condition
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary rounded mr-2"></div>
                Approval
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-secondary rounded mr-2"></div>
                Action
              </div>
            </div>
            <button className="flex items-center px-3 py-1.5 bg-primary text-white rounded-button text-sm hover:bg-primary-700 transition-smooth">
              <Icon name="Edit" size={14} className="mr-1" />
              Edit Workflow
            </button>
          </div>
        </div>
      </div>

      {/* Approval Rules */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading-semibold text-text-primary">Approval Rules</h3>
          <button className="flex items-center px-3 py-1.5 bg-primary text-white rounded-button text-sm hover:bg-primary-700 transition-smooth">
            <Icon name="Plus" size={14} className="mr-1" />
            Add Rule
          </button>
        </div>
        <div className="bg-surface border border-border rounded-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-heading-medium text-text-primary">Condition</th>
                <th className="text-left p-4 font-heading-medium text-text-primary">Approver</th>
                <th className="text-left p-4 font-heading-medium text-text-primary">Escalation</th>
                <th className="text-left p-4 font-heading-medium text-text-primary">Priority</th>
                <th className="text-center p-4 font-heading-medium text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvalRules.map((rule) => (
                <tr key={rule.id} className="border-b border-border hover:bg-secondary-50 transition-smooth">
                  <td className="p-4">
                    <span className="font-body-medium text-text-primary">{rule.condition}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-text-secondary">{rule.approver}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-text-secondary">{rule.escalation}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium ${getPriorityColor(rule.priority)}`}>
                      {rule.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setEditingRule(rule)}
                        className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-button transition-smooth"
                        title="Edit Rule"
                      >
                        <Icon name="Edit" size={14} />
                      </button>
                      <button
                        className="p-1.5 text-text-secondary hover:text-error hover:bg-error-50 rounded-button transition-smooth"
                        title="Delete Rule"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Allocations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading-semibold text-text-primary">Department Budget Allocations</h3>
          <button className="flex items-center px-3 py-1.5 bg-primary text-white rounded-button text-sm hover:bg-primary-700 transition-smooth">
            <Icon name="Settings" size={14} className="mr-1" />
            Configure Budgets
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {budgetAllocations.map((dept) => {
            const budgetStatus = getBudgetStatus(dept.spent, dept.monthlyBudget);
            const spentPercentage = (dept.spent / dept.monthlyBudget) * 100;
            
            return (
              <div key={dept.id} className="bg-surface border border-border rounded-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading-medium text-text-primary">{dept.department}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-body-medium ${
                    budgetStatus.status === 'Critical' ? 'bg-error-100 text-error-700' :
                    budgetStatus.status === 'Warning'? 'bg-warning-100 text-warning-700' : 'bg-success-100 text-success-700'
                  }`}>
                    {budgetStatus.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Monthly Budget</span>
                    <span className="font-body-medium text-text-primary">${dept.monthlyBudget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Spent</span>
                    <span className="font-body-medium text-text-primary">${dept.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Remaining</span>
                    <span className="font-body-medium text-text-primary">${dept.remaining.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-text-secondary mb-1">
                    <span>Usage</span>
                    <span>{spentPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${budgetStatus.color}`}
                      style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-xs text-text-secondary">
                  Approval Limit: ${dept.approvalLimit.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkflowConfiguration;