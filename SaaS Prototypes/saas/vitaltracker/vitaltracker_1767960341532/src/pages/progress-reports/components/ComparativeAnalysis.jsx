import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparativeAnalysis = () => {
  const [comparisonType, setComparisonType] = useState('periods');
  const [selectedPeriods, setSelectedPeriods] = useState(['current', 'previous']);

  const periodOptions = [
    { value: 'current', label: 'Current Month (Oct 2024)' },
    { value: 'previous', label: 'Previous Month (Sep 2024)' },
    { value: 'quarter', label: 'Last Quarter (Jul-Sep 2024)' },
    { value: 'year', label: 'Same Month Last Year (Oct 2023)' }
  ];

  const comparisonTypes = [
    { value: 'periods', label: 'Time Periods', icon: 'Calendar' },
    { value: 'goals', label: 'Goals vs Actual', icon: 'Target' },
    { value: 'metrics', label: 'Metric Performance', icon: 'BarChart3' }
  ];

  // Mock data for different comparison types
  const periodComparisonData = [
    {
      metric: 'Steps',
      current: 12500,
      previous: 10200,
      quarter: 9800,
      year: 8500,
      unit: 'steps/day'
    },
    {
      metric: 'Calories Burned',
      current: 2400,
      previous: 2100,
      quarter: 2000,
      year: 1900,
      unit: 'cal/day'
    },
    {
      metric: 'Water Intake',
      current: 2.8,
      previous: 2.3,
      quarter: 2.1,
      year: 2.0,
      unit: 'L/day'
    },
    {
      metric: 'Sleep Hours',
      current: 6.2,
      previous: 7.1,
      quarter: 7.3,
      year: 6.8,
      unit: 'hours/day'
    },
    {
      metric: 'Active Minutes',
      current: 85,
      previous: 72,
      quarter: 68,
      year: 60,
      unit: 'min/day'
    }
  ];

  const goalsComparisonData = [
    {
      metric: 'Steps',
      goal: 10000,
      actual: 12500,
      achievement: 125,
      unit: 'steps/day'
    },
    {
      metric: 'Calories',
      goal: 2200,
      actual: 2400,
      achievement: 109,
      unit: 'cal/day'
    },
    {
      metric: 'Water',
      goal: 3.0,
      actual: 2.8,
      achievement: 93,
      unit: 'L/day'
    },
    {
      metric: 'Sleep',
      goal: 8.0,
      actual: 6.2,
      achievement: 78,
      unit: 'hours/day'
    },
    {
      metric: 'Exercise',
      goal: 60,
      actual: 85,
      achievement: 142,
      unit: 'min/day'
    }
  ];

  const radarData = [
    {
      metric: 'Activity',
      current: 92,
      previous: 78,
      fullMark: 100
    },
    {
      metric: 'Nutrition',
      current: 88,
      previous: 85,
      fullMark: 100
    },
    {
      metric: 'Sleep',
      current: 75,
      previous: 89,
      fullMark: 100
    },
    {
      metric: 'Hydration',
      current: 85,
      previous: 72,
      fullMark: 100
    },
    {
      metric: 'Consistency',
      current: 90,
      previous: 82,
      fullMark: 100
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border/40 rounded-lg p-3 shadow-wellness elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderComparisonChart = () => {
    switch (comparisonType) {
      case 'goals':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={goalsComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="metric" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="goal" fill="#94A3B8" name="Goal" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="#5DB075" name="Actual" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'metrics':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
              />
              <Radar
                name="Current Period"
                dataKey="current"
                stroke="#5DB075"
                fill="#5DB075"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Previous Period"
                dataKey="previous"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={periodComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="metric" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {selectedPeriods?.includes('current') && (
                <Bar dataKey="current" fill="#5DB075" name="Current Month" radius={[4, 4, 0, 0]} />
              )}
              {selectedPeriods?.includes('previous') && (
                <Bar dataKey="previous" fill="#3B82F6" name="Previous Month" radius={[4, 4, 0, 0]} />
              )}
              {selectedPeriods?.includes('quarter') && (
                <Bar dataKey="quarter" fill="#34D399" name="Last Quarter" radius={[4, 4, 0, 0]} />
              )}
              {selectedPeriods?.includes('year') && (
                <Bar dataKey="year" fill="#F59E0B" name="Last Year" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  const getInsightText = () => {
    switch (comparisonType) {
      case 'goals':
        return "You're exceeding your step and exercise goals while falling short on sleep targets.";
      case 'metrics':
        return "Activity and hydration show significant improvement, but sleep quality needs attention.";
      default:
        return "Overall wellness metrics show 18% improvement compared to last month.";
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 elevation-2 border border-border/40">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="GitCompare" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Comparative Analysis</h3>
            <p className="text-sm text-muted-foreground">Compare your progress across different periods</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {comparisonTypes?.map((type) => (
            <Button
              key={type?.value}
              variant={comparisonType === type?.value ? "default" : "outline"}
              size="sm"
              onClick={() => setComparisonType(type?.value)}
              iconName={type?.icon}
              iconPosition="left"
            >
              {type?.label}
            </Button>
          ))}
        </div>
      </div>
      {comparisonType === 'periods' && (
        <div className="mb-6">
          <Select
            label="Select Periods to Compare"
            options={periodOptions}
            value={selectedPeriods}
            onChange={setSelectedPeriods}
            multiple
            placeholder="Choose periods to compare"
            className="max-w-md"
          />
        </div>
      )}
      <div className="mb-6">
        {renderComparisonChart()}
      </div>
      {/* Key Insights */}
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0">
            <Icon name="Lightbulb" size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Key Insight</h4>
            <p className="text-sm text-muted-foreground">{getInsightText()}</p>
          </div>
        </div>
      </div>
      {/* Detailed Metrics Table */}
      {comparisonType === 'periods' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-3 px-2 font-medium text-foreground">Metric</th>
                {selectedPeriods?.map((period) => (
                  <th key={period} className="text-right py-3 px-2 font-medium text-foreground">
                    {periodOptions?.find(p => p?.value === period)?.label?.split(' (')?.[0]}
                  </th>
                ))}
                <th className="text-right py-3 px-2 font-medium text-foreground">Change</th>
              </tr>
            </thead>
            <tbody>
              {periodComparisonData?.map((row, index) => {
                const currentValue = row?.[selectedPeriods?.[0]] || 0;
                const previousValue = row?.[selectedPeriods?.[1]] || 0;
                const change = previousValue ? ((currentValue - previousValue) / previousValue * 100)?.toFixed(1) : 0;
                const isPositive = change > 0;
                
                return (
                  <tr key={index} className="border-b border-border/20 last:border-b-0">
                    <td className="py-3 px-2 font-medium text-foreground">{row?.metric}</td>
                    {selectedPeriods?.map((period) => (
                      <td key={period} className="text-right py-3 px-2 text-muted-foreground">
                        {row?.[period]} {row?.unit}
                      </td>
                    ))}
                    <td className={`text-right py-3 px-2 font-medium ${
                      isPositive ? 'text-success' : 'text-error'
                    }`}>
                      {isPositive ? '+' : ''}{change}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-6 border-t border-border/40 space-y-3 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Comparison updated: Oct 11, 2024
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export Analysis
          </Button>
          <Button variant="ghost" size="sm" iconName="Share2">
            Share Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparativeAnalysis;