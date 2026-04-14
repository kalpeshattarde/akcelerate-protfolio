import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import Button from '../../../components/ui/Button';

const AssetAllocation = () => {
  const [viewType, setViewType] = useState('sector');

  const sectorData = [
    { name: 'TECHNOLOGY', value: 35.2, amount: 443127, color: '#0000FF' },
    { name: 'FINANCIAL', value: 22.8, amount: 286932, color: '#00FF00' },
    { name: 'HEALTHCARE', value: 15.4, amount: 193805, color: '#FF4500' },
    { name: 'CONSUMER', value: 12.1, amount: 152275, color: '#FF0000' },
    { name: 'ENERGY', value: 8.3, amount: 104453, color: '#FF00FF' },
    { name: 'OTHERS', value: 6.2, amount: 78081, color: '#808080' }
  ];

  const assetTypeData = [
    { name: 'EQUITY', value: 68.5, amount: 861634, color: '#0000FF' },
    { name: 'DEBT', value: 20.2, amount: 254211, color: '#00FF00' },
    { name: 'GOLD', value: 7.8, amount: 98161, color: '#FF4500' },
    { name: 'CASH', value: 3.5, amount: 44047, color: '#808080' }
  ];

  const currentData = viewType === 'sector' ? sectorData : assetTypeData;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card brutalist-border brutalist-shadow p-4">
          <p className="font-black text-card-foreground text-base tracking-wider">{data?.name}</p>
          <p className="font-black text-primary font-mono">
            {formatCurrency(data?.amount)} ({data?.value}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card brutalist-border brutalist-shadow p-6">
      {/* BRUTALIST HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="border-l-8 border-warning pl-4">
          <h2 className="text-xl font-black text-card-foreground tracking-wider">ASSET</h2>
          <h3 className="text-lg font-black text-primary tracking-wider">ALLOCATION</h3>
        </div>
        
        <div className="flex bg-muted p-2 brutalist-border-thin">
          <Button
            variant={viewType === 'sector' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewType('sector')}
            className="font-black tracking-wider bg-primary text-primary-foreground brutalist-hover"
          >
            SECTOR
          </Button>
          <Button
            variant={viewType === 'asset' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewType('asset')}
            className="font-black tracking-wider bg-warning text-warning-foreground brutalist-hover"
          >
            ASSET
          </Button>
        </div>
      </div>

      {/* CHART */}
      <div className="h-48 mb-6 bg-background brutalist-border p-3">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={currentData}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={100}
              paddingAngle={0}
              dataKey="value"
              stroke="#000000"
              strokeWidth={3}
            >
              {currentData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* DATA LIST */}
      <div className="space-y-4">
        {currentData?.map((item, index) => (
          <div key={index} className="bg-background brutalist-border-thin p-4 brutalist-hover">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-8 h-8 brutalist-border-thin"
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="font-black text-foreground text-lg tracking-wider">{item?.name}</span>
              </div>
              <div className="text-right">
                <p className="font-black text-foreground text-xl font-mono">{item?.value}%</p>
                <p className="font-black text-muted-foreground font-mono text-xs">
                  {formatCurrency(item?.amount)}
                </p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full h-4 bg-muted brutalist-border-thin">
                <div 
                  className="h-full brutalist-border-thin"
                  style={{ 
                    width: `${item?.value}%`,
                    backgroundColor: item?.color
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SCORE SECTION */}
      <div className="mt-8 pt-6 border-t-4 border-border">
        <div className="flex items-center justify-between">
          <span className="font-black text-card-foreground text-lg tracking-wider">DIVERSIFICATION</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4]?.map((star) => (
                <div 
                  key={star}
                  className="w-6 h-6 bg-warning brutalist-border-thin"
                ></div>
              ))}
              <div className="w-6 h-6 bg-muted brutalist-border-thin"></div>
            </div>
            <span className="font-black text-card-foreground text-xl tracking-wider">GOOD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;