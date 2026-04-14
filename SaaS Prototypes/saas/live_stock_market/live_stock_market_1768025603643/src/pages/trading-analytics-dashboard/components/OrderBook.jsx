import React, { useState, useEffect } from 'react';


const OrderBook = ({ selectedSymbol }) => {
  const [orderBookData, setOrderBookData] = useState({ bids: [], asks: [] });
  const [isLoading, setIsLoading] = useState(false);

  // Mock order book data
  useEffect(() => {
    const generateOrderBook = () => {
      const basePrice = selectedSymbol === 'RELIANCE' ? 2450 : 
                       selectedSymbol === 'TCS' ? 3850 : 
                       selectedSymbol === 'INFY' ? 1650 : 2100;
      
      const bids = [];
      const asks = [];
      
      // Generate bid orders (buyers)
      for (let i = 0; i < 10; i++) {
        const price = basePrice - (i + 1) * 0.5;
        const quantity = Math.floor(Math.random() * 1000) + 100;
        const orders = Math.floor(Math.random() * 20) + 1;
        bids?.push({
          price: price?.toFixed(2),
          quantity,
          orders,
          total: (price * quantity)?.toFixed(0)
        });
      }
      
      // Generate ask orders (sellers)
      for (let i = 0; i < 10; i++) {
        const price = basePrice + (i + 1) * 0.5;
        const quantity = Math.floor(Math.random() * 1000) + 100;
        const orders = Math.floor(Math.random() * 20) + 1;
        asks?.push({
          price: price?.toFixed(2),
          quantity,
          orders,
          total: (price * quantity)?.toFixed(0)
        });
      }
      
      setOrderBookData({ bids, asks });
    };

    generateOrderBook();
    const interval = setInterval(generateOrderBook, 2000); // Update every 2 seconds
    
    return () => clearInterval(interval);
  }, [selectedSymbol]);

  const maxBidQuantity = Math.max(...orderBookData?.bids?.map(bid => bid?.quantity));
  const maxAskQuantity = Math.max(...orderBookData?.asks?.map(ask => ask?.quantity));

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Order Book</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{selectedSymbol}</p>
      </div>
      {/* Order Book Content */}
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
                <span>Price</span>
                <span className="text-right">Qty</span>
                <span className="text-right">Orders</span>
                <span className="text-right">Total</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Ask Orders (Sellers) */}
              <div className="space-y-1 p-2">
                {orderBookData?.asks?.slice()?.reverse()?.map((ask, index) => (
                  <div key={`ask-${index}`} className="relative">
                    <div 
                      className="absolute inset-0 bg-error/10 rounded"
                      style={{ 
                        width: `${(ask?.quantity / maxAskQuantity) * 100}%`,
                        right: 0
                      }}
                    />
                    <div className="relative grid grid-cols-4 gap-2 text-xs py-1 px-2 hover:bg-muted/50 rounded">
                      <span className="font-mono text-error">₹{ask?.price}</span>
                      <span className="text-right font-mono">{ask?.quantity}</span>
                      <span className="text-right text-muted-foreground">{ask?.orders}</span>
                      <span className="text-right font-mono">₹{ask?.total}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Spread Indicator */}
              <div className="px-4 py-3 border-y border-border bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Spread</span>
                  <span className="text-xs font-mono font-medium">
                    ₹{(parseFloat(orderBookData?.asks?.[0]?.price || 0) - parseFloat(orderBookData?.bids?.[0]?.price || 0))?.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Bid Orders (Buyers) */}
              <div className="space-y-1 p-2">
                {orderBookData?.bids?.map((bid, index) => (
                  <div key={`bid-${index}`} className="relative">
                    <div 
                      className="absolute inset-0 bg-success/10 rounded"
                      style={{ 
                        width: `${(bid?.quantity / maxBidQuantity) * 100}%`,
                        left: 0
                      }}
                    />
                    <div className="relative grid grid-cols-4 gap-2 text-xs py-1 px-2 hover:bg-muted/50 rounded">
                      <span className="font-mono text-success">₹{bid?.price}</span>
                      <span className="text-right font-mono">{bid?.quantity}</span>
                      <span className="text-right text-muted-foreground">{bid?.orders}</span>
                      <span className="text-right font-mono">₹{bid?.total}</span>
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
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground">Total Bids:</span>
            <span className="ml-2 font-mono font-medium text-success">
              {orderBookData?.bids?.reduce((sum, bid) => sum + bid?.quantity, 0)?.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Total Asks:</span>
            <span className="ml-2 font-mono font-medium text-error">
              {orderBookData?.asks?.reduce((sum, ask) => sum + ask?.quantity, 0)?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;