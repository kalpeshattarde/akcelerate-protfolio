import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendForecasting = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('2024');

  const timeframes = [
  { id: '2024', label: '2024 Trends', period: 'Current Year' },
  { id: '2025', label: '2025 Outlook', period: 'Next Year' },
  { id: '2026-2028', label: '2026-2028', period: 'Long Term' }];


  const trends = {
    '2024': [
    {
      id: 1,
      title: "AI-Powered Design Systems",
      category: "Design Technology",
      impact: "High",
      adoption: 78,
      description: `Intelligent design systems that automatically generate components, maintain consistency, and adapt to user behavior patterns.\n\nWe're seeing 340% faster design-to-development cycles in our client projects using AI-assisted design systems.`,
      image: "https://images.unsplash.com/photo-1706697318037-7822d2c3fd59",
      alt: "AI-powered design interface showing automated component generation and intelligent design suggestions",
      keyDrivers: ["GPT-4 Integration", "Automated Testing", "Real-time Adaptation"],
      timeline: "Q4 2024",
      confidence: 92
    },
    {
      id: 2,
      title: "Sustainable Computing Practices",
      category: "Green Technology",
      impact: "Medium",
      adoption: 65,
      description: `Carbon-conscious development practices becoming standard, with energy-efficient coding and green hosting solutions.\n\nCompanies are reducing their digital carbon footprint by up to 45% through optimized algorithms and sustainable infrastructure.`,
      image: "https://images.unsplash.com/photo-1715026323215-a2dbb71272f6",
      alt: "Green data center with renewable energy sources and sustainable server infrastructure",
      keyDrivers: ["Climate Regulations", "Cost Optimization", "Brand Responsibility"],
      timeline: "Q4 2024",
      confidence: 87
    },
    {
      id: 3,
      title: "Micro-Frontend Architecture",
      category: "Software Architecture",
      impact: "High",
      adoption: 82,
      description: `Modular frontend architectures enabling independent team development and deployment at scale.\n\nEnterprise clients are seeing 60% faster feature delivery and improved team autonomy with micro-frontend implementations.`,
      image: "https://images.unsplash.com/photo-1531030874896-fdef6826f2f7",
      alt: "Modular software architecture diagram showing micro-frontend components and independent deployment pipelines",
      keyDrivers: ["Team Scalability", "Independent Deployment", "Technology Diversity"],
      timeline: "Q4 2024",
      confidence: 89
    }],

    '2025': [
    {
      id: 4,
      title: "Ambient Computing Interfaces",
      category: "Interaction Design",
      impact: "High",
      adoption: 45,
      description: `Invisible, context-aware interfaces that respond to natural human behavior without explicit interaction.\n\nEarly prototypes show 85% reduction in cognitive load and 200% improvement in task completion rates.`,
      image: "https://images.unsplash.com/photo-1728713080499-04f8699f6aa1",
      alt: "Futuristic ambient computing environment with invisible interfaces responding to human gestures and presence",
      keyDrivers: ["IoT Maturation", "Edge Computing", "Natural Interaction"],
      timeline: "Q2 2025",
      confidence: 76
    },
    {
      id: 5,
      title: "Quantum-Enhanced Security",
      category: "Cybersecurity",
      impact: "Medium",
      adoption: 23,
      description: `Quantum-resistant encryption and quantum key distribution becoming essential for enterprise security.\n\nEarly adopters are future-proofing their security infrastructure against quantum computing threats.`,
      image: "https://images.unsplash.com/photo-1695391533460-67a12aa6b9d3",
      alt: "Quantum computing security visualization showing encrypted data protection and quantum key distribution",
      keyDrivers: ["Quantum Threats", "Regulatory Requirements", "Data Protection"],
      timeline: "Q3 2025",
      confidence: 71
    }],

    '2026-2028': [
    {
      id: 6,
      title: "Neural Interface Computing",
      category: "Human-Computer Interaction",
      impact: "Revolutionary",
      adoption: 12,
      description: `Direct brain-computer interfaces enabling thought-based interaction with digital systems.\n\nResearch partnerships are exploring applications in accessibility, productivity, and creative workflows.`,
      image: "https://images.unsplash.com/photo-1661422832482-86669ebbe0b9",
      alt: "Advanced neural interface technology showing brain-computer connection and thought-based digital interaction",
      keyDrivers: ["Neurotechnology Advances", "Accessibility Needs", "Productivity Enhancement"],
      timeline: "2027-2028",
      confidence: 58
    },
    {
      id: 7,
      title: "Autonomous Development Systems",
      category: "Software Engineering",
      impact: "High",
      adoption: 8,
      description: `AI systems capable of end-to-end software development from requirements to deployment.\n\nPilot programs show potential for 90% reduction in routine development tasks while maintaining code quality.`,
      image: "https://images.unsplash.com/photo-1531030874896-fdef6826f2f7",
      alt: "Autonomous development system interface showing AI-generated code and automated deployment pipelines",
      keyDrivers: ["AI Advancement", "Developer Shortage", "Efficiency Demands"],
      timeline: "2026-2027",
      confidence: 63
    }]

  };

  const currentTrends = trends?.[activeTimeframe] || [];

  const getImpactColor = (impact) => {
    const colors = {
      'High': 'text-error bg-error/10',
      'Medium': 'text-warning bg-warning/10',
      'Revolutionary': 'text-accent bg-accent/10'
    };
    return colors?.[impact] || colors?.Medium;
  };

  const TrendCard = ({ trend }) =>
  <div className="group card-elevated hover:shadow-strong transition-all duration-500 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
        src={trend?.image}
        alt={trend?.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(trend?.impact)}`}>
            {trend?.impact} Impact
          </span>
        </div>

        {/* Confidence Score */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
          {trend?.confidence}% Confidence
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Timeline */}
        <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
          <span className="font-medium text-primary">{trend?.category}</span>
          <span>{trend?.timeline}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
          {trend?.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary mb-4 leading-relaxed line-clamp-3">
          {trend?.description?.split('\n')?.[0]}
        </p>

        {/* Adoption Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-text-secondary">Market Adoption</span>
            <span className="font-medium text-text-primary">{trend?.adoption}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${trend?.adoption}%` }}>
          </div>
          </div>
        </div>

        {/* Key Drivers */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-2">Key Drivers</h4>
          <div className="flex flex-wrap gap-2">
            {trend?.keyDrivers?.map((driver, index) =>
          <span
            key={index}
            className="bg-muted text-text-secondary px-2 py-1 rounded text-xs">

                {driver}
              </span>
          )}
          </div>
        </div>

        {/* CTA */}
        <Button
        variant="outline"
        size="sm"
        fullWidth
        className="btn-magnetic"
        iconName="TrendingUp"
        iconPosition="left">

          Deep Dive Analysis
        </Button>
      </div>
    </div>;


  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Technology Trend Forecasting
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Our research team analyzes emerging technologies and market signals to predict 
            the trends that will shape the future of digital experiences.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {timeframes?.map((timeframe) =>
          <button
            key={timeframe?.id}
            onClick={() => setActiveTimeframe(timeframe?.id)}
            className={`
                flex flex-col items-center px-6 py-4 rounded-lg text-sm font-medium transition-all duration-300
                ${activeTimeframe === timeframe?.id ?
            'bg-primary text-white shadow-md' :
            'bg-background text-text-secondary hover:bg-primary/10 hover:text-primary'}
              `
            }>

              <span className="font-semibold">{timeframe?.label}</span>
              <span className="text-xs opacity-80">{timeframe?.period}</span>
            </button>
          )}
        </div>

        {/* Trends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentTrends?.map((trend) =>
          <TrendCard key={trend?.id} trend={trend} />
          )}
        </div>

        {/* Research Methodology */}
        <div className="bg-background rounded-2xl p-8 card-elevated">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Our Forecasting Methodology
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Our trend analysis combines quantitative market research, expert interviews, 
                patent analysis, and real-world implementation data from our client projects 
                to provide accurate technology forecasts.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Database" size={16} className="text-primary" />
                  <span className="text-sm text-text-secondary">500+ data sources analyzed monthly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm text-text-secondary">50+ industry expert interviews</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="TrendingUp" size={16} className="text-primary" />
                  <span className="text-sm text-text-secondary">85% prediction accuracy rate</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                variant="default"
                size="lg"
                className="btn-magnetic"
                iconName="FileText"
                iconPosition="left">

                Download Full Report
              </Button>
              <p className="text-xs text-text-secondary mt-2">
                Comprehensive 120-page analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TrendForecasting;