import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InstructionBanner = ({ userRole = 'esg-manager', onDismiss }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [completionData, setCompletionData] = useState({
    completed: 0,
    total: 0,
    percentage: 0
  });
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Mock completion data based on user role
    const mockCompletionData = {
      'esg-manager': { completed: 7, total: 9, percentage: 78 },
      'compliance-officer': { completed: 5, total: 6, percentage: 83 },
      'admin': { completed: 12, total: 15, percentage: 80 },
      'analyst': { completed: 4, total: 5, percentage: 80 }
    };

    setCompletionData(mockCompletionData?.[userRole] || mockCompletionData?.['esg-manager']);
  }, [userRole]);

  const getInstructionsByRole = () => {
    const instructions = {
      'esg-manager': [
        {
          title: "Review Q4 Data Collection",
          description: "Verify all facility data has been uploaded and validated",
          status: "completed",
          icon: "CheckCircle"
        },
        {
          title: "Update Materiality Matrix",
          description: "Assess and update material ESG topics for 2024",
          status: "completed",
          icon: "CheckCircle"
        },
        {
          title: "Generate Compliance Reports",
          description: "Create GRI, SASB, and TCFD disclosure reports",
          status: "in-progress",
          icon: "Clock"
        },
        {
          title: "Stakeholder Review",
          description: "Schedule review meetings with key stakeholders",
          status: "pending",
          icon: "Users"
        }
      ],
      'compliance-officer': [
        {
          title: "Regulatory Compliance Check",
          description: "Ensure all reports meet regulatory requirements",
          status: "completed",
          icon: "Shield"
        },
        {
          title: "Audit Trail Review",
          description: "Verify data integrity and audit trail completeness",
          status: "in-progress",
          icon: "Eye"
        },
        {
          title: "Final Report Approval",
          description: "Review and approve final disclosure documents",
          status: "pending",
          icon: "FileCheck"
        }
      ],
      'admin': [
        {
          title: "System Health Check",
          description: "Monitor system performance and data integrations",
          status: "completed",
          icon: "Activity"
        },
        {
          title: "User Access Review",
          description: "Audit user permissions and access controls",
          status: "completed",
          icon: "UserCheck"
        },
        {
          title: "Backup Verification",
          description: "Ensure all ESG data is properly backed up",
          status: "in-progress",
          icon: "HardDrive"
        }
      ]
    };

    return instructions?.[userRole] || instructions?.['esg-manager'];
  };

  const instructions = getInstructionsByRole();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10';
      case 'in-progress': return 'bg-warning/10';
      case 'pending': return 'bg-muted/50';
      default: return 'bg-muted/50';
    }
  };

  const CircularProgress = ({ percentage, size = 60 }) => {
    const radius = (size - 8) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-border"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={strokeDasharray}
            className="text-primary transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-foreground">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-gradient-to-r from-primary/5 to-success/5 border border-primary/20 rounded-lg transition-all duration-300 ${
      isCollapsed ? 'p-4' : 'p-6'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CircularProgress percentage={completionData?.percentage} size={isCollapsed ? 40 : 60} />
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Q4 2024 Reporting Progress
            </h3>
            {!isCollapsed && (
              <p className="text-sm text-muted-foreground mt-1">
                {completionData?.completed} of {completionData?.total} tasks completed
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={20} />
          </Button>
          {onDismiss && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDismiss}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>
      {/* Expanded Content */}
      {!isCollapsed && (
        <div className="mt-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {completionData?.completed}/{completionData?.total} tasks
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-success h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${completionData?.percentage}%` }}
              />
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {instructions?.map((instruction, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 ${getStatusBg(instruction?.status)} hover:bg-opacity-80`}
              >
                <div className={`${getStatusColor(instruction?.status)}`}>
                  <Icon name={instruction?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">
                    {instruction?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {instruction?.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {instruction?.status === 'completed' && (
                    <span className="text-xs text-success font-medium">Complete</span>
                  )}
                  {instruction?.status === 'in-progress' && (
                    <span className="text-xs text-warning font-medium">In Progress</span>
                  )}
                  {instruction?.status === 'pending' && (
                    <span className="text-xs text-muted-foreground font-medium">Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              Last updated: {new Date()?.toLocaleDateString()} at {new Date()?.toLocaleTimeString()}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="RefreshCw" size={14} className="mr-2" />
                Refresh
              </Button>
              <Button variant="default" size="sm">
                <Icon name="ArrowRight" size={14} className="mr-2" />
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructionBanner;