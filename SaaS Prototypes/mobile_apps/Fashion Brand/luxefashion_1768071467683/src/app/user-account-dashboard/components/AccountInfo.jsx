'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const AccountInfo = ({ accountData }) => {
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (section) => {
    setEditingSection(section);
    setFormData(accountData?.[section] || {});
  };

  const handleCancel = () => {
    setEditingSection(null);
    setFormData({});
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving data:', formData);
    setEditingSection(null);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderEditableField = (label, field, value, type = 'text') => {
    const isEditing = editingSection === 'profile';
    
    return (
      <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {isEditing ? (
          <input
            type={type}
            value={formData?.[field] || value}
            onChange={(e) => handleInputChange(field, e?.target?.value)}
            className="px-3 py-1 border border-border bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ) : (
          <span className="text-foreground">{value}</span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card p-6">
      <h2 className="text-xl font-heading font-bold text-card-foreground mb-6">Account Information</h2>
      <div className="space-y-6">
        {/* Profile Information */}
        <div className="bg-background border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">Profile Details</h3>
            {editingSection === 'profile' ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="text-success hover:text-success/80 text-sm font-medium transition-colors btn-press"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors btn-press"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEdit('profile')}
                className="text-accent hover:text-accent/80 text-sm font-medium transition-colors btn-press"
              >
                Edit
              </button>
            )}
          </div>
          
          <div className="space-y-1">
            {renderEditableField('First Name', 'firstName', accountData?.profile?.firstName)}
            {renderEditableField('Last Name', 'lastName', accountData?.profile?.lastName)}
            {renderEditableField('Email', 'email', accountData?.profile?.email, 'email')}
            {renderEditableField('Phone', 'phone', accountData?.profile?.phone, 'tel')}
            {renderEditableField('Date of Birth', 'dateOfBirth', accountData?.profile?.dateOfBirth, 'date')}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-background border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">Default Shipping Address</h3>
            <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors btn-press">
              Edit
            </button>
          </div>
          
          <div className="text-sm text-foreground space-y-1">
            <p>{accountData?.shippingAddress?.street}</p>
            <p>{accountData?.shippingAddress?.city}, {accountData?.shippingAddress?.state} {accountData?.shippingAddress?.zipCode}</p>
            <p>{accountData?.shippingAddress?.country}</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-background border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">Payment Methods</h3>
            <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors btn-press">
              Manage
            </button>
          </div>
          
          <div className="space-y-3">
            {accountData?.paymentMethods?.map((method) => (
              <div key={method?.id} className="flex items-center justify-between p-3 bg-muted">
                <div className="flex items-center gap-3">
                  <Icon name="CreditCardIcon" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">**** **** **** {method?.lastFour}</p>
                    <p className="text-xs text-muted-foreground">{method?.brand} • Expires {method?.expiry}</p>
                  </div>
                </div>
                {method?.isDefault && (
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 font-medium uppercase tracking-wide">
                    Default
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-background border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">Preferences</h3>
            <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors btn-press">
              Edit
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Email Notifications</span>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={accountData?.preferences?.emailNotifications}
                  onChange={() => {}}
                  className="w-4 h-4 text-accent bg-input border-border focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">SMS Notifications</span>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={accountData?.preferences?.smsNotifications}
                  onChange={() => {}}
                  className="w-4 h-4 text-accent bg-input border-border focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Marketing Communications</span>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={accountData?.preferences?.marketingEmails}
                  onChange={() => {}}
                  className="w-4 h-4 text-accent bg-input border-border focus:ring-ring"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AccountInfo.propTypes = {
  accountData: PropTypes?.shape({
    profile: PropTypes?.shape({
      firstName: PropTypes?.string?.isRequired,
      lastName: PropTypes?.string?.isRequired,
      email: PropTypes?.string?.isRequired,
      phone: PropTypes?.string?.isRequired,
      dateOfBirth: PropTypes?.string?.isRequired
    })?.isRequired,
    shippingAddress: PropTypes?.shape({
      street: PropTypes?.string?.isRequired,
      city: PropTypes?.string?.isRequired,
      state: PropTypes?.string?.isRequired,
      zipCode: PropTypes?.string?.isRequired,
      country: PropTypes?.string?.isRequired
    })?.isRequired,
    paymentMethods: PropTypes?.arrayOf(
      PropTypes?.shape({
        id: PropTypes?.string?.isRequired,
        lastFour: PropTypes?.string?.isRequired,
        brand: PropTypes?.string?.isRequired,
        expiry: PropTypes?.string?.isRequired,
        isDefault: PropTypes?.bool?.isRequired
      })
    )?.isRequired,
    preferences: PropTypes?.shape({
      emailNotifications: PropTypes?.bool?.isRequired,
      smsNotifications: PropTypes?.bool?.isRequired,
      marketingEmails: PropTypes?.bool?.isRequired
    })?.isRequired
  })?.isRequired
};

export default AccountInfo;