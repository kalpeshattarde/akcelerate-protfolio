import React from 'react';
import Icon from 'components/AppIcon';

const ScenarioGrid = ({ 
  scenarios, 
  selectedScenarios, 
  onScenarioSelect, 
  onSort, 
  sortConfig 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'badge-success';
      case 'pending': return 'badge-warning';
      case 'draft': return 'badge-dark';
      case 'archived': return 'badge-dark';
      default: return 'badge-dark';
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleRowClick = (e, scenarioId) => {
    if (e.target.type === 'checkbox') return;
    
    if (e.ctrlKey || e.metaKey) {
      // Multi-select with Ctrl/Cmd
      const isSelected = selectedScenarios.includes(scenarioId);
      onScenarioSelect(scenarioId, !isSelected);
    } else {
      // Single select
      const isSelected = selectedScenarios.includes(scenarioId);
      onScenarioSelect(scenarioId, !isSelected);
    }
  };

  return (
    <div className="glass-morphism-dark rounded-xl border border-white/10 overflow-hidden">
      {/* Table Header */}
      <div className="glass-morphism-elevated border-b border-white/10">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-white/90">
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              checked={selectedScenarios.length === scenarios.length && scenarios.length > 0}
              onChange={() => {
                if (selectedScenarios.length === scenarios.length) {
                  scenarios.forEach(s => onScenarioSelect(s.id, false));
                } else {
                  scenarios.forEach(s => {
                    if (!selectedScenarios.includes(s.id)) {
                      onScenarioSelect(s.id, true);
                    }
                  });
                }
              }}
              className="rounded border-white/20 bg-white/10 text-neon-indigo focus:ring-neon-indigo focus:ring-offset-0"
            />
          </div>
          
          <div className="col-span-3">
            <button
              onClick={() => onSort('name')}
              className="flex items-center space-x-1 hover:text-white transition-smooth"
            >
              <span>Scenario Name</span>
              <Icon name={getSortIcon('name')} size={14} />
            </button>
          </div>
          
          <div className="col-span-2">
            <button
              onClick={() => onSort('creator')}
              className="flex items-center space-x-1 hover:text-white transition-smooth"
            >
              <span>Creator</span>
              <Icon name={getSortIcon('creator')} size={14} />
            </button>
          </div>
          
          <div className="col-span-2">
            <button
              onClick={() => onSort('modifiedAt')}
              className="flex items-center space-x-1 hover:text-white transition-smooth"
            >
              <span>Modified</span>
              <Icon name={getSortIcon('modifiedAt')} size={14} />
            </button>
          </div>
          
          <div className="col-span-1 text-center">
            <button
              onClick={() => onSort('affectedRepCount')}
              className="flex items-center space-x-1 hover:text-white transition-smooth"
            >
              <span>Reps</span>
              <Icon name={getSortIcon('affectedRepCount')} size={14} />
            </button>
          </div>
          
          <div className="col-span-2">
            <button
              onClick={() => onSort('totalProjectedPayout')}
              className="flex items-center space-x-1 hover:text-white transition-smooth"
            >
              <span>Total Payout</span>
              <Icon name={getSortIcon('totalProjectedPayout')} size={14} />
            </button>
          </div>
          
          <div className="col-span-1">
            <button
              onClick={() => onSort('status')}
              className="flex items-center space-x-1 hover:text-white transition-smooth"
            >
              <span>Status</span>
              <Icon name={getSortIcon('status')} size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-white/10 max-h-96 overflow-y-auto">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            onClick={(e) => handleRowClick(e, scenario.id)}
            className={`grid grid-cols-12 gap-4 p-4 hover:bg-white/10 cursor-pointer transition-smooth ${
              selectedScenarios.includes(scenario.id) ? 'bg-white/10 border-l-4 border-neon-indigo glow-indigo' : ''
            }`}
          >
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={selectedScenarios.includes(scenario.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  onScenarioSelect(scenario.id, e.target.checked);
                }}
                className="rounded border-white/20 bg-white/10 text-neon-indigo focus:ring-neon-indigo focus:ring-offset-0"
              />
            </div>
            
            <div className="col-span-3">
              <div className="flex flex-col">
                <span className="font-medium text-white">{scenario.name}</span>
                <span className="text-xs text-white/60">{scenario.id}</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {scenario.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs glass-morphism text-white/70 rounded-sm border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                  {scenario.tags.length > 2 && (
                    <span className="px-2 py-1 text-xs glass-morphism text-white/70 rounded-sm border border-white/10">
                      +{scenario.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="col-span-2">
              <div className="flex flex-col">
                <span className="font-medium text-white">{scenario.creator}</span>
                <span className="text-xs text-white/60">{scenario.creatorRole}</span>
              </div>
            </div>
            
            <div className="col-span-2">
              <div className="flex flex-col">
                <span className="text-sm text-white">{formatDate(scenario.modifiedAt)}</span>
                <span className="text-xs text-white/60">
                  Created {formatDate(scenario.createdAt)}
                </span>
              </div>
            </div>
            
            <div className="col-span-1 text-center">
              <span className="inline-flex items-center justify-center w-8 h-8 glass-morphism text-neon-indigo border border-white/20 rounded-full text-sm font-medium">
                {scenario.affectedRepCount}
              </span>
            </div>
            
            <div className="col-span-2">
              <div className="flex flex-col">
                <span className="font-medium text-white">
                  {formatCurrency(scenario.totalProjectedPayout)}
                </span>
                <div className="flex items-center space-x-2 text-xs text-white/60">
                  <span>SPIF: {scenario.modifiers.spifPercentage}%</span>
                  <span>Acc: {scenario.modifiers.acceleratorRate}x</span>
                  <span>Mult: {scenario.modifiers.bonusMultiplier}x</span>
                </div>
              </div>
            </div>
            
            <div className="col-span-1">
              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-sm ${getStatusColor(scenario.status)}`}>
                {scenario.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {scenarios.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="GitBranch" size={48} className="mx-auto text-white/30 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No scenarios found</h3>
          <p className="text-white/70">
            Try adjusting your search criteria or create a new scenario.
          </p>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="glass-morphism-elevated border-t border-white/10 p-3">
        <div className="flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center space-x-4">
            <span><kbd className="px-1 py-0.5 glass-morphism border border-white/20 rounded text-xs">Ctrl+Click</kbd> Multi-select</span>
            <span><kbd className="px-1 py-0.5 glass-morphism border border-white/20 rounded text-xs">Space</kbd> Preview</span>
            <span><kbd className="px-1 py-0.5 glass-morphism border border-white/20 rounded text-xs">Delete</kbd> Remove selected</span>
          </div>
          <span>{scenarios.length} scenarios total</span>
        </div>
      </div>
    </div>
  );
};

export default ScenarioGrid;