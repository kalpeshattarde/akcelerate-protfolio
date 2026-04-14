import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const RiskReturnScatter = () => {
  const [selectedSector, setSelectedSector] = useState('all');
  
  const scatterData = [
    { name: 'RELIANCE', risk: 18.5, return: 12.3, weight: 15.2, sector: 'Energy', color: '#1565C0' },
    { name: 'TCS', risk: 22.1, return: 18.7, weight: 12.8, sector: 'Technology', color: '#2E7D32' },
    { name: 'HDFC BANK', risk: 16.3, return: 14.2, weight: 11.5, sector: 'Banking', color: '#F57C00' },
    { name: 'INFY', risk: 24.8, return: 16.9, weight: 9.3, sector: 'Technology', color: '#2E7D32' },
    { name: 'ICICI BANK', risk: 19.7, return: 13.8, weight: 8.7, sector: 'Banking', color: '#F57C00' },
    { name: 'HINDUNILVR', risk: 14.2, return: 11.5, weight: 7.9, sector: 'FMCG', color: '#C62828' },
    { name: 'ITC', risk: 13.8, return: 9.2, weight: 6.4, sector: 'FMCG', color: '#C62828' },
    { name: 'KOTAKBANK', risk: 21.3, return: 15.6, weight: 5.8, sector: 'Banking', color: '#F57C00' },
    { name: 'BHARTIARTL', risk: 26.4, return: 8.9, weight: 4.2, sector: 'Telecom', color: '#7B1FA2' },
    { name: 'ASIANPAINT', risk: 17.9, return: 13.4, weight: 3.8, sector: 'Materials', color: '#1976D2' }
  ];

  const sectors = ['all', 'Technology', 'Banking', 'Energy', 'FMCG', 'Telecom', 'Materials'];
  
  const filteredData = selectedSector === 'all' 
    ? scatterData 
    : scatterData?.filter(item => item?.sector === selectedSector);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">Sector: {data?.sector}</p>
          <p className="text-sm text-success">Return: {data?.return}%</p>
          <p className="text-sm text-error">Risk: {data?.risk}%</p>
          <p className="text-sm text-primary">Weight: {data?.weight}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Risk-Return Analysis</h3>
          <p className="text-sm text-muted-foreground">Portfolio holdings positioned by risk vs return</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e?.target?.value)}
            className="px-3 py-1 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sectors?.map(sector => (
              <option key={sector} value={sector}>
                {sector === 'all' ? 'All Sectors' : sector}
              </option>
            ))}
          </select>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Icon name="Download" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              type="number" 
              dataKey="risk" 
              name="Risk (%)"
              domain={['dataMin - 2', 'dataMax + 2']}
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis 
              type="number" 
              dataKey="return" 
              name="Return (%)"
              domain={['dataMin - 2', 'dataMax + 2']}
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={filteredData}>
              {filteredData?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry?.color}
                  r={Math.max(4, entry?.weight * 0.8)}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Risk (Volatility) →</span>
        <span>Bubble size represents portfolio weight</span>
      </div>
    </div>
  );
};

export default RiskReturnScatter;