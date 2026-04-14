import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThemeCustomizationSection = () => {
  const [themeSettings, setThemeSettings] = useState({
    colorScheme: 'default',
    accentColor: 'green',
    fontSize: 'medium',
    animations: true,
    compactMode: false
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (setting, value) => {
    setThemeSettings(prev => ({ ...prev, [setting]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving theme settings:', themeSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setThemeSettings({
      colorScheme: 'default',
      accentColor: 'green',
      fontSize: 'medium',
      animations: true,
      compactMode: false
    });
    setHasChanges(false);
  };

  const colorSchemes = [
    { 
      value: 'default', 
      label: 'Default Light', 
      preview: 'linear-gradient(135deg, #F7FAF9 0%, #FFFFFF 100%)',
      description: 'Clean and bright interface'
    },
    { 
      value: 'warm', 
      label: 'Warm Light', 
      preview: 'linear-gradient(135deg, #FEF7ED 0%, #FFFBF5 100%)',
      description: 'Warmer tones for comfort'
    },
    { 
      value: 'cool', 
      label: 'Cool Light', 
      preview: 'linear-gradient(135deg, #F0F9FF 0%, #F8FAFC 100%)',
      description: 'Cool blues for focus'
    },
    { 
      value: 'dark', 
      label: 'Dark Mode', 
      preview: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
      description: 'Easy on the eyes'
    }
  ];

  const accentColors = [
    { value: 'green', label: 'Sage Green', color: '#5DB075', description: 'Calming and natural' },
    { value: 'blue', label: 'Ocean Blue', color: '#3B82F6', description: 'Trustworthy and professional' },
    { value: 'purple', label: 'Wellness Purple', color: '#8B5CF6', description: 'Creative and inspiring' },
    { value: 'teal', label: 'Mint Teal', color: '#14B8A6', description: 'Fresh and energizing' },
    { value: 'orange', label: 'Sunset Orange', color: '#F97316', description: 'Warm and motivating' },
    { value: 'pink', label: 'Soft Pink', color: '#EC4899', description: 'Gentle and caring' }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small', description: 'Compact text for more content' },
    { value: 'medium', label: 'Medium', description: 'Standard readable size' },
    { value: 'large', label: 'Large', description: 'Easier to read text' }
  ];

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="bg-card rounded-xl p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-lg">
            <Icon name="Palette" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Theme Customization</h2>
            <p className="text-sm text-muted-foreground">Personalize your VitalTracker experience</p>
          </div>
        </div>
        {hasChanges && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleReset} size="sm">
              Reset
            </Button>
            <Button variant="default" onClick={handleSave} size="sm">
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-8">
        {/* Color Scheme */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Color Scheme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colorSchemes?.map((scheme) => (
              <div
                key={scheme?.value}
                onClick={() => handleSettingChange('colorScheme', scheme?.value)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  themeSettings?.colorScheme === scheme?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-12 h-8 rounded-md border border-border"
                    style={{ background: scheme?.preview }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        themeSettings?.colorScheme === scheme?.value
                          ? 'border-primary bg-primary' :'border-border'
                      }`}>
                        {themeSettings?.colorScheme === scheme?.value && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span className="font-medium text-foreground">{scheme?.label}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{scheme?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Accent Color</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {accentColors?.map((color) => (
              <div
                key={color?.value}
                onClick={() => handleSettingChange('accentColor', color?.value)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  themeSettings?.accentColor === color?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div 
                    className="w-6 h-6 rounded-full border border-border"
                    style={{ backgroundColor: color?.color }}
                  ></div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      themeSettings?.accentColor === color?.value
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {themeSettings?.accentColor === color?.value && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="font-medium text-foreground text-sm">{color?.label}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{color?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Font Size</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fontSizes?.map((size) => (
              <div
                key={size?.value}
                onClick={() => handleSettingChange('fontSize', size?.value)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  themeSettings?.fontSize === size?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    themeSettings?.fontSize === size?.value
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {themeSettings?.fontSize === size?.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className={`font-medium text-foreground ${
                    size?.value === 'small' ? 'text-sm' : 
                    size?.value === 'large' ? 'text-lg' : 'text-base'
                  }`}>
                    {size?.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{size?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interface Options */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Interface Options</h3>
          <div className="bg-muted/30 rounded-lg p-4 space-y-1">
            <ToggleSwitch
              checked={themeSettings?.animations}
              onChange={() => handleSettingChange('animations', !themeSettings?.animations)}
              label="Smooth Animations"
              description="Enable transitions and micro-interactions"
            />
            <ToggleSwitch
              checked={themeSettings?.compactMode}
              onChange={() => handleSettingChange('compactMode', !themeSettings?.compactMode)}
              label="Compact Mode"
              description="Reduce spacing for more content on screen"
            />
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Preview</h3>
          <div className="bg-muted/30 rounded-lg p-6">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: accentColors?.find(c => c?.value === themeSettings?.accentColor)?.color }}
                >
                  <Icon name="Heart" size={20} color="white" />
                </div>
                <div>
                  <h4 className={`font-semibold text-foreground ${
                    themeSettings?.fontSize === 'small' ? 'text-base' : 
                    themeSettings?.fontSize === 'large' ? 'text-xl' : 'text-lg'
                  }`}>
                    Daily Progress
                  </h4>
                  <p className={`text-muted-foreground ${
                    themeSettings?.fontSize === 'small' ? 'text-xs' : 
                    themeSettings?.fontSize === 'large' ? 'text-base' : 'text-sm'
                  }`}>
                    Your wellness journey continues
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors?.find(c => c?.value === themeSettings?.accentColor)?.color}20` }}
                  >
                    <span 
                      className={`font-bold ${
                        themeSettings?.fontSize === 'small' ? 'text-lg' : 
                        themeSettings?.fontSize === 'large' ? 'text-2xl' : 'text-xl'
                      }`}
                      style={{ color: accentColors?.find(c => c?.value === themeSettings?.accentColor)?.color }}
                    >
                      8.2k
                    </span>
                  </div>
                  <p className={`text-muted-foreground ${
                    themeSettings?.fontSize === 'small' ? 'text-xs' : 
                    themeSettings?.fontSize === 'large' ? 'text-base' : 'text-sm'
                  }`}>
                    Steps
                  </p>
                </div>
                
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors?.find(c => c?.value === themeSettings?.accentColor)?.color}20` }}
                  >
                    <span 
                      className={`font-bold ${
                        themeSettings?.fontSize === 'small' ? 'text-lg' : 
                        themeSettings?.fontSize === 'large' ? 'text-2xl' : 'text-xl'
                      }`}
                      style={{ color: accentColors?.find(c => c?.value === themeSettings?.accentColor)?.color }}
                    >
                      6
                    </span>
                  </div>
                  <p className={`text-muted-foreground ${
                    themeSettings?.fontSize === 'small' ? 'text-xs' : 
                    themeSettings?.fontSize === 'large' ? 'text-base' : 'text-sm'
                  }`}>
                    Glasses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizationSection;