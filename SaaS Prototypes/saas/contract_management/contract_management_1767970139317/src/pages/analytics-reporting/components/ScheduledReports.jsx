import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ScheduledReports = () => {
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: 1,
      name: 'Monthly Contract Summary',
      description: 'Comprehensive overview of contract activities and metrics',
      schedule: 'monthly',
      format: 'pdf',
      recipients: ['john.doe@company.com', 'legal@company.com'],
      lastRun: '2024-08-01T09:00:00Z',
      nextRun: '2024-09-01T09:00:00Z',
      status: 'active',
      reportType: 'summary'
    },
    {
      id: 2,
      name: 'Weekly Compliance Report',
      description: 'Compliance status and risk indicators',
      schedule: 'weekly',
      format: 'excel',
      recipients: ['compliance@company.com', 'audit@company.com'],
      lastRun: '2024-08-26T08:00:00Z',
      nextRun: '2024-09-02T08:00:00Z',
      status: 'active',
      reportType: 'compliance'
    },
    {
      id: 3,
      name: 'Quarterly Financial Analysis',
      description: 'Financial performance and spend analysis',
      schedule: 'quarterly',
      format: 'pdf',
      recipients: ['finance@company.com', 'cfo@company.com'],
      lastRun: '2024-07-01T10:00:00Z',
      nextRun: '2024-10-01T10:00:00Z',
      status: 'active',
      reportType: 'financial'
    },
    {
      id: 4,
      name: 'Daily Approval Status',
      description: 'Pending approvals and workflow status',
      schedule: 'daily',
      format: 'email',
      recipients: ['approvers@company.com'],
      lastRun: '2024-09-03T07:00:00Z',
      nextRun: '2024-09-04T07:00:00Z',
      status: 'paused',
      reportType: 'workflow'
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    name: '',
    description: '',
    schedule: 'weekly',
    format: 'pdf',
    recipients: '',
    reportType: 'summary',
    includeCharts: true,
    includeDetails: true
  });

  const scheduleOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'email', label: 'Email Summary' },
    { value: 'csv', label: 'CSV Data' }
  ];

  const reportTypeOptions = [
    { value: 'summary', label: 'Executive Summary' },
    { value: 'compliance', label: 'Compliance Report' },
    { value: 'financial', label: 'Financial Analysis' },
    { value: 'workflow', label: 'Workflow Status' },
    { value: 'vendor', label: 'Vendor Performance' },
    { value: 'risk', label: 'Risk Assessment' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'paused': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'paused': return 'Pause';
      case 'error': return 'AlertCircle';
      default: return 'Clock';
    }
  };

  const getScheduleIcon = (schedule) => {
    switch (schedule) {
      case 'daily': return 'Calendar';
      case 'weekly': return 'CalendarDays';
      case 'monthly': return 'CalendarRange';
      case 'quarterly': return 'CalendarClock';
      default: return 'Clock';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleToggleStatus = (reportId) => {
    setScheduledReports(reports =>
      reports?.map(report =>
        report?.id === reportId
          ? { ...report, status: report?.status === 'active' ? 'paused' : 'active' }
          : report
      )
    );
  };

  const handleRunNow = (reportId) => {
    console.log('Running report:', reportId);
    // Implement immediate report generation
  };

  const handleDeleteReport = (reportId) => {
    setScheduledReports(reports => reports?.filter(report => report?.id !== reportId));
  };

  const handleCreateReport = () => {
    const report = {
      id: Date.now(),
      ...newReport,
      recipients: newReport?.recipients?.split(',')?.map(email => email?.trim()),
      lastRun: null,
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000)?.toISOString(),
      status: 'active'
    };
    
    setScheduledReports([...scheduledReports, report]);
    setNewReport({
      name: '',
      description: '',
      schedule: 'weekly',
      format: 'pdf',
      recipients: '',
      reportType: 'summary',
      includeCharts: true,
      includeDetails: true
    });
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-text-primary">Scheduled Reports</h2>
          <p className="text-sm text-muted-foreground">
            Automated report generation and distribution
          </p>
        </div>
        <Button
          variant="default"
          onClick={() => setIsCreateModalOpen(true)}
          iconName="Plus"
          iconPosition="left"
        >
          New Schedule
        </Button>
      </div>
      {/* Reports List */}
      <div className="space-y-4">
        {scheduledReports?.map((report) => (
          <div key={report?.id} className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-medium text-text-primary">{report?.name}</h3>
                  <div className={`flex items-center space-x-1 ${getStatusColor(report?.status)}`}>
                    <Icon name={getStatusIcon(report?.status)} size={14} />
                    <span className="text-sm capitalize">{report?.status}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{report?.description}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRunNow(report?.id)}
                  iconName="Play"
                  iconPosition="left"
                >
                  Run Now
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleStatus(report?.id)}
                  className="h-8 w-8"
                >
                  <Icon name={report?.status === 'active' ? 'Pause' : 'Play'} size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteReport(report?.id)}
                  className="h-8 w-8 text-error hover:text-error"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name={getScheduleIcon(report?.schedule)} size={14} />
                  <span>Schedule</span>
                </div>
                <p className="text-sm font-medium text-text-primary capitalize">
                  {report?.schedule}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="FileText" size={14} />
                  <span>Format</span>
                </div>
                <p className="text-sm font-medium text-text-primary uppercase">
                  {report?.format}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>Last Run</span>
                </div>
                <p className="text-sm font-medium text-text-primary">
                  {report?.lastRun ? formatDate(report?.lastRun) : 'Never'}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="CalendarClock" size={14} />
                  <span>Next Run</span>
                </div>
                <p className="text-sm font-medium text-text-primary">
                  {formatDate(report?.nextRun)}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Mail" size={14} />
                    <span>Recipients ({report?.recipients?.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {report?.recipients?.slice(0, 3)?.map((email, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-xs rounded-full text-text-primary"
                      >
                        {email}
                      </span>
                    ))}
                    {report?.recipients?.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-xs rounded-full text-muted-foreground">
                        +{report?.recipients?.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Report Type</div>
                  <div className="text-sm font-medium text-text-primary capitalize">
                    {report?.reportType?.replace('_', ' ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Create Report Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300">
          <div className="bg-surface border border-border rounded-lg shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">Create Scheduled Report</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCreateModalOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Report Name"
                  placeholder="Enter report name"
                  value={newReport?.name}
                  onChange={(e) => setNewReport({...newReport, name: e?.target?.value})}
                  required
                />
                <Select
                  label="Report Type"
                  options={reportTypeOptions}
                  value={newReport?.reportType}
                  onChange={(value) => setNewReport({...newReport, reportType: value})}
                />
              </div>

              <Input
                label="Description"
                placeholder="Brief description of the report"
                value={newReport?.description}
                onChange={(e) => setNewReport({...newReport, description: e?.target?.value})}
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Schedule"
                  options={scheduleOptions}
                  value={newReport?.schedule}
                  onChange={(value) => setNewReport({...newReport, schedule: value})}
                />
                <Select
                  label="Format"
                  options={formatOptions}
                  value={newReport?.format}
                  onChange={(value) => setNewReport({...newReport, format: value})}
                />
              </div>

              <Input
                label="Recipients"
                placeholder="Enter email addresses separated by commas"
                value={newReport?.recipients}
                onChange={(e) => setNewReport({...newReport, recipients: e?.target?.value})}
                description="Separate multiple email addresses with commas"
                required
              />

              <div className="space-y-4">
                <h4 className="font-medium text-text-primary">Report Options</h4>
                <div className="space-y-3">
                  <Checkbox
                    label="Include Charts and Visualizations"
                    checked={newReport?.includeCharts}
                    onChange={(e) => setNewReport({...newReport, includeCharts: e?.target?.checked})}
                  />
                  <Checkbox
                    label="Include Detailed Data Tables"
                    checked={newReport?.includeDetails}
                    onChange={(e) => setNewReport({...newReport, includeDetails: e?.target?.checked})}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleCreateReport}
                disabled={!newReport?.name || !newReport?.recipients}
              >
                Create Schedule
              </Button>
            </div>
          </div>
        </div>
      )}
      {scheduledReports?.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No scheduled reports</p>
          <p className="text-sm">Create your first automated report to get started</p>
        </div>
      )}
    </div>
  );
};

export default ScheduledReports;