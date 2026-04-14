import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkOperationsToolbar = ({ selectedUsers, onBulkAction, onClearSelection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const bulkActions = [
    {
      id: 'activate',
      label: 'Activate Users',
      icon: 'CheckCircle',
      color: 'text-success',
      description: 'Enable selected user accounts'
    },
    {
      id: 'deactivate',
      label: 'Deactivate Users',
      icon: 'XCircle',
      color: 'text-error',
      description: 'Disable selected user accounts',
      requiresConfirmation: true
    },
    {
      id: 'reset-password',
      label: 'Reset Passwords',
      icon: 'Key',
      color: 'text-warning',
      description: 'Send password reset emails to selected users'
    },
    {
      id: 'enable-mfa',
      label: 'Enable MFA',
      icon: 'Shield',
      color: 'text-primary',
      description: 'Require MFA for selected users'
    },
    {
      id: 'disable-mfa',
      label: 'Disable MFA',
      icon: 'ShieldOff',
      color: 'text-warning',
      description: 'Remove MFA requirement for selected users',
      requiresConfirmation: true
    },
    {
      id: 'change-role',
      label: 'Change Role',
      icon: 'UserCog',
      color: 'text-secondary',
      description: 'Assign new role to selected users'
    },
    {
      id: 'export-users',
      label: 'Export Users',
      icon: 'Download',
      color: 'text-muted-foreground',
      description: 'Export selected user data to CSV'
    },
    {
      id: 'send-notification',
      label: 'Send Notification',
      icon: 'Mail',
      color: 'text-primary',
      description: 'Send email notification to selected users'
    }
  ];

  const handleActionClick = (action) => {
    if (action?.requiresConfirmation) {
      setPendingAction(action);
      setIsConfirmModalOpen(true);
    } else {
      onBulkAction(action?.id, selectedUsers);
    }
    setIsDropdownOpen(false);
  };

  const handleConfirmAction = () => {
    if (pendingAction) {
      onBulkAction(pendingAction?.id, selectedUsers);
      setPendingAction(null);
    }
    setIsConfirmModalOpen(false);
  };

  const selectedCount = selectedUsers?.size;

  if (selectedCount === 0) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={14} className="mr-1" />
            Clear Selection
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleActionClick(bulkActions?.find(a => a?.id === 'activate'))}
          >
            <Icon name="CheckCircle" size={14} className="mr-1 text-success" />
            Activate
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleActionClick(bulkActions?.find(a => a?.id === 'deactivate'))}
          >
            <Icon name="XCircle" size={14} className="mr-1 text-error" />
            Deactivate
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleActionClick(bulkActions?.find(a => a?.id === 'reset-password'))}
          >
            <Icon name="Key" size={14} className="mr-1 text-warning" />
            Reset Password
          </Button>

          {/* More Actions Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Icon name="MoreHorizontal" size={14} className="mr-1" />
              More Actions
              <Icon name="ChevronDown" size={12} className="ml-1" />
            </Button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal z-50">
                <div className="p-2">
                  {bulkActions?.slice(3)?.map((action) => (
                    <button
                      key={action?.id}
                      onClick={() => handleActionClick(action)}
                      className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors duration-150 text-left"
                    >
                      <Icon name={action?.icon} size={16} className={action?.color} />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{action?.label}</div>
                        <div className="text-xs text-muted-foreground">{action?.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {isConfirmModalOpen && pendingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Confirm Action</h3>
                  <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-foreground mb-2">
                  Are you sure you want to <strong>{pendingAction?.label?.toLowerCase()}</strong> for {selectedCount} user{selectedCount !== 1 ? 's' : ''}?
                </p>
                <p className="text-xs text-muted-foreground">
                  {pendingAction?.description}
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsConfirmModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleConfirmAction}
                >
                  <Icon name={pendingAction?.icon} size={14} className="mr-1" />
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default BulkOperationsToolbar;