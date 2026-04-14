import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const FeaturedWorkSection = () => {
  const featuredProjects = [
  {
    title: "Lumière Fashion House",
    category: "Brand Experience",
    description: "Reimagining luxury e-commerce through cinematic storytelling and editorial sophistication",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_192f04c07-1764782199808.png",
    alt: "Elegant fashion model in flowing white dress against minimalist studio backdrop with dramatic lighting",
    tags: ["E-Commerce", "Fashion", "WebGL"],
    link: "/work-portfolio"
  },
  {
    title: "Nexus Technology",
    category: "Digital Platform",
    description: "Transforming complex enterprise software into an intuitive, human-centered experience",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14d9c7ed0-1765220505039.png",
    alt: "Modern technology interface with holographic displays and futuristic blue lighting in dark environment",
    tags: ["SaaS", "UX Design", "Innovation"],
    link: "/work-portfolio"
  },
  {
    title: "Artisan Collective",
    category: "Cultural Platform",
    description: "Celebrating craftsmanship through an immersive digital gallery experience",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11d63b658-1764671124391.png",
    alt: "Contemporary art gallery interior with white walls displaying abstract paintings and sculptures under spotlights",
    tags: ["Culture", "Interactive", "3D"],
    link: "/work-portfolio"
  }];


  return (
    <section className="relative py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
              <Icon name="RectangleStackIcon" size={16} className="text-accent" />
              <span className="font-mono text-xs text-accent tracking-wider">FEATURED WORK</span>
            </div>

            <h2 className="font-headline text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Crafted Experiences
              <br />
              That Resonate
            </h2>
          </div>

          <Link
            href="/work-portfolio"
            className="group inline-flex items-center gap-2 text-primary font-cta font-semibold hover:gap-4 transition-all duration-300">

            View All Projects
            <Icon
              name="ArrowRightIcon"
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1" />

          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {featuredProjects?.map((project, index) =>
          <Link
            key={index}
            href={project?.link}
            className="group relative overflow-hidden rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-dramatic">

              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <AppImage
                src={project?.image}
                alt={project?.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary tracking-wider">
                    {project?.category}
                  </span>
                  <span className="text-border">•</span>
                  <div className="flex gap-2">
                    {project?.tags?.map((tag, tagIndex) =>
                  <span
                    key={tagIndex}
                    className="font-mono text-xs text-text-secondary">

                        {tag}
                      </span>
                  )}
                  </div>
                </div>

                <h3 className="font-headline text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project?.title}
                </h3>

                <p className="font-body text-text-secondary leading-relaxed">
                  {project?.description}
                </p>

                <div className="flex items-center gap-2 text-primary font-cta font-medium pt-2">
                  <span>View Case Study</span>
                  <Icon
                  name="ArrowRightIcon"
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-2" />

                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>);

};

export default FeaturedWorkSection;