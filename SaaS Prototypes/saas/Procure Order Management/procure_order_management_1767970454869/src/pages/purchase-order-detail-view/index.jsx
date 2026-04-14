// /home/ubuntu/app/procureflow/src/pages/purchase-order-detail-view/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

// Removed PurchaseOrderHeader import as requested
import SupplierSummaryPanel from './components/SupplierSummaryPanel';
import LineItemsTable from './components/LineItemsTable';
import ApprovalWorkflowSidebar from './components/ApprovalWorkflowSidebar';

const PurchaseOrderDetailView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userRole] = useState('procurement');
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Mock purchase order data
  const mockPurchaseOrder = {
    id: "PO-2024-001",
    poNumber: "PO-2024-001",
    status: "Pending Approval",
    statusColor: "warning",
    lastModified: new Date(Date.now() - 3600000),
    createdDate: new Date(Date.now() - 86400000 * 3),
    expectedDelivery: new Date(Date.now() + 86400000 * 7),
    supplier: {
      id: "SUP-001",
      name: "TechCorp Solutions Inc.",
      contactPerson: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      phone: "+1 (555) 123-4567",
      address: {
        street: "1234 Technology Drive",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        country: "United States"
      },
      paymentTerms: "Net 30",
      taxId: "12-3456789"
    },
    deliveryAddress: {
      name: "ProcureFlow Headquarters",
      street: "5678 Business Plaza",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      contactPerson: "Mike Chen",
      phone: "+1 (555) 987-6543"
    },
    lineItems: [
      {
        id: "LI-001",
        productCode: "LAPTOP-001",
        description: "Dell Latitude 7420 Business Laptop - Intel Core i7, 16GB RAM, 512GB SSD",
        category: "Hardware",
        quantity: 25,
        unitPrice: 1299.99,
        extendedAmount: 32499.75,
        taxRate: 0.0875,
        taxAmount: 2843.73,
        deliveryDate: new Date(Date.now() + 86400000 * 5),
        notes: "Include extended warranty"
      },
      {
        id: "LI-002",
        productCode: "MON-001",
        description: "Dell UltraSharp 27\" 4K USB-C Monitor (U2720Q)",
        category: "Hardware",
        quantity: 25,
        unitPrice: 549.99,
        extendedAmount: 13749.75,
        taxRate: 0.0875,
        taxAmount: 1203.10,
        deliveryDate: new Date(Date.now() + 86400000 * 5),
        notes: ""
      },
      {
        id: "LI-003",
        productCode: "SW-001",
        description: "Microsoft Office 365 Business Premium - Annual License",
        category: "Software",
        quantity: 25,
        unitPrice: 264.00,
        extendedAmount: 6600.00,
        taxRate: 0.0875,
        taxAmount: 577.50,
        deliveryDate: new Date(Date.now() + 86400000 * 1),
        notes: "Digital delivery"
      },
      {
        id: "LI-004",
        productCode: "ACC-001",
        description: "Wireless Keyboard and Mouse Combo - Logitech MX Keys",
        category: "Accessories",
        quantity: 25,
        unitPrice: 129.99,
        extendedAmount: 3249.75,
        taxRate: 0.0875,
        taxAmount: 284.35,
        deliveryDate: new Date(Date.now() + 86400000 * 3),
        notes: ""
      }
    ],
    financials: {
      subtotal: 56099.25,
      taxTotal: 4908.68,
      shippingCost: 150.00,
      discount: 0.00,
      grandTotal: 61157.93
    },
    approvalWorkflow: [
      {
        id: "APP-001",
        step: "Procurement Review",
        approver: "John Smith",
        status: "Approved",
        timestamp: new Date(Date.now() - 86400000 * 2),
        comments: "All items verified and within budget guidelines."
      },
      {
        id: "APP-002",
        step: "Finance Approval",
        approver: "Lisa Wong",
        status: "Pending",
        timestamp: null,
        comments: ""
      },
      {
        id: "APP-003",
        step: "Final Authorization",
        approver: "David Rodriguez",
        status: "Waiting",
        timestamp: null,
        comments: ""
      }
    ],
    comments: [
      {
        id: "COM-001",
        author: "John Smith",
        role: "Procurement Officer",
        timestamp: new Date(Date.now() - 86400000 * 2),
        content: "Verified all specifications with IT department. Quantities match the approved headcount increase."
      },
      {
        id: "COM-002",
        author: "Sarah Johnson",
        role: "Supplier",
        timestamp: new Date(Date.now() - 86400000 * 1),
        content: "Confirmed availability for all items. Can expedite delivery if needed."
      }
    ],
    attachments: [
      {
        id: "ATT-001",
        name: "Technical_Specifications.pdf",
        size: "2.4 MB",
        type: "application/pdf",
        uploadedBy: "John Smith",
        uploadedAt: new Date(Date.now() - 86400000 * 3)
      },
      {
        id: "ATT-002",
        name: "Supplier_Quote.xlsx",
        size: "156 KB",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        uploadedBy: "Sarah Johnson",
        uploadedAt: new Date(Date.now() - 86400000 * 2)
      }
    ],
    auditHistory: [
      {
        id: "AUD-001",
        action: "Created",
        user: "John Smith",
        timestamp: new Date(Date.now() - 86400000 * 3),
        details: "Purchase order created with 4 line items"
      },
      {
        id: "AUD-002",
        action: "Modified",
        user: "John Smith",
        timestamp: new Date(Date.now() - 86400000 * 2),
        details: "Updated delivery address and added technical specifications"
      },
      {
        id: "AUD-003",
        action: "Submitted for Approval",
        user: "John Smith",
        timestamp: new Date(Date.now() - 86400000 * 2),
        details: "Submitted to procurement review workflow"
      }
    ],
    erpSyncStatus: {
      lastSync: new Date(Date.now() - 1800000),
      status: "Synced",
      nextSync: new Date(Date.now() + 1800000)
    }
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setPurchaseOrder(mockPurchaseOrder);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleStatusUpdate = (newStatus) => {
    setPurchaseOrder(prev => ({
      ...prev,
      status: newStatus,
      lastModified: new Date()
    }));
  };

  const handleLineItemUpdate = (itemId, updates) => {
    setPurchaseOrder(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      ),
      lastModified: new Date()
    }));
  };

  const handleBulkAction = (action) => {
    if (selectedItems.length === 0) return;
    
    switch (action) {
      case 'delete':
        setPurchaseOrder(prev => ({
          ...prev,
          lineItems: prev.lineItems.filter(item => !selectedItems.includes(item.id)),
          lastModified: new Date()
        }));
        setSelectedItems([]);
        break;
      case 'duplicate':
        const itemsToDuplicate = purchaseOrder.lineItems.filter(item => 
          selectedItems.includes(item.id)
        );
        const duplicatedItems = itemsToDuplicate.map(item => ({
          ...item,
          id: `${item.id}-copy-${Date.now()}`,
          quantity: 1
        }));
        setPurchaseOrder(prev => ({
          ...prev,
          lineItems: [...prev.lineItems, ...duplicatedItems],
          lastModified: new Date()
        }));
        setSelectedItems([]);
        break;
    }
  };

  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting PO ${purchaseOrder.poNumber} as ${format}`);
  };

  const handleKeyboardShortcuts = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 's':
          e.preventDefault();
          console.log('Saving purchase order...');
          break;
        case 'e':
          e.preventDefault();
          setIsEditing(!isEditing);
          break;
      }
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setSelectedItems([]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () => document.removeEventListener('keydown', handleKeyboardShortcuts);
  }, [isEditing]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading purchase order details...</p>
        </div>
      </div>
    );
  }

  if (!purchaseOrder) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertTriangle" size={48} className="text-warning mx-auto mb-4" />
          <h2 className="text-xl font-heading-medium text-text-primary mb-2">Purchase Order Not Found</h2>
          <p className="text-text-secondary mb-4">The requested purchase order could not be loaded.</p>
          <button
            onClick={() => navigate('/procurement-kanban-dashboard')}
            className="px-6 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={userRole} />
      <Header userRole={userRole} userName="John Smith" />
      
      <main className="lg:ml-60 lg:pt-16">
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-4 lg:mb-6">
              <div className="min-w-0">
                <h1 className="text-2xl lg:text-3xl font-heading-bold text-text-primary mb-2 truncate">
                  Purchase Order Details
                </h1>
                <p className="text-sm lg:text-base text-text-secondary truncate">
                  {purchaseOrder?.poNumber ? `Managing ${purchaseOrder.poNumber} - ${purchaseOrder?.supplier?.name || 'Unknown Supplier'}` : 'Purchase order information'}
                </p>
              </div>
              
              <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
                <div className="flex items-center space-x-2 text-xs lg:text-sm text-text-secondary">
                  <Icon name="Clock" size={14} className="lg:w-4 lg:h-4" />
                  <span className="truncate">
                    Last updated: {purchaseOrder?.lastModified ? 
                      new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(new Date(purchaseOrder.lastModified)) : 'Unknown'
                    }
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate('/procurement-kanban-dashboard')}
                    className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-secondary-100 hover:bg-secondary-200 rounded-button transition-smooth flex-shrink-0"
                  >
                    <Icon name="ArrowLeft" size={14} className="lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm font-body-medium hidden sm:inline">Back to Dashboard</span>
                    <span className="text-xs lg:text-sm font-body-medium sm:hidden">Back</span>
                  </button>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-button transition-smooth flex-shrink-0 ${
                      isEditing 
                        ? 'bg-warning text-white hover:bg-warning-700' :'bg-primary text-white hover:bg-primary-700'
                    }`}
                  >
                    <Icon name={isEditing ? 'X' : 'Edit'} size={14} className="lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm font-body-medium hidden sm:inline">
                      {isEditing ? 'Cancel Edit' : 'Edit Order'}
                    </span>
                    <span className="text-xs lg:text-sm font-body-medium sm:hidden">
                      {isEditing ? 'Cancel' : 'Edit'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Order Header section removed as requested */}

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6">
            {/* Left Content Area */}
            <div className="xl:col-span-8 2xl:col-span-9">
              <div className="space-y-4 lg:space-y-6">
                {/* Supplier Summary Panel */}
                <SupplierSummaryPanel
                  purchaseOrder={purchaseOrder}
                  isEditing={isEditing}
                />

                {/* Line Items Table */}
                <LineItemsTable
                  lineItems={purchaseOrder.lineItems}
                  financials={purchaseOrder.financials}
                  selectedItems={selectedItems}
                  onSelectionChange={setSelectedItems}
                  onItemUpdate={handleLineItemUpdate}
                  onBulkAction={handleBulkAction}
                  isEditing={isEditing}
                  userRole={userRole}
                />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="xl:col-span-4 2xl:col-span-3">
              <div className="sticky top-20">
                <ApprovalWorkflowSidebar
                  purchaseOrder={purchaseOrder}
                  userRole={userRole}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PurchaseOrderDetailView;