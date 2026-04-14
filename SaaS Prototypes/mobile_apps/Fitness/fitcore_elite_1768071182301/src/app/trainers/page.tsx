import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import TrainerStats from './components/TrainerStats';
import TrainersInteractive from './components/TrainersInteractive';

export const metadata: Metadata = {
  title: 'Elite Trainers - FitCore Elite',
  description: 'Meet our certified elite trainers specializing in strength training, performance coaching, and personalized fitness programs. Book consultations and transform your fitness journey.',
};

export default function TrainersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Meet Your <span className="text-primary">Elite</span> Trainers
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Our certified elite trainers combine cutting-edge science with proven methodologies to deliver exceptional results. Each trainer brings specialized expertise and a passion for transforming lives through fitness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300">
                Find Your Trainer
              </button>
              <button className="px-8 py-4 border border-border text-foreground rounded-lg font-semibold text-lg hover:bg-muted/50 transition-colors duration-300">
                Watch Trainer Videos
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <TrainerStats />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <TrainersInteractive />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 lg:px-8 bg-card/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Choose FitCore Elite Trainers?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our trainers are more than fitness professionals—they're performance architects dedicated to your success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Elite Certifications</h3>
                <p className="text-muted-foreground">
                  All trainers hold advanced certifications from leading organizations like NSCA, ACSM, and NASM.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors duration-300">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Science-Based Approach</h3>
                <p className="text-muted-foreground">
                  Evidence-based training methodologies backed by the latest research in exercise science.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors duration-300">
                <div className="w-16 h-16 bg-warning/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Personalized Programs</h3>
                <p className="text-muted-foreground">
                  Customized training plans tailored to your specific goals, fitness level, and lifestyle.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors duration-300">
                <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Advanced analytics and monitoring to track your progress and optimize your results.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors duration-300">
                <div className="w-16 h-16 bg-error/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Ongoing Support</h3>
                <p className="text-muted-foreground">
                  Continuous guidance, motivation, and support throughout your entire fitness journey.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Proven Results</h3>
                <p className="text-muted-foreground">
                  Track record of helping clients achieve remarkable transformations and performance goals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}