'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TrialClass {
  id: string;
  name: string;
  instructor: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  nextAvailable: string;
  spots: number;
}

const TrialBooking = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    goals: ''
  });

  const trialClasses: TrialClass[] = [
    {
      id: 'strength-basics',
      name: 'Strength Basics',
      instructor: 'Marcus Johnson',
      duration: 60,
      difficulty: 'Beginner',
      description: 'Learn fundamental strength training movements with proper form and technique.',
      nextAvailable: 'Tomorrow 9:00 AM',
      spots: 8
    },
    {
      id: 'hiit-intro',
      name: 'HIIT Introduction',
      instructor: 'Sarah Chen',
      duration: 45,
      difficulty: 'Intermediate',
      description: 'High-intensity interval training designed to boost metabolism and endurance.',
      nextAvailable: 'Today 6:00 PM',
      spots: 5
    },
    {
      id: 'functional-movement',
      name: 'Functional Movement',
      instructor: 'David Rodriguez',
      duration: 50,
      difficulty: 'Beginner',
      description: 'Movement patterns that translate to everyday activities and athletic performance.',
      nextAvailable: 'Tomorrow 7:00 AM',
      spots: 12
    },
    {
      id: 'elite-conditioning',
      name: 'Elite Conditioning',
      instructor: 'Amanda Foster',
      duration: 75,
      difficulty: 'Advanced',
      description: 'Advanced conditioning protocols used by professional athletes.',
      nextAvailable: 'Wednesday 5:30 PM',
      spots: 3
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle trial booking submission
    console.log('Trial booking:', { selectedClass, ...formData });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-primary bg-primary/10';
      case 'Intermediate': return 'text-accent bg-accent/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Book Your <span className="text-primary">Free Trial</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience FitCore Elite with a complimentary trial class. No commitment required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Trial Classes */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Available Trial Classes</h3>
            <div className="space-y-4">
              {trialClasses.map((trialClass) => (
                <div
                  key={trialClass.id}
                  className={`p-6 border rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedClass === trialClass.id
                      ? 'border-primary bg-primary/5 shadow-neon'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedClass(trialClass.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">{trialClass.name}</h4>
                      <p className="text-sm text-muted-foreground">with {trialClass.instructor}</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trialClass.difficulty)}`}>
                        {trialClass.difficulty}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{trialClass.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="ClockIcon" size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{trialClass.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="CalendarIcon" size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{trialClass.nextAvailable}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="UserGroupIcon" size={16} className="text-primary" />
                      <span className="text-primary font-medium">{trialClass.spots} spots left</span>
                    </div>
                  </div>

                  {selectedClass === trialClass.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center space-x-2 text-primary">
                        <Icon name="CheckCircleIcon" size={20} />
                        <span className="font-medium">Selected for your trial</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Book Your Trial</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Fitness Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (0-6 months)</option>
                    <option value="intermediate">Intermediate (6 months - 2 years)</option>
                    <option value="advanced">Advanced (2+ years)</option>
                    <option value="athlete">Competitive Athlete</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Fitness Goals
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Tell us about your fitness goals..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedClass}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-cta hover:shadow-neon"
                >
                  Book Free Trial Class
                </button>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    By booking, you agree to our terms and conditions. No payment required for trial.
                  </p>
                </div>
              </form>
            </div>

            {/* Trial Benefits */}
            <div className="mt-8 bg-muted/20 border border-border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">What's Included in Your Trial</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircleIcon" size={20} className="text-primary" />
                  <span className="text-sm text-foreground">Full access to selected class</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircleIcon" size={20} className="text-primary" />
                  <span className="text-sm text-foreground">Personal fitness assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircleIcon" size={20} className="text-primary" />
                  <span className="text-sm text-foreground">Facility tour and equipment demo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircleIcon" size={20} className="text-primary" />
                  <span className="text-sm text-foreground">Consultation with fitness expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrialBooking;