import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    newsletter: false,
    privacy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const projectTypes = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'digital-transformation', label: 'Digital Transformation' },
    { value: 'consulting', label: 'Strategic Consulting' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: '10k-25k', label: '$10k - $25k' },
    { value: '25k-50k', label: '$25k - $50k' },
    { value: '50k-100k', label: '$50k - $100k' },
    { value: '100k-250k', label: '$100k - $250k' },
    { value: '250k+', label: '$250k+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP' },
    { value: '1-3-months', label: '1-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-12-months', label: '6-12 Months' },
    { value: 'flexible', label: 'Flexible Timeline' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
        newsletter: false,
        privacy: false
      });
    }, 2000);
  };

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl p-8 text-center space-y-6 card-elevated"
      >
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent Successfully!</h3>
          <p className="text-text-secondary">
            Thank you for reaching out. We'll get back to you within 24 hours with next steps.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setSubmitStatus(null)}
          className="mx-auto"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="bg-card rounded-2xl p-6 sm:p-8 space-y-6 card-elevated"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-2">Start Your Project</h3>
        <p className="text-text-secondary">
          Tell us about your vision and we'll craft a solution that exceeds expectations.
        </p>
      </div>
      {/* Personal Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={formData?.name}
          onChange={handleInputChange}
          placeholder="John Doe"
          required
        />
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          placeholder="john@company.com"
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Company"
          type="text"
          name="company"
          value={formData?.company}
          onChange={handleInputChange}
          placeholder="Your Company"
        />
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData?.phone}
          onChange={handleInputChange}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      {/* Project Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-text-primary">Project Details</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Project Type *
            </label>
            <select
              name="projectType"
              value={formData?.projectType}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            >
              <option value="">Select Type</option>
              {projectTypes?.map(type => (
                <option key={type?.value} value={type?.value}>
                  {type?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Budget Range
            </label>
            <select
              name="budget"
              value={formData?.budget}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            >
              <option value="">Select Budget</option>
              {budgetRanges?.map(budget => (
                <option key={budget?.value} value={budget?.value}>
                  {budget?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Timeline
            </label>
            <select
              name="timeline"
              value={formData?.timeline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            >
              <option value="">Select Timeline</option>
              {timelineOptions?.map(timeline => (
                <option key={timeline?.value} value={timeline?.value}>
                  {timeline?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Project Description *
        </label>
        <textarea
          name="message"
          value={formData?.message}
          onChange={handleInputChange}
          rows={5}
          placeholder="Tell us about your project goals, challenges, and vision..."
          required
          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
        />
      </div>
      {/* Checkboxes */}
      <div className="space-y-3">
        <Checkbox
          label="Subscribe to our newsletter for industry insights and updates"
          checked={formData?.newsletter}
          onChange={handleInputChange}
          name="newsletter"
        />
        <Checkbox
          label="I agree to the privacy policy and terms of service"
          checked={formData?.privacy}
          onChange={handleInputChange}
          name="privacy"
          required
        />
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isSubmitting}
        disabled={!formData?.privacy}
        className="btn-magnetic"
      >
        {isSubmitting ? 'Sending Message...' : 'Send Message'}
      </Button>
      <p className="text-xs text-text-secondary text-center">
        We typically respond within 24 hours. For urgent matters, call us directly.
      </p>
    </motion.form>
  );
};

export default ContactForm;