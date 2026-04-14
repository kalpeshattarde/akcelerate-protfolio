import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkApprovalInterface = ({ onApprovalAction }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [bulkAction, setBulkAction] = useState('');
  const [bulkComment, setBulkComment] = useState('');

  const pendingApprovals = [
    {
      id: 'app-001',
      contractId: 'CNT-2024-001',
      title: 'Software License Agreement - Microsoft Office 365',
      type: 'Software License',
      value: 125000,
      vendor: 'Microsoft Corporation',
      requestedBy: 'John Doe',
      department: 'IT',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      priority: 'high',
      riskLevel: 'medium',
      currentStep: 'Legal Review',
      documents: 3,
      previousApprovals: ['Department Head', 'Procurement'],
      summary: `Annual software license renewal for Microsoft Office 365 suite.\nCovers 500 user licenses for enterprise productivity tools.\nIncludes advanced security features and compliance tools.`,
      keyTerms: {
        duration: '12 months',
        autoRenewal: 'Yes',
        terminationNotice: '90 days',
        paymentTerms: 'Net 30'
      }
    },
    {
      id: 'app-002',
      contractId: 'CNT-2024-002',
      title: 'Vendor Service Agreement - IT Support Services',
      type: 'Service Agreement',
      value: 75000,
      vendor: 'TechSupport Pro LLC',
      requestedBy: 'Sarah Wilson',
      department: 'IT',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      priority: 'critical',
      riskLevel: 'low',
      currentStep: 'Finance Approval',
      documents: 5,
      previousApprovals: ['Department Head', 'Legal'],
      summary: `Comprehensive IT support services contract.\nProvides 24/7 technical support for all company systems.\nIncludes on-site and remote support capabilities.`,
      keyTerms: {
        duration: '24 months',
        sla: '99.5% uptime',
        responseTime: '4 hours',
        paymentTerms: 'Monthly'
      }
    },
    {
      id: 'app-003',
      contractId: 'CNT-2024-003',
      title: 'Employment Contract - Senior Developer',
      type: 'Employment',
      value: 95000,
      vendor: 'N/A',
      requestedBy: 'Mike Johnson',
      department: 'Engineering',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      priority: 'medium',
      riskLevel: 'low',
      currentStep: 'HR Review',
      documents: 2,
      previousApprovals: ['Hiring Manager'],
      summary: `Employment contract for senior software developer position.\nFull-time permanent position with competitive benefits.\nSpecialized in React and Node.js development.`,
      keyTerms: {
        salary: '$95,000/year',
        startDate: '2024-10-01',
        probation: '90 days',
        benefits: 'Full package'
      }
    },
    {
      id: 'app-004',
      contractId: 'CNT-2024-004',
      title: 'NDA - Strategic Partnership Discussion',
      type: 'NDA',
      value: 0,
      vendor: 'Innovation Partners Inc',
      requestedBy: 'David Brown',
      department: 'Business Development',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      priority: 'high',
      riskLevel: 'medium',
      currentStep: 'Legal Review',
      documents: 1,
      previousApprovals: ['Business Development'],
      summary: `Non-disclosure agreement for strategic partnership discussions.\nCovers confidential business information exchange.\nMutual NDA with standard terms and conditions.`,
      keyTerms: {
        duration: '3 years',
        scope: 'Mutual',
        jurisdiction: 'Delaware',
        exceptions: 'Standard'
      }
    },
    {
      id: 'app-005',
      contractId: 'CNT-2024-005',
      title: 'Consulting Agreement - Digital Transformation',
      type: 'Consulting',
      value: 250000,
      vendor: 'Digital Solutions Consulting',
      requestedBy: 'Lisa Chen',
      department: 'Operations',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      priority: 'high',
      riskLevel: 'high',
      currentStep: 'Executive Approval',
      documents: 7,
      previousApprovals: ['Department Head', 'Legal', 'Finance'],
      summary: `Comprehensive digital transformation consulting engagement.\nIncludes process optimization and technology implementation.\nPhased approach over 18-month timeline.`,
      keyTerms: {
        duration: '18 months',
        phases: '3 phases',
        deliverables: 'Defined milestones',
        paymentTerms: 'Monthly'
      }
    }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Software License', label: 'Software License' },
    { value: 'Service Agreement', label: 'Service Agreement' },
    { value: 'Employment', label: 'Employment' },
    { value: 'NDA', label: 'NDA' },
    { value: 'Consulting', label: 'Consulting' }
  ];

  const valueOptions = [
    { value: 'all', label: 'All Values' },
    { value: 'under-50k', label: 'Under $50K' },
    { value: '50k-100k', label: '$50K - $100K' },
    { value: '100k-250k', label: '$100K - $250K' },
    { value: 'over-250k', label: 'Over $250K' }
  ];

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'value', label: 'Contract Value' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title' },
    { value: 'department', label: 'Department' }
  ];

  const bulkActionOptions = [
    { value: 'approve', label: 'Approve Selected' },
    { value: 'reject', label: 'Reject Selected' },
    { value: 'request-changes', label: 'Request Changes' },
    { value: 'escalate', label: 'Escalate to Manager' },
    { value: 'reassign', label: 'Reassign' }
  ];

  const filteredApprovals = pendingApprovals?.filter(approval => {
    const matchesSearch = approval?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         approval?.contractId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         approval?.vendor?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    let matchesFilter = true;
    if (filterType === 'type' && filterValue !== 'all') {
      matchesFilter = approval?.type === filterValue;
    } else if (filterType === 'value' && filterValue !== 'all') {
      const value = approval?.value;
      switch (filterValue) {
        case 'under-50k': matchesFilter = value < 50000; break;
        case '50k-100k': matchesFilter = value >= 50000 && value < 100000; break;
        case '100k-250k': matchesFilter = value >= 100000 && value < 250000; break;
        case 'over-250k': matchesFilter = value >= 250000; break;
      }
    }
    
    return matchesSearch && matchesFilter;
  })?.sort((a, b) => {
    switch (sortBy) {
      case 'dueDate': return new Date(a.dueDate) - new Date(b.dueDate);
      case 'value': return b?.value - a?.value;
      case 'priority': 
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
      case 'title': return a?.title?.localeCompare(b?.title);
      case 'department': return a?.department?.localeCompare(b?.department);
      default: return 0;
    }
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(filteredApprovals?.map(item => item?.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems?.filter(id => id !== itemId));
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedItems?.length === 0) return;
    
    const selectedApprovals = filteredApprovals?.filter(item => selectedItems?.includes(item?.id));
    onApprovalAction({
      action: bulkAction,
      items: selectedApprovals,
      comment: bulkComment
    });
    
    // Reset selections
    setSelectedItems([]);
    setBulkAction('');
    setBulkComment('');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error bg-error/10';
      case 'high': return 'text-warning bg-warning/10';
      case 'medium': return 'text-accent bg-accent/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatCurrency = (amount) => {
    if (amount === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDueDate = (date) => {
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, color: 'text-error' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-warning' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'text-warning' };
    } else if (diffDays <= 3) {
      return { text: `Due in ${diffDays} days`, color: 'text-warning' };
    } else {
      return { text: `Due in ${diffDays} days`, color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="w-full h-full bg-surface flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Bulk Approval Interface</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Review and process multiple approvals efficiently
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {selectedItems?.length} of {filteredApprovals?.length} selected
            </span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-64">
            <Input
              type="search"
              placeholder="Search contracts, vendors, or IDs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <Select
            options={typeOptions}
            value={filterType === 'type' ? filterValue : 'all'}
            onChange={(value) => {
              setFilterType('type');
              setFilterValue(value);
            }}
            placeholder="Filter by type"
            className="w-48"
          />
          <Select
            options={valueOptions}
            value={filterType === 'value' ? filterValue : 'all'}
            onChange={(value) => {
              setFilterType('value');
              setFilterValue(value);
            }}
            placeholder="Filter by value"
            className="w-48"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
            className="w-48"
          />
        </div>

        {/* Bulk Actions */}
        {selectedItems?.length > 0 && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-text-primary">
                Bulk Actions ({selectedItems?.length} items selected)
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedItems([])}
              >
                Clear Selection
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Select
                options={bulkActionOptions}
                value={bulkAction}
                onChange={setBulkAction}
                placeholder="Select action"
                className="w-48"
              />
              <div className="flex-1 min-w-64">
                <Input
                  placeholder="Add comment (optional)"
                  value={bulkComment}
                  onChange={(e) => setBulkComment(e?.target?.value)}
                />
              </div>
              <Button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className="px-6"
              >
                Execute Action
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Approval List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Select All */}
          <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-border">
            <Checkbox
              checked={selectedItems?.length === filteredApprovals?.length && filteredApprovals?.length > 0}
              onChange={(e) => handleSelectAll(e?.target?.checked)}
            />
            <span className="text-sm font-medium text-text-primary">
              Select All ({filteredApprovals?.length} items)
            </span>
          </div>

          {/* Approval Items */}
          <div className="space-y-4">
            {filteredApprovals?.map((approval) => {
              const dueInfo = formatDueDate(approval?.dueDate);
              return (
                <div
                  key={approval?.id}
                  className={`bg-background border rounded-lg p-6 transition-all duration-200 ${
                    selectedItems?.includes(approval?.id) 
                      ? 'border-accent shadow-soft' 
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Checkbox */}
                    <div className="pt-1">
                      <Checkbox
                        checked={selectedItems?.includes(approval?.id)}
                        onChange={(e) => handleSelectItem(approval?.id, e?.target?.checked)}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-text-primary mb-1">
                            {approval?.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{approval?.contractId}</span>
                            <span>•</span>
                            <span>{approval?.vendor}</span>
                            <span>•</span>
                            <span>{formatCurrency(approval?.value)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(approval?.priority)}`}>
                            {approval?.priority?.charAt(0)?.toUpperCase() + approval?.priority?.slice(1)}
                          </span>
                          <span className={`text-xs font-medium ${dueInfo?.color}`}>
                            {dueInfo?.text}
                          </span>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Department</div>
                          <div className="text-sm font-medium text-text-primary">{approval?.department}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Requested By</div>
                          <div className="text-sm font-medium text-text-primary">{approval?.requestedBy}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Risk Level</div>
                          <div className={`text-sm font-medium ${getRiskColor(approval?.riskLevel)}`}>
                            {approval?.riskLevel?.charAt(0)?.toUpperCase() + approval?.riskLevel?.slice(1)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Documents</div>
                          <div className="text-sm font-medium text-text-primary">{approval?.documents} files</div>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-2">Contract Summary</div>
                        <div className="text-sm text-text-primary whitespace-pre-line">
                          {approval?.summary}
                        </div>
                      </div>

                      {/* Key Terms */}
                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-2">Key Terms</div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {Object.entries(approval?.keyTerms)?.map(([key, value]) => (
                            <div key={key} className="bg-muted rounded-lg p-2">
                              <div className="text-xs text-muted-foreground capitalize">
                                {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                              </div>
                              <div className="text-sm font-medium text-text-primary">{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Previous Approvals */}
                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-2">Previous Approvals</div>
                        <div className="flex items-center space-x-2">
                          {approval?.previousApprovals?.map((approver, index) => (
                            <div key={index} className="flex items-center space-x-1">
                              <Icon name="CheckCircle" size={14} className="text-success" />
                              <span className="text-sm text-text-primary">{approver}</span>
                              {index < approval?.previousApprovals?.length - 1 && (
                                <Icon name="ChevronRight" size={14} className="text-muted-foreground mx-1" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                          Current Step: <span className="font-medium text-text-primary">{approval?.currentStep}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Icon name="FileText" size={16} className="mr-2" />
                            View Documents
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="MessageSquare" size={16} className="mr-2" />
                            Comments
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="ExternalLink" size={16} className="mr-2" />
                            Full Details
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Icon name="X" size={16} className="mr-2" />
                            Reject
                          </Button>
                          <Button size="sm">
                            <Icon name="Check" size={16} className="mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkApprovalInterface;