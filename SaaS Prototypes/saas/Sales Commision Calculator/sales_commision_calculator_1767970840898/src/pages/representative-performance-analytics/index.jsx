import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import PageHeader from 'components/ui/PageHeader';
import useSidebar from 'hooks/useSidebar';
import RepresentativeSelector from './components/RepresentativeSelector';
import PerformanceSummaryCards from './components/PerformanceSummaryCards';
import TimeSeriesCharts from './components/TimeSeriesCharts';
import ComparativeBenchmarking from './components/ComparativeBenchmarking';
import AdvancedFilters from './components/AdvancedFilters';


const RepresentativePerformanceAnalytics = () => {
  const navigate = useNavigate();
  const { getMainContentClasses } = useSidebar();
  const [selectedRep, setSelectedRep] = useState(null);
  const [selectedReps, setSelectedReps] = useState([]);
  const [timePeriod, setTimePeriod] = useState('quarterly');
  const [filters, setFilters] = useState({
    productLine: 'all',
    dealSize: 'all',
    customerSegment: 'all',
    dateRange: 'ytd'
  });
  const [savedViews, setSavedViews] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Mock data for sales representatives
  const representatives = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      territory: "West Coast",
      tier: "Tier 1",
      ytdRevenue: 2850000,
      quota: 2500000,
      quotaAttainment: 114,
      ranking: 3,
      totalReps: 45,
      deals: 28,
      avgDealSize: 101786,
      winRate: 72,
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@company.com",
      territory: "East Coast",
      tier: "Tier 2",
      ytdRevenue: 1950000,
      quota: 2000000,
      quotaAttainment: 97.5,
      ranking: 12,
      totalReps: 45,
      deals: 22,
      avgDealSize: 88636,
      winRate: 68,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      territory: "Central",
      tier: "Tier 1",
      ytdRevenue: 3200000,
      quota: 2800000,
      quotaAttainment: 114.3,
      ranking: 1,
      totalReps: 45,
      deals: 35,
      avgDealSize: 91429,
      winRate: 75,
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@company.com",
      territory: "Southwest",
      tier: "Tier 3",
      ytdRevenue: 1200000,
      quota: 1500000,
      quotaAttainment: 80,
      ranking: 28,
      totalReps: 45,
      deals: 18,
      avgDealSize: 66667,
      winRate: 61,
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    }
  ];

  // Mock time series data
  const timeSeriesData = {
    monthly: [
      { period: 'Jan', revenue: 245000, deals: 3, commission: 12250 },
      { period: 'Feb', revenue: 320000, deals: 4, commission: 16000 },
      { period: 'Mar', revenue: 280000, deals: 3, commission: 14000 },
      { period: 'Apr', revenue: 410000, deals: 5, commission: 20500 },
      { period: 'May', revenue: 380000, deals: 4, commission: 19000 },
      { period: 'Jun', revenue: 450000, deals: 6, commission: 22500 },
      { period: 'Jul', revenue: 390000, deals: 4, commission: 19500 },
      { period: 'Aug', revenue: 375000, deals: 4, commission: 18750 }
    ],
    quarterly: [
      { period: 'Q1', revenue: 845000, deals: 10, commission: 42250 },
      { period: 'Q2', revenue: 1240000, deals: 15, commission: 62000 },
      { period: 'Q3', revenue: 765000, deals: 8, commission: 38250 }
    ],
    yearly: [
      { period: '2022', revenue: 2100000, deals: 25, commission: 105000 },
      { period: '2023', revenue: 2650000, deals: 32, commission: 132500 },
      { period: '2024', revenue: 2850000, deals: 33, commission: 142500 }
    ]
  };

  // Mock benchmark data
  const benchmarkData = [
    { metric: 'Revenue', myValue: 2850000, peerAvg: 2200000, topPerformer: 3200000 },
    { metric: 'Deals Closed', myValue: 28, peerAvg: 22, topPerformer: 35 },
    { metric: 'Win Rate', myValue: 72, peerAvg: 65, topPerformer: 75 },
    { metric: 'Avg Deal Size', myValue: 101786, peerAvg: 85000, topPerformer: 120000 }
  ];

  // Initialize with first representative
  useEffect(() => {
    if (representatives.length > 0 && !selectedRep) {
      setSelectedRep(representatives[0]);
      setSelectedReps([representatives[0]]);
    }
  }, [representatives, selectedRep]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedRep) return;
      
      const currentIndex = representatives.findIndex(rep => rep.id === selectedRep.id);
      
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setSelectedRep(representatives[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && currentIndex < representatives.length - 1) {
        setSelectedRep(representatives[currentIndex + 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedRep, representatives]);

  const handleSaveView = () => {
    const newView = {
      id: Date.now(),
      name: `${selectedRep?.name} - ${timePeriod} View`,
      timestamp: new Date(),
      repId: selectedRep?.id,
      timePeriod,
      filters: { ...filters }
    };
    setSavedViews(prev => [newView, ...prev.slice(0, 4)]);
  };

  const handleLoadView = (view) => {
    const rep = representatives.find(r => r.id === view.repId);
    if (rep) {
      setSelectedRep(rep);
      setTimePeriod(view.timePeriod);
      setFilters(view.filters);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    
    // Create mock download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Performance Report - ${selectedRep?.name}\nGenerated: ${new Date().toLocaleString()}`);
    element.download = `performance-report-${selectedRep?.name?.replace(' ', '-').toLowerCase()}.txt`;
    element.click();
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Sidebar />
      <Header />
      
      <main className={`pt-16 transition-all duration-300 ${getMainContentClasses()}`}>
        {/* Animated Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PageHeader
            title="Representative Performance Analytics"
            description="Comprehensive analytics and insights into individual sales representative performance metrics and trends."
            icon="TrendingUp"
            statusIndicators={[
              {
                icon: 'Users',
                iconClass: 'text-neon-indigo',
                label: `${selectedReps?.length || 0} Representatives Selected`
              },
              {
                icon: 'Calendar',
                iconClass: 'text-neon-aqua',
                label: `${filters?.dateRange || 'All Time'}`
              },
              {
                icon: 'BarChart3',
                iconClass: 'text-neon-teal',
                label: 'Real-time Analytics'
              }
            ]}
            actionButtons={[
              {
                icon: 'Settings',
                label: 'Advanced Filters',
                onClick: () => setShowAdvancedFilters(!showAdvancedFilters),
                variant: 'secondary'
              },
              {
                icon: 'Download',
                label: 'Export Report',
                onClick: () => setShowExportModal(true),
                variant: 'primary'
              }
            ]}
          />
        </motion.div>

        <motion.div 
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Top Section - Representative Selector and Summary */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <motion.div 
              className="xl:col-span-1"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <RepresentativeSelector
                representatives={representatives}
                selectedRep={selectedRep}
                onSelectRep={setSelectedRep}
              />
            </motion.div>
            
            <motion.div 
              className="xl:col-span-2"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <PerformanceSummaryCards
                representative={selectedRep}
              />
            </motion.div>
          </div>

          {/* Filters and Controls */}
          <motion.div 
            className="mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <AdvancedFilters
              filters={filters}
              onFiltersChange={setFilters}
              timePeriod={timePeriod}
              onTimePeriodChange={setTimePeriod}
              onSaveView={handleSaveView}
              savedViews={savedViews}
              onLoadView={handleLoadView}
            />
          </motion.div>

          {/* Main Analytics Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Time Series Charts */}
            <motion.div 
              className="xl:col-span-2"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <TimeSeriesCharts
                data={timeSeriesData[timePeriod]}
                timePeriod={timePeriod}
                representative={selectedRep}
              />
            </motion.div>

            {/* Comparative Benchmarking */}
            <motion.div 
              className="xl:col-span-1"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <ComparativeBenchmarking
                data={benchmarkData}
                representative={selectedRep}
              />
            </motion.div>
          </div>

          {/* Keyboard Navigation Hint with Glass Effect */}
          <motion.div 
            className="mt-8 card-glass-compact animate-float"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <Icon name="Keyboard" size={16} className="text-neon-indigo" />
              <span className="text-sm text-white/90 font-medium">
                Tip: Use left/right arrow keys to quickly navigate between representatives
              </span>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default RepresentativePerformanceAnalytics;