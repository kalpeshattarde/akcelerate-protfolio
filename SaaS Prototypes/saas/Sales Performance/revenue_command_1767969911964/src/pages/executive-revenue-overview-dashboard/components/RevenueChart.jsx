import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  const chartData = [
    {
      month: 'Jan',
      revenue: 2400000,
      cumulative: 2400000,
      target: 2500000,
      previousYear: 2100000
    },
    {
      month: 'Feb',
      revenue: 2800000,
      cumulative: 5200000,
      target: 5000000,
      previousYear: 4800000
    },
    {
      month: 'Mar',
      revenue: 3200000,
      cumulative: 8400000,
      target: 7500000,
      previousYear: 7200000
    },
    {
      month: 'Apr',
      revenue: 2900000,
      cumulative: 11300000,
      target: 10000000,
      previousYear: 9800000
    },
    {
      month: 'May',
      revenue: 3400000,
      cumulative: 14700000,
      target: 12500000,
      previousYear: 12100000
    },
    {
      month: 'Jun',
      revenue: 3800000,
      cumulative: 18500000,
      target: 15000000,
      previousYear: 14500000
    }
  ];

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-text-primary mb-2">{label} 2024</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-text-secondary">{entry.name}:</span>
              <span className="font-medium text-text-primary">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Revenue Performance</h3>
          <p className="text-sm text-text-secondary">Monthly revenue vs cumulative attainment</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-text-secondary">Monthly Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full" />
            <span className="text-text-secondary">Cumulative</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-text-secondary">Target</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="month" 
              stroke="#718096"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="#718096"
              fontSize={12}
              tickLine={false}
              tickFormatter={formatCurrency}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#718096"
              fontSize={12}
              tickLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Bar 
              yAxisId="left"
              dataKey="revenue" 
              name="Monthly Revenue"
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
            
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="cumulative" 
              name="Cumulative Revenue"
              stroke="var(--color-secondary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-secondary)', strokeWidth: 2 }}
            />
            
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="target" 
              name="Target"
              stroke="var(--color-warning)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;