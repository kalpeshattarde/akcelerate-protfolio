import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationSettingsSection = () => {
  const [notifications, setNotifications] = useState({
    email: {
      dailyReminders: true,
      weeklyReports: true,
      achievements: true,
      goalUpdates: false,
      tips: true
    },
    push: {
      waterReminders: true,
      activityReminders: true,
      sleepReminders: true,
      mealReminders: false,
      achievements: true
    },
    inApp: {
      achievements: true,
      milestones: true,
      tips: true,
      updates: false
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (category, setting) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [setting]: !prev?.[category]?.[setting]
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving notification settings:', notifications);
    setHasChanges(false);
  };

  const handleReset = () => {
    setNotifications({
      email: {
        dailyReminders: true,
        weeklyReports: true,
        achievements: true,
        goalUpdates: false,
        tips: true
      },
      push: {
        waterReminders: true,
        activityReminders: true,
        sleepReminders: true,
        mealReminders: false,
        achievements: true
      },
      inApp: {
        achievements: true,
        milestones: true,
        tips: true,
        updates: false
      }
    });
    setHasChanges(false);
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
          <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-lg">
            <Icon name="Bell" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Notification Settings</h2>
            <p className="text-sm text-muted-foreground">Manage how you receive updates and reminders</p>
          </div>
        </div>
        {hasChanges && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleReset} size="sm">
              Reset
            </Button>
            <Button variant="default" onClick={handleSave} size="sm">
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-8">
        {/* Email Notifications */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Mail" size={18} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Email Notifications</h3>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 space-y-1">
            <ToggleSwitch
              checked={notifications?.email?.dailyReminders}
              onChange={() => handleToggle('email', 'dailyReminders')}
              label="Daily Reminders"
              description="Get daily motivation and goal reminders"
            />
            <ToggleSwitch
              checked={notifications?.email?.weeklyReports}
              onChange={() => handleToggle('email', 'weeklyReports')}
              label="Weekly Progress Reports"
              description="Receive detailed weekly health summaries"
            />
            <ToggleSwitch
              checked={notifications?.email?.achievements}
              onChange={() => handleToggle('email', 'achievements')}
              label="Achievement Notifications"
              description="Celebrate your milestones and badges"
            />
            <ToggleSwitch
              checked={notifications?.email?.goalUpdates}
              onChange={() => handleToggle('email', 'goalUpdates')}
              label="Goal Updates"
              description="Notifications when you reach your daily goals"
            />
            <ToggleSwitch
              checked={notifications?.email?.tips}
              onChange={() => handleToggle('email', 'tips')}
              label="Health Tips"
              description="Personalized wellness tips and advice"
            />
          </div>
        </div>

        {/* Push Notifications */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Smartphone" size={18} className="text-secondary" />
            <h3 className="text-lg font-medium text-foreground">Push Notifications</h3>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 space-y-1">
            <ToggleSwitch
              checked={notifications?.push?.waterReminders}
              onChange={() => handleToggle('push', 'waterReminders')}
              label="Water Reminders"
              description="Stay hydrated with regular water intake reminders"
            />
            <ToggleSwitch
              checked={notifications?.push?.activityReminders}
              onChange={() => handleToggle('push', 'activityReminders')}
              label="Activity Reminders"
              description="Get reminded to move and stay active"
            />
            <ToggleSwitch
              checked={notifications?.push?.sleepReminders}
              onChange={() => handleToggle('push', 'sleepReminders')}
              label="Sleep Reminders"
              description="Bedtime reminders for better sleep hygiene"
            />
            <ToggleSwitch
              checked={notifications?.push?.mealReminders}
              onChange={() => handleToggle('push', 'mealReminders')}
              label="Meal Reminders"
              description="Reminders to log your meals and snacks"
            />
            <ToggleSwitch
              checked={notifications?.push?.achievements}
              onChange={() => handleToggle('push', 'achievements')}
              label="Achievement Alerts"
              description="Instant notifications for completed goals"
            />
          </div>
        </div>

        {/* In-App Notifications */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Monitor" size={18} className="text-accent" />
            <h3 className="text-lg font-medium text-foreground">In-App Notifications</h3>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 space-y-1">
            <ToggleSwitch
              checked={notifications?.inApp?.achievements}
              onChange={() => handleToggle('inApp', 'achievements')}
              label="Achievement Popups"
              description="Show celebration popups for completed goals"
            />
            <ToggleSwitch
              checked={notifications?.inApp?.milestones}
              onChange={() => handleToggle('inApp', 'milestones')}
              label="Milestone Celebrations"
              description="Special animations for major milestones"
            />
            <ToggleSwitch
              checked={notifications?.inApp?.tips}
              onChange={() => handleToggle('inApp', 'tips')}
              label="Contextual Tips"
              description="Show helpful tips based on your activity"
            />
            <ToggleSwitch
              checked={notifications?.inApp?.updates}
              onChange={() => handleToggle('inApp', 'updates')}
              label="Feature Updates"
              description="Notifications about new features and improvements"
            />
          </div>
        </div>

        {/* Quiet Hours */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Moon" size={18} className="text-warning" />
            <h3 className="text-lg font-medium text-foreground">Quiet Hours</h3>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Set quiet hours to pause non-urgent notifications during your rest time
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Start Time</label>
                <input
                  type="time"
                  defaultValue="22:00"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">End Time</label>
                <input
                  type="time"
                  defaultValue="07:00"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsSection;