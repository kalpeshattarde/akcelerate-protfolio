// src/pages/commission-structure-configuration/components/PreviewMode.jsx
import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';

const PreviewMode = ({ data, isPreviewMode, canEdit }) => {
  const [selectedScenario, setSelectedScenario] = useState('current');
  const [testData, setTestData] = useState({
    salesRep: {
      id: 'rep-001',
      name: 'John Smith',
      territory: 'West Coast',
      tier: 'Tier 1',
      ytdSales: 1250000,
      annualQuota: 1000000,
      productMix: {
        'Enterprise': 450000,
        'Professional': 320000,
        'Standard': 280000,
        'Starter': 200000
      }
    },
    timeframe: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      quarter: 'Q4'
    }
  });
  const [calculationResults, setCalculationResults] = useState(null);
  const [historicalComparison, setHistoricalComparison] = useState(null);
  const [showCalculationDetails, setShowCalculationDetails] = useState(false);

  // Mock historical data for comparison
  const historicalData = {
    previous: {
      totalCommission: 85000,
      baseCommission: 75000,
      accelerators: 8000,
      spifs: 2000,
      effectiveRate: 0.068
    },
    current: {
      totalCommission: 92500,
      baseCommission: 81250,
      accelerators: 9000,
      spifs: 2250,
      effectiveRate: 0.074
    }
  };

  // Calculate commission based on current configuration
  const calculateCommission = useMemo(() => {
    if (!data || !testData.salesRep) return null;

    const rep = testData.salesRep;
    const quotaAttainment = rep.ytdSales / rep.annualQuota;
    
    // Find applicable tier
    const applicableTier = data.tiers?.find(tier => tier.name.includes(rep.tier));
    if (!applicableTier) return null;

    // Calculate base commission
    const baseCommissionRate = applicableTier.baseCommissionRate || 0.07;
    const baseCommission = rep.ytdSales * baseCommissionRate;

    // Calculate product-specific commissions
    let productCommissions = 0;
    if (data.rateMatrix?.rates) {
      Object.entries(rep.productMix).forEach(([product, sales]) => {
        const rateKey = `${rep.territory}-${product}`;
        const rate = data.rateMatrix.rates[rateKey] || baseCommissionRate;
        productCommissions += sales * rate;
      });
    } else {
      productCommissions = baseCommission;
    }

    // Apply rules
    let rulesBonus = 0;
    let accelerators = 0;
    
    if (data.rules) {
      data.rules.forEach(rule => {
        if (!rule.active) return;
        
        // Simple rule evaluation (in reality, this would be more sophisticated)
        if (rule.condition.includes('quota_attainment >= 100%') && quotaAttainment >= 1.0) {
          if (rule.action.includes('multiply_commission')) {
            const multiplier = parseFloat(rule.action.match(/multiply_commission\(([\d.]+)\)/)?.[1] || 1);
            accelerators += productCommissions * (multiplier - 1);
          }
        }
        
        if (rule.condition.includes('Q4') && testData.timeframe.quarter === 'Q4') {
          if (rule.action.includes('add_bonus')) {
            const bonus = parseFloat(rule.action.match(/add_bonus\(([\d]+)\)/)?.[1] || 0);
            rulesBonus += bonus;
          }
        }
      });
    }

    // Calculate SPIF eligibility
    let spifBonus = 0;
    if (applicableTier.spifEligible && quotaAttainment >= applicableTier.acceleratorTrigger) {
      spifBonus = rep.ytdSales * 0.02; // 2% SPIF
    }

    const totalCommission = productCommissions + accelerators + rulesBonus + spifBonus;
    const effectiveRate = totalCommission / rep.ytdSales;

    return {
      baseCommission: productCommissions,
      accelerators,
      rulesBonus,
      spifBonus,
      totalCommission,
      effectiveRate,
      quotaAttainment,
      breakdown: {
        tier: applicableTier.name,
        baseRate: baseCommissionRate,
        quotaAttainment: (quotaAttainment * 100).toFixed(1) + '%',
        spifEligible: applicableTier.spifEligible
      }
    };
  }, [data, testData]);

  // Run calculation test
  const runCalculationTest = () => {
    const results = calculateCommission;
    setCalculationResults(results);
    
    // Generate historical comparison
    if (results) {
      const comparison = {
        previous: historicalData.previous,
        current: {
          totalCommission: results.totalCommission,
          baseCommission: results.baseCommission,
          accelerators: results.accelerators,
          spifs: results.spifBonus,
          effectiveRate: results.effectiveRate
        },
        variance: {
          totalCommission: results.totalCommission - historicalData.previous.totalCommission,
          effectiveRate: results.effectiveRate - historicalData.previous.effectiveRate
        }
      };
      setHistoricalComparison(comparison);
    }
  };

  // Update test data
  const updateTestData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setTestData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setTestData(prev => ({
        ...prev,
        salesRep: {
          ...prev.salesRep,
          [field]: value
        }
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Preview Mode</h2>
          <p className="text-sm text-text-secondary mt-1">
            Test configuration changes against historical data before activation.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {!isPreviewMode && (
            <div className="px-3 py-2 bg-warning-100 text-warning rounded-sm">
              <span className="text-sm font-medium">Preview mode is disabled</span>
            </div>
          )}
        </div>
      </div>

      {/* Test Configuration */}
      <div className="glass-morphism rounded-xl">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-medium text-white">Test Scenario Configuration</h3>
          <p className="text-sm text-white/70 mt-1">
            Configure test parameters to simulate commission calculations.
          </p>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Rep Data */}
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">Sales Representative</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={testData.salesRep.name}
                    onChange={(e) => updateTestData('name', e.target.value)}
                    className="input-glass-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Territory
                  </label>
                  <select
                    value={testData.salesRep.territory}
                    onChange={(e) => updateTestData('territory', e.target.value)}
                    className="select-glass w-full"
                  >
                    {data?.rateMatrix?.territories?.map(territory => (
                      <option key={territory} value={territory}>{territory}</option>
                    )) || [
                      <option key="west" value="West Coast">West Coast</option>,
                      <option key="east" value="East Coast">East Coast</option>
                    ]}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Sales Tier
                  </label>
                  <select
                    value={testData.salesRep.tier}
                    onChange={(e) => updateTestData('tier', e.target.value)}
                    className="select-glass w-full"
                  >
                    {data?.tiers?.map(tier => (
                      <option key={tier.id} value={tier.name}>{tier.name}</option>
                    )) || [
                      <option value="Tier 1">Tier 1</option>,
                      <option value="Tier 2">Tier 2</option>
                    ]}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Quarter
                  </label>
                  <select
                    value={testData.timeframe.quarter}
                    onChange={(e) => updateTestData('timeframe.quarter', e.target.value)}
                    className="select-glass w-full"
                  >
                    <option value="Q1">Q1</option>
                    <option value="Q2">Q2</option>
                    <option value="Q3">Q3</option>
                    <option value="Q4">Q4</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    YTD Sales ($)
                  </label>
                  <input
                    type="number"
                    value={testData.salesRep.ytdSales}
                    onChange={(e) => updateTestData('ytdSales', parseFloat(e.target.value) || 0)}
                    className="input-glass-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Annual Quota ($)
                  </label>
                  <input
                    type="number"
                    value={testData.salesRep.annualQuota}
                    onChange={(e) => updateTestData('annualQuota', parseFloat(e.target.value) || 0)}
                    className="input-glass-dark w-full"
                  />
                </div>
              </div>
            </div>

            {/* Product Mix */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">Product Sales Mix</h4>
              
              {Object.entries(testData.salesRep.productMix).map(([product, sales]) => (
                <div key={product}>
                  <label className="block text-sm font-medium text-white mb-1">
                    {product} ($)
                  </label>
                  <input
                    type="number"
                    value={sales}
                    onChange={(e) => {
                      const newMix = { ...testData.salesRep.productMix };
                      newMix[product] = parseFloat(e.target.value) || 0;
                      setTestData(prev => ({
                        ...prev,
                        salesRep: {
                          ...prev.salesRep,
                          productMix: newMix
                        }
                      }));
                    }}
                    className="input-glass-dark w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Run Test Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={runCalculationTest}
              className="btn-glass-primary flex items-center space-x-2"
            >
              <Icon name="Play" size={16} />
              <span>Run Calculation Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calculation Results */}
      {calculationResults && (
        <div className="glass-morphism rounded-xl">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white">Calculation Results</h3>
              <button
                onClick={() => setShowCalculationDetails(!showCalculationDetails)}
                className="flex items-center space-x-1 text-sm text-cyan-400 hover:text-cyan-300"
              >
                <span>{showCalculationDetails ? 'Hide' : 'Show'} Details</span>
                <Icon name={showCalculationDetails ? 'ChevronUp' : 'ChevronDown'} size={16} />
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="glass-morphism-elevated rounded-xl p-4 glow-indigo">
                <div className="text-2xl font-semibold text-indigo-300">
                  ${calculationResults.totalCommission.toLocaleString()}
                </div>
                <div className="text-sm text-indigo-400">Total Commission</div>
              </div>
              <div className="glass-morphism-dark rounded-xl p-4">
                <div className="text-2xl font-semibold text-white">
                  {(calculationResults.effectiveRate * 100).toFixed(2)}%
                </div>
                <div className="text-sm text-white/70">Effective Rate</div>
              </div>
              <div className="glass-morphism-elevated rounded-xl p-4 glow-teal">
                <div className="text-2xl font-semibold text-emerald-300">
                  {calculationResults.breakdown.quotaAttainment}
                </div>
                <div className="text-sm text-emerald-400">Quota Attainment</div>
              </div>
              <div className="glass-morphism-elevated rounded-xl p-4" style={{boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)'}}>
                <div className="text-2xl font-semibold text-amber-300">
                  ${calculationResults.accelerators.toLocaleString()}
                </div>
                <div className="text-sm text-amber-400">Accelerators</div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            {showCalculationDetails && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3">Commission Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Base Commission:</span>
                      <span className="font-medium text-white">${calculationResults.baseCommission.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Accelerators:</span>
                      <span className="font-medium text-white">${calculationResults.accelerators.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Rules Bonus:</span>
                      <span className="font-medium text-white">${calculationResults.rulesBonus.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">SPIF Bonus:</span>
                      <span className="font-medium text-white">${calculationResults.spifBonus.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between font-semibold">
                      <span className="text-white/90">Total:</span>
                      <span className="text-white">${calculationResults.totalCommission.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-3">Applied Configuration</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Tier:</span>
                      <span className="font-medium text-white">{calculationResults.breakdown.tier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Base Rate:</span>
                      <span className="font-medium text-white">{(calculationResults.breakdown.baseRate * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">SPIF Eligible:</span>
                      <span className={`font-medium ${
                        calculationResults.breakdown.spifEligible ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {calculationResults.breakdown.spifEligible ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Rules Applied:</span>
                      <span className="font-medium text-white">{data?.rules?.filter(r => r.active).length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Historical Comparison */}
      {historicalComparison && (
        <div className="glass-morphism rounded-xl">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-medium text-white">Historical Comparison</h3>
            <p className="text-sm text-white/70 mt-1">
              Compare current configuration against previous calculation results.
            </p>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Previous */}
              <div>
                <h4 className="font-medium text-white mb-3">Previous Configuration</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Commission:</span>
                    <span className="text-white">${historicalComparison.previous.totalCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Effective Rate:</span>
                    <span className="text-white">{(historicalComparison.previous.effectiveRate * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              {/* Current */}
              <div>
                <h4 className="font-medium text-white mb-3">Current Configuration</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Commission:</span>
                    <span className="text-white">${historicalComparison.current.totalCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Effective Rate:</span>
                    <span className="text-white">{(historicalComparison.current.effectiveRate * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              {/* Variance */}
              <div>
                <h4 className="font-medium text-white mb-3">Variance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Commission Δ:</span>
                    <span className={`font-medium ${
                      historicalComparison.variance.totalCommission >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {historicalComparison.variance.totalCommission >= 0 ? '+' : ''}
                      ${historicalComparison.variance.totalCommission.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Rate Δ:</span>
                    <span className={`font-medium ${
                      historicalComparison.variance.effectiveRate >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {historicalComparison.variance.effectiveRate >= 0 ? '+' : ''}
                      {(historicalComparison.variance.effectiveRate * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="glass-morphism-dark rounded-xl p-4">
        <h4 className="font-medium text-cyan-300 mb-2">Preview Mode Instructions</h4>
        <ul className="text-sm text-cyan-200/80 space-y-1">
          <li>• Configure test parameters above to simulate different scenarios</li>
          <li>• Run calculations to see how changes affect commission payouts</li>
          <li>• Compare results with historical data to assess impact</li>
          <li>• Use different quarters and territories to test rule effectiveness</li>
          <li>• Preview mode prevents actual changes from being applied</li>
        </ul>
      </div>
    </div>
  );
};

export default PreviewMode;