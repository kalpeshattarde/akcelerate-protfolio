import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';


const ResultsGrid = ({ results, isLoading, searchParams }) => {
  const [selectedResults, setSelectedResults] = useState([]);
  const [expandedResult, setExpandedResult] = useState(null);

  const toggleResultSelection = (resultId) => {
    setSelectedResults(prev => 
      prev.includes(resultId)
        ? prev.filter(id => id !== resultId)
        : [...prev, resultId]
    );
  };

  const toggleResultExpansion = (resultId) => {
    setExpandedResult(prev => prev === resultId ? null : resultId);
  };

  const getEcoScoreColor = (score) => {
    switch (score) {
      case 'A+': case'A':
        return 'text-success bg-success-100';
      case 'B+': case'B':
        return 'text-warning bg-warning-100';
      default:
        return 'text-error bg-error-100';
    }
  };

  const formatDuration = (duration) => {
    return duration.replace('h', 'h ').replace('m', 'm');
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-surface border border-border rounded-lg p-6 animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="h-4 bg-secondary-200 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-secondary-200 rounded w-1/3"></div>
            </div>
            <div className="h-8 bg-secondary-200 rounded w-20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-24 bg-secondary-200 rounded"></div>
            <div className="h-24 bg-secondary-200 rounded"></div>
            <div className="h-24 bg-secondary-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (results.length === 0 && !isLoading) {
    return (
      <div className="bg-surface border border-border rounded-lg p-12 text-center">
        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-heading-semibold text-text-primary mb-2">
          No results found
        </h3>
        <p className="text-text-secondary mb-6">
          Try adjusting your search criteria or filters to find more options.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 ease-out">
            Modify Search
          </button>
          <button className="px-4 py-2 bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors duration-200 ease-out">
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <div
          key={result.id}
          className={`bg-surface border rounded-lg transition-all duration-200 ease-out hover:shadow-md ${
            selectedResults.includes(result.id) ? 'border-primary shadow-sm' : 'border-border'
          }`}
        >
          {/* Main Result Card */}
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedResults.includes(result.id)}
                  onChange={() => toggleResultSelection(result.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-body-medium ${getEcoScoreColor(result.ecoScore)}`}>
                      {result.ecoScore} Eco Score
                    </span>
                    <span className="text-xs text-text-secondary">
                      {result.carbonFootprint}t CO₂
                    </span>
                  </div>
                  <h3 className="text-lg font-heading-semibold text-text-primary mt-1">
                    Complete Travel Package
                  </h3>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-heading-bold text-text-primary">
                  ${result.totalPrice.toLocaleString()}
                </div>
                <div className="text-sm text-text-secondary">
                  per person
                </div>
              </div>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Flight Card */}
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Plane" size={16} className="text-primary" />
                  <span className="text-sm font-body-medium text-text-primary">Flight</span>
                  <span className="text-xs text-text-secondary">${result.flight.price}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body-medium text-text-primary">
                      {result.flight.airline}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {result.flight.flightNumber}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-body-medium">{result.flight.departure.time}</span>
                    <span className="text-text-secondary">{result.flight.departure.airport}</span>
                    <Icon name="ArrowRight" size={12} className="text-text-secondary" />
                    <span className="font-body-medium">{result.flight.arrival.time}</span>
                    <span className="text-text-secondary">{result.flight.arrival.airport}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span>{formatDuration(result.flight.duration)}</span>
                    <span>{result.flight.stops === 0 ? 'Non-stop' : `${result.flight.stops} stop${result.flight.stops > 1 ? 's' : ''}`}</span>
                  </div>
                </div>
              </div>

              {/* Hotel Card */}
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Building" size={16} className="text-primary" />
                  <span className="text-sm font-body-medium text-text-primary">Hotel</span>
                  <span className="text-xs text-text-secondary">${result.hotel.price}/night</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body-medium text-text-primary">
                      {result.hotel.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(result.hotel.stars)].map((_, i) => (
                        <Icon key={i} name="Star" size={10} className="text-warning fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-text-secondary">
                    {result.hotel.location}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span className="text-xs font-body-medium">{result.hotel.rating}</span>
                    <span className="text-xs text-text-secondary">({result.hotel.nights} nights)</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {result.hotel.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="px-2 py-1 bg-secondary-100 text-xs text-text-secondary rounded">
                        {amenity}
                      </span>
                    ))}
                    {result.hotel.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-secondary-100 text-xs text-text-secondary rounded">
                        +{result.hotel.amenities.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Car Card */}
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Car" size={16} className="text-primary" />
                  <span className="text-sm font-body-medium text-text-primary">Car Rental</span>
                  <span className="text-xs text-text-secondary">${result.car.price}/day</span>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-body-medium text-text-primary">
                    {result.car.company}
                  </div>
                  
                  <div className="text-sm text-text-secondary">
                    {result.car.model}
                  </div>
                  
                  <div className="text-xs text-text-secondary">
                    {result.car.type} • {result.car.days} days
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {result.car.features.map((feature) => (
                      <span key={feature} className="px-2 py-1 bg-secondary-100 text-xs text-text-secondary rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleResultExpansion(result.id)}
                  className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-colors duration-200 ease-out"
                >
                  <Icon name={expandedResult === result.id ? "ChevronUp" : "ChevronDown"} size={16} />
                  <span className="text-sm font-body-medium">
                    {expandedResult === result.id ? 'Less Details' : 'More Details'}
                  </span>
                </button>
                
                <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200 ease-out">
                  <Icon name="Heart" size={16} />
                  <span className="text-sm">Save</span>
                </button>
                
                <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200 ease-out">
                  <Icon name="Share2" size={16} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors duration-200 ease-out">
                  Compare
                </button>
                <Link
                  to="/booking-review-payment"
                  className="px-6 py-2 bg-primary text-white font-body-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 ease-out"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>

          {/* Expanded Details */}
          {expandedResult === result.id && (
            <div className="border-t border-border p-6 bg-secondary-50 animation-slide-up">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Flight Details */}
                <div>
                  <h4 className="text-sm font-body-medium text-text-primary mb-3 flex items-center space-x-2">
                    <Icon name="Plane" size={16} />
                    <span>Flight Details</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Aircraft:</span>
                      <span className="text-text-primary">Boeing 737-800</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Cabin:</span>
                      <span className="text-text-primary">{result.flight.cabinClass}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Baggage:</span>
                      <span className="text-text-primary">1 carry-on, 1 checked</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Cancellation:</span>
                      <span className="text-success">Free within 24h</span>
                    </div>
                  </div>
                </div>

                {/* Hotel Details */}
                <div>
                  <h4 className="text-sm font-body-medium text-text-primary mb-3 flex items-center space-x-2">
                    <Icon name="Building" size={16} />
                    <span>Hotel Details</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Room:</span>
                      <span className="text-text-primary">{result.hotel.roomType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Check-in:</span>
                      <span className="text-text-primary">3:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Check-out:</span>
                      <span className="text-text-primary">11:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Cancellation:</span>
                      <span className="text-success">Free until 6 PM</span>
                    </div>
                  </div>
                </div>

                {/* Car Details */}
                <div>
                  <h4 className="text-sm font-body-medium text-text-primary mb-3 flex items-center space-x-2">
                    <Icon name="Car" size={16} />
                    <span>Car Rental Details</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Pickup:</span>
                      <span className="text-text-primary">Airport Terminal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Fuel:</span>
                      <span className="text-text-primary">Full to Full</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Mileage:</span>
                      <span className="text-text-primary">Unlimited</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Insurance:</span>
                      <span className="text-text-primary">Basic included</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-body-medium text-text-primary mb-3">Price Breakdown</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Flight:</span>
                    <span className="text-text-primary">${result.flight.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Hotel ({result.hotel.nights} nights):</span>
                    <span className="text-text-primary">${result.hotel.price * result.hotel.nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Car ({result.car.days} days):</span>
                    <span className="text-text-primary">${result.car.price * result.car.days}</span>
                  </div>
                </div>
                <div className="flex justify-between pt-2 border-t border-border mt-2 font-body-medium">
                  <span className="text-text-primary">Total:</span>
                  <span className="text-text-primary">${result.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Compare Selected Button */}
      {selectedResults.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 animation-scale-in">
            <Icon name="GitCompare" size={20} />
            <span className="font-body-medium">
              Compare {selectedResults.length} package{selectedResults.length > 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setSelectedResults([])}
              className="ml-2 p-1 hover:bg-primary-700 rounded transition-colors duration-200 ease-out"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsGrid;