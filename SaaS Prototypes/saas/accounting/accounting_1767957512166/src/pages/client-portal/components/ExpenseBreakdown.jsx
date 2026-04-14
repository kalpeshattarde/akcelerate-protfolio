import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from 'components/AppIcon';

const ExpenseBreakdown = () => {
  const expenseData = [
    { name: 'Operations', value: 35, amount: 15750, color: '#1e3a5f' },
    { name: 'Marketing', value: 25, amount: 11250, color: '#4a90a4' },
    { name: 'Technology', value: 20, amount: 9000, color: '#e67e22' },
    { name: 'Personnel', value: 15, amount: 6750, color: '#27ae60' },
    { name: 'Other', value: 5, amount: 2250, color: '#f39c12' }
  ];

  const totalExpenses = expenseData?.reduce((sum, item) => sum + item?.amount, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-text-primary mb-1">{data?.name}</p>
          <p className="text-sm text-text-secondary">
            ${data?.amount?.toLocaleString()} ({data?.value}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center justify-between space-x-2 min-w-0">
            <div className="flex items-center space-x-2 min-w-0">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-text-secondary truncate">{entry?.value}</span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-sm font-medium text-text-primary">
                ${expenseData?.find(item => item?.name === entry?.value)?.amount?.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            Expense Breakdown
          </h3>
          <p className="text-sm text-text-secondary">Current month distribution</p>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <div className="text-right">
            <span className="text-sm text-text-secondary">Total: </span>
            <span className="font-heading font-semibold text-text-primary">
              ${totalExpenses?.toLocaleString()}
            </span>
          </div>
          <button className="p-2 hover:bg-background rounded-lg nav-transition flex-shrink-0">
            <Icon name="Download" size={16} color="var(--color-text-secondary)" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={window.innerWidth < 640 ? 80 : 100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expenseData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-center">
          <CustomLegend payload={expenseData?.map(item => ({ value: item?.name, color: item?.color }))} />
        </div>
      </div>

      <div className="mt-6 space-y-3">        
        {expenseData?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: item?.color }}
              ></div>
              <span className="text-sm text-text-primary truncate">{item?.name}</span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-sm font-medium text-text-primary">
                ${item?.amount?.toLocaleString()}
              </span>
              <span className="text-xs text-text-secondary ml-2">({item?.value}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseBreakdown;