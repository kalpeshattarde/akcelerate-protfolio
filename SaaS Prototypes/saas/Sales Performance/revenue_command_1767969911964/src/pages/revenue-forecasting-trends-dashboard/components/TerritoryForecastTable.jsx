import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TerritoryForecastTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'forecast', direction: 'desc' });
  const [selectedTerritory, setSelectedTerritory] = useState(null);

  const territoryData = [
    {
      id: 1,
      territory: 'North America',
      region: 'Americas',
      currentRevenue: 12500000,
      forecast: 15200000,
      target: 14800000,
      variance: 2.7,
      confidence: 89,
      risk: 'low',
      pipeline: 28400000,
      coverage: 1.9,
      manager: 'Sarah Johnson',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      territory: 'Europe',
      region: 'EMEA',
      currentRevenue: 8900000,
      forecast: 10100000,
      target: 10500000,
      variance: -3.8,
      confidence: 82,
      risk: 'medium',
      pipeline: 18200000,
      coverage: 1.7,
      manager: 'Marcus Weber',
      lastUpdated: '1 hour ago'
    },
    {
      id: 3,
      territory: 'Asia Pacific',
      region: 'APAC',
      currentRevenue: 6700000,
      forecast: 8900000,
      target: 8200000,
      variance: 8.5,
      confidence: 91,
      risk: 'low',
      pipeline: 16800000,
      coverage: 2.0,
      manager: 'Yuki Tanaka',
      lastUpdated: '30 min ago'
    },
    {
      id: 4,
      territory: 'Latin America',
      region: 'Americas',
      currentRevenue: 3200000,
      forecast: 3800000,
      target: 4100000,
      variance: -7.3,
      confidence: 76,
      risk: 'high',
      pipeline: 6900000,
      coverage: 1.7,
      manager: 'Carlos Rodriguez',
      lastUpdated: '45 min ago'
    },
    {
      id: 5,
      territory: 'Middle East & Africa',
      region: 'EMEA',
      currentRevenue: 2100000,
      forecast: 2900000,
      target: 2800000,
      variance: 3.6,
      confidence: 84,
      risk: 'medium',
      pipeline: 5200000,
      coverage: 1.9,
      manager: 'Amira Hassan',
      lastUpdated: '1 hour ago'
    }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...territoryData].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const getRiskColor = (risk) => {
    const colors = {
      low: 'text-success bg-success/10',
      medium: 'text-warning bg-warning/10',
      high: 'text-error bg-error/10'
    };
    return colors[risk] || colors.medium;
  };

  const getVarianceColor = (variance) => {
    if (variance > 0) return 'text-success';
    if (variance < -5) return 'text-error';
    return 'text-warning';
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-secondary" />;
    }
    return (
      <Icon 
        name={sortConfig.direction === 'asc' ? "ArrowUp" : "ArrowDown"} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Territory Forecast Breakdown</h3>
          <p className="text-sm text-text-secondary">
            Regional revenue projections with risk assessment and variance analysis
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconSize={16}
          >
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconSize={16}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('territory')}
                  className="flex items-center space-x-2 hover:text-text-primary"
                >
                  <span>Territory</span>
                  <SortIcon column="territory" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('currentRevenue')}
                  className="flex items-center space-x-2 hover:text-text-primary ml-auto"
                >
                  <span>Current</span>
                  <SortIcon column="currentRevenue" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('forecast')}
                  className="flex items-center space-x-2 hover:text-text-primary ml-auto"
                >
                  <span>Forecast</span>
                  <SortIcon column="forecast" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('target')}
                  className="flex items-center space-x-2 hover:text-text-primary ml-auto"
                >
                  <span>Target</span>
                  <SortIcon column="target" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('variance')}
                  className="flex items-center space-x-2 hover:text-text-primary ml-auto"
                >
                  <span>Variance</span>
                  <SortIcon column="variance" />
                </button>
              </th>
              <th className="text-center p-4 font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('confidence')}
                  className="flex items-center space-x-2 hover:text-text-primary mx-auto"
                >
                  <span>Confidence</span>
                  <SortIcon column="confidence" />
                </button>
              </th>
              <th className="text-center p-4 font-medium text-text-secondary">Risk</th>
              <th className="text-right p-4 font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('coverage')}
                  className="flex items-center space-x-2 hover:text-text-primary ml-auto"
                >
                  <span>Coverage</span>
                  <SortIcon column="coverage" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-text-secondary">Manager</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((territory) => (
              <tr 
                key={territory.id} 
                className="border-t border-border hover:bg-muted/20 transition-colors cursor-pointer"
                onClick={() => setSelectedTerritory(territory.id === selectedTerritory ? null : territory.id)}
              >
                <td className="p-4">
                  <div>
                    <div className="font-medium text-text-primary">{territory.territory}</div>
                    <div className="text-sm text-text-secondary">{territory.region}</div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-text-primary">
                    {formatCurrency(territory.currentRevenue)}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-text-primary">
                    {formatCurrency(territory.forecast)}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-text-primary">
                    {formatCurrency(territory.target)}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className={`font-medium ${getVarianceColor(territory.variance)}`}>
                    {territory.variance > 0 ? '+' : ''}{territory.variance.toFixed(1)}%
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-12 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-primary rounded-full transition-all"
                        style={{ width: `${territory.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-text-primary">
                      {territory.confidence}%
                    </span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(territory.risk)}`}>
                    {territory.risk.charAt(0).toUpperCase() + territory.risk.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-text-primary">
                    {territory.coverage.toFixed(1)}x
                  </div>
                  <div className="text-sm text-text-secondary">
                    {formatCurrency(territory.pipeline)}
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-text-primary">{territory.manager}</div>
                    <div className="text-sm text-text-secondary">{territory.lastUpdated}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTerritory && (
        <div className="border-t border-border p-6 bg-muted/20">
          {(() => {
            const territory = territoryData.find(t => t.id === selectedTerritory);
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Forecast Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Q1 Projection:</span>
                      <span className="font-medium text-text-primary">
                        {formatCurrency(territory.forecast * 0.23)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Q2 Projection:</span>
                      <span className="font-medium text-text-primary">
                        {formatCurrency(territory.forecast * 0.25)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Q3 Projection:</span>
                      <span className="font-medium text-text-primary">
                        {formatCurrency(territory.forecast * 0.24)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Q4 Projection:</span>
                      <span className="font-medium text-text-primary">
                        {formatCurrency(territory.forecast * 0.28)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Risk Factors</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={14} className="text-warning" />
                      <span className="text-text-secondary">Market volatility</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="TrendingDown" size={14} className="text-error" />
                      <span className="text-text-secondary">Competitive pressure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={14} className="text-primary" />
                      <span className="text-text-secondary">Team capacity</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Key Opportunities</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Target" size={14} className="text-success" />
                      <span className="text-text-secondary">Enterprise expansion</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Zap" size={14} className="text-accent" />
                      <span className="text-text-secondary">Product launch impact</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Globe" size={14} className="text-secondary" />
                      <span className="text-text-secondary">Market expansion</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default TerritoryForecastTable;