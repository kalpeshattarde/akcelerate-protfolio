import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const BenchmarkingControls = ({ onFiltersChange }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('digital-marketing');
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');
  const [competitorToggle, setCompetitorToggle] = useState(true);

  const industryOptions = [
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'saas', label: 'SaaS & Technology' },
  { value: 'fintech', label: 'Financial Services' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'retail', label: 'Retail & Consumer' }];


  const periodOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'semi-annual', label: 'Semi-Annual' },
  { value: 'annual', label: 'Annual' }];


  const handleIndustryChange = (value) => {
    setSelectedIndustry(value);
    onFiltersChange?.({ industry: value, period: selectedPeriod, showCompetitors: competitorToggle });
  };

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
    onFiltersChange?.({ industry: selectedIndustry, period: value, showCompetitors: competitorToggle });
  };

  const handleCompetitorToggle = () => {
    const newToggle = !competitorToggle;
    setCompetitorToggle(newToggle);
    onFiltersChange?.({ industry: selectedIndustry, period: selectedPeriod, showCompetitors: newToggle });
  };

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        <div className="flex items-center space-x-2">
          <Icon name="Settings2" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Benchmark Configuration
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-48">
            <Select
              label="Industry Segment"
              options={industryOptions}
              value={selectedIndustry}
              onChange={handleIndustryChange} />


          </div>
          
          <div className="w-full sm:w-40">
            <Select
              label="Period"
              options={periodOptions}
              value={selectedPeriod}
              onChange={handlePeriodChange} />


          </div>
          
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-foreground">
              Show Competitors
            </label>
            <button
              onClick={handleCompetitorToggle}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                ${competitorToggle ? 'bg-primary' : 'bg-muted'}
              `}>

              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                  ${competitorToggle ? 'translate-x-6' : 'translate-x-1'}
                `} />

            </button>
          </div>
          
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            className="whitespace-nowrap">

            Refresh Data
          </Button>
        </div>
      </div>
    </div>);

};

export default BenchmarkingControls;