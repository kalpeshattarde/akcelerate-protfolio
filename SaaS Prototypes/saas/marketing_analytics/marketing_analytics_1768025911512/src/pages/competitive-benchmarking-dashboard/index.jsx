import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MarketPositionKPIs from './components/MarketPositionKPIs';
import BenchmarkingControls from './components/BenchmarkingControls';
import CompetitiveRadarChart from './components/CompetitiveRadarChart';
import CompetitiveLeaderboard from './components/CompetitiveLeaderboard';
import BenchmarkComparisonBars from './components/BenchmarkComparisonBars';
import MarketTrendsChart from './components/MarketTrendsChart';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CompetitiveBenchmarkingDashboard = () => {
  const [filters, setFilters] = useState({
    industry: 'digital-marketing',
    period: 'quarterly',
    showCompetitors: true
  });
  const [bookmarkedSets, setBookmarkedSets] = useState([]);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Simulate data loading
    document.title = 'Competitive Benchmarking Dashboard - Marketing Analytics Pro';
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleBookmarkSet = () => {
    const newBookmark = {
      id: Date.now(),
      name: `${filters?.industry} - ${filters?.period}`,
      filters: { ...filters },
      timestamp: new Date()?.toISOString()
    };
    setBookmarkedSets(prev => [...prev, newBookmark]);
  };

  const handleExportReport = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would trigger a download
      console.log('Exporting competitive benchmark report...');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Icon name="Target" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Competitive Benchmarking Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Strategic intelligence and market positioning insights
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Bookmark"
                iconPosition="left"
                onClick={handleBookmarkSet}
                className="whitespace-nowrap"
              >
                Save Configuration
              </Button>
              
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                loading={isExporting}
                onClick={handleExportReport}
                className="whitespace-nowrap"
              >
                Export Report
              </Button>
            </div>
          </div>

          {/* Benchmarking Controls */}
          <BenchmarkingControls onFiltersChange={handleFiltersChange} />

          {/* Market Position KPIs */}
          <MarketPositionKPIs />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
            {/* Competitive Radar Chart */}
            <div className="xl:col-span-8">
              <CompetitiveRadarChart />
            </div>
            
            {/* Competitive Leaderboard */}
            <div className="xl:col-span-4">
              <CompetitiveLeaderboard />
            </div>
          </div>

          {/* Benchmark Comparison Bars */}
          <div className="mb-8">
            <BenchmarkComparisonBars />
          </div>

          {/* Market Trends Chart */}
          <div className="mb-8">
            <MarketTrendsChart />
          </div>

          {/* Bookmarked Configurations */}
          {bookmarkedSets?.length > 0 && (
            <div className="glass-card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Bookmark" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Saved Configurations
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarkedSets?.map((bookmark) => (
                  <div
                    key={bookmark?.id}
                    className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">
                        {bookmark?.name}
                      </h4>
                      <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Saved {new Date(bookmark.timestamp)?.toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span>Data updated daily at 6:00 AM EST</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={14} />
                  <span>GDPR compliant data processing</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Database" size={14} />
                  <span>Data sources: 12 verified providers</span>
                </div>
                <div className="flex items-center space-x-2 text-primary cursor-pointer hover:text-primary/80 transition-colors">
                  <Icon name="HelpCircle" size={14} />
                  <span>Methodology guide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompetitiveBenchmarkingDashboard;