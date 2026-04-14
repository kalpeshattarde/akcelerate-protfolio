import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FunnelAnalysis = () => {
  const [selectedStage, setSelectedStage] = useState(null);

  const funnelData = [
    {
      id: 'awareness',
      stage: 'Awareness',
      value: 100000,
      percentage: 100,
      color: 'bg-blue-500',
      icon: 'Eye',
      description: 'Initial brand exposure and reach'
    },
    {
      id: 'interest',
      stage: 'Interest',
      value: 45000,
      percentage: 45,
      color: 'bg-purple-500',
      icon: 'MousePointer',
      description: 'Engaged with content or ads'
    },
    {
      id: 'consideration',
      stage: 'Consideration',
      value: 18000,
      percentage: 18,
      color: 'bg-indigo-500',
      icon: 'Search',
      description: 'Actively researching solutions'
    },
    {
      id: 'intent',
      stage: 'Intent',
      value: 8500,
      percentage: 8.5,
      color: 'bg-cyan-500',
      icon: 'ShoppingCart',
      description: 'Added to cart or requested demo'
    },
    {
      id: 'purchase',
      stage: 'Purchase',
      value: 3200,
      percentage: 3.2,
      color: 'bg-green-500',
      icon: 'CreditCard',
      description: 'Completed purchase or conversion'
    }
  ];

  const touchpointData = [
    { channel: 'Google Ads', awareness: 35000, interest: 15750, consideration: 6300, intent: 2975, purchase: 1120 },
    { channel: 'Facebook Ads', awareness: 28000, interest: 12600, consideration: 5040, intent: 2380, purchase: 896 },
    { channel: 'LinkedIn Ads', awareness: 15000, interest: 6750, consideration: 2700, intent: 1275, purchase: 480 },
    { channel: 'Email Marketing', awareness: 12000, interest: 5400, consideration: 2160, intent: 1020, purchase: 384 },
    { channel: 'Organic Search', awareness: 10000, interest: 4500, consideration: 1800, intent: 850, purchase: 320 }
  ];

  const calculateDropoff = (current, previous) => {
    if (!previous) return 0;
    return ((previous - current) / previous * 100)?.toFixed(1);
  };

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Customer Journey Funnel
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            iconSize={16}
          >
            Configure
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Funnel Visualization */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground mb-4">Conversion Funnel</h3>
          {funnelData?.map((stage, index) => (
            <div
              key={stage?.id}
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedStage === stage?.id ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setSelectedStage(selectedStage === stage?.id ? null : stage?.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${stage?.color} bg-opacity-20`}>
                  <Icon name={stage?.icon} size={20} className={stage?.color?.replace('bg-', 'text-')} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{stage?.stage}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-foreground">
                        {stage?.value?.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({stage?.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 mb-2">
                    <div
                      className={`h-3 rounded-full ${stage?.color} transition-all duration-500`}
                      style={{ width: `${stage?.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{stage?.description}</p>
                  {index > 0 && (
                    <div className="mt-2 text-xs text-destructive">
                      Drop-off: {calculateDropoff(stage?.value, funnelData?.[index - 1]?.value)}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Channel Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground mb-4">Channel Performance</h3>
          <div className="space-y-3">
            {touchpointData?.map((channel, index) => (
              <div key={index} className="glass-surface p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-foreground">{channel?.channel}</span>
                  <div className="text-sm text-muted-foreground">
                    Conversion Rate: {((channel?.purchase / channel?.awareness) * 100)?.toFixed(2)}%
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {funnelData?.map((stage) => (
                    <div key={stage?.id} className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">
                        {stage?.stage?.slice(0, 4)}
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {channel?.[stage?.id]?.toLocaleString() || '0'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedStage && (
        <div className="mt-6 p-4 glass-surface rounded-lg border border-primary/20">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Info" size={20} className="text-primary" />
            <h4 className="font-medium text-foreground">
              {funnelData?.find(s => s?.id === selectedStage)?.stage} Stage Details
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Users:</span>
              <span className="ml-2 font-medium text-foreground">
                {funnelData?.find(s => s?.id === selectedStage)?.value?.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Conversion Rate:</span>
              <span className="ml-2 font-medium text-foreground">
                {funnelData?.find(s => s?.id === selectedStage)?.percentage}%
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Top Channel:</span>
              <span className="ml-2 font-medium text-foreground">Google Ads</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunnelAnalysis;