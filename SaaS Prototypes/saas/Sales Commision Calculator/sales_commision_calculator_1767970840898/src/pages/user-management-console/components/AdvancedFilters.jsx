// src/pages/user-management-console/components/AdvancedFilters.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AdvancedFilters = ({ searchTerm, onSearchChange, currentFilter, onFilterChange, users }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [savedFilters, setSavedFilters] = useState([
    {
      id: 1,
      name: 'Active Sales Team',
      description: 'Active users in Sales department',
      filters: { role: 'Sales Representative', status: 'active', department: 'Sales' },
      count: 42
    },
    {
      id: 2,
      name: 'Inactive Accounts',
      description: 'All inactive user accounts',
      filters: { status: 'inactive' },
      count: 8
    },
    {
      id: 3,
      name: 'Admin Users',
      description: 'Users with administrative privileges',
      filters: { role: 'Administrator' },
      count: 3
    }
  ]);
  const [newFilterName, setNewFilterName] = useState('');
  const [showSaveFilter, setShowSaveFilter] = useState(false);

  // Get unique values for filter options
  const departments = [...new Set(users.map(user => user.department))];
  const roles = [...new Set(users.map(user => user.role))];
  const territories = [...new Set(users.map(user => user.territory))];
  const compensationLevels = [...new Set(users.map(user => user.compensationLevel))];

  const quickFilters = [
    { id: 'all', label: 'All Users', icon: 'Users', count: users.length },
    { id: 'active', label: 'Active', icon: 'CheckCircle', count: users.filter(u => u.status === 'active').length },
    { id: 'inactive', label: 'Inactive', icon: 'XCircle', count: users.filter(u => u.status === 'inactive').length },
    { id: 'recent', label: 'Recent Logins', icon: 'Clock', count: users.filter(u => {
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return new Date(u.lastLogin) > dayAgo;
    }).length }
  ];

  const handleSaveFilter = () => {
    if (!newFilterName.trim()) return;
    
    const newFilter = {
      id: Date.now(),
      name: newFilterName,
      description: `Custom filter: ${newFilterName}`,
      filters: { current: currentFilter },
      count: users.filter(user => {
        // Apply current filter logic
        return currentFilter === 'all' || 
               (currentFilter === 'active' && user.status === 'active') ||
               (currentFilter === 'inactive' && user.status === 'inactive');
      }).length
    };
    
    setSavedFilters([...savedFilters, newFilter]);
    setNewFilterName('');
    setShowSaveFilter(false);
  };

  const handleLoadFilter = (filter) => {
    if (filter.filters.current) {
      onFilterChange(filter.filters.current);
    }
  };

  const handleDeleteFilter = (filterId) => {
    setSavedFilters(savedFilters.filter(f => f.id !== filterId));
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
        <input
          id="user-search"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search users by name, email, role, or department..."
          className="w-full pl-11 pr-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-text-secondary">
          Ctrl+F
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {quickFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-sm border transition-smooth whitespace-nowrap ${
              currentFilter === filter.id
                ? 'bg-primary text-white border-primary' :'bg-surface text-text-secondary border-border hover:bg-secondary-50 hover:text-text-primary'
            }`}
          >
            <Icon name={filter.icon} size={16} />
            <span className="text-sm">{filter.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-sm ${
              currentFilter === filter.id
                ? 'bg-primary-700 text-white' :'bg-secondary-200 text-secondary-700'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
        
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 px-4 py-2 border border-border rounded-sm bg-surface text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-smooth"
        >
          <Icon name="Filter" size={16} />
          <span className="text-sm">Advanced</span>
          <Icon name={showAdvanced ? 'ChevronUp' : 'ChevronDown'} size={14} />
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="bg-secondary-50 border border-border rounded-sm p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Department</label>
              <select className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Role</label>
              <select className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Territory</label>
              <select className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">All Territories</option>
                {territories.map(territory => (
                  <option key={territory} value={territory}>{territory}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Access Level</label>
              <select className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">All Levels</option>
                {compensationLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Last Login</label>
              <select className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">Any time</option>
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="quarter">This quarter</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Account Status</label>
              <select className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth">
                Apply Filters
              </button>
              <button className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-sm hover:bg-secondary-200 transition-smooth">
                Clear All
              </button>
              <button
                onClick={() => setShowSaveFilter(!showSaveFilter)}
                className="px-4 py-2 bg-info text-white rounded-sm hover:bg-info-700 transition-smooth"
              >
                Save Filter
              </button>
            </div>
            
            <div className="text-sm text-text-secondary">
              {users.length} users found
            </div>
          </div>
        </div>
      )}

      {/* Save Filter Modal */}
      {showSaveFilter && (
        <div className="bg-surface border border-border rounded-sm p-4">
          <h4 className="text-sm font-medium text-text-primary mb-3">Save Current Filter</h4>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newFilterName}
              onChange={(e) => setNewFilterName(e.target.value)}
              placeholder="Enter filter name"
              className="flex-1 px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={handleSaveFilter}
              className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
            >
              Save
            </button>
            <button
              onClick={() => setShowSaveFilter(false)}
              className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-sm hover:bg-secondary-200 transition-smooth"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Saved Filters */}
      {savedFilters.length > 0 && (
        <div className="bg-surface border border-border rounded-sm p-4">
          <h4 className="text-sm font-medium text-text-primary mb-3">Saved Filter Presets</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedFilters.map((filter) => (
              <div key={filter.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-sm">
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{filter.name}</div>
                  <div className="text-xs text-text-secondary">{filter.description}</div>
                  <div className="text-xs text-primary mt-1">{filter.count} users</div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleLoadFilter(filter)}
                    className="p-1 text-secondary-600 hover:text-primary transition-smooth"
                    title="Load Filter"
                  >
                    <Icon name="Play" size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteFilter(filter.id)}
                    className="p-1 text-secondary-600 hover:text-error transition-smooth"
                    title="Delete Filter"
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;