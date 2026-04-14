import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const ExportModal = ({ 
  isOpen, 
  onClose, 
  selectedLogs = [], 
  totalLogs = 0,
  onExport 
}) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    scope: 'selected', // 'selected', 'filtered', 'all'
    fields: [
      'timestamp',
      'user',
      'action',
      'resource',
      'ipAddress',
      'severity',
      'description'
    ],
    dateRange: {
      startDate: '',
      endDate: ''
    },
    includeDetails: false,
    includeMetadata: false,
    compression: false
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const formatOptions = [
    { value: 'csv', label: 'CSV (Comma Separated Values)' },
    { value: 'xlsx', label: 'Excel Spreadsheet (.xlsx)' },
    { value: 'json', label: 'JSON (JavaScript Object Notation)' },
    { value: 'xml', label: 'XML (Extensible Markup Language)' },
    { value: 'pdf', label: 'PDF Report' }
  ];

  const scopeOptions = [
    { 
      value: 'selected', 
      label: `Selected Logs (${selectedLogs?.length})`,
      disabled: selectedLogs?.length === 0
    },
    { value: 'filtered', label: `Current Filter Results (${totalLogs})` },
    { value: 'all', label: 'All Audit Logs' }
  ];

  const fieldOptions = [
    { value: 'timestamp', label: 'Timestamp' },
    { value: 'user', label: 'User Information' },
    { value: 'action', label: 'Action Type' },
    { value: 'resource', label: 'Resource Details' },
    { value: 'ipAddress', label: 'IP Address' },
    { value: 'severity', label: 'Severity Level' },
    { value: 'description', label: 'Description' },
    { value: 'sessionId', label: 'Session ID' },
    { value: 'userAgent', label: 'User Agent' },
    { value: 'dataType', label: 'Data Type' }
  ];

  const handleConfigChange = (key, value) => {
    setExportConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFieldToggle = (field, checked) => {
    setExportConfig(prev => ({
      ...prev,
      fields: checked 
        ? [...prev?.fields, field]
        : prev?.fields?.filter(f => f !== field)
    }));
  };

  const handleDateRangeChange = (field, value) => {
    setExportConfig(prev => ({
      ...prev,
      dateRange: {
        ...prev?.dateRange,
        [field]: value
      }
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    try {
      // Simulate export progress
      const progressInterval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setExportProgress(100);

      // Generate mock download
      const exportData = {
        config: exportConfig,
        timestamp: new Date()?.toISOString(),
        recordCount: exportConfig?.scope === 'selected' ? selectedLogs?.length : totalLogs
      };

      // Create and trigger download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date()?.toISOString()?.split('T')?.[0]}.${exportConfig?.format}`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);

      // Call parent export handler
      if (onExport) {
        onExport(exportConfig);
      }

      setTimeout(() => {
        onClose();
        setIsExporting(false);
        setExportProgress(0);
      }, 1000);

    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const getEstimatedSize = () => {
    const recordCount = exportConfig?.scope === 'selected' ? selectedLogs?.length : totalLogs;
    const avgRecordSize = exportConfig?.format === 'json' ? 2 : 
                         exportConfig?.format === 'xml' ? 3 : 1; // KB per record
    const estimatedSize = recordCount * avgRecordSize;
    
    if (estimatedSize < 1024) {
      return `~${estimatedSize} KB`;
    } else {
      return `~${(estimatedSize / 1024)?.toFixed(1)} MB`;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg shadow-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Export Audit Logs</h2>
              <p className="text-sm text-muted-foreground">
                Configure export settings and download audit data
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <Select
              label="Export Format"
              description="Choose the file format for your export"
              options={formatOptions}
              value={exportConfig?.format}
              onChange={(value) => handleConfigChange('format', value)}
            />
          </div>

          {/* Export Scope */}
          <div>
            <Select
              label="Export Scope"
              description="Select which logs to include in the export"
              options={scopeOptions}
              value={exportConfig?.scope}
              onChange={(value) => handleConfigChange('scope', value)}
            />
          </div>

          {/* Date Range Filter */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Date Range (Optional)</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={exportConfig?.dateRange?.startDate}
                onChange={(e) => handleDateRangeChange('startDate', e?.target?.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={exportConfig?.dateRange?.endDate}
                onChange={(e) => handleDateRangeChange('endDate', e?.target?.value)}
              />
            </div>
          </div>

          {/* Field Selection */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Include Fields</h3>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {fieldOptions?.map((field) => (
                <Checkbox
                  key={field?.value}
                  label={field?.label}
                  checked={exportConfig?.fields?.includes(field?.value)}
                  onChange={(e) => handleFieldToggle(field?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Additional Options</h3>
            <div className="space-y-2">
              <Checkbox
                label="Include detailed change information"
                description="Add before/after values for data modifications"
                checked={exportConfig?.includeDetails}
                onChange={(e) => handleConfigChange('includeDetails', e?.target?.checked)}
              />
              <Checkbox
                label="Include metadata and session information"
                description="Add user agent, session IDs, and other metadata"
                checked={exportConfig?.includeMetadata}
                onChange={(e) => handleConfigChange('includeMetadata', e?.target?.checked)}
              />
              <Checkbox
                label="Compress export file"
                description="Create a ZIP archive for large exports"
                checked={exportConfig?.compression}
                onChange={(e) => handleConfigChange('compression', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">Export Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Records:</span>
                <span className="ml-2 font-medium text-foreground">
                  {exportConfig?.scope === 'selected' ? selectedLogs?.length : totalLogs}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Format:</span>
                <span className="ml-2 font-medium text-foreground uppercase">
                  {exportConfig?.format}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Fields:</span>
                <span className="ml-2 font-medium text-foreground">
                  {exportConfig?.fields?.length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Est. Size:</span>
                <span className="ml-2 font-medium text-foreground">
                  {getEstimatedSize()}
                </span>
              </div>
            </div>
          </div>

          {/* Export Progress */}
          {isExporting && (
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Exporting...</span>
                <span className="text-sm text-muted-foreground">{exportProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {exportConfig?.scope === 'selected' && selectedLogs?.length === 0 && (
              <span className="text-warning">⚠ No logs selected for export</span>
            )}
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting || (exportConfig?.scope === 'selected' && selectedLogs?.length === 0)}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              {isExporting ? 'Exporting...' : 'Export Logs'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportModal;