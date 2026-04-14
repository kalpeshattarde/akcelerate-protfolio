// src/pages/commission-structure-configuration/components/RuleBuilder.jsx
import React, { useState, useCallback } from 'react';
import Icon from 'components/AppIcon';

const RuleBuilder = ({ data, onChange, canEdit, isPreviewMode }) => {
  const [rules, setRules] = useState(data?.rules || []);
  const [selectedRule, setSelectedRule] = useState(null);
  const [showRuleEditor, setShowRuleEditor] = useState(false);
  const [ruleForm, setRuleForm] = useState({
    id: '',
    name: '',
    condition: '',
    action: '',
    active: true,
    priority: 1,
    description: '',
    effectiveDate: '',
    expiryDate: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Predefined condition templates
  const conditionTemplates = [
    {
      label: 'Quarterly Performance',
      value: 'quarter = Q{quarter} AND quota_attainment >= {percentage}%',
      description: 'Trigger based on quarterly quota attainment'
    },
    {
      label: 'Product Category',
      value: 'product_category = "{category}" AND revenue >= {amount}',
      description: 'Trigger based on product category sales'
    },
    {
      label: 'Territory Performance',
      value: 'territory = "{territory}" AND sales_tier = "{tier}"',
      description: 'Trigger based on territory and tier'
    },
    {
      label: 'Date Range',
      value: 'date_between("{start_date}", "{end_date}") AND revenue >= {amount}',
      description: 'Trigger within specific date range'
    },
    {
      label: 'Team Performance',
      value: 'team_quota_attainment >= {percentage}% AND individual_quota_attainment >= {individual_percentage}%',
      description: 'Trigger based on both team and individual performance'
    }
  ];

  // Predefined action templates
  const actionTemplates = [
    {
      label: 'Commission Multiplier',
      value: 'multiply_commission({multiplier})',
      description: 'Multiply commission by specified factor'
    },
    {
      label: 'Flat Bonus',
      value: 'add_bonus({amount})',
      description: 'Add flat bonus amount'
    },
    {
      label: 'Percentage Bonus',
      value: 'add_percentage_bonus({percentage}%)',
      description: 'Add percentage-based bonus'
    },
    {
      label: 'Tier Upgrade',
      value: 'upgrade_tier("{tier_name}")',
      description: 'Temporarily upgrade to higher tier'
    },
    {
      label: 'Rate Override',
      value: 'override_rate({rate})',
      description: 'Override commission rate for the period'
    }
  ];

  // Validate rule
  const validateRule = (rule) => {
    const errors = {};

    if (!rule.name?.trim()) {
      errors.name = 'Rule name is required';
    }

    if (!rule.condition?.trim()) {
      errors.condition = 'Condition is required';
    }

    if (!rule.action?.trim()) {
      errors.action = 'Action is required';
    }

    // Check for syntax in condition (basic validation)
    if (rule.condition && !rule.condition.includes('=') && !rule.condition.includes('>=') && !rule.condition.includes('<=')) {
      errors.condition = 'Condition must include a comparison operator';
    }

    // Check for syntax in action (basic validation)
    if (rule.action && !rule.action.includes('(') && !rule.action.includes(')')) {
      errors.action = 'Action must include function syntax with parentheses';
    }

    return errors;
  };

  // Handle rule save
  const saveRule = () => {
    const errors = validateRule(ruleForm);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const newRules = selectedRule
      ? rules.map(rule => rule.id === selectedRule.id ? { ...ruleForm } : rule)
      : [...rules, { ...ruleForm, id: `rule-${Date.now()}` }];

    setRules(newRules);
    onChange?.('rules', newRules);
    setShowRuleEditor(false);
    setSelectedRule(null);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setRuleForm({
      id: '',
      name: '',
      condition: '',
      action: '',
      active: true,
      priority: 1,
      description: '',
      effectiveDate: '',
      expiryDate: ''
    });
    setValidationErrors({});
  };

  // Edit rule
  const editRule = (rule) => {
    setSelectedRule(rule);
    setRuleForm({ ...rule });
    setShowRuleEditor(true);
  };

  // Delete rule
  const deleteRule = (ruleId) => {
    const newRules = rules.filter(rule => rule.id !== ruleId);
    setRules(newRules);
    onChange?.('rules', newRules);
  };

  // Toggle rule active status
  const toggleRuleStatus = (ruleId) => {
    const newRules = rules.map(rule => 
      rule.id === ruleId ? { ...rule, active: !rule.active } : rule
    );
    setRules(newRules);
    onChange?.('rules', newRules);
  };

  // Apply template
  const applyTemplate = (template, type) => {
    if (type === 'condition') {
      setRuleForm(prev => ({ ...prev, condition: template.value }));
    } else {
      setRuleForm(prev => ({ ...prev, action: template.value }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Advanced Rule Builder</h2>
          <p className="text-sm text-text-secondary mt-1">
            Create complex commission logic with conditional statements, date-based triggers, and performance multipliers.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Add Rule */}
          {canEdit && !isPreviewMode && (
            <button
              onClick={() => {
                setSelectedRule(null);
                resetForm();
                setShowRuleEditor(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
            >
              <Icon name="Plus" size={16} />
              <span>Add Rule</span>
            </button>
          )}
        </div>
      </div>

      {/* Rule Editor Modal */}
      {showRuleEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-150 p-4">
          <div className="bg-surface rounded-sm shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">
                  {selectedRule ? 'Edit Rule' : 'Create New Rule'}
                </h3>
                <button
                  onClick={() => setShowRuleEditor(false)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Rule Configuration */}
                <div className="space-y-4">
                  <h4 className="font-medium text-text-primary">Rule Configuration</h4>
                  
                  {/* Rule Name */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Rule Name *
                    </label>
                    <input
                      type="text"
                      value={ruleForm.name}
                      onChange={(e) => setRuleForm(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent ${
                        validationErrors.name ? 'border-error' : 'border-border'
                      }`}
                      placeholder="e.g., Q4 Accelerator Bonus"
                    />
                    {validationErrors.name && (
                      <p className="text-error text-xs mt-1">{validationErrors.name}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Description
                    </label>
                    <textarea
                      value={ruleForm.description}
                      onChange={(e) => setRuleForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Describe what this rule does..."
                    />
                  </div>

                  {/* Priority and Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Priority
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={ruleForm.priority}
                        onChange={(e) => setRuleForm(prev => ({ ...prev, priority: parseInt(e.target.value) || 1 }))}
                        className="w-full px-3 py-2 border border-border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        id="rule-active"
                        checked={ruleForm.active}
                        onChange={(e) => setRuleForm(prev => ({ ...prev, active: e.target.checked }))}
                        className="rounded"
                      />
                      <label htmlFor="rule-active" className="text-sm font-medium text-text-primary">
                        Active
                      </label>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Effective Date
                      </label>
                      <input
                        type="date"
                        value={ruleForm.effectiveDate}
                        onChange={(e) => setRuleForm(prev => ({ ...prev, effectiveDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        value={ruleForm.expiryDate}
                        onChange={(e) => setRuleForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Condition and Action Builder */}
                <div className="space-y-4">
                  <h4 className="font-medium text-text-primary">Logic Builder</h4>
                  
                  {/* Condition */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Condition *
                    </label>
                    <textarea
                      value={ruleForm.condition}
                      onChange={(e) => setRuleForm(prev => ({ ...prev, condition: e.target.value }))}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm ${
                        validationErrors.condition ? 'border-error' : 'border-border'
                      }`}
                      placeholder="e.g., quarter = Q4 AND quota_attainment >= 100%"
                    />
                    {validationErrors.condition && (
                      <p className="text-error text-xs mt-1">{validationErrors.condition}</p>
                    )}
                    
                    {/* Condition Templates */}
                    <div className="mt-2">
                      <p className="text-xs text-text-secondary mb-2">Quick Templates:</p>
                      <div className="flex flex-wrap gap-1">
                        {conditionTemplates.map((template, index) => (
                          <button
                            key={index}
                            onClick={() => applyTemplate(template, 'condition')}
                            className="px-2 py-1 text-xs bg-secondary-100 text-text-primary rounded hover:bg-secondary-200 transition-smooth"
                            title={template.description}
                          >
                            {template.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Action *
                    </label>
                    <textarea
                      value={ruleForm.action}
                      onChange={(e) => setRuleForm(prev => ({ ...prev, action: e.target.value }))}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm ${
                        validationErrors.action ? 'border-error' : 'border-border'
                      }`}
                      placeholder="e.g., multiply_commission(1.25)"
                    />
                    {validationErrors.action && (
                      <p className="text-error text-xs mt-1">{validationErrors.action}</p>
                    )}
                    
                    {/* Action Templates */}
                    <div className="mt-2">
                      <p className="text-xs text-text-secondary mb-2">Quick Templates:</p>
                      <div className="flex flex-wrap gap-1">
                        {actionTemplates.map((template, index) => (
                          <button
                            key={index}
                            onClick={() => applyTemplate(template, 'action')}
                            className="px-2 py-1 text-xs bg-secondary-100 text-text-primary rounded hover:bg-secondary-200 transition-smooth"
                            title={template.description}
                          >
                            {template.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-border">
                <button
                  onClick={() => setShowRuleEditor(false)}
                  className="px-4 py-2 bg-secondary-200 text-text-primary rounded-sm hover:bg-secondary-300 transition-smooth"
                >
                  Cancel
                </button>
                <button
                  onClick={saveRule}
                  className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
                >
                  {selectedRule ? 'Update Rule' : 'Create Rule'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rules List */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-medium text-white">Commission Rules</h3>
          <p className="text-sm text-gray-300 mt-1">
            Rules are processed in priority order. Higher priority rules are evaluated first.
          </p>
        </div>

        <div className="divide-y divide-white/10">
          {rules.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="GitBranch" size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Rules Configured</h3>
              <p className="text-gray-300 mb-4">
                Create your first commission rule to enable advanced logic processing.
              </p>
              {canEdit && !isPreviewMode && (
                <button
                  onClick={() => {
                    setSelectedRule(null);
                    resetForm();
                    setShowRuleEditor(true);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
                >
                  Create First Rule
                </button>
              )}
            </div>
          ) : (
            rules
              .sort((a, b) => (b.priority || 0) - (a.priority || 0))
              .map((rule) => (
                <div key={rule.id} className="p-4 hover:bg-white/5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-white">{rule.name}</h4>
                        <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                          Priority: {rule.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          rule.active 
                            ? 'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
                        }`}>
                          {rule.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      {rule.description && (
                        <p className="text-sm text-gray-300 mb-3">{rule.description}</p>
                      )}
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs font-medium text-white uppercase tracking-wide">Condition:</span>
                          <code className="block mt-1 p-2 bg-white/5 text-sm font-mono text-gray-300 rounded">
                            {rule.condition}
                          </code>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-white uppercase tracking-wide">Action:</span>
                          <code className="block mt-1 p-2 bg-white/5 text-sm font-mono text-gray-300 rounded">
                            {rule.action}
                          </code>
                        </div>
                      </div>
                      
                      {(rule.effectiveDate || rule.expiryDate) && (
                        <div className="flex items-center space-x-4 mt-3 text-xs text-gray-300">
                          {rule.effectiveDate && (
                            <span>Effective: {new Date(rule.effectiveDate).toLocaleDateString()}</span>
                          )}
                          {rule.expiryDate && (
                            <span>Expires: {new Date(rule.expiryDate).toLocaleDateString()}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {canEdit && !isPreviewMode && (
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => toggleRuleStatus(rule.id)}
                          className={`p-2 rounded transition-smooth ${
                            rule.active 
                              ? 'text-success hover:bg-success-50' :'text-error hover:bg-error-50'
                          }`}
                          title={rule.active ? 'Deactivate rule' : 'Activate rule'}
                        >
                          <Icon name={rule.active ? 'ToggleRight' : 'ToggleLeft'} size={16} />
                        </button>
                        <button
                          onClick={() => editRule(rule)}
                          className="p-2 text-primary hover:bg-primary-50 rounded transition-smooth"
                          title="Edit rule"
                        >
                          <Icon name="Edit3" size={16} />
                        </button>
                        <button
                          onClick={() => deleteRule(rule.id)}
                          className="p-2 text-error hover:bg-error-50 rounded transition-smooth"
                          title="Delete rule"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Rule Syntax Help */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-lg">
        <h4 className="font-medium text-white mb-2">Rule Syntax Reference</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <h5 className="font-medium mb-1 text-white">Condition Operators:</h5>
            <ul className="space-y-1 text-xs">
              <li>• Comparison: =, !=, &gt;, &lt;, &gt;=, &lt;=</li>
              <li>• Logical: AND, OR, NOT</li>
              <li>• Functions: date_between(), in_list()</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-1 text-white">Available Variables:</h5>
            <ul className="space-y-1 text-xs">
              <li>• quota_attainment, revenue, quarter</li>
              <li>• territory, product_category, sales_tier</li>
              <li>• team_quota_attainment, individual_quota</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleBuilder;