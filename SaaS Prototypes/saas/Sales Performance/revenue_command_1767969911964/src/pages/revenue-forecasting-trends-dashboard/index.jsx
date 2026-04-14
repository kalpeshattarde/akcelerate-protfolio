import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import GlobalFilterBar from '../../components/ui/GlobalFilterBar';
import DataRefreshIndicator from '../../components/ui/DataRefreshIndicator';
import ExportShareControls from '../../components/ui/ExportShareControls';
import ForecastPeriodSelector from './components/ForecastPeriodSelector';
import RevenueForecastChart from './components/RevenueForecastChart';
import ForecastMetricsGrid from './components/ForecastMetricsGrid';
import CorrelationMatrix from './components/CorrelationMatrix';
import TerritoryForecastTable from './components/TerritoryForecastTable';
import ScenarioModelingTools from './components/ScenarioModelingTools';

const RevenueForecastingTrendsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('12');
  const [confidenceInterval, setConfidenceInterval] = useState('90');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Consistent spacing wrapper */}
      <div className="px-6 py-6">
        {/* Dashboard Header with consistent spacing */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Revenue Forecasting & Trends
              </h1>
              <p className="text-text-secondary">
                Predictive analytics and historical trend analysis for strategic revenue planning
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <DataRefreshIndicator />
              <ExportShareControls />
            </div>
          </div>
        </div>

        {/* Global Filter Bar moved below header with consistent spacing */}
        <div className="mb-8">
          <GlobalFilterBar />
        </div>

        {/* Forecast Controls with consistent spacing */}
        <div className="mb-8">
          <ForecastPeriodSelector
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            confidenceInterval={confidenceInterval}
            onConfidenceToggle={setConfidenceInterval}
          />
        </div>

        {/* Main Forecast Chart */}
        <div className="mb-8">
          <RevenueForecastChart
            selectedPeriod={selectedPeriod}
            confidenceInterval={confidenceInterval}
          />
        </div>

        {/* Forecast Metrics Grid */}
        <div className="mb-8">
          <ForecastMetricsGrid />
        </div>

        {/* Scenario Modeling Tools */}
        <div className="mb-8">
          <ScenarioModelingTools />
        </div>

        {/* Advanced Analytics Section */}
        <div className="grid grid-cols-1 xl:grid-cols-1 gap-8 mb-8">
          <CorrelationMatrix />
        </div>

        {/* Territory Breakdown */}
        <div className="mb-8">
          <TerritoryForecastTable />
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center space-x-4">
              <span>© {new Date().getFullYear()} Revenue Command. All rights reserved.</span>
              <span>•</span>
              <span>Forecast model accuracy: 87.3%</span>
              <span>•</span>
              <span>Last model update: 6 hours ago</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Powered by advanced ML algorithms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueForecastingTrendsDashboard;