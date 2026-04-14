import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface FeaturedInsightProps {
  insight: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    readTime: number;
    publishDate: string;
    author: {
      name: string;
      role: string;
      image: string;
      alt: string;
    };
    image: string;
    alt: string;
    slug: string;
  };
}

const FeaturedInsight = ({ insight }: FeaturedInsightProps) => {
  return (
    <article className="group">
      <Link href={`/insights/${insight.slug}`} className="block">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative overflow-hidden rounded-md aspect-[4/3]">
            <AppImage
              src={insight.image}
              alt={insight.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-confident group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm font-cta text-text-secondary">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                Featured
              </span>
              <span className="text-primary">{insight.category}</span>
              <span className="flex items-center gap-1">
                <Icon name="ClockIcon" size={16} />
                {insight.readTime} min read
              </span>
            </div>

            <h2 className="font-headline text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
              {insight.title}
            </h2>

            <p className="font-body text-lg text-text-secondary leading-relaxed">
              {insight.excerpt}
            </p>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <AppImage
                    src={insight.author.image}
                    alt={insight.author.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-cta text-base font-medium text-foreground">
                    {insight.author.name}
                  </p>
                  <p className="font-body text-sm text-text-secondary">
                    {insight.author.role}
                  </p>
                </div>
              </div>

              <span className="font-body text-sm text-text-secondary">
                {insight.publishDate}
              </span>
            </div>

            <div className="flex items-center gap-2 text-primary font-cta font-semibold group-hover:gap-4 transition-all duration-300">
              Read Article
              <Icon name="ArrowRightIcon" size={20} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default FeaturedInsight;