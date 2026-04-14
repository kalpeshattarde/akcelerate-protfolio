import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import NotificationCenter from '../../components/ui/NotificationCenter';
import ProgressStatusIndicator from '../../components/ui/ProgressStatusIndicator';
import QuickActionLauncher from '../../components/ui/QuickActionLauncher';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import dashboard components
import KPIWidget from './components/KPIWidget';
import ESGTabNavigation from './components/ESGTabNavigation';
import CombinationChart from './components/CombinationChart';
import InstructionBanner from './components/InstructionBanner';
import DisclosurePackModal from './components/DisclosurePackModal';
import IntegrationStatusIndicator from './components/IntegrationStatusIndicator';
import QuickFilterDropdown from './components/QuickFilterDropdown';

const ESGAnalyticsDashboard = () => {
  const [userRole, setUserRole] = useState('esg-manager');
  const [activeTab, setActiveTab] = useState('environment');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProgressDetails, setShowProgressDetails] = useState(false);
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);
  const [dashboardFilters, setDashboardFilters] = useState({});
  const [kpiData, setKpiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'TCFD Report Due Soon',
      message: 'Climate disclosure report submission deadline in 5 days',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Data Sync Complete',
      message: 'Q4 emissions data successfully synchronized',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance window: Dec 15, 2:00 AM UTC',
      time: '3 hours ago',
      read: true
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Mock KPI data
      const mockKpiData = {
        energy: { value: 2847, unit: 'MWh', change: -5.2, trend: 'down' },
        emissions: { value: 1423, unit: 'tCO₂e', change: -8.1, trend: 'down' },
        water: { value: 15642, unit: 'kL', change: 2.3, trend: 'up' },
        waste: { value: 89.4, unit: '% recycled', change: 12.7, trend: 'up' }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setKpiData(mockKpiData);
      setIsLoading(false);
    };

    loadDashboardData();

  }, []);

  const handleKpiRefresh = async (metric) => {
    // Simulate data refresh for specific KPI
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setKpiData(prev => ({
      ...prev,
      [metric]: {
        ...prev?.[metric],
        value: prev?.[metric]?.value + Math.floor(Math.random() * 100) - 50,
        change: (Math.random() * 20) - 10
      }
    }));
  };

  const handleKpiDrillDown = (metric) => {
    console.log(`Drilling down into ${metric} details`);
    // Navigate to detailed view
  };

  const handleGenerateReport = () => {
    setShowDisclosureModal(true);
  };

  const handleDisclosureGenerate = (options) => {
    console.log('Generating disclosure pack with options:', options);
    // Simulate report generation
  };

  const handleExportData = (type, data) => {
    console.log(`Exporting ${type}:`, data);
    // Implement export functionality
  };

  const handleFilterChange = (filters) => {
    setDashboardFilters(filters);
    console.log('Dashboard filters updated:', filters);
    // Apply filters to dashboard data
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'environment':
        return (
          <div className="space-y-6">
            {/* Environmental KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPIWidget
                title="Energy Used"
                value={kpiData?.energy?.value}
                unit={kpiData?.energy?.unit}
                change={kpiData?.energy?.change}
                trend={kpiData?.energy?.trend}
                icon="Zap"
                color="primary"
                isLoading={isLoading}
                onRefresh={() => handleKpiRefresh('energy')}
                onDrillDown={() => handleKpiDrillDown('energy')}
              />
              <KPIWidget
                title="CO₂e Emissions"
                value={kpiData?.emissions?.value}
                unit={kpiData?.emissions?.unit}
                change={kpiData?.emissions?.change}
                trend={kpiData?.emissions?.trend}
                icon="CloudRain"
                color="success"
                isLoading={isLoading}
                onRefresh={() => handleKpiRefresh('emissions')}
                onDrillDown={() => handleKpiDrillDown('emissions')}
              />
              <KPIWidget
                title="Water Consumed"
                value={kpiData?.water?.value}
                unit={kpiData?.water?.unit}
                change={kpiData?.water?.change}
                trend={kpiData?.water?.trend}
                icon="Droplets"
                color="secondary"
                isLoading={isLoading}
                onRefresh={() => handleKpiRefresh('water')}
                onDrillDown={() => handleKpiDrillDown('water')}
              />
              <KPIWidget
                title="Waste Recycled"
                value={kpiData?.waste?.value}
                unit={kpiData?.waste?.unit}
                change={kpiData?.waste?.change}
                trend={kpiData?.waste?.trend}
                icon="Recycle"
                color="warning"
                isLoading={isLoading}
                onRefresh={() => handleKpiRefresh('waste')}
                onDrillDown={() => handleKpiDrillDown('waste')}
              />
            </div>
            {/* Combination Chart */}
            <CombinationChart
              isLoading={isLoading}
              onExport={handleExportData}
            />
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-secondary" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Social Metrics</h3>
              <p className="text-muted-foreground mb-4">
                Employee engagement, diversity, community impact, and stakeholder relations data
              </p>
              <Button variant="outline">
                <Icon name="Plus" size={16} className="mr-2" />
                Configure Social Metrics
              </Button>
            </div>
          </div>
        );

      case 'governance':
        return (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <Icon name="Shield" size={48} className="mx-auto mb-4 text-warning" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Governance Metrics</h3>
              <p className="text-muted-foreground mb-4">
                Ethics compliance, risk management, board composition, and transparency metrics
              </p>
              <Button variant="outline">
                <Icon name="Plus" size={16} className="mr-2" />
                Configure Governance Metrics
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>ESG Analytics Dashboard - ESG Dashboard Pro</title>
        <meta name="description" content="Comprehensive ESG analytics dashboard for sustainability reporting and compliance management" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header
          userRole={userRole}
          notifications={notifications}
          onDomainSwitch={(domain) => console.log('Domain switched to:', domain)}
        />

        {/* Sidebar */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          userRole={userRole}
          currentDomain="operations"
        />

        {/* Main Content */}
        <main className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } pt-16`}>
          <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">ESG Analytics Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Real-time sustainability metrics and compliance reporting
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <QuickFilterDropdown
                  onFilterChange={handleFilterChange}
                  currentFilters={dashboardFilters}
                />
                <Button variant="outline" onClick={() => setShowNotifications(true)}>
                  <Icon name="Bell" size={16} className="mr-2" />
                  Notifications
                </Button>
              </div>
            </div>

            {/* Instruction Banner */}
            <InstructionBanner
              userRole={userRole}
              onDismiss={() => console.log('Banner dismissed')}
            />

            {/* Progress Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ProgressStatusIndicator
                  showDetails={showProgressDetails}
                  onToggleDetails={() => setShowProgressDetails(!showProgressDetails)}
                />
              </div>
              <div>
                <IntegrationStatusIndicator />
              </div>
            </div>

            {/* ESG Tab Navigation */}
            <ESGTabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              userRole={userRole}
            />

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </main>

        {/* Notification Center */}
        <NotificationCenter
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          userRole={userRole}
        />

        {/* Quick Action Launcher */}
        <QuickActionLauncher
          userRole={userRole}
          currentPage="esg-analytics-dashboard"
        />

        {/* Disclosure Pack Modal */}
        <DisclosurePackModal
          isOpen={showDisclosureModal}
          onClose={() => setShowDisclosureModal(false)}
          onGenerate={handleDisclosureGenerate}
        />
      </div>
    </>
  );
};

export default ESGAnalyticsDashboard;