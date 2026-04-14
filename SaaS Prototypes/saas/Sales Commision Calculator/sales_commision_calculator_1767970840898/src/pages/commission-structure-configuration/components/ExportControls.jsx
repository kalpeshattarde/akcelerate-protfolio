// src/pages/commission-structure-configuration/components/ExportControls.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportControls = ({ data, changeHistory, canEdit }) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    includeRates: true,
    includeRules: true,
    includeTiers: true,
    includeHistory: false,
    includeCompliance: true,
    dateRange: {
      start: '',
      end: ''
    },
    template: 'standard'
  });
  const [isExporting, setIsExporting] = useState(false);

  // Export formats and their descriptions
  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Comprehensive formatted report with charts and tables',
      icon: 'FileText'
    },
    {
      id: 'excel',
      name: 'Excel Workbook',
      description: 'Multi-sheet workbook with data tables and formulas',
      icon: 'FileSpreadsheet'
    },
    {
      id: 'csv',
      name: 'CSV Data',
      description: 'Raw data export for external analysis',
      icon: 'Database'
    },
    {
      id: 'json',
      name: 'JSON Config',
      description: 'Configuration data in JSON format for system import',
      icon: 'Code'
    }
  ];

  // Report templates
  const reportTemplates = [
    {
      id: 'standard',
      name: 'Standard Report',
      description: 'Complete configuration overview with all sections'
    },
    {
      id: 'executive',
      name: 'Executive Summary',
      description: 'High-level overview focusing on key metrics and changes'
    },
    {
      id: 'compliance',
      name: 'Compliance Report',
      description: 'SOX compliance focused with full audit trail'
    },
    {
      id: 'technical',
      name: 'Technical Documentation',
      description: 'Detailed technical specifications for implementation'
    }
  ];

  // Handle export
  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock file based on format
      const fileName = `commission-config-${new Date().toISOString().split('T')[0]}.${exportConfig.format}`;
      
      // In a real implementation, this would generate and download the actual file
      console.log('Exporting configuration:', {
        format: exportConfig.format,
        template: exportConfig.template,
        fileName,
        config: exportConfig
      });
      
      // Mock successful download
      alert(`Export completed successfully! File: ${fileName}`);
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
      setShowExportModal(false);
    }
  };

  // Quick export functions
  const quickExportPDF = () => {
    setExportConfig(prev => ({ 
      ...prev, 
      format: 'pdf', 
      template: 'standard',
      includeRates: true,
      includeRules: true,
      includeTiers: true,
      includeCompliance: true
    }));
    handleExport();
  };

  const quickExportCompliance = () => {
    setExportConfig(prev => ({ 
      ...prev, 
      format: 'pdf', 
      template: 'compliance',
      includeHistory: true,
      includeCompliance: true
    }));
    handleExport();
  };

  const quickExportData = () => {
    setExportConfig(prev => ({ 
      ...prev, 
      format: 'excel',
      template: 'technical',
      includeRates: true,
      includeRules: true,
      includeTiers: true
    }));
    handleExport();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Export & Documentation</h2>
          <p className="text-sm text-text-secondary mt-1">
            Generate configuration documentation, rate sheets, and compliance reports.
          </p>
        </div>
      </div>

      {/* Quick Export Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={quickExportPDF}
          className="p-4 border border-border rounded-sm hover:bg-secondary-50 transition-smooth text-left"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-primary-100 rounded-sm">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <h3 className="font-medium text-text-primary">Standard Report</h3>
          </div>
          <p className="text-sm text-text-secondary">
            Complete configuration overview with all sections and current rates
          </p>
        </button>

        <button
          onClick={quickExportCompliance}
          className="p-4 border border-border rounded-sm hover:bg-secondary-50 transition-smooth text-left"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-success-100 rounded-sm">
              <Icon name="Shield" size={20} className="text-success" />
            </div>
            <h3 className="font-medium text-text-primary">Compliance Report</h3>
          </div>
          <p className="text-sm text-text-secondary">
            SOX compliance report with full audit trail and change history
          </p>
        </button>

        <button
          onClick={quickExportData}
          className="p-4 border border-border rounded-sm hover:bg-secondary-50 transition-smooth text-left"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-warning-100 rounded-sm">
              <Icon name="Database" size={20} className="text-warning" />
            </div>
            <h3 className="font-medium text-text-primary">Data Export</h3>
          </div>
          <p className="text-sm text-text-secondary">
            Excel workbook with structured data tables for analysis
          </p>
        </button>
      </div>

      {/* Advanced Export Options */}
      <div className="bg-surface border border-border rounded-sm">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-text-primary">Advanced Export Options</h3>
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
            >
              <Icon name="Settings" size={16} />
              <span>Custom Export</span>
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exportFormats.map((format) => (
              <div key={format.id} className="p-3 border border-border rounded-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={format.icon} size={16} className="text-primary" />
                  <h4 className="font-medium text-text-primary text-sm">{format.name}</h4>
                </div>
                <p className="text-xs text-text-secondary">{format.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Exports */}
      <div className="bg-surface border border-border rounded-sm">
        <div className="p-4 border-b border-border">
          <h3 className="font-medium text-text-primary">Recent Exports</h3>
          <p className="text-sm text-text-secondary mt-1">
            Previously generated reports and exports.
          </p>
        </div>

        <div className="divide-y divide-border">
          {[
            {
              id: 1,
              name: 'Q4 Commission Structure Report',
              format: 'PDF',
              size: '2.4 MB',
              date: new Date(Date.now() - 2 * 60 * 60 * 1000),
              user: 'John Doe'
            },
            {
              id: 2,
              name: 'SOX Compliance Audit Trail',
              format: 'PDF',
              size: '1.8 MB',
              date: new Date(Date.now() - 24 * 60 * 60 * 1000),
              user: 'Jane Smith'
            },
            {
              id: 3,
              name: 'Rate Matrix Data Export',
              format: 'Excel',
              size: '856 KB',
              date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
              user: 'Sarah Johnson'
            }
          ].map((export_item) => (
            <div key={export_item.id} className="p-4 flex items-center justify-between hover:bg-secondary-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary-100 rounded-sm">
                  <Icon name="FileText" size={16} className="text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">{export_item.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>{export_item.format}</span>
                    <span>{export_item.size}</span>
                    <span>by {export_item.user}</span>
                    <span>{export_item.date.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-primary hover:bg-primary-50 rounded transition-smooth">
                  <Icon name="Download" size={16} />
                </button>
                <button className="p-2 text-secondary-600 hover:bg-secondary-100 rounded transition-smooth">
                  <Icon name="Eye" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Configuration Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-150 p-4">
          <div className="bg-surface rounded-sm shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Custom Export Configuration</h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Format Selection */}
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Export Format</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {exportFormats.map((format) => (
                      <label key={format.id} className="flex items-center space-x-3 p-3 border border-border rounded-sm cursor-pointer hover:bg-secondary-50">
                        <input
                          type="radio"
                          name="format"
                          value={format.id}
                          checked={exportConfig.format === format.id}
                          onChange={(e) => setExportConfig(prev => ({ ...prev, format: e.target.value }))}
                          className="text-primary"
                        />
                        <div>
                          <div className="font-medium text-sm">{format.name}</div>
                          <div className="text-xs text-text-secondary">{format.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Template Selection */}
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Report Template</h4>
                  <select
                    value={exportConfig.template}
                    onChange={(e) => setExportConfig(prev => ({ ...prev, template: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {reportTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name} - {template.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Content Selection */}
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Include Sections</h4>
                  <div className="space-y-2">
                    {[
                      { key: 'includeTiers', label: 'Tier Structures', description: 'Sales tier configurations and thresholds' },
                      { key: 'includeRates', label: 'Rate Matrix', description: 'Commission rates by territory and product' },
                      { key: 'includeRules', label: 'Business Rules', description: 'Advanced commission logic and conditions' },
                      { key: 'includeHistory', label: 'Change History', description: 'Audit trail and modification log' },
                      { key: 'includeCompliance', label: 'Compliance Data', description: 'SOX compliance and approval records' }
                    ].map((section) => (
                      <label key={section.key} className="flex items-start space-x-3 p-2">
                        <input
                          type="checkbox"
                          checked={exportConfig[section.key]}
                          onChange={(e) => setExportConfig(prev => ({ ...prev, [section.key]: e.target.checked }))}
                          className="mt-1 text-primary"
                        />
                        <div>
                          <div className="font-medium text-sm text-text-primary">{section.label}</div>
                          <div className="text-xs text-text-secondary">{section.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                {exportConfig.includeHistory && (
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Date Range (for History)</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">Start Date</label>
                        <input
                          type="date"
                          value={exportConfig.dateRange.start}
                          onChange={(e) => setExportConfig(prev => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, start: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">End Date</label>
                        <input
                          type="date"
                          value={exportConfig.dateRange.end}
                          onChange={(e) => setExportConfig(prev => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, end: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-border">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 bg-secondary-200 text-text-primary rounded-sm hover:bg-secondary-300 transition-smooth"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 disabled:bg-secondary-200 disabled:text-secondary-400 transition-smooth"
                >
                  {isExporting ? (
                    <>
                      <Icon name="RefreshCw" size={16} className="animate-spin" />
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
      )}
    </div>
  );
};

export default ExportControls;