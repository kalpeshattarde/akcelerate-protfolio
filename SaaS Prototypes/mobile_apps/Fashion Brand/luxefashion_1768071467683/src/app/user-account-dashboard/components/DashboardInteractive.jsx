'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AccountHeader from './AccountHeader';
import QuickActions from './QuickActions';
import RecentOrders from './RecentOrders';
import AccountInfo from './AccountInfo';
import WishlistSection from './WishlistSection';
import LoyaltyProgram from './LoyaltyProgram';
import PersonalizedRecommendations from './PersonalizedRecommendations';

const DashboardInteractive = ({ initialData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'HomeIcon' },
    { id: 'orders', label: 'Orders', icon: 'ShoppingBagIcon' },
    { id: 'account', label: 'Account', icon: 'UserIcon' },
    { id: 'wishlist', label: 'Wishlist', icon: 'HeartIcon' },
    { id: 'loyalty', label: 'Loyalty', icon: 'StarIcon' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <QuickActions actions={initialData?.quickActions} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentOrders orders={initialData?.recentOrders} />
              <WishlistSection wishlistItems={initialData?.wishlistItems} />
            </div>
            <PersonalizedRecommendations recommendations={initialData?.recommendations} />
          </div>
        );
      case 'orders':
        return <RecentOrders orders={initialData?.recentOrders} />;
      case 'account':
        return <AccountInfo accountData={initialData?.accountData} />;
      case 'wishlist':
        return <WishlistSection wishlistItems={initialData?.wishlistItems} />;
      case 'loyalty':
        return <LoyaltyProgram loyaltyData={initialData?.loyaltyData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AccountHeader user={initialData?.user} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Mobile Tab Navigation */}
        <div className="md:hidden mb-6">
          <div className="flex overflow-x-auto gap-2 pb-2">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors btn-press ${
                  activeTab === tab?.id
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card text-card-foreground hover:bg-accent/10'
                }`}
              >
                {tab?.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-card p-6 sticky top-24">
              <h3 className="font-heading font-bold text-card-foreground mb-4">Dashboard</h3>
              <nav className="space-y-1">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors btn-press ${
                      activeTab === tab?.id
                        ? 'bg-accent text-accent-foreground'
                        : 'text-card-foreground hover:bg-accent/10 hover:text-accent'
                    }`}
                  >
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardInteractive.propTypes = {
  initialData: PropTypes?.shape({
    user: PropTypes?.object?.isRequired,
    quickActions: PropTypes?.array?.isRequired,
    recentOrders: PropTypes?.array?.isRequired,
    accountData: PropTypes?.object?.isRequired,
    wishlistItems: PropTypes?.array?.isRequired,
    loyaltyData: PropTypes?.object?.isRequired,
    recommendations: PropTypes?.array?.isRequired
  })?.isRequired
};

export default DashboardInteractive;