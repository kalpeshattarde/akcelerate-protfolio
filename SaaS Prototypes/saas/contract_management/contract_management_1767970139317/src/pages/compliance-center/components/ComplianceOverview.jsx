import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceOverview = ({ complianceData }) => {
  const getStatusColor = (percentage) => {
    if (percentage >= 95) return 'text-success';
    if (percentage >= 85) return 'text-warning';
    return 'text-error';
  };

  const getStatusBg = (percentage) => {
    if (percentage >= 95) return 'bg-success/10 border-success/20';
    if (percentage >= 85) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {complianceData?.map((framework) => (
        <div
          key={framework?.id}
          className={`p-6 rounded-lg border ${getStatusBg(framework?.percentage)} transition-smooth hover:shadow-elevated`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${getStatusBg(framework?.percentage)} flex items-center justify-center`}>
                <Icon name={framework?.icon} size={20} className={getStatusColor(framework?.percentage)} />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{framework?.name}</h3>
                <p className="text-sm text-muted-foreground">{framework?.type}</p>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getStatusColor(framework?.percentage)}`}>
              {framework?.percentage}%
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Compliant Contracts</span>
              <span className="font-medium text-text-primary">{framework?.compliantContracts}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Issues Outstanding</span>
              <span className={`font-medium ${framework?.outstandingIssues > 0 ? 'text-error' : 'text-success'}`}>
                {framework?.outstandingIssues}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Next Audit</span>
              <span className="font-medium text-text-primary">{framework?.nextAudit}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  framework?.percentage >= 95 ? 'bg-success' :
                  framework?.percentage >= 85 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${framework?.percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplianceOverview;