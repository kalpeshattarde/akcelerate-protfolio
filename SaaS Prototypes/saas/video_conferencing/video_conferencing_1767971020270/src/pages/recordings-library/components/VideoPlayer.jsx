import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ recording, onClose, onNext, onPrevious, hasNext, hasPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showTranscription, setShowTranscription] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const chapters = [
    { id: 1, title: "Opening Remarks", time: 0, duration: 300 },
    { id: 2, title: "Project Overview", time: 300, duration: 600 },
    { id: 3, title: "Technical Discussion", time: 900, duration: 450 },
    { id: 4, title: "Q&A Session", time: 1350, duration: 300 },
    { id: 5, title: "Closing", time: 1650, duration: 150 }
  ];

  const transcriptionData = [
    { id: 1, speaker: "John Doe", time: 15, text: "Welcome everyone to today\'s project review meeting. Let\'s start with the agenda overview." },
    { id: 2, speaker: "Sarah Wilson", time: 45, text: "Thank you John. I\'ll be presenting the current project status and key milestones achieved." },
    { id: 3, speaker: "Mike Johnson", time: 120, text: "The technical implementation has been progressing well. We\'ve completed 75% of the core features." }
  ];

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video?.currentTime);
    const handleDurationChange = () => setDuration(video?.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('durationchange', handleDurationChange);
    video?.addEventListener('play', handlePlay);
    video?.addEventListener('pause', handlePause);

    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('durationchange', handleDurationChange);
      video?.removeEventListener('play', handlePlay);
      video?.removeEventListener('pause', handlePause);
    };
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
    }
    return `${minutes}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    const video = videoRef?.current;
    if (video?.paused) {
      video?.play();
    } else {
      video?.pause();
    }
  };

  const handleSeek = (e) => {
    const video = videoRef?.current;
    const rect = e?.currentTarget?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    video.currentTime = pos * duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef?.current;
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef?.current;
    if (!document.fullscreenElement) {
      container?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changePlaybackSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const jumpToChapter = (time) => {
    videoRef.current.currentTime = time;
  };

  const jumpToTranscription = (time) => {
    videoRef.current.currentTime = time;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef?.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black z-100 flex flex-col">
      {/* Header */}
      <div className={`bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={20} />
            </Button>
            <div>
              <h2 className="text-white font-medium">{recording?.title}</h2>
              <p className="text-white/70 text-sm">
                {new Date(recording.date)?.toLocaleDateString()} • {recording?.organizer}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {hasPrevious && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                className="text-white hover:bg-white/20"
              >
                <Icon name="SkipBack" size={20} />
              </Button>
            )}
            
            {hasNext && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                className="text-white hover:bg-white/20"
              >
                <Icon name="SkipForward" size={20} />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTranscription(!showTranscription)}
              className="text-white hover:bg-white/20"
              iconName="FileText"
              iconPosition="left"
            >
              Transcript
            </Button>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Container */}
        <div 
          ref={containerRef}
          className={`relative bg-black ${showTranscription ? 'flex-1' : 'w-full'}`}
          onMouseMove={handleMouseMove}
        >
          <video
            ref={videoRef}
            src={recording?.videoUrl}
            className="w-full h-full object-contain"
            onClick={togglePlayPause}
          />

          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
              >
                <Icon name="Play" size={32} />
              </Button>
            </div>
          )}

          {/* Controls */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}>
            {/* Progress Bar */}
            <div className="mb-4">
              <div 
                className="w-full h-2 bg-white/30 rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-primary rounded-full relative"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
                </div>
              </div>
              
              {/* Chapter Markers */}
              <div className="relative mt-1">
                {chapters?.map((chapter) => (
                  <div
                    key={chapter?.id}
                    className="absolute top-0 w-1 h-2 bg-white/50 cursor-pointer hover:bg-white"
                    style={{ left: `${(chapter?.time / duration) * 100}%` }}
                    onClick={() => jumpToChapter(chapter?.time)}
                    title={chapter?.title}
                  />
                ))}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlayPause}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name={isMuted ? "VolumeX" : "Volume2"} size={16} />
                  </Button>
                  
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/30 rounded-full appearance-none slider"
                  />
                </div>

                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Speed Control */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="text-white hover:bg-white/20"
                  >
                    {playbackSpeed}x
                  </Button>

                  {showSpeedMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded-lg shadow-elevated">
                      <div className="py-2">
                        {speedOptions?.map((speed) => (
                          <button
                            key={speed}
                            onClick={() => changePlaybackSpeed(speed)}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-micro ${
                              speed === playbackSpeed ? 'bg-muted text-primary' : 'text-foreground'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Transcription Panel */}
        {showTranscription && (
          <div className="w-80 bg-surface border-l border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium text-foreground">Transcription</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {transcriptionData?.map((item) => (
                <div 
                  key={item?.id}
                  className="cursor-pointer hover:bg-muted p-2 rounded transition-micro"
                  onClick={() => jumpToTranscription(item?.time)}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium text-primary">{item?.speaker}</span>
                    <span className="text-xs text-muted-foreground">{formatTime(item?.time)}</span>
                  </div>
                  <p className="text-sm text-foreground">{item?.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Click outside handlers */}
      {showSpeedMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSpeedMenu(false)}
        />
      )}
    </div>
  );
};

export default VideoPlayer;