// src/pages/user-dashboard-trip-management/index.jsx
import React, { useState, useEffect } from 'react';
import CustomerHeader from 'components/ui/CustomerHeader';
import NotificationBanner from 'components/ui/NotificationBanner';
import UpcomingTripsSection from './components/UpcomingTripsSection';
import BookingHistorySection from './components/BookingHistorySection';
import QuickRebookingWidget from './components/QuickRebookingWidget';
import CarbonFootprintTracker from './components/CarbonFootprintTracker';
import LoyaltyProgramStatus from './components/LoyaltyProgramStatus';
import TravelerProfileSection from './components/TravelerProfileSection';
import GoogleCalendarIntegration from './components/GoogleCalendarIntegration';
import Icon from 'components/AppIcon';

const UserDashboardTripManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    loyaltyStatus: 'Gold',
    loyaltyPoints: 15420,
    carbonOffset: 2.4
  });

  const [quickStats, setQuickStats] = useState({
    upcomingTrips: 2,
    totalBookings: 24,
    savedDestinations: 8,
    carbonSaved: 45
  });

  // Mock notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'warning',
        title: 'Flight Delay Update',
        message: 'Your flight AA1234 to Los Angeles has been delayed by 30 minutes.',
        action: {
          label: 'View Details',
          onClick: () => console.log('View flight details')
        }
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'trips', label: 'My Trips', icon: 'MapPin' },
    { id: 'history', label: 'Booking History', icon: 'History' },
    { id: 'profile', label: 'Profile', icon: 'User' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader />
      
      {/* Notifications */}
      <NotificationBanner
        notifications={notifications}
        onDismiss={dismissNotification}
        position="top"
      />
      
      <main className="pt-16">
        {/* User Header Section */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* User Info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <Icon name="User" size={32} className="text-primary" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-heading-bold text-text-primary">Welcome back, {user.name}</h1>
                  <p className="text-text-secondary">{user.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium bg-accent-100 text-accent-600">
                      <Icon name="Star" size={12} className="mr-1" />
                      {user.loyaltyStatus} Member
                    </span>
                    <span className="text-sm text-text-secondary">
                      {user.loyaltyPoints.toLocaleString()} points
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-auto">
                <div className="text-center p-3 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-heading-bold text-primary">{quickStats.upcomingTrips}</div>
                  <div className="text-xs text-text-secondary">Upcoming</div>
                </div>
                <div className="text-center p-3 bg-success-100 rounded-lg">
                  <div className="text-2xl font-heading-bold text-success-600">{quickStats.totalBookings}</div>
                  <div className="text-xs text-text-secondary">Total Trips</div>
                </div>
                <div className="text-center p-3 bg-accent-100 rounded-lg">
                  <div className="text-2xl font-heading-bold text-accent-600">{quickStats.savedDestinations}</div>
                  <div className="text-xs text-text-secondary">Saved</div>
                </div>
                <div className="text-center p-3 bg-secondary-100 rounded-lg">
                  <div className="text-2xl font-heading-bold text-secondary-600">{quickStats.carbonSaved}%</div>
                  <div className="text-xs text-text-secondary">CO₂ Saved</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-6">
              <nav className="flex space-x-1 overflow-x-auto" aria-label="Dashboard tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-body-medium rounded-lg transition-all duration-200 ease-out whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-secondary-100'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Mobile-first layout with responsive grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Primary content */}
                <div className="lg:col-span-2 space-y-6">
                  <UpcomingTripsSection />
                  <QuickRebookingWidget />
                </div>

                {/* Right Column - Secondary widgets */}
                <div className="space-y-6">
                  <LoyaltyProgramStatus />
                  <CarbonFootprintTracker />
                  <GoogleCalendarIntegration />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="space-y-6">
              <UpcomingTripsSection detailed={true} />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <BookingHistorySection />
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <TravelerProfileSection />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboardTripManagement;