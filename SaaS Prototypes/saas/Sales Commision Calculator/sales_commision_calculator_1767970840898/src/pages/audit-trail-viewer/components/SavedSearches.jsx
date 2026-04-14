import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState([
    {
      id: 1,
      name: 'High Impact Changes',
      description: 'All HIGH and CRITICAL impact modifications',
      filters: {
        impactLevel: 'HIGH',
        dateRange: { start: '2024-01-01', end: '' }
      },
      createdAt: new Date('2024-01-10T10:30:00'),
      lastUsed: new Date('2024-01-15T14:20:00'),
      useCount: 12
    },
    {
      id: 2,
      name: 'Commission Structure Changes',
      description: 'All commission and tier modifications',
      filters: {
        entity: 'Sales Tier Configuration',
        actionType: 'Commission Structure Modified'
      },
      createdAt: new Date('2024-01-08T09:15:00'),
      lastUsed: new Date('2024-01-14T16:45:00'),
      useCount: 8
    },
    {
      id: 3,
      name: 'User Access Modifications',
      description: 'Security and access control changes',
      filters: {
        actionType: 'User Access Modified',
        impactLevel: 'HIGH'
      },
      createdAt: new Date('2024-01-05T11:20:00'),
      lastUsed: new Date('2024-01-12T13:30:00'),
      useCount: 5
    },
    {
      id: 4,
      name: 'System Synchronization',
      description: 'Automated data sync events',
      filters: {
        user: 'system@company.com',
        actionType: 'Data Synchronization'
      },
      createdAt: new Date('2024-01-03T08:45:00'),
      lastUsed: new Date('2024-01-15T09:10:00'),
      useCount: 15
    },
    {
      id: 5,
      name: 'Recent Exports',
      description: 'Data export activities last 7 days',
      filters: {
        actionType: 'Data Export',
        dateRange: { start: '2024-01-08', end: '2024-01-15' }
      },
      createdAt: new Date('2024-01-09T14:30:00'),
      lastUsed: new Date('2024-01-15T11:25:00'),
      useCount: 3
    }
  ]);

  const handleLoadSearch = (search) => {
    console.log('Loading saved search:', search.name);
    // Update use count and last used
    setSavedSearches(prev => prev.map(s => 
      s.id === search.id 
        ? { ...s, lastUsed: new Date(), useCount: s.useCount + 1 }
        : s
    ));
  };

  const handleDeleteSearch = (searchId) => {
    setSavedSearches(prev => prev.filter(s => s.id !== searchId));
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="glass-morphism-dark border border-white/10 rounded-2xl overflow-hidden">
      <div className="glass-morphism-darker p-4 border-b border-white/10">
        <h3 className="font-medium text-white">Saved Searches</h3>
        <p className="text-sm text-white/60 mt-1">Quick access to common audit queries</p>
      </div>

      <div className="p-4">
        {savedSearches.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={32} className="text-white/30 mx-auto mb-3" />
            <p className="text-sm text-white/60">No saved searches yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedSearches.map((search) => (
              <div
                key={search.id}
                className="glass-morphism border border-white/10 rounded-lg p-3 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => handleLoadSearch(search)}
                      className="text-left w-full group"
                    >
                      <div className="font-medium text-white group-hover:text-neon-indigo transition-smooth">
                        {search.name}
                      </div>
                      <div className="text-sm text-white/60 mt-1 line-clamp-2">
                        {search.description}
                      </div>
                    </button>
                    
                    <div className="flex items-center space-x-4 mt-2 text-xs text-white/50">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>Used {formatDate(search.lastUsed)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="BarChart3" size={12} />
                        <span>{search.useCount} times</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    <button
                      onClick={() => handleLoadSearch(search)}
                      className="p-1 text-white/60 hover:text-neon-indigo transition-smooth rounded"
                      title="Load Search"
                    >
                      <Icon name="Play" size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteSearch(search.id)}
                      className="p-1 text-white/60 hover:text-red-400 transition-smooth rounded"
                      title="Delete Search"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSearches;