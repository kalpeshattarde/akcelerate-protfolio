import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import NotificationCenter from '../../components/ui/NotificationCenter';
import ProgressStatusIndicator from '../../components/ui/ProgressStatusIndicator';
import QuickActionLauncher from '../../components/ui/QuickActionLauncher';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import page-specific components
import ReportGenerationPanel from './components/ReportGenerationPanel';
import FrameworkSidebar from './components/FrameworkSidebar';
import CompletionStatusIndicator from './components/CompletionStatusIndicator';
import BulkOperationsToolbar from './components/BulkOperationsToolbar';
import DownloadManager from './components/DownloadManager';

const ComplianceReportingCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [frameworkSidebarCollapsed, setFrameworkSidebarCollapsed] = useState(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState(['gri']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProgressDetails, setShowProgressDetails] = useState(false);
  const [showDownloadManager, setShowDownloadManager] = useState(false);
  const [currentDomain, setCurrentDomain] = useState('operations');
  const [userRole] = useState('esg-manager');

  // Mock notifications
  const [notifications] = useState([
  {
    id: 1,
    type: 'warning',
    title: 'SASB Report Due Soon',
    message: 'SASB annual report submission due in 8 days. Current progress: 85%',
    time: '2 hours ago',
    read: false,
    category: 'compliance',
    priority: 'high'
  },
  {
    id: 2,
    type: 'success',
    title: 'GRI Data Validation Complete',
    message: 'All GRI standard data points have been validated successfully.',
    time: '4 hours ago',
    read: false,
    category: 'data',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'info',
    title: 'TCFD Template Updated',
    message: 'New TCFD reporting template available with enhanced climate metrics.',
    time: '1 day ago',
    read: true,
    category: 'reporting',
    priority: 'low'
  }]
  );

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case '1':
            e?.preventDefault();
            handleFrameworkToggle('gri', !selectedFrameworks?.includes('gri'));
            break;
          case '2':
            e?.preventDefault();
            handleFrameworkToggle('sasb', !selectedFrameworks?.includes('sasb'));
            break;
          case '3':
            e?.preventDefault();
            handleFrameworkToggle('tcfd', !selectedFrameworks?.includes('tcfd'));
            break;
          case 'g':
            e?.preventDefault();
            if (selectedFrameworks?.length > 0) {
              handleGenerateReport();
            }
            break;
          case 'd':
            e?.preventDefault();
            setShowDownloadManager(true);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFrameworks]);

  const handleFrameworkToggle = (frameworkId, isSelected) => {
    setSelectedFrameworks((prev) => {
      if (isSelected) {
        return [...prev, frameworkId];
      } else {
        return prev?.filter((id) => id !== frameworkId);
      }
    });
  };

  const handleFrameworkSelect = (frameworkId) => {
    handleFrameworkToggle(frameworkId, !selectedFrameworks?.includes(frameworkId));
  };

  const handleGenerateReport = async () => {
    if (selectedFrameworks?.length === 0) return;

    setIsGenerating(true);

    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Show download manager after generation
      setShowDownloadManager(true);
    } catch (error) {
      console.error('Report generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBulkGenerate = () => {
    handleGenerateReport();
  };

  const handleCustomizeTemplate = () => {
    console.log('Opening template customization...');
  };

  const handleManageDistribution = () => {
    console.log('Opening distribution management...');
  };

  const handleDomainSwitch = (domain) => {
    setCurrentDomain(domain);
  };

  return (
    <>
      <Helmet>
        <title>Compliance Reporting Center - ESG Dashboard Pro</title>
        <meta name="description" content="Centralized disclosure pack generation and regulatory framework management interface for quarterly ESG reporting workflows." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header
          userRole={userRole}
          onDomainSwitch={handleDomainSwitch}
          notifications={notifications} />


        {/* Sidebar */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          userRole={userRole}
          currentDomain={currentDomain} />


        {/* Main Content - Fixed Grid System */}
        <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16`
        }>
          {/* Unified Container with Consistent Spacing */}
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            {/* Page Header - Standardized */}
            <div className="mb-8">
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-12 lg:col-span-8">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Compliance Reporting Center</h1>
                  <p className="text-muted-foreground">
                    Generate and manage ESG compliance reports across multiple frameworks
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-4 flex items-center justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowNotifications(!showNotifications)}>

                    <Icon name="Bell" size={16} className="mr-2" />
                    Notifications
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDownloadManager(true)}>

                    <Icon name="Download" size={16} className="mr-2" />
                    Downloads
                  </Button>
                </div>
              </div>
            </div>

            {/* Top Status Bar - Updated Grid without DeadlineCountdown */}
            <div className="grid grid-cols-12 gap-6 mb-8">
              <div className="col-span-12 lg:col-span-6">
                <ProgressStatusIndicator
                  isCompact
                  onToggleDetails={() => setShowProgressDetails(!showProgressDetails)} />

              </div>
              <div className="col-span-12 lg:col-span-6">
                <div className="bg-card border border-border rounded-lg p-6 h-full items-center hidden">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="text-2xl font-bold text-foreground mb-1">Q4 2024</div>
                      <div className="text-sm text-muted-foreground">Reporting Period</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground mb-1">3 Reports Due</div>
                      <div className="text-xs text-warning">8 days remaining</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bulk Operations Toolbar - Standardized */}
            <div className="grid grid-cols-12 gap-6 mb-8">
              <div className="col-span-12">
                <BulkOperationsToolbar
                  selectedFrameworks={selectedFrameworks}
                  onFrameworkToggle={handleFrameworkToggle}
                  onBulkGenerate={handleBulkGenerate}
                  onCustomizeTemplate={handleCustomizeTemplate}
                  onManageDistribution={handleManageDistribution}
                  isGenerating={isGenerating} />

              </div>
            </div>

            {/* Main Workspace - Responsive Grid */}
            <div className="grid grid-cols-12 gap-6 mb-8">
              {/* Left Column - Report Generation & Status */}
              <div className="col-span-12 xl:col-span-8">
                <div className="space-y-6">
                  {/* Report Generation Panel */}
                  <ReportGenerationPanel
                    selectedFrameworks={selectedFrameworks}
                    onFrameworkToggle={handleFrameworkToggle}
                    onGenerateReport={handleGenerateReport}
                    isGenerating={isGenerating} />


                  {/* Progress Details - Conditional Grid */}
                  {showProgressDetails &&
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <CompletionStatusIndicator framework="gri" />
                      <CompletionStatusIndicator framework="sasb" />
                    </div>
                  }
                </div>
              </div>

              {/* Right Column - Framework Details Only */}
              <div className="col-span-12 xl:col-span-4">
                <div className="space-y-6">
                  {/* Framework Sidebar */}
                  <FrameworkSidebar
                    selectedFrameworks={selectedFrameworks}
                    onFrameworkSelect={handleFrameworkSelect}
                    isCollapsed={frameworkSidebarCollapsed}
                    onToggleCollapse={() => setFrameworkSidebarCollapsed(!frameworkSidebarCollapsed)} />

                </div>
              </div>
            </div>

            {/* Additional Status Cards - Unified Grid */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <div className="bg-card border border-border rounded-lg p-6 h-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="CheckCircle" size={24} className="text-success" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-2xl font-bold text-foreground mb-1">12</div>
                      <div className="text-sm text-muted-foreground">Reports Generated</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <div className="bg-card border border-border rounded-lg p-6 h-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={24} className="text-warning" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-2xl font-bold text-foreground mb-1">3</div>
                      <div className="text-sm text-muted-foreground">Pending Reviews</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <div className="bg-card border border-border rounded-lg p-6 h-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Users" size={24} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-2xl font-bold text-foreground mb-1">8</div>
                      <div className="text-sm text-muted-foreground">Stakeholders</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <div className="bg-card border border-border rounded-lg p-6 h-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="TrendingUp" size={24} className="text-secondary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-2xl font-bold text-foreground mb-1">95%</div>
                      <div className="text-sm text-muted-foreground">Data Quality</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Notification Center */}
        <NotificationCenter
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          userRole={userRole} />


        {/* Download Manager Modal */}
        <DownloadManager
          isVisible={showDownloadManager}
          onClose={() => setShowDownloadManager(false)} />


        {/* Quick Action Launcher */}
        <QuickActionLauncher
          userRole={userRole}
          currentPage="compliance-reporting-center" />

      </div>
    </>);

};

export default ComplianceReportingCenter;