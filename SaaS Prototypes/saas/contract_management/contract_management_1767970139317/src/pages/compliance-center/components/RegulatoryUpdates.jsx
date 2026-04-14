import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RegulatoryUpdates = ({ updatesData }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImpact, setSelectedImpact] = useState('');

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'gdpr', label: 'GDPR' },
    { value: 'sox', label: 'SOX' },
    { value: 'hipaa', label: 'HIPAA' },
    { value: 'pci', label: 'PCI DSS' },
    { value: 'iso', label: 'ISO 27001' }
  ];

  const impactOptions = [
    { value: '', label: 'All Impact Levels' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'text-accent bg-accent/10 border-accent/20';
      case 'reviewed': return 'text-warning bg-warning/10 border-warning/20';
      case 'implemented': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const filteredUpdates = updatesData?.filter(update => {
    const matchesCategory = !selectedCategory || update?.category === selectedCategory;
    const matchesImpact = !selectedImpact || update?.impact === selectedImpact;
    return matchesCategory && matchesImpact;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-surface p-6 rounded-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            placeholder="Filter by regulation"
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <Select
            placeholder="Filter by impact level"
            options={impactOptions}
            value={selectedImpact}
            onChange={setSelectedImpact}
          />
        </div>
      </div>
      {/* Updates List */}
      <div className="space-y-4">
        {filteredUpdates?.map((update) => (
          <div key={update?.id} className="bg-surface p-6 rounded-lg border border-border hover:shadow-elevated transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-text-primary">{update?.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(update?.impact)}`}>
                    {update?.impact?.charAt(0)?.toUpperCase() + update?.impact?.slice(1)} Impact
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(update?.status)}`}>
                    {update?.status?.charAt(0)?.toUpperCase() + update?.status?.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="Shield" size={14} />
                    <span>{update?.category?.toUpperCase()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>Effective: {update?.effectiveDate}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>Published: {update?.publishedDate}</span>
                  </span>
                </div>
                <p className="text-text-secondary mb-4">{update?.description}</p>
              </div>
            </div>

            {/* Impact Assessment */}
            <div className="bg-muted p-4 rounded-lg mb-4">
              <h4 className="font-medium text-text-primary mb-3">Impact Assessment</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{update?.impactAssessment?.contractsAffected}</div>
                  <div className="text-sm text-muted-foreground">Contracts Affected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{update?.impactAssessment?.estimatedCost}</div>
                  <div className="text-sm text-muted-foreground">Estimated Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{update?.impactAssessment?.timeToImplement}</div>
                  <div className="text-sm text-muted-foreground">Implementation Time</div>
                </div>
              </div>
            </div>

            {/* Required Actions */}
            {update?.requiredActions && update?.requiredActions?.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-text-primary mb-2">Required Actions:</h4>
                <ul className="space-y-2">
                  {update?.requiredActions?.map((action, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Icon name="ArrowRight" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Priority: <span className="font-medium text-text-primary">{update?.priority}</span></span>
                <span>Deadline: <span className="font-medium text-text-primary">{update?.deadline}</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="FileText" size={16} className="mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Download
                </Button>
                <Button variant="default" size="sm">
                  <Icon name="CheckCircle" size={16} className="mr-2" />
                  Mark Reviewed
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredUpdates?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No regulatory updates found</h3>
          <p className="text-muted-foreground">All regulatory updates have been reviewed or no updates match your filters.</p>
        </div>
      )}
    </div>
  );
};

export default RegulatoryUpdates;