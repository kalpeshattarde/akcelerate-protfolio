'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Amenity {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  features: string[];
  icon: string;
  category: string;
}

interface AmenitiesShowcaseProps {
  amenities: Amenity[];
}

const AmenitiesShowcase = ({ amenities }: AmenitiesShowcaseProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);

  const categories = ['all', ...Array.from(new Set(amenities.map(amenity => amenity.category)))];

  const filteredAmenities = amenities.filter(amenity =>
    selectedCategory === 'all' || amenity.category === selectedCategory
  );

  const openAmenityModal = (amenity: Amenity) => {
    setSelectedAmenity(amenity);
  };

  const closeAmenityModal = () => {
    setSelectedAmenity(null);
  };

  return (
    <section className="py-16 sm:py-20 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Premium <span className="text-primary">Amenities</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Experience luxury and convenience with our world-class amenities designed to enhance your fitness journey
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-3 bg-card rounded-xl p-2 sm:p-3 border border-border max-w-full overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {category === 'all' ? 'All Amenities' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Grid - Enhanced responsive design with consistent image ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 group cursor-pointer flex flex-col"
              onClick={() => openAmenityModal(amenity)}
            >
              {/* Amenity Image */}
              <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                <img
                  src={amenity.image}
                  alt={amenity.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Icon name={amenity.icon as any} size={20} className="text-primary" />
                </div>
              </div>

              {/* Amenity Content */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 break-words">
                    {amenity.name}
                  </h3>
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mt-2">
                    {amenity.category}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground mb-4 flex-grow break-words leading-relaxed">
                  {amenity.description}
                </p>

                {/* Features Preview */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Key Features:</div>
                  <div className="space-y-1">
                    {amenity.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="CheckIcon" size={14} className="text-primary flex-shrink-0" />
                        <span className="break-words">{feature}</span>
                      </div>
                    ))}
                    {amenity.features.length > 3 && (
                      <div className="text-xs text-primary font-medium">
                        +{amenity.features.length - 3} more features
                      </div>
                    )}
                  </div>
                </div>

                {/* Learn More Button */}
                <button className="mt-4 w-full px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary/20 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAmenities.length === 0 && (
          <div className="text-center py-12">
            <Icon name="SparklesIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Amenities Found</h3>
            <p className="text-muted-foreground">Try selecting a different category</p>
          </div>
        )}

        {/* Amenity Detail Modal */}
        {selectedAmenity && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-xl max-w-2xl w-full border border-border shadow-modal max-h-[90vh] overflow-y-auto">
              {/* Modal Image */}
              <div className="relative w-full h-48 sm:h-64">
                <img
                  src={selectedAmenity.image}
                  alt={selectedAmenity.alt}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={closeAmenityModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-foreground hover:bg-background transition-colors duration-200"
                >
                  <Icon name="XMarkIcon" size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground break-words">{selectedAmenity.name}</h3>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mt-2">
                      {selectedAmenity.category}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center ml-4">
                    <Icon name={selectedAmenity.icon as any} size={24} className="text-primary" />
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 break-words leading-relaxed">{selectedAmenity.description}</p>

                {/* All Features */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4">All Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedAmenity.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <Icon name="CheckIcon" size={16} className="text-primary flex-shrink-0" />
                        <span className="break-words">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300">
                    Book Now
                  </button>
                  <button className="flex-1 px-6 py-3 bg-muted/20 text-foreground rounded-lg font-semibold hover:bg-muted/40 transition-all duration-300">
                    Get More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AmenitiesShowcase;