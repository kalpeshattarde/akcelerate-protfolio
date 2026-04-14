// src/pages/user-dashboard-trip-management/components/QuickRebookingWidget.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import AppImage from 'components/AppImage';

const QuickRebookingWidget = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState('similar');

  // Mock recommendations based on user history
  useEffect(() => {
    const mockRecommendations = {
      similar: [
        {
          id: 1,
          destination: 'Seoul',
          country: 'South Korea',
          reason: 'Similar to your Tokyo trip',
          price: 1899,
          duration: '7 days',
          image: 'https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=400',
          highlights: ['Culture', 'Food', 'Technology'],
          savings: 200
        },
        {
          id: 2,
          destination: 'Barcelona',
          country: 'Spain',
          reason: 'Similar to your Paris experience',
          price: 1599,
          duration: '6 days',
          image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=400&q=80',
          highlights: ['Architecture', 'Beach', 'Culture'],
          savings: 150
        }
      ],
      seasonal: [
        {
          id: 3,
          destination: 'Santorini',
          country: 'Greece',
          reason: 'Perfect for spring season',
          price: 2199,
          duration: '5 days',
          image: 'https://images.pixabay.com/photos/2016/04/01/12/11/santorini-1300560_1280.jpg',
          highlights: ['Sunset Views', 'Wine Tasting', 'Beaches'],
          seasonal: 'Spring Special'
        },
        {
          id: 4,
          destination: 'Bali',
          country: 'Indonesia',
          reason: 'Great weather in March-April',
          price: 1799,
          duration: '8 days',
          image: 'https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg?auto=compress&cs=tinysrgb&w=400',
          highlights: ['Temples', 'Rice Terraces', 'Wellness'],
          seasonal: 'Dry Season'
        }
      ],
      trending: [
        {
          id: 5,
          destination: 'Iceland',
          country: 'Iceland',
          reason: 'Trending destination for 2024',
          price: 2599,
          duration: '6 days',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
          highlights: ['Northern Lights', 'Geysers', 'Glaciers'],
          trending: 'Hot Pick'
        },
        {
          id: 6,
          destination: 'Morocco',
          country: 'Morocco',
          reason: 'Popular cultural destination',
          price: 1699,
          duration: '7 days',
          image: 'https://images.pixabay.com/photos/2016/02/09/16/35/morocco-1189343_1280.jpg',
          highlights: ['Markets', 'Desert', 'Architecture'],
          trending: 'Rising Star'
        }
      ]
    };
    
    setRecommendations(mockRecommendations);
  }, []);

  const handleBookNow = (destination) => {
    console.log('Booking trip to:', destination.destination);
  };

  const handleSaveForLater = (destination) => {
    console.log('Saving for later:', destination.destination);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const tabs = [
    { id: 'similar', label: 'Similar Trips', icon: 'RotateCcw' },
    { id: 'seasonal', label: 'Seasonal', icon: 'Sun' },
    { id: 'trending', label: 'Trending', icon: 'TrendingUp' }
  ];

  const currentRecommendations = recommendations[activeTab] || [];

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading-semibold text-text-primary">Quick Rebooking</h2>
          <Icon name="Sparkles" size={20} className="text-accent-600" />
        </div>
        
        <p className="text-text-secondary text-sm mb-4">
          Discover your next adventure based on your travel preferences and history
        </p>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-secondary-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body-medium transition-all duration-200 ease-out flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-surface text-primary shadow-sm'
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {currentRecommendations.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MapPin" size={48} className="mx-auto text-secondary-300 mb-4" />
            <h3 className="text-lg font-heading-medium text-text-primary mb-2">No Recommendations Available</h3>
            <p className="text-text-secondary">We're working on personalized suggestions for you!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRecommendations.map((destination) => (
              <div key={destination.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 ease-out">
                {/* Destination Image */}
                <div className="relative h-32">
                  <AppImage
                    src={destination.image}
                    alt={destination.destination}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {destination.savings && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium bg-success-100 text-success-600">
                        Save ${destination.savings}
                      </span>
                    )}
                    {destination.seasonal && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium bg-accent-100 text-accent-600">
                        {destination.seasonal}
                      </span>
                    )}
                    {destination.trending && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium bg-error-100 text-error-600">
                        {destination.trending}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  {/* Destination Info */}
                  <div className="mb-3">
                    <h3 className="text-lg font-heading-medium text-text-primary">{destination.destination}</h3>
                    <p className="text-text-secondary text-sm">{destination.country}</p>
                    <p className="text-text-secondary text-xs mt-1 italic">{destination.reason}</p>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {destination.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-50 text-primary-700"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Price and Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-sm text-text-secondary">
                        <Icon name="DollarSign" size={14} />
                        <span className="font-heading-medium text-text-primary">{formatCurrency(destination.price)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-text-secondary">
                        <Icon name="Clock" size={14} />
                        <span>{destination.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleBookNow(destination)}
                      className="flex-1 px-3 py-2 bg-primary text-white text-sm font-body-medium rounded-md hover:bg-primary-700 transition-colors duration-200 ease-out"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => handleSaveForLater(destination)}
                      className="px-3 py-2 bg-secondary-100 text-text-secondary text-sm rounded-md hover:bg-secondary-200 transition-colors duration-200 ease-out"
                    >
                      <Icon name="Heart" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View More Button */}
        {currentRecommendations.length > 0 && (
          <div className="text-center mt-6">
            <button className="px-6 py-2 border border-border text-text-secondary rounded-lg hover:bg-secondary-100 transition-colors duration-200 ease-out">
              View More Destinations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickRebookingWidget;