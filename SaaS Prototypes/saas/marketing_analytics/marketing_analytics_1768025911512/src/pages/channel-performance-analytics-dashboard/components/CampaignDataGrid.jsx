import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const CampaignDataGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'roas', direction: 'desc' });
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [editingCell, setEditingCell] = useState(null);

  const campaignData = [
    {
      id: 1,
      campaign: 'Holiday Sale - Search',
      channel: 'Google Ads',
      status: 'Active',
      impressions: 125000,
      clicks: 3250,
      ctr: 2.6,
      conversions: 234,
      conversionRate: 7.2,
      spend: 15420,
      revenue: 68340,
      roas: 4.43,
      cpl: 65.90,
      lastModified: '2025-08-14'
    },
    {
      id: 2,
      campaign: 'Brand Awareness - Video',
      channel: 'Facebook Ads',
      status: 'Active',
      impressions: 89000,
      clicks: 2140,
      ctr: 2.4,
      conversions: 189,
      conversionRate: 8.8,
      spend: 12800,
      revenue: 51200,
      roas: 4.00,
      cpl: 67.72,
      lastModified: '2025-08-13'
    },
    {
      id: 3,
      campaign: 'Lead Gen - LinkedIn',
      channel: 'LinkedIn Ads',
      status: 'Active',
      impressions: 45000,
      clicks: 1890,
      ctr: 4.2,
      conversions: 145,
      conversionRate: 7.7,
      spend: 8900,
      revenue: 32040,
      roas: 3.60,
      cpl: 61.38,
      lastModified: '2025-08-14'
    },
    {
      id: 4,
      campaign: 'Retargeting - Display',
      channel: 'Google Ads',
      status: 'Paused',
      impressions: 156000,
      clicks: 1560,
      ctr: 1.0,
      conversions: 98,
      conversionRate: 6.3,
      spend: 6750,
      revenue: 23625,
      roas: 3.50,
      cpl: 68.88,
      lastModified: '2025-08-12'
    },
    {
      id: 5,
      campaign: 'Email Newsletter',
      channel: 'Email Marketing',
      status: 'Active',
      impressions: 25000,
      clicks: 2500,
      ctr: 10.0,
      conversions: 156,
      conversionRate: 6.2,
      spend: 1200,
      revenue: 8400,
      roas: 7.00,
      cpl: 7.69,
      lastModified: '2025-08-14'
    },
    {
      id: 6,
      campaign: 'Product Demo - Search',
      channel: 'Google Ads',
      status: 'Active',
      impressions: 78000,
      clicks: 2340,
      ctr: 3.0,
      conversions: 167,
      conversionRate: 7.1,
      spend: 11200,
      revenue: 41800,
      roas: 3.73,
      cpl: 67.07,
      lastModified: '2025-08-13'
    }
  ];

  const columns = [
    { key: 'campaign', label: 'Campaign', sortable: true, width: '200px' },
    { key: 'channel', label: 'Channel', sortable: true, width: '120px' },
    { key: 'status', label: 'Status', sortable: true, width: '100px' },
    { key: 'impressions', label: 'Impressions', sortable: true, width: '120px', format: 'number' },
    { key: 'clicks', label: 'Clicks', sortable: true, width: '100px', format: 'number' },
    { key: 'ctr', label: 'CTR (%)', sortable: true, width: '100px', format: 'percentage' },
    { key: 'conversions', label: 'Conv.', sortable: true, width: '100px', format: 'number' },
    { key: 'conversionRate', label: 'Conv. Rate (%)', sortable: true, width: '120px', format: 'percentage' },
    { key: 'spend', label: 'Spend', sortable: true, width: '120px', format: 'currency' },
    { key: 'revenue', label: 'Revenue', sortable: true, width: '120px', format: 'currency' },
    { key: 'roas', label: 'ROAS', sortable: true, width: '100px', format: 'decimal' },
    { key: 'cpl', label: 'CPL', sortable: true, width: '100px', format: 'currency' }
  ];

  const filteredData = useMemo(() => {
    return campaignData?.filter(campaign =>
      campaign?.campaign?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      campaign?.channel?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  }, [searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig?.key) return filteredData;

    return [...filteredData]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (typeof aValue === 'string') {
        return sortConfig?.direction === 'asc' 
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      }

      return sortConfig?.direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleSelectAll = (checked) => {
    setSelectedCampaigns(checked ? sortedData?.map(item => item?.id) : []);
  };

  const handleSelectCampaign = (campaignId, checked) => {
    setSelectedCampaigns(prev =>
      checked 
        ? [...prev, campaignId]
        : prev?.filter(id => id !== campaignId)
    );
  };

  const formatValue = (value, format) => {
    switch (format) {
      case 'number':
        return value?.toLocaleString();
      case 'currency':
        return `$${value?.toLocaleString()}`;
      case 'percentage':
        return `${value?.toFixed(1)}%`;
      case 'decimal':
        return value?.toFixed(2);
      default:
        return value;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Active': 'bg-success/20 text-success border-success/30',
      'Paused': 'bg-warning/20 text-warning border-warning/30',
      'Ended': 'bg-muted/20 text-muted-foreground border-muted/30'
    };
    return styles?.[status] || styles?.Active;
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on campaigns:`, selectedCampaigns);
    // Implement bulk actions here
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Table" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Campaign Performance Data
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
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
          >
            Advanced Filter
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-64"
          />
          {selectedCampaigns?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedCampaigns?.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('pause')}
              >
                Pause
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('activate')}
              >
                Activate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('delete')}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {sortedData?.length} campaigns
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-custom">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 w-12">
                <Checkbox
                  checked={selectedCampaigns?.length === sortedData?.length && sortedData?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className="text-left p-3 font-medium text-muted-foreground"
                  style={{ width: column?.width }}
                >
                  {column?.sortable ? (
                    <button
                      onClick={() => handleSort(column?.key)}
                      className="flex items-center space-x-1 hover:text-foreground transition-colors"
                    >
                      <span>{column?.label}</span>
                      <Icon
                        name={
                          sortConfig?.key === column?.key
                            ? sortConfig?.direction === 'asc' ?'ChevronUp' :'ChevronDown' :'ChevronsUpDown'
                        }
                        size={14}
                      />
                    </button>
                  ) : (
                    column?.label
                  )}
                </th>
              ))}
              <th className="text-left p-3 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((campaign) => (
              <tr
                key={campaign?.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="p-3">
                  <Checkbox
                    checked={selectedCampaigns?.includes(campaign?.id)}
                    onChange={(e) => handleSelectCampaign(campaign?.id, e?.target?.checked)}
                  />
                </td>
                {columns?.map((column) => (
                  <td key={column?.key} className="p-3 text-sm">
                    {column?.key === 'status' ? (
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadge(campaign?.[column?.key])}`}>
                        {campaign?.[column?.key]}
                      </span>
                    ) : column?.key === 'campaign' ? (
                      <div className="font-medium text-foreground truncate" title={campaign?.[column?.key]}>
                        {campaign?.[column?.key]}
                      </div>
                    ) : (
                      <span className="text-foreground">
                        {formatValue(campaign?.[column?.key], column?.format)}
                      </span>
                    )}
                  </td>
                ))}
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      className="w-8 h-8 p-0"
                      title="Edit campaign"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      className="w-8 h-8 p-0"
                      title="More actions"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {sortedData?.length} of {campaignData?.length} campaigns
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded">1</span>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDataGrid;