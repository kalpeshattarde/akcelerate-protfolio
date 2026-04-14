import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WatchlistTable = ({ onSymbolSelect, selectedSymbol }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'symbol', direction: 'asc' });
  const [filter, setFilter] = useState('all');

  // Mock watchlist data
  useEffect(() => {
    const generateWatchlistData = () => {
      const symbols = [
        { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', sector: 'Energy' },
        { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT' },
        { symbol: 'INFY', name: 'Infosys Limited', sector: 'IT' },
        { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', sector: 'Banking' },
        { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', sector: 'Banking' },
        { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', sector: 'FMCG' },
        { symbol: 'ITC', name: 'ITC Limited', sector: 'FMCG' },
        { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking' },
        { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', sector: 'Telecom' },
        { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Banking' },
        { symbol: 'ASIANPAINT', name: 'Asian Paints Limited', sector: 'Paints' },
        { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', sector: 'Auto' }
      ];

      const data = symbols?.map(stock => {
        const basePrice = Math.random() * 3000 + 500;
        const change = (Math.random() - 0.5) * 0.1; // ±5% change
        const changePercent = change * 100;
        const volume = Math.floor(Math.random() * 10000000) + 100000;
        const avgVolume = volume * (0.8 + Math.random() * 0.4);
        const high52w = basePrice * (1.2 + Math.random() * 0.3);
        const low52w = basePrice * (0.7 - Math.random() * 0.2);

        return {
          ...stock,
          price: basePrice?.toFixed(2),
          change: (basePrice * change)?.toFixed(2),
          changePercent: changePercent?.toFixed(2),
          volume: volume,
          avgVolume: Math.floor(avgVolume),
          marketCap: (basePrice * (Math.random() * 1000000 + 100000))?.toFixed(0),
          pe: (15 + Math.random() * 20)?.toFixed(2),
          high52w: high52w?.toFixed(2),
          low52w: low52w?.toFixed(2),
          volumeRatio: (volume / avgVolume)?.toFixed(2),
          rsi: (30 + Math.random() * 40)?.toFixed(2),
          isAlert: Math.random() > 0.8,
          trend: changePercent > 2 ? 'strong-up' : changePercent > 0 ? 'up' : changePercent < -2 ? 'strong-down' : 'down'
        };
      });

      setWatchlist(data);
    };

    generateWatchlistData();
    const interval = setInterval(() => {
      // Update prices every 5 seconds
      setWatchlist(prev => prev?.map(stock => {
        const priceChange = (Math.random() - 0.5) * 0.02; // ±1% change
        const newPrice = parseFloat(stock?.price) * (1 + priceChange);
        const change = newPrice - parseFloat(stock?.price);
        const changePercent = (change / parseFloat(stock?.price)) * 100;

        return {
          ...stock,
          price: newPrice?.toFixed(2),
          change: change?.toFixed(2),
          changePercent: changePercent?.toFixed(2),
          trend: changePercent > 2 ? 'strong-up' : changePercent > 0 ? 'up' : changePercent < -2 ? 'strong-down' : 'down'
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedWatchlist = React.useMemo(() => {
    let sortableItems = [...watchlist];
    if (sortConfig?.key) {
      sortableItems?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];
        
        // Convert to numbers for numeric sorting
        if (!isNaN(aValue) && !isNaN(bValue)) {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }
        
        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [watchlist, sortConfig]);

  const filteredWatchlist = sortedWatchlist?.filter(stock => {
    if (filter === 'gainers') return parseFloat(stock?.changePercent) > 0;
    if (filter === 'losers') return parseFloat(stock?.changePercent) < 0;
    if (filter === 'alerts') return stock?.isAlert;
    return true;
  });

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'strong-up':
        return <Icon name="TrendingUp" size={16} className="text-success" />;
      case 'up':
        return <Icon name="ArrowUp" size={16} className="text-success" />;
      case 'strong-down':
        return <Icon name="TrendingDown" size={16} className="text-error" />;
      case 'down':
        return <Icon name="ArrowDown" size={16} className="text-error" />;
      default:
        return <Icon name="Minus" size={16} className="text-muted-foreground" />;
    }
  };

  const formatNumber = (num) => {
    if (num >= 10000000) return (num / 10000000)?.toFixed(1) + 'Cr';
    if (num >= 100000) return (num / 100000)?.toFixed(1) + 'L';
    if (num >= 1000) return (num / 1000)?.toFixed(1) + 'K';
    return num?.toString();
  };

  return (
    <div className="rounded-lg overflow-hidden">
      {/* Enhanced Header */}
      <div className="p-4 border-b border-border/50 bg-muted/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Market Watchlist</h3>
          <div className="flex items-center space-x-3">
            <div className="glass-panel rounded-lg p-1">
              <Button
                variant={filter === 'all' ? "default" : "ghost"}
                size="xs"
                onClick={() => setFilter('all')}
                className={`px-3 py-2 text-xs smooth-transition ${filter === 'all' ? 'glow-primary' : ''}`}
              >
                All
              </Button>
              <Button
                variant={filter === 'gainers' ? "default" : "ghost"}
                size="xs"
                onClick={() => setFilter('gainers')}
                className={`px-3 py-2 text-xs smooth-transition ${filter === 'gainers' ? 'glow-primary' : ''}`}
              >
                Gainers
              </Button>
              <Button
                variant={filter === 'losers' ? "default" : "ghost"}
                size="xs"
                onClick={() => setFilter('losers')}
                className={`px-3 py-2 text-xs smooth-transition ${filter === 'losers' ? 'glow-primary' : ''}`}
              >
                Losers
              </Button>
              <Button
                variant={filter === 'alerts' ? "default" : "ghost"}
                size="xs"
                onClick={() => setFilter('alerts')}
                className={`px-3 py-2 text-xs smooth-transition ${filter === 'alerts' ? 'glow-primary' : ''}`}
              >
                Alerts
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              iconName="Plus"
              className="glass-panel hover:glow-primary smooth-transition"
            >
              Add Symbol
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <button 
                  onClick={() => handleSort('symbol')}
                  className="flex items-center space-x-2 hover:text-foreground smooth-transition"
                >
                  <span>Symbol</span>
                  {getSortIcon('symbol')}
                </button>
              </th>
              <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <button 
                  onClick={() => handleSort('price')}
                  className="flex items-center space-x-2 hover:text-foreground ml-auto smooth-transition"
                >
                  <span>Price</span>
                  {getSortIcon('price')}
                </button>
              </th>
              <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <button 
                  onClick={() => handleSort('changePercent')}
                  className="flex items-center space-x-2 hover:text-foreground ml-auto smooth-transition"
                >
                  <span>Change %</span>
                  {getSortIcon('changePercent')}
                </button>
              </th>
              <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <button 
                  onClick={() => handleSort('volume')}
                  className="flex items-center space-x-2 hover:text-foreground ml-auto smooth-transition"
                >
                  <span>Volume</span>
                  {getSortIcon('volume')}
                </button>
              </th>
              <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <button 
                  onClick={() => handleSort('marketCap')}
                  className="flex items-center space-x-2 hover:text-foreground ml-auto smooth-transition"
                >
                  <span>Mkt Cap</span>
                  {getSortIcon('marketCap')}
                </button>
              </th>
              <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWatchlist?.map((stock, index) => (
              <tr 
                key={stock?.symbol}
                className={`border-b border-border/30 hover:bg-muted/20 smooth-transition group ${
                  selectedSymbol === stock?.symbol ? 'bg-primary/5 border-primary/30 glow-primary' : ''
                } ${index % 2 === 0 ? 'bg-background/50' : 'bg-muted/10'}`}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    {stock?.isAlert && (
                      <div className="relative">
                        <div className="w-2.5 h-2.5 bg-warning rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-2.5 h-2.5 bg-warning rounded-full animate-ping opacity-30" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-data font-bold text-foreground group-hover:text-primary smooth-transition">
                          {stock?.symbol}
                        </span>
                        <div className={`p-1 rounded ${stock?.trend === 'strong-up' || stock?.trend === 'up' ? 'bg-profit/20' : 'bg-loss/20'}`}>
                          {getTrendIcon(stock?.trend)}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">{stock?.sector}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <span className="text-data font-bold text-lg text-foreground">₹{stock?.price}</span>
                </td>
                <td className="p-4 text-right">
                  <div className={`text-data font-bold text-lg ${
                    parseFloat(stock?.changePercent) >= 0 ? 'text-profit' : 'text-loss'
                  }`}>
                    {parseFloat(stock?.changePercent) >= 0 ? '+' : ''}{stock?.changePercent}%
                  </div>
                  <div className={`text-xs text-data font-medium ${
                    parseFloat(stock?.change) >= 0 ? 'text-profit' : 'text-loss'
                  }`}>
                    {parseFloat(stock?.change) >= 0 ? '+' : ''}₹{stock?.change}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="text-data font-semibold text-foreground">{formatNumber(stock?.volume)}</div>
                  <div className="text-xs text-muted-foreground">
                    <span className={`font-medium ${parseFloat(stock?.volumeRatio) > 1.5 ? 'text-warning' : ''}`}>
                      {stock?.volumeRatio}x
                    </span> avg
                  </div>
                </td>
                <td className="p-4 text-right">
                  <span className="text-data font-semibold text-foreground">₹{formatNumber(parseFloat(stock?.marketCap))}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="BarChart3"
                      onClick={() => onSymbolSelect(stock?.symbol)}
                      title="View Chart"
                      className="glass-panel hover:glow-primary smooth-transition"
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Bell"
                      title="Set Alert"
                      className="glass-panel hover:glow-primary smooth-transition"
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="X"
                      title="Remove"
                      className="glass-panel hover:text-loss smooth-transition"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Footer */}
      <div className="p-4 border-t border-border/50 bg-muted/20">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">
            {filteredWatchlist?.length} stocks in watchlist
          </span>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-profit rounded-full" />
              <span className="font-medium text-profit">
                Gainers: {watchlist?.filter(s => parseFloat(s?.changePercent) > 0)?.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-loss rounded-full" />
              <span className="font-medium text-loss">
                Losers: {watchlist?.filter(s => parseFloat(s?.changePercent) < 0)?.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full animate-pulse" />
              <span className="font-medium text-warning">
                Alerts: {watchlist?.filter(s => s?.isAlert)?.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistTable;