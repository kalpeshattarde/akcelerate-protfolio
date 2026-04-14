'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  newsletter: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const ProjectInquiryForm: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    newsletter: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const projectTypes = [
    { id: 'brand-identity', label: 'Brand Identity', icon: 'SparklesIcon' },
    { id: 'web-experience', label: 'Web Experience', icon: 'GlobeAltIcon' },
    { id: 'digital-product', label: 'Digital Product', icon: 'DevicePhoneMobileIcon' },
    { id: 'content-strategy', label: 'Content Strategy', icon: 'DocumentTextIcon' },
    { id: 'creative-direction', label: 'Creative Direction', icon: 'LightBulbIcon' },
    { id: 'other', label: 'Other', icon: 'EllipsisHorizontalIcon' },
  ];

  const budgetRanges = [
    '< $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000+',
    'To be discussed',
  ];

  const timelines = [
    '1-2 months',
    '3-4 months',
    '5-6 months',
    '6+ months',
    'Flexible',
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.company.trim()) newErrors.company = 'Company name is required';
    }

    if (step === 2) {
      if (!formData.projectType) newErrors.projectType = 'Please select a project type';
      if (!formData.budget) newErrors.budget = 'Please select a budget range';
      if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
    }

    if (step === 3) {
      if (!formData.message.trim()) {
        newErrors.message = 'Please tell us about your project';
      } else if (formData.message.trim().length < 50) {
        newErrors.message = 'Please provide at least 50 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
        newsletter: false,
      });
      setCurrentStep(1);
      setSubmitSuccess(false);
    }, 3000);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (!isHydrated) {
    return (
      <div className="bg-surface border border-border rounded-lg p-8 lg:p-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-12 bg-muted rounded" />
          <div className="h-12 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="bg-surface border border-border rounded-lg p-8 lg:p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-6">
          <Icon name="CheckCircleIcon" size={32} className="text-success" variant="solid" />
        </div>
        <h3 className="font-headline text-2xl font-bold text-foreground mb-4">
          Thank You for Reaching Out
        </h3>
        <p className="font-body text-text-secondary mb-6">
          We've received your inquiry and will respond within 24-48 hours. Our team is excited to learn more about your project.
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-primary">
          <Icon name="ClockIcon" size={16} />
          <span className="font-cta font-medium">Expected response: 24-48 hours</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-8 lg:p-12">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step
                    ? 'border-primary bg-primary text-background' :'border-border bg-muted text-text-secondary'
                }`}
              >
                <span className="font-cta font-semibold text-sm">{step}</span>
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                    currentStep > step ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs font-cta text-text-secondary">
          <span>Contact Info</span>
          <span>Project Details</span>
          <span>Tell Us More</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-bold text-foreground mb-6">
              Let's Start with Your Details
            </h3>

            <div>
              <label htmlFor="fullName" className="block font-cta text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full px-4 py-3 bg-muted border ${
                  errors.fullName ? 'border-destructive' : 'border-border'
                } rounded-md text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block font-cta text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 bg-muted border ${
                  errors.email ? 'border-destructive' : 'border-border'
                } rounded-md text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                placeholder="john@company.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block font-cta text-sm font-medium text-foreground mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className={`w-full px-4 py-3 bg-muted border ${
                  errors.company ? 'border-destructive' : 'border-border'
                } rounded-md text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                placeholder="Your Company"
              />
              {errors.company && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.company}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block font-cta text-sm font-medium text-foreground mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full px-6 py-4 bg-accent text-accent-foreground font-cta font-semibold rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-dramatic transition-all duration-300 flex items-center justify-center gap-2"
            >
              Continue to Project Details
              <Icon name="ArrowRightIcon" size={20} />
            </button>
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-bold text-foreground mb-6">
              Tell Us About Your Project
            </h3>

            <div>
              <label className="block font-cta text-sm font-medium text-foreground mb-3">
                Project Type *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleInputChange('projectType', type.id)}
                    className={`p-4 border rounded-md transition-all duration-300 ${
                      formData.projectType === type.id
                        ? 'border-primary bg-primary/10 text-primary' :'border-border bg-muted text-foreground hover:border-primary/50'
                    }`}
                  >
                    <Icon name={type.icon as any} size={24} className="mx-auto mb-2" />
                    <span className="font-cta text-sm font-medium block">{type.label}</span>
                  </button>
                ))}
              </div>
              {errors.projectType && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.projectType}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="budget" className="block font-cta text-sm font-medium text-foreground mb-2">
                Budget Range *
              </label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className={`w-full px-4 py-3 bg-muted border ${
                  errors.budget ? 'border-destructive' : 'border-border'
                } rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
              >
                <option value="">Select budget range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.budget}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="timeline" className="block font-cta text-sm font-medium text-foreground mb-2">
                Project Timeline *
              </label>
              <select
                id="timeline"
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className={`w-full px-4 py-3 bg-muted border ${
                  errors.timeline ? 'border-destructive' : 'border-border'
                } rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
              >
                <option value="">Select timeline</option>
                {timelines.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.timeline && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.timeline}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 px-6 py-4 bg-muted text-foreground font-cta font-semibold rounded-md hover:bg-muted/80 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Icon name="ArrowLeftIcon" size={20} />
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 px-6 py-4 bg-accent text-accent-foreground font-cta font-semibold rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-dramatic transition-all duration-300 flex items-center justify-center gap-2"
              >
                Continue
                <Icon name="ArrowRightIcon" size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Project Description */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-bold text-foreground mb-6">
              Share Your Vision
            </h3>

            <div>
              <label htmlFor="message" className="block font-cta text-sm font-medium text-foreground mb-2">
                Project Description *
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={8}
                className={`w-full px-4 py-3 bg-muted border ${
                  errors.message ? 'border-destructive' : 'border-border'
                } rounded-md text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none`}
                placeholder="Tell us about your project goals, challenges, and what you hope to achieve. The more details you provide, the better we can understand your needs."
              />
              <div className="flex justify-between items-center mt-2">
                {errors.message ? (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <Icon name="ExclamationCircleIcon" size={16} />
                    {errors.message}
                  </p>
                ) : (
                  <p className="text-sm text-text-secondary">
                    Minimum 50 characters
                  </p>
                )}
                <span className="text-sm text-text-secondary">
                  {formData.message.length} characters
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
              <input
                type="checkbox"
                id="newsletter"
                checked={formData.newsletter}
                onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                className="mt-1 w-4 h-4 text-primary bg-muted border-border rounded focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="newsletter" className="font-body text-sm text-text-secondary cursor-pointer">
                Subscribe to our newsletter for creative insights, case studies, and industry perspectives. We respect your inbox and send thoughtful content monthly.
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 px-6 py-4 bg-muted text-foreground font-cta font-semibold rounded-md hover:bg-muted/80 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Icon name="ArrowLeftIcon" size={20} />
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-4 bg-accent text-accent-foreground font-cta font-semibold rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-dramatic transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <Icon name="PaperAirplaneIcon" size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProjectInquiryForm;