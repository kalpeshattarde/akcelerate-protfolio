import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DisclosurePackModal = ({ isOpen, onClose, onGenerate }) => {
  const [selectedFrameworks, setSelectedFrameworks] = useState({
    gri: true,
    sasb: true,
    tcfd: false
  });
  const [reportFormat, setReportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const frameworks = [
    {
      id: 'gri',
      name: 'GRI Standards',
      description: 'Global Reporting Initiative sustainability reporting standards',
      icon: 'Globe',
      color: 'text-primary',
      required: true
    },
    {
      id: 'sasb',
      name: 'SASB Standards',
      description: 'Sustainability Accounting Standards Board industry-specific metrics',
      icon: 'BarChart3',
      color: 'text-secondary',
      required: true
    },
    {
      id: 'tcfd',
      name: 'TCFD Recommendations',
      description: 'Task Force on Climate-related Financial Disclosures framework',
      icon: 'CloudRain',
      color: 'text-success',
      required: false
    }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', icon: 'FileText' },
    { value: 'excel', label: 'Excel Workbook', icon: 'FileSpreadsheet' },
    { value: 'both', label: 'Both Formats', icon: 'Files' }
  ];

  const handleFrameworkToggle = (frameworkId) => {
    const framework = frameworks?.find(f => f?.id === frameworkId);
    if (framework?.required) return; // Don't allow toggling required frameworks
    
    setSelectedFrameworks(prev => ({
      ...prev,
      [frameworkId]: !prev?.[frameworkId]
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate generation progress
    const progressSteps = [
      { step: 'Collecting data...', progress: 20 },
      { step: 'Processing GRI metrics...', progress: 40 },
      { step: 'Processing SASB metrics...', progress: 60 },
      { step: 'Generating charts...', progress: 80 },
      { step: 'Finalizing report...', progress: 100 }
    ];

    for (const { step, progress } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(progress);
    }

    // Complete generation
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationProgress(0);
      if (onGenerate) {
        onGenerate({
          frameworks: selectedFrameworks,
          format: reportFormat,
          includeCharts
        });
      }
      onClose();
    }, 500);
  };

  const getSelectedCount = () => {
    return Object.values(selectedFrameworks)?.filter(Boolean)?.length;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Generate Disclosure Pack</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Create comprehensive ESG reports for regulatory compliance
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Framework Selection */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">
                Select Reporting Frameworks
              </h3>
              <div className="space-y-3">
                {frameworks?.map((framework) => (
                  <div
                    key={framework?.id}
                    className={`border rounded-lg p-4 transition-all duration-200 ${
                      selectedFrameworks?.[framework?.id]
                        ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={selectedFrameworks?.[framework?.id]}
                        onChange={(e) => handleFrameworkToggle(framework?.id)}
                        disabled={framework?.required}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Icon name={framework?.icon} size={20} className={framework?.color} />
                          <h4 className="font-medium text-foreground">{framework?.name}</h4>
                          {framework?.required && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {framework?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Output Format</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {formatOptions?.map((format) => (
                  <button
                    key={format?.value}
                    onClick={() => setReportFormat(format?.value)}
                    className={`flex items-center space-x-3 p-4 border rounded-lg transition-all duration-200 ${
                      reportFormat === format?.value
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-muted-foreground text-foreground'
                    }`}
                  >
                    <Icon name={format?.icon} size={20} />
                    <span className="font-medium">{format?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Additional Options</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={includeCharts}
                    onChange={(e) => setIncludeCharts(e?.target?.checked)}
                  />
                  <div>
                    <label className="font-medium text-foreground">Include Charts & Visualizations</label>
                    <p className="text-sm text-muted-foreground">
                      Add interactive charts and data visualizations to the report
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Generation Progress */}
            {isGenerating && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Loader2" size={20} className="animate-spin text-primary" />
                  <span className="font-medium text-foreground">Generating Report...</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {generationProgress}% complete
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
            <div className="text-sm text-muted-foreground">
              {getSelectedCount()} framework{getSelectedCount() !== 1 ? 's' : ''} selected
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} disabled={isGenerating}>
                Cancel
              </Button>
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || getSelectedCount() === 0}
                loading={isGenerating}
              >
                <Icon name="FileText" size={16} className="mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisclosurePackModal;