import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AuditLogPanel = ({ isOpen, onClose }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const auditLogs = [
    {
      id: 1,
      action: 'User Created',
      user: 'John Smith',
      target: 'sarah.johnson@company.com',
      timestamp: new Date(Date.now() - 300000),
      details: 'Created new user account with User role',
      type: 'create'
    },
    {
      id: 2,
      action: 'Role Changed',
      user: 'Admin User',
      target: 'mike.wilson@company.com',
      timestamp: new Date(Date.now() - 900000),
      details: 'Changed role from User to Moderator',
      type: 'update'
    },
    {
      id: 3,
      action: 'User Deactivated',
      user: 'John Smith',
      target: 'inactive.user@company.com',
      timestamp: new Date(Date.now() - 1800000),
      details: 'Account deactivated due to policy violation',
      type: 'deactivate'
    },
    {
      id: 4,
      action: 'Bulk Permission Update',
      user: 'Admin User',
      target: '15 users',
      timestamp: new Date(Date.now() - 3600000),
      details: 'Added Analytics Access permission to Engineering department',
      type: 'bulk'
    },
    {
      id: 5,
      action: 'User Login',
      user: 'emma.davis@company.com',
      target: 'Self',
      timestamp: new Date(Date.now() - 7200000),
      details: 'Successful login from 192.168.1.100',
      type: 'login'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Actions' },
    { value: 'create', label: 'User Creation' },
    { value: 'update', label: 'Updates' },
    { value: 'deactivate', label: 'Deactivations' },
    { value: 'bulk', label: 'Bulk Actions' },
    { value: 'login', label: 'Login Activity' }
  ];

  const getActionIcon = (type) => {
    const icons = {
      create: 'UserPlus',
      update: 'Edit',
      deactivate: 'UserX',
      bulk: 'Users',
      login: 'LogIn'
    };
    return icons?.[type] || 'Activity';
  };

  const getActionColor = (type) => {
    const colors = {
      create: 'text-success',
      update: 'text-primary',
      deactivate: 'text-error',
      bulk: 'text-warning',
      login: 'text-accent'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date?.toLocaleDateString();
  };

  const filteredLogs = selectedFilter === 'all' 
    ? auditLogs 
    : auditLogs?.filter(log => log?.type === selectedFilter);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-surface border-l border-border shadow-floating z-40 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Audit Log</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Filter */}
        <div className="p-4 border-b border-border">
          <Select
            label="Filter Actions"
            options={filterOptions}
            value={selectedFilter}
            onChange={setSelectedFilter}
          />
        </div>

        {/* Logs List */}
        <div className="flex-1 overflow-y-auto">
          {filteredLogs?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <Icon name="FileText" size={48} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No audit logs found</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredLogs?.map((log) => (
                <div
                  key={log?.id}
                  className="p-4 hover:bg-muted/50 transition-micro border-b border-border last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActionColor(log?.type)}`}>
                      <Icon name={getActionIcon(log?.type)} size={16} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {log?.action}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatTimestamp(log?.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-1">
                        by <span className="font-medium">{log?.user}</span>
                        {log?.target !== 'Self' && (
                          <> → <span className="font-medium">{log?.target}</span></>
                        )}
                      </p>
                      
                      <p className="text-xs text-muted-foreground">
                        {log?.details}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => console.log('Export audit log')}
          >
            <Icon name="Download" size={16} className="mr-2" />
            Export Log
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogPanel;