import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecordingListItem = ({ recording, onPlay, onShare, onDownload, onDelete, isSelected, onSelect }) => {
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
    <div className={`bg-surface border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-subtle ${
      isSelected ? 'ring-2 ring-primary border-primary' : ''
    }`}>
      <div className="flex items-center space-x-4">
        {/* Selection Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(recording?.id, e?.target?.checked)}
          className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
        />

        {/* Thumbnail */}
        <div className="relative w-20 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
          <Image
            src={recording?.thumbnail}
            alt={`${recording?.title} thumbnail`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPlay(recording)}
              className="w-6 h-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
            >
              <Icon name="Play" size={12} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground text-sm truncate">
                {recording?.title}
              </h3>
              <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                <span>{new Date(recording.date)?.toLocaleDateString()}</span>
                <span>{formatDuration(recording?.duration)}</span>
                <span>{recording?.participantCount} participants</span>
                <span>by {recording?.organizer}</span>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center space-x-3 ml-4">
              <div className={`text-xs px-2 py-1 rounded ${getQualityColor(recording?.quality)}`}>
                {recording?.quality}
              </div>
              
              <div className="text-xs text-muted-foreground">
                {formatFileSize(recording?.fileSize)}
              </div>

              {recording?.hasTranscription && (
                <Icon name="FileText" size={16} className="text-accent" />
              )}

              {recording?.isShared && (
                <Icon name="Link" size={16} className="text-accent" />
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 ml-4">
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
      </div>
    </div>
  );
};

export default RecordingListItem;