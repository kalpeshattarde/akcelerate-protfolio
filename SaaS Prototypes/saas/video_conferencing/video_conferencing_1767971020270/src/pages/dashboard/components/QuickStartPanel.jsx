import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const QuickStartPanel = ({ onStartMeeting }) => {
  const [meetingSettings, setMeetingSettings] = useState({
    title: '',
    enableVideo: true,
    enableAudio: true,
    enableChat: true,
    enableRecording: false,
    waitingRoom: true
  });

  const handleSettingChange = (key, value) => {
    setMeetingSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleStartMeeting = () => {
    onStartMeeting(meetingSettings);
  };

  const quickActions = [
    {
      id: 'instant',
      title: 'Instant Meeting',
      description: 'Start a meeting right now',
      icon: 'Video',
      color: 'primary',
      action: () => onStartMeeting({ ...meetingSettings, type: 'instant' })
    },
    {
      id: 'schedule',
      title: 'Schedule Meeting',
      description: 'Plan a meeting for later',
      icon: 'Calendar',
      color: 'accent',
      action: () => console.log('Navigate to schedule')
    },
    {
      id: 'join',
      title: 'Join Meeting',
      description: 'Enter meeting ID to join',
      icon: 'UserPlus',
      color: 'success',
      action: () => console.log('Show join modal')
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Zap" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Quick Start</h2>
      </div>
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className={`p-4 rounded-lg border-2 border-dashed border-border hover:border-${action?.color} hover:bg-${action?.color}/5 transition-smooth group`}
          >
            <div className={`w-10 h-10 bg-${action?.color}/10 text-${action?.color} rounded-lg flex items-center justify-center mb-3 group-hover:bg-${action?.color}/20 transition-smooth`}>
              <Icon name={action?.icon} size={20} />
            </div>
            <h3 className="font-medium text-foreground mb-1">{action?.title}</h3>
            <p className="text-sm text-muted-foreground">{action?.description}</p>
          </button>
        ))}
      </div>
      {/* Meeting Settings */}
      <div className="border-t border-border pt-6">
        <h3 className="font-medium text-foreground mb-4">Meeting Settings</h3>
        
        <div className="space-y-4">
          <Input
            label="Meeting Title (Optional)"
            type="text"
            placeholder="Enter meeting title"
            value={meetingSettings?.title}
            onChange={(e) => handleSettingChange('title', e?.target?.value)}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Checkbox
              label="Enable Video"
              checked={meetingSettings?.enableVideo}
              onChange={(e) => handleSettingChange('enableVideo', e?.target?.checked)}
            />
            <Checkbox
              label="Enable Audio"
              checked={meetingSettings?.enableAudio}
              onChange={(e) => handleSettingChange('enableAudio', e?.target?.checked)}
            />
            <Checkbox
              label="Enable Chat"
              checked={meetingSettings?.enableChat}
              onChange={(e) => handleSettingChange('enableChat', e?.target?.checked)}
            />
            <Checkbox
              label="Enable Recording"
              checked={meetingSettings?.enableRecording}
              onChange={(e) => handleSettingChange('enableRecording', e?.target?.checked)}
            />
          </div>
          
          <Checkbox
            label="Enable Waiting Room"
            description="Participants wait for host approval"
            checked={meetingSettings?.waitingRoom}
            onChange={(e) => handleSettingChange('waitingRoom', e?.target?.checked)}
          />
        </div>

        <div className="flex items-center space-x-3 mt-6">
          <Button
            variant="default"
            onClick={handleStartMeeting}
            iconName="Video"
            iconPosition="left"
            className="flex-1"
          >
            Start Meeting Now
          </Button>
          <Button
            variant="outline"
            iconName="Settings"
            iconSize={16}
          >
            Advanced
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickStartPanel;