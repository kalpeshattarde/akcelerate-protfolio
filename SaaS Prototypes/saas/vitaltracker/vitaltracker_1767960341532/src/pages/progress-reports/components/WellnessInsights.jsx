import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WellnessInsights = () => {
  const [selectedInsight, setSelectedInsight] = useState(null);

  const insights = [
    {
      id: 1,
      type: 'positive',
      category: 'Activity',
      title: "Excellent Activity Consistency",
      summary: "Your step count has increased by 23% over the past month",
      details: `Your daily activity levels show remarkable improvement with an average of 12,500 steps per day. This represents a 23% increase from last month.\n\nKey observations:\n• Most active days: Tuesday and Thursday\n• Peak activity time: 2-4 PM\n• Weekend activity slightly lower but still above target\n\nRecommendation: Continue your current routine and consider adding strength training twice a week.`,
      icon: 'TrendingUp',
      color: 'success',
      actionable: true,
      priority: 'high'
    },
    {
      id: 2,
      type: 'warning',
      category: 'Sleep',
      title: "Sleep Quality Needs Attention",
      summary: "Your sleep duration has decreased by 45 minutes on average",
      details: `Analysis of your sleep patterns reveals a concerning trend of reduced sleep duration over the past two weeks.\n\nConcerns identified:\n• Average sleep time: 6.2 hours (target: 7-8 hours)\n• Frequent late bedtimes after 11:30 PM\n• Weekend sleep debt accumulation\n• Inconsistent sleep schedule\n\nRecommendation: Establish a consistent bedtime routine and aim for 7-8 hours of sleep nightly.`,
      icon: 'AlertTriangle',
      color: 'warning',
      actionable: true,
      priority: 'high'
    },
    {
      id: 3,
      type: 'positive',
      category: 'Nutrition',
      title: "Balanced Calorie Management",
      summary: "You\'ve maintained a healthy calorie balance for 3 weeks",
      details: `Your nutrition tracking shows excellent balance between calorie intake and expenditure.\n\nPositive trends:\n• Average daily intake: 2,100 calories (within target range)\n• Protein intake: 25% of total calories (excellent)\n• Hydration levels: 2.8L daily average\n• Consistent meal timing\n\nRecommendation: Continue current eating patterns and consider adding more variety in vegetable intake.`,
      icon: 'CheckCircle',
      color: 'success',
      actionable: false,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'info',
      category: 'Hydration',
      title: "Hydration Pattern Analysis",
      summary: "Morning hydration could be improved for better energy levels",
      details: `Your hydration data reveals interesting patterns that could optimize your energy levels throughout the day.\n\nObservations:\n• Daily average: 2.8L (meeting target)\n• Morning intake (6-10 AM): Only 15% of daily total\n• Afternoon peak: 2-6 PM (45% of intake)\n• Evening tapering: Good for sleep quality\n\nRecommendation: Increase morning water intake by 1-2 glasses to boost morning energy and metabolism.`,
      icon: 'Info',
      color: 'accent',
      actionable: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'positive',
      category: 'Overall',
      title: "Wellness Score Improvement",
      summary: "Your overall wellness score has improved by 18 points this month",
      details: `Comprehensive analysis shows significant improvement across multiple health metrics.\n\nScore breakdown:\n• Activity: 92/100 (+15 points)\n• Nutrition: 88/100 (+12 points)\n• Sleep: 75/100 (-3 points)\n• Hydration: 85/100 (+8 points)\n• Overall: 85/100 (+18 points)\n\nRecommendation: Focus on sleep quality improvement to achieve an overall score above 90.`,
      icon: 'Award',
      color: 'primary',
      actionable: true,
      priority: 'medium'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      accent: 'bg-accent/10 text-accent border-accent/20',
      primary: 'bg-primary/10 text-primary border-primary/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      high: { label: 'High Priority', color: 'bg-error text-error-foreground' },
      medium: { label: 'Medium', color: 'bg-warning text-warning-foreground' },
      low: { label: 'Low Priority', color: 'bg-muted text-muted-foreground' }
    };
    return priorityMap?.[priority] || priorityMap?.medium;
  };

  return (
    <div className="bg-card rounded-xl p-6 elevation-2 border border-border/40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Brain" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Wellness Insights</h3>
            <p className="text-sm text-muted-foreground">AI-powered health recommendations</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="RefreshCw">
          Refresh Insights
        </Button>
      </div>
      <div className="space-y-4">
        {insights?.map((insight) => (
          <div
            key={insight?.id}
            className={`
              border rounded-lg p-4 transition-all duration-200 cursor-pointer hover:shadow-wellness-sm
              ${selectedInsight === insight?.id ? 'ring-2 ring-primary/30' : ''}
              ${getColorClasses(insight?.color)}
            `}
            onClick={() => setSelectedInsight(selectedInsight === insight?.id ? null : insight?.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0
                  ${insight?.color === 'success' ? 'bg-success/20' : 
                    insight?.color === 'warning' ? 'bg-warning/20' :
                    insight?.color === 'accent' ? 'bg-accent/20' : 'bg-primary/20'
                  }
                `}>
                  <Icon name={insight?.icon} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-base font-semibold text-foreground">{insight?.title}</h4>
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${getPriorityBadge(insight?.priority)?.color}
                    `}>
                      {getPriorityBadge(insight?.priority)?.label}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{insight?.summary}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Tag" size={12} />
                      <span>{insight?.category}</span>
                    </span>
                    {insight?.actionable && (
                      <span className="flex items-center space-x-1">
                        <Icon name="Target" size={12} />
                        <span>Actionable</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={selectedInsight === insight?.id ? "ChevronUp" : "ChevronDown"}
                />
              </div>
            </div>

            {selectedInsight === insight?.id && (
              <div className="mt-4 pt-4 border-t border-border/20 animate-fade-in">
                <div className="prose prose-sm max-w-none">
                  {insight?.details?.split('\n')?.map((paragraph, index) => (
                    <p key={index} className="text-sm text-muted-foreground mb-2 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {insight?.actionable && (
                  <div className="flex items-center space-x-2 mt-4">
                    <Button variant="default" size="sm" iconName="Target">
                      Set Goal
                    </Button>
                    <Button variant="outline" size="sm" iconName="Calendar">
                      Schedule Reminder
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Share2">
                      Share Insight
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-6 border-t border-border/40 space-y-3 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          {insights?.length} insights generated • Last updated: Oct 11, 2024
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export Insights
          </Button>
          <Button variant="ghost" size="sm" iconName="Settings">
            Insight Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WellnessInsights;