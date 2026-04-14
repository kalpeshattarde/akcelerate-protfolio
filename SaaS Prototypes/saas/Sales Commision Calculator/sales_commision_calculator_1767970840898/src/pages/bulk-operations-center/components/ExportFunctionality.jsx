// src/pages/bulk-operations-center/components/ExportFunctionality.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportFunctionality = ({ operationLogs, validationErrors, previewData }) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedExportType, setSelectedExportType] = useState('operation_report');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);
  const [recipientEmails, setRecipientEmails] = useState(['']);
  const [exportNote, setExportNote] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const exportTypes = [
    {
      id: 'operation_report',
      title: 'Operation Report',
      description: 'Comprehensive report of completed operations with impact analysis',
      icon: 'FileText',
      formats: ['pdf', 'excel', 'word'],
      includesData: ['summary', 'timeline', 'affected_records', 'payout_changes']
    },
    {
      id: 'change_summary',
      title: 'Change Summary',
      description: 'Executive summary of changes made during bulk operations',
      icon: 'TrendingUp',
      formats: ['pdf', 'excel'],
      includesData: ['executive_summary', 'key_metrics', 'before_after_comparison']
    },
    {
      id: 'exception_list',
      title: 'Exception List',
      description: 'Detailed list of validation errors and exceptions encountered',
      icon: 'AlertTriangle',
      formats: ['excel', 'csv'],
      includesData: ['validation_errors', 'failed_records', 'resolution_suggestions']
    },
    {
      id: 'audit_trail',
      title: 'Audit Trail Report',
      description: 'Complete audit trail for compliance and record-keeping',
      icon: 'Shield',
      formats: ['pdf', 'excel'],
      includesData: ['full_audit_log', 'user_actions', 'timestamps', 'compliance_data']
    },
    {
      id: 'stakeholder_communication',
      title: 'Stakeholder Communication',
      description: 'Formatted report for sharing with stakeholders and management',
      icon: 'Users',
      formats: ['pdf', 'powerpoint'],
      includesData: ['executive_summary', 'visual_charts', 'key_insights', 'recommendations']
    }
  ];

  const formatOptions = {
    pdf: { label: 'PDF Document', icon: 'FileText', description: 'Portable document format' },
    excel: { label: 'Excel Spreadsheet', icon: 'Table', description: 'Microsoft Excel format' },
    csv: { label: 'CSV File', icon: 'Download', description: 'Comma-separated values' },
    word: { label: 'Word Document', icon: 'FileText', description: 'Microsoft Word format' },
    powerpoint: { label: 'PowerPoint', icon: 'Presentation', description: 'Microsoft PowerPoint format' }
  };

  const handleExportTypeChange = (typeId) => {
    setSelectedExportType(typeId);
    const selectedType = exportTypes.find(type => type.id === typeId);
    if (selectedType && !selectedType.formats.includes(exportFormat)) {
      setExportFormat(selectedType.formats[0]);
    }
  };

  const addEmailField = () => {
    setRecipientEmails([...recipientEmails, '']);
  };

  const removeEmailField = (index) => {
    setRecipientEmails(recipientEmails.filter((_, i) => i !== index));
  };

  const updateEmail = (index, value) => {
    const updated = [...recipientEmails];
    updated[index] = value;
    setRecipientEmails(updated);
  };

  const generateExport = () => {
    setIsExporting(true);
    
    // Simulate export generation
    setTimeout(() => {
      const selectedType = exportTypes.find(type => type.id === selectedExportType);
      const fileName = `${selectedType.title.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      
      // Mock file generation
      console.log('Generating export:', {
        type: selectedExportType,
        format: exportFormat,
        fileName,
        includeCharts,
        includeDetails,
        recipients: recipientEmails.filter(email => email),
        note: exportNote
      });
      
      // In a real implementation, this would trigger file download
      alert(`Export generated: ${fileName}`);
      
      setIsExporting(false);
      setShowExportModal(false);
    }, 3000);
  };

  const selectedTypeData = exportTypes.find(type => type.id === selectedExportType);
  const availableFormats = selectedTypeData?.formats || ['pdf'];

  const getQuickExportData = () => {
    return [
      {
        id: 'current_operation',
        title: 'Current Operation Summary',
        description: 'Quick export of the current operation in progress',
        icon: 'Zap',
        action: () => generateQuickExport('current_operation')
      },
      {
        id: 'validation_errors',
        title: 'Validation Errors',
        description: 'Export list of validation errors for review',
        icon: 'AlertCircle',
        action: () => generateQuickExport('validation_errors'),
        disabled: !validationErrors?.length
      },
      {
        id: 'preview_data',
        title: 'Preview Analysis',
        description: 'Export operation preview and impact analysis',
        icon: 'Eye',
        action: () => generateQuickExport('preview_data'),
        disabled: !previewData
      },
      {
        id: 'audit_summary',
        title: 'Recent Audit Logs',
        description: 'Export recent audit log entries',
        icon: 'Clock',
        action: () => generateQuickExport('audit_summary'),
        disabled: !operationLogs?.length
      }
    ];
  };

  const generateQuickExport = (type) => {
    console.log('Quick export:', type);
    // Implement quick export logic
    alert(`Quick export generated: ${type}`);
  };

  return (
    <>
      <div className="bg-surface border border-border rounded-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-text-primary">Export & Reports</h3>
            <Icon name="Download" size={16} className="text-primary" />
          </div>
          
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
          >
            <Icon name="FileText" size={16} />
            <span>Generate Report</span>
          </button>
        </div>

        {/* Quick Export Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {getQuickExportData().map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              disabled={item.disabled}
              className={`p-3 border rounded-sm text-left transition-smooth ${
                item.disabled 
                  ? 'border-border bg-secondary-50 opacity-50 cursor-not-allowed' :'border-border bg-surface hover:border-primary hover:bg-primary-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={item.disabled ? 'text-secondary-400' : 'text-primary'} 
                />
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{item.title}</p>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
                <Icon 
                  name="Download" 
                  size={16} 
                  className={item.disabled ? 'text-secondary-400' : 'text-secondary-600'} 
                />
              </div>
            </button>
          ))}
        </div>

        {/* Export History */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-text-primary mb-3">Recent Exports</h4>
          <div className="space-y-2">
            {[
              {
                name: 'Q4_Bulk_Operations_Report.pdf',
                type: 'Operation Report',
                generated: new Date(Date.now() - 2 * 60 * 60 * 1000),
                size: '2.4 MB'
              },
              {
                name: 'Validation_Errors_Summary.xlsx',
                type: 'Exception List',
                generated: new Date(Date.now() - 4 * 60 * 60 * 1000),
                size: '856 KB'
              },
              {
                name: 'Stakeholder_Update_November.pdf',
                type: 'Stakeholder Communication',
                generated: new Date(Date.now() - 24 * 60 * 60 * 1000),
                size: '1.2 MB'
              }
            ].map((export_, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-secondary-50 rounded-sm">
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={16} className="text-secondary-600" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{export_.name}</p>
                    <p className="text-xs text-text-secondary">
                      {export_.type} • {export_.generated.toLocaleString()} • {export_.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-secondary-600 hover:text-text-primary rounded transition-smooth">
                    <Icon name="Download" size={14} />
                  </button>
                  <button className="p-1 text-secondary-600 hover:text-text-primary rounded transition-smooth">
                    <Icon name="Share" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Capabilities Info */}
        <div className="mt-4 p-3 bg-info-50 border border-info-200 rounded-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-info" />
            <h4 className="font-medium text-text-primary">Export Capabilities</h4>
          </div>
          <div className="text-sm text-text-secondary space-y-1">
            <p>• Generate comprehensive reports for operations, changes, and exceptions</p>
            <p>• Multiple formats supported: PDF, Excel, Word, PowerPoint, CSV</p>
            <p>• Automated stakeholder distribution via email</p>
            <p>• Compliance-ready audit trail documentation</p>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-200">
          <div className="bg-surface rounded-sm max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Generate Export</h3>
                    <p className="text-sm text-text-secondary">Create detailed reports and documentation</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-secondary-100 rounded-sm transition-smooth"
                >
                  <Icon name="X" size={20} className="text-secondary-600" />
                </button>
              </div>

              {/* Export Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Export Type
                </label>
                <div className="space-y-2">
                  {exportTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleExportTypeChange(type.id)}
                      className={`w-full p-4 border-2 rounded-sm text-left transition-all duration-200 ${
                        selectedExportType === type.id
                          ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-secondary-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={type.icon} 
                          size={20} 
                          className={selectedExportType === type.id ? 'text-primary' : 'text-secondary-600'} 
                        />
                        <div className="flex-1">
                          <p className="font-medium text-text-primary">{type.title}</p>
                          <p className="text-sm text-text-secondary">{type.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {type.includesData.map((data, index) => (
                              <span 
                                key={index}
                                className="text-xs bg-secondary-100 text-secondary-600 px-2 py-1 rounded"
                              >
                                {data.replace(/_/g, ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableFormats.map((format) => {
                    const formatInfo = formatOptions[format];
                    return (
                      <button
                        key={format}
                        onClick={() => setExportFormat(format)}
                        className={`p-3 border-2 rounded-sm text-left transition-all duration-200 ${
                          exportFormat === format
                            ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon 
                            name={formatInfo.icon} 
                            size={16} 
                            className={exportFormat === format ? 'text-primary' : 'text-secondary-600'} 
                          />
                          <div>
                            <p className="font-medium text-text-primary">{formatInfo.label}</p>
                            <p className="text-xs text-text-secondary">{formatInfo.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Export Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Export Options
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeCharts"
                      checked={includeCharts}
                      onChange={(e) => setIncludeCharts(e.target.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                    />
                    <label htmlFor="includeCharts" className="text-sm text-text-primary">
                      Include charts and visualizations
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeDetails"
                      checked={includeDetails}
                      onChange={(e) => setIncludeDetails(e.target.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                    />
                    <label htmlFor="includeDetails" className="text-sm text-text-primary">
                      Include detailed record information
                    </label>
                  </div>
                </div>
              </div>

              {/* Email Distribution */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Email Distribution (Optional)
                </label>
                <div className="space-y-3">
                  {recipientEmails.map((email, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => updateEmail(index, e.target.value)}
                        placeholder="Enter email address"
                        className="flex-1 p-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      {recipientEmails.length > 1 && (
                        <button
                          onClick={() => removeEmailField(index)}
                          className="p-2 text-error hover:bg-error-50 rounded-sm transition-smooth"
                        >
                          <Icon name="X" size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addEmailField}
                    className="flex items-center space-x-2 text-sm text-primary hover:text-primary-700 transition-smooth"
                  >
                    <Icon name="Plus" size={14} />
                    <span>Add another email</span>
                  </button>
                </div>
              </div>

              {/* Export Note */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Export Note (Optional)
                </label>
                <textarea
                  value={exportNote}
                  onChange={(e) => setExportNote(e.target.value)}
                  className="w-full p-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  rows={3}
                  placeholder="Add a note or context for this export..."
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
                >
                  Cancel
                </button>
                <button
                  onClick={generateExport}
                  disabled={isExporting}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? (
                    <Icon name="RefreshCw" size={16} className="animate-spin" />
                  ) : (
                    <Icon name="Download" size={16} />
                  )}
                  <span>{isExporting ? 'Generating...' : 'Generate Export'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportFunctionality;