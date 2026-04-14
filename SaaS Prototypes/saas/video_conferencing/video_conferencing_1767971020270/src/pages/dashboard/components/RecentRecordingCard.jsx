import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentRecordingCard = ({ recording, onPlay, onDownload, onShare }) => {
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
    }
    return `${minutes}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes?.[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex-shrink-0 w-80 bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <Image
          src="/assets/images/Screenshot_2025-08-26_at_9.35.24_AM-1756181128549.png"
          alt={`${recording?.title} thumbnail`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-smooth">
          <Button
            variant="default"
            size="icon"
            onClick={() => onPlay(recording)}
            className="w-12 h-12 rounded-full"
          >
            <Icon name="Play" size={20} />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          {formatDuration(recording?.duration)}
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-foreground line-clamp-2 flex-1">
            {recording?.title}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onShare(recording)}
              className="w-8 h-8"
            >
              <Icon name="Share" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDownload(recording)}
              className="w-8 h-8"
            >
              <Icon name="Download" size={14} />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>{formatDate(recording?.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{recording?.participants} participants</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="HardDrive" size={12} />
            <span>{formatFileSize(recording?.fileSize)}</span>
          </div>
        </div>

        {recording?.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {recording?.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-medium">
              {recording?.host?.charAt(0)}
            </div>
            <span className="text-sm text-muted-foreground">
              by {recording?.host}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              recording?.quality === 'HD' ?'bg-success/20 text-success' 
                : recording?.quality === 'SD' ?'bg-warning/20 text-warning' :'bg-muted text-muted-foreground'
            }`}>
              {recording?.quality}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentRecordingCard;