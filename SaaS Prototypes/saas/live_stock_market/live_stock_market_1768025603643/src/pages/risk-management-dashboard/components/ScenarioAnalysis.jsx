import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScenarioAnalysis = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [analysisType, setAnalysisType] = useState('monte_carlo');
  
  const timeframes = ['3M', '6M', '1Y', '2Y', '5Y'];
  
  const monteCarloData = [
    { period: 'Jan', p5: -15.2, p25: -8.1, p50: 2.3, p75: 12.7, p95: 24.8 },
    { period: 'Feb', p5: -18.7, p25: -9.4, p50: 1.8, p75: 13.2, p95: 26.1 },
    { period: 'Mar', p5: -16.3, p25: -7.8, p50: 3.1, p75: 14.5, p95: 28.3 },
    { period: 'Apr', p5: -14.9, p25: -6.2, p50: 4.7, p75: 15.8, p95: 29.7 },
    { period: 'May', p5: -13.1, p25: -4.8, p50: 6.2, p75: 17.3, p95: 31.2 },
    { period: 'Jun', p5: -11.7, p25: -3.4, p50: 7.8, p75: 18.9, p95: 32.8 },
    { period: 'Jul', p5: -10.2, p25: -2.1, p50: 9.3, p75: 20.4, p95: 34.1 },
    { period: 'Aug', p5: -8.9, p25: -0.7, p50: 10.8, p75: 21.7, p95: 35.6 },
    { period: 'Sep', p5: -7.4, p25: 0.8, p50: 12.4, p75: 23.2, p95: 37.1 },
    { period: 'Oct', p5: -6.1, p25: 2.3, p50: 13.9, p75: 24.8, p95: 38.7 },
    { period: 'Nov', p5: -4.7, p25: 3.8, p50: 15.5, p75: 26.3, p95: 40.2 },
    { period: 'Dec', p5: -3.2, p25: 5.4, p50: 17.1, p75: 27.9, p95: 41.8 }
  ];

  const scenarioOutcomes = [
    { scenario: 'Bull Market', probability: 25, return: 28.5, description: 'Strong economic growth, low rates' },
    { scenario: 'Base Case', probability: 40, return: 12.3, description: 'Moderate growth, stable conditions' },
    { scenario: 'Bear Market', probability: 20, return: -8.7, description: 'Economic slowdown, market correction' },
    { scenario: 'Recession', probability: 10, return: -22.4, description: 'Severe economic contraction' },
    { scenario: 'Black Swan', probability: 5, return: -35.8, description: 'Extreme market disruption' }
  ];

  const expectedReturn = scenarioOutcomes?.reduce((sum, scenario) => 
    sum + (scenario?.probability / 100) * scenario?.return, 0
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value?.toFixed(1)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getScenarioColor = (scenario) => {
    switch (scenario) {
      case 'Bull Market':
        return 'text-success border-success/20 bg-success/5';
      case 'Base Case':
        return 'text-primary border-primary/20 bg-primary/5';
      case 'Bear Market':
        return 'text-warning border-warning/20 bg-warning/5';
      case 'Recession':
        return 'text-error border-error/20 bg-error/5';
      case 'Black Swan':
        return 'text-destructive border-destructive/20 bg-destructive/5';
      default:
        return 'text-muted-foreground border-border bg-card';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Scenario Analysis</h3>
          <p className="text-sm text-muted-foreground">Portfolio performance under various market conditions</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {timeframes?.map(tf => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  selectedTimeframe === tf 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monte Carlo Simulation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Monte Carlo Simulation</h4>
            <div className="text-sm text-muted-foreground">10,000 simulations</div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monteCarloData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="period" 
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <YAxis 
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="p95" 
                  stackId="1" 
                  stroke="var(--color-success)" 
                  fill="var(--color-success)" 
                  fillOpacity={0.1}
                  name="95th Percentile"
                />
                <Area 
                  type="monotone" 
                  dataKey="p75" 
                  stackId="1" 
                  stroke="var(--color-primary)" 
                  fill="var(--color-primary)" 
                  fillOpacity={0.2}
                  name="75th Percentile"
                />
                <Line 
                  type="monotone" 
                  dataKey="p50" 
                  stroke="var(--color-foreground)" 
                  strokeWidth={2}
                  name="Median"
                />
                <Area 
                  type="monotone" 
                  dataKey="p25" 
                  stackId="2" 
                  stroke="var(--color-warning)" 
                  fill="var(--color-warning)" 
                  fillOpacity={0.2}
                  name="25th Percentile"
                />
                <Area 
                  type="monotone" 
                  dataKey="p5" 
                  stackId="2" 
                  stroke="var(--color-error)" 
                  fill="var(--color-error)" 
                  fillOpacity={0.1}
                  name="5th Percentile"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scenario Outcomes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Scenario Outcomes</h4>
            <div className="text-sm font-medium text-primary">
              Expected Return: {expectedReturn?.toFixed(1)}%
            </div>
          </div>
          
          <div className="space-y-3">
            {scenarioOutcomes?.map((scenario) => (
              <div 
                key={scenario?.scenario}
                className={`p-4 rounded-lg border ${getScenarioColor(scenario?.scenario)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{scenario?.scenario}</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full">
                      {scenario?.probability}%
                    </span>
                  </div>
                  <span className={`font-bold ${
                    scenario?.return >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {scenario?.return >= 0 ? '+' : ''}{scenario?.return}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{scenario?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground">Value at Risk (95%)</div>
            <div className="text-lg font-bold text-error">-₹2,34,567</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Expected Shortfall</div>
            <div className="text-lg font-bold text-error">-₹3,78,912</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Confidence Level</div>
            <div className="text-lg font-bold text-primary">95%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioAnalysis;