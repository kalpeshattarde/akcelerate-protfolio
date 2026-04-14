import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreeWayMatchingPanel = () => {
  const [selectedMatch, setSelectedMatch] = useState('match-001');

  const matchingData = {
    'match-001': {
      id: 'match-001',
      vendor: 'TechCorp Solutions',
      contractId: 'CNT-2025-045',
      status: 'variance_detected',
      totalAmount: 45000,
      purchaseOrder: {
        number: 'PO-2025-234',
        date: '2025-08-15',
        amount: 45000,
        items: [
          { description: 'Software Development Services - Q3', quantity: 1, unitPrice: 45000, total: 45000 }
        ],
        approver: 'Sarah Johnson',
        department: 'IT Department'
      },
      receipt: {
        number: 'RCP-2025-156',
        date: '2025-09-01',
        receivedBy: 'Michael Chen',
        items: [
          { description: 'Software Development Services - Q3 Milestone', quantity: 1, status: 'received' }
        ],
        notes: 'Milestone deliverables received and verified by technical team'
      },
      invoice: {
        number: 'INV-TC-2025-089',
        date: '2025-09-03',
        amount: 47250,
        items: [
          { description: 'Software Development Services - Q3', quantity: 1, unitPrice: 45000, total: 45000 },
          { description: 'Additional Testing Services', quantity: 1, unitPrice: 2250, total: 2250 }
        ],
        dueDate: '2025-10-03',
        paymentTerms: 'Net 30'
      },
      variances: [
        {
          type: 'amount',
          description: 'Invoice amount exceeds PO amount',
          poAmount: 45000,
          invoiceAmount: 47250,
          variance: 2250,
          severity: 'medium'
        },
        {
          type: 'line_item',
          description: 'Additional line item not in original PO',
          item: 'Additional Testing Services',
          amount: 2250,
          severity: 'low'
        }
      ]
    },
    'match-002': {
      id: 'match-002',
      vendor: 'Global Services Inc',
      contractId: 'CNT-2025-023',
      status: 'matched',
      totalAmount: 12500,
      purchaseOrder: {
        number: 'PO-2025-189',
        date: '2025-08-20',
        amount: 12500,
        items: [
          { description: 'Monthly Maintenance Services', quantity: 1, unitPrice: 12500, total: 12500 }
        ],
        approver: 'Jennifer Davis',
        department: 'Operations'
      },
      receipt: {
        number: 'RCP-2025-178',
        date: '2025-09-01',
        receivedBy: 'Robert Wilson',
        items: [
          { description: 'Monthly Maintenance Services', quantity: 1, status: 'received' }
        ],
        notes: 'Services completed as per contract terms'
      },
      invoice: {
        number: 'INV-GS-2025-156',
        date: '2025-09-02',
        amount: 12500,
        items: [
          { description: 'Monthly Maintenance Services', quantity: 1, unitPrice: 12500, total: 12500 }
        ],
        dueDate: '2025-10-02',
        paymentTerms: 'Net 30'
      },
      variances: []
    }
  };

  const matchingQueue = [
    { id: 'match-001', vendor: 'TechCorp Solutions', amount: 45000, status: 'variance_detected', priority: 'high' },
    { id: 'match-002', vendor: 'Global Services Inc', amount: 12500, status: 'matched', priority: 'low' },
    { id: 'match-003', vendor: 'DataFlow Systems', amount: 78000, status: 'pending_receipt', priority: 'medium' },
    { id: 'match-004', vendor: 'CloudTech Partners', amount: 25000, status: 'pending_invoice', priority: 'low' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'matched': return 'bg-success/10 text-success border-success/20';
      case 'variance_detected': return 'bg-error/10 text-error border-error/20';
      case 'pending_receipt': return 'bg-warning/10 text-warning border-warning/20';
      case 'pending_invoice': return 'bg-accent/10 text-accent border-accent/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getVarianceSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-accent';
      default: return 'text-muted-foreground';
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

  const currentMatch = matchingData?.[selectedMatch];

  const handleMatchAction = (matchId, action) => {
    console.log(`${action} match:`, matchId);
    // Implement match action logic
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Three-Way Matching</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
              Refresh
            </Button>
            <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
              Configure
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">12</div>
            <div className="text-muted-foreground">Matched</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">3</div>
            <div className="text-muted-foreground">Variances</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">8</div>
            <div className="text-muted-foreground">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">5</div>
            <div className="text-muted-foreground">In Review</div>
          </div>
        </div>
      </div>
      <div className="flex h-96">
        {/* Matching Queue */}
        <div className="w-1/3 border-r border-border p-4">
          <h4 className="text-sm font-medium text-text-primary mb-3">Matching Queue</h4>
          <div className="space-y-2 overflow-y-auto h-80">
            {matchingQueue?.map((match) => (
              <div
                key={match?.id}
                onClick={() => setSelectedMatch(match?.id)}
                className={`p-3 rounded-lg cursor-pointer transition-smooth border ${
                  selectedMatch === match?.id 
                    ? 'bg-accent/10 border-accent' :'bg-surface border-border hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-text-primary truncate">
                    {match?.vendor}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${getPriorityColor(match?.priority)}`}>
                    {match?.priority}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  {formatCurrency(match?.amount)}
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getStatusColor(match?.status)}`}>
                  {formatStatus(match?.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Matching Details */}
        <div className="flex-1 p-4">
          {currentMatch ? (
            <div className="h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-medium text-text-primary">{currentMatch?.vendor}</h4>
                  <div className="text-sm text-muted-foreground">
                    {currentMatch?.contractId} • {formatCurrency(currentMatch?.totalAmount)}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(currentMatch?.status)}`}>
                  {formatStatus(currentMatch?.status)}
                </div>
              </div>

              {/* Three-Way Comparison */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Purchase Order */}
                <div className="bg-muted/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="FileText" size={16} className="text-primary" />
                    <h5 className="text-sm font-medium text-text-primary">Purchase Order</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Number:</span>
                      <span className="ml-2 text-text-primary">{currentMatch?.purchaseOrder?.number}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <span className="ml-2 text-text-primary">
                        {new Date(currentMatch.purchaseOrder.date)?.toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="ml-2 text-text-primary font-medium">
                        {formatCurrency(currentMatch?.purchaseOrder?.amount)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Approver:</span>
                      <span className="ml-2 text-text-primary">{currentMatch?.purchaseOrder?.approver}</span>
                    </div>
                  </div>
                </div>

                {/* Receipt */}
                <div className="bg-muted/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Package" size={16} className="text-success" />
                    <h5 className="text-sm font-medium text-text-primary">Receipt</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Number:</span>
                      <span className="ml-2 text-text-primary">{currentMatch?.receipt?.number}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <span className="ml-2 text-text-primary">
                        {new Date(currentMatch.receipt.date)?.toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Received By:</span>
                      <span className="ml-2 text-text-primary">{currentMatch?.receipt?.receivedBy}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <span className="ml-2 text-success">Received</span>
                    </div>
                  </div>
                </div>

                {/* Invoice */}
                <div className="bg-muted/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Receipt" size={16} className="text-accent" />
                    <h5 className="text-sm font-medium text-text-primary">Invoice</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Number:</span>
                      <span className="ml-2 text-text-primary">{currentMatch?.invoice?.number}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <span className="ml-2 text-text-primary">
                        {new Date(currentMatch.invoice.date)?.toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="ml-2 text-text-primary font-medium">
                        {formatCurrency(currentMatch?.invoice?.amount)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due Date:</span>
                      <span className="ml-2 text-text-primary">
                        {new Date(currentMatch.invoice.dueDate)?.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Variances */}
              {currentMatch?.variances?.length > 0 && (
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span>Detected Variances</span>
                  </h5>
                  <div className="space-y-3">
                    {currentMatch?.variances?.map((variance, index) => (
                      <div key={index} className="bg-error/5 border border-error/20 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium text-text-primary">
                            {variance?.description}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded ${
                            variance?.severity === 'high' ? 'bg-error/20 text-error' :
                            variance?.severity === 'medium'? 'bg-warning/20 text-warning' : 'bg-accent/20 text-accent'
                          }`}>
                            {variance?.severity} priority
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {variance?.type === 'amount' && (
                            <div className="flex items-center space-x-4">
                              <span>PO Amount: {formatCurrency(variance?.poAmount)}</span>
                              <span>Invoice Amount: {formatCurrency(variance?.invoiceAmount)}</span>
                              <span className={getVarianceSeverityColor(variance?.severity)}>
                                Variance: {formatCurrency(variance?.variance)}
                              </span>
                            </div>
                          )}
                          {variance?.type === 'line_item' && (
                            <div>
                              Additional Item: {variance?.item} ({formatCurrency(variance?.amount)})
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-4 border-t border-border">
                {currentMatch?.status === 'variance_detected' ? (
                  <>
                    <Button 
                      variant="default" 
                      onClick={() => handleMatchAction(currentMatch?.id, 'approve_variance')}
                    >
                      Approve with Variance
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleMatchAction(currentMatch?.id, 'reject')}
                    >
                      Reject Invoice
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleMatchAction(currentMatch?.id, 'request_clarification')}
                    >
                      Request Clarification
                    </Button>
                  </>
                ) : currentMatch?.status === 'matched' ? (
                  <Button 
                    variant="default" 
                    onClick={() => handleMatchAction(currentMatch?.id, 'approve_payment')}
                  >
                    Approve for Payment
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => handleMatchAction(currentMatch?.id, 'follow_up')}
                  >
                    Follow Up
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Icon name="FileSearch" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Select a matching item to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreeWayMatchingPanel;