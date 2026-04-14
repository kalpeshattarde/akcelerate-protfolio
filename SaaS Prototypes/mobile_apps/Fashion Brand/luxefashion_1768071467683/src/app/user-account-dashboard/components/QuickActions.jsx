'use client';

import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const QuickActions = ({ actions }) => {
  const [hoveredAction, setHoveredAction] = useState(null);

  return (
    <div className="bg-card p-6">
      <h2 className="text-xl font-heading font-bold text-card-foreground mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions?.map((action) => (
          <Link
            key={action?.id}
            href={action?.href}
            className="flex flex-col items-center p-4 bg-background border border-border hover:border-accent hover:bg-accent/5 transition-all duration-200 btn-press"
            onMouseEnter={() => setHoveredAction(action?.id)}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
              hoveredAction === action?.id ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={action?.icon} size={24} />
            </div>
            <span className="text-sm font-medium text-center text-foreground">{action?.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

QuickActions.propTypes = {
  actions: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      label: PropTypes?.string?.isRequired,
      icon: PropTypes?.string?.isRequired,
      href: PropTypes?.string?.isRequired
    })
  )?.isRequired
};

export default QuickActions;