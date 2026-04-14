import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const ComplianceReporting = ({ reportingData }) => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const reportOptions = [
    { value: 'overview', label: 'Compliance Overview' },
    { value: 'audit', label: 'Audit Readiness' },
    { value: 'risk', label: 'Risk Assessment' },
    { value: 'regulatory', label: 'Regulatory Compliance' }
  ];

  const periodOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const complianceData = [
    { name: 'GDPR', compliant: 95, nonCompliant: 5 },
    { name: 'SOX', compliant: 88, nonCompliant: 12 },
    { name: 'HIPAA', compliant: 92, nonCompliant: 8 },
    { name: 'PCI DSS', compliant: 97, nonCompliant: 3 },
    { name: 'ISO 27001', compliant: 85, nonCompliant: 15 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 65, color: '#059669' },
    { name: 'Medium Risk', value: 25, color: '#0EA5E9' },
    { name: 'High Risk', value: 8, color: '#D97706' },
    { name: 'Critical Risk', value: 2, color: '#DC2626' }
  ];

  const trendData = [
    { month: 'Jan', compliance: 85 },
    { month: 'Feb', compliance: 87 },
    { month: 'Mar', compliance: 89 },
    { month: 'Apr', compliance: 91 },
    { month: 'May', compliance: 93 },
    { month: 'Jun', compliance: 95 }
  ];

  const generateReport = () => {
    console.log('Generating report:', selectedReport, selectedPeriod);
    // Implement report generation logic
  };

  const scheduleReport = () => {
    console.log('Scheduling report:', selectedReport);
    // Implement report scheduling logic
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="bg-surface p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Compliance Reports</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={scheduleReport}>
              <Icon name="Clock" size={16} className="mr-2" />
              Schedule
            </Button>
            <Button variant="default" size="sm" onClick={generateReport}>
              <Icon name="Download" size={16} className="mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Report Type"
            options={reportOptions}
            value={selectedReport}
            onChange={setSelectedReport}
          />
          <Select
            label="Time Period"
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
          />
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-border">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">92%</div>
              <div className="text-sm text-muted-foreground">Overall Compliance</div>
            </div>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-border">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">23</div>
              <div className="text-sm text-muted-foreground">Open Issues</div>
            </div>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-border">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Contracts Reviewed</div>
            </div>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-border">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-error" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">5</div>
              <div className="text-sm text-muted-foreground">Upcoming Audits</div>
            </div>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance by Regulation */}
        <div className="bg-surface p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Compliance by Regulation</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="compliant" fill="#059669" name="Compliant" />
                <Bar dataKey="nonCompliant" fill="#DC2626" name="Non-Compliant" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-surface p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Risk Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Compliance Trend */}
      <div className="bg-surface p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Compliance Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="compliance" stroke="#0EA5E9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Scheduled Reports */}
      <div className="bg-surface p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Scheduled Reports</h3>
          <Button variant="outline" size="sm">
            <Icon name="Plus" size={16} className="mr-2" />
            Add Schedule
          </Button>
        </div>
        <div className="space-y-3">
          {reportingData?.scheduledReports?.map((report) => (
            <div key={report?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={20} className="text-accent" />
                <div>
                  <div className="font-medium text-text-primary">{report?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {report?.frequency} • Next: {report?.nextRun}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Edit3" size={14} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceReporting;