import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FiscalPeriodSelector = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');
  const [selectedQuarter, setSelectedQuarter] = useState('Q2 2024');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const periods = [
    { value: 'monthly', label: 'Monthly', icon: 'Calendar' },
    { value: 'quarterly', label: 'Quarterly', icon: 'BarChart3' },
    { value: 'ytd', label: 'Year to Date', icon: 'TrendingUp' }
  ];

  const quarters = [
    'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024',
    'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'
  ];

  const months = [
    'January 2024', 'February 2024', 'March 2024', 'April 2024',
    'May 2024', 'June 2024', 'July 2024', 'August 2024'
  ];

  const getAvailableOptions = () => {
    switch (selectedPeriod) {
      case 'monthly':
        return months;
      case 'quarterly':
        return quarters;
      case 'ytd':
        return ['2024', '2023', '2022'];
      default:
        return quarters;
    }
  };

  const getCurrentSelection = () => {
    switch (selectedPeriod) {
      case 'monthly':
        return 'July 2024';
      case 'quarterly':
        return selectedQuarter;
      case 'ytd':
        return '2024';
      default:
        return selectedQuarter;
    }
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    if (period === 'monthly') {
      setSelectedQuarter('July 2024');
    } else if (period === 'ytd') {
      setSelectedQuarter('2024');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Period Type Selector */}
      <div className="flex items-center bg-muted rounded-lg p-1">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => handlePeriodChange(period.value)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${selectedPeriod === period.value
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-background'
              }
            `}
          >
            <Icon name={period.icon} size={16} />
            <span className="hidden sm:inline">{period.label}</span>
          </button>
        ))}
      </div>

      {/* Period Dropdown */}
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          iconName="ChevronDown"
          iconPosition="right"
          iconSize={16}
          className="min-w-[140px] justify-between"
        >
          {getCurrentSelection()}
        </Button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-200 max-h-64 overflow-y-auto">
            <div className="py-2">
              {getAvailableOptions().map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedQuarter(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-2 text-sm transition-colors
                    ${getCurrentSelection() === option
                      ? 'bg-primary/10 text-primary font-medium' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comparison Toggle */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-text-secondary">Compare to:</span>
        <select className="text-sm bg-background border border-border rounded px-2 py-1 text-text-primary focus:outline-none focus:border-primary">
          <option value="previous">Previous Period</option>
          <option value="last-year">Same Period Last Year</option>
          <option value="none">No Comparison</option>
        </select>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center space-x-2 ml-4">
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconSize={16}
          title="Reset to current period"
        >
          Reset
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Calendar"
          iconSize={16}
          title="Custom date range"
        >
          Custom
        </Button>
      </div>

      {/* Click outside handler */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-100" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default FiscalPeriodSelector;