import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportGenerationPanel = ({ 
  selectedFrameworks, 
  onFrameworkToggle, 
  onGenerateReport,
  isGenerating = false 
}) => {
  const [reportData, setReportData] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [previewMode, setPreviewMode] = useState('summary');

  const frameworks = [
    {
      id: 'gri',
      name: 'GRI Standards',
      description: 'Global Reporting Initiative - Universal Standards',
      version: '2021',
      sections: 42,
      completedSections: 38,
      status: 'ready',
      lastUpdated: '2024-12-05',
      requiredData: ['emissions', 'energy', 'water', 'waste', 'governance'],
      missingData: ['scope3-emissions']
    },
    {
      id: 'sasb',
      name: 'SASB Standards',
      description: 'Sustainability Accounting Standards Board',
      version: '2023',
      sections: 28,
      completedSections: 24,
      status: 'warning',
      lastUpdated: '2024-12-04',
      requiredData: ['financial-metrics', 'industry-specific', 'governance'],
      missingData: ['industry-specific', 'board-diversity']
    },
    {
      id: 'tcfd',
      name: 'TCFD Recommendations',
      description: 'Task Force on Climate-related Financial Disclosures',
      version: '2023',
      sections: 11,
      completedSections: 8,
      status: 'behind',
      lastUpdated: '2024-12-03',
      requiredData: ['climate-risks', 'scenario-analysis', 'governance'],
      missingData: ['scenario-analysis', 'climate-metrics', 'transition-plan']
    }
  ];

  useEffect(() => {
    // Simulate data population status check
    const mockReportData = {
      gri: {
        dataCompleteness: 90,
        validationStatus: 'passed',
        estimatedPages: 45,
        generationTime: '3-5 minutes'
      },
      sasb: {
        dataCompleteness: 85,
        validationStatus: 'warning',
        estimatedPages: 32,
        generationTime: '2-4 minutes'
      },
      tcfd: {
        dataCompleteness: 72,
        validationStatus: 'failed',
        estimatedPages: 28,
        generationTime: '2-3 minutes'
      }
    };

    setReportData(mockReportData);

    // Mock validation errors
    setValidationErrors([
      {
        framework: 'sasb',
        type: 'missing-data',
        message: 'Board diversity metrics incomplete',
        severity: 'warning',
        section: 'Governance'
      },
      {
        framework: 'tcfd',
        type: 'missing-data',
        message: 'Climate scenario analysis not provided',
        severity: 'error',
        section: 'Strategy'
      },
      {
        framework: 'tcfd',
        type: 'validation-error',
        message: 'Transition plan timeline inconsistent with targets',
        severity: 'error',
        section: 'Risk Management'
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'text-success';
      case 'warning': return 'text-warning';
      case 'behind': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'behind': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const getValidationIcon = (status) => {
    switch (status) {
      case 'passed': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getValidationColor = (status) => {
    switch (status) {
      case 'passed': return 'text-success';
      case 'warning': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const canGenerate = selectedFrameworks?.length > 0 && !isGenerating;
  const hasErrors = validationErrors?.some(error => 
    selectedFrameworks?.includes(error?.framework) && error?.severity === 'error'
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-card h-full flex flex-col">
      {/* Header - Standardized Padding */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-xl font-semibold text-foreground mb-2">Report Generation</h2>
            <p className="text-sm text-muted-foreground">
              Select frameworks and generate compliance reports
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 flex items-center justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(previewMode === 'summary' ? 'detailed' : 'summary')}
            >
              <Icon name="Eye" size={16} className="mr-2" />
              {previewMode === 'summary' ? 'Detailed View' : 'Summary View'}
            </Button>
          </div>
        </div>
      </div>

      {/* Framework Selection - Consistent Spacing */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-medium text-foreground mb-6">Framework Selection</h3>
            <div className="space-y-6">
              {frameworks?.map((framework) => {
                const isSelected = selectedFrameworks?.includes(framework?.id);
                const data = reportData?.[framework?.id];
                const frameworkErrors = validationErrors?.filter(error => error?.framework === framework?.id);
                
                return (
                  <div
                    key={framework?.id}
                    className={`border rounded-lg p-6 transition-all duration-150 ${
                      isSelected 
                        ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-1 flex items-start pt-1">
                        <Checkbox
                          checked={isSelected}
                          onChange={(e) => onFrameworkToggle(framework?.id, e?.target?.checked)}
                        />
                      </div>
                      <div className="col-span-11">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-foreground text-lg">{framework?.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{framework?.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon 
                              name={getStatusIcon(framework?.status)} 
                              size={16} 
                              className={getStatusColor(framework?.status)}
                            />
                            <span className={`text-sm font-medium ${getStatusColor(framework?.status)}`}>
                              {framework?.status === 'ready' ? 'Ready' :
                               framework?.status === 'warning' ? 'Warning' : 'Behind'}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar - Consistent Spacing */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">
                              {framework?.completedSections}/{framework?.sections} sections complete
                            </span>
                            <span className="text-muted-foreground">
                              {Math.round((framework?.completedSections / framework?.sections) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                framework?.status === 'ready' ? 'bg-success' :
                                framework?.status === 'warning' ? 'bg-warning' : 'bg-error'
                              }`}
                              style={{ 
                                width: `${(framework?.completedSections / framework?.sections) * 100}%` 
                              }}
                            />
                          </div>
                        </div>

                        {/* Data Status - Grid Layout */}
                        {isSelected && data && (
                          <div className="mb-6 p-4 bg-muted rounded-lg">
                            <div className="grid grid-cols-2 gap-6 text-sm">
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Icon 
                                    name={getValidationIcon(data?.validationStatus)} 
                                    size={14} 
                                    className={getValidationColor(data?.validationStatus)}
                                  />
                                  <span className="font-medium text-foreground">Data Validation</span>
                                </div>
                                <p className="text-muted-foreground">
                                  {data?.dataCompleteness}% complete
                                </p>
                              </div>
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Icon name="FileText" size={14} className="text-muted-foreground" />
                                  <span className="font-medium text-foreground">Estimated Output</span>
                                </div>
                                <p className="text-muted-foreground">
                                  {data?.estimatedPages} pages • {data?.generationTime}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Missing Data Alerts - Consistent Spacing */}
                        {isSelected && framework?.missingData?.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center space-x-2 mb-3">
                              <Icon name="AlertTriangle" size={14} className="text-warning" />
                              <span className="text-sm font-medium text-foreground">Missing Data</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {framework?.missingData?.map((item, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-warning/10 text-warning text-xs rounded-full border border-warning/20"
                                >
                                  {item?.replace('-', ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Validation Errors - Consistent Spacing */}
                        {isSelected && frameworkErrors?.length > 0 && (
                          <div className="space-y-3">
                            {frameworkErrors?.map((error, index) => (
                              <div
                                key={index}
                                className={`p-4 rounded-lg text-sm ${
                                  error?.severity === 'error' ?'bg-error/10 text-error border border-error/20' :'bg-warning/10 text-warning border border-warning/20'
                                }`}
                              >
                                <div className="flex items-center space-x-2 mb-2">
                                  <Icon 
                                    name={error?.severity === 'error' ? 'XCircle' : 'AlertTriangle'} 
                                    size={14} 
                                  />
                                  <span className="font-medium">{error?.section}</span>
                                </div>
                                <p>{error?.message}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generation Summary - Consistent Layout */}
          {selectedFrameworks?.length > 0 && (
            <div className="border-t border-border pt-8">
              <h3 className="text-lg font-medium text-foreground mb-6">Generation Summary</h3>
              <div className="bg-muted rounded-lg p-6">
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="font-medium text-foreground mb-2">Selected Frameworks</div>
                    <div className="text-muted-foreground">
                      {selectedFrameworks?.length} framework{selectedFrameworks?.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Estimated Pages</div>
                    <div className="text-muted-foreground">
                      {selectedFrameworks?.reduce((total, id) => 
                        total + (reportData?.[id]?.estimatedPages || 0), 0
                      )} pages total
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Generation Time</div>
                    <div className="text-muted-foreground">
                      5-10 minutes
                    </div>
                  </div>
                </div>

                {hasErrors && (
                  <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="AlertCircle" size={16} className="text-error" />
                      <span className="font-medium text-error">Cannot Generate</span>
                    </div>
                    <p className="text-error text-sm">
                      Please resolve validation errors before generating reports.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons - Standardized Footer */}
      <div className="p-6 border-t border-border">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-6 flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Templates
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Customize
            </Button>
          </div>
          <div className="col-span-12 md:col-span-6 flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              disabled={selectedFrameworks?.length === 0}
            >
              <Icon name="Eye" size={16} className="mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerationPanel;