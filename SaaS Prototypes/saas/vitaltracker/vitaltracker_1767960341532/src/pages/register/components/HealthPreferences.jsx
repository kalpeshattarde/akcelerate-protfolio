import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthPreferences = ({ preferences, onPreferenceChange, errors }) => {
  const ageRanges = [
    { value: '18-25', label: '18-25 years', icon: 'Zap' },
    { value: '26-35', label: '26-35 years', icon: 'Target' },
    { value: '36-45', label: '36-45 years', icon: 'TrendingUp' },
    { value: '46-55', label: '46-55 years', icon: 'Award' },
    { value: '56+', label: '56+ years', icon: 'Heart' }
  ];

  const activityLevels = [
    { 
      value: 'sedentary', 
      label: 'Sedentary', 
      description: 'Little to no exercise',
      icon: 'Coffee'
    },
    { 
      value: 'lightly-active', 
      label: 'Lightly Active', 
      description: 'Light exercise 1-3 days/week',
      icon: 'Walk'
    },
    { 
      value: 'moderately-active', 
      label: 'Moderately Active', 
      description: 'Moderate exercise 3-5 days/week',
      icon: 'Activity'
    },
    { 
      value: 'very-active', 
      label: 'Very Active', 
      description: 'Hard exercise 6-7 days/week',
      icon: 'Zap'
    }
  ];

  const wellnessGoals = [
    { value: 'weight-loss', label: 'Weight Loss', icon: 'TrendingDown', color: 'text-accent' },
    { value: 'muscle-gain', label: 'Muscle Gain', icon: 'Dumbbell', color: 'text-success' },
    { value: 'general-fitness', label: 'General Fitness', icon: 'Heart', color: 'text-primary' },
    { value: 'stress-management', label: 'Stress Management', icon: 'Brain', color: 'text-secondary' },
    { value: 'better-sleep', label: 'Better Sleep', icon: 'Moon', color: 'text-accent' },
    { value: 'nutrition', label: 'Better Nutrition', icon: 'Apple', color: 'text-success' }
  ];

  const handleSelectionChange = (category, value) => {
    onPreferenceChange(category, value);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Tell us about yourself</h2>
        <p className="text-muted-foreground">Help us personalize your wellness experience</p>
      </div>
      {/* Age Range Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">What's your age range?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ageRanges?.map((age) => (
            <button
              key={age?.value}
              type="button"
              onClick={() => handleSelectionChange('ageRange', age?.value)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-105
                ${preferences?.ageRange === age?.value
                  ? 'border-primary bg-primary/10 shadow-wellness'
                  : 'border-border hover:border-primary/50 bg-card'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${preferences?.ageRange === age?.value ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
                `}>
                  <Icon name={age?.icon} size={20} />
                </div>
                <span className="font-medium text-foreground">{age?.label}</span>
              </div>
            </button>
          ))}
        </div>
        {errors?.ageRange && (
          <p className="text-sm text-error">{errors?.ageRange}</p>
        )}
      </div>
      {/* Activity Level Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">What's your current activity level?</h3>
        <div className="space-y-3">
          {activityLevels?.map((level) => (
            <button
              key={level?.value}
              type="button"
              onClick={() => handleSelectionChange('activityLevel', level?.value)}
              className={`
                w-full p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-[1.02]
                ${preferences?.activityLevel === level?.value
                  ? 'border-primary bg-primary/10 shadow-wellness'
                  : 'border-border hover:border-primary/50 bg-card'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center
                  ${preferences?.activityLevel === level?.value ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
                `}>
                  <Icon name={level?.icon} size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{level?.label}</h4>
                  <p className="text-sm text-muted-foreground">{level?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        {errors?.activityLevel && (
          <p className="text-sm text-error">{errors?.activityLevel}</p>
        )}
      </div>
      {/* Wellness Goals Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">What are your primary wellness goals?</h3>
        <p className="text-sm text-muted-foreground">Select all that apply</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {wellnessGoals?.map((goal) => (
            <button
              key={goal?.value}
              type="button"
              onClick={() => {
                const currentGoals = preferences?.wellnessGoals || [];
                const isSelected = currentGoals?.includes(goal?.value);
                const newGoals = isSelected
                  ? currentGoals?.filter(g => g !== goal?.value)
                  : [...currentGoals, goal?.value];
                handleSelectionChange('wellnessGoals', newGoals);
              }}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-105
                ${(preferences?.wellnessGoals || [])?.includes(goal?.value)
                  ? 'border-primary bg-primary/10 shadow-wellness'
                  : 'border-border hover:border-primary/50 bg-card'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${(preferences?.wellnessGoals || [])?.includes(goal?.value) 
                    ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
                  }
                `}>
                  <Icon name={goal?.icon} size={20} />
                </div>
                <span className="font-medium text-foreground">{goal?.label}</span>
              </div>
            </button>
          ))}
        </div>
        {errors?.wellnessGoals && (
          <p className="text-sm text-error">{errors?.wellnessGoals}</p>
        )}
      </div>
    </div>
  );
};

export default HealthPreferences;