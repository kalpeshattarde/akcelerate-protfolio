import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import ContractGrid from './components/ContractGrid';
import ContractPreview from './components/ContractPreview';
import BulkActionToolbar from './components/BulkActionToolbar';

const ContractRepository = () => {
  const [selectedContracts, setSelectedContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ column: 'lastModified', direction: 'desc' });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Keyboard shortcuts
      if (event?.key === 'Escape') {
        setSelectedContracts([]);
        setSelectedContract(null);
        setIsPreviewOpen(false);
      }
      
      // Navigation shortcuts
      if (event?.altKey) {
        switch (event?.key) {
          case 'f':
            event?.preventDefault();
            // Focus on filter sidebar
            break;
          case 's':
            event?.preventDefault();
            // Focus on search
            break;
          case 'p':
            event?.preventDefault();
            setIsPreviewOpen(!isPreviewOpen);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Reset selection when searching
    setSelectedContracts([]);
    setSelectedContract(null);
  };

  const handleFiltersChange = (filters) => {
    setAppliedFilters(filters);
    // Reset selection when filtering
    setSelectedContracts([]);
    setSelectedContract(null);
  };

  const handleContractSelect = (contractIds) => {
    setSelectedContracts(contractIds);
  };

  const handleContractClick = (contract) => {
    setSelectedContract(contract);
    setIsPreviewOpen(true);
  };

  const handleSortChange = (config) => {
    setSortConfig(config);
  };

  const handleBulkAction = (action, contractIds, options = {}) => {
    console.log('Bulk action:', action, contractIds, options);
    
    switch (action) {
      case 'status-change':
        // Implement status change logic
        console.log(`Changing status to ${options?.status} for ${contractIds?.length} contracts`);
        break;
      case 'reassign':
        // Implement reassignment logic
        console.log(`Reassigning ${contractIds?.length} contracts to ${options?.assignee?.name}`);
        break;
      case 'export':
        // Implement export logic
        console.log(`Exporting ${contractIds?.length} contracts as ${options?.format}`);
        break;
      case 'archive':
        // Implement archive logic
        console.log(`Archiving ${contractIds?.length} contracts`);
        break;
      case 'delete':
        // Implement delete logic with confirmation
        if (window.confirm(`Are you sure you want to delete ${contractIds?.length} contracts? This action cannot be undone.`)) {
          console.log(`Deleting ${contractIds?.length} contracts`);
        }
        break;
      case 'add-tags':
        // Implement tag addition logic
        console.log(`Adding tags to ${contractIds?.length} contracts`);
        break;
      default:
        console.log('Unknown bulk action:', action);
    }
    
    // Clear selection after action
    setSelectedContracts([]);
  };

  const handleClearSelection = () => {
    setSelectedContracts([]);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
    setSelectedContract(null);
  };

  return (
    <>
      <Helmet>
        <title>Contract Repository - ContractFlow Pro</title>
        <meta name="description" content="Comprehensive contract management with advanced search, bulk operations, and detailed metadata tracking for enterprise-scale contract volumes." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="h-[calc(100vh-4rem)] flex">
            {/* Filter Sidebar - 25% */}
            <div className="w-1/4 min-w-80">
              <FilterSidebar 
                onFiltersChange={handleFiltersChange}
                appliedFilters={appliedFilters}
              />
            </div>

            {/* Main Content Area - 50% or 75% depending on preview */}
            <div className={`flex flex-col ${isPreviewOpen ? 'w-1/2' : 'w-3/4'} transition-all duration-300`}>
              {/* Search Bar */}
              <SearchBar 
                onSearch={handleSearch}
                onFiltersChange={handleFiltersChange}
              />

              {/* Contract Grid */}
              <ContractGrid
                selectedContracts={selectedContracts}
                onContractSelect={handleContractSelect}
                onContractClick={handleContractClick}
                searchQuery={searchQuery}
                appliedFilters={appliedFilters}
                sortConfig={sortConfig}
                onSortChange={handleSortChange}
              />
            </div>

            {/* Contract Preview - 25% */}
            {isPreviewOpen && (
              <ContractPreview
                selectedContract={selectedContract}
                onClose={handlePreviewClose}
              />
            )}
          </div>
        </main>

        {/* Bulk Action Toolbar */}
        <BulkActionToolbar
          selectedContracts={selectedContracts}
          onBulkAction={handleBulkAction}
          onClearSelection={handleClearSelection}
        />

        {/* Keyboard Shortcuts Help */}
        <div className="fixed bottom-4 right-4 z-100">
          <div className="bg-surface border border-border rounded-lg p-3 shadow-soft text-xs text-muted-foreground">
            <div className="space-y-1">
              <div>Ctrl+K: Focus search</div>
              <div>Alt+F: Focus filters</div>
              <div>Alt+P: Toggle preview</div>
              <div>Esc: Clear selection</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractRepository;