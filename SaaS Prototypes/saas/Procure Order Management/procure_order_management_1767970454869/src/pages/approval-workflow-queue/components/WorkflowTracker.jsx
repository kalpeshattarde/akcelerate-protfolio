import React from 'react';
import Icon from '../../../components/AppIcon';

const WorkflowTracker = ({ userRole }) => {
  const workflowSteps = [
    {
      step: 1,
      title: 'Department Head',
      description: 'Initial review and approval',
      limit: '$5,000',
      status: 'completed',
      approver: 'Mike Chen'
    },
    {
      step: 2,
      title: 'Finance Review',
      description: 'Budget and compliance check',
      limit: '$50,000',
      status: 'current',
      approver: 'You'
    },
    {
      step: 3,
      title: 'Executive Approval',
      description: 'Final authorization for high-value POs',
      limit: '$100,000+',
      status: 'pending',
      approver: 'CFO'
    }
  ];

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'current': return 'Clock';
      case 'pending': return 'Circle';
      default: return 'Circle';
    }
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'current': return 'text-primary';
      case 'pending': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-card p-4">
      <h3 className="font-heading-medium text-text-primary mb-4">Approval Workflow</h3>
      
      <div className="space-y-4">
        {workflowSteps.map((step, index) => (
          <div key={step.step} className="relative">
            {/* Connector Line */}
            {index < workflowSteps.length - 1 && (
              <div className="absolute left-4 top-8 w-0.5 h-8 bg-border"></div>
            )}
            
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                step.status === 'completed' ? 'bg-success-50' :
                step.status === 'current' ? 'bg-primary-50' : 'bg-secondary-50'
              }`}>
                <Icon 
                  name={getStepIcon(step.status)} 
                  size={16} 
                  className={getStepColor(step.status)}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-body-medium ${
                    step.status === 'current' ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {step.title}
                  </h4>
                  <span className="text-xs text-text-secondary">{step.limit}</span>
                </div>
                <p className="text-sm text-text-secondary mb-1">{step.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-secondary">Approver:</span>
                  <span className={`text-xs font-body-medium ${
                    step.status === 'current' ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {step.approver}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* User Role Info */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="User" size={16} className="text-text-secondary" />
          <span className="text-text-secondary">Your approval limit:</span>
          <span className="font-body-medium text-text-primary">
            {userRole === 'admin' ? '$100,000+' : userRole === 'finance' ? '$50,000' : '$10,000'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkflowTracker;