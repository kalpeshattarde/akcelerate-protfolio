'use client';

import React from 'react';
import HeroSection from './HeroSection';
import PhilosophySection from './PhilosophySection';
import ProcessSection from './ProcessSection';
import ValuesSection from './ValuesSection';
import ManifestoSection from './ManifestoSection';
import TimelineSection from './TimelineSection';
import TeamCultureSection from './TeamCultureSection';
import CTASection from './CTASection';

interface Philosophy {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
  details: string[];
}

interface Value {
  id: number;
  title: string;
  description: string;
}

interface ManifestoItem {
  id: number;
  statement: string;
}

interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  alt: string;
  quote: string;
}

const AboutInteractive: React.FC = () => {
  const heroData = {
    title: "Craft Meets Vision",
    subtitle: "Studio Philosophy",
    description: "We believe exceptional digital experiences emerge from the intersection of strategic thinking, artistic vision, and technical mastery. Our approach transcends trends, focusing instead on timeless principles that create lasting impact."
  };

  const philosophies: Philosophy[] = [
  {
    id: 1,
    title: "Intentional Restraint",
    description: "True creative power lies in what we choose not to do. Every element must earn its place, serving the greater narrative with purpose and precision.",
    icon: "✦"
  },
  {
    id: 2,
    title: "Deep Understanding",
    description: "Innovation stems from profound comprehension of context, audience, and objectives. We invest time in research and discovery before touching a single pixel.",
    icon: "◈"
  },
  {
    id: 3,
    title: "Craft Excellence",
    description: "Mastery requires dedication to detail and continuous refinement. We approach every project as an opportunity to push the boundaries of what's possible.",
    icon: "◆"
  },
  {
    id: 4,
    title: "Collaborative Spirit",
    description: "The best work emerges from genuine partnership. We view clients as collaborators, bringing their vision to life through shared exploration and iteration.",
    icon: "◇"
  },
  {
    id: 5,
    title: "Timeless Design",
    description: "We create experiences that transcend fleeting trends, focusing on fundamental principles that ensure relevance and impact for years to come.",
    icon: "◉"
  },
  {
    id: 6,
    title: "Strategic Thinking",
    description: "Beautiful design without strategic foundation is merely decoration. We ensure every creative decision aligns with business objectives and user needs.",
    icon: "◎"
  }];


  const processSteps: ProcessStep[] = [
  {
    id: 1,
    number: "01",
    title: "Discovery & Immersion",
    description: "We begin by deeply understanding your brand, audience, and objectives through comprehensive research and strategic workshops.",
    details: [
    "Stakeholder interviews and brand audit sessions",
    "Competitive landscape analysis and market research",
    "User research and behavioral insights gathering",
    "Strategic positioning and opportunity identification"]

  },
  {
    id: 2,
    number: "02",
    title: "Strategy & Concepting",
    description: "Armed with insights, we develop strategic frameworks and creative concepts that align vision with execution.",
    details: [
    "Creative brief development and strategic roadmap",
    "Conceptual exploration and visual direction",
    "Information architecture and user journey mapping",
    "Content strategy and messaging framework"]

  },
  {
    id: 3,
    number: "03",
    title: "Design & Refinement",
    description: "We craft detailed designs that balance aesthetic excellence with functional precision, iterating based on feedback.",
    details: [
    "Visual design system creation and component library",
    "High-fidelity mockups and interactive prototypes",
    "Collaborative review sessions and refinement cycles",
    "Accessibility compliance and responsive optimization"]

  },
  {
    id: 4,
    number: "04",
    title: "Development & Testing",
    description: "Our technical team brings designs to life with clean code, ensuring performance, accessibility, and scalability.",
    details: [
    "Front-end development with modern frameworks",
    "CMS integration and content management setup",
    "Cross-browser and device testing protocols",
    "Performance optimization and security hardening"]

  },
  {
    id: 5,
    number: "05",
    title: "Launch & Evolution",
    description: "We ensure smooth deployment and provide ongoing support to help your digital experience evolve and improve over time.",
    details: [
    "Staged deployment and quality assurance testing",
    "Team training and documentation delivery",
    "Analytics setup and performance monitoring",
    "Continuous optimization and enhancement support"]

  }];


  const values: Value[] = [
  {
    id: 1,
    title: "Integrity in Every Interaction",
    description: "We operate with transparency and honesty, building trust through consistent actions that align with our words. Our relationships are founded on mutual respect and ethical practice."
  },
  {
    id: 2,
    title: "Pursuit of Excellence",
    description: "Mediocrity has no place in our studio. We hold ourselves to the highest standards, constantly pushing boundaries and refining our craft to deliver exceptional results."
  },
  {
    id: 3,
    title: "Curiosity & Learning",
    description: "We maintain a beginner's mindset, approaching each project with fresh eyes and genuine curiosity. Continuous learning fuels our innovation and keeps our work relevant."
  },
  {
    id: 4,
    title: "Empathy & Understanding",
    description: "Great design requires deep empathy for users and stakeholders. We listen actively, seek to understand diverse perspectives, and create experiences that resonate emotionally."
  },
  {
    id: 5,
    title: "Courage to Challenge",
    description: "We're not afraid to question assumptions or push back when necessary. Our commitment to excellence sometimes means having difficult conversations in service of better outcomes."
  },
  {
    id: 6,
    title: "Sustainable Practice",
    description: "We consider the long-term impact of our work—on users, businesses, and the environment. Sustainability guides our decisions from technology choices to business practices."
  }];


  const manifestoItems: ManifestoItem[] = [
  {
    id: 1,
    statement: "Exceptional digital experiences require both creative vision and technical mastery."
  },
  {
    id: 2,
    statement: "We believe in the power of restraint—every element serves the greater story."
  },
  {
    id: 3,
    statement: "True innovation comes from deep understanding, not surface trends."
  },
  {
    id: 4,
    statement: "Craft is not what we do—it's who we are."
  }];


  const milestones: Milestone[] = [
  {
    id: 1,
    year: "2015",
    title: "Studio Founded",
    description: "Atelier Studio was born from a shared vision to create digital experiences that transcend the ordinary. Two designers and a developer came together with a commitment to craft excellence and strategic thinking."
  },
  {
    id: 2,
    year: "2017",
    title: "First Major Award",
    description: "Our work for a luxury fashion brand earned recognition at the Webby Awards, validating our approach and establishing our reputation for editorial sophistication in digital design."
  },
  {
    id: 3,
    year: "2019",
    title: "Team Expansion",
    description: "Growing demand led us to carefully expand our team, bringing in specialists in motion design, content strategy, and technical architecture while maintaining our culture of excellence."
  },
  {
    id: 4,
    year: "2021",
    title: "International Recognition",
    description: "Projects for global brands earned us features in leading design publications and invitations to speak at international conferences, expanding our influence and network."
  },
  {
    id: 5,
    year: "2023",
    title: "Studio Evolution",
    description: "We refined our process and philosophy, doubling down on what makes us unique: the intersection of strategic thinking, artistic vision, and technical mastery that defines our approach."
  },
  {
    id: 6,
    year: "2025",
    title: "New Chapter",
    description: "Today, we continue to push boundaries and challenge conventions, working with visionary clients who understand that exceptional digital experiences require patience, partnership, and unwavering commitment to craft."
  }];


  const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: "Creative Director & Co-Founder",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19e74dee2-1763301352669.png",
    alt: "Professional woman with long dark hair in black blazer smiling confidently in modern studio",
    quote: "Every project is an opportunity to create something that didn't exist before—something that makes the world a little more beautiful."
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Technical Director & Co-Founder",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a99cc915-1763299240589.png",
    alt: "Asian man with short black hair in navy sweater looking thoughtfully at camera in bright office",
    quote: "The best code is invisible—it just works, elegantly and efficiently, allowing the design to shine."
  },
  {
    id: 3,
    name: "Sophia Andersson",
    role: "Strategy Lead",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17b84e093-1765047092616.png",
    alt: "Blonde woman in white shirt with warm smile in contemporary workspace",
    quote: "Strategy without creativity is just planning. Creativity without strategy is just art. We need both."
  },
  {
    id: 4,
    name: "James Mitchell",
    role: "Senior Designer",
    image: "https://images.unsplash.com/photo-1661581668374-e13789ad79e9",
    alt: "Man with beard in denim shirt looking confidently at camera in creative studio",
    quote: "Design is not just what it looks like. It's how it works, how it feels, and how it makes people feel."
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "UX Researcher",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f953953d-1763294126115.png",
    alt: "South Asian woman with dark hair in professional attire smiling warmly in modern office",
    quote: "Understanding people—their needs, behaviors, and motivations—is the foundation of meaningful design."
  },
  {
    id: 6,
    name: "David Kim",
    role: "Lead Developer",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f56bb22a-1763294449449.png",
    alt: "Asian man with glasses in casual shirt focused and thoughtful in tech workspace",
    quote: "Great development is about solving problems elegantly and building experiences that feel effortless."
  }];


  return (
    <>
      <HeroSection
        title={heroData.title}
        subtitle={heroData.subtitle}
        description={heroData.description} />

      <PhilosophySection philosophies={philosophies} />
      <ManifestoSection manifestoItems={manifestoItems} />
      <ProcessSection steps={processSteps} />
      <ValuesSection values={values} />
      <TimelineSection milestones={milestones} />
      <TeamCultureSection teamMembers={teamMembers} />
      <CTASection />
    </>);

};

export default AboutInteractive;