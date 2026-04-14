import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CompletionStatusIndicator = ({ 
  framework = 'overall',
  showDetails = false,
  onToggleDetails 
}) => {
  const [statusData, setStatusData] = useState({});
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    // Mock completion status data
    const mockStatusData = {
      overall: {
        completion: 82,
        sections: {
          total: 45,
          completed: 37,
          inProgress: 5,
          pending: 3
        },
        frameworks: {
          gri: { completion: 90, status: 'ready' },
          sasb: { completion: 85, status: 'warning' },
          tcfd: { completion: 72, status: 'behind' }
        },
        lastUpdated: '2024-12-07T10:30:00',
        nextMilestone: 'SASB Report Review',
        milestoneDate: '2024-12-12'
      },
      gri: {
        completion: 90,
        sections: {
          total: 15,
          completed: 14,
          inProgress: 1,
          pending: 0
        },
        categories: [
          { name: 'Organizational Profile', completion: 100, status: 'complete' },
          { name: 'Strategy', completion: 95, status: 'complete' },
          { name: 'Ethics & Integrity', completion: 100, status: 'complete' },
          { name: 'Governance', completion: 90, status: 'in-progress' },
          { name: 'Stakeholder Engagement', completion: 85, status: 'in-progress' }
        ],
        lastUpdated: '2024-12-05T14:20:00',
        nextMilestone: 'Final Review',
        milestoneDate: '2024-12-28'
      },
      sasb: {
        completion: 85,
        sections: {
          total: 12,
          completed: 10,
          inProgress: 2,
          pending: 0
        },
        categories: [
          { name: 'General Issues', completion: 100, status: 'complete' },
          { name: 'Industry Metrics', completion: 80, status: 'in-progress' },
          { name: 'Activity Metrics', completion: 90, status: 'complete' },
          { name: 'Forward-Looking', completion: 70, status: 'in-progress' }
        ],
        lastUpdated: '2024-12-04T16:45:00',
        nextMilestone: 'Industry Metrics Validation',
        milestoneDate: '2024-12-15'
      },
      tcfd: {
        completion: 72,
        sections: {
          total: 11,
          completed: 8,
          inProgress: 2,
          pending: 1
        },
        categories: [
          { name: 'Governance', completion: 95, status: 'complete' },
          { name: 'Strategy', completion: 60, status: 'in-progress' },
          { name: 'Risk Management', completion: 75, status: 'in-progress' },
          { name: 'Metrics & Targets', completion: 80, status: 'complete' }
        ],
        lastUpdated: '2024-12-03T11:15:00',
        nextMilestone: 'Scenario Analysis Completion',
        milestoneDate: '2024-12-20'
      }
    };

    setStatusData(mockStatusData);

    // Animate progress ring
    let progress = 0;
    const targetProgress = mockStatusData?.[framework]?.completion || 0;
    const animationDuration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = targetProgress / steps;
    const stepDuration = animationDuration / steps;

    const animate = () => {
      if (progress < targetProgress) {
        progress += increment;
        setAnimationProgress(Math.min(progress, targetProgress));
        setTimeout(animate, stepDuration);
      }
    };

    setTimeout(animate, 300); // Start animation after component mount
  }, [framework]);

  const data = statusData?.[framework];
  if (!data) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'text-success';
      case 'in-progress': return 'text-primary';
      case 'pending': return 'text-muted-foreground';
      case 'ready': return 'text-success';
      case 'warning': return 'text-warning';
      case 'behind': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'pending': return 'Circle';
      case 'ready': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'behind': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const getProgressColor = (completion) => {
    if (completion >= 90) return 'text-success';
    if (completion >= 70) return 'text-primary';
    if (completion >= 50) return 'text-warning';
    return 'text-error';
  };

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animationProgress / 100) * circumference;

  return (
    <div className="bg-card border border-border rounded-lg shadow-card h-full flex flex-col">
      {/* Header - Standardized Padding */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-8">
            <h3 className="font-semibold text-foreground text-lg">
              {framework === 'overall' ? 'Overall Progress' : `${framework?.toUpperCase()} Progress`}
            </h3>
            <p className="text-sm text-muted-foreground">
              Last updated {new Date(data.lastUpdated)?.toLocaleDateString()}
            </p>
          </div>
          <div className="col-span-4 flex justify-end">
            {onToggleDetails && (
              <button
                onClick={onToggleDetails}
                className="text-primary hover:text-primary/80 transition-colors duration-150"
              >
                <Icon name={showDetails ? "ChevronUp" : "ChevronDown"} size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Ring - Centered Layout */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-32 h-32">
            {/* Background Circle */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted opacity-20"
              />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className={`transition-all duration-1000 ease-out ${getProgressColor(data?.completion)}`}
              />
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-3xl font-bold ${getProgressColor(data?.completion)}`}>
                {Math.round(animationProgress)}%
              </div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Unified Layout */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">{data?.sections?.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{data?.sections?.inProgress}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground mb-1">{data?.sections?.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
        </div>

        {/* Framework Breakdown (Overall only) */}
        {framework === 'overall' && data?.frameworks && (
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-4">Framework Status</h4>
            <div className="space-y-4">
              {Object.entries(data?.frameworks)?.map(([key, fw]) => (
                <div key={key} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1">
                    <Icon 
                      name={getStatusIcon(fw?.status)} 
                      size={16} 
                      className={getStatusColor(fw?.status)}
                    />
                  </div>
                  <div className="col-span-4">
                    <span className="font-medium text-foreground">
                      {key?.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-span-5">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          fw?.completion >= 90 ? 'bg-success' :
                          fw?.completion >= 70 ? 'bg-primary' :
                          fw?.completion >= 50 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${fw?.completion}%` }}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-sm font-medium text-foreground">
                      {fw?.completion}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Breakdown (Framework specific) */}
        {framework !== 'overall' && data?.categories && showDetails && (
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-4">Section Details</h4>
            <div className="space-y-4">
              {data?.categories?.map((category, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1">
                    <Icon 
                      name={getStatusIcon(category?.status)} 
                      size={14} 
                      className={getStatusColor(category?.status)}
                    />
                  </div>
                  <div className="col-span-6">
                    <span className="text-sm text-foreground">
                      {category?.name}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          category?.completion >= 90 ? 'bg-success' :
                          category?.completion >= 70 ? 'bg-primary' :
                          category?.completion >= 50 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${category?.completion}%` }}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-xs font-medium text-foreground">
                      {category?.completion}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Next Milestone - Standardized Footer */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-8">
            <div className="text-sm font-medium text-foreground mb-1">Next Milestone</div>
            <div className="text-sm text-muted-foreground">{data?.nextMilestone}</div>
          </div>
          <div className="col-span-4 text-right">
            <div className="text-sm font-medium text-foreground mb-1">
              {new Date(data.milestoneDate)?.toLocaleDateString()}
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.ceil((new Date(data.milestoneDate) - new Date()) / (1000 * 60 * 60 * 24))} days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionStatusIndicator;