// src/pages/system-integration-monitor/components/ExportCapabilities.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportCapabilities = ({ 
  onExportHealthReport, 
  onExportPerformanceReport, 
  onExportTechnicalDocs, 
  userRole 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      type: 'System Health Report',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      user: 'john.doe@company.com',
      format: 'PDF',
      size: '2.4 MB',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Performance Summary',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      user: 'sarah.johnson@company.com',
      format: 'Excel',
      size: '1.8 MB',
      status: 'completed'
    },
    {
      id: 3,
      type: 'Technical Documentation',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      user: 'admin@company.com',
      format: 'PDF',
      size: '5.2 MB',
      status: 'completed'
    }
  ]);
  const [selectedFormats, setSelectedFormats] = useState({
    health: 'pdf',
    performance: 'excel',
    technical: 'pdf'
  });
  const [customDateRange, setCustomDateRange] = useState({
    start: '',
    end: ''
  });
  const [includeOptions, setIncludeOptions] = useState({
    charts: true,
    rawData: false,
    recommendations: true,
    auditTrail: false
  });

  const exportTypes = [
    {
      id: 'health',
      name: 'System Health Report',
      description: 'Comprehensive system status and integration health overview',
      icon: 'Heart',
      formats: ['pdf', 'excel', 'json'],
      estimatedSize: '2-4 MB',
      includesCharts: true,
      handler: onExportHealthReport
    },
    {
      id: 'performance',
      name: 'Performance Summary',
      description: 'API response times, throughput metrics, and trend analysis',
      icon: 'TrendingUp',
      formats: ['excel', 'csv', 'json'],
      estimatedSize: '1-3 MB',
      includesCharts: true,
      handler: onExportPerformanceReport
    },
    {
      id: 'technical',
      name: 'Technical Documentation',
      description: 'Integration specifications, API docs, and configuration details',
      icon: 'FileText',
      formats: ['pdf', 'html', 'markdown'],
      estimatedSize: '3-8 MB',
      includesCharts: false,
      handler: onExportTechnicalDocs
    }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF', icon: 'FileText' },
    { value: 'excel', label: 'Excel', icon: 'BarChart3' },
    { value: 'csv', label: 'CSV', icon: 'Table' },
    { value: 'json', label: 'JSON', icon: 'Code' },
    { value: 'html', label: 'HTML', icon: 'Globe' },
    { value: 'markdown', label: 'Markdown', icon: 'Hash' }
  ];

  const getFormatIcon = (format) => {
    return formatOptions.find(f => f.value === format)?.icon || 'File';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-info';
      case 'failed': return 'text-error';
      default: return 'text-secondary-400';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 24 * 60) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / (24 * 60))}d ago`;
  };

  const handleExport = async (exportType) => {
    setIsExporting(true);
    
    const exportData = {
      type: exportType.name,
      format: selectedFormats[exportType.id],
      dateRange: customDateRange,
      options: includeOptions
    };
    
    // Add to export history
    const newExport = {
      id: Date.now(),
      type: exportType.name,
      timestamp: new Date(),
      user: 'current.user@company.com',
      format: selectedFormats[exportType.id].toUpperCase(),
      size: exportType.estimatedSize,
      status: 'processing'
    };
    
    setExportHistory(prev => [newExport, ...prev]);
    
    // Simulate export process
    setTimeout(() => {
      setExportHistory(prev => prev.map(exp => 
        exp.id === newExport.id ? { ...exp, status: 'completed' } : exp
      ));
      setIsExporting(false);
      exportType.handler?.(exportData);
    }, 3000);
  };

  const handleFormatChange = (exportId, format) => {
    setSelectedFormats(prev => ({
      ...prev,
      [exportId]: format
    }));
  };

  const handleOptionChange = (option, value) => {
    setIncludeOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const canExport = (exportType) => {
    if (exportType.id === 'technical' && userRole !== 'admin') {
      return false;
    }
    return true;
  };

  return (
    <div className="bg-surface border border-border rounded-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Export Capabilities</h2>
        <div className="flex items-center space-x-2">
          {isExporting && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-info-50 border border-info-200 rounded-sm">
              <Icon name="RefreshCw" size={16} className="text-info animate-spin" />
              <span className="text-sm font-medium text-info">Generating export...</span>
            </div>
          )}
        </div>
      </div>

      {/* Export Options */}
      <div className="space-y-6 mb-8">
        {exportTypes.map((exportType) => (
          <div key={exportType.id} className="border border-border rounded-sm p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-secondary-100 rounded-sm">
                  <Icon name={exportType.icon} size={20} className="text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-1">{exportType.name}</h3>
                  <p className="text-sm text-text-secondary mb-2">{exportType.description}</p>
                  <div className="text-xs text-text-secondary">
                    Estimated size: {exportType.estimatedSize}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleExport(exportType)}
                disabled={isExporting || !canExport(exportType)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Download" size={16} />
                <span>Export</span>
              </button>
            </div>
            
            {/* Format Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Export Format
                </label>
                <div className="flex items-center space-x-2">
                  {exportType.formats.map(format => (
                    <button
                      key={format}
                      onClick={() => handleFormatChange(exportType.id, format)}
                      className={`flex items-center space-x-1 px-3 py-2 text-sm border rounded-sm transition-smooth ${
                        selectedFormats[exportType.id] === format
                          ? 'border-primary bg-primary-50 text-primary' :'border-border hover:bg-secondary-50 text-text-primary'
                      }`}
                    >
                      <Icon name={getFormatIcon(format)} size={14} />
                      <span className="uppercase">{format}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Include Options */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Include Options
                </label>
                <div className="space-y-2">
                  {exportType.includesCharts && (
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={includeOptions.charts}
                        onChange={(e) => handleOptionChange('charts', e.target.checked)}
                        className="rounded border-border"
                      />
                      <span>Charts and visualizations</span>
                    </label>
                  )}
                  
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={includeOptions.rawData}
                      onChange={(e) => handleOptionChange('rawData', e.target.checked)}
                      className="rounded border-border"
                    />
                    <span>Raw data tables</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={includeOptions.recommendations}
                      onChange={(e) => handleOptionChange('recommendations', e.target.checked)}
                      className="rounded border-border"
                    />
                    <span>Recommendations</span>
                  </label>
                  
                  {userRole === 'admin' && (
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={includeOptions.auditTrail}
                        onChange={(e) => handleOptionChange('auditTrail', e.target.checked)}
                        className="rounded border-border"
                      />
                      <span>Audit trail</span>
                    </label>
                  )}
                </div>
              </div>
            </div>
            
            {!canExport(exportType) && (
              <div className="mt-3 p-2 bg-warning-50 border border-warning-200 rounded-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={14} className="text-warning" />
                  <span className="text-sm text-warning">
                    Administrator privileges required for this export type
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Date Range Selection */}
      <div className="mb-6 p-4 bg-secondary-50 rounded-sm">
        <h3 className="font-medium text-text-primary mb-3">Custom Date Range (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={customDateRange.start}
              onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              End Date
            </label>
            <input
              type="date"
              value={customDateRange.end}
              onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
            />
          </div>
        </div>
        <p className="text-sm text-text-secondary mt-2">
          Leave empty to use default time ranges for each report type
        </p>
      </div>

      {/* Export History */}
      <div>
        <h3 className="font-medium text-text-primary mb-4">Recent Exports</h3>
        <div className="space-y-3">
          {exportHistory.length === 0 ? (
            <div className="text-center py-6 text-text-secondary">
              <Icon name="Download" size={32} className="mx-auto mb-2 text-secondary-400" />
              <p>No recent exports</p>
            </div>
          ) : (
            exportHistory.map((export_) => (
              <div key={export_.id} className="flex items-center justify-between p-3 border border-border rounded-sm">
                <div className="flex items-center space-x-3">
                  <Icon name={getFormatIcon(export_.format.toLowerCase())} size={16} className="text-secondary-600" />
                  <div>
                    <div className="font-medium text-text-primary">{export_.type}</div>
                    <div className="text-sm text-text-secondary">
                      {formatTimeAgo(export_.timestamp)} • {export_.user} • {export_.size}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium ${getStatusColor(export_.status)}`}>
                    {export_.format}
                  </span>
                  
                  <div className={`flex items-center space-x-1 ${getStatusColor(export_.status)}`}>
                    <Icon 
                      name={export_.status === 'processing' ? 'RefreshCw' : export_.status === 'completed' ? 'CheckCircle' : 'XCircle'} 
                      size={14}
                      className={export_.status === 'processing' ? 'animate-spin' : ''}
                    />
                    <span className="text-sm font-medium capitalize">{export_.status}</span>
                  </div>
                  
                  {export_.status === 'completed' && (
                    <button className="p-2 hover:bg-secondary-100 rounded-sm transition-smooth">
                      <Icon name="Download" size={14} className="text-text-secondary" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Export Guidelines */}
      <div className="mt-6 p-4 bg-info-50 border border-info-200 rounded-sm">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-info mt-0.5" />
          <div className="text-sm text-info">
            <div className="font-medium mb-1">Export Guidelines:</div>
            <ul className="space-y-1 text-xs">
              <li>• Reports include data from the last 30 days unless custom range specified</li>
              <li>• Large exports may take several minutes to generate</li>
              <li>• Technical documentation requires administrator privileges</li>
              <li>• Exported files are available for download for 7 days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportCapabilities;