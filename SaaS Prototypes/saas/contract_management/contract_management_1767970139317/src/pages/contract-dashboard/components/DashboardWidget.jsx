import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardWidget = ({ 
  widget, 
  onRemove, 
  onResize, 
  onMove, 
  isDragging = false,
  children 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleDragStart = (e) => {
    if (onMove) {
      e?.dataTransfer?.setData('text/plain', widget?.id);
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg shadow-soft transition-smooth ${
        isDragging ? 'opacity-50 scale-95' : 'hover:shadow-elevated'
      } ${isExpanded ? 'col-span-2 row-span-2' : ''}`}
      draggable={!!onMove}
      onDragStart={handleDragStart}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
            <Icon name={widget?.icon} size={14} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">{widget?.title}</h3>
            {widget?.subtitle && (
              <p className="text-xs text-muted-foreground">{widget?.subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {onResize && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6"
            >
              <Icon name={isExpanded ? 'Minimize2' : 'Maximize2'} size={12} />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="h-6 w-6"
          >
            <Icon name="Settings" size={12} />
          </Button>
          
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(widget?.id)}
              className="h-6 w-6 text-muted-foreground hover:text-error"
            >
              <Icon name="X" size={12} />
            </Button>
          )}
          
          {onMove && (
            <div className="cursor-move p-1">
              <Icon name="GripVertical" size={12} className="text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
      {/* Widget Settings */}
      {showSettings && (
        <div className="p-4 border-b border-border bg-muted/50">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Auto-refresh</span>
              <button className="text-accent hover:text-accent/80">
                {widget?.autoRefresh ? 'On' : 'Off'}
              </button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Refresh interval</span>
              <select className="text-xs bg-surface border border-border rounded px-2 py-1">
                <option value="30">30s</option>
                <option value="60">1m</option>
                <option value="300">5m</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {/* Widget Content */}
      <div className={`p-4 ${isExpanded ? 'h-96' : 'h-48'} overflow-hidden`}>
        {children}
      </div>
      {/* Widget Footer */}
      <div className="px-4 py-2 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date(widget.lastUpdated)?.toLocaleTimeString()}</span>
          <div className="flex items-center space-x-2">
            {widget?.isLoading && (
              <Icon name="RotateCw" size={12} className="animate-spin" />
            )}
            <button className="hover:text-text-primary transition-smooth">
              <Icon name="RefreshCw" size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidget;