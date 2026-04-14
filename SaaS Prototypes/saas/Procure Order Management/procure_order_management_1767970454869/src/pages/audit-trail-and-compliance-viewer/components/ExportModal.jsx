import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportModal = ({ isOpen, onClose, onExport, recordCount }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'excel',
    dateRange: 'current',
    includeDetails: true,
    includeMetadata: false,
    columns: {
      timestamp: true,
      user: true,
      action: true,
      affectedRecord: true,
      severity: true,
      compliance: true,
      description: true,
      beforeValue: false,
      afterValue: false,
      ipAddress: false,
      sessionId: false
    },
    groupBy: 'none',
    sortBy: 'timestamp',
    sortOrder: 'desc'
  });

  const handleConfigChange = (key, value) => {
    setExportConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleColumnToggle = (column) => {
    setExportConfig(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        [column]: !prev.columns[column]
      }
    }));
  };

  const handleExport = () => {
    onExport(exportConfig);
  };

  const formatOptions = [
    { value: 'excel', label: 'Excel (.xlsx)', icon: 'FileSpreadsheet' },
    { value: 'csv', label: 'CSV (.csv)', icon: 'FileText' },
    { value: 'pdf', label: 'PDF Report (.pdf)', icon: 'FileText' },
    { value: 'json', label: 'JSON (.json)', icon: 'Code' }
  ];

  const columnOptions = [
    { key: 'timestamp', label: 'Timestamp', required: true },
    { key: 'user', label: 'User', required: true },
    { key: 'action', label: 'Action', required: true },
    { key: 'affectedRecord', label: 'Affected Record', required: false },
    { key: 'severity', label: 'Severity', required: false },
    { key: 'compliance', label: 'Compliance Tags', required: false },
    { key: 'description', label: 'Description', required: false },
    { key: 'beforeValue', label: 'Before Value', required: false },
    { key: 'afterValue', label: 'After Value', required: false },
    { key: 'ipAddress', label: 'IP Address', required: false },
    { key: 'sessionId', label: 'Session ID', required: false }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
      <div className="bg-surface rounded-card shadow-elevation-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading-semibold text-text-primary">
              Export Audit Records
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Configure export settings for {recordCount.toLocaleString()} records
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-button hover:bg-secondary-100 transition-smooth"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <h3 className="text-sm font-heading-medium text-text-primary mb-3">
              Export Format
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {formatOptions.map((format) => (
                <label
                  key={format.value}
                  className={`flex items-center space-x-3 p-3 border rounded-button cursor-pointer transition-smooth ${
                    exportConfig.format === format.value
                      ? 'border-primary bg-primary-50' :'border-border hover:bg-secondary-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.value}
                    checked={exportConfig.format === format.value}
                    onChange={(e) => handleConfigChange('format', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <Icon name={format.icon} size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{format.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-sm font-heading-medium text-text-primary mb-3">
              Date Range
            </h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="dateRange"
                  value="current"
                  checked={exportConfig.dateRange === 'current'}
                  onChange={(e) => handleConfigChange('dateRange', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-text-primary">Current filtered results</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="dateRange"
                  value="all"
                  checked={exportConfig.dateRange === 'all'}
                  onChange={(e) => handleConfigChange('dateRange', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-text-primary">All available records</span>
              </label>
            </div>
          </div>

          {/* Export Options */}
          <div>
            <h3 className="text-sm font-heading-medium text-text-primary mb-3">
              Export Options
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportConfig.includeDetails}
                  onChange={(e) => handleConfigChange('includeDetails', e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-primary">Include detailed descriptions</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportConfig.includeMetadata}
                  onChange={(e) => handleConfigChange('includeMetadata', e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-primary">Include technical metadata</span>
              </label>
            </div>
          </div>

          {/* Column Selection */}
          <div>
            <h3 className="text-sm font-heading-medium text-text-primary mb-3">
              Columns to Include
            </h3>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {columnOptions.map((column) => (
                <label
                  key={column.key}
                  className={`flex items-center space-x-3 ${
                    column.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={exportConfig.columns[column.key]}
                    onChange={() => !column.required && handleColumnToggle(column.key)}
                    disabled={column.required}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">
                    {column.label}
                    {column.required && <span className="text-error ml-1">*</span>}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-xs text-text-secondary mt-2">
              * Required columns cannot be deselected
            </p>
          </div>

          {/* Sorting */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading-medium text-text-primary mb-2">
                Sort By
              </label>
              <select
                value={exportConfig.sortBy}
                onChange={(e) => handleConfigChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="timestamp">Timestamp</option>
                <option value="user">User</option>
                <option value="action">Action</option>
                <option value="severity">Severity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-heading-medium text-text-primary mb-2">
                Sort Order
              </label>
              <select
                value={exportConfig.sortOrder}
                onChange={(e) => handleConfigChange('sortOrder', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Estimated file size: ~{Math.ceil(recordCount * 0.5)}KB
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth"
            >
              <Icon name="Download" size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;