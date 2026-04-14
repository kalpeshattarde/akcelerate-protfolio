import React, { useState, useEffect } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CombinationChart = ({ data, isLoading = false, onExport }) => {
  const [chartData, setChartData] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState({
    energy: true,
    emissions: true
  });
  const [timeRange, setTimeRange] = useState('12months');

  useEffect(() => {
    // Mock data for the combination chart
    const mockData = [
      { month: 'Jan', energy: 2400, emissions: 1200, target: 1100 },
      { month: 'Feb', energy: 2210, emissions: 1100, target: 1100 },
      { month: 'Mar', energy: 2290, emissions: 1150, target: 1100 },
      { month: 'Apr', energy: 2000, emissions: 980, target: 1100 },
      { month: 'May', energy: 2181, emissions: 1080, target: 1100 },
      { month: 'Jun', energy: 2500, emissions: 1250, target: 1100 },
      { month: 'Jul', energy: 2100, emissions: 1050, target: 1100 },
      { month: 'Aug', energy: 2300, emissions: 1150, target: 1100 },
      { month: 'Sep', energy: 2200, emissions: 1100, target: 1100 },
      { month: 'Oct', energy: 2400, emissions: 1200, target: 1100 },
      { month: 'Nov', energy: 2600, emissions: 1300, target: 1100 },
      { month: 'Dec', energy: 2800, emissions: 1400, target: 1100 }
    ];

    setChartData(data || mockData);
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-modal">
          <p className="font-semibold text-foreground mb-2">{`${label} 2024`}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm text-foreground">
                {entry?.name}: {entry?.value?.toLocaleString()} 
                {entry?.dataKey === 'energy' ? ' MWh' : ' tCO₂e'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleMetricToggle = (metric) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [metric]: !prev?.[metric]
    }));
  };

  const handleExport = () => {
    if (onExport) {
      onExport('combination-chart', chartData);
    }
  };

  const timeRangeOptions = [
    { value: '6months', label: '6 Months' },
    { value: '12months', label: '12 Months' },
    { value: '24months', label: '24 Months' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Energy & Emissions Trend</h3>
          <p className="text-sm text-muted-foreground">Monthly energy consumption vs CO₂e emissions</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {timeRangeOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => setTimeRange(option?.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                  timeRange === option?.value
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {option?.label}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
      {/* Metric Toggles */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleMetricToggle('energy')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 ${
              selectedMetrics?.energy
                ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm font-medium">Energy Used (MWh)</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleMetricToggle('emissions')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 ${
              selectedMetrics?.emissions
                ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-sm font-medium">CO₂e Emissions (tCO₂e)</span>
          </button>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80 w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Loader2" size={20} className="animate-spin" />
              <span>Loading chart data...</span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="left"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Energy (MWh)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Emissions (tCO₂e)', angle: 90, position: 'insideRight' }}
              />
              
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {selectedMetrics?.energy && (
                <Bar 
                  yAxisId="left"
                  dataKey="energy" 
                  fill="url(#energyGradient)"
                  name="Energy Used"
                  radius={[4, 4, 0, 0]}
                />
              )}
              
              {selectedMetrics?.emissions && (
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="var(--color-success)"
                  strokeWidth={3}
                  name="CO₂e Emissions"
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--color-success)', strokeWidth: 2 }}
                />
              )}
              
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="target" 
                stroke="var(--color-warning)"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
      {/* Chart Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Best Performance</span>
          </div>
          <p className="text-xs text-muted-foreground">April 2024 - Lowest emissions ratio</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Attention Needed</span>
          </div>
          <p className="text-xs text-muted-foreground">Dec 2024 - Above target threshold</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Annual Progress</span>
          </div>
          <p className="text-xs text-muted-foreground">78% towards 2024 reduction goal</p>
        </div>
      </div>
    </div>
  );
};

export default CombinationChart;