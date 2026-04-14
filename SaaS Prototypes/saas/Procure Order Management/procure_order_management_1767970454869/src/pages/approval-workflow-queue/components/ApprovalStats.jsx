import React from 'react';
import Icon from '../../../components/AppIcon';

const ApprovalStats = ({ totalPending, urgentCount, overdueCount, userRole }) => {
  const stats = [
    {
      label: 'Pending Approvals',
      value: totalPending,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200'
    },
    {
      label: 'Urgent Items',
      value: urgentCount,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200'
    },
    {
      label: 'Overdue',
      value: overdueCount,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200'
    },
    {
      label: 'My Approval Limit',
      value: userRole === 'admin' ? '$100K' : userRole === 'finance' ? '$50K' : '$10K',
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 rounded-card border ${stat.borderColor} ${stat.bgColor} transition-smooth hover:shadow-elevation-sm`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
              <p className={`text-2xl font-heading-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApprovalStats;