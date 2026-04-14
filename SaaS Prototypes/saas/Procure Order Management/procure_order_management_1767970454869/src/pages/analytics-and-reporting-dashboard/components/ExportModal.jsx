import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportModal = ({ isOpen, onClose }) => {
  const [exportType, setExportType] = useState('pdf');
  const [reportType, setReportType] = useState('executive');
  const [dateRange, setDateRange] = useState('last30days');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsExporting(false);
    onClose();
    
    // Show success notification (in real app, this would trigger actual export)
    alert('Report exported successfully!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-card shadow-elevation-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading-semibold text-text-primary">
            Export Analytics Report
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-button transition-smooth"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <label className="block text-sm font-heading-medium text-text-primary mb-3">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setExportType('pdf')}
                className={`flex items-center space-x-3 p-3 border rounded-button transition-smooth ${
                  exportType === 'pdf' ?'border-primary bg-primary-50 text-primary' :'border-border hover:bg-secondary-50'
                }`}
              >
                <Icon name="FileText" size={20} />
                <div className="text-left">
                  <div className="font-body-medium">PDF Report</div>
                  <div className="text-xs text-text-secondary">Executive summary</div>
                </div>
              </button>
              
              <button
                onClick={() => setExportType('excel')}
                className={`flex items-center space-x-3 p-3 border rounded-button transition-smooth ${
                  exportType === 'excel' ?'border-primary bg-primary-50 text-primary' :'border-border hover:bg-secondary-50'
                }`}
              >
                <Icon name="Download" size={20} />
                <div className="text-left">
                  <div className="font-body-medium">Excel Data</div>
                  <div className="text-xs text-text-secondary">Raw datasets</div>
                </div>
              </button>
            </div>
          </div>

          {/* Report Type */}
          <div>
            <label className="block text-sm font-heading-medium text-text-primary mb-3">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-background border border-border rounded-button px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="executive">Executive Summary</option>
              <option value="detailed">Detailed Analytics</option>
              <option value="supplier">Supplier Performance</option>
              <option value="budget">Budget Analysis</option>
              <option value="compliance">Compliance Report</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-heading-medium text-text-primary mb-3">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-background border border-border rounded-button px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="thisyear">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Export Options */}
          <div>
            <label className="block text-sm font-heading-medium text-text-primary mb-3">
              Include in Export
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <div>
                  <div className="text-sm font-body-medium text-text-primary">Charts & Visualizations</div>
                  <div className="text-xs text-text-secondary">Include all charts and graphs</div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={includeRawData}
                  onChange={(e) => setIncludeRawData(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <div>
                  <div className="text-sm font-body-medium text-text-primary">Raw Data Tables</div>
                  <div className="text-xs text-text-secondary">Include detailed data tables</div>
                </div>
              </label>
            </div>
          </div>

          {/* Scheduled Delivery */}
          <div className="bg-secondary-50 rounded-button p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-heading-medium text-text-primary">
                Schedule Regular Reports
              </span>
            </div>
            <p className="text-xs text-text-secondary mb-3">
              Set up automated report delivery to stakeholders
            </p>
            <button className="text-sm text-primary hover:text-primary-700 transition-smooth">
              Configure Scheduled Reports →
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-button transition-smooth"
          >
            Cancel
          </button>
          
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Icon name="Download" size={16} />
                <span>Export Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;