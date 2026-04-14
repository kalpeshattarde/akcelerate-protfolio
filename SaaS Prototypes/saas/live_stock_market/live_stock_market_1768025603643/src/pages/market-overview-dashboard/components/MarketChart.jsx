import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart } from 'recharts';

import Button from '../../../components/ui/Button';

const MarketChart = ({ selectedIndex = 'NIFTY50', timeRange = '1D' }) => {
  const [chartType, setChartType] = useState('candlestick');
  const [showVolume, setShowVolume] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Mock chart data based on time range
  const generateChartData = () => {
    const basePrice = 19500;
    const dataPoints = timeRange === '1D' ? 24 : timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : 90;
    
    return Array.from({ length: dataPoints }, (_, i) => {
      const variation = (Math.random() - 0.5) * 200;
      const price = basePrice + variation + (i * 10);
      const volume = Math.floor(Math.random() * 1000000) + 500000;
      
      return {
        time: timeRange === '1D' 
          ? `${9 + Math.floor(i * 7/24)}:${(i * 15) % 60 < 10 ? '0' : ''}${(i * 15) % 60}`
          : timeRange === '1W'
          ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']?.[i]
          : `${i + 1}/${new Date()?.getMonth() + 1}`,
        price: price,
        open: price - 20,
        high: price + 30,
        low: price - 40,
        close: price,
        volume: volume
      };
    });
  };

  const [chartData, setChartData] = useState(generateChartData());

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setChartData(generateChartData());
      setIsLoading(false);
    }, 500);
  }, [selectedIndex, timeRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground capitalize">{entry?.dataKey}:</span>
              <span className="text-sm font-mono text-foreground">
                {entry?.dataKey === 'volume' 
                  ? `${(entry?.value / 1000000)?.toFixed(2)}M`
                  : `₹${entry?.value?.toFixed(2)}`
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-32 mb-4"></div>
          <div className="h-80 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{selectedIndex} Chart</h2>
          <p className="text-sm text-muted-foreground">Real-time price movement</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('line')}
            iconName="TrendingUp"
            iconPosition="left"
          >
            Line
          </Button>
          <Button
            variant={chartType === 'candlestick' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('candlestick')}
            iconName="BarChart3"
            iconPosition="left"
          >
            Candle
          </Button>
          <Button
            variant={showVolume ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowVolume(!showVolume)}
            iconName="Activity"
            iconPosition="left"
          >
            Volume
          </Button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {showVolume ? (
            <ComposedChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(224, 224, 224)" />
              <XAxis 
                dataKey="time" 
                stroke="rgb(117, 117, 117)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="price"
                orientation="right"
                stroke="rgb(117, 117, 117)"
                fontSize={12}
                tickFormatter={(value) => `₹${value?.toFixed(0)}`}
              />
              <YAxis 
                yAxisId="volume"
                orientation="left"
                stroke="rgb(117, 117, 117)"
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000000)?.toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                yAxisId="volume"
                dataKey="volume" 
                fill="rgba(21, 101, 192, 0.3)"
                stroke="rgb(21, 101, 192)"
                strokeWidth={1}
              />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="price"
                stroke="rgb(21, 101, 192)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "rgb(21, 101, 192)" }}
              />
            </ComposedChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(224, 224, 224)" />
              <XAxis 
                dataKey="time" 
                stroke="rgb(117, 117, 117)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgb(117, 117, 117)"
                fontSize={12}
                tickFormatter={(value) => `₹${value?.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="rgb(21, 101, 192)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "rgb(21, 101, 192)" }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Live</span>
          </div>
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="ghost" size="sm" iconName="Maximize2">
            Fullscreen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketChart;