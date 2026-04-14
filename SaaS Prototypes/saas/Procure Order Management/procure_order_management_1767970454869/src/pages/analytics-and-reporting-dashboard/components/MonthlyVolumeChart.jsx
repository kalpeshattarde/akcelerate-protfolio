import React, { useState } from 'react';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const MonthlyVolumeChart = ({ data }) => {
  const [viewType, setViewType] = useState('orders'); // 'orders' or 'amount'

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-card p-3 shadow-elevation-md">
          <p className="font-body-medium text-text-primary mb-2">{label} 2024</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'orders' ? 'Orders: ' : 
               entry.dataKey === 'amount' ? 'Amount: $' : 'Budget: $'}
              <span className="font-body-medium">
                {entry.dataKey === 'orders' ? entry.value : entry.value.toLocaleString()}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading-semibold text-text-primary mb-1">
            Monthly PO Volume & Spending
          </h3>
          <p className="text-text-secondary text-sm">
            Purchase order trends with budget comparison
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-secondary-100 rounded-button p-1">
            <button
              onClick={() => setViewType('orders')}
              className={`px-3 py-1 text-sm rounded-button transition-smooth ${
                viewType === 'orders' ?'bg-surface text-primary shadow-elevation-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setViewType('amount')}
              className={`px-3 py-1 text-sm rounded-button transition-smooth ${
                viewType === 'amount' ?'bg-surface text-primary shadow-elevation-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Amount
            </button>
          </div>
          
          <button className="p-2 hover:bg-secondary-100 rounded-button transition-smooth">
            <Icon name="MoreHorizontal" size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="month" 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => viewType === 'orders' ? value : `$${(value/1000)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {viewType === 'orders' ? (
              <Bar 
                dataKey="orders" 
                fill="#2563EB" 
                name="Purchase Orders"
                radius={[4, 4, 0, 0]}
              />
            ) : (
              <>
                <Bar 
                  dataKey="amount" 
                  fill="#2563EB" 
                  name="Actual Spend"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="budget" 
                  fill="#E2E8F0" 
                  name="Budget"
                  radius={[4, 4, 0, 0]}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-heading-semibold text-text-primary">
            {data.reduce((sum, item) => sum + item.orders, 0)}
          </div>
          <div className="text-xs text-text-secondary">Total Orders</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-heading-semibold text-text-primary">
            ${(data.reduce((sum, item) => sum + item.amount, 0) / 1000).toFixed(0)}k
          </div>
          <div className="text-xs text-text-secondary">Total Spend</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-heading-semibold text-success">
            ${(data.reduce((sum, item) => sum + (item.budget - item.amount), 0) / 1000).toFixed(0)}k
          </div>
          <div className="text-xs text-text-secondary">Budget Remaining</div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyVolumeChart;