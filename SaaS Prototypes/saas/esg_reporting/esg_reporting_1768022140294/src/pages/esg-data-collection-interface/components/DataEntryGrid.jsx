import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DataEntryGrid = ({ 
  selectedFacility, 
  selectedDepartment, 
  onMetricSelect,
  selectedMetric,
  onDataChange 
}) => {
  const [metricsData, setMetricsData] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    dateRange: '2024-Q4'
  });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    if (selectedDepartment) {
      const mockMetricsData = [
        {
          id: 'metric-1',
          name: 'Energy Consumption',
          category: 'Environmental',
          value: 2450.5,
          unit: 'kWh',
          target: 2300,
          source: 'Smart Meter',
          validationStatus: 'validated',
          lastUpdated: '2025-01-07T08:30:00Z',
          updatedBy: 'John Smith',
          variance: 6.5,
          trend: 'increasing',
          notes: 'Higher usage due to extended production hours'
        },
        {
          id: 'metric-2',
          name: 'Water Usage',
          category: 'Environmental',
          value: 1850,
          unit: 'gallons',
          target: 1800,
          source: 'Manual Entry',
          validationStatus: 'pending',
          lastUpdated: '2025-01-06T16:45:00Z',
          updatedBy: 'Sarah Johnson',
          variance: 2.8,
          trend: 'stable',
          notes: ''
        },
        {
          id: 'metric-3',
          name: 'CO₂ Emissions',
          category: 'Environmental',
          value: 125.8,
          unit: 'tons CO₂e',
          target: 120,
          source: 'Calculated',
          validationStatus: 'validated',
          lastUpdated: '2025-01-07T09:15:00Z',
          updatedBy: 'Mike Chen',
          variance: 4.8,
          trend: 'increasing',
          notes: 'Calculated from energy consumption data'
        },
        {
          id: 'metric-4',
          name: 'Waste Generated',
          category: 'Environmental',
          value: 45.2,
          unit: 'tons',
          target: 40,
          source: 'Waste Management',
          validationStatus: 'error',
          lastUpdated: '2025-01-05T14:20:00Z',
          updatedBy: 'Lisa Wong',
          variance: 13,
          trend: 'increasing',
          notes: 'Data validation failed - requires review'
        },
        {
          id: 'metric-5',
          name: 'Employee Training Hours',
          category: 'Social',
          value: 320,
          unit: 'hours',
          target: 350,
          source: 'HR System',
          validationStatus: 'validated',
          lastUpdated: '2025-01-06T11:30:00Z',
          updatedBy: 'David Park',
          variance: -8.6,
          trend: 'decreasing',
          notes: 'Q4 training completion tracking'
        },
        {
          id: 'metric-6',
          name: 'Safety Incidents',
          category: 'Social',
          value: 2,
          unit: 'incidents',
          target: 0,
          source: 'Safety System',
          validationStatus: 'validated',
          lastUpdated: '2025-01-07T07:00:00Z',
          updatedBy: 'Emma Davis',
          variance: 200,
          trend: 'stable',
          notes: 'Minor incidents reported and resolved'
        },
        {
          id: 'metric-7',
          name: 'Board Diversity',
          category: 'Governance',
          value: 40,
          unit: '% diverse',
          target: 45,
          source: 'Manual Entry',
          validationStatus: 'pending',
          lastUpdated: '2025-01-04T15:45:00Z',
          updatedBy: 'Robert Kim',
          variance: -11.1,
          trend: 'stable',
          notes: 'Quarterly board composition review'
        },
        {
          id: 'metric-8',
          name: 'Ethics Training Completion',
          category: 'Governance',
          value: 95,
          unit: '% complete',
          target: 100,
          source: 'LMS System',
          validationStatus: 'validated',
          lastUpdated: '2025-01-06T20:15:00Z',
          updatedBy: 'Anna Wilson',
          variance: -5,
          trend: 'increasing',
          notes: 'Annual ethics training program'
        }
      ];

      setMetricsData(mockMetricsData);
    }
  }, [selectedDepartment]);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Environmental', label: 'Environmental' },
    { value: 'Social', label: 'Social' },
    { value: 'Governance', label: 'Governance' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'validated', label: 'Validated' },
    { value: 'pending', label: 'Pending' },
    { value: 'error', label: 'Error' }
  ];

  const dateRangeOptions = [
    { value: '2024-Q4', label: '2024 Q4' },
    { value: '2024-Q3', label: '2024 Q3' },
    { value: '2024-Q2', label: '2024 Q2' },
    { value: '2024-Q1', label: '2024 Q1' }
  ];

  const filteredMetrics = metricsData?.filter(metric => {
    if (filters?.category !== 'all' && metric?.category !== filters?.category) return false;
    if (filters?.status !== 'all' && metric?.validationStatus !== filters?.status) return false;
    return true;
  });

  const sortedMetrics = [...filteredMetrics]?.sort((a, b) => {
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (typeof aValue === 'string') {
      return sortConfig?.direction === 'asc' 
        ? aValue?.localeCompare(bValue)
        : bValue?.localeCompare(aValue);
    }
    
    return sortConfig?.direction === 'asc' 
      ? aValue - bValue 
      : bValue - aValue;
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleCellEdit = (metricId, field, value) => {
    setMetricsData(prev => prev?.map(metric => 
      metric?.id === metricId 
        ? { 
            ...metric, 
            [field]: value,
            lastUpdated: new Date()?.toISOString(),
            validationStatus: 'pending'
          }
        : metric
    ));
    
    if (onDataChange) {
      onDataChange(metricId, field, value);
    }
  };

  const handleKeyDown = (e, metricId, field) => {
    if (e?.key === 'Enter') {
      setEditingCell(null);
    } else if (e?.key === 'Escape') {
      setEditingCell(null);
    } else if (e?.key === 'Tab') {
      // Handle tab navigation
      e?.preventDefault();
      const currentIndex = sortedMetrics?.findIndex(m => m?.id === metricId);
      const nextIndex = e?.shiftKey ? currentIndex - 1 : currentIndex + 1;
      
      if (nextIndex >= 0 && nextIndex < sortedMetrics?.length) {
        setEditingCell({ id: sortedMetrics?.[nextIndex]?.id, field });
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'validated': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'error': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'validated': return 'text-success';
      case 'pending': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return 'TrendingUp';
      case 'decreasing': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend, variance) => {
    if (trend === 'stable') return 'text-muted-foreground';
    if (variance > 0) return 'text-error';
    return 'text-success';
  };

  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString() + ' ' + date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleRowSelect = (metricId) => {
    setSelectedRows(prev => 
      prev?.includes(metricId) 
        ? prev?.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(prev => 
      prev?.length === sortedMetrics?.length ? [] : sortedMetrics?.map(m => m?.id)
    );
  };

  if (!selectedDepartment) {
    return (
      <div className="h-full bg-card flex items-center justify-center">
        <div className="text-center">
          <Icon name="Database" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Department</h3>
          <p className="text-muted-foreground">Choose a facility and department from the sidebar to view ESG metrics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-card flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {selectedDepartment?.name} - ESG Metrics
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedFacility?.name} • {sortedMetrics?.length} metrics
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Upload" size={16} className="mr-2" />
              Import CSV
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Icon name="Save" size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Select
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
            placeholder="Category"
            className="w-40"
          />
          <Select
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
            placeholder="Status"
            className="w-32"
          />
          <Select
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
            placeholder="Period"
            className="w-32"
          />
          
          {selectedRows?.length > 0 && (
            <div className="flex items-center space-x-2 ml-auto">
              <span className="text-sm text-muted-foreground">
                {selectedRows?.length} selected
              </span>
              <Button variant="outline" size="sm">
                <Icon name="Check" size={16} className="mr-2" />
                Validate
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Trash2" size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Data Grid */}
      <div className="flex-1 overflow-auto" ref={gridRef}>
        <table className="w-full">
          <thead className="sticky top-0 bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows?.length === sortedMetrics?.length && sortedMetrics?.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="p-3 text-left cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">Metric</span>
                  <Icon 
                    name={sortConfig?.key === 'name' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    className="text-muted-foreground"
                  />
                </div>
              </th>
              <th className="p-3 text-left">
                <span className="text-sm font-medium text-foreground">Category</span>
              </th>
              <th 
                className="p-3 text-right cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => handleSort('value')}
              >
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-sm font-medium text-foreground">Value</span>
                  <Icon 
                    name={sortConfig?.key === 'value' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    className="text-muted-foreground"
                  />
                </div>
              </th>
              <th className="p-3 text-left">
                <span className="text-sm font-medium text-foreground">Unit</span>
              </th>
              <th className="p-3 text-right">
                <span className="text-sm font-medium text-foreground">Target</span>
              </th>
              <th className="p-3 text-center">
                <span className="text-sm font-medium text-foreground">Variance</span>
              </th>
              <th className="p-3 text-left">
                <span className="text-sm font-medium text-foreground">Source</span>
              </th>
              <th className="p-3 text-center">
                <span className="text-sm font-medium text-foreground">Status</span>
              </th>
              <th className="p-3 text-left">
                <span className="text-sm font-medium text-foreground">Last Updated</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMetrics?.map((metric, index) => (
              <tr 
                key={metric?.id}
                className={`border-b border-border hover:bg-muted/30 transition-colors cursor-pointer ${
                  selectedMetric?.id === metric?.id ? 'bg-primary/5' : ''
                } ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
                onClick={() => onMetricSelect(metric)}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows?.includes(metric?.id)}
                    onChange={() => handleRowSelect(metric?.id)}
                    onClick={(e) => e?.stopPropagation()}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div className="font-medium text-foreground">{metric?.name}</div>
                  {metric?.notes && (
                    <div className="text-xs text-muted-foreground mt-1 truncate max-w-48">
                      {metric?.notes}
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium text-foreground">
                    {metric?.category}
                  </span>
                </td>
                <td className="p-3 text-right">
                  {editingCell?.id === metric?.id && editingCell?.field === 'value' ? (
                    <Input
                      type="number"
                      value={metric?.value}
                      onChange={(e) => handleCellEdit(metric?.id, 'value', parseFloat(e?.target?.value))}
                      onKeyDown={(e) => handleKeyDown(e, metric?.id, 'value')}
                      onBlur={() => setEditingCell(null)}
                      className="w-24 text-right"
                      autoFocus
                    />
                  ) : (
                    <span 
                      className="font-mono text-foreground cursor-pointer hover:bg-muted rounded px-1"
                      onClick={(e) => {
                        e?.stopPropagation();
                        setEditingCell({ id: metric?.id, field: 'value' });
                      }}
                    >
                      {metric?.value?.toLocaleString()}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <span className="text-sm text-muted-foreground">{metric?.unit}</span>
                </td>
                <td className="p-3 text-right">
                  <span className="font-mono text-muted-foreground">
                    {metric?.target?.toLocaleString()}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Icon 
                      name={getTrendIcon(metric?.trend)} 
                      size={14} 
                      className={getTrendColor(metric?.trend, metric?.variance)}
                    />
                    <span className={`text-sm font-medium ${getTrendColor(metric?.trend, metric?.variance)}`}>
                      {metric?.variance > 0 ? '+' : ''}{metric?.variance?.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-sm text-muted-foreground">{metric?.source}</span>
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center">
                    <Icon 
                      name={getStatusIcon(metric?.validationStatus)} 
                      size={16} 
                      className={getStatusColor(metric?.validationStatus)}
                    />
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-xs text-muted-foreground">
                    <div>{formatTimestamp(metric?.lastUpdated)}</div>
                    <div className="text-xs opacity-75">by {metric?.updatedBy}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {sortedMetrics?.length} of {metricsData?.length} metrics
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={14} className="text-success" />
              <span>{metricsData?.filter(m => m?.validationStatus === 'validated')?.length} validated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-warning" />
              <span>{metricsData?.filter(m => m?.validationStatus === 'pending')?.length} pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={14} className="text-error" />
              <span>{metricsData?.filter(m => m?.validationStatus === 'error')?.length} errors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEntryGrid;