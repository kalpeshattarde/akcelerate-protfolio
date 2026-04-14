import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContractPreview = ({ selectedContract, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedContract) {
    return (
      <div className="w-80 bg-surface border-l border-border flex items-center justify-center">
        <div className="text-center p-6">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No Contract Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a contract from the grid to view its details and recent activity.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'terms', label: 'Key Terms', icon: 'List' },
    { id: 'stakeholders', label: 'Stakeholders', icon: 'Users' },
    { id: 'activity', label: 'Activity', icon: 'Clock' },
    { id: 'documents', label: 'Documents', icon: 'Folder' }
  ];

  const mockActivity = [
    {
      id: 1,
      type: 'status_change',
      user: 'Sarah Johnson',
      action: 'Changed status from Draft to Active',
      timestamp: '2024-09-03T14:30:00Z',
      icon: 'CheckCircle'
    },
    {
      id: 2,
      type: 'document_upload',
      user: 'Michael Chen',
      action: 'Uploaded signed contract document',
      timestamp: '2024-09-03T10:15:00Z',
      icon: 'Upload'
    },
    {
      id: 3,
      type: 'comment',
      user: 'Jennifer Davis',
      action: 'Added comment: "Legal review completed successfully"',
      timestamp: '2024-09-02T16:45:00Z',
      icon: 'MessageCircle'
    },
    {
      id: 4,
      type: 'approval',
      user: 'David Wilson',
      action: 'Approved contract for execution',
      timestamp: '2024-09-02T11:20:00Z',
      icon: 'ThumbsUp'
    },
    {
      id: 5,
      type: 'edit',
      user: 'Lisa Anderson',
      action: 'Updated contract terms and conditions',
      timestamp: '2024-09-01T09:30:00Z',
      icon: 'Edit'
    }
  ];

  const mockStakeholders = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Contract Owner',
      department: 'IT',
      email: 'sarah.johnson@company.com',
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Technical Lead',
      department: 'IT',
      email: 'michael.chen@company.com',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Jennifer Davis',
      role: 'Legal Counsel',
      department: 'Legal',
      email: 'jennifer.davis@company.com',
      avatar: 'JD'
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Finance Approver',
      department: 'Finance',
      email: 'david.wilson@company.com',
      avatar: 'DW'
    }
  ];

  const mockDocuments = [
    {
      id: 1,
      name: 'Microsoft_Office_365_Agreement_Signed.pdf',
      type: 'Contract',
      size: '2.4 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-09-03T14:30:00Z',
      icon: 'FileText'
    },
    {
      id: 2,
      name: 'Technical_Specifications.docx',
      type: 'Specification',
      size: '1.8 MB',
      uploadedBy: 'Michael Chen',
      uploadedAt: '2024-09-02T10:15:00Z',
      icon: 'File'
    },
    {
      id: 3,
      name: 'Legal_Review_Notes.pdf',
      type: 'Review',
      size: '856 KB',
      uploadedBy: 'Jennifer Davis',
      uploadedAt: '2024-09-01T16:45:00Z',
      icon: 'FileText'
    },
    {
      id: 4,
      name: 'Budget_Approval_Form.xlsx',
      type: 'Financial',
      size: '245 KB',
      uploadedBy: 'David Wilson',
      uploadedAt: '2024-08-30T11:20:00Z',
      icon: 'FileSpreadsheet'
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value) => {
    if (value === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-success bg-success/10',
      pending: 'text-warning bg-warning/10',
      draft: 'text-muted-foreground bg-muted',
      expired: 'text-error bg-error/10',
      terminated: 'text-error bg-error/10',
      renewal: 'text-accent bg-accent/10'
    };
    return colors?.[status] || 'text-muted-foreground bg-muted';
  };

  const getRiskColor = (risk) => {
    const colors = {
      low: 'text-success',
      medium: 'text-warning',
      high: 'text-error'
    };
    return colors?.[risk] || 'text-muted-foreground';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Contract Header */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">{selectedContract?.title}</h3>
        <div className="flex items-center space-x-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedContract?.status)}`}>
            {selectedContract?.status?.charAt(0)?.toUpperCase() + selectedContract?.status?.slice(1)}
          </span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${getRiskColor(selectedContract?.riskScore)?.replace('text-', 'bg-')}`} />
            <span className={`text-xs font-medium ${getRiskColor(selectedContract?.riskScore)}`}>
              {selectedContract?.riskScore?.toUpperCase()} RISK
            </span>
          </div>
        </div>
      </div>

      {/* Key Information */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Contract ID</label>
          <p className="text-sm font-mono text-accent mt-1">{selectedContract?.id}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Counterparty</label>
          <p className="text-sm text-text-primary mt-1">{selectedContract?.counterparty}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Contract Value</label>
          <p className="text-sm font-semibold text-text-primary mt-1">{formatCurrency(selectedContract?.value)}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Effective Date</label>
            <p className="text-sm text-text-primary mt-1">{formatDate(selectedContract?.effectiveDate)}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Expiration Date</label>
            <p className="text-sm text-text-primary mt-1">{formatDate(selectedContract?.expirationDate)}</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Owner</label>
          <p className="text-sm text-text-primary mt-1">{selectedContract?.owner}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Department</label>
          <p className="text-sm text-text-primary mt-1">{selectedContract?.department}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Tags</label>
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedContract?.tags?.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderKeyTerms = () => (
    <div className="space-y-4">
      <div className="p-4 bg-muted/30 rounded-lg">
        <h4 className="text-sm font-medium text-text-primary mb-3">Payment Terms</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Annual subscription payment</p>
          <p>• Net 30 payment terms</p>
          <p>• Auto-renewal clause included</p>
          <p>• Price escalation: 3% annually</p>
        </div>
      </div>

      <div className="p-4 bg-muted/30 rounded-lg">
        <h4 className="text-sm font-medium text-text-primary mb-3">Service Level Agreement</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• 99.9% uptime guarantee</p>
          <p>• 24/7 technical support</p>
          <p>• Response time: &lt; 4 hours</p>
          <p>• Monthly service reports</p>
        </div>
      </div>

      <div className="p-4 bg-muted/30 rounded-lg">
        <h4 className="text-sm font-medium text-text-primary mb-3">Termination Clauses</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• 90-day notice required</p>
          <p>• Data export assistance</p>
          <p>• Pro-rated refund policy</p>
          <p>• Transition support included</p>
        </div>
      </div>
    </div>
  );

  const renderStakeholders = () => (
    <div className="space-y-4">
      {mockStakeholders?.map((stakeholder) => (
        <div key={stakeholder?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">{stakeholder?.avatar}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">{stakeholder?.name}</p>
            <p className="text-xs text-muted-foreground">{stakeholder?.role}</p>
            <p className="text-xs text-muted-foreground">{stakeholder?.department}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="Mail" size={14} />
          </Button>
        </div>
      ))}
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-4">
      {mockActivity?.map((activity) => (
        <div key={activity?.id} className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center mt-1">
            <Icon name={activity?.icon} size={14} className="text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-primary">{activity?.action}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-muted-foreground">{activity?.user}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{formatDateTime(activity?.timestamp)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-3">
      {mockDocuments?.map((document) => (
        <div key={document?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
          <Icon name={document?.icon} size={20} className="text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate" title={document?.name}>
              {document?.name}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-muted-foreground">{document?.size}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{document?.uploadedBy}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="Download" size={14} />
          </Button>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'terms':
        return renderKeyTerms();
      case 'stakeholders':
        return renderStakeholders();
      case 'activity':
        return renderActivity();
      case 'documents':
        return renderDocuments();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="w-80 bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Contract Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-1 px-2 py-1 text-xs rounded transition-smooth ${
                activeTab === tab?.id
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={12} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {renderTabContent()}
      </div>
      {/* Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Button variant="default" fullWidth iconName="Edit">
            Edit Contract
          </Button>
          <Button variant="outline" fullWidth iconName="Download">
            Download PDF
          </Button>
          <Button variant="ghost" fullWidth iconName="Share">
            Share Contract
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractPreview;