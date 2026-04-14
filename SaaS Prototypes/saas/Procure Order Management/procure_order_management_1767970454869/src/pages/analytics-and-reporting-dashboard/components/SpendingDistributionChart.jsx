import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const SpendingDistributionChart = ({ data }) => {
  const [selectedSegment, setSelectedSegment] = useState(null);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-card p-3 shadow-elevation-md">
          <p className="font-body-medium text-text-primary">{data.name}</p>
          <p className="text-primary">
            Amount: <span className="font-body-medium">${data.value.toLocaleString()}</span>
          </p>
          <p className="text-text-secondary">
            Percentage: <span className="font-body-medium">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const handleSegmentClick = (data, index) => {
    setSelectedSegment(selectedSegment === index ? null : index);
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading-semibold text-text-primary mb-1">
            Supplier Spending Distribution
          </h3>
          <p className="text-text-secondary text-sm">
            Total spend breakdown by supplier
          </p>
        </div>
        <button className="p-2 hover:bg-secondary-100 rounded-button transition-smooth">
          <Icon name="MoreHorizontal" size={20} className="text-text-secondary" />
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              onClick={handleSegmentClick}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={selectedSegment === index ? '#2563EB' : 'none'}
                  strokeWidth={selectedSegment === index ? 3 : 0}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div 
            key={index}
            className={`flex items-center justify-between p-2 rounded-button cursor-pointer transition-smooth ${
              selectedSegment === index ? 'bg-primary-50' : 'hover:bg-secondary-50'
            }`}
            onClick={() => handleSegmentClick(item, index)}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-text-primary font-body-medium">
                {item.name}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm font-body-medium text-text-primary">
                ${item.value.toLocaleString()}
              </div>
              <div className="text-xs text-text-secondary">
                {item.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingDistributionChart;