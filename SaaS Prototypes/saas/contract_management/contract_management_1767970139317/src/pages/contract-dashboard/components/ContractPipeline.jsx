import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ContractPipeline = ({ data, onStageClick }) => {
  const stageColors = {
    'Draft': '#64748B',
    'Review': '#F59E0B',
    'Approval': '#EF4444',
    'Negotiation': '#8B5CF6',
    'Execution': '#10B981',
    'Active': '#06B6D4'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-sm text-muted-foreground">
            {payload?.[0]?.value} contracts
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Click to view details
          </p>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data) => {
    if (onStageClick) {
      onStageClick(data?.stage, data?.count);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Contract Pipeline</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Total: {data?.reduce((sum, item) => sum + item?.count, 0)} contracts</span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="stage" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tick={{ fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tick={{ fill: 'var(--color-muted-foreground)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              onClick={handleBarClick}
            >
              {data?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={stageColors?.[entry?.stage] || '#64748B'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {data?.slice(0, 6)?.map((stage) => (
          <div 
            key={stage?.stage}
            className="flex items-center space-x-2 cursor-pointer hover:bg-muted rounded-lg p-2 transition-smooth"
            onClick={() => handleBarClick(stage)}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: stageColors?.[stage?.stage] }}
            />
            <span className="text-sm text-text-primary">{stage?.stage}</span>
            <span className="text-sm text-muted-foreground">({stage?.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractPipeline;