import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const SalesRepTable = ({ salesReps, selectedReps, onSelectionChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort data
  const filteredAndSortedReps = useMemo(() => {
    let filtered = salesReps.filter(rep =>
      rep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.territory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.salesTier.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [salesReps, sortConfig, searchTerm]);

  // Handle sorting with animation
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle row selection with ripple effect
  const handleRowSelect = (rep, isSelected) => {
    if (isSelected) {
      onSelectionChange([...selectedReps, rep]);
    } else {
      onSelectionChange(selectedReps.filter(r => r.id !== rep.id));
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedReps.length === filteredAndSortedReps.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(filteredAndSortedReps);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get performance indicator color with neon theme
  const getPerformanceColor = (attainment) => {
    if (attainment >= 100) return 'text-neon-teal';
    if (attainment >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Get tier badge color with glassmorphism
  const getTierColor = (tier) => {
    switch (tier) {
      case 'Tier 1': return 'badge-glass text-neon-indigo glow-indigo';
      case 'Tier 2': return 'badge-glass text-neon-aqua glow-aqua';
      case 'Tier 3': return 'badge-glass text-text-secondary-dark';
      default: return 'badge-glass text-text-secondary-dark';
    }
  };

  const isAllSelected = selectedReps.length === filteredAndSortedReps.length && filteredAndSortedReps.length > 0;
  const isIndeterminate = selectedReps.length > 0 && selectedReps.length < filteredAndSortedReps.length;

  return (
    <div className="h-full flex flex-col">
      {/* Header with glassmorphism */}
      <motion.div 
        className="p-4 border-b border-glass-border glass-morphism-elevated"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-heading text-text-primary-dark">Sales Representatives</h2>
          <motion.div 
            className="text-sm text-text-secondary-dark badge-glass px-3 py-1"
            key={selectedReps.length}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {selectedReps.length} of {filteredAndSortedReps.length} selected
          </motion.div>
        </div>

        {/* Search with glass effect */}
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-aqua" />
          <input
            type="text"
            placeholder="Search representatives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-glass w-full pl-10 pr-4 py-3"
          />
        </div>
      </motion.div>

      {/* Table with glassmorphism */}
      <div className="flex-1 overflow-auto">
        <div className="table-glass">
          <table className="w-full">
            <thead className="glass-morphism-elevated sticky top-0">
              <tr>
                <th className="w-12 px-4 py-4 text-left">
                  <motion.input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-glass-border focus:ring-neon-indigo bg-glass-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </th>
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'ytdRevenue', label: 'YTD Revenue' },
                  { key: 'annualQuota', label: 'Annual Quota' },
                  { key: 'salesTier', label: 'Sales Tier' },
                  { key: 'quotaAttainment', label: 'Attainment' }
                ].map((column) => (
                  <th 
                    key={column.key}
                    className="px-4 py-4 text-left text-xs font-medium text-text-secondary-dark uppercase tracking-wider cursor-pointer hover:glass-morphism-hover transition-all duration-300"
                    onClick={() => handleSort(column.key)}
                  >
                    <motion.div 
                      className="flex items-center space-x-2"
                      whileHover={{ x: 2 }}
                    >
                      <span>{column.label}</span>
                      <Icon 
                        name={sortConfig.key === column.key ? (sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                        size={14}
                        className="text-neon-indigo"
                      />
                    </motion.div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredAndSortedReps.map((rep, index) => {
                  const isSelected = selectedReps.some(r => r.id === rep.id);
                  return (
                    <motion.tr 
                      key={rep.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`
                        cursor-pointer transition-all duration-300 border-b border-glass-border/50
                        ${isSelected ? 'glass-morphism-elevated glow-indigo' : 'hover:glass-morphism-hover'}
                      `}
                      onClick={() => handleRowSelect(rep, !isSelected)}
                      whileHover={{ scale: 1.01, x: 5 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <td className="px-4 py-4">
                        <motion.input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 rounded border-glass-border focus:ring-neon-indigo bg-glass-white"
                          whileHover={{ scale: 1.1 }}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm font-medium text-text-primary-dark">{rep.name}</div>
                          <div className="text-xs text-text-secondary-dark">{rep.territory}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-text-primary-dark font-data font-medium">
                          {formatCurrency(rep.ytdRevenue)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-text-secondary-dark font-data">
                          {formatCurrency(rep.annualQuota)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <motion.span 
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getTierColor(rep.salesTier)}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {rep.salesTier}
                        </motion.span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <span className={`text-sm font-bold font-data ${getPerformanceColor(rep.quotaAttainment)}`}>
                            {rep.quotaAttainment.toFixed(1)}%
                          </span>
                          <div className="w-20 h-2 glass-morphism rounded-full overflow-hidden">
                            <motion.div 
                              className={`h-full transition-all duration-500 ${
                                rep.quotaAttainment >= 100 ? 'bg-gradient-to-r from-neon-teal to-emerald-400' : 
                                rep.quotaAttainment >= 80 ? 'bg-gradient-to-r from-yellow-400 to-orange-400': 'bg-gradient-to-r from-red-400 to-pink-400'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(rep.quotaAttainment, 100)}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>

          {/* Empty state with animation */}
          <AnimatePresence>
            {filteredAndSortedReps.length === 0 && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon name="Users" size={48} className="mx-auto text-text-muted-dark mb-4" />
                </motion.div>
                <h3 className="text-lg font-medium text-text-primary-dark mb-2">No representatives found</h3>
                <p className="text-text-secondary-dark">Try adjusting your search criteria</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer with glass effect */}
      <motion.div 
        className="p-4 border-t border-glass-border glass-morphism-elevated"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center justify-between text-sm text-text-secondary-dark">
          <span className="font-data">Total Representatives: {filteredAndSortedReps.length}</span>
          <span>Use Ctrl+Click for multi-select</span>
        </div>
      </motion.div>
    </div>
  );
};

export default SalesRepTable;