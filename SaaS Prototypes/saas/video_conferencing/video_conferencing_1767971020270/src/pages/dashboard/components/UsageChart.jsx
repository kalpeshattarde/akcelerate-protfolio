import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const UsageChart = ({ data, type = 'bar', title, timeframe = '7d' }) => {
  const chartData = data || [
    { name: 'Mon', meetings: 12, participants: 45, duration: 180 },
    { name: 'Tue', meetings: 19, participants: 67, duration: 240 },
    { name: 'Wed', meetings: 15, participants: 52, duration: 200 },
    { name: 'Thu', meetings: 22, participants: 78, duration: 320 },
    { name: 'Fri', meetings: 18, participants: 61, duration: 280 },
    { name: 'Sat', meetings: 8, participants: 23, duration: 120 },
    { name: 'Sun', meetings: 6, participants: 18, duration: 90 }
  ];

  const timeframeOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground capitalize">{entry?.dataKey}:</span>
              <span className="font-medium text-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (type === 'line') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="meetings" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="participants" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="name" 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
          />
          <YAxis 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="meetings" 
            fill="var(--color-primary)" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="participants" 
            fill="var(--color-accent)" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            {title || 'Usage Analytics'}
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-border rounded-md px-3 py-1 bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            {timeframeOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
          <div className="flex items-center space-x-1 border border-border rounded-md">
            <button 
              className={`p-1 rounded ${type === 'bar' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              onClick={() => {}}
            >
              <Icon name="BarChart3" size={16} />
            </button>
            <button 
              className={`p-1 rounded ${type === 'line' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              onClick={() => {}}
            >
              <Icon name="TrendingUp" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center space-x-6 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm text-muted-foreground">Meetings</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <span className="text-sm text-muted-foreground">Participants</span>
        </div>
      </div>
      {/* Chart */}
      <div className="w-full">
        {renderChart()}
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-semibold text-foreground">
            {chartData?.reduce((sum, item) => sum + item?.meetings, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Total Meetings</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-foreground">
            {chartData?.reduce((sum, item) => sum + item?.participants, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Total Participants</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-foreground">
            {Math.round(chartData?.reduce((sum, item) => sum + item?.duration, 0) / 60)}h
          </p>
          <p className="text-sm text-muted-foreground">Total Duration</p>
        </div>
      </div>
    </div>
  );
};

export default UsageChart;