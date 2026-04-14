import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CapabilitiesSection = () => {
  const capabilities = [
    {
      icon: "PaintBrushIcon",
      title: "Brand Experience",
      description: "Crafting cohesive brand narratives that resonate across every digital touchpoint",
      services: ["Brand Strategy", "Visual Identity", "Design Systems"]
    },
    {
      icon: "CodeBracketIcon",
      title: "Digital Platforms",
      description: "Building sophisticated web experiences with cutting-edge technology and timeless design",
      services: ["Web Development", "E-Commerce", "Progressive Web Apps"]
    },
    {
      icon: "CubeTransparentIcon",
      title: "Interactive Experiences",
      description: "Creating immersive 3D and WebGL experiences that push the boundaries of digital storytelling",
      services: ["3D Design", "WebGL", "Motion Design"]
    },
    {
      icon: "DevicePhoneMobileIcon",
      title: "Mobile Innovation",
      description: "Designing native and hybrid mobile applications that prioritize user experience and performance",
      services: ["iOS Development", "Android Apps", "Cross-Platform"]
    },
    {
      icon: "ChartBarIcon",
      title: "Strategic Consulting",
      description: "Providing data-driven insights and strategic guidance to elevate your digital presence",
      services: ["UX Research", "Analytics", "Optimization"]
    },
    {
      icon: "RocketLaunchIcon",
      title: "Digital Marketing",
      description: "Amplifying your brand through targeted campaigns and compelling content strategies",
      services: ["Content Strategy", "SEO", "Social Media"]
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-background via-surface to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
            <Icon name="CubeIcon" size={16} className="text-accent" />
            <span className="font-mono text-xs text-accent tracking-wider">CAPABILITIES</span>
          </div>

          <h2 className="font-headline text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Artistic Disciplines<br />Meet Technical Mastery
          </h2>

          <p className="font-body text-lg text-text-secondary leading-relaxed">
            We approach every service as an artistic discipline, combining creative vision with technical excellence to deliver transformative digital experiences.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group relative p-8 bg-muted/30 border border-border rounded-xl hover:bg-muted/50 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 mb-6 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                <Icon 
                  name={capability.icon as any} 
                  size={28} 
                  className="text-accent" 
                />
              </div>

              {/* Content */}
              <h3 className="font-headline text-2xl font-bold text-foreground mb-4">
                {capability.title}
              </h3>

              <p className="font-body text-text-secondary leading-relaxed mb-6">
                {capability.description}
              </p>

              {/* Services List */}
              <div className="flex flex-wrap gap-2">
                {capability.services.map((service, serviceIndex) => (
                  <span
                    key={serviceIndex}
                    className="px-3 py-1 bg-surface border border-border rounded-full font-mono text-xs text-text-secondary"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/capabilities"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-cta font-semibold rounded-md hover:bg-accent/90 hover:-translate-y-1 hover:shadow-dramatic transition-all duration-300"
          >
            Explore All Capabilities
            <Icon 
              name="ArrowRightIcon" 
              size={20} 
              className="transition-transform duration-300 group-hover:translate-x-1" 
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;