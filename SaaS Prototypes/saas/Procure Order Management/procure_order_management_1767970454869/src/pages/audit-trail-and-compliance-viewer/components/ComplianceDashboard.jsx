import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const ComplianceDashboard = ({ metrics, records }) => {
  // Prepare data for charts
  const severityData = [
    { name: 'Critical', value: records.filter(r => r.severity === 'critical').length, color: '#EF4444' },
    { name: 'High', value: records.filter(r => r.severity === 'high').length, color: '#F59E0B' },
    { name: 'Medium', value: records.filter(r => r.severity === 'medium').length, color: '#3B82F6' },
    { name: 'Low', value: records.filter(r => r.severity === 'low').length, color: '#10B981' }
  ];

  const actionTypeData = records.reduce((acc, record) => {
    const existing = acc.find(item => item.name === record.actionType);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: record.actionType, value: 1 });
    }
    return acc;
  }, []);

  const complianceFrameworkData = Object.entries(metrics.frameworkCoverage).map(([name, score]) => ({
    name,
    score,
    target: 95
  }));

  // Mock trend data
  const trendData = [
    { month: 'Jan', events: 145, compliance: 92 },
    { month: 'Feb', events: 167, compliance: 94 },
    { month: 'Mar', events: 189, compliance: 91 },
    { month: 'Apr', events: 203, compliance: 96 },
    { month: 'May', events: 178, compliance: 94 },
    { month: 'Jun', events: 156, compliance: 97 }
  ];

  const getComplianceStatus = (score) => {
    if (score >= 95) return { status: 'Excellent', color: 'text-success', bgColor: 'bg-success-50' };
    if (score >= 90) return { status: 'Good', color: 'text-primary', bgColor: 'bg-primary-50' };
    if (score >= 80) return { status: 'Fair', color: 'text-warning', bgColor: 'bg-warning-50' };
    return { status: 'Poor', color: 'text-error', bgColor: 'bg-error-50' };
  };

  const overallStatus = getComplianceStatus(metrics.complianceScore);

  return (
    <div className="h-full overflow-y-auto p-6 bg-background">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface rounded-card p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Overall Compliance</p>
              <p className="text-2xl font-heading-bold text-text-primary">
                {metrics.complianceScore}%
              </p>
              <span className={`inline-flex items-center px-2 py-1 rounded-button text-xs font-body-medium ${overallStatus.bgColor} ${overallStatus.color}`}>
                {overallStatus.status}
              </span>
            </div>
            <div className={`w-12 h-12 rounded-full ${overallStatus.bgColor} flex items-center justify-center`}>
              <Icon name="Shield" size={24} className={overallStatus.color} />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-card p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Events</p>
              <p className="text-2xl font-heading-bold text-text-primary">
                {metrics.totalAuditEvents.toLocaleString()}
              </p>
              <p className="text-xs text-success">+12% from last month</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
              <Icon name="Activity" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-card p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Critical Events</p>
              <p className="text-2xl font-heading-bold text-text-primary">
                {metrics.criticalEvents}
              </p>
              <p className="text-xs text-error">Requires attention</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-error-50 flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-error" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-card p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Last Audit</p>
              <p className="text-lg font-heading-semibold text-text-primary">
                {metrics.lastAuditDate.toLocaleDateString()}
              </p>
              <p className="text-xs text-success">Completed</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-success-50 flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Severity Distribution */}
        <div className="bg-surface rounded-card p-6 border border-border">
          <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
            Event Severity Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {severityData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-text-secondary">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Types */}
        <div className="bg-surface rounded-card p-6 border border-border">
          <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
            Action Types
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={actionTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  stroke="#64748B"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#64748B"
                />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Compliance Framework Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface rounded-card p-6 border border-border">
          <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
            Compliance Framework Scores
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceFrameworkData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  type="number" 
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  stroke="#64748B"
                />
                <YAxis 
                  type="category" 
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="#64748B"
                  width={100}
                />
                <Tooltip />
                <Bar dataKey="score" fill="#10B981" radius={[0, 4, 4, 0]} />
                <Bar dataKey="target" fill="#E2E8F0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance Trend */}
        <div className="bg-surface rounded-card p-6 border border-border">
          <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
            Compliance Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  stroke="#64748B"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#64748B"
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="compliance" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Framework Details */}
      <div className="bg-surface rounded-card p-6 border border-border">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
          Compliance Framework Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(metrics.frameworkCoverage).map(([framework, score]) => {
            const status = getComplianceStatus(score);
            return (
              <div key={framework} className="p-4 border border-border rounded-button">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading-medium text-text-primary">{framework}</h4>
                  <span className={`text-sm font-body-medium ${status.color}`}>
                    {score}%
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      score >= 95 ? 'bg-success' :
                      score >= 90 ? 'bg-primary' :
                      score >= 80 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <p className={`text-xs mt-1 ${status.color}`}>
                  {status.status}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;