import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ subtotal, tax, grandTotal }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getBudgetStatus = (amount) => {
    if (amount < 1000) return { status: 'low', color: 'text-success', icon: 'CheckCircle' };
    if (amount < 5000) return { status: 'medium', color: 'text-warning', icon: 'AlertTriangle' };
    return { status: 'high', color: 'text-error', icon: 'AlertCircle' };
  };

  const budgetStatus = getBudgetStatus(grandTotal);

  return (
    <div className="bg-surface rounded-card border border-border p-6">
      <h2 className="text-lg font-heading-semibold text-text-primary mb-4">
        Order Summary
      </h2>
      
      <div className="space-y-4">
        {/* Financial Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Subtotal:</span>
            <span className="font-body-medium text-text-primary">
              {formatCurrency(subtotal)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Tax:</span>
            <span className="font-body-medium text-text-primary">
              {formatCurrency(tax)}
            </span>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-heading-semibold text-text-primary">Grand Total:</span>
              <span className="text-xl font-heading-bold text-primary">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Budget Status */}
        <div className={`p-3 rounded-button border ${
          budgetStatus.status === 'low' ? 'bg-success-50 border-success-100' :
          budgetStatus.status === 'medium'? 'bg-warning-50 border-warning-100' : 'bg-error-50 border-error-100'
        }`}>
          <div className="flex items-center space-x-2">
            <Icon name={budgetStatus.icon} size={16} className={budgetStatus.color} />
            <span className={`text-sm font-body-medium ${budgetStatus.color}`}>
              {budgetStatus.status === 'low' && 'Within Budget'}
              {budgetStatus.status === 'medium' && 'Requires Approval'}
              {budgetStatus.status === 'high' && 'Exceeds Standard Limit'}
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            {budgetStatus.status === 'low' && 'This order is within standard procurement limits.'}
            {budgetStatus.status === 'medium' && 'Orders over $1,000 require manager approval.'}
            {budgetStatus.status === 'high' && 'Orders over $5,000 require finance team approval.'}
          </p>
        </div>

        {/* Approval Workflow Preview */}
        {grandTotal > 1000 && (
          <div className="p-3 bg-secondary-50 rounded-button">
            <h3 className="font-body-medium text-text-primary mb-2 flex items-center">
              <Icon name="GitBranch" size={16} className="mr-2" />
              Approval Workflow
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-text-secondary">Procurement Officer Review</span>
                <Icon name="Check" size={12} className="text-success" />
              </div>
              {grandTotal > 1000 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-text-secondary">Department Manager Approval</span>
                  <span className="text-xs text-warning">Pending</span>
                </div>
              )}
              {grandTotal > 5000 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-error rounded-full"></div>
                  <span className="text-text-secondary">Finance Team Approval</span>
                  <span className="text-xs text-error">Required</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Terms */}
        <div className="p-3 bg-secondary-50 rounded-button">
          <h3 className="font-body-medium text-text-primary mb-2">Payment Information</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Payment Method:</span>
              <span className="text-text-primary">Corporate Account</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Terms:</span>
              <span className="text-text-primary">Net 30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Expected Payment Date:</span>
              <span className="text-text-primary">
                {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-primary-50 rounded-button">
            <div className="text-lg font-heading-semibold text-primary">
              {subtotal > 0 ? Math.round((tax / subtotal) * 100) : 0}%
            </div>
            <div className="text-xs text-text-secondary">Avg Tax Rate</div>
          </div>
          <div className="text-center p-3 bg-accent-50 rounded-button">
            <div className="text-lg font-heading-semibold text-accent">
              {Math.ceil(grandTotal / 100) * 100 > grandTotal ? 
                Math.ceil(grandTotal / 100) * 100 - grandTotal : 0}
            </div>
            <div className="text-xs text-text-secondary">Budget Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;