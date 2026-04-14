// src/pages/user-dashboard-trip-management/components/LoyaltyProgramStatus.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const LoyaltyProgramStatus = () => {
  const [loyaltyData, setLoyaltyData] = useState(null);
  const [activeProgram, setActiveProgram] = useState('travelhub');

  // Mock loyalty program data
  useEffect(() => {
    const mockData = {
      travelhub: {
        memberSince: '2022-03-15',
        currentTier: 'Gold',
        currentPoints: 15420,
        nextTier: 'Platinum',
        pointsToNextTier: 4580,
        yearlyProgress: {
          flightsRequired: 25,
          flightsTaken: 18,
          spendRequired: 15000,
          spendAchieved: 12300
        },
        benefits: [
          { name: 'Priority Boarding', active: true },
          { name: 'Free Seat Selection', active: true },
          { name: 'Lounge Access', active: true },
          { name: 'Free Checked Bag', active: false, tier: 'Platinum' },
          { name: 'Companion Pass', active: false, tier: 'Platinum' }
        ],
        recentActivity: [
          { date: '2024-01-20', activity: 'Flight to Tokyo', points: 2500 },
          { date: '2024-01-15', activity: 'Hotel Booking', points: 890 },
          { date: '2023-12-22', activity: 'Flight to London', points: 1800 }
        ]
      },
      airlines: {
        delta: {
          program: 'Delta SkyMiles',
          tier: 'Silver',
          miles: 45230,
          nextTier: 'Gold',
          milesToNext: 29770
        },
        united: {
          program: 'United MileagePlus',
          tier: 'Bronze',
          miles: 18950,
          nextTier: 'Silver',
          milesToNext: 6050
        }
      }
    };
    
    setLoyaltyData(mockData);
  }, []);

  const getTierColor = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'platinum': return 'text-purple-600 bg-purple-100';
      case 'gold': return 'text-accent-600 bg-accent-100';
      case 'silver': return 'text-secondary-600 bg-secondary-200';
      case 'bronze': return 'text-orange-600 bg-orange-100';
      default: return 'text-text-secondary bg-secondary-100';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'platinum': return 'Crown';
      case 'gold': return 'Award';
      case 'silver': return 'Medal';
      case 'bronze': return 'Shield';
      default: return 'User';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleRedeemPoints = () => {
    console.log('Redirect to points redemption page');
  };

  const handleViewAllPrograms = () => {
    console.log('View all loyalty programs');
  };

  if (!loyaltyData) {
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

  const mainProgram = loyaltyData.travelhub;
  const progressPercentage = ((mainProgram.yearlyProgress.spendAchieved / mainProgram.yearlyProgress.spendRequired) * 100);
  const flightProgress = ((mainProgram.yearlyProgress.flightsTaken / mainProgram.yearlyProgress.flightsRequired) * 100);

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading-semibold text-text-primary">Loyalty Status</h2>
          <Icon name="Star" size={20} className="text-accent-600" />
        </div>

        {/* Current Status */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-body-medium ${getTierColor(mainProgram.currentTier)}`}>
              <Icon name={getTierIcon(mainProgram.currentTier)} size={16} className="mr-1" />
              {mainProgram.currentTier} Member
            </span>
          </div>
          
          <div className="text-2xl font-heading-bold text-text-primary mb-1">
            {mainProgram.currentPoints.toLocaleString()}
          </div>
          <p className="text-text-secondary text-sm">
            points available • Member since {formatDate(mainProgram.memberSince)}
          </p>
        </div>

        {/* Progress to Next Tier */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body-medium text-text-primary">
              Progress to {mainProgram.nextTier}
            </span>
            <span className="text-sm text-text-secondary">
              {mainProgram.pointsToNextTier.toLocaleString()} more points needed
            </span>
          </div>
          
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-accent-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${Math.min(((mainProgram.currentPoints % 20000) / 20000) * 100, 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Yearly Requirements Progress */}
        <div className="mb-6">
          <h3 className="text-sm font-body-medium text-text-primary mb-3">This Year's Progress</h3>
          
          <div className="space-y-3">
            {/* Spending Progress */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">Qualifying Spend</span>
                <span className="text-xs text-text-secondary">
                  {formatCurrency(mainProgram.yearlyProgress.spendAchieved)} / {formatCurrency(mainProgram.yearlyProgress.spendRequired)}
                </span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Flight Progress */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">Qualifying Flights</span>
                <span className="text-xs text-text-secondary">
                  {mainProgram.yearlyProgress.flightsTaken} / {mainProgram.yearlyProgress.flightsRequired}
                </span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-1.5">
                <div 
                  className="bg-success-600 h-1.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(flightProgress, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Benefits */}
        <div className="mb-6">
          <h3 className="text-sm font-body-medium text-text-primary mb-3">Your Benefits</h3>
          <div className="space-y-2">
            {mainProgram.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={benefit.active ? "CheckCircle" : "Circle"} 
                    size={14} 
                    className={benefit.active ? "text-success-600" : "text-secondary-300"}
                  />
                  <span className={`text-sm ${
                    benefit.active 
                      ? 'text-text-primary' :'text-text-secondary'
                  }`}>
                    {benefit.name}
                  </span>
                </div>
                {!benefit.active && benefit.tier && (
                  <span className="text-xs text-text-secondary">
                    {benefit.tier}+
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h3 className="text-sm font-body-medium text-text-primary mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {mainProgram.recentActivity.slice(0, 3).map((activity, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-text-primary">{activity.activity}</p>
                  <p className="text-xs text-text-secondary">{formatDate(activity.date)}</p>
                </div>
                <span className="text-success-600 font-body-medium">+{activity.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Other Programs Quick View */}
        <div className="mb-6">
          <h3 className="text-sm font-body-medium text-text-primary mb-3">Other Programs</h3>
          <div className="space-y-2">
            {Object.entries(loyaltyData.airlines).map(([key, program]) => (
              <div key={key} className="flex items-center justify-between p-2 bg-secondary-50 rounded-lg">
                <div>
                  <p className="text-sm font-body-medium text-text-primary">{program.program}</p>
                  <p className="text-xs text-text-secondary">{program.tier} • {program.miles.toLocaleString()} miles</p>
                </div>
                <Icon name="ExternalLink" size={14} className="text-text-secondary" />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleRedeemPoints}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 ease-out"
          >
            <Icon name="Gift" size={16} />
            <span className="text-sm font-body-medium">Redeem Points</span>
          </button>
          
          <button
            onClick={handleViewAllPrograms}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors duration-200 ease-out"
          >
            <Icon name="Eye" size={16} />
            <span className="text-sm font-body-medium">View All Programs</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgramStatus;