import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FinancialTransactionsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const transactions = [
    {
      id: 'TXN-2025-001',
      date: '2025-09-04',
      vendor: 'TechCorp Solutions',
      contractId: 'CNT-2025-045',
      description: 'Software Development Services - Q3 Milestone',
      amount: 45000,
      status: 'pending_approval',
      type: 'milestone',
      invoiceNumber: 'INV-TC-2025-089',
      poNumber: 'PO-2025-234',
      approver: 'Sarah Johnson',
      businessUnit: 'IT Department',
      currency: 'USD'
    },
    {
      id: 'TXN-2025-002',
      date: '2025-09-03',
      vendor: 'Global Services Inc',
      contractId: 'CNT-2025-023',
      description: 'Monthly Maintenance Fee - September 2025',
      amount: 12500,
      status: 'approved',
      type: 'recurring',
      invoiceNumber: 'INV-GS-2025-156',
      poNumber: 'PO-2025-189',
      approver: 'Michael Chen',
      businessUnit: 'Operations',
      currency: 'USD'
    },
    {
      id: 'TXN-2025-003',
      date: '2025-09-02',
      vendor: 'DataFlow Systems',
      contractId: 'CNT-2025-067',
      description: 'Data Analytics Platform - Quarterly Payment',
      amount: 78000,
      status: 'overdue',
      type: 'quarterly',
      invoiceNumber: 'INV-DF-2025-234',
      poNumber: 'PO-2025-298',
      approver: 'Jennifer Davis',
      businessUnit: 'Analytics',
      currency: 'USD'
    },
    {
      id: 'TXN-2025-004',
      date: '2025-09-01',
      vendor: 'CloudTech Partners',
      contractId: 'CNT-2025-089',
      description: 'Cloud Infrastructure Services - Monthly',
      amount: 25000,
      status: 'paid',
      type: 'recurring',
      invoiceNumber: 'INV-CT-2025-445',
      poNumber: 'PO-2025-267',
      approver: 'Robert Wilson',
      businessUnit: 'Infrastructure',
      currency: 'USD'
    },
    {
      id: 'TXN-2025-005',
      date: '2025-08-31',
      vendor: 'Innovation Labs',
      contractId: 'CNT-2025-012',
      description: 'Research & Development - Phase 2 Completion',
      amount: 95000,
      status: 'processing',
      type: 'milestone',
      invoiceNumber: 'INV-IL-2025-678',
      poNumber: 'PO-2025-145',
      approver: 'Lisa Anderson',
      businessUnit: 'R&D',
      currency: 'USD'
    },
    {
      id: 'TXN-2025-006',
      date: '2025-08-30',
      vendor: 'Enterprise Solutions',
      contractId: 'CNT-2025-156',
      description: 'ERP System Integration - Final Payment',
      amount: 125000,
      status: 'paid',
      type: 'final',
      invoiceNumber: 'INV-ES-2025-890',
      poNumber: 'PO-2025-334',
      approver: 'David Thompson',
      businessUnit: 'Finance',
      currency: 'USD'
    },
    {
      id: 'TXN-2025-007',
      date: '2025-08-29',
      vendor: 'Digital Dynamics',
      contractId: 'CNT-2025-078',
      description: 'Marketing Automation Platform - Monthly',
      amount: 18000,
      status: 'disputed',
      type: 'recurring',
      invoiceNumber: 'INV-DD-2025-123',
      poNumber: 'PO-2025-456',
      approver: 'Amanda Rodriguez',
      businessUnit: 'Marketing',
      currency: 'USD'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending_approval', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'processing', label: 'Processing' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'disputed', label: 'Disputed' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-success/10 text-success border-success/20';
      case 'approved': return 'bg-accent/10 text-accent border-accent/20';
      case 'pending_approval': return 'bg-warning/10 text-warning border-warning/20';
      case 'processing': return 'bg-primary/10 text-primary border-primary/20';
      case 'overdue': return 'bg-error/10 text-error border-error/20';
      case 'disputed': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return 'CheckCircle';
      case 'approved': return 'Clock';
      case 'pending_approval': return 'AlertCircle';
      case 'processing': return 'Loader';
      case 'overdue': return 'AlertTriangle';
      case 'disputed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatStatus = (status) => {
    return status?.split('_')?.map(word => 
      word?.charAt(0)?.toUpperCase() + word?.slice(1)
    )?.join(' ');
  };

  const filteredTransactions = transactions?.filter(transaction => {
    const matchesSearch = transaction?.vendor?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         transaction?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         transaction?.contractId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedTransactions = [...filteredTransactions]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortField === 'amount') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedTransactions?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = sortedTransactions?.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleTransactionAction = (transactionId, action) => {
    console.log(`${action} transaction:`, transactionId);
    // Implement transaction action logic
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Financial Transactions</h3>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search transactions, vendors, contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by status"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                >
                  <span>Date</span>
                  <Icon 
                    name={sortField === 'date' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('vendor')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                >
                  <span>Vendor</span>
                  <Icon 
                    name={sortField === 'vendor' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Description</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                >
                  <span>Amount</span>
                  <Icon 
                    name={sortField === 'amount' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Business Unit</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions?.map((transaction, index) => (
              <tr key={transaction?.id} className={`border-b border-border hover:bg-muted/20 transition-smooth ${index % 2 === 0 ? 'bg-surface' : 'bg-muted/10'}`}>
                <td className="p-4">
                  <div className="text-sm font-medium text-text-primary">
                    {new Date(transaction.date)?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground">{transaction?.id}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-text-primary">{transaction?.vendor}</div>
                  <div className="text-xs text-muted-foreground">{transaction?.contractId}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary max-w-xs truncate" title={transaction?.description}>
                    {transaction?.description}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {transaction?.invoiceNumber} • {transaction?.poNumber}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-text-primary">
                    {formatCurrency(transaction?.amount)}
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">{transaction?.type}</div>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction?.status)}`}>
                    <Icon name={getStatusIcon(transaction?.status)} size={12} />
                    <span>{formatStatus(transaction?.status)}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary">{transaction?.businessUnit}</div>
                  <div className="text-xs text-muted-foreground">{transaction?.approver}</div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleTransactionAction(transaction?.id, 'view')}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleTransactionAction(transaction?.id, 'edit')}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleTransactionAction(transaction?.id, 'download')}
                      className="h-8 w-8"
                    >
                      <Icon name="Download" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedTransactions?.length)} of {sortedTransactions?.length} transactions
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <Icon name="ChevronLeft" size={14} />
              </Button>
              <span className="text-sm text-text-primary px-3">
                {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <Icon name="ChevronRight" size={14} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialTransactionsTable;