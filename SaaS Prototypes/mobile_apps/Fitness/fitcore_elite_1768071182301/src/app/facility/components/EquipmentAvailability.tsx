'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Equipment {
  id: string;
  name: string;
  category: string;
  available: number;
  total: number;
  status: 'available' | 'busy' | 'maintenance';
  nextAvailable?: string;
  icon: string;
}

interface EquipmentAvailabilityProps {
  equipment: Equipment[];
}

const EquipmentAvailability = ({ equipment }: EquipmentAvailabilityProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const categories = ['all', ...Array.from(new Set(equipment.map(item => item.category)))];

  const filteredEquipment = equipment.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10 border-success/20';
      case 'busy':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'maintenance':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getAvailabilityPercentage = (available: number, total: number) => {
    return Math.round((available / total) * 100);
  };

  return (
    <section className="py-16 sm:py-20 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Real-Time <span className="text-primary">Equipment Status</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Check equipment availability in real-time and plan your workout efficiently
          </p>
        </div>

        {/* Controls - Enhanced responsive layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Search */}
          <div className="flex-1 lg:max-w-sm">
            <div className="relative">
              <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex-1 lg:max-w-sm">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-center lg:justify-end lg:flex-shrink-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="ClockIcon" size={16} />
              <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Equipment Grid - Fixed alignment and consistent spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredEquipment.map((item) => (
            <div key={item.id} className="bg-card rounded-xl p-4 sm:p-6 border border-border hover:border-primary/20 transition-all duration-300 group flex flex-col h-full">
              {/* Equipment Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                    <Icon name={item.icon as any} size={24} className="text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base break-words">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground break-words">{item.category}</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(item.status)}`}>
                  {item.status}
                </div>
              </div>

              {/* Availability Bar */}
              <div className="mb-4 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm text-muted-foreground">Availability</span>
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    {item.available}/{item.total}
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getAvailabilityPercentage(item.available, item.total)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {getAvailabilityPercentage(item.available, item.total)}% available
                </div>
              </div>

              {/* Next Available */}
              {item.nextAvailable && item.available === 0 && (
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground mb-4">
                  <Icon name="ClockIcon" size={14} className="flex-shrink-0" />
                  <span className="break-words">Next available: {item.nextAvailable}</span>
                </div>
              )}

              {/* Reserve Button */}
              <button
                disabled={item.available === 0 || item.status === 'maintenance'}
                className="w-full mt-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 disabled:bg-muted/30 disabled:text-muted-foreground disabled:cursor-not-allowed transition-all duration-300"
              >
                {item.available > 0 ? 'Reserve Equipment' : 'Currently Unavailable'}
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <Icon name="ExclamationTriangleIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No Equipment Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EquipmentAvailability;