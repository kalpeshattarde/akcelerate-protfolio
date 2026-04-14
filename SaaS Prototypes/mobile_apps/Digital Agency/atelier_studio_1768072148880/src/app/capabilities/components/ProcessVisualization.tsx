import Icon from '@/components/ui/AppIcon';

export default function ProcessVisualization() {
  const processSteps = [
    {
      phase: 'Discovery',
      title: 'Understanding & Research',
      description: 'We immerse ourselves in your brand, audience, and objectives through comprehensive research and strategic workshops.',
      icon: 'MagnifyingGlassIcon',
      duration: '1-2 weeks'
    },
    {
      phase: 'Strategy',
      title: 'Planning & Architecture',
      description: 'Strategic frameworks emerge from insights, defining clear pathways from concept to execution.',
      icon: 'LightBulbIcon',
      duration: '2-3 weeks'
    },
    {
      phase: 'Design',
      title: 'Creative Development',
      description: 'Ideas take visual form through iterative design exploration, balancing aesthetics with functionality.',
      icon: 'PaintBrushIcon',
      duration: '4-6 weeks'
    },
    {
      phase: 'Build',
      title: 'Technical Implementation',
      description: 'Designs transform into robust digital experiences through meticulous development and engineering.',
      icon: 'CodeBracketIcon',
      duration: '6-8 weeks'
    },
    {
      phase: 'Launch',
      title: 'Deployment & Optimization',
      description: 'Careful launch execution followed by monitoring, refinement, and continuous improvement.',
      icon: 'RocketLaunchIcon',
      duration: '1-2 weeks'
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full font-cta text-sm font-medium text-primary mb-4">
            Our Methodology
          </span>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-foreground mb-6">
            A Process Built on<br />
            <span className="text-primary">Collaboration & Craft</span>
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto">
            Every project follows a refined methodology that balances creative exploration with strategic discipline, ensuring exceptional outcomes through thoughtful execution.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-surface border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-subtle transition-all duration-300">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Icon name={step.icon as any} size={24} className="text-primary" />
                  </div>

                  {/* Phase Label */}
                  <div className="mb-3">
                    <span className="font-cta text-xs text-text-secondary uppercase tracking-wider">
                      Phase {index + 1}
                    </span>
                    <h3 className="font-headline text-xl font-bold text-foreground mt-1">
                      {step.phase}
                    </h3>
                  </div>

                  {/* Title */}
                  <h4 className="font-body text-sm font-semibold text-foreground mb-2">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="font-body text-xs text-text-secondary leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    <Icon name="ClockIcon" size={14} className="text-primary" />
                    <span className="font-cta text-xs text-text-secondary">{step.duration}</span>
                  </div>
                </div>

                {/* Arrow Connector (Desktop) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 z-10">
                    <Icon name="ChevronRightIcon" size={24} className="text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Process Note */}
        <div className="mt-16 text-center">
          <p className="font-body text-sm text-text-secondary max-w-2xl mx-auto">
            While this framework guides our work, we remain flexible and adaptive to each project's unique requirements. Timelines are estimates and may vary based on project scope and complexity.
          </p>
        </div>
      </div>
    </section>
  );
}