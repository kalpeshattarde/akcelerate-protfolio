import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const HotelDetails = ({ hotelData, onShowCancellationPolicy }) => {
  const [selectedImage, setSelectedImage] = useState(hotelData.images[0]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const calculateNights = () => {
    const checkIn = new Date(hotelData.checkIn);
    const checkOut = new Date(hotelData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <div className="space-y-6">
      {/* Hotel Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-body-medium text-text-primary">
            {hotelData.name}
          </h3>
          <p className="text-sm text-text-secondary">
            {hotelData.address}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-body-medium ${
            hotelData.refundable 
              ? 'bg-success-100 text-success-600' :'bg-warning-100 text-warning-600'
          }`}>
            {hotelData.refundable ? 'Free cancellation' : 'Non-refundable'}
          </div>
        </div>
      </div>
      
      {/* Hotel Images */}
      <div className="space-y-2">
        <div className="w-full h-48 sm:h-64 rounded-lg overflow-hidden">
          <Image 
            src={selectedImage} 
            alt={hotelData.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {hotelData.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`w-16 h-16 rounded overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ease-out ${
                selectedImage === image ? 'border-primary' : 'border-transparent'
              }`}
            >
              <Image 
                src={image} 
                alt={`${hotelData.name} - Image ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Stay Details */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-secondary-100 p-3">
          <h4 className="font-body-medium text-text-primary">
            Stay Details
          </h4>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Check-in</span>
                <span className="text-sm font-body-medium text-text-primary">
                  {formatDate(hotelData.checkIn)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Check-out</span>
                <span className="text-sm font-body-medium text-text-primary">
                  {formatDate(hotelData.checkOut)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Length of stay</span>
                <span className="text-sm font-body-medium text-text-primary">
                  {calculateNights()} night(s)
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Room type</span>
                <span className="text-sm font-body-medium text-text-primary">
                  {hotelData.roomType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Guests</span>
                <span className="text-sm font-body-medium text-text-primary">
                  {hotelData.guests} {hotelData.guests === 1 ? 'person' : 'people'}
                </span>
              </div>
              {hotelData.refundable && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Cancellation deadline</span>
                  <span className="text-sm font-body-medium text-success-600">
                    Until {formatDate(hotelData.cancellationDeadline)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Amenities */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-secondary-100 p-3">
          <h4 className="font-body-medium text-text-primary">
            Amenities
          </h4>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {hotelData.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm text-text-primary">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-secondary-100 p-3">
          <h4 className="font-body-medium text-text-primary">
            Location
          </h4>
        </div>
        
        <div className="p-4">
          <div className="w-full h-48 rounded overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={hotelData.name}
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=34.0522,-118.2437&z=14&output=embed">
            </iframe>
          </div>
        </div>
      </div>
      
      {/* Cancellation Policy Link */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onShowCancellationPolicy}
          className="text-sm text-primary hover:underline flex items-center space-x-1"
        >
          <span>View Cancellation Policy</span>
          <Icon name="ExternalLink" size={14} />
        </button>
      </div>
    </div>
  );
};

export default HotelDetails;