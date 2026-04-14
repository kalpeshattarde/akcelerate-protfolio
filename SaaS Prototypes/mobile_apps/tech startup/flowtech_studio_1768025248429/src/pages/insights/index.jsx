import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ContentPillars from './components/ContentPillars';
import FeaturedArticles from './components/FeaturedArticles';
import ResourceLibrary from './components/ResourceLibrary';
import TrendForecasting from './components/TrendForecasting';
import NewsletterSubscription from './components/NewsletterSubscription';

const InsightsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Insights & Knowledge Center | FlowTech Studio - Technology with Soul</title>
        <meta 
          name="description" 
          content="Explore FlowTech Studio's thought leadership on technology with purpose, digital craft innovation, sustainable practices, and human-centered design. Access whitepapers, frameworks, and industry insights." 
        />
        <meta name="keywords" content="technology insights, digital innovation, UX research, AI ethics, sustainable technology, design systems, thought leadership" />
        <meta property="og:title" content="Insights & Knowledge Center | FlowTech Studio" />
        <meta property="og:description" content="Discover cutting-edge insights on technology, design, and innovation. Join 25,000+ innovators accessing our research and frameworks." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/insights" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection />
          <ContentPillars />
          <FeaturedArticles />
          <TrendForecasting />
          <ResourceLibrary />
          <NewsletterSubscription />
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-primary via-secondary to-primary/80 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">FlowTech Studio</h3>
                    <p className="text-sm text-gray-200">Technology with Soul</p>
                  </div>
                </div>
                <p className="text-gray-200 leading-relaxed mb-6 max-w-md">
                  Sharing our journey of creating digital experiences that don't just function, 
                  but inspire. Stay connected for insights, trends, and behind-the-scenes stories.
                </p>
                <div className="flex space-x-4">
                  {['Linkedin', 'Twitter', 'Github', 'Medium']?.map((social) => (
                    <a key={social} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-300">
                      <span className="sr-only">{social}</span>
                      <div className="w-5 h-5 bg-white rounded-sm"></div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Topics</h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Technology Trends', path: '/insights#tech' },
                    { name: 'Design Principles', path: '/insights#design' },
                    { name: 'Case Studies', path: '/insights#cases' },
                    { name: 'Industry Insights', path: '/insights#industry' }
                  ]?.map((link) => (
                    <li key={link?.name}>
                      <a href={link?.path} className="text-gray-200 hover:text-white transition-colors duration-200">
                        {link?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
                <p className="text-gray-200 text-sm mb-4">
                  Get our latest insights delivered to your inbox.
                </p>
                <div className="flex space-x-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-gray-400"
                  />
                  <button className="px-4 py-2 bg-accent hover:bg-accent/80 rounded text-sm font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-200 text-sm">
                © {new Date()?.getFullYear()} FlowTech Studio. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-200 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-200 hover:text-white text-sm transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-200 hover:text-white text-sm transition-colors duration-200">
                  RSS Feed
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default InsightsPage;