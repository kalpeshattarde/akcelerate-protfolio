import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkActionsModal = ({ isOpen, onClose, selectedVendors, onBulkAction }) => {
  const [actionType, setActionType] = useState('');
  const [actionValue, setActionValue] = useState('');
  const [confirmAction, setConfirmAction] = useState(false);

  if (!isOpen) return null;

  const actionOptions = [
    { value: '', label: 'Select an action' },
    { value: 'updateStatus', label: 'Update Status' },
    { value: 'updateCategory', label: 'Update Category' },
    { value: 'assignManager', label: 'Assign Account Manager' },
    { value: 'addTags', label: 'Add Tags' },
    { value: 'exportData', label: 'Export Data' },
    { value: 'sendMessage', label: 'Send Message' },
    { value: 'scheduleReview', label: 'Schedule Review' }
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const categoryOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Professional Services', label: 'Professional Services' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Logistics', label: 'Logistics' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Facilities', label: 'Facilities' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Financial', label: 'Financial' }
  ];

  const managerOptions = [
    { value: 'john.doe', label: 'John Doe' },
    { value: 'sarah.smith', label: 'Sarah Smith' },
    { value: 'mike.johnson', label: 'Mike Johnson' },
    { value: 'lisa.brown', label: 'Lisa Brown' }
  ];

  const handleSubmit = () => {
    if (!actionType || !confirmAction) return;

    onBulkAction({
      action: actionType,
      value: actionValue,
      vendorIds: selectedVendors?.map(v => v?.id)
    });

    // Reset form
    setActionType('');
    setActionValue('');
    setConfirmAction(false);
    onClose();
  };

  const renderActionInput = () => {
    switch (actionType) {
      case 'updateStatus':
        return (
          <Select
            label="New Status"
            options={statusOptions}
            value={actionValue}
            onChange={setActionValue}
            required
          />
        );
      case 'updateCategory':
        return (
          <Select
            label="New Category"
            options={categoryOptions}
            value={actionValue}
            onChange={setActionValue}
            required
          />
        );
      case 'assignManager':
        return (
          <Select
            label="Account Manager"
            options={managerOptions}
            value={actionValue}
            onChange={setActionValue}
            required
          />
        );
      case 'addTags':
        return (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={actionValue}
              onChange={(e) => setActionValue(e?.target?.value)}
              placeholder="e.g., priority, strategic, preferred"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const getActionDescription = () => {
    switch (actionType) {
      case 'updateStatus':
        return `Change status to "${actionValue}" for ${selectedVendors?.length} vendor(s)`;
      case 'updateCategory':
        return `Change category to "${actionValue}" for ${selectedVendors?.length} vendor(s)`;
      case 'assignManager':
        return `Assign account manager to ${selectedVendors?.length} vendor(s)`;
      case 'addTags':
        return `Add tags to ${selectedVendors?.length} vendor(s)`;
      case 'exportData':
        return `Export data for ${selectedVendors?.length} vendor(s)`;
      case 'sendMessage':
        return `Send message to ${selectedVendors?.length} vendor(s)`;
      case 'scheduleReview':
        return `Schedule review for ${selectedVendors?.length} vendor(s)`;
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevated w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-text-primary">Bulk Actions</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Selected Vendors */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">Selected Vendors</h3>
            <div className="bg-muted rounded-lg p-3 max-h-32 overflow-y-auto">
              {selectedVendors?.map((vendor, index) => (
                <div key={vendor?.id} className="flex items-center space-x-2 py-1">
                  <Icon name="Building2" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-text-primary">{vendor?.name}</span>
                  {index < selectedVendors?.length - 1 && (
                    <span className="text-muted-foreground">,</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {selectedVendors?.length} vendor(s) selected
            </p>
          </div>

          {/* Action Selection */}
          <div>
            <Select
              label="Action"
              options={actionOptions}
              value={actionType}
              onChange={setActionType}
              required
            />
          </div>

          {/* Action Input */}
          {actionType && actionType !== 'exportData' && actionType !== 'sendMessage' && actionType !== 'scheduleReview' && (
            <div>
              {renderActionInput()}
            </div>
          )}

          {/* Action Preview */}
          {actionType && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-accent mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-accent mb-1">Action Preview</h4>
                  <p className="text-sm text-text-primary">{getActionDescription()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation */}
          {actionType && (
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={confirmAction}
                onChange={(e) => setConfirmAction(e?.target?.checked)}
              />
              <div>
                <label className="text-sm font-medium text-text-primary">
                  I confirm this bulk action
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  This action will be applied to all selected vendors and cannot be undone.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={!actionType || !confirmAction || (actionType !== 'exportData' && actionType !== 'sendMessage' && actionType !== 'scheduleReview' && !actionValue)}
          >
            Apply Action
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsModal;