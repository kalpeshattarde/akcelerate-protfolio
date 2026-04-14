// src/pages/bulk-operations-center/components/PreviewMode.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PreviewMode = ({ 
  previewData, 
  onTogglePreview, 
  showPreview, 
  requiresApproval, 
  onExecute, 
  operationStatus 
}) => {
  const [selectedView, setSelectedView] = useState('summary'); // summary, impact, detailed
  const [approvalNote, setApprovalNote] = useState('');
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value, total) => {
    return ((value / total) * 100).toFixed(1);
  };

  const getImpactColor = (value) => {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-error';
    return 'text-text-secondary';
  };

  const getImpactIcon = (value) => {
    if (value > 0) return 'TrendingUp';
    if (value < 0) return 'TrendingDown';
    return 'Minus';
  };

  const handleExecute = () => {
    if (requiresApproval) {
      setShowApprovalModal(true);
    } else {
      onExecute();
    }
  };

  const handleApprovalSubmit = () => {
    setShowApprovalModal(false);
    onExecute();
  };

  const mockDetailedData = [
    { id: 'EMP001', name: 'Sarah Johnson', currentPayout: 85000, newPayout: 92000, change: 7000 },
    { id: 'EMP002', name: 'Michael Chen', currentPayout: 75000, newPayout: 78000, change: 3000 },
    { id: 'EMP003', name: 'Emily Rodriguez', currentPayout: 90000, newPayout: 95000, change: 5000 },
    { id: 'EMP004', name: 'David Thompson', currentPayout: 65000, newPayout: 63000, change: -2000 },
    { id: 'EMP005', name: 'Lisa Wang', currentPayout: 80000, newPayout: 85000, change: 5000 }
  ];

  return (
    <>
      <div className="bg-surface border border-border rounded-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-text-primary">Operation Preview</h3>
            {requiresApproval && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-warning-100 text-warning">
                <Icon name="Lock" size={12} className="mr-1" />
                Approval Required
              </span>
            )}
          </div>
          
          <button
            onClick={onTogglePreview}
            className={`flex items-center space-x-2 px-3 py-2 rounded-sm transition-smooth ${
              showPreview 
                ? 'bg-primary text-white' :'bg-surface border border-border text-text-primary hover:bg-secondary-50'
            }`}
          >
            <Icon name={showPreview ? 'EyeOff' : 'Eye'} size={16} />
            <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
          </button>
        </div>

        {/* Preview Tabs */}
        <div className="flex items-center space-x-1 mb-4 bg-secondary-100 p-1 rounded-sm">
          {[
            { id: 'summary', label: 'Summary', icon: 'BarChart3' },
            { id: 'impact', label: 'Impact Analysis', icon: 'TrendingUp' },
            { id: 'detailed', label: 'Detailed View', icon: 'List' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded text-sm font-medium transition-smooth ${
                selectedView === tab.id
                  ? 'bg-surface text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Preview Content */}
        {showPreview && (
          <div className="space-y-4">
            {/* Summary View */}
            {selectedView === 'summary' && (
              <div className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary-50 rounded-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Users" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-text-secondary">Affected Records</span>
                    </div>
                    <p className="text-2xl font-semibold text-text-primary">
                      {previewData?.affectedRecords?.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-success-50 rounded-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="DollarSign" size={16} className="text-success" />
                      <span className="text-sm font-medium text-text-secondary">Total Payout Change</span>
                    </div>
                    <p className={`text-2xl font-semibold ${getImpactColor(previewData?.totalPayoutChange)}`}>
                      {previewData?.totalPayoutChange > 0 ? '+' : ''}
                      {formatCurrency(previewData?.totalPayoutChange || 0)}
                    </p>
                  </div>
                </div>

                {/* Before/After Comparison */}
                <div className="bg-secondary-50 rounded-sm p-4">
                  <h4 className="font-medium text-text-primary mb-3">Payout Comparison</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-text-secondary mb-1">Before</p>
                      <p className="text-lg font-semibold text-text-primary">
                        {formatCurrency(previewData?.beforeTotal || 0)}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Icon 
                        name={getImpactIcon(previewData?.totalPayoutChange)} 
                        size={24} 
                        className={getImpactColor(previewData?.totalPayoutChange)} 
                      />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary mb-1">After</p>
                      <p className="text-lg font-semibold text-text-primary">
                        {formatCurrency(previewData?.afterTotal || 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Impact Analysis View */}
            {selectedView === 'impact' && (
              <div className="space-y-4">
                {/* Impact Distribution */}
                <div className="bg-secondary-50 rounded-sm p-4">
                  <h4 className="font-medium text-text-primary mb-3">Impact Distribution</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Icon name="TrendingUp" size={20} className="text-success" />
                      </div>
                      <p className="text-2xl font-semibold text-success">
                        {previewData?.impactSummary?.increases || 0}
                      </p>
                      <p className="text-sm text-text-secondary">Increases</p>
                      <p className="text-xs text-text-secondary">
                        {formatPercentage(previewData?.impactSummary?.increases || 0, previewData?.affectedRecords || 1)}%
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Icon name="TrendingDown" size={20} className="text-error" />
                      </div>
                      <p className="text-2xl font-semibold text-error">
                        {previewData?.impactSummary?.decreases || 0}
                      </p>
                      <p className="text-sm text-text-secondary">Decreases</p>
                      <p className="text-xs text-text-secondary">
                        {formatPercentage(previewData?.impactSummary?.decreases || 0, previewData?.affectedRecords || 1)}%
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Icon name="Minus" size={20} className="text-secondary-600" />
                      </div>
                      <p className="text-2xl font-semibold text-text-primary">
                        {previewData?.impactSummary?.noChange || 0}
                      </p>
                      <p className="text-sm text-text-secondary">No Change</p>
                      <p className="text-xs text-text-secondary">
                        {formatPercentage(previewData?.impactSummary?.noChange || 0, previewData?.affectedRecords || 1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="p-4 bg-warning-50 border border-warning-200 rounded-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <h4 className="font-medium text-text-primary">Risk Assessment</h4>
                  </div>
                  <div className="text-sm text-text-secondary space-y-1">
                    <p>• Budget impact: {formatCurrency(Math.abs(previewData?.totalPayoutChange || 0))}</p>
                    <p>• Affected representatives: {previewData?.affectedRecords || 0}</p>
                    {requiresApproval && (
                      <p className="text-warning font-medium">• Requires management approval due to scope/budget thresholds</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Detailed View */}
            {selectedView === 'detailed' && (
              <div className="space-y-4">
                <div className="bg-secondary-50 rounded-sm p-4">
                  <h4 className="font-medium text-text-primary mb-3">Sample Records (Top 5)</h4>
                  <div className="space-y-2">
                    {mockDetailedData.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 bg-surface rounded-sm">
                        <div>
                          <p className="font-medium text-text-primary">{record.name}</p>
                          <p className="text-sm text-text-secondary">{record.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-text-secondary">
                            {formatCurrency(record.currentPayout)} → {formatCurrency(record.newPayout)}
                          </p>
                          <p className={`text-sm font-medium ${getImpactColor(record.change)}`}>
                            {record.change > 0 ? '+' : ''}{formatCurrency(record.change)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 text-sm text-primary hover:text-primary-700 transition-smooth">
                    View all {previewData?.affectedRecords} records
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Info" size={14} />
            <span>
              {requiresApproval 
                ? 'Manager approval required before execution' 
                : 'Ready to execute operation'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border text-text-primary rounded-sm hover:bg-secondary-50 transition-smooth">
              <Icon name="Download" size={16} />
              <span>Export Preview</span>
            </button>
            
            <button
              onClick={handleExecute}
              disabled={operationStatus === 'processing'}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Play" size={16} />
              <span>Execute Operation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-200">
          <div className="bg-surface rounded-sm p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
                <Icon name="Lock" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Manager Approval Required</h3>
                <p className="text-sm text-text-secondary">This operation requires management approval</p>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Approval Note (Optional)
              </label>
              <textarea
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                className="w-full p-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                rows={3}
                placeholder="Add a note about this approval..."
              />
            </div>
            
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleApprovalSubmit}
                className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
              >
                Approve & Execute
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewMode;