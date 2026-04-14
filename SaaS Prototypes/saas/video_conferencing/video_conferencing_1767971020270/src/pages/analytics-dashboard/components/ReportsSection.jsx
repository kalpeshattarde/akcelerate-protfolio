import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportsSection = ({ loading = false }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState('last30days');

  const reportTypes = [
    {
      id: 'usage',
      title: 'Usage Report',
      description: 'Comprehensive meeting usage statistics and trends',
      icon: 'BarChart3',
      format: ['PDF', 'CSV'],
      lastGenerated: '2025-08-24 14:30'
    },
    {
      id: 'performance',
      title: 'Performance Report',
      description: 'System performance metrics and quality analysis',
      icon: 'Activity',
      format: ['PDF', 'CSV'],
      lastGenerated: '2025-08-24 09:15'
    },
    {
      id: 'compliance',
      title: 'Compliance Report',
      description: 'Data retention and security compliance summary',
      icon: 'Shield',
      format: ['PDF'],
      lastGenerated: '2025-08-23 16:45'
    },
    {
      id: 'billing',
      title: 'Billing Report',
      description: 'Usage-based billing and cost analysis',
      icon: 'CreditCard',
      format: ['PDF', 'CSV', 'Excel'],
      lastGenerated: '2025-08-24 11:20'
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Weekly Usage Summary',
      type: 'usage',
      schedule: 'Every Monday at 9:00 AM',
      recipients: ['admin@company.com', 'manager@company.com'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Monthly Performance Review',
      type: 'performance',
      schedule: 'First day of month at 8:00 AM',
      recipients: ['it-team@company.com'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Quarterly Compliance Audit',
      type: 'compliance',
      schedule: 'Every 3 months',
      recipients: ['compliance@company.com'],
      status: 'paused'
    }
  ];

  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
    { value: 'last90days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const handleGenerateReport = (reportId, format) => {
    console.log(`Generating ${reportId} report in ${format} format for ${dateRange}`);
    // Simulate report generation
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-warning';
  };

  const getStatusIcon = (status) => {
    return status === 'active' ? 'CheckCircle' : 'Pause';
  };

  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-48 mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[1, 2, 3, 4]?.map((i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3]?.map((i) => (
              <div key={i} className="h-20 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Reports & Export</h3>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e?.target?.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {dateRangeOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Generation */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Generate Reports</h4>
          <div className="space-y-4">
            {reportTypes?.map((report) => (
              <div key={report?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={report?.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-foreground">{report?.title}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{report?.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last generated: {report?.lastGenerated}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {report?.format?.map((format) => (
                      <Button
                        key={format}
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateReport(report?.id, format)}
                        className="text-xs"
                      >
                        <Icon name="Download" size={14} className="mr-1" />
                        {format}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-foreground">Scheduled Reports</h4>
            <Button variant="outline" size="sm">
              <Icon name="Plus" size={14} className="mr-2" />
              Add Schedule
            </Button>
          </div>
          
          <div className="space-y-4">
            {scheduledReports?.map((schedule) => (
              <div key={schedule?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="text-sm font-medium text-foreground">{schedule?.name}</h5>
                      <Icon 
                        name={getStatusIcon(schedule?.status)} 
                        size={14} 
                        className={getStatusColor(schedule?.status)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{schedule?.schedule}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <p className="mb-1">Recipients:</p>
                  <div className="flex flex-wrap gap-1">
                    {schedule?.recipients?.map((email, index) => (
                      <span key={index} className="bg-muted px-2 py-1 rounded text-xs">
                        {email}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;