import React from 'react';
import Header from '../../components/ui/Header';
import GlobalFilterBar from '../../components/ui/GlobalFilterBar';
import DataRefreshIndicator from '../../components/ui/DataRefreshIndicator';
import ExportShareControls from '../../components/ui/ExportShareControls';
import PipelineMetricsCards from './components/PipelineMetricsCards';
import PipelineFlowDiagram from './components/PipelineFlowDiagram';
import AlertsFeed from './components/AlertsFeed';
import OpportunityGrid from './components/OpportunityGrid';
import ConnectionStatus from './components/ConnectionStatus';

const RealTimePipelineMonitoringDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Consistent spacing wrapper */}
      <div className="px-6 py-6">
        {/* Dashboard Header with consistent spacing */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Real-Time Pipeline Monitoring
              </h1>
              <p className="text-text-secondary">
                Live pipeline intelligence with bottleneck identification and alert systems
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <ConnectionStatus />
              <DataRefreshIndicator />
              <ExportShareControls />
            </div>
          </div>
        </div>

        {/* Global Filter Bar moved below header with consistent spacing */}
        <div className="mb-8">
          <GlobalFilterBar />
        </div>

        {/* Metrics Cards with consistent spacing */}
        <div className="mb-8">
          <PipelineMetricsCards />
        </div>

        {/* Main Content Grid - Fixed responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Pipeline Flow Diagram - Takes 8 columns on lg screens */}
          <div className="lg:col-span-8">
            <PipelineFlowDiagram />
          </div>
          
          {/* Alerts Feed - Takes 4 columns on lg screens with proper constraints */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <AlertsFeed />
            </div>
          </div>
        </div>

        {/* Opportunity Grid - Full width with proper spacing */}
        <div className="mt-8">
          <OpportunityGrid />
        </div>
      </div>
    </div>
  );
};

export default RealTimePipelineMonitoringDashboard;