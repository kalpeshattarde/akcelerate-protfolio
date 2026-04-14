'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fitnessGoal: string;
  experience: string;
  preferredTime: string;
  message: string;
  consultationType: string;
}

interface ContactFormProps {
  id?: string;
}

const ContactForm = ({ id = "contact-form" }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    fitnessGoal: '',
    experience: '',
    preferredTime: '',
    message: '',
    consultationType: 'in-person'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fitnessGoals = [
    'Weight Loss & Fat Burning',
    'Muscle Building & Strength',
    'Athletic Performance',
    'Endurance & Cardio',
    'Flexibility & Mobility',
    'Injury Recovery',
    'General Fitness'
  ];

  const experienceLevels = [
    'Beginner (0-6 months)',
    'Intermediate (6 months - 2 years)',
    'Advanced (2+ years)',
    'Elite Athlete'
  ];

  const timeSlots = [
    'Early Morning (5:00 AM - 8:00 AM)',
    'Morning (8:00 AM - 12:00 PM)',
    'Afternoon (12:00 PM - 5:00 PM)',
    'Evening (5:00 PM - 8:00 PM)',
    'Late Evening (8:00 PM - 10:00 PM)'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        fitnessGoal: '',
        experience: '',
        preferredTime: '',
        message: '',
        consultationType: 'in-person'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircleIcon" size={32} className="text-success" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Consultation Booked!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for your interest in FitCore Elite. Our team will contact you within 2 hours to confirm your consultation details.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
        >
          Book Another Consultation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">Book Your Free Consultation</h3>
        <p className="text-muted-foreground">
          Get personalized guidance from our elite trainers. No commitment required.
        </p>
      </div>

      <form id={id} onSubmit={handleSubmit} className="space-y-6">
        {/* Consultation Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Consultation Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="relative">
              <input
                type="radio"
                name="consultationType"
                value="in-person"
                checked={formData.consultationType === 'in-person'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                formData.consultationType === 'in-person' ?'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
              }`}>
                <div className="flex items-center space-x-3">
                  <Icon name="BuildingOfficeIcon" size={20} />
                  <div>
                    <div className="font-medium">In-Person</div>
                    <div className="text-sm opacity-70">At our facility</div>
                  </div>
                </div>
              </div>
            </label>
            
            <label className="relative">
              <input
                type="radio"
                name="consultationType"
                value="virtual"
                checked={formData.consultationType === 'virtual'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                formData.consultationType === 'virtual' ?'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
              }`}>
                <div className="flex items-center space-x-3">
                  <Icon name="VideoCameraIcon" size={20} />
                  <div>
                    <div className="font-medium">Virtual</div>
                    <div className="text-sm opacity-70">Video call</div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              placeholder="Enter your first name"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        {/* Fitness Goal */}
        <div>
          <label htmlFor="fitnessGoal" className="block text-sm font-medium text-foreground mb-2">
            Primary Fitness Goal *
          </label>
          <select
            id="fitnessGoal"
            name="fitnessGoal"
            value={formData.fitnessGoal}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          >
            <option value="">Select your primary goal</option>
            {fitnessGoals.map((goal) => (
              <option key={goal} value={goal}>{goal}</option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-2">
            Experience Level *
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          >
            <option value="">Select your experience level</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Preferred Time */}
        <div>
          <label htmlFor="preferredTime" className="block text-sm font-medium text-foreground mb-2">
            Preferred Time Slot
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          >
            <option value="">Select preferred time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
            placeholder="Tell us about any specific needs, injuries, or questions you have..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              <span>Booking Consultation...</span>
            </>
          ) : (
            <>
              <Icon name="CalendarDaysIcon" size={20} />
              <span>Book Free Consultation</span>
            </>
          )}
        </button>

        {submitStatus === 'error' && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
            There was an error booking your consultation. Please try again or call us directly.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;