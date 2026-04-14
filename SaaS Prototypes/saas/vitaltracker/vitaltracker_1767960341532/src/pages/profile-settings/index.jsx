import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import PersonalInfoSection from './components/PersonalInfoSection';
import HealthPreferencesSection from './components/HealthPreferencesSection';
import NotificationSettingsSection from './components/NotificationSettingsSection';
import PrivacyDataSection from './components/PrivacyDataSection';
import SecuritySection from './components/SecuritySection';
import ThemeCustomizationSection from './components/ThemeCustomizationSection';

const ProfileSettings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Profile Settings - VitalTracker</title>
        <meta name="description" content="Manage your VitalTracker account settings, health preferences, privacy options, and security settings." />
      </Helmet>

      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Customize your VitalTracker experience and manage your account preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Personal Information */}
          <PersonalInfoSection />

          {/* Health Preferences */}
          <HealthPreferencesSection />

          {/* Notification Settings */}
          <NotificationSettingsSection />

          {/* Theme Customization */}
          <ThemeCustomizationSection />

          {/* Privacy & Data */}
          <PrivacyDataSection />

          {/* Security Settings */}
          <SecuritySection />
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-muted/30 rounded-xl text-center">
          <p className="text-sm text-muted-foreground">
            Need help with your settings? Visit our{' '}
            <a href="#" className="text-primary hover:underline">Help Center</a>{' '}
            or{' '}
            <a href="#" className="text-primary hover:underline">Contact Support</a>
          </p>
        </div>
      </main>

      <QuickActionButton />
    </div>
  );
};

export default ProfileSettings;