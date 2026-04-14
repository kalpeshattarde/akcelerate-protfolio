import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChannelPerformanceChart = () => {
  const [selectedView, setSelectedView] = useState('campaign');
  const [selectedChannel, setSelectedChannel] = useState('all');

  const chartData = [
    {
      name: 'Google Ads',
      spend: 45000,
      conversions: 1250,
      conversionRate: 5.2,
      impressions: 890000,
      clicks: 24000
    },
    {
      name: 'Facebook Ads',
      spend: 32000,
      conversions: 980,
      conversionRate: 4.8,
      impressions: 650000,
      clicks: 20400
    },
    {
      name: 'LinkedIn Ads',
      spend: 28000,
      conversions: 420,
      conversionRate: 3.2,
      impressions: 180000,
      clicks: 13100
    },
    {
      name: 'Email Marketing',
      spend: 8500,
      conversions: 680,
      conversionRate: 6.8,
      impressions: 120000,
      clicks: 10000
    },
    {
      name: 'Organic Search',
      spend: 0,
      conversions: 1850,
      conversionRate: 8.5,
      impressions: 450000,
      clicks: 21800
    },
    {
      name: 'Display Ads',
      spend: 18000,
      conversions: 320,
      conversionRate: 2.1,
      impressions: 980000,
      clicks: 15200
    }
  ];

  const viewOptions = [
    { id: 'campaign', label: 'Campaign', icon: 'Target' },
    { id: 'adgroup', label: 'Ad Group', icon: 'Layers' },
    { id: 'keyword', label: 'Keyword', icon: 'Hash' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-card p-4 border border-border shadow-lg">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-muted-foreground">{entry?.dataKey}:</span>
              </div>
              <span className="font-medium text-foreground">
                {entry?.dataKey === 'spend' ? `$${entry?.value?.toLocaleString()}` :
                 entry?.dataKey === 'conversionRate' ? `${entry?.value}%` :
                 entry?.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Channel Performance Analysis
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          {viewOptions?.map((option) => (
            <Button
              key={option?.id}
              variant={selectedView === option?.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedView(option?.id)}
              iconName={option?.icon}
              iconPosition="left"
              iconSize={16}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}K`}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar 
              yAxisId="left"
              dataKey="spend" 
              fill="var(--color-primary)"
              name="Ad Spend"
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="conversionRate" 
              stroke="var(--color-accent)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: 'var(--color-accent)', strokeWidth: 2 }}
              name="Conversion Rate (%)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            ${chartData?.reduce((sum, item) => sum + item?.spend, 0)?.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Ad Spend</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {chartData?.reduce((sum, item) => sum + item?.conversions, 0)?.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Conversions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">
            {(chartData?.reduce((sum, item) => sum + item?.conversionRate, 0) / chartData?.length)?.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground">Avg. Conversion Rate</div>
        </div>
      </div>
    </div>
  );
};

export default ChannelPerformanceChart;