import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportModal = ({ onClose, onExport, recordCount }) => {
  const [selectedFormat, setSelectedFormat] = useState('excel');
  const [includeDetails, setIncludeDetails] = useState(true);
  const [dateRange, setDateRange] = useState('current');
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      id: 'excel',
      name: 'Excel Workbook',
      description: 'Detailed spreadsheet with multiple sheets',
      icon: 'FileSpreadsheet',
      extension: '.xlsx'
    },
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Formatted compliance report',
      icon: 'FileText',
      extension: '.pdf'
    },
    {
      id: 'csv',
      name: 'CSV Data',
      description: 'Raw data for analysis',
      icon: 'Database',
      extension: '.csv'
    },
    {
      id: 'json',
      name: 'JSON Export',
      description: 'Structured data with full details',
      icon: 'Code',
      extension: '.json'
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onExport(selectedFormat);
    setIsExporting(false);
  };

  const getEstimatedSize = () => {
    const baseSize = recordCount * 0.5; // KB per record
    const multiplier = selectedFormat === 'pdf' ? 2 : selectedFormat === 'excel' ? 1.5 : 1;
    const size = baseSize * multiplier;
    
    if (size > 1024) {
      return `${(size / 1024).toFixed(1)} MB`;
    }
    return `${Math.round(size)} KB`;
  };

  return (
    <div className="fixed inset-0 modal-overlay-dark flex items-center justify-center z-200 p-4">
      <div className="modal-glass max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary-dark">Export Audit Trail</h2>
            <p className="text-text-secondary-dark mt-1">
              Export {recordCount} audit records for compliance reporting
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-glass-white-hover rounded-sm transition-smooth"
          >
            <Icon name="X" size={20} className="text-text-secondary-dark" />
          </button>
        </div>

        <div className="p-6">
          {/* Export Format Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary-dark mb-3">Export Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`p-4 border rounded-sm text-left transition-smooth ${
                    selectedFormat === format.id
                      ? 'border-primary bg-glass-white-active glow-indigo' :'border-glass-border hover:border-glass-white-hover hover:bg-glass-white-hover'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={format.icon} 
                      size={20} 
                      className={selectedFormat === format.id ? 'text-primary' : 'text-text-secondary-dark'} 
                    />
                    <div className="flex-1">
                      <div className="font-medium text-text-primary-dark">{format.name}</div>
                      <div className="text-sm text-text-secondary-dark mt-1">{format.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary-dark mb-3">Export Options</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={includeDetails}
                  onChange={(e) => setIncludeDetails(e.target.checked)}
                  className="rounded border-glass-border bg-glass-white text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0"
                />
                <div>
                  <div className="text-sm text-text-primary-dark">Include detailed change information</div>
                  <div className="text-xs text-text-secondary-dark">Before/after values and metadata</div>
                </div>
              </label>

              <div>
                <label className="block text-sm text-text-primary-dark mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="select-glass w-full"
                >
                  <option value="current">Current filtered results</option>
                  <option value="last7">Last 7 days</option>
                  <option value="last30">Last 30 days</option>
                  <option value="last90">Last 90 days</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          <div className="glass-morphism-dark rounded-sm p-4 mb-6">
            <h4 className="text-sm font-medium text-text-primary-dark mb-2">Export Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-text-secondary-dark">Records:</div>
                <div className="text-text-primary-dark font-medium">{recordCount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-text-secondary-dark">Format:</div>
                <div className="text-text-primary-dark font-medium">
                  {exportFormats.find(f => f.id === selectedFormat)?.name}
                </div>
              </div>
              <div>
                <div className="text-text-secondary-dark">Estimated Size:</div>
                <div className="text-text-primary-dark font-medium">{getEstimatedSize()}</div>
              </div>
              <div>
                <div className="text-text-secondary-dark">Details:</div>
                <div className="text-text-primary-dark font-medium">
                  {includeDetails ? 'Included' : 'Summary only'}
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="glass-morphism border border-warning/30 rounded-sm p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-warning">Compliance Notice</div>
                <div className="text-sm text-text-secondary-dark mt-1">
                  This export contains sensitive audit information. Ensure proper handling according to your organization's data governance policies and regulatory requirements.
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="btn-glass-outline"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="btn-glass-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Icon name="Download" size={16} />
                  <span>Export</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;