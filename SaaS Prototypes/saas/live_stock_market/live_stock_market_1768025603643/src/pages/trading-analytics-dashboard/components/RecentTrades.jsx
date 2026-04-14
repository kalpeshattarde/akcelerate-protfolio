import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RecentTrades = ({ selectedSymbol }) => {
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock recent trades data
  useEffect(() => {
    const generateTrades = () => {
      const basePrice = selectedSymbol === 'RELIANCE' ? 2450 : 
                       selectedSymbol === 'TCS' ? 3850 : 
                       selectedSymbol === 'INFY' ? 1650 : 2100;
      
      const newTrades = [];
      for (let i = 0; i < 20; i++) {
        const priceVariation = (Math.random() - 0.5) * 0.02; // ±1% variation
        const price = basePrice * (1 + priceVariation);
        const quantity = Math.floor(Math.random() * 500) + 10;
        const isBuy = Math.random() > 0.5;
        const time = new Date(Date.now() - i * 30000); // 30 seconds apart
        
        newTrades?.push({
          id: Date.now() + i,
          price: price?.toFixed(2),
          quantity,
          side: isBuy ? 'buy' : 'sell',
          time: time?.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }),
          value: (price * quantity)?.toFixed(0)
        });
      }
      
      setTrades(newTrades);
    };

    generateTrades();
    const interval = setInterval(() => {
      // Add new trade at the beginning
      const basePrice = selectedSymbol === 'RELIANCE' ? 2450 : 
                       selectedSymbol === 'TCS' ? 3850 : 
                       selectedSymbol === 'INFY' ? 1650 : 2100;
      
      const priceVariation = (Math.random() - 0.5) * 0.02;
      const price = basePrice * (1 + priceVariation);
      const quantity = Math.floor(Math.random() * 500) + 10;
      const isBuy = Math.random() > 0.5;
      
      const newTrade = {
        id: Date.now(),
        price: price?.toFixed(2),
        quantity,
        side: isBuy ? 'buy' : 'sell',
        time: new Date()?.toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        value: (price * quantity)?.toFixed(0)
      };
      
      setTrades(prev => [newTrade, ...prev?.slice(0, 19)]);
    }, 3000); // New trade every 3 seconds
    
    return () => clearInterval(interval);
  }, [selectedSymbol]);

  const totalVolume = trades?.reduce((sum, trade) => sum + trade?.quantity, 0);
  const totalValue = trades?.reduce((sum, trade) => sum + parseFloat(trade?.value), 0);
  const buyTrades = trades?.filter(trade => trade?.side === 'buy')?.length;
  const sellTrades = trades?.filter(trade => trade?.side === 'sell')?.length;

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Trades</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{selectedSymbol}</p>
      </div>
      {/* Trades Content */}
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-muted-foreground">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* Column Headers */}
            <div className="px-4 py-2 border-b border-border bg-muted">
              <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground">
                <span>Time</span>
                <span className="text-right">Price</span>
                <span className="text-right">Qty</span>
                <span className="text-right">Side</span>
              </div>
            </div>

            {/* Trades List */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-1 p-2">
                {trades?.map((trade, index) => (
                  <div 
                    key={trade?.id} 
                    className={`grid grid-cols-4 gap-2 text-xs py-2 px-2 rounded hover:bg-muted/50 transition-colors ${
                      index === 0 ? 'bg-primary/5 border border-primary/20' : ''
                    }`}
                  >
                    <span className="font-mono text-muted-foreground">{trade?.time}</span>
                    <span className={`text-right font-mono font-medium ${
                      trade?.side === 'buy' ? 'text-success' : 'text-error'
                    }`}>
                      ₹{trade?.price}
                    </span>
                    <span className="text-right font-mono">{trade?.quantity}</span>
                    <div className="flex items-center justify-end">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                        trade?.side === 'buy' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                      }`}>
                        <Icon 
                          name={trade?.side === 'buy' ? 'TrendingUp' : 'TrendingDown'} 
                          size={10} 
                        />
                        <span className="uppercase">{trade?.side}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer Stats */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Volume:</span>
              <span className="font-mono font-medium">{totalVolume?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Value:</span>
              <span className="font-mono font-medium">₹{totalValue?.toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-success">Buy Orders:</span>
              <span className="font-mono font-medium text-success">{buyTrades}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-error">Sell Orders:</span>
              <span className="font-mono font-medium text-error">{sellTrades}</span>
            </div>
          </div>
        </div>
        
        {/* Buy/Sell Ratio Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Order Ratio</span>
            <span className="font-mono">{((buyTrades / (buyTrades + sellTrades)) * 100)?.toFixed(0)}% Buy</span>
          </div>
          <div className="w-full bg-error/20 rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${(buyTrades / (buyTrades + sellTrades)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTrades;