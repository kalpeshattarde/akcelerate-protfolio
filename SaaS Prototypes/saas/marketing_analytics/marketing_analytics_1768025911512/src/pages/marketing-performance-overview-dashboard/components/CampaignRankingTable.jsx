import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CampaignRankingTable = ({ campaigns, onCampaignSelect }) => {
  const [sortField, setSortField] = useState('cpl');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCampaigns = [...campaigns]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getPerformanceColor = (cpl, benchmark) => {
    const ratio = cpl / benchmark;
    if (ratio <= 0.8) return 'text-success';
    if (ratio <= 1.2) return 'text-warning';
    return 'text-destructive';
  };

  const getPerformanceIcon = (cpl, benchmark) => {
    const ratio = cpl / benchmark;
    if (ratio <= 0.8) return 'TrendingUp';
    if (ratio <= 1.2) return 'Minus';
    return 'TrendingDown';
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon name="Trophy" size={16} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Campaign Rankings</h3>
        </div>
        <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto scrollbar-custom">
          <table className="w-full">
            <thead className="bg-muted/20">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button 
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-1 group hover:text-foreground transition-colors duration-200"
                  >
                    <span>Campaign</span>
                    <SortIcon field="name" />
                  </button>
                </th>
                <th className="text-right p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button 
                    onClick={() => handleSort('leads')}
                    className="flex items-center space-x-1 group hover:text-foreground transition-colors duration-200 ml-auto"
                  >
                    <span>Leads</span>
                    <SortIcon field="leads" />
                  </button>
                </th>
                <th className="text-right p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button 
                    onClick={() => handleSort('cpl')}
                    className="flex items-center space-x-1 group hover:text-foreground transition-colors duration-200 ml-auto"
                  >
                    <span>CPL</span>
                    <SortIcon field="cpl" />
                  </button>
                </th>
                <th className="text-center p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedCampaigns?.map((campaign, index) => (
                <tr 
                  key={campaign?.id}
                  onClick={() => onCampaignSelect && onCampaignSelect(campaign)}
                  className="hover:bg-muted/30 cursor-pointer transition-colors duration-200"
                >
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
                          index === 0 ? 'bg-warning' : 
                          index === 1 ? 'bg-muted-foreground' : 
                          index === 2 ? 'bg-destructive' : 'bg-muted'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {campaign?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {campaign?.channel}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="text-sm font-medium text-foreground">
                      {campaign?.leads?.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      +{campaign?.leadGrowth}% vs last week
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="text-sm font-medium text-foreground">
                      ${campaign?.cpl?.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Benchmark: ${campaign?.benchmark?.toFixed(2)}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center">
                      <Icon 
                        name={getPerformanceIcon(campaign?.cpl, campaign?.benchmark)} 
                        size={16} 
                        className={getPerformanceColor(campaign?.cpl, campaign?.benchmark)} 
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing {sortedCampaigns?.length} campaigns</span>
        <span>Updated 2 minutes ago</span>
      </div>
    </div>
  );
};

export default CampaignRankingTable;