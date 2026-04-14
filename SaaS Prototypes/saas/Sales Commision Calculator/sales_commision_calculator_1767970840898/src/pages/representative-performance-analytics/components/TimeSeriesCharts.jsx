import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const TimeSeriesCharts = ({ data, timePeriod, representative, setActiveChat }) => {
  const [activeChart, setActiveChart] = useState('revenue');

  if (!data || !representative) {
    return (
      <div className="card-glass">
        <div className="text-center text-white/70">
          <Icon name="BarChart3" size={48} className="mx-auto mb-4 text-white/40" />
          <p>Select a representative to view performance trends</p>
        </div>
      </div>);

  }

  const chartTypes = [
  {
    id: 'revenue',
    label: 'Revenue Trends',
    icon: 'DollarSign',
    description: 'Track revenue performance over time'
  },
  {
    id: 'deals',
    label: 'Deal Velocity',
    icon: 'TrendingUp',
    description: 'Monitor deal closure patterns'
  },
  {
    id: 'commission',
    label: 'Commission Earnings',
    icon: 'Award',
    description: 'View commission earnings progression'
  }];


  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-morphism-elevated border border-white/20 rounded-sm shadow-dark p-3">
          <p className="font-medium text-white mb-2">{label}</p>
          {payload.map((entry, index) =>
          <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {
            activeChart === 'revenue' || activeChart === 'commission' ?
            formatCurrency(entry.value) :
            formatNumber(entry.value)
            }
            </p>
          )}
        </div>);

    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (activeChart) {
      case 'revenue':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="period"
                stroke="#64748B"
                fontSize={12} />

              <YAxis
                stroke="#64748B"
                fontSize={12}
                tickFormatter={formatCurrency} />

              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
                name="Revenue" />

            </LineChart>
          </ResponsiveContainer>);


      case 'deals':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="period"
                stroke="#64748B"
                fontSize={12} />

              <YAxis
                stroke="#64748B"
                fontSize={12} />

              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="deals"
                fill="#059669"
                radius={[4, 4, 0, 0]}
                name="Deals Closed" />

            </BarChart>
          </ResponsiveContainer>);


      case 'commission':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="period"
                stroke="#64748B"
                fontSize={12} />

              <YAxis
                stroke="#64748B"
                fontSize={12}
                tickFormatter={formatCurrency} />

              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="commission"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
                name="Commission" />

            </LineChart>
          </ResponsiveContainer>);


      default:
        return null;
    }
  };

  // Calculate summary statistics
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalDeals = data.reduce((sum, item) => sum + item.deals, 0);
  const totalCommission = data.reduce((sum, item) => sum + item.commission, 0);
  const avgDealSize = totalDeals > 0 ? totalRevenue / totalDeals : 0;

  return (
    <div className="card-glass">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-white">Performance Trends</h3>
            <p className="text-sm text-white/70 mt-1">
              {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} analysis for {representative.name}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-white/60" />
            <span className="text-sm text-white/70 capitalize">{timePeriod} View</span>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="flex space-x-1 glass-morphism-dark p-1 rounded-sm">
          {chartTypes.map((type) =>
          <button
            key={type.id}
            onClick={() => setActiveChat(type.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-sm text-sm font-medium transition-smooth ${
            activeChart === type.id ?
            'glass-morphism text-neon-indigo shadow-soft' :
            'text-white/70 hover:text-white'}`
            }>

              <Icon name={type.icon} size={16} />
              <span>{type.label}</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Chart Description */}
        <div className="mb-4 p-3 glass-morphism-dark rounded-sm">
          <p className="text-sm text-white/70">
            {chartTypes.find((type) => type.id === activeChart)?.description}
          </p>
        </div>

        {/* Chart */}
        <div className="mb-6">
          {renderChart()}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{formatCurrency(totalRevenue)}</div>
            <div className="text-xs text-white/60">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{totalDeals}</div>
            <div className="text-xs text-white/60">Total Deals</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{formatCurrency(totalCommission)}</div>
            <div className="text-xs text-white/60">Total Commission</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{formatCurrency(avgDealSize)}</div>
            <div className="text-xs text-white/60">Avg Deal Size</div>
          </div>
        </div>
      </div>
    </div>);

};

export default TimeSeriesCharts;