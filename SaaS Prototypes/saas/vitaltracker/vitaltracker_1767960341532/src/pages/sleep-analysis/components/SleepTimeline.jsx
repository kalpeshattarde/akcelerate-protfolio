import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SleepTimeline = ({ sleepData, selectedDate, onDateChange }) => {
  const [viewMode, setViewMode] = useState('night'); // 'night' or 'week'

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getSleepPhaseColor = (phase) => {
    const colors = {
      'deep': 'bg-primary',
      'light': 'bg-secondary',
      'rem': 'bg-accent',
      'awake': 'bg-warning'
    };
    return colors?.[phase] || 'bg-muted';
  };

  const getSleepQualityColor = (quality) => {
    if (quality >= 80) return 'text-success';
    if (quality >= 60) return 'text-warning';
    return 'text-error';
  };

  const navigateDate = (direction) => {
    const currentDate = new Date(selectedDate);
    currentDate?.setDate(currentDate?.getDate() + (direction === 'next' ? 1 : -1));
    onDateChange(currentDate?.toISOString()?.split('T')?.[0]);
  };

  const currentSleep = sleepData?.find(sleep => sleep?.date === selectedDate);

  return (
    <div className="bg-card rounded-xl p-6 shadow-wellness elevation-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Moon" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Sleep Timeline</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(selectedDate)?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'night' ? 'week' : 'night')}
            className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-colors"
          >
            {viewMode === 'night' ? 'Week View' : 'Night View'}
          </button>
        </div>
      </div>
      {viewMode === 'night' && currentSleep ? (
        <div className="space-y-6">
          {/* Date Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateDate('prev')}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {currentSleep?.duration}
              </div>
              <div className="text-sm text-muted-foreground">Total Sleep</div>
            </div>

            <button
              onClick={() => navigateDate('next')}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>

          {/* Sleep Quality Score */}
          <div className="text-center">
            <div className={`text-3xl font-bold ${getSleepQualityColor(currentSleep?.quality)}`}>
              {currentSleep?.quality}%
            </div>
            <div className="text-sm text-muted-foreground">Sleep Quality</div>
          </div>

          {/* Sleep Phases Timeline */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Sleep Phases</h4>
            <div className="relative">
              {/* Timeline Bar */}
              <div className="flex h-8 rounded-lg overflow-hidden bg-muted/30">
                {currentSleep?.phases?.map((phase, index) => (
                  <div
                    key={index}
                    className={`${getSleepPhaseColor(phase?.type)} transition-all duration-300`}
                    style={{ width: `${phase?.duration}%` }}
                    title={`${phase?.type?.charAt(0)?.toUpperCase() + phase?.type?.slice(1)} Sleep: ${phase?.duration}%`}
                  />
                ))}
              </div>

              {/* Phase Legend */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                {['deep', 'light', 'rem', 'awake']?.map((phase) => (
                  <div key={phase} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getSleepPhaseColor(phase)}`} />
                    <span className="text-xs text-muted-foreground capitalize">{phase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sleep Times */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Icon name="Moon" size={20} className="text-primary mx-auto mb-2" />
              <div className="text-lg font-semibold text-foreground">
                {formatTime(currentSleep?.bedtime)}
              </div>
              <div className="text-sm text-muted-foreground">Bedtime</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Icon name="Sun" size={20} className="text-warning mx-auto mb-2" />
              <div className="text-lg font-semibold text-foreground">
                {formatTime(currentSleep?.wakeTime)}
              </div>
              <div className="text-sm text-muted-foreground">Wake Time</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Weekly Overview</h4>
          <div className="grid grid-cols-7 gap-2">
            {sleepData?.slice(-7)?.map((sleep, index) => (
              <div
                key={sleep?.date}
                className={`p-3 rounded-lg text-center cursor-pointer transition-colors ${
                  sleep?.date === selectedDate 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/30 hover:bg-muted/50'
                }`}
                onClick={() => onDateChange(sleep?.date)}
              >
                <div className="text-xs font-medium mb-1">
                  {new Date(sleep.date)?.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-sm font-semibold">{sleep?.duration}</div>
                <div className={`text-xs ${getSleepQualityColor(sleep?.quality)}`}>
                  {sleep?.quality}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SleepTimeline;