import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TypographyControls = ({ 
  fontSize, 
  onFontSizeChange, 
  lineHeight, 
  onLineHeightChange,
  theme,
  onThemeChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fontSizes = [
    { label: 'Small', value: 'text-sm', size: 14 },
    { label: 'Medium', value: 'text-base', size: 16 },
    { label: 'Large', value: 'text-lg', size: 18 },
    { label: 'Extra Large', value: 'text-xl', size: 20 }
  ];

  const lineHeights = [
    { label: 'Tight', value: 'leading-tight' },
    { label: 'Normal', value: 'leading-normal' },
    { label: 'Relaxed', value: 'leading-relaxed' },
    { label: 'Loose', value: 'leading-loose' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className={`bg-background border border-border rounded-lg shadow-soft glassmorphism transition-all duration-300 ${
        isExpanded ? 'p-4 w-64' : 'p-3 w-auto'
      }`}>
        {isExpanded ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-medium text-sm">Reading Settings</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsExpanded(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            {/* Font Size Control */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Font Size</label>
              <div className="flex items-center space-x-2">
                <Icon name="Type" size={14} className="text-muted-foreground" />
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={fontSizes?.findIndex(f => f?.value === fontSize)}
                    onChange={(e) => onFontSizeChange(fontSizes?.[parseInt(e?.target?.value)]?.value)}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <span className="text-xs text-muted-foreground min-w-[2rem]">
                  {fontSizes?.find(f => f?.value === fontSize)?.size}px
                </span>
              </div>
            </div>

            {/* Line Height Control */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Line Height</label>
              <div className="flex items-center space-x-2">
                <Icon name="AlignJustify" size={14} className="text-muted-foreground" />
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={lineHeights?.findIndex(l => l?.value === lineHeight)}
                    onChange={(e) => onLineHeightChange(lineHeights?.[parseInt(e?.target?.value)]?.value)}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <span className="text-xs text-muted-foreground min-w-[3rem]">
                  {lineHeights?.find(l => l?.value === lineHeight)?.label}
                </span>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Theme</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onThemeChange('light')}
                  className="flex-1"
                >
                  <Icon name="Sun" size={14} className="mr-1" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onThemeChange('dark')}
                  className="flex-1"
                >
                  <Icon name="Moon" size={14} className="mr-1" />
                  Dark
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsExpanded(true)}
            className="w-10 h-10"
          >
            <Icon name="Settings" size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TypographyControls;