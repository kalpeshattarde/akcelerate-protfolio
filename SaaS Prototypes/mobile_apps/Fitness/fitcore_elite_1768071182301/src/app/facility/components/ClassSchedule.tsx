'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ClassSession {
  id: string;
  name: string;
  instructor: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
  type: string;
  room: string;
  description: string;
}

interface DaySchedule {
  date: string;
  dayName: string;
  classes: ClassSession[];
}

interface ClassScheduleProps {
  schedule: DaySchedule[];
}

const ClassSchedule = ({ schedule }: ClassScheduleProps) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);
  const [filterLevel, setFilterLevel] = useState('all');

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Elite'];

  const filteredClasses = schedule[selectedDay]?.classes.filter(classItem => 
    filterLevel === 'all' || classItem.level === filterLevel
  ) || [];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'text-success bg-success/10 border-success/20';
      case 'Intermediate':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'Advanced':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'Elite':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getCapacityStatus = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 100) return { status: 'Full', color: 'text-error' };
    if (percentage >= 80) return { status: 'Almost Full', color: 'text-warning' };
    return { status: 'Available', color: 'text-success' };
  };

  const openClassModal = (classItem: ClassSession) => {
    setSelectedClass(classItem);
  };

  const closeClassModal = () => {
    setSelectedClass(null);
  };

  return (
    <section className="py-16 sm:py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Elite <span className="text-primary">Class Schedule</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Join our expert-led classes designed for every fitness level and training goal
          </p>
        </div>

        {/* Schedule Navigation - Improved responsive layout */}
        <div className="flex flex-col xl:flex-row gap-6 sm:gap-8">
          {/* Day Selector - Mobile horizontal scroll for better space usage */}
          <div className="xl:w-1/4">
            <div className="bg-card rounded-xl p-4 sm:p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="CalendarDaysIcon" size={20} className="text-primary mr-2" />
                Select Day
              </h3>
              
              {/* Mobile horizontal scroll layout for 826px viewport */}
              <div className="xl:space-y-2">
                <div className="flex xl:flex-col space-x-2 xl:space-x-0 xl:space-y-2 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0">
                  {schedule.map((day, index) => (
                    <button
                      key={day.date}
                      onClick={() => setSelectedDay(index)}
                      className={`flex-shrink-0 xl:w-full text-left p-3 rounded-lg transition-all duration-300 min-w-[140px] xl:min-w-0 ${
                        selectedDay === index
                          ? 'bg-primary/10 border border-primary/20 text-primary' :'bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="font-medium text-sm">{day.dayName}</div>
                      <div className="text-xs opacity-80 break-words">{day.date}</div>
                      <div className="text-xs mt-1">{day.classes.length} classes</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-3">Filter by Level</h4>
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Classes Grid - Enhanced responsive design */}
          <div className="xl:w-3/4">
            {/* Responsive class cards with proper text handling */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredClasses.map((classItem) => {
                const capacityStatus = getCapacityStatus(classItem.enrolled, classItem.capacity);
                
                return (
                  <div
                    key={classItem.id}
                    className="bg-card rounded-xl p-4 sm:p-6 border border-border hover:border-primary/20 transition-all duration-300 group cursor-pointer flex flex-col"
                    onClick={() => openClassModal(classItem)}
                  >
                    {/* Class Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="min-w-0 flex-1 mr-3">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 break-words">
                          {classItem.name}
                        </h3>
                        <p className="text-sm text-muted-foreground break-words">{classItem.instructor}</p>
                      </div>
                      <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getLevelColor(classItem.level)}`}>
                        {classItem.level}
                      </div>
                    </div>

                    {/* Class Details */}
                    <div className="space-y-2 sm:space-y-3 mb-4 flex-grow">
                      <div className="flex items-center space-x-2 sm:space-x-3 text-sm text-muted-foreground">
                        <Icon name="ClockIcon" size={16} className="flex-shrink-0" />
                        <span className="break-words">{classItem.time} ({classItem.duration} min)</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-sm text-muted-foreground">
                        <Icon name="MapPinIcon" size={16} className="flex-shrink-0" />
                        <span className="break-words">{classItem.room}</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-sm text-muted-foreground">
                        <Icon name="TagIcon" size={16} className="flex-shrink-0" />
                        <span className="break-words">{classItem.type}</span>
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Capacity</span>
                        <span className={`text-sm font-medium ${capacityStatus.color}`}>
                          {capacityStatus.status}
                        </span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {classItem.enrolled}/{classItem.capacity} enrolled
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      disabled={classItem.enrolled >= classItem.capacity}
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 disabled:bg-muted/30 disabled:text-muted-foreground disabled:cursor-not-allowed transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle booking logic
                      }}
                    >
                      {classItem.enrolled >= classItem.capacity ? 'Class Full' : 'Book Class'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* No Classes */}
            {filteredClasses.length === 0 && (
              <div className="text-center py-12">
                <Icon name="CalendarDaysIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Classes Available</h3>
                <p className="text-muted-foreground">Try selecting a different day or level filter</p>
              </div>
            )}
          </div>
        </div>

        {/* Class Detail Modal */}
        {selectedClass && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-xl p-6 max-w-lg w-full border border-border shadow-modal max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="min-w-0 flex-1 mr-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground break-words">{selectedClass.name}</h3>
                  <p className="text-muted-foreground break-words">with {selectedClass.instructor}</p>
                </div>
                <button
                  onClick={closeClassModal}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex-shrink-0"
                >
                  <Icon name="XMarkIcon" size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Icon name="ClockIcon" size={20} className="text-primary flex-shrink-0" />
                  <span className="text-foreground break-words">{selectedClass.time} ({selectedClass.duration} minutes)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPinIcon" size={20} className="text-primary flex-shrink-0" />
                  <span className="text-foreground break-words">{selectedClass.room}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="UserGroupIcon" size={20} className="text-primary flex-shrink-0" />
                  <span className="text-foreground">{selectedClass.enrolled}/{selectedClass.capacity} enrolled</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 break-words">{selectedClass.description}</p>

              <button
                disabled={selectedClass.enrolled >= selectedClass.capacity}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:bg-muted/30 disabled:text-muted-foreground disabled:cursor-not-allowed transition-all duration-300"
              >
                {selectedClass.enrolled >= selectedClass.capacity ? 'Class Full - Join Waitlist' : 'Book This Class'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassSchedule;