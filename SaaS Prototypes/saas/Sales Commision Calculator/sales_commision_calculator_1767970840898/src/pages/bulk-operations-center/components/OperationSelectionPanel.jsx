// src/pages/bulk-operations-center/components/OperationSelectionPanel.jsx
import React, { useEffect } from 'react';
import Icon from 'components/AppIcon';

const OperationSelectionPanel = ({ selectedOperation, onOperationSelect }) => {
  const operations = [
    {
      id: 'mass-scenario',
      name: 'Mass Scenario Application',
      description: 'Apply compensation scenarios to multiple representatives simultaneously',
      icon: 'GitBranch',
      color: 'primary',
      requiresApproval: true,
      estimatedTime: '15-30 minutes',
      supportedFormats: ['CSV', 'Excel'],
      keyboardShortcut: 'Ctrl+1'
    },
    {
      id: 'tier-reassignment',
      name: 'Tier Reassignments',
      description: 'Bulk update sales tier assignments based on performance criteria',
      icon: 'TrendingUp',
      color: 'success',
      requiresApproval: false,
      estimatedTime: '5-15 minutes',
      supportedFormats: ['CSV', 'Excel'],
      keyboardShortcut: 'Ctrl+2'
    },
    {
      id: 'quota-adjustment',
      name: 'Quota Adjustments',
      description: 'Update annual quotas for multiple representatives',
      icon: 'Target',
      color: 'warning',
      requiresApproval: true,
      estimatedTime: '10-20 minutes',
      supportedFormats: ['CSV', 'Excel'],
      keyboardShortcut: 'Ctrl+3'
    },
    {
      id: 'commission-recalc',
      name: 'Commission Recalculations',
      description: 'Recalculate commissions for specified periods and representatives',
      icon: 'Calculator',
      color: 'info',
      requiresApproval: true,
      estimatedTime: '20-45 minutes',
      supportedFormats: ['CSV', 'Excel'],
      keyboardShortcut: 'Ctrl+4'
    }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey) {
        const operationIndex = parseInt(event.key) - 1;
        if (operationIndex >= 0 && operationIndex < operations.length) {
          event.preventDefault();
          onOperationSelect(operations[operationIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onOperationSelect]);

  const getColorClasses = (color, isSelected) => {
    const baseClasses = 'border transition-all duration-300';
    
    if (isSelected) {
      switch (color) {
        case 'primary': return `${baseClasses} border-neon-indigo/50 glass-morphism-elevated glow-indigo`;
        case 'success': return `${baseClasses} border-neon-teal/50 glass-morphism-elevated glow-teal`;
        case 'warning': return `${baseClasses} border-amber-400/50 glass-morphism-elevated`;
        case 'info': return `${baseClasses} border-neon-aqua/50 glass-morphism-elevated glow-aqua`;
        default: return `${baseClasses} border-neon-indigo/50 glass-morphism-elevated glow-indigo`;
      }
    }
    
    return `${baseClasses} border-white/10 glass-morphism hover:glass-morphism-hover hover:border-white/20`;
  };

  const getIconColor = (color, isSelected) => {
    if (isSelected) {
      switch (color) {
        case 'primary': return 'text-neon-indigo';
        case 'success': return 'text-neon-teal';
        case 'warning': return 'text-amber-400';
        case 'info': return 'text-neon-aqua';
        default: return 'text-neon-indigo';
      }
    }
    return 'text-white/60';
  };

  const getIconBgColor = (color, isSelected) => {
    if (isSelected) {
      switch (color) {
        case 'primary': return 'bg-neon-indigo/20 border border-neon-indigo/30';
        case 'success': return 'bg-neon-teal/20 border border-neon-teal/30';
        case 'warning': return 'bg-amber-400/20 border border-amber-400/30';
        case 'info': return 'bg-neon-aqua/20 border border-neon-aqua/30';
        default: return 'bg-neon-indigo/20 border border-neon-indigo/30';
      }
    }
    return 'glass-morphism border border-white/10';
  };

  return (
    <div className="card-glass">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Select Operation</h2>
        <Icon name="Zap" size={20} className="text-amber-400" />
      </div>
      
      <p className="text-sm text-white/70 mb-6">
        Choose a bulk operation to execute. Each operation supports different file formats and processing requirements.
      </p>

      <div className="space-y-3">
        {operations.map((operation) => {
          const isSelected = selectedOperation?.id === operation.id;
          
          return (
            <button
              key={operation.id}
              onClick={() => onOperationSelect(operation)}
              className={`w-full p-4 rounded-xl text-left ${getColorClasses(operation.color, isSelected)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconBgColor(operation.color, isSelected)}`}>
                  <Icon 
                    name={operation.icon} 
                    size={20} 
                    className={isSelected ? getIconColor(operation.color, true) : 'text-white/60'} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-white">{operation.name}</h3>
                    <div className="flex items-center space-x-2">
                      {operation.requiresApproval && (
                        <span className="badge-warning">
                          <Icon name="Lock" size={12} className="mr-1" />
                          Approval Required
                        </span>
                      )}
                      <kbd className="px-2 py-1 text-xs glass-morphism-dark text-white/70 rounded border border-white/10">
                        {operation.keyboardShortcut}
                      </kbd>
                    </div>
                  </div>
                  
                  <p className="text-sm text-white/70 mb-2">
                    {operation.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{operation.estimatedTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="FileText" size={12} />
                        <span>{operation.supportedFormats.join(', ')}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedOperation && (
        <div className="mt-4 p-4 glass-morphism-dark rounded-xl border border-white/10">
          <h4 className="font-medium text-white mb-2">Operation Requirements</h4>
          <div className="text-sm text-white/70 space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Upload" size={14} />
              <span>Supported formats: {selectedOperation.supportedFormats.join(', ')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={14} />
              <span>Maximum records per operation: 10,000</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} />
              <span>Data validation and duplicate detection included</span>
            </div>
            {selectedOperation.requiresApproval && (
              <div className="flex items-center space-x-2 text-amber-400">
                <Icon name="AlertTriangle" size={14} />
                <span>Manager approval required for operations affecting &gt;50 reps or exceeding budget thresholds</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationSelectionPanel;