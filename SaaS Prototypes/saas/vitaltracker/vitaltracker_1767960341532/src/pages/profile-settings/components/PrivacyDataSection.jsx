import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacyDataSection = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    dataSharing: false,
    analyticsOptIn: true,
    marketingEmails: false,
    thirdPartySharing: false
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev?.[setting]
    }));
    setHasChanges(true);
  };

  const handleSelectChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving privacy settings:', privacySettings);
    setHasChanges(false);
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
    // Simulate data export
    const exportData = {
      profile: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        joinDate: "2024-01-15"
      },
      healthData: {
        totalSteps: 2847593,
        totalCalories: 156780,
        totalWaterIntake: 1247,
        averageSleep: 7.5
      },
      goals: {
        dailySteps: 10000,
        dailyCalories: 2000,
        dailyWater: 8,
        sleepHours: 8
      }
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vitaltracker-data-export.json';
    link?.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
    setShowDeleteConfirm(false);
    // In a real app, this would trigger account deletion process
  };

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="bg-card rounded-xl p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-warning rounded-lg">
            <Icon name="Shield" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Privacy & Data</h2>
            <p className="text-sm text-muted-foreground">Manage your privacy settings and data preferences</p>
          </div>
        </div>
        {hasChanges && (
          <Button variant="default" onClick={handleSave} size="sm">
            Save Changes
          </Button>
        )}
      </div>
      <div className="space-y-8">
        {/* Privacy Settings */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Privacy Settings</h3>
          <div className="bg-muted/30 rounded-lg p-4 space-y-4">
            {/* Profile Visibility */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Profile Visibility</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { value: 'public', label: 'Public', description: 'Visible to all users' },
                  { value: 'friends', label: 'Friends Only', description: 'Visible to connected friends' },
                  { value: 'private', label: 'Private', description: 'Only visible to you' }
                ]?.map((option) => (
                  <div
                    key={option?.value}
                    onClick={() => handleSelectChange('profileVisibility', option?.value)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      privacySettings?.profileVisibility === option?.value
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        privacySettings?.profileVisibility === option?.value
                          ? 'border-primary bg-primary' :'border-border'
                      }`}>
                        {privacySettings?.profileVisibility === option?.value && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span className="font-medium text-foreground text-sm">{option?.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{option?.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Sharing Toggles */}
            <div className="space-y-1">
              <ToggleSwitch
                checked={privacySettings?.dataSharing}
                onChange={() => handleToggle('dataSharing')}
                label="Share Anonymous Data"
                description="Help improve the app by sharing anonymized usage data"
              />
              <ToggleSwitch
                checked={privacySettings?.analyticsOptIn}
                onChange={() => handleToggle('analyticsOptIn')}
                label="Analytics & Performance"
                description="Allow collection of app performance and usage analytics"
              />
              <ToggleSwitch
                checked={privacySettings?.marketingEmails}
                onChange={() => handleToggle('marketingEmails')}
                label="Marketing Communications"
                description="Receive promotional emails about new features and offers"
              />
              <ToggleSwitch
                checked={privacySettings?.thirdPartySharing}
                onChange={() => handleToggle('thirdPartySharing')}
                label="Third-party Integrations"
                description="Allow sharing data with connected fitness apps and devices"
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Data Management</h3>
          <div className="bg-muted/30 rounded-lg p-4 space-y-4">
            {/* Export Data */}
            <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-lg">
                  <Icon name="Download" size={20} color="white" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Export Your Data</h4>
                  <p className="text-sm text-muted-foreground">Download a copy of all your health data</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleExportData} iconName="Download" iconPosition="left">
                Export
              </Button>
            </div>

            {/* Data Retention */}
            <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-lg">
                  <Icon name="Clock" size={20} color="white" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Data Retention</h4>
                  <p className="text-sm text-muted-foreground">Your data is kept for 7 years or until account deletion</p>
                </div>
              </div>
              <Button variant="ghost" iconName="Info">
                Learn More
              </Button>
            </div>

            {/* Clear Data */}
            <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-warning rounded-lg">
                  <Icon name="Trash2" size={20} color="white" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Clear All Data</h4>
                  <p className="text-sm text-muted-foreground">Permanently delete all your health tracking data</p>
                </div>
              </div>
              <Button variant="outline" iconName="Trash2" iconPosition="left">
                Clear Data
              </Button>
            </div>
          </div>
        </div>

        {/* Account Deletion */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Account Deletion</h3>
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-destructive rounded-lg">
                <Icon name="AlertTriangle" size={20} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-2">Delete Account</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button 
                  variant="destructive" 
                  onClick={() => setShowDeleteConfirm(true)}
                  iconName="Trash2" 
                  iconPosition="left"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Security & Compliance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-success/5 border border-success/20 rounded-lg">
              <Icon name="Shield" size={20} className="text-success" />
              <div>
                <span className="text-sm font-medium text-foreground">HIPAA Compliant</span>
                <p className="text-xs text-muted-foreground">Your health data is protected</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-success/5 border border-success/20 rounded-lg">
              <Icon name="Lock" size={20} className="text-success" />
              <div>
                <span className="text-sm font-medium text-foreground">End-to-End Encrypted</span>
                <p className="text-xs text-muted-foreground">Data encrypted in transit and at rest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-xl p-6 max-w-md w-full elevation-3">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-destructive rounded-lg">
                <Icon name="AlertTriangle" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Account</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to permanently delete your account? All your health data, progress, and achievements will be lost forever.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteConfirm(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteAccount}
                fullWidth
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyDataSection;