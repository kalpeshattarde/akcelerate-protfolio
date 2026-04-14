import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';
import ApprovalQueueTable from './components/ApprovalQueueTable';
import FilterPanel from './components/FilterPanel';
import BulkActionPanel from './components/BulkActionPanel';
import ApprovalStats from './components/ApprovalStats';
import WorkflowTracker from './components/WorkflowTracker';

const ApprovalWorkflowQueue = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    amountRange: { min: '', max: '' },
    department: '',
    dateRange: { start: '', end: '' },
    priority: '',
    status: 'pending'
  });
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [userRole] = useState('finance');

  // Mock approval queue data
  const approvalQueue = [
    {
      id: 'PO-2024-001',
      poNumber: 'PO-2024-001',
      requestor: 'Sarah Johnson',
      requestorDept: 'IT Department',
      supplier: 'TechCorp Solutions',
      amount: 15750.00,
      submissionDate: '2024-01-15',
      dueDate: '2024-01-20',
      priority: 'high',
      status: 'pending',
      description: 'Server hardware upgrade for data center expansion',
      budgetImpact: 'Within approved IT budget',
      riskLevel: 'low',
      approvalHistory: [
        { approver: 'Mike Chen', role: 'Department Head', status: 'approved', date: '2024-01-15', comment: 'Approved for technical requirements' }
      ],
      nextApprover: 'Finance Director',
      complianceStatus: 'compliant',
      attachments: 3
    },
    {
      id: 'PO-2024-002',
      poNumber: 'PO-2024-002',
      requestor: 'David Martinez',
      requestorDept: 'Marketing',
      supplier: 'Creative Agency Pro',
      amount: 8500.00,
      submissionDate: '2024-01-14',
      dueDate: '2024-01-18',
      priority: 'medium',
      status: 'pending',
      description: 'Q1 marketing campaign materials and design services',
      budgetImpact: 'Exceeds quarterly budget by 5%',
      riskLevel: 'medium',
      approvalHistory: [],
      nextApprover: 'Marketing Director',
      complianceStatus: 'review_required',
      attachments: 5
    },
    {
      id: 'PO-2024-003',
      poNumber: 'PO-2024-003',
      requestor: 'Lisa Wang',
      requestorDept: 'Operations',
      supplier: 'Industrial Supply Co',
      amount: 25000.00,
      submissionDate: '2024-01-13',
      dueDate: '2024-01-17',
      priority: 'urgent',
      status: 'pending',
      description: 'Emergency equipment replacement for production line',
      budgetImpact: 'Requires budget reallocation',
      riskLevel: 'high',
      approvalHistory: [
        { approver: 'Operations Manager', role: 'Department Head', status: 'approved', date: '2024-01-13', comment: 'Critical for production continuity' }
      ],
      nextApprover: 'CFO',
      complianceStatus: 'compliant',
      attachments: 7
    },
    {
      id: 'PO-2024-004',
      poNumber: 'PO-2024-004',
      requestor: 'Robert Kim',
      requestorDept: 'HR',
      supplier: 'Office Furniture Plus',
      amount: 4200.00,
      submissionDate: '2024-01-12',
      dueDate: '2024-01-22',
      priority: 'low',
      status: 'pending',
      description: 'New employee workstation setup - 3 desks and chairs',
      budgetImpact: 'Within approved HR budget',
      riskLevel: 'low',
      approvalHistory: [],
      nextApprover: 'HR Director',
      complianceStatus: 'compliant',
      attachments: 2
    },
    {
      id: 'PO-2024-005',
      poNumber: 'PO-2024-005',
      requestor: 'Jennifer Adams',
      requestorDept: 'R&D',
      supplier: 'Lab Equipment Specialists',
      amount: 32000.00,
      submissionDate: '2024-01-11',
      dueDate: '2024-01-16',
      priority: 'high',
      status: 'pending',
      description: 'Advanced testing equipment for new product development',
      budgetImpact: 'Requires executive approval',
      riskLevel: 'medium',
      approvalHistory: [
        { approver: 'R&D Manager', role: 'Department Head', status: 'approved', date: '2024-01-11', comment: 'Essential for project timeline' }
      ],
      nextApprover: 'VP of Engineering',
      complianceStatus: 'compliant',
      attachments: 4
    }
  ];

  const filteredQueue = approvalQueue.filter(item => {
    if (filters.department && item.requestorDept !== filters.department) return false;
    if (filters.priority && item.priority !== filters.priority) return false;
    if (filters.amountRange.min && item.amount < parseFloat(filters.amountRange.min)) return false;
    if (filters.amountRange.max && item.amount > parseFloat(filters.amountRange.max)) return false;
    return true;
  });

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredQueue.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredQueue.map(item => item.id));
    }
  };

  const handleBulkApprove = () => {
    console.log('Bulk approving:', selectedItems);
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const handleBulkReject = () => {
    console.log('Bulk rejecting:', selectedItems);
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const handleBulkDelegate = () => {
    console.log('Bulk delegating:', selectedItems);
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  useEffect(() => {
    setShowBulkActions(selectedItems.length > 0);
  }, [selectedItems]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case 'a':
            e.preventDefault();
            if (selectedItems.length > 0) handleBulkApprove();
            break;
          case 'r':
            e.preventDefault();
            if (selectedItems.length > 0) handleBulkReject();
            break;
          case 'd':
            e.preventDefault();
            if (selectedItems.length > 0) handleBulkDelegate();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedItems]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={userRole} />
      <Header userRole={userRole} userName="Emily Rodriguez" notificationCount={5} />
      
      <main className="lg:ml-60 lg:pt-16 pt-4">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-heading-bold text-text-primary mb-2">
                  Approval Workflow Queue
                </h1>
                <p className="text-text-secondary">
                  Review and process pending purchase order approvals
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 bg-secondary-100 text-text-secondary rounded-button hover:bg-secondary-200 transition-smooth">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Report
                </button>
                <Link
                  to="/new-purchase-order-creation"
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  New Purchase Order
                </Link>
              </div>
            </div>

            {/* Approval Statistics */}
            <ApprovalStats 
              totalPending={filteredQueue.length}
              urgentCount={filteredQueue.filter(item => item.priority === 'urgent').length}
              overdueCount={filteredQueue.filter(item => new Date(item.dueDate) < new Date()).length}
              userRole={userRole}
            />
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-card">
            <div className="flex items-center space-x-4 text-sm text-primary-700">
              <span className="font-body-medium">Keyboard Shortcuts:</span>
              <span>Ctrl+A (Approve)</span>
              <span>Ctrl+R (Reject)</span>
              <span>Ctrl+D (Delegate)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Filter Panel */}
            <div className="xl:col-span-1">
              <FilterPanel 
                filters={filters}
                onFiltersChange={setFilters}
                approvalQueue={approvalQueue}
              />
              
              {/* Workflow Tracker */}
              <div className="mt-6">
                <WorkflowTracker userRole={userRole} />
              </div>
            </div>

            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* Bulk Actions Panel */}
              {showBulkActions && (
                <BulkActionPanel
                  selectedCount={selectedItems.length}
                  onApprove={handleBulkApprove}
                  onReject={handleBulkReject}
                  onDelegate={handleBulkDelegate}
                  onClear={() => setSelectedItems([])}
                />
              )}

              {/* Approval Queue Table */}
              <ApprovalQueueTable
                approvalQueue={filteredQueue}
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
                onSelectAll={handleSelectAll}
                expandedRow={expandedRow}
                onExpandRow={setExpandedRow}
                userRole={userRole}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApprovalWorkflowQueue;