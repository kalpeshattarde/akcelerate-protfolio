import React from 'react';
import Icon from '@/components/ui/AppIcon';

const LocationMap = () => {
  const facilityFeatures = [
    { icon: 'BuildingOfficeIcon', feature: 'State-of-the-art equipment' },
    { icon: 'UserGroupIcon', feature: 'Elite personal trainers' },
    { icon: 'SparklesIcon', feature: 'Recovery & wellness center' },
    { icon: 'TrophyIcon', feature: 'Competition training area' }
  ];

  const parkingInfo = [
    { type: 'Valet Parking', availability: 'Available', cost: 'Complimentary for members' },
    { type: 'Self Parking', availability: '200+ spaces', cost: 'Free for 3 hours' },
    { type: 'EV Charging', availability: '12 stations', cost: 'Free for members' },
    { type: 'Bike Storage', availability: 'Secure area', cost: 'Complimentary' }
  ];

  return (
    <div className="space-y-8">
      {/* Interactive Map */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-2xl font-bold text-foreground mb-2">Visit Our Elite Facility</h3>
          <p className="text-muted-foreground">
            Located in the heart of Los Angeles, our premium fitness facility offers world-class amenities and equipment.
          </p>
        </div>
        
        <div className="relative h-96 bg-muted">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="FitCore Elite Facility Location"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=34.0522,-118.2437&z=15&output=embed"
            className="border-0"
          />
          
          {/* Map Overlay Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <button className="w-10 h-10 bg-background/90 backdrop-blur-sm border border-border rounded-lg flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
              <Icon name="MagnifyingGlassPlusIcon" size={20} className="text-foreground" />
            </button>
            <button className="w-10 h-10 bg-background/90 backdrop-blur-sm border border-border rounded-lg flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
              <Icon name="ArrowsPointingOutIcon" size={20} className="text-foreground" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="font-semibold text-foreground mb-1">2847 Elite Performance Blvd</h4>
              <p className="text-muted-foreground">Los Angeles, CA 90210</p>
            </div>
            <div className="flex space-x-3">
              <a
                href="https://maps.google.com/?q=2847+Elite+Performance+Blvd+Los+Angeles+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors duration-300 flex items-center space-x-2"
              >
                <Icon name="MapIcon" size={16} />
                <span>Get Directions</span>
              </a>
              <button className="px-4 py-2 border border-border rounded-lg font-medium text-sm text-foreground hover:bg-muted/50 hover:border-primary/50 transition-all duration-300 flex items-center space-x-2">
                <Icon name="ShareIcon" size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Features */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">What Makes Us Elite</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilityFeatures.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={item.icon as any} size={24} className="text-primary" />
              </div>
              <span className="font-medium text-foreground">{item.feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transportation & Parking */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">Parking & Transportation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {parkingInfo.map((parking, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">{parking.type}</h4>
                <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">
                  {parking.availability}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{parking.cost}</p>
            </div>
          ))}
        </div>

        {/* Public Transportation */}
        <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TruckIcon" size={20} className="text-accent" />
            <h4 className="font-semibold text-foreground">Public Transportation</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Conveniently located near multiple transit options:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Metro Red Line - Hollywood/Highland Station (0.3 miles)</li>
            <li>• Bus Routes: 212, 217, 780 (Stop directly outside)</li>
            <li>• Bike Share Station - Elite Performance Plaza</li>
          </ul>
        </div>
      </div>

      {/* Nearby Amenities */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">Nearby Amenities</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="BuildingStorefrontIcon" size={20} className="text-primary" />
              <span>Dining</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Protein Bar & Kitchen (0.1 mi)</li>
              <li>• Whole Foods Market (0.2 mi)</li>
              <li>• Juice Generation (0.1 mi)</li>
              <li>• Sweetgreen (0.3 mi)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="HeartIcon" size={20} className="text-primary" />
              <span>Wellness</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Elite Spa & Recovery (On-site)</li>
              <li>• Massage Therapy Center (0.1 mi)</li>
              <li>• Cryotherapy Studio (0.2 mi)</li>
              <li>• Yoga Collective (0.3 mi)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="ShoppingBagIcon" size={20} className="text-primary" />
              <span>Shopping</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Athletic Gear Store (0.1 mi)</li>
              <li>• Supplement Shop (0.2 mi)</li>
              <li>• Beverly Center (0.5 mi)</li>
              <li>• Melrose Avenue (0.7 mi)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;