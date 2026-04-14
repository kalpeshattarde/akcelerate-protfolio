import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReportFilters from './components/ReportFilters';
import InteractiveChart from './components/InteractiveChart';
import AchievementTimeline from './components/AchievementTimeline';
import WellnessInsights from './components/WellnessInsights';
import ComparativeAnalysis from './components/ComparativeAnalysis';
import ExportOptions from './components/ExportOptions';

const ProgressReports = () => {
  const [reportFilters, setReportFilters] = useState({
    dateRange: 'last30days',
    reportType: 'monthly',
    metrics: ['steps', 'calories', 'hydration', 'sleep']
  });

  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data for charts
  const chartData = [
    { date: 'Oct 1', steps: 8500, calories: 2100, hydration: 2.2, sleep: 7.2, weight: 70.5, mood: 8 },
    { date: 'Oct 2', steps: 12000, calories: 2400, hydration: 2.8, sleep: 6.8, weight: 70.3, mood: 7 },
    { date: 'Oct 3', steps: 9800, calories: 2200, hydration: 2.5, sleep: 7.5, weight: 70.2, mood: 8 },
    { date: 'Oct 4', steps: 11500, calories: 2350, hydration: 3.0, sleep: 6.5, weight: 70.0, mood: 6 },
    { date: 'Oct 5', steps: 13200, calories: 2500, hydration: 2.9, sleep: 7.0, weight: 69.8, mood: 9 },
    { date: 'Oct 6', steps: 10800, calories: 2300, hydration: 2.7, sleep: 6.2, weight: 69.9, mood: 7 },
    { date: 'Oct 7', steps: 14500, calories: 2600, hydration: 3.2, sleep: 7.8, weight: 69.7, mood: 9 },
    { date: 'Oct 8', steps: 12800, calories: 2450, hydration: 2.8, sleep: 6.9, weight: 69.6, mood: 8 },
    { date: 'Oct 9', steps: 11200, calories: 2380, hydration: 2.6, sleep: 7.3, weight: 69.5, mood: 8 },
    { date: 'Oct 10', steps: 13800, calories: 2520, hydration: 3.1, sleep: 6.4, weight: 69.4, mood: 7 },
    { date: 'Oct 11', steps: 12500, calories: 2400, hydration: 2.8, sleep: 6.2, weight: 69.3, mood: 8 }
  ];

  const availableMetrics = ['steps', 'calories', 'hydration', 'sleep', 'weight', 'mood'];

  const handleFiltersChange = (newFilters) => {
    setReportFilters(newFilters);
  };

  const handleGenerateReport = () => {
    console.log('Generating comprehensive report with filters:', reportFilters);
  };

  return (
    <>
      <Helmet>
        <title>Progress Reports - VitalTracker</title>
        <meta name="description" content="Comprehensive wellness analytics and insights. Analyze long-term health trends and celebrate achievements through detailed reporting and data visualization." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-card border-b border-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                  <Icon name="BarChart3" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Progress Reports</h1>
                  <p className="text-muted-foreground mt-1">
                    Comprehensive wellness analytics and insights for your health journey
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh Data
                </Button>
                <Button
                  variant="default"
                  onClick={handleGenerateReport}
                  iconName="FileText"
                  iconPosition="left"
                >
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Report Filters */}
            <ReportFilters 
              onFiltersChange={handleFiltersChange}
              selectedFilters={reportFilters}
            />

            {/* Interactive Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <InteractiveChart
                title="Activity & Fitness Trends"
                data={chartData}
                metrics={['steps', 'calories']}
                chartType="line"
              />
              <InteractiveChart
                title="Wellness Metrics Overview"
                data={chartData}
                metrics={['hydration', 'sleep', 'mood']}
                chartType="area"
              />
            </div>

            {/* Comparative Analysis */}
            <ComparativeAnalysis />

            {/* Achievement Timeline */}
            <AchievementTimeline />

            {/* Wellness Insights */}
            <WellnessInsights />

            {/* Export Options */}
            <ExportOptions />

            {/* Summary Statistics */}
            <div className="bg-card rounded-xl p-6 elevation-2 border border-border/40">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Report Summary</h3>
                  <p className="text-sm text-muted-foreground">Key highlights from your wellness journey</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">12,500</div>
                  <div className="text-sm text-muted-foreground">Avg Daily Steps</div>
                  <div className="text-xs text-success mt-1">+23% from last month</div>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">2.8L</div>
                  <div className="text-sm text-muted-foreground">Daily Hydration</div>
                  <div className="text-xs text-success mt-1">+18% improvement</div>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-secondary mb-1">6.2h</div>
                  <div className="text-sm text-muted-foreground">Avg Sleep</div>
                  <div className="text-xs text-warning mt-1">-12% needs attention</div>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-success mb-1">85/100</div>
                  <div className="text-sm text-muted-foreground">Wellness Score</div>
                  <div className="text-xs text-success mt-1">+18 points this month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressReports;