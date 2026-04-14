// src/pages/user-dashboard-trip-management/components/UpcomingTripsSection.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import AppImage from 'components/AppImage';

const UpcomingTripsSection = ({ detailed = false }) => {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [weather, setWeather] = useState({});

  // Mock upcoming trips data
  useEffect(() => {
    const mockTrips = [
      {
        id: 1,
        destination: 'Los Angeles',
        country: 'USA',
        departureDate: '2024-02-15',
        returnDate: '2024-02-20',
        daysUntil: 12,
        flight: {
          airline: 'Delta Airlines',
          flightNumber: 'DL 1234',
          departure: { time: '08:30', airport: 'JFK' },
          arrival: { time: '11:45', airport: 'LAX' }
        },
        hotel: {
          name: 'Grand Plaza Hotel',
          checkin: '2024-02-15',
          checkout: '2024-02-20'
        },
        image: 'https://images.pexels.com/photos/2695679/pexels-photo-2695679.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'confirmed',
        bookingRef: 'TRV-123456'
      },
      {
        id: 2,
        destination: 'Paris',
        country: 'France',
        departureDate: '2024-03-10',
        returnDate: '2024-03-17',
        daysUntil: 35,
        flight: {
          airline: 'Air France',
          flightNumber: 'AF 007',
          departure: { time: '19:45', airport: 'JFK' },
          arrival: { time: '08:30+1', airport: 'CDG' }
        },
        hotel: {
          name: 'Hotel des Tuileries',
          checkin: '2024-03-10',
          checkout: '2024-03-17'
        },
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=800&q=80',
        status: 'confirmed',
        bookingRef: 'TRV-789012'
      }
    ];
    
    setUpcomingTrips(mockTrips);

    // Mock weather data
    const mockWeather = {
      1: { temp: 22, condition: 'sunny', humidity: 65 },
      2: { temp: 8, condition: 'cloudy', humidity: 80 }
    };
    setWeather(mockWeather);
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return 'Sun';
      case 'cloudy': return 'Cloud';
      case 'rainy': return 'CloudRain';
      default: return 'Sun';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success-600 bg-success-100';
      case 'pending': return 'text-warning-600 bg-warning-100';
      case 'cancelled': return 'text-error-600 bg-error-100';
      default: return 'text-text-secondary bg-secondary-100';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleQuickAction = (action, tripId) => {
    console.log(`${action} for trip ${tripId}`);
  };

  if (upcomingTrips.length === 0) {
    return (
      <div className="bg-surface rounded-lg border border-border p-8 text-center">
        <Icon name="MapPin" size={48} className="mx-auto text-secondary-300 mb-4" />
        <h3 className="text-lg font-heading-medium text-text-primary mb-2">No Upcoming Trips</h3>
        <p className="text-text-secondary mb-4">Plan your next adventure and start exploring the world!</p>
        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 ease-out">
          Search Flights
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading-semibold text-text-primary">Upcoming Trips</h2>
          {!detailed && (
            <button className="text-primary hover:text-primary-700 text-sm font-body-medium transition-colors duration-200 ease-out">
              View All
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-border">
        {upcomingTrips.map((trip) => (
          <div key={trip.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Trip Image */}
              <div className="relative w-full lg:w-48 h-32 lg:h-24 rounded-lg overflow-hidden flex-shrink-0">
                <AppImage
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium ${getStatusColor(trip.status)}`}>
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Trip Details */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-heading-medium text-text-primary">{trip.destination}</h3>
                    <p className="text-text-secondary">{trip.country}</p>
                    
                    {/* Countdown */}
                    <div className="flex items-center space-x-2 mt-2">
                      <Icon name="Clock" size={16} className="text-accent-600" />
                      <span className="text-accent-600 font-body-medium">
                        {trip.daysUntil === 0 ? 'Today!' : `${trip.daysUntil} days to go`}
                      </span>
                    </div>

                    {/* Travel Details */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Plane" size={14} />
                        <span>{trip.flight.airline} {trip.flight.flightNumber}</span>
                        <span>•</span>
                        <span>{trip.flight.departure.time} {trip.flight.departure.airport}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Calendar" size={14} />
                        <span>{formatDate(trip.departureDate)} - {formatDate(trip.returnDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Building" size={14} />
                        <span>{trip.hotel.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Weather Widget */}
                  {weather[trip.id] && (
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name={getWeatherIcon(weather[trip.id].condition)} size={20} className="text-primary" />
                        <span className="text-lg font-heading-medium text-text-primary">
                          {weather[trip.id].temp}°C
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary">Current weather</p>
                      <p className="text-xs text-text-secondary">Humidity: {weather[trip.id].humidity}%</p>
                    </div>
                  )}
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => handleQuickAction('check-in', trip.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary-700 transition-colors duration-200 ease-out"
                  >
                    <Icon name="CheckCircle" size={14} />
                    <span>Check-in</span>
                  </button>
                  <button
                    onClick={() => handleQuickAction('seat-selection', trip.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-secondary-100 text-text-secondary text-sm rounded-md hover:bg-secondary-200 transition-colors duration-200 ease-out"
                  >
                    <Icon name="MapPin" size={14} />
                    <span>Select Seats</span>
                  </button>
                  <button
                    onClick={() => handleQuickAction('share-itinerary', trip.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-secondary-100 text-text-secondary text-sm rounded-md hover:bg-secondary-200 transition-colors duration-200 ease-out"
                  >
                    <Icon name="Share" size={14} />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => handleQuickAction('view-details', trip.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-secondary-100 text-text-secondary text-sm rounded-md hover:bg-secondary-200 transition-colors duration-200 ease-out"
                  >
                    <Icon name="Eye" size={14} />
                    <span>Details</span>
                  </button>
                </div>

                {/* Booking Reference */}
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-text-secondary">
                    Booking Reference: <span className="font-data-medium">{trip.bookingRef}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTripsSection;