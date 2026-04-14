import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import TrafficSourceChart from './components/TrafficSourceChart';
import ChannelPerformanceChart from './components/ChannelPerformanceChart';
import CampaignRankingTable from './components/CampaignRankingTable';
import BudgetRevenueChart from './components/BudgetRevenueChart';
import GlobalControls from './components/GlobalControls';

const MarketingPerformanceOverviewDashboard = () => {
  const [dateRange, setDateRange] = useState('last_30_days');
  const [selectedChannels, setSelectedChannels] = useState(['google_ads', 'facebook_ads', 'linkedin_ads', 'email_marketing', 'organic_search']);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Mock KPI data
  const kpiData = [
  {
    title: "Total Sessions",
    value: 125847,
    change: 12.5,
    changeType: "positive",
    icon: "Users",
    trend: true
  },
  {
    title: "New Leads",
    value: 3247,
    change: 8.3,
    changeType: "positive",
    icon: "UserPlus",
    trend: true
  },
  {
    title: "Cost Per Lead",
    value: "$13.92",
    change: -5.7,
    changeType: "positive",
    icon: "DollarSign",
    trend: true
  },
  {
    title: "ROI",
    value: "234%",
    change: 15.2,
    changeType: "positive",
    icon: "TrendingUp",
    trend: true
  }];


  // Mock traffic source data
  const trafficSourceData = [
  { name: "Google Ads", value: 45230, percentage: 35.9 },
  { name: "Facebook Ads", value: 32150, percentage: 25.5 },
  { name: "LinkedIn Ads", value: 18940, percentage: 15.0 },
  { name: "Email Marketing", value: 15670, percentage: 12.4 },
  { name: "Organic Search", value: 10857, percentage: 8.6 },
  { name: "Direct Traffic", value: 3000, percentage: 2.4 }];


  // Mock channel performance data
  const channelPerformanceData = [
  {
    date: "Jan 1",
    google_ads: 12500,
    facebook_ads: 8900,
    linkedin_ads: 5600,
    email_marketing: 4200,
    organic_search: 3800
  },
  {
    date: "Jan 8",
    google_ads: 13200,
    facebook_ads: 9400,
    linkedin_ads: 5900,
    email_marketing: 4500,
    organic_search: 4100
  },
  {
    date: "Jan 15",
    google_ads: 14800,
    facebook_ads: 10200,
    linkedin_ads: 6400,
    email_marketing: 4800,
    organic_search: 4300
  },
  {
    date: "Jan 22",
    google_ads: 15600,
    facebook_ads: 11100,
    linkedin_ads: 6800,
    email_marketing: 5200,
    organic_search: 4600
  },
  {
    date: "Jan 29",
    google_ads: 16200,
    facebook_ads: 11800,
    linkedin_ads: 7200,
    email_marketing: 5500,
    organic_search: 4900
  }];


  // Mock campaign ranking data
  const campaignData = [
  {
    id: 1,
    name: "Q1 Product Launch",
    channel: "Google Ads",
    leads: 1247,
    leadGrowth: 23,
    cpl: 11.50,
    benchmark: 15.20,
    roi: 245
  },
  {
    id: 2,
    name: "Brand Awareness Campaign",
    channel: "Facebook Ads",
    leads: 892,
    leadGrowth: 18,
    cpl: 9.80,
    benchmark: 12.40,
    roi: 189
  },
  {
    id: 3,
    name: "B2B Lead Generation",
    channel: "LinkedIn Ads",
    leads: 634,
    leadGrowth: 31,
    cpl: 24.60,
    benchmark: 28.90,
    roi: 156
  },
  {
    id: 4,
    name: "Newsletter Signup",
    channel: "Email Marketing",
    leads: 423,
    leadGrowth: 12,
    cpl: 3.20,
    benchmark: 4.50,
    roi: 312
  },
  {
    id: 5,
    name: "SEO Content Strategy",
    channel: "Organic Search",
    leads: 298,
    leadGrowth: 8,
    cpl: 2.10,
    benchmark: 3.80,
    roi: 425
  }];


  // Mock budget vs revenue data
  const budgetRevenueData = [
  {
    channel: "Google Ads",
    budget: 25000,
    revenue: 86250,
    roi: 245
  },
  {
    channel: "Facebook Ads",
    budget: 18000,
    revenue: 52020,
    roi: 189
  },
  {
    channel: "LinkedIn Ads",
    budget: 15000,
    revenue: 38400,
    roi: 156
  },
  {
    channel: "Email Marketing",
    budget: 8000,
    revenue: 32960,
    roi: 312
  },
  {
    channel: "Organic Search",
    budget: 12000,
    revenue: 63000,
    roi: 425
  }];


  // Real-time data refresh
  useEffect(() => {
    if (isRealTimeEnabled) {
      const interval = setInterval(() => {
        setLastRefresh(new Date());
      }, 15 * 60 * 1000); // 15 minutes

      return () => clearInterval(interval);
    }
  }, [isRealTimeEnabled]);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = async () => {
    // Simulate CSV export
    return new Promise((resolve) => {
      setTimeout(() => {
        const csvContent = "data:text/csv;charset=utf-8," + "Campaign,Channel,Leads,CPL,ROI\n" +
        campaignData.map((row) =>
        `${row.name},${row.channel},${row.leads},${row.cpl},${row.roi}%`
        ).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `marketing-performance-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve();
      }, 2000);
    });
  };

  const handleSourceFilter = (sourceName) => {
    console.log('Filter by source:', sourceName);
  };

  const handleChannelToggle = (channelKey) => {
    setSelectedChannels((prev) =>
    prev?.includes(channelKey) ?
    prev?.filter((c) => c !== channelKey) :
    [...prev, channelKey]
    );
  };

  const handleCampaignSelect = (campaign) => {
    console.log('Selected campaign:', campaign);
  };

  const handleDrillDown = (data) => {
    console.log('Drill down into:', data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header Section */}
          <div className="space-y-4 pt-[15px]">
            <h1 className="font-bold text-foreground flex items-center gap-3 text-2xl">
              <BarChart3 className="w-8 h-8" />
              Marketing Performance Overview
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl">
              Track marketing campaigns, ROI, and key metrics across all channels.
            </p>
          </div>

          {/* Global Controls */}
          <GlobalControls
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            selectedChannels={selectedChannels}
            onChannelChange={setSelectedChannels}
            isRealTimeEnabled={isRealTimeEnabled}
            onRealTimeToggle={setIsRealTimeEnabled}
            lastRefresh={lastRefresh}
            onRefresh={handleRefresh}
            onExport={handleExport} />

          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {kpiData?.map((kpi, index) =>
            <KPICard
              key={index}
              title={kpi?.title}
              value={kpi?.value}
              change={kpi?.change}
              changeType={kpi?.changeType}
              icon={kpi?.icon}
              trend={kpi?.trend}
              isLoading={isLoading} />

            )}
          </div>

          {/* Main Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Traffic Source Chart */}
            <div className="xl:col-span-1">
              <TrafficSourceChart
                data={trafficSourceData}
                onSourceFilter={handleSourceFilter} />

            </div>

            {/* Channel Performance Chart */}
            <div className="xl:col-span-2">
              <ChannelPerformanceChart
                data={channelPerformanceData}
                selectedChannels={selectedChannels}
                onChannelToggle={handleChannelToggle} />

            </div>
          </div>

          {/* Secondary Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Campaign Rankings */}
            <div className="xl:col-span-1">
              <CampaignRankingTable
                campaigns={campaignData}
                onCampaignSelect={handleCampaignSelect} />

            </div>

            {/* Budget vs Revenue Chart */}
            <div className="xl:col-span-2">
              <BudgetRevenueChart
                data={budgetRevenueData}
                onDrillDown={handleDrillDown} />

            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default MarketingPerformanceOverviewDashboard;