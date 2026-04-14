import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import VideoGrid from './components/VideoGrid';
import ControlBar from './components/ControlBar';
import MeetingHeader from './components/MeetingHeader';
import ChatPanel from './components/ChatPanel';
import ParticipantsPanel from './components/ParticipantsPanel';
import SettingsModal from './components/SettingsModal';
import ReactionsOverlay from './components/ReactionsOverlay';

const MeetingRoom = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'speaker'
  const [screenShareParticipant, setScreenShareParticipant] = useState(null);
  const [activeReactions, setActiveReactions] = useState([]);
  const [reactionQueue, setReactionQueue] = useState([]);

  // Mock participants data
  const [participants] = useState([
    {
      id: "user-1",
      name: "You",
      isCurrentUser: true,
      isModerator: true,
      audioEnabled: true,
      videoEnabled: true,
      connectionQuality: "excellent",
      isSpeaking: false,
      isScreenSharing: false
    },
    {
      id: "user-2",
      name: "Sarah Johnson",
      isCurrentUser: false,
      isModerator: false,
      audioEnabled: true,
      videoEnabled: true,
      connectionQuality: "good",
      isSpeaking: true,
      isScreenSharing: false
    },
    {
      id: "user-3",
      name: "Mike Chen",
      isCurrentUser: false,
      isModerator: false,
      audioEnabled: false,
      videoEnabled: true,
      connectionQuality: "excellent",
      isSpeaking: false,
      isScreenSharing: false
    },
    {
      id: "user-4",
      name: "Emily Davis",
      isCurrentUser: false,
      isModerator: false,
      audioEnabled: true,
      videoEnabled: false,
      connectionQuality: "poor",
      isSpeaking: false,
      isScreenSharing: false
    },
    {
      id: "user-5",
      name: "Alex Rodriguez",
      isCurrentUser: false,
      isModerator: false,
      audioEnabled: true,
      videoEnabled: true,
      connectionQuality: "good",
      isSpeaking: false,
      isScreenSharing: false
    }
  ]);

  // Handle fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.target?.tagName === 'INPUT' || e?.target?.tagName === 'TEXTAREA') return;

      switch (e?.key?.toLowerCase()) {
        case 'm':
          setIsAudioEnabled(prev => !prev);
          break;
        case 'v':
          setIsVideoEnabled(prev => !prev);
          break;
        case 'c':
          setShowChat(prev => !prev);
          break;
        case 'p':
          setShowParticipants(prev => !prev);
          break;
        case 'f':
          handleToggleFullscreen();
          break;
        case 'escape':
          if (isFullscreen) {
            document.exitFullscreen();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  const handleToggleAudio = () => {
    setIsAudioEnabled(prev => !prev);
  };

  const handleToggleVideo = () => {
    setIsVideoEnabled(prev => !prev);
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(prev => {
      const newState = !prev;
      if (newState) {
        setScreenShareParticipant(participants?.find(p => p?.isCurrentUser));
      } else {
        setScreenShareParticipant(null);
      }
      return newState;
    });
  };

  const handleToggleChat = () => {
    setShowChat(prev => !prev);
    if (showParticipants) setShowParticipants(false);
  };

  const handleToggleParticipants = () => {
    setShowParticipants(prev => !prev);
    if (showChat) setShowChat(false);
  };

  const handleStartRecording = () => {
    setIsRecording(prev => !prev);
  };

  const handleShowReactions = (reaction) => {
    const newReaction = {
      emoji: reaction?.emoji,
      label: reaction?.label,
      participantName: 'You', // Current user
      timestamp: Date.now()
    };
    
    setReactionQueue(prev => [...prev, newReaction]);
    console.log('Reaction sent:', reaction);
  };

  // Process reaction queue to prevent overlapping
  useEffect(() => {
    if (reactionQueue?.length > 0) {
      setActiveReactions(reactionQueue);
      setReactionQueue([]);
    }
  }, [reactionQueue]);

  const handleReactionComplete = (reactionId) => {
    console.log('Reaction animation completed:', reactionId);
  };

  const handleShowPolls = () => {
    console.log('Opening polls');
  };

  const handleLeaveMeeting = () => {
    const confirmLeave = window.confirm('Are you sure you want to leave the meeting?');
    if (confirmLeave) {
      navigate('/dashboard');
    }
  };

  const handlePinParticipant = (participant) => {
    if (participant) {
      setViewMode('speaker');
    } else {
      setViewMode('gallery');
    }
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleSaveSettings = (settings) => {
    console.log('Settings saved:', settings);
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* Header - Hidden in fullscreen */}
      {!isFullscreen && (
        <Header 
          notificationCount={3}
          user={{ name: 'John Doe', email: 'john@example.com' }}
        />
      )}
      {/* Meeting Header */}
      <MeetingHeader
        meetingTitle="Team Standup Meeting"
        meetingId="123-456-789"
        isRecording={isRecording}
        participantCount={participants?.length}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
        onShowSettings={handleShowSettings}
        onShowInfo={() => console.log('Show meeting info')}
      />
      {/* Main Content Area */}
      <div className={`flex-1 flex ${isFullscreen ? 'pt-16' : 'pt-32'} pb-24 relative`}>
        {/* Video Grid */}
        <div className={`flex-1 ${showChat || showParticipants ? 'mr-80' : ''} transition-all duration-300 relative`}>
          <VideoGrid
            participants={participants}
            viewMode={viewMode}
            screenShareActive={isScreenSharing}
            screenShareParticipant={screenShareParticipant}
            onPinParticipant={handlePinParticipant}
            onToggleVideo={handleToggleVideo}
            onToggleAudio={handleToggleAudio}
          />
          
          {/* Reactions Overlay */}
          <ReactionsOverlay
            reactions={activeReactions}
            onReactionComplete={handleReactionComplete}
          />
        </div>

        {/* Chat Panel */}
        <ChatPanel
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          participants={participants}
        />

        {/* Participants Panel */}
        <ParticipantsPanel
          isOpen={showParticipants}
          onClose={() => setShowParticipants(false)}
          participants={participants}
          currentUserId="user-1"
          userRole="moderator"
        />
      </div>
      {/* Control Bar */}
      <ControlBar
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
        isScreenSharing={isScreenSharing}
        isRecording={isRecording}
        participantCount={participants?.length}
        onToggleAudio={handleToggleAudio}
        onToggleVideo={handleToggleVideo}
        onToggleScreenShare={handleToggleScreenShare}
        onToggleChat={handleToggleChat}
        onToggleParticipants={handleToggleParticipants}
        onStartRecording={handleStartRecording}
        onShowReactions={handleShowReactions}
        onShowPolls={handleShowPolls}
        onShowSettings={handleShowSettings}
        onLeaveMeeting={handleLeaveMeeting}
        showKeyboardShortcuts={!showChat && !showParticipants}
      />
      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default MeetingRoom;