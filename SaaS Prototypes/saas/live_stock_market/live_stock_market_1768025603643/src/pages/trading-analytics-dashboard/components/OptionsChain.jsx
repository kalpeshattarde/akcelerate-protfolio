import React, { useState, useEffect } from 'react';



const OptionsChain = ({ selectedSymbol }) => {
  const [optionsData, setOptionsData] = useState([]);
  const [selectedExpiry, setSelectedExpiry] = useState('');
  const [optionType, setOptionType] = useState('both'); // 'calls', 'puts', 'both'
  const [isLoading, setIsLoading] = useState(false);

  // Mock expiry dates
  const expiryDates = [
    '2025-01-30',
    '2025-02-27',
    '2025-03-27',
    '2025-04-24',
    '2025-05-29'
  ];

  // Mock options chain data
  useEffect(() => {
    const generateOptionsData = () => {
      const basePrice = selectedSymbol === 'RELIANCE' ? 2450 : 
                       selectedSymbol === 'TCS' ? 3850 : 
                       selectedSymbol === 'INFY' ? 1650 : 2100;
      
      const strikes = [];
      const startStrike = Math.floor(basePrice / 50) * 50 - 200;
      
      for (let i = 0; i < 20; i++) {
        const strike = startStrike + (i * 50);
        const isITM = strike < basePrice;
        const isATM = Math.abs(strike - basePrice) <= 25;
        
        // Call option data
        const callIV = 15 + Math.random() * 20 + (isATM ? 5 : 0);
        const callPrice = Math.max(0.05, isITM ? (basePrice - strike) + (Math.random() * 20) : Math.random() * 50);
        const callOI = Math.floor(Math.random() * 100000) + 1000;
        const callVolume = Math.floor(Math.random() * 10000);
        
        // Put option data
        const putIV = 15 + Math.random() * 20 + (isATM ? 5 : 0);
        const putPrice = Math.max(0.05, !isITM ? (strike - basePrice) + (Math.random() * 20) : Math.random() * 50);
        const putOI = Math.floor(Math.random() * 100000) + 1000;
        const putVolume = Math.floor(Math.random() * 10000);
        
        strikes?.push({
          strike,
          isATM,
          call: {
            price: callPrice?.toFixed(2),
            change: ((Math.random() - 0.5) * 10)?.toFixed(2),
            iv: callIV?.toFixed(1),
            oi: callOI,
            volume: callVolume,
            bid: (callPrice - 0.5)?.toFixed(2),
            ask: (callPrice + 0.5)?.toFixed(2)
          },
          put: {
            price: putPrice?.toFixed(2),
            change: ((Math.random() - 0.5) * 10)?.toFixed(2),
            iv: putIV?.toFixed(1),
            oi: putOI,
            volume: putVolume,
            bid: (putPrice - 0.5)?.toFixed(2),
            ask: (putPrice + 0.5)?.toFixed(2)
          }
        });
      }
      
      setOptionsData(strikes);
    };

    generateOptionsData();
    if (!selectedExpiry && expiryDates?.length > 0) {
      setSelectedExpiry(expiryDates?.[0]);
    }
    
    const interval = setInterval(generateOptionsData, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [selectedSymbol, selectedExpiry]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatNumber = (num) => {
    if (num >= 100000) return (num / 100000)?.toFixed(1) + 'L';
    if (num >= 1000) return (num / 1000)?.toFixed(1) + 'K';
    return num?.toString();
  };

  const getTotalOI = (type) => {
    return optionsData?.reduce((sum, option) => sum + option?.[type]?.oi, 0);
  };

  const getTotalVolume = (type) => {
    return optionsData?.reduce((sum, option) => sum + option?.[type]?.volume, 0);
  };

  const getPutCallRatio = () => {
    const totalPutOI = getTotalOI('put');
    const totalCallOI = getTotalOI('call');
    return totalCallOI > 0 ? (totalPutOI / totalCallOI)?.toFixed(2) : '0.00';
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Options Chain</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-sm text-muted-foreground">Symbol:</span>
              <span className="ml-2 font-mono font-medium">{selectedSymbol}</span>
            </div>
            
            {/* Expiry Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Expiry:</span>
              <select
                value={selectedExpiry}
                onChange={(e) => setSelectedExpiry(e?.target?.value)}
                className="px-3 py-1 text-sm border border-border rounded bg-background text-foreground"
              >
                {expiryDates?.map(date => (
                  <option key={date} value={date}>
                    {formatDate(date)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Options Chain Table */}
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-muted-foreground">Loading options data...</span>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-muted border-b border-border">
                <tr>
                  {(optionType === 'calls' || optionType === 'both') && (
                    <>
                      <th className="text-center p-2 text-muted-foreground">OI</th>
                      <th className="text-center p-2 text-muted-foreground">Vol</th>
                      <th className="text-center p-2 text-muted-foreground">IV</th>
                      <th className="text-center p-2 text-muted-foreground">LTP</th>
                      <th className="text-center p-2 text-muted-foreground">Chg</th>
                    </>
                  )}
                  <th className="text-center p-2 font-medium text-foreground bg-primary/10">Strike</th>
                  {(optionType === 'puts' || optionType === 'both') && (
                    <>
                      <th className="text-center p-2 text-muted-foreground">Chg</th>
                      <th className="text-center p-2 text-muted-foreground">LTP</th>
                      <th className="text-center p-2 text-muted-foreground">IV</th>
                      <th className="text-center p-2 text-muted-foreground">Vol</th>
                      <th className="text-center p-2 text-muted-foreground">OI</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {optionsData?.map((option) => (
                  <tr 
                    key={option?.strike}
                    className={`border-b border-border hover:bg-muted/50 ${
                      option?.isATM ? 'bg-primary/5' : ''
                    }`}
                  >
                    {(optionType === 'calls' || optionType === 'both') && (
                      <>
                        <td className="text-center p-2 font-mono">{formatNumber(option?.call?.oi)}</td>
                        <td className="text-center p-2 font-mono">{formatNumber(option?.call?.volume)}</td>
                        <td className="text-center p-2 font-mono">{option?.call?.iv}%</td>
                        <td className="text-center p-2 font-mono font-medium">{option?.call?.price}</td>
                        <td className={`text-center p-2 font-mono ${
                          parseFloat(option?.call?.change) >= 0 ? 'text-success' : 'text-error'
                        }`}>
                          {parseFloat(option?.call?.change) >= 0 ? '+' : ''}{option?.call?.change}
                        </td>
                      </>
                    )}
                    <td className={`text-center p-2 font-mono font-bold ${
                      option?.isATM ? 'text-primary bg-primary/10' : 'text-foreground'
                    }`}>
                      {option?.strike}
                    </td>
                    {(optionType === 'puts' || optionType === 'both') && (
                      <>
                        <td className={`text-center p-2 font-mono ${
                          parseFloat(option?.put?.change) >= 0 ? 'text-success' : 'text-error'
                        }`}>
                          {parseFloat(option?.put?.change) >= 0 ? '+' : ''}{option?.put?.change}
                        </td>
                        <td className="text-center p-2 font-mono font-medium">{option?.put?.price}</td>
                        <td className="text-center p-2 font-mono">{option?.put?.iv}%</td>
                        <td className="text-center p-2 font-mono">{formatNumber(option?.put?.volume)}</td>
                        <td className="text-center p-2 font-mono">{formatNumber(option?.put?.oi)}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Footer Stats */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="text-center">
            <div className="text-muted-foreground">Put-Call Ratio</div>
            <div className="font-mono font-bold text-lg text-foreground">{getPutCallRatio()}</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">Total Call OI</div>
            <div className="font-mono font-medium text-success">{formatNumber(getTotalOI('call'))}</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">Total Put OI</div>
            <div className="font-mono font-medium text-error">{formatNumber(getTotalOI('put'))}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsChain;