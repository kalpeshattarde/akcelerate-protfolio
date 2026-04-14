import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onFiltersChange, savedSearches = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isSavedSearchesOpen, setIsSavedSearchesOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    contractType: '',
    status: '',
    dateRange: '',
    valueRange: '',
    department: '',
    owner: ''
  });

  const searchRef = useRef(null);
  const advancedRef = useRef(null);
  const savedSearchesRef = useRef(null);

  const mockSavedSearches = [
    {
      id: 1,
      name: 'Active IT Contracts',
      query: 'department:IT status:active',
      count: 234,
      lastUsed: '2024-09-03'
    },
    {
      id: 2,
      name: 'Expiring This Month',
      query: 'expiration:2024-09',
      count: 45,
      lastUsed: '2024-09-02'
    },
    {
      id: 3,
      name: 'High Value Contracts',
      query: 'value:>1000000',
      count: 67,
      lastUsed: '2024-09-01'
    },
    {
      id: 4,
      name: 'Pending Approvals',
      query: 'status:pending',
      count: 89,
      lastUsed: '2024-08-30'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (advancedRef?.current && !advancedRef?.current?.contains(event?.target)) {
        setIsAdvancedOpen(false);
      }
      if (savedSearchesRef?.current && !savedSearchesRef?.current?.contains(event?.target)) {
        setIsSavedSearchesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event?.ctrlKey || event?.metaKey) && event?.key === 'k') {
        event?.preventDefault();
        searchRef?.current?.focus();
      }
      if (event?.key === 'Escape') {
        setIsAdvancedOpen(false);
        setIsSavedSearchesOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleAdvancedSearch = () => {
    const filters = Object.entries(advancedFilters)?.filter(([key, value]) => value)?.map(([key, value]) => `${key}:${value}`)?.join(' ');
    
    const combinedQuery = [searchQuery, filters]?.filter(Boolean)?.join(' ');
    onSearch(combinedQuery);
    setIsAdvancedOpen(false);
  };

  const handleSavedSearchClick = (savedSearch) => {
    setSearchQuery(savedSearch?.query);
    onSearch(savedSearch?.query);
    setIsSavedSearchesOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setAdvancedFilters({
      contractType: '',
      status: '',
      dateRange: '',
      valueRange: '',
      department: '',
      owner: ''
    });
    onSearch('');
  };

  const searchSuggestions = [
    'Microsoft Office 365',
    'AWS Cloud Services',
    'Salesforce CRM',
    'Oracle Database',
    'Adobe Creative Cloud',
    'status:active',
    'department:IT',
    'value:>100000',
    'expiration:2024-12'
  ];

  return (
    <div className="bg-surface border-b border-border">
      <div className="p-4">
        {/* Main Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              ref={searchRef}
              type="search"
              placeholder="Search contracts, vendors, terms... (Ctrl+K for focus, use operators like status:active, department:IT)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="pl-10 pr-32 h-12 text-base"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={clearSearch}
                  className="h-8 w-8"
                >
                  <Icon name="X" size={16} />
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="text-xs"
              >
                Advanced
              </Button>
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="px-4"
              >
                Search
              </Button>
            </div>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSavedSearchesOpen(!isSavedSearchesOpen)}
              iconName="Bookmark"
              className="text-xs"
            >
              Saved Searches
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="History"
              className="text-xs"
            >
              Recent
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="TrendingUp"
              className="text-xs"
            >
              Popular
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              4,218 total contracts
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              className="text-xs"
            >
              Export Results
            </Button>
          </div>
        </div>

        {/* Search Suggestions */}
        {searchQuery === '' && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {searchSuggestions?.slice(0, 6)?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    onSearch(suggestion);
                  }}
                  className="px-3 py-1 bg-muted text-xs text-muted-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-smooth"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Advanced Search Panel */}
      {isAdvancedOpen && (
        <div ref={advancedRef} className="border-t border-border bg-muted/30 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Contract Type
              </label>
              <select
                value={advancedFilters?.contractType}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, contractType: e?.target?.value }))}
                className="w-full px-3 py-2 text-sm border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">All Types</option>
                <option value="service">Service Agreements</option>
                <option value="procurement">Procurement</option>
                <option value="employment">Employment</option>
                <option value="nda">Non-Disclosure</option>
                <option value="licensing">Licensing</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Status
              </label>
              <select
                value={advancedFilters?.status}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, status: e?.target?.value }))}
                className="w-full px-3 py-2 text-sm border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
                <option value="expired">Expired</option>
                <option value="renewal">Up for Renewal</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Department
              </label>
              <select
                value={advancedFilters?.department}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, department: e?.target?.value }))}
                className="w-full px-3 py-2 text-sm border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">All Departments</option>
                <option value="IT">Information Technology</option>
                <option value="HR">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Legal">Legal</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Value Range
              </label>
              <select
                value={advancedFilters?.valueRange}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, valueRange: e?.target?.value }))}
                className="w-full px-3 py-2 text-sm border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Any Value</option>
                <option value="0-10000">Under $10K</option>
                <option value="10000-100000">$10K - $100K</option>
                <option value="100000-1000000">$100K - $1M</option>
                <option value="1000000+">Over $1M</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Date Range
              </label>
              <select
                value={advancedFilters?.dateRange}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, dateRange: e?.target?.value }))}
                className="w-full px-3 py-2 text-sm border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Any Date</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="this-year">This Year</option>
                <option value="expiring-soon">Expiring Soon</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Contract Owner
              </label>
              <Input
                type="text"
                placeholder="Enter owner name..."
                value={advancedFilters?.owner}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, owner: e?.target?.value }))}
                className="text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              Use boolean operators: AND, OR, NOT. Example: "Microsoft AND (status:active OR status:renewal)"
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAdvancedOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAdvancedSearch}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Saved Searches Panel */}
      {isSavedSearchesOpen && (
        <div ref={savedSearchesRef} className="border-t border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text-primary">Saved Searches</h3>
            <Button variant="ghost" size="sm" iconName="Plus" className="text-xs">
              Save Current Search
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockSavedSearches?.map((search) => (
              <button
                key={search?.id}
                onClick={() => handleSavedSearchClick(search)}
                className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg hover:bg-muted transition-smooth text-left"
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">{search?.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{search?.query}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {search?.count} results • Last used {new Date(search.lastUsed)?.toLocaleDateString()}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;