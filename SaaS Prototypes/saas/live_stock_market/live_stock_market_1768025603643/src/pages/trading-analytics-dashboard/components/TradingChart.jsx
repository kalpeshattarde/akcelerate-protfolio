import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';

import Button from '../../../components/ui/Button';

const TradingChart = ({ selectedSymbol, timeframe, chartType, indicators }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [drawingMode, setDrawingMode] = useState(null);
  const [zoom, setZoom] = useState({ start: 0, end: 100 });

  // Mock chart data with realistic trading patterns
  const chartData = useMemo(() => {
    const basePrice = selectedSymbol === 'RELIANCE' ? 2450 : 
                     selectedSymbol === 'TCS' ? 3850 : 
                     selectedSymbol === 'INFY' ? 1650 : 2100;
    
    const data = [];
    const intervals = timeframe === '1m' ? 240 : timeframe === '5m' ? 48 : timeframe === '15m' ? 16 : 24;
    
    for (let i = 0; i < intervals; i++) {
      const volatility = Math.random() * 0.03 - 0.015; // ±1.5% volatility
      const trend = Math.sin(i / 10) * 0.01; // Slight trend
      const price = basePrice * (1 + trend + volatility);
      
      const open = i === 0 ? basePrice : data?.[i-1]?.close || basePrice;
      const close = price;
      const high = Math.max(open, close) * (1 + Math.random() * 0.01);
      const low = Math.min(open, close) * (1 - Math.random() * 0.01);
      const volume = Math.floor(Math.random() * 1000000) + 100000;
      
      // Technical indicators
      const sma20 = i >= 19 ? data?.slice(Math.max(0, i-19), i+1)?.reduce((sum, d) => sum + d?.close, 0) / Math.min(20, i+1) : close;
      const sma50 = i >= 49 ? data?.slice(Math.max(0, i-49), i+1)?.reduce((sum, d) => sum + d?.close, 0) / Math.min(50, i+1) : close;
      
      data?.push({
        time: new Date(Date.now() - (intervals - i) * (timeframe === '1m' ? 60000 : timeframe === '5m' ? 300000 : timeframe === '15m' ? 900000 : 3600000))?.toLocaleTimeString('en-US', { hour12: false }),
        open,
        high,
        low,
        close,
        volume,
        sma20: indicators?.includes('SMA20') ? sma20 : null,
        sma50: indicators?.includes('SMA50') ? sma50 : null,
        rsi: indicators?.includes('RSI') ? 30 + Math.random() * 40 : null,
        macd: indicators?.includes('MACD') ? (Math.random() - 0.5) * 10 : null
      });
    }
    return data;
  }, [selectedSymbol, timeframe, indicators]);

  const currentPrice = chartData?.[chartData?.length - 1]?.close || 0;
  const previousPrice = chartData?.[chartData?.length - 2]?.close || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = (priceChange / previousPrice) * 100;

  const drawingTools = [
    { id: 'trendline', name: 'Trend Line', icon: 'TrendingUp' },
    { id: 'horizontal', name: 'Horizontal Line', icon: 'Minus' },
    { id: 'rectangle', name: 'Rectangle', icon: 'Square' },
    { id: 'fibonacci', name: 'Fibonacci', icon: 'GitBranch' }
  ];

  const timeframes = [
    { value: '1m', label: '1M' },
    { value: '5m', label: '5M' },
    { value: '15m', label: '15M' },
    { value: '1H', label: '1H' },
    { value: '4H', label: '4H' },
    { value: '1D', label: '1D' }
  ];

  const chartTypes = [
    { value: 'candlestick', label: 'Candlestick', icon: 'BarChart3' },
    { value: 'ohlc', label: 'OHLC', icon: 'BarChart2' },
    { value: 'line', label: 'Line', icon: 'TrendingUp' },
    { value: 'area', label: 'Area', icon: 'Activity' }
  ];

  // Enhanced Custom Tooltip with Glass Morphism
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="glass-card border border-border/50 rounded-lg p-4 shadow-2xl min-w-[200px]">
          <p className="text-sm font-semibold text-foreground mb-3">{label}</p>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Open:</span>
                <span className="text-data font-semibold text-foreground">₹{data?.open?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">High:</span>
                <span className="text-data font-semibold text-profit">₹{data?.high?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Low:</span>
                <span className="text-data font-semibold text-loss">₹{data?.low?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Close:</span>
                <span className="text-data font-semibold text-foreground">₹{data?.close?.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-border/30">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume:</span>
                <span className="text-data font-semibold text-primary">{(data?.volume / 1000)?.toFixed(0)}K</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis domain={['dataMin - 10', 'dataMax + 10']} stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="close" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            {indicators?.includes('SMA20') && (
              <Line type="monotone" dataKey="sma20" stroke="var(--color-warning)" strokeWidth={1} dot={false} strokeDasharray="5 5" />
            )}
            {indicators?.includes('SMA50') && (
              <Line type="monotone" dataKey="sma50" stroke="var(--color-accent)" strokeWidth={1} dot={false} strokeDasharray="10 5" />
            )}
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis domain={['dataMin - 10', 'dataMax + 10']} stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="close" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.1} />
          </AreaChart>
        );
      
      default:
        return (
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis yAxisId="price" domain={['dataMin - 10', 'dataMax + 10']} stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis yAxisId="volume" orientation="right" domain={[0, 'dataMax']} stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="volume" dataKey="volume" fill="var(--color-muted)" fillOpacity={0.3} />
            <Line yAxisId="price" type="monotone" dataKey="close" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            {indicators?.includes('SMA20') && (
              <Line yAxisId="price" type="monotone" dataKey="sma20" stroke="var(--color-warning)" strokeWidth={1} dot={false} strokeDasharray="5 5" />
            )}
            {indicators?.includes('SMA50') && (
              <Line yAxisId="price" type="monotone" dataKey="sma50" stroke="var(--color-accent)" strokeWidth={1} dot={false} strokeDasharray="10 5" />
            )}
          </ComposedChart>
        );
    }
  };

  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden">
      {/* Enhanced Chart Header */}
      <div className="p-4 border-b border-border/30 bg-muted/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-foreground">{selectedSymbol}</h2>
            <div className="flex items-center space-x-3">
              <span className="text-3xl text-data font-bold text-foreground">
                ₹{currentPrice?.toFixed(2)}
              </span>
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                priceChange >= 0 ? 'bg-profit/20 text-profit' : 'bg-loss/20 text-loss'
              }`}>
                <span className="text-sm font-semibold">
                  {priceChange >= 0 ? '+' : ''}₹{priceChange?.toFixed(2)}
                </span>
                <span className="text-sm font-semibold">
                  ({priceChangePercent?.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="glass-panel rounded-lg p-1">
              {timeframes?.map((tf) => (
                <Button
                  key={tf?.value}
                  variant={timeframe === tf?.value ? "default" : "ghost"}
                  size="xs"
                  className={`px-3 py-2 text-xs smooth-transition ${
                    timeframe === tf?.value ? 'glow-primary' : ''
                  }`}
                >
                  {tf?.label}
                </Button>
              ))}
            </div>
            
            <div className="glass-panel rounded-lg p-1">
              {chartTypes?.map((type) => (
                <Button
                  key={type?.value}
                  variant={chartType === type?.value ? "default" : "ghost"}
                  size="xs"
                  iconName={type?.icon}
                  className={`px-3 py-2 smooth-transition ${
                    chartType === type?.value ? 'glow-primary' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Drawing Tools */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-muted-foreground">Drawing Tools:</span>
            <div className="flex items-center space-x-1">
              {drawingTools?.map((tool) => (
                <Button
                  key={tool?.id}
                  variant={drawingMode === tool?.id ? "default" : "ghost"}
                  size="xs"
                  iconName={tool?.icon}
                  onClick={() => setDrawingMode(drawingMode === tool?.id ? null : tool?.id)}
                  className={`px-3 py-2 smooth-transition ${
                    drawingMode === tool?.id ? 'glow-primary' : 'hover:bg-muted/30'
                  }`}
                  title={tool?.name}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="xs" iconName="ZoomIn" className="glass-panel hover:glow-primary smooth-transition">
              Zoom In
            </Button>
            <Button variant="ghost" size="xs" iconName="ZoomOut" className="glass-panel hover:glow-primary smooth-transition">
              Zoom Out
            </Button>
            <Button variant="ghost" size="xs" iconName="RotateCcw" className="glass-panel hover:glow-primary smooth-transition">
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Chart Area */}
      <div className="flex-1 p-4 bg-background/50">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-muted-foreground font-medium">Loading chart data...</span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        )}
      </div>

      {/* Enhanced Technical Indicators Footer */}
      {indicators?.length > 0 && (
        <div className="p-4 border-t border-border/30 bg-muted/10">
          <div className="flex items-center space-x-8">
            {indicators?.includes('RSI') && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">RSI(14):</span>
                <span className="text-data font-bold text-foreground">
                  {chartData?.[chartData?.length - 1]?.rsi?.toFixed(2) || '--'}
                </span>
              </div>
            )}
            {indicators?.includes('MACD') && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">MACD:</span>
                <span className="text-data font-bold text-foreground">
                  {chartData?.[chartData?.length - 1]?.macd?.toFixed(2) || '--'}
                </span>
              </div>
            )}
            {indicators?.includes('SMA20') && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">SMA(20):</span>
                <span className="text-data font-bold text-warning">
                  ₹{chartData?.[chartData?.length - 1]?.sma20?.toFixed(2) || '--'}
                </span>
              </div>
            )}
            {indicators?.includes('SMA50') && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">SMA(50):</span>
                <span className="text-data font-bold text-primary">
                  ₹{chartData?.[chartData?.length - 1]?.sma50?.toFixed(2) || '--'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingChart;