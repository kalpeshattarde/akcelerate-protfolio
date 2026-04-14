import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ExportShareControls = () => {
  const location = useLocation();
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const getContextualExportOptions = () => {
    const basePath = location.pathname;
    
    switch (basePath) {
      case '/executive-revenue-overview-dashboard':
        return {
          title: 'Executive Overview',
          formats: [
            { type: 'pdf', label: 'Executive Summary (PDF)', icon: 'FileText' },
            { type: 'pptx', label: 'Board Presentation (PPTX)', icon: 'Presentation' },
            { type: 'csv', label: 'KPI Data (CSV)', icon: 'Database' }
          ]
        };
      case '/sales-performance-analytics-dashboard':
        return {
          title: 'Performance Analytics',
          formats: [
            { type: 'pdf', label: 'Performance Report (PDF)', icon: 'FileText' },
            { type: 'xlsx', label: 'Detailed Analytics (Excel)', icon: 'FileSpreadsheet' },
            { type: 'csv', label: 'Raw Performance Data (CSV)', icon: 'Database' }
          ]
        };
      case '/real-time-pipeline-monitoring-dashboard':
        return {
          title: 'Pipeline Monitoring',
          formats: [
            { type: 'pdf', label: 'Pipeline Snapshot (PDF)', icon: 'FileText' },
            { type: 'csv', label: 'Pipeline Data (CSV)', icon: 'Database' },
            { type: 'json', label: 'Real-time Feed (JSON)', icon: 'Code' }
          ]
        };
      case '/revenue-forecasting-trends-dashboard':
        return {
          title: 'Revenue Forecasting',
          formats: [
            { type: 'pdf', label: 'Forecast Report (PDF)', icon: 'FileText' },
            { type: 'xlsx', label: 'Forecast Model (Excel)', icon: 'FileSpreadsheet' },
            { type: 'csv', label: 'Trend Data (CSV)', icon: 'Database' }
          ]
        };
      default:
        return {
          title: 'Dashboard Export',
          formats: [
            { type: 'pdf', label: 'Report (PDF)', icon: 'FileText' },
            { type: 'csv', label: 'Data (CSV)', icon: 'Database' }
          ]
        };
    }
  };

  const exportOptions = getContextualExportOptions();

  const handleExport = async (format) => {
    setIsExporting(true);
    setIsExportMenuOpen(false);
    
    // Simulate export process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would trigger the actual export
      console.log(`Exporting ${exportOptions.title} as ${format.type.toUpperCase()}`);
      
      // Show success notification (you might want to use a toast library)
      alert(`${format.label} exported successfully!`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = (method) => {
    setIsShareMenuOpen(false);
    
    switch (method) {
      case 'link':
        navigator.clipboard.writeText(window.location.href);
        alert('Dashboard link copied to clipboard!');
        break;
      case 'email':
        const subject = encodeURIComponent(`Revenue Command - ${exportOptions.title}`);
        const body = encodeURIComponent(`Please review the ${exportOptions.title} dashboard: ${window.location.href}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
        break;
      case 'slack':
        // In a real implementation, this would integrate with Slack API
        alert('Slack integration would be implemented here');
        break;
      case 'teams':
        // In a real implementation, this would integrate with Microsoft Teams
        alert('Microsoft Teams integration would be implemented here');
        break;
      default:
        break;
    }
  };

  const shareOptions = [
    { method: 'link', label: 'Copy Link', icon: 'Link' },
    { method: 'email', label: 'Email', icon: 'Mail' },
    { method: 'slack', label: 'Share to Slack', icon: 'MessageSquare' },
    { method: 'teams', label: 'Share to Teams', icon: 'Users' }
  ];

  return (
    <div className="flex items-center space-x-2">
      {/* Export Menu */}
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
          disabled={isExporting}
          iconName={isExporting ? "Loader2" : "Download"}
          iconSize={16}
          className={isExporting ? "animate-spin" : ""}
        >
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>

        {isExportMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal z-200">
            <div className="p-3 border-b border-border">
              <h4 className="font-medium text-sm text-text-primary">Export {exportOptions.title}</h4>
              <p className="text-xs text-text-secondary mt-1">Choose your preferred format</p>
            </div>
            <div className="py-2">
              {exportOptions.formats.map((format) => (
                <button
                  key={format.type}
                  onClick={() => handleExport(format)}
                  className="flex items-center w-full px-4 py-3 text-sm text-text-secondary hover:text-primary hover:bg-muted transition-colors"
                >
                  <Icon name={format.icon} size={16} className="mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{format.label}</div>
                    <div className="text-xs text-text-secondary uppercase">{format.type}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-3 border-t border-border bg-muted/30">
              <p className="text-xs text-text-secondary">
                Exports include current filter settings and date range
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Share Menu */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
          iconName="Share2"
          iconSize={16}
        >
          Share
        </Button>

        {isShareMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-200">
            <div className="p-3 border-b border-border">
              <h4 className="font-medium text-sm text-text-primary">Share Dashboard</h4>
            </div>
            <div className="py-2">
              {shareOptions.map((option) => (
                <button
                  key={option.method}
                  onClick={() => handleShare(option.method)}
                  className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted transition-colors"
                >
                  <Icon name={option.icon} size={16} className="mr-3" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside handlers */}
      {(isExportMenuOpen || isShareMenuOpen) && (
        <div 
          className="fixed inset-0 z-100" 
          onClick={() => {
            setIsExportMenuOpen(false);
            setIsShareMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ExportShareControls;