import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const CampaignROITable = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'roi', direction: 'desc' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const campaignData = [
  {
    id: 'CMP-001',
    name: 'Google Ads - Brand Keywords',
    channel: 'Google Ads',
    spend: 15000,
    revenue: 75000,
    roi: 400,
    leads: 250,
    cpl: 60,
    status: 'active',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'CMP-002',
    name: 'Facebook Lead Generation',
    channel: 'Facebook',
    spend: 12000,
    revenue: 48000,
    roi: 300,
    leads: 180,
    cpl: 67,
    status: 'active',
    lastUpdated: '1 hour ago'
  },
  {
    id: 'CMP-003',
    name: 'LinkedIn B2B Campaign',
    channel: 'LinkedIn',
    spend: 8000,
    revenue: 32000,
    roi: 300,
    leads: 95,
    cpl: 84,
    status: 'active',
    lastUpdated: '3 hours ago'
  },
  {
    id: 'CMP-004',
    name: 'YouTube Video Ads',
    channel: 'YouTube',
    spend: 10000,
    revenue: 25000,
    roi: 150,
    leads: 120,
    cpl: 83,
    status: 'paused',
    lastUpdated: '1 day ago'
  },
  {
    id: 'CMP-005',
    name: 'Instagram Stories Campaign',
    channel: 'Instagram',
    spend: 6000,
    revenue: 18000,
    roi: 200,
    leads: 85,
    cpl: 71,
    status: 'active',
    lastUpdated: '4 hours ago'
  },
  {
    id: 'CMP-006',
    name: 'Twitter Promoted Tweets',
    channel: 'Twitter',
    spend: 4000,
    revenue: 8000,
    roi: 100,
    leads: 45,
    cpl: 89,
    status: 'ended',
    lastUpdated: '2 days ago'
  },
  {
    id: 'CMP-007',
    name: 'TikTok Brand Awareness',
    channel: 'TikTok',
    spend: 7000,
    revenue: 21000,
    roi: 200,
    leads: 110,
    cpl: 64,
    status: 'active',
    lastUpdated: '5 hours ago'
  },
  {
    id: 'CMP-008',
    name: 'Pinterest Shopping Ads',
    channel: 'Pinterest',
    spend: 5000,
    revenue: 15000,
    roi: 200,
    leads: 75,
    cpl: 67,
    status: 'active',
    lastUpdated: '6 hours ago'
  }];


  const filteredAndSortedData = useMemo(() => {
    let filtered = campaignData?.filter((campaign) => {
      const matchesSearch = campaign?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      campaign?.channel?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStatus = filterStatus === 'all' || campaign?.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, filterStatus, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData?.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':return 'text-success bg-success/10';
      case 'paused':return 'text-warning bg-warning/10';
      case 'ended':return 'text-muted-foreground bg-muted/10';
      default:return 'text-muted-foreground bg-muted/10';
    }
  };

  const getROIColor = (roi) => {
    if (roi >= 300) return 'text-success';
    if (roi >= 200) return 'text-warning';
    return 'text-destructive';
  };

  const exportToCSV = () => {
    const headers = ['Campaign ID', 'Name', 'Channel', 'Spend', 'Revenue', 'ROI %', 'Leads', 'CPL', 'Status'];
    const csvContent = [
    headers?.join(','),
    ...filteredAndSortedData?.map((row) => [
    row?.id,
    `"${row?.name}"`,
    row?.channel,
    row?.spend,
    row?.revenue,
    row?.roi,
    row?.leads,
    row?.cpl,
    row?.status]?.
    join(','))]?.
    join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaign-roi-analysis.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Icon name="Table" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Campaign ROI Analysis</h3>
            <p className="text-sm text-muted-foreground">Detailed performance metrics by campaign</p>
          </div>
        </div>
        
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-200">

          <Icon name="Download" size={16} />
          <span className="text-sm font-medium">Export CSV</span>
        </button>
      </div>
      {/* Filters and Search */}
      <div className="flex items-center justify-between mb-6 space-x-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 bg-[rgba(5,5,26,1)]" />

          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 bg-[rgba(5,8,26,1)]">

            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="ended">Ended</option>
          </select>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Showing {paginatedData?.length} of {filteredAndSortedData?.length} campaigns
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors">

                  <span>Campaign</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('channel')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors">

                  <span>Channel</span>
                  <Icon name={getSortIcon('channel')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('spend')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto">

                  <span>Spend</span>
                  <Icon name={getSortIcon('spend')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('revenue')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto">

                  <span>Revenue</span>
                  <Icon name={getSortIcon('revenue')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('roi')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto">

                  <span>ROI %</span>
                  <Icon name={getSortIcon('roi')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('leads')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto">

                  <span>Leads</span>
                  <Icon name={getSortIcon('leads')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('cpl')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto">

                  <span>CPL</span>
                  <Icon name={getSortIcon('cpl')} size={14} />
                </button>
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((campaign) =>
            <tr key={campaign?.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-foreground text-sm">{campaign?.name}</div>
                    <div className="text-xs text-muted-foreground">{campaign?.id}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-foreground">{campaign?.channel}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-medium text-foreground">${campaign?.spend?.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-medium text-foreground">${campaign?.revenue?.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`text-sm font-bold ${getROIColor(campaign?.roi)}`}>
                    {campaign?.roi}%
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm text-foreground">{campaign?.leads}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm text-foreground">${campaign?.cpl}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign?.status)}`}>
                    {campaign?.status}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 &&
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">

              <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
            </button>
            <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">

              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      }
    </div>);

};

export default CampaignROITable;