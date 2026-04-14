import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportCapabilities = ({ data, filters, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    includeCharts: true,
    includeRawData: false,
    includeFilters: true,
    dateRange: 'current',
    compression: false
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      filename: 'contract_analytics_2024-09-04.pdf',
      format: 'pdf',
      size: '2.4 MB',
      createdAt: '2024-09-04T07:30:00Z',
      status: 'completed'
    },
    {
      id: 2,
      filename: 'vendor_performance_report.xlsx',
      format: 'excel',
      size: '1.8 MB',
      createdAt: '2024-09-03T14:15:00Z',
      status: 'completed'
    },
    {
      id: 3,
      filename: 'compliance_data_export.csv',
      format: 'csv',
      size: '856 KB',
      createdAt: '2024-09-02T09:45:00Z',
      status: 'completed'
    }
  ]);

  const formatOptions = [
    { 
      value: 'pdf', 
      label: 'PDF Document',
      description: 'Formatted report with charts and visualizations',
      icon: 'FileText'
    },
    { 
      value: 'excel', 
      label: 'Excel Spreadsheet',
      description: 'Data tables with multiple sheets and formulas',
      icon: 'Sheet'
    },
    { 
      value: 'csv', 
      label: 'CSV Data',
      description: 'Raw data in comma-separated values format',
      icon: 'Database'
    },
    { 
      value: 'json', 
      label: 'JSON Data',
      description: 'Structured data for API integration',
      icon: 'Code'
    },
    { 
      value: 'powerbi', 
      label: 'Power BI Template',
      description: 'Template file for Power BI dashboards',
      icon: 'BarChart3'
    }
  ];

  const dateRangeOptions = [
    { value: 'current', label: 'Current filtered data' },
    { value: 'all', label: 'All available data' },
    { value: 'last_30', label: 'Last 30 days' },
    { value: 'last_90', label: 'Last 90 days' },
    { value: 'ytd', label: 'Year to date' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newExport = {
        id: Date.now(),
        filename: `analytics_export_${new Date()?.toISOString()?.split('T')?.[0]}.${exportConfig?.format}`,
        format: exportConfig?.format,
        size: `${(Math.random() * 5 + 0.5)?.toFixed(1)} MB`,
        createdAt: new Date()?.toISOString(),
        status: 'completed'
      };
      
      setExportHistory([newExport, ...exportHistory]);
      
      // Call parent export handler
      if (onExport) {
        onExport(exportConfig);
      }
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = (exportItem) => {
    // Simulate download
    console.log('Downloading:', exportItem?.filename);
  };

  const handleDelete = (exportId) => {
    setExportHistory(exportHistory?.filter(item => item?.id !== exportId));
  };

  const getFormatIcon = (format) => {
    const formatOption = formatOptions?.find(opt => opt?.value === format);
    return formatOption?.icon || 'FileText';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const selectedFormat = formatOptions?.find(opt => opt?.value === exportConfig?.format);

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-text-primary">Export Data</h3>
            <p className="text-sm text-muted-foreground">
              Export your analytics data in various formats
            </p>
          </div>
          <Button
            variant="default"
            onClick={handleExport}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            disabled={!data || Object.keys(data)?.length === 0}
          >
            {isExporting ? 'Exporting...' : 'Export Data'}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Format Selection */}
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Export Format</h4>
            <div className="space-y-3">
              {formatOptions?.map((format) => (
                <div
                  key={format?.value}
                  onClick={() => setExportConfig({...exportConfig, format: format?.value})}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    exportConfig?.format === format?.value
                      ? 'border-accent bg-accent/10' :'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={format?.icon} 
                      size={20} 
                      className={exportConfig?.format === format?.value ? 'text-accent' : 'text-muted-foreground'}
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-text-primary">{format?.label}</h5>
                      <p className="text-sm text-muted-foreground mt-1">{format?.description}</p>
                    </div>
                    {exportConfig?.format === format?.value && (
                      <Icon name="Check" size={16} className="text-accent" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Export Options</h4>
            
            <Select
              label="Data Range"
              options={dateRangeOptions}
              value={exportConfig?.dateRange}
              onChange={(value) => setExportConfig({...exportConfig, dateRange: value})}
            />

            <div className="space-y-3">
              <Checkbox
                label="Include Charts and Visualizations"
                description="Add charts and graphs to the export (PDF/Excel only)"
                checked={exportConfig?.includeCharts}
                onChange={(e) => setExportConfig({...exportConfig, includeCharts: e?.target?.checked})}
                disabled={exportConfig?.format === 'csv' || exportConfig?.format === 'json'}
              />
              
              <Checkbox
                label="Include Raw Data Tables"
                description="Export underlying data in tabular format"
                checked={exportConfig?.includeRawData}
                onChange={(e) => setExportConfig({...exportConfig, includeRawData: e?.target?.checked})}
              />
              
              <Checkbox
                label="Include Applied Filters"
                description="Document the filters used to generate this data"
                checked={exportConfig?.includeFilters}
                onChange={(e) => setExportConfig({...exportConfig, includeFilters: e?.target?.checked})}
              />
              
              <Checkbox
                label="Compress Large Files"
                description="Reduce file size for large exports"
                checked={exportConfig?.compression}
                onChange={(e) => setExportConfig({...exportConfig, compression: e?.target?.checked})}
              />
            </div>

            {/* Preview Info */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h5 className="font-medium text-text-primary mb-2">Export Preview</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="text-text-primary">{selectedFormat?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Range:</span>
                  <span className="text-text-primary">
                    {dateRangeOptions?.find(opt => opt?.value === exportConfig?.dateRange)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Size:</span>
                  <span className="text-text-primary">~2.1 MB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Export History */}
      <div className="bg-surface border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-text-primary">Recent Exports</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExportHistory([])}
              iconName="Trash2"
              iconPosition="left"
            >
              Clear History
            </Button>
          </div>
        </div>

        <div className="p-4">
          {exportHistory?.length > 0 ? (
            <div className="space-y-3">
              {exportHistory?.map((exportItem) => (
                <div key={exportItem?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getFormatIcon(exportItem?.format)} 
                      size={20} 
                      className="text-muted-foreground" 
                    />
                    <div>
                      <h4 className="font-medium text-text-primary">{exportItem?.filename}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{exportItem?.size}</span>
                        <span>•</span>
                        <span>{formatDate(exportItem?.createdAt)}</span>
                        <span>•</span>
                        <span className={getStatusColor(exportItem?.status)}>
                          {exportItem?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(exportItem)}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(exportItem?.id)}
                      className="h-8 w-8 text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Download" size={32} className="mx-auto mb-3 opacity-50" />
              <p>No exports yet</p>
              <p className="text-sm">Your exported files will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportCapabilities;