'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FloorArea {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  icon: string;
  capacity?: number;
  currentOccupancy?: number;
}

interface FloorPlanNavigationProps {
  floorAreas: FloorArea[];
}

const FloorPlanNavigation = ({ floorAreas }: FloorPlanNavigationProps) => {
  const [selectedArea, setSelectedArea] = useState<FloorArea | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const handleAreaClick = (area: FloorArea) => {
    setSelectedArea(area);
  };

  const closeAreaDetails = () => {
    setSelectedArea(null);
  };

  const getOccupancyLevel = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 80) return { level: 'High', color: 'text-error' };
    if (percentage >= 50) return { level: 'Medium', color: 'text-warning' };
    return { level: 'Low', color: 'text-success' };
  };

  return (
    <section className="py-16 sm:py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Interactive <span className="text-primary">Floor Plan</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Navigate our facility with real-time occupancy data and find the perfect space for your workout
          </p>
        </div>

        {/* Enhanced responsive layout for 826px viewport */}
        <div className="flex flex-col xl:flex-row gap-6 sm:gap-8">
          {/* Floor Plan - Optimized sizing */}
          <div className="xl:w-2/3">
            <div className="bg-card rounded-xl p-4 sm:p-6 border border-border">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground flex-shrink-0">Facility Layout</h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded-full flex-shrink-0"></div>
                    <span className="whitespace-nowrap">Low Occupancy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-warning rounded-full flex-shrink-0"></div>
                    <span className="whitespace-nowrap">Medium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-error rounded-full flex-shrink-0"></div>
                    <span className="whitespace-nowrap">High</span>
                  </div>
                </div>
              </div>

              {/* SVG Floor Plan - Improved responsive sizing */}
              <div className="relative bg-muted/10 rounded-lg overflow-hidden w-full" style={{ aspectRatio: '16/10' }}>
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Floor Plan Areas */}
                  {floorAreas.map((area) => {
                    const occupancyLevel = area.capacity && area.currentOccupancy 
                      ? getOccupancyLevel(area.currentOccupancy, area.capacity)
                      : null;
                    
                    const isHovered = hoveredArea === area.id;
                    const isSelected = selectedArea?.id === area.id;
                    
                    return (
                      <g key={area.id}>
                        {/* Area Rectangle */}
                        <rect
                          x={area.x}
                          y={area.y}
                          width={area.width}
                          height={area.height}
                          fill={isSelected ? '#00ff88' : isHovered ? area.color + '80' : area.color + '40'}
                          stroke={isSelected ? '#00ff88' : area.color}
                          strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                          className="cursor-pointer transition-all duration-300"
                          onClick={() => handleAreaClick(area)}
                          onMouseEnter={() => setHoveredArea(area.id)}
                          onMouseLeave={() => setHoveredArea(null)}
                        />
                        
                        {/* Area Label - Responsive text sizing */}
                        <text
                          x={area.x + area.width / 2}
                          y={area.y + area.height / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-current text-foreground font-medium pointer-events-none"
                          style={{ fontSize: area.width > 150 ? '14px' : '12px' }}
                        >
                          {area.name}
                        </text>
                        
                        {/* Occupancy Indicator */}
                        {occupancyLevel && (
                          <circle
                            cx={area.x + area.width - 15}
                            cy={area.y + 15}
                            r="8"
                            fill={occupancyLevel.level === 'Low' ? '#00ff88' : occupancyLevel.level === 'Medium' ? '#ff9500' : '#ff3366'}
                            className="pointer-events-none"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Area List & Details - Enhanced responsive design */}
          <div className="xl:w-1/3">
            <div className="bg-card rounded-xl p-4 sm:p-6 border border-border">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center">
                <Icon name="MapIcon" size={24} className="text-primary mr-3 flex-shrink-0" />
                <span>Facility Areas</span>
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {floorAreas.map((area) => {
                  const occupancyLevel = area.capacity && area.currentOccupancy 
                    ? getOccupancyLevel(area.currentOccupancy, area.capacity)
                    : null;
                  
                  return (
                    <button
                      key={area.id}
                      onClick={() => handleAreaClick(area)}
                      onMouseEnter={() => setHoveredArea(area.id)}
                      onMouseLeave={() => setHoveredArea(null)}
                      className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all duration-300 ${
                        selectedArea?.id === area.id
                          ? 'bg-primary/10 border border-primary/20'
                          : hoveredArea === area.id
                          ? 'bg-muted/50' :'bg-muted/20 hover:bg-muted/40'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: area.color + '40' }}>
                            <Icon name={area.icon as any} size={16} style={{ color: area.color }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-foreground text-sm sm:text-base break-words">{area.name}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground break-words">{area.description}</div>
                          </div>
                        </div>
                        
                        {occupancyLevel && (
                          <div className={`text-xs font-medium flex-shrink-0 ml-2 ${occupancyLevel.color}`}>
                            {area.currentOccupancy}/{area.capacity}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Capacity Overview */}
            <div className="bg-card rounded-xl p-4 sm:p-6 border border-border mt-6">
              <h4 className="text-base sm:text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="ChartBarIcon" size={20} className="text-primary mr-2 flex-shrink-0" />
                <span>Live Capacity</span>
              </h4>
              
              <div className="space-y-3">
                {floorAreas.filter(area => area.capacity).map((area) => {
                  const occupancyLevel = getOccupancyLevel(area.currentOccupancy!, area.capacity!);
                  const percentage = (area.currentOccupancy! / area.capacity!) * 100;
                  
                  return (
                    <div key={area.id} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-foreground break-words flex-1 mr-2">{area.name}</span>
                        <span className={`${occupancyLevel.color} flex-shrink-0`}>
                          {area.currentOccupancy}/{area.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            occupancyLevel.level === 'Low' ? 'bg-success' :
                            occupancyLevel.level === 'Medium' ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Area Details Modal */}
        {selectedArea && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-xl p-6 max-w-md w-full border border-border shadow-modal max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: selectedArea.color + '40' }}>
                    <Icon name={selectedArea.icon as any} size={24} style={{ color: selectedArea.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-semibold text-foreground break-words">{selectedArea.name}</h3>
                    {selectedArea.capacity && selectedArea.currentOccupancy && (
                      <p className="text-sm text-muted-foreground">
                        {selectedArea.currentOccupancy}/{selectedArea.capacity} current occupancy
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={closeAreaDetails}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex-shrink-0"
                >
                  <Icon name="XMarkIcon" size={24} />
                </button>
              </div>

              <p className="text-muted-foreground mb-6 break-words">{selectedArea.description}</p>

              {selectedArea.capacity && selectedArea.currentOccupancy && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Current Occupancy</span>
                    <span className="text-sm font-medium text-foreground">
                      {Math.round((selectedArea.currentOccupancy / selectedArea.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(selectedArea.currentOccupancy / selectedArea.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300">
                Navigate to Area
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FloorPlanNavigation;