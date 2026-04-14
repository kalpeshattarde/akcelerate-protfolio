import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const FlightDetails = ({ flightData, onShowFareRules }) => {
  const [selectedSeats, setSelectedSeats] = useState({
    outbound: null,
    return: null
  });
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const handleSeatSelection = (flight, seat) => {
    setSelectedSeats(prev => ({
      ...prev,
      [flight]: seat
    }));
  };
  
  return (
    <div className="space-y-6">
      {/* Flight Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary-100">
            <Image 
              src={flightData.outbound.logo} 
              alt={flightData.outbound.airline} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-body-medium text-text-primary">
              {flightData.outbound.airline}
            </h3>
            <p className="text-sm text-text-secondary">
              {flightData.type === 'round-trip' ? 'Round-trip' : 'One-way'} • {flightData.outbound.cabin} Class
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-body-medium ${
            flightData.refundable 
              ? 'bg-success-100 text-success-600' :'bg-warning-100 text-warning-600'
          }`}>
            {flightData.refundable ? 'Refundable' : 'Non-refundable'}
          </div>
          
          <div className="px-2 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-body-medium flex items-center space-x-1">
            <Icon name="Leaf" size={12} />
            <span>Carbon Score: {flightData.carbonFootprint.score}</span>
          </div>
        </div>
      </div>
      
      {/* Outbound Flight */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-secondary-100 p-3">
          <h4 className="font-body-medium text-text-primary">
            Outbound Flight • {formatDate(flightData.outbound.departureDate)}
          </h4>
        </div>
        
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            {/* Flight Timeline */}
            <div className="flex-1 flex items-center space-x-4 mb-4 md:mb-0">
              <div className="text-center">
                <p className="text-lg font-body-medium text-text-primary">
                  {formatTime(flightData.outbound.departureDate)}
                </p>
                <p className="text-sm text-text-secondary">
                  {flightData.outbound.departureAirport}
                </p>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="text-xs text-text-secondary mb-1">
                  {flightData.outbound.duration}
                </div>
                <div className="w-full flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="flex-1 h-0.5 bg-primary"></div>
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div className="text-xs text-text-secondary mt-1">
                  {flightData.outbound.stops === 0 ? 'Direct' : `${flightData.outbound.stops} stop(s)`}
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-body-medium text-text-primary">
                  {formatTime(flightData.outbound.arrivalDate)}
                </p>
                <p className="text-sm text-text-secondary">
                  {flightData.outbound.arrivalAirport}
                </p>
              </div>
            </div>
            
            {/* Flight Details */}
            <div className="flex flex-col space-y-2 md:w-48">
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  Flight {flightData.outbound.flightNumber}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Plane" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  {flightData.outbound.aircraft}
                </span>
              </div>
            </div>
          </div>
          
          {/* Seat Selection */}
          <div className="mt-6">
            <h5 className="text-sm font-body-medium text-text-primary mb-3">
              Select Your Seat
            </h5>
            
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2'].map((seat) => (
                <button
                  key={seat}
                  type="button"
                  onClick={() => handleSeatSelection('outbound', seat)}
                  className={`p-2 rounded border text-sm font-body-medium transition-all duration-200 ease-out ${
                    selectedSeats.outbound === seat
                      ? 'bg-primary text-white border-primary' :'bg-surface text-text-secondary border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {seat}
                </button>
              ))}
            </div>
            
            <p className="text-xs text-text-secondary mt-2">
              {selectedSeats.outbound 
                ? `Selected seat: ${selectedSeats.outbound}` 
                : 'No seat selected. One will be assigned automatically.'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Return Flight (if round-trip) */}
      {flightData.type === 'round-trip' && flightData.return && (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-secondary-100 p-3">
            <h4 className="font-body-medium text-text-primary">
              Return Flight • {formatDate(flightData.return.departureDate)}
            </h4>
          </div>
          
          <div className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              {/* Flight Timeline */}
              <div className="flex-1 flex items-center space-x-4 mb-4 md:mb-0">
                <div className="text-center">
                  <p className="text-lg font-body-medium text-text-primary">
                    {formatTime(flightData.return.departureDate)}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {flightData.return.departureAirport}
                  </p>
                </div>
                
                <div className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-text-secondary mb-1">
                    {flightData.return.duration}
                  </div>
                  <div className="w-full flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="flex-1 h-0.5 bg-primary"></div>
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    {flightData.return.stops === 0 ? 'Direct' : `${flightData.return.stops} stop(s)`}
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-body-medium text-text-primary">
                    {formatTime(flightData.return.arrivalDate)}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {flightData.return.arrivalAirport}
                  </p>
                </div>
              </div>
              
              {/* Flight Details */}
              <div className="flex flex-col space-y-2 md:w-48">
                <div className="flex items-center space-x-2">
                  <Icon name="Info" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    Flight {flightData.return.flightNumber}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Plane" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {flightData.return.aircraft}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Seat Selection */}
            <div className="mt-6">
              <h5 className="text-sm font-body-medium text-text-primary mb-3">
                Select Your Seat
              </h5>
              
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2'].map((seat) => (
                  <button
                    key={seat}
                    type="button"
                    onClick={() => handleSeatSelection('return', seat)}
                    className={`p-2 rounded border text-sm font-body-medium transition-all duration-200 ease-out ${
                      selectedSeats.return === seat
                        ? 'bg-primary text-white border-primary' :'bg-surface text-text-secondary border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {seat}
                  </button>
                ))}
              </div>
              
              <p className="text-xs text-text-secondary mt-2">
                {selectedSeats.return 
                  ? `Selected seat: ${selectedSeats.return}` 
                  : 'No seat selected. One will be assigned automatically.'}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Baggage Information */}
      <div className="bg-secondary-100 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Luggage" size={20} className="text-text-primary mt-0.5" />
          <div>
            <h5 className="font-body-medium text-text-primary mb-1">
              Baggage Information
            </h5>
            <p className="text-sm text-text-secondary">
              {flightData.baggageIncluded 
                ? 'Includes 1 checked bag (up to 23kg) and 1 carry-on bag (up to 7kg) per passenger.' 
                : 'No checked baggage included. Carry-on bag (up to 7kg) included per passenger.'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Fare Rules Link */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onShowFareRules}
          className="text-sm text-primary hover:underline flex items-center space-x-1"
        >
          <span>View Fare Rules</span>
          <Icon name="ExternalLink" size={14} />
        </button>
      </div>
    </div>
  );
};

export default FlightDetails;