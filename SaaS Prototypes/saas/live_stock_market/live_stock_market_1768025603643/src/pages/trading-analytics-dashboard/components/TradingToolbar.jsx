import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TradingToolbar = ({ 
  selectedSymbol, 
  onSymbolChange, 
  timeframe, 
  onTimeframeChange, 
  chartType, 
  onChartTypeChange,
  indicators,
  onIndicatorsChange 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSymbolSearch, setShowSymbolSearch] = useState(false);
  const [showIndicators, setShowIndicators] = useState(false);

  // Mock symbol data
  const symbols = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2450.75, change: 1.2 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3850.20, change: -0.8 },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1650.45, change: 2.1 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', price: 1580.30, change: 0.5 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', price: 950.80, change: -1.2 },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', price: 2380.90, change: 0.9 },
    { symbol: 'ITC', name: 'ITC Limited', price: 420.15, change: 1.8 },
    { symbol: 'SBIN', name: 'State Bank of India', price: 580.25, change: -0.3 },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', price: 850.60, change: 2.5 },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1720.40, change: 1.1 }
  ];

  const timeframes = [
    { value: '1m', label: '1M', description: '1 Minute' },
    { value: '5m', label: '5M', description: '5 Minutes' },
    { value: '15m', label: '15M', description: '15 Minutes' },
    { value: '1H', label: '1H', description: '1 Hour' },
    { value: '4H', label: '4H', description: '4 Hours' },
    { value: '1D', label: '1D', description: '1 Day' }
  ];

  const chartTypes = [
    { value: 'candlestick', label: 'Candlestick', icon: 'BarChart3' },
    { value: 'ohlc', label: 'OHLC', icon: 'BarChart2' },
    { value: 'line', label: 'Line', icon: 'TrendingUp' },
    { value: 'area', label: 'Area', icon: 'Activity' }
  ];

  const availableIndicators = [
    { id: 'SMA20', name: 'SMA (20)', description: 'Simple Moving Average 20' },
    { id: 'SMA50', name: 'SMA (50)', description: 'Simple Moving Average 50' },
    { id: 'EMA20', name: 'EMA (20)', description: 'Exponential Moving Average 20' },
    { id: 'RSI', name: 'RSI (14)', description: 'Relative Strength Index' },
    { id: 'MACD', name: 'MACD', description: 'Moving Average Convergence Divergence' },
    { id: 'BB', name: 'Bollinger Bands', description: 'Bollinger Bands (20, 2)' },
    { id: 'STOCH', name: 'Stochastic', description: 'Stochastic Oscillator' },
    { id: 'ADX', name: 'ADX', description: 'Average Directional Index' }
  ];

  const filteredSymbols = symbols?.filter(symbol => 
    symbol?.symbol?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    symbol?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleSymbolSelect = (symbol) => {
    onSymbolChange(symbol?.symbol);
    setShowSymbolSearch(false);
    setSearchQuery('');
  };

  const toggleIndicator = (indicatorId) => {
    const newIndicators = indicators?.includes(indicatorId)
      ? indicators?.filter(id => id !== indicatorId)
      : [...indicators, indicatorId];
    onIndicatorsChange(newIndicators);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between space-x-4">
        {/* Left Section - Enhanced Symbol Search */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowSymbolSearch(!showSymbolSearch)}
              className="min-w-[220px] justify-between glass-panel hover:glow-primary smooth-transition"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Search" size={16} className="text-primary" />
                <div className="text-left">
                  <span className="text-data font-semibold text-foreground block">{selectedSymbol}</span>
                  <span className="text-xs text-muted-foreground">Click to search</span>
                </div>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {/* Enhanced Symbol Search Dropdown */}
            {showSymbolSearch && (
              <div className="absolute top-full left-0 mt-2 w-96 glass-card border border-border/50 rounded-lg shadow-2xl z-50">
                <div className="p-4 border-b border-border/50">
                  <Input
                    type="search"
                    placeholder="Search symbols or companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full glass-panel border-border/50 focus:border-primary"
                    autoFocus
                  />
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {filteredSymbols?.map((symbol, index) => (
                    <button
                      key={symbol?.symbol}
                      onClick={() => handleSymbolSelect(symbol)}
                      className="w-full p-4 text-left hover:bg-muted/30 border-b border-border/30 last:border-b-0 smooth-transition group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-data font-semibold text-foreground group-hover:text-primary">{symbol?.symbol}</span>
                            <span className={`text-xs px-2 py-1 rounded ${symbol?.change >= 0 ? 'bg-profit/20 text-profit' : 'bg-loss/20 text-loss'}`}>
                              {symbol?.change >= 0 ? '↗' : '↘'}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground truncate">{symbol?.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-data font-semibold text-foreground">₹{symbol?.price}</div>
                          <div className={`text-xs font-medium ${symbol?.change >= 0 ? 'text-profit' : 'text-loss'}`}>
                            {symbol?.change >= 0 ? '+' : ''}{symbol?.change}%
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-3 border-t border-border/50 bg-muted/20">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{filteredSymbols?.length} results found</span>
                    <span>Press ESC to close</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Market Status */}
          <div className="glass-panel rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-3 h-3 bg-profit rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-profit rounded-full animate-ping opacity-30" />
              </div>
              <div>
                <span className="text-sm font-semibold text-profit">Market Open</span>
                <div className="text-xs text-muted-foreground">NSE • BSE • MCX</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Enhanced Controls */}
        <div className="flex items-center space-x-4">
          {/* Timeframe Selector with Grid Layout */}
          <div className="glass-panel rounded-lg p-2">
            <div className="grid grid-cols-3 gap-2">
              {timeframes?.map((tf) => (
                <Button
                  key={tf?.value}
                  variant={timeframe === tf?.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTimeframeChange(tf?.value)}
                  className={`px-3 py-2 text-xs font-medium smooth-transition min-w-[60px] ${
                    timeframe === tf?.value ? 'glow-primary' : 'hover:bg-muted/50'
                  }`}
                  title={tf?.description}
                >
                  {tf?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Chart Type Selector with Enhanced Icons */}
          <div className="glass-panel rounded-lg p-1">
            <div className="flex items-center space-x-1">
              {chartTypes?.map((type) => (
                <Button
                  key={type?.value}
                  variant={chartType === type?.value ? "default" : "ghost"}
                  size="sm"
                  iconName={type?.icon}
                  onClick={() => onChartTypeChange(type?.value)}
                  className={`px-4 py-2 smooth-transition ${
                    chartType === type?.value ? 'glow-primary' : 'hover:bg-muted/50'
                  }`}
                  title={type?.label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Enhanced Tools */}
        <div className="flex items-center space-x-3">
          {/* Enhanced Technical Indicators */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowIndicators(!showIndicators)}
              iconName="TrendingUp"
              className="min-w-[140px] justify-between glass-panel hover:glow-primary smooth-transition"
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium">Indicators</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                  {indicators?.length}
                </span>
              </div>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {/* Enhanced Indicators Dropdown */}
            {showIndicators && (
              <div className="absolute top-full right-0 mt-2 w-72 glass-card border border-border/50 rounded-lg shadow-2xl z-50">
                <div className="p-4 border-b border-border/50">
                  <h4 className="font-semibold text-foreground mb-1">Technical Indicators</h4>
                  <p className="text-xs text-muted-foreground">Select indicators to overlay on chart</p>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {availableIndicators?.map((indicator) => (
                    <button
                      key={indicator?.id}
                      onClick={() => toggleIndicator(indicator?.id)}
                      className={`w-full p-3 text-left rounded-lg mb-1 smooth-transition group ${
                        indicators?.includes(indicator?.id) 
                          ? 'bg-primary/10 border border-primary/20 text-primary' :'hover:bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-sm mb-1">{indicator?.name}</div>
                          <div className="text-xs text-muted-foreground">{indicator?.description}</div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          indicators?.includes(indicator?.id)
                            ? 'border-primary bg-primary' :'border-muted-foreground group-hover:border-primary'
                        }`}>
                          {indicators?.includes(indicator?.id) && (
                            <Icon name="Check" size={12} className="text-background" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-3 border-t border-border/50 bg-muted/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{indicators?.length} indicators active</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onIndicatorsChange([])}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Additional Tools */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              iconName="Settings" 
              title="Chart Settings"
              className="glass-panel hover:glow-primary smooth-transition" 
            />
            <Button 
              variant="ghost" 
              size="sm" 
              iconName="Download" 
              title="Export Chart"
              className="glass-panel hover:glow-primary smooth-transition" 
            />
            <Button 
              variant="ghost" 
              size="sm" 
              iconName="Maximize2" 
              title="Fullscreen"
              className="glass-panel hover:glow-primary smooth-transition" 
            />
          </div>
        </div>
      </div>
      
      {/* Enhanced click outside overlay */}
      {(showSymbolSearch || showIndicators) && (
        <div 
          className="fixed inset-0 z-40 bg-background/20 backdrop-blur-sm" 
          onClick={() => {
            setShowSymbolSearch(false);
            setShowIndicators(false);
          }}
        />
      )}
    </div>
  );
};

export default TradingToolbar;