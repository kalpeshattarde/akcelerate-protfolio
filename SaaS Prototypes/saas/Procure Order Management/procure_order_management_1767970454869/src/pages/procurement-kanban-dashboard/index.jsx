import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import KanbanCard from './components/KanbanCard';
import FilterToolbar from './components/FilterToolbar';
import NewPOModal from './components/NewPOModal';
import BulkActionsBar from './components/BulkActionsBar';

const ProcurementKanbanDashboard = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [isNewPOModalOpen, setIsNewPOModalOpen] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [filters, setFilters] = useState({
    supplier: '',
    dateRange: '',
    amountRange: '',
    searchQuery: ''
  });

  // Mock purchase orders data
  const [purchaseOrders, setPurchaseOrders] = useState({
    draft: [
      {
        id: 'PO-2024-001',
        supplier: 'TechCorp Solutions',
        amount: 15750.00,
        dueDate: '2024-02-15',
        priority: 'high',
        items: 5,
        lastUpdated: '2024-01-10T10:30:00Z',
        assignee: 'John Smith'
      },
      {
        id: 'PO-2024-002',
        supplier: 'Office Supplies Inc',
        amount: 2340.50,
        dueDate: '2024-02-20',
        priority: 'medium',
        items: 12,
        lastUpdated: '2024-01-09T14:15:00Z',
        assignee: 'Sarah Johnson'
      },
      {
        id: 'PO-2024-003',
        supplier: 'Industrial Equipment Co',
        amount: 45200.00,
        dueDate: '2024-03-01',
        priority: 'low',
        items: 3,
        lastUpdated: '2024-01-08T09:45:00Z',
        assignee: 'Mike Wilson'
      }
    ],
    pending: [
      {
        id: 'PO-2024-004',
        supplier: 'Global Manufacturing',
        amount: 28900.75,
        dueDate: '2024-02-18',
        priority: 'high',
        items: 8,
        lastUpdated: '2024-01-07T16:20:00Z',
        assignee: 'Lisa Chen',
        approver: 'David Brown'
      },
      {
        id: 'PO-2024-005',
        supplier: 'Software Licensing Ltd',
        amount: 12500.00,
        dueDate: '2024-02-25',
        priority: 'medium',
        items: 2,
        lastUpdated: '2024-01-06T11:30:00Z',
        assignee: 'Tom Anderson',
        approver: 'Jennifer Davis'
      }
    ],
    ordered: [
      {
        id: 'PO-2024-006',
        supplier: 'Construction Materials',
        amount: 67800.25,
        dueDate: '2024-02-12',
        priority: 'high',
        items: 15,
        lastUpdated: '2024-01-05T13:45:00Z',
        assignee: 'Robert Taylor',
        orderDate: '2024-01-05',
        trackingNumber: 'TRK-789456123'
      },
      {
        id: 'PO-2024-007',
        supplier: 'Medical Supplies Pro',
        amount: 8750.00,
        dueDate: '2024-02-22',
        priority: 'medium',
        items: 6,
        lastUpdated: '2024-01-04T08:15:00Z',
        assignee: 'Emily White',
        orderDate: '2024-01-04',
        trackingNumber: 'TRK-456789012'
      },
      {
        id: 'PO-2024-008',
        supplier: 'IT Hardware Direct',
        amount: 34200.00,
        dueDate: '2024-02-28',
        priority: 'low',
        items: 10,
        lastUpdated: '2024-01-03T15:30:00Z',
        assignee: 'Chris Martinez',
        orderDate: '2024-01-03',
        trackingNumber: 'TRK-123456789'
      }
    ],
    received: [
      {
        id: 'PO-2024-009',
        supplier: 'Facility Services Group',
        amount: 5600.00,
        dueDate: '2024-01-30',
        priority: 'medium',
        items: 4,
        lastUpdated: '2024-01-02T12:00:00Z',
        assignee: 'Amanda Garcia',
        orderDate: '2023-12-20',
        receivedDate: '2024-01-02',
        invoiceNumber: 'INV-2024-001'
      },
      {
        id: 'PO-2024-010',
        supplier: 'Catering Solutions',
        amount: 1250.75,
        dueDate: '2024-01-25',
        priority: 'low',
        items: 8,
        lastUpdated: '2024-01-01T10:30:00Z',
        assignee: 'Kevin Rodriguez',
        orderDate: '2023-12-18',
        receivedDate: '2024-01-01',
        invoiceNumber: 'INV-2024-002'
      }
    ]
  });

  const columns = [
    { id: 'draft', title: 'Draft', color: 'bg-secondary-100', count: purchaseOrders.draft.length },
    { id: 'pending', title: 'Pending Approval', color: 'bg-warning-100', count: purchaseOrders.pending.length },
    { id: 'ordered', title: 'Ordered', color: 'bg-primary-100', count: purchaseOrders.ordered.length },
    { id: 'received', title: 'Received', color: 'bg-success-100', count: purchaseOrders.received.length }
  ];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;

    const sourceColumn = purchaseOrders[source.droppableId];
    const destColumn = purchaseOrders[destination.droppableId];
    const draggedItem = sourceColumn.find(item => item.id === draggableId);

    const newSourceColumn = sourceColumn.filter(item => item.id !== draggableId);
    const newDestColumn = [...destColumn, { ...draggedItem, lastUpdated: new Date().toISOString() }];

    setPurchaseOrders({
      ...purchaseOrders,
      [source.droppableId]: newSourceColumn,
      [destination.droppableId]: newDestColumn
    });

    // Show success notification
    showNotification(`PO ${draggableId} moved to ${destination.droppableId}`, 'success');
  };

  const showNotification = (message, type) => {
    // Mock notification system
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const handleCardSelect = (cardId) => {
    if (isBulkMode) {
      setSelectedCards(prev => 
        prev.includes(cardId) 
          ? prev.filter(id => id !== cardId)
          : [...prev, cardId]
      );
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on cards:`, selectedCards);
    setSelectedCards([]);
    setIsBulkMode(false);
  };

  const filteredPurchaseOrders = () => {
    const filtered = {};
    
    Object.keys(purchaseOrders).forEach(column => {
      filtered[column] = purchaseOrders[column].filter(po => {
        const matchesSupplier = !filters.supplier || po.supplier.toLowerCase().includes(filters.supplier.toLowerCase());
        const matchesSearch = !filters.searchQuery || 
          po.id.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          po.supplier.toLowerCase().includes(filters.searchQuery.toLowerCase());
        
        return matchesSupplier && matchesSearch;
      });
    });
    
    return filtered;
  };

  const totalValue = Object.values(purchaseOrders).flat().reduce((sum, po) => sum + po.amount, 0);
  const totalOrders = Object.values(purchaseOrders).flat().length;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole="procurement" />
      <Header userRole="procurement" userName="John Smith" notificationCount={5} />
      
      <main className="lg:ml-60 lg:mt-16 p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-heading-bold text-text-primary">Procurement Dashboard</h1>
              <p className="text-text-secondary">Manage purchase orders with drag-and-drop workflow</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-heading-medium text-text-primary">{totalOrders}</div>
                  <div className="text-text-secondary">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="font-heading-medium text-text-primary">${totalValue.toLocaleString()}</div>
                  <div className="text-text-secondary">Total Value</div>
                </div>
              </div>
              <button
                onClick={() => setIsNewPOModalOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-button hover:bg-primary-700 transition-smooth flex items-center space-x-2"
              >
                <Icon name="Plus" size={20} />
                <span>New PO</span>
              </button>
            </div>
          </div>

          {/* Instructional Banner */}
          <div className="bg-primary-50 border border-primary-200 rounded-card p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <h3 className="font-heading-medium text-primary mb-1">Getting Started</h3>
                <p className="text-sm text-primary-700">
                  Drag and drop purchase orders between columns to update their status. Use the search and filters to find specific orders. 
                  Click on any card to view detailed information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <FilterToolbar 
          filters={filters}
          setFilters={setFilters}
          isBulkMode={isBulkMode}
          setIsBulkMode={setIsBulkMode}
          selectedCount={selectedCards.length}
        />

        {/* Bulk Actions Bar */}
        {isBulkMode && selectedCards.length > 0 && (
          <BulkActionsBar 
            selectedCount={selectedCards.length}
            onBulkAction={handleBulkAction}
            onCancel={() => {
              setSelectedCards([]);
              setIsBulkMode(false);
            }}
          />
        )}

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {columns.map(column => (
              <div key={column.id} className="bg-surface rounded-card border border-border">
                {/* Column Header */}
                <div className={`${column.color} px-4 py-3 rounded-t-card border-b border-border`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading-medium text-text-primary">{column.title}</h3>
                    <span className="bg-surface text-text-secondary text-xs px-2 py-1 rounded-full">
                      {column.count}
                    </span>
                  </div>
                </div>

                {/* Column Content */}
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-4 min-h-[600px] transition-colors ${
                        snapshot.isDraggingOver ? 'bg-secondary-50' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        {filteredPurchaseOrders()[column.id].map((po, index) => (
                          <Draggable key={po.id} draggableId={po.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`transition-transform ${
                                  snapshot.isDragging ? 'rotate-2 scale-105' : ''
                                }`}
                              >
                                <KanbanCard
                                  po={po}
                                  isSelected={selectedCards.includes(po.id)}
                                  isBulkMode={isBulkMode}
                                  onSelect={() => handleCardSelect(po.id)}
                                  columnId={column.id}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                      {provided.placeholder}
                      
                      {filteredPurchaseOrders()[column.id].length === 0 && (
                        <div className="text-center py-8 text-text-secondary">
                          <Icon name="Package" size={32} className="mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No orders in {column.title.toLowerCase()}</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>

        {/* Integration Status */}
        <div className="mt-6 bg-surface border border-border rounded-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-text-secondary">ERP Integration Status: Connected</span>
            </div>
            <div className="text-xs text-text-secondary">
              Last sync: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsNewPOModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-elevation-lg hover:bg-primary-700 transition-smooth flex items-center justify-center z-floating lg:hidden"
        title="Create New Purchase Order"
      >
        <Icon name="Plus" size={24} />
      </button>

      {/* New PO Modal */}
      <NewPOModal
        isOpen={isNewPOModalOpen}
        onClose={() => setIsNewPOModalOpen(false)}
        onSubmit={(newPO) => {
          setPurchaseOrders(prev => ({
            ...prev,
            draft: [...prev.draft, newPO]
          }));
          setIsNewPOModalOpen(false);
          showNotification('New purchase order created successfully', 'success');
        }}
      />
    </div>
  );
};

export default ProcurementKanbanDashboard;