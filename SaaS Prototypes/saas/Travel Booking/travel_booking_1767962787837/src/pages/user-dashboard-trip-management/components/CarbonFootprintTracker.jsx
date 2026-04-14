// src/pages/user-dashboard-trip-management/components/CarbonFootprintTracker.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const CarbonFootprintTracker = () => {
  const [period, setPeriod] = useState('monthly');
  const [carbonData, setCarbonData] = useState({});
  const [offsetGoal, setOffsetGoal] = useState(50);
  const [offsetAchieved, setOffsetAchieved] = useState(32);

  // Mock carbon footprint data
  useEffect(() => {
    const mockData = {
      monthly: {
        current: 2.4,
        previous: 3.1,
        average: 2.8,
        breakdown: [
          { type: 'Flights', amount: 1.8, percentage: 75 },
          { type: 'Hotels', amount: 0.4, percentage: 17 },
          { type: 'Ground Transport', amount: 0.2, percentage: 8 }
        ],
        monthlyData: [
          { month: 'Oct', emissions: 3.2 },
          { month: 'Nov', emissions: 2.8 },
          { month: 'Dec', emissions: 3.1 },
          { month: 'Jan', emissions: 2.4 }
        ]
      },
      yearly: {
        current: 18.5,
        previous: 22.3,
        average: 20.4,
        breakdown: [
          { type: 'Flights', amount: 14.2, percentage: 77 },
          { type: 'Hotels', amount: 2.8, percentage: 15 },
          { type: 'Ground Transport', amount: 1.5, percentage: 8 }
        ],
        yearlyData: [
          { year: '2021', emissions: 25.1 },
          { year: '2022', emissions: 22.3 },
          { year: '2023', emissions: 20.8 },
          { year: '2024', emissions: 18.5 }
        ]
      }
    };
    
    setCarbonData(mockData);
  }, []);

  const currentData = carbonData[period];
  const reductionPercentage = currentData ? 
    Math.round(((currentData.previous - currentData.current) / currentData.previous) * 100) : 0;
  const offsetProgress = (offsetAchieved / offsetGoal) * 100;

  const getReductionColor = (percentage) => {
    if (percentage > 0) return 'text-success-600';
    if (percentage < 0) return 'text-error-600';
    return 'text-text-secondary';
  };

  const getReductionIcon = (percentage) => {
    if (percentage > 0) return 'TrendingDown';
    if (percentage < 0) return 'TrendingUp';
    return 'Minus';
  };

  const handleOffsetAction = () => {
    console.log('Purchase carbon offset credits');
  };

  const handleViewDetailedReport = () => {
    console.log('View detailed carbon footprint report');
  };

  if (!currentData) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
          <div className="h-8 bg-secondary-200 rounded w-1/2"></div>
          <div className="h-24 bg-secondary-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading-semibold text-text-primary">Carbon Footprint</h2>
          <Icon name="Leaf" size={20} className="text-success-600" />
        </div>

        {/* Period Toggle */}
        <div className="flex space-x-1 bg-secondary-100 p-1 rounded-lg mb-4">
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1.5 rounded-md text-sm font-body-medium transition-all duration-200 ease-out flex-1 ${
              period === 'monthly' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-primary'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod('yearly')}
            className={`px-3 py-1.5 rounded-md text-sm font-body-medium transition-all duration-200 ease-out flex-1 ${
              period === 'yearly' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-primary'
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Current Emissions */}
        <div className="text-center mb-4">
          <div className="text-3xl font-heading-bold text-text-primary mb-1">
            {currentData.current}t
          </div>
          <p className="text-text-secondary text-sm mb-2">
            CO₂ emissions this {period.replace('ly', '')}
          </p>
          
          {/* Comparison with Previous Period */}
          <div className={`flex items-center justify-center space-x-1 text-sm ${getReductionColor(reductionPercentage)}`}>
            <Icon name={getReductionIcon(reductionPercentage)} size={14} />
            <span>
              {Math.abs(reductionPercentage)}% vs last {period.replace('ly', '')}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Emissions Breakdown */}
        <div className="mb-6">
          <h3 className="text-sm font-body-medium text-text-primary mb-3">Emissions Breakdown</h3>
          <div className="space-y-3">
            {currentData.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: 
                        index === 0 ? '#EF4444' : 
                        index === 1 ? '#F59E0B' : '#10B981'
                    }}
                  ></div>
                  <span className="text-sm text-text-secondary">{item.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-body-medium text-text-primary">{item.amount}t</span>
                  <span className="text-xs text-text-secondary">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon Offset Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-body-medium text-text-primary">Carbon Offset Goal</h3>
            <span className="text-sm text-text-secondary">{offsetAchieved}% of {offsetGoal}%</span>
          </div>
          
          <div className="w-full bg-secondary-200 rounded-full h-2 mb-2">
            <div 
              className="bg-success-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(offsetProgress, 100)}%` }}
            ></div>
          </div>
          
          <p className="text-xs text-text-secondary">
            {offsetProgress >= 100 ? 'Goal achieved! 🎉' : `${Math.round(offsetGoal - offsetAchieved)}% more to reach your goal`}
          </p>
        </div>

        {/* Quick Insights */}
        <div className="bg-primary-50 p-4 rounded-lg mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-body-medium text-primary-700 mb-1">Quick Insight</h4>
              <p className="text-xs text-primary-600">
                {reductionPercentage > 0 
                  ? `Great job! You've reduced your carbon footprint by ${reductionPercentage}% compared to last ${period.replace('ly', '')}.`
                  : reductionPercentage < 0
                  ? `Your emissions increased by ${Math.abs(reductionPercentage)}%. Consider eco-friendly travel options for your next trip.`
                  : `Your emissions are stable. Explore carbon offset options to achieve your sustainability goals.`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleOffsetAction}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors duration-200 ease-out"
          >
            <Icon name="Leaf" size={16} />
            <span className="text-sm font-body-medium">Purchase Carbon Offsets</span>
          </button>
          
          <button
            onClick={handleViewDetailedReport}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors duration-200 ease-out"
          >
            <Icon name="BarChart3" size={16} />
            <span className="text-sm font-body-medium">View Detailed Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintTracker;