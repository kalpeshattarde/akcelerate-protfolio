import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionButton from '../../components/ui/QuickActionButton';
import MetricsCard from './components/MetricsCard';
import UpcomingMeetingCard from './components/UpcomingMeetingCard';
import QuickStartPanel from './components/QuickStartPanel';
import SystemStatusIndicator from './components/SystemStatusIndicator';
import RecentRecordingCard from './components/RecentRecordingCard';
import ActivityFeed from './components/ActivityFeed';
import UsageChart from './components/UsageChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock data
  const metricsData = [
    {
      title: "Active Meetings",
      value: "24",
      change: "+12%",
      changeType: "increase",
      icon: "Video",
      color: "primary"
    },
    {
      title: "Total Participants",
      value: "156",
      change: "+8%",
      changeType: "increase",
      icon: "Users",
      color: "success"
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "+0.2%",
      changeType: "increase",
      icon: "Activity",
      color: "accent"
    },
    {
      title: "Bandwidth Usage",
      value: "2.4 GB",
      change: "-5%",
      changeType: "decrease",
      icon: "Wifi",
      color: "warning"
    }
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: "Weekly Team Standup",
      dateTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      participants: 8,
      description: "Weekly sync-up with the development team to discuss progress and blockers.",
      attendees: [
        { name: "John Doe" },
        { name: "Jane Smith" },
        { name: "Mike Johnson" },
        { name: "Sarah Wilson" },
        { name: "Tom Brown" }
      ]
    },
    {
      id: 2,
      title: "Client Presentation - Q4 Results",
      dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      participants: 12,
      description: "Quarterly business review presentation for our key client stakeholders.",
      attendees: [
        { name: "Alice Cooper" },
        { name: "Bob Wilson" },
        { name: "Carol Davis" }
      ]
    },
    {
      id: 3,
      title: "Product Demo Session",
      dateTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      participants: 25,
      description: "Live demonstration of new product features for potential customers.",
      attendees: [
        { name: "David Lee" },
        { name: "Emma Taylor" }
      ]
    }
  ];

  const recentRecordings = [
    {
      id: 1,
      title: "Product Strategy Meeting - August 2025",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop",
      duration: 3600, // 1 hour
      date: "2025-08-24",
      participants: 15,
      fileSize: 1024 * 1024 * 250, // 250MB
      host: "John Doe",
      quality: "HD",
      description: "Comprehensive discussion about product roadmap and strategic initiatives for the next quarter."
    },
    {
      id: 2,
      title: "Client Onboarding Session",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
      duration: 2700, // 45 minutes
      date: "2025-08-23",
      participants: 8,
      fileSize: 1024 * 1024 * 180, // 180MB
      host: "Sarah Wilson",
      quality: "HD",
      description: "New client orientation and platform walkthrough session."
    },
    {
      id: 3,
      title: "Technical Architecture Review",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop",
      duration: 5400, // 1.5 hours
      date: "2025-08-22",
      participants: 12,
      fileSize: 1024 * 1024 * 320, // 320MB
      host: "Mike Johnson",
      quality: "HD",
      description: "Deep dive into system architecture and technical implementation details."
    }
  ];

  const activityData = [
    {
      id: 1,
      type: "meeting_started",
      user: "John Doe",
      action: "started meeting",
      target: "Weekly Team Standup",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      details: "8 participants joined"
    },
    {
      id: 2,
      type: "user_joined",
      user: "Sarah Wilson",
      action: "joined meeting",
      target: "Product Demo",
      timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    },
    {
      id: 3,
      type: "recording_started",
      user: "Mike Johnson",
      action: "started recording",
      target: "Client Presentation",
      timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    },
    {
      id: 4,
      type: "screen_share",
      user: "Alice Cooper",
      action: "started screen sharing",
      timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
    },
    {
      id: 5,
      type: "meeting_ended",
      user: "Tom Brown",
      action: "ended meeting",
      target: "Daily Standup",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      details: "Duration: 30 minutes"
    }
  ];

  const systemStatus = {
    server: 'excellent',
    bandwidth: 'good',
    latency: 'excellent',
    quality: 'good'
  };

  const handleStartMeeting = (settings) => {
    console.log('Starting meeting with settings:', settings);
    navigate('/meeting-room');
  };

  const handleJoinMeeting = (meeting) => {
    console.log('Joining meeting:', meeting);
    navigate('/meeting-room');
  };

  const handleEditMeeting = (meeting) => {
    console.log('Editing meeting:', meeting);
    navigate('/schedule-meeting');
  };

  const handlePlayRecording = (recording) => {
    console.log('Playing recording:', recording);
    navigate('/recordings-library');
  };

  const handleDownloadRecording = (recording) => {
    console.log('Downloading recording:', recording);
  };

  const handleShareRecording = (recording) => {
    console.log('Sharing recording:', recording);
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
        userRole="admin"
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                  Welcome back, John! 👋
                </h1>
                <p className="text-muted-foreground">
                  {currentTime?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • {currentTime?.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Meetings & Quick Start */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Meetings */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Upcoming Meetings</h2>
                  <button 
                    onClick={() => navigate('/schedule-meeting')}
                    className="text-sm text-primary hover:text-primary/80 transition-micro"
                  >
                    Schedule New
                  </button>
                </div>
                <div className="space-y-4">
                  {upcomingMeetings?.map((meeting) => (
                    <UpcomingMeetingCard
                      key={meeting?.id}
                      meeting={meeting}
                      onJoin={handleJoinMeeting}
                      onEdit={handleEditMeeting}
                    />
                  ))}
                </div>
              </div>

              {/* Usage Analytics Chart */}
              <UsageChart 
                title="Meeting Analytics"
                type="bar"
                data={[]}
              />
            </div>

            {/* Right Column - Quick Start & System Status */}
            <div className="space-y-8">
              <QuickStartPanel onStartMeeting={handleStartMeeting} />
              <SystemStatusIndicator status={systemStatus} />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Recordings */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Recent Recordings</h2>
                <button 
                  onClick={() => navigate('/recordings-library')}
                  className="text-sm text-primary hover:text-primary/80 transition-micro"
                >
                  View All
                </button>
              </div>
              <div className="flex space-x-6 overflow-x-auto pb-4">
                {recentRecordings?.map((recording) => (
                  <RecentRecordingCard
                    key={recording?.id}
                    recording={recording}
                    onPlay={handlePlayRecording}
                    onDownload={handleDownloadRecording}
                    onShare={handleShareRecording}
                  />
                ))}
              </div>
            </div>

            {/* Activity Feed - Move to single column below recordings */}
          </div>
          
          {/* Activity Feed Section - Now below recordings */}
          <div className="mt-8">
            <ActivityFeed activities={activityData} />
          </div>
        </div>
      </main>
      <QuickActionButton userRole="admin" />
    </div>
  );
};

export default Dashboard;