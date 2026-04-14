import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SleepLoggingControls = ({ onLogSleep }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [sleepData, setSleepData] = useState({
    bedtime: '22:30',
    wakeTime: '07:00',
    quality: 8,
    notes: ''
  });

  const handleInputChange = (field, value) => {
    setSleepData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    setIsLogging(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogSleep(sleepData);
      setIsLogging(false);
      setSleepData({
        bedtime: '22:30',
        wakeTime: '07:00',
        quality: 8,
        notes: ''
      });
    }, 1000);
  };

  const calculateDuration = () => {
    const bedtime = new Date(`2000-01-01T${sleepData.bedtime}`);
    const wakeTime = new Date(`2000-01-02T${sleepData.wakeTime}`);
    const duration = (wakeTime - bedtime) / (1000 * 60 * 60);
    return duration?.toFixed(1);
  };

  const getQualityLabel = (quality) => {
    if (quality >= 9) return 'Excellent';
    if (quality >= 7) return 'Good';
    if (quality >= 5) return 'Fair';
    if (quality >= 3) return 'Poor';
    return 'Very Poor';
  };

  const getQualityColor = (quality) => {
    if (quality >= 7) return 'text-success';
    if (quality >= 5) return 'text-warning';
    return 'text-error';
  };

  const quickPresets = [
    { label: 'Early Bird', bedtime: '21:30', wakeTime: '06:30' },
    { label: 'Standard', bedtime: '22:30', wakeTime: '07:00' },
    { label: 'Night Owl', bedtime: '23:30', wakeTime: '08:00' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-wellness elevation-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
            <Icon name="Plus" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Log Sleep</h3>
            <p className="text-sm text-muted-foreground">Record your sleep manually</p>
          </div>
        </div>
      </div>
      {/* Quick Presets */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Presets</h4>
        <div className="grid grid-cols-3 gap-2">
          {quickPresets?.map((preset) => (
            <button
              key={preset?.label}
              onClick={() => {
                handleInputChange('bedtime', preset?.bedtime);
                handleInputChange('wakeTime', preset?.wakeTime);
              }}
              className="p-3 text-center bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
            >
              <div className="text-sm font-medium text-foreground">{preset?.label}</div>
              <div className="text-xs text-muted-foreground">
                {preset?.bedtime} - {preset?.wakeTime}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Time Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Icon name="Moon" size={16} className="inline mr-2" />
            Bedtime
          </label>
          <input
            type="time"
            value={sleepData?.bedtime}
            onChange={(e) => handleInputChange('bedtime', e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Icon name="Sun" size={16} className="inline mr-2" />
            Wake Time
          </label>
          <input
            type="time"
            value={sleepData?.wakeTime}
            onChange={(e) => handleInputChange('wakeTime', e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>
      </div>
      {/* Duration Display */}
      <div className="text-center mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="text-2xl font-bold text-foreground">{calculateDuration()}h</div>
        <div className="text-sm text-muted-foreground">Total Sleep Duration</div>
      </div>
      {/* Quality Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Sleep Quality Rating
        </label>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Poor</span>
            <span className="text-sm text-muted-foreground">Excellent</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={sleepData?.quality}
            onChange={(e) => handleInputChange('quality', parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted/30 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="text-center">
            <span className={`text-lg font-semibold ${getQualityColor(sleepData?.quality)}`}>
              {sleepData?.quality}/10 - {getQualityLabel(sleepData?.quality)}
            </span>
          </div>
        </div>
      </div>
      {/* Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Sleep Notes (Optional)
        </label>
        <textarea
          value={sleepData?.notes}
          onChange={(e) => handleInputChange('notes', e?.target?.value)}
          placeholder="How did you sleep? Any factors that affected your sleep?"
          rows={3}
          className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
        />
      </div>
      {/* Submit Button */}
      <Button
        variant="default"
        fullWidth
        loading={isLogging}
        onClick={handleSubmit}
        iconName="Check"
        iconPosition="left"
      >
        {isLogging ? 'Logging Sleep...' : 'Log Sleep Data'}
      </Button>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #5DB075;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #5DB075;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default SleepLoggingControls;