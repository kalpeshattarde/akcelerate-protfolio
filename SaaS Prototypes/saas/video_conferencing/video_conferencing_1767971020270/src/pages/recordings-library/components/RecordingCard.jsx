import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecordingCard = ({ recording, onPlay, onShare, onDownload, onDelete, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

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
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes?.[i];
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'HD': return 'text-success bg-success/10';
      case 'SD': return 'text-warning bg-warning/10';
      case 'Low': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div 
      className={`bg-surface border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-elevated ${
        isSelected ? 'ring-2 ring-primary border-primary' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-video bg-muted">
        <Image
          src={recording?.thumbnail}
          alt={`${recording?.title} thumbnail`}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Controls */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPlay(recording)}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
          >
            <Icon name="Play" size={24} />
          </Button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {formatDuration(recording?.duration)}
        </div>

        {/* Quality Badge */}
        <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${getQualityColor(recording?.quality)}`}>
          {recording?.quality}
        </div>

        {/* Selection Checkbox */}
        <div className="absolute top-2 left-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(recording?.id, e?.target?.checked)}
            className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
          />
        </div>
      </div>
      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-foreground text-sm line-clamp-2 flex-1">
            {recording?.title}
          </h3>
          {recording?.hasTranscription && (
            <Icon name="FileText" size={16} className="text-accent ml-2 flex-shrink-0" />
          )}
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={12} />
            <span>{new Date(recording.date)?.toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={12} />
            <span>{recording?.participantCount} participants</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="User" size={12} />
            <span>by {recording?.organizer}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="HardDrive" size={12} />
            <span>{formatFileSize(recording?.fileSize)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onShare(recording)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Share2" size={14} />
            </Button>
            
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onDownload(recording)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Download" size={14} />
            </Button>
            
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onDelete(recording)}
              className="text-muted-foreground hover:text-error"
            >
              <Icon name="Trash2" size={14} />
            </Button>
          </div>

          {recording?.isShared && (
            <div className="flex items-center space-x-1 text-xs text-accent">
              <Icon name="Link" size={12} />
              <span>Shared</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordingCard;