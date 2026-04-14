import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface DiscussionCardProps {
  discussion: {
    id: string;
    title: string;
    excerpt: string;
    author: {
      name: string;
      avatar: string;
      avatarAlt: string;
      badge: string;
    };
    category: string;
    replies: number;
    views: number;
    likes: number;
    lastReply: string;
    isPinned: boolean;
    hasInstructorReply: boolean;
  };
  onClick: () => void;
}

const DiscussionCard = ({ discussion, onClick }: DiscussionCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-left group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary/30 transition-all duration-300">
            <AppImage
              src={discussion.author.avatar}
              alt={discussion.author.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {discussion.isPinned && (
                  <Icon name="BookmarkIcon" size={16} className="text-accent flex-shrink-0" variant="solid" />
                )}
                <h3 className="font-headline text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                  {discussion.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="font-medium">{discussion.author.name}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  {discussion.author.badge}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span>{discussion.category}</span>
              </div>
            </div>
            {discussion.hasInstructorReply && (
              <div className="flex-shrink-0 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full flex items-center gap-1">
                <Icon name="AcademicCapIcon" size={14} />
                <span>Instructor</span>
              </div>
            )}
          </div>
          <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
            {discussion.excerpt}
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="ChatBubbleLeftIcon" size={16} />
              <span>{discussion.replies} replies</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="EyeIcon" size={16} />
              <span>{discussion.views} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="HeartIcon" size={16} />
              <span>{discussion.likes} likes</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <Icon name="ClockIcon" size={16} />
              <span>Last reply {discussion.lastReply}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default DiscussionCard;