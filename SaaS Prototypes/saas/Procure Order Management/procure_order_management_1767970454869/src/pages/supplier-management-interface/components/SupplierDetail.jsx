import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SupplierDetail = ({ supplier, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!supplier) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success-100';
      case 'pending': return 'text-warning bg-warning-100';
      case 'inactive': return 'text-error bg-error-100';
      default: return 'text-text-secondary bg-secondary-100';
    }
  };

  const getComplianceColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-success';
      case 'review-required': return 'text-warning';
      case 'non-compliant': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'performance', label: 'Performance', icon: 'BarChart3' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare' }
  ];

  const recentCommunications = [
    {
      id: 1,
      type: 'email',
      subject: 'Contract renewal discussion',
      date: '2024-01-18',
      status: 'sent'
    },
    {
      id: 2,
      type: 'meeting',
      subject: 'Quarterly business review',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'call',
      subject: 'Delivery schedule update',
      date: '2024-01-12',
      status: 'completed'
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'Master Service Agreement',
      type: 'contract',
      expiry: '2024-12-31',
      status: 'active'
    },
    {
      id: 2,
      name: 'ISO 9001 Certificate',
      type: 'certification',
      expiry: '2024-08-15',
      status: 'expiring-soon'
    },
    {
      id: 3,
      name: 'Insurance Certificate',
      type: 'insurance',
      expiry: '2024-06-30',
      status: 'active'
    }
  ];

  return (
    <div className="bg-surface rounded-card border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading-medium text-text-primary">Supplier Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-button transition-smooth"
          >
            <Icon name="X" size={16} className="text-text-secondary" />
          </button>
        </div>

        {/* Supplier Header Info */}
        <div className="space-y-3">
          <div>
            <h4 className="font-heading-medium text-text-primary">{supplier.name}</h4>
            <p className="text-sm text-text-secondary">{supplier.id}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-body-medium ${getStatusColor(supplier.status)}`}>
              {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
            </span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning" />
              <span className="text-sm font-body-medium text-text-primary">{supplier.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-body-medium border-b-2 transition-smooth ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <h5 className="font-heading-medium text-text-primary mb-3">Contact Information</h5>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{supplier.contactPerson}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{supplier.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{supplier.phone}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="MapPin" size={16} className="text-text-secondary mt-0.5" />
                  <span className="text-sm text-text-primary">{supplier.address}</span>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div>
              <h5 className="font-heading-medium text-text-primary mb-3">Business Information</h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-text-secondary">Payment Terms</p>
                  <p className="text-sm font-body-medium text-text-primary">{supplier.paymentTerms}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Total Spend</p>
                  <p className="text-sm font-body-medium text-text-primary">{formatCurrency(supplier.totalSpend)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Last Order</p>
                  <p className="text-sm font-body-medium text-text-primary">{formatDate(supplier.lastOrderDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Contract Expiry</p>
                  <p className="text-sm font-body-medium text-text-primary">{formatDate(supplier.contractExpiry)}</p>
                </div>
              </div>
            </div>

            {/* Compliance Status */}
            <div>
              <h5 className="font-heading-medium text-text-primary mb-3">Compliance Status</h5>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={supplier.complianceStatus === 'compliant' ? 'CheckCircle' : 
                        supplier.complianceStatus === 'review-required' ? 'AlertCircle' : 'XCircle'} 
                  size={16} 
                  className={getComplianceColor(supplier.complianceStatus)}
                />
                <span className={`text-sm font-body-medium ${getComplianceColor(supplier.complianceStatus)}`}>
                  {supplier.complianceStatus.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>
            </div>

            {/* Portal Status */}
            <div>
              <h5 className="font-heading-medium text-text-primary mb-3">Integration Status</h5>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  supplier.portalStatus === 'connected' ? 'bg-success' : 'bg-error'
                }`}></div>
                <span className="text-sm text-text-primary">
                  Supplier Portal: {supplier.portalStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div>
              <h5 className="font-heading-medium text-text-primary mb-3">Performance Metrics</h5>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-text-secondary">Delivery Performance</span>
                    <span className="text-sm font-body-medium text-text-primary">{supplier.deliveryRating}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full" 
                      style={{ width: `${supplier.deliveryRating}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-text-secondary">Quality Rating</span>
                    <span className="text-sm font-body-medium text-text-primary">{supplier.qualityRating}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${supplier.qualityRating}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h5 className="font-heading-medium text-text-primary mb-3">Certifications</h5>
              <div className="space-y-2">
                {supplier.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Award" size={16} className="text-accent" />
                    <span className="text-sm text-text-primary">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-4">
            <h5 className="font-heading-medium text-text-primary mb-3">Documents</h5>
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-button">
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={16} className="text-text-secondary" />
                  <div>
                    <p className="text-sm font-body-medium text-text-primary">{doc.name}</p>
                    <p className="text-xs text-text-secondary">Expires: {formatDate(doc.expiry)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    doc.status === 'active' ? 'bg-success-100 text-success' :
                    doc.status === 'expiring-soon'? 'bg-warning-100 text-warning' : 'bg-error-100 text-error'
                  }`}>
                    {doc.status.replace('-', ' ')}
                  </span>
                  <button className="p-1 hover:bg-secondary-100 rounded transition-smooth">
                    <Icon name="Download" size={14} className="text-text-secondary" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="space-y-4">
            <h5 className="font-heading-medium text-text-primary mb-3">Recent Communications</h5>
            {recentCommunications.map((comm) => (
              <div key={comm.id} className="flex items-start space-x-3 p-3 border border-border rounded-button">
                <Icon 
                  name={comm.type === 'email' ? 'Mail' : comm.type === 'meeting' ? 'Calendar' : 'Phone'} 
                  size={16} 
                  className="text-text-secondary mt-0.5" 
                />
                <div className="flex-1">
                  <p className="text-sm font-body-medium text-text-primary">{comm.subject}</p>
                  <p className="text-xs text-text-secondary">{formatDate(comm.date)}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  comm.status === 'completed' ? 'bg-success-100 text-success' :
                  comm.status === 'sent'? 'bg-primary-100 text-primary' : 'bg-secondary-100 text-text-secondary'
                }`}>
                  {comm.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <button className="flex-1 px-3 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth text-sm">
            Edit Supplier
          </button>
          <button className="px-3 py-2 border border-border rounded-button hover:bg-secondary-100 transition-smooth text-sm">
            <Icon name="Mail" size={16} />
          </button>
          <button className="px-3 py-2 border border-border rounded-button hover:bg-secondary-100 transition-smooth text-sm">
            <Icon name="Phone" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;