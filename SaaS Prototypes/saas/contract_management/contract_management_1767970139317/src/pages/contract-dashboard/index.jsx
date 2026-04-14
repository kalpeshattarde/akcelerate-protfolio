import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import PriorityAlert from './components/PriorityAlert';
import ContractPipeline from './components/ContractPipeline';
import ActivityStream from './components/ActivityStream';
import QuickFilters from './components/QuickFilters';
import IntegrationStatus from './components/IntegrationStatus';
import DashboardWidget from './components/DashboardWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SpendAnalyticsWidget from './components/SpendAnalyticsWidget';
import VendorPerformanceWidget from './components/VendorPerformanceWidget';

const ContractDashboard = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const navigate = useNavigate();

  // Mock data for KPI cards
  const kpiData = [
    {
      id: 'active-contracts',
      title: 'Active Contracts',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'FileText'
    },
    {
      id: 'pending-approvals',
      title: 'Pending Approvals',
      value: '23',
      change: '-8.2%',
      changeType: 'negative',
      icon: 'Clock'
    },
    {
      id: 'expiring-soon',
      title: 'Expiring (30 days)',
      value: '15',
      change: '+3.1%',
      changeType: 'positive',
      icon: 'Calendar'
    },
    {
      id: 'total-value',
      title: 'Total Contract Value',
      value: '$24.8M',
      change: '+18.7%',
      changeType: 'positive',
      icon: 'DollarSign'
    }
  ];

  // Mock data for priority alerts
  const priorityAlerts = [
    {
      id: 1,
      title: 'Contract Expiring Tomorrow',
      description: 'Microsoft Enterprise Agreement expires on Jan 5, 2025',
      priority: 'critical',
      type: 'expiring',
      contractId: 'CNT-2024-001',
      createdAt: new Date(Date.now() - 3600000),
      dueDate: new Date(Date.now() + 86400000)
    },
    {
      id: 2,
      title: 'Approval Required',
      description: 'AWS Cloud Services contract pending legal review',
      priority: 'high',
      type: 'approval',
      contractId: 'CNT-2024-156',
      createdAt: new Date(Date.now() - 7200000)
    },
    {
      id: 3,
      title: 'Compliance Check Failed',
      description: 'Vendor certification expired for Acme Corp',
      priority: 'high',
      type: 'compliance',
      contractId: 'CNT-2024-089',
      createdAt: new Date(Date.now() - 10800000)
    },
    {
      id: 4,
      title: 'Payment Overdue',
      description: 'Invoice #INV-2024-234 is 15 days overdue',
      priority: 'medium',
      type: 'payment',
      contractId: 'CNT-2024-067',
      createdAt: new Date(Date.now() - 14400000)
    }
  ];

  // Mock data for contract pipeline
  const pipelineData = [
    { stage: 'Draft', count: 45 },
    { stage: 'Review', count: 23 },
    { stage: 'Approval', count: 12 },
    { stage: 'Negotiation', count: 8 },
    { stage: 'Execution', count: 15 },
    { stage: 'Active', count: 1247 }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      title: 'Contract Signed',
      description: 'Oracle Database License Agreement has been fully executed',
      type: 'signed',
      contractId: 'CNT-2024-178',
      user: 'Sarah Johnson',
      department: 'IT',
      timestamp: new Date(Date.now() - 1800000),
      metadata: { value: '$125,000', duration: '3 years' }
    },
    {
      id: 2,
      title: 'Contract Updated',
      description: 'Payment terms modified for Salesforce Enterprise contract',
      type: 'updated',
      contractId: 'CNT-2024-145',
      user: 'Michael Chen',
      department: 'Finance',
      timestamp: new Date(Date.now() - 3600000),
      metadata: { section: 'Payment Terms' }
    },
    {
      id: 3,
      title: 'Approval Granted',
      description: 'Legal team approved the amended consulting agreement',
      type: 'approved',
      contractId: 'CNT-2024-167',
      user: 'Emily Rodriguez',
      department: 'Legal',
      timestamp: new Date(Date.now() - 5400000)
    },
    {
      id: 4,
      title: 'Contract Created',
      description: 'New vendor agreement initiated for office supplies',
      type: 'created',
      contractId: 'CNT-2024-189',
      user: 'David Park',
      department: 'Procurement',
      timestamp: new Date(Date.now() - 7200000),
      metadata: { vendor: 'Office Depot', category: 'Supplies' }
    },
    {
      id: 5,
      title: 'Contract Renewed',
      description: 'Security services contract automatically renewed',
      type: 'renewed',
      contractId: 'CNT-2024-023',
      user: 'System',
      department: 'Security',
      timestamp: new Date(Date.now() - 9000000),
      metadata: { duration: '1 year', value: '$45,000' }
    }
  ];

  // Mock data for system integrations
  const integrationData = [
    {
      id: 'erp-sap',
      name: 'SAP ERP',
      icon: 'Database',
      status: 'connected',
      lastSync: new Date(Date.now() - 120000)
    },
    {
      id: 'crm-salesforce',
      name: 'Salesforce CRM',
      icon: 'Users',
      status: 'connected',
      lastSync: new Date(Date.now() - 300000)
    },
    {
      id: 'finance-oracle',
      name: 'Oracle Financials',
      icon: 'DollarSign',
      status: 'warning',
      lastSync: new Date(Date.now() - 1800000)
    },
    {
      id: 'docusign',
      name: 'DocuSign',
      icon: 'PenTool',
      status: 'connected',
      lastSync: new Date(Date.now() - 60000)
    }
  ];

  // Available dashboard widgets
  const availableWidgets = [
    {
      id: 'spend-analytics',
      title: 'Spend Analytics',
      subtitle: 'Contract spending trends',
      icon: 'TrendingUp',
      lastUpdated: new Date(),
      autoRefresh: true
    },
    {
      id: 'vendor-performance',
      title: 'Vendor Performance',
      subtitle: 'Top performing vendors',
      icon: 'Award',
      lastUpdated: new Date(),
      autoRefresh: false
    },
    {
      id: 'compliance-matrix',
      title: 'Compliance Status',
      subtitle: 'Regulatory compliance overview',
      icon: 'Shield',
      lastUpdated: new Date(),
      autoRefresh: true
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment',
      subtitle: 'Contract risk analysis',
      icon: 'AlertTriangle',
      lastUpdated: new Date(),
      autoRefresh: false
    }
  ];

  const [activeWidgets, setActiveWidgets] = useState(availableWidgets?.slice(0, 2));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event?.key === 'd' && !event?.ctrlKey && !event?.metaKey) {
        // Focus on dashboard
        document.title = 'Contract Dashboard - ContractFlow Pro';
      } else if (event?.key === 'f' && !event?.ctrlKey && !event?.metaKey) {
        // Toggle filters
        setActiveFilters(prev => prev?.length > 0 ? [] : ['my-contracts']);
      } else if (event?.key === 'n' && !event?.ctrlKey && !event?.metaKey) {
        // Focus on notifications (handled by header)
        console.log('Notifications shortcut triggered');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKPIClick = (kpiId) => {
    switch (kpiId) {
      case 'active-contracts': navigate('/contract-repository');
        break;
      case 'pending-approvals': navigate('/approval-workflows');
        break;
      case 'expiring-soon': navigate('/contract-repository', { state: { filter: 'expiring' } });
        break;
      case 'total-value': navigate('/financial-tracking');
        break;
      default:
        console.log('KPI clicked:', kpiId);
    }
  };

  const handleAlertResolve = (alert) => {
    console.log('Resolving alert:', alert);
    // Implement alert resolution logic
  };

  const handleAlertView = (alert) => {
    console.log('Viewing alert:', alert);
    navigate('/contract-repository', { state: { contractId: alert?.contractId } });
  };

  const handlePipelineStageClick = (stage, count) => {
    console.log('Pipeline stage clicked:', stage, count);
    navigate('/contract-repository', { state: { filter: stage?.toLowerCase() } });
  };

  const handleActivityClick = (activity) => {
    console.log('Activity clicked:', activity);
    navigate('/contract-repository', { state: { contractId: activity?.contractId } });
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    console.log('Filters changed:', filters);
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
  };

  const handleIntegrationRefresh = () => {
    console.log('Refreshing integrations...');
    // Implement integration refresh logic
  };

  const handleWidgetRemove = (widgetId) => {
    setActiveWidgets(prev => prev?.filter(w => w?.id !== widgetId));
  };

  const handleAddWidget = (widget) => {
    if (!activeWidgets?.find(w => w?.id === widget?.id)) {
      setActiveWidgets(prev => [...prev, widget]);
    }
  };

  const exportDashboard = (format) => {
    console.log('Exporting dashboard as:', format);
    // Implement export functionality
  };

  const renderWidgetContent = (widget) => {
    switch (widget?.id) {
      case 'spend-analytics':
        return <SpendAnalyticsWidget />;
      case 'vendor-performance':
        return <VendorPerformanceWidget />;
      case 'compliance-matrix':
        return (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name={widget?.icon} size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-sm">{widget?.title} content would appear here</p>
              <p className="text-xs mt-2">Widget implementation pending</p>
            </div>
          </div>
        );
      case 'risk-assessment':
        return (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name={widget?.icon} size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-sm">{widget?.title} content would appear here</p>
              <p className="text-xs mt-2">Widget implementation pending</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name={widget?.icon} size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-sm">{widget?.title} content would appear here</p>
              <p className="text-xs mt-2">Widget implementation pending</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="p-6 space-y-6">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Contract Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here's what's happening with your contracts today.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsCustomizing(!isCustomizing)}
                iconName="Layout"
                iconPosition="left"
              >
                {isCustomizing ? 'Done' : 'Customize'}
              </Button>
              
              <div className="relative">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>
              </div>
              
              <Button
                variant="default"
                onClick={() => navigate('/contract-editor')}
                iconName="Plus"
                iconPosition="left"
              >
                New Contract
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <QuickFilters
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAllFilters}
          />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData?.map((kpi) => (
              <KPICard
                key={kpi?.id}
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                onClick={() => handleKPIClick(kpi?.id)}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Priority Alerts */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary">Priority Alerts</h3>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-error text-error-foreground text-xs rounded-full">
                      {priorityAlerts?.filter(a => a?.priority === 'critical')?.length}
                    </span>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {priorityAlerts?.map((alert) => (
                    <PriorityAlert
                      key={alert?.id}
                      alert={alert}
                      onResolve={handleAlertResolve}
                      onView={handleAlertView}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Contract Pipeline & Activity */}
            <div className="lg:col-span-2 space-y-6">
              <ContractPipeline
                data={pipelineData}
                onStageClick={handlePipelineStageClick}
              />
              
              <ActivityStream
                activities={recentActivities}
                onActivityClick={handleActivityClick}
              />
            </div>
          </div>

          {/* Custom Widgets Section */}
          {activeWidgets?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Dashboard Widgets</h3>
                {isCustomizing && (
                  <div className="flex items-center space-x-2">
                    <select 
                      className="text-sm bg-surface border border-border rounded px-3 py-2"
                      onChange={(e) => {
                        const widget = availableWidgets?.find(w => w?.id === e?.target?.value);
                        if (widget) handleAddWidget(widget);
                      }}
                    >
                      <option value="">Add Widget</option>
                      {availableWidgets?.filter(w => !activeWidgets?.find(aw => aw?.id === w?.id))?.map(widget => (
                          <option key={widget?.id} value={widget?.id}>
                            {widget?.title}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeWidgets?.map((widget) => (
                  <DashboardWidget
                    key={widget?.id}
                    widget={widget}
                    onRemove={isCustomizing ? handleWidgetRemove : null}
                    onResize={isCustomizing}
                    onMove={isCustomizing}
                  >
                    {renderWidgetContent(widget)}
                  </DashboardWidget>
                ))}
              </div>
            </div>
          )}

          {/* Integration Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <IntegrationStatus
                integrations={integrationData}
                onRefresh={handleIntegrationRefresh}
              />
            </div>
            
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-text-primary mb-6">Quick Actions</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2"
                    onClick={() => navigate('/contract-editor')}
                  >
                    <Icon name="FileText" size={24} />
                    <span className="text-sm">New Contract</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2"
                    onClick={() => navigate('/contract-repository')}
                  >
                    <Icon name="Search" size={24} />
                    <span className="text-sm">Search Contracts</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2"
                    onClick={() => navigate('/approval-workflows')}
                  >
                    <Icon name="CheckCircle" size={24} />
                    <span className="text-sm">Approvals</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2"
                    onClick={() => navigate('/analytics-reporting')}
                  >
                    <Icon name="BarChart3" size={24} />
                    <span className="text-sm">Reports</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Keyboard" size={16} />
              <span>Keyboard shortcuts:</span>
              <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">D</kbd>
              <span>Dashboard</span>
              <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">F</kbd>
              <span>Filters</span>
              <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">N</kbd>
              <span>Notifications</span>
              <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">Ctrl+K</kbd>
              <span>Search</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContractDashboard;