import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionLauncher = ({ 
  userRole = 'esg-manager',
  currentPage = '',
  position = 'bottom-right',
  isVisible = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentActions, setRecentActions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Define actions based on user role and current context
  const getAvailableActions = () => {
    const baseActions = [
      {
        id: 'new-report',
        label: 'New Report',
        icon: 'FileText',
        description: 'Create compliance report',
        category: 'reporting',
        shortcut: 'Ctrl+N',
        roles: ['esg-manager', 'compliance-officer', 'admin']
      },
      {
        id: 'import-data',
        label: 'Import Data',
        icon: 'Upload',
        description: 'Upload ESG data files',
        category: 'data',
        shortcut: 'Ctrl+U',
        roles: ['esg-manager', 'admin']
      },
      {
        id: 'export-dashboard',
        label: 'Export Dashboard',
        icon: 'Download',
        description: 'Export current view',
        category: 'export',
        shortcut: 'Ctrl+E',
        roles: ['esg-manager', 'compliance-officer', 'admin']
      },
      {
        id: 'schedule-report',
        label: 'Schedule Report',
        icon: 'Calendar',
        description: 'Schedule automated reporting',
        category: 'automation',
        roles: ['esg-manager', 'compliance-officer', 'admin']
      },
      {
        id: 'data-validation',
        label: 'Validate Data',
        icon: 'CheckCircle',
        description: 'Run data quality checks',
        category: 'validation',
        roles: ['esg-manager', 'admin']
      },
      {
        id: 'add-user',
        label: 'Add User',
        icon: 'UserPlus',
        description: 'Create new user account',
        category: 'admin',
        roles: ['admin']
      },
      {
        id: 'system-backup',
        label: 'System Backup',
        icon: 'HardDrive',
        description: 'Initiate system backup',
        category: 'admin',
        roles: ['admin']
      },
      {
        id: 'audit-log',
        label: 'View Audit Log',
        icon: 'Eye',
        description: 'Access audit trail',
        category: 'compliance',
        roles: ['compliance-officer', 'admin']
      }
    ];

    // Filter actions based on user role
    const roleBasedActions = baseActions?.filter(action => 
      action?.roles?.includes(userRole)
    );

    // Prioritize actions based on current page context
    const contextualActions = roleBasedActions?.sort((a, b) => {
      const contextPriority = {
        'esg-analytics-dashboard': ['export-dashboard', 'new-report', 'data-validation'],
        'esg-data-collection-interface': ['import-data', 'data-validation', 'export-dashboard'],
        'compliance-reporting-center': ['new-report', 'schedule-report', 'export-dashboard'],
        'user-management-console': ['add-user', 'audit-log', 'system-backup'],
        'audit-trail-viewer': ['audit-log', 'export-dashboard', 'system-backup']
      };

      const currentPriority = contextPriority?.[currentPage] || [];
      const aIndex = currentPriority?.indexOf(a?.id);
      const bIndex = currentPriority?.indexOf(b?.id);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });

    return contextualActions?.slice(0, 6); // Limit to 6 actions
  };

  const availableActions = getAvailableActions();

  useEffect(() => {
    // Load recent actions from localStorage
    const stored = localStorage.getItem('esg-recent-actions');
    if (stored) {
      setRecentActions(JSON.parse(stored));
    }

    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        const action = availableActions?.find(a => 
          a?.shortcut === `${e?.ctrlKey ? 'Ctrl' : 'Cmd'}+${e?.key?.toUpperCase()}`
        );
        if (action) {
          e?.preventDefault();
          handleActionClick(action);
        }
      }
      
      // Toggle with Alt+Q
      if (e?.altKey && e?.key === 'q') {
        e?.preventDefault();
        setIsExpanded(!isExpanded);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [availableActions, isExpanded]);

  const handleActionClick = async (action) => {
    setIsLoading(true);
    
    try {
      // Simulate action execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update recent actions
      const updatedRecent = [
        { ...action, timestamp: new Date()?.toISOString() },
        ...recentActions?.filter(r => r?.id !== action?.id)
      ]?.slice(0, 3);
      
      setRecentActions(updatedRecent);
      localStorage.setItem('esg-recent-actions', JSON.stringify(updatedRecent));
      
      // Handle specific actions
      switch (action?.id) {
        case 'new-report':
          // Navigate to report creation
          console.log('Creating new report...');
          break;
        case 'import-data':
          // Trigger file upload
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.csv,.xlsx,.json';
          input.multiple = true;
          input?.click();
          break;
        case 'export-dashboard':
          // Export current dashboard
          console.log('Exporting dashboard...');
          break;
        case 'data-validation':
          // Run validation checks
          console.log('Running data validation...');
          break;
        default:
          console.log(`Executing action: ${action?.label}`);
      }
      
      setIsExpanded(false);
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'reporting': return 'FileText';
      case 'data': return 'Database';
      case 'export': return 'Download';
      case 'automation': return 'Zap';
      case 'validation': return 'Shield';
      case 'admin': return 'Settings';
      case 'compliance': return 'Scale';
      default: return 'Circle';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'reporting': return 'text-primary';
      case 'data': return 'text-secondary';
      case 'export': return 'text-success';
      case 'automation': return 'text-warning';
      case 'validation': return 'text-accent';
      case 'admin': return 'text-error';
      case 'compliance': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  if (!isVisible) return null;

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-20 right-6',
    'top-left': 'top-20 left-6'
  };

  return (
    <div className={`fixed ${positionClasses?.[position]} z-50`}>
      {/* Expanded Actions Menu */}
      {isExpanded && (
        <div className="mb-4 bg-card border border-border rounded-lg shadow-floating backdrop-blur-sm">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Quick Actions</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Alt+Q</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Actions */}
          {recentActions?.length > 0 && (
            <div className="p-4 border-b border-border">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Recent</h4>
              <div className="space-y-2">
                {recentActions?.map((action) => (
                  <button
                    key={`recent-${action?.id}`}
                    onClick={() => handleActionClick(action)}
                    disabled={isLoading}
                    className="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-muted transition-colors duration-150 disabled:opacity-50"
                  >
                    <div className={`${getCategoryColor(action?.category)}`}>
                      <Icon name={action?.icon} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{action?.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(action.timestamp)?.toLocaleTimeString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Available Actions */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Available Actions</h4>
            <div className="grid grid-cols-1 gap-2">
              {availableActions?.map((action) => (
                <button
                  key={action?.id}
                  onClick={() => handleActionClick(action)}
                  disabled={isLoading}
                  className="flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-muted transition-all duration-150 disabled:opacity-50 group"
                >
                  <div className={`${getCategoryColor(action?.category)} group-hover:scale-110 transition-transform duration-150`}>
                    <Icon name={action?.icon} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{action?.label}</span>
                      {action?.shortcut && (
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {action?.shortcut}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {action?.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Main Action Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        disabled={isLoading}
        className={`w-14 h-14 rounded-full shadow-floating hover:shadow-lg transition-all duration-300 ${
          isExpanded ? 'rotate-45' : 'hover:scale-110'
        }`}
        size="icon"
      >
        {isLoading ? (
          <Icon name="Loader2" size={24} className="animate-spin" />
        ) : (
          <Icon name={isExpanded ? "X" : "Plus"} size={24} />
        )}
      </Button>
      {/* Keyboard Hint */}
      {!isExpanded && (
        <div className="absolute -top-8 right-0 bg-popover border border-border rounded px-2 py-1 text-xs text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
          Alt+Q
        </div>
      )}
    </div>
  );
};

export default QuickActionLauncher;