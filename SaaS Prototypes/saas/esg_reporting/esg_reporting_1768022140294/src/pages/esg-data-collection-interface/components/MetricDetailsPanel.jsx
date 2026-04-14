import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MetricDetailsPanel = ({ selectedMetric, onClose, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [historicalData, setHistoricalData] = useState([]);
  const [policyDocuments, setPolicyDocuments] = useState([]);
  const [validationRules, setValidationRules] = useState([]);

  useEffect(() => {
    if (selectedMetric) {
      setFormData({
        value: selectedMetric?.value,
        target: selectedMetric?.target,
        notes: selectedMetric?.notes || '',
        source: selectedMetric?.source
      });

      // Mock historical data
      const mockHistoricalData = [
        { period: '2024-Q1', value: selectedMetric?.value * 0.85, target: selectedMetric?.target },
        { period: '2024-Q2', value: selectedMetric?.value * 0.92, target: selectedMetric?.target },
        { period: '2024-Q3', value: selectedMetric?.value * 0.98, target: selectedMetric?.target },
        { period: '2024-Q4', value: selectedMetric?.value, target: selectedMetric?.target }
      ];
      setHistoricalData(mockHistoricalData);

      // Mock policy documents
      const mockPolicyDocs = [
        {
          id: 'policy-1',
          name: 'Environmental Management Policy',
          type: 'PDF',
          size: '2.4 MB',
          lastModified: '2024-12-15',
          url: '#'
        },
        {
          id: 'policy-2',
          name: 'Data Collection Guidelines',
          type: 'PDF',
          size: '1.8 MB',
          lastModified: '2024-11-20',
          url: '#'
        },
        {
          id: 'policy-3',
          name: 'Measurement Standards',
          type: 'DOCX',
          size: '856 KB',
          lastModified: '2024-10-30',
          url: '#'
        }
      ];
      setPolicyDocuments(mockPolicyDocs);

      // Mock validation rules
      const mockValidationRules = [
        {
          id: 'rule-1',
          type: 'range',
          description: 'Value must be between 0 and 10,000',
          status: selectedMetric?.value >= 0 && selectedMetric?.value <= 10000 ? 'pass' : 'fail'
        },
        {
          id: 'rule-2',
          type: 'variance',
          description: 'Variance from target should not exceed 20%',
          status: Math.abs(selectedMetric?.variance) <= 20 ? 'pass' : 'fail'
        },
        {
          id: 'rule-3',
          type: 'trend',
          description: 'Quarterly trend analysis completed',
          status: 'pass'
        }
      ];
      setValidationRules(mockValidationRules);
    }
  }, [selectedMetric]);

  const handleSave = () => {
    if (onSave) {
      onSave(selectedMetric?.id, formData);
    }
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({
      value: selectedMetric?.value,
      target: selectedMetric?.target,
      notes: selectedMetric?.notes || '',
      source: selectedMetric?.source
    });
    setEditMode(false);
  };

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'FileText';
      case 'docx': case 'doc': return 'FileText';
      case 'xlsx': case 'xls': return 'Sheet';
      default: return 'File';
    }
  };

  const getRuleIcon = (status) => {
    switch (status) {
      case 'pass': return 'CheckCircle';
      case 'fail': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const getRuleColor = (status) => {
    switch (status) {
      case 'pass': return 'text-success';
      case 'fail': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const formatValue = (value) => {
    return typeof value === 'number' ? value?.toLocaleString() : value;
  };

  if (!selectedMetric) {
    return (
      <div className="h-full bg-card border-l border-border flex items-center justify-center">
        <div className="text-center p-8">
          <Icon name="BarChart3" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Metric</h3>
          <p className="text-muted-foreground">Choose a metric from the data grid to view details and historical trends</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-foreground">Metric Details</h2>
          <div className="flex items-center space-x-2">
            {editMode ? (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                  <Icon name="Edit" size={16} className="mr-2" />
                  Edit
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <Icon name="X" size={16} />
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            {selectedMetric?.category}
          </span>
          <div className="flex items-center space-x-1">
            <Icon 
              name={selectedMetric?.validationStatus === 'validated' ? 'CheckCircle' : 
                    selectedMetric?.validationStatus === 'pending' ? 'Clock' : 'AlertCircle'} 
              size={14} 
              className={selectedMetric?.validationStatus === 'validated' ? 'text-success' : 
                         selectedMetric?.validationStatus === 'pending' ? 'text-warning' : 'text-error'}
            />
            <span className="text-xs text-muted-foreground capitalize">
              {selectedMetric?.validationStatus}
            </span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Basic Information */}
        <div className="p-4 border-b border-border">
          <h3 className="font-medium text-foreground mb-3">{selectedMetric?.name}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Current Value</label>
              {editMode ? (
                <Input
                  type="number"
                  value={formData?.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: parseFloat(e?.target?.value) }))}
                  className="mt-1"
                />
              ) : (
                <div className="text-lg font-semibold text-foreground mt-1">
                  {formatValue(selectedMetric?.value)} {selectedMetric?.unit}
                </div>
              )}
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Target</label>
              {editMode ? (
                <Input
                  type="number"
                  value={formData?.target}
                  onChange={(e) => setFormData(prev => ({ ...prev, target: parseFloat(e?.target?.value) }))}
                  className="mt-1"
                />
              ) : (
                <div className="text-lg font-semibold text-foreground mt-1">
                  {formatValue(selectedMetric?.target)} {selectedMetric?.unit}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-muted-foreground">Data Source</label>
            {editMode ? (
              <Input
                type="text"
                value={formData?.source}
                onChange={(e) => setFormData(prev => ({ ...prev, source: e?.target?.value }))}
                className="mt-1"
              />
            ) : (
              <div className="text-sm text-foreground mt-1">{selectedMetric?.source}</div>
            )}
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-muted-foreground">Notes</label>
            {editMode ? (
              <textarea
                value={formData?.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e?.target?.value }))}
                className="w-full mt-1 p-2 border border-border rounded-lg bg-background text-foreground text-sm resize-none"
                rows={3}
                placeholder="Add notes about this metric..."
              />
            ) : (
              <div className="text-sm text-foreground mt-1">
                {selectedMetric?.notes || 'No notes available'}
              </div>
            )}
          </div>
        </div>

        {/* Historical Trend */}
        <div className="p-4 border-b border-border">
          <h3 className="font-medium text-foreground mb-3">Historical Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="period" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-popover-foreground)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  name="Actual"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="var(--color-muted-foreground)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: 'var(--color-muted-foreground)', strokeWidth: 2, r: 4 }}
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Validation Rules */}
        <div className="p-4 border-b border-border">
          <h3 className="font-medium text-foreground mb-3">Validation Rules</h3>
          <div className="space-y-2">
            {validationRules?.map((rule) => (
              <div key={rule?.id} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                <Icon 
                  name={getRuleIcon(rule?.status)} 
                  size={16} 
                  className={getRuleColor(rule?.status)}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{rule?.type?.toUpperCase()}</div>
                  <div className="text-xs text-muted-foreground">{rule?.description}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rule?.status === 'pass' ? 'bg-success/10 text-success' :
                  rule?.status === 'fail'? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                }`}>
                  {rule?.status?.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Documents */}
        <div className="p-4">
          <h3 className="font-medium text-foreground mb-3">Related Documents</h3>
          <div className="space-y-2">
            {policyDocuments?.map((doc) => (
              <div key={doc?.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <Icon name={getFileIcon(doc?.type)} size={16} className="text-primary" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{doc?.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {doc?.type} • {doc?.size} • Modified {doc?.lastModified}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="ExternalLink" size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Last updated: {new Date(selectedMetric.lastUpdated)?.toLocaleString()}</span>
            <span>by {selectedMetric?.updatedBy}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricDetailsPanel;