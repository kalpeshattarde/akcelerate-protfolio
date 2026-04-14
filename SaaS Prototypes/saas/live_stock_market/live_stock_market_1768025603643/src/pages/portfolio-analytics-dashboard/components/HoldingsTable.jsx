import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HoldingsTable = () => {
  const [sortBy, setSortBy] = useState('value');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filter, setFilter] = useState('all');

  const holdings = [
    {
      symbol: 'RELIANCE',
      name: 'RELIANCE INDUSTRIES LTD',
      sector: 'ENERGY',
      quantity: 120,
      avgPrice: 2000.00,
      ltp: 2047.33,
      value: 245680,
      pnl: 5680,
      pnlPercent: 2.37,
      dayChange: 2.34,
      allocation: 19.5
    },
    {
      symbol: 'TCS',
      name: 'TATA CONSULTANCY SERVICES',
      sector: 'TECHNOLOGY',
      quantity: 50,
      avgPrice: 3850.00,
      ltp: 3795.00,
      value: 189750,
      pnl: -2750,
      pnlPercent: -1.43,
      dayChange: -1.22,
      allocation: 15.1
    },
    {
      symbol: 'HDFC',
      name: 'HDFC BANK LIMITED',
      sector: 'FINANCIAL',
      quantity: 100,
      avgPrice: 1650.00,
      ltp: 1678.34,
      value: 167834,
      pnl: 2834,
      pnlPercent: 1.72,
      dayChange: 0.89,
      allocation: 13.3
    },
    {
      symbol: 'INFY',
      name: 'INFOSYS LIMITED',
      sector: 'TECHNOLOGY',
      quantity: 80,
      avgPrice: 1600.00,
      ltp: 1682.09,
      value: 134567,
      pnl: 6567,
      pnlPercent: 5.13,
      dayChange: 1.56,
      allocation: 10.7
    },
    {
      symbol: 'ITC',
      name: 'ITC LIMITED',
      sector: 'CONSUMER',
      quantity: 200,
      avgPrice: 500.00,
      ltp: 491.17,
      value: 98234,
      pnl: -1766,
      pnlPercent: -1.77,
      dayChange: -0.45,
      allocation: 7.8
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card brutalist-border brutalist-shadow-lg p-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div className="border-l-8 border-primary pl-6">
          <h2 className="text-3xl font-black text-card-foreground tracking-wider">HOLDINGS</h2>
          <h3 className="text-xl font-black text-primary tracking-wider">DETAILED VIEW</h3>
        </div>
        
        <div className="flex items-center gap-4 mt-6 lg:mt-0">
          <div className="flex bg-muted p-2 brutalist-border-thin">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
              className="font-black tracking-wider"
            >
              ALL
            </Button>
            <Button
              variant={filter === 'profit' ? 'success' : 'ghost'}
              size="sm"
              onClick={() => setFilter('profit')}
              className="font-black tracking-wider"
            >
              PROFIT
            </Button>
            <Button
              variant={filter === 'loss' ? 'danger' : 'ghost'}
              size="sm"
              onClick={() => setFilter('loss')}
              className="font-black tracking-wider"
            >
              LOSS
            </Button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-background brutalist-border overflow-hidden">
        {/* TABLE HEADER */}
        <div className="bg-muted grid grid-cols-12 gap-4 p-4 font-black text-muted-foreground tracking-wider text-xs">
          <div className="col-span-2">
            <button 
              onClick={() => handleSort('symbol')}
              className="flex items-center gap-2 hover:text-foreground"
            >
              SYMBOL
              <Icon name={getSortIcon('symbol')} size={14} />
            </button>
          </div>
          <div className="col-span-2">
            <button 
              onClick={() => handleSort('sector')}
              className="flex items-center gap-2 hover:text-foreground"
            >
              SECTOR
              <Icon name={getSortIcon('sector')} size={14} />
            </button>
          </div>
          <div className="col-span-1 text-center">QTY</div>
          <div className="col-span-1 text-right">
            <button 
              onClick={() => handleSort('avgPrice')}
              className="flex items-center gap-2 hover:text-foreground ml-auto"
            >
              AVG PRICE
              <Icon name={getSortIcon('avgPrice')} size={14} />
            </button>
          </div>
          <div className="col-span-1 text-right">LTP</div>
          <div className="col-span-1 text-right">
            <button 
              onClick={() => handleSort('value')}
              className="flex items-center gap-2 hover:text-foreground ml-auto"
            >
              VALUE
              <Icon name={getSortIcon('value')} size={14} />
            </button>
          </div>
          <div className="col-span-2 text-right">P&L</div>
          <div className="col-span-1 text-right">DAY CHANGE</div>
          <div className="col-span-1 text-right">%</div>
        </div>

        {/* TABLE BODY */}
        <div className="divide-y-2 divide-border">
          {holdings?.map((holding, index) => (
            <div 
              key={index} 
              className="grid grid-cols-12 gap-4 p-4 brutalist-hover bg-background hover:bg-muted/20 transition-colors"
            >
              {/* SYMBOL */}
              <div className="col-span-2">
                <div className="text-lg font-black text-foreground font-mono tracking-wider">
                  {holding?.symbol}
                </div>
                <div className="text-xs font-bold text-muted-foreground leading-tight">
                  {holding?.name}
                </div>
              </div>

              {/* SECTOR */}
              <div className="col-span-2">
                <div className="inline-block bg-primary px-3 py-1 brutalist-border-thin">
                  <span className="text-xs font-black text-primary-foreground tracking-wider">
                    {holding?.sector}
                  </span>
                </div>
              </div>

              {/* QUANTITY */}
              <div className="col-span-1 text-center">
                <div className="text-base font-black font-mono text-foreground">
                  {holding?.quantity}
                </div>
              </div>

              {/* AVG PRICE */}
              <div className="col-span-1 text-right">
                <div className="text-base font-black font-mono text-foreground">
                  ₹{holding?.avgPrice?.toFixed(2)}
                </div>
              </div>

              {/* LTP */}
              <div className="col-span-1 text-right">
                <div className="text-base font-black font-mono text-foreground">
                  ₹{holding?.ltp?.toFixed(2)}
                </div>
              </div>

              {/* VALUE */}
              <div className="col-span-1 text-right">
                <div className="text-base font-black font-mono text-foreground">
                  {formatCurrency(holding?.value)}
                </div>
              </div>

              {/* P&L */}
              <div className="col-span-2 text-right">
                <div className={`text-lg font-black font-mono ${
                  holding?.pnl >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {holding?.pnl >= 0 ? '+' : ''}{formatCurrency(holding?.pnl)}
                </div>
                <div className={`text-xs font-black ${
                  holding?.pnlPercent >= 0 ? 'text-success' : 'text-error'
                }`}>
                  ({holding?.pnlPercent >= 0 ? '+' : ''}{holding?.pnlPercent?.toFixed(2)}%)
                </div>
              </div>

              {/* DAY CHANGE */}
              <div className="col-span-1 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Icon 
                    name={holding?.dayChange >= 0 ? 'ArrowUp' : 'ArrowDown'} 
                    size={16}
                    className={holding?.dayChange >= 0 ? 'text-success' : 'text-error'}
                  />
                  <span className={`text-base font-black font-mono ${
                    holding?.dayChange >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {holding?.dayChange >= 0 ? '+' : ''}{holding?.dayChange?.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* ALLOCATION */}
              <div className="col-span-1 text-right">
                <div className="text-base font-black font-mono text-primary">
                  {holding?.allocation}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TABLE FOOTER */}
      <div className="bg-muted brutalist-border-thin p-6 mt-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-2xl font-black text-foreground font-mono">
              {formatCurrency(holdings?.reduce((sum, h) => sum + h?.value, 0))}
            </div>
            <div className="text-base font-black text-muted-foreground tracking-wider">
              TOTAL VALUE
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-black font-mono ${
              holdings?.reduce((sum, h) => sum + h?.pnl, 0) >= 0 ? 'text-success' : 'text-error'
            }`}>
              {formatCurrency(holdings?.reduce((sum, h) => sum + h?.pnl, 0))}
            </div>
            <div className="text-base font-black text-muted-foreground tracking-wider">
              TOTAL P&L
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-foreground font-mono">
              {holdings?.length}
            </div>
            <div className="text-base font-black text-muted-foreground tracking-wider">
              POSITIONS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingsTable;