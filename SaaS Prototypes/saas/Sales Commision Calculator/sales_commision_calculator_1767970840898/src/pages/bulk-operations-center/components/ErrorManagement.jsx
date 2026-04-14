// src/pages/bulk-operations-center/components/ErrorManagement.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ErrorManagement = ({ validationErrors, onFixErrors, onReprocess }) => {
  const [selectedErrors, setSelectedErrors] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [filterType, setFilterType] = useState('all'); // all, critical, warning, info

  const errorTypes = {
    critical: { color: 'error', icon: 'XCircle', label: 'Critical' },
    warning: { color: 'warning', icon: 'AlertTriangle', label: 'Warning' },
    info: { color: 'info', icon: 'Info', label: 'Info' }
  };

  // Enhance errors with severity and suggestions
  const enhancedErrors = validationErrors?.map((error, index) => ({
    ...error,
    id: index,
    severity: getSeverity(error.error),
    canAutoFix: getCanAutoFix(error.error),
    category: getErrorCategory(error.field)
  })) || [];

  function getSeverity(errorMessage) {
    if (errorMessage?.includes('Invalid') || errorMessage?.includes('required')) {
      return 'critical';
    } else if (errorMessage?.includes('exceeds') || errorMessage?.includes('format')) {
      return 'warning';
    }
    return 'info';
  }

  function getCanAutoFix(errorMessage) {
    return errorMessage?.includes('format') || errorMessage?.includes('case');
  }

  function getErrorCategory(field) {
    if (field?.includes('id')) return 'Identity';
    if (field?.includes('amount') || field?.includes('quota')) return 'Financial';
    if (field?.includes('date')) return 'Temporal';
    return 'General';
  }

  const filteredErrors = enhancedErrors.filter(error => {
    if (filterType === 'all') return true;
    return error.severity === filterType;
  });

  const errorCounts = {
    critical: enhancedErrors.filter(e => e.severity === 'critical').length,
    warning: enhancedErrors.filter(e => e.severity === 'warning').length,
    info: enhancedErrors.filter(e => e.severity === 'info').length
  };

  const handleSelectError = (errorId) => {
    setSelectedErrors(prev => 
      prev.includes(errorId) 
        ? prev.filter(id => id !== errorId)
        : [...prev, errorId]
    );
  };

  const handleSelectAll = () => {
    if (selectedErrors.length === filteredErrors.length) {
      setSelectedErrors([]);
    } else {
      setSelectedErrors(filteredErrors.map(error => error.id));
    }
  };

  const handleAutoFix = () => {
    const autoFixableErrors = selectedErrors.filter(id => {
      const error = enhancedErrors.find(e => e.id === id);
      return error?.canAutoFix;
    });
    
    if (autoFixableErrors.length > 0) {
      // Remove auto-fixable errors
      const remainingErrors = validationErrors.filter((_, index) => 
        !autoFixableErrors.includes(index)
      );
      onFixErrors(remainingErrors);
      setSelectedErrors([]);
    }
  };

  const toggleDetails = (errorId) => {
    setShowDetails(prev => ({
      ...prev,
      [errorId]: !prev[errorId]
    }));
  };

  const exportErrors = () => {
    const csvContent = [
      ['Row', 'Field', 'Error', 'Severity', 'Suggestion'],
      ...enhancedErrors.map(error => [
        error.row,
        error.field,
        error.error,
        error.severity,
        error.suggestion
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'validation_errors.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-morphism border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-white">Error Management</h3>
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 glass-morphism-elevated rounded-full flex items-center justify-center border border-error/30">
              <span className="text-xs font-medium text-error">{enhancedErrors.length}</span>
            </div>
            <span className="text-sm text-white/70">validation errors</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={exportErrors}
            className="flex items-center space-x-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-sm transition-smooth"
          >
            <Icon name="Download" size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Error Summary */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {Object.entries(errorCounts).map(([type, count]) => {
          const typeInfo = errorTypes[type];
          return (
            <button
              key={type}
              onClick={() => setFilterType(filterType === type ? 'all' : type)}
              className={`p-3 rounded-lg text-left transition-smooth ${
                filterType === type 
                  ? `glass-morphism-elevated border border-${typeInfo.color}/30` 
                  : 'glass-morphism-dark hover:glass-morphism-elevated border border-white/10'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Icon 
                  name={typeInfo.icon} 
                  size={16} 
                  className={`text-${typeInfo.color}`} 
                />
                <span className="text-sm font-medium text-white/70">{typeInfo.label}</span>
              </div>
              <p className="text-xl font-semibold text-white">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Bulk Actions */}
      {selectedErrors.length > 0 && (
        <div className="glass-morphism-elevated border border-neon-indigo/30 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="CheckSquare" size={16} className="text-neon-indigo" />
              <span className="font-medium text-neon-indigo">
                {selectedErrors.length} error{selectedErrors.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAutoFix}
                disabled={!selectedErrors.some(id => {
                  const error = enhancedErrors.find(e => e.id === id);
                  return error?.canAutoFix;
                })}
                className="flex items-center space-x-2 px-3 py-2 bg-success text-white rounded-sm hover:bg-green-600 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Wand2" size={16} />
                <span>Auto Fix</span>
              </button>
              
              <button
                onClick={() => setSelectedErrors([])}
                className="flex items-center space-x-2 px-3 py-2 text-white/70 hover:text-white transition-smooth"
              >
                <Icon name="X" size={16} />
                <span>Clear Selection</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error List */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleSelectAll}
            className="flex items-center space-x-2 text-sm text-neon-indigo hover:text-neon-aqua transition-smooth"
          >
            <Icon 
              name={selectedErrors.length === filteredErrors.length ? 'CheckSquare' : 'Square'} 
              size={16} 
            />
            <span>
              {selectedErrors.length === filteredErrors.length ? 'Deselect All' : 'Select All'}
            </span>
          </button>
          
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <span>Showing {filteredErrors.length} of {enhancedErrors.length} errors</span>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto space-y-2">
          {filteredErrors.map((error) => {
            const typeInfo = errorTypes[error.severity];
            const isSelected = selectedErrors.includes(error.id);
            const isExpanded = showDetails[error.id];
            
            return (
              <div 
                key={error.id} 
                className={`border rounded-lg transition-all duration-200 ${
                  isSelected ? 'border-neon-indigo/50 glass-morphism-elevated' : 'border-white/20 glass-morphism-dark'
                }`}
              >
                <div className="p-3">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => handleSelectError(error.id)}
                      className="mt-1"
                    >
                      <Icon 
                        name={isSelected ? 'CheckSquare' : 'Square'} 
                        size={16} 
                        className={isSelected ? 'text-neon-indigo' : 'text-white/40'} 
                      />
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2 mb-1">
                          <Icon 
                            name={typeInfo.icon} 
                            size={16} 
                            className={`text-${typeInfo.color}`} 
                          />
                          <span className={`text-xs font-medium px-2 py-1 rounded glass-morphism-elevated text-${typeInfo.color}`}>
                            {typeInfo.label}
                          </span>
                          <span className="text-xs glass-morphism-elevated text-white/70 px-2 py-1 rounded">
                            {error.category}
                          </span>
                          {error.canAutoFix && (
                            <span className="text-xs glass-morphism-elevated text-success px-2 py-1 rounded">
                              Auto-fixable
                            </span>
                          )}
                        </div>
                        
                        <button
                          onClick={() => toggleDetails(error.id)}
                          className="text-white/40 hover:text-white transition-smooth"
                        >
                          <Icon 
                            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                            size={16} 
                          />
                        </button>
                      </div>
                      
                      <div className="mb-2">
                        <p className="font-medium text-white mb-1">
                          Row {error.row}: {error.field}
                        </p>
                        <p className="text-sm text-white/70">{error.error}</p>
                      </div>
                      
                      {error.suggestion && (
                        <div className="flex items-start space-x-2 p-2 glass-morphism-elevated rounded-lg">
                          <Icon name="Lightbulb" size={14} className="text-info mt-0.5" />
                          <p className="text-sm text-white/70">
                            <span className="font-medium">Suggestion:</span> {error.suggestion}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-white/60">Field:</span>
                          <p className="text-white">{error.field}</p>
                        </div>
                        <div>
                          <span className="font-medium text-white/60">Row Number:</span>
                          <p className="text-white">{error.row}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center space-x-2">
                        <button className="flex items-center space-x-2 px-3 py-1 text-xs glass-morphism-elevated border border-white/20 rounded hover:bg-white/10 transition-smooth">
                          <Icon name="Eye" size={12} />
                          <span>View Row Data</span>
                        </button>
                        
                        {error.canAutoFix && (
                          <button className="flex items-center space-x-2 px-3 py-1 text-xs bg-success text-white rounded hover:bg-green-600 transition-smooth">
                            <Icon name="Wand2" size={12} />
                            <span>Auto Fix</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-2 text-sm text-white/70">
          <Icon name="Info" size={14} />
          <span>Fix errors before proceeding with the operation</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onReprocess}
            className="flex items-center space-x-2 px-4 py-2 glass-morphism-elevated border border-white/20 text-white rounded-sm hover:bg-white/10 transition-smooth"
          >
            <Icon name="RefreshCw" size={16} />
            <span>Revalidate</span>
          </button>
          
          <button className="btn-glass-primary">
            <Icon name="ArrowRight" size={16} />
            <span>Continue with Valid Records</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorManagement;