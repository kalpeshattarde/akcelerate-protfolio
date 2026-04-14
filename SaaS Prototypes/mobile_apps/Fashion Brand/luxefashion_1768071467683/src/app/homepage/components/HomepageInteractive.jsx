'use client';

import Header from '@/components/common/Header';
import HeroSection from './HeroSection';
import TopPicksSection from './TopPicksSection';
import EditorialSection from './EditorialSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import BlogSection from './BlogSection';
import NewsletterSection from './NewsletterSection';
import Footer from './Footer';
import PropTypes from 'prop-types';

const HomepageInteractive = ({ pageData }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section id="hero" className="scroll-section">
          <HeroSection heroData={pageData?.heroData} />
        </section>
        
        <section id="products" className="scroll-section">
          <TopPicksSection products={pageData?.topPicks} />
        </section>
        
        <section id="editorial" className="scroll-section">
          <EditorialSection editorialItems={pageData?.editorialItems} />
        </section>
        
        <section id="features" className="scroll-section">
          <FeaturesSection features={pageData?.features} />
        </section>
        
        <section id="testimonials" className="scroll-section">
          <TestimonialsSection testimonials={pageData?.testimonials} />
        </section>
        
        <section id="blog" className="scroll-section">
          <BlogSection blogPosts={pageData?.blogPosts} />
        </section>
        
        <section id="newsletter" className="scroll-section-auto">
          <NewsletterSection newsletterData={pageData?.newsletterData} />
        </section>
        
        <section id="footer" className="scroll-section-end">
          <Footer footerData={pageData?.footerData} />
        </section>
      </main>
    </>
  );
};

HomepageInteractive.propTypes = {
  pageData: PropTypes?.shape({
    heroData: PropTypes?.object?.isRequired,
    topPicks: PropTypes?.array?.isRequired,
    editorialItems: PropTypes?.array?.isRequired,
    features: PropTypes?.array?.isRequired,
    testimonials: PropTypes?.array?.isRequired,
    blogPosts: PropTypes?.array?.isRequired,
    newsletterData: PropTypes?.object?.isRequired,
    footerData: PropTypes?.object?.isRequired
  })?.isRequired
};

export default HomepageInteractive;