import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const FeaturesSection = ({ features }) => {
  return (
    <section className="py-20 bg-card">
      <div className="w-full px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-card-foreground mb-4 tracking-tight">
            WHY CHOOSE US
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience luxury fashion shopping with unmatched service and quality
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features?.map((feature) => (
            <div key={feature?.id} className="text-center group">
              {/* Icon Container */}
              <div className="w-20 h-20 bg-black/10 border-2 border-black/20 mx-auto mb-6 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300 hover-lift">
                <Icon 
                  name={feature?.icon} 
                  size={32} 
                  className="text-black group-hover:text-white transition-colors duration-300" 
                />
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-xl text-card-foreground mb-3 tracking-tight">
                {feature?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-heading font-bold text-card-foreground mb-2">500K+</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-heading font-bold text-card-foreground mb-2">50K+</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">Products Sold</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-heading font-bold text-card-foreground mb-2">99.9%</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-heading font-bold text-card-foreground mb-2">24/7</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSection.propTypes = {
  features: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      icon: PropTypes?.string?.isRequired
    })
  )?.isRequired
};

export default FeaturesSection;