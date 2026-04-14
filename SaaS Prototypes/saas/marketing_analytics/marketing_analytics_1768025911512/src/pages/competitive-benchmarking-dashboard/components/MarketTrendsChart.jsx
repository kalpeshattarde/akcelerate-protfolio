import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';

const MarketTrendsChart = () => {
  const [selectedMetric, setSelectedMetric] = useState('market-share');
  const [timeRange, setTimeRange] = useState('12m');

  const trendData = [
  {
    month: 'Jan 2024',
    'market-share': 10.2,
    'brand-awareness': 62,
    'cpl-efficiency': 78,
    'digital-presence': 71,
    industry_avg: 11.5
  },
  {
    month: 'Feb 2024',
    'market-share': 10.8,
    'brand-awareness': 64,
    'cpl-efficiency': 79,
    'digital-presence': 73,
    industry_avg: 11.3
  },
  {
    month: 'Mar 2024',
    'market-share': 11.1,
    'brand-awareness': 65,
    'cpl-efficiency': 80,
    'digital-presence': 74,
    industry_avg: 11.8
  },
  {
    month: 'Apr 2024',
    'market-share': 11.5,
    'brand-awareness': 66,
    'cpl-efficiency': 81,
    'digital-presence': 75,
    industry_avg: 12.1
  },
  {
    month: 'May 2024',
    'market-share': 11.8,
    'brand-awareness': 67,
    'cpl-efficiency': 82,
    'digital-presence': 76,
    industry_avg: 12.0
  },
  {
    month: 'Jun 2024',
    'market-share': 12.1,
    'brand-awareness': 68,
    'cpl-efficiency': 82,
    'digital-presence': 76,
    industry_avg: 11.9
  },
  {
    month: 'Jul 2024',
    'market-share': 12.4,
    'brand-awareness': 68,
    'cpl-efficiency': 82,
    'digital-presence': 76,
    industry_avg: 12.2
  }];


  const metrics = [
  { id: 'market-share', label: 'Market Share', unit: '%', color: '#00D4FF' },
  { id: 'brand-awareness', label: 'Brand Awareness', unit: '%', color: '#8B5CF6' },
  { id: 'cpl-efficiency', label: 'CPL Efficiency', unit: '/100', color: '#39FF14' },
  { id: 'digital-presence', label: 'Digital Presence', unit: '/100', color: '#F59E0B' }];


  const timeRanges = [
  { id: '6m', label: '6 Months' },
  { id: '12m', label: '12 Months' },
  { id: '24m', label: '24 Months' }];


  const selectedMetricData = metrics?.find((m) => m?.id === selectedMetric);
  const latestValue = trendData?.[trendData?.length - 1]?.[selectedMetric];
  const previousValue = trendData?.[trendData?.length - 2]?.[selectedMetric];
  const change = ((latestValue - previousValue) / previousValue * 100)?.toFixed(1);
  const isPositive = change > 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) =>
          <div key={index} className="flex items-center justify-between space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }} />

                <span className="text-muted-foreground">
                  {entry?.dataKey === 'industry_avg' ? 'Industry Average' : selectedMetricData?.label}:
                </span>
              </div>
              <span className="font-medium text-foreground">
                {entry?.value}{selectedMetricData?.unit}
              </span>
            </div>
          )}
        </div>);

    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Market Trends Analysis
          </h3>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Metric:</span>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e?.target?.value)}
              className="backdrop-blur-sm border border-glass-border rounded-md px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-card/90 hover:bg-card/90 transition-all duration-200 shadow-subtle bg-[rgba(6,19,50,1)]">
              {metrics?.map((metric) =>
              <option key={metric?.id} value={metric?.id} className="bg-card text-foreground">
                  {metric?.label}
                </option>
              )}
            </select>
          </div>
          
          <div className="flex items-center space-x-1 bg-muted/20 rounded-lg p-1">
            {timeRanges?.map((range) =>
            <button
              key={range?.id}
              onClick={() => setTimeRange(range?.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              timeRange === range?.id ?
              'bg-primary text-primary-foreground' :
              'text-muted-foreground hover:text-foreground'}`
              }>

                {range?.label}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-muted/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedMetricData?.color }} />

              <span className="text-sm font-medium text-foreground">
                Current {selectedMetricData?.label}
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-foreground">
                {latestValue}{selectedMetricData?.unit}
              </span>
              <div className={`flex items-center space-x-1 ${
              isPositive ? 'text-success' : 'text-destructive'}`
              }>
                <Icon
                  name={isPositive ? 'TrendingUp' : 'TrendingDown'}
                  size={14} />

                <span className="text-sm font-medium">
                  {Math.abs(change)}%
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              vs previous month
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              Trend Indicators
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-success/10 rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name="ArrowUp" size={14} className="text-success" />
                  <span className="text-xs text-success">Growth Phase</span>
                </div>
                <span className="text-xs font-medium text-success">Active</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/20 rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Seasonal Peak</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">Q3</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="month"
                  stroke="#A1A1AA"
                  fontSize={12}
                  tickLine={false} />

                <YAxis
                  stroke="#A1A1AA"
                  fontSize={12}
                  tickLine={false} />

                <Tooltip content={<CustomTooltip />} />
                
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={selectedMetricData?.color}
                  strokeWidth={3}
                  dot={{ fill: selectedMetricData?.color, strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: selectedMetricData?.color, strokeWidth: 2 }} />

                
                <Line
                  type="monotone"
                  dataKey="industry_avg"
                  stroke="#6B7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false} />

                
                <ReferenceLine
                  y={trendData?.[0]?.industry_avg}
                  stroke="#6B7280"
                  strokeDasharray="3 3"
                  label={{ value: "Industry Baseline", position: "topRight" }} />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Your Performance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border border-muted-foreground" style={{ borderStyle: 'dashed' }} />
            <span className="text-xs text-muted-foreground">Industry Average</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-primary cursor-pointer hover:text-primary/80 transition-colors">
          <Icon name="BarChart3" size={14} />
          <span className="text-sm">View detailed analysis</span>
        </div>
      </div>
    </div>);

};

export default MarketTrendsChart;