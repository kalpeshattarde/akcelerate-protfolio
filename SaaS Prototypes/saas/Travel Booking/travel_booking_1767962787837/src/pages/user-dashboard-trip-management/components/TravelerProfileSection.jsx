// src/pages/user-dashboard-trip-management/components/TravelerProfileSection.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const TravelerProfileSection = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState({});
  const [profileData, setProfileData] = useState(null);
  const [tempData, setTempData] = useState({});

  // Mock profile data
  useEffect(() => {
    const mockProfile = {
      personal: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1985-06-15',
        nationality: 'United States',
        address: {
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States'
        }
      },
      passport: {
        number: 'US123456789',
        issuingCountry: 'United States',
        issueDate: '2019-08-15',
        expiryDate: '2029-08-15',
        birthPlace: 'New York, NY'
      },
      emergencyContacts: [
        {
          id: 1,
          name: 'Jane Doe',
          relationship: 'Spouse',
          phone: '+1 (555) 987-6543',
          email: 'jane.doe@example.com'
        },
        {
          id: 2,
          name: 'Robert Doe',
          relationship: 'Father',
          phone: '+1 (555) 555-1234',
          email: 'robert.doe@example.com'
        }
      ],
      preferences: {
        seatPreference: 'aisle',
        mealPreference: 'regular',
        specialAssistance: [],
        notifications: {
          email: true,
          sms: false,
          push: true,
          flightUpdates: true,
          promotions: false,
          reminders: true
        },
        privacy: {
          shareProfile: false,
          dataCollection: true,
          marketingEmails: false
        }
      }
    };
    
    setProfileData(mockProfile);
  }, []);

  const handleEdit = (section, field = null) => {
    const key = field ? `${section}.${field}` : section;
    setIsEditing(prev => ({ ...prev, [key]: true }));
    
    // Initialize temp data with current values
    if (field) {
      setTempData(prev => ({ 
        ...prev, 
        [key]: profileData[section][field] 
      }));
    } else {
      setTempData(prev => ({ 
        ...prev, 
        [key]: { ...profileData[section] }
      }));
    }
  };

  const handleSave = (section, field = null) => {
    const key = field ? `${section}.${field}` : section;
    
    setProfileData(prev => {
      const newData = { ...prev };
      if (field) {
        newData[section][field] = tempData[key];
      } else {
        newData[section] = { ...tempData[key] };
      }
      return newData;
    });
    
    setIsEditing(prev => ({ ...prev, [key]: false }));
    setTempData(prev => ({ ...prev, [key]: undefined }));
  };

  const handleCancel = (section, field = null) => {
    const key = field ? `${section}.${field}` : section;
    setIsEditing(prev => ({ ...prev, [key]: false }));
    setTempData(prev => ({ ...prev, [key]: undefined }));
  };

  const handleInputChange = (section, field, value) => {
    const key = field ? `${section}.${field}` : section;
    setTempData(prev => ({ ...prev, [key]: value }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isPassportExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const sixMonthsFromNow = new Date(now.getTime() + (6 * 30 * 24 * 60 * 60 * 1000));
    return expiry < sixMonthsFromNow;
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'passport', label: 'Passport', icon: 'CreditCard' },
    { id: 'emergency', label: 'Emergency Contacts', icon: 'Phone' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' }
  ];

  if (!profileData) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
          <div className="h-8 bg-secondary-200 rounded w-1/2"></div>
          <div className="h-64 bg-secondary-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-heading-semibold text-text-primary mb-4">Traveler Profile</h2>
        
        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-body-medium transition-all duration-200 ease-out ${
                activeSection === section.id
                  ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
              }`}
            >
              <Icon name={section.icon} size={16} />
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Personal Information */}
        {activeSection === 'personal' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">First Name</label>
                {isEditing['personal.firstName'] ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={tempData['personal.firstName'] || ''}
                      onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      onClick={() => handleSave('personal', 'firstName')}
                      className="px-3 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700"
                    >
                      <Icon name="Check" size={16} />
                    </button>
                    <button
                      onClick={() => handleCancel('personal', 'firstName')}
                      className="px-3 py-2 bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <span>{profileData.personal.firstName}</span>
                    <button
                      onClick={() => handleEdit('personal', 'firstName')}
                      className="text-primary hover:text-primary-700"
                    >
                      <Icon name="Edit2" size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">Last Name</label>
                {isEditing['personal.lastName'] ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={tempData['personal.lastName'] || ''}
                      onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      onClick={() => handleSave('personal', 'lastName')}
                      className="px-3 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700"
                    >
                      <Icon name="Check" size={16} />
                    </button>
                    <button
                      onClick={() => handleCancel('personal', 'lastName')}
                      className="px-3 py-2 bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <span>{profileData.personal.lastName}</span>
                    <button
                      onClick={() => handleEdit('personal', 'lastName')}
                      className="text-primary hover:text-primary-700"
                    >
                      <Icon name="Edit2" size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">Email</label>
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span>{profileData.personal.email}</span>
                  <span className="text-xs text-success-600 bg-success-100 px-2 py-1 rounded-full">Verified</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">Phone</label>
                {isEditing['personal.phone'] ? (
                  <div className="flex space-x-2">
                    <input
                      type="tel"
                      value={tempData['personal.phone'] || ''}
                      onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      onClick={() => handleSave('personal', 'phone')}
                      className="px-3 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700"
                    >
                      <Icon name="Check" size={16} />
                    </button>
                    <button
                      onClick={() => handleCancel('personal', 'phone')}
                      className="px-3 py-2 bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <span>{profileData.personal.phone}</span>
                    <button
                      onClick={() => handleEdit('personal', 'phone')}
                      className="text-primary hover:text-primary-700"
                    >
                      <Icon name="Edit2" size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Passport Information */}
        {activeSection === 'passport' && (
          <div className="space-y-6">
            {isPassportExpiringSoon(profileData.passport.expiryDate) && (
              <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={20} className="text-warning-600" />
                  <div>
                    <h3 className="text-sm font-body-medium text-warning-700">Passport Expiring Soon</h3>
                    <p className="text-xs text-warning-600">
                      Your passport expires on {formatDate(profileData.passport.expiryDate)}. Consider renewing it soon.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">Passport Number</label>
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span className="font-data-medium">{profileData.passport.number}</span>
                  <button className="text-primary hover:text-primary-700">
                    <Icon name="Edit2" size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">Issuing Country</label>
                <div className="p-3 bg-secondary-50 rounded-lg">
                  <span>{profileData.passport.issuingCountry}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">Issue Date</label>
                <div className="p-3 bg-secondary-50 rounded-lg">
                  <span>{formatDate(profileData.passport.issueDate)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">Expiry Date</label>
                <div className={`p-3 rounded-lg ${
                  isPassportExpiringSoon(profileData.passport.expiryDate) 
                    ? 'bg-warning-50 text-warning-700' :'bg-secondary-50'
                }`}>
                  <span>{formatDate(profileData.passport.expiryDate)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        {activeSection === 'emergency' && (
          <div className="space-y-4">
            {profileData.emergencyContacts.map((contact, index) => (
              <div key={contact.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-heading-medium text-text-primary">{contact.name}</h3>
                  <div className="flex space-x-2">
                    <button className="text-primary hover:text-primary-700">
                      <Icon name="Edit2" size={16} />
                    </button>
                    <button className="text-error-600 hover:text-error-700">
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Relationship:</span>
                    <p className="font-body-medium">{contact.relationship}</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Phone:</span>
                    <p className="font-body-medium">{contact.phone}</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Email:</span>
                    <p className="font-body-medium">{contact.email}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-secondary-300 text-text-secondary rounded-lg hover:border-primary hover:text-primary transition-colors duration-200 ease-out">
              <Icon name="Plus" size={20} />
              <span>Add Emergency Contact</span>
            </button>
          </div>
        )}

        {/* Preferences */}
        {activeSection === 'preferences' && (
          <div className="space-y-6">
            {/* Travel Preferences */}
            <div>
              <h3 className="text-lg font-heading-medium text-text-primary mb-4">Travel Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-2">Seat Preference</label>
                  <select 
                    value={profileData.preferences.seatPreference}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="window">Window</option>
                    <option value="aisle">Aisle</option>
                    <option value="middle">Middle</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-2">Meal Preference</label>
                  <select 
                    value={profileData.preferences.mealPreference}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="regular">Regular</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="kosher">Kosher</option>
                    <option value="halal">Halal</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div>
              <h3 className="text-lg font-heading-medium text-text-primary mb-4">Notifications</h3>
              <div className="space-y-3">
                {Object.entries(profileData.preferences.notifications).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between">
                    <span className="text-sm text-text-primary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <input
                      type="checkbox"
                      checked={value}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelerProfileSection;