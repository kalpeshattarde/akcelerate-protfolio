import React from 'react';
import AppImage from '@/components/ui/AppImage';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  alt: string;
  quote: string;
}

interface TeamCultureSectionProps {
  teamMembers: TeamMember[];
}

const TeamCultureSection: React.FC<TeamCultureSectionProps> = ({ teamMembers }) => {
  return (
    <section className="px-6 lg:px-12 py-24 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">
            Our Culture
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            The People Behind the Craft
          </h2>
          <p className="font-body text-lg text-text-secondary leading-relaxed">
            Our studio is built on the collective passion, expertise, and creativity of individuals who believe in the transformative power of exceptional design.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6 bg-muted">
                <AppImage
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="font-body text-sm text-foreground italic leading-relaxed">
                    "{member.quote}"
                  </p>
                </div>
              </div>

              {/* Member Info */}
              <div>
                <h3 className="font-headline text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-text-secondary">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default TeamCultureSection;