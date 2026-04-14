import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const InsightsSection = () => {
  const insights = [
  {
    category: "Design Philosophy",
    title: "The Art of Digital Restraint",
    excerpt: "Exploring how intentional minimalism creates more impactful user experiences in an age of digital noise.",
    date: "December 15, 2024",
    readTime: "8 min read",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_170c27ace-1764875087683.png",
    alt: "Minimalist workspace with clean desk, single plant, and natural lighting creating serene atmosphere",
    link: "/insights"
  },
  {
    category: "Technology",
    title: "WebGL and the Future of Interactive Storytelling",
    excerpt: "How 3D web experiences are transforming brand narratives and creating deeper emotional connections.",
    date: "December 10, 2024",
    readTime: "12 min read",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_189860fe3-1765197581982.png",
    alt: "Abstract 3D geometric shapes with vibrant colors and dynamic lighting in digital space",
    link: "/insights"
  },
  {
    category: "Strategy",
    title: "Building Brands That Transcend Trends",
    excerpt: "Strategic approaches to creating timeless digital experiences that remain relevant beyond fleeting design trends.",
    date: "December 5, 2024",
    readTime: "10 min read",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_178526225-1765178285821.png",
    alt: "Timeless architectural design with clean lines and enduring aesthetic principles",
    link: "/insights"
  }];


  return (
    <section className="relative py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full mb-6">
              <Icon name="LightBulbIcon" size={16} className="text-secondary" />
              <span className="font-mono text-xs text-secondary tracking-wider">INSIGHTS</span>
            </div>

            <h2 className="font-headline text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Thoughts on Craft<br />& Innovation
            </h2>
          </div>

          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 text-primary font-cta font-semibold hover:gap-4 transition-all duration-300">

            Read All Articles
            <Icon
              name="ArrowRightIcon"
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1" />

          </Link>
        </div>

        {/* Insights Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {insights?.map((insight, index) =>
          <Link
            key={index}
            href={insight?.link}
            className="group relative overflow-hidden rounded-2xl bg-background border border-border hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-dramatic">

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <AppImage
                src={insight?.image}
                alt={insight?.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-secondary/90 backdrop-blur-sm rounded-full">
                  <span className="font-mono text-xs text-background font-semibold">
                    {insight?.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <h3 className="font-headline text-2xl font-bold text-foreground group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                  {insight?.title}
                </h3>

                <p className="font-body text-text-secondary leading-relaxed line-clamp-3">
                  {insight?.excerpt}
                </p>

                <div className="flex items-center gap-4 pt-2 text-sm text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Icon name="CalendarIcon" size={16} />
                    <span className="font-mono text-xs">{insight?.date}</span>
                  </div>
                  <span className="text-border">•</span>
                  <div className="flex items-center gap-2">
                    <Icon name="ClockIcon" size={16} />
                    <span className="font-mono text-xs">{insight?.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-secondary font-cta font-medium pt-2">
                  <span>Read Article</span>
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

export default InsightsSection;