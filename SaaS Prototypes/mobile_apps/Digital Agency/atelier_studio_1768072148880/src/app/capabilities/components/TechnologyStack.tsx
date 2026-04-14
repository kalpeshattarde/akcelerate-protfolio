import Icon from '@/components/ui/AppIcon';

export default function TechnologyStack() {
  const technologies = [
    {
      category: 'Design & Prototyping',
      tools: [
        { name: 'Figma', description: 'Interface design & prototyping' },
        { name: 'Adobe Creative Suite', description: 'Visual design & illustration' },
        { name: 'Principle', description: 'Animation & interaction design' },
        { name: 'Blender', description: '3D modeling & visualization' }
      ]
    },
    {
      category: 'Frontend Development',
      tools: [
        { name: 'React & Next.js', description: 'Modern web frameworks' },
        { name: 'TypeScript', description: 'Type-safe development' },
        { name: 'Tailwind CSS', description: 'Utility-first styling' },
        { name: 'Three.js', description: 'WebGL & 3D graphics' }
      ]
    },
    {
      category: 'Backend & Infrastructure',
      tools: [
        { name: 'Node.js', description: 'Server-side runtime' },
        { name: 'PostgreSQL', description: 'Relational database' },
        { name: 'AWS', description: 'Cloud infrastructure' },
        { name: 'Docker', description: 'Containerization' }
      ]
    },
    {
      category: 'Motion & Animation',
      tools: [
        { name: 'After Effects', description: 'Motion graphics' },
        { name: 'Cinema 4D', description: '3D animation' },
        { name: 'Lottie', description: 'Web animations' },
        { name: 'GSAP', description: 'JavaScript animation' }
      ]
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full font-cta text-sm font-medium text-secondary mb-4">
            Technology Stack
          </span>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tools of the<br />
            <span className="text-secondary">Modern Craftsperson</span>
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto">
            We leverage industry-leading tools and technologies, constantly evolving our stack to deliver cutting-edge solutions without sacrificing stability or performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technologies?.map((category, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg p-8 hover:border-secondary/30 hover:shadow-subtle transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary/10 border border-secondary/20 rounded-lg flex items-center justify-center">
                  <Icon name="CommandLineIcon" size={20} className="text-secondary" />
                </div>
                <h3 className="font-headline text-xl font-bold text-foreground">
                  {category?.category}
                </h3>
              </div>

              <div className="space-y-4">
                {category?.tools?.map((tool, toolIndex) => (
                  <div
                    key={toolIndex}
                    className="flex items-start gap-3 p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors duration-300"
                  >
                    <Icon name="CheckCircleIcon" size={18} className="text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-body text-sm font-semibold text-foreground mb-1">
                        {tool?.name}
                      </h4>
                      <p className="font-body text-xs text-text-secondary">
                        {tool?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Note */}
        <div className="mt-12 p-6 bg-muted/30 border border-border rounded-lg">
          <div className="flex items-start gap-4">
            <Icon name="InformationCircleIcon" size={24} className="text-accent flex-shrink-0" />
            <div>
              <h4 className="font-headline text-lg font-bold text-foreground mb-2">
                Technology Agnostic Approach
              </h4>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                While we have preferred tools, we're not dogmatic about technology choices. We select the right stack for each project based on requirements, scalability needs, and long-term maintainability. Our expertise spans a broader range of technologies than listed here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}