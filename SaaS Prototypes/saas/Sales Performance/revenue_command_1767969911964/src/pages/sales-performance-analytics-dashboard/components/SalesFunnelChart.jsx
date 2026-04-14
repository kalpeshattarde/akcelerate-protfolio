import React, { useState } from 'react';
import { FunnelChart, Funnel, Cell, ResponsiveContainer, Tooltip, LabelList } from 'recharts';
import Icon from '../../../components/AppIcon';

const SalesFunnelChart = () => {
  const [selectedStage, setSelectedStage] = useState(null);

  const funnelData = [
    {
      name: 'Leads',
      value: 2840,
      fill: '#1F3F82',
      opportunities: 2840,
      conversionRate: 100,
      avgDealSize: 15000
    },
    {
      name: 'Qualified',
      value: 1420,
      fill: '#2563EB',
      opportunities: 1420,
      conversionRate: 50,
      avgDealSize: 18000
    },
    {
      name: 'Proposal',
      value: 710,
      fill: '#3B82F6',
      opportunities: 710,
      conversionRate: 25,
      avgDealSize: 22000
    },
    {
      name: 'Negotiation',
      value: 355,
      fill: '#60A5FA',
      opportunities: 355,
      conversionRate: 12.5,
      avgDealSize: 28000
    },
    {
      name: 'Closed Won',
      value: 213,
      fill: '#28C76F',
      opportunities: 213,
      conversionRate: 7.5,
      avgDealSize: 32000
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-modal">
          <h4 className="font-semibold text-text-primary mb-2">{data.name}</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Opportunities:</span>
              <span className="font-medium">{data.opportunities.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Conversion Rate:</span>
              <span className="font-medium">{data.conversionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Avg Deal Size:</span>
              <span className="font-medium">${data.avgDealSize.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleStageClick = (stage) => {
    setSelectedStage(selectedStage === stage.name ? null : stage.name);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Filter" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Sales Funnel Analysis</h3>
            <p className="text-sm text-text-secondary">Pipeline progression by stage</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-3 py-1.5 bg-muted rounded-md text-sm text-text-secondary hover:text-primary transition-colors">
            <Icon name="Download" size={14} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 bg-muted rounded-md text-sm text-text-secondary hover:text-primary transition-colors">
            <Icon name="Maximize2" size={14} />
            <span>Expand</span>
          </button>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip content={<CustomTooltip />} />
            <Funnel
              dataKey="value"
              data={funnelData}
              isAnimationActive={true}
              onClick={handleStageClick}
              className="cursor-pointer"
            >
              <LabelList position="center" fill="#fff" fontSize={14} fontWeight="600" />
              {funnelData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={selectedStage === entry.name ? '#FFB400' : entry.fill}
                  stroke={selectedStage === entry.name ? '#FFB400' : 'transparent'}
                  strokeWidth={selectedStage === entry.name ? 2 : 0}
                />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

      {/* Stage Details */}
      <div className="mt-6 grid grid-cols-5 gap-4">
        {funnelData.map((stage, index) => (
          <div
            key={stage.name}
            className={`
              p-3 rounded-lg border cursor-pointer transition-all duration-200
              ${selectedStage === stage.name 
                ? 'border-warning bg-warning/5' :'border-border bg-muted/30 hover:bg-muted/50'
              }
            `}
            onClick={() => handleStageClick(stage)}
          >
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">{stage.opportunities.toLocaleString()}</div>
              <div className="text-xs text-text-secondary mb-1">{stage.name}</div>
              <div className="text-xs font-medium text-primary">{stage.conversionRate}%</div>
            </div>
          </div>
        ))}
      </div>

      {selectedStage && (
        <div className="mt-4 p-4 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-warning" />
            <span className="font-medium text-text-primary">Stage Details: {selectedStage}</span>
          </div>
          <p className="text-sm text-text-secondary">
            Click on individual opportunities to drill down into detailed analysis and rep performance for this stage.
          </p>
        </div>
      )}
    </div>
  );
};

export default SalesFunnelChart;