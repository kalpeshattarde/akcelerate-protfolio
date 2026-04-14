// src/pages/user-dashboard-trip-management/components/BookingHistorySection.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import AppImage from 'components/AppImage';

const BookingHistorySection = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    destination: '',
    serviceType: 'all',
    status: 'all'
  });
  const [sortBy, setSortBy] = useState('date-desc');
  const [expandedBooking, setExpandedBooking] = useState(null);

  // Mock booking history data
  useEffect(() => {
    const mockHistory = [
      {
        id: 1,
        destination: 'Tokyo',
        country: 'Japan',
        bookingDate: '2024-01-15',
        travelDate: '2024-01-20',
        returnDate: '2024-01-27',
        totalAmount: 2499,
        status: 'completed',
        services: ['flight', 'hotel', 'car'],
        bookingRef: 'TRV-456789',
        image: 'https://images.pixabay.com/photos/2015/10/06/18/26/tokyo-975079_1280.jpg',
        details: {
          flight: {
            airline: 'JAL',
            flightNumber: 'JL 005',
            departure: { time: '13:45', airport: 'JFK', city: 'New York' },
            arrival: { time: '17:30+1', airport: 'NRT', city: 'Tokyo' }
          },
          hotel: {
            name: 'Hotel New Otani Tokyo',
            nights: 7,
            roomType: 'Deluxe Room'
          },
          car: {
            company: 'Toyota Rent a Car',
            model: 'Toyota Prius',
            days: 5
          }
        },
        carbonFootprint: 3.2
      },
      {
        id: 2,
        destination: 'London',
        country: 'United Kingdom',
        bookingDate: '2023-12-10',
        travelDate: '2023-12-22',
        returnDate: '2023-12-29',
        totalAmount: 1899,
        status: 'completed',
        services: ['flight', 'hotel'],
        bookingRef: 'TRV-234567',
        image: 'https://images.pexels.com/photos/77171/pexels-photo-77171.jpeg?auto=compress&cs=tinysrgb&w=800',
        details: {
          flight: {
            airline: 'British Airways',
            flightNumber: 'BA 177',
            departure: { time: '21:30', airport: 'JFK', city: 'New York' },
            arrival: { time: '08:45+1', airport: 'LHR', city: 'London' }
          },
          hotel: {
            name: 'The Langham London',
            nights: 7,
            roomType: 'Superior Room'
          }
        },
        carbonFootprint: 2.8
      },
      {
        id: 3,
        destination: 'Dubai',
        country: 'UAE',
        bookingDate: '2023-11-05',
        travelDate: '2023-11-15',
        returnDate: '2023-11-22',
        totalAmount: 1699,
        status: 'cancelled',
        services: ['flight', 'hotel'],
        bookingRef: 'TRV-345678',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        details: {
          flight: {
            airline: 'Emirates',
            flightNumber: 'EK 201',
            departure: { time: '23:55', airport: 'JFK', city: 'New York' },
            arrival: { time: '19:40+1', airport: 'DXB', city: 'Dubai' }
          },
          hotel: {
            name: 'Burj Al Arab Jumeirah',
            nights: 7,
            roomType: 'Ocean Suite'
          }
        },
        refundAmount: 1599,
        carbonFootprint: 0
      }
    ];
    
    setBookingHistory(mockHistory);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleExport = () => {
    console.log('Exporting booking history...');
    // Mock export functionality
  };

  const handleRebook = (booking) => {
    console.log('Rebooking trip to', booking.destination);
  };

  const toggleExpandBooking = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success-600 bg-success-100';
      case 'cancelled': return 'text-error-600 bg-error-100';
      case 'refunded': return 'text-warning-600 bg-warning-100';
      default: return 'text-text-secondary bg-secondary-100';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getServiceIcons = (services) => {
    const iconMap = {
      flight: 'Plane',
      hotel: 'Building',
      car: 'Car'
    };
    return services.map(service => iconMap[service]);
  };

  // Apply filters and sorting
  const filteredHistory = bookingHistory
    .filter(booking => {
      if (filters.destination && !booking.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
        return false;
      }
      if (filters.status !== 'all' && booking.status !== filters.status) {
        return false;
      }
      if (filters.serviceType !== 'all' && !booking.services.includes(filters.serviceType)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.travelDate) - new Date(a.travelDate);
        case 'date-asc':
          return new Date(a.travelDate) - new Date(b.travelDate);
        case 'amount-desc':
          return b.totalAmount - a.totalAmount;
        case 'amount-asc':
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header with Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-xl font-heading-semibold text-text-primary">Booking History</h2>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors duration-200 ease-out"
            >
              <Icon name="Download" size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-1">Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Time</option>
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-year">Last Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-1">Destination</label>
            <input
              type="text"
              value={filters.destination}
              onChange={(e) => handleFilterChange('destination', e.target.value)}
              placeholder="Search destination"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-1">Service Type</label>
            <select
              value={filters.serviceType}
              onChange={(e) => handleFilterChange('serviceType', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Services</option>
              <option value="flight">Flights</option>
              <option value="hotel">Hotels</option>
              <option value="car">Car Rentals</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Booking List */}
      <div className="divide-y divide-border">
        {filteredHistory.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="History" size={48} className="mx-auto text-secondary-300 mb-4" />
            <h3 className="text-lg font-heading-medium text-text-primary mb-2">No Booking History Found</h3>
            <p className="text-text-secondary">Try adjusting your filters or start planning your next trip!</p>
          </div>
        ) : (
          filteredHistory.map((booking) => (
            <div key={booking.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Booking Image */}
                <div className="w-full lg:w-32 h-24 lg:h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <AppImage
                    src={booking.image}
                    alt={booking.destination}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Booking Details */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-heading-medium text-text-primary">{booking.destination}</h3>
                          <p className="text-text-secondary">{booking.country}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-2">
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>{formatDate(booking.travelDate)} - {formatDate(booking.returnDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="CreditCard" size={14} />
                          <span>{formatCurrency(booking.totalAmount)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getServiceIcons(booking.services).map((iconName, index) => (
                            <Icon key={index} name={iconName} size={14} />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-text-secondary">
                        <span>Booking Ref: {booking.bookingRef}</span>
                        <span>•</span>
                        <span>Booked on {formatDate(booking.bookingDate)}</span>
                        {booking.carbonFootprint > 0 && (
                          <>
                            <span>•</span>
                            <span>CO₂: {booking.carbonFootprint}t</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => toggleExpandBooking(booking.id)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-secondary-100 text-text-secondary text-sm rounded-md hover:bg-secondary-200 transition-colors duration-200 ease-out"
                      >
                        <Icon name={expandedBooking === booking.id ? "ChevronUp" : "ChevronDown"} size={14} />
                        <span>Details</span>
                      </button>
                      {booking.status === 'completed' && (
                        <button
                          onClick={() => handleRebook(booking)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary-700 transition-colors duration-200 ease-out"
                        >
                          <Icon name="RotateCcw" size={14} />
                          <span>Rebook</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedBooking === booking.id && (
                    <div className="mt-4 pt-4 border-t border-border animation-slide-up">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {booking.details.flight && (
                          <div className="space-y-2">
                            <h4 className="font-body-medium text-text-primary flex items-center space-x-1">
                              <Icon name="Plane" size={14} />
                              <span>Flight Details</span>
                            </h4>
                            <div className="text-sm text-text-secondary space-y-1">
                              <p>{booking.details.flight.airline} {booking.details.flight.flightNumber}</p>
                              <p>{booking.details.flight.departure.time} {booking.details.flight.departure.airport} → {booking.details.flight.arrival.time} {booking.details.flight.arrival.airport}</p>
                            </div>
                          </div>
                        )}

                        {booking.details.hotel && (
                          <div className="space-y-2">
                            <h4 className="font-body-medium text-text-primary flex items-center space-x-1">
                              <Icon name="Building" size={14} />
                              <span>Hotel Details</span>
                            </h4>
                            <div className="text-sm text-text-secondary space-y-1">
                              <p>{booking.details.hotel.name}</p>
                              <p>{booking.details.hotel.roomType}</p>
                              <p>{booking.details.hotel.nights} nights</p>
                            </div>
                          </div>
                        )}

                        {booking.details.car && (
                          <div className="space-y-2">
                            <h4 className="font-body-medium text-text-primary flex items-center space-x-1">
                              <Icon name="Car" size={14} />
                              <span>Car Rental</span>
                            </h4>
                            <div className="text-sm text-text-secondary space-y-1">
                              <p>{booking.details.car.company}</p>
                              <p>{booking.details.car.model}</p>
                              <p>{booking.details.car.days} days</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {booking.status === 'cancelled' && booking.refundAmount && (
                        <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                          <p className="text-sm text-warning-600">
                            <Icon name="AlertTriangle" size={14} className="inline mr-1" />
                            Refund Amount: {formatCurrency(booking.refundAmount)}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingHistorySection;