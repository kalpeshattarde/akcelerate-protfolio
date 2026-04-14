import React, { useState, useEffect } from 'react';
import { Bar } from 'recharts';
import Icon from '../../components/AppIcon';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';
import SpendingDistributionChart from './components/SpendingDistributionChart';
import MonthlyVolumeChart from './components/MonthlyVolumeChart';
import TopSuppliersTable from './components/TopSuppliersTable';
import OverdueDeliveriesTable from './components/OverdueDeliveriesTable';
import BudgetUtilizationTable from './components/BudgetUtilizationTable';
import FilterBar from './components/FilterBar';
import ExportModal from './components/ExportModal';

const AnalyticsAndReportingDashboard = () => {
  const [userRole] = useState('finance');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('last30days');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for analytics
  const supplierSpendingData = [
    { name: 'TechCorp Solutions', value: 285000, percentage: 32.5, color: '#2563EB' },
    { name: 'Global Supplies Inc', value: 198000, percentage: 22.6, color: '#059669' },
    { name: 'Industrial Partners', value: 156000, percentage: 17.8, color: '#F59E0B' },
    { name: 'Office Dynamics', value: 124000, percentage: 14.1, color: '#EF4444' },
    { name: 'Others', value: 114000, percentage: 13.0, color: '#64748B' }
  ];

  const monthlyVolumeData = [
    { month: 'Jan', orders: 45, amount: 125000, budget: 150000 },
    { month: 'Feb', orders: 52, amount: 142000, budget: 150000 },
    { month: 'Mar', orders: 48, amount: 138000, budget: 150000 },
    { month: 'Apr', orders: 61, amount: 165000, budget: 160000 },
    { month: 'May', orders: 58, amount: 158000, budget: 160000 },
    { month: 'Jun', orders: 67, amount: 182000, budget: 170000 }
  ];

  const topSuppliersData = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      totalSpend: 285000,
      orderCount: 24,
      avgOrderValue: 11875,
      rating: 4.8,
      onTimeDelivery: 96
    },
    {
      id: 2,
      name: 'Global Supplies Inc',
      totalSpend: 198000,
      orderCount: 18,
      avgOrderValue: 11000,
      rating: 4.6,
      onTimeDelivery: 94
    },
    {
      id: 3,
      name: 'Industrial Partners',
      totalSpend: 156000,
      orderCount: 15,
      avgOrderValue: 10400,
      rating: 4.4,
      onTimeDelivery: 89
    },
    {
      id: 4,
      name: 'Office Dynamics',
      totalSpend: 124000,
      orderCount: 22,
      avgOrderValue: 5636,
      rating: 4.2,
      onTimeDelivery: 92
    }
  ];

  const overdueDeliveriesData = [
    {
      id: 1,
      poNumber: 'PO-2024-156',
      supplier: 'TechCorp Solutions',
      amount: 15600,
      dueDate: '2024-01-15',
      daysOverdue: 8,
      escalationLevel: 'Medium',
      status: 'In Transit'
    },
    {
      id: 2,
      poNumber: 'PO-2024-142',
      supplier: 'Industrial Partners',
      amount: 8900,
      dueDate: '2024-01-12',
      daysOverdue: 11,
      escalationLevel: 'High',
      status: 'Delayed'
    },
    {
      id: 3,
      poNumber: 'PO-2024-138',
      supplier: 'Office Dynamics',
      amount: 3200,
      dueDate: '2024-01-18',
      daysOverdue: 5,
      escalationLevel: 'Low',
      status: 'Processing'
    }
  ];

  const budgetUtilizationData = [
    {
      id: 1,
      department: 'IT Department',
      budgetAllocated: 250000,
      budgetUsed: 198000,
      utilization: 79.2,
      remaining: 52000,
      status: 'On Track'
    },
    {
      id: 2,
      department: 'Operations',
      budgetAllocated: 180000,
      budgetUsed: 165000,
      utilization: 91.7,
      remaining: 15000,
      status: 'Warning'
    },
    {
      id: 3,
      department: 'Marketing',
      budgetAllocated: 120000,
      budgetUsed: 89000,
      utilization: 74.2,
      remaining: 31000,
      status: 'On Track'
    },
    {
      id: 4,
      department: 'HR',
      budgetAllocated: 80000,
      budgetUsed: 76000,
      utilization: 95.0,
      remaining: 4000,
      status: 'Critical'
    }
  ];

  const keyMetrics = [
    {
      title: 'Total Spend',
      value: '$877,000',
      change: '+12.5%',
      trend: 'up',
      icon: 'DollarSign'
    },
    {
      title: 'Active Suppliers',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: 'Users'
    },
    {
      title: 'Avg Order Value',
      value: '$9,850',
      change: '-3.2%',
      trend: 'down',
      icon: 'TrendingUp'
    },
    {
      title: 'On-Time Delivery',
      value: '92.8%',
      change: '+1.4%',
      trend: 'up',
      icon: 'Clock'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 2000);
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={userRole} />
      <Header userRole={userRole} userName="Sarah Johnson" />
      
      <main className="lg:ml-60 lg:pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-heading-bold text-text-primary mb-2">
                  Analytics & Reporting Dashboard
                </h1>
                <p className="text-text-secondary">
                  Comprehensive spending insights and procurement performance metrics
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Clock" size={16} />
                  <span>Last updated: {formatDate(lastUpdated)}</span>
                </div>
                
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 hover:bg-secondary-200 rounded-button transition-smooth disabled:opacity-50"
                >
                  <Icon name="RefreshCw" size={16} className={isRefreshing ? 'animate-spin' : ''} />
                  <span className="text-sm font-body-medium">Refresh</span>
                </button>
                
                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth"
                >
                  <Icon name="Download" size={16} />
                  <span className="text-sm font-body-medium">Export</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <FilterBar
              selectedDateRange={selectedDateRange}
              setSelectedDateRange={setSelectedDateRange}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              selectedSupplier={selectedSupplier}
              setSelectedSupplier={setSelectedSupplier}
            />
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="bg-surface border border-border rounded-card p-6 shadow-elevation-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    metric.trend === 'up' ? 'bg-success-100' : 'bg-error-100'
                  }`}>
                    <Icon 
                      name={metric.icon} 
                      size={24} 
                      className={metric.trend === 'up' ? 'text-success' : 'text-error'}
                    />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric.trend === 'up' ? 'text-success' : 'text-error'
                  }`}>
                    <Icon name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                    <span>{metric.change}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-heading-bold text-text-primary mb-1">
                    {metric.value}
                  </h3>
                  <p className="text-text-secondary text-sm">{metric.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Supplier Spending Distribution */}
            <SpendingDistributionChart data={supplierSpendingData} />
            
            {/* Monthly PO Volume */}
            <MonthlyVolumeChart data={monthlyVolumeData} />
          </div>

          {/* Data Tables Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Top Suppliers */}
            <TopSuppliersTable data={topSuppliersData} />
            
            {/* Overdue Deliveries */}
            <OverdueDeliveriesTable data={overdueDeliveriesData} />
            
            {/* Budget Utilization */}
            <BudgetUtilizationTable data={budgetUtilizationData} />
          </div>
        </div>
      </main>

      {/* Export Modal */}
      {isExportModalOpen && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AnalyticsAndReportingDashboard;