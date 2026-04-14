import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';

const TravelerInformation = ({ 
  travelers, 
  onTravelerInfoChange, 
  emergencyContact,
  onEmergencyContactChange
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [currentTravelerIndex, setCurrentTravelerIndex] = useState(0);
  const videoRef = useRef(null);
  
  // Initialize travelers if empty
  const initializeTravelers = () => {
    if (travelers.length === 0) {
      return [
        {
          id: 1,
          type: 'adult',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          gender: '',
          nationality: '',
          passportNumber: '',
          passportExpiry: '',
          specialRequests: ''
        }
      ];
    }
    return travelers;
  };
  
  const currentTravelers = initializeTravelers();
  
  const handleAddTraveler = () => {
    const newTraveler = {
      id: currentTravelers.length + 1,
      type: 'adult',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      passportNumber: '',
      passportExpiry: '',
      specialRequests: ''
    };
    
    onTravelerInfoChange([...currentTravelers, newTraveler]);
  };
  
  const handleRemoveTraveler = (id) => {
    if (currentTravelers.length > 1) {
      onTravelerInfoChange(currentTravelers.filter(traveler => traveler.id !== id));
    }
  };
  
  const handleTravelerChange = (id, field, value) => {
    const updatedTravelers = currentTravelers.map(traveler => {
      if (traveler.id === id) {
        return { ...traveler, [field]: value };
      }
      return traveler;
    });
    
    onTravelerInfoChange(updatedTravelers);
  };
  
  const startPassportScan = (index) => {
    setCurrentTravelerIndex(index);
    setIsScanning(true);
    
    // Simulate WebAssembly passport scanning
    // In a real implementation, this would initialize the camera and OCR processing
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error accessing camera:", err);
          setIsScanning(false);
        });
    }
  };
  
  const capturePassportData = () => {
    // Simulate OCR processing with mock data
    setTimeout(() => {
      const mockPassportData = {
        firstName: 'JOHN',
        lastName: 'DOE',
        dateOfBirth: '1985-06-15',
        gender: 'male',
        nationality: 'United States',
        passportNumber: 'AB1234567',
        passportExpiry: '2028-05-20'
      };
      
      const updatedTravelers = currentTravelers.map((traveler, index) => {
        if (index === currentTravelerIndex) {
          return { ...traveler, ...mockPassportData };
        }
        return traveler;
      });
      
      onTravelerInfoChange(updatedTravelers);
      stopPassportScan();
    }, 2000);
  };
  
  const stopPassportScan = () => {
    setIsScanning(false);
    
    // Stop camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Travelers */}
      {currentTravelers.map((traveler, index) => (
        <div key={traveler.id} className="border border-border rounded-lg overflow-hidden">
          <div className="bg-secondary-100 p-3 flex items-center justify-between">
            <h4 className="font-body-medium text-text-primary">
              Traveler {index + 1} ({traveler.type.charAt(0).toUpperCase() + traveler.type.slice(1)})
            </h4>
            {currentTravelers.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveTraveler(traveler.id)}
                className="text-text-secondary hover:text-error transition-colors duration-200 ease-out"
              >
                <Icon name="Trash2" size={16} />
              </button>
            )}
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Information */}
              <div>
                <h5 className="text-sm font-body-medium text-text-primary mb-3">
                  Personal Information
                </h5>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`firstName-${traveler.id}`} className="block text-sm text-text-secondary mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        id={`firstName-${traveler.id}`}
                        value={traveler.firstName}
                        onChange={(e) => handleTravelerChange(traveler.id, 'firstName', e.target.value)}
                        className="input-field w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`lastName-${traveler.id}`} className="block text-sm text-text-secondary mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id={`lastName-${traveler.id}`}
                        value={traveler.lastName}
                        onChange={(e) => handleTravelerChange(traveler.id, 'lastName', e.target.value)}
                        className="input-field w-full"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor={`dateOfBirth-${traveler.id}`} className="block text-sm text-text-secondary mb-1">
                      Date of Birth*
                    </label>
                    <input
                      type="date"
                      id={`dateOfBirth-${traveler.id}`}
                      value={traveler.dateOfBirth}
                      onChange={(e) => handleTravelerChange(traveler.id, 'dateOfBirth', e.target.value)}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`gender-${traveler.id}`} className="block text-sm text-text-secondary mb-1">
                      Gender*
                    </label>
                    <select
                      id={`gender-${traveler.id}`}
                      value={traveler.gender}
                      onChange={(e) => handleTravelerChange(traveler.id, 'gender', e.target.value)}
                      className="input-field w-full"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor={`nationality-${traveler.id}`} className="block text-sm text-text-secondary mb-1">
                      Nationality*
                    </label>
                    <select
                      id={`nationality-${traveler.id}`}
                      value={traveler.nationality}
                      onChange={(e) => handleTravelerChange(traveler.id, 'nationality', e.target.value)}
                      className="input-field w-full"
                      required
                    >
                      <option value="">Select nationality</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Travel Document Information */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-sm font-body-medium text-text-primary">
                    Travel Document
                  </h5>
                  
                  <button
                    type="button"
                    onClick={() => startPassportScan(index)}
                    className="text-sm text-primary hover:underline flex items-center space-x-1"
                  >
                    <Icon name="Camera" size={14} />
                    <span>Scan Passport</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label htmlFor={`passportNumber-${traveler.id}`} className="block text-sm text-text-secondary mb-1">
                      Passport Number*
                    </label>
                    <input
                      type="text"
                      id={`passportNumber-${traveler.id}`}
                      value={traveler.passportNumber}
                      onChange={(e) => handleTravelerChange(traveler.id, 'passportNumber', e.target.value)}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`passportExpiry-${traveler.id}`} className="block text-sm text-text-secondary mb-1">
                      Passport Expiry Date*
                    </label>
                    <input
                      type="date"
                      id={`passportExpiry-${traveler.id}`}
                      value={traveler.passportExpiry}
                      onChange={(e) => handleTravelerChange(traveler.id, 'passportExpiry', e.target.value)}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`specialRequests-${traveler.id}`} className="block text-sm text-text-secondary mb-1">
                      Special Requests (optional)
                    </label>
                    <textarea
                      id={`specialRequests-${traveler.id}`}
                      value={traveler.specialRequests}
                      onChange={(e) => handleTravelerChange(traveler.id, 'specialRequests', e.target.value)}
                      className="input-field w-full h-24 resize-none"
                      placeholder="Dietary requirements, accessibility needs, etc."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Add Traveler Button */}
      <button
        type="button"
        onClick={handleAddTraveler}
        className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-colors duration-200 ease-out"
      >
        <Icon name="Plus" size={16} />
        <span>Add Another Traveler</span>
      </button>
      
      {/* Emergency Contact */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-secondary-100 p-3">
          <h4 className="font-body-medium text-text-primary">
            Emergency Contact
          </h4>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="emergencyName" className="block text-sm text-text-secondary mb-1">
                Full Name*
              </label>
              <input
                type="text"
                id="emergencyName"
                name="name"
                value={emergencyContact.name}
                onChange={onEmergencyContactChange}
                className="input-field w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="emergencyRelationship" className="block text-sm text-text-secondary mb-1">
                Relationship*
              </label>
              <select
                id="emergencyRelationship"
                name="relationship"
                value={emergencyContact.relationship}
                onChange={onEmergencyContactChange}
                className="input-field w-full"
                required
              >
                <option value="">Select relationship</option>
                <option value="spouse">Spouse</option>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
                <option value="sibling">Sibling</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="emergencyPhone" className="block text-sm text-text-secondary mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                id="emergencyPhone"
                name="phone"
                value={emergencyContact.phone}
                onChange={onEmergencyContactChange}
                className="input-field w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="emergencyEmail" className="block text-sm text-text-secondary mb-1">
                Email
              </label>
              <input
                type="email"
                id="emergencyEmail"
                name="email"
                value={emergencyContact.email}
                onChange={onEmergencyContactChange}
                className="input-field w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Passport Scanning Modal */}
      {isScanning && (
        <div className="fixed inset-0 bg-text-primary bg-opacity-50 flex items-center justify-center z-modal">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-body-medium text-text-primary">
                Scan Passport
              </h3>
              <button
                type="button"
                onClick={stopPassportScan}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200 ease-out"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="bg-secondary-100 rounded-lg p-2 mb-4">
              <div className="aspect-w-4 aspect-h-3 bg-black rounded overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <p className="text-sm text-text-secondary mb-4">
              Position your passport within the frame. Make sure the entire document is visible and well-lit.
            </p>
            
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={capturePassportData}
                className="flex-1 py-2 px-4 bg-primary text-white font-body-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 ease-out"
              >
                Capture
              </button>
              <button
                type="button"
                onClick={stopPassportScan}
                className="py-2 px-4 bg-secondary-100 text-text-secondary font-body-medium rounded-lg hover:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 ease-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelerInformation;