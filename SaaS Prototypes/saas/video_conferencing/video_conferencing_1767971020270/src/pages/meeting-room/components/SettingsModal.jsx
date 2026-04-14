import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsModal = ({ 
  isOpen = false, 
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('audio-video');
  const [settings, setSettings] = useState({
    // Audio/Video Settings
    microphone: 'default',
    camera: 'default',
    speaker: 'default',
    microphoneVolume: 75,
    speakerVolume: 80,
    noiseCancellation: true,
    echoCancellation: true,
    autoGainControl: true,
    
    // Video Settings
    videoQuality: 'hd',
    frameRate: '30',
    virtualBackground: 'none',
    mirrorVideo: true,
    
    // General Settings
    joinWithMicMuted: false,
    joinWithCameraOff: false,
    showParticipantNames: true,
    enableReactions: true,
    enableChat: true,
    
    // Recording Settings
    recordingQuality: 'hd',
    recordingFormat: 'mp4',
    autoRecord: false,
    
    // Accessibility
    highContrast: false,
    largeText: false,
    screenReader: false
  });

  const tabs = [
    { id: 'audio-video', label: 'Audio & Video', icon: 'Settings' },
    { id: 'general', label: 'General', icon: 'Sliders' },
    { id: 'recording', label: 'Recording', icon: 'Video' },
    { id: 'accessibility', label: 'Accessibility', icon: 'Eye' }
  ];

  const deviceOptions = [
    { value: 'default', label: 'Default Device' },
    { value: 'device-1', label: 'Built-in Microphone' },
    { value: 'device-2', label: 'External USB Microphone' }
  ];

  const videoQualityOptions = [
    { value: 'low', label: 'Low (360p)' },
    { value: 'medium', label: 'Medium (720p)' },
    { value: 'hd', label: 'HD (1080p)' },
    { value: 'uhd', label: '4K (2160p)' }
  ];

  const frameRateOptions = [
    { value: '15', label: '15 FPS' },
    { value: '30', label: '30 FPS' },
    { value: '60', label: '60 FPS' }
  ];

  const virtualBackgroundOptions = [
    { value: 'none', label: 'None' },
    { value: 'blur', label: 'Blur Background' },
    { value: 'office', label: 'Office' },
    { value: 'nature', label: 'Nature' },
    { value: 'abstract', label: 'Abstract' }
  ];

  const recordingFormatOptions = [
    { value: 'mp4', label: 'MP4' },
    { value: 'webm', label: 'WebM' },
    { value: 'mov', label: 'MOV' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSave?.(settings);
    onClose();
  };

  const testAudio = () => {
    console.log('Testing audio...');
  };

  const testVideo = () => {
    console.log('Testing video...');
  };

  if (!isOpen) return null;

  const renderAudioVideoTab = () => (
    <div className="space-y-8">
      {/* Audio Settings Section */}
      <div className="bg-background/50 rounded-lg p-6 border border-border/50">
        <h4 className="text-lg font-semibold text-foreground mb-6 pb-2 border-b border-border/30">
          Audio Settings
        </h4>
        <div className="space-y-6">
          {/* Device Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Microphone"
              options={deviceOptions}
              value={settings?.microphone}
              onChange={(value) => handleSettingChange('microphone', value)}
              className="z-40"
            />
            
            <Select
              label="Speaker"
              options={deviceOptions}
              value={settings?.speaker}
              onChange={(value) => handleSettingChange('speaker', value)}
              className="z-40"
            />
          </div>

          {/* Volume Controls */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground flex items-center justify-between">
                <span>Microphone Volume</span>
                <span className="text-primary font-semibold">{settings?.microphoneVolume}%</span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings?.microphoneVolume}
                  onChange={(e) => handleSettingChange('microphoneVolume', parseInt(e?.target?.value))}
                  className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${settings?.microphoneVolume}%, #e5e7eb ${settings?.microphoneVolume}%, #e5e7eb 100%)`
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground flex items-center justify-between">
                <span>Speaker Volume</span>
                <span className="text-primary font-semibold">{settings?.speakerVolume}%</span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings?.speakerVolume}
                  onChange={(e) => handleSettingChange('speakerVolume', parseInt(e?.target?.value))}
                  className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${settings?.speakerVolume}%, #e5e7eb ${settings?.speakerVolume}%, #e5e7eb 100%)`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Audio Enhancement Options */}
          <div className="space-y-4 pt-4 border-t border-border/30">
            <h5 className="text-sm font-semibold text-foreground mb-3">Audio Enhancement</h5>
            <div className="space-y-3">
              <Checkbox
                label="Noise Cancellation"
                checked={settings?.noiseCancellation}
                onChange={(e) => handleSettingChange('noiseCancellation', e?.target?.checked)}
                description="Reduce background noise during calls"
              />
              <Checkbox
                label="Echo Cancellation"
                checked={settings?.echoCancellation}
                onChange={(e) => handleSettingChange('echoCancellation', e?.target?.checked)}
                description="Prevent audio feedback and echo"
              />
              <Checkbox
                label="Auto Gain Control"
                checked={settings?.autoGainControl}
                onChange={(e) => handleSettingChange('autoGainControl', e?.target?.checked)}
                description="Automatically adjust microphone sensitivity"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border/30">
            <Button variant="outline" onClick={testAudio} className="w-full sm:w-auto">
              <Icon name="Volume2" size={16} className="mr-2" />
              Test Audio
            </Button>
          </div>
        </div>
      </div>

      {/* Video Settings Section */}
      <div className="bg-background/50 rounded-lg p-6 border border-border/50">
        <h4 className="text-lg font-semibold text-foreground mb-6 pb-2 border-b border-border/30">
          Video Settings
        </h4>
        <div className="space-y-6">
          {/* Camera and Quality Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Camera"
              options={deviceOptions}
              value={settings?.camera}
              onChange={(value) => handleSettingChange('camera', value)}
              className="z-30"
            />

            <Select
              label="Video Quality"
              options={videoQualityOptions}
              value={settings?.videoQuality}
              onChange={(value) => handleSettingChange('videoQuality', value)}
              className="z-30"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Frame Rate"
              options={frameRateOptions}
              value={settings?.frameRate}
              onChange={(value) => handleSettingChange('frameRate', value)}
              className="z-30"
            />

            <Select
              label="Virtual Background"
              options={virtualBackgroundOptions}
              value={settings?.virtualBackground}
              onChange={(value) => handleSettingChange('virtualBackground', value)}
              className="z-30"
            />
          </div>

          {/* Video Options */}
          <div className="pt-4 border-t border-border/30">
            <h5 className="text-sm font-semibold text-foreground mb-3">Video Options</h5>
            <Checkbox
              label="Mirror my video"
              checked={settings?.mirrorVideo}
              onChange={(e) => handleSettingChange('mirrorVideo', e?.target?.checked)}
              description="Show mirrored version of your video feed"
            />
          </div>

          <div className="pt-4 border-t border-border/30">
            <Button variant="outline" onClick={testVideo} className="w-full sm:w-auto">
              <Icon name="Video" size={16} className="mr-2" />
              Test Video
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGeneralTab = () => (
    <div className="space-y-8">
      {/* Meeting Defaults Section */}
      <div className="bg-background/50 rounded-lg p-6 border border-border/50">
        <h4 className="text-lg font-semibold text-foreground mb-6 pb-2 border-b border-border/30">
          Meeting Defaults
        </h4>
        <div className="space-y-4">
          <Checkbox
            label="Join with microphone muted"
            checked={settings?.joinWithMicMuted}
            onChange={(e) => handleSettingChange('joinWithMicMuted', e?.target?.checked)}
            description="Automatically mute microphone when joining meetings"
          />
          <Checkbox
            label="Join with camera off"
            checked={settings?.joinWithCameraOff}
            onChange={(e) => handleSettingChange('joinWithCameraOff', e?.target?.checked)}
            description="Automatically turn off camera when joining meetings"
          />
        </div>
      </div>

      {/* Display Options Section */}
      <div className="bg-background/50 rounded-lg p-6 border border-border/50">
        <h4 className="text-lg font-semibold text-foreground mb-6 pb-2 border-b border-border/30">
          Display Options
        </h4>
        <div className="space-y-4">
          <Checkbox
            label="Show participant names"
            checked={settings?.showParticipantNames}
            onChange={(e) => handleSettingChange('showParticipantNames', e?.target?.checked)}
            description="Display names overlay on participant videos"
          />
          <Checkbox
            label="Enable reactions"
            checked={settings?.enableReactions}
            onChange={(e) => handleSettingChange('enableReactions', e?.target?.checked)}
            description="Allow emoji reactions during meetings"
          />
          <Checkbox
            label="Enable chat"
            checked={settings?.enableChat}
            onChange={(e) => handleSettingChange('enableChat', e?.target?.checked)}
            description="Show chat panel during meetings"
          />
        </div>
      </div>
    </div>
  );

  const renderRecordingTab = () => (
    <div className="space-y-8">
      {/* Recording Settings Section */}
      <div className="bg-background/50 rounded-lg p-6 border border-border/50">
        <h4 className="text-lg font-semibold text-foreground mb-6 pb-2 border-b border-border/30">
          Recording Settings
        </h4>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Recording Quality"
              options={videoQualityOptions}
              value={settings?.recordingQuality}
              onChange={(value) => handleSettingChange('recordingQuality', value)}
              className="z-20"
            />

            <Select
              label="Recording Format"
              options={recordingFormatOptions}
              value={settings?.recordingFormat}
              onChange={(value) => handleSettingChange('recordingFormat', value)}
              className="z-20"
            />
          </div>

          <div className="pt-4 border-t border-border/30">
            <Checkbox
              label="Auto-record meetings"
              description="Automatically start recording when joining a meeting"
              checked={settings?.autoRecord}
              onChange={(e) => handleSettingChange('autoRecord', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessibilityTab = () => (
    <div className="space-y-8">
      {/* Accessibility Options Section */}
      <div className="bg-background/50 rounded-lg p-6 border border-border/50">
        <h4 className="text-lg font-semibold text-foreground mb-6 pb-2 border-b border-border/30">
          Accessibility Options
        </h4>
        <div className="space-y-4">
          <Checkbox
            label="High contrast mode"
            description="Increase contrast for better visibility"
            checked={settings?.highContrast}
            onChange={(e) => handleSettingChange('highContrast', e?.target?.checked)}
          />
          <Checkbox
            label="Large text"
            description="Increase text size throughout the interface"
            checked={settings?.largeText}
            onChange={(e) => handleSettingChange('largeText', e?.target?.checked)}
          />
          <Checkbox
            label="Screen reader support"
            description="Enable additional screen reader announcements"
            checked={settings?.screenReader}
            onChange={(e) => handleSettingChange('screenReader', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'audio-video': return renderAudioVideoTab();
      case 'general': return renderGeneralTab();
      case 'recording': return renderRecordingTab();
      case 'accessibility': return renderAccessibilityTab();
      default: return renderAudioVideoTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Meeting Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
            <nav className="space-y-1">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} className="shrink-0" />
                  <span className="text-sm font-medium truncate">{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50/50">
            <div className="p-6 space-y-6">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-white">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;