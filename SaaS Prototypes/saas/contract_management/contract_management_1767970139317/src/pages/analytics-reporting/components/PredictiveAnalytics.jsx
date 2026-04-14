import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PredictiveAnalytics = () => {
  const [selectedModel, setSelectedModel] = useState('contract_renewal');
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modelAccuracy, setModelAccuracy] = useState(null);

  const analyticsModels = [
    {
      value: 'contract_renewal',
      label: 'Contract Renewal Prediction',
      description: 'Predicts likelihood of contract renewal based on historical data',
      accuracy: 87.5,
      icon: 'RefreshCw'
    },
    {
      value: 'spend_forecast',
      label: 'Spend Forecasting',
      description: 'Forecasts future contract spending patterns',
      accuracy: 92.3,
      icon: 'TrendingUp'
    },
    {
      value: 'risk_assessment',
      label: 'Risk Assessment',
      description: 'Identifies potential contract risks and compliance issues',
      accuracy: 89.1,
      icon: 'AlertTriangle'
    },
    {
      value: 'vendor_performance',
      label: 'Vendor Performance Prediction',
      description: 'Predicts vendor performance based on historical metrics',
      accuracy: 84.7,
      icon: 'Building2'
    },
    {
      value: 'cost_optimization',
      label: 'Cost Optimization',
      description: 'Identifies opportunities for cost savings and optimization',
      accuracy: 91.2,
      icon: 'DollarSign'
    }
  ];

  const mockPredictions = {
    contract_renewal: [
      {
        id: 'CNT-2024-001',
        contractName: 'Software License Agreement - Microsoft',
        renewalProbability: 92,
        confidenceLevel: 'High',
        factors: ['Historical renewal rate', 'Usage metrics', 'Budget allocation'],
        recommendation: 'Start renewal negotiations 90 days early',
        expiryDate: '2024-12-15',
        value: '$125,000'
      },
      {
        id: 'CNT-2024-002',
        contractName: 'Facilities Management Contract',
        renewalProbability: 34,
        confidenceLevel: 'Medium',
        factors: ['Performance issues', 'Cost concerns', 'Alternative vendors'],
        recommendation: 'Review performance metrics and consider alternatives',
        expiryDate: '2024-11-30',
        value: '$450,000'
      },
      {
        id: 'CNT-2024-003',
        contractName: 'Marketing Services Agreement',
        renewalProbability: 78,
        confidenceLevel: 'High',
        factors: ['Positive ROI', 'Strategic alignment', 'Relationship quality'],
        recommendation: 'Negotiate improved terms for renewal',
        expiryDate: '2025-01-20',
        value: '$85,000'
      }
    ],
    spend_forecast: [
      {
        period: 'Q1 2025',
        predictedSpend: '$2,450,000',
        confidence: 'High',
        variance: '±5%',
        drivers: ['New vendor contracts', 'Inflation adjustments', 'Volume increases']
      },
      {
        period: 'Q2 2025',
        predictedSpend: '$2,680,000',
        confidence: 'Medium',
        variance: '±8%',
        drivers: ['Seasonal variations', 'Contract renewals', 'Market conditions']
      },
      {
        period: 'Q3 2025',
        predictedSpend: '$2,320,000',
        confidence: 'Medium',
        variance: '±12%',
        drivers: ['Budget constraints', 'Optimization initiatives', 'Vendor consolidation']
      }
    ],
    risk_assessment: [
      {
        contractId: 'CNT-2024-005',
        riskLevel: 'High',
        riskScore: 8.2,
        primaryRisks: ['Compliance gaps', 'Financial exposure', 'Vendor dependency'],
        mitigationActions: ['Implement monitoring', 'Diversify suppliers', 'Update terms'],
        impactEstimate: '$75,000 - $150,000'
      },
      {
        contractId: 'CNT-2024-007',
        riskLevel: 'Medium',
        riskScore: 5.8,
        primaryRisks: ['Performance variability', 'Market volatility'],
        mitigationActions: ['Enhanced SLAs', 'Price adjustment clauses'],
        impactEstimate: '$25,000 - $50,000'
      }
    ]
  };

  useEffect(() => {
    const currentModel = analyticsModels?.find(m => m?.value === selectedModel);
    setModelAccuracy(currentModel?.accuracy || 0);
    loadPredictions();
  }, [selectedModel]);

  const loadPredictions = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPredictions(mockPredictions?.[selectedModel] || []);
      setIsLoading(false);
    }, 1500);
  };

  const runAnalysis = () => {
    loadPredictions();
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'text-success';
    if (probability >= 60) return 'text-warning';
    return 'text-error';
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'High': return 'text-error';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const currentModel = analyticsModels?.find(m => m?.value === selectedModel);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-text-primary">Predictive Analytics</h2>
          <p className="text-sm text-muted-foreground">
            AI-powered insights for strategic contract management decisions
          </p>
        </div>
        <Button
          variant="default"
          onClick={runAnalysis}
          loading={isLoading}
          iconName="Play"
          iconPosition="left"
        >
          Run Analysis
        </Button>
      </div>
      {/* Model Selection */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <Select
              label="Analytics Model"
              options={analyticsModels}
              value={selectedModel}
              onChange={setSelectedModel}
            />
          </div>
          <div className="col-span-8">
            {currentModel && (
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Icon name={currentModel?.icon} size={20} className="text-accent" />
                  <h3 className="font-medium text-text-primary">{currentModel?.label}</h3>
                  <div className="flex items-center space-x-1 text-sm text-success">
                    <Icon name="Target" size={14} />
                    <span>{currentModel?.accuracy}% accuracy</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{currentModel?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Results */}
      <div className="bg-surface border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-text-primary">Analysis Results</h3>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date()?.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <div className="animate-spin">
                  <Icon name="Loader2" size={32} className="text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Running {currentModel?.label?.toLowerCase()}...
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedModel === 'contract_renewal' && (
                <div className="space-y-4">
                  {predictions?.map((prediction) => (
                    <div key={prediction?.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-1">
                          <h4 className="font-medium text-text-primary">
                            {prediction?.contractName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {prediction?.id} • Expires: {prediction?.expiryDate} • Value: {prediction?.value}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getProbabilityColor(prediction?.renewalProbability)}`}>
                            {prediction?.renewalProbability}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {prediction?.confidenceLevel} confidence
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-text-primary mb-2">Key Factors</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {prediction?.factors?.map((factor, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Icon name="Dot" size={12} />
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-text-primary mb-2">Recommendation</h5>
                          <p className="text-sm text-muted-foreground">{prediction?.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedModel === 'spend_forecast' && (
                <div className="space-y-4">
                  {predictions?.map((forecast, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-text-primary">{forecast?.period}</h4>
                        <div className="text-right">
                          <div className="text-xl font-bold text-text-primary">
                            {forecast?.predictedSpend}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {forecast?.confidence} confidence {forecast?.variance}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-2">Key Drivers</h5>
                        <div className="flex flex-wrap gap-2">
                          {forecast?.drivers?.map((driver, dIndex) => (
                            <span
                              key={dIndex}
                              className="px-2 py-1 bg-muted text-xs rounded-full text-text-primary"
                            >
                              {driver}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedModel === 'risk_assessment' && (
                <div className="space-y-4">
                  {predictions?.map((risk, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-text-primary">
                            Contract {risk?.contractId}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Potential Impact: {risk?.impactEstimate}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getRiskColor(risk?.riskLevel)}`}>
                            {risk?.riskLevel} Risk
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Score: {risk?.riskScore}/10
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-text-primary mb-2">Primary Risks</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {risk?.primaryRisks?.map((riskItem, rIndex) => (
                              <li key={rIndex} className="flex items-center space-x-2">
                                <Icon name="AlertCircle" size={12} className="text-error" />
                                <span>{riskItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-text-primary mb-2">Mitigation Actions</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {risk?.mitigationActions?.map((action, aIndex) => (
                              <li key={aIndex} className="flex items-center space-x-2">
                                <Icon name="CheckCircle" size={12} className="text-success" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {predictions?.length === 0 && !isLoading && (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No predictions available for the selected model</p>
                  <p className="text-sm">Click "Run Analysis" to generate insights</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;