import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const BudgetRevenueChart = ({ data, onDrillDown }) => {
  const [hoveredBar, setHoveredBar] = useState(null);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="glass-card p-4 shadow-floating">
          <p className="text-sm font-medium text-foreground mb-3">{label}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Budget</span>
              </div>
              <span className="text-xs font-medium text-foreground">
                ${data?.budget?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">Revenue</span>
              </div>
              <span className="text-xs font-medium text-foreground">
                ${data?.revenue?.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex items-center justify-between space-x-4">
                <span className="text-xs text-muted-foreground">ROI</span>
                <span className={`text-xs font-medium ${
                  data?.roi >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {data?.roi >= 0 ? '+' : ''}{data?.roi?.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (entry, index) => {
    if (hoveredBar === index) {
      return entry?.roi >= 0 ? '#10B981' : '#EF4444'; // success or destructive
    }
    return entry?.roi >= 0 ? '#8B5CF6' : '#8B5CF6'; // primary or secondary
  };

  const handleBarClick = (entry) => {
    if (onDrillDown) {
      onDrillDown(entry);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="BarChart4" size={16} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Budget vs Revenue</h3>
            <p className="text-xs text-muted-foreground">Waterfall analysis by channel</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Budget</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Revenue</span>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="channel" 
              stroke="#A1A1AA"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#A1A1AA"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Bar 
              dataKey="budget" 
              fill="#8B5CF6" 
              radius={[4, 4, 0, 0]}
              opacity={0.7}
            />
            <Bar 
              dataKey="revenue" 
              fill="#10B981" 
              radius={[4, 4, 0, 0]}
              onClick={handleBarClick}
              onMouseEnter={(_, index) => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
              className="cursor-pointer"
            >
              {data?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry, index)}
                  style={{
                    filter: hoveredBar === index ? 'brightness(1.1)' : 'brightness(1)',
                    transition: 'all 0.2s ease-out'
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.slice(0, 4)?.map((item, index) => (
          <div key={index} className="text-center p-3 rounded-lg bg-muted/20">
            <div className="text-xs text-muted-foreground mb-1">{item?.channel}</div>
            <div className={`text-sm font-semibold ${
              item?.roi >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {item?.roi >= 0 ? '+' : ''}{item?.roi?.toFixed(1)}% ROI
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetRevenueChart;