import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ComplianceMonitoring = ({ monitoringData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('');
  const [selectedRegulation, setSelectedRegulation] = useState('');

  const riskOptions = [
    { value: '', label: 'All Risk Levels' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const regulationOptions = [
    { value: '', label: 'All Regulations' },
    { value: 'gdpr', label: 'GDPR' },
    { value: 'sox', label: 'SOX' },
    { value: 'hipaa', label: 'HIPAA' },
    { value: 'pci', label: 'PCI DSS' }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const filteredData = monitoringData?.filter(item => {
    const matchesSearch = item?.contractTitle?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.vendor?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRisk = !selectedRisk || item?.riskLevel === selectedRisk;
    const matchesRegulation = !selectedRegulation || item?.regulation === selectedRegulation;
    return matchesSearch && matchesRisk && matchesRegulation;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-surface p-6 rounded-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search contracts or vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
          <Select
            placeholder="Filter by risk level"
            options={riskOptions}
            value={selectedRisk}
            onChange={setSelectedRisk}
          />
          <Select
            placeholder="Filter by regulation"
            options={regulationOptions}
            value={selectedRegulation}
            onChange={setSelectedRegulation}
          />
        </div>
      </div>
      {/* Monitoring List */}
      <div className="space-y-4">
        {filteredData?.map((item) => (
          <div key={item?.id} className="bg-surface p-6 rounded-lg border border-border hover:shadow-elevated transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-text-primary">{item?.contractTitle}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(item?.riskLevel)}`}>
                    {item?.riskLevel?.charAt(0)?.toUpperCase() + item?.riskLevel?.slice(1)} Risk
                  </span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Building2" size={14} />
                    <span>{item?.vendor}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Shield" size={14} />
                    <span>{item?.regulation}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>Due: {item?.dueDate}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Eye" size={16} className="mr-2" />
                  Review
                </Button>
                <Button variant="default" size="sm">
                  <Icon name="CheckCircle" size={16} className="mr-2" />
                  Remediate
                </Button>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg mb-4">
              <h4 className="font-medium text-text-primary mb-2">Compliance Issues:</h4>
              <ul className="space-y-2">
                {item?.issues?.map((issue, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Score: <span className="font-medium text-text-primary">{item?.complianceScore}/100</span></span>
                <span>Last Review: <span className="font-medium text-text-primary">{item?.lastReview}</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="History" size={16} className="mr-2" />
                  History
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredData?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No compliance issues found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ComplianceMonitoring;