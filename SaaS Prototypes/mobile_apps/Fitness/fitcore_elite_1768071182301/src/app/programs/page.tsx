import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProgramsInteractive from './components/ProgramsInteractive';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'Elite Programs - FitCore Elite',
  description: 'Discover our comprehensive training ecosystem with Strength Elite, Cardio Warrior, and Hybrid Athlete programs featuring detailed progression tracking and community leaderboards.',
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,136,0.1),transparent_50%)]"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
                <Icon name="AcademicCapIcon" size={16} className="text-primary" />
                <span className="text-sm font-semibold text-primary">ELITE TRAINING PROGRAMS</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Elite Programs
                <span className="block text-primary">Ecosystem</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
                Discover our comprehensive training ecosystem designed for serious athletes. Each program features 
                detailed progression tracking, extensive video libraries, and competitive community leaderboards 
                to elevate your performance to elite levels.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="flex flex-col items-center p-6 bg-card/50 border border-border rounded-xl">
                  <div className="w-12 h-12 bg-red-400/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="FireIcon" size={24} className="text-red-400" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Strength Elite</h3>
                  <p className="text-sm text-muted-foreground text-center">Advanced powerlifting and strength development</p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-card/50 border border-border rounded-xl">
                  <div className="w-12 h-12 bg-blue-400/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="BoltIcon" size={24} className="text-blue-400" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Cardio Warrior</h3>
                  <p className="text-sm text-muted-foreground text-center">High-intensity endurance and conditioning</p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-card/50 border border-border rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="StarIcon" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Hybrid Athlete</h3>
                  <p className="text-sm text-muted-foreground text-center">Complete performance system combining all elements</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-muted-foreground font-semibold">Elite Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">192</div>
                  <div className="text-sm text-muted-foreground font-semibold">Total Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground font-semibold">Video Tutorials</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground font-semibold">Progress Tracking</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Programs Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ProgramsInteractive />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-32 bg-card/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Advanced Program Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every program includes cutting-edge features designed to maximize your training efficiency and results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: 'ChartBarIcon',
                  title: 'Progression Tracking',
                  description: 'Advanced analytics track every rep, set, and milestone with detailed performance metrics and trend analysis.',
                  color: 'text-primary'
                },
                {
                  icon: 'VideoCameraIcon',
                  title: 'Video Libraries',
                  description: 'Comprehensive technique instruction with HD videos, slow-motion analysis, and expert commentary.',
                  color: 'text-blue-400'
                },
                {
                  icon: 'TrophyIcon',
                  title: 'Community Leaderboards',
                  description: 'Compete with fellow athletes, track rankings, and celebrate achievements in our elite community.',
                  color: 'text-yellow-400'
                },
                {
                  icon: 'ClipboardDocumentCheckIcon',
                  title: 'Skill Assessments',
                  description: 'Regular evaluations ensure proper progression and identify areas for focused improvement.',
                  color: 'text-red-400'
                },
                {
                  icon: 'ClockIcon',
                  title: 'Time Optimization',
                  description: 'Efficient workout structures maximize results while respecting your busy schedule and commitments.',
                  color: 'text-green-400'
                },
                {
                  icon: 'CogIcon',
                  title: 'Equipment Guidance',
                  description: 'Detailed equipment requirements and alternatives ensure you have everything needed for success.',
                  color: 'text-purple-400'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300 group">
                  <div className={`w-12 h-12 ${feature.color.replace('text-', 'bg-')}/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={feature.icon as any} size={24} className={feature.color} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 border border-primary/20">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Ready to Begin Your Elite Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Take our assessment to discover which program aligns with your goals, or explore our comparison matrix 
                to make an informed decision about your training path.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/25">
                  Start Assessment
                </button>
                <button className="px-8 py-4 bg-card border border-border text-foreground rounded-lg font-semibold hover:border-primary/50 hover:bg-card/80 transition-all duration-300">
                  Compare Programs
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}