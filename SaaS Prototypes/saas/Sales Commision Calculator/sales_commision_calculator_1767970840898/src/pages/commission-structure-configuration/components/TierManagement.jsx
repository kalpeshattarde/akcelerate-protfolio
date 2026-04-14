// src/pages/commission-structure-configuration/components/TierManagement.jsx
import React, { useState, useRef, useCallback } from 'react';
import Icon from 'components/AppIcon';

const TierManagement = ({ data, onChange, canEdit, isPreviewMode }) => {
  const [tiers, setTiers] = useState(data?.tiers || []);
  const [selectedTiers, setSelectedTiers] = useState([]);
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [expandedTier, setExpandedTier] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const dragCounterRef = useRef(0);

  // Handle tier reordering via drag and drop
  const handleDragStart = (e, tier) => {
    if (!canEdit || isPreviewMode) return;
    setDraggedItem(tier);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetTier) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetTier.id) return;

    const newTiers = [...tiers];
    const draggedIndex = newTiers.findIndex(t => t.id === draggedItem.id);
    const targetIndex = newTiers.findIndex(t => t.id === targetTier.id);

    // Remove dragged item and insert at new position
    const [removed] = newTiers.splice(draggedIndex, 1);
    newTiers.splice(targetIndex, 0, removed);

    // Update order property
    newTiers.forEach((tier, index) => {
      tier.order = index + 1;
    });

    setTiers(newTiers);
    onChange?.('tiers', newTiers);
    setDraggedItem(null);
  };

  // Validate tier configuration
  const validateTier = (tier) => {
    const errors = {};

    if (!tier.name?.trim()) {
      errors.name = 'Name is required';
    }

    if (tier.quotaThreshold <= 0) {
      errors.quotaThreshold = 'Quota threshold must be positive';
    }

    if (tier.baseCommissionRate < 0 || tier.baseCommissionRate > 1) {
      errors.baseCommissionRate = 'Commission rate must be between 0 and 100%';
    }

    if (tier.acceleratorTrigger < 0 || tier.acceleratorTrigger > 1) {
      errors.acceleratorTrigger = 'Accelerator trigger must be between 0 and 100%';
    }

    // Check for overlapping quota ranges
    const otherTiers = tiers.filter(t => t.id !== tier.id);
    const hasOverlap = otherTiers.some(t => 
      Math.abs(t.quotaThreshold - tier.quotaThreshold) < 1000
    );

    if (hasOverlap) {
      errors.quotaThreshold = 'Quota thresholds cannot overlap';
    }

    return errors;
  };

  // Handle tier update
  const updateTier = (tierId, updates) => {
    const newTiers = tiers.map(tier => {
      if (tier.id === tierId) {
        const updatedTier = { ...tier, ...updates };
        const errors = validateTier(updatedTier);
        setValidationErrors(prev => ({ ...prev, [tierId]: errors }));
        return updatedTier;
      }
      return tier;
    });

    setTiers(newTiers);
    onChange?.('tiers', newTiers);
  };

  // Handle bulk edit
  const applyBulkChanges = (changes) => {
    const updatedTiers = tiers.map(tier => {
      if (selectedTiers.includes(tier.id)) {
        return { ...tier, ...changes };
      }
      return tier;
    });

    setTiers(updatedTiers);
    onChange?.('tiers', updatedTiers);
    setBulkEditMode(false);
    setSelectedTiers([]);
  };

  // Add new tier
  const addNewTier = () => {
    const newTier = {
      id: `tier-${Date.now()}`,
      name: 'New Tier',
      quotaThreshold: 0,
      baseCommissionRate: 0.05,
      acceleratorTrigger: 0.8,
      spifEligible: false,
      order: tiers.length + 1
    };

    const newTiers = [...tiers, newTier];
    setTiers(newTiers);
    onChange?.('tiers', newTiers);
    setExpandedTier(newTier.id);
    setShowAddForm(false);
  };

  // Delete tier
  const deleteTier = (tierId) => {
    const newTiers = tiers.filter(t => t.id !== tierId).map((tier, index) => ({
      ...tier,
      order: index + 1
    }));
    
    setTiers(newTiers);
    onChange?.('tiers', newTiers);
    setSelectedTiers(prev => prev.filter(id => id !== tierId));
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Tier Management</h2>
          <p className="text-sm text-text-secondary mt-1">
            Configure hierarchical tier structures with drag-drop reordering capabilities.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Bulk Edit Toggle */}
          {canEdit && !isPreviewMode && selectedTiers.length > 0 && (
            <button
              onClick={() => setBulkEditMode(!bulkEditMode)}
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
            >
              <Icon name="Edit3" size={16} />
              <span>Bulk Edit ({selectedTiers.length})</span>
            </button>
          )}

          {/* Add Tier */}
          {canEdit && !isPreviewMode && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-success text-white rounded-sm hover:bg-success-700 transition-smooth"
            >
              <Icon name="Plus" size={16} />
              <span>Add Tier</span>
            </button>
          )}
        </div>
      </div>

      {/* Bulk Edit Panel */}
      {bulkEditMode && (
        <div className="card-glass border border-neon-indigo/30">
          <h3 className="font-medium text-neon-indigo mb-3">Bulk Edit Selected Tiers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Commission Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                className="input-glass-dark w-full"
                onChange={(e) => {
                  const rate = parseFloat(e.target.value) / 100;
                  applyBulkChanges({ baseCommissionRate: rate });
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Accelerator Trigger (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                className="input-glass-dark w-full"
                onChange={(e) => {
                  const trigger = parseFloat(e.target.value) / 100;
                  applyBulkChanges({ acceleratorTrigger: trigger });
                }}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setBulkEditMode(false)}
                className="w-full btn-glass-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tier Tree View */}
      <div className="card-glass">
        <div className="p-4 border-b border-glass-border">
          <h3 className="font-medium text-white">Hierarchical Tier Structure</h3>
          <p className="text-sm text-white/70 mt-1">
            Drag and drop to reorder tiers. Click to expand configuration panels.
          </p>
        </div>

        <div className="divide-y divide-glass-border">
          {tiers
            .sort((a, b) => a.order - b.order)
            .map((tier, index) => (
            <div
              key={tier.id}
              className={`relative transition-all duration-200 ${
                expandedTier === tier.id ? 'glass-morphism-elevated' : 'glass-morphism hover:glass-morphism-hover'
              }`}
              draggable={canEdit && !isPreviewMode}
              onDragStart={(e) => handleDragStart(e, tier)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, tier)}
            >
              {/* Tier Header */}
              <div className="flex items-center p-4 cursor-pointer" onClick={() => {
                setExpandedTier(expandedTier === tier.id ? null : tier.id);
              }}>
                {/* Selection Checkbox */}
                {canEdit && !isPreviewMode && (
                  <input
                    type="checkbox"
                    checked={selectedTiers.includes(tier.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      setSelectedTiers(prev => 
                        e.target.checked 
                          ? [...prev, tier.id]
                          : prev.filter(id => id !== tier.id)
                      );
                    }}
                    className="mr-3 accent-neon-indigo"
                  />
                )}

                {/* Drag Handle */}
                {canEdit && !isPreviewMode && (
                  <Icon name="GripVertical" size={16} className="text-white/40 mr-3 cursor-grab" />
                )}

                {/* Tier Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-white">{tier.name}</h4>
                    <span className="badge-dark">
                      Order: {tier.order}
                    </span>
                    {tier.spifEligible && (
                      <span className="badge-success">
                        SOX Eligible
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-6 mt-2 text-sm text-white/70">
                    <span>Quota: ${tier.quotaThreshold?.toLocaleString()}</span>
                    <span>Base Rate: {(tier.baseCommissionRate * 100).toFixed(1)}%</span>
                    <span>Accelerator: {(tier.acceleratorTrigger * 100).toFixed(1)}%</span>
                  </div>
                </div>

                {/* Expand Icon */}
                <Icon 
                  name={expandedTier === tier.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-white/40" 
                />

                {/* Delete Button */}
                {canEdit && !isPreviewMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTier(tier.id);
                    }}
                    className="ml-3 p-1 text-red-400 hover:bg-red-400/20 rounded transition-smooth"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
              </div>

              {/* Tier Configuration Panel */}
              {expandedTier === tier.id && (
                <div className="p-4 border-t border-glass-border glass-morphism-dark">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Tier Name
                      </label>
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => updateTier(tier.id, { name: e.target.value })}
                        disabled={!canEdit || isPreviewMode}
                        className={`input-glass-dark w-full ${
                          validationErrors[tier.id]?.name ? 'border-red-400/50' : ''
                        }`}
                      />
                      {validationErrors[tier.id]?.name && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors[tier.id].name}</p>
                      )}
                    </div>

                    {/* Quota Threshold */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Quota Threshold ($)
                      </label>
                      <input
                        type="number"
                        value={tier.quotaThreshold}
                        onChange={(e) => updateTier(tier.id, { quotaThreshold: parseFloat(e.target.value) || 0 })}
                        disabled={!canEdit || isPreviewMode}
                        className={`input-glass-dark w-full ${
                          validationErrors[tier.id]?.quotaThreshold ? 'border-red-400/50' : ''
                        }`}
                      />
                      {validationErrors[tier.id]?.quotaThreshold && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors[tier.id].quotaThreshold}</p>
                      )}
                    </div>

                    {/* Base Commission Rate */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Base Commission Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={(tier.baseCommissionRate * 100).toFixed(2)}
                        onChange={(e) => updateTier(tier.id, { baseCommissionRate: parseFloat(e.target.value) / 100 || 0 })}
                        disabled={!canEdit || isPreviewMode}
                        className={`input-glass-dark w-full ${
                          validationErrors[tier.id]?.baseCommissionRate ? 'border-red-400/50' : ''
                        }`}
                      />
                      {validationErrors[tier.id]?.baseCommissionRate && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors[tier.id].baseCommissionRate}</p>
                      )}
                    </div>

                    {/* Accelerator Trigger */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Accelerator Trigger (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={(tier.acceleratorTrigger * 100).toFixed(2)}
                        onChange={(e) => updateTier(tier.id, { acceleratorTrigger: parseFloat(e.target.value) / 100 || 0 })}
                        disabled={!canEdit || isPreviewMode}
                        className={`input-glass-dark w-full ${
                          validationErrors[tier.id]?.acceleratorTrigger ? 'border-red-400/50' : ''
                        }`}
                      />
                      {validationErrors[tier.id]?.acceleratorTrigger && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors[tier.id].acceleratorTrigger}</p>
                      )}
                    </div>

                    {/* SPIF Eligibility */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`spif-${tier.id}`}
                        checked={tier.spifEligible}
                        onChange={(e) => updateTier(tier.id, { spifEligible: e.target.checked })}
                        disabled={!canEdit || isPreviewMode}
                        className="rounded accent-neon-indigo"
                      />
                      <label htmlFor={`spif-${tier.id}`} className="text-sm font-medium text-white">
                        SOX Eligible
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Tier Form */}
        {showAddForm && (
          <div className="p-4 border-t border-glass-border glass-morphism-elevated">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-neon-indigo">Add New Tier</h4>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-white/40 hover:text-white/70"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={addNewTier}
                className="btn-glass-primary"
              >
                Create Tier
              </button>
              <span className="text-sm text-white/70">
                A new tier will be added with default values that you can customize.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TierManagement;