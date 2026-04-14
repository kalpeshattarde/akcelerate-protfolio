import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const StressTestResults = () => {
  const [selectedScenario, setSelectedScenario] = useState('market_crash');
  
  const scenarios = {
    market_crash: {
      name: 'Market Crash (-30%)',
      description: '2008-style market crash scenario',
      probability: 5,
      data: [
        { asset: 'RELIANCE', impact: -28.5 },
        { asset: 'TCS', impact: -32.1 },
        { asset: 'HDFC', impact: -35.8 },
        { asset: 'INFY', impact: -29.7 },
        { asset: 'ICICI', impact: -38.2 },
        { asset: 'HUL', impact: -18.9 }
      ]
    },
    interest_hike: {
      name: 'Interest Rate Hike (+200bps)',
      description: 'Aggressive monetary tightening',
      probability: 15,
      data: [
        { asset: 'RELIANCE', impact: -12.3 },
        { asset: 'TCS', impact: -8.7 },
        { asset: 'HDFC', impact: -22.4 },
        { asset: 'INFY', impact: -9.1 },
        { asset: 'ICICI', impact: -25.6 },
        { asset: 'HUL', impact: -6.8 }
      ]
    },
    inflation_spike: {
      name: 'Inflation Spike (+5%)',
      description: 'Sustained high inflation period',
      probability: 25,
      data: [
        { asset: 'RELIANCE', impact: 8.9 },
        { asset: 'TCS', impact: -15.2 },
        { asset: 'HDFC', impact: -18.7 },
        { asset: 'INFY', impact: -12.4 },
        { asset: 'ICICI', impact: -16.3 },
        { asset: 'HUL', impact: 12.5 }
      ]
    }
  };

  const currentScenario = scenarios?.[selectedScenario];
  
  const portfolioImpact = currentScenario?.data?.reduce((sum, asset) => sum + asset?.impact, 0) / currentScenario?.data?.length;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const value = payload?.[0]?.value;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <p className={`text-sm ${value >= 0 ? 'text-success' : 'text-error'}`}>
            Impact: {value >= 0 ? '+' : ''}{value?.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Stress Test Results</h3>
          <p className="text-sm text-muted-foreground">Portfolio performance under adverse scenarios</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e?.target?.value)}
            className="px-3 py-1 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Object.entries(scenarios)?.map(([key, scenario]) => (
              <option key={key} value={key}>{scenario?.name}</option>
            ))}
          </select>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Scenario</span>
          </div>
          <p className="text-xs text-muted-foreground">{currentScenario?.description}</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Percent" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Probability</span>
          </div>
          <p className="text-lg font-bold text-warning">{currentScenario?.probability}%</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingDown" size={16} className="text-error" />
            <span className="text-sm font-medium text-foreground">Portfolio Impact</span>
          </div>
          <p className={`text-lg font-bold ${portfolioImpact >= 0 ? 'text-success' : 'text-error'}`}>
            {portfolioImpact >= 0 ? '+' : ''}{portfolioImpact?.toFixed(1)}%
          </p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentScenario?.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="asset" 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="impact" 
              fill={(entry) => entry >= 0 ? 'var(--color-success)' : 'var(--color-error)'}
              radius={[2, 2, 0, 0]}
            >
              {currentScenario?.data?.map((entry, index) => (
                <Bar 
                  key={`bar-${index}`} 
                  fill={entry?.impact >= 0 ? 'var(--color-success)' : 'var(--color-error)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last stress test: {new Date()?.toLocaleDateString()}</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Positive Impact</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span>Negative Impact</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressTestResults;