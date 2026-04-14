import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthPreferencesSection = () => {
  const [preferences, setPreferences] = useState({
    dailyStepsGoal: 10000,
    dailyCaloriesGoal: 2000,
    dailyWaterGoal: 8,
    sleepGoal: 8,
    activityLevel: 'moderate',
    dietaryPreferences: ['vegetarian'],
    healthConditions: []
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSliderChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSelectChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleMultiSelectChange = (key, option) => {
    setPreferences(prev => {
      const currentArray = prev?.[key];
      const newArray = currentArray?.includes(option)
        ? currentArray?.filter(item => item !== option)
        : [...currentArray, option];
      return { ...prev, [key]: newArray };
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving health preferences:', preferences);
    setHasChanges(false);
  };

  const handleReset = () => {
    setPreferences({
      dailyStepsGoal: 10000,
      dailyCaloriesGoal: 2000,
      dailyWaterGoal: 8,
      sleepGoal: 8,
      activityLevel: 'moderate',
      dietaryPreferences: ['vegetarian'],
      healthConditions: []
    });
    setHasChanges(false);
  };

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { value: 'light', label: 'Light', description: 'Light exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderate', description: 'Moderate exercise 3-5 days/week' },
    { value: 'active', label: 'Active', description: 'Hard exercise 6-7 days/week' },
    { value: 'very-active', label: 'Very Active', description: 'Very hard exercise, physical job' }
  ];

  const dietaryOptions = [
    'vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo', 'mediterranean', 'low-carb', 'gluten-free'
  ];

  const healthConditionOptions = [
    'diabetes', 'hypertension', 'heart-disease', 'arthritis', 'asthma', 'thyroid', 'none'
  ];

  return (
    <div className="bg-card rounded-xl p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-lg">
            <Icon name="Target" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Health Preferences</h2>
            <p className="text-sm text-muted-foreground">Customize your wellness goals and preferences</p>
          </div>
        </div>
        {hasChanges && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleReset} size="sm">
              Reset
            </Button>
            <Button variant="default" onClick={handleSave} size="sm">
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-8">
        {/* Daily Goals */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Daily Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Steps Goal */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Daily Steps</label>
                <span className="text-sm font-semibold text-primary">{preferences?.dailyStepsGoal?.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="20000"
                step="500"
                value={preferences?.dailyStepsGoal}
                onChange={(e) => handleSliderChange('dailyStepsGoal', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5,000</span>
                <span>20,000</span>
              </div>
            </div>

            {/* Calories Goal */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Daily Calories</label>
                <span className="text-sm font-semibold text-primary">{preferences?.dailyCaloriesGoal}</span>
              </div>
              <input
                type="range"
                min="1200"
                max="3500"
                step="50"
                value={preferences?.dailyCaloriesGoal}
                onChange={(e) => handleSliderChange('dailyCaloriesGoal', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1,200</span>
                <span>3,500</span>
              </div>
            </div>

            {/* Water Goal */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Daily Water (glasses)</label>
                <span className="text-sm font-semibold text-primary">{preferences?.dailyWaterGoal}</span>
              </div>
              <input
                type="range"
                min="4"
                max="16"
                step="1"
                value={preferences?.dailyWaterGoal}
                onChange={(e) => handleSliderChange('dailyWaterGoal', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>4</span>
                <span>16</span>
              </div>
            </div>

            {/* Sleep Goal */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Sleep Goal (hours)</label>
                <span className="text-sm font-semibold text-primary">{preferences?.sleepGoal}</span>
              </div>
              <input
                type="range"
                min="6"
                max="10"
                step="0.5"
                value={preferences?.sleepGoal}
                onChange={(e) => handleSliderChange('sleepGoal', parseFloat(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6h</span>
                <span>10h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Activity Level</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activityLevels?.map((level) => (
              <div
                key={level?.value}
                onClick={() => handleSelectChange('activityLevel', level?.value)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  preferences?.activityLevel === level?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    preferences?.activityLevel === level?.value
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {preferences?.activityLevel === level?.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className="font-medium text-foreground">{level?.label}</span>
                </div>
                <p className="text-sm text-muted-foreground">{level?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Dietary Preferences</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dietaryOptions?.map((option) => (
              <div
                key={option}
                onClick={() => handleMultiSelectChange('dietaryPreferences', option)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                  preferences?.dietaryPreferences?.includes(option)
                    ? 'border-secondary bg-secondary/5' :'border-border hover:border-secondary/50'
                }`}
              >
                <span className="text-sm font-medium text-foreground capitalize">
                  {option?.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Health Conditions */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Health Conditions</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select any health conditions to help us provide better recommendations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {healthConditionOptions?.map((condition) => (
              <div
                key={condition}
                onClick={() => handleMultiSelectChange('healthConditions', condition)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                  preferences?.healthConditions?.includes(condition)
                    ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
                }`}
              >
                <span className="text-sm font-medium text-foreground capitalize">
                  {condition?.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default HealthPreferencesSection;