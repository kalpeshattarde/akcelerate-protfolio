import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const BonusSimulator = ({ bonusParams, onParamsChange, totalPayout, selectedRepsCount, onSaveScenario }) => {
  const [isSaving, setIsSaving] = useState(false);

  // Handle parameter changes with smooth animation
  const handleParamChange = (param, value) => {
    onParamsChange({
      ...bonusParams,
      [param]: parseFloat(value)
    });
  };

  // Handle save scenario with animation feedback
  const handleSaveScenario = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Mock save delay
    onSaveScenario();
    setIsSaving(false);
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

  return (
    <motion.div 
      className="card-glass glow-indigo"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-10 h-10 bg-gradient-purple-blue rounded-xl flex items-center justify-center glow-purple"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon name="Sliders" size={20} className="text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold font-heading text-text-primary-dark">Bonus Simulator</h3>
            <p className="text-sm text-text-secondary-dark">Adjust parameters to simulate scenarios</p>
          </div>
        </div>
        
        {/* Live Total Display */}
        <motion.div 
          className="glass-morphism-elevated px-4 py-2 rounded-xl glow-teal"
          key={totalPayout}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-right">
            <p className="text-xs text-text-secondary-dark uppercase tracking-wider">Total Payout</p>
            <p className="text-xl font-bold font-data text-neon-teal">
              {formatCurrency(totalPayout)}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* SPIF Percentage */}
        <motion.div 
          className="glass-morphism-elevated rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-text-primary-dark">SPIF Percentage</label>
            <motion.span 
              className="text-sm font-data text-neon-aqua"
              key={bonusParams.spifPercentage}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {bonusParams.spifPercentage}%
            </motion.span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={bonusParams.spifPercentage}
            onChange={(e) => handleParamChange('spifPercentage', e.target.value)}
            className="slider-glass w-full"
          />
          <div className="flex justify-between text-xs text-text-muted-dark mt-2">
            <span>0%</span>
            <span>10%</span>
          </div>
        </motion.div>

        {/* Accelerator Rate */}
        <motion.div 
          className="glass-morphism-elevated rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-text-primary-dark">Accelerator Rate</label>
            <motion.span 
              className="text-sm font-data text-neon-indigo"
              key={bonusParams.acceleratorRate}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {bonusParams.acceleratorRate}x
            </motion.span>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={bonusParams.acceleratorRate}
            onChange={(e) => handleParamChange('acceleratorRate', e.target.value)}
            className="slider-glass w-full"
          />
          <div className="flex justify-between text-xs text-text-muted-dark mt-2">
            <span>1x</span>
            <span>3x</span>
          </div>
        </motion.div>

        {/* Bonus Multiplier */}
        <motion.div 
          className="glass-morphism-elevated rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-text-primary-dark">Bonus Multiplier</label>
            <motion.span 
              className="text-sm font-data text-neon-purple"
              key={bonusParams.bonusMultiplier}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {bonusParams.bonusMultiplier}x
            </motion.span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            value={bonusParams.bonusMultiplier}
            onChange={(e) => handleParamChange('bonusMultiplier', e.target.value)}
            className="slider-glass w-full"
          />
          <div className="flex justify-between text-xs text-text-muted-dark mt-2">
            <span>0.5x</span>
            <span>2.5x</span>
          </div>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          className="glass-morphism rounded-xl p-4 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <motion.p 
            className="text-2xl font-bold font-data text-neon-teal"
            key={selectedRepsCount}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {selectedRepsCount}
          </motion.p>
          <p className="text-sm text-text-secondary-dark">Selected Reps</p>
        </motion.div>
        
        <motion.div 
          className="glass-morphism rounded-xl p-4 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <motion.p 
            className="text-2xl font-bold font-data text-neon-aqua"
            key={totalPayout}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {selectedRepsCount > 0 ? formatCurrency(totalPayout / selectedRepsCount) : '$0'}
          </motion.p>
          <p className="text-sm text-text-secondary-dark">Avg per Rep</p>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-text-secondary-dark">
          <Icon name="Info" size={16} className="text-neon-aqua" />
          <span>Adjustments update calculations in real-time</span>
        </div>
        
        <motion.button
          onClick={handleSaveScenario}
          disabled={selectedRepsCount === 0 || isSaving}
          className={`
            btn-glass-primary flex items-center space-x-2
            ${selectedRepsCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          whileHover={selectedRepsCount > 0 ? { scale: 1.05 } : {}}
          whileTap={selectedRepsCount > 0 ? { scale: 0.95 } : {}}
        >
          <motion.div
            animate={isSaving ? { rotate: 360 } : {}}
            transition={{ duration: 0.5, repeat: isSaving ? Infinity : 0 }}
          >
            <Icon name={isSaving ? "Loader2" : "Save"} size={16} />
          </motion.div>
          <span>{isSaving ? 'Saving...' : 'Save Scenario'}</span>
        </motion.button>
      </div>

      {/* Interactive Visual Feedback */}
      {selectedRepsCount === 0 && (
        <motion.div 
          className="mt-4 p-4 glass-morphism rounded-xl border border-yellow-400/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-yellow-400" />
            <p className="text-sm text-yellow-400">Select representatives to see bonus calculations</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BonusSimulator;