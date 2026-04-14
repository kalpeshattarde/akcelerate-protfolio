'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TourHotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  icon: string;
}

interface TourArea {
  id: string;
  name: string;
  image: string;
  alt: string;
  hotspots: TourHotspot[];
  description: string;
}

interface VirtualTourSectionProps {
  tourAreas: TourArea[];
}

const VirtualTourSection = ({ tourAreas }: VirtualTourSectionProps) => {
  const [activeArea, setActiveArea] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<TourHotspot | null>(null);
  const [isVRMode, setIsVRMode] = useState(false);

  const handleHotspotClick = (hotspot: TourHotspot) => {
    setSelectedHotspot(hotspot);
  };

  const closeHotspot = () => {
    setSelectedHotspot(null);
  };

  const toggleVRMode = () => {
    setIsVRMode(!isVRMode);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Virtual <span className="text-primary">Facility Tour</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our premium training environment with interactive 360° tours and discover every detail of our elite facility
          </p>
        </div>

        {/* Tour Controls */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Area Selection */}
          <div className="lg:w-1/3">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Icon name="MapIcon" size={24} className="text-primary mr-3" />
                Facility Areas
              </h3>
              <div className="space-y-3">
                {tourAreas.map((area, index) => (
                  <button
                    key={area.id}
                    onClick={() => setActiveArea(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                      activeArea === index
                        ? 'bg-primary/10 border border-primary/20 text-primary' :'bg-muted/30 hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="font-medium">{area.name}</div>
                    <div className="text-sm opacity-80 mt-1">{area.description}</div>
                  </button>
                ))}
              </div>

              {/* VR Mode Toggle */}
              <div className="mt-6 pt-6 border-t border-border">
                <button
                  onClick={toggleVRMode}
                  className={`w-full flex items-center justify-center space-x-3 p-4 rounded-lg font-medium transition-all duration-300 ${
                    isVRMode
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted/30 hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="EyeIcon" size={20} />
                  <span>{isVRMode ? 'Exit VR Mode' : 'Enter VR Mode'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Tour View */}
          <div className="lg:w-2/3">
            <div className={`relative bg-card rounded-xl overflow-hidden border border-border ${
              isVRMode ? 'aspect-[16/10]' : 'aspect-[16/9]'
            }`}>
              {/* Tour Image */}
              <div className="relative w-full h-full">
                <AppImage
                  src={tourAreas[activeArea].image}
                  alt={tourAreas[activeArea].alt}
                  className="w-full h-full object-cover"
                />
                
                {/* VR Overlay */}
                {isVRMode && (
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Icon name="EyeIcon" size={48} className="mx-auto mb-4" />
                      <p className="text-lg font-medium">VR Mode Active</p>
                      <p className="text-sm opacity-80">360° Experience</p>
                    </div>
                  </div>
                )}

                {/* Interactive Hotspots */}
                {!isVRMode && tourAreas[activeArea].hotspots.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    onClick={() => handleHotspotClick(hotspot)}
                    className="absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-neon hover:scale-110 transition-transform duration-300 animate-pulse"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  >
                    <Icon name={hotspot.icon as any} size={16} className="text-primary-foreground" />
                  </button>
                ))}

                {/* Tour Navigation */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p className="text-sm font-medium text-foreground">{tourAreas[activeArea].name}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveArea(Math.max(0, activeArea - 1))}
                      disabled={activeArea === 0}
                      className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-foreground hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <Icon name="ChevronLeftIcon" size={20} />
                    </button>
                    <button
                      onClick={() => setActiveArea(Math.min(tourAreas.length - 1, activeArea + 1))}
                      disabled={activeArea === tourAreas.length - 1}
                      className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-foreground hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <Icon name="ChevronRightIcon" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hotspot Modal */}
        {selectedHotspot && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-xl p-6 max-w-md w-full border border-border shadow-modal">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-semibold text-foreground">{selectedHotspot.title}</h4>
                <button
                  onClick={closeHotspot}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Icon name="XMarkIcon" size={24} />
                </button>
              </div>
              <p className="text-muted-foreground">{selectedHotspot.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VirtualTourSection;