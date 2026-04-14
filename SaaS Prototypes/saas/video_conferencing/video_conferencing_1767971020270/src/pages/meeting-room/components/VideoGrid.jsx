import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VideoGrid = ({ 
  participants = [], 
  viewMode = 'gallery', 
  screenShareActive = false,
  screenShareParticipant = null,
  onToggleVideo,
  onToggleAudio,
  onPinParticipant
}) => {
  const [pinnedParticipant, setPinnedParticipant] = useState(null);

  const getGridLayout = (count) => {
    if (screenShareActive) return 'grid-cols-1';
    if (viewMode === 'speaker' && pinnedParticipant) return 'grid-cols-1';
    
    if (count <= 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-3 lg:grid-cols-3';
    if (count === 4) return 'grid-cols-2 lg:grid-cols-2';
    if (count === 5) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5';
    if (count <= 6) return 'grid-cols-2 md:grid-cols-3';
    if (count <= 9) return 'grid-cols-3';
    if (count <= 12) return 'grid-cols-3 lg:grid-cols-4';
    return 'grid-cols-4 lg:grid-cols-5';
  };

  const getGridRows = (count) => {
    if (screenShareActive || (viewMode === 'speaker' && pinnedParticipant)) return 'grid-rows-1';
    
    if (count <= 3) return 'grid-rows-1';
    if (count <= 6) return 'grid-rows-2';
    if (count <= 9) return 'grid-rows-3';
    return 'auto-rows-fr';
  };

  const getContainerPadding = (count) => {
    if (count <= 2) return 'p-8';
    if (count <= 4) return 'p-6';
    return 'p-4';
  };

  const getGridGap = (count) => {
    if (count <= 2) return 'gap-8';
    if (count <= 4) return 'gap-6';
    if (count <= 6) return 'gap-4';
    return 'gap-3';
  };

  const handlePinParticipant = (participant) => {
    const newPinned = pinnedParticipant?.id === participant?.id ? null : participant;
    setPinnedParticipant(newPinned);
    onPinParticipant?.(newPinned);
  };

  const getConnectionQualityColor = (quality) => {
    switch (quality) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getConnectionQualityIcon = (quality) => {
    switch (quality) {
      case 'excellent': return 'Wifi';
      case 'good': return 'Wifi';
      case 'poor': return 'WifiOff';
      default: return 'Wifi';
    }
  };

  const renderParticipantVideo = (participant, isMain = false) => (
    <div
      key={participant?.id}
      className={`relative bg-slate-800 rounded-xl overflow-hidden group aspect-video w-full h-full ${
        pinnedParticipant?.id === participant?.id ? 'ring-2 ring-blue-500' : ''
      } ${
        participant?.isSpeaking ? 'ring-2 ring-green-400 ring-opacity-75' : ''
      }`}
    >
      {/* Video Stream / Avatar Display */}
      {participant?.videoEnabled ? (
        <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
          {/* Video Stream Placeholder */}
          <div className="text-slate-400 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-700 rounded-full flex items-center justify-center mb-2 md:mb-3">
              <Icon name="Video" size={24} className="text-slate-500 md:w-8 md:h-8" />
            </div>
            <p className="text-xs md:text-sm font-medium">Video Stream</p>
          </div>
          
          {/* Participant Avatar Overlay (for profile picture representation) */}
          <div className="absolute top-2 left-2 md:top-3 md:left-3">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-xs md:text-sm font-semibold text-white">
                {participant?.name?.split(' ')?.map(n => n?.[0])?.join('')}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
          {/* Large Avatar when video is off */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-lg md:text-2xl font-semibold text-white">
              {participant?.name?.split(' ')?.map(n => n?.[0])?.join('')}
            </span>
          </div>
        </div>
      )}

      {/* Participant Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 md:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 md:space-x-2 min-w-0 flex-1">
            <span className="text-white text-xs md:text-sm font-medium truncate">
              {participant?.name}
              {participant?.isCurrentUser && ' (You)'}
            </span>
            {participant?.isModerator && (
              <Icon name="Crown" size={12} className="text-yellow-400 flex-shrink-0 md:w-3.5 md:h-3.5" />
            )}
          </div>
          <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
            {/* Connection Quality Indicator */}
            <Icon 
              name={getConnectionQualityIcon(participant?.connectionQuality)} 
              size={12} 
              className={`${getConnectionQualityColor(participant?.connectionQuality)} md:w-3.5 md:h-3.5`}
            />
            {/* Microphone Status */}
            <Icon 
              name={participant?.audioEnabled ? "Mic" : "MicOff"} 
              size={12} 
              className={`${participant?.audioEnabled ? "text-white" : "text-red-400"} md:w-3.5 md:h-3.5`}
            />
          </div>
        </div>
      </div>

      {/* Control Overlay (appears on hover) */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 md:space-x-4">
        <button
          onClick={() => handlePinParticipant(participant)}
          className="w-8 h-8 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
          title={pinnedParticipant?.id === participant?.id ? "Unpin" : "Pin participant"}
        >
          <Icon name="Pin" size={14} className="text-white md:w-4.5 md:h-4.5" />
        </button>
        {!participant?.isCurrentUser && (
          <button
            className="w-8 h-8 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            title="More options"
          >
            <Icon name="MoreVertical" size={14} className="text-white md:w-4.5 md:h-4.5" />
          </button>
        )}
      </div>

      {/* Speaking Indicator - Animated Border */}
      {participant?.isSpeaking && (
        <div className="absolute inset-0 ring-2 ring-green-400 animate-pulse rounded-xl pointer-events-none" />
      )}

      {/* Screen Share Indicator */}
      {participant?.isScreenSharing && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          <Icon name="Monitor" size={10} className="inline mr-1 md:w-3 md:h-3" />
          <span className="hidden md:inline">Sharing</span>
        </div>
      )}
    </div>
  );

  if (screenShareActive && screenShareParticipant) {
    return (
      <div className="flex-1 flex flex-col space-y-4 p-4">
        {/* Main Screen Share */}
        <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden min-h-0">
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
            <div className="text-slate-400 text-center">
              <Icon name="Monitor" size={64} className="mx-auto mb-4" />
              <p className="text-lg font-medium">{screenShareParticipant?.name} is sharing their screen</p>
              <p className="text-sm mt-2">Screen content would appear here</p>
            </div>
          </div>
        </div>
        {/* Participant Thumbnails */}
        <div className="flex space-x-4 overflow-x-auto pb-2 flex-shrink-0">
          {participants?.map(participant => (
            <div key={participant?.id} className="flex-shrink-0 w-32 h-20">
              {renderParticipantVideo(participant)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (viewMode === 'speaker' && pinnedParticipant) {
    const otherParticipants = participants?.filter(p => p?.id !== pinnedParticipant?.id);
    
    return (
      <div className="flex-1 flex flex-col space-y-4 p-4">
        {/* Main Speaker */}
        <div className="flex-1 min-h-0">
          {renderParticipantVideo(pinnedParticipant, true)}
        </div>
        {/* Other Participants */}
        {otherParticipants?.length > 0 && (
          <div className="flex space-x-4 overflow-x-auto pb-2 flex-shrink-0">
            {otherParticipants?.map(participant => (
              <div key={participant?.id} className="flex-shrink-0 w-32 h-20">
                {renderParticipantVideo(participant)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Gallery View - Enhanced grid layout to prevent overlapping
  const participantCount = participants?.length || 0;
  
  return (
    <div className={`flex-1 h-full overflow-hidden ${getContainerPadding(participantCount)}`}>
      <div className={`w-full h-full grid ${getGridLayout(participantCount)} ${getGridRows(participantCount)} ${getGridGap(participantCount)} auto-rows-fr`}>
        {participants?.map(participant => (
          <div key={participant?.id} className="w-full h-full min-h-0 min-w-0">
            {renderParticipantVideo(participant)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;