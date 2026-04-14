import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetUtilizationTable = ({ data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical': return 'bg-error-100 text-error';
      case 'Warning': return 'bg-warning-100 text-warning';
      case 'On Track': return 'bg-success-100 text-success';
      default: return 'bg-secondary-100 text-text-secondary';
    }
  };

  const getUtilizationColor = (utilization) => {
    if (utilization >= 95) return 'bg-error';
    if (utilization >= 85) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-surface border border-border rounded-card shadow-elevation-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading-semibold text-text-primary mb-1">
              Budget Utilization
            </h3>
            <p className="text-text-secondary text-sm">
              Department spending vs allocated budgets
            </p>
          </div>
          <button className="p-2 hover:bg-secondary-100 rounded-button transition-smooth">
            <Icon name="MoreHorizontal" size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {data.map((department) => (
          <div key={department.id} className="p-4 hover:bg-secondary-50 transition-smooth">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Building" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-body-medium text-text-primary">
                    {department.department}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {formatCurrency(department.budgetUsed)} of {formatCurrency(department.budgetAllocated)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-body-medium rounded-full ${getStatusColor(department.status)}`}>
                  {department.status}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-secondary">Utilization</span>
                <span className="text-sm font-body-medium text-text-primary">
                  {department.utilization}%
                </span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getUtilizationColor(department.utilization)}`}
                  style={{ width: `${Math.min(department.utilization, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="TrendingUp" size={14} />
                  <span>Used: {formatCurrency(department.budgetUsed)}</span>
                </div>
                <div className="flex items-center space-x-1 text-text-secondary">
                  <Icon name="DollarSign" size={14} />
                  <span>Remaining: {formatCurrency(department.remaining)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-heading-semibold text-text-primary">
              {formatCurrency(data.reduce((sum, dept) => sum + dept.budgetAllocated, 0))}
            </div>
            <div className="text-xs text-text-secondary">Total Budget</div>
          </div>
          <div>
            <div className="text-lg font-heading-semibold text-text-primary">
              {formatCurrency(data.reduce((sum, dept) => sum + dept.budgetUsed, 0))}
            </div>
            <div className="text-xs text-text-secondary">Total Used</div>
          </div>
          <div>
            <div className="text-lg font-heading-semibold text-success">
              {formatCurrency(data.reduce((sum, dept) => sum + dept.remaining, 0))}
            </div>
            <div className="text-xs text-text-secondary">Total Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetUtilizationTable;