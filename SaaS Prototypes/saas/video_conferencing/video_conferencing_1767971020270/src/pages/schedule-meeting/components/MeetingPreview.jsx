import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MeetingPreview = ({
  meetingData,
  participants,
  settings,
  recurringSettings
}) => {
  const formatDateTime = () => {
    if (!meetingData?.date || !meetingData?.time) return 'Date and time not set';
    
    const date = new Date(meetingData.date);
    const [hours, minutes] = meetingData?.time?.split(':');
    date?.setHours(parseInt(hours), parseInt(minutes));
    
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateMeetingId = () => {
    return Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase();
  };

  const meetingId = generateMeetingId();
  const joinUrl = `https://videoconf.app/join/${meetingId}`;

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    // You could add a toast notification here
  };

  const getSecurityText = () => {
    switch (settings?.security) {
      case 'password': return 'Password protected';
      case 'approval': return 'Host approval required';
      case 'both': return 'Password + approval required';
      default: return 'Open access';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Eye" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Meeting Preview</h2>
      </div>
      <div className="space-y-6">
        {/* Meeting Info Card */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {meetingData?.title || 'Untitled Meeting'}
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} className="text-muted-foreground" />
              <span className="text-foreground">{formatDateTime()}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-foreground">
                {meetingData?.duration ? `${meetingData?.duration} minutes` : 'Duration not set'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={14} className="text-muted-foreground" />
              <span className="text-foreground">{meetingData?.timezone || 'UTC'}</span>
            </div>

            {recurringSettings?.enabled && (
              <div className="flex items-center space-x-2">
                <Icon name="Repeat" size={14} className="text-muted-foreground" />
                <span className="text-foreground">
                  Recurring {recurringSettings?.frequency}
                </span>
              </div>
            )}
          </div>

          {meetingData?.description && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-sm text-muted-foreground">{meetingData?.description}</p>
            </div>
          )}
        </div>

        {/* Join Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Join Information</h4>
          
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Meeting ID
              </label>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono text-sm text-foreground">{meetingId}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(meetingId)}
                  className="w-6 h-6"
                >
                  <Icon name="Copy" size={12} />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Join URL
              </label>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-foreground truncate mr-2">{joinUrl}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(joinUrl)}
                  className="w-6 h-6 flex-shrink-0"
                >
                  <Icon name="Copy" size={12} />
                </Button>
              </div>
            </div>

            {settings?.password && (
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Password
                </label>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-sm text-foreground">••••••••</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(settings?.password)}
                    className="w-6 h-6"
                  >
                    <Icon name="Copy" size={12} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Participants */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Participants</h4>
            <span className="text-sm text-muted-foreground">
              {participants?.length} invited
            </span>
          </div>
          
          {participants?.length > 0 ? (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {participants?.slice(0, 5)?.map((participant) => (
                <div key={participant?.id} className="flex items-center space-x-2 text-sm">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {participant?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <span className="text-foreground">{participant?.name}</span>
                  <span className="text-muted-foreground">({participant?.role})</span>
                </div>
              ))}
              {participants?.length > 5 && (
                <p className="text-sm text-muted-foreground">
                  +{participants?.length - 5} more participants
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No participants added yet</p>
          )}
        </div>

        {/* Settings Summary */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Settings</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} className="text-muted-foreground" />
              <span className="text-foreground">{getSecurityText()}</span>
            </div>
            
            {settings?.waitingRoom && (
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-foreground">Waiting room</span>
              </div>
            )}
            
            {settings?.recording !== 'none' && (
              <div className="flex items-center space-x-2">
                <Icon name="Video" size={14} className="text-muted-foreground" />
                <span className="text-foreground">Recording enabled</span>
              </div>
            )}
            
            {settings?.screenSharing && (
              <div className="flex items-center space-x-2">
                <Icon name="Monitor" size={14} className="text-muted-foreground" />
                <span className="text-foreground">Screen sharing</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => copyToClipboard(`Join the meeting: ${joinUrl}\nMeeting ID: ${meetingId}${settings?.password ? `\nPassword: ${settings?.password}` : ''}`)}
            iconName="Share"
            iconPosition="left"
            className="w-full"
          >
            Copy Invitation Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingPreview;