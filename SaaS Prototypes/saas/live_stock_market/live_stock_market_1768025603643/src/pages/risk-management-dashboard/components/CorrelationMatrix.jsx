import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CorrelationMatrix = () => {
  const [viewMode, setViewMode] = useState('heatmap');
  
  const assets = ['RELIANCE', 'TCS', 'HDFC', 'INFY', 'ICICI', 'HUL'];
  
  const correlationData = [
    [1.00, 0.23, 0.45, 0.18, 0.52, 0.31],
    [0.23, 1.00, 0.12, 0.78, 0.19, 0.08],
    [0.45, 0.12, 1.00, 0.15, 0.67, 0.29],
    [0.18, 0.78, 0.15, 1.00, 0.22, 0.11],
    [0.52, 0.19, 0.67, 0.22, 1.00, 0.34],
    [0.31, 0.08, 0.29, 0.11, 0.34, 1.00]
  ];

  const getCorrelationColor = (value) => {
    if (value >= 0.7) return 'bg-error text-error-foreground';
    if (value >= 0.5) return 'bg-warning text-warning-foreground';
    if (value >= 0.3) return 'bg-primary/20 text-primary';
    if (value >= 0) return 'bg-success/20 text-success';
    return 'bg-muted text-muted-foreground';
  };

  const getCorrelationIntensity = (value) => {
    const intensity = Math.abs(value);
    return {
      backgroundColor: `rgba(21, 101, 192, ${intensity})`,
      color: intensity > 0.5 ? 'white' : 'var(--color-foreground)'
    };
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Correlation Matrix</h3>
          <p className="text-sm text-muted-foreground">Asset correlation analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'heatmap' ? 'values' : 'heatmap')}
            className="px-3 py-1 text-sm border border-border rounded-lg bg-background text-foreground hover:bg-muted transition-colors"
          >
            {viewMode === 'heatmap' ? 'Values' : 'Heatmap'}
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Icon name="Download" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left text-xs font-medium text-muted-foreground"></th>
              {assets?.map(asset => (
                <th key={asset} className="p-2 text-center text-xs font-medium text-muted-foreground">
                  {asset}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assets?.map((rowAsset, rowIndex) => (
              <tr key={rowAsset}>
                <td className="p-2 text-xs font-medium text-muted-foreground">
                  {rowAsset}
                </td>
                {correlationData?.[rowIndex]?.map((correlation, colIndex) => (
                  <td key={colIndex} className="p-1">
                    <div
                      className={`
                        w-12 h-8 flex items-center justify-center text-xs font-medium rounded
                        ${viewMode === 'heatmap' ? '' : getCorrelationColor(correlation)}
                      `}
                      style={viewMode === 'heatmap' ? getCorrelationIntensity(correlation) : {}}
                    >
                      {correlation?.toFixed(2)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success/20 rounded"></div>
            <span className="text-muted-foreground">Low (0-0.3)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary/40 rounded"></div>
            <span className="text-muted-foreground">Medium (0.3-0.7)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded"></div>
            <span className="text-muted-foreground">High (&gt;0.7)</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date()?.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default CorrelationMatrix;