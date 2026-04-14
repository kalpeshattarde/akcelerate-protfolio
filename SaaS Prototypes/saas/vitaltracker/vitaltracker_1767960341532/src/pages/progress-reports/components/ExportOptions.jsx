import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = () => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [selectedSections, setSelectedSections] = useState([
    'summary', 'charts', 'achievements', 'insights'
  ]);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { value: 'csv', label: 'CSV Data', icon: 'Table' },
    { value: 'json', label: 'JSON Export', icon: 'Code' },
    { value: 'image', label: 'Image Summary', icon: 'Image' }
  ];

  const sectionOptions = [
    { id: 'summary', label: 'Executive Summary', description: 'Key metrics and overview' },
    { id: 'charts', label: 'Charts & Graphs', description: 'Visual data representations' },
    { id: 'achievements', label: 'Achievement Timeline', description: 'Badges and milestones' },
    { id: 'insights', label: 'Wellness Insights', description: 'AI-generated recommendations' },
    { id: 'comparison', label: 'Comparative Analysis', description: 'Period-over-period comparisons' },
    { id: 'rawdata', label: 'Raw Data', description: 'Detailed metric values' }
  ];

  const handleSectionToggle = (sectionId, checked) => {
    setSelectedSections(prev => 
      checked 
        ? [...prev, sectionId]
        : prev?.filter(id => id !== sectionId)
    );
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Exporting report:', {
        format: exportFormat,
        sections: selectedSections,
        timestamp: new Date()?.toISOString()
      });
      
      // In a real app, this would trigger the actual export
      alert(`Report exported successfully as ${exportFormat?.toUpperCase()}!`);
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatDescription = () => {
    const descriptions = {
      pdf: 'Professional report with charts and formatting, perfect for sharing or printing.',
      csv: 'Raw data in spreadsheet format, ideal for further analysis in Excel or Google Sheets.',
      json: 'Structured data format for developers and advanced users.',
      image: 'Visual summary as a shareable image for social media or presentations.'
    };
    return descriptions?.[exportFormat] || '';
  };

  const estimateFileSize = () => {
    const baseSizes = {
      pdf: 2.5,
      csv: 0.3,
      json: 0.5,
      image: 1.2
    };
    
    const sectionMultiplier = selectedSections?.length * 0.3;
    const estimatedSize = (baseSizes?.[exportFormat] + sectionMultiplier)?.toFixed(1);
    
    return `~${estimatedSize} MB`;
  };

  return (
    <div className="bg-card rounded-xl p-6 elevation-2 border border-border/40">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
          <Icon name="Download" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Export Options</h3>
          <p className="text-sm text-muted-foreground">Download your wellness report in various formats</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Export Format</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {formatOptions?.map((format) => (
              <button
                key={format?.value}
                onClick={() => setExportFormat(format?.value)}
                className={`
                  flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 touch-target
                  ${exportFormat === format?.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border/40 hover:border-border text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={format?.icon} size={20} />
                <span className="font-medium">{format?.label}</span>
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">{getFormatDescription()}</p>
        </div>

        {/* Section Selection */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Include Sections</h4>
          <div className="space-y-3">
            {sectionOptions?.map((section) => (
              <div key={section?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <Checkbox
                  checked={selectedSections?.includes(section?.id)}
                  onChange={(e) => handleSectionToggle(section?.id, e?.target?.checked)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground cursor-pointer">
                    {section?.label}
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">{section?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Summary */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-foreground">Export Summary</h4>
            <span className="text-sm text-muted-foreground">{estimateFileSize()}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Format:</span>
              <span className="ml-2 font-medium text-foreground">{exportFormat?.toUpperCase()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Sections:</span>
              <span className="ml-2 font-medium text-foreground">{selectedSections?.length} selected</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border/20">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Calendar" size={12} />
              <span>Data period: Oct 1-11, 2024</span>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={handleExport}
            loading={isExporting}
            disabled={selectedSections?.length === 0}
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            {isExporting ? 'Generating Report...' : 'Export Report'}
          </Button>
          
          <Button
            variant="outline"
            iconName="Eye"
            iconPosition="left"
          >
            Preview
          </Button>
          
          <Button
            variant="ghost"
            iconName="Mail"
            iconPosition="left"
          >
            Email Report
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border/40">
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setExportFormat('pdf');
                setSelectedSections(['summary', 'charts', 'achievements']);
              }}
              iconName="Zap"
              iconPosition="left"
            >
              Quick PDF
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setExportFormat('csv');
                setSelectedSections(['rawdata']);
              }}
              iconName="Table"
              iconPosition="left"
            >
              Data Only
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setExportFormat('image');
                setSelectedSections(['summary', 'achievements']);
              }}
              iconName="Share2"
              iconPosition="left"
            >
              Social Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;