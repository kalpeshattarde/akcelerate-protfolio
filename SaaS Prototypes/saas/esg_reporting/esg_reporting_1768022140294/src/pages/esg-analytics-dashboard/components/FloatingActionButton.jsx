import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActionButton = ({ onGenerateReport, userRole = 'esg-manager' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const quickActions = [
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: 'FileText',
      description: 'Create disclosure pack',
      color: 'bg-primary text-primary-foreground',
      action: () => handleGenerateReport()
    },
    {
      id: 'export-data',
      label: 'Export Data',
      icon: 'Download',
      description: 'Download current view',
      color: 'bg-success text-success-foreground',
      action: () => handleExportData()
    },
    {
      id: 'schedule-report',
      label: 'Schedule Report',
      icon: 'Calendar',
      description: 'Set automated reporting',
      color: 'bg-secondary text-secondary-foreground',
      action: () => handleScheduleReport()
    }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setIsExpanded(false);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (onGenerateReport) {
        onGenerateReport();
      }
    } catch (error) {
      console.error('Report generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportData = () => {
    // Simulate data export
    const data = {
      timestamp: new Date()?.toISOString(),
      metrics: ['energy', 'emissions', 'water', 'waste'],
      format: 'xlsx'
    };
    
    console.log('Exporting data:', data);
    setIsExpanded(false);
  };

  const handleScheduleReport = () => {
    // Open scheduling modal
    console.log('Opening schedule modal');
    setIsExpanded(false);
  };

  const handleMainAction = () => {
    if (isGenerating) return;
    
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Actions Menu */}
      {isExpanded && (
        <div className="mb-4 space-y-2">
          {quickActions?.map((action, index) => (
            <div
              key={action?.id}
              className="flex items-center justify-end space-x-3 animate-in slide-in-from-right duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Action Label */}
              <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-modal">
                <div className="text-sm font-medium text-foreground">{action?.label}</div>
                <div className="text-xs text-muted-foreground">{action?.description}</div>
              </div>
              
              {/* Action Button */}
              <button
                onClick={action?.action}
                className={`w-12 h-12 rounded-full shadow-floating hover:shadow-lg transition-all duration-300 hover:scale-110 ${action?.color}`}
              >
                <Icon name={action?.icon} size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Main FAB */}
      <div className="relative">
        <Button
          onClick={handleMainAction}
          disabled={isGenerating}
          className={`w-16 h-16 rounded-full shadow-floating hover:shadow-lg transition-all duration-300 ${
            isExpanded ? 'rotate-45 scale-110' : 'hover:scale-110'
          } ${isGenerating ? 'animate-pulse' : ''}`}
          size="icon"
        >
          {isGenerating ? (
            <Icon name="Loader2" size={24} className="animate-spin" />
          ) : (
            <Icon name={isExpanded ? "X" : "Zap"} size={24} />
          )}
        </Button>

        {/* Progress Ring for Generation */}
        {isGenerating && (
          <div className="absolute inset-0 rounded-full">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary/20"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="175.929"
                strokeDashoffset="175.929"
                className="text-primary animate-spin"
                style={{
                  animation: 'progress 2s linear forwards'
                }}
              />
            </svg>
          </div>
        )}

        {/* Tooltip */}
        {!isExpanded && !isGenerating && (
          <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded px-2 py-1 text-xs text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
            Quick Actions
          </div>
        )}
      </div>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-background/20 backdrop-blur-sm -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
      {/* Generation Status */}
      {isGenerating && (
        <div className="fixed bottom-24 right-6 bg-popover border border-border rounded-lg px-4 py-3 shadow-modal">
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={20} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Generating Report</div>
              <div className="text-xs text-muted-foreground">Creating disclosure pack...</div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes progress {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingActionButton;