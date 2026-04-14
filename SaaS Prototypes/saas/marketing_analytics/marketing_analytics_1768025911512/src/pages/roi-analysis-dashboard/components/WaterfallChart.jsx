import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const WaterfallChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const waterfallData = [
    { name: 'Initial Spend', value: -50000, cumulative: -50000, type: 'negative' },
    { name: 'Impressions', value: 15000, cumulative: -35000, type: 'positive' },
    { name: 'Clicks', value: 25000, cumulative: -10000, type: 'positive' },
    { name: 'Leads', value: 35000, cumulative: 25000, type: 'positive' },
    { name: 'Qualified Leads', value: 45000, cumulative: 70000, type: 'positive' },
    { name: 'Conversions', value: 80000, cumulative: 150000, type: 'positive' },
    { name: 'Net ROI', value: 150000, cumulative: 150000, type: 'total' }
  ];

  const getBarColor = (type) => {
    switch (type) {
      case 'negative': return '#EF4444';
      case 'positive': return '#10B981';
      case 'total': return '#00D4FF';
      default: return '#6B7280';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 p-4 rounded-lg shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-muted-foreground">Value: </span>
              <span className={`font-medium ${data?.value >= 0 ? 'text-success' : 'text-destructive'}`}>
                ${Math.abs(data?.value)?.toLocaleString()}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Cumulative: </span>
              <span className={`font-medium ${data?.cumulative >= 0 ? 'text-success' : 'text-destructive'}`}>
                ${data?.cumulative?.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="BarChart4" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Revenue Waterfall</h3>
            <p className="text-sm text-muted-foreground">Campaign progression analysis</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e?.target?.value)}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="current">Current Quarter</option>
            <option value="previous">Previous Quarter</option>
            <option value="ytd">Year to Date</option>
          </select>
          <button className="p-2 rounded-lg hover:bg-gray-800/40 backdrop-blur-sm transition-colors duration-200">
            <Icon name="Download" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={waterfallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#A1A1AA', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fill: '#A1A1AA', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {waterfallData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry?.type)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
        <div className="text-center">
          <div className="text-2xl font-bold text-destructive">-$50K</div>
          <div className="text-sm text-muted-foreground">Initial Investment</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">+$200K</div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">300%</div>
          <div className="text-sm text-muted-foreground">ROI</div>
        </div>
      </div>
    </div>
  );
};

export default WaterfallChart;