import React from 'react';
import Icon from '../../../components/AppIcon';

const PipelineHealthGauge = () => {
  const healthScore = 78;
  const pipelineMetrics = {
    totalValue: 45600000,
    weightedValue: 28400000,
    deals: 234,
    avgDealSize: 194872,
    velocity: 42,
    conversionRate: 23.5
  };

  const healthSegments = [
    { label: 'Excellent', min: 90, max: 100, color: 'bg-success' },
    { label: 'Good', min: 70, max: 89, color: 'bg-secondary' },
    { label: 'Fair', min: 50, max: 69, color: 'bg-warning' },
    { label: 'Poor', min: 0, max: 49, color: 'bg-error' }
  ];

  const getCurrentSegment = () => {
    return healthSegments.find(segment => 
      healthScore >= segment.min && healthScore <= segment.max
    );
  };

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const formatNumber = (value) => {
    return value.toLocaleString();
  };

  const currentSegment = getCurrentSegment();
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Pipeline Health</h3>
          <p className="text-sm text-text-secondary">Overall pipeline scoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={16} className="text-primary" />
          <span className="text-sm text-text-secondary">Live Score</span>
        </div>
      </div>

      {/* Circular Progress Gauge */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E2E8F0"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={currentSegment?.color.replace('bg-', '') === 'success' ? '#28C76F' : 
                     currentSegment?.color.replace('bg-', '') === 'secondary' ? '#00BFA5' :
                     currentSegment?.color.replace('bg-', '') === 'warning' ? '#FFB400' : '#EA5455'}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-text-primary">{healthScore}</div>
            <div className="text-sm text-text-secondary">Health Score</div>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentSegment?.color} ${
          currentSegment?.color.replace('bg-', 'text-') === 'text-warning' ? 'text-gray-800' : 'text-white'
        }`}>
          {currentSegment?.label}
        </div>
      </div>

      {/* Health Segments Legend */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {healthSegments.map((segment, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            <div className={`w-3 h-3 rounded-full ${segment.color}`} />
            <span className="text-text-secondary">
              {segment.label} ({segment.min}-{segment.max})
            </span>
          </div>
        ))}
      </div>

      {/* Pipeline Metrics */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-text-secondary">Total Pipeline</div>
            <div className="font-semibold text-text-primary">
              {formatCurrency(pipelineMetrics.totalValue)}
            </div>
          </div>
          <div>
            <div className="text-sm text-text-secondary">Weighted Value</div>
            <div className="font-semibold text-text-primary">
              {formatCurrency(pipelineMetrics.weightedValue)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-text-secondary">Active Deals</div>
            <div className="font-semibold text-text-primary">
              {formatNumber(pipelineMetrics.deals)}
            </div>
          </div>
          <div>
            <div className="text-sm text-text-secondary">Avg Deal Size</div>
            <div className="font-semibold text-text-primary">
              ${formatNumber(pipelineMetrics.avgDealSize)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-text-secondary">Velocity (days)</div>
            <div className="font-semibold text-text-primary">
              {pipelineMetrics.velocity}
            </div>
          </div>
          <div>
            <div className="text-sm text-text-secondary">Win Rate</div>
            <div className="font-semibold text-text-primary">
              {pipelineMetrics.conversionRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-medium text-text-primary mb-3">Key Focus Areas</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="AlertTriangle" size={14} className="text-warning" />
            <span className="text-text-secondary">3 deals stalled &gt;30 days</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="TrendingDown" size={14} className="text-error" />
            <span className="text-text-secondary">Velocity down 12% vs last quarter</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Target" size={14} className="text-success" />
            <span className="text-text-secondary">Win rate improved 5% MoM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineHealthGauge;