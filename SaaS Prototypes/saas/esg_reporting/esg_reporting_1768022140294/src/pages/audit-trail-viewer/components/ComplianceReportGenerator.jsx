import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const ComplianceReportGenerator = ({ 
  isOpen, 
  onClose, 
  auditData = [],
  onGenerateReport 
}) => {
  const [reportConfig, setReportConfig] = useState({
    reportType: 'quarterly',
    period: {
      quarter: 'Q4',
      year: '2024',
      startDate: '2024-10-01',
      endDate: '2024-12-31'
    },
    frameworks: ['sox', 'gdpr'],
    sections: [
      'executive_summary',
      'user_activities',
      'data_modifications',
      'security_events',
      'compliance_violations'
    ],
    includeCharts: true,
    includeRecommendations: true,
    confidentialityLevel: 'internal'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const reportTypeOptions = [
    { value: 'quarterly', label: 'Quarterly Compliance Report' },
    { value: 'annual', label: 'Annual Audit Summary' },
    { value: 'incident', label: 'Security Incident Report' },
    { value: 'custom', label: 'Custom Date Range Report' }
  ];

  const quarterOptions = [
    { value: 'Q1', label: 'Q1 (Jan-Mar)' },
    { value: 'Q2', label: 'Q2 (Apr-Jun)' },
    { value: 'Q3', label: 'Q3 (Jul-Sep)' },
    { value: 'Q4', label: 'Q4 (Oct-Dec)' }
  ];

  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' }
  ];

  const frameworkOptions = [
    { value: 'sox', label: 'SOX (Sarbanes-Oxley Act)' },
    { value: 'gdpr', label: 'GDPR (General Data Protection Regulation)' },
    { value: 'iso27001', label: 'ISO 27001 (Information Security)' },
    { value: 'nist', label: 'NIST Cybersecurity Framework' },
    { value: 'pci', label: 'PCI DSS (Payment Card Industry)' }
  ];

  const sectionOptions = [
    { value: 'executive_summary', label: 'Executive Summary' },
    { value: 'user_activities', label: 'User Activity Analysis' },
    { value: 'data_modifications', label: 'Data Modification Tracking' },
    { value: 'security_events', label: 'Security Events & Incidents' },
    { value: 'compliance_violations', label: 'Compliance Violations' },
    { value: 'access_patterns', label: 'Access Pattern Analysis' },
    { value: 'risk_assessment', label: 'Risk Assessment' },
    { value: 'recommendations', label: 'Recommendations & Action Items' }
  ];

  const confidentialityOptions = [
    { value: 'public', label: 'Public' },
    { value: 'internal', label: 'Internal Use Only' },
    { value: 'confidential', label: 'Confidential' },
    { value: 'restricted', label: 'Restricted Access' }
  ];

  const handleConfigChange = (key, value) => {
    setReportConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePeriodChange = (field, value) => {
    setReportConfig(prev => ({
      ...prev,
      period: {
        ...prev?.period,
        [field]: value
      }
    }));
  };

  const handleFrameworkToggle = (framework, checked) => {
    setReportConfig(prev => ({
      ...prev,
      frameworks: checked 
        ? [...prev?.frameworks, framework]
        : prev?.frameworks?.filter(f => f !== framework)
    }));
  };

  const handleSectionToggle = (section, checked) => {
    setReportConfig(prev => ({
      ...prev,
      sections: checked 
        ? [...prev?.sections, section]
        : prev?.sections?.filter(s => s !== section)
    }));
  };

  const generateReport = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Simulate report generation progress
      const steps = [
        'Analyzing audit data...',
        'Generating compliance metrics...',
        'Creating visualizations...',
        'Compiling security analysis...',
        'Formatting report document...',
        'Finalizing report...'
      ];

      for (let i = 0; i < steps?.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setGenerationProgress(((i + 1) / steps?.length) * 100);
      }

      // Generate mock report data
      const reportData = {
        id: `report_${Date.now()}`,
        type: reportConfig?.reportType,
        period: reportConfig?.period,
        frameworks: reportConfig?.frameworks,
        generatedAt: new Date()?.toISOString(),
        summary: {
          totalEvents: auditData?.length,
          criticalEvents: auditData?.filter(log => log?.severity === 'critical')?.length,
          userSessions: new Set(auditData.map(log => log.sessionId))?.size,
          dataModifications: auditData?.filter(log => log?.action?.includes('data_'))?.length,
          complianceScore: 94.5
        },
        sections: reportConfig?.sections,
        confidentiality: reportConfig?.confidentialityLevel
      };

      // Create and trigger download
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compliance-report-${reportConfig?.period?.quarter}-${reportConfig?.period?.year}.pdf`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);

      if (onGenerateReport) {
        onGenerateReport(reportData);
      }

      setTimeout(() => {
        onClose();
        setIsGenerating(false);
        setGenerationProgress(0);
      }, 1000);

    } catch (error) {
      console.error('Report generation failed:', error);
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const getReportPreview = () => {
    const totalEvents = auditData?.length;
    const criticalEvents = auditData?.filter(log => log?.severity === 'critical')?.length;
    const estimatedPages = Math.max(5, Math.ceil(reportConfig?.sections?.length * 2.5));
    
    return {
      totalEvents,
      criticalEvents,
      estimatedPages,
      complianceScore: totalEvents > 0 ? Math.max(85, 100 - (criticalEvents / totalEvents * 100)) : 95
    };
  };

  const preview = getReportPreview();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg shadow-modal overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Generate Compliance Report</h2>
              <p className="text-sm text-muted-foreground">
                Create automated audit summaries for regulatory compliance
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-140px)]">
          {/* Configuration Panel */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* Report Type */}
            <div>
              <Select
                label="Report Type"
                description="Select the type of compliance report to generate"
                options={reportTypeOptions}
                value={reportConfig?.reportType}
                onChange={(value) => handleConfigChange('reportType', value)}
              />
            </div>

            {/* Period Selection */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Reporting Period</h3>
              {reportConfig?.reportType === 'quarterly' ? (
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Quarter"
                    options={quarterOptions}
                    value={reportConfig?.period?.quarter}
                    onChange={(value) => handlePeriodChange('quarter', value)}
                  />
                  <Select
                    label="Year"
                    options={yearOptions}
                    value={reportConfig?.period?.year}
                    onChange={(value) => handlePeriodChange('year', value)}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={reportConfig?.period?.startDate}
                    onChange={(e) => handlePeriodChange('startDate', e?.target?.value)}
                  />
                  <Input
                    label="End Date"
                    type="date"
                    value={reportConfig?.period?.endDate}
                    onChange={(e) => handlePeriodChange('endDate', e?.target?.value)}
                  />
                </div>
              )}
            </div>

            {/* Compliance Frameworks */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Compliance Frameworks</h3>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                {frameworkOptions?.map((framework) => (
                  <Checkbox
                    key={framework?.value}
                    label={framework?.label}
                    checked={reportConfig?.frameworks?.includes(framework?.value)}
                    onChange={(e) => handleFrameworkToggle(framework?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Report Sections */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Report Sections</h3>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                {sectionOptions?.map((section) => (
                  <Checkbox
                    key={section?.value}
                    label={section?.label}
                    checked={reportConfig?.sections?.includes(section?.value)}
                    onChange={(e) => handleSectionToggle(section?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Additional Options</h3>
              <div className="space-y-2">
                <Checkbox
                  label="Include charts and visualizations"
                  description="Add graphs and charts to illustrate audit trends"
                  checked={reportConfig?.includeCharts}
                  onChange={(e) => handleConfigChange('includeCharts', e?.target?.checked)}
                />
                <Checkbox
                  label="Include recommendations"
                  description="Add actionable recommendations based on audit findings"
                  checked={reportConfig?.includeRecommendations}
                  onChange={(e) => handleConfigChange('includeRecommendations', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Confidentiality Level */}
            <div>
              <Select
                label="Confidentiality Level"
                description="Set the security classification for this report"
                options={confidentialityOptions}
                value={reportConfig?.confidentialityLevel}
                onChange={(value) => handleConfigChange('confidentialityLevel', value)}
              />
            </div>

            {/* Generation Progress */}
            {isGenerating && (
              <div className="bg-primary/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Generating Report...</span>
                  <span className="text-sm text-muted-foreground">{Math.round(generationProgress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="w-80 border-l border-border bg-muted/20 p-6">
            <h3 className="font-medium text-foreground mb-4">Report Preview</h3>
            
            {/* Report Summary */}
            <div className="bg-card rounded-lg p-4 mb-4">
              <h4 className="font-medium text-foreground mb-3">Report Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium text-foreground capitalize">
                    {reportConfig?.reportType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Period:</span>
                  <span className="font-medium text-foreground">
                    {reportConfig?.period?.quarter} {reportConfig?.period?.year}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frameworks:</span>
                  <span className="font-medium text-foreground">
                    {reportConfig?.frameworks?.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sections:</span>
                  <span className="font-medium text-foreground">
                    {reportConfig?.sections?.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Est. Pages:</span>
                  <span className="font-medium text-foreground">
                    {preview?.estimatedPages}
                  </span>
                </div>
              </div>
            </div>

            {/* Audit Data Summary */}
            <div className="bg-card rounded-lg p-4 mb-4">
              <h4 className="font-medium text-foreground mb-3">Data Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Events:</span>
                  <span className="font-medium text-foreground">
                    {preview?.totalEvents?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Critical Events:</span>
                  <span className="font-medium text-error">
                    {preview?.criticalEvents}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Compliance Score:</span>
                  <span className="font-medium text-success">
                    {preview?.complianceScore?.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Frameworks */}
            <div className="bg-card rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Selected Frameworks</h4>
              <div className="space-y-2">
                {reportConfig?.frameworks?.map((framework) => {
                  const frameworkInfo = frameworkOptions?.find(f => f?.value === framework);
                  return (
                    <div key={framework} className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={14} className="text-success" />
                      <span className="text-sm text-foreground">
                        {frameworkInfo?.label || framework}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {reportConfig?.frameworks?.length === 0 && (
              <span className="text-warning">⚠ Select at least one compliance framework</span>
            )}
            {reportConfig?.sections?.length === 0 && (
              <span className="text-warning">⚠ Select at least one report section</span>
            )}
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button
              onClick={generateReport}
              disabled={isGenerating || reportConfig?.frameworks?.length === 0 || reportConfig?.sections?.length === 0}
              loading={isGenerating}
              iconName="FileText"
              iconPosition="left"
            >
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplianceReportGenerator;