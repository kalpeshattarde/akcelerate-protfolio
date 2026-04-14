import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import PropTypes from 'prop-types';

const HeroSection = ({ heroData }) => {
  return (
    <section className="relative min-h-screen bg-primary overflow-hidden">
      {/* Background Ghost Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[20vw] font-heading font-bold text-white opacity-5 select-none whitespace-nowrap">
          LUXURY
        </span>
      </div>
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20">
            {/* Left Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-6 leading-tight tracking-tight">
                {heroData?.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed text-[rgba(189,188,188,1)]">
                {heroData?.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/product-catalog"
                  className="bg-accent text-accent-foreground px-8 py-4 font-heading font-bold text-sm uppercase tracking-wide hover:bg-accent/90 transition-colors btn-press shadow-elevation-2">

                  {heroData?.primaryCta}
                </Link>
                <Link
                  href="/product-catalog"
                  className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 font-heading font-bold text-sm uppercase tracking-wide hover:bg-primary-foreground hover:text-primary transition-colors btn-press">

                  {heroData?.secondaryCta}
                </Link>
              </div>
            </div>

            {/* Right Images */}
            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {/* Main Model Image */}
                <div className="col-span-2 lg:col-span-1 relative overflow-hidden shadow-elevation-3">
                  <AppImage
                    src={heroData?.mainImage?.src}
                    alt={heroData?.mainImage?.alt}
                    className="w-full h-96 lg:h-[600px] object-cover" />
                </div>
                
                {/* Secondary Model Image */}
                <div className="col-span-2 lg:col-span-1 relative overflow-hidden shadow-elevation-3 lg:mt-20">
                  <AppImage
                    src={heroData?.secondaryImage?.src}
                    alt={heroData?.secondaryImage?.alt}
                    className="w-full h-80 lg:h-96 object-cover" />
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-4 -left-4 bg-background p-6 shadow-elevation-2 hidden lg:block">
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-foreground">500K+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

HeroSection.propTypes = {
  heroData: PropTypes?.shape({
    title: PropTypes?.string?.isRequired,
    subtitle: PropTypes?.string?.isRequired,
    primaryCta: PropTypes?.string?.isRequired,
    secondaryCta: PropTypes?.string?.isRequired,
    mainImage: PropTypes?.shape({
      src: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired
    })?.isRequired,
    secondaryImage: PropTypes?.shape({
      src: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired
    })?.isRequired
  })?.isRequired
};

export default HeroSection;