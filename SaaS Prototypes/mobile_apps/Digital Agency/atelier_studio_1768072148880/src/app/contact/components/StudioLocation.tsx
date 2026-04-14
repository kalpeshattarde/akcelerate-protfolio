import React from 'react';

const StudioLocation: React.FC = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Visit Our Studio
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            Experience our creative space in the heart of New York. Schedule a visit to discuss your project in person.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Atelier Studio Location"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=40.7589,-73.9851&z=14&output=embed"
              className="border-0"
            />
          </div>
          
          <div className="p-8 bg-muted/30">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-headline text-xl font-bold text-foreground mb-4">
                  Studio Hours
                </h3>
                <div className="space-y-2 font-body text-text-secondary">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: By appointment only</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-headline text-xl font-bold text-foreground mb-4">
                  Getting Here
                </h3>
                <div className="space-y-2 font-body text-text-secondary">
                  <p>Subway: A, C, E to 34th St-Penn Station</p>
                  <p>Bus: M4, M16, M34-SBS</p>
                  <p>Parking: Available at nearby garages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioLocation;