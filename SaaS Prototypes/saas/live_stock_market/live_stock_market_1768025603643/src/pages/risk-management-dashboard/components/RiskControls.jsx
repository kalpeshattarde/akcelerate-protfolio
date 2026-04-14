import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RiskControls = () => {
  const [riskModel, setRiskModel] = useState('var');
  const [confidenceLevel, setConfidenceLevel] = useState(95);
  const [timeHorizon, setTimeHorizon] = useState(1);
  const [autoRebalance, setAutoRebalance] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const riskLimits = [
    { 
      id: 'portfolio_var', 
      name: 'Portfolio VaR', 
      current: 2.34, 
      limit: 3.0, 
      unit: '%', 
      status: 'safe',
      description: 'Maximum daily loss at 95% confidence'
    },
    { 
      id: 'sector_concentration', 
      name: 'Sector Concentration', 
      current: 28.5, 
      limit: 30.0, 
      unit: '%', 
      status: 'warning',
      description: 'Maximum allocation to any single sector'
    },
    { 
      id: 'single_stock', 
      name: 'Single Stock Limit', 
      current: 15.2, 
      limit: 20.0, 
      unit: '%', 
      status: 'safe',
      description: 'Maximum allocation to individual stock'
    },
    { 
      id: 'beta_exposure', 
      name: 'Beta Exposure', 
      current: 1.23, 
      limit: 1.5, 
      unit: '', 
      status: 'safe',
      description: 'Portfolio sensitivity to market movements'
    },
    { 
      id: 'correlation_risk', 
      name: 'Correlation Risk', 
      current: 0.67, 
      limit: 0.8, 
      unit: '', 
      status: 'warning',
      description: 'Average correlation between holdings'
    }
  ];

  const rebalancingRules = [
    { id: 'drift_threshold', name: 'Drift Threshold', value: 5, unit: '%', enabled: true },
    { id: 'rebalance_frequency', name: 'Rebalance Frequency', value: 'Monthly', unit: '', enabled: true },
    { id: 'tax_optimization', name: 'Tax Loss Harvesting', value: 'Enabled', unit: '', enabled: true },
    { id: 'minimum_trade', name: 'Minimum Trade Size', value: 10000, unit: '₹', enabled: false }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'danger':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'safe':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'warning':
        return <Icon name="AlertCircle" size={16} className="text-warning" />;
      case 'danger':
        return <Icon name="AlertTriangle" size={16} className="text-error" />;
      default:
        return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  const getProgressPercentage = (current, limit) => {
    return Math.min(100, (current / limit) * 100);
  };

  const handleLimitUpdate = (limitId, newValue) => {
    console.log(`Updating ${limitId} to ${newValue}`);
  };

  const handleRebalance = () => {
    console.log('Triggering portfolio rebalance...');
  };

  return (
    <div className="space-y-6">
      {/* Risk Model Configuration */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Risk Model Configuration</h3>
            <p className="text-sm text-muted-foreground">Configure risk calculation parameters</p>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={14} className="mr-2" />
            Advanced
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Risk Model</label>
            <select
              value={riskModel}
              onChange={(e) => setRiskModel(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="var">Value at Risk (VaR)</option>
              <option value="cvar">Conditional VaR (CVaR)</option>
              <option value="monte_carlo">Monte Carlo</option>
              <option value="historical">Historical Simulation</option>
            </select>
          </div>

          <div>
            <Input
              label="Confidence Level (%)"
              type="number"
              value={confidenceLevel}
              onChange={(e) => setConfidenceLevel(e?.target?.value)}
              min="90"
              max="99"
              className="w-full"
            />
          </div>

          <div>
            <Input
              label="Time Horizon (Days)"
              type="number"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e?.target?.value)}
              min="1"
              max="30"
              className="w-full"
            />
          </div>
        </div>
      </div>
      {/* Risk Limits */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Risk Limits</h3>
            <p className="text-sm text-muted-foreground">Monitor and adjust portfolio risk thresholds</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="alerts"
                checked={alertsEnabled}
                onChange={(e) => setAlertsEnabled(e?.target?.checked)}
                className="rounded border-border"
              />
              <label htmlFor="alerts" className="text-sm text-foreground">Enable Alerts</label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {riskLimits?.map((limit) => (
            <div key={limit?.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(limit?.status)}
                  <div>
                    <h4 className="font-medium text-foreground">{limit?.name}</h4>
                    <p className="text-xs text-muted-foreground">{limit?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getStatusColor(limit?.status)}`}>
                    {limit?.current}{limit?.unit}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Limit: {limit?.limit}{limit?.unit}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current vs Limit</span>
                  <span>{getProgressPercentage(limit?.current, limit?.limit)?.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      limit?.status === 'safe' ? 'bg-success' : 
                      limit?.status === 'warning' ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${getProgressPercentage(limit?.current, limit?.limit)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Rebalancing Controls */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Rebalancing Controls</h3>
            <p className="text-sm text-muted-foreground">Automated portfolio rebalancing settings</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="auto-rebalance"
                checked={autoRebalance}
                onChange={(e) => setAutoRebalance(e?.target?.checked)}
                className="rounded border-border"
              />
              <label htmlFor="auto-rebalance" className="text-sm text-foreground">Auto Rebalance</label>
            </div>
            <Button variant="primary" size="sm" onClick={handleRebalance}>
              <Icon name="RefreshCw" size={14} className="mr-2" />
              Rebalance Now
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rebalancingRules?.map((rule) => (
            <div key={rule?.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={rule?.enabled}
                    onChange={() => {}}
                    className="rounded border-border"
                  />
                  <span className="font-medium text-foreground">{rule?.name}</span>
                </div>
                <span className="text-sm text-primary">
                  {rule?.value}{rule?.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* What-If Analysis */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">What-If Analysis</h3>
            <p className="text-sm text-muted-foreground">Simulate portfolio changes and risk impact</p>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Calculator" size={14} className="mr-2" />
            Run Analysis
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Asset to Modify"
              type="text"
              placeholder="Enter stock symbol"
              className="mb-4"
            />
            <Input
              label="New Allocation (%)"
              type="number"
              placeholder="Enter percentage"
              min="0"
              max="100"
            />
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Impact Preview</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">VaR Change:</span>
                <span className="text-warning">+0.12%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Beta Change:</span>
                <span className="text-success">-0.05</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sector Concentration:</span>
                <span className="text-error">+2.3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskControls;