import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkOperationsToolbar = ({ 
  selectedFrameworks = [],
  onFrameworkToggle,
  onBulkGenerate,
  onCustomizeTemplate,
  onManageDistribution,
  isGenerating = false 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [bulkSettings, setBulkSettings] = useState({
    format: 'pdf',
    includeCharts: true,
    includeAppendices: true,
    watermark: false,
    password: false,
    compression: 'standard'
  });

  const frameworks = [
    { id: 'gri', name: 'GRI Standards', icon: 'FileText', color: 'text-success' },
    { id: 'sasb', name: 'SASB Standards', icon: 'BarChart3', color: 'text-primary' },
    { id: 'tcfd', name: 'TCFD Recommendations', icon: 'TrendingUp', color: 'text-warning' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', icon: 'FileText' },
    { value: 'docx', label: 'Word Document', icon: 'FileText' },
    { value: 'html', label: 'Web Report', icon: 'Globe' },
    { value: 'excel', label: 'Excel Workbook', icon: 'Table' }
  ];

  const compressionOptions = [
    { value: 'none', label: 'No Compression' },
    { value: 'standard', label: 'Standard Quality' },
    { value: 'high', label: 'High Compression' }
  ];

  const handleSettingChange = (key, value) => {
    setBulkSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSelectAll = () => {
    const allIds = frameworks?.map(f => f?.id);
    const isAllSelected = allIds?.every(id => selectedFrameworks?.includes(id));
    
    if (isAllSelected) {
      // Deselect all
      allIds?.forEach(id => onFrameworkToggle(id, false));
    } else {
      // Select all
      allIds?.forEach(id => {
        if (!selectedFrameworks?.includes(id)) {
          onFrameworkToggle(id, true);
        }
      });
    }
  };

  const isAllSelected = frameworks?.every(f => selectedFrameworks?.includes(f?.id));
  const isPartiallySelected = selectedFrameworks?.length > 0 && !isAllSelected;

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Main Toolbar */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Select All */}
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isAllSelected}
                indeterminate={isPartiallySelected}
                onChange={handleSelectAll}
              />
              <span className="text-sm font-medium text-foreground">
                Select All Frameworks
              </span>
            </div>

            {/* Framework Selection */}
            <div className="flex items-center space-x-2">
              {frameworks?.map((framework) => (
                <button
                  key={framework?.id}
                  onClick={() => onFrameworkToggle(framework?.id, !selectedFrameworks?.includes(framework?.id))}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-150 ${
                    selectedFrameworks?.includes(framework?.id)
                      ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:border-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={framework?.icon} size={16} className={framework?.color} />
                  <span className="text-sm font-medium">{framework?.name}</span>
                  {selectedFrameworks?.includes(framework?.id) && (
                    <Icon name="Check" size={14} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <Icon name="Settings" size={16} className="mr-2" />
              {showAdvanced ? 'Hide' : 'Show'} Options
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onCustomizeTemplate}
              disabled={selectedFrameworks?.length === 0}
            >
              <Icon name="Edit" size={16} className="mr-2" />
              Customize
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onManageDistribution}
              disabled={selectedFrameworks?.length === 0}
            >
              <Icon name="Users" size={16} className="mr-2" />
              Distribution
            </Button>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedFrameworks?.length > 0 && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="text-sm text-primary">
                  {selectedFrameworks?.length} framework{selectedFrameworks?.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="text-sm text-primary">
                Estimated generation time: {selectedFrameworks?.length * 3}-{selectedFrameworks?.length * 5} minutes
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Advanced Options */}
      {showAdvanced && (
        <div className="border-t border-border p-4">
          <h4 className="font-medium text-foreground mb-4">Generation Options</h4>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Format Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Output Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {formatOptions?.map((format) => (
                  <button
                    key={format?.value}
                    onClick={() => handleSettingChange('format', format?.value)}
                    className={`flex items-center space-x-2 p-2 rounded-lg border text-sm transition-all duration-150 ${
                      bulkSettings?.format === format?.value
                        ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={format?.icon} size={14} />
                    <span>{format?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Options */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Content Options
              </label>
              <div className="space-y-2">
                <Checkbox
                  label="Include charts and visualizations"
                  checked={bulkSettings?.includeCharts}
                  onChange={(e) => handleSettingChange('includeCharts', e?.target?.checked)}
                />
                <Checkbox
                  label="Include appendices and references"
                  checked={bulkSettings?.includeAppendices}
                  onChange={(e) => handleSettingChange('includeAppendices', e?.target?.checked)}
                />
                <Checkbox
                  label="Add confidential watermark"
                  checked={bulkSettings?.watermark}
                  onChange={(e) => handleSettingChange('watermark', e?.target?.checked)}
                />
                <Checkbox
                  label="Password protect documents"
                  checked={bulkSettings?.password}
                  onChange={(e) => handleSettingChange('password', e?.target?.checked)}
                />
              </div>
            </div>
          </div>

          {/* Compression Settings */}
          {bulkSettings?.format === 'pdf' && (
            <div className="mt-4">
              <label className="text-sm font-medium text-foreground mb-2 block">
                PDF Compression
              </label>
              <div className="flex space-x-2">
                {compressionOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleSettingChange('compression', option?.value)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-all duration-150 ${
                      bulkSettings?.compression === option?.value
                        ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:border-muted-foreground'
                    }`}
                  >
                    {option?.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Save" size={14} className="mr-2" />
                  Save as Template
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Upload" size={14} className="mr-2" />
                  Load Template
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="RotateCcw" size={14} className="mr-2" />
                  Reset to Defaults
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Progress Indicator */}
      {isGenerating && (
        <div className="border-t border-border p-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6">
              <Icon name="Loader2" size={20} className="animate-spin text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">
                  Generating reports...
                </span>
                <span className="text-sm text-muted-foreground">
                  {selectedFrameworks?.length} of {frameworks?.length} frameworks
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: '45%' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkOperationsToolbar;