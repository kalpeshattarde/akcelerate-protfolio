import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const SectorConcentration = () => {
  const sectorData = [
    { name: 'Technology', value: 28.5, color: '#2E7D32', risk: 'Medium' },
    { name: 'Banking', value: 24.2, color: '#F57C00', risk: 'Low' },
    { name: 'Energy', value: 18.3, color: '#1565C0', risk: 'High' },
    { name: 'FMCG', value: 12.7, color: '#C62828', risk: 'Low' },
    { name: 'Healthcare', value: 8.9, color: '#7B1FA2', risk: 'Medium' },
    { name: 'Materials', value: 4.8, color: '#1976D2', risk: 'High' },
    { name: 'Others', value: 2.6, color: '#757575', risk: 'Medium' }
  ];

  const riskLimits = {
    'Technology': 30,
    'Banking': 25,
    'Energy': 20,
    'FMCG': 15,
    'Healthcare': 10,
    'Materials': 8,
    'Others': 5
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-primary">Allocation: {data?.value}%</p>
          <p className="text-sm text-muted-foreground">Risk Level: {data?.risk}</p>
          <p className="text-sm text-muted-foreground">Limit: {riskLimits?.[data?.name]}%</p>
        </div>
      );
    }
    return null;
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'High':
        return <Icon name="AlertTriangle" size={12} className="text-error" />;
      case 'Medium':
        return <Icon name="AlertCircle" size={12} className="text-warning" />;
      case 'Low':
        return <Icon name="CheckCircle" size={12} className="text-success" />;
      default:
        return null;
    }
  };

  const isOverLimit = (sector, value) => {
    return value > riskLimits?.[sector];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Sector Concentration</h3>
          <p className="text-sm text-muted-foreground">Portfolio allocation by sector</p>
        </div>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Icon name="Settings" size={16} className="text-muted-foreground" />
        </button>
      </div>
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sectorData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {sectorData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {sectorData?.map((sector) => (
          <div key={sector?.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: sector?.color }}
              />
              <span className="text-sm font-medium text-foreground">{sector?.name}</span>
              {getRiskIcon(sector?.risk)}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${
                isOverLimit(sector?.name, sector?.value) ? 'text-error' : 'text-foreground'
              }`}>
                {sector?.value}%
              </span>
              {isOverLimit(sector?.name, sector?.value) && (
                <Icon name="AlertTriangle" size={12} className="text-error" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Concentration Risk</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={12} className="text-success" />
              <span>Within Limits</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="AlertTriangle" size={12} className="text-error" />
              <span>Over Limit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorConcentration;