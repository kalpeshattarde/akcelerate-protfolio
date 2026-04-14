import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    description: string;
    type: string;
    author: string;
    downloads: number;
    rating: number;
    uploadedDate: string;
    fileSize: string;
  };
  onDownload: () => void;
}

const ResourceCard = ({ resource, onDownload }: ResourceCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'DocumentTextIcon';
      case 'Video':
        return 'VideoCameraIcon';
      case 'Audio':
        return 'MusicalNoteIcon';
      default:
        return 'DocumentIcon';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'bg-error/10 text-error';
      case 'Video':
        return 'bg-primary/10 text-primary';
      case 'Audio':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${getTypeColor(resource.type)} flex items-center justify-center`}>
          <Icon name={getTypeIcon(resource.type) as any} size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-headline text-lg font-semibold text-foreground mb-1 line-clamp-1">
            {resource.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-2 line-clamp-2">
            {resource.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>By {resource.author}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>{resource.uploadedDate}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="ArrowDownTrayIcon" size={16} />
            <span>{resource.downloads}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="StarIcon" size={16} className="text-accent" variant="solid" />
            <span>{resource.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="DocumentIcon" size={16} />
            <span>{resource.fileSize}</span>
          </div>
        </div>
        <button
          onClick={onDownload}
          className="px-4 py-2 font-cta font-medium text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;