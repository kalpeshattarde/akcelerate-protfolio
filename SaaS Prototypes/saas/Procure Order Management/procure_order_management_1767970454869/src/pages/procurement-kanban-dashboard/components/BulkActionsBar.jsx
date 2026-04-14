import React from 'react';
import Icon from '../../../components/AppIcon';

const BulkActionsBar = ({ selectedCount, onBulkAction, onCancel }) => {
  const bulkActions = [
    {
      id: 'approve',
      label: 'Approve Selected',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'hover:bg-success-50'
    },
    {
      id: 'reject',
      label: 'Reject Selected',
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'hover:bg-error-50'
    },
    {
      id: 'export',
      label: 'Export Selected',
      icon: 'Download',
      color: 'text-primary',
      bgColor: 'hover:bg-primary-50'
    },
    {
      id: 'archive',
      label: 'Archive Selected',
      icon: 'Archive',
      color: 'text-warning',
      bgColor: 'hover:bg-warning-50'
    },
    {
      id: 'assign',
      label: 'Reassign Selected',
      icon: 'UserCheck',
      color: 'text-secondary-600',
      bgColor: 'hover:bg-secondary-100'
    }
  ];

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-card p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-body-medium text-primary">
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {bulkActions.map(action => (
              <button
                key={action.id}
                onClick={() => onBulkAction(action.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-button transition-smooth ${action.color} ${action.bgColor}`}
                title={action.label}
              >
                <Icon name={action.icon} size={16} />
                <span className="text-sm hidden lg:block">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mobile Actions Dropdown */}
          <div className="md:hidden">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onBulkAction(e.target.value);
                  e.target.value = '';
                }
              }}
              className="px-3 py-2 border border-primary-300 rounded-button bg-surface text-primary text-sm"
            >
              <option value="">Choose Action</option>
              {bulkActions.map(action => (
                <option key={action.id} value={action.id}>
                  {action.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onCancel}
            className="flex items-center space-x-2 px-3 py-2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name="X" size={16} />
            <span className="text-sm">Cancel</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-3 pt-3 border-t border-primary-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-body-medium text-primary">Total Value</div>
            <div className="text-text-secondary">Calculating...</div>
          </div>
          <div className="text-center">
            <div className="font-body-medium text-primary">Avg. Amount</div>
            <div className="text-text-secondary">Calculating...</div>
          </div>
          <div className="text-center">
            <div className="font-body-medium text-primary">Suppliers</div>
            <div className="text-text-secondary">Multiple</div>
          </div>
          <div className="text-center">
            <div className="font-body-medium text-primary">Due Soon</div>
            <div className="text-text-secondary">Checking...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;