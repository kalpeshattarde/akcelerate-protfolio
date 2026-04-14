import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CurrencyManagementPanel = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [viewMode, setViewMode] = useState('rates');

  const exchangeRates = {
    'USD': { rate: 1.0000, change: 0.00, trend: 'stable', lastUpdated: '2025-09-04 07:30:00' },
    'EUR': { rate: 0.8456, change: -0.0023, trend: 'down', lastUpdated: '2025-09-04 07:30:00' },
    'GBP': { rate: 0.7234, change: 0.0012, trend: 'up', lastUpdated: '2025-09-04 07:30:00' },
    'CAD': { rate: 1.3567, change: -0.0045, trend: 'down', lastUpdated: '2025-09-04 07:30:00' },
    'AUD': { rate: 1.4823, change: 0.0078, trend: 'up', lastUpdated: '2025-09-04 07:30:00' },
    'JPY': { rate: 149.23, change: -0.56, trend: 'down', lastUpdated: '2025-09-04 07:30:00' },
    'CHF': { rate: 0.8934, change: 0.0034, trend: 'up', lastUpdated: '2025-09-04 07:30:00' },
    'CNY': { rate: 7.2456, change: -0.0234, trend: 'down', lastUpdated: '2025-09-04 07:30:00' }
  };

  const currencyExposure = [
    {
      currency: 'USD',
      totalContracts: 45,
      totalValue: 12500000,
      activeContracts: 38,
      pendingPayments: 2340000,
      exposure: 'low',
      hedged: 0
    },
    {
      currency: 'EUR',
      totalContracts: 12,
      totalValue: 3200000,
      activeContracts: 10,
      pendingPayments: 890000,
      exposure: 'medium',
      hedged: 75
    },
    {
      currency: 'GBP',
      totalContracts: 8,
      totalValue: 1800000,
      activeContracts: 7,
      pendingPayments: 450000,
      exposure: 'low',
      hedged: 60
    },
    {
      currency: 'CAD',
      totalContracts: 6,
      totalValue: 950000,
      activeContracts: 5,
      pendingPayments: 230000,
      exposure: 'low',
      hedged: 40
    },
    {
      currency: 'AUD',
      totalContracts: 4,
      totalValue: 680000,
      activeContracts: 3,
      pendingPayments: 180000,
      exposure: 'medium',
      hedged: 80
    }
  ];

  const hedgingStrategies = [
    {
      id: 'hedge-001',
      currency: 'EUR',
      type: 'Forward Contract',
      amount: 2400000,
      rate: 0.8478,
      maturity: '2025-12-15',
      status: 'active',
      pnl: 15600,
      effectiveness: 92
    },
    {
      id: 'hedge-002',
      currency: 'GBP',
      type: 'Currency Option',
      amount: 1080000,
      rate: 0.7245,
      maturity: '2025-11-30',
      status: 'active',
      pnl: -8200,
      effectiveness: 87
    },
    {
      id: 'hedge-003',
      currency: 'AUD',
      type: 'Forward Contract',
      amount: 544000,
      rate: 1.4756,
      maturity: '2025-10-20',
      status: 'active',
      pnl: 12400,
      effectiveness: 95
    }
  ];

  const currencyOptions = Object.keys(exchangeRates)?.map(currency => ({
    value: currency,
    label: currency
  }));

  const viewModeOptions = [
    { value: 'rates', label: 'Exchange Rates' },
    { value: 'exposure', label: 'Currency Exposure' },
    { value: 'hedging', label: 'Hedging Strategies' }
  ];

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatRate = (rate, currency) => {
    if (currency === 'JPY') {
      return rate?.toFixed(2);
    }
    return rate?.toFixed(4);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getExposureColor = (exposure) => {
    switch (exposure) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'expired': return 'bg-error/10 text-error border-error/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const renderExchangeRates = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(exchangeRates)?.map(([currency, data]) => (
          <div key={currency} className="bg-muted/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold text-text-primary">{currency}</h4>
              <div className={`flex items-center space-x-1 ${getTrendColor(data?.trend)}`}>
                <Icon name={getTrendIcon(data?.trend)} size={14} />
                <span className="text-sm">
                  {data?.change > 0 ? '+' : ''}{data?.change?.toFixed(4)}
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              {formatRate(data?.rate, currency)}
            </div>
            <div className="text-xs text-muted-foreground">
              Updated: {new Date(data.lastUpdated)?.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-muted/20 rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Rate Alerts & Notifications</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm text-text-primary">EUR rate approaching threshold</span>
            </div>
            <span className="text-sm text-muted-foreground">Target: 0.8400</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-text-primary">GBP hedge executed successfully</span>
            </div>
            <span className="text-sm text-muted-foreground">Rate: 0.7245</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrencyExposure = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Currency</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total Contracts</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total Value</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Pending Payments</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Exposure Risk</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Hedged %</th>
            </tr>
          </thead>
          <tbody>
            {currencyExposure?.map((exposure, index) => (
              <tr key={exposure?.currency} className={`border-b border-border hover:bg-muted/20 transition-smooth ${index % 2 === 0 ? 'bg-surface' : 'bg-muted/10'}`}>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{exposure?.currency}</span>
                    </div>
                    <span className="text-sm font-medium text-text-primary">{exposure?.currency}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary">{exposure?.totalContracts}</div>
                  <div className="text-xs text-muted-foreground">{exposure?.activeContracts} active</div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-text-primary">
                    {formatCurrency(exposure?.totalValue, exposure?.currency)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-primary">
                    {formatCurrency(exposure?.pendingPayments, exposure?.currency)}
                  </div>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getExposureColor(exposure?.exposure)}`}>
                    {exposure?.exposure}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-accent rounded-full transition-all duration-300"
                        style={{ width: `${exposure?.hedged}%` }}
                      />
                    </div>
                    <span className="text-sm text-text-primary">{exposure?.hedged}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderHedgingStrategies = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">$4.02M</div>
          <div className="text-sm text-muted-foreground">Total Hedged Amount</div>
        </div>
        <div className="bg-muted/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">91%</div>
          <div className="text-sm text-muted-foreground">Avg Effectiveness</div>
        </div>
        <div className="bg-muted/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent">$19.8K</div>
          <div className="text-sm text-muted-foreground">Total P&L</div>
        </div>
      </div>

      <div className="space-y-4">
        {hedgingStrategies?.map((hedge) => (
          <div key={hedge?.id} className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-medium text-text-primary">{hedge?.type}</h4>
                <div className="text-sm text-muted-foreground">{hedge?.id} • {hedge?.currency}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(hedge?.status)}`}>
                {hedge?.status}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Amount</div>
                <div className="text-sm font-medium text-text-primary">
                  {formatCurrency(hedge?.amount, hedge?.currency)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Rate</div>
                <div className="text-sm font-medium text-text-primary">
                  {formatRate(hedge?.rate, hedge?.currency)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Maturity</div>
                <div className="text-sm font-medium text-text-primary">
                  {new Date(hedge.maturity)?.toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">P&L</div>
                <div className={`text-sm font-medium ${hedge?.pnl >= 0 ? 'text-success' : 'text-error'}`}>
                  {hedge?.pnl >= 0 ? '+' : ''}{formatCurrency(hedge?.pnl)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Effectiveness</div>
                <div className="text-sm font-medium text-text-primary">{hedge?.effectiveness}%</div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Edit" size={14} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="BarChart3" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (viewMode) {
      case 'rates': return renderExchangeRates();
      case 'exposure': return renderCurrencyExposure();
      case 'hedging': return renderHedgingStrategies();
      default: return renderExchangeRates();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Currency Management</h3>
          <div className="flex items-center space-x-3">
            <Select
              options={viewModeOptions}
              value={viewMode}
              onChange={setViewMode}
              className="w-40"
            />
            <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
              Refresh Rates
            </Button>
            <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
              New Hedge
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Last updated: {new Date()?.toLocaleString()} • Rates provided by financial data provider
        </div>
      </div>
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default CurrencyManagementPanel;