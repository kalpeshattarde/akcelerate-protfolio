'use client';

import React, { useState } from 'react';


interface CalculatorInputs {
  currentGymCost: number;
  personalTraining: number;
  nutritionConsulting: number;
  supplements: number;
  recoveryServices: number;
}

const MembershipCalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentGymCost: 0,
    personalTraining: 0,
    nutritionConsulting: 0,
    supplements: 0,
    recoveryServices: 0
  });

  const [selectedPlan, setSelectedPlan] = useState<'foundation' | 'elite' | 'champion'>('elite');

  const planPrices = {
    foundation: 89,
    elite: 189,
    champion: 349
  };

  const planValues = {
    foundation: {
      personalTraining: 0,
      nutritionConsulting: 0,
      supplements: 0,
      recoveryServices: 0,
      additionalValue: 50 // App access, basic classes
    },
    elite: {
      personalTraining: 200, // 2 sessions worth $100 each
      nutritionConsulting: 150, // Quarterly sessions
      supplements: 75, // Guidance and discounts
      recoveryServices: 100, // Recovery suite access
      additionalValue: 150 // Analytics, priority booking, etc.
    },
    champion: {
      personalTraining: 800, // 8 sessions worth $100 each
      nutritionConsulting: 400, // Dedicated coach
      supplements: 200, // Personalized protocols
      recoveryServices: 300, // Full suite + massage
      additionalValue: 400 // Concierge, exclusive events, etc.
    }
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    setInputs({
      ...inputs,
      [field]: parseFloat(value) || 0
    });
  };

  const calculateCurrentTotal = () => {
    return Object.values(inputs).reduce((sum, value) => sum + value, 0);
  };

  const calculatePlanValue = () => {
    const plan = planValues[selectedPlan];
    return Object.values(plan).reduce((sum, value) => sum + value, 0);
  };

  const calculateSavings = () => {
    const currentTotal = calculateCurrentTotal();
    const planCost = planPrices[selectedPlan];
    const planValue = calculatePlanValue();
    
    // Savings = (Current spending + Plan value) - Plan cost
    return (currentTotal + planValue) - planCost;
  };

  const calculateROI = () => {
    const savings = calculateSavings();
    const planCost = planPrices[selectedPlan];
    return planCost > 0 ? ((savings / planCost) * 100) : 0;
  };

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Membership <span className="text-primary">Value Calculator</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how much you could save and the value you'll receive with FitCore Elite membership.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Inputs */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Your Current Monthly Spending</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Gym Membership
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={inputs.currentGymCost || ''}
                    onChange={(e) => handleInputChange('currentGymCost', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Personal Training Sessions
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={inputs.personalTraining || ''}
                    onChange={(e) => handleInputChange('personalTraining', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nutrition Consulting
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={inputs.nutritionConsulting || ''}
                    onChange={(e) => handleInputChange('nutritionConsulting', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Supplements & Products
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={inputs.supplements || ''}
                    onChange={(e) => handleInputChange('supplements', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Recovery Services (Massage, etc.)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={inputs.recoveryServices || ''}
                    onChange={(e) => handleInputChange('recoveryServices', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-foreground">Current Monthly Total:</span>
                  <span className="text-2xl font-bold text-primary font-mono">${calculateCurrentTotal()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results & Plan Selection */}
          <div className="space-y-8">
            {/* Plan Selection */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Select FitCore Elite Plan</h3>
              
              <div className="space-y-4">
                {Object.entries(planPrices).map(([plan, price]) => (
                  <div
                    key={plan}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedPlan === plan
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPlan(plan as any)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground capitalize">{plan}</h4>
                        <p className="text-sm text-muted-foreground">
                          {plan === 'foundation' && 'Start Your Journey'}
                          {plan === 'elite' && 'Serious Performance'}
                          {plan === 'champion' && 'Ultimate Excellence'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground font-mono">${price}</div>
                        <div className="text-sm text-muted-foreground">/month</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculation Results */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Your Value Analysis</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Plan Cost</div>
                    <div className="text-2xl font-bold text-foreground font-mono">${planPrices[selectedPlan]}</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-sm text-primary mb-1">Total Value</div>
                    <div className="text-2xl font-bold text-primary font-mono">${calculatePlanValue()}</div>
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                  <div className="text-sm text-muted-foreground mb-2">Monthly Savings</div>
                  <div className="text-4xl font-bold text-primary font-mono">${calculateSavings()}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {calculateROI().toFixed(0)}% ROI on your investment
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-foreground">What's Included:</h4>
                  <div className="space-y-2">
                    {selectedPlan === 'elite' && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Personal Training (2 sessions)</span>
                          <span className="text-foreground font-mono">$200 value</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Nutrition Consulting</span>
                          <span className="text-foreground font-mono">$150 value</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Recovery Suite Access</span>
                          <span className="text-foreground font-mono">$100 value</span>
                        </div>
                      </>
                    )}
                    {selectedPlan === 'champion' && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Personal Training (8 sessions)</span>
                          <span className="text-foreground font-mono">$800 value</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Dedicated Nutrition Coach</span>
                          <span className="text-foreground font-mono">$400 value</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Full Recovery Suite + Massage</span>
                          <span className="text-foreground font-mono">$300 value</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-cta hover:shadow-neon">
                  Choose {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipCalculator;