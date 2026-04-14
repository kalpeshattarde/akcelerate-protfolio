import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterSidebar = ({ filters, onFilterChange, resultCount }) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    flight: true,
    hotel: true,
    car: true,
    eco: true
  });

  const airlines = [
    { id: 'delta', name: 'Delta Airlines', count: 12 },
    { id: 'american', name: 'American Airlines', count: 8 },
    { id: 'southwest', name: 'Southwest', count: 15 },
    { id: 'united', name: 'United Airlines', count: 6 }
  ];

  const hotelChains = [
    { id: 'marriott', name: 'Marriott', count: 24 },
    { id: 'hilton', name: 'Hilton', count: 18 },
    { id: 'hyatt', name: 'Hyatt', count: 12 },
    { id: 'ihg', name: 'IHG', count: 16 }
  ];

  const carCompanies = [
    { id: 'enterprise', name: 'Enterprise', count: 8 },
    { id: 'hertz', name: 'Hertz', count: 6 },
    { id: 'budget', name: 'Budget', count: 10 },
    { id: 'avis', name: 'Avis', count: 7 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceRangeChange = (value, index) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value);
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const handleCheckboxChange = (category, value) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange({ ...filters, [category]: newValues });
  };

  const handleStarRatingChange = (stars) => {
    const currentStars = filters.hotelStars || [];
    const newStars = currentStars.includes(stars)
      ? currentStars.filter(s => s !== stars)
      : [...currentStars, stars];
    
    onFilterChange({ ...filters, hotelStars: newStars });
  };

  const clearAllFilters = () => {
    onFilterChange({
      priceRange: [0, 5000],
      airlines: [],
      hotelStars: [],
      carTypes: [],
      layovers: 'any',
      departureTime: 'any',
      amenities: []
    });
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-body-medium text-text-primary">{title}</h3>
        <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="text-text-secondary" />
      </button>
      {isExpanded && (
        <div className="mt-3 animation-slide-up">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading-semibold text-text-primary">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-primary hover:text-primary-700 transition-colors duration-200 ease-out"
        >
          Clear All
        </button>
      </div>

      {/* Results Count */}
      <div className="mb-6 p-3 bg-primary-50 rounded-lg">
        <p className="text-sm text-primary font-body-medium">
          {resultCount} travel packages found
        </p>
      </div>

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceRangeChange(e.target.value, 0)}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(e.target.value, 1)}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceRangeChange(e.target.value, 0)}
              className="px-3 py-2 text-sm border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(e.target.value, 1)}
              className="px-3 py-2 text-sm border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Max"
            />
          </div>
        </div>
      </FilterSection>

      {/* Flight Preferences */}
      <FilterSection
        title="Flight Preferences"
        isExpanded={expandedSections.flight}
        onToggle={() => toggleSection('flight')}
      >
        <div className="space-y-4">
          {/* Airlines */}
          <div>
            <h4 className="text-xs font-body-medium text-text-secondary mb-2">Airlines</h4>
            <div className="space-y-2">
              {airlines.map((airline) => (
                <label key={airline.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.airlines?.includes(airline.id) || false}
                      onChange={() => handleCheckboxChange('airlines', airline.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-primary">{airline.name}</span>
                  </div>
                  <span className="text-xs text-text-secondary">({airline.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Stops */}
          <div>
            <h4 className="text-xs font-body-medium text-text-secondary mb-2">Stops</h4>
            <div className="space-y-2">
              {['Non-stop', '1 stop', '2+ stops'].map((stop) => (
                <label key={stop} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="stops"
                    value={stop}
                    checked={filters.layovers === stop}
                    onChange={(e) => onFilterChange({ ...filters, layovers: e.target.value })}
                    className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-primary">{stop}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Departure Time */}
          <div>
            <h4 className="text-xs font-body-medium text-text-secondary mb-2">Departure Time</h4>
            <div className="space-y-2">
              {[
                { value: 'morning', label: 'Morning (6AM - 12PM)' },
                { value: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
                { value: 'evening', label: 'Evening (6PM - 12AM)' },
                { value: 'night', label: 'Night (12AM - 6AM)' }
              ].map((time) => (
                <label key={time.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.departureTime?.includes(time.value) || false}
                    onChange={() => handleCheckboxChange('departureTime', time.value)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-primary">{time.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Hotel Preferences */}
      <FilterSection
        title="Hotel Preferences"
        isExpanded={expandedSections.hotel}
        onToggle={() => toggleSection('hotel')}
      >
        <div className="space-y-4">
          {/* Star Rating */}
          <div>
            <h4 className="text-xs font-body-medium text-text-secondary mb-2">Star Rating</h4>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((stars) => (
                <button
                  key={stars}
                  onClick={() => handleStarRatingChange(stars)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-all duration-200 ease-out ${
                    filters.hotelStars?.includes(stars)
                      ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                  }`}
                >
                  <span>{stars}</span>
                  <Icon name="Star" size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Hotel Chains */}
          <div>
            <h4 className="text-xs font-body-medium text-text-secondary mb-2">Hotel Chains</h4>
            <div className="space-y-2">
              {hotelChains.map((chain) => (
                <label key={chain.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.hotelChains?.includes(chain.id) || false}
                      onChange={() => handleCheckboxChange('hotelChains', chain.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-primary">{chain.name}</span>
                  </div>
                  <span className="text-xs text-text-secondary">({chain.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-xs font-body-medium text-text-secondary mb-2">Amenities</h4>
            <div className="space-y-2">
              {['WiFi', 'Pool', 'Gym', 'Spa', 'Parking', 'Pet Friendly'].map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.amenities?.includes(amenity) || false}
                    onChange={() => handleCheckboxChange('amenities', amenity)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-primary">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Car Preferences */}
      <FilterSection
        title="Car Preferences"
        isExpanded={expandedSections.car}
        onToggle={() => toggleSection('car')}
      >
        <div className="space-y-4">
          {/* Car Types */}
          <div>
            <h4 className="text-xs font-body-medium text-text-secondary mb-2">Vehicle Type</h4>
            <div className="space-y-2">
              {['Economy', 'Compact', 'Intermediate', 'Standard', 'Full Size', 'Luxury', 'SUV'].map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.carTypes?.includes(type) || false}
                    onChange={() => handleCheckboxChange('carTypes', type)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-primary">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Car Companies */}
          <div>
            <h4 className="text-xs font-body-medium text-text-secondary mb-2">Rental Companies</h4>
            <div className="space-y-2">
              {carCompanies.map((company) => (
                <label key={company.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.carCompanies?.includes(company.id) || false}
                      onChange={() => handleCheckboxChange('carCompanies', company.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-primary">{company.name}</span>
                  </div>
                  <span className="text-xs text-text-secondary">({company.count})</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Eco-Friendly Options */}
      <FilterSection
        title="Eco-Friendly Options"
        isExpanded={expandedSections.eco}
        onToggle={() => toggleSection('eco')}
      >
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.ecoFriendly || false}
              onChange={(e) => onFilterChange({ ...filters, ecoFriendly: e.target.checked })}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <span className="text-sm text-text-primary">Show eco-friendly options only</span>
          </label>
          
          <div>
            <h4 className="text-xs font-body-medium text-text-secondary mb-2">Carbon Footprint</h4>
            <div className="space-y-2">
              {['A+ (Lowest)', 'A', 'B+', 'B', 'C+ (Highest)'].map((score) => (
                <label key={score} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.ecoScores?.includes(score) || false}
                    onChange={() => handleCheckboxChange('ecoScores', score)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-primary">{score}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;