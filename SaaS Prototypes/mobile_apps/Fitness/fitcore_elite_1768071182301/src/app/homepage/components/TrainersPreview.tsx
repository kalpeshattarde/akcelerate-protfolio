import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  alt: string;
  certifications: string[];
  rating: number;
  clients: number;
}

const TrainersPreview = () => {
  const trainers: Trainer[] = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    specialty: 'Strength & Powerlifting',
    experience: '8 years',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1430d0a1d-1763299420534.png",
    alt: 'Hispanic male trainer with muscular build demonstrating proper form in modern gym',
    certifications: ['CSCS', 'USAPL', 'FMS'],
    rating: 4.9,
    clients: 127
  },
  {
    id: 2,
    name: 'Dr. Sarah Kim',
    specialty: 'Sports Medicine & Recovery',
    experience: '12 years',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ab46085f-1763299126839.png",
    alt: 'Asian female doctor and trainer in professional athletic wear with confident posture',
    certifications: ['MD', 'ACSM', 'NASM'],
    rating: 5.0,
    clients: 89
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    specialty: 'HIIT & Conditioning',
    experience: '6 years',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d12019da-1763537994058.png",
    alt: 'African American trainer with athletic physique leading high-intensity workout session',
    certifications: ['NASM', 'HIIT', 'TRX'],
    rating: 4.8,
    clients: 156
  }];


  return (
    <section className="py-20 bg-gradient-to-b from-deep-charcoal to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-warning/10 border border-warning/20 rounded-full text-warning text-sm font-medium mb-6">
            <Icon name="UserGroupIcon" size={16} />
            <span>Elite Coaching Team</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Expert
            <span className="block text-transparent bg-gradient-to-r from-warning to-primary bg-clip-text">
              Trainers
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Train with certified professionals who combine advanced degrees, elite certifications, and proven track records of transforming lives through scientific training methods.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {trainers.map((trainer) =>
          <div
            key={trainer.id}
            className="group bg-card/50 backdrop-blur-10 border border-border rounded-2xl p-6 glass-morphism hover:border-primary/30 transition-all duration-300 hover:scale-105">

              {/* Trainer Image */}
              <div className="relative mb-6">
                <div className="relative w-24 h-24 mx-auto">
                  <AppImage
                  src={trainer.image}
                  alt={trainer.alt}
                  className="w-full h-full object-cover rounded-full border-3 border-primary/30 group-hover:border-primary/60 transition-colors duration-300" />

                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                    <Icon name="CheckBadgeIcon" size={16} className="text-primary-foreground" />
                  </div>
                </div>
              </div>
              
              {/* Trainer Info */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-foreground mb-1">{trainer.name}</h3>
                <p className="text-primary font-medium mb-2">{trainer.specialty}</p>
                <p className="text-sm text-muted-foreground">{trainer.experience} experience</p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Icon name="StarIcon" size={16} className="text-warning" />
                    <span className="text-lg font-bold text-foreground">{trainer.rating}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-lg font-bold text-foreground mb-1">{trainer.clients}</div>
                  <div className="text-xs text-muted-foreground">Clients</div>
                </div>
              </div>
              
              {/* Certifications */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {trainer.certifications.map((cert, index) =>
                <span
                  key={index}
                  className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full border border-accent/30">

                      {cert}
                    </span>
                )}
                </div>
              </div>
              
              {/* CTA Button */}
              <Link
              href="/trainers"
              className="group/btn relative block w-full py-3 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary rounded-lg font-semibold text-center transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation"
              aria-label={`View ${trainer.name}'s profile and training details`}>

                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Profile
                  <Icon name="UserIcon" size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-warning opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          )}
        </div>

        {/* View All Trainers CTA */}
        <div className="text-center">
          <Link
            href="/trainers"
            className="group relative inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-warning to-primary text-primary-foreground rounded-lg font-semibold overflow-hidden transition-all duration-300 shadow-cta hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-warning/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation"
            aria-label="Meet all elite trainers and their specializations">

            <span className="relative z-10 flex items-center gap-2">
              Meet All Trainers
              <Icon name="ArrowRightIcon" size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </section>);

};

export default TrainersPreview;