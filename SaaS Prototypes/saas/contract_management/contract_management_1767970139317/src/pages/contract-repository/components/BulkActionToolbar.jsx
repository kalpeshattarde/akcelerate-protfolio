import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionToolbar = ({ selectedContracts, onBulkAction, onClearSelection }) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isStatusChangeOpen, setIsStatusChangeOpen] = useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  const actionsRef = useRef(null);
  const statusRef = useRef(null);
  const assignmentRef = useRef(null);
  const exportRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsRef?.current && !actionsRef?.current?.contains(event?.target)) {
        setIsActionsOpen(false);
      }
      if (statusRef?.current && !statusRef?.current?.contains(event?.target)) {
        setIsStatusChangeOpen(false);
      }
      if (assignmentRef?.current && !assignmentRef?.current?.contains(event?.target)) {
        setIsAssignmentOpen(false);
      }
      if (exportRef?.current && !exportRef?.current?.contains(event?.target)) {
        setIsExportOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (selectedContracts?.length === 0) {
    return null;
  }

  const bulkActions = [
    {
      id: 'status-change',
      label: 'Change Status',
      icon: 'Circle',
      description: 'Update status for selected contracts',
      onClick: () => setIsStatusChangeOpen(true)
    },
    {
      id: 'reassign',
      label: 'Reassign Owner',
      icon: 'UserCheck',
      description: 'Change contract ownership',
      onClick: () => setIsAssignmentOpen(true)
    },
    {
      id: 'add-tags',
      label: 'Add Tags',
      icon: 'Tag',
      description: 'Add metadata tags',
      onClick: () => onBulkAction('add-tags', selectedContracts)
    },
    {
      id: 'export',
      label: 'Export Selected',
      icon: 'Download',
      description: 'Export contract data',
      onClick: () => setIsExportOpen(true)
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: 'Archive',
      description: 'Move to archive',
      onClick: () => onBulkAction('archive', selectedContracts),
      variant: 'warning'
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'Trash2',
      description: 'Permanently delete contracts',
      onClick: () => onBulkAction('delete', selectedContracts),
      variant: 'destructive'
    }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'text-success' },
    { value: 'pending', label: 'Pending Approval', color: 'text-warning' },
    { value: 'draft', label: 'Draft', color: 'text-muted-foreground' },
    { value: 'expired', label: 'Expired', color: 'text-error' },
    { value: 'terminated', label: 'Terminated', color: 'text-error' },
    { value: 'renewal', label: 'Up for Renewal', color: 'text-accent' }
  ];

  const assignmentOptions = [
    { id: 1, name: 'Sarah Johnson', department: 'IT', avatar: 'SJ' },
    { id: 2, name: 'Michael Chen', department: 'IT', avatar: 'MC' },
    { id: 3, name: 'Jennifer Davis', department: 'Legal', avatar: 'JD' },
    { id: 4, name: 'David Wilson', department: 'Finance', avatar: 'DW' },
    { id: 5, name: 'Lisa Anderson', department: 'HR', avatar: 'LA' },
    { id: 6, name: 'Robert Martinez', department: 'Operations', avatar: 'RM' }
  ];

  const exportOptions = [
    {
      id: 'csv',
      label: 'CSV Export',
      description: 'Comma-separated values for spreadsheets',
      icon: 'FileSpreadsheet'
    },
    {
      id: 'excel',
      label: 'Excel Export',
      description: 'Microsoft Excel format with formatting',
      icon: 'FileSpreadsheet'
    },
    {
      id: 'pdf',
      label: 'PDF Report',
      description: 'Formatted PDF document',
      icon: 'FileText'
    },
    {
      id: 'json',
      label: 'JSON Export',
      description: 'Machine-readable JSON format',
      icon: 'Code'
    }
  ];

  const handleStatusChange = (status) => {
    onBulkAction('status-change', selectedContracts, { status });
    setIsStatusChangeOpen(false);
  };

  const handleAssignment = (assignee) => {
    onBulkAction('reassign', selectedContracts, { assignee });
    setIsAssignmentOpen(false);
  };

  const handleExport = (format) => {
    onBulkAction('export', selectedContracts, { format });
    setIsExportOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-300">
      <div className="bg-surface border border-border rounded-lg shadow-elevated p-4 min-w-96">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-accent-foreground">
                {selectedContracts?.length}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {selectedContracts?.length} contract{selectedContracts?.length !== 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-muted-foreground">
                Choose an action to apply to all selected contracts
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSelection}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsStatusChangeOpen(true)}
            iconName="Circle"
            className="text-xs"
          >
            Status
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAssignmentOpen(true)}
            iconName="UserCheck"
            className="text-xs"
          >
            Assign
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportOpen(true)}
            iconName="Download"
            className="text-xs"
          >
            Export
          </Button>

          {/* More Actions Dropdown */}
          <div className="relative" ref={actionsRef}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              iconName="MoreHorizontal"
              className="text-xs"
            >
              More
            </Button>
            
            {isActionsOpen && (
              <div className="absolute bottom-12 left-0 w-64 bg-popover border border-border rounded-lg shadow-elevated z-400">
                <div className="p-2">
                  {bulkActions?.map((action) => (
                    <button
                      key={action?.id}
                      onClick={action?.onClick}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-smooth text-left ${
                        action?.variant === 'destructive' ?'text-error hover:bg-error/10'
                          : action?.variant === 'warning' ?'text-warning hover:bg-warning/10' :'text-text-primary hover:bg-muted'
                      }`}
                    >
                      <Icon name={action?.icon} size={16} />
                      <div>
                        <p className="font-medium">{action?.label}</p>
                        <p className="text-xs text-muted-foreground">{action?.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Change Dropdown */}
        {isStatusChangeOpen && (
          <div ref={statusRef} className="absolute bottom-20 left-4 w-64 bg-popover border border-border rounded-lg shadow-elevated z-400">
            <div className="p-2">
              <div className="px-3 py-2 text-sm font-medium text-text-primary border-b border-border mb-2">
                Change Status
              </div>
              {statusOptions?.map((status) => (
                <button
                  key={status?.value}
                  onClick={() => handleStatusChange(status?.value)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-muted rounded-md transition-smooth text-left"
                >
                  <div className={`w-2 h-2 rounded-full ${status?.color?.replace('text-', 'bg-')}`} />
                  <span>{status?.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Assignment Dropdown */}
        {isAssignmentOpen && (
          <div ref={assignmentRef} className="absolute bottom-20 left-20 w-72 bg-popover border border-border rounded-lg shadow-elevated z-400">
            <div className="p-2">
              <div className="px-3 py-2 text-sm font-medium text-text-primary border-b border-border mb-2">
                Reassign to Owner
              </div>
              {assignmentOptions?.map((assignee) => (
                <button
                  key={assignee?.id}
                  onClick={() => handleAssignment(assignee)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-muted rounded-md transition-smooth text-left"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">{assignee?.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium">{assignee?.name}</p>
                    <p className="text-xs text-muted-foreground">{assignee?.department}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Export Options Dropdown */}
        {isExportOpen && (
          <div ref={exportRef} className="absolute bottom-20 right-4 w-72 bg-popover border border-border rounded-lg shadow-elevated z-400">
            <div className="p-2">
              <div className="px-3 py-2 text-sm font-medium text-text-primary border-b border-border mb-2">
                Export Format
              </div>
              {exportOptions?.map((option) => (
                <button
                  key={option?.id}
                  onClick={() => handleExport(option?.id)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-muted rounded-md transition-smooth text-left"
                >
                  <Icon name={option?.icon} size={16} />
                  <div>
                    <p className="font-medium">{option?.label}</p>
                    <p className="text-xs text-muted-foreground">{option?.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActionToolbar;