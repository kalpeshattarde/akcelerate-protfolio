import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditTrail = ({ auditData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [dateRange, setDateRange] = useState('');

  const actionOptions = [
    { value: '', label: 'All Actions' },
    { value: 'created', label: 'Created' },
    { value: 'modified', label: 'Modified' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'deleted', label: 'Deleted' },
    { value: 'exported', label: 'Exported' }
  ];

  const userOptions = [
    { value: '', label: 'All Users' },
    { value: 'john.doe', label: 'John Doe' },
    { value: 'jane.smith', label: 'Jane Smith' },
    { value: 'mike.johnson', label: 'Mike Johnson' },
    { value: 'sarah.wilson', label: 'Sarah Wilson' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const getActionIcon = (action) => {
    switch (action) {
      case 'created': return 'Plus';
      case 'modified': return 'Edit3';
      case 'approved': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'deleted': return 'Trash2';
      case 'exported': return 'Download';
      default: return 'Activity';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'created': return 'text-success';
      case 'modified': return 'text-accent';
      case 'approved': return 'text-success';
      case 'rejected': return 'text-error';
      case 'deleted': return 'text-error';
      case 'exported': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const filteredData = auditData?.filter(item => {
    const matchesSearch = item?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.user?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesAction = !selectedAction || item?.action === selectedAction;
    const matchesUser = !selectedUser || item?.userId === selectedUser;
    return matchesSearch && matchesAction && matchesUser;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-surface p-6 rounded-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search audit logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          <Select
            placeholder="Filter by action"
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
          />
          <Select
            placeholder="Filter by user"
            options={userOptions}
            value={selectedUser}
            onChange={setSelectedUser}
          />
          <Select
            placeholder="Date range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {filteredData?.length} of {auditData?.length} audit entries
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Filter" size={16} className="mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>
      </div>
      {/* Audit Trail List */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          {filteredData?.map((entry, index) => (
            <div key={entry?.id} className={`p-4 ${index !== filteredData?.length - 1 ? 'border-b border-border' : ''} hover:bg-muted/50 transition-smooth`}>
              <div className="flex items-start space-x-4">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getActionColor(entry?.action)}`}>
                  <Icon name={getActionIcon(entry?.action)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-text-primary">{entry?.user}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-muted ${getActionColor(entry?.action)}`}>
                        {entry?.action?.charAt(0)?.toUpperCase() + entry?.action?.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{entry?.timestamp}</span>
                      <span className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{entry?.ipAddress}</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{entry?.description}</p>
                  {entry?.details && (
                    <div className="bg-muted p-3 rounded-lg text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(entry?.details)?.map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">{key?.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="font-medium text-text-primary">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Eye" size={14} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreHorizontal" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {filteredData?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No audit entries found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default AuditTrail;