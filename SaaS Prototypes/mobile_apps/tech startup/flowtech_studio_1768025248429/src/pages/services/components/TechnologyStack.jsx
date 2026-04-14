import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TechnologyStack = () => {
  const [activeStack, setActiveStack] = useState('frontend');

  const techStacks = {
    frontend: {
      title: 'Frontend Excellence',
      description: 'Modern frameworks and libraries for exceptional user experiences',
      icon: 'Monitor',
      color: 'from-primary to-primary/60',
      technologies: [
        { name: 'React 18+', description: 'Latest React features with concurrent rendering', icon: 'Atom', level: 95 },
        { name: 'Next.js', description: 'Server-side rendering and static generation', icon: 'Zap', level: 92 },
        { name: 'TypeScript', description: 'Type-safe development for maintainable code', icon: 'Code2', level: 90 },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid UI development', icon: 'Palette', level: 88 },
        { name: 'Framer Motion', description: 'Advanced animations and micro-interactions', icon: 'Sparkles', level: 85 }
      ]
    },
    backend: {
      title: 'Backend Architecture',
      description: 'Scalable server solutions and API development',
      icon: 'Server',
      color: 'from-accent to-accent/60',
      technologies: [
        { name: 'Node.js', description: 'High-performance JavaScript runtime', icon: 'Cpu', level: 93 },
        { name: 'GraphQL', description: 'Efficient data fetching and API design', icon: 'Database', level: 87 },
        { name: 'PostgreSQL', description: 'Robust relational database management', icon: 'HardDrive', level: 89 },
        { name: 'Redis', description: 'In-memory caching for optimal performance', icon: 'Zap', level: 84 },
        { name: 'Docker', description: 'Containerization for consistent deployments', icon: 'Package', level: 91 }
      ]
    },
    cloud: {
      title: 'Cloud & DevOps',
      description: 'Modern deployment and infrastructure management',
      icon: 'Cloud',
      color: 'from-trust to-trust/60',
      technologies: [
        { name: 'AWS', description: 'Comprehensive cloud computing platform', icon: 'CloudCog', level: 90 },
        { name: 'Vercel', description: 'Optimized deployment for frontend applications', icon: 'Rocket', level: 94 },
        { name: 'GitHub Actions', description: 'Automated CI/CD workflows', icon: 'GitBranch', level: 88 },
        { name: 'Kubernetes', description: 'Container orchestration at scale', icon: 'Layers', level: 82 },
        { name: 'Monitoring', description: 'Real-time performance and error tracking', icon: 'Activity', level: 86 }
      ]
    },
    tools: {
      title: 'Development Tools',
      description: 'Productivity tools and development environment',
      icon: 'Wrench',
      color: 'from-secondary to-secondary/60',
      technologies: [
        { name: 'Vite', description: 'Lightning-fast build tool and dev server', icon: 'Zap', level: 92 },
        { name: 'ESLint', description: 'Code quality and consistency enforcement', icon: 'CheckCircle', level: 89 },
        { name: 'Prettier', description: 'Automated code formatting', icon: 'AlignLeft', level: 95 },
        { name: 'Jest', description: 'Comprehensive testing framework', icon: 'TestTube', level: 87 },
        { name: 'Storybook', description: 'Component development and documentation', icon: 'Book', level: 83 }
      ]
    }
  };

  const stackCategories = [
    { id: 'frontend', name: 'Frontend', icon: 'Monitor' },
    { id: 'backend', name: 'Backend', icon: 'Server' },
    { id: 'cloud', name: 'Cloud & DevOps', icon: 'Cloud' },
    { id: 'tools', name: 'Dev Tools', icon: 'Wrench' }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Cpu" size={16} />
            <span>Technology Stack</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Cutting-Edge Technology Arsenal
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            We leverage the latest technologies and best practices to build scalable, maintainable, and performant digital solutions
          </p>
        </div>

        {/* Stack Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {stackCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveStack(category?.id)}
              className={`
                flex items-center space-x-3 px-6 py-3 rounded-lg transition-all duration-300
                ${activeStack === category?.id
                  ? 'bg-primary text-white shadow-medium'
                  : 'bg-background text-text-secondary hover:bg-primary/10 hover:text-primary'
                }
              `}
            >
              <Icon name={category?.icon} size={20} />
              <span className="font-medium">{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Active Stack Display */}
        <div className="bg-background rounded-2xl p-8 shadow-medium">
          <div className="text-center mb-8">
            <div className={`inline-block p-4 rounded-xl bg-gradient-to-r ${techStacks?.[activeStack]?.color} text-white mb-4`}>
              <Icon name={techStacks?.[activeStack]?.icon} size={32} />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              {techStacks?.[activeStack]?.title}
            </h3>
            <p className="text-text-secondary">
              {techStacks?.[activeStack]?.description}
            </p>
          </div>

          {/* Technologies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStacks?.[activeStack]?.technologies?.map((tech, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border hover:shadow-medium transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon name={tech?.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary">{tech?.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-1000"
                            style={{ width: `${tech?.level}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-text-secondary">{tech?.level}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {tech?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-6">
            Want to see how we can leverage these technologies for your project?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 btn-magnetic">
              <Icon name="Calendar" size={16} />
              <span>Schedule Technical Discussion</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 border border-border text-text-primary rounded-lg hover:bg-card transition-colors duration-300">
              <Icon name="Download" size={16} />
              <span>Download Tech Stack Guide</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;