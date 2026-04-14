import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ESGTabNavigation = ({ activeTab, onTabChange, userRole = 'esg-manager' }) => {
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    {
      id: 'environment',
      label: 'Environment',
      icon: 'Leaf',
      description: 'Energy, emissions, water & waste metrics',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      id: 'social',
      label: 'Social',
      icon: 'Users',
      description: 'Employee, community & stakeholder data',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20'
    },
    {
      id: 'governance',
      label: 'Governance',
      icon: 'Shield',
      description: 'Ethics, compliance & risk management',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    }
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
  };

  const handleKeyDown = (e, tabId) => {
    if (e?.key === 'Enter' || e?.key === ' ') {
      e?.preventDefault();
      handleTabClick(tabId);
    }
    // Keyboard shortcuts (1, 2, 3)
    if (e?.key >= '1' && e?.key <= '3') {
      const index = parseInt(e?.key) - 1;
      if (tabs?.[index]) {
        handleTabClick(tabs?.[index]?.id);
      }
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-1 mb-6">
      <div className="flex space-x-1">
        {tabs?.map((tab, index) => {
          const isActive = activeTab === tab?.id;
          const isHovered = hoveredTab === tab?.id;
          
          return (
            <button
              key={tab?.id}
              onClick={() => handleTabClick(tab?.id)}
              onKeyDown={(e) => handleKeyDown(e, tab?.id)}
              onMouseEnter={() => setHoveredTab(tab?.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                isActive
                  ? `${tab?.bgColor} ${tab?.borderColor} border ${tab?.color} shadow-sm`
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab?.id}-panel`}
              tabIndex={isActive ? 0 : -1}
            >
              {/* Icon */}
              <div className={`transition-all duration-300 ${
                isActive || isHovered ? 'scale-110' : 'scale-100'
              }`}>
                <Icon 
                  name={tab?.icon} 
                  size={20} 
                  className={isActive ? tab?.color : 'text-current'}
                />
              </div>
              {/* Label and Description */}
              <div className="text-left">
                <div className={`font-semibold text-sm ${
                  isActive ? tab?.color : 'text-current'
                }`}>
                  {tab?.label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 hidden lg:block">
                  {tab?.description}
                </div>
              </div>
              {/* Keyboard Shortcut Indicator */}
              <div className={`text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground transition-opacity duration-300 ${
                isActive || isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                {index + 1}
              </div>
            </button>
          );
        })}
      </div>
      {/* Active Tab Indicator */}
      <div className="relative mt-2">
        <div className="h-0.5 bg-border rounded-full">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              activeTab === 'environment' ? 'bg-success w-1/3' :
              activeTab === 'social' ? 'bg-secondary w-1/3 ml-1/3' :
              activeTab === 'governance' ? 'bg-warning w-1/3 ml-2/3' : ''
            }`}
            style={{
              marginLeft: 
                activeTab === 'social' ? '33.333%' :
                activeTab === 'governance' ? '66.666%' : '0%'
            }}
          />
        </div>
      </div>
      {/* Keyboard Shortcuts Help */}
      <div className="flex items-center justify-center mt-3 text-xs text-muted-foreground">
        <Icon name="Keyboard" size={12} className="mr-1" />
        <span>Press 1-3 for quick navigation</span>
      </div>
    </div>
  );
};

export default ESGTabNavigation;