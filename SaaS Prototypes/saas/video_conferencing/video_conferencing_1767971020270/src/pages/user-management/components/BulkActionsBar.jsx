import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActionsBar = ({ 
  selectedCount, 
  onBulkAction, 
  onClearSelection,
  totalUsers 
}) => {
  const [selectedAction, setSelectedAction] = useState('');

  const actionOptions = [
    { value: '', label: 'Choose action...' },
    { value: 'activate', label: 'Activate Users' },
    { value: 'deactivate', label: 'Deactivate Users' },
    { value: 'change-role', label: 'Change Role' },
    { value: 'change-department', label: 'Change Department' },
    { value: 'send-invitation', label: 'Send Invitation' },
    { value: 'export-data', label: 'Export User Data' },
    { value: 'delete', label: 'Delete Users' }
  ];

  const handleApplyAction = () => {
    if (selectedAction) {
      onBulkAction(selectedAction);
      setSelectedAction('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedCount} of {totalUsers} users selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear selection
          </Button>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none min-w-48">
            <Select
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Choose action..."
            />
          </div>
          
          <Button
            variant="default"
            onClick={handleApplyAction}
            disabled={!selectedAction}
            className="whitespace-nowrap"
          >
            <Icon name="Play" size={16} className="mr-2" />
            Apply Action
          </Button>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-primary/20">
        <span className="text-sm text-muted-foreground mr-2">Quick actions:</span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onBulkAction('activate')}
          className="text-success hover:text-success"
        >
          <Icon name="UserCheck" size={14} className="mr-1" />
          Activate
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onBulkAction('deactivate')}
          className="text-warning hover:text-warning"
        >
          <Icon name="UserX" size={14} className="mr-1" />
          Deactivate
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onBulkAction('send-invitation')}
        >
          <Icon name="Mail" size={14} className="mr-1" />
          Send Invite
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onBulkAction('export-data')}
        >
          <Icon name="Download" size={14} className="mr-1" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;