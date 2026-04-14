import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CorrelationMatrix = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const correlationData = [
    {
      metric: 'Revenue',
      key: 'revenue',
      correlations: {
        revenue: 1.00,
        pipeline: 0.87,
        leads: 0.72,
        activities: 0.65,
        deals: 0.91,
        winRate: 0.58,
        avgDeal: 0.43,
        cycleTime: -0.34
      }
    },
    {
      metric: 'Pipeline Value',
      key: 'pipeline',
      correlations: {
        revenue: 0.87,
        pipeline: 1.00,
        leads: 0.79,
        activities: 0.71,
        deals: 0.83,
        winRate: 0.52,
        avgDeal: 0.38,
        cycleTime: -0.29
      }
    },
    {
      metric: 'Lead Volume',
      key: 'leads',
      correlations: {
        revenue: 0.72,
        pipeline: 0.79,
        leads: 1.00,
        activities: 0.84,
        deals: 0.68,
        winRate: 0.31,
        avgDeal: 0.22,
        cycleTime: -0.18
      }
    },
    {
      metric: 'Sales Activities',
      key: 'activities',
      correlations: {
        revenue: 0.65,
        pipeline: 0.71,
        leads: 0.84,
        activities: 1.00,
        deals: 0.59,
        winRate: 0.41,
        avgDeal: 0.19,
        cycleTime: -0.25
      }
    },
    {
      metric: 'Closed Deals',
      key: 'deals',
      correlations: {
        revenue: 0.91,
        pipeline: 0.83,
        leads: 0.68,
        activities: 0.59,
        deals: 1.00,
        winRate: 0.67,
        avgDeal: 0.54,
        cycleTime: -0.42
      }
    },
    {
      metric: 'Win Rate',
      key: 'winRate',
      correlations: {
        revenue: 0.58,
        pipeline: 0.52,
        leads: 0.31,
        activities: 0.41,
        deals: 0.67,
        winRate: 1.00,
        avgDeal: 0.33,
        cycleTime: -0.51
      }
    },
    {
      metric: 'Avg Deal Size',
      key: 'avgDeal',
      correlations: {
        revenue: 0.43,
        pipeline: 0.38,
        leads: 0.22,
        activities: 0.19,
        deals: 0.54,
        winRate: 0.33,
        avgDeal: 1.00,
        cycleTime: -0.28
      }
    },
    {
      metric: 'Sales Cycle',
      key: 'cycleTime',
      correlations: {
        revenue: -0.34,
        pipeline: -0.29,
        leads: -0.18,
        activities: -0.25,
        deals: -0.42,
        winRate: -0.51,
        avgDeal: -0.28,
        cycleTime: 1.00
      }
    }
  ];

  const getCorrelationColor = (value) => {
    const absValue = Math.abs(value);
    if (absValue >= 0.8) return value > 0 ? 'bg-success text-white' : 'bg-error text-white';
    if (absValue >= 0.6) return value > 0 ? 'bg-success/70 text-white' : 'bg-error/70 text-white';
    if (absValue >= 0.4) return value > 0 ? 'bg-success/40 text-text-primary' : 'bg-error/40 text-text-primary';
    if (absValue >= 0.2) return value > 0 ? 'bg-success/20 text-text-primary' : 'bg-error/20 text-text-primary';
    return 'bg-muted text-text-secondary';
  };

  const getCorrelationStrength = (value) => {
    const absValue = Math.abs(value);
    if (absValue >= 0.8) return 'Very Strong';
    if (absValue >= 0.6) return 'Strong';
    if (absValue >= 0.4) return 'Moderate';
    if (absValue >= 0.2) return 'Weak';
    return 'Very Weak';
  };

  const selectedData = correlationData.find(item => item.key === selectedMetric);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Leading Indicators Correlation</h3>
          <p className="text-sm text-text-secondary">
            Correlation strength between revenue drivers and outcomes
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconSize={16}
          >
            Export Matrix
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconSize={16}
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Correlation Matrix */}
        <div className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2 text-sm font-medium text-text-secondary">Metric</th>
                  {correlationData.map((item) => (
                    <th key={item.key} className="text-center p-2 text-xs font-medium text-text-secondary min-w-16">
                      {item.metric.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {correlationData.map((row) => (
                  <tr key={row.key} className="border-t border-border">
                    <td className="p-2 text-sm font-medium text-text-primary">
                      {row.metric}
                    </td>
                    {correlationData.map((col) => (
                      <td key={col.key} className="p-1">
                        <button
                          onClick={() => setSelectedMetric(row.key)}
                          className={`
                            w-12 h-8 rounded text-xs font-medium transition-all hover:scale-105
                            ${getCorrelationColor(row.correlations[col.key])}
                            ${selectedMetric === row.key ? 'ring-2 ring-primary ring-offset-1' : ''}
                          `}
                        >
                          {row.correlations[col.key].toFixed(2)}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Correlation Details */}
        <div className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">
              {selectedData?.metric} Correlations
            </h4>
            <div className="space-y-2">
              {Object.entries(selectedData?.correlations || {})
                .filter(([key]) => key !== selectedMetric)
                .sort(([,a], [,b]) => Math.abs(b) - Math.abs(a))
                .slice(0, 5)
                .map(([key, value]) => {
                  const metric = correlationData.find(item => item.key === key);
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">{metric?.metric}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${value > 0 ? 'text-success' : 'text-error'}`}>
                          {value.toFixed(2)}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {getCorrelationStrength(value)}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Correlation Strength</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-success rounded" />
                <span className="text-sm text-text-secondary">Strong Positive (0.6+)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-success/40 rounded" />
                <span className="text-sm text-text-secondary">Moderate Positive (0.4-0.6)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-muted rounded" />
                <span className="text-sm text-text-secondary">Weak (0.0-0.4)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-error/40 rounded" />
                <span className="text-sm text-text-secondary">Moderate Negative (-0.4 to -0.6)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-error rounded" />
                <span className="text-sm text-text-secondary">Strong Negative (-0.6+)</span>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-primary mb-2">Key Insights</h4>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Closed deals show strongest revenue correlation (0.91)</li>
                  <li>• Pipeline value is highly predictive (0.87)</li>
                  <li>• Shorter sales cycles improve win rates (-0.51)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrelationMatrix;