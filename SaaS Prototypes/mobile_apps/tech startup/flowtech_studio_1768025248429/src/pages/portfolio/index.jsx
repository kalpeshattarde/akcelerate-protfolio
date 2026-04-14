import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import FilterTabs from './components/FilterTabs';
import ProjectModal from './components/ProjectModal';
import TechStackVisualization from './components/TechStackVisualization';
import ClientSuccessStories from './components/ClientSuccessStories';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Mock portfolio data
  const portfolioProjects = [
  {
    id: 1,
    title: "AI-Powered E-Commerce Platform",
    category: "web-app",
    description: "Revolutionary shopping experience with personalized AI recommendations and seamless checkout flow that increased conversion rates by 340%.",
    fullDescription: `This comprehensive e-commerce platform represents the future of online retail, combining artificial intelligence with intuitive user experience design. Built for a leading fashion retailer, the platform processes over 100,000 daily transactions while maintaining sub-second response times.\n\nThe AI recommendation engine analyzes user behavior, purchase history, and real-time trends to deliver personalized product suggestions that feel natural and helpful rather than intrusive. The result is a shopping experience that customers describe as 'mind-reading' in its accuracy.`,
    challenge: "The client's legacy e-commerce system was struggling with scalability issues, poor mobile experience, and conversion rates below industry standards. They needed a complete digital transformation that could handle Black Friday traffic spikes while providing personalized experiences for each customer.",
    solution: "We architected a headless commerce solution using React and Node.js, integrated with machine learning APIs for real-time personalization. The platform features progressive web app capabilities, advanced caching strategies, and microservices architecture for ultimate scalability and performance.",
    image: "https://images.unsplash.com/photo-1733232679107-9c9957c1affa",
    imageAlt: "Modern e-commerce interface showing AI-powered product recommendations on desktop and mobile screens",
    client: {
      name: "StyleForward",
      industry: "Fashion Retail",
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_177bbaa26-1762235697829.png",
      logoAlt: "StyleForward logo featuring elegant typography in black and gold"
    },
    techStack: ["React", "Node.js", "TypeScript", "GraphQL", "PostgreSQL", "Redis", "AWS"],
    metrics: [
    { label: "Conversion Rate", value: "+340%" },
    { label: "Page Load Speed", value: "0.8s" },
    { label: "Mobile Traffic", value: "+180%" },
    { label: "Customer Satisfaction", value: "4.9/5" }],

    tags: ["E-commerce", "AI/ML", "Mobile-First", "Performance", "Personalization"],
    rating: 4.9,
    duration: "8 months",
    teamSize: 12,
    completedDate: "March 2024",
    liveUrl: "https://styleforward.com",
    testimonial: {
      name: "Jennifer Martinez",
      role: "VP of Digital Experience",
      avatar: "https://images.unsplash.com/photo-1563220599-bc8cb877de5d",
      avatarAlt: "Professional headshot of Hispanic woman with long dark hair in business attire",
      quote: "FlowTech Studio didn\'t just build us a website—they created a digital experience that our customers love and our competitors envy. The AI recommendations feel magical."
    }
  },
  {
    id: 2,
    title: "Healthcare Management System",
    category: "enterprise",
    description: "HIPAA-compliant patient management platform serving 50,000+ users with real-time collaboration and advanced analytics.",
    fullDescription: `A comprehensive healthcare management system designed to streamline patient care workflows while maintaining the highest security standards. This platform serves as the digital backbone for a network of medical facilities, enabling seamless communication between healthcare providers and improving patient outcomes through data-driven insights.\n\nThe system integrates with existing EHR systems, provides real-time patient monitoring capabilities, and includes advanced analytics for population health management. Every interaction is designed with both healthcare providers and patients in mind, ensuring efficiency without sacrificing the human touch that's essential in healthcare.`,
    challenge: "Healthcare providers were struggling with fragmented systems, paper-based processes, and compliance challenges. They needed a unified platform that could handle sensitive patient data while improving care coordination and reducing administrative burden.",
    solution: "We developed a cloud-native platform with end-to-end encryption, role-based access controls, and seamless EHR integration. The system features real-time notifications, automated workflows, and comprehensive audit trails to ensure HIPAA compliance while improving operational efficiency.",
    image: "https://images.unsplash.com/photo-1573311525852-81c1a0b8d03c",
    imageAlt: "Clean healthcare dashboard interface showing patient data, charts, and medical analytics on multiple devices",
    client: {
      name: "MedConnect Solutions",
      industry: "Healthcare Technology",
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1b1e55f49-1762235698300.png",
      logoAlt: "MedConnect Solutions medical cross logo in blue and white with modern design"
    },
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "WebRTC", "HL7 FHIR"],
    metrics: [
    { label: "Active Users", value: "50K+" },
    { label: "Uptime", value: "99.9%" },
    { label: "Data Security", value: "100%" },
    { label: "Response Time", value: "< 1s" }],

    tags: ["Healthcare", "HIPAA", "Enterprise", "Real-time", "Analytics"],
    rating: 4.8,
    duration: "12 months",
    teamSize: 15,
    completedDate: "January 2024",
    testimonial: {
      name: "Dr. Michael Chen",
      role: "Chief Medical Officer",
      avatar: "https://images.unsplash.com/photo-1659353887488-b3c443982a57",
      avatarAlt: "Professional headshot of Asian male doctor with glasses in white medical coat"
    }
  },
  {
    id: 3,
    title: "FinTech Mobile Banking App",
    category: "mobile",
    description: "Next-generation mobile banking experience with biometric security and AI-powered financial insights for modern consumers.",
    fullDescription: `A revolutionary mobile banking application that redefines how users interact with their finances. Built for a forward-thinking credit union, this app combines cutting-edge security with intuitive design to create a banking experience that users actually enjoy.\n\nThe app features advanced biometric authentication, real-time transaction notifications, and AI-powered spending insights that help users make better financial decisions. Every screen is optimized for accessibility and ease of use, making complex financial operations feel simple and secure.`,
    challenge: "Traditional banking apps were failing to engage younger demographics who expected seamless, secure, and intelligent financial tools. The client needed to modernize their digital presence while maintaining bank-level security and regulatory compliance.",
    solution: "We created a React Native application with advanced biometric security, real-time fraud detection, and personalized financial coaching features. The app includes voice commands, dark mode support, and offline capabilities for essential banking functions.",
    image: "https://images.unsplash.com/photo-1676245437659-2a05627080e4",
    imageAlt: "Sleek mobile banking app interface showing account balance, transactions, and financial insights on smartphone",
    client: {
      name: "NextGen Credit Union",
      industry: "Financial Services",
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_16e90b910-1762235700774.png",
      logoAlt: "NextGen Credit Union logo with modern geometric design in green and blue"
    },
    techStack: ["React Native", "Node.js", "MongoDB", "Firebase", "Plaid API", "Face ID", "Touch ID"],
    metrics: [
    { label: "App Store Rating", value: "4.8/5" },
    { label: "Daily Active Users", value: "85K+" },
    { label: "Transaction Volume", value: "$2.5M" },
    { label: "Security Score", value: "100%" }],

    tags: ["FinTech", "Mobile", "Security", "AI", "Biometrics"],
    rating: 4.8,
    duration: "10 months",
    teamSize: 10,
    completedDate: "February 2024",
    testimonial: {
      name: "Sarah Johnson",
      role: "Head of Digital Innovation",
      avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
      avatarAlt: "Professional headshot of blonde woman in navy business suit smiling at camera"
    }
  },
  {
    id: 4,
    title: "Smart City IoT Dashboard",
    category: "dashboard",
    description: "Real-time city management platform processing 1M+ IoT sensor data points for traffic, energy, and environmental monitoring.",
    fullDescription: `An intelligent city management platform that transforms raw IoT data into actionable insights for urban planners and city officials. This comprehensive dashboard monitors everything from traffic patterns to air quality, enabling data-driven decisions that improve quality of life for residents.\n\nThe system processes over one million data points daily from sensors throughout the city, using machine learning algorithms to predict trends and identify potential issues before they become problems. The interface is designed for both technical operators and city officials, presenting complex data in an accessible and actionable format.`,
    challenge: "City officials were overwhelmed by disparate data sources and lacked real-time visibility into critical infrastructure. They needed a unified platform that could process massive amounts of IoT data while providing clear, actionable insights for decision-making.",
    solution: "We built a scalable data processing pipeline using microservices architecture, real-time analytics, and interactive data visualizations. The platform includes predictive modeling, automated alerting, and mobile-responsive dashboards for field operations.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    imageAlt: "Comprehensive smart city dashboard showing real-time traffic, energy, and environmental data with interactive maps and charts",
    client: {
      name: "Metro City Council",
      industry: "Government & Public Sector",
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dcd42f2a-1762235698858.png",
      logoAlt: "Metro City Council official seal with civic building silhouette in blue and gold"
    },
    techStack: ["React", "D3.js", "Python", "Apache Kafka", "InfluxDB", "Docker", "Kubernetes"],
    metrics: [
    { label: "Data Points/Day", value: "1M+" },
    { label: "Response Time", value: "< 500ms" },
    { label: "Uptime", value: "99.95%" },
    { label: "Cost Savings", value: "$2.3M" }],

    tags: ["IoT", "Smart City", "Real-time", "Analytics", "Government"],
    rating: 4.9,
    duration: "14 months",
    teamSize: 18,
    completedDate: "December 2023",
    testimonial: {
      name: "Robert Thompson",
      role: "Director of Smart City Initiatives",
      avatar: "https://images.unsplash.com/photo-1714974528889-d51109fb6ae9",
      avatarAlt: "Professional headshot of middle-aged man with gray hair in dark suit and tie"
    }
  },
  {
    id: 5,
    title: "EdTech Learning Platform",
    category: "web-app",
    description: "Interactive learning management system with AI-powered personalization serving 100K+ students and educators globally.",
    fullDescription: `A comprehensive educational technology platform that revolutionizes online learning through personalized AI-driven experiences. Designed for both K-12 and higher education institutions, this platform adapts to each student's learning style and pace while providing educators with powerful tools for curriculum management and student assessment.\n\nThe system includes interactive content creation tools, real-time collaboration features, and advanced analytics that help educators identify students who need additional support. Accessibility is built into every feature, ensuring that all students can participate fully in the digital learning experience.`,
    challenge: "Educational institutions were struggling with one-size-fits-all learning platforms that failed to engage students or provide meaningful insights to educators. They needed a solution that could personalize learning while maintaining academic rigor and accessibility standards.",
    solution: "We developed an adaptive learning platform with AI-powered content recommendations, interactive multimedia support, and comprehensive accessibility features. The system includes real-time collaboration tools, automated grading, and detailed learning analytics for continuous improvement.",
    image: "https://images.unsplash.com/photo-1653566031295-af3f032e0350",
    imageAlt: "Modern educational platform interface showing interactive lessons, student progress tracking, and collaborative learning tools",
    client: {
      name: "EduFuture Academy",
      industry: "Education Technology",
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1853e71bc-1762235701113.png",
      logoAlt: "EduFuture Academy logo featuring open book design with graduation cap in purple and gold"
    },
    techStack: ["React", "Node.js", "MongoDB", "WebRTC", "TensorFlow", "AWS", "Elasticsearch"],
    metrics: [
    { label: "Active Students", value: "100K+" },
    { label: "Course Completion", value: "+45%" },
    { label: "Engagement Rate", value: "92%" },
    { label: "Accessibility Score", value: "AAA" }],

    tags: ["EdTech", "AI/ML", "Accessibility", "Collaboration", "Analytics"],
    rating: 4.7,
    duration: "11 months",
    teamSize: 14,
    completedDate: "April 2024",
    testimonial: {
      name: "Dr. Lisa Park",
      role: "VP of Academic Technology",
      avatar: "https://images.unsplash.com/photo-1654727169791-7f46d0dfc1a3",
      avatarAlt: "Professional headshot of Asian woman with short black hair wearing glasses and blue blazer"
    }
  },
  {
    id: 6,
    title: "Logistics Optimization Platform",
    category: "enterprise",
    description: "AI-driven supply chain management system reducing delivery costs by 35% while improving customer satisfaction.",
    fullDescription: `An intelligent logistics platform that transforms supply chain operations through advanced algorithms and real-time optimization. Built for a major logistics company, this system coordinates thousands of deliveries daily while minimizing costs and maximizing customer satisfaction.\n\nThe platform uses machine learning to predict demand patterns, optimize delivery routes, and proactively address potential disruptions. Integration with IoT sensors provides real-time tracking of shipments, while the customer portal offers transparent communication and flexible delivery options.`,
    challenge: "Rising fuel costs, increasing customer expectations, and complex supply chain disruptions were impacting profitability and service quality. The client needed an intelligent system that could optimize operations in real-time while providing transparency to customers.",
    solution: "We created an AI-powered optimization engine with real-time route planning, predictive analytics, and customer communication tools. The platform includes driver mobile apps, customer tracking portals, and executive dashboards for comprehensive supply chain visibility.",
    image: "https://images.unsplash.com/photo-1724833256490-3a309b68faef",
    imageAlt: "Advanced logistics dashboard showing delivery routes, vehicle tracking, and supply chain analytics with real-time updates",
    client: {
      name: "GlobalShip Logistics",
      industry: "Transportation & Logistics",
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea38c77e-1762235698272.png",
      logoAlt: "GlobalShip Logistics logo with stylized truck and globe design in orange and blue"
    },
    techStack: ["React", "Python", "PostgreSQL", "Redis", "Google Maps API", "TensorFlow", "Docker"],
    metrics: [
    { label: "Cost Reduction", value: "35%" },
    { label: "On-time Delivery", value: "98.5%" },
    { label: "Fuel Efficiency", value: "+28%" },
    { label: "Customer NPS", value: "87" }],

    tags: ["Logistics", "AI/ML", "Optimization", "Real-time", "Mobile"],
    rating: 4.8,
    duration: "9 months",
    teamSize: 13,
    completedDate: "May 2024",
    testimonial: {
      name: "James Wilson",
      role: "COO, GlobalShip Logistics",
      avatar: "https://images.unsplash.com/photo-1666985152385-5075e84caf0e",
      avatarAlt: "Professional headshot of Caucasian man with brown hair in navy suit and red tie"
    }
  }];


  const categories = [
  { id: 'all', name: 'All Projects', icon: 'Grid', count: portfolioProjects?.length },
  { id: 'web-app', name: 'Web Applications', icon: 'Globe', count: portfolioProjects?.filter((p) => p?.category === 'web-app')?.length },
  { id: 'mobile', name: 'Mobile Apps', icon: 'Smartphone', count: portfolioProjects?.filter((p) => p?.category === 'mobile')?.length },
  { id: 'enterprise', name: 'Enterprise Solutions', icon: 'Building', count: portfolioProjects?.filter((p) => p?.category === 'enterprise')?.length },
  { id: 'dashboard', name: 'Dashboards & Analytics', icon: 'BarChart', count: portfolioProjects?.filter((p) => p?.category === 'dashboard')?.length }];


  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(portfolioProjects);
    } else {
      setFilteredProjects(portfolioProjects?.filter((project) => project?.category === activeCategory));
    }
  }, [activeCategory]);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Helmet>
        <title>Portfolio - FlowTech Studio | Technology with Soul</title>
        <meta name="description" content="Explore FlowTech Studio's portfolio of innovative web applications, mobile apps, and enterprise solutions. See how we create technology that feels intuitive, alive, and purposeful." />
        <meta name="keywords" content="portfolio, web development, mobile apps, enterprise solutions, React, Node.js, AI, machine learning" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-background via-muted to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6">

                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Portfolio Theater
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-6xl font-bold text-text-primary mb-6">

                Where Technical Excellence
                <span className="block text-primary">Meets Creative Vision</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-text-secondary max-w-4xl mx-auto mb-8">

                Discover how we transform complex challenges into elegant solutions that drive measurable impact. 
                Each project represents our commitment to creating technology that feels intuitive, alive, and purposeful.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">

                <Button variant="default" size="lg" className="btn-magnetic animate-breathe">
                  <Icon name="Play" size={20} className="mr-2" />
                  Watch Our Story
                </Button>
                <Button variant="outline" size="lg" className="btn-magnetic">
                  <Icon name="Download" size={20} className="mr-2" />
                  Download Portfolio
                </Button>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">

              {[
              { label: "Projects Delivered", value: "150+", icon: "CheckCircle" },
              { label: "Client Satisfaction", value: "98%", icon: "Heart" },
              { label: "Technologies Mastered", value: "50+", icon: "Code" },
              { label: "Awards Won", value: "25+", icon: "Award" }]?.
              map((stat, index) =>
              <div key={stat?.label} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={stat?.icon} size={24} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat?.value}</h3>
                  <p className="text-text-secondary text-sm">{stat?.label}</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FilterTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory} />


            {/* Projects Grid */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredProjects?.map((project, index) =>
              <ProjectCard
                key={project?.id}
                project={project}
                index={index}
                onViewDetails={handleViewDetails} />

              )}
            </motion.div>

            {filteredProjects?.length === 0 &&
            <div className="text-center py-16">
                <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">No projects found</h3>
                <p className="text-text-secondary">Try selecting a different category to see more projects.</p>
              </div>
            }
          </div>
        </section>

        {/* Technology Stack Visualization */}
        <TechStackVisualization />

        {/* Client Success Stories */}
        <ClientSuccessStories />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>

              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can transform your vision into a digital reality that drives measurable results and delights your users.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button variant="secondary" size="lg" className="btn-magnetic">
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Start Conversation
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal} />

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
                <p className="text-gray-200 leading-relaxed mb-6">
                  Creating digital experiences that don't just function, but inspire. 
                  Each project represents our commitment to technology that feels purposeful.
                </p>
                <div className="flex space-x-4">
                  {['Linkedin', 'Twitter', 'Github', 'Dribbble']?.map((social) => (
                    <a key={social} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-300">
                      <span className="sr-only">{social}</span>
                      <div className="w-5 h-5 bg-white rounded-sm"></div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Portfolio</h4>
                <ul className="space-y-3">
                  {[
                    { name: 'All Projects', path: '/portfolio' },
                    { name: 'Web Applications', path: '/portfolio#web-app' },
                    { name: 'Mobile Apps', path: '/portfolio#mobile' },
                    { name: 'Enterprise Solutions', path: '/portfolio#enterprise' }
                  ]?.map((link) => (
                    <li key={link?.name}>
                      <a href={link?.path} className="text-gray-200 hover:text-white transition-colors duration-200">
                        {link?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Services</h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Custom Development', path: '/services' },
                    { name: 'UX/UI Design', path: '/services' },
                    { name: 'Digital Strategy', path: '/services' },
                    { name: 'Consulting', path: '/contact' }
                  ]?.map((link) => (
                    <li key={link?.name}>
                      <a href={link?.path} className="text-gray-200 hover:text-white transition-colors duration-200">
                        {link?.name}
                      </a>
                    </li>
                  ))}
                </ul>
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
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );

};

export default Portfolio;