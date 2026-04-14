import React, { useState, useEffect } from 'react';

import CustomerHeader from 'components/ui/CustomerHeader';
import SearchForm from './components/SearchForm';
import FilterSidebar from './components/FilterSidebar';
import ResultsGrid from './components/ResultsGrid';
import SortControls from './components/SortControls';
import Icon from 'components/AppIcon';

const SearchResultsDashboard = () => {
  const [searchParams, setSearchParams] = useState({
    tripType: 'round-trip',
    origin: '',
    destination: '',
    departDate: '',
    returnDate: '',
    passengers: { adults: 1, children: 0, infants: 0 },
    rooms: 1,
    services: { flights: true, hotels: true, cars: true },
    cabinClass: 'economy'
  });

  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    airlines: [],
    hotelStars: [],
    carTypes: [],
    layovers: 'any',
    departureTime: 'any',
    amenities: []
  });

  const [sortBy, setSortBy] = useState('price');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Mock search results data
  const mockResults = [
    {
      id: 1,
      type: 'combo',
      totalPrice: 1299,
      carbonFootprint: 2.4,
      ecoScore: 'B+',
      flight: {
        airline: 'Delta Airlines',
        flightNumber: 'DL 1234',
        departure: { time: '08:30', airport: 'JFK', city: 'New York' },
        arrival: { time: '11:45', airport: 'LAX', city: 'Los Angeles' },
        duration: '5h 15m',
        stops: 0,
        cabinClass: 'Economy',
        price: 459
      },
      hotel: {
        name: 'Grand Plaza Hotel',
        rating: 4.5,
        stars: 4,
        location: 'Downtown Los Angeles',
        amenities: ['WiFi', 'Pool', 'Gym', 'Spa'],
        roomType: 'Deluxe King Room',
        price: 189,
        nights: 3
      },
      car: {
        company: 'Enterprise',
        model: 'Toyota Camry or similar',
        type: 'Intermediate',
        features: ['Automatic', 'AC', 'GPS'],
        price: 84,
        days: 3
      }
    },
    {
      id: 2,
      type: 'combo',
      totalPrice: 1599,
      carbonFootprint: 1.8,
      ecoScore: 'A-',
      flight: {
        airline: 'American Airlines',
        flightNumber: 'AA 5678',
        departure: { time: '14:20', airport: 'JFK', city: 'New York' },
        arrival: { time: '17:35', airport: 'LAX', city: 'Los Angeles' },
        duration: '5h 15m',
        stops: 0,
        cabinClass: 'Premium Economy',
        price: 689
      },
      hotel: {
        name: 'Luxury Suites Beverly Hills',
        rating: 4.8,
        stars: 5,
        location: 'Beverly Hills',
        amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Concierge'],
        roomType: 'Executive Suite',
        price: 299,
        nights: 3
      },
      car: {
        company: 'Hertz',
        model: 'BMW 3 Series or similar',
        type: 'Luxury',
        features: ['Automatic', 'AC', 'GPS', 'Leather'],
        price: 156,
        days: 3
      }
    },
    {
      id: 3,
      type: 'combo',
      totalPrice: 899,
      carbonFootprint: 3.1,
      ecoScore: 'C+',
      flight: {
        airline: 'Southwest Airlines',
        flightNumber: 'WN 9012',
        departure: { time: '06:15', airport: 'JFK', city: 'New York' },
        arrival: { time: '12:30', airport: 'LAX', city: 'Los Angeles' },
        duration: '7h 15m',
        stops: 1,
        cabinClass: 'Economy',
        price: 329
      },
      hotel: {
        name: 'Budget Inn Downtown',
        rating: 3.8,
        stars: 3,
        location: 'Downtown Los Angeles',
        amenities: ['WiFi', 'Parking'],
        roomType: 'Standard Room',
        price: 89,
        nights: 3
      },
      car: {
        company: 'Budget',
        model: 'Nissan Versa or similar',
        type: 'Economy',
        features: ['Automatic', 'AC'],
        price: 45,
        days: 3
      }
    }
  ];

  useEffect(() => {
    // Simulate search results loading
    if (searchParams.origin && searchParams.destination) {
      setIsLoading(true);
      setTimeout(() => {
        setResults(mockResults);
        setIsLoading(false);
      }, 1500);
    }
  }, [searchParams]);

  const handleSearch = (newSearchParams) => {
    setSearchParams(newSearchParams);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const filteredAndSortedResults = results
    .filter(result => {
      // Apply filters
      if (filters.priceRange[0] > 0 && result.totalPrice < filters.priceRange[0]) return false;
      if (filters.priceRange[1] < 5000 && result.totalPrice > filters.priceRange[1]) return false;
      if (filters.hotelStars.length > 0 && !filters.hotelStars.includes(result.hotel.stars)) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.totalPrice - b.totalPrice;
        case 'duration':
          return a.flight.duration.localeCompare(b.flight.duration);
        case 'eco-score':
          return a.carbonFootprint - b.carbonFootprint;
        case 'rating':
          return b.hotel.rating - a.hotel.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader />
      
      <main className="pt-16">
        {/* Search Form Section */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SearchForm 
              searchParams={searchParams}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center w-full px-4 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-primary transition-colors duration-200 ease-out"
              >
                <Icon name="Filter" size={20} className="mr-2" />
                Filters & Sort
                <Icon name="ChevronDown" size={16} className="ml-2" />
              </button>
            </div>

            {/* Filter Sidebar */}
            <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'} lg:w-80`}>
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                resultCount={filteredAndSortedResults.length}
              />
            </div>

            {/* Results Content */}
            <div className="flex-1">
              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                onSortChange={handleSortChange}
                resultCount={filteredAndSortedResults.length}
                isLoading={isLoading}
              />

              {/* Results Grid */}
              <ResultsGrid
                results={filteredAndSortedResults}
                isLoading={isLoading}
                searchParams={searchParams}
              />

              {/* Load More Button */}
              {!isLoading && filteredAndSortedResults.length > 0 && (
                <div className="mt-8 text-center">
                  <button className="px-6 py-3 bg-primary text-white font-body-medium rounded-lg hover:bg-primary-700 transition-all duration-200 ease-out">
                    Load More Results
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResultsDashboard;