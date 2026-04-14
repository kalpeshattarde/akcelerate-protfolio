import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportModal = ({ scenarios, onClose }) => {
  const [exportFormat, setExportFormat] = useState('excel');
  const [exportOptions, setExportOptions] = useState({
    includeCharts: true,
    includeVarianceAnalysis: true,
    includeAuditTrail: false,
    includeModifierDetails: true,
    groupByCreator: false,
    groupByStatus: false
  });
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      id: 'excel',
      name: 'Excel Workbook',
      description: 'Multiple sheets with scenarios, charts, and analysis',
      icon: 'FileSpreadsheet',
      fileSize: '~2-5 MB'
    },
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Formatted report with visualizations',
      icon: 'FileText',
      fileSize: '~1-3 MB'
    },
    {
      id: 'csv',
      name: 'CSV Data',
      description: 'Raw data export for external analysis',
      icon: 'Database',
      fileSize: '~100-500 KB'
    },
    {
      id: 'json',
      name: 'JSON Export',
      description: 'Complete data structure for system integration',
      icon: 'Code',
      fileSize: '~50-200 KB'
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate filename
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `scenario-export-${timestamp}.${exportFormat === 'excel' ? 'xlsx' : exportFormat}`;
    
    // In a real implementation, this would trigger the actual export
    console.log('Exporting scenarios:', {
      scenarios: scenarios.map(s => s.id),
      format: exportFormat,
      options: exportOptions,
      filename
    });
    
    setIsExporting(false);
    onClose();
  };

  const handleOptionChange = (option, value) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const getEstimatedFileSize = () => {
    const baseSize = scenarios.length * 0.1; // MB per scenario
    const format = exportFormats.find(f => f.id === exportFormat);
    return `~${Math.max(0.1, baseSize).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-200">
      <div className="bg-surface rounded-sm max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Export Scenarios</h2>
            <p className="text-sm text-text-secondary mt-1">
              Export {scenarios.length} scenario{scenarios.length !== 1 ? 's' : ''} in your preferred format
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-sm transition-smooth"
          >
            <Icon name="X" size={20} className="text-secondary-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Export Format Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-text-primary mb-4">Export Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setExportFormat(format.id)}
                  className={`p-4 border rounded-sm text-left transition-smooth ${
                    exportFormat === format.id
                      ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={format.icon} 
                      size={20} 
                      className={exportFormat === format.id ? 'text-primary' : 'text-secondary-600'} 
                    />
                    <div className="flex-1">
                      <div className="font-medium text-text-primary">{format.name}</div>
                      <div className="text-sm text-text-secondary mt-1">{format.description}</div>
                      <div className="text-xs text-text-secondary mt-2">{format.fileSize}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-text-primary mb-4">Export Options</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportOptions.includeCharts}
                  onChange={(e) => handleOptionChange('includeCharts', e.target.checked)}
                  className="rounded border-border focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">Include Charts & Visualizations</span>
                  <p className="text-xs text-text-secondary">Export comparison charts and graphs</p>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportOptions.includeVarianceAnalysis}
                  onChange={(e) => handleOptionChange('includeVarianceAnalysis', e.target.checked)}
                  className="rounded border-border focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">Include Variance Analysis</span>
                  <p className="text-xs text-text-secondary">Delta calculations and impact analysis</p>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportOptions.includeModifierDetails}
                  onChange={(e) => handleOptionChange('includeModifierDetails', e.target.checked)}
                  className="rounded border-border focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">Include Modifier Details</span>
                  <p className="text-xs text-text-secondary">SPIF, accelerator, and bonus multiplier values</p>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportOptions.includeAuditTrail}
                  onChange={(e) => handleOptionChange('includeAuditTrail', e.target.checked)}
                  className="rounded border-border focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">Include Audit Trail</span>
                  <p className="text-xs text-text-secondary">Modification history and user attribution</p>
                </div>
              </label>

              {exportFormat === 'excel' && (
                <>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportOptions.groupByCreator}
                      onChange={(e) => handleOptionChange('groupByCreator', e.target.checked)}
                      className="rounded border-border focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-text-primary">Group by Creator</span>
                      <p className="text-xs text-text-secondary">Separate worksheets for each creator</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportOptions.groupByStatus}
                      onChange={(e) => handleOptionChange('groupByStatus', e.target.checked)}
                      className="rounded border-border focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-text-primary">Group by Status</span>
                      <p className="text-xs text-text-secondary">Separate worksheets for each status</p>
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-secondary-50 rounded-sm p-4 mb-6">
            <h4 className="font-medium text-text-primary mb-2">Export Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Scenarios:</span>
                <span className="ml-2 font-medium text-text-primary">{scenarios.length}</span>
              </div>
              <div>
                <span className="text-text-secondary">Format:</span>
                <span className="ml-2 font-medium text-text-primary">
                  {exportFormats.find(f => f.id === exportFormat)?.name}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Estimated Size:</span>
                <span className="ml-2 font-medium text-text-primary">{getEstimatedFileSize()}</span>
              </div>
              <div>
                <span className="text-text-secondary">Options:</span>
                <span className="ml-2 font-medium text-text-primary">
                  {Object.values(exportOptions).filter(Boolean).length} enabled
                </span>
              </div>
            </div>
          </div>

          {/* Scenario List Preview */}
          <div className="mb-6">
            <h4 className="font-medium text-text-primary mb-2">Scenarios to Export</h4>
            <div className="max-h-32 overflow-y-auto border border-border rounded-sm">
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="flex items-center justify-between p-2 border-b border-border last:border-b-0">
                  <div>
                    <span className="text-sm font-medium text-text-primary">{scenario.name}</span>
                    <span className="text-xs text-text-secondary ml-2">({scenario.id})</span>
                  </div>
                  <span className="text-xs text-text-secondary">{scenario.creator}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-6 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isExporting ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Icon name="Download" size={16} />
                <span>Export {scenarios.length} Scenario{scenarios.length !== 1 ? 's' : ''}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;