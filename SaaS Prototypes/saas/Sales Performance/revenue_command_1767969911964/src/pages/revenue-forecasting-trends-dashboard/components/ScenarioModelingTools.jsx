import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const ScenarioModelingTools = () => {
  const [activeScenario, setActiveScenario] = useState('base');
  const [isModelingOpen, setIsModelingOpen] = useState(false);
  const [scenarios, setScenarios] = useState({
    optimistic: {
      name: 'Optimistic',
      assumptions: {
        winRate: 35,
        avgDealSize: 125000,
        salesCycle: 45,
        leadVolume: 120
      },
      forecast: 18500000,
      probability: 25
    },
    base: {
      name: 'Base Case',
      assumptions: {
        winRate: 28,
        avgDealSize: 95000,
        salesCycle: 60,
        leadVolume: 100
      },
      forecast: 14200000,
      probability: 50
    },
    conservative: {
      name: 'Conservative',
      assumptions: {
        winRate: 22,
        avgDealSize: 75000,
        salesCycle: 75,
        leadVolume: 85
      },
      forecast: 10800000,
      probability: 25
    }
  });

  const [customScenario, setCustomScenario] = useState({
    name: 'Custom Scenario',
    assumptions: {
      winRate: 28,
      avgDealSize: 95000,
      salesCycle: 60,
      leadVolume: 100
    }
  });

  const handleAssumptionChange = (key, value) => {
    setCustomScenario(prev => ({
      ...prev,
      assumptions: {
        ...prev.assumptions,
        [key]: parseFloat(value) || 0
      }
    }));
  };

  const calculateForecast = (assumptions) => {
    const { winRate, avgDealSize, salesCycle, leadVolume } = assumptions;
    const monthlyDeals = (leadVolume * (winRate / 100)) / (salesCycle / 30);
    const monthlyRevenue = monthlyDeals * avgDealSize;
    return Math.round(monthlyRevenue * 12);
  };

  const getScenarioColor = (scenario) => {
    const colors = {
      optimistic: 'border-success bg-success/5 text-success',
      base: 'border-primary bg-primary/5 text-primary',
      conservative: 'border-warning bg-warning/5 text-warning'
    };
    return colors[scenario] || colors.base;
  };

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const assumptionFields = [
    {
      key: 'winRate',
      label: 'Win Rate (%)',
      type: 'number',
      min: 0,
      max: 100,
      step: 0.1,
      suffix: '%'
    },
    {
      key: 'avgDealSize',
      label: 'Avg Deal Size ($)',
      type: 'number',
      min: 0,
      step: 1000,
      prefix: '$'
    },
    {
      key: 'salesCycle',
      label: 'Sales Cycle (days)',
      type: 'number',
      min: 1,
      step: 1,
      suffix: ' days'
    },
    {
      key: 'leadVolume',
      label: 'Monthly Leads',
      type: 'number',
      min: 0,
      step: 1,
      suffix: ' leads'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Scenario Modeling</h3>
          <p className="text-sm text-text-secondary">
            Adjust key assumptions to model different revenue scenarios
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModelingOpen(!isModelingOpen)}
            iconName={isModelingOpen ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isModelingOpen ? 'Hide' : 'Show'} Modeling Tools
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Save"
            iconSize={16}
          >
            Save Scenario
          </Button>
        </div>
      </div>

      {/* Scenario Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <div
            key={key}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-card
              ${activeScenario === key ? getScenarioColor(key) : 'border-border bg-card'}
            `}
            onClick={() => setActiveScenario(key)}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{scenario.name}</h4>
              <span className="text-sm opacity-75">{scenario.probability}%</span>
            </div>
            
            <div className="text-2xl font-bold mb-2">
              {formatCurrency(scenario.forecast)}
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-text-secondary">Win Rate:</span>
                <div className="font-medium">{scenario.assumptions.winRate}%</div>
              </div>
              <div>
                <span className="text-text-secondary">Avg Deal:</span>
                <div className="font-medium">${(scenario.assumptions.avgDealSize / 1000).toFixed(0)}K</div>
              </div>
              <div>
                <span className="text-text-secondary">Cycle:</span>
                <div className="font-medium">{scenario.assumptions.salesCycle}d</div>
              </div>
              <div>
                <span className="text-text-secondary">Leads:</span>
                <div className="font-medium">{scenario.assumptions.leadVolume}/mo</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modeling Tools */}
      {isModelingOpen && (
        <div className="border-t border-border pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assumption Inputs */}
            <div>
              <h4 className="font-medium text-text-primary mb-4">Adjust Assumptions</h4>
              <div className="space-y-4">
                {assumptionFields.map((field) => (
                  <div key={field.key}>
                    <Input
                      label={field.label}
                      type={field.type}
                      value={customScenario.assumptions[field.key]}
                      onChange={(e) => handleAssumptionChange(field.key, e.target.value)}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-text-primary">Calculated Forecast:</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(calculateForecast(customScenario.assumptions))}
                  </span>
                </div>
              </div>
            </div>

            {/* Sensitivity Analysis */}
            <div>
              <h4 className="font-medium text-text-primary mb-4">Sensitivity Analysis</h4>
              <div className="space-y-4">
                {assumptionFields.map((field) => {
                  const baseValue = scenarios.base.assumptions[field.key];
                  const currentValue = customScenario.assumptions[field.key];
                  const impact = ((currentValue - baseValue) / baseValue) * 100;
                  
                  return (
                    <div key={field.key} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div>
                        <div className="font-medium text-text-primary">{field.label}</div>
                        <div className="text-sm text-text-secondary">
                          Base: {baseValue}{field.suffix || ''}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${impact > 0 ? 'text-success' : impact < 0 ? 'text-error' : 'text-text-secondary'}`}>
                          {impact > 0 ? '+' : ''}{impact.toFixed(1)}%
                        </div>
                        <div className="text-sm text-text-secondary">impact</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Monte Carlo Simulation */}
              <div className="mt-6 p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-text-primary">Monte Carlo Simulation</h5>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Play"
                    iconSize={14}
                  >
                    Run Simulation
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="text-center">
                    <div className="text-text-secondary">P10</div>
                    <div className="font-medium text-error">$9.2M</div>
                  </div>
                  <div className="text-center">
                    <div className="text-text-secondary">P50</div>
                    <div className="font-medium text-primary">$14.2M</div>
                  </div>
                  <div className="text-center">
                    <div className="text-text-secondary">P90</div>
                    <div className="font-medium text-success">$19.8M</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioModelingTools;