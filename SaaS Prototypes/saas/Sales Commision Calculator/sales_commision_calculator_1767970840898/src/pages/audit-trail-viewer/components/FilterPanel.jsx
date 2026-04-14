import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, setFilters, onSaveSearch }) => {
  const [searchName, setSearchName] = useState('');
  const [showSaveSearch, setShowSaveSearch] = useState(false);

  const actionTypes = [
    'Commission Structure Modified',
    'Scenario Created', 
    'Data Export',
    'User Access Modified',
    'Data Synchronization',
    'Quota Adjustment',
    'Login Attempt',
    'Password Reset',
    'Report Generated',
    'Configuration Changed'
  ];

  const entities = [
    'Sales Tier Configuration',
    'Compensation Scenario',
    'Performance Report',
    'User Account',
    'CRM Integration',
    'Sales Representative',
    'Commission Structure',
    'System Settings',
    'Audit Log',
    'Security Policy'
  ];

  const impactLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateRangeChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
      dateRange: { start: '', end: '' },
      user: '',
      actionType: '',
      entity: '',
      impactLevel: ''
    });
  };

  const hasActiveFilters = () => {
    return filters.user || filters.actionType || filters.entity || filters.impactLevel || 
           filters.dateRange.start || filters.dateRange.end;
  };

  const handleSaveSearch = () => {
    if (searchName.trim()) {
      onSaveSearch(searchName.trim());
      setSearchName('');
      setShowSaveSearch(false);
    }
  };

  return (
    <div className="glass-morphism-dark border border-white/10 rounded-2xl overflow-hidden">
      <div className="glass-morphism-darker p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-white">Advanced Filters</h3>
          {hasActiveFilters() && (
            <button
              onClick={clearFilters}
              className="text-sm text-neon-indigo hover:text-neon-aqua transition-smooth"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Enhanced Date Range with proper grid */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Date Range
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-white/70 mb-1">From</label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="glass-morphism border border-white/20 rounded-xl px-3 py-2 w-full text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">To</label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="glass-morphism border border-white/20 rounded-xl px-3 py-2 w-full text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Enhanced User Filter */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            User
          </label>
          <input
            type="text"
            placeholder="Enter username or email"
            value={filters.user}
            onChange={(e) => handleFilterChange('user', e.target.value)}
            className="glass-morphism border border-white/20 rounded-xl px-3 py-2 w-full text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
          />
        </div>

        {/* Enhanced Action Type */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Action Type
          </label>
          <select
            value={filters.actionType}
            onChange={(e) => handleFilterChange('actionType', e.target.value)}
            className="glass-morphism border border-white/20 rounded-xl px-3 py-2 w-full text-sm text-white focus:outline-none focus:border-white/40 transition-all duration-300 appearance-none"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
              backgroundPosition: "right 0.75rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.25em 1.25em",
              paddingRight: "2.5rem"
            }}
          >
            <option value="" className="bg-slate-800 text-white">All Actions</option>
            {actionTypes.map(action => (
              <option key={action} value={action} className="bg-slate-800 text-white">{action}</option>
            ))}
          </select>
        </div>

        {/* Enhanced Entity */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Affected Entity
          </label>
          <select
            value={filters.entity}
            onChange={(e) => handleFilterChange('entity', e.target.value)}
            className="glass-morphism border border-white/20 rounded-xl px-3 py-2 w-full text-sm text-white focus:outline-none focus:border-white/40 transition-all duration-300 appearance-none"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
              backgroundPosition: "right 0.75rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.25em 1.25em",
              paddingRight: "2.5rem"
            }}
          >
            <option value="" className="bg-slate-800 text-white">All Entities</option>
            {entities.map(entity => (
              <option key={entity} value={entity} className="bg-slate-800 text-white">{entity}</option>
            ))}
          </select>
        </div>

        {/* Enhanced Impact Level */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Impact Level
          </label>
          <select
            value={filters.impactLevel}
            onChange={(e) => handleFilterChange('impactLevel', e.target.value)}
            className="glass-morphism border border-white/20 rounded-xl px-3 py-2 w-full text-sm text-white focus:outline-none focus:border-white/40 transition-all duration-300 appearance-none"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
              backgroundPosition: "right 0.75rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.25em 1.25em",
              paddingRight: "2.5rem"
            }}
          >
            <option value="" className="bg-slate-800 text-white">All Levels</option>
            {impactLevels.map(level => (
              <option key={level} value={level} className="bg-slate-800 text-white">{level}</option>
            ))}
          </select>
        </div>

        {/* Enhanced Save Search Section */}
        <div className="pt-4 border-t border-white/10">
          {!showSaveSearch ? (
            <button
              onClick={() => setShowSaveSearch(true)}
              className="glass-morphism border border-white/20 rounded-xl px-4 py-3 w-full flex items-center justify-center space-x-2 text-white/90 hover:text-white hover:border-white/30 transition-all duration-300"
            >
              <Icon name="Save" size={16} />
              <span>Save Search</span>
            </button>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Search name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="glass-morphism border border-white/20 rounded-xl px-3 py-2 w-full text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
              />
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSaveSearch}
                  className="glass-morphism border border-neon-indigo/50 rounded-lg px-3 py-2 text-sm text-white hover:border-neon-indigo hover:bg-neon-indigo/20 transition-all duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowSaveSearch(false);
                    setSearchName('');
                  }}
                  className="glass-morphism border border-white/20 rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;