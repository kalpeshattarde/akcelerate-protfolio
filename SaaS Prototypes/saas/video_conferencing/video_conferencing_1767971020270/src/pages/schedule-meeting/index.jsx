import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import components
import BasicMeetingDetails from './components/BasicMeetingDetails';
import ParticipantInvitation from './components/ParticipantInvitation';
import AdvancedSettings from './components/AdvancedSettings';
import RecurringMeetingOptions from './components/RecurringMeetingOptions';
import MeetingPreview from './components/MeetingPreview';
import MeetingTemplates from './components/MeetingTemplates';

const ScheduleMeeting = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [isLoading, setIsLoading] = useState(false);

  // Meeting data state
  const [meetingData, setMeetingData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    timezone: 'America/New_York',
    duration: '60'
  });

  const [participants, setParticipants] = useState([]);

  const [settings, setSettings] = useState({
    security: 'none',
    password: '',
    waitingRoom: false,
    muteOnEntry: true,
    recording: 'none',
    audioOnly: false,
    transcript: false,
    screenSharing: true,
    chat: true,
    polls: false,
    breakoutRooms: false,
    virtualBackgrounds: true,
    calendarInvite: true,
    emailReminders: true,
    smsNotifications: false
  });

  const [recurringSettings, setRecurringSettings] = useState({
    enabled: false,
    frequency: 'weekly',
    interval: 1,
    period: 'weeks',
    weekDays: [],
    endType: 'never',
    endDate: '',
    occurrences: 10
  });

  // Mock data
  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
  ];

  const durations = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
    { value: '180', label: '3 hours' },
    { value: 'custom', label: 'Custom duration' }
  ];

  const tabs = [
    { id: 'details', label: 'Meeting Details', icon: 'Calendar' },
    { id: 'participants', label: 'Participants', icon: 'Users' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'recurring', label: 'Recurring', icon: 'Repeat' },
    { id: 'templates', label: 'Templates', icon: 'Layout' },
    { id: 'preview', label: 'Preview', icon: 'Eye' }
  ];

  // Set default date and time
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    
    const defaultTime = new Date(now);
    defaultTime?.setHours(defaultTime?.getHours() + 1, 0, 0, 0);
    
    setMeetingData(prev => ({
      ...prev,
      date: tomorrow?.toISOString()?.split('T')?.[0],
      time: defaultTime?.toTimeString()?.slice(0, 5)
    }));
  }, []);

  const handleScheduleMeeting = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful scheduling
    console.log('Meeting scheduled:', {
      meetingData,
      participants,
      settings,
      recurringSettings
    });
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleApplyTemplate = (templateSettings) => {
    setSettings(prev => ({
      ...prev,
      ...templateSettings
    }));
    setActiveTab('details');
  };

  const handleSaveTemplate = (template) => {
    console.log('Template saved:', template);
    // In a real app, this would save to backend
  };

  const isFormValid = () => {
    return meetingData?.title?.trim() && 
           meetingData?.date && 
           meetingData?.time && 
           meetingData?.duration;
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <BasicMeetingDetails
            meetingData={meetingData}
            onMeetingDataChange={setMeetingData}
            timezones={timezones}
            durations={durations}
          />
        );
      case 'participants':
        return (
          <ParticipantInvitation
            participants={participants}
            onParticipantsChange={setParticipants}
          />
        );
      case 'settings':
        return (
          <AdvancedSettings
            settings={settings}
            onSettingsChange={setSettings}
          />
        );
      case 'recurring':
        return (
          <RecurringMeetingOptions
            recurringSettings={recurringSettings}
            onRecurringSettingsChange={setRecurringSettings}
          />
        );
      case 'templates':
        return (
          <MeetingTemplates
            onApplyTemplate={handleApplyTemplate}
            currentMeetingData={{ ...meetingData, ...settings }}
            onSaveTemplate={handleSaveTemplate}
          />
        );
      case 'preview':
        return (
          <MeetingPreview
            meetingData={meetingData}
            participants={participants}
            settings={settings}
            recurringSettings={recurringSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        notificationCount={3}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole="user"
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Schedule Meeting</h1>
              <p className="text-muted-foreground mt-1">
                Create and configure your video conference meeting
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
              <Button
                onClick={handleScheduleMeeting}
                disabled={!isFormValid() || isLoading}
                loading={isLoading}
                iconName="Calendar"
                iconPosition="left"
              >
                {isLoading ? 'Scheduling...' : 'Schedule Meeting'}
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-surface border border-border rounded-lg mb-6">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-micro whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {getTabContent()}
            </div>
            
            {/* Right Sidebar - Always show preview on desktop */}
            <div className="hidden lg:block">
              <MeetingPreview
                meetingData={meetingData}
                participants={participants}
                settings={settings}
                recurringSettings={recurringSettings}
              />
            </div>
          </div>

          {/* Mobile Action Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setActiveTab('preview')}
                iconName="Eye"
                iconPosition="left"
                className="flex-1"
              >
                Preview
              </Button>
              <Button
                onClick={handleScheduleMeeting}
                disabled={!isFormValid() || isLoading}
                loading={isLoading}
                iconName="Calendar"
                iconPosition="left"
                className="flex-1"
              >
                {isLoading ? 'Scheduling...' : 'Schedule'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <QuickActionButton userRole="user" />
    </div>
  );
};

export default ScheduleMeeting;