import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  imageAlt: string;
  quote: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-surface/80 transition-all duration-500 hover:shadow-dramatic">
      <Icon name="ChatBubbleLeftRightIcon" size={32} className="text-primary/30 mb-4" />
      
      <p className="font-body text-base text-foreground leading-relaxed mb-6 italic">
        "{testimonial.quote}"
      </p>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <AppImage
            src={testimonial.image}
            alt={testimonial.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-cta text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="font-body text-xs text-text-secondary">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;