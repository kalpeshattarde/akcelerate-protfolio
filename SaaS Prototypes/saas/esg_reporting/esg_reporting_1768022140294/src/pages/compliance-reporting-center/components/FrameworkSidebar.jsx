import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FrameworkSidebar = ({ 
  selectedFrameworks, 
  onFrameworkSelect,
  isCollapsed = false,
  onToggleCollapse 
}) => {
  const [activeTab, setActiveTab] = useState('frameworks');
  const [searchQuery, setSearchQuery] = useState('');

  const frameworkDetails = {
    gri: {
      name: 'GRI Standards',
      version: '2021',
      description: 'Global Reporting Initiative Universal Standards for sustainability reporting',
      categories: [
        { name: 'Foundation', sections: 3, status: 'complete' },
        { name: 'General Disclosures', sections: 15, status: 'complete' },
        { name: 'Management Approach', sections: 8, status: 'partial' },
        { name: 'Topic-Specific Standards', sections: 16, status: 'partial' }
      ],
      requirements: [
        'Organizational profile and strategy',
        'Stakeholder engagement process',
        'Material topics assessment',
        'Governance structure details',
        'Ethics and integrity policies'
      ],
      timeline: '4-6 weeks preparation',
      compliance: 'Voluntary framework',
      lastUpdate: '2024-12-05'
    },
    sasb: {
      name: 'SASB Standards',
      version: '2023',
      description: 'Industry-specific sustainability accounting standards for investors',
      categories: [
        { name: 'General Issues', sections: 5, status: 'complete' },
        { name: 'Industry Metrics', sections: 12, status: 'partial' },
        { name: 'Activity Metrics', sections: 6, status: 'complete' },
        { name: 'Forward-Looking Guidance', sections: 5, status: 'incomplete' }
      ],
      requirements: [
        'Industry-specific KPIs',
        'Financial materiality assessment',
        'Quantitative performance data',
        'Forward-looking statements',
        'Risk factor disclosures'
      ],
      timeline: '3-4 weeks preparation',
      compliance: 'SEC recommended',
      lastUpdate: '2024-12-04'
    },
    tcfd: {
      name: 'TCFD Recommendations',
      version: '2023',
      description: 'Climate-related financial risk disclosures for financial stability',
      categories: [
        { name: 'Governance', sections: 2, status: 'complete' },
        { name: 'Strategy', sections: 3, status: 'incomplete' },
        { name: 'Risk Management', sections: 3, status: 'partial' },
        { name: 'Metrics & Targets', sections: 3, status: 'partial' }
      ],
      requirements: [
        'Climate governance oversight',
        'Climate risk scenario analysis',
        'Transition and physical risks',
        'Climate-related metrics',
        'GHG emissions data'
      ],
      timeline: '6-8 weeks preparation',
      compliance: 'Mandatory in some jurisdictions',
      lastUpdate: '2024-12-03'
    }
  };

  const templates = [
    {
      id: 'annual-report',
      name: 'Annual Sustainability Report',
      description: 'Comprehensive yearly ESG disclosure',
      frameworks: ['gri', 'sasb', 'tcfd'],
      pages: 85,
      lastUsed: '2024-11-15'
    },
    {
      id: 'quarterly-brief',
      name: 'Quarterly ESG Brief',
      description: 'Executive summary for quarterly updates',
      frameworks: ['gri', 'sasb'],
      pages: 25,
      lastUsed: '2024-12-01'
    },
    {
      id: 'climate-disclosure',
      name: 'Climate Risk Disclosure',
      description: 'Focused climate-related reporting',
      frameworks: ['tcfd'],
      pages: 45,
      lastUsed: '2024-10-30'
    },
    {
      id: 'investor-deck',
      name: 'ESG Investor Presentation',
      description: 'Stakeholder presentation format',
      frameworks: ['sasb', 'tcfd'],
      pages: 35,
      lastUsed: '2024-11-20'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'text-success';
      case 'partial': return 'text-warning';
      case 'incomplete': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete': return 'CheckCircle';
      case 'partial': return 'Clock';
      case 'incomplete': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const filteredTemplates = templates?.filter(template =>
    template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  if (isCollapsed) {
    return (
      <div className="w-16 bg-card border-l border-border h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
        </div>
        <div className="flex-1 flex flex-col items-center py-4 space-y-4">
          {Object.keys(frameworkDetails)?.map((key) => (
            <button
              key={key}
              onClick={() => onFrameworkSelect(key)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-150 ${
                selectedFrameworks?.includes(key)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-background'
              }`}
              title={frameworkDetails?.[key]?.name}
            >
              <Icon name="FileText" size={16} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-card border-l border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Framework Details</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 mt-4 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('frameworks')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
              activeTab === 'frameworks' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Frameworks
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
              activeTab === 'templates' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Templates
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'frameworks' ? (
          <div className="p-4 space-y-4">
            {Object.entries(frameworkDetails)?.map(([key, framework]) => {
              const isSelected = selectedFrameworks?.includes(key);
              
              return (
                <div
                  key={key}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => onFrameworkSelect(key)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{framework?.name}</h4>
                      <p className="text-xs text-muted-foreground">v{framework?.version}</p>
                    </div>
                    {isSelected && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {framework?.description}
                  </p>
                  {/* Categories */}
                  <div className="space-y-2 mb-4">
                    <h5 className="text-xs font-medium text-foreground uppercase tracking-wide">
                      Categories
                    </h5>
                    {framework?.categories?.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon 
                            name={getStatusIcon(category?.status)} 
                            size={12} 
                            className={getStatusColor(category?.status)}
                          />
                          <span className="text-sm text-foreground">{category?.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {category?.sections} sections
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Key Requirements */}
                  <div className="space-y-2 mb-4">
                    <h5 className="text-xs font-medium text-foreground uppercase tracking-wide">
                      Key Requirements
                    </h5>
                    <div className="space-y-1">
                      {framework?.requirements?.slice(0, 3)?.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                          <span className="text-xs text-muted-foreground">{req}</span>
                        </div>
                      ))}
                      {framework?.requirements?.length > 3 && (
                        <div className="text-xs text-primary cursor-pointer hover:underline">
                          +{framework?.requirements?.length - 3} more requirements
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Timeline:</span>
                      <div className="font-medium text-foreground">{framework?.timeline}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Compliance:</span>
                      <div className="font-medium text-foreground">{framework?.compliance}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4">
            {/* Search */}
            <div className="relative mb-4">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Templates */}
            <div className="space-y-3">
              {filteredTemplates?.map((template) => (
                <div
                  key={template?.id}
                  className="border border-border rounded-lg p-3 hover:border-muted-foreground transition-colors duration-150 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{template?.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {template?.description}
                      </p>
                    </div>
                    <Icon name="Download" size={14} className="text-muted-foreground" />
                  </div>

                  {/* Framework Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {template?.frameworks?.map((fw) => (
                      <span
                        key={fw}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {fw?.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{template?.pages} pages</span>
                    <span>Used {new Date(template.lastUsed)?.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="FileText" size={32} className="mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground">No templates found</p>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            <Icon name="Plus" size={14} className="mr-2" />
            Create Template
          </Button>
          <Button variant="ghost" size="sm" className="w-full">
            <Icon name="ExternalLink" size={14} className="mr-2" />
            Framework Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FrameworkSidebar;