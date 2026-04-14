import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface SpeakingEvent {
  id: number;
  title: string;
  event: string;
  date: string;
  location: string;
  image: string;
  imageAlt: string;
  description: string;
}

interface SpeakingCardProps {
  event: SpeakingEvent;
}

const SpeakingCard = ({ event }: SpeakingCardProps) => {
  return (
    <div className="group bg-surface/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:bg-surface/80 transition-all duration-500 hover:shadow-dramatic">
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={event.image}
          alt={event.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 text-text-secondary">
          <Icon name="CalendarIcon" size={16} />
          <span className="font-body text-xs">{event.date}</span>
          <span className="text-border">•</span>
          <Icon name="MapPinIcon" size={16} />
          <span className="font-body text-xs">{event.location}</span>
        </div>
        
        <h3 className="font-headline text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {event.title}
        </h3>
        
        <p className="font-cta text-sm font-semibold text-accent mb-3">
          {event.event}
        </p>
        
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default SpeakingCard;