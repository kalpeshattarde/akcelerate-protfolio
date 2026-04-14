import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MeetingHeader = ({
  meetingTitle = "Team Standup",
  meetingId = "123-456-789",
  isRecording = false,
  participantCount = 0,
  onShowInfo,
  onShowSettings,
  onToggleFullscreen,
  isFullscreen = false
}) => {
  const [duration, setDuration] = useState(0);
  const [showMeetingInfo, setShowMeetingInfo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
    }
    return `${minutes}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const copyMeetingId = () => {
    navigator.clipboard?.writeText(meetingId);
    // Could show a toast notification here
  };

  return (
    <div className="fixed top-16 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 z-40">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section - Meeting Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowMeetingInfo(!showMeetingInfo)}
              className="flex items-center space-x-2 text-white hover:bg-slate-700"
            >
              <div className="text-left">
                <p className="text-sm text-slate-300">ID: {meetingId}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-slate-400" />
            </Button>

            {/* Meeting Info Dropdown */}
            {showMeetingInfo && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevated z-50">
                <div className="p-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground">Meeting Title</label>
                      <p className="text-sm text-muted-foreground">{meetingTitle}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Meeting ID</label>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground font-mono">{meetingId}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyMeetingId}
                          className="h-6 w-6 p-0"
                        >
                          <Icon name="Copy" size={12} />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Duration</label>
                      <p className="text-sm text-muted-foreground">{formatDuration(duration)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Participants</label>
                      <p className="text-sm text-muted-foreground">{participantCount} people</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="flex items-center space-x-2 bg-red-600/20 text-red-400 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Recording</span>
            </div>
          )}
        </div>

        {/* Center Section - Duration */}
        <div className="flex items-center space-x-2 bg-slate-700 text-white px-4 py-2 rounded-full">
          <Icon name="Clock" size={16} className="text-slate-300" />
          <span className="text-sm font-medium">{formatDuration(duration)}</span>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-3">
          {/* Network Quality */}
          <div className="flex items-center space-x-2 text-green-400">
            <Icon name="Wifi" size={16} />
            <span className="text-sm font-medium">Good</span>
          </div>

          {/* Participant Count Badge */}
          <div className="flex items-center space-x-1 bg-slate-700 px-3 py-1 rounded-full">
            <Icon name="Users" size={14} className="text-slate-300" />
            <span className="text-sm font-medium text-white">{participantCount}</span>
          </div>

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onShowSettings}
            title="Meeting settings"
          >
            <Icon name="Settings" size={16} />
          </Button>

          {/* More Options */}
          <Button
            variant="ghost"
            size="icon"
            title="More options"
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showMeetingInfo && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowMeetingInfo(false)}
        />
      )}
    </div>
  );
};

export default MeetingHeader;