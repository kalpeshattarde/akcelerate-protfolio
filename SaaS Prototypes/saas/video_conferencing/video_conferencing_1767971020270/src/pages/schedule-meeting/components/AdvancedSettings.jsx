import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AdvancedSettings = ({
  settings,
  onSettingsChange
}) => {
  const handleSettingChange = (field, value) => {
    onSettingsChange({
      ...settings,
      [field]: value
    });
  };

  const securityOptions = [
    { value: 'none', label: 'No Security' },
    { value: 'password', label: 'Password Protected' },
    { value: 'approval', label: 'Host Approval Required' },
    { value: 'both', label: 'Password + Approval' }
  ];

  const recordingOptions = [
    { value: 'none', label: 'No Recording' },
    { value: 'auto', label: 'Auto Record' },
    { value: 'manual', label: 'Manual Recording' },
    { value: 'cloud', label: 'Cloud Recording Only' }
  ];

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Shield" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Security Settings</h2>
        </div>

        <div className="space-y-4">
          <Select
            label="Meeting Security"
            options={securityOptions}
            value={settings?.security}
            onChange={(value) => handleSettingChange('security', value)}
            description="Choose how participants can join the meeting"
          />

          {(settings?.security === 'password' || settings?.security === 'both') && (
            <Input
              label="Meeting Password"
              type="password"
              placeholder="Enter meeting password"
              value={settings?.password}
              onChange={(e) => handleSettingChange('password', e?.target?.value)}
              description="Participants will need this password to join"
            />
          )}

          <Checkbox
            label="Enable Waiting Room"
            description="Participants wait for host approval before joining"
            checked={settings?.waitingRoom}
            onChange={(e) => handleSettingChange('waitingRoom', e?.target?.checked)}
          />

          <Checkbox
            label="Mute Participants on Entry"
            description="All participants join muted by default"
            checked={settings?.muteOnEntry}
            onChange={(e) => handleSettingChange('muteOnEntry', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Recording Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Video" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Recording Options</h2>
        </div>

        <div className="space-y-4">
          <Select
            label="Recording Mode"
            options={recordingOptions}
            value={settings?.recording}
            onChange={(value) => handleSettingChange('recording', value)}
            description="Choose recording preferences for this meeting"
          />

          {settings?.recording !== 'none' && (
            <>
              <Checkbox
                label="Record Audio Only"
                description="Save bandwidth by recording audio without video"
                checked={settings?.audioOnly}
                onChange={(e) => handleSettingChange('audioOnly', e?.target?.checked)}
              />

              <Checkbox
                label="Auto-generate Transcript"
                description="Automatically create meeting transcript"
                checked={settings?.transcript}
                onChange={(e) => handleSettingChange('transcript', e?.target?.checked)}
              />
            </>
          )}
        </div>
      </div>
      {/* Meeting Features */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Settings" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Meeting Features</h2>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Enable Screen Sharing"
            description="Allow participants to share their screens"
            checked={settings?.screenSharing}
            onChange={(e) => handleSettingChange('screenSharing', e?.target?.checked)}
          />

          <Checkbox
            label="Enable Chat"
            description="Allow text messaging during the meeting"
            checked={settings?.chat}
            onChange={(e) => handleSettingChange('chat', e?.target?.checked)}
          />

          <Checkbox
            label="Enable Polls"
            description="Allow hosts to create interactive polls"
            checked={settings?.polls}
            onChange={(e) => handleSettingChange('polls', e?.target?.checked)}
          />

          <Checkbox
            label="Enable Breakout Rooms"
            description="Allow splitting participants into smaller groups"
            checked={settings?.breakoutRooms}
            onChange={(e) => handleSettingChange('breakoutRooms', e?.target?.checked)}
          />

          <Checkbox
            label="Enable Virtual Backgrounds"
            description="Allow participants to use virtual backgrounds"
            checked={settings?.virtualBackgrounds}
            onChange={(e) => handleSettingChange('virtualBackgrounds', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Bell" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Send Calendar Invitations"
            description="Automatically send calendar invites to participants"
            checked={settings?.calendarInvite}
            onChange={(e) => handleSettingChange('calendarInvite', e?.target?.checked)}
          />

          <Checkbox
            label="Email Reminders"
            description="Send reminder emails before the meeting"
            checked={settings?.emailReminders}
            onChange={(e) => handleSettingChange('emailReminders', e?.target?.checked)}
          />

          <Checkbox
            label="SMS Notifications"
            description="Send SMS reminders to participants"
            checked={settings?.smsNotifications}
            onChange={(e) => handleSettingChange('smsNotifications', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;