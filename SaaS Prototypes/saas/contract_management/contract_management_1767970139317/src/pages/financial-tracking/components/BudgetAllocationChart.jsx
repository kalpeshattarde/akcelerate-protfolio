import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BudgetAllocationChart = () => {
  const [viewType, setViewType] = useState('pie');
  const [timeRange, setTimeRange] = useState('current_year');

  const budgetData = [
    { department: 'IT Department', allocated: 2500000, spent: 1875000, remaining: 625000, utilization: 75, color: '#1E3A8A' },
    { department: 'Operations', allocated: 1800000, spent: 1440000, remaining: 360000, utilization: 80, color: '#0EA5E9' },
    { department: 'Marketing', allocated: 1200000, spent: 960000, remaining: 240000, utilization: 80, color: '#059669' },
    { department: 'R&D', allocated: 2000000, spent: 1400000, remaining: 600000, utilization: 70, color: '#D97706' },
    { department: 'Finance', allocated: 800000, spent: 640000, remaining: 160000, utilization: 80, color: '#DC2626' },
    { department: 'HR', allocated: 600000, spent: 420000, remaining: 180000, utilization: 70, color: '#7C3AED' },
    { department: 'Legal', allocated: 400000, spent: 280000, remaining: 120000, utilization: 70, color: '#EC4899' },
    { department: 'Infrastructure', allocated: 1500000, spent: 1200000, remaining: 300000, utilization: 80, color: '#64748B' }
  ];

  const monthlyTrend = [
    { month: 'Jan', allocated: 750000, spent: 680000 },
    { month: 'Feb', allocated: 750000, spent: 720000 },
    { month: 'Mar', allocated: 750000, spent: 695000 },
    { month: 'Apr', allocated: 750000, spent: 740000 },
    { month: 'May', allocated: 750000, spent: 710000 },
    { month: 'Jun', allocated: 750000, spent: 765000 },
    { month: 'Jul', allocated: 750000, spent: 730000 },
    { month: 'Aug', allocated: 750000, spent: 755000 },
    { month: 'Sep', allocated: 750000, spent: 620000 }
  ];

  const viewOptions = [
    { value: 'pie', label: 'Pie Chart' },
    { value: 'bar', label: 'Bar Chart' },
    { value: 'trend', label: 'Monthly Trend' }
  ];

  const timeRangeOptions = [
    { value: 'current_year', label: 'Current Year (2025)' },
    { value: 'last_year', label: 'Last Year (2024)' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'quarterly', label: 'Quarterly View' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-elevated p-3">
          <p className="text-sm font-medium text-text-primary mb-2">{label || data?.department}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-sm text-muted-foreground">{entry?.name}:</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {formatCurrency(entry?.value)}
              </span>
            </div>
          ))}
          {data?.utilization && (
            <div className="mt-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Utilization:</span>
                <span className="text-sm font-medium text-text-primary">{data?.utilization}%</span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const totalAllocated = budgetData?.reduce((sum, item) => sum + item?.allocated, 0);
  const totalSpent = budgetData?.reduce((sum, item) => sum + item?.spent, 0);
  const totalRemaining = budgetData?.reduce((sum, item) => sum + item?.remaining, 0);
  const overallUtilization = Math.round((totalSpent / totalAllocated) * 100);

  const renderChart = () => {
    switch (viewType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="spent"
                label={({ department, percent }) => `${department}: ${(percent * 100)?.toFixed(0)}%`}
                labelLine={false}
              >
                {budgetData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="department" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000000)?.toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="allocated" fill="var(--color-muted)" name="Allocated" />
              <Bar dataKey="spent" fill="var(--color-primary)" name="Spent" />
              <Bar dataKey="remaining" fill="var(--color-success)" name="Remaining" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'trend':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}K`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), '']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar dataKey="allocated" fill="var(--color-muted)" name="Monthly Budget" />
              <Bar dataKey="spent" fill="var(--color-accent)" name="Actual Spend" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Budget Allocation & Utilization</h3>
          <div className="flex items-center space-x-3">
            <Select
              options={viewOptions}
              value={viewType}
              onChange={setViewType}
              className="w-32"
            />
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              className="w-40"
            />
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{formatCurrency(totalAllocated)}</div>
            <div className="text-sm text-muted-foreground">Total Allocated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalSpent)}</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{formatCurrency(totalRemaining)}</div>
            <div className="text-sm text-muted-foreground">Remaining Budget</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{overallUtilization}%</div>
            <div className="text-sm text-muted-foreground">Overall Utilization</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {renderChart()}
      </div>
      {/* Department Details */}
      <div className="p-6 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-4">Department Breakdown</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {budgetData?.map((dept) => (
            <div key={dept?.department} className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: dept?.color }}
                />
                <h5 className="text-sm font-medium text-text-primary">{dept?.department}</h5>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Allocated:</span>
                  <span className="text-text-primary">{formatCurrency(dept?.allocated)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spent:</span>
                  <span className="text-text-primary">{formatCurrency(dept?.spent)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className="text-success">{formatCurrency(dept?.remaining)}</span>
                </div>
                
                {/* Utilization Bar */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Utilization</span>
                    <span className="text-xs font-medium text-text-primary">{dept?.utilization}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${dept?.utilization}%`,
                        backgroundColor: dept?.utilization > 85 ? '#DC2626' : dept?.utilization > 70 ? '#D97706' : '#059669'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetAllocationChart;