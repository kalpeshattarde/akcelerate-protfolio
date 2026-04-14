import Icon from '@/components/ui/AppIcon';

const RecognitionSection = () => {
  const awards = [
    {
      icon: "TrophyIcon",
      title: "Awwwards Site of the Day",
      count: "12x Winner",
      year: "2023-2024"
    },
    {
      icon: "StarIcon",
      title: "CSS Design Awards",
      count: "Best UI Design",
      year: "2024"
    },
    {
      icon: "SparklesIcon",
      title: "FWA of the Month",
      count: "3x Featured",
      year: "2023-2024"
    },
    {
      icon: "FireIcon",
      title: "Webby Awards",
      count: "Honoree",
      year: "2024"
    }
  ];

  const clients = [
    "Lumière Fashion",
    "Nexus Tech",
    "Artisan Collective",
    "Meridian Capital",
    "Zenith Hospitality",
    "Prism Studios"
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Awards Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Icon name="TrophyIcon" size={16} className="text-primary" />
              <span className="font-mono text-xs text-primary tracking-wider">RECOGNITION</span>
            </div>

            <h2 className="font-headline text-4xl lg:text-5xl font-bold text-foreground">
              Award-Winning Excellence
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <div
                key={index}
                className="group relative p-6 bg-surface/50 border border-border rounded-xl hover:bg-surface hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon 
                    name={award.icon as any} 
                    size={24} 
                    className="text-primary" 
                  />
                </div>

                <h3 className="font-cta font-semibold text-foreground mb-2">
                  {award.title}
                </h3>

                <div className="font-body text-sm text-text-secondary mb-1">
                  {award.count}
                </div>

                <div className="font-mono text-xs text-primary">
                  {award.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <div className="border-t border-border pt-16">
          <div className="text-center mb-12">
            <h3 className="font-headline text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="font-body text-text-secondary">
              Collaborating with visionary brands to create exceptional digital experiences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-300"
              >
                <span className="font-cta font-semibold text-sm text-text-secondary hover:text-foreground transition-colors duration-300 text-center">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecognitionSection;