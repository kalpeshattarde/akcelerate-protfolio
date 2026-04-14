import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';

const DealDistributionScatter = () => {
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [showOutliers, setShowOutliers] = useState(true);

  const dealData = [
    // High value, high probability
    { id: 1, dealSize: 450000, probability: 85, stage: 'Negotiation', rep: 'Sarah Chen', segment: 'Enterprise', daysInStage: 12, company: 'TechCorp Inc' },
    { id: 2, dealSize: 380000, probability: 90, stage: 'Proposal', rep: 'Michael Rodriguez', segment: 'Enterprise', daysInStage: 8, company: 'DataSystems LLC' },
    { id: 3, dealSize: 520000, probability: 75, stage: 'Negotiation', rep: 'Emily Johnson', segment: 'Enterprise', daysInStage: 18, company: 'CloudTech Solutions' },
    
    // Medium value, medium probability
    { id: 4, dealSize: 180000, probability: 65, stage: 'Proposal', rep: 'David Park', segment: 'Mid-Market', daysInStage: 15, company: 'InnovateCorp' },
    { id: 5, dealSize: 220000, probability: 70, stage: 'Qualified', rep: 'Lisa Thompson', segment: 'Mid-Market', daysInStage: 22, company: 'GrowthTech' },
    { id: 6, dealSize: 195000, probability: 60, stage: 'Proposal', rep: 'Sarah Chen', segment: 'Mid-Market', daysInStage: 11, company: 'ScaleSoft' },
    
    // Low value, various probabilities
    { id: 7, dealSize: 45000, probability: 85, stage: 'Negotiation', rep: 'Michael Rodriguez', segment: 'SMB', daysInStage: 5, company: 'StartupXYZ' },
    { id: 8, dealSize: 65000, probability: 40, stage: 'Qualified', rep: 'Emily Johnson', segment: 'SMB', daysInStage: 28, company: 'LocalBiz Inc' },
    { id: 9, dealSize: 85000, probability: 75, stage: 'Proposal', rep: 'David Park', segment: 'SMB', daysInStage: 14, company: 'QuickStart LLC' },
    
    // Outliers
    { id: 10, dealSize: 850000, probability: 95, stage: 'Negotiation', rep: 'Sarah Chen', segment: 'Enterprise', daysInStage: 45, company: 'MegaCorp Global' },
    { id: 11, dealSize: 25000, probability: 95, stage: 'Negotiation', rep: 'Lisa Thompson', segment: 'SMB', daysInStage: 3, company: 'QuickWin Co' },
    { id: 12, dealSize: 320000, probability: 15, stage: 'Qualified', rep: 'Michael Rodriguez', segment: 'Mid-Market', daysInStage: 67, company: 'SlowDecision Inc' },
    
    // Additional data points
    { id: 13, dealSize: 125000, probability: 55, stage: 'Qualified', rep: 'Emily Johnson', segment: 'Mid-Market', daysInStage: 19, company: 'MidTier Solutions' },
    { id: 14, dealSize: 275000, probability: 80, stage: 'Proposal', rep: 'David Park', segment: 'Enterprise', daysInStage: 9, company: 'FastTrack Systems' },
    { id: 15, dealSize: 95000, probability: 50, stage: 'Qualified', rep: 'Lisa Thompson', segment: 'SMB', daysInStage: 25, company: 'GrowingSMB' }
  ];

  const segmentColors = {
    'Enterprise': '#1F3F82',
    'Mid-Market': '#3B82F6',
    'SMB': '#60A5FA'
  };

  const filteredData = selectedSegment === 'all' 
    ? dealData 
    : dealData.filter(deal => deal.segment === selectedSegment);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-modal max-w-xs">
          <h4 className="font-semibold text-text-primary mb-2">{data.company}</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Deal Size:</span>
              <span className="font-medium">${data.dealSize.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Probability:</span>
              <span className="font-medium">{data.probability}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Stage:</span>
              <span className="font-medium">{data.stage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Rep:</span>
              <span className="font-medium">{data.rep}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Days in Stage:</span>
              <span className="font-medium">{data.daysInStage} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Segment:</span>
              <span className="font-medium">{data.segment}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getOutliers = () => {
    const avgSize = dealData.reduce((sum, deal) => sum + deal.dealSize, 0) / dealData.length;
    const avgProb = dealData.reduce((sum, deal) => sum + deal.probability, 0) / dealData.length;
    
    return dealData.filter(deal => 
      deal.dealSize > avgSize * 2 || 
      deal.dealSize < avgSize * 0.3 ||
      (deal.probability > 90 && deal.dealSize < avgSize * 0.5) ||
      (deal.probability < 30 && deal.dealSize > avgSize)
    );
  };

  const outliers = getOutliers();

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Scatter" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Deal Distribution Analysis</h3>
            <p className="text-sm text-text-secondary">Opportunity size vs close probability</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="px-3 py-1.5 bg-muted border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Segments</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Mid-Market">Mid-Market</option>
            <option value="SMB">SMB</option>
          </select>

          <button
            onClick={() => setShowOutliers(!showOutliers)}
            className={`
              flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm transition-colors
              ${showOutliers 
                ? 'bg-warning/10 text-warning border border-warning/20' :'bg-muted text-text-secondary border border-border'
              }
            `}
          >
            <Icon name="AlertTriangle" size={14} />
            <span>Outliers</span>
          </button>
        </div>
      </div>

      <div className="h-96 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              type="number" 
              dataKey="dealSize" 
              name="Deal Size"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              stroke="#718096"
            />
            <YAxis 
              type="number" 
              dataKey="probability" 
              name="Probability"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#718096"
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Reference lines */}
            <ReferenceLine y={50} stroke="#FFB400" strokeDasharray="5 5" opacity={0.6} />
            <ReferenceLine x={200000} stroke="#FFB400" strokeDasharray="5 5" opacity={0.6} />
            
            {/* Scatter plots by segment */}
            {selectedSegment === 'all' ? (
              Object.keys(segmentColors).map(segment => (
                <Scatter
                  key={segment}
                  name={segment}
                  data={filteredData.filter(deal => deal.segment === segment)}
                  fill={segmentColors[segment]}
                  opacity={0.7}
                />
              ))
            ) : (
              <Scatter
                name={selectedSegment}
                data={filteredData}
                fill={segmentColors[selectedSegment] || '#1F3F82'}
                opacity={0.7}
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Legend and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Legend */}
        <div>
          <h4 className="font-medium text-text-primary mb-3">Segment Legend</h4>
          <div className="space-y-2">
            {Object.entries(segmentColors).map(([segment, color]) => (
              <div key={segment} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-text-secondary">{segment}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <div className="w-8 h-px bg-warning" style={{ borderTop: '2px dashed #FFB400' }} />
              <span>Reference lines (50% probability, $200K deal size)</span>
            </div>
          </div>
        </div>

        {/* Outliers */}
        {showOutliers && outliers.length > 0 && (
          <div>
            <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span>Notable Outliers ({outliers.length})</span>
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {outliers.slice(0, 3).map(deal => (
                <div key={deal.id} className="p-2 bg-warning/5 border border-warning/20 rounded text-sm">
                  <div className="font-medium text-text-primary">{deal.company}</div>
                  <div className="text-text-secondary">
                    ${deal.dealSize.toLocaleString()} • {deal.probability}% • {deal.rep}
                  </div>
                </div>
              ))}
              {outliers.length > 3 && (
                <div className="text-xs text-text-secondary text-center py-1">
                  +{outliers.length - 3} more outliers
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-text-primary">
              ${Math.round(filteredData.reduce((sum, deal) => sum + deal.dealSize, 0) / filteredData.length / 1000)}K
            </div>
            <div className="text-sm text-text-secondary">Avg Deal Size</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              {Math.round(filteredData.reduce((sum, deal) => sum + deal.probability, 0) / filteredData.length)}%
            </div>
            <div className="text-sm text-text-secondary">Avg Probability</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              {filteredData.filter(deal => deal.probability >= 70).length}
            </div>
            <div className="text-sm text-text-secondary">High Confidence</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              ${Math.round(filteredData.reduce((sum, deal) => sum + (deal.dealSize * deal.probability / 100), 0) / 1000)}K
            </div>
            <div className="text-sm text-text-secondary">Weighted Pipeline</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDistributionScatter;