import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import FacilityInteractive from './components/FacilityInteractive';

export const metadata: Metadata = {
  title: 'Facility - FitCore Elite',
  description: 'Explore our premium fitness facility with virtual tours, real-time equipment availability, class schedules, and world-class amenities designed for elite performance.',
};

export default function FacilityPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,136,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,153,255,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 sm:px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-medium text-sm sm:text-base">Premium Facility Experience</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
              Elite Training
              <br />
              <span className="text-primary">Environment</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed px-4">
              Step into the future of fitness with our state-of-the-art facility featuring cutting-edge equipment, 
              premium amenities, and an environment designed to elevate your performance to elite levels.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base sm:text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-neon">
                Schedule Facility Tour
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-lg font-semibold text-base sm:text-lg hover:bg-primary/10 transition-all duration-300">
                View Virtual Tour
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Stats - Responsive grid with consistent spacing */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 text-center hover:border-primary/20 transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">50,000</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Square Feet</div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 text-center hover:border-primary/20 transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">300+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Premium Equipment</div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 text-center hover:border-primary/20 transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Luxury Amenities</div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 text-center hover:border-primary/20 transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Access Available</div>
            </div>
          </div>
        </div>
      </section>

      <FacilityInteractive />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Experience <span className="text-primary">Elite Fitness</span>?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule your personal facility tour and discover why FitCore Elite is the premier destination for serious fitness enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base sm:text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-neon">
              Book Your Tour Today
            </button>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-card border border-border text-foreground rounded-lg font-semibold text-base sm:text-lg hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
              View Membership Options
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}