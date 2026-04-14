import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SearchForm = ({ searchParams, onSearch, isLoading }) => {
  const [formData, setFormData] = useState(searchParams);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const tripTypes = [
    { id: 'round-trip', label: 'Round Trip', icon: 'ArrowLeftRight' },
    { id: 'one-way', label: 'One Way', icon: 'ArrowRight' },
    { id: 'multi-city', label: 'Multi-City', icon: 'MapPin' }
  ];

  const cabinClasses = [
    { id: 'economy', label: 'Economy' },
    { id: 'premium-economy', label: 'Premium Economy' },
    { id: 'business', label: 'Business' },
    { id: 'first', label: 'First Class' }
  ];

  const popularDestinations = [
    { code: 'NYC', city: 'New York', country: 'USA' },
    { code: 'LAX', city: 'Los Angeles', country: 'USA' },
    { code: 'LHR', city: 'London', country: 'UK' },
    { code: 'CDG', city: 'Paris', country: 'France' },
    { code: 'NRT', city: 'Tokyo', country: 'Japan' },
    { code: 'DXB', city: 'Dubai', country: 'UAE' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePassengerChange = (type, increment) => {
    setFormData(prev => ({
      ...prev,
      passengers: {
        ...prev.passengers,
        [type]: Math.max(0, prev.passengers[type] + increment)
      }
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  const swapLocations = () => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Trip Type Tabs */}
        <div className="flex flex-wrap gap-2">
          {tripTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleInputChange('tripType', type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body-medium transition-all duration-200 ease-out ${
                formData.tripType === type.id
                  ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
              }`}
            >
              <Icon name={type.icon} size={16} />
              <span>{type.label}</span>
            </button>
          ))}
        </div>

        {/* Service Toggles */}
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.services.flights}
              onChange={() => handleServiceToggle('flights')}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <Icon name="Plane" size={16} className="text-text-secondary" />
            <span className="text-sm font-body-medium text-text-primary">Flights</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.services.hotels}
              onChange={() => handleServiceToggle('hotels')}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <Icon name="Building" size={16} className="text-text-secondary" />
            <span className="text-sm font-body-medium text-text-primary">Hotels</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.services.cars}
              onChange={() => handleServiceToggle('cars')}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <Icon name="Car" size={16} className="text-text-secondary" />
            <span className="text-sm font-body-medium text-text-primary">Cars</span>
          </label>
        </div>

        {/* Main Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin */}
          <div className="relative">
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              From
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => handleInputChange('origin', e.target.value)}
                placeholder="Origin city or airport"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-out"
              />
              <Icon name="MapPin" size={20} className="absolute left-3 top-3.5 text-text-secondary" />
            </div>
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              To
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                placeholder="Destination city or airport"
                className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-out"
              />
              <Icon name="MapPin" size={20} className="absolute left-3 top-3.5 text-text-secondary" />
              <button
                type="button"
                onClick={swapLocations}
                className="absolute right-3 top-3.5 p-1 text-text-secondary hover:text-primary transition-colors duration-200 ease-out"
              >
                <Icon name="ArrowUpDown" size={16} />
              </button>
            </div>
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Departure
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.departDate}
                onChange={(e) => handleInputChange('departDate', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-out"
              />
              <Icon name="Calendar" size={20} className="absolute left-3 top-3.5 text-text-secondary" />
            </div>
          </div>

          {/* Return Date */}
          {formData.tripType === 'round-trip' && (
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Return
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-out"
                />
                <Icon name="Calendar" size={20} className="absolute left-3 top-3.5 text-text-secondary" />
              </div>
            </div>
          )}
        </div>

        {/* Passengers and Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Passengers
            </label>
            <div className="flex items-center space-x-4 p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Adults:</span>
                <button
                  type="button"
                  onClick={() => handlePassengerChange('adults', -1)}
                  className="w-8 h-8 flex items-center justify-center bg-secondary-100 rounded-full hover:bg-secondary-200 transition-colors duration-200 ease-out"
                >
                  <Icon name="Minus" size={14} />
                </button>
                <span className="w-8 text-center font-body-medium">{formData.passengers.adults}</span>
                <button
                  type="button"
                  onClick={() => handlePassengerChange('adults', 1)}
                  className="w-8 h-8 flex items-center justify-center bg-secondary-100 rounded-full hover:bg-secondary-200 transition-colors duration-200 ease-out"
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Cabin Class
            </label>
            <select
              value={formData.cabinClass}
              onChange={(e) => handleInputChange('cabinClass', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-out"
            >
              {cabinClasses.map((cabin) => (
                <option key={cabin.id} value={cabin.id}>
                  {cabin.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Rooms
            </label>
            <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
              <button
                type="button"
                onClick={() => handleInputChange('rooms', Math.max(1, formData.rooms - 1))}
                className="w-8 h-8 flex items-center justify-center bg-secondary-100 rounded-full hover:bg-secondary-200 transition-colors duration-200 ease-out"
              >
                <Icon name="Minus" size={14} />
              </button>
              <span className="w-8 text-center font-body-medium">{formData.rooms}</span>
              <button
                type="button"
                onClick={() => handleInputChange('rooms', formData.rooms + 1)}
                className="w-8 h-8 flex items-center justify-center bg-secondary-100 rounded-full hover:bg-secondary-200 transition-colors duration-200 ease-out"
              >
                <Icon name="Plus" size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-colors duration-200 ease-out"
        >
          <Icon name="Settings" size={16} />
          <span className="text-sm font-body-medium">Advanced Options</span>
          <Icon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={16} />
        </button>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary-50 rounded-lg animation-slide-up">
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Preferred Airlines
              </label>
              <input
                type="text"
                placeholder="Enter airline names"
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-out"
              />
            </div>
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Max Layovers
              </label>
              <select className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-out">
                <option value="any">Any</option>
                <option value="0">Non-stop only</option>
                <option value="1">Max 1 stop</option>
                <option value="2">Max 2 stops</option>
              </select>
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading || !formData.origin || !formData.destination}
            className="flex items-center space-x-2 px-8 py-3 bg-primary text-white font-body-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-out"
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={20} className="animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Icon name="Search" size={20} />
                <span>Search Travel Options</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Popular Destinations */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-body-medium text-text-primary mb-3">Popular Destinations</h3>
        <div className="flex flex-wrap gap-2">
          {popularDestinations.map((dest) => (
            <button
              key={dest.code}
              type="button"
              onClick={() => handleInputChange('destination', `${dest.city} (${dest.code})`)}
              className="px-3 py-1 text-xs bg-secondary-100 text-text-secondary rounded-full hover:bg-secondary-200 transition-colors duration-200 ease-out"
            >
              {dest.city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;