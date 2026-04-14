import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import VendorCard from './components/VendorCard';
import VendorFilters from './components/VendorFilters';
import VendorDetailModal from './components/VendorDetailModal';
import VendorStats from './components/VendorStats';
import BulkActionsModal from './components/BulkActionsModal';

const VendorManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    location: '',
    performance: '',
    minSpend: '',
    maxSpend: '',
    minContracts: '',
    maxContracts: ''
  });

  // Mock vendor data
  const [vendors] = useState([
    {
      id: 1,
      name: "TechSolutions Inc.",
      category: "Technology",
      status: "Active",
      performanceScore: 94,
      contractCount: 8,
      totalSpend: 485000,
      lastActivity: "2 days ago",
      location: "North America",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      primaryContact: "Sarah Johnson",
      email: "sarah.johnson@techsolutions.com",
      phone: "+1 (555) 123-4567",
      website: "www.techsolutions.com",
      founded: "2015",
      employees: "250-500"
    },
    {
      id: 2,
      name: "Global Logistics Partners",
      category: "Logistics",
      status: "Active",
      performanceScore: 87,
      contractCount: 12,
      totalSpend: 720000,
      lastActivity: "1 week ago",
      location: "Europe",
      logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop&crop=center",
      primaryContact: "Michael Chen",
      email: "m.chen@globallogistics.com",
      phone: "+44 20 7123 4567",
      website: "www.globallogistics.com",
      founded: "2008",
      employees: "1000+"
    },
    {
      id: 3,
      name: "Creative Marketing Agency",
      category: "Marketing",
      status: "Pending",
      performanceScore: 76,
      contractCount: 5,
      totalSpend: 125000,
      lastActivity: "3 days ago",
      location: "North America",
      logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop&crop=center",
      primaryContact: "Emma Rodriguez",
      email: "emma@creativeagency.com",
      phone: "+1 (555) 987-6543",
      website: "www.creativeagency.com",
      founded: "2018",
      employees: "50-100"
    },
    {
      id: 4,
      name: "Professional Services Corp",
      category: "Professional Services",
      status: "Active",
      performanceScore: 91,
      contractCount: 15,
      totalSpend: 890000,
      lastActivity: "5 hours ago",
      location: "Asia Pacific",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center",
      primaryContact: "David Kim",
      email: "d.kim@proservices.com",
      phone: "+82 2 1234 5678",
      website: "www.proservices.com",
      founded: "2012",
      employees: "500-1000"
    },
    {
      id: 5,
      name: "Manufacturing Solutions Ltd",
      category: "Manufacturing",
      status: "Active",
      performanceScore: 83,
      contractCount: 6,
      totalSpend: 340000,
      lastActivity: "1 day ago",
      location: "Europe",
      logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center",
      primaryContact: "Anna Mueller",
      email: "a.mueller@manufacturing.de",
      phone: "+49 30 1234 5678",
      website: "www.manufacturing.de",
      founded: "2005",
      employees: "1000+"
    },
    {
      id: 6,
      name: "Legal Advisory Group",
      category: "Legal",
      status: "Inactive",
      performanceScore: 68,
      contractCount: 3,
      totalSpend: 95000,
      lastActivity: "2 weeks ago",
      location: "North America",
      logo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop&crop=center",
      primaryContact: "Robert Taylor",
      email: "r.taylor@legaladvisory.com",
      phone: "+1 (555) 456-7890",
      website: "www.legaladvisory.com",
      founded: "2010",
      employees: "100-250"
    },
    {
      id: 7,
      name: "Financial Consulting Partners",
      category: "Financial",
      status: "Active",
      performanceScore: 96,
      contractCount: 9,
      totalSpend: 650000,
      lastActivity: "4 hours ago",
      location: "North America",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center",
      primaryContact: "Jennifer Davis",
      email: "j.davis@financialpartners.com",
      phone: "+1 (555) 234-5678",
      website: "www.financialpartners.com",
      founded: "2007",
      employees: "250-500"
    },
    {
      id: 8,
      name: "Facilities Management Co",
      category: "Facilities",
      status: "Active",
      performanceScore: 79,
      contractCount: 4,
      totalSpend: 180000,
      lastActivity: "6 days ago",
      location: "Europe",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      primaryContact: "Thomas Wilson",
      email: "t.wilson@facilities.co.uk",
      phone: "+44 20 9876 5432",
      website: "www.facilities.co.uk",
      founded: "2013",
      employees: "500-1000"
    }
  ]);

  // Filter vendors based on current filters
  const filteredVendors = vendors?.filter(vendor => {
    const matchesSearch = !filters?.search || 
      vendor?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      vendor?.category?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      vendor?.primaryContact?.toLowerCase()?.includes(filters?.search?.toLowerCase());
    
    const matchesCategory = !filters?.category || vendor?.category === filters?.category;
    const matchesStatus = !filters?.status || vendor?.status === filters?.status;
    const matchesLocation = !filters?.location || vendor?.location === filters?.location;
    
    const matchesPerformance = !filters?.performance || (() => {
      const [min, max] = filters?.performance?.split('-')?.map(Number);
      return vendor?.performanceScore >= min && vendor?.performanceScore <= max;
    })();
    
    const matchesMinSpend = !filters?.minSpend || vendor?.totalSpend >= parseInt(filters?.minSpend);
    const matchesMaxSpend = !filters?.maxSpend || vendor?.totalSpend <= parseInt(filters?.maxSpend);
    const matchesMinContracts = !filters?.minContracts || vendor?.contractCount >= parseInt(filters?.minContracts);
    const matchesMaxContracts = !filters?.maxContracts || vendor?.contractCount <= parseInt(filters?.maxContracts);

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation && 
           matchesPerformance && matchesMinSpend && matchesMaxSpend && 
           matchesMinContracts && matchesMaxContracts;
  });

  const handleVendorSelect = (vendor, isSelected) => {
    if (isSelected) {
      setSelectedVendors(prev => [...prev, vendor]);
    } else {
      setSelectedVendors(prev => prev?.filter(v => v?.id !== vendor?.id));
    }
  };

  const handleSelectAll = () => {
    if (selectedVendors?.length === filteredVendors?.length) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(filteredVendors);
    }
  };

  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
    setIsDetailModalOpen(true);
  };

  const handleEditVendor = (vendor) => {
    console.log('Edit vendor:', vendor);
    // Implement edit functionality
  };

  const handleMessageVendor = (vendor) => {
    console.log('Message vendor:', vendor);
    // Implement messaging functionality
  };

  const handleBulkAction = (actionData) => {
    console.log('Bulk action:', actionData);
    // Implement bulk action functionality
    setSelectedVendors([]);
  };

  const handleExport = () => {
    console.log('Exporting vendor data...');
    // Implement export functionality
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      location: '',
      performance: '',
      minSpend: '',
      maxSpend: '',
      minContracts: '',
      maxContracts: ''
    });
  };

  return (
    <>
      <Helmet>
        <title>Vendor Management - ContractFlow Pro</title>
        <meta name="description" content="Comprehensive vendor management with performance tracking, compliance monitoring, and relationship optimization tools." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Vendor Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage supplier relationships, performance tracking, and vendor information
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
                  iconName={viewMode === 'grid' ? 'List' : 'Grid3X3'}
                  iconSize={16}
                >
                  {viewMode === 'grid' ? 'Table View' : 'Grid View'}
                </Button>
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconSize={16}
                >
                  Import Vendors
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconSize={16}
                >
                  Add Vendor
                </Button>
              </div>
            </div>

            {/* Statistics */}
            <VendorStats vendors={filteredVendors} />

            {/* Filters */}
            <VendorFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
              onExport={handleExport}
              totalVendors={vendors?.length}
              filteredCount={filteredVendors?.length}
            />

            {/* Bulk Actions Bar */}
            {selectedVendors?.length > 0 && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Icon name="CheckCircle" size={20} className="text-accent" />
                    <span className="text-accent font-medium">
                      {selectedVendors?.length} vendor(s) selected
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedVendors([])}
                    >
                      Clear Selection
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsBulkModalOpen(true)}
                      iconName="Settings"
                      iconSize={14}
                    >
                      Bulk Actions
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Vendor List Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-text-primary transition-smooth"
                >
                  <div className={`w-4 h-4 border border-border rounded flex items-center justify-center ${
                    selectedVendors?.length === filteredVendors?.length ? 'bg-primary border-primary' : ''
                  }`}>
                    {selectedVendors?.length === filteredVendors?.length && (
                      <Icon name="Check" size={12} color="white" />
                    )}
                  </div>
                  <span>Select All ({filteredVendors?.length})</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Sort by:</span>
                <select className="bg-transparent border-none text-text-primary font-medium focus:outline-none">
                  <option>Performance Score</option>
                  <option>Name</option>
                  <option>Total Spend</option>
                  <option>Last Activity</option>
                </select>
              </div>
            </div>

            {/* Vendor Grid/Table */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVendors?.map(vendor => (
                  <div key={vendor?.id} className="relative">
                    <div className="absolute top-4 left-4 z-10">
                      <button
                        onClick={() => handleVendorSelect(vendor, !selectedVendors?.some(v => v?.id === vendor?.id))}
                        className={`w-5 h-5 border border-border rounded flex items-center justify-center transition-smooth ${
                          selectedVendors?.some(v => v?.id === vendor?.id) ? 'bg-primary border-primary' : 'bg-surface'
                        }`}
                      >
                        {selectedVendors?.some(v => v?.id === vendor?.id) && (
                          <Icon name="Check" size={12} color="white" />
                        )}
                      </button>
                    </div>
                    <VendorCard
                      vendor={vendor}
                      onViewDetails={handleViewDetails}
                      onEdit={handleEditVendor}
                      onMessage={handleMessageVendor}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          <input
                            type="checkbox"
                            checked={selectedVendors?.length === filteredVendors?.length}
                            onChange={handleSelectAll}
                            className="rounded border-border"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Vendor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Performance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Contracts
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Total Spend
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredVendors?.map(vendor => (
                        <tr key={vendor?.id} className="hover:bg-muted/50 transition-smooth">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedVendors?.some(v => v?.id === vendor?.id)}
                              onChange={(e) => handleVendorSelect(vendor, e?.target?.checked)}
                              className="rounded border-border"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                                {vendor?.logo ? (
                                  <img 
                                    src={vendor?.logo} 
                                    alt={`${vendor?.name} logo`}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Icon name="Building2" size={16} className="text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-text-primary">{vendor?.name}</p>
                                <p className="text-sm text-muted-foreground">{vendor?.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                            {vendor?.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-text-primary">
                                {vendor?.performanceScore}%
                              </span>
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-300 ${
                                    vendor?.performanceScore >= 90 ? 'bg-success' :
                                    vendor?.performanceScore >= 75 ? 'bg-warning' : 'bg-error'
                                  }`}
                                  style={{ width: `${vendor?.performanceScore}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                            {vendor?.contractCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                            ${vendor?.totalSpend?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              vendor?.status === 'Active' ? 'bg-success/10 text-success border border-success/20' :
                              vendor?.status === 'Pending'? 'bg-warning/10 text-warning border border-warning/20' : 'bg-muted text-muted-foreground border border-border'
                            }`}>
                              {vendor?.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDetails(vendor)}
                                iconName="Eye"
                                iconSize={14}
                              >
                                View
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditVendor(vendor)}
                                iconName="Edit"
                                iconSize={14}
                              >
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredVendors?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Building2" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No vendors found</h3>
                <p className="text-muted-foreground mb-4">
                  {Object.values(filters)?.some(v => v !== '') 
                    ? 'Try adjusting your filters to see more results.' :'Get started by adding your first vendor.'
                  }
                </p>
                {Object.values(filters)?.some(v => v !== '') ? (
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                ) : (
                  <Button variant="default" iconName="Plus" iconSize={16}>
                    Add First Vendor
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
        {/* Modals */}
        <VendorDetailModal
          vendor={selectedVendor}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedVendor(null);
          }}
        />
        <BulkActionsModal
          isOpen={isBulkModalOpen}
          onClose={() => setIsBulkModalOpen(false)}
          selectedVendors={selectedVendors}
          onBulkAction={handleBulkAction}
        />
      </div>
    </>
  );
};

export default VendorManagement;