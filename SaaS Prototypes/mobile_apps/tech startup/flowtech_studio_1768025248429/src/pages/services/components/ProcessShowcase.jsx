import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProcessShowcase = () => {
  const [activePhase, setActivePhase] = useState(0);

  const processPhases = [
    {
      title: 'Discovery & Strategy',
      duration: '1-2 weeks',
      description: 'Deep dive into your vision, goals, and technical requirements to craft the perfect roadmap',
      icon: 'Search',
      color: 'from-primary to-primary/60',
      activities: [
        'Stakeholder interviews and requirement gathering',
        'Technical architecture assessment',
        'User journey mapping and persona development',
        'Competitive analysis and market research',
        'Technology stack recommendation'
      ],
      deliverables: [
        'Project roadmap and timeline',
        'Technical specification document',
        'User experience wireframes',
        'Risk assessment and mitigation plan'
      ]
    },
    {
      title: 'Design & Prototyping',
      duration: '2-3 weeks',
      description: 'Transform concepts into interactive prototypes that bring your vision to life',
      icon: 'Palette',
      color: 'from-accent to-accent/60',
      activities: [
        'Design system creation and component library',
        'Interactive prototype development',
        'User testing and feedback integration',
        'Accessibility compliance review',
        'Motion design and micro-interaction planning'
      ],
      deliverables: [
        'Complete design system',
        'Interactive clickable prototype',
        'Component library documentation',
        'Accessibility audit report'
      ]
    },
    {
      title: 'Development & Integration',
      duration: '4-8 weeks',
      description: 'Build robust, scalable solutions using cutting-edge technologies and best practices',
      icon: 'Code2',
      color: 'from-trust to-trust/60',
      activities: [
        'Frontend development with React 18+ and TypeScript',
        'Backend API development and database design',
        'Third-party service integration',
        'Performance optimization and security implementation',
        'Continuous integration and deployment setup'
      ],
      deliverables: [
        'Fully functional application',
        'API documentation',
        'Performance optimization report',
        'Security audit and compliance'
      ]
    },
    {
      title: 'Testing & Optimization',
      duration: '1-2 weeks',
      description: 'Rigorous testing and fine-tuning to ensure flawless performance across all scenarios',
      icon: 'TestTube',
      color: 'from-secondary to-secondary/60',
      activities: [
        'Comprehensive testing across devices and browsers',
        'Performance monitoring and Core Web Vitals optimization',
        'User acceptance testing and feedback incorporation',
        'Load testing and scalability verification',
        'Final accessibility and SEO optimization'
      ],
      deliverables: [
        'Testing report and bug fixes',
        'Performance optimization results',
        'User training documentation',
        'Go-live checklist and deployment guide'
      ]
    },
    {
      title: 'Launch & Support',
      duration: 'Ongoing',
      description: 'Smooth deployment and continuous support to ensure long-term success',
      icon: 'Rocket',
      color: 'from-primary to-accent',
      activities: [
        'Production deployment and monitoring setup',
        'Team training and knowledge transfer',
        'Analytics implementation and tracking',
        'Ongoing maintenance and updates',
        'Performance monitoring and optimization'
      ],
      deliverables: [
        'Live production application',
        'Monitoring dashboard access',
        'Maintenance and support plan',
        'Analytics and reporting setup'
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Workflow" size={16} />
            <span>Our Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            From Vision to Reality
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Our proven methodology ensures every project delivers exceptional results through careful planning, iterative development, and continuous optimization
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-trust rounded-full"></div>

          {/* Process Phases */}
          <div className="space-y-12 lg:space-y-20">
            {processPhases?.map((phase, index) => (
              <div
                key={index}
                className={`
                  relative flex flex-col lg:flex-row items-center gap-8
                  ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                `}
              >
                {/* Timeline Node */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-10">
                  <button
                    onClick={() => setActivePhase(index)}
                    className={`
                      w-16 h-16 rounded-full border-4 border-background transition-all duration-300
                      ${activePhase === index
                        ? `bg-gradient-to-r ${phase?.color} shadow-strong scale-110`
                        : 'bg-card hover:bg-primary/10'
                      }
                    `}
                  >
                    <Icon 
                      name={phase?.icon} 
                      size={24} 
                      className={activePhase === index ? 'text-white' : 'text-text-secondary'} 
                    />
                  </button>
                </div>

                {/* Content Card */}
                <div className={`
                  flex-1 max-w-lg
                  ${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'}
                `}>
                  <div className="card-elevated p-6 hover:shadow-strong transition-all duration-300">
                    {/* Mobile Icon */}
                    <div className="lg:hidden flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${phase?.color} flex items-center justify-center`}>
                        <Icon name={phase?.icon} size={24} className="text-white" />
                      </div>
                      <div className="text-sm text-primary font-medium">{phase?.duration}</div>
                    </div>

                    {/* Desktop Duration Badge */}
                    <div className="hidden lg:block mb-4">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {phase?.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-text-primary mb-3">
                      {phase?.title}
                    </h3>
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {phase?.description}
                    </p>

                    {/* Expandable Details */}
                    {activePhase === index && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <h4 className="font-semibold text-text-primary mb-2">Key Activities:</h4>
                          <ul className="space-y-1">
                            {phase?.activities?.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-start space-x-2 text-sm text-text-secondary">
                                <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary mb-2">Deliverables:</h4>
                          <ul className="space-y-1">
                            {phase?.deliverables?.map((deliverable, delIndex) => (
                              <li key={delIndex} className="flex items-start space-x-2 text-sm text-text-secondary">
                                <Icon name="Package" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                                <span>{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setActivePhase(activePhase === index ? -1 : index)}
                      className="mt-4 flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-300"
                    >
                      <span className="text-sm font-medium">
                        {activePhase === index ? 'Show Less' : 'Show Details'}
                      </span>
                      <Icon 
                        name={activePhase === index ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                      />
                    </button>
                  </div>
                </div>

                {/* Phase Number */}
                <div className={`
                  flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-r ${phase?.color} 
                  flex items-center justify-center text-white font-bold text-xl
                  ${index % 2 === 0 ? 'lg:order-last' : 'lg:order-first'}
                `}>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-12 border-t border-border">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a customized roadmap that aligns with your goals and timeline
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center space-x-2 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 btn-magnetic">
              <Icon name="MessageCircle" size={16} />
              <span>Start Conversation</span>
            </button>
            <button className="flex items-center space-x-2 px-8 py-3 border border-border text-text-primary rounded-lg hover:bg-card transition-colors duration-300">
              <Icon name="Calendar" size={16} />
              <span>Schedule Discovery Call</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessShowcase;