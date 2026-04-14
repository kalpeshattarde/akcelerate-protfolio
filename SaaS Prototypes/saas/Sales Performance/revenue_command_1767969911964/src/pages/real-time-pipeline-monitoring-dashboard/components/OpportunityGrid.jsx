import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const OpportunityGrid = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'value', direction: 'desc' });
  const [selectedDeals, setSelectedDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [editingDeal, setEditingDeal] = useState(null);

  const opportunitiesData = [
    {
      id: 'DEAL-2024-001',
      name: 'Enterprise Software License - TechCorp',
      value: 125000,
      stage: 'negotiation',
      probability: 85,
      closeDate: '2024-08-15',
      rep: 'Sarah Johnson',
      account: 'TechCorp Industries',
      lastActivity: new Date(Date.now() - 86400000),
      daysInStage: 12,
      source: 'Inbound',
      priority: 'high'
    },
    {
      id: 'DEAL-2024-002',
      name: 'Cloud Migration Services - StartupXYZ',
      value: 85000,
      stage: 'proposal',
      probability: 65,
      closeDate: '2024-08-22',
      rep: 'Mike Chen',
      account: 'StartupXYZ Inc',
      lastActivity: new Date(Date.now() - 172800000),
      daysInStage: 8,
      source: 'Referral',
      priority: 'medium'
    },
    {
      id: 'DEAL-2024-003',
      name: 'Annual Support Contract - MegaCorp',
      value: 200000,
      stage: 'closed-won',
      probability: 100,
      closeDate: '2024-07-28',
      rep: 'Lisa Rodriguez',
      account: 'MegaCorp Ltd',
      lastActivity: new Date(Date.now() - 259200000),
      daysInStage: 2,
      source: 'Existing Customer',
      priority: 'high'
    },
    {
      id: 'DEAL-2024-004',
      name: 'Security Audit Services - FinanceFirst',
      value: 45000,
      stage: 'qualified',
      probability: 45,
      closeDate: '2024-09-10',
      rep: 'David Kim',
      account: 'FinanceFirst Bank',
      lastActivity: new Date(Date.now() - 345600000),
      daysInStage: 15,
      source: 'Cold Outreach',
      priority: 'low'
    },
    {
      id: 'DEAL-2024-005',
      name: 'Data Analytics Platform - RetailGiant',
      value: 180000,
      stage: 'proposal',
      probability: 70,
      closeDate: '2024-08-30',
      rep: 'Emma Wilson',
      account: 'RetailGiant Corp',
      lastActivity: new Date(Date.now() - 432000000),
      daysInStage: 18,
      source: 'Marketing Campaign',
      priority: 'high'
    },
    {
      id: 'DEAL-2024-006',
      name: 'Mobile App Development - HealthTech',
      value: 95000,
      stage: 'negotiation',
      probability: 80,
      closeDate: '2024-08-18',
      rep: 'James Brown',
      account: 'HealthTech Solutions',
      lastActivity: new Date(Date.now() - 518400000),
      daysInStage: 6,
      source: 'Partner Referral',
      priority: 'medium'
    },
    {
      id: 'DEAL-2024-007',
      name: 'Infrastructure Upgrade - ManufacturingCo',
      value: 320000,
      stage: 'qualified',
      probability: 55,
      closeDate: '2024-09-15',
      rep: 'Sarah Johnson',
      account: 'ManufacturingCo Inc',
      lastActivity: new Date(Date.now() - 604800000),
      daysInStage: 22,
      source: 'Trade Show',
      priority: 'high'
    },
    {
      id: 'DEAL-2024-008',
      name: 'Training Services - EduInstitute',
      value: 35000,
      stage: 'lead',
      probability: 25,
      closeDate: '2024-10-01',
      rep: 'Mike Chen',
      account: 'EduInstitute Academy',
      lastActivity: new Date(Date.now() - 691200000),
      daysInStage: 5,
      source: 'Website',
      priority: 'low'
    }
  ];

  const stageOptions = [
    { value: 'all', label: 'All Stages' },
    { value: 'lead', label: 'Lead' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'closed-won', label: 'Closed Won' }
  ];

  const filteredAndSortedData = useMemo(() => {
    let filtered = opportunitiesData.filter(deal => {
      const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           deal.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           deal.rep.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStage = stageFilter === 'all' || deal.stage === stageFilter;
      return matchesSearch && matchesStage;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'lastActivity') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, stageFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectDeal = (dealId) => {
    setSelectedDeals(prev => 
      prev.includes(dealId) 
        ? prev.filter(id => id !== dealId)
        : [...prev, dealId]
    );
  };

  const handleSelectAll = () => {
    setSelectedDeals(
      selectedDeals.length === filteredAndSortedData.length 
        ? [] 
        : filteredAndSortedData.map(deal => deal.id)
    );
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'lead':
        return 'bg-gray-100 text-gray-700';
      case 'qualified':
        return 'bg-blue-100 text-blue-700';
      case 'proposal':
        return 'bg-yellow-100 text-yellow-700';
      case 'negotiation':
        return 'bg-orange-100 text-orange-700';
      case 'closed-won':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Opportunity Pipeline</h2>
            <p className="text-sm text-text-secondary">
              {filteredAndSortedData.length} opportunities • Total value: {formatCurrency(filteredAndSortedData.reduce((sum, deal) => sum + deal.value, 0))}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {selectedDeals.length > 0 && (
              <Button variant="outline" size="sm" iconName="Edit">
                Bulk Edit ({selectedDeals.length})
              </Button>
            )}
            <Button variant="default" size="sm" iconName="Plus">
              Add Deal
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search deals, accounts, or reps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={stageOptions}
              value={stageFilter}
              onChange={setStageFilter}
              placeholder="Filter by stage"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedDeals.length === filteredAndSortedData.length && filteredAndSortedData.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary"
                >
                  <span>Deal Name</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('value')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary"
                >
                  <span>Value</span>
                  <Icon name={getSortIcon('value')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('stage')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary"
                >
                  <span>Stage</span>
                  <Icon name={getSortIcon('stage')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('probability')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary"
                >
                  <span>Probability</span>
                  <Icon name={getSortIcon('probability')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('closeDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary"
                >
                  <span>Close Date</span>
                  <Icon name={getSortIcon('closeDate')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('rep')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary"
                >
                  <span>Sales Rep</span>
                  <Icon name={getSortIcon('rep')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary"
                >
                  <span>Last Activity</span>
                  <Icon name={getSortIcon('lastActivity')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((deal) => (
              <tr key={deal.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedDeals.includes(deal.id)}
                    onChange={() => handleSelectDeal(deal.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div>
                    <div className="font-medium text-text-primary">{deal.name}</div>
                    <div className="text-sm text-text-secondary">{deal.account}</div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="font-semibold text-text-primary">
                    {formatCurrency(deal.value)}
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                    {deal.stage.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${deal.probability}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{deal.probability}%</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-text-primary">
                    {formatDate(deal.closeDate)}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {deal.rep.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm text-text-primary">{deal.rep}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-text-secondary">
                    {formatTimeAgo(deal.lastActivity)}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {deal.daysInStage} days in stage
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setEditingDeal(deal.id)}
                      className="p-1 hover:bg-muted rounded transition-colors"
                      title="Edit deal"
                    >
                      <Icon name="Edit" size={14} className="text-text-secondary hover:text-primary" />
                    </button>
                    <button
                      className="p-1 hover:bg-muted rounded transition-colors"
                      title="View details"
                    >
                      <Icon name="Eye" size={14} className="text-text-secondary hover:text-primary" />
                    </button>
                    <button
                      className="p-1 hover:bg-muted rounded transition-colors"
                      title="More actions"
                    >
                      <Icon name="MoreHorizontal" size={14} className="text-text-secondary hover:text-primary" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No opportunities found</h3>
          <p className="text-text-secondary mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setStageFilter('all');
          }}>
            Clear filters
          </Button>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>
            Showing {filteredAndSortedData.length} of {opportunitiesData.length} opportunities
          </span>
          <div className="flex items-center space-x-2">
            <span>Last updated: 30s ago</span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityGrid;