import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TopicCategoryFilter = ({ 
  categories = [], 
  selectedCategories = [], 
  onCategoryChange,
  stakeholderGroups = [],
  selectedStakeholders = [],
  onStakeholderChange,
  savedViews = [],
  currentView = null,
  onViewChange,
  onSaveView,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showStakeholders, setShowStakeholders] = useState(false);
  const [showSavedViews, setShowSavedViews] = useState(false);
  const [newViewName, setNewViewName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleCategoryToggle = (categoryId) => {
    const updated = selectedCategories?.includes(categoryId)
      ? selectedCategories?.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(updated);
  };

  const handleStakeholderToggle = (stakeholderId) => {
    const updated = selectedStakeholders?.includes(stakeholderId)
      ? selectedStakeholders?.filter(id => id !== stakeholderId)
      : [...selectedStakeholders, stakeholderId];
    onStakeholderChange(updated);
  };

  const handleSelectAll = (type) => {
    if (type === 'categories') {
      const allSelected = categories?.length === selectedCategories?.length;
      onCategoryChange(allSelected ? [] : categories?.map(c => c?.id));
    } else if (type === 'stakeholders') {
      const allSelected = stakeholderGroups?.length === selectedStakeholders?.length;
      onStakeholderChange(allSelected ? [] : stakeholderGroups?.map(s => s?.id));
    }
  };

  const handleSaveView = () => {
    if (newViewName?.trim()) {
      onSaveView({
        name: newViewName?.trim(),
        categories: selectedCategories,
        stakeholders: selectedStakeholders,
        timestamp: new Date()?.toISOString()
      });
      setNewViewName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Filters & Views</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Topic Categories */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-foreground">Topic Categories</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSelectAll('categories')}
              >
                {categories?.length === selectedCategories?.length ? 'Clear All' : 'Select All'}
              </Button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories?.map((category) => (
                <div key={category?.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedCategories?.includes(category?.id)}
                    onChange={() => handleCategoryToggle(category?.id)}
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category?.color }}
                    />
                    <span className="text-sm text-foreground">{category?.name}</span>
                    <span className="text-xs text-muted-foreground">({category?.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stakeholder Groups */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setShowStakeholders(!showStakeholders)}
                className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Icon name={showStakeholders ? "ChevronDown" : "ChevronRight"} size={14} />
                <span>Stakeholder Groups</span>
              </button>
              {showStakeholders && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSelectAll('stakeholders')}
                >
                  {stakeholderGroups?.length === selectedStakeholders?.length ? 'Clear All' : 'Select All'}
                </Button>
              )}
            </div>
            {showStakeholders && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {stakeholderGroups?.map((group) => (
                  <div key={group?.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedStakeholders?.includes(group?.id)}
                      onChange={() => handleStakeholderToggle(group?.id)}
                    />
                    <span className="text-sm text-foreground">{group?.name}</span>
                    <span className="text-xs text-muted-foreground">({group?.weight}%)</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Views */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setShowSavedViews(!showSavedViews)}
                className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Icon name={showSavedViews ? "ChevronDown" : "ChevronRight"} size={14} />
                <span>Saved Views</span>
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSaveDialog(true)}
              >
                <Icon name="Plus" size={14} />
              </Button>
            </div>
            {showSavedViews && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {savedViews?.map((view) => (
                  <div key={view?.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                    <button
                      onClick={() => onViewChange(view)}
                      className={`text-sm text-left flex-1 ${
                        currentView?.id === view?.id ? 'text-primary font-medium' : 'text-foreground'
                      }`}
                    >
                      {view?.name}
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {new Date(view.timestamp)?.toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {savedViews?.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No saved views yet
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Save View Dialog */}
          {showSaveDialog && (
            <div className="p-3 bg-muted rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-foreground">Save Current View</h5>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSaveDialog(false)}
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={newViewName}
                  onChange={(e) => setNewViewName(e?.target?.value)}
                  placeholder="Enter view name"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => e?.key === 'Enter' && handleSaveView()}
                />
                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSaveView}
                    disabled={!newViewName?.trim()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSaveDialog(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-foreground">
                  {selectedCategories?.length}
                </div>
                <div className="text-xs text-muted-foreground">Categories</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">
                  {selectedStakeholders?.length}
                </div>
                <div className="text-xs text-muted-foreground">Stakeholders</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicCategoryFilter;