import React from 'react';
import Icon from 'components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ComparisonPanel = ({ scenarios, onClose }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Prepare chart data
  const chartData = scenarios.map((scenario, index) => ({
    name: `Scenario ${index + 1}`,
    fullName: scenario.name,
    totalPayout: scenario.totalProjectedPayout,
    spifPercentage: scenario.modifiers.spifPercentage,
    acceleratorRate: scenario.modifiers.acceleratorRate,
    bonusMultiplier: scenario.modifiers.bonusMultiplier,
    affectedReps: scenario.affectedRepCount
  }));

  // Calculate variance analysis
  const calculateVariance = () => {
    if (scenarios.length < 2) return null;

    const baseline = scenarios[0];
    const comparisons = scenarios.slice(1).map(scenario => ({
      scenario,
      payoutDelta: scenario.totalProjectedPayout - baseline.totalProjectedPayout,
      payoutDeltaPercent: ((scenario.totalProjectedPayout - baseline.totalProjectedPayout) / baseline.totalProjectedPayout) * 100,
      repCountDelta: scenario.affectedRepCount - baseline.affectedRepCount,
      spifDelta: scenario.modifiers.spifPercentage - baseline.modifiers.spifPercentage,
      acceleratorDelta: scenario.modifiers.acceleratorRate - baseline.modifiers.acceleratorRate,
      bonusDelta: scenario.modifiers.bonusMultiplier - baseline.modifiers.bonusMultiplier
    }));

    return { baseline, comparisons };
  };

  const variance = calculateVariance();

  const getDeltaColor = (value) => {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-error';
    return 'text-text-secondary';
  };

  const getDeltaIcon = (value) => {
    if (value > 0) return 'TrendingUp';
    if (value < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-surface rounded-sm border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Scenario Comparison</h2>
          <p className="text-sm text-text-secondary">
            Comparing {scenarios.length} scenarios side-by-side
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary-100 rounded-sm transition-smooth"
        >
          <Icon name="X" size={20} className="text-secondary-600" />
        </button>
      </div>

      <div className="p-6">
        {/* Scenario Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {scenarios.map((scenario, index) => (
            <div key={scenario.id} className="bg-secondary-50 rounded-sm p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-text-primary">{scenario.name}</h3>
                  <p className="text-sm text-text-secondary">{scenario.creator}</p>
                </div>
                <span className="px-2 py-1 text-xs bg-primary text-white rounded-sm">
                  #{index + 1}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Total Payout:</span>
                  <span className="text-sm font-medium text-text-primary">
                    {formatCurrency(scenario.totalProjectedPayout)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Affected Reps:</span>
                  <span className="text-sm font-medium text-text-primary">
                    {scenario.affectedRepCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Modified:</span>
                  <span className="text-sm font-medium text-text-primary">
                    {formatDate(scenario.modifiedAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payout Comparison Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-text-primary mb-4">Total Payout Comparison</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748B"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value, name) => [formatCurrency(value), 'Total Payout']}
                  labelFormatter={(label, payload) => {
                    const data = payload?.[0]?.payload;
                    return data ? data.fullName : label;
                  }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="totalPayout" 
                  fill="#2563EB"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Modifier Comparison */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-text-primary mb-4">Modifier Values Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-sm">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary border-b border-border">
                    Scenario
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-text-secondary border-b border-border">
                    SPIF %
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-text-secondary border-b border-border">
                    Accelerator Rate
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-text-secondary border-b border-border">
                    Bonus Multiplier
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-text-secondary border-b border-border">
                    Affected Reps
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {scenarios.map((scenario, index) => (
                  <tr key={scenario.id} className="hover:bg-secondary-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-text-primary">{scenario.name}</div>
                        <div className="text-sm text-text-secondary">{scenario.id}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary rounded-sm text-sm font-medium">
                        {scenario.modifiers.spifPercentage}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2 py-1 bg-accent-100 text-accent rounded-sm text-sm font-medium">
                        {scenario.modifiers.acceleratorRate}x
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2 py-1 bg-warning-100 text-warning rounded-sm text-sm font-medium">
                        {scenario.modifiers.bonusMultiplier}x
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-medium text-text-primary">
                        {scenario.affectedRepCount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Variance Analysis */}
        {variance && (
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">
              Variance Analysis (vs. {variance.baseline.name})
            </h3>
            <div className="space-y-4">
              {variance.comparisons.map((comparison, index) => (
                <div key={comparison.scenario.id} className="bg-secondary-50 rounded-sm p-4 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-text-primary">{comparison.scenario.name}</h4>
                    <span className={`text-sm font-medium ${getDeltaColor(comparison.payoutDelta)}`}>
                      {comparison.payoutDelta > 0 ? '+' : ''}{formatCurrency(comparison.payoutDelta)}
                      ({comparison.payoutDeltaPercent > 0 ? '+' : ''}{comparison.payoutDeltaPercent.toFixed(1)}%)
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getDeltaIcon(comparison.spifDelta)} 
                        size={16} 
                        className={getDeltaColor(comparison.spifDelta)} 
                      />
                      <div>
                        <div className="text-xs text-text-secondary">SPIF</div>
                        <div className={`text-sm font-medium ${getDeltaColor(comparison.spifDelta)}`}>
                          {comparison.spifDelta > 0 ? '+' : ''}{comparison.spifDelta.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getDeltaIcon(comparison.acceleratorDelta)} 
                        size={16} 
                        className={getDeltaColor(comparison.acceleratorDelta)} 
                      />
                      <div>
                        <div className="text-xs text-text-secondary">Accelerator</div>
                        <div className={`text-sm font-medium ${getDeltaColor(comparison.acceleratorDelta)}`}>
                          {comparison.acceleratorDelta > 0 ? '+' : ''}{comparison.acceleratorDelta.toFixed(1)}x
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getDeltaIcon(comparison.bonusDelta)} 
                        size={16} 
                        className={getDeltaColor(comparison.bonusDelta)} 
                      />
                      <div>
                        <div className="text-xs text-text-secondary">Bonus</div>
                        <div className={`text-sm font-medium ${getDeltaColor(comparison.bonusDelta)}`}>
                          {comparison.bonusDelta > 0 ? '+' : ''}{comparison.bonusDelta.toFixed(1)}x
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getDeltaIcon(comparison.repCountDelta)} 
                        size={16} 
                        className={getDeltaColor(comparison.repCountDelta)} 
                      />
                      <div>
                        <div className="text-xs text-text-secondary">Reps</div>
                        <div className={`text-sm font-medium ${getDeltaColor(comparison.repCountDelta)}`}>
                          {comparison.repCountDelta > 0 ? '+' : ''}{comparison.repCountDelta}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPanel;