import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon: string;
    topics: number;
    posts: number;
    lastActivity: string;
    color: string;
  };
  onClick: () => void;
}

const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-left group"
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon name={category.icon as any} size={24} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-headline text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {category.name}
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
            {category.description}
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="ChatBubbleLeftIcon" size={16} />
              <span>{category.topics} topics</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="DocumentTextIcon" size={16} />
              <span>{category.posts} posts</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="ClockIcon" size={16} />
              <span>{category.lastActivity}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;