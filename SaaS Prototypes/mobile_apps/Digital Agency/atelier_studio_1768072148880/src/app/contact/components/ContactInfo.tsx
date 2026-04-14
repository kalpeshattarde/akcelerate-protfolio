import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  href: string;
}

const ContactInfo: React.FC = () => {
  const contactMethods: ContactMethod[] = [
    {
      icon: 'EnvelopeIcon',
      label: 'Email',
      value: 'hello@atelierstudio.com',
      href: 'mailto:hello@atelierstudio.com',
    },
    {
      icon: 'PhoneIcon',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: 'MapPinIcon',
      label: 'Studio',
      value: '123 Creative Avenue, New York, NY 10001',
      href: 'https://maps.google.com/?q=40.7589,-73.9851',
    },
  ];

  const socialLinks = [
    { icon: 'instagram', label: 'Instagram', href: '#' },
    { icon: 'linkedin', label: 'LinkedIn', href: '#' },
    { icon: 'twitter', label: 'Twitter', href: '#' },
    { icon: 'dribbble', label: 'Dribbble', href: '#' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-surface border border-border rounded-lg p-8">
        <h3 className="font-headline text-2xl font-bold text-foreground mb-6">
          Get in Touch
        </h3>
        
        <div className="space-y-6">
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              target={method.label === 'Studio' ? '_blank' : undefined}
              rel={method.label === 'Studio' ? 'noopener noreferrer' : undefined}
              className="flex items-start gap-4 p-4 bg-muted/50 rounded-md hover:bg-muted transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-all duration-300">
                <Icon name={method.icon as any} size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-cta text-sm font-medium text-text-secondary mb-1">
                  {method.label}
                </p>
                <p className="font-body text-foreground group-hover:text-primary transition-colors duration-300">
                  {method.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-8">
        <h3 className="font-headline text-xl font-bold text-foreground mb-4">
          Response Time
        </h3>
        <div className="flex items-center gap-3 text-text-secondary">
          <Icon name="ClockIcon" size={20} className="text-primary" />
          <p className="font-body text-sm">
            We typically respond within 24-48 hours during business days
          </p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-8">
        <h3 className="font-headline text-xl font-bold text-foreground mb-6">
          Follow Our Work
        </h3>
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-muted rounded-full hover:bg-primary/20 hover:scale-110 transition-all duration-300 group"
              aria-label={social.label}
            >
              <span className="text-foreground group-hover:text-primary transition-colors duration-300 text-xl">
                {social.icon === 'instagram' && '📷'}
                {social.icon === 'linkedin' && '💼'}
                {social.icon === 'twitter' && '🐦'}
                {social.icon === 'dribbble' && '🏀'}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;