import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const MarketHeatmap = () => {
  const [selectedSector, setSelectedSector] = useState(null);

  const sectorData = [
    { name: 'IT', change: 2.45, size: 'large', stocks: ['TCS', 'INFY', 'WIPRO', 'HCL'] },
    { name: 'Banking', change: -1.23, size: 'large', stocks: ['HDFC', 'ICICI', 'SBI', 'AXIS'] },
    { name: 'Pharma', change: 3.67, size: 'medium', stocks: ['SUN', 'DRREDDY', 'CIPLA'] },
    { name: 'Auto', change: -0.89, size: 'medium', stocks: ['MARUTI', 'TATA', 'M&M'] },
    { name: 'FMCG', change: 1.34, size: 'medium', stocks: ['HUL', 'ITC', 'NESTLE'] },
    { name: 'Energy', change: -2.11, size: 'small', stocks: ['RELIANCE', 'ONGC'] },
    { name: 'Metals', change: 4.23, size: 'small', stocks: ['TATA STEEL', 'JSW'] },
    { name: 'Telecom', change: 0.67, size: 'small', stocks: ['BHARTI', 'JIO'] }
  ];

  const getSectorColor = (change) => {
    if (change > 2) return 'bg-success text-success-foreground';
    if (change > 0) return 'bg-success/70 text-success-foreground';
    if (change > -2) return 'bg-error/70 text-error-foreground';
    return 'bg-error text-error-foreground';
  };

  const getSectorSize = (size) => {
    switch (size) {
      case 'large': return 'col-span-2 row-span-2 h-24';
      case 'medium': return 'col-span-2 h-16';
      case 'small': return 'col-span-1 h-16';
      default: return 'col-span-1 h-16';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Market Heatmap</h3>
          <p className="text-sm text-muted-foreground">Sector performance overview</p>
        </div>
        <Button variant="ghost" size="sm" iconName="RefreshCw">
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {sectorData?.map((sector) => (
          <div
            key={sector?.name}
            className={`
              ${getSectorSize(sector?.size)} ${getSectorColor(sector?.change)}
              rounded-lg p-3 cursor-pointer transition-all duration-200 hover:scale-105
              flex flex-col justify-between relative overflow-hidden
            `}
            onClick={() => setSelectedSector(selectedSector === sector?.name ? null : sector?.name)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{sector?.name}</span>
              <Icon 
                name={sector?.change > 0 ? "TrendingUp" : "TrendingDown"} 
                size={14} 
              />
            </div>
            <div className="mt-auto">
              <span className="text-lg font-bold">
                {sector?.change > 0 ? '+' : ''}{sector?.change?.toFixed(2)}%
              </span>
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg" />
          </div>
        ))}
      </div>
      {/* Sector Details */}
      {selectedSector && (
        <div className="bg-muted rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">
              {selectedSector} Sector Details
            </h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedSector(null)}
              iconName="X"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Top Stocks:</p>
              <div className="space-y-1">
                {sectorData?.find(s => s?.name === selectedSector)
                  ?.stocks?.map((stock, index) => (
                    <div key={stock} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{stock}</span>
                      <span className={`font-mono ${
                        Math.random() > 0.5 ? 'text-success' : 'text-error'
                      }`}>
                        {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 3)?.toFixed(2)}%
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Sector Metrics:</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap:</span>
                  <span className="text-foreground font-mono">₹{(Math.random() * 500 + 100)?.toFixed(0)}K Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volume:</span>
                  <span className="text-foreground font-mono">{(Math.random() * 100 + 50)?.toFixed(0)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">P/E Ratio:</span>
                  <span className="text-foreground font-mono">{(Math.random() * 20 + 10)?.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded"></div>
          <span className="text-xs text-muted-foreground">Strong Gains (&gt;2%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success/70 rounded"></div>
          <span className="text-xs text-muted-foreground">Moderate Gains (0-2%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error/70 rounded"></div>
          <span className="text-xs text-muted-foreground">Moderate Loss (0 to -2%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error rounded"></div>
          <span className="text-xs text-muted-foreground">Heavy Loss (&lt;-2%)</span>
        </div>
      </div>
    </div>
  );
};

export default MarketHeatmap;