import React, { useState, useEffect, useRef } from 'react';

import Icon from 'components/AppIcon';

import CustomerHeader from 'components/ui/CustomerHeader';
import BookingProgressIndicator from 'components/ui/BookingProgressIndicator';
import NotificationBanner from 'components/ui/NotificationBanner';
import BookingSummary from './components/BookingSummary';
import FlightDetails from './components/FlightDetails';
import HotelDetails from './components/HotelDetails';
import CarRentalDetails from './components/CarRentalDetails';
import TravelerInformation from './components/TravelerInformation';
import PaymentForm from './components/PaymentForm';
import FareRulesModal from './components/FareRulesModal';
import CancellationPolicyModal from './components/CancellationPolicyModal';

const BookingReviewPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFareRules, setShowFareRules] = useState(false);
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    travelers: [],
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    paymentDetails: {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
      saveCard: false
    },
    acceptTerms: false,
    carbonOffset: false
  });
  const [expandedSections, setExpandedSections] = useState({
    flight: true,
    hotel: true,
    car: true,
    travelers: true,
    payment: true
  });
  
  const formRef = useRef(null);
  
  // Mock booking data
  const bookingData = {
    id: "BK-12345678",
    totalPrice: 1247.89,
    currency: "USD",
    carbonOffsetPrice: 12.50,
    flight: {
      id: "FL-98765",
      type: "round-trip",
      outbound: {
        airline: "Delta Airlines",
        flightNumber: "DL1234",
        departureAirport: "JFK",
        departureCity: "New York",
        departureDate: "2023-08-15T08:30:00",
        arrivalAirport: "LAX",
        arrivalCity: "Los Angeles",
        arrivalDate: "2023-08-15T11:45:00",
        duration: "5h 15m",
        cabin: "Economy",
        stops: 0,
        aircraft: "Boeing 737-800",
        logo: "https://picsum.photos/id/237/200/200"
      },
      return: {
        airline: "Delta Airlines",
        flightNumber: "DL5678",
        departureAirport: "LAX",
        departureCity: "Los Angeles",
        departureDate: "2023-08-22T13:15:00",
        arrivalAirport: "JFK",
        arrivalCity: "New York",
        arrivalDate: "2023-08-22T21:30:00",
        duration: "5h 15m",
        cabin: "Economy",
        stops: 0,
        aircraft: "Boeing 737-800",
        logo: "https://picsum.photos/id/237/200/200"
      },
      price: 789.50,
      taxes: 67.43,
      fees: 23.99,
      seatsSelected: false,
      baggageIncluded: true,
      refundable: false,
      carbonFootprint: {
        score: "B",
        emissions: "1.2 tons CO2"
      }
    },
    hotel: {
      id: "HT-54321",
      name: "Grand Hyatt",
      address: "123 Main Street, Los Angeles, CA 90001",
      checkIn: "2023-08-15",
      checkOut: "2023-08-22",
      roomType: "Deluxe King",
      guests: 2,
      amenities: ["Free WiFi", "Breakfast included", "Swimming pool", "Fitness center"],
      price: 245.00,
      taxes: 36.75,
      fees: 15.00,
      refundable: true,
      cancellationDeadline: "2023-08-10",
      images: ["https://picsum.photos/id/238/800/600", "https://picsum.photos/id/239/800/600"]
    },
    car: {
      id: "CR-67890",
      company: "Hertz",
      model: "Toyota Camry",
      category: "Intermediate",
      pickupLocation: "Los Angeles International Airport",
      pickupDate: "2023-08-15T12:30:00",
      returnLocation: "Los Angeles International Airport",
      returnDate: "2023-08-22T10:00:00",
      price: 56.99,
      taxes: 8.55,
      fees: 4.68,
      insurance: {
        included: false,
        price: 15.99
      },
      fuelPolicy: "Full to Full",
      mileage: "Unlimited",
      image: "https://picsum.photos/id/240/800/600"
    }
  };

  // Auto-save form data
  useEffect(() => {
    const savedFormData = localStorage.getItem('bookingFormData');
    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData));
        setNotifications([
          {
            id: 'form-restored',
            type: 'info',
            message: 'Your previously entered information has been restored.',
            action: {
              label: 'Clear saved data',
              onClick: () => {
                localStorage.removeItem('bookingFormData');
                window.location.reload();
              }
            }
          }
        ]);
      } catch (e) {
        console.error('Error parsing saved form data', e);
      }
    }
  }, []);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem('bookingFormData', JSON.stringify(formData));
    }, 1000);
    
    return () => clearTimeout(saveTimeout);
  }, [formData]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTravelerInfoChange = (travelers) => {
    setFormData(prev => ({
      ...prev,
      travelers
    }));
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value
      }
    }));
  };

  const handlePaymentDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      paymentDetails: {
        ...prev.paymentDetails,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.acceptTerms) {
      setNotifications([
        {
          id: 'terms-error',
          type: 'error',
          message: 'You must accept the terms and conditions to proceed.',
        }
      ]);
      return;
    }
    
    // Simulate form submission
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to confirmation page
      window.location.href = '/user-dashboard-trip-management';
    }, 2000);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader />
      
      <div className="pt-16">
        <BookingProgressIndicator 
          currentStep={3} 
          completedSteps={[1, 2]} 
        />
        
        <NotificationBanner 
          notifications={notifications}
          onDismiss={dismissNotification}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Main Content */}
            <div className="flex-1">
              <h1 className="text-2xl font-heading-semibold text-text-primary mb-6">
                Review Your Booking
              </h1>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Flight Details Section */}
                <div className="card overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-secondary-100 cursor-pointer"
                    onClick={() => toggleSection('flight')}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Plane" size={20} className="text-primary" />
                      <h2 className="text-lg font-heading-semibold text-text-primary">
                        Flight Details
                      </h2>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-body-medium text-text-secondary">
                        ${bookingData.flight.price.toFixed(2)}
                      </span>
                      <Icon 
                        name={expandedSections.flight ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        className="text-text-secondary"
                      />
                    </div>
                  </div>
                  
                  {expandedSections.flight && (
                    <div className="p-4">
                      <FlightDetails 
                        flightData={bookingData.flight} 
                        onShowFareRules={() => setShowFareRules(true)}
                      />
                    </div>
                  )}
                </div>
                
                {/* Hotel Details Section */}
                {bookingData.hotel && (
                  <div className="card overflow-hidden">
                    <div 
                      className="flex items-center justify-between p-4 bg-secondary-100 cursor-pointer"
                      onClick={() => toggleSection('hotel')}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="Building2" size={20} className="text-primary" />
                        <h2 className="text-lg font-heading-semibold text-text-primary">
                          Hotel Details
                        </h2>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-body-medium text-text-secondary">
                          ${bookingData.hotel.price.toFixed(2)}
                        </span>
                        <Icon 
                          name={expandedSections.hotel ? "ChevronUp" : "ChevronDown"} 
                          size={20} 
                          className="text-text-secondary"
                        />
                      </div>
                    </div>
                    
                    {expandedSections.hotel && (
                      <div className="p-4">
                        <HotelDetails 
                          hotelData={bookingData.hotel} 
                          onShowCancellationPolicy={() => setShowCancellationPolicy(true)}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Car Rental Details Section */}
                {bookingData.car && (
                  <div className="card overflow-hidden">
                    <div 
                      className="flex items-center justify-between p-4 bg-secondary-100 cursor-pointer"
                      onClick={() => toggleSection('car')}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="Car" size={20} className="text-primary" />
                        <h2 className="text-lg font-heading-semibold text-text-primary">
                          Car Rental Details
                        </h2>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-body-medium text-text-secondary">
                          ${bookingData.car.price.toFixed(2)}
                        </span>
                        <Icon 
                          name={expandedSections.car ? "ChevronUp" : "ChevronDown"} 
                          size={20} 
                          className="text-text-secondary"
                        />
                      </div>
                    </div>
                    
                    {expandedSections.car && (
                      <div className="p-4">
                        <CarRentalDetails carData={bookingData.car} />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Traveler Information Section */}
                <div className="card overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-secondary-100 cursor-pointer"
                    onClick={() => toggleSection('travelers')}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Users" size={20} className="text-primary" />
                      <h2 className="text-lg font-heading-semibold text-text-primary">
                        Traveler Information
                      </h2>
                    </div>
                    <Icon 
                      name={expandedSections.travelers ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-text-secondary"
                    />
                  </div>
                  
                  {expandedSections.travelers && (
                    <div className="p-4">
                      <TravelerInformation 
                        travelers={formData.travelers}
                        onTravelerInfoChange={handleTravelerInfoChange}
                        emergencyContact={formData.emergencyContact}
                        onEmergencyContactChange={handleEmergencyContactChange}
                      />
                    </div>
                  )}
                </div>
                
                {/* Payment Section */}
                <div className="card overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-secondary-100 cursor-pointer"
                    onClick={() => toggleSection('payment')}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="CreditCard" size={20} className="text-primary" />
                      <h2 className="text-lg font-heading-semibold text-text-primary">
                        Payment Details
                      </h2>
                    </div>
                    <Icon 
                      name={expandedSections.payment ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-text-secondary"
                    />
                  </div>
                  
                  {expandedSections.payment && (
                    <div className="p-4">
                      <PaymentForm 
                        paymentDetails={formData.paymentDetails}
                        onPaymentDetailsChange={handlePaymentDetailsChange}
                      />
                    </div>
                  )}
                </div>
                
                {/* Carbon Offset Option */}
                <div className="card p-4">
                  <div className="flex items-start space-x-3">
                    <div className="pt-0.5">
                      <input
                        type="checkbox"
                        id="carbonOffset"
                        name="carbonOffset"
                        checked={formData.carbonOffset}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 rounded border-secondary-300 text-primary focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="carbonOffset" className="font-body-medium text-text-primary">
                        Add carbon offset to your trip (+${bookingData.carbonOffsetPrice.toFixed(2)})
                      </label>
                      <p className="text-sm text-text-secondary mt-1">
                        Offset your travel emissions by supporting verified climate projects. Your contribution helps fund renewable energy and forest conservation initiatives.
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-success-100 flex items-center justify-center">
                          <Icon name="Leaf" size={14} className="text-success" />
                        </div>
                        <span className="text-sm text-success">
                          Reduce your trip's carbon footprint by {bookingData.flight.carbonFootprint.emissions}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Terms and Conditions */}
                <div className="card p-4">
                  <div className="flex items-start space-x-3">
                    <div className="pt-0.5">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 rounded border-secondary-300 text-primary focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="acceptTerms" className="font-body-medium text-text-primary">
                        I accept the terms and conditions
                      </label>
                      <p className="text-sm text-text-secondary mt-1">
                        By checking this box, you confirm that you have read and agree to our <button type="button" className="text-primary hover:underline">Terms of Service</button>, <button type="button" className="text-primary hover:underline">Privacy Policy</button>, and acknowledge the <button type="button" onClick={() => setShowFareRules(true)} className="text-primary hover:underline">Fare Rules</button> and <button type="button" onClick={() => setShowCancellationPolicy(true)} className="text-primary hover:underline">Cancellation Policy</button>.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Price Summary (visible on small screens) */}
                <div className="lg:hidden sticky bottom-0 left-0 right-0 bg-surface border-t border-border p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-heading-semibold text-text-primary">
                      Total Price
                    </span>
                    <span className="text-xl font-heading-bold text-primary">
                      ${(bookingData.totalPrice + (formData.carbonOffset ? bookingData.carbonOffsetPrice : 0)).toFixed(2)}
                    </span>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-primary text-white font-body-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 ease-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Booking
                        <Icon name="ArrowRight" size={20} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Sidebar - Price Summary (visible on large screens) */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <BookingSummary 
                  bookingData={bookingData} 
                  carbonOffset={formData.carbonOffset}
                  isLoading={isLoading}
                  onSubmit={() => formRef.current.requestSubmit()}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Modals */}
      <FareRulesModal 
        isOpen={showFareRules} 
        onClose={() => setShowFareRules(false)} 
        flightData={bookingData.flight}
      />
      
      <CancellationPolicyModal 
        isOpen={showCancellationPolicy} 
        onClose={() => setShowCancellationPolicy(false)} 
        bookingData={bookingData}
      />
    </div>
  );
};

export default BookingReviewPayment;