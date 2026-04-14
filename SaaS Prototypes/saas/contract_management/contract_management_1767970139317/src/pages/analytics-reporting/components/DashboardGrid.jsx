import React, { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardGrid = ({ widgets, onWidgetUpdate, onWidgetRemove, onAddWidget }) => {
  const [draggedWidget, setDraggedWidget] = useState(null);
  const [dragOverWidget, setDragOverWidget] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const gridRef = useRef(null);

  // Custom chart component for contract performance
  const ContractPerformanceChart = ({ data }) => {
    if (!data?.chartData) return null;

    return (
      <div className="h-full space-y-3">
        {/* Chart Metrics Summary */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="font-semibold text-text-primary">{data?.metrics?.totalScore}%</div>
              <div className="text-muted-foreground">Avg Score</div>
            </div>
            <div className="text-center">
              <div className={`font-semibold flex items-center space-x-1 ${
                data?.metrics?.improvement > 0 ? 'text-success' : 'text-error'
              }`}>
                <Icon name={data?.metrics?.improvement > 0 ? 'TrendingUp' : 'TrendingDown'} size={12} />
                <span>{data?.metrics?.improvement}%</span>
              </div>
              <div className="text-muted-foreground">vs Last Period</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-text-primary">{data?.metrics?.bestMonth}</div>
              <div className="text-muted-foreground">Best Month</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[calc(100%-60px)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#6b7280' }}
              />
              <YAxis 
                domain={[70, 100]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
                labelStyle={{ color: '#374151', fontWeight: 'medium' }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '11px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={{ r: 3, fill: '#3b82f6' }}
                name="Performance"
              />
              <Line 
                type="monotone" 
                dataKey="compliance" 
                stroke="#10b981" 
                strokeWidth={2} 
                dot={{ r: 3, fill: '#10b981' }}
                name="Compliance"
              />
              <Line 
                type="monotone" 
                dataKey="renewals" 
                stroke="#f59e0b" 
                strokeWidth={2} 
                dot={{ r: 3, fill: '#f59e0b' }}
                name="Renewals"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const handleDragStart = (e, widget) => {
    setDraggedWidget(widget);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, widget) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverWidget(widget);
  };

  const handleDrop = (e, targetWidget) => {
    e?.preventDefault();
    if (draggedWidget && targetWidget && draggedWidget?.id !== targetWidget?.id) {
      const draggedIndex = widgets?.findIndex(w => w?.id === draggedWidget?.id);
      const targetIndex = widgets?.findIndex(w => w?.id === targetWidget?.id);
      
      const newWidgets = [...widgets];
      [newWidgets[draggedIndex], newWidgets[targetIndex]] = [newWidgets?.[targetIndex], newWidgets?.[draggedIndex]];
      
      onWidgetUpdate(newWidgets);
    }
    setDraggedWidget(null);
    setDragOverWidget(null);
  };

  const handleWidgetResize = (widgetId, newSize) => {
    const updatedWidgets = widgets?.map(widget =>
      widget?.id === widgetId ? { ...widget, size: newSize } : widget
    );
    onWidgetUpdate(updatedWidgets);
  };

  const getGridColumns = (size) => {
    switch (size) {
      case 'small': return 'col-span-1';
      case 'medium': return 'col-span-2';
      case 'large': return 'col-span-3';
      case 'full': return 'col-span-4';
      default: return 'col-span-2';
    }
  };

  const getGridRows = (size) => {
    switch (size) {
      case 'small': return 'row-span-1';
      case 'medium': return 'row-span-2';
      case 'large': return 'row-span-3';
      case 'tall': return 'row-span-4';
      default: return 'row-span-2';
    }
  };

  return (
    <div className="space-y-4">
      {/* Grid Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-text-primary">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={isCustomizing ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsCustomizing(!isCustomizing)}
              iconName="Settings"
              iconPosition="left"
            >
              {isCustomizing ? 'Done' : 'Customize'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onAddWidget}
              iconName="Plus"
              iconPosition="left"
            >
              Add Widget
            </Button>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date()?.toLocaleString()}
        </div>
      </div>
      {/* Dashboard Grid */}
      <div 
        ref={gridRef}
        className="grid grid-cols-4 gap-4 auto-rows-[200px] min-h-[600px]"
      >
        {widgets?.map((widget) => (
          <div
            key={widget?.id}
            draggable={isCustomizing}
            onDragStart={(e) => handleDragStart(e, widget)}
            onDragOver={(e) => handleDragOver(e, widget)}
            onDrop={(e) => handleDrop(e, widget)}
            className={`
              ${getGridColumns(widget?.size)} ${getGridRows(widget?.size)}
              bg-card border border-border rounded-lg shadow-soft
              ${isCustomizing ? 'cursor-move hover:shadow-elevated' : ''}
              ${dragOverWidget?.id === widget?.id ? 'ring-2 ring-accent' : ''}
              transition-all duration-200
            `}
          >
            {/* Widget Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <Icon name={widget?.icon} size={16} className="text-muted-foreground" />
                <h3 className="font-medium text-text-primary">{widget?.title}</h3>
              </div>
              {isCustomizing && (
                <div className="flex items-center space-x-1">
                  <select
                    value={widget?.size}
                    onChange={(e) => handleWidgetResize(widget?.id, e?.target?.value)}
                    className="text-xs border border-border rounded px-2 py-1"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="full">Full</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onWidgetRemove(widget?.id)}
                    className="h-6 w-6 text-error hover:text-error"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              )}
            </div>

            {/* Widget Content */}
            <div className="p-4 h-full overflow-hidden">
              {widget?.type === 'metric' && (
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-text-primary">
                    {widget?.data?.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {widget?.data?.label}
                  </div>
                  <div className={`flex items-center space-x-1 text-xs ${
                    widget?.data?.trend > 0 ? 'text-success' : 'text-error'
                  }`}>
                    <Icon 
                      name={widget?.data?.trend > 0 ? 'TrendingUp' : 'TrendingDown'} 
                      size={12} 
                    />
                    <span>{Math.abs(widget?.data?.trend)}%</span>
                  </div>
                </div>
              )}

              {widget?.type === 'chart' && (
                <div className="h-full">
                  {widget?.title === 'Contract Performance' && widget?.data?.chartType === 'line' ? (
                    <ContractPerformanceChart data={widget?.data} />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Icon name="BarChart3" size={32} className="mx-auto mb-2" />
                        <div className="text-sm">{widget?.data?.chartType || 'Chart'} visualization</div>
                        <div className="text-xs mt-1">Configure chart data</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {widget?.type === 'list' && (
                <div className="space-y-2">
                  {widget?.data?.items?.slice(0, 3)?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-text-primary truncate">{item?.name}</span>
                      <span className="text-muted-foreground">{item?.value}</span>
                    </div>
                  ))}
                  {widget?.data?.items?.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center pt-2">
                      +{widget?.data?.items?.length - 3} more items
                    </div>
                  )}
                </div>
              )}

              {widget?.type === 'progress' && (
                <div className="space-y-3">
                  {widget?.data?.metrics?.map((metric, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-primary">{metric?.label}</span>
                        <span className="text-muted-foreground">{metric?.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${metric?.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add Widget Placeholder */}
        {isCustomizing && (
          <div 
            onClick={onAddWidget}
            className="col-span-1 row-span-1 border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <div className="text-center text-muted-foreground">
              <Icon name="Plus" size={24} className="mx-auto mb-2" />
              <div className="text-sm">Add Widget</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardGrid;