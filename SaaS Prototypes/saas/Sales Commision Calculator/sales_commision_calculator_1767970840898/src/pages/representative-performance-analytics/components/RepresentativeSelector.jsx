import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RepresentativeSelector = ({ representatives, selectedRep, onSelectRep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter representatives based on search term
  const filteredReps = representatives.filter(rep =>
    rep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.territory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.tier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelectRep = (rep) => {
    onSelectRep(rep);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Tier 1': return 'bg-success-100 text-success-700';
      case 'Tier 2': return 'bg-warning-100 text-warning-700';
      case 'Tier 3': return 'bg-secondary-100 text-secondary-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getQuotaAttainmentColor = (attainment) => {
    if (attainment >= 100) return 'text-success';
    if (attainment >= 80) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="card-glass">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-medium text-white mb-1">Representative Selector</h3>
        <p className="text-sm text-white/70">Choose a representative to analyze performance</p>
      </div>

      <div className="p-4">
        {/* Dropdown Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-3 border border-white/20 rounded-sm hover:border-white/40 transition-smooth glass-morphism"
          >
            {selectedRep ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={selectedRep.avatar}
                    alt={selectedRep.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium text-white">{selectedRep.name}</div>
                  <div className="text-sm text-white/70">{selectedRep.territory}</div>
                </div>
              </div>
            ) : (
              <span className="text-white/70">Select a representative...</span>
            )}
            <Icon 
              name={isOpen ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-white/60" 
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 glass-morphism-elevated border border-white/20 rounded-sm shadow-dark z-50 max-h-80 overflow-hidden">
              {/* Search Input */}
              <div className="p-3 border-b border-white/10">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" 
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search representatives..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-neon-indigo/50 focus:border-white/40 glass-morphism text-white placeholder-white/50"
                  />
                </div>
              </div>

              {/* Representatives List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredReps.length > 0 ? (
                  filteredReps.map((rep) => (
                    <button
                      key={rep.id}
                      onClick={() => handleSelectRep(rep)}
                      className={`w-full p-3 text-left hover:bg-white/10 transition-smooth border-b border-white/10 last:border-b-0 ${
                        selectedRep?.id === rep.id ? 'bg-white/10' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={rep.avatar}
                            alt={rep.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-white truncate">{rep.name}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-sm ${getTierColor(rep.tier)}`}>
                              {rep.tier}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/70">{rep.territory}</span>
                            <span className={`font-medium ${getQuotaAttainmentColor(rep.quotaAttainment)}`}>
                              {rep.quotaAttainment}% quota
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-white/70">
                    <Icon name="Search" size={24} className="mx-auto mb-2 text-white/40" />
                    <p>No representatives found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Selected Representative Details */}
        {selectedRep && (
          <div className="mt-4 p-4 glass-morphism-dark rounded-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-white">Quick Overview</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-sm ${getTierColor(selectedRep.tier)}`}>
                {selectedRep.tier}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/70">Territory:</span>
                <div className="font-medium text-white">{selectedRep.territory}</div>
              </div>
              <div>
                <span className="text-white/70">Ranking:</span>
                <div className="font-medium text-white">
                  #{selectedRep.ranking} of {selectedRep.totalReps}
                </div>
              </div>
              <div>
                <span className="text-white/70">YTD Revenue:</span>
                <div className="font-medium text-white">
                  ${selectedRep.ytdRevenue.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-white/70">Quota Attainment:</span>
                <div className={`font-medium ${getQuotaAttainmentColor(selectedRep.quotaAttainment)}`}>
                  {selectedRep.quotaAttainment}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepresentativeSelector;