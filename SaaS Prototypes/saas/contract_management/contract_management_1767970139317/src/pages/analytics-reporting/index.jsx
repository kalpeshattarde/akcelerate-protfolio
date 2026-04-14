import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import DashboardGrid from './components/DashboardGrid';
import ReportBuilder from './components/ReportBuilder';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import ScheduledReports from './components/ScheduledReports';
import InteractiveFilters from './components/InteractiveFilters';
import ExportCapabilities from './components/ExportCapabilities';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AnalyticsReporting = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardWidgets, setDashboardWidgets] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const [savedViews, setSavedViews] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'reports', label: 'Report Builder', icon: 'BarChart3' },
    { id: 'predictive', label: 'Predictive Analytics', icon: 'TrendingUp' },
    { id: 'scheduled', label: 'Scheduled Reports', icon: 'Calendar' },
    { id: 'export', label: 'Export Data', icon: 'Download' }
  ];

  useEffect(() => {
    // Initialize dashboard widgets
    setDashboardWidgets([
      {
        id: 1,
        title: 'Total Contracts',
        type: 'metric',
        size: 'small',
        icon: 'FileText',
        data: {
          value: '1,247',
          label: 'Active Contracts',
          trend: 8.5
        }
      },
      {
        id: 2,
        title: 'Contract Value',
        type: 'metric',
        size: 'small',
        icon: 'DollarSign',
        data: {
          value: '$12.4M',
          label: 'Total Portfolio Value',
          trend: 12.3
        }
      },
      {
        id: 3,
        title: 'Compliance Score',
        type: 'metric',
        size: 'small',
        icon: 'Shield',
        data: {
          value: '94.2%',
          label: 'Overall Compliance',
          trend: 2.1
        }
      },
      {
        id: 4,
        title: 'Renewal Rate',
        type: 'metric',
        size: 'small',
        icon: 'RefreshCw',
        data: {
          value: '87.5%',
          label: 'Contract Renewals',
          trend: -1.2
        }
      },
      {
        id: 5,
        title: 'Contract Performance',
        type: 'chart',
        size: 'large',
        icon: 'TrendingUp',
        data: {
          chartType: 'line',
          chartData: [
            { month: 'Jan', performance: 85, compliance: 92, renewals: 78 },
            { month: 'Feb', performance: 87, compliance: 89, renewals: 82 },
            { month: 'Mar', performance: 89, compliance: 91, renewals: 85 },
            { month: 'Apr', performance: 92, compliance: 94, renewals: 88 },
            { month: 'May', performance: 90, compliance: 96, renewals: 90 },
            { month: 'Jun', performance: 94, compliance: 93, renewals: 87 },
            { month: 'Jul', performance: 96, compliance: 95, renewals: 92 },
            { month: 'Aug', performance: 93, compliance: 97, renewals: 89 }
          ],
          metrics: {
            totalScore: 94.2,
            improvement: 8.5,
            bestMonth: 'July',
            trend: 'positive'
          }
        }
      },
      {
        id: 6,
        title: 'Top Vendors',
        type: 'list',
        size: 'medium',
        icon: 'Building2',
        data: {
          items: [
            { name: 'Microsoft Corporation', value: '$2.4M' },
            { name: 'Oracle Corporation', value: '$1.8M' },
            { name: 'Salesforce Inc.', value: '$1.2M' },
            { name: 'Amazon Web Services', value: '$980K' },
            { name: 'Google LLC', value: '$750K' }
          ]
        }
      },
      {
        id: 7,
        title: 'Department Spend',
        type: 'progress',
        size: 'medium',
        icon: 'PieChart',
        data: {
          metrics: [
            { label: 'IT', value: 45 },
            { label: 'Operations', value: 28 },
            { label: 'Marketing', value: 15 },
            { label: 'HR', value: 12 }
          ]
        }
      },
      {
        id: 8,
        title: 'Risk Assessment',
        type: 'metric',
        size: 'small',
        icon: 'AlertTriangle',
        data: {
          value: '23',
          label: 'High Risk Contracts',
          trend: -15.4
        }
      }
    ]);

    // Initialize saved views
    setSavedViews([
      {
        id: 1,
        name: 'Executive Summary',
        filters: { dateRange: '90d', contractTypes: ['service', 'software'] },
        createdAt: '2024-08-15T10:00:00Z'
      },
      {
        id: 2,
        name: 'IT Contracts',
        filters: { departments: ['it'], statuses: ['active'] },
        createdAt: '2024-08-20T14:30:00Z'
      }
    ]);

    // Initialize analytics data
    setAnalyticsData({
      totalContracts: 1247,
      totalValue: 12400000,
      averageValue: 9943,
      complianceScore: 94.2,
      renewalRate: 87.5
    });
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleWidgetUpdate = (updatedWidgets) => {
    setDashboardWidgets(updatedWidgets);
  };

  const handleWidgetRemove = (widgetId) => {
    setDashboardWidgets(widgets => widgets?.filter(w => w?.id !== widgetId));
  };

  const handleAddWidget = () => {
    const newWidget = {
      id: Date.now(),
      title: 'New Widget',
      type: 'metric',
      size: 'small',
      icon: 'BarChart3',
      data: {
        value: '0',
        label: 'New Metric',
        trend: 0
      }
    };
    setDashboardWidgets([...dashboardWidgets, newWidget]);
  };

  const handleFiltersChange = (filters) => {
    setCurrentFilters(filters);
    // Apply filters to analytics data
    console.log('Filters applied:', filters);
  };

  const handleSaveView = (view) => {
    setSavedViews([...savedViews, view]);
  };

  const handleLoadView = (view) => {
    setCurrentFilters(view?.filters);
  };

  const handleSaveReport = (reportConfig) => {
    console.log('Saving report:', reportConfig);
    // Implement report saving logic
  };

  const handlePreviewReport = (reportConfig) => {
    console.log('Previewing report:', reportConfig);
    // Implement report preview logic
  };

  const handleExport = (exportConfig) => {
    console.log('Exporting data:', exportConfig);
    // Implement export logic
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <InteractiveFilters
              onFiltersChange={handleFiltersChange}
              savedViews={savedViews}
              onSaveView={handleSaveView}
              onLoadView={handleLoadView}
            />
            <DashboardGrid
              widgets={dashboardWidgets}
              onWidgetUpdate={handleWidgetUpdate}
              onWidgetRemove={handleWidgetRemove}
              onAddWidget={handleAddWidget}
            />
          </div>
        );
      case 'reports':
        return (
          <ReportBuilder
            onSaveReport={handleSaveReport}
            onPreviewReport={handlePreviewReport}
          />
        );
      case 'predictive':
        return <PredictiveAnalytics />;
      case 'scheduled':
        return <ScheduledReports />;
      case 'export':
        return (
          <ExportCapabilities
            data={analyticsData}
            filters={currentFilters}
            onExport={handleExport}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Analytics & Reporting - ContractFlow Pro</title>
        <meta name="description" content="Advanced analytics and reporting with interactive dashboards, custom reports, and predictive insights." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-text-primary">Analytics & Reporting</h1>
                  <p className="text-muted-foreground">
                    Comprehensive business intelligence and data visualization platform
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Refresh Data
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Settings"
                    iconPosition="left"
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-border">
                <nav className="flex space-x-8">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab?.id
                          ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-text-primary hover:border-border'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AnalyticsReporting;