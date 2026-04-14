import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkOperations = ({ selectedCount, onClearSelection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bulkActions = [
    { id: 'activate', label: 'Activate Suppliers', icon: 'CheckCircle', color: 'text-success' },
    { id: 'deactivate', label: 'Deactivate Suppliers', icon: 'XCircle', color: 'text-error' },
    { id: 'send-notification', label: 'Send Notification', icon: 'Mail', color: 'text-primary' },
    { id: 'schedule-review', label: 'Schedule Review', icon: 'Calendar', color: 'text-warning' },
    { id: 'export-selected', label: 'Export Selected', icon: 'Download', color: 'text-text-secondary' },
    { id: 'delete', label: 'Delete Suppliers', icon: 'Trash2', color: 'text-error' }
  ];

  const handleBulkAction = (actionId) => {
    console.log(`Performing bulk action: ${actionId} on ${selectedCount} suppliers`);
    setIsDropdownOpen(false);
    // Handle bulk action logic here
  };

  return (
    <div className="p-4 bg-primary-50 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="CheckSquare" size={20} className="text-primary" />
          <span className="text-sm font-body-medium text-text-primary">
            {selectedCount} supplier{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Bulk Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth text-sm"
            >
              <Icon name="Settings" size={16} />
              <span>Bulk Actions</span>
              <Icon name="ChevronDown" size={14} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-card shadow-elevation-lg z-dropdown">
                <div className="py-1">
                  {bulkActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleBulkAction(action.id)}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-secondary-100 transition-smooth"
                    >
                      <Icon name={action.icon} size={16} className={action.color} />
                      <span className="text-sm text-text-primary">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clear Selection */}
          <button
            onClick={onClearSelection}
            className="flex items-center space-x-2 px-3 py-2 border border-border rounded-button hover:bg-secondary-100 transition-smooth text-sm"
          >
            <Icon name="X" size={16} className="text-text-secondary" />
            <span className="text-text-secondary">Clear</span>
          </button>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center space-x-2 mt-3">
        <button
          onClick={() => handleBulkAction('activate')}
          className="flex items-center space-x-1 px-3 py-1.5 bg-success-100 text-success rounded-button hover:bg-success-200 transition-smooth text-sm"
        >
          <Icon name="CheckCircle" size={14} />
          <span>Activate</span>
        </button>
        <button
          onClick={() => handleBulkAction('send-notification')}
          className="flex items-center space-x-1 px-3 py-1.5 bg-primary-100 text-primary rounded-button hover:bg-primary-200 transition-smooth text-sm"
        >
          <Icon name="Mail" size={14} />
          <span>Notify</span>
        </button>
        <button
          onClick={() => handleBulkAction('export-selected')}
          className="flex items-center space-x-1 px-3 py-1.5 bg-secondary-100 text-text-secondary rounded-button hover:bg-secondary-200 transition-smooth text-sm"
        >
          <Icon name="Download" size={14} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

export default BulkOperations;