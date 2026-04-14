import React from 'react';
import Icon from '../../../components/AppIcon';

const OverdueDeliveriesTable = ({ data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getEscalationColor = (level) => {
    switch (level) {
      case 'High': return 'bg-error-100 text-error';
      case 'Medium': return 'bg-warning-100 text-warning';
      case 'Low': return 'bg-success-100 text-success';
      default: return 'bg-secondary-100 text-text-secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delayed': return 'bg-error-100 text-error';
      case 'In Transit': return 'bg-warning-100 text-warning';
      case 'Processing': return 'bg-primary-100 text-primary';
      default: return 'bg-secondary-100 text-text-secondary';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-card shadow-elevation-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading-semibold text-text-primary mb-1">
              Overdue Deliveries
            </h3>
            <p className="text-text-secondary text-sm">
              Orders requiring immediate attention
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 bg-error-100 text-error text-xs font-body-medium rounded-full">
              {data.length} Overdue
            </span>
            <button className="p-2 hover:bg-secondary-100 rounded-button transition-smooth">
              <Icon name="MoreHorizontal" size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {data.map((delivery) => (
          <div key={delivery.id} className="p-4 hover:bg-secondary-50 transition-smooth">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                </div>
                <div>
                  <div className="font-body-medium text-text-primary">
                    {delivery.poNumber}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {delivery.supplier}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-body-medium text-text-primary">
                  {formatCurrency(delivery.amount)}
                </div>
                <div className="text-sm text-text-secondary">
                  Due: {new Date(delivery.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-body-medium rounded-full ${getEscalationColor(delivery.escalationLevel)}`}>
                  {delivery.escalationLevel} Priority
                </span>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-body-medium rounded-full ${getStatusColor(delivery.status)}`}>
                  {delivery.status}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={14} />
                <span>{delivery.daysOverdue} days overdue</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <button className="text-sm text-primary hover:text-primary-700 transition-smooth">
            View All Overdue Orders
          </button>
          <button className="flex items-center space-x-2 px-3 py-1 bg-error text-white text-sm rounded-button hover:bg-red-600 transition-smooth">
            <Icon name="AlertTriangle" size={14} />
            <span>Escalate All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverdueDeliveriesTable;