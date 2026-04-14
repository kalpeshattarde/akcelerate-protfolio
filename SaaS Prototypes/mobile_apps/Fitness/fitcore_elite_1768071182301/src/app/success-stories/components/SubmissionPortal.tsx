'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SubmissionPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubmissionData) => void;
}

interface SubmissionData {
  name: string;
  email: string;
  phone: string;
  transformationType: string;
  timeline: string;
  story: string;
  achievements: string;
  beforePhoto: File | null;
  afterPhoto: File | null;
  consent: boolean;
}

const SubmissionPortal = ({ isOpen, onClose, onSubmit }: SubmissionPortalProps) => {
  const [formData, setFormData] = useState<SubmissionData>({
    name: '',
    email: '',
    phone: '',
    transformationType: '',
    timeline: '',
    story: '',
    achievements: '',
    beforePhoto: null,
    afterPhoto: null,
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const transformationTypes = [
    'Weight Loss',
    'Muscle Gain',
    'Strength Building',
    'Endurance',
    'Athletic Performance',
    'Rehabilitation',
    'Overall Fitness'
  ];

  const timelines = [
    '1-3 months',
    '3-6 months',
    '6-12 months',
    '1-2 years',
    '2+ years'
  ];

  const handleInputChange = (field: keyof SubmissionData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: 'beforePhoto' | 'afterPhoto', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit(formData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      transformationType: '',
      timeline: '',
      story: '',
      achievements: '',
      beforePhoto: null,
      afterPhoto: null,
      consent: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            Share Your Success Story
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Transformation Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Transformation Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Transformation Type *
                </label>
                <select
                  required
                  value={formData.transformationType}
                  onChange={(e) => handleInputChange('transformationType', e.target.value)}
                  className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                >
                  <option value="">Select transformation type</option>
                  {transformationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Timeline *
                </label>
                <select
                  required
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                >
                  <option value="">Select timeline</option>
                  {timelines.map((timeline) => (
                    <option key={timeline} value={timeline}>
                      {timeline}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Story & Achievements */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Your Story *
              </label>
              <textarea
                required
                rows={4}
                value={formData.story}
                onChange={(e) => handleInputChange('story', e.target.value)}
                className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-none"
                placeholder="Tell us about your fitness journey, challenges overcome, and what motivated you..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Key Achievements
              </label>
              <textarea
                rows={3}
                value={formData.achievements}
                onChange={(e) => handleInputChange('achievements', e.target.value)}
                className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-none"
                placeholder="List your key achievements, metrics, and milestones..."
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Photos
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Before Photo
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('beforePhoto', e.target.files?.[0] || null)}
                    className="hidden"
                    id="before-photo"
                  />
                  <label htmlFor="before-photo" className="cursor-pointer">
                    <Icon name="PhotoIcon" size={32} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {formData.beforePhoto ? formData.beforePhoto.name : 'Click to upload before photo'}
                    </p>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  After Photo
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('afterPhoto', e.target.files?.[0] || null)}
                    className="hidden"
                    id="after-photo"
                  />
                  <label htmlFor="after-photo" className="cursor-pointer">
                    <Icon name="PhotoIcon" size={32} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {formData.afterPhoto ? formData.afterPhoto.name : 'Click to upload after photo'}
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => handleInputChange('consent', e.target.checked)}
              className="mt-1 w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary/20"
            />
            <label htmlFor="consent" className="text-sm text-muted-foreground">
              I consent to FitCore Elite using my story and photos for marketing purposes. 
              I understand that my story may be featured on the website, social media, and other promotional materials.
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!formData.consent || isSubmitting}
              className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Icon name="PaperAirplaneIcon" size={16} />
                  <span>Submit Story</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionPortal;