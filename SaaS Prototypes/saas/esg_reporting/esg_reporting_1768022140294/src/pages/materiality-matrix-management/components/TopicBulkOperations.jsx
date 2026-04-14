import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TopicBulkOperations = ({ 
  selectedTopics = [], 
  onBulkUpdate,
  onBulkDelete,
  onBulkExport,
  onClearSelection,
  assessmentPeriods = [],
  currentPeriod = null,
  onPeriodChange,
  className = ""
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [bulkCategory, setBulkCategory] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const bulkActionOptions = [
    { value: 'update-category', label: 'Update Category' },
    { value: 'update-scores', label: 'Update Scores' },
    { value: 'assign-policy', label: 'Assign Policy' },
    { value: 'export', label: 'Export Topics' },
    { value: 'delete', label: 'Delete Topics' }
  ];

  const categoryOptions = [
    { value: 'environmental', label: 'Environmental' },
    { value: 'social', label: 'Social' },
    { value: 'governance', label: 'Governance' },
    { value: 'economic', label: 'Economic' }
  ];

  const periodOptions = assessmentPeriods?.map(period => ({
    value: period?.id,
    label: period?.name
  }));

  const handleBulkAction = () => {
    switch (bulkAction) {
      case 'update-category':
        if (bulkCategory) {
          onBulkUpdate(selectedTopics, { category: bulkCategory });
        }
        break;
      case 'export':
        onBulkExport(selectedTopics);
        break;
      case 'delete':
        setShowConfirmDialog(true);
        return;
      default:
        break;
    }
    
    setShowBulkActions(false);
    setBulkAction('');
    setBulkCategory('');
  };

  const handleConfirmDelete = () => {
    onBulkDelete(selectedTopics);
    setShowConfirmDialog(false);
    setShowBulkActions(false);
    setBulkAction('');
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Selection Info */}
          <div className="flex items-center space-x-4">
            {selectedTopics?.length > 0 ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckSquare" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {selectedTopics?.length} topic{selectedTopics?.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearSelection}
                >
                  Clear
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBulkActions(!showBulkActions)}
                >
                  <Icon name="Settings" size={14} />
                  Bulk Actions
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Icon name="Grid3X3" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Select topics to perform bulk operations
                </span>
              </div>
            )}
          </div>

          {/* Right Section - Period Selector */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">Assessment Period:</span>
            <Select
              options={periodOptions}
              value={currentPeriod}
              onChange={onPeriodChange}
              placeholder="Select period"
              className="w-48"
            />
            <Button variant="ghost" size="sm">
              <Icon name="Plus" size={14} />
              New Period
            </Button>
          </div>
        </div>

        {/* Bulk Actions Panel */}
        {showBulkActions && selectedTopics?.length > 0 && (
          <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Select
                  options={bulkActionOptions}
                  value={bulkAction}
                  onChange={setBulkAction}
                  placeholder="Select action"
                  className="w-full"
                />
              </div>
              
              {bulkAction === 'update-category' && (
                <div className="flex-1">
                  <Select
                    options={categoryOptions}
                    value={bulkCategory}
                    onChange={setBulkCategory}
                    placeholder="Select category"
                    className="w-full"
                  />
                </div>
              )}
              
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleBulkAction}
                  disabled={!bulkAction || (bulkAction === 'update-category' && !bulkCategory)}
                >
                  Apply
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowBulkActions(false);
                    setBulkAction('');
                    setBulkCategory('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold text-foreground">
              {selectedTopics?.filter(t => t?.category?.name === 'Environmental')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Environmental</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold text-foreground">
              {selectedTopics?.filter(t => t?.category?.name === 'Social')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Social</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold text-foreground">
              {selectedTopics?.filter(t => t?.category?.name === 'Governance')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Governance</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold text-foreground">
              {selectedTopics?.length > 0 
                ? (selectedTopics?.reduce((sum, t) => sum + t?.impact + t?.importance, 0) / (selectedTopics?.length * 2))?.toFixed(1)
                : '0.0'
              }
            </div>
            <div className="text-xs text-muted-foreground">Avg Score</div>
          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg shadow-modal max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertTriangle" size={20} className="text-error" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Confirm Deletion</h3>
                    <p className="text-sm text-muted-foreground">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-foreground mb-6">
                  Are you sure you want to delete {selectedTopics?.length} selected topic{selectedTopics?.length !== 1 ? 's' : ''}? 
                  This will permanently remove the topic{selectedTopics?.length !== 1 ? 's' : ''} and all associated data.
                </p>
                
                <div className="flex space-x-3">
                  <Button
                    variant="destructive"
                    onClick={handleConfirmDelete}
                    className="flex-1"
                  >
                    Delete Topics
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmDialog(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TopicBulkOperations;