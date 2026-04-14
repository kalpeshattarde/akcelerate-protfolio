import React, { useState, useMemo } from 'react';

import Icon from '../../components/AppIcon';

import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';
import SupplierGrid from './components/SupplierGrid';
import SupplierDetail from './components/SupplierDetail';
import SupplierFilters from './components/SupplierFilters';
import BulkOperations from './components/BulkOperations';

const SupplierManagementInterface = () => {
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [viewMode, setViewMode] = useState('grid'); // grid or detail

  // Mock supplier data
  const suppliers = [
    {
      id: 'SUP-001',
      name: 'TechCorp Solutions',
      status: 'active',
      category: 'technology',
      rating: 4.8,
      lastOrderDate: '2024-01-15',
      totalSpend: 125000,
      contactPerson: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, Silicon Valley, CA 94105',
      paymentTerms: 'Net 30',
      deliveryRating: 95,
      qualityRating: 92,
      complianceStatus: 'compliant',
      contractExpiry: '2024-12-31',
      certifications: ['ISO 9001', 'SOC 2'],
      portalStatus: 'connected',
      lastActivity: '2024-01-20T10:30:00Z'
    },
    {
      id: 'SUP-002',
      name: 'Global Manufacturing Inc',
      status: 'active',
      category: 'manufacturing',
      rating: 4.5,
      lastOrderDate: '2024-01-18',
      totalSpend: 89000,
      contactPerson: 'Michael Chen',
      email: 'michael.chen@globalmanuf.com',
      phone: '+1 (555) 234-5678',
      address: '456 Industrial Blvd, Detroit, MI 48201',
      paymentTerms: 'Net 45',
      deliveryRating: 88,
      qualityRating: 94,
      complianceStatus: 'compliant',
      contractExpiry: '2024-08-15',
      certifications: ['ISO 14001', 'OHSAS 18001'],
      portalStatus: 'connected',
      lastActivity: '2024-01-19T14:15:00Z'
    },
    {
      id: 'SUP-003',
      name: 'Office Supplies Plus',
      status: 'pending',
      category: 'office-supplies',
      rating: 4.2,
      lastOrderDate: '2024-01-10',
      totalSpend: 45000,
      contactPerson: 'Emily Rodriguez',
      email: 'emily.rodriguez@officesupplies.com',
      phone: '+1 (555) 345-6789',
      address: '789 Commerce Ave, Chicago, IL 60601',
      paymentTerms: 'Net 15',
      deliveryRating: 90,
      qualityRating: 85,
      complianceStatus: 'review-required',
      contractExpiry: '2024-06-30',
      certifications: ['Green Business Certification'],
      portalStatus: 'disconnected',
      lastActivity: '2024-01-18T09:45:00Z'
    },
    {
      id: 'SUP-004',
      name: 'Logistics Express',
      status: 'active',
      category: 'logistics',
      rating: 4.7,
      lastOrderDate: '2024-01-20',
      totalSpend: 156000,
      contactPerson: 'David Wilson',
      email: 'david.wilson@logisticsexpress.com',
      phone: '+1 (555) 456-7890',
      address: '321 Transport Way, Atlanta, GA 30309',
      paymentTerms: 'Net 30',
      deliveryRating: 97,
      qualityRating: 89,
      complianceStatus: 'compliant',
      contractExpiry: '2025-03-15',
      certifications: ['DOT Certified', 'HAZMAT Certified'],
      portalStatus: 'connected',
      lastActivity: '2024-01-20T16:20:00Z'
    },
    {
      id: 'SUP-005',
      name: 'Green Energy Solutions',
      status: 'inactive',
      category: 'energy',
      rating: 3.9,
      lastOrderDate: '2023-12-05',
      totalSpend: 78000,
      contactPerson: 'Lisa Thompson',
      email: 'lisa.thompson@greenenergy.com',
      phone: '+1 (555) 567-8901',
      address: '654 Renewable Rd, Austin, TX 78701',
      paymentTerms: 'Net 60',
      deliveryRating: 82,
      qualityRating: 87,
      complianceStatus: 'non-compliant',
      contractExpiry: '2024-04-30',
      certifications: ['LEED Certified'],
      portalStatus: 'disconnected',
      lastActivity: '2023-12-20T11:30:00Z'
    },
    {
      id: 'SUP-006',
      name: 'Premium Catering Services',
      status: 'active',
      category: 'services',
      rating: 4.6,
      lastOrderDate: '2024-01-19',
      totalSpend: 34000,
      contactPerson: 'Robert Martinez',
      email: 'robert.martinez@premiumcatering.com',
      phone: '+1 (555) 678-9012',
      address: '987 Culinary Circle, New York, NY 10001',
      paymentTerms: 'Net 15',
      deliveryRating: 93,
      qualityRating: 96,
      complianceStatus: 'compliant',
      contractExpiry: '2024-11-30',
      certifications: ['Food Safety Certified', 'Organic Certified'],
      portalStatus: 'connected',
      lastActivity: '2024-01-19T12:45:00Z'
    }
  ];

  // Filter and sort suppliers
  const filteredAndSortedSuppliers = useMemo(() => {
    let filtered = suppliers.filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          supplier.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort suppliers
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [suppliers, searchQuery, statusFilter, categoryFilter, sortConfig]);

  const handleSupplierSelect = (supplierId, isSelected) => {
    if (isSelected) {
      setSelectedSuppliers(prev => [...prev, supplierId]);
    } else {
      setSelectedSuppliers(prev => prev.filter(id => id !== supplierId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedSuppliers(filteredAndSortedSuppliers.map(s => s.id));
    } else {
      setSelectedSuppliers([]);
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const selectedSupplier = selectedSupplierId ? 
    suppliers.find(s => s.id === selectedSupplierId) : null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole="procurement" />
      <Header userRole="procurement" userName="John Doe" />
      
      <main className="lg:ml-60 lg:pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-heading-bold text-text-primary">Supplier Management</h1>
                <p className="text-text-secondary mt-1">
                  Manage vendor relationships, track performance, and maintain compliance
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-secondary-100 text-text-secondary rounded-button hover:bg-secondary-200 transition-smooth">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add Supplier
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-surface p-4 rounded-card border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Total Suppliers</p>
                    <p className="text-2xl font-heading-bold text-text-primary">{suppliers.length}</p>
                  </div>
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
              </div>
              <div className="bg-surface p-4 rounded-card border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Active Suppliers</p>
                    <p className="text-2xl font-heading-bold text-success">
                      {suppliers.filter(s => s.status === 'active').length}
                    </p>
                  </div>
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
              <div className="bg-surface p-4 rounded-card border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Avg Rating</p>
                    <p className="text-2xl font-heading-bold text-text-primary">
                      {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)}
                    </p>
                  </div>
                  <Icon name="Star" size={24} className="text-warning" />
                </div>
              </div>
              <div className="bg-surface p-4 rounded-card border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Total Spend</p>
                    <p className="text-2xl font-heading-bold text-text-primary">
                      ${(suppliers.reduce((sum, s) => sum + s.totalSpend, 0) / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <Icon name="DollarSign" size={24} className="text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Three Panel Layout */}
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)]">
            {/* Left Panel - Filters */}
            <div className="col-span-12 lg:col-span-3">
              <SupplierFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                suppliers={suppliers}
              />
            </div>

            {/* Center Panel - Supplier Grid */}
            <div className={`col-span-12 ${selectedSupplierId ? 'lg:col-span-6' : 'lg:col-span-9'}`}>
              <div className="bg-surface rounded-card border border-border h-full flex flex-col">
                {/* Bulk Operations */}
                {selectedSuppliers.length > 0 && (
                  <BulkOperations
                    selectedCount={selectedSuppliers.length}
                    onClearSelection={() => setSelectedSuppliers([])}
                  />
                )}

                {/* Supplier Grid */}
                <SupplierGrid
                  suppliers={filteredAndSortedSuppliers}
                  selectedSuppliers={selectedSuppliers}
                  onSupplierSelect={handleSupplierSelect}
                  onSelectAll={handleSelectAll}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                  onSupplierClick={setSelectedSupplierId}
                  selectedSupplierId={selectedSupplierId}
                />
              </div>
            </div>

            {/* Right Panel - Supplier Detail */}
            {selectedSupplierId && (
              <div className="col-span-12 lg:col-span-3">
                <SupplierDetail
                  supplier={selectedSupplier}
                  onClose={() => setSelectedSupplierId(null)}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplierManagementInterface;