import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationFilters = ({
  filters,
  onFilterChange,
  savedViews,
  onSaveView,
  onLoadView
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newViewName, setNewViewName] = useState('');

  const categories = [
  { id: 'all', label: 'All Systems', icon: 'Database', count: 24 },
  { id: 'erp', label: 'ERP Systems', icon: 'Building', count: 8 },
  { id: 'facility', label: 'Facility Management', icon: 'Home', count: 6 },
  { id: 'sustainability', label: 'Sustainability Platforms', icon: 'Leaf', count: 5 },
  { id: 'iot', label: 'IoT Sensors', icon: 'Wifi', count: 3 },
  { id: 'external', label: 'External APIs', icon: 'Globe', count: 2 }];


  const healthStatuses = [
  { id: 'all', label: 'All Status', color: 'text-foreground', count: 24 },
  { id: 'healthy', label: 'Healthy', color: 'text-success', count: 18 },
  { id: 'warning', label: 'Warning', color: 'text-warning', count: 4 },
  { id: 'error', label: 'Error', color: 'text-error', count: 2 },
  { id: 'offline', label: 'Offline', color: 'text-muted-foreground', count: 0 }];


  const alertSeverities = [
  { id: 'all', label: 'All Alerts', count: 12 },
  { id: 'critical', label: 'Critical', count: 2 },
  { id: 'high', label: 'High', count: 3 },
  { id: 'medium', label: 'Medium', count: 5 },
  { id: 'low', label: 'Low', count: 2 }];


  const handleSaveView = () => {
    if (newViewName?.trim()) {
      onSaveView(newViewName?.trim(), filters);
      setNewViewName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card h-fit hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}>

          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      {isExpanded &&
      <div className="p-4 space-y-6">
          {/* Saved Views */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-foreground">Saved Views</h4>
              <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSaveDialog(true)}>

                <Icon name="Plus" size={12} className="mr-1" />
                Save
              </Button>
            </div>
            <div className="space-y-1">
              {savedViews?.map((view) =>
            <button
              key={view?.id}
              onClick={() => onLoadView(view)}
              className="w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-muted transition-colors duration-150">

                  <div className="flex items-center space-x-2">
                    <Icon name="Bookmark" size={14} className="text-primary" />
                    <span className="text-sm text-foreground">{view?.name}</span>
                  </div>
                  <Icon name="ChevronRight" size={12} className="text-muted-foreground" />
                </button>
            )}
              {savedViews?.length === 0 &&
            <p className="text-xs text-muted-foreground p-2">No saved views</p>
            }
            </div>
          </div>

          {/* Integration Categories */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Categories</h4>
            <div className="space-y-1">
              {categories?.map((category) =>
            <button
              key={category?.id}
              onClick={() => onFilterChange('category', category?.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors duration-150 ${
              filters?.category === category?.id ?
              'bg-primary text-primary-foreground' :
              'hover:bg-muted'}`
              }>

                  <div className="flex items-center space-x-2">
                    <Icon name={category?.icon} size={14} />
                    <span className="text-sm">{category?.label}</span>
                  </div>
                  <span className="text-xs opacity-75">{category?.count}</span>
                </button>
            )}
            </div>
          </div>

          {/* System Health */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">System Health</h4>
            <div className="space-y-1">
              {healthStatuses?.map((status) =>
            <button
              key={status.id}
              onClick={() => onFilterChange('status', status.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors duration-150 ${
              filters?.status === status.id ?
              'bg-primary text-primary-foreground' :
              'hover:bg-muted'}`
              }>

                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                status.id === 'healthy' ? 'bg-success' :
                status.id === 'warning' ? 'bg-warning' :
                status.id === 'error' ? 'bg-error' :
                status.id === 'offline' ? 'bg-muted-foreground' :
                'bg-border'}`
                } />
                    <span className={`text-sm ${filters?.status === status.id ? '' : status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <span className="text-xs opacity-75">{status.count}</span>
                </button>
            )}
            </div>
          </div>

          {/* Alert Severity */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Alert Severity</h4>
            <div className="space-y-1">
              {alertSeverities?.map((severity) =>
            <button
              key={severity?.id}
              onClick={() => onFilterChange('severity', severity?.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors duration-150 ${
              filters?.severity === severity?.id ?
              'bg-primary text-primary-foreground' :
              'hover:bg-muted'}`
              }>

                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                severity?.id === 'critical' ? 'bg-error' :
                severity?.id === 'high' ? 'bg-warning' :
                severity?.id === 'medium' ? 'bg-primary' :
                severity?.id === 'low' ? 'bg-success' : 'bg-border'}`
                } />
                    <span className="text-sm">{severity?.label}</span>
                  </div>
                  <span className="text-xs opacity-75">{severity?.count}</span>
                </button>
            )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Icon name="RefreshCw" size={14} className="mr-2" />
                Refresh All
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Icon name="Zap" size={14} className="mr-2" />
                Test Connections
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Icon name="Download" size={14} className="mr-2" />
                Export Status
              </Button>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="pt-4 border-t border-border">
            <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => onFilterChange('reset')}>

              <Icon name="X" size={14} className="mr-2" />
              Clear All Filters
            </Button>
          </div>
        </div>
      }
      {/* Save View Dialog */}
      {showSaveDialog &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg shadow-modal p-6 w-96">
            <h3 className="font-semibold text-foreground mb-4">Save Current View</h3>
            <input
            type="text"
            value={newViewName}
            onChange={(e) => setNewViewName(e?.target?.value)}
            placeholder="Enter view name..."
            className="w-full p-2 border border-border rounded-lg bg-input text-foreground mb-4"
            autoFocus />

            <div className="flex space-x-2">
              <Button onClick={handleSaveView} disabled={!newViewName?.trim()}>
                Save View
              </Button>
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default IntegrationFilters;