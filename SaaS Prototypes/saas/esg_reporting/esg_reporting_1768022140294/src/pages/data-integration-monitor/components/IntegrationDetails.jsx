import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const IntegrationDetails = ({ integration, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!integration) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-card p-8 text-center hidden">
        <Icon name="Database" size={32} className="mx-auto mb-3 text-muted-foreground opacity-50" />
        <p className="text-sm text-muted-foreground">Select an integration to view details</p>
      </div>);

  }

  const performanceData = [
  { time: '00:00', responseTime: 120, throughput: 850 },
  { time: '04:00', responseTime: 95, throughput: 920 },
  { time: '08:00', responseTime: 180, throughput: 1200 },
  { time: '12:00', responseTime: 220, throughput: 1450 },
  { time: '16:00', responseTime: 160, throughput: 1100 },
  { time: '20:00', responseTime: 140, throughput: 980 }];


  const errorTrendData = [
  { date: '12/01', errors: 2, warnings: 5 },
  { date: '12/02', errors: 1, warnings: 3 },
  { date: '12/03', errors: 4, warnings: 8 },
  { date: '12/04', errors: 0, warnings: 2 },
  { date: '12/05', errors: 3, warnings: 6 },
  { date: '12/06', errors: 1, warnings: 4 },
  { date: '12/07', errors: 2, warnings: 3 }];


  const connectionParams = [
  { key: 'Endpoint', value: integration?.endpoint || 'https://api.example.com/v1' },
  { key: 'Protocol', value: integration?.protocol || 'HTTPS' },
  { key: 'Authentication', value: integration?.auth || 'OAuth 2.0' },
  { key: 'Timeout', value: integration?.timeout || '30 seconds' },
  { key: 'Retry Policy', value: integration?.retryPolicy || '3 attempts' },
  { key: 'Rate Limit', value: integration?.rateLimit || '100 req/min' }];


  const dataMappings = [
  { source: 'energy_consumption', target: 'esg_energy_used', status: 'active', lastMapped: '2 hours ago' },
  { source: 'co2_emissions', target: 'esg_co2_emissions', status: 'active', lastMapped: '2 hours ago' },
  { source: 'water_usage', target: 'esg_water_consumed', status: 'warning', lastMapped: '1 day ago' },
  { source: 'waste_data', target: 'esg_waste_recycled', status: 'active', lastMapped: '2 hours ago' },
  { source: 'employee_count', target: 'esg_social_metrics', status: 'error', lastMapped: '3 days ago' }];


  const recentLogs = [
  {
    timestamp: '2025-01-07 04:45:00',
    level: 'INFO',
    message: 'Data sync completed successfully. 1,247 records processed.',
    details: 'Processed energy consumption data for December 2024'
  },
  {
    timestamp: '2025-01-07 04:30:00',
    level: 'WARN',
    message: 'Rate limit approaching. Current usage: 85/100 requests per minute.',
    details: 'Consider implementing request throttling'
  },
  {
    timestamp: '2025-01-07 04:15:00',
    level: 'ERROR',
    message: 'Failed to map employee_count field. Data type mismatch.',
    details: 'Expected integer, received string value "N/A"'
  },
  {
    timestamp: '2025-01-07 04:00:00',
    level: 'INFO',
    message: 'Connection test successful. Response time: 145ms.',
    details: 'All endpoints responding within acceptable limits'
  }];


  // Mock compliance data
  const complianceMetrics = [
  { framework: 'GRI Standards', status: 'compliant', coverage: 95, lastAudit: '2024-12-15' },
  { framework: 'SASB', status: 'warning', coverage: 78, lastAudit: '2024-12-10' },
  { framework: 'TCFD', status: 'compliant', coverage: 88, lastAudit: '2024-12-20' },
  { framework: 'EU Taxonomy', status: 'pending', coverage: 65, lastAudit: '2024-11-30' }];


  const tabs = [
  { id: 'overview', label: 'Overview', icon: 'Info' },
  { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
  { id: 'mapping', label: 'Data Mapping', icon: 'ArrowRightLeft' },
  { id: 'logs', label: 'Logs', icon: 'FileText' }];


  const getStatusColor = (status) => {
    switch (status) {
      case 'active':case 'compliant':return 'text-success bg-success/10';
      case 'warning':return 'text-warning bg-warning/10';
      case 'error':return 'text-error bg-error/10';
      case 'pending':return 'text-muted-foreground bg-muted/50';
      default:return 'text-muted-foreground bg-muted';
    }
  };

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'ERROR':return 'text-error bg-error/10';
      case 'WARN':return 'text-warning bg-warning/10';
      case 'INFO':return 'text-primary bg-primary/10';
      default:return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          integration?.category === 'erp' ? 'bg-primary/10 text-primary' :
          integration?.category === 'facility' ? 'bg-secondary/10 text-secondary' :
          integration?.category === 'sustainability' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`
          }>
            <Icon name={integration?.icon} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{integration?.name}</h3>
            <p className="text-sm text-muted-foreground">{integration?.type}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={16} />
        </Button>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-1 p-1">
          {tabs?.map((tab) =>
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
            activeTab === tab?.id ?
            'bg-primary text-primary-foreground' :
            'text-muted-foreground hover:text-foreground hover:bg-muted'}`
            }>

              <Icon name={tab?.icon} size={14} />
              <span>{tab?.label}</span>
            </button>
          )}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'overview' &&
        <div className="space-y-6">
            {/* Integration Status - Fixed Horizontal Layout */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Integration Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Status Indicator */}
                <div className="bg-muted/30 rounded-lg p-4 flex flex-col justify-between min-h-[80px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration?.status)}`}>
                      <Icon name="CheckCircle" size={12} />
                      <span className="capitalize">{integration?.status}</span>
                    </div>
                  </div>
                </div>

                {/* Last Sync */}
                <div className="bg-muted/30 rounded-lg p-4 flex flex-col justify-between min-h-[80px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Sync</span>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {new Date(integration.lastSync)?.toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(integration.lastSync)?.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Records Count */}
                <div className="bg-muted/30 rounded-lg p-4 flex flex-col justify-between min-h-[80px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Records</span>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {integration?.recordCount?.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        +{integration?.newRecords} today
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Count */}
                <div className="bg-muted/30 rounded-lg p-4 flex flex-col justify-between min-h-[80px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Errors</span>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                    integration?.errorCount > 0 ? 'text-error' : 'text-success'}`
                    }>
                        {integration?.errorCount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {integration?.errorCount > 0 ? 'needs attention' : 'all good'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Progress - Enhanced Horizontal Layout */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Compliance Progress</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {complianceMetrics?.map((metric, index) =>
              <div key={index} className="bg-muted/30 rounded-lg p-4 flex flex-col justify-between min-h-[120px]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-foreground">{metric?.framework}</span>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric?.status)}`}>
                        {metric?.status}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Coverage</span>
                        <span className="text-xs font-medium text-foreground">{metric?.coverage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                      metric?.coverage >= 90 ? 'bg-success' :
                      metric?.coverage >= 70 ? 'bg-warning' : 'bg-error'}`
                      }
                      style={{ width: `${metric?.coverage}%` }} />

                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last audit: {new Date(metric?.lastAudit)?.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </div>

            {/* Connection Parameters - Updated for better horizontal flow */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Connection Parameters</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {connectionParams?.map((param, index) =>
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">{param?.key}</span>
                    <span className="text-sm font-medium text-foreground truncate ml-2">{param?.value}</span>
                  </div>
              )}
              </div>
            </div>

            {/* Quick Actions - Horizontal Layout */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Icon name="RefreshCw" size={14} className="mr-2" />
                  Sync Now
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Icon name="Zap" size={14} className="mr-2" />
                  Test Connection
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Icon name="Settings" size={14} className="mr-2" />
                  Configure
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Icon name="Download" size={14} className="mr-2" />
                  Export Logs
                </Button>
              </div>
            </div>
          </div>
        }

        {activeTab === 'performance' &&
        <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground">145ms</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground">1.2K</div>
                <div className="text-sm text-muted-foreground">Records/Hour</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-foreground">99.8%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>

            {/* Response Time Chart */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Response Time (24h)</h4>
              <div className="h-64 bg-muted/30 rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }} />

                    <Line
                    type="monotone"
                    dataKey="responseTime"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }} />

                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Error Trend */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Error Trend (7 days)</h4>
              <div className="h-64 bg-muted/30 rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={errorTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }} />

                    <Area
                    type="monotone"
                    dataKey="errors"
                    stackId="1"
                    stroke="var(--color-error)"
                    fill="var(--color-error)"
                    fillOpacity={0.6} />

                    <Area
                    type="monotone"
                    dataKey="warnings"
                    stackId="1"
                    stroke="var(--color-warning)"
                    fill="var(--color-warning)"
                    fillOpacity={0.6} />

                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        }

        {activeTab === 'mapping' &&
        <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Data Field Mappings</h4>
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={14} className="mr-2" />
                Add Mapping
              </Button>
            </div>
            
            <div className="space-y-2">
              {dataMappings?.map((mapping, index) =>
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-foreground">{mapping?.source}</div>
                    <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">{mapping?.target}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mapping?.status)}`}>
                      {mapping?.status}
                    </div>
                    <span className="text-xs text-muted-foreground">{mapping?.lastMapped}</span>
                    <Button variant="ghost" size="icon">
                      <Icon name="Settings" size={12} />
                    </Button>
                  </div>
                </div>
            )}
            </div>
          </div>
        }

        {activeTab === 'logs' &&
        <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Recent Activity</h4>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Filter" size={14} className="mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={14} className="mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {recentLogs?.map((log, index) =>
            <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getLogLevelColor(log?.level)}`}>
                        {log?.level}
                      </div>
                      <span className="text-xs text-muted-foreground">{log?.timestamp}</span>
                    </div>
                  </div>
                  <div className="text-sm text-foreground mb-1">{log?.message}</div>
                  <div className="text-xs text-muted-foreground">{log?.details}</div>
                </div>
            )}
            </div>
          </div>
        }
      </div>
    </div>);

};

export default IntegrationDetails;