import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportControls = ({ onExport, isExporting, selectedRep }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeCharts: true,
    includeBenchmarks: true,
    includeNotes: false,
    format: 'pdf'
  });

  const exportFormats = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Comprehensive formatted report' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'Table', description: 'Raw data for analysis' },
    { value: 'csv', label: 'CSV Data', icon: 'Download', description: 'Simple data export' }
  ];

  const handleExportOptionChange = (option, value) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleExport = () => {
    onExport(exportOptions);
    setShowExportMenu(false);
  };

  const getEstimatedSize = () => {
    let size = 2; // Base size in MB
    if (exportOptions.includeCharts) size += 1.5;
    if (exportOptions.includeBenchmarks) size += 0.5;
    if (exportOptions.includeNotes) size += 0.3;
    
    return size.toFixed(1);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowExportMenu(!showExportMenu)}
        disabled={!selectedRep || isExporting}
        className={`px-4 py-2 text-sm font-medium rounded-sm transition-smooth flex items-center space-x-2 ${
          !selectedRep || isExporting
            ? 'bg-secondary-100 text-secondary-400 cursor-not-allowed' :'bg-primary text-white hover:bg-primary-700'
        }`}
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
            <Icon name="ChevronDown" size={14} />
          </>
        )}
      </button>

      {/* Export Options Menu */}
      {showExportMenu && !isExporting && (
        <div className="absolute right-0 top-full mt-1 w-80 bg-surface border border-border rounded-sm shadow-elevated z-50">
          <div className="p-4 border-b border-border">
            <h4 className="font-medium text-text-primary mb-1">Export Performance Report</h4>
            <p className="text-sm text-text-secondary">
              {selectedRep ? `Generate report for ${selectedRep.name}` : 'Select a representative first'}
            </p>
          </div>

          <div className="p-4">
            {/* Export Format Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">Export Format</label>
              <div className="space-y-2">
                {exportFormats.map((format) => (
                  <label
                    key={format.value}
                    className={`flex items-center p-3 border rounded-sm cursor-pointer transition-smooth ${
                      exportOptions.format === format.value
                        ? 'border-primary-300 bg-primary-50' :'border-border hover:bg-secondary-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={format.value}
                      checked={exportOptions.format === format.value}
                      onChange={(e) => handleExportOptionChange('format', e.target.value)}
                      className="sr-only"
                    />
                    <Icon name={format.icon} size={16} className="text-secondary-600 mr-3" />
                    <div className="flex-1">
                      <div className="font-medium text-text-primary">{format.label}</div>
                      <div className="text-xs text-text-secondary">{format.description}</div>
                    </div>
                    {exportOptions.format === format.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">Include in Export</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeCharts}
                    onChange={(e) => handleExportOptionChange('includeCharts', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-text-primary">Performance Charts</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeBenchmarks}
                    onChange={(e) => handleExportOptionChange('includeBenchmarks', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-text-primary">Benchmark Comparisons</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeNotes}
                    onChange={(e) => handleExportOptionChange('includeNotes', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-text-primary">Performance Notes & Annotations</span>
                </label>
              </div>
            </div>

            {/* Export Summary */}
            <div className="mb-4 p-3 bg-secondary-50 rounded-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Estimated file size:</span>
                <span className="font-medium text-text-primary">{getEstimatedSize()} MB</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-text-secondary">Generated on:</span>
                <span className="font-medium text-text-primary">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowExportMenu(false)}
                className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-smooth"
              >
                Cancel
              </button>
              
              <button
                onClick={handleExport}
                disabled={!selectedRep}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-smooth flex items-center space-x-2 ${
                  !selectedRep
                    ? 'bg-secondary-100 text-secondary-400 cursor-not-allowed' :'bg-primary text-white hover:bg-primary-700'
                }`}
              >
                <Icon name="Download" size={16} />
                <span>Generate Export</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showExportMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowExportMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default ExportControls;