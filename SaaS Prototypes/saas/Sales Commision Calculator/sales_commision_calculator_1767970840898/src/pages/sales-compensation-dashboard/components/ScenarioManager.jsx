import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const ScenarioManager = ({ savedScenarios, onLoadScenario, onClearScenarios }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  // Get scenario summary text
  const getScenarioSummary = (scenario) => {
    const { bonusParams } = scenario;
    return `SPIF: ${bonusParams.spifPercentage.toFixed(1)}% | Accel: ${bonusParams.acceleratorRate.toFixed(1)}x | Mult: ${bonusParams.bonusMultiplier.toFixed(1)}x`;
  };

  if (savedScenarios.length === 0) {
    return (
      <motion.div 
        className="card-glass"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center py-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon name="FolderOpen" size={48} className="mx-auto text-text-muted-dark mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium text-text-primary-dark mb-2">No Saved Scenarios</h3>
          <p className="text-text-secondary-dark">
            Configure bonus parameters and click "Save Draft" to create scenarios for comparison.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="card-glass glow-indigo"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-glass-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary-dark">Saved Scenarios</h3>
            <p className="text-sm text-text-secondary-dark mt-1">
              Last 5 saved compensation scenarios for comparison
            </p>
          </div>
          
          {savedScenarios.length > 0 && (
            <motion.button
              onClick={onClearScenarios}
              className="px-3 py-2 text-sm text-red-400 border border-red-400/30 rounded-xl hover:glass-morphism-hover transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="Trash2" size={16} />
              <span>Clear All</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {savedScenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-morphism border border-glass-border rounded-xl p-4 hover:glass-morphism-hover hover:glow-indigo transition-all duration-300 cursor-pointer group"
                onClick={() => onLoadScenario(scenario)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Scenario Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <motion.div 
                      className="w-8 h-8 bg-gradient-purple-blue rounded-full flex items-center justify-center glow-purple"
                      whileHover={{ rotate: 10 }}
                    >
                      <span className="text-sm font-medium text-white">#{index + 1}</span>
                    </motion.div>
                    <div>
                      <div className="text-sm font-medium text-text-primary-dark">
                        Scenario {index + 1}
                      </div>
                      <div className="text-xs text-text-secondary-dark">
                        {formatDate(scenario.timestamp)}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ rotate: -180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon 
                      name="RotateCcw" 
                      size={16} 
                      className="text-text-muted-dark group-hover:text-neon-indigo transition-all duration-300" 
                    />
                  </motion.div>
                </div>

                {/* Total Payout */}
                <div className="mb-3">
                  <motion.div 
                    className="text-2xl font-bold text-neon-indigo"
                    key={scenario.totalPayout}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formatCurrency(scenario.totalPayout)}
                  </motion.div>
                  <div className="text-xs text-text-secondary-dark">
                    Total Projected Payout
                  </div>
                </div>

                {/* Parameters Summary */}
                <div className="mb-3">
                  <div className="text-xs text-text-secondary-dark mb-1">Parameters:</div>
                  <div className="text-xs font-data text-text-primary-dark glass-morphism-elevated p-2 rounded-lg border border-glass-border">
                    {getScenarioSummary(scenario)}
                  </div>
                </div>

                {/* Representatives Count */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} className="text-neon-aqua" />
                    <span className="text-text-secondary-dark">
                      {scenario.repCount} representative{scenario.repCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="text-neon-indigo font-medium group-hover:underline">
                    Load Scenario
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <motion.div 
                  className="mt-3 pt-3 border-t border-glass-border opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                >
                  <div className="flex items-center space-x-2 text-xs text-neon-indigo">
                    <Icon name="MousePointer" size={12} />
                    <span>Click to restore this scenario</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Usage Instructions */}
        <motion.div 
          className="mt-6 p-4 glass-morphism-elevated rounded-xl border border-glass-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-neon-indigo mt-0.5" />
            <div className="text-sm text-text-secondary-dark">
              <strong className="text-text-primary-dark">How to use scenarios:</strong>
              <ul className="mt-1 space-y-1 list-disc list-inside text-text-secondary-dark">
                <li>Click any scenario card to restore its parameters and representative selection</li>
                <li>Compare different bonus structures by switching between saved scenarios</li>
                <li>Use scenarios for budget planning and stakeholder presentations</li>
                <li>Export current scenario to PDF for documentation and approval workflows</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Scenario Comparison Hint */}
        {savedScenarios.length >= 2 && (
          <motion.div 
            className="mt-4 p-3 glass-morphism border border-neon-indigo/30 rounded-xl glow-indigo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <Icon name="BarChart3" size={16} className="text-neon-indigo" />
              <span className="text-sm text-neon-indigo font-medium">
                You have {savedScenarios.length} scenarios saved - perfect for comparison analysis!
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ScenarioManager;