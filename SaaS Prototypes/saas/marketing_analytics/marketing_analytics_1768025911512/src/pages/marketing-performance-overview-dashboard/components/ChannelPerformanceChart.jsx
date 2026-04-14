import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const ChannelPerformanceChart = ({ data, selectedChannels, onChannelToggle }) => {
  const [hoveredChannel, setHoveredChannel] = useState(null);

  const channels = [
    { key: 'google_ads', name: 'Google Ads', color: '#8B5CF6', gradient: 'url(#googleGradient)' },
    { key: 'facebook_ads', name: 'Facebook Ads', color: '#8B5CF6', gradient: 'url(#facebookGradient)' },
    { key: 'linkedin_ads', name: 'LinkedIn Ads', color: '#6366F1', gradient: 'url(#linkedinGradient)' },
    { key: 'email_marketing', name: 'Email Marketing', color: '#F59E0B', gradient: 'url(#emailGradient)' },
    { key: 'organic_search', name: 'Organic Search', color: '#10B981', gradient: 'url(#organicGradient)' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-card p-4 shadow-floating">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            {payload?.map((entry, index) => (
              <div key={index} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry?.color }}
                  />
                  <span className="text-xs text-muted-foreground">{entry?.name}</span>
                </div>
                <span className="text-xs font-medium text-foreground">
                  {entry?.value?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {payload?.map((entry, index) => {
          const channel = channels?.find(c => c?.key === entry?.dataKey);
          const isSelected = selectedChannels?.includes(entry?.dataKey);
          
          return (
            <button
              key={index}
              onClick={() => onChannelToggle(entry?.dataKey)}
              onMouseEnter={() => setHoveredChannel(entry?.dataKey)}
              onMouseLeave={() => setHoveredChannel(null)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isSelected 
                  ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/30 opacity-60'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-xs font-medium text-foreground">
                {channel?.name || entry?.value}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Icon name="TrendingUp" size={16} className="text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Channel Performance</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <Icon name="Download" size={16} className="text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="googleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="facebookGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="linkedinGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="emailGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="organicGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="#A1A1AA"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#A1A1AA"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000)?.toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {channels?.map((channel) => (
              selectedChannels?.includes(channel?.key) && (
                <Area
                  key={channel?.key}
                  type="monotone"
                  dataKey={channel?.key}
                  stackId="1"
                  stroke={channel?.color}
                  fill={channel?.gradient}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ 
                    r: 4, 
                    fill: channel?.color,
                    stroke: '#FFFFFF',
                    strokeWidth: 2
                  }}
                  style={{
                    opacity: hoveredChannel && hoveredChannel !== channel?.key ? 0.3 : 1,
                    transition: 'opacity 0.2s ease-out'
                  }}
                />
              )
            ))}
            
            <Legend content={<CustomLegend />} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChannelPerformanceChart;