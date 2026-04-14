import React from 'react';
import Icon from '@/components/ui/AppIcon';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: 'PhoneIcon',
      title: 'Phone',
      primary: '+1 (555) FIT-CORE',
      secondary: '+1 (555) 348-2673',
      description: 'Call us for immediate assistance',
      action: 'tel:+15553482673'
    },
    {
      icon: 'EnvelopeIcon',
      title: 'Email',
      primary: 'elite@fitcore.com',
      secondary: 'consultations@fitcore.com',
      description: 'Send us your questions anytime',
      action: 'mailto:elite@fitcore.com'
    },
    {
      icon: 'MapPinIcon',
      title: 'Location',
      primary: '2847 Elite Performance Blvd',
      secondary: 'Los Angeles, CA 90210',
      description: 'Visit our state-of-the-art facility',
      action: 'https://maps.google.com/?q=2847+Elite+Performance+Blvd+Los+Angeles+CA'
    },
    {
      icon: 'ChatBubbleLeftRightIcon',
      title: 'Live Chat',
      primary: 'Available 24/7',
      secondary: 'Instant responses',
      description: 'Chat with our fitness experts',
      action: '#'
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '5:00 AM - 10:00 PM' },
    { day: 'Saturday', hours: '6:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '7:00 AM - 8:00 PM' },
    { day: 'Holidays', hours: 'Limited Hours' }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: 'CameraIcon', url: 'https://instagram.com/fitcoreelite', handle: '@fitcoreelite' },
    { name: 'Facebook', icon: 'UserGroupIcon', url: 'https://facebook.com/fitcoreelite', handle: 'FitCore Elite' },
    { name: 'YouTube', icon: 'PlayIcon', url: 'https://youtube.com/fitcoreelite', handle: 'FitCore Elite' },
    { name: 'TikTok', icon: 'MusicalNoteIcon', url: 'https://tiktok.com/@fitcoreelite', handle: '@fitcoreelite' }
  ];

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.action}
              target={method.action.startsWith('http') ? '_blank' : undefined}
              rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={method.icon as any} size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{method.title}</h4>
                  <p className="text-foreground font-medium">{method.primary}</p>
                  <p className="text-muted-foreground text-sm">{method.secondary}</p>
                  <p className="text-muted-foreground text-xs mt-2">{method.description}</p>
                </div>
                <Icon name="ArrowTopRightOnSquareIcon" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">Business Hours</h3>
        <div className="space-y-4">
          {businessHours.map((schedule, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
              <span className="text-foreground font-medium">{schedule.day}</span>
              <span className="text-primary font-semibold">{schedule.hours}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2 text-primary">
            <Icon name="InformationCircleIcon" size={20} />
            <span className="font-medium">24/7 Member Access Available</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Elite members enjoy round-the-clock facility access with keycard entry.
          </p>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">Emergency & After Hours</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
              <Icon name="ExclamationTriangleIcon" size={20} className="text-error" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Medical Emergency</h4>
              <p className="text-sm text-muted-foreground">Call 911 immediately</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <Icon name="PhoneIcon" size={20} className="text-warning" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">After Hours Support</h4>
              <p className="text-sm text-muted-foreground">+1 (555) 348-2673 ext. 911</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">Follow Our Journey</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                <Icon name={social.icon as any} size={20} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">{social.name}</h4>
              <p className="text-xs text-muted-foreground">{social.handle}</p>
            </a>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Join our community of elite performers and stay updated with the latest fitness trends, success stories, and exclusive content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;