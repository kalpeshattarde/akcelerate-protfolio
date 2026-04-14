import AppImage from '@/components/ui/AppImage';

interface PressItem {
  id: number;
  publication: string;
  logo: string;
  logoAlt: string;
  title: string;
  date: string;
  excerpt: string;
  url: string;
}

interface PressCardProps {
  press: PressItem;
}

const PressCard = ({ press }: PressCardProps) => {
  return (
    <div className="group bg-surface/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:bg-surface/80 transition-all duration-500 hover:shadow-dramatic">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
            <AppImage
              src={press.logo}
              alt={press.logoAlt}
              className="w-full h-full object-contain p-2"
            />
          </div>
          <div>
            <p className="font-cta text-sm font-semibold text-primary">
              {press.publication}
            </p>
            <p className="font-body text-xs text-text-secondary">
              {press.date}
            </p>
          </div>
        </div>
        
        <h3 className="font-headline text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {press.title}
        </h3>
        
        <p className="font-body text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
          {press.excerpt}
        </p>
        
        <a
          href={press.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-cta text-sm font-semibold text-accent hover:text-primary transition-colors duration-300"
        >
          Read Article
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
};

export default PressCard;