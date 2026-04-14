import React from 'react';
import Icon from '../../../components/AppIcon';

const StorageInfo = ({ storageData }) => {
  const { used, total, recordings } = storageData;
  const usagePercentage = (used / total) * 100;
  
  const formatStorage = (bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes?.[i];
  };

  const getUsageColor = () => {
    if (usagePercentage >= 90) return 'text-error bg-error/10';
    if (usagePercentage >= 75) return 'text-warning bg-warning/10';
    return 'text-success bg-success/10';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-foreground flex items-center space-x-2">
          <Icon name="HardDrive" size={20} />
          <span>Storage Usage</span>
        </h3>
        
        <div className={`text-xs px-2 py-1 rounded ${getUsageColor()}`}>
          {usagePercentage?.toFixed(1)}% used
        </div>
      </div>
      {/* Storage Bar */}
      <div className="mb-4">
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              usagePercentage >= 90 ? 'bg-error' : 
              usagePercentage >= 75 ? 'bg-warning' : 'bg-success'
            }`}
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
          <span>{formatStorage(used)} used</span>
          <span>{formatStorage(total)} total</span>
        </div>
      </div>
      {/* Storage Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-foreground">{recordings?.total}</div>
          <div className="text-xs text-muted-foreground">Total Recordings</div>
        </div>
        
        <div>
          <div className="text-lg font-semibold text-foreground">{recordings?.thisMonth}</div>
          <div className="text-xs text-muted-foreground">This Month</div>
        </div>
        
        <div>
          <div className="text-lg font-semibold text-foreground">{formatStorage(total - used)}</div>
          <div className="text-xs text-muted-foreground">Available</div>
        </div>
      </div>
      {/* Auto-cleanup Info */}
      {usagePercentage >= 85 && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div className="text-sm">
              <p className="text-warning font-medium">Storage Almost Full</p>
              <p className="text-muted-foreground text-xs mt-1">
                Consider deleting old recordings or upgrading your storage plan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageInfo;