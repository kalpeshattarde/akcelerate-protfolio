import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const VendorPerformanceWidget = () => {
  const [activeTab, setActiveTab] = useState('rankings');
  const [sortBy, setSortBy] = useState('overall');

  // Mock vendor performance data
  const vendorData = {
    rankings: [
      {
        id: 'microsoft',
        name: 'Microsoft Corporation',
        overallScore: 94,
        metrics: {
          contractCompliance: 96,
          deliveryPerformance: 92,
          qualityRating: 95,
          costEffectiveness: 89
        },
        contractValue: 2800000,
        contractsActive: 12,
        riskLevel: 'low',
        trend: 'up',
        recentActivity: 'Contract renewed for 3 years'
      },
      {
        id: 'aws',
        name: 'Amazon Web Services',
        overallScore: 91,
        metrics: {
          contractCompliance: 89,
          deliveryPerformance: 94,
          qualityRating: 92,
          costEffectiveness: 91
        },
        contractValue: 3200000,
        contractsActive: 8,
        riskLevel: 'low',
        trend: 'up',
        recentActivity: 'Added 2 new service contracts'
      },
      {
        id: 'oracle',
        name: 'Oracle Corporation',
        overallScore: 87,
        metrics: {
          contractCompliance: 85,
          deliveryPerformance: 88,
          qualityRating: 89,
          costEffectiveness: 86
        },
        contractValue: 1900000,
        contractsActive: 6,
        riskLevel: 'medium',
        trend: 'stable',
        recentActivity: 'License agreement updated'
      },
      {
        id: 'salesforce',
        name: 'Salesforce Inc.',
        overallScore: 85,
        metrics: {
          contractCompliance: 88,
          deliveryPerformance: 83,
          qualityRating: 87,
          costEffectiveness: 82
        },
        contractValue: 1500000,
        contractsActive: 4,
        riskLevel: 'medium',
        trend: 'down',
        recentActivity: 'Performance review scheduled'
      },
      {
        id: 'acme',
        name: 'Acme Professional Services',
        overallScore: 82,
        metrics: {
          contractCompliance: 80,
          deliveryPerformance: 85,
          qualityRating: 84,
          costEffectiveness: 79
        },
        contractValue: 850000,
        contractsActive: 3,
        riskLevel: 'high',
        trend: 'down',
        recentActivity: 'Compliance issue identified'
      }
    ],
    kpis: {
      totalVendors: 45,
      activeContracts: 156,
      avgPerformanceScore: 88.2,
      vendorsAtRisk: 8,
      contractsExpiringSoon: 12
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatCompactCurrency = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000)?.toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000)?.toFixed(0)}K`;
    }
    return formatCurrency(amount);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 80) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      case 'stable': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Widget Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('rankings')}
            className={`px-3 py-1 text-xs rounded-md transition-smooth ${
              activeTab === 'rankings' ?'bg-background text-text-primary shadow-sm' :'text-muted-foreground hover:text-text-primary'
            }`}
          >
            Rankings
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-3 py-1 text-xs rounded-md transition-smooth ${
              activeTab === 'insights' ?'bg-background text-text-primary shadow-sm' :'text-muted-foreground hover:text-text-primary'
            }`}
          >
            Insights
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="text-xs bg-background border border-border rounded px-2 py-1"
        >
          <option value="overall">Overall Score</option>
          <option value="compliance">Compliance</option>
          <option value="delivery">Delivery</option>
          <option value="quality">Quality</option>
          <option value="cost">Cost Effectiveness</option>
        </select>
      </div>
      {/* Content Based on Active Tab */}
      {activeTab === 'rankings' ? (
        <div className="flex-1 space-y-3">
          {/* Vendor Rankings List */}
          {vendorData?.rankings?.slice(0, 5)?.map((vendor, index) => (
            <div key={vendor?.id} className="bg-muted/30 rounded-lg p-3 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary text-xs font-bold rounded">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{vendor?.name}</p>
                    <p className="text-xs text-muted-foreground">{vendor?.contractsActive} active contracts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(vendor?.overallScore)} ${getScoreBgColor(vendor?.overallScore)}`}>
                    {vendor?.overallScore}
                  </div>
                  <Icon 
                    name={getTrendIcon(vendor?.trend)} 
                    size={12} 
                    className={getTrendColor(vendor?.trend)} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="text-xs">
                  <span className="text-muted-foreground">Value: </span>
                  <span className="text-text-primary font-medium">
                    {formatCompactCurrency(vendor?.contractValue)}
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">Risk: </span>
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium capitalize ${getRiskColor(vendor?.riskLevel)}`}>
                    {vendor?.riskLevel}
                  </span>
                </div>
              </div>

              {/* Performance Metrics Mini-bars */}
              <div className="space-y-1">
                {Object.entries(vendor?.metrics)?.map(([metric, score]) => (
                  <div key={metric} className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-muted-foreground capitalize">
                      {metric?.replace(/([A-Z])/g, ' $1')?.toLowerCase()}
                    </div>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-smooth ${
                          score >= 90 ? 'bg-success' : score >= 80 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-xs text-text-primary font-medium text-right">
                      {score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 space-y-4">
          {/* Key Performance Indicators */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-3 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Avg Performance</p>
              <p className="text-lg font-bold text-text-primary">{vendorData?.kpis?.avgPerformanceScore}</p>
              <div className="flex items-center mt-1">
                <Icon name="TrendingUp" size={10} className="text-success mr-1" />
                <span className="text-xs text-success">+2.1 pts</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-error/5 to-error/10 rounded-lg p-3 border border-error/20">
              <p className="text-xs text-muted-foreground mb-1">At-Risk Vendors</p>
              <p className="text-lg font-bold text-text-primary">{vendorData?.kpis?.vendorsAtRisk}</p>
              <div className="flex items-center mt-1">
                <Icon name="AlertTriangle" size={10} className="text-error mr-1" />
                <span className="text-xs text-error">Requires attention</span>
              </div>
            </div>
          </div>

          {/* Performance Distribution */}
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-3">Performance Distribution</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Excellent (90+)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-success rounded-full"></div>
                  </div>
                  <span className="text-xs text-text-primary font-medium">15 vendors</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Good (80-89)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-warning rounded-full"></div>
                  </div>
                  <span className="text-xs text-text-primary font-medium">22 vendors</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Needs Improvement</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-error rounded-full"></div>
                  </div>
                  <span className="text-xs text-text-primary font-medium">8 vendors</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="pt-2 border-t border-border">
            <h5 className="text-xs font-medium text-muted-foreground mb-2">Action Items</h5>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Icon name="Clock" size={12} className="text-warning mt-0.5 flex-shrink-0" />
                <p className="text-xs text-text-primary">
                  Review 3 underperforming vendor contracts
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="Calendar" size={12} className="text-info mt-0.5 flex-shrink-0" />
                <p className="text-xs text-text-primary">
                  Schedule performance reviews for Q1 2025
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="FileText" size={12} className="text-success mt-0.5 flex-shrink-0" />
                <p className="text-xs text-text-primary">
                  Negotiate renewal terms for top 3 performers
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorPerformanceWidget;