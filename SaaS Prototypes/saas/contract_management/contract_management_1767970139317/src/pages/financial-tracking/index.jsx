import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FinancialKPICard from './components/FinancialKPICard';
import PaymentScheduleCalendar from './components/PaymentScheduleCalendar';
import FinancialTransactionsTable from './components/FinancialTransactionsTable';
import ThreeWayMatchingPanel from './components/ThreeWayMatchingPanel';
import BudgetAllocationChart from './components/BudgetAllocationChart';
import CurrencyManagementPanel from './components/CurrencyManagementPanel';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';

const FinancialTracking = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('current_month');

  const kpiData = [
    {
      title: 'Total Contract Value',
      value: 18750000,
      change: 12.5,
      changeType: 'positive',
      icon: 'DollarSign'
    },
    {
      title: 'Committed Spend',
      value: 14200000,
      change: 8.3,
      changeType: 'positive',
      icon: 'TrendingUp'
    },
    {
      title: 'Available Budget',
      value: 4550000,
      change: -5.2,
      changeType: 'negative',
      icon: 'Wallet'
    },
    {
      title: 'Overdue Payments',
      value: 285000,
      change: -15.7,
      changeType: 'positive',
      icon: 'AlertTriangle'
    },
    {
      title: 'Cost Savings Achieved',
      value: 1250000,
      change: 22.4,
      changeType: 'positive',
      icon: 'PiggyBank'
    }
  ];

  const tabOptions = [
    { value: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { value: 'payments', label: 'Payment Schedule', icon: 'Calendar' },
    { value: 'transactions', label: 'Transactions', icon: 'Receipt' },
    { value: 'matching', label: 'Three-Way Matching', icon: 'GitCompare' },
    { value: 'budget', label: 'Budget Allocation', icon: 'PieChart' },
    { value: 'currency', label: 'Currency Management', icon: 'Banknote' }
  ];

  const dateRangeOptions = [
    { value: 'current_month', label: 'Current Month' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'current_quarter', label: 'Current Quarter' },
    { value: 'last_quarter', label: 'Last Quarter' },
    { value: 'current_year', label: 'Current Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleExportData = () => {
    console.log('Exporting financial data...');
    // Implement export functionality
  };

  const handleGenerateReport = () => {
    console.log('Generating financial report...');
    // Implement report generation
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {kpiData?.map((kpi, index) => (
                <FinancialKPICard
                  key={index}
                  title={kpi?.title}
                  value={kpi?.value}
                  change={kpi?.change}
                  changeType={kpi?.changeType}
                  icon={kpi?.icon}
                />
              ))}
            </div>
            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PaymentScheduleCalendar />
              <BudgetAllocationChart />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <FinancialTransactionsTable />
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <PaymentScheduleCalendar />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                    <div>
                      <div className="text-sm text-muted-foreground">Due This Week</div>
                      <div className="text-xl font-bold text-text-primary">$342,500</div>
                    </div>
                    <Icon name="Clock" size={24} className="text-warning" />
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                    <div>
                      <div className="text-sm text-muted-foreground">Due Next Week</div>
                      <div className="text-xl font-bold text-text-primary">$189,750</div>
                    </div>
                    <Icon name="Calendar" size={24} className="text-accent" />
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                    <div>
                      <div className="text-sm text-muted-foreground">Overdue</div>
                      <div className="text-xl font-bold text-error">$78,000</div>
                    </div>
                    <Icon name="AlertTriangle" size={24} className="text-error" />
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Methods</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ACH Transfer</span>
                    <span className="text-sm font-medium text-text-primary">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Wire Transfer</span>
                    <span className="text-sm font-medium text-text-primary">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Check</span>
                    <span className="text-sm font-medium text-text-primary">8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Credit Card</span>
                    <span className="text-sm font-medium text-text-primary">2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'transactions':
        return <FinancialTransactionsTable />;

      case 'matching':
        return <ThreeWayMatchingPanel />;

      case 'budget':
        return <BudgetAllocationChart />;

      case 'currency':
        return <CurrencyManagementPanel />;

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Financial Tracking - ContractFlow Pro</title>
        <meta name="description" content="Financial tracking and management with budget allocation, payment monitoring, and comprehensive financial reporting." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary mb-2">Financial Tracking</h1>
                  <p className="text-muted-foreground">
                    Comprehensive contract financial management with budget monitoring, payment scheduling, and three-way matching capabilities
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <Select
                    options={dateRangeOptions}
                    value={dateRange}
                    onChange={setDateRange}
                    className="w-40"
                  />
                  <Button variant="outline" onClick={handleExportData} iconName="Download" iconPosition="left">
                    Export Data
                  </Button>
                  <Button variant="default" onClick={handleGenerateReport} iconName="FileText" iconPosition="left">
                    Generate Report
                  </Button>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-border">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabOptions?.map((tab) => (
                    <button
                      key={tab?.value}
                      onClick={() => handleTabChange(tab?.value)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                        activeTab === tab?.value
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-text-primary hover:border-muted'
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

export default FinancialTracking;