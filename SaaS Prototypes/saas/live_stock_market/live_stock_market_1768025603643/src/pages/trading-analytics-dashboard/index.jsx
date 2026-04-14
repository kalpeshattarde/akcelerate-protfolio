import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TradingToolbar from './components/TradingToolbar';
import TradingChart from './components/TradingChart';
import OrderBook from './components/OrderBook';
import RecentTrades from './components/RecentTrades';
import WatchlistTable from './components/WatchlistTable';
import OptionsChain from './components/OptionsChain';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TradingAnalyticsDashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('RELIANCE');
  const [timeframe, setTimeframe] = useState('15m');
  const [chartType, setChartType] = useState('candlestick');
  const [indicators, setIndicators] = useState(['SMA20', 'RSI']);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rightPanelView, setRightPanelView] = useState('orderbook');
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Mock WebSocket connection status with enhanced states
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = ['connected', 'connected', 'connected', 'reconnecting'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      setConnectionStatus(randomStatus);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
  };

  const handleTimeframeChange = (tf) => {
    setTimeframe(tf);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const handleIndicatorsChange = (newIndicators) => {
    setIndicators(newIndicators);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-profit';
      case 'reconnecting':
        return 'text-warning';
      case 'disconnected':
        return 'text-loss';
      default:
        return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Wifi';
      case 'reconnecting':
        return 'WifiOff';
      case 'disconnected':
        return 'WifiOff';
      default:
        return 'Wifi';
    }
  };

  // Stock ticker data for top row
  const tickerData = [
  { symbol: 'NIFTY 50', price: 21450.85, change: 125.30, changePercent: 0.59 },
  { symbol: 'SENSEX', price: 71283.65, change: -89.45, changePercent: -0.13 },
  { symbol: 'BANK NIFTY', price: 48750.20, change: 230.15, changePercent: 0.47 },
  { symbol: 'RELIANCE', price: 2450.75, change: 28.50, changePercent: 1.18 }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Enhanced Stock Ticker Bar */}
        <div className="bg-card border-b border-border p-3 sticky top-20 md:top-24 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8 overflow-x-auto">
              {tickerData?.map((stock, index) =>
              <div key={stock?.symbol} className="flex items-center space-x-3 min-w-fit">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{stock?.symbol}</span>
                    <span className="text-data text-base font-semibold text-foreground">
                      {stock?.symbol?.includes('NIFTY') || stock?.symbol?.includes('SENSEX') ? '' : '₹'}{stock?.price?.toLocaleString()}
                    </span>
                    <span className={`text-xs font-medium ${stock?.change >= 0 ? 'text-profit' : 'text-loss'}`}>
                      {stock?.change >= 0 ? '+' : ''}{stock?.change?.toFixed(2)} ({stock?.changePercent?.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>Market Open: 09:15 - 15:30</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-profit rounded-full animate-pulse" />
                <span className="text-profit font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Toolbar with Glass Morphism */}
        <div className="bg-card border-b border-border px-6 py-4 sticky top-32 md:top-36 z-30">
          <TradingToolbar
            selectedSymbol={selectedSymbol}
            onSymbolChange={handleSymbolChange}
            timeframe={timeframe}
            onTimeframeChange={handleTimeframeChange}
            chartType={chartType}
            onChartTypeChange={handleChartTypeChange}
            indicators={indicators}
            onIndicatorsChange={handleIndicatorsChange} />
        </div>

        {/* Main Trading Interface with Enhanced CSS Grid */}
        <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-background pt-20 md:pt-24' : ''}`}>
          <div className={`${isFullscreen ? 'h-full p-4' : 'dashboard-grid p-5'}`}>
            {/* Main Chart Area with Glass Effects */}
            <div className={`${isFullscreen ? 'h-full' : 'grid-main-chart'} glass-card smooth-transition`}>
              <div className="h-full relative">
                <TradingChart
                  selectedSymbol={selectedSymbol}
                  timeframe={timeframe}
                  chartType={chartType}
                  indicators={indicators} />

                
                {/* Enhanced Chart Controls Overlay */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <div className={`flex items-center space-x-2 px-3 py-2 glass-panel rounded-lg ${getConnectionStatusColor()}`}>
                    <Icon name={getConnectionStatusIcon()} size={14} />
                    <span className="text-xs font-medium capitalize">{connectionStatus}</span>
                    {connectionStatus === 'connected' &&
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                    }
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={isFullscreen ? "Minimize2" : "Maximize2"}
                    onClick={toggleFullscreen}
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    className="glass-panel hover:glow-primary smooth-transition" />

                </div>
              </div>
            </div>

            {/* Right Panel with Enhanced Styling */}
            {!isFullscreen &&
            <div className="grid-indicators space-y-4">
                {/* Panel Selector with Glass Morphism */}
                <div className="glass-panel rounded-lg p-2">
                  <div className="grid grid-cols-3 gap-1">
                    <Button
                    variant={rightPanelView === 'orderbook' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setRightPanelView('orderbook')}
                    className="smooth-transition text-xs">

                      Order Book
                    </Button>
                    <Button
                    variant={rightPanelView === 'trades' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setRightPanelView('trades')}
                    className="smooth-transition text-xs">

                      Trades
                    </Button>
                    <Button
                    variant={rightPanelView === 'options' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setRightPanelView('options')}
                    className="smooth-transition text-xs">

                      Options
                    </Button>
                  </div>
                </div>

                {/* Panel Content with Glass Card */}
                <div className="glass-card flex-1 min-h-[500px]">
                  {rightPanelView === 'orderbook' &&
                <OrderBook selectedSymbol={selectedSymbol} />
                }
                  {rightPanelView === 'trades' &&
                <RecentTrades selectedSymbol={selectedSymbol} />
                }
                  {rightPanelView === 'options' &&
                <OptionsChain selectedSymbol={selectedSymbol} />
                }
                </div>
              </div>
            }

            {/* Watchlist with Enhanced Design */}
            {!isFullscreen &&
            <div className="grid-watchlist">
                <div className="glass-card smooth-hover">
                  <WatchlistTable
                  onSymbolSelect={handleSymbolChange}
                  selectedSymbol={selectedSymbol} />

                </div>
              </div>
            }
          </div>
        </div>

        {/* Enhanced Trading Alerts with Glass Morphism */}
        <div className="fixed bottom-6 right-6 z-40 space-y-3 max-w-sm">
          <div className="glass-card border border-warning/20 rounded-lg p-4 smooth-hover hidden">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">Volume Spike Alert</h4>
                  <Button variant="ghost" size="xs" iconName="X" className="text-muted-foreground hover:text-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedSymbol} volume is 3.2x above average
                </p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{new Date()?.toLocaleTimeString()}</span>
                  <Button variant="ghost" size="xs" className="text-primary hover:text-primary/80">
                    View Chart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Performance Stats Footer */}
        <div className="bg-card border-t border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-profit rounded-full animate-pulse" />
                <span>Market Data: NSE/BSE Real-time</span>
              </div>
              <span>Latency: &lt;25ms</span>
              <span>Updates: Live</span>
              <span>Data Provider: Premium Feed</span>
            </div>
            <div className="flex items-center space-x-8 text-xs text-muted-foreground">
              <span>Session Time: 09:15 - 15:30 IST</span>
              <span>Last Updated: {new Date()?.toLocaleTimeString()}</span>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={12} className="text-warning" />
                <span className="text-warning font-medium">Premium Active</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default TradingAnalyticsDashboard;