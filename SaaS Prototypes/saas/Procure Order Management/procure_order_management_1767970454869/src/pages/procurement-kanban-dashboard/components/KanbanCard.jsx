import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const KanbanCard = ({ po, isSelected, isBulkMode, onSelect, columnId }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getUrgencyIndicator = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) return { color: 'text-error', bg: 'bg-error-50', label: 'Overdue' };
    if (daysUntilDue <= 3) return { color: 'text-warning', bg: 'bg-warning-50', label: 'Due Soon' };
    if (daysUntilDue <= 7) return { color: 'text-primary', bg: 'bg-primary-50', label: 'Upcoming' };
    return { color: 'text-success', bg: 'bg-success-50', label: 'On Track' };
  };

  const urgency = getUrgencyIndicator(po.dueDate);
  const formattedDate = new Date(po.dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleCardClick = (e) => {
    if (isBulkMode) {
      e.preventDefault();
      onSelect();
    }
  };

  const getColumnActions = () => {
    switch (columnId) {
      case 'draft':
        return [
          { icon: 'Edit', label: 'Edit', action: 'edit' },
          { icon: 'Send', label: 'Submit for Approval', action: 'submit' }
        ];
      case 'pending':
        return [
          { icon: 'CheckCircle', label: 'Approve', action: 'approve' },
          { icon: 'XCircle', label: 'Reject', action: 'reject' }
        ];
      case 'ordered':
        return [
          { icon: 'Truck', label: 'Track Shipment', action: 'track' },
          { icon: 'Package', label: 'Mark Received', action: 'receive' }
        ];
      case 'received':
        return [
          { icon: 'FileText', label: 'View Invoice', action: 'invoice' },
          { icon: 'Archive', label: 'Archive', action: 'archive' }
        ];
      default:
        return [];
    }
  };

  const actions = getColumnActions();

  return (
    <div
      className={`bg-surface border rounded-card p-4 hover:shadow-elevation-md transition-all cursor-pointer ${
        isSelected ? 'border-primary bg-primary-50' : 'border-border'
      } ${isBulkMode ? 'hover:border-primary' : ''}`}
      onClick={handleCardClick}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            {isBulkMode && (
              <div className={`w-4 h-4 border-2 rounded ${
                isSelected ? 'bg-primary border-primary' : 'border-border'
              } flex items-center justify-center`}>
                {isSelected && <Icon name="Check" size={12} color="white" />}
              </div>
            )}
            <Link
              to={`/purchase-order-detail-view?id=${po.id}`}
              className="font-heading-medium text-text-primary hover:text-primary transition-smooth"
              onClick={(e) => isBulkMode && e.preventDefault()}
            >
              {po.id}
            </Link>
            <Icon 
              name={getPriorityIcon(po.priority)} 
              size={14} 
              className={getPriorityColor(po.priority)}
            />
          </div>
          <p className="text-sm text-text-secondary font-body-medium">{po.supplier}</p>
        </div>
        
        <div className="flex items-center space-x-1">
          {actions.slice(0, 2).map((action, index) => (
            <button
              key={index}
              className="p-1.5 rounded hover:bg-secondary-100 transition-smooth"
              title={action.label}
              onClick={(e) => {
                e.stopPropagation();
                console.log(`${action.action} action for ${po.id}`);
              }}
            >
              <Icon name={action.icon} size={14} className="text-text-secondary" />
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div className="mb-3">
        <div className="text-lg font-heading-semibold text-text-primary">
          ${po.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-text-secondary">
          {po.items} item{po.items !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Due Date & Urgency */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-text-secondary">
          Due: {formattedDate}
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${urgency.bg} ${urgency.color}`}>
          {urgency.label}
        </span>
      </div>

      {/* Additional Info */}
      <div className="space-y-2 text-xs text-text-secondary">
        <div className="flex items-center justify-between">
          <span>Assignee:</span>
          <span className="font-body-medium">{po.assignee}</span>
        </div>
        
        {po.approver && (
          <div className="flex items-center justify-between">
            <span>Approver:</span>
            <span className="font-body-medium">{po.approver}</span>
          </div>
        )}
        
        {po.trackingNumber && (
          <div className="flex items-center justify-between">
            <span>Tracking:</span>
            <span className="font-body-medium font-mono">{po.trackingNumber}</span>
          </div>
        )}
        
        {po.invoiceNumber && (
          <div className="flex items-center justify-between">
            <span>Invoice:</span>
            <span className="font-body-medium">{po.invoiceNumber}</span>
          </div>
        )}
      </div>

      {/* Last Updated */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Updated:</span>
          <span>{new Date(po.lastUpdated).toLocaleDateString('en-US')}</span>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;