import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const TrafficSourceChart = ({ data, onSourceFilter }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const COLORS = [
    '#00D4FF', // electric-blue
    '#8B5CF6', // purple
    '#39FF14', // neon-green
    '#F59E0B', // amber
    '#EF4444', // red
    '#10B981'  // emerald
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="glass-card p-3 shadow-floating">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data?.color }}
            />
            <span className="text-sm font-medium text-foreground">
              {data?.payload?.name}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Sessions: {data?.payload?.value?.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              Percentage: {data?.payload?.percentage}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for slices < 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const handleSourceClick = (entry) => {
    if (onSourceFilter) {
      onSourceFilter(entry?.name);
    }
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="PieChart" size={16} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Traffic Sources</h3>
        </div>
        <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200">
          <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
        </button>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={100}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              onClick={handleSourceClick}
              className="cursor-pointer"
            >
              {data?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS?.[index % COLORS?.length]}
                  stroke={activeIndex === index ? '#FFFFFF' : 'none'}
                  strokeWidth={activeIndex === index ? 2 : 0}
                  style={{
                    filter: activeIndex === index ? 'brightness(1.1)' : 'brightness(1)',
                    transform: activeIndex === index ? 'scale(1.02)' : 'scale(1)',
                    transformOrigin: 'center',
                    transition: 'all 0.2s ease-out'
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data?.map((entry, index) => (
          <div 
            key={entry?.name}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors duration-200"
            onClick={() => handleSourceClick(entry)}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
              />
              <span className="text-sm font-medium text-foreground">{entry?.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">
                {entry?.value?.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                {entry?.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSourceChart;