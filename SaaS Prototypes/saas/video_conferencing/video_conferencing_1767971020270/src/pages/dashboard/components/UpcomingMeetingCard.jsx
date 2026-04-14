import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingMeetingCard = ({ meeting, onJoin, onEdit }) => {
  const formatTime = (dateTime) => {
    return new Date(dateTime)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateTime) => {
    return new Date(dateTime)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeUntilMeeting = (dateTime) => {
    const now = new Date();
    const meetingTime = new Date(dateTime);
    const diffMs = meetingTime - now;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 0) return 'Started';
    if (diffMins < 60) return `${diffMins}m`;
    const hours = Math.floor(diffMins / 60);
    return `${hours}h ${diffMins % 60}m`;
  };

  const isStartingSoon = (dateTime) => {
    const now = new Date();
    const meetingTime = new Date(dateTime);
    const diffMs = meetingTime - now;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return diffMins <= 15 && diffMins >= 0;
  };

  return (
    <div className={`bg-surface border rounded-lg p-4 hover:shadow-elevated transition-smooth ${
      isStartingSoon(meeting?.dateTime) ? 'border-warning bg-warning/5' : 'border-border'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-foreground mb-1">{meeting?.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{formatTime(meeting?.dateTime)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{formatDate(meeting?.dateTime)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{meeting?.participants} participants</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            isStartingSoon(meeting?.dateTime) 
              ? 'bg-warning/20 text-warning' :'bg-muted text-muted-foreground'
          }`}>
            {getTimeUntilMeeting(meeting?.dateTime)}
          </span>
        </div>
      </div>
      {meeting?.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {meeting?.description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {meeting?.attendees?.slice(0, 3)?.map((attendee, index) => (
              <div
                key={index}
                className="w-6 h-6 bg-primary rounded-full border-2 border-surface flex items-center justify-center text-xs text-primary-foreground font-medium"
              >
                {attendee?.name?.charAt(0)}
              </div>
            ))}
            {meeting?.attendees?.length > 3 && (
              <div className="w-6 h-6 bg-muted rounded-full border-2 border-surface flex items-center justify-center text-xs text-muted-foreground">
                +{meeting?.attendees?.length - 3}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(meeting)}
            iconName="Edit"
            iconSize={14}
          >
            Edit
          </Button>
          <Button
            variant={isStartingSoon(meeting?.dateTime) ? "default" : "outline"}
            size="sm"
            onClick={() => onJoin(meeting)}
            iconName="Video"
            iconSize={14}
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeetingCard;