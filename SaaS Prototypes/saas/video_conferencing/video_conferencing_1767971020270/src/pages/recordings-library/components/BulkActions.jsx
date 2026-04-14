import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedRecordings, onBulkDownload, onBulkDelete, onBulkShare, onSelectAll, onDeselectAll, totalRecordings }) => {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  const selectedCount = selectedRecordings?.length;
  const isAllSelected = selectedCount === totalRecordings;

  const handleSelectAllToggle = () => {
    if (isAllSelected) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Selection Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAllToggle}
              className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm font-medium text-foreground">
              {selectedCount} of {totalRecordings} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeselectAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear selection
          </Button>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkDownload(selectedRecordings)}
            iconName="Download"
            iconPosition="left"
          >
            Download ({selectedCount})
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkShare(selectedRecordings)}
            iconName="Share2"
            iconPosition="left"
          >
            Share ({selectedCount})
          </Button>

          {/* More Actions Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
              iconName="MoreHorizontal"
            />

            {isActionMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-50">
                <div className="py-2">
                  <button
                    onClick={() => {
                      onBulkDelete(selectedRecordings);
                      setIsActionMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted transition-micro flex items-center space-x-2"
                  >
                    <Icon name="Trash2" size={16} />
                    <span>Delete Selected ({selectedCount})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside handler */}
      {isActionMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsActionMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default BulkActions;