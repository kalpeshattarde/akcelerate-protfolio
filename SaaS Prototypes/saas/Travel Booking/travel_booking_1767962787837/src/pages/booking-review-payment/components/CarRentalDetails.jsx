import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CarRentalDetails = ({ carData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const calculateDays = () => {
    const pickupDate = new Date(carData.pickupDate);
    const returnDate = new Date(carData.returnDate);
    const diffTime = Math.abs(returnDate - pickupDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <div className="space-y-6">
      {/* Car Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-body-medium text-text-primary">
            {carData.company} - {carData.model}
          </h3>
          <p className="text-sm text-text-secondary">
            {carData.category} • {carData.fuelPolicy} • {carData.mileage}
          </p>
        </div>
      </div>
      
      {/* Car Image */}
      <div className="w-full h-48 sm:h-64 rounded-lg overflow-hidden">
        <Image 
          src={carData.image} 
          alt={carData.model} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Rental Details */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-secondary-100 p-3">
          <h4 className="font-body-medium text-text-primary">
            Rental Details
          </h4>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-body-medium text-text-primary mb-1">
                  Pick-up
                </h5>
                <div className="flex items-start space-x-2">
                  <Icon name="MapPin" size={16} className="text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm text-text-primary">
                      {carData.pickupLocation}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {formatDate(carData.pickupDate)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-body-medium text-text-primary mb-1">
                  Return
                </h5>
                <div className="flex items-start space-x-2">
                  <Icon name="MapPin" size={16} className="text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm text-text-primary">
                      {carData.returnLocation}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {formatDate(carData.returnDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-body-medium text-text-primary mb-1">
                  Rental Duration
                </h5>
                <p className="text-sm text-text-primary">
                  {calculateDays()} day(s)
                </p>
              </div>
              
              <div>
                <h5 className="text-sm font-body-medium text-text-primary mb-1">
                  Insurance
                </h5>
                {carData.insurance.included ? (
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm text-text-primary">
                      Included in price
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Icon name="X" size={16} className="text-error" />
                    <span className="text-sm text-text-primary">
                      Not included (${carData.insurance.price.toFixed(2)}/day)
                    </span>
                  </div>
                )}
              </div>
              
              <div>
                <h5 className="text-sm font-body-medium text-text-primary mb-1">
                  Fuel Policy
                </h5>
                <p className="text-sm text-text-primary">
                  {carData.fuelPolicy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="bg-secondary-100 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-text-primary mt-0.5" />
          <div>
            <h5 className="font-body-medium text-text-primary mb-1">
              Important Information
            </h5>
            <p className="text-sm text-text-secondary">
              A valid driver's license and credit card in the driver's name are required at pick-up. The minimum age for rental is 25 years. Additional fees may apply for drivers under 25.
            </p>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-secondary-100 p-3">
          <h4 className="font-body-medium text-text-primary">
            Pick-up Location
          </h4>
        </div>
        
        <div className="p-4">
          <div className="w-full h-48 rounded overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Car Rental Location"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=33.9416,-118.4085&z=14&output=embed">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentalDetails;