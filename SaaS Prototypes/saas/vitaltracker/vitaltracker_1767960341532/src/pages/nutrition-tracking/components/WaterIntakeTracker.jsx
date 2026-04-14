import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WaterIntakeTracker = ({ currentIntake, dailyGoal, onAddWater }) => {
  const [selectedAmount, setSelectedAmount] = useState(250);
  
  const progressPercentage = Math.min((currentIntake / dailyGoal) * 100, 100);
  const glassesConsumed = Math.floor(currentIntake / 250);
  const totalGlasses = Math.ceil(dailyGoal / 250);

  const quickAmounts = [250, 500, 750, 1000];

  const handleAddWater = (amount) => {
    onAddWater(amount);
  };

  return (
    <div className="bg-card rounded-xl p-6 elevation-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Water Intake</h3>
        <Icon name="Droplets" size={20} className="text-accent" />
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            {currentIntake}ml / {dailyGoal}ml
          </span>
          <span className="text-sm font-medium text-foreground">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="bg-accent h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      {/* Water Glasses Visual */}
      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: totalGlasses }, (_, index) => (
            <div
              key={index}
              className={`w-8 h-10 rounded-b-lg border-2 transition-colors duration-300 ${
                index < glassesConsumed
                  ? 'bg-accent/20 border-accent' :'bg-muted/30 border-muted-foreground/30'
              }`}
            >
              <div
                className={`w-full rounded-b transition-all duration-300 ${
                  index < glassesConsumed ? 'bg-accent' : 'bg-transparent'
                }`}
                style={{
                  height: index < glassesConsumed ? '100%' : '0%'
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Quick Add Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {quickAmounts?.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            size="sm"
            onClick={() => handleAddWater(amount)}
            className="flex items-center justify-center space-x-2"
          >
            <Icon name="Plus" size={14} />
            <span>{amount}ml</span>
          </Button>
        ))}
      </div>
      {/* Custom Amount */}
      <div className="flex space-x-2">
        <input
          type="number"
          value={selectedAmount}
          onChange={(e) => setSelectedAmount(parseInt(e?.target?.value) || 0)}
          className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Custom amount"
          min="1"
          max="2000"
        />
        <Button
          variant="default"
          size="sm"
          onClick={() => handleAddWater(selectedAmount)}
          iconName="Plus"
        >
          Add
        </Button>
      </div>
      {/* Achievement Message */}
      {progressPercentage >= 100 && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Trophy" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              Daily goal achieved! Great job staying hydrated!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterIntakeTracker;