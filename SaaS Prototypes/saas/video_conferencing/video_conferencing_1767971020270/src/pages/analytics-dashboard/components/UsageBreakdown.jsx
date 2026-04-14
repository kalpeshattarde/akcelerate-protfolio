import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const UsageBreakdown = ({ loading = false }) => {
  const [activeTab, setActiveTab] = useState('devices');

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#2563EB' },
    { name: 'Mobile', value: 30, color: '#059669' },
    { name: 'Tablet', value: 25, color: '#D97706' }
  ];

  const geographicData = [
    { name: 'North America', value: 850, percentage: 42 },
    { name: 'Europe', value: 620, percentage: 31 },
    { name: 'Asia Pacific', value: 380, percentage: 19 },
    { name: 'Latin America', value: 120, percentage: 6 },
    { name: 'Others', value: 40, percentage: 2 }
  ];

  const peakHoursData = [
    { hour: '6 AM', meetings: 12 },
    { hour: '8 AM', meetings: 45 },
    { hour: '10 AM', meetings: 78 },
    { hour: '12 PM', meetings: 92 },
    { hour: '2 PM', meetings: 85 },
    { hour: '4 PM', meetings: 67 },
    { hour: '6 PM', meetings: 34 },
    { hour: '8 PM', meetings: 18 }
  ];

  const tabs = [
    { id: 'devices', label: 'Device Types', icon: 'Smartphone' },
    { id: 'geography', label: 'Geographic', icon: 'Globe' },
    { id: 'hours', label: 'Peak Hours', icon: 'Clock' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground">
            {payload?.[0]?.name}: {payload?.[0]?.value}
            {activeTab === 'geography' && ' meetings'}
            {activeTab === 'hours' && ' meetings'}
            {activeTab === 'devices' && '%'}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-48 mb-6"></div>
        <div className="flex space-x-4 mb-6">
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="h-8 bg-muted rounded w-24"></div>
          ))}
        </div>
        <div className="h-80 bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Usage Breakdown</h3>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
              activeTab === tab?.id
                ? 'bg-surface text-foreground shadow-subtle'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="h-80">
        {activeTab === 'devices' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              {deviceData?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item?.color }}
                    ></div>
                    <span className="text-sm font-medium text-foreground">{item?.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item?.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'geography' && (
          <div className="space-y-4">
            {geographicData?.map((region, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{region?.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{region?.value} meetings</span>
                    <span className="text-sm font-medium text-foreground">{region?.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-smooth"
                    style={{ width: `${region?.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'hours' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="hour" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="meetings" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default UsageBreakdown;