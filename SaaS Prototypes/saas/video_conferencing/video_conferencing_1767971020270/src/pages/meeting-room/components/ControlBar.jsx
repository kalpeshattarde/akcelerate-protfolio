import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ControlBar = ({
  isAudioEnabled = true,
  isVideoEnabled = true,
  isScreenSharing = false,
  isRecording = false,
  participantCount = 0,
  showKeyboardShortcuts = true,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onToggleChat,
  onToggleParticipants,
  onStartRecording,
  onShowReactions,
  onShowPolls,
  onLeaveMeeting,
  onShowSettings
}) => {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const reactions = [
    { emoji: '👍', label: 'Thumbs up' },
    { emoji: '👏', label: 'Clap' },
    { emoji: '❤️', label: 'Heart' },
    { emoji: '😂', label: 'Laugh' },
    { emoji: '😮', label: 'Surprised' },
    { emoji: '👋', label: 'Wave' }
  ];

  const handleReaction = (reaction) => {
    onShowReactions?.(reaction);
    setShowReactionPicker(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/98 backdrop-blur-md border-t border-slate-600 z-50">
      {/* Keyboard Shortcuts Bar - Only show when appropriate */}
      {showKeyboardShortcuts && showShortcuts && (
        <div className="bg-slate-950/95 border-b border-slate-600 px-6 py-2">
          <div className="flex items-center justify-center space-x-8 text-white/90 text-xs">
            <div className="flex items-center space-x-6">
              <span><kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono text-white">M</kbd> Toggle Mic</span>
              <span><kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono text-white">V</kbd> Toggle Video</span>
              <span><kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono text-white">C</kbd> Chat</span>
            </div>
            <div className="flex items-center space-x-6">
              <span><kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono text-white">P</kbd> Participants</span>
              <span><kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono text-white">F</kbd> Fullscreen</span>
              <span><kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono text-white">ESC</kbd> Exit Fullscreen</span>
            </div>
            <button
              onClick={() => setShowShortcuts(false)}
              className="text-white/70 hover:text-white transition-colors"
              title="Hide shortcuts"
            >
              <Icon name="X" size={16} color="#ffffff" />
            </button>
          </div>
        </div>
      )}

      {/* Main Control Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Controls */}
        <div className="flex items-center space-x-3">
          {/* Audio Toggle */}
          <button
            onClick={onToggleAudio}
            className={`
              w-12 h-12 rounded-full relative group shadow-lg border-2 transition-all duration-200 ease-in-out flex items-center justify-center
              ${isAudioEnabled 
                ? 'bg-slate-700 hover:bg-slate-600 border-slate-500 text-white shadow-slate-700/50' 
                : 'bg-red-600 hover:bg-red-500 border-red-500 text-white shadow-red-600/50'
              }
            `}
            title={isAudioEnabled ? "Mute microphone (M)" : "Unmute microphone (M)"}
          >
            <Icon 
              name={isAudioEnabled ? "Mic" : "MicOff"} 
              size={20} 
              color="#ffffff"
              strokeWidth={2}
              className="drop-shadow-sm" 
            />
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-60">
              {isAudioEnabled ? "Mute (M)" : "Unmute (M)"}
            </span>
          </button>

          {/* Video Toggle */}
          <button
            onClick={onToggleVideo}
            className={`
              w-12 h-12 rounded-full relative group shadow-lg border-2 transition-all duration-200 ease-in-out flex items-center justify-center
              ${isVideoEnabled 
                ? 'bg-slate-700 hover:bg-slate-600 border-slate-500 text-white shadow-slate-700/50' 
                : 'bg-red-600 hover:bg-red-500 border-red-500 text-white shadow-red-600/50'
              }
            `}
            title={isVideoEnabled ? "Turn off camera (V)" : "Turn on camera (V)"}
          >
            <Icon 
              name={isVideoEnabled ? "Video" : "VideoOff"} 
              size={20} 
              color="#ffffff"
              strokeWidth={2}
              className="drop-shadow-sm" 
            />
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-60">
              {isVideoEnabled ? "Stop Video (V)" : "Start Video (V)"}
            </span>
          </button>

          {/* Screen Share */}
          <button
            onClick={onToggleScreenShare}
            className={`
              w-12 h-12 rounded-full relative group shadow-lg border-2 transition-all duration-200 ease-in-out flex items-center justify-center
              ${isScreenSharing 
                ? 'bg-blue-600 hover:bg-blue-500 border-blue-400 text-white shadow-blue-600/50' 
                : 'bg-slate-700 hover:bg-slate-600 border-slate-500 text-white shadow-slate-700/50'
              }
            `}
            title={isScreenSharing ? "Stop sharing" : "Share screen"}
          >
            <Icon 
              name={isScreenSharing ? "MonitorSpeaker" : "Monitor"} 
              size={20} 
              color="#ffffff"
              strokeWidth={2}
              className="drop-shadow-sm" 
            />
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-60">
              {isScreenSharing ? "Stop Share" : "Share Screen"}
            </span>
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-slate-600 mx-1" />

          {/* Keyboard Shortcuts Toggle */}
          {showKeyboardShortcuts && (
            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              className="w-12 h-12 rounded-full relative group shadow-lg bg-slate-700 hover:bg-slate-600 border-2 border-slate-500 text-white shadow-slate-700/50 transition-all duration-200 ease-in-out flex items-center justify-center"
              title="Show keyboard shortcuts"
            >
              <Icon 
                name="Keyboard" 
                size={20} 
                color="#ffffff"
                strokeWidth={2}
                className="drop-shadow-sm" 
              />
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-60">
                Shortcuts
              </span>
            </button>
          )}
        </div>

        {/* Center Controls */}
        <div className="flex items-center space-x-3">
          {/* Chat */}
          <button
            onClick={onToggleChat}
            className="w-12 h-12 rounded-full relative group shadow-lg bg-slate-700 hover:bg-slate-600 border-2 border-slate-500 text-white shadow-slate-700/50 transition-all duration-200 ease-in-out flex items-center justify-center"
            title="Toggle chat (C)"
          >
            <Icon 
              name="MessageSquare" 
              size={20} 
              color="#ffffff"
              strokeWidth={2}
              className="drop-shadow-sm" 
            />
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-60">
              Chat (C)
            </span>
          </button>

          {/* Participants */}
          <button
            onClick={onToggleParticipants}
            className="w-12 h-12 rounded-full relative group shadow-lg bg-slate-700 hover:bg-slate-600 border-2 border-slate-500 text-white shadow-slate-700/50 transition-all duration-200 ease-in-out flex items-center justify-center"
            title="Show participants (P)"
          >
            <Icon 
              name="Users" 
              size={20} 
              color="#ffffff"
              strokeWidth={2}
              className="drop-shadow-sm" 
            />
            {participantCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-semibold border-2 border-slate-900 shadow-lg z-10">
                {participantCount > 9 ? '9+' : participantCount}
              </span>
            )}
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-60">
              Participants ({participantCount}) (P)
            </span>
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-slate-600 mx-1" />

          {/* Reactions */}
          <div className="relative">
            <button
              onClick={() => setShowReactionPicker(!showReactionPicker)}
              className="w-12 h-12 rounded-full relative group shadow-lg bg-slate-700 hover:bg-slate-600 border-2 border-slate-500 text-white shadow-slate-700/50 transition-all duration-200 ease-in-out flex items-center justify-center"
              title="Send reaction"
            >
              <Icon 
                name="Smile" 
                size={20} 
                color="#ffffff"
                strokeWidth={2}
                className="drop-shadow-sm" 
              />
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-60">
                Reactions
              </span>
            </button>

            {/* Reaction Picker */}
            {showReactionPicker && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-slate-800/95 border border-slate-600 rounded-xl shadow-2xl backdrop-blur-md z-70 min-w-[220px]">
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3">
                    {reactions?.map((reaction, index) => (
                      <button
                        key={index}
                        onClick={() => handleReaction(reaction)}
                        className="w-16 h-16 hover:bg-slate-700/80 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 group relative hover:scale-105 border border-transparent hover:border-slate-500/50"
                        title={reaction?.label}
                      >
                        <span className="drop-shadow-sm select-none text-3xl leading-none flex items-center justify-center">{reaction?.emoji}</span>
                        <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-xs py-1.5 px-2.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-medium">
                          {reaction?.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Polls */}
          <button
            onClick={onShowPolls}
            className="w-12 h-12 rounded-full relative group shadow-lg bg-slate-700 hover:bg-slate-600 border-2 border-slate-500 text-white shadow-slate-700/50 transition-all duration-200 ease-in-out flex items-center justify-center"
            title="Create poll"
          >
            <Icon 
              name="BarChart3" 
              size={20} 
              color="#ffffff"
              strokeWidth={2}
              className="drop-shadow-sm" 
            />
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-60">
              Polls
            </span>
          </button>

          {/* Recording */}
          <button
            onClick={onStartRecording}
            className={`
              w-12 h-12 rounded-full relative group shadow-lg border-2 transition-all duration-200 ease-in-out flex items-center justify-center
              ${isRecording 
                ? 'bg-red-600 hover:bg-red-500 border-red-400 text-white shadow-red-600/50' 
                : 'bg-slate-700 hover:bg-slate-600 border-slate-500 text-white shadow-slate-700/50'
              }
            `}
            title={isRecording ? "Stop recording" : "Start recording"}
          >
            <Icon 
              name={isRecording ? "Square" : "Circle"} 
              size={isRecording ? 16 : 20} 
              color="#ffffff"
              strokeWidth={2}
              className="drop-shadow-sm" 
            />
            {isRecording && (
              <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-pulse" />
            )}
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-60">
              {isRecording ? "Stop Record" : "Record"}
            </span>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Leave Meeting */}
          <button
            onClick={onLeaveMeeting}
            className="px-6 h-12 rounded-full relative group shadow-lg bg-red-600 hover:bg-red-500 border-2 border-red-400 text-white shadow-red-600/50 transition-all duration-200 ease-in-out font-semibold min-w-[120px] flex items-center justify-center"
            title="Leave meeting"
          >
            <Icon 
              name="PhoneOff" 
              size={20} 
              color="#ffffff"
              strokeWidth={2}
              className="mr-2 drop-shadow-sm" 
            />
            <span className="font-semibold text-white drop-shadow-sm">Leave</span>
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-60">
              Leave Meeting
            </span>
          </button>
        </div>
      </div>

      {/* Click outside to close reaction picker */}
      {showReactionPicker && (
        <div 
          className="fixed inset-0 z-60" 
          onClick={() => setShowReactionPicker(false)}
        />
      )}
    </div>
  );
};

export default ControlBar;