import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FacilityTreeSidebar from './components/FacilityTreeSidebar';
import DataEntryGrid from './components/DataEntryGrid';
import MetricDetailsPanel from './components/MetricDetailsPanel';
import BulkImportToolbar from './components/BulkImportToolbar';
import IntegrationStatusBar from './components/IntegrationStatusBar';

const ESGDataCollectionInterface = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showMetricDetails, setShowMetricDetails] = useState(false);
  const [userRole] = useState('esg-manager');

  // Auto-select first facility on load
  useEffect(() => {
    const mockFacility = {
      id: 'facility-1',
      name: 'Manufacturing Plant - Austin',
      location: 'Austin, TX',
      completionRate: 85
    };
    setSelectedFacility(mockFacility);
  }, []);

  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
    setSelectedDepartment(null);
    setSelectedMetric(null);
    setShowMetricDetails(false);
  };

  const handleDepartmentSelect = (department, facility) => {
    setSelectedDepartment(department);
    setSelectedFacility(facility);
    setSelectedMetric(null);
    setShowMetricDetails(false);
  };

  const handleMetricSelect = (metric) => {
    setSelectedMetric(metric);
    setShowMetricDetails(true);
  };

  const handleMetricDetailsClose = () => {
    setShowMetricDetails(false);
    setSelectedMetric(null);
  };

  const handleDataChange = (metricId, field, value) => {
    console.log('Data changed:', { metricId, field, value });
    // Handle data change logic here
  };

  const handleMetricSave = (metricId, formData) => {
    console.log('Metric saved:', { metricId, formData });
    // Handle metric save logic here
  };

  const handleImportComplete = (importedData) => {
    console.log('Import completed:', importedData);
    // Handle import completion logic here
  };

  const handleIntegrationRefresh = () => {
    console.log('Integration refresh triggered');
    // Handle integration refresh logic here
  };

  return (
    <>
      <Helmet>
        <title>ESG Data Collection Interface - ESG Dashboard Pro</title>
        <meta name="description" content="Streamlined sustainability data entry and validation workflows for environmental analysts and department heads." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header userRole={userRole} />
        
        <div className="pt-16 h-screen flex">
          {/* Left Sidebar - Facility Tree (25%) */}
          <div className="w-1/4 min-w-[300px] max-w-[400px]">
            <FacilityTreeSidebar
              selectedFacility={selectedFacility}
              selectedDepartment={selectedDepartment}
              onFacilitySelect={handleFacilitySelect}
              onDepartmentSelect={handleDepartmentSelect}
            />
          </div>

          {/* Center Panel - Data Entry Grid (50%) */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 space-y-4">
              <IntegrationStatusBar onRefresh={handleIntegrationRefresh} />
              <BulkImportToolbar
                selectedFacility={selectedFacility}
                selectedDepartment={selectedDepartment}
                onImportComplete={handleImportComplete}
              />
            </div>
            
            <div className="flex-1">
              <DataEntryGrid
                selectedFacility={selectedFacility}
                selectedDepartment={selectedDepartment}
                selectedMetric={selectedMetric}
                onMetricSelect={handleMetricSelect}
                onDataChange={handleDataChange}
              />
            </div>
          </div>

          {/* Right Panel - Metric Details (25%) */}
          {showMetricDetails && (
            <div className="w-1/4 min-w-[300px] max-w-[400px]">
              <MetricDetailsPanel
                selectedMetric={selectedMetric}
                onClose={handleMetricDetailsClose}
                onSave={handleMetricSave}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ESGDataCollectionInterface;