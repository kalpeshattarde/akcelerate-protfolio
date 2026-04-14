import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ComparativeBenchmarking = ({ data, representative }) => {
  const [selectedMetric, setSelectedMetric] = useState('Revenue');

  if (!data || !representative) {
    return (
      <div className="card-glass">
        <div className="text-center text-white/70">
          <Icon name="BarChart" size={48} className="mx-auto mb-4 text-white/40" />
          <p>Select a representative to view benchmarking data</p>
        </div>
      </div>
    );
  }

  const formatValue = (metric, value) => {
    if (metric === 'Revenue' || metric === 'Avg Deal Size') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    } else if (metric === 'Win Rate') {
      return `${value}%`;
    } else {
      return new Intl.NumberFormat('en-US').format(value);
    }
  };

  const getPerformanceLevel = (myValue, peerAvg, topPerformer) => {
    const peerRatio = myValue / peerAvg;
    const topRatio = myValue / topPerformer;
    
    if (topRatio >= 0.95) return { level: 'excellent', color: 'success', label: 'Excellent' };
    if (peerRatio >= 1.1) return { level: 'above', color: 'success', label: 'Above Average' };
    if (peerRatio >= 0.9) return { level: 'average', color: 'warning', label: 'Average' };
    return { level: 'below', color: 'error', label: 'Below Average' };
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success-50',
          border: 'border-success-200',
          text: 'text-success',
          bar: 'bg-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          border: 'border-warning-200',
          text: 'text-warning',
          bar: 'bg-warning'
        };
      case 'error':
        return {
          bg: 'bg-error-50',
          border: 'border-error-200',
          text: 'text-error',
          bar: 'bg-error'
        };
      default:
        return {
          bg: 'bg-secondary-50',
          border: 'border-secondary-200',
          text: 'text-secondary-600',
          bar: 'bg-secondary-400'
        };
    }
  };

  const selectedData = data.find(item => item.metric === selectedMetric);
  const performance = selectedData ? getPerformanceLevel(selectedData.myValue, selectedData.peerAvg, selectedData.topPerformer) : null;
  const colors = performance ? getColorClasses(performance.color) : getColorClasses('default');

  return (
    <div className="card-glass">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-medium text-white mb-1">Comparative Benchmarking</h3>
        <p className="text-sm text-white/70">Compare performance against peers and top performers</p>
      </div>

      <div className="p-4">
        {/* Metric Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">Select Metric</label>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="w-full px-3 py-2 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-neon-indigo/50 focus:border-white/40 glass-morphism text-white"
          >
            {data.map((item) => (
              <option key={item.metric} value={item.metric} className="bg-gray-800">
                {item.metric}
              </option>
            ))}
          </select>
        </div>

        {selectedData && (
          <>
            {/* Performance Level Indicator */}
            <div className={`p-4 rounded-sm border glass-morphism-dark border-white/20 mb-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Performance Level</h4>
                  <p className={`text-sm font-medium ${colors.text}`}>{performance.label}</p>
                </div>
                <div className="glass-morphism p-2 rounded-sm border border-white/20">
                  <Icon 
                    name={performance.level === 'excellent' || performance.level === 'above' ? 'TrendingUp' : 
                          performance.level === 'average' ? 'Minus' : 'TrendingDown'} 
                    size={20} 
                    className={colors.text} 
                  />
                </div>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="mb-6">
              <h4 className="font-medium text-white mb-4">{selectedMetric} Comparison</h4>
              
              <div className="space-y-4">
                {/* My Performance */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white">Your Performance</span>
                    <span className="text-sm font-bold text-white">
                      {formatValue(selectedMetric, selectedData.myValue)}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-sm h-3">
                    <div 
                      className={`h-3 rounded-sm ${colors.bar}`}
                      style={{ 
                        width: `${Math.min((selectedData.myValue / selectedData.topPerformer) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Peer Average */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/70">Peer Average</span>
                    <span className="text-sm text-white/70">
                      {formatValue(selectedMetric, selectedData.peerAvg)}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-sm h-2">
                    <div 
                      className="bg-white/40 h-2 rounded-sm"
                      style={{ 
                        width: `${Math.min((selectedData.peerAvg / selectedData.topPerformer) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Top Performer */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/70">Top Performer</span>
                    <span className="text-sm text-white/70">
                      {formatValue(selectedMetric, selectedData.topPerformer)}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-sm h-2">
                    <div className="bg-neon-indigo h-2 rounded-sm w-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="p-4 glass-morphism-dark rounded-sm">
              <h5 className="font-medium text-white mb-2">Performance Insights</h5>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={14} />
                  <span>
                    {((selectedData.myValue / selectedData.peerAvg - 1) * 100).toFixed(1)}% 
                    {selectedData.myValue > selectedData.peerAvg ? ' above' : ' below'} peer average
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={14} />
                  <span>
                    {((selectedData.myValue / selectedData.topPerformer) * 100).toFixed(1)}% 
                    of top performer level
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={14} />
                  <span>
                    Gap to close: {formatValue(selectedMetric, selectedData.topPerformer - selectedData.myValue)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* All Metrics Overview */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <h5 className="font-medium text-white mb-3">All Metrics Overview</h5>
          <div className="grid grid-cols-1 gap-3">
            {data.map((item) => {
              const itemPerformance = getPerformanceLevel(item.myValue, item.peerAvg, item.topPerformer);
              const itemColors = getColorClasses(itemPerformance.color);
              
              return (
                <div 
                  key={item.metric}
                  className={`p-3 rounded-sm border cursor-pointer transition-smooth ${
                    selectedMetric === item.metric 
                      ? 'glass-morphism-elevated border-white/20' :'border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedMetric(item.metric)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-white">{item.metric}</span>
                      <div className="text-xs text-white/60">
                        {formatValue(item.metric, item.myValue)}
                      </div>
                    </div>
                    <div className={`px-2 py-1 text-xs font-medium rounded-sm glass-morphism-dark ${itemColors.text}`}>
                      {itemPerformance.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparativeBenchmarking;