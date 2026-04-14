import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ForecastPeriodSelector = ({ selectedPeriod, onPeriodChange, confidenceInterval, onConfidenceToggle }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const periodOptions = [
    { value: '3', label: '3 Months' },
    { value: '6', label: '6 Months' },
    { value: '12', label: '12 Months' },
    { value: '18', label: '18 Months' },
    { value: '24', label: '24 Months' }
  ];

  const confidenceOptions = [
    { value: '80', label: '80% Confidence' },
    { value: '90', label: '90% Confidence' },
    { value: '95', label: '95% Confidence' }
  ];

  return (
    <div className="flex items-center space-x-4 bg-card p-4 rounded-lg border border-border">
      <div className="flex items-center space-x-2">
        <Icon name="Calendar" size={16} className="text-text-secondary" />
        <span className="text-sm font-medium text-text-primary">Forecast Period:</span>
      </div>

      <Select
        options={periodOptions}
        value={selectedPeriod}
        onChange={onPeriodChange}
        className="w-32"
      />

      <div className="flex items-center space-x-2">
        <Icon name="TrendingUp" size={16} className="text-text-secondary" />
        <span className="text-sm font-medium text-text-primary">Confidence:</span>
      </div>

      <Select
        options={confidenceOptions}
        value={confidenceInterval}
        onChange={onConfidenceToggle}
        className="w-36"
      />

      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
        iconName={isAdvancedOpen ? "ChevronUp" : "ChevronDown"}
        iconPosition="right"
      >
        Advanced
      </Button>

      {isAdvancedOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-modal z-50 p-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">Seasonality</label>
              <Select
                options={[
                  { value: 'auto', label: 'Auto-detect' },
                  { value: 'quarterly', label: 'Quarterly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'none', label: 'None' }
                ]}
                value="auto"
                onChange={() => {}}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">Model Type</label>
              <Select
                options={[
                  { value: 'linear', label: 'Linear Regression' },
                  { value: 'arima', label: 'ARIMA' },
                  { value: 'prophet', label: 'Prophet' },
                  { value: 'ensemble', label: 'Ensemble' }
                ]}
                value="ensemble"
                onChange={() => {}}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">Smoothing</label>
              <Select
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'light', label: 'Light' },
                  { value: 'moderate', label: 'Moderate' },
                  { value: 'heavy', label: 'Heavy' }
                ]}
                value="moderate"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastPeriodSelector;