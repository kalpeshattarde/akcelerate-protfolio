import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueForecastChart = ({ selectedPeriod, confidenceInterval }) => {
  const [selectedScenario, setSelectedScenario] = useState('base');
  const [showConfidenceBands, setShowConfidenceBands] = useState(true);

  const generateForecastData = () => {
    const months = ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024', 'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025'];
    
    return months.slice(0, parseInt(selectedPeriod) + 6).map((month, index) => {
      const isHistorical = index < 6;
      const baseRevenue = 2500000 + (index * 150000) + (Math.sin(index * 0.5) * 200000);
      
      if (isHistorical) {
        return {
          month,
          actual: Math.round(baseRevenue + (Math.random() - 0.5) * 300000),
          pipeline: Math.round(baseRevenue * 0.7),
          isHistorical: true
        };
      } else {
        const scenarios = {
          optimistic: baseRevenue * 1.15,
          base: baseRevenue,
          conservative: baseRevenue * 0.85
        };
        
        const confidenceMultiplier = parseInt(confidenceInterval) / 100;
        const variance = baseRevenue * (1 - confidenceMultiplier) * 0.5;
        
        return {
          month,
          forecast: Math.round(scenarios[selectedScenario]),
          upperBound: Math.round(scenarios[selectedScenario] + variance),
          lowerBound: Math.round(scenarios[selectedScenario] - variance),
          pipeline: Math.round(baseRevenue * 0.8),
          isHistorical: false
        };
      }
    });
  };

  const data = generateForecastData();

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-text-secondary">{entry.name}:</span>
              <span className="font-medium text-text-primary">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Revenue Forecast</h3>
          <p className="text-sm text-text-secondary">
            Historical actuals vs predicted revenue with {confidenceInterval}% confidence bands
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Scenario:</span>
            <div className="flex bg-muted rounded-lg p-1">
              {['conservative', 'base', 'optimistic'].map((scenario) => (
                <button
                  key={scenario}
                  onClick={() => setSelectedScenario(scenario)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedScenario === scenario
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConfidenceBands(!showConfidenceBands)}
            iconName={showConfidenceBands ? "EyeOff" : "Eye"}
            iconSize={16}
          >
            Confidence Bands
          </Button>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Historical Actual Revenue */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="Actual Revenue"
              connectNulls={false}
            />
            
            {/* Pipeline Revenue */}
            <Line
              type="monotone"
              dataKey="pipeline"
              stroke="var(--color-secondary)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 3 }}
              name="Pipeline Revenue"
            />
            
            {/* Forecast Revenue */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="var(--color-accent)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              name="Forecast Revenue"
              connectNulls={false}
            />
            
            {/* Confidence Bands */}
            {showConfidenceBands && (
              <>
                <Line
                  type="monotone"
                  dataKey="upperBound"
                  stroke="var(--color-accent)"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  dot={false}
                  name="Upper Bound"
                  opacity={0.6}
                />
                <Line
                  type="monotone"
                  dataKey="lowerBound"
                  stroke="var(--color-accent)"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  dot={false}
                  name="Lower Bound"
                  opacity={0.6}
                />
              </>
            )}
            
            {/* Current Date Reference Line */}
            <ReferenceLine 
              x="Jun 2024" 
              stroke="var(--color-text-secondary)" 
              strokeDasharray="3 3"
              label={{ value: "Today", position: "top" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-text-secondary">Historical Actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full" />
            <span className="text-text-secondary">Pipeline</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-text-secondary">Forecast</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Info" size={14} />
          <span>Model accuracy: 87.3% | Last updated: 2 hours ago</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueForecastChart;