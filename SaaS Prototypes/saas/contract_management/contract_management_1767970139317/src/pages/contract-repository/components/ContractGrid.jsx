import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ContractGrid = ({ 
  selectedContracts, 
  onContractSelect, 
  onContractClick, 
  searchQuery,
  appliedFilters,
  sortConfig,
  onSortChange 
}) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const gridRef = useRef(null);

  // Mock contract data
  const mockContracts = [
    {
      id: 'CNT-2024-001',
      title: 'Microsoft Office 365 Enterprise License Agreement',
      counterparty: 'Microsoft Corporation',
      value: 2450000,
      status: 'active',
      owner: 'Sarah Johnson',
      effectiveDate: '2024-01-15',
      expirationDate: '2025-01-14',
      riskScore: 'low',
      department: 'IT',
      type: 'service',
      lastModified: '2024-08-28',
      tags: ['Software', 'Enterprise', 'Subscription']
    },
    {
      id: 'CNT-2024-002',
      title: 'AWS Cloud Infrastructure Services Contract',
      counterparty: 'Amazon Web Services Inc.',
      value: 1850000,
      status: 'active',
      owner: 'Michael Chen',
      effectiveDate: '2024-02-01',
      expirationDate: '2025-01-31',
      riskScore: 'medium',
      department: 'IT',
      type: 'service',
      lastModified: '2024-08-30',
      tags: ['Cloud', 'Infrastructure', 'Scalable']
    },
    {
      id: 'CNT-2024-003',
      title: 'Salesforce CRM Platform License',
      counterparty: 'Salesforce Inc.',
      value: 890000,
      status: 'pending',
      owner: 'Jennifer Davis',
      effectiveDate: '2024-09-01',
      expirationDate: '2025-08-31',
      riskScore: 'low',
      department: 'Sales',
      type: 'service',
      lastModified: '2024-09-02',
      tags: ['CRM', 'Sales', 'Analytics']
    },
    {
      id: 'CNT-2024-004',
      title: 'Oracle Database Enterprise Edition',
      counterparty: 'Oracle Corporation',
      value: 3200000,
      status: 'renewal',
      owner: 'David Wilson',
      effectiveDate: '2023-10-01',
      expirationDate: '2024-09-30',
      riskScore: 'high',
      department: 'IT',
      type: 'service',
      lastModified: '2024-09-01',
      tags: ['Database', 'Enterprise', 'Critical']
    },
    {
      id: 'CNT-2024-005',
      title: 'Employee Handbook and Policy Agreement',
      counterparty: 'Internal HR Department',
      value: 0,
      status: 'active',
      owner: 'Lisa Anderson',
      effectiveDate: '2024-01-01',
      expirationDate: '2024-12-31',
      riskScore: 'low',
      department: 'HR',
      type: 'employment',
      lastModified: '2024-08-15',
      tags: ['HR', 'Policy', 'Internal']
    },
    {
      id: 'CNT-2024-006',
      title: 'Facility Lease Agreement - Main Office',
      counterparty: 'Downtown Properties LLC',
      value: 4800000,
      status: 'active',
      owner: 'Robert Martinez',
      effectiveDate: '2022-01-01',
      expirationDate: '2027-12-31',
      riskScore: 'medium',
      department: 'Facilities',
      type: 'lease',
      lastModified: '2024-07-20',
      tags: ['Real Estate', 'Long-term', 'Primary']
    },
    {
      id: 'CNT-2024-007',
      title: 'Adobe Creative Cloud Enterprise License',
      counterparty: 'Adobe Systems Inc.',
      value: 650000,
      status: 'active',
      owner: 'Emma Thompson',
      effectiveDate: '2024-03-01',
      expirationDate: '2025-02-28',
      riskScore: 'low',
      department: 'Marketing',
      type: 'service',
      lastModified: '2024-08-25',
      tags: ['Creative', 'Design', 'Marketing']
    },
    {
      id: 'CNT-2024-008',
      title: 'Confidentiality Agreement - TechCorp Partnership',
      counterparty: 'TechCorp Industries',
      value: 0,
      status: 'active',
      owner: 'James Wilson',
      effectiveDate: '2024-06-15',
      expirationDate: '2026-06-14',
      riskScore: 'medium',
      department: 'Legal',
      type: 'nda',
      lastModified: '2024-08-10',
      tags: ['Confidential', 'Partnership', 'Strategic']
    },
    {
      id: 'CNT-2024-009',
      title: 'IT Equipment Maintenance Contract',
      counterparty: 'TechSupport Solutions',
      value: 450000,
      status: 'expired',
      owner: 'Kevin Brown',
      effectiveDate: '2023-01-01',
      expirationDate: '2024-08-31',
      riskScore: 'high',
      department: 'IT',
      type: 'maintenance',
      lastModified: '2024-08-31',
      tags: ['Maintenance', 'Hardware', 'Support']
    },
    {
      id: 'CNT-2024-010',
      title: 'Marketing Services Agreement - Digital Agency',
      counterparty: 'Creative Digital Solutions',
      value: 780000,
      status: 'draft',
      owner: 'Amanda Garcia',
      effectiveDate: '2024-10-01',
      expirationDate: '2025-09-30',
      riskScore: 'medium',
      department: 'Marketing',
      type: 'service',
      lastModified: '2024-09-03',
      tags: ['Marketing', 'Digital', 'Campaign']
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setContracts(mockContracts);
      setLoading(false);
    }, 500);
  }, [searchQuery, appliedFilters]);

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-success bg-success/10',
      pending: 'text-warning bg-warning/10',
      draft: 'text-muted-foreground bg-muted',
      expired: 'text-error bg-error/10',
      terminated: 'text-error bg-error/10',
      renewal: 'text-accent bg-accent/10'
    };
    return colors?.[status] || 'text-muted-foreground bg-muted';
  };

  const getRiskColor = (risk) => {
    const colors = {
      low: 'text-success',
      medium: 'text-warning',
      high: 'text-error'
    };
    return colors?.[risk] || 'text-muted-foreground';
  };

  const formatCurrency = (value) => {
    if (value === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      onContractSelect(contracts?.map(c => c?.id));
    } else {
      onContractSelect([]);
    }
  };

  const handleSort = (column) => {
    const direction = sortConfig?.column === column && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ column, direction });
  };

  const getSortIcon = (column) => {
    if (sortConfig?.column !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const columns = [
    { key: 'id', label: 'Contract ID', width: '120px', sortable: true },
    { key: 'title', label: 'Title', width: '300px', sortable: true },
    { key: 'counterparty', label: 'Counterparty', width: '200px', sortable: true },
    { key: 'value', label: 'Value', width: '120px', sortable: true },
    { key: 'status', label: 'Status', width: '120px', sortable: true },
    { key: 'owner', label: 'Owner', width: '150px', sortable: true },
    { key: 'effectiveDate', label: 'Effective Date', width: '120px', sortable: true },
    { key: 'expirationDate', label: 'Expiration Date', width: '120px', sortable: true },
    { key: 'riskScore', label: 'Risk', width: '80px', sortable: true },
    { key: 'actions', label: 'Actions', width: '100px', sortable: false }
  ];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contracts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-surface flex flex-col">
      {/* Grid Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="flex items-center px-4 py-3">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={selectAll}
              onChange={(e) => handleSelectAll(e?.target?.checked)}
              indeterminate={selectedContracts?.length > 0 && selectedContracts?.length < contracts?.length}
            />
            <span className="text-sm font-medium text-text-primary">
              {selectedContracts?.length > 0 
                ? `${selectedContracts?.length} selected`
                : `${contracts?.length} contracts`
              }
            </span>
          </div>
          
          <div className="flex-1" />
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="ghost" size="sm" iconName="Filter">
              View Options
            </Button>
          </div>
        </div>
      </div>
      {/* Grid Content */}
      <div className="flex-1 overflow-auto" ref={gridRef}>
        <table className="w-full">
          <thead className="sticky top-0 bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-3">
                <Checkbox
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  indeterminate={selectedContracts?.length > 0 && selectedContracts?.length < contracts?.length}
                />
              </th>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className="text-left p-3 text-sm font-medium text-text-primary"
                  style={{ width: column?.width }}
                >
                  {column?.sortable ? (
                    <button
                      onClick={() => handleSort(column?.key)}
                      className="flex items-center space-x-1 hover:text-accent transition-smooth"
                    >
                      <span>{column?.label}</span>
                      <Icon name={getSortIcon(column?.key)} size={14} />
                    </button>
                  ) : (
                    column?.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contracts?.map((contract, index) => (
              <tr
                key={contract?.id}
                className={`border-b border-border hover:bg-muted/30 transition-smooth cursor-pointer ${
                  selectedContracts?.includes(contract?.id) ? 'bg-accent/10' : ''
                }`}
                onClick={() => onContractClick(contract)}
              >
                <td className="p-3" onClick={(e) => e?.stopPropagation()}>
                  <Checkbox
                    checked={selectedContracts?.includes(contract?.id)}
                    onChange={(e) => {
                      const newSelection = e?.target?.checked
                        ? [...selectedContracts, contract?.id]
                        : selectedContracts?.filter(id => id !== contract?.id);
                      onContractSelect(newSelection);
                    }}
                  />
                </td>
                <td className="p-3">
                  <span className="text-sm font-mono text-accent">{contract?.id}</span>
                </td>
                <td className="p-3">
                  <div>
                    <p className="text-sm font-medium text-text-primary truncate" title={contract?.title}>
                      {contract?.title}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      {contract?.tags?.slice(0, 2)?.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-muted text-xs text-muted-foreground rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-sm text-text-primary">{contract?.counterparty}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm font-medium text-text-primary">
                    {formatCurrency(contract?.value)}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract?.status)}`}>
                    {contract?.status?.charAt(0)?.toUpperCase() + contract?.status?.slice(1)}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-text-primary">{contract?.owner}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-muted-foreground">{formatDate(contract?.effectiveDate)}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-muted-foreground">{formatDate(contract?.expirationDate)}</span>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${getRiskColor(contract?.riskScore)?.replace('text-', 'bg-')}`} />
                    <span className={`text-xs font-medium ${getRiskColor(contract?.riskScore)}`}>
                      {contract?.riskScore?.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td className="p-3" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Grid Footer */}
      <div className="border-t border-border bg-muted/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 1-{contracts?.length} of 4,218 contracts
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" disabled>
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <span className="text-sm text-text-primary px-3 py-1 bg-accent text-accent-foreground rounded">
              1
            </span>
            <span className="text-sm text-muted-foreground px-3 py-1">2</span>
            <span className="text-sm text-muted-foreground px-3 py-1">3</span>
            <span className="text-sm text-muted-foreground">...</span>
            <span className="text-sm text-muted-foreground px-3 py-1">422</span>
            <Button variant="ghost" size="sm">
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractGrid;