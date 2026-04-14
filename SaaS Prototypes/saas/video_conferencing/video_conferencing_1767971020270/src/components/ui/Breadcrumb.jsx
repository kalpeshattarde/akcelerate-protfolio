import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeLabels = {
    '/dashboard': 'Dashboard',
    '/meeting-room': 'Meeting Room',
    '/schedule-meeting': 'Schedule Meeting',
    '/recordings-library': 'Recordings Library',
    '/analytics-dashboard': 'Analytics Dashboard',
    '/user-management': 'User Management',
    '/register': 'Register'
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard' }];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on dashboard or single-level pages
  if (breadcrumbs?.length <= 1 || location?.pathname === '/dashboard') {
    return null;
  }

  const handleNavigation = (path, isLast) => {
    if (!isLast && path) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="mx-2 text-muted-foreground" 
              />
            )}
            {item?.isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {item?.label}
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(item?.path, item?.isLast)}
                className="hover:text-primary transition-micro focus:outline-none focus:text-primary"
                aria-label={`Navigate to ${item?.label}`}
              >
                {item?.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;