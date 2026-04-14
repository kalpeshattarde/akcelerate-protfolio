'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface VideoChapter {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  alt: string;
}

interface ProgramPreviewProps {
  program: {
    id: string;
    title: string;
    previewVideo: string;
    chapters: VideoChapter[];
    totalDuration: string;
  };
}

const ProgramPreview = ({ program }: ProgramPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showChapters, setShowChapters] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const selectChapter = (index: number) => {
    setCurrentChapter(index);
    setShowChapters(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 border-b border-border">
        <h3 className="text-xl font-bold text-foreground mb-2">Program Preview</h3>
        <p className="text-muted-foreground">Get a taste of what you'll experience in {program.title}</p>
      </div>

      <div className="p-6">
        {/* Video Player */}
        <div className="relative bg-background rounded-lg overflow-hidden mb-6 group">
          <div className="aspect-video relative">
            <AppImage
              src={program.chapters[currentChapter].thumbnail}
              alt={program.chapters[currentChapter].alt}
              className="w-full h-full object-cover"
            />
            
            {/* Play Overlay */}
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 shadow-2xl"
              >
                <Icon 
                  name={isPlaying ? "PauseIcon" : "PlayIcon"} 
                  size={32} 
                  className="text-primary-foreground ml-1" 
                />
              </button>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 bg-background/80 rounded-full hover:bg-background transition-colors duration-200"
                  >
                    <Icon 
                      name={isPlaying ? "PauseIcon" : "PlayIcon"} 
                      size={16} 
                      className="text-foreground" 
                    />
                  </button>
                  
                  <div className="text-sm text-foreground font-mono">
                    00:00 / {program.chapters[currentChapter].duration}
                  </div>
                </div>

                <button
                  onClick={() => setShowChapters(!showChapters)}
                  className="flex items-center space-x-2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors duration-200"
                >
                  <Icon name="ListBulletIcon" size={16} className="text-foreground" />
                  <span className="text-sm text-foreground">Chapters</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-muted/50 rounded-full h-1">
                  <div className="bg-primary h-1 rounded-full w-1/3 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter List */}
        {showChapters && (
          <div className="mb-6 bg-muted/20 rounded-lg p-4 border border-border">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Icon name="PlayCircleIcon" size={16} className="text-primary" />
              <span>Chapter Navigation</span>
            </h4>
            <div className="space-y-2">
              {program.chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => selectChapter(index)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    currentChapter === index
                      ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50'
                  }`}
                >
                  <div className="w-12 h-8 bg-background rounded overflow-hidden flex-shrink-0">
                    <AppImage
                      src={chapter.thumbnail}
                      alt={chapter.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      currentChapter === index ? 'text-primary' : 'text-foreground'
                    }`}>
                      {chapter.title}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {chapter.duration}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Program Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
            <Icon name="PlayCircleIcon" size={20} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold">TOTAL CHAPTERS</p>
              <p className="text-sm font-bold text-foreground">{program.chapters.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
            <Icon name="ClockIcon" size={20} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold">TOTAL DURATION</p>
              <p className="text-sm font-bold text-foreground">{program.totalDuration}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300">
          Start Full Program
        </button>
      </div>
    </div>
  );
};

export default ProgramPreview;