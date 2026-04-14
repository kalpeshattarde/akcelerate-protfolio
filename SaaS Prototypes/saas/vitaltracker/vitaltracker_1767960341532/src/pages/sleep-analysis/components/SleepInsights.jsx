import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SleepInsights = ({ sleepData, environmentData }) => {
  const [activeTab, setActiveTab] = useState('insights'); // 'insights', 'recommendations', 'factors'

  const generateInsights = () => {
    const recentSleep = sleepData?.slice(-7);
    const avgQuality = recentSleep?.reduce((sum, sleep) => sum + sleep?.quality, 0) / recentSleep?.length;
    const avgDuration = recentSleep?.reduce((sum, sleep) => sum + parseFloat(sleep?.duration?.replace('h', '')), 0) / recentSleep?.length;
    
    const insights = [];

    if (avgQuality >= 80) {
      insights?.push({
        type: 'positive',
        icon: 'CheckCircle',
        title: 'Excellent Sleep Quality',
        description: `Your average sleep quality this week is ${avgQuality?.toFixed(1)}%. Keep up the great work!`,
        color: 'text-success'
      });
    } else if (avgQuality < 60) {
      insights?.push({
        type: 'warning',
        icon: 'AlertTriangle',
        title: 'Sleep Quality Needs Attention',
        description: `Your average sleep quality is ${avgQuality?.toFixed(1)}%. Consider reviewing your sleep environment and routine.`,
        color: 'text-warning'
      });
    }

    if (avgDuration >= 7.5) {
      insights?.push({
        type: 'positive',
        icon: 'Clock',
        title: 'Good Sleep Duration',
        description: `You're averaging ${avgDuration?.toFixed(1)} hours of sleep, which is within the recommended range.`,
        color: 'text-success'
      });
    } else {
      insights?.push({
        type: 'warning',
        icon: 'Clock',
        title: 'Insufficient Sleep Duration',
        description: `You're averaging ${avgDuration?.toFixed(1)} hours. Try to aim for 7-9 hours for optimal health.`,
        color: 'text-warning'
      });
    }

    // Consistency check
    const durations = recentSleep?.map(sleep => parseFloat(sleep?.duration?.replace('h', '')));
    const maxDuration = Math.max(...durations);
    const minDuration = Math.min(...durations);
    const variance = maxDuration - minDuration;

    if (variance <= 1) {
      insights?.push({
        type: 'positive',
        icon: 'TrendingUp',
        title: 'Consistent Sleep Schedule',
        description: 'Your sleep duration is very consistent, which helps maintain your circadian rhythm.',
        color: 'text-success'
      });
    } else {
      insights?.push({
        type: 'info',
        icon: 'BarChart',
        title: 'Variable Sleep Schedule',
        description: `Your sleep duration varies by ${variance?.toFixed(1)} hours. Try to maintain a more consistent schedule.`,
        color: 'text-accent'
      });
    }

    return insights;
  };

  const getRecommendations = () => {
    return [
      {
        icon: 'Moon',
        title: 'Optimize Your Sleep Environment',
        description: 'Keep your bedroom cool (60-67°F), dark, and quiet for better sleep quality.',
        priority: 'high'
      },
      {
        icon: 'Smartphone',
        title: 'Digital Detox Before Bed',
        description: 'Avoid screens 1-2 hours before bedtime to reduce blue light exposure.',
        priority: 'high'
      },
      {
        icon: 'Coffee',
        title: 'Watch Your Caffeine Intake',
        description: 'Avoid caffeine 6-8 hours before bedtime as it can interfere with sleep.',
        priority: 'medium'
      },
      {
        icon: 'Activity',
        title: 'Regular Exercise',
        description: 'Regular physical activity can improve sleep quality, but avoid intense exercise close to bedtime.',
        priority: 'medium'
      },
      {
        icon: 'Clock',
        title: 'Consistent Sleep Schedule',
        description: 'Go to bed and wake up at the same time every day, even on weekends.',
        priority: 'high'
      }
    ];
  };

  const getSleepFactors = () => {
    return [
      {
        factor: 'Room Temperature',
        current: environmentData?.temperature || '68°F',
        optimal: '60-67°F',
        status: 'good',
        icon: 'Thermometer'
      },
      {
        factor: 'Noise Level',
        current: environmentData?.noise || 'Low',
        optimal: 'Minimal',
        status: 'good',
        icon: 'Volume2'
      },
      {
        factor: 'Screen Time Before Bed',
        current: environmentData?.screenTime || '45 min',
        optimal: '< 30 min',
        status: 'warning',
        icon: 'Smartphone'
      },
      {
        factor: 'Caffeine Intake',
        current: environmentData?.caffeine || '2 cups',
        optimal: '< 2 cups',
        status: 'good',
        icon: 'Coffee'
      },
      {
        factor: 'Exercise Timing',
        current: environmentData?.exerciseTime || '6 PM',
        optimal: 'Before 7 PM',
        status: 'good',
        icon: 'Activity'
      }
    ];
  };

  const insights = generateInsights();
  const recommendations = getRecommendations();
  const sleepFactors = getSleepFactors();

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-accent';
      default: return 'border-l-muted';
    }
  };

  const tabs = [
    { id: 'insights', label: 'Insights', icon: 'Lightbulb' },
    { id: 'recommendations', label: 'Tips', icon: 'BookOpen' },
    { id: 'factors', label: 'Factors', icon: 'Settings' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-wellness elevation-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Brain" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Sleep Insights</h3>
            <p className="text-sm text-muted-foreground">Personalized analysis and recommendations</p>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted/30 rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'insights' && (
          <div className="space-y-4">
            {insights?.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${
                  insight?.type === 'positive' ? 'bg-success/10' : 
                  insight?.type === 'warning' ? 'bg-warning/10' : 'bg-accent/10'
                }`}>
                  <Icon name={insight?.icon} size={16} className={insight?.color} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">{insight?.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight?.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            {recommendations?.map((rec, index) => (
              <div key={index} className={`flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border-l-4 ${getPriorityColor(rec?.priority)}`}>
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0">
                  <Icon name={rec?.icon} size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">{rec?.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec?.description}</p>
                  <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                    rec?.priority === 'high' ? 'bg-error/10 text-error' :
                    rec?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
                  }`}>
                    {rec?.priority} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'factors' && (
          <div className="space-y-4">
            {sleepFactors?.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-lg">
                    <Icon name={factor?.icon} size={16} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{factor?.factor}</h4>
                    <p className="text-xs text-muted-foreground">Optimal: {factor?.optimal}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{factor?.current}</div>
                  <div className={`text-xs font-medium ${getStatusColor(factor?.status)}`}>
                    {factor?.status === 'good' ? 'Good' : factor?.status === 'warning' ? 'Needs attention' : 'Poor'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepInsights;