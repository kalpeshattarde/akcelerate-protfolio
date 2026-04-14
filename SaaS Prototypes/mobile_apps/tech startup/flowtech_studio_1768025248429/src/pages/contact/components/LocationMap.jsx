import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const LocationMap = () => {
  const offices = [
    {
      id: 1,
      city: "San Francisco",
      address: "123 Innovation Drive, Suite 400\nSan Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "sf@flowtechstudio.com",
      hours: "Mon-Fri: 9 AM - 6 PM PST",
      coordinates: "37.7749,-122.4194"
    },
    {
      id: 2,
      city: "New York",
      address: "456 Tech Avenue, Floor 12\nNew York, NY 10001",
      phone: "+1 (555) 987-6543",
      email: "ny@flowtechstudio.com",
      hours: "Mon-Fri: 9 AM - 6 PM EST",
      coordinates: "40.7128,-74.0060"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Visit Our Studios
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            We're located in the heart of innovation hubs. Drop by for a coffee 
            and let's discuss your project in person.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {offices?.map((office, index) => (
            <motion.div
              key={office?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card rounded-xl overflow-hidden card-elevated"
            >
              {/* Map */}
              <div className="h-64 bg-muted relative overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={`${office?.city} Office Location`}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${office?.coordinates}&z=14&output=embed`}
                  className="border-0"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {office?.city} Studio
                </div>
              </div>

              {/* Office Details */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-text-primary">
                  {office?.city} Office
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-text-primary font-medium">Address</div>
                      <div className="text-text-secondary text-sm whitespace-pre-line">
                        {office?.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={18} className="text-primary flex-shrink-0" />
                    <div>
                      <div className="text-text-primary font-medium">Phone</div>
                      <a 
                        href={`tel:${office?.phone?.replace(/\D/g, '')}`}
                        className="text-text-secondary text-sm hover:text-primary transition-colors"
                      >
                        {office?.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={18} className="text-primary flex-shrink-0" />
                    <div>
                      <div className="text-text-primary font-medium">Email</div>
                      <a 
                        href={`mailto:${office?.email}`}
                        className="text-text-secondary text-sm hover:text-primary transition-colors"
                      >
                        {office?.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={18} className="text-primary flex-shrink-0" />
                    <div>
                      <div className="text-text-primary font-medium">Hours</div>
                      <div className="text-text-secondary text-sm">
                        {office?.hours}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-border">
                  <a
                    href={`https://maps.google.com/?q=${office?.coordinates}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary/10 text-primary px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    Get Directions
                  </a>
                  <a
                    href={`tel:${office?.phone?.replace(/\D/g, '')}`}
                    className="flex-1 bg-accent/10 text-accent px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-accent/20 transition-colors"
                  >
                    Call Office
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Reach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Globe" size={24} className="text-primary" />
            <h3 className="text-xl font-bold text-text-primary">
              Global Reach, Local Touch
            </h3>
          </div>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            While we're based in San Francisco and New York, we work with clients worldwide. 
            Our remote collaboration tools ensure seamless communication regardless of location.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>24/7 Support</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Video" size={14} />
              <span>Video Conferencing</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="MessageSquare" size={14} />
              <span>Real-time Chat</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Share2" size={14} />
              <span>Collaborative Tools</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationMap;