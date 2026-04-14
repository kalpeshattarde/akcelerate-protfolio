import Icon from '@/components/ui/AppIcon';

const PhilosophySection = () => {
  const principles = [
    {
      icon: "SparklesIcon",
      title: "Intentional Design",
      description: "Every element serves a purpose. We believe in the power of restraint—what we choose not to include is as important as what we create."
    },
    {
      icon: "LightBulbIcon",
      title: "Strategic Innovation",
      description: "True innovation comes from deep understanding, not surface trends. We combine creative vision with technical mastery to deliver transformative experiences."
    },
    {
      icon: "HeartIcon",
      title: "Craft Mastery",
      description: "Exceptional digital experiences require meticulous attention to detail. We approach every project with the dedication of artisans and the precision of engineers."
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-surface overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Icon name="StarIcon" size={16} className="text-primary" />
            <span className="font-mono text-xs text-primary tracking-wider">OUR PHILOSOPHY</span>
          </div>

          <h2 className="font-headline text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Confident Restraint
            <br />
            Meets Bold Vision
          </h2>

          <p className="font-body text-lg text-text-secondary leading-relaxed">
            We occupy the space between luxury fashion editorial and cutting-edge technology, creating digital experiences that transcend typical portfolio work to become immersive brand narratives.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="group relative p-8 bg-muted/30 border border-border rounded-xl hover:bg-muted/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 mb-6 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <Icon 
                  name={principle.icon as any} 
                  size={28} 
                  className="text-primary" 
                />
              </div>

              {/* Content */}
              <h3 className="font-headline text-2xl font-bold text-foreground mb-4">
                {principle.title}
              </h3>

              <p className="font-body text-text-secondary leading-relaxed">
                {principle.description}
              </p>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;