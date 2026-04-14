import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PipelineFlowDiagram = () => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [animatingDeals, setAnimatingDeals] = useState([]);

  const pipelineStages = [
    {
      id: 'lead',
      name: 'Lead',
      count: 234,
      value: '$1.2M',
      color: 'bg-gray-100 text-gray-700',
      borderColor: 'border-gray-300',
      conversionRate: 45.2
    },
    {
      id: 'qualified',
      name: 'Qualified',
      count: 106,
      value: '$2.8M',
      color: 'bg-blue-100 text-blue-700',
      borderColor: 'border-blue-300',
      conversionRate: 68.3
    },
    {
      id: 'proposal',
      name: 'Proposal',
      count: 72,
      value: '$3.2M',
      color: 'bg-yellow-100 text-yellow-700',
      borderColor: 'border-yellow-300',
      conversionRate: 73.6
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      count: 53,
      value: '$2.9M',
      color: 'bg-orange-100 text-orange-700',
      borderColor: 'border-orange-300',
      conversionRate: 81.5
    },
    {
      id: 'closed-won',
      name: 'Closed Won',
      count: 43,
      value: '$2.4M',
      color: 'bg-green-100 text-green-700',
      borderColor: 'border-green-300',
      conversionRate: 100
    }
  ];

  const recentMovements = [
    {
      id: 1,
      dealName: "Enterprise Software License - TechCorp",
      value: "$125,000",
      from: "proposal",
      to: "negotiation",
      timestamp: new Date(Date.now() - 30000),
      rep: "Sarah Johnson"
    },
    {
      id: 2,
      dealName: "Cloud Migration Services - StartupXYZ",
      value: "$85,000",
      from: "qualified",
      to: "proposal",
      timestamp: new Date(Date.now() - 120000),
      rep: "Mike Chen"
    },
    {
      id: 3,
      dealName: "Annual Support Contract - MegaCorp",
      value: "$200,000",
      from: "negotiation",
      to: "closed-won",
      timestamp: new Date(Date.now() - 180000),
      rep: "Lisa Rodriguez"
    }
  ];

  useEffect(() => {
    // Simulate real-time deal movements
    const interval = setInterval(() => {
      const randomMovement = recentMovements[Math.floor(Math.random() * recentMovements.length)];
      setAnimatingDeals(prev => [...prev, { ...randomMovement, id: Date.now() }]);
      
      setTimeout(() => {
        setAnimatingDeals(prev => prev.filter(deal => deal.id !== randomMovement.id));
      }, 3000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleStageClick = (stage) => {
    setSelectedStage(selectedStage?.id === stage.id ? null : stage);
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Pipeline Flow</h2>
          <p className="text-sm text-text-secondary">Real-time deal progression tracking</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-text-secondary">Live updates</span>
          </div>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Icon name="RefreshCw" size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          {pipelineStages.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              {/* Stage Card */}
              <div
                onClick={() => handleStageClick(stage)}
                className={`
                  relative cursor-pointer transition-all duration-300 hover:scale-105
                  ${selectedStage?.id === stage.id ? 'ring-2 ring-primary ring-offset-2' : ''}
                `}
              >
                <div className={`
                  p-4 rounded-lg border-2 min-w-[140px] text-center
                  ${stage.color} ${stage.borderColor}
                  hover:shadow-card transition-all duration-200
                `}>
                  <div className="font-semibold text-sm mb-1">{stage.name}</div>
                  <div className="text-lg font-bold mb-1">{stage.count}</div>
                  <div className="text-xs opacity-80">{stage.value}</div>
                  <div className="text-xs mt-2 font-medium">
                    {stage.conversionRate}% conversion
                  </div>
                </div>

                {/* Real-time movement indicator */}
                {animatingDeals.some(deal => deal.from === stage.id || deal.to === stage.id) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-ping" />
                )}
              </div>

              {/* Arrow between stages */}
              {index < pipelineStages.length - 1 && (
                <div className="flex-1 flex items-center justify-center mx-4">
                  <div className="flex items-center">
                    <div className="h-0.5 bg-border flex-1 w-12" />
                    <Icon name="ChevronRight" size={16} className="text-text-secondary mx-1" />
                    <div className="h-0.5 bg-border flex-1 w-12" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stage Details */}
        {selectedStage && (
          <div className="bg-muted/30 rounded-lg p-4 mb-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-text-primary">
                {selectedStage.name} Stage Details
              </h3>
              <button
                onClick={() => setSelectedStage(null)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <Icon name="X" size={16} className="text-text-secondary" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-text-secondary">Total Deals</div>
                <div className="text-xl font-bold text-text-primary">{selectedStage.count}</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary">Total Value</div>
                <div className="text-xl font-bold text-text-primary">{selectedStage.value}</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary">Conversion Rate</div>
                <div className="text-xl font-bold text-success">{selectedStage.conversionRate}%</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary">Avg. Deal Size</div>
                <div className="text-xl font-bold text-text-primary">
                  ${Math.round(parseFloat(selectedStage.value.replace('$', '').replace('M', '')) * 1000000 / selectedStage.count).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Movements */}
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Activity" size={16} className="text-primary" />
            <h3 className="font-medium text-text-primary">Recent Movements</h3>
          </div>
          <div className="space-y-2">
            {recentMovements.slice(0, 3).map((movement) => (
              <div key={movement.id} className="flex items-center justify-between p-2 bg-card rounded border border-border">
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary truncate">
                    {movement.dealName}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {movement.rep} • {movement.value}
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <span className="capitalize">{movement.from.replace('-', ' ')}</span>
                  <Icon name="ArrowRight" size={12} />
                  <span className="capitalize">{movement.to.replace('-', ' ')}</span>
                  <span className="ml-2">{formatTimeAgo(movement.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineFlowDiagram;