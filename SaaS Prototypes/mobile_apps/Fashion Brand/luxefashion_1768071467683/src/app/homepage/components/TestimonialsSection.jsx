import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const TestimonialsSection = ({ testimonials }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="StarIcon"
        size={16}
        variant={index < rating ? 'solid' : 'outline'}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="py-20 bg-background">
      <div className="w-full px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4 tracking-tight">
            CUSTOMER STORIES
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our fashion-forward customers have to say about their LuxeFashion experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="bg-card border border-border p-8 shadow-elevation-1 hover:shadow-elevation-2 transition-all hover-lift">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {renderStars(testimonial?.rating)}
              </div>

              {/* Review Text */}
              <blockquote className="text-card-foreground mb-6 leading-relaxed">
                "{testimonial?.review}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={testimonial?.avatar}
                    alt={testimonial?.avatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-heading font-bold text-card-foreground">
                    {testimonial?.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial?.location}
                  </div>
                </div>
              </div>

              {/* Purchase Info */}
              {testimonial?.purchaseInfo && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Verified Purchase: {testimonial?.purchaseInfo}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="ShieldCheckIcon" size={20} className="text-success" />
              <span className="text-sm font-semibold">Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="StarIcon" size={20} className="text-yellow-400" variant="solid" />
              <span className="text-sm font-semibold">4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="UserGroupIcon" size={20} className="text-accent" />
              <span className="text-sm font-semibold">500K+ Happy Customers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

TestimonialsSection.propTypes = {
  testimonials: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      location: PropTypes?.string?.isRequired,
      rating: PropTypes?.number?.isRequired,
      review: PropTypes?.string?.isRequired,
      avatar: PropTypes?.string?.isRequired,
      avatarAlt: PropTypes?.string?.isRequired,
      purchaseInfo: PropTypes?.string
    })
  )?.isRequired
};

export default TestimonialsSection;