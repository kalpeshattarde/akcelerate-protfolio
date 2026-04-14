import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const MeetingTemplates = ({
  onApplyTemplate,
  currentMeetingData,
  onSaveTemplate
}) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const predefinedTemplates = [
    {
      id: 'team-standup',
      name: 'Team Standup',
      description: 'Quick daily team sync meeting',
      icon: 'Users',
      settings: {
        title: 'Daily Team Standup',
        duration: '30',
        security: 'none',
        waitingRoom: false,
        muteOnEntry: true,
        recording: 'none',
        screenSharing: true,
        chat: true,
        polls: false,
        breakoutRooms: false,
        virtualBackgrounds: true,
        calendarInvite: true,
        emailReminders: true,
        smsNotifications: false
      }
    },
    {
      id: 'client-presentation',
      name: 'Client Presentation',
      description: 'Professional client meeting with recording',
      icon: 'Presentation',
      settings: {
        title: 'Client Presentation',
        duration: '60',
        security: 'password',
        waitingRoom: true,
        muteOnEntry: true,
        recording: 'auto',
        screenSharing: true,
        chat: false,
        polls: true,
        breakoutRooms: false,
        virtualBackgrounds: true,
        calendarInvite: true,
        emailReminders: true,
        smsNotifications: false
      }
    },
    {
      id: 'training-session',
      name: 'Training Session',
      description: 'Interactive training with breakout rooms',
      icon: 'GraduationCap',
      settings: {
        title: 'Training Session',
        duration: '120',
        security: 'approval',
        waitingRoom: true,
        muteOnEntry: true,
        recording: 'auto',
        screenSharing: true,
        chat: true,
        polls: true,
        breakoutRooms: true,
        virtualBackgrounds: true,
        calendarInvite: true,
        emailReminders: true,
        smsNotifications: true
      }
    },
    {
      id: 'interview',
      name: 'Job Interview',
      description: 'Private interview session',
      icon: 'UserCheck',
      settings: {
        title: 'Job Interview',
        duration: '45',
        security: 'both',
        waitingRoom: true,
        muteOnEntry: false,
        recording: 'manual',
        screenSharing: false,
        chat: false,
        polls: false,
        breakoutRooms: false,
        virtualBackgrounds: true,
        calendarInvite: true,
        emailReminders: true,
        smsNotifications: false
      }
    }
  ];

  const [savedTemplates] = useState([
    {
      id: 'custom-1',
      name: 'Weekly Review',
      description: 'Custom template for weekly team reviews',
      icon: 'Calendar',
      isCustom: true,
      settings: {
        title: 'Weekly Team Review',
        duration: '90',
        security: 'password',
        waitingRoom: false,
        muteOnEntry: true,
        recording: 'auto',
        screenSharing: true,
        chat: true,
        polls: true,
        breakoutRooms: false,
        virtualBackgrounds: true,
        calendarInvite: true,
        emailReminders: true,
        smsNotifications: false
      }
    }
  ]);

  const allTemplates = [...predefinedTemplates, ...savedTemplates];

  const handleApplyTemplate = (template) => {
    onApplyTemplate(template?.settings);
  };

  const handleSaveTemplate = () => {
    if (templateName?.trim()) {
      const newTemplate = {
        id: `custom-${Date.now()}`,
        name: templateName,
        description: 'Custom saved template',
        icon: 'Bookmark',
        isCustom: true,
        settings: currentMeetingData
      };
      onSaveTemplate(newTemplate);
      setTemplateName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Layout" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Meeting Templates</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSaveDialog(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Save Template
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {allTemplates?.map((template) => (
            <div
              key={template?.id}
              className="border border-border rounded-lg p-4 hover:bg-muted transition-micro cursor-pointer"
              onClick={() => handleApplyTemplate(template)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={template?.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-foreground">{template?.name}</h3>
                    {template?.isCustom && (
                      <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                        Custom
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{template?.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <span>{template?.settings?.duration} min</span>
                    <span>{template?.settings?.security === 'none' ? 'Open' : 'Secured'}</span>
                    {template?.settings?.recording !== 'none' && <span>Recording</span>}
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {allTemplates?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Layout" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No templates available</p>
            <p className="text-xs text-muted-foreground mt-1">
              Save your current settings as a template for quick reuse
            </p>
          </div>
        )}
      </div>
      {/* Save Template Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Bookmark" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Save Template</h3>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Template Name"
                type="text"
                placeholder="Enter template name"
                value={templateName}
                onChange={(e) => setTemplateName(e?.target?.value)}
                required
              />
              
              <p className="text-sm text-muted-foreground">
                This will save your current meeting settings as a reusable template.
              </p>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowSaveDialog(false);
                    setTemplateName('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveTemplate}
                  disabled={!templateName?.trim()}
                  className="flex-1"
                >
                  Save Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingTemplates;