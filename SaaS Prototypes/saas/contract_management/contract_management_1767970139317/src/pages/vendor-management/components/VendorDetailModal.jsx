import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const VendorDetailModal = ({ vendor, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !vendor) return null;

  const performanceData = [
    { month: 'Jan', delivery: 95, quality: 92, cost: 88 },
    { month: 'Feb', delivery: 93, quality: 94, cost: 90 },
    { month: 'Mar', delivery: 97, quality: 91, cost: 85 },
    { month: 'Apr', delivery: 94, quality: 96, cost: 92 },
    { month: 'May', delivery: 96, quality: 93, cost: 89 },
    { month: 'Jun', delivery: 98, quality: 95, cost: 91 }
  ];

  const spendData = [
    { name: 'Q1', value: 125000 },
    { name: 'Q2', value: 180000 },
    { name: 'Q3', value: 165000 },
    { name: 'Q4', value: 195000 }
  ];

  const contractData = [
    { type: 'Active', value: 12, color: '#059669' },
    { type: 'Pending', value: 3, color: '#D97706' },
    { type: 'Expired', value: 8, color: '#64748B' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'contracts', label: 'Contracts', icon: 'FileText' },
    { id: 'financial', label: 'Financial', icon: 'DollarSign' },
    { id: 'compliance', label: 'Compliance', icon: 'Shield' },
    { id: 'communication', label: 'Communication', icon: 'MessageCircle' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Company Information</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Legal Name</label>
              <p className="text-text-primary">{vendor?.legalName || vendor?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Industry</label>
              <p className="text-text-primary">{vendor?.category}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Founded</label>
              <p className="text-text-primary">{vendor?.founded || '2010'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Employees</label>
              <p className="text-text-primary">{vendor?.employees || '500-1000'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Website</label>
              <p className="text-accent hover:underline cursor-pointer">{vendor?.website || 'www.example.com'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Contact Information</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Primary Contact</label>
              <p className="text-text-primary">{vendor?.primaryContact || 'John Smith'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-text-primary">{vendor?.email || 'john.smith@example.com'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="text-text-primary">{vendor?.phone || '+1 (555) 123-4567'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Address</label>
              <p className="text-text-primary">{vendor?.address || '123 Business Ave, City, State 12345'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Star" size={16} className="text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Overall Rating</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{vendor?.performanceScore}%</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="FileText" size={16} className="text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Active Contracts</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{vendor?.contractCount}</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Total Spend</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">${vendor?.totalSpend?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-text-primary mb-4">Performance Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="delivery" stroke="#059669" strokeWidth={2} />
                <Line type="monotone" dataKey="quality" stroke="#0EA5E9" strokeWidth={2} />
                <Line type="monotone" dataKey="cost" stroke="#D97706" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-text-primary mb-4">Contract Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contractData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contractData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Truck" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Delivery</span>
          </div>
          <p className="text-2xl font-bold text-success">96%</p>
          <p className="text-xs text-success/80">On-time delivery rate</p>
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Award" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Quality</span>
          </div>
          <p className="text-2xl font-bold text-accent">94%</p>
          <p className="text-xs text-accent/80">Quality score average</p>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingDown" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Cost</span>
          </div>
          <p className="text-2xl font-bold text-warning">89%</p>
          <p className="text-xs text-warning/80">Cost competitiveness</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Heart" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Relationship</span>
          </div>
          <p className="text-2xl font-bold text-primary">92%</p>
          <p className="text-xs text-primary/80">Relationship health</p>
        </div>
      </div>
    </div>
  );

  const renderContracts = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-text-primary">Contract History</h4>
        <Button variant="outline" size="sm" iconName="Plus" iconSize={14}>
          New Contract
        </Button>
      </div>
      
      <div className="space-y-3">
        {[
          { id: 'CT-2024-001', title: 'Software License Agreement', status: 'Active', value: '$125,000', expires: '2024-12-31' },
          { id: 'CT-2024-002', title: 'Professional Services', status: 'Active', value: '$85,000', expires: '2024-10-15' },
          { id: 'CT-2023-015', title: 'Maintenance Contract', status: 'Pending', value: '$45,000', expires: '2024-09-30' },
          { id: 'CT-2023-008', title: 'Consulting Agreement', status: 'Expired', value: '$65,000', expires: '2024-03-15' }
        ]?.map((contract) => (
          <div key={contract?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h5 className="font-medium text-text-primary">{contract?.title}</h5>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  contract?.status === 'Active' ? 'bg-success/10 text-success' :
                  contract?.status === 'Pending'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                }`}>
                  {contract?.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Contract ID: {contract?.id}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-text-primary">{contract?.value}</p>
              <p className="text-sm text-muted-foreground">Expires: {contract?.expires}</p>
            </div>
            <Button variant="ghost" size="sm" iconName="ExternalLink" iconSize={14} className="ml-4">
              View
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFinancial = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4">Quarterly Spend Analysis</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, 'Spend']} />
              <Bar dataKey="value" fill="#0EA5E9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="font-medium text-text-primary mb-3">Payment Terms</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Standard Terms</span>
              <span className="text-text-primary">Net 30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Early Payment Discount</span>
              <span className="text-text-primary">2% 10 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Currency</span>
              <span className="text-text-primary">USD</span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-medium text-text-primary mb-3">Financial Health</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Credit Rating</span>
              <span className="text-success font-medium">A+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment History</span>
              <span className="text-success font-medium">Excellent</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Risk Level</span>
              <span className="text-success font-medium">Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="font-medium text-text-primary mb-3">Certifications</h5>
          <div className="space-y-3">
            {[
              { name: 'ISO 9001:2015', status: 'Valid', expires: '2025-06-30' },
              { name: 'SOC 2 Type II', status: 'Valid', expires: '2024-12-15' },
              { name: 'GDPR Compliance', status: 'Valid', expires: '2025-03-20' },
              { name: 'PCI DSS', status: 'Expired', expires: '2024-01-15' }
            ]?.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-text-primary">{cert?.name}</p>
                  <p className="text-sm text-muted-foreground">Expires: {cert?.expires}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  cert?.status === 'Valid' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  {cert?.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-medium text-text-primary mb-3">Insurance Coverage</h5>
          <div className="space-y-3">
            {[
              { type: 'General Liability', amount: '$2,000,000', expires: '2024-12-31' },
              { type: 'Professional Liability', amount: '$1,000,000', expires: '2024-11-15' },
              { type: 'Cyber Liability', amount: '$5,000,000', expires: '2025-01-30' }
            ]?.map((insurance, index) => (
              <div key={index} className="p-3 border border-border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-text-primary">{insurance?.type}</p>
                    <p className="text-sm text-muted-foreground">Coverage: {insurance?.amount}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Expires: {insurance?.expires}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunication = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-text-primary">Recent Communications</h4>
        <Button variant="outline" size="sm" iconName="Plus" iconSize={14}>
          New Message
        </Button>
      </div>
      
      <div className="space-y-3">
        {[
          { 
            id: 1, 
            type: 'email', 
            subject: 'Contract Renewal Discussion', 
            from: 'John Smith', 
            date: '2024-09-03', 
            status: 'unread' 
          },
          { 
            id: 2, 
            type: 'meeting', 
            subject: 'Quarterly Business Review', 
            from: 'Sarah Johnson', 
            date: '2024-09-01', 
            status: 'read' 
          },
          { 
            id: 3, 
            type: 'email', 
            subject: 'Invoice Clarification', 
            from: 'Mike Davis', 
            date: '2024-08-30', 
            status: 'read' 
          }
        ]?.map((comm) => (
          <div key={comm?.id} className={`p-4 border border-border rounded-lg ${comm?.status === 'unread' ? 'bg-accent/5' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Icon 
                  name={comm?.type === 'email' ? 'Mail' : 'Calendar'} 
                  size={16} 
                  className="text-muted-foreground mt-1" 
                />
                <div>
                  <h5 className={`font-medium ${comm?.status === 'unread' ? 'text-text-primary' : 'text-muted-foreground'}`}>
                    {comm?.subject}
                  </h5>
                  <p className="text-sm text-muted-foreground">From: {comm?.from}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{comm?.date}</p>
                {comm?.status === 'unread' && (
                  <span className="inline-block w-2 h-2 bg-accent rounded-full mt-1"></span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevated w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              {vendor?.logo ? (
                <Image 
                  src={vendor?.logo} 
                  alt={`${vendor?.name} logo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="Building2" size={24} className="text-muted-foreground" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{vendor?.name}</h2>
              <p className="text-muted-foreground">{vendor?.category} • {vendor?.location}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-0 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-text-primary'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'performance' && renderPerformance()}
          {activeTab === 'contracts' && renderContracts()}
          {activeTab === 'financial' && renderFinancial()}
          {activeTab === 'compliance' && renderCompliance()}
          {activeTab === 'communication' && renderCommunication()}
        </div>
      </div>
    </div>
  );
};

export default VendorDetailModal;