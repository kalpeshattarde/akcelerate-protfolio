import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkImportToolbar = ({ onImportComplete, selectedFacility, selectedDepartment }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [validationResults, setValidationResults] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [importData, setImportData] = useState([]);
  const fileInputRef = useRef(null);

  const importTemplateOptions = [
    { value: 'environmental', label: 'Environmental Metrics' },
    { value: 'social', label: 'Social Metrics' },
    { value: 'governance', label: 'Governance Metrics' },
    { value: 'all', label: 'All ESG Metrics' }
  ];

  const handleFileSelect = (event) => {
    const file = event.target?.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file) => {
    setIsImporting(true);
    setImportProgress(0);

    try {
      // Simulate file processing
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e?.target?.result;
        
        // Simulate processing steps
        for (let i = 0; i <= 100; i += 10) {
          setImportProgress(i);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Mock parsed data
        const mockImportData = [
          {
            id: 'import-1',
            metricName: 'Energy Consumption',
            value: 2650.5,
            unit: 'kWh',
            source: 'CSV Import',
            status: 'valid',
            errors: []
          },
          {
            id: 'import-2',
            metricName: 'Water Usage',
            value: 1950,
            unit: 'gallons',
            source: 'CSV Import',
            status: 'valid',
            errors: []
          },
          {
            id: 'import-3',
            metricName: 'CO₂ Emissions',
            value: -50, // Invalid negative value
            unit: 'tons CO₂e',
            source: 'CSV Import',
            status: 'error',
            errors: ['Value cannot be negative']
          },
          {
            id: 'import-4',
            metricName: 'Waste Generated',
            value: 52.8,
            unit: 'tons',
            source: 'CSV Import',
            status: 'warning',
            errors: ['Value exceeds typical range']
          }
        ];

        setImportData(mockImportData);
        
        // Mock validation results
        const validationResults = {
          totalRows: mockImportData?.length,
          validRows: mockImportData?.filter(row => row?.status === 'valid')?.length,
          errorRows: mockImportData?.filter(row => row?.status === 'error')?.length,
          warningRows: mockImportData?.filter(row => row?.status === 'warning')?.length,
          duplicateRows: 0
        };

        setValidationResults(validationResults);
        setShowPreview(true);
      };

      reader?.readAsText(file);
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const handleImportConfirm = async () => {
    setIsImporting(true);
    
    try {
      // Simulate import process
      for (let i = 0; i <= 100; i += 20) {
        setImportProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Filter out error rows for import
      const validData = importData?.filter(row => row?.status !== 'error');
      
      if (onImportComplete) {
        onImportComplete(validData);
      }

      setShowPreview(false);
      setImportData([]);
      setValidationResults(null);
    } catch (error) {
      console.error('Import confirmation failed:', error);
    } finally {
      setIsImporting(false);
      setImportProgress(0);
    }
  };

  const handleDownloadTemplate = (templateType) => {
    // Simulate template download
    const templates = {
      environmental: 'environmental_metrics_template.csv',
      social: 'social_metrics_template.csv',
      governance: 'governance_metrics_template.csv',
      all: 'all_esg_metrics_template.csv'
    };

    console.log(`Downloading template: ${templates?.[templateType]}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      {/* Toolbar */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="font-medium text-foreground">Bulk Data Import</h3>
            
            {selectedFacility && selectedDepartment && (
              <div className="text-sm text-muted-foreground">
                {selectedFacility?.name} • {selectedDepartment?.name}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {/* Template Download */}
            <Select
              options={importTemplateOptions}
              placeholder="Download Template"
              onChange={(value) => handleDownloadTemplate(value)}
              className="w-48"
            />

            {/* File Upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <Button
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              disabled={isImporting || !selectedDepartment}
            >
              <Icon name="Upload" size={16} className="mr-2" />
              Import CSV
            </Button>

            <Button
              variant="outline"
              disabled={!selectedDepartment}
            >
              <Icon name="Database" size={16} className="mr-2" />
              Sync ERP
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {isImporting && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {importProgress < 100 ? 'Processing file...' : 'Import complete'}
              </span>
              <span className="text-sm font-medium text-foreground">{importProgress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${importProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      {/* Import Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Import Preview</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Review the data before importing
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPreview(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              {/* Validation Summary */}
              {validationResults && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-foreground">{validationResults?.totalRows}</div>
                    <div className="text-sm text-muted-foreground">Total Rows</div>
                  </div>
                  <div className="bg-success/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-success">{validationResults?.validRows}</div>
                    <div className="text-sm text-muted-foreground">Valid</div>
                  </div>
                  <div className="bg-warning/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-warning">{validationResults?.warningRows}</div>
                    <div className="text-sm text-muted-foreground">Warnings</div>
                  </div>
                  <div className="bg-error/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-error">{validationResults?.errorRows}</div>
                    <div className="text-sm text-muted-foreground">Errors</div>
                  </div>
                </div>
              )}
            </div>

            {/* Data Preview */}
            <div className="flex-1 overflow-auto p-6">
              <div className="space-y-2">
                {importData?.map((row, index) => (
                  <div
                    key={row?.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      row?.status === 'valid' ? 'border-success/20 bg-success/5' :
                      row?.status === 'warning'? 'border-warning/20 bg-warning/5' : 'border-error/20 bg-error/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={getStatusIcon(row?.status)} 
                        size={16} 
                        className={getStatusColor(row?.status)}
                      />
                      <div>
                        <div className="font-medium text-foreground">{row?.metricName}</div>
                        <div className="text-sm text-muted-foreground">
                          {row?.value} {row?.unit} • {row?.source}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-sm font-medium capitalize ${getStatusColor(row?.status)}`}>
                        {row?.status}
                      </div>
                      {row?.errors?.length > 0 && (
                        <div className="text-xs text-error mt-1">
                          {row?.errors?.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {validationResults?.errorRows > 0 && (
                    <span className="text-error">
                      {validationResults?.errorRows} rows with errors will be skipped
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleImportConfirm}
                    disabled={validationResults?.validRows === 0}
                  >
                    <Icon name="Check" size={16} className="mr-2" />
                    Import {validationResults?.validRows} Rows
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkImportToolbar;