import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const QuickActionCard = ({ title, description, icon, href, color }: QuickActionCardProps) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    secondary: 'bg-secondary/10 text-secondary'
  };

  return (
    <Link href={href} className="group">
      <div className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses[color as keyof typeof colorClasses]}`}>
            <Icon name={icon as any} variant="solid" size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-headline font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {title}
            </h4>
            <p className="text-sm text-muted-foreground font-body">
              {description}
            </p>
          </div>
          <Icon 
            name="ChevronRightIcon" 
            size={20} 
            className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" 
          />
        </div>
      </div>
    </Link>
  );
};

export default QuickActionCard;