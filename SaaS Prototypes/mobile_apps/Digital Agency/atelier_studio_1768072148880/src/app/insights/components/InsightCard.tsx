import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface InsightCardProps {
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

const InsightCard = ({ insight }: InsightCardProps) => {
  return (
    <article className="group">
      <Link href={`/insights/${insight.slug}`} className="block">
        <div className="relative overflow-hidden rounded-md mb-6 aspect-[16/10]">
          <AppImage
            src={insight.image}
            alt={insight.alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-confident group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs font-cta text-text-secondary">
            <span className="text-primary">{insight.category}</span>
            <span className="flex items-center gap-1">
              <Icon name="ClockIcon" size={14} />
              {insight.readTime} min read
            </span>
            <span>{insight.publishDate}</span>
          </div>

          <h3 className="font-headline text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {insight.title}
          </h3>

          <p className="font-body text-base text-text-secondary line-clamp-3 leading-relaxed">
            {insight.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <AppImage
                src={insight.author.image}
                alt={insight.author.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-cta text-sm font-medium text-foreground">
                {insight.author.name}
              </p>
              <p className="font-body text-xs text-text-secondary">
                {insight.author.role}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default InsightCard;