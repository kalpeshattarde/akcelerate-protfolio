import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportBuilder = ({ onSaveReport, onPreviewReport }) => {
  const [reportConfig, setReportConfig] = useState({
    name: '',
    description: '',
    dataSource: '',
    metrics: [],
    dimensions: [],
    filters: [],
    chartType: 'bar',
    dateRange: '30d'
  });

  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const dataSources = [
    { value: 'contracts', label: 'Contracts Database' },
    { value: 'vendors', label: 'Vendor Information' },
    { value: 'financial', label: 'Financial Data' },
    { value: 'compliance', label: 'Compliance Records' },
    { value: 'workflows', label: 'Workflow Analytics' }
  ];

  const availableMetrics = [
    { value: 'contract_count', label: 'Contract Count', type: 'number' },
    { value: 'total_value', label: 'Total Contract Value', type: 'currency' },
    { value: 'avg_duration', label: 'Average Duration', type: 'days' },
    { value: 'renewal_rate', label: 'Renewal Rate', type: 'percentage' },
    { value: 'compliance_score', label: 'Compliance Score', type: 'percentage' },
    { value: 'vendor_performance', label: 'Vendor Performance', type: 'score' },
    { value: 'cost_savings', label: 'Cost Savings', type: 'currency' },
    { value: 'risk_score', label: 'Risk Score', type: 'score' }
  ];

  const availableDimensions = [
    { value: 'contract_type', label: 'Contract Type' },
    { value: 'department', label: 'Department' },
    { value: 'vendor', label: 'Vendor' },
    { value: 'status', label: 'Status' },
    { value: 'region', label: 'Region' },
    { value: 'date_created', label: 'Creation Date' },
    { value: 'expiry_date', label: 'Expiry Date' },
    { value: 'value_range', label: 'Value Range' }
  ];

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { value: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'pie', label: 'Pie Chart', icon: 'PieChart' },
    { value: 'area', label: 'Area Chart', icon: 'AreaChart' },
    { value: 'scatter', label: 'Scatter Plot', icon: 'Scatter' },
    { value: 'heatmap', label: 'Heat Map', icon: 'Grid3x3' }
  ];

  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const handleMetricToggle = (metric) => {
    const isSelected = selectedMetrics?.find(m => m?.value === metric?.value);
    if (isSelected) {
      setSelectedMetrics(selectedMetrics?.filter(m => m?.value !== metric?.value));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  const handleDimensionToggle = (dimension) => {
    const isSelected = selectedDimensions?.find(d => d?.value === dimension?.value);
    if (isSelected) {
      setSelectedDimensions(selectedDimensions?.filter(d => d?.value !== dimension?.value));
    } else {
      setSelectedDimensions([...selectedDimensions, dimension]);
    }
  };

  const addFilter = () => {
    const newFilter = {
      id: Date.now(),
      field: '',
      operator: 'equals',
      value: ''
    };
    setActiveFilters([...activeFilters, newFilter]);
  };

  const updateFilter = (filterId, field, value) => {
    setActiveFilters(activeFilters?.map(filter =>
      filter?.id === filterId ? { ...filter, [field]: value } : filter
    ));
  };

  const removeFilter = (filterId) => {
    setActiveFilters(activeFilters?.filter(filter => filter?.id !== filterId));
  };

  const handlePreview = () => {
    const config = {
      ...reportConfig,
      metrics: selectedMetrics,
      dimensions: selectedDimensions,
      filters: activeFilters
    };
    setIsPreviewMode(true);
    onPreviewReport(config);
  };

  const handleSave = () => {
    const config = {
      ...reportConfig,
      metrics: selectedMetrics,
      dimensions: selectedDimensions,
      filters: activeFilters,
      createdAt: new Date()?.toISOString()
    };
    onSaveReport(config);
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" size={20} className="text-accent" />
          <h2 className="text-lg font-semibold text-text-primary">Report Builder</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreview}
            iconName="Eye"
            iconPosition="left"
            disabled={selectedMetrics?.length === 0}
          >
            Preview
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
            disabled={!reportConfig?.name || selectedMetrics?.length === 0}
          >
            Save Report
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 h-[600px]">
        {/* Configuration Panel */}
        <div className="col-span-4 border-r border-border overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-text-primary">Report Details</h3>
              <Input
                label="Report Name"
                placeholder="Enter report name"
                value={reportConfig?.name}
                onChange={(e) => setReportConfig({...reportConfig, name: e?.target?.value})}
                required
              />
              <Input
                label="Description"
                placeholder="Brief description"
                value={reportConfig?.description}
                onChange={(e) => setReportConfig({...reportConfig, description: e?.target?.value})}
              />
            </div>

            {/* Data Source */}
            <div className="space-y-4">
              <h3 className="font-medium text-text-primary">Data Source</h3>
              <Select
                options={dataSources}
                value={reportConfig?.dataSource}
                onChange={(value) => setReportConfig({...reportConfig, dataSource: value})}
                placeholder="Select data source"
              />
            </div>

            {/* Metrics */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-text-primary">Metrics</h3>
                <span className="text-xs text-muted-foreground">
                  {selectedMetrics?.length} selected
                </span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availableMetrics?.map((metric) => (
                  <div
                    key={metric?.value}
                    onClick={() => handleMetricToggle(metric)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedMetrics?.find(m => m?.value === metric?.value)
                        ? 'border-accent bg-accent/10' :'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-text-primary">
                        {metric?.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {metric?.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-text-primary">Dimensions</h3>
                <span className="text-xs text-muted-foreground">
                  {selectedDimensions?.length} selected
                </span>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableDimensions?.map((dimension) => (
                  <div
                    key={dimension?.value}
                    onClick={() => handleDimensionToggle(dimension)}
                    className={`p-2 rounded border cursor-pointer transition-colors ${
                      selectedDimensions?.find(d => d?.value === dimension?.value)
                        ? 'border-accent bg-accent/10' :'border-border hover:border-accent/50'
                    }`}
                  >
                    <span className="text-sm text-text-primary">
                      {dimension?.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-text-primary">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addFilter}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Filter
                </Button>
              </div>
              <div className="space-y-3">
                {activeFilters?.map((filter) => (
                  <div key={filter?.id} className="p-3 bg-muted rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Filter {filter?.id}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFilter(filter?.id)}
                        className="h-6 w-6"
                      >
                        <Icon name="X" size={12} />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={filter?.field}
                        onChange={(e) => updateFilter(filter?.id, 'field', e?.target?.value)}
                        className="text-xs border border-border rounded px-2 py-1"
                      >
                        <option value="">Field</option>
                        {availableDimensions?.map(dim => (
                          <option key={dim?.value} value={dim?.value}>{dim?.label}</option>
                        ))}
                      </select>
                      <select
                        value={filter?.operator}
                        onChange={(e) => updateFilter(filter?.id, 'operator', e?.target?.value)}
                        className="text-xs border border-border rounded px-2 py-1"
                      >
                        <option value="equals">Equals</option>
                        <option value="contains">Contains</option>
                        <option value="greater">Greater than</option>
                        <option value="less">Less than</option>
                      </select>
                      <input
                        type="text"
                        value={filter?.value}
                        onChange={(e) => updateFilter(filter?.id, 'value', e?.target?.value)}
                        placeholder="Value"
                        className="text-xs border border-border rounded px-2 py-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="col-span-8 p-4">
          <div className="space-y-4">
            {/* Chart Type & Date Range */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="font-medium text-text-primary">Visualization</h3>
                <div className="flex items-center space-x-2">
                  {chartTypes?.map((type) => (
                    <button
                      key={type?.value}
                      onClick={() => setReportConfig({...reportConfig, chartType: type?.value})}
                      className={`p-2 rounded border transition-colors ${
                        reportConfig?.chartType === type?.value
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-border hover:border-accent'
                      }`}
                      title={type?.label}
                    >
                      <Icon name={type?.icon} size={16} />
                    </button>
                  ))}
                </div>
              </div>
              <Select
                options={dateRanges}
                value={reportConfig?.dateRange}
                onChange={(value) => setReportConfig({...reportConfig, dateRange: value})}
                className="w-40"
              />
            </div>

            {/* Preview Area */}
            <div className="h-96 bg-muted rounded-lg border border-border flex items-center justify-center">
              {selectedMetrics?.length > 0 ? (
                <div className="text-center space-y-4">
                  <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-text-primary">
                      {reportConfig?.name || 'Untitled Report'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedMetrics?.length} metrics, {selectedDimensions?.length} dimensions
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Chart Type: {chartTypes?.find(t => t?.value === reportConfig?.chartType)?.label}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handlePreview}
                    iconName="Play"
                    iconPosition="left"
                  >
                    Generate Preview
                  </Button>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Icon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Select metrics to preview your report</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;