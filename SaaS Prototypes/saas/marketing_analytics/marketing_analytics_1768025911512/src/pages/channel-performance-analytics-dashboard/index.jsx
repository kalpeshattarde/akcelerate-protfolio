import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ChannelFilterControls from './components/ChannelFilterControls';
import ChannelMetricsStrip from './components/ChannelMetricsStrip';
import ChannelPerformanceChart from './components/ChannelPerformanceChart';
import FunnelAnalysis from './components/FunnelAnalysis';
import PerformanceLeaderboard from './components/PerformanceLeaderboard';
import CampaignDataGrid from './components/CampaignDataGrid';

const ChannelPerformanceAnalyticsDashboard = () => {
  const [filters, setFilters] = useState({
    channel: 'all',
    campaignType: 'all',
    attributionModel: 'last-click',
    period: '30d'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);

    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-6 py-8">
            {/* Loading skeleton */}
            <div className="space-y-6">
              <div className="glass-card p-6 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)]?.map((_, i) =>
                  <div key={i} className="h-32 bg-muted rounded"></div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-6 animate-pulse">
                  <div className="h-96 bg-muted rounded"></div>
                </div>
                <div className="glass-card p-6 animate-pulse">
                  <div className="h-96 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-bold text-foreground mb-2 text-2xl">Channel Performance Analytics

            </h1>
            <p className="text-muted-foreground">
              Optimize multi-channel campaign performance through interactive data exploration and advanced analytics
            </p>
          </div>

          {/* Filter Controls */}
          <ChannelFilterControls onFiltersChange={handleFiltersChange} />

          {/* Metrics Strip */}
          <ChannelMetricsStrip />

          {/* Channel Performance Chart - Full Width */}
          <div className="mb-8">
            <ChannelPerformanceChart />
          </div>

          {/* Performance Leaderboard - Horizontal Layout Below Chart */}
          <div className="mb-8">
            <PerformanceLeaderboard />
          </div>

          {/* Funnel Analysis */}
          <FunnelAnalysis />

          {/* Campaign Data Grid */}
          <CampaignDataGrid />

          {/* Floating Action Button for Mobile */}
          <div className="fixed bottom-6 right-6 lg:hidden">
            <button className="w-14 h-14 bg-primary rounded-full shadow-floating flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>);

};

export default ChannelPerformanceAnalyticsDashboard;