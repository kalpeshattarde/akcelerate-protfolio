// src/pages/user-management-console/components/ExportModal.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportModal = ({ onClose, onExport, users, roles }) => {
  const [exportType, setExportType] = useState('user_access_report');
  const [format, setFormat] = useState('csv');
  const [includeFields, setIncludeFields] = useState({
    personalInfo: true,
    roleInfo: true,
    permissions: true,
    lastLogin: true,
    territory: true,
    compensationLevel: false,
    auditTrail: false
  });
  const [dateRange, setDateRange] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const exportTypes = [
    {
      id: 'user_access_report',
      name: 'User Access Report',
      description: 'Complete user directory with roles and permissions',
      fields: ['personalInfo', 'roleInfo', 'permissions', 'lastLogin', 'territory']
    },
    {
      id: 'role_assignments',
      name: 'Role Assignments',
      description: 'User-to-role mapping with assignment details',
      fields: ['personalInfo', 'roleInfo', 'auditTrail']
    },
    {
      id: 'compliance_documentation',
      name: 'Compliance Documentation',
      description: 'Audit-ready documentation for security reviews',
      fields: ['personalInfo', 'roleInfo', 'permissions', 'compensationLevel', 'auditTrail']
    },
    {
      id: 'permission_matrix',
      name: 'Permission Matrix',
      description: 'Detailed permission breakdown by user',
      fields: ['personalInfo', 'roleInfo', 'permissions', 'territory', 'compensationLevel']
    },
    {
      id: 'activity_summary',
      name: 'Activity Summary',
      description: 'User activity and login patterns',
      fields: ['personalInfo', 'lastLogin', 'auditTrail']
    }
  ];

  const fieldLabels = {
    personalInfo: 'Personal Information (Name, Email)',
    roleInfo: 'Role Information',
    permissions: 'Permissions & Access Rights',
    lastLogin: 'Last Login Information',
    territory: 'Territory & Department',
    compensationLevel: 'Compensation Level',
    auditTrail: 'Audit Trail Data'
  };

  const formatOptions = [
    { id: 'csv', name: 'CSV', description: 'Comma-separated values' },
    { id: 'xlsx', name: 'Excel', description: 'Microsoft Excel format' },
    { id: 'pdf', name: 'PDF', description: 'Portable document format' },
    { id: 'json', name: 'JSON', description: 'JavaScript object notation' }
  ];

  const dateRangeOptions = [
    { id: 'all', name: 'All Time' },
    { id: '30d', name: 'Last 30 Days' },
    { id: '90d', name: 'Last 90 Days' },
    { id: '1y', name: 'Last Year' }
  ];

  const handleExportTypeChange = (type) => {
    setExportType(type);
    
    // Auto-select relevant fields based on export type
    const selectedExportType = exportTypes.find(t => t.id === type);
    if (selectedExportType) {
      const newFields = { ...includeFields };
      Object.keys(newFields).forEach(field => {
        newFields[field] = selectedExportType.fields.includes(field);
      });
      setIncludeFields(newFields);
    }
  };

  const handleFieldToggle = (field) => {
    setIncludeFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleExport = async () => {
    setIsGenerating(true);
    
    // Simulate export generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const exportData = {
      type: exportType,
      format,
      fields: includeFields,
      dateRange,
      recordCount: users.length,
      timestamp: new Date().toISOString()
    };
    
    onExport(exportData);
    setIsGenerating(false);
  };

  const getSelectedFieldsCount = () => {
    return Object.values(includeFields).filter(Boolean).length;
  };

  const getEstimatedFileSize = () => {
    const baseSize = users.length * getSelectedFieldsCount() * 50; // rough estimation
    if (format === 'pdf') return `${Math.round(baseSize * 2 / 1024)}KB`;
    if (format === 'xlsx') return `${Math.round(baseSize * 1.5 / 1024)}KB`;
    return `${Math.round(baseSize / 1024)}KB`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300">
      <div className="bg-surface border border-border rounded-sm max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Export User Data</h2>
            <p className="text-text-secondary mt-1">Generate reports for security audits and compliance documentation</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary-600 hover:text-error transition-smooth"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Type Selection */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">Export Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleExportTypeChange(type.id)}
                  className={`p-4 border rounded-sm text-left transition-smooth ${
                    exportType === type.id
                      ? 'border-primary bg-primary-50' :'border-border hover:bg-secondary-50'
                  }`}
                >
                  <div className="font-medium text-text-primary">{type.name}</div>
                  <div className="text-sm text-text-secondary mt-1">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">Output Format</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {formatOptions.map((formatOption) => (
                <button
                  key={formatOption.id}
                  onClick={() => setFormat(formatOption.id)}
                  className={`p-3 border rounded-sm text-center transition-smooth ${
                    format === formatOption.id
                      ? 'border-primary bg-primary-50' :'border-border hover:bg-secondary-50'
                  }`}
                >
                  <div className="font-medium text-text-primary">{formatOption.name}</div>
                  <div className="text-xs text-text-secondary mt-1">{formatOption.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Field Selection */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">Include Fields</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(fieldLabels).map(([field, label]) => (
                <label key={field} className="flex items-center space-x-3 p-3 border border-border rounded-sm hover:bg-secondary-50 transition-smooth">
                  <input
                    type="checkbox"
                    checked={includeFields[field]}
                    onChange={() => handleFieldToggle(field)}
                    className="rounded border-border focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">Date Range</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dateRangeOptions.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setDateRange(range.id)}
                  className={`p-3 border rounded-sm text-center transition-smooth ${
                    dateRange === range.id
                      ? 'border-primary bg-primary-50' :'border-border hover:bg-secondary-50'
                  }`}
                >
                  <div className="text-sm font-medium text-text-primary">{range.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-info-50 border border-info-200 rounded-sm p-4">
            <h4 className="text-sm font-medium text-info-800 mb-2">Export Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-info-700">Records:</span>
                <span className="ml-2 font-medium text-info-800">{users.length}</span>
              </div>
              <div>
                <span className="text-info-700">Fields:</span>
                <span className="ml-2 font-medium text-info-800">{getSelectedFieldsCount()}</span>
              </div>
              <div>
                <span className="text-info-700">Format:</span>
                <span className="ml-2 font-medium text-info-800">{format.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-info-700">Est. Size:</span>
                <span className="ml-2 font-medium text-info-800">{getEstimatedFileSize()}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div className="text-sm text-text-secondary">
              Export will include {users.length} user records with {getSelectedFieldsCount()} data fields
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-secondary-100 text-secondary-700 rounded-sm hover:bg-secondary-200 transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={isGenerating || getSelectedFieldsCount() === 0}
                className="px-6 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Icon name="RefreshCw" size={16} className="animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Icon name="Download" size={16} />
                    <span>Generate Export</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;