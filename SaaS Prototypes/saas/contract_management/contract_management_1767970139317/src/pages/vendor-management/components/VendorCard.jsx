import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VendorCard = ({ vendor, onViewDetails, onEdit, onMessage }) => {
  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 75) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-success bg-success/10 border-success/20';
      case 'Pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'Inactive':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            {vendor?.logo ? (
              <Image 
                src={vendor?.logo} 
                alt={`${vendor?.name} logo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="Building2" size={24} className="text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{vendor?.name}</h3>
            <p className="text-sm text-muted-foreground">{vendor?.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(vendor?.status)}`}>
            {vendor?.status}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Performance Score</p>
          <div className="flex items-center space-x-2">
            <span className={`text-lg font-bold ${getPerformanceColor(vendor?.performanceScore)?.split(' ')?.[0]}`}>
              {vendor?.performanceScore}%
            </span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${getPerformanceColor(vendor?.performanceScore)?.split(' ')?.[1]} transition-all duration-300`}
                style={{ width: `${vendor?.performanceScore}%` }}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Total Spend</p>
          <p className="text-lg font-bold text-text-primary">${vendor?.totalSpend?.toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Active Contracts</p>
          <p className="text-sm font-medium text-text-primary">{vendor?.contractCount}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Last Activity</p>
          <p className="text-sm font-medium text-text-primary">{vendor?.lastActivity}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="MapPin" size={14} />
          <span>{vendor?.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMessage(vendor)}
            iconName="MessageCircle"
            iconSize={14}
          >
            Message
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(vendor)}
            iconName="Edit"
            iconSize={14}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;