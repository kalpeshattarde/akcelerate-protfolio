'use client';

import { useState, useEffect } from 'react';
import TeamMemberCard from './TeamMemberCard';
import TeamFilter from './TeamFilter';
import ProfileModal from './ProfileModal';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  discipline: string;
  category: string;
  image: string;
  alt: string;
  bio: string;
  expertise: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    behance?: string;
  };
  fullBio: string;
  achievements: string[];
  projects: string[];
}

const mockTeamMembers: TeamMember[] = [
{
  id: 1,
  name: "Elena Rodriguez",
  role: "Creative Director",
  discipline: "Leadership & Vision",
  category: "leadership",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19e74dee2-1763301352669.png",
  alt: "Professional woman with long dark hair in black blazer smiling confidently in modern office",
  bio: "Leading creative vision with 15 years of experience in brand storytelling and digital innovation.",
  expertise: ["Brand Strategy", "Creative Direction", "Team Leadership", "Client Relations"],
  social: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    behance: "https://behance.net"
  },
  fullBio: "Elena brings over 15 years of experience in creative leadership, having worked with Fortune 500 brands and emerging startups alike. Her approach combines strategic thinking with artistic vision, creating work that resonates emotionally while achieving business objectives. She believes in empowering teams to push creative boundaries while maintaining focus on craft excellence.",
  achievements: [
  "Led award-winning campaigns for 50+ global brands",
  "Featured speaker at Cannes Lions and SXSW",
  "Mentor to emerging creative professionals",
  "Published thought leader on brand innovation"],

  projects: [
  "Global rebrand for luxury automotive brand",
  "Digital transformation for heritage fashion house",
  "Immersive experience for tech product launch"]

},
{
  id: 2,
  name: "Marcus Chen",
  role: "Lead UX Architect",
  discipline: "Experience Design",
  category: "creative",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c682de70-1765037662781.png",
  alt: "Asian man with glasses in navy sweater working on laptop in bright creative studio",
  bio: "Crafting intuitive digital experiences that balance user needs with business goals and aesthetic excellence.",
  expertise: ["UX Strategy", "Information Architecture", "User Research", "Interaction Design"],
  social: {
    linkedin: "https://linkedin.com",
    behance: "https://behance.net"
  },
  fullBio: "Marcus specializes in creating digital experiences that feel effortless yet sophisticated. With a background in cognitive psychology and design, he approaches every project with deep user empathy and strategic thinking. His work has been recognized for its innovative approach to complex interaction challenges.",
  achievements: [
  "Redesigned user flows increasing conversion by 240%",
  "Led UX for award-winning mobile applications",
  "Published research on accessibility in digital design",
  "Mentor at design bootcamps and universities"],

  projects: [
  "E-commerce platform serving 2M+ users",
  "Healthcare app improving patient outcomes",
  "Financial services dashboard redesign"]

},
{
  id: 3,
  name: "Sophia Andersson",
  role: "Brand Strategist",
  discipline: "Strategic Thinking",
  category: "strategy",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18b2efd25-1765154330444.png",
  alt: "Blonde woman in white shirt reviewing documents at desk with natural lighting",
  bio: "Developing brand strategies that connect emotional resonance with market positioning and cultural relevance.",
  expertise: ["Brand Positioning", "Market Research", "Competitive Analysis", "Messaging Strategy"],
  social: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  fullBio: "Sophia brings analytical rigor and creative intuition to brand strategy. Her work helps organizations discover their authentic voice and position themselves meaningfully in competitive markets. She believes great strategy emerges from deep cultural understanding and genuine human insight.",
  achievements: [
  "Developed positioning for 30+ successful brand launches",
  "Strategic advisor to venture-backed startups",
  "Regular contributor to marketing publications",
  "Workshop facilitator for brand development"],

  projects: [
  "Market entry strategy for European tech company",
  "Repositioning campaign for legacy consumer brand",
  "Brand architecture for multi-product portfolio"]

},
{
  id: 4,
  name: "James Okonkwo",
  role: "Technical Director",
  discipline: "Engineering Excellence",
  category: "technology",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ec28c614-1765254159176.png",
  alt: "Black man with short hair in gray henley shirt smiling in modern tech office",
  bio: "Building robust technical foundations that enable creative ambition and deliver exceptional performance.",
  expertise: ["Full-Stack Development", "System Architecture", "Performance Optimization", "Technical Leadership"],
  social: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  fullBio: "James leads technical implementation with a focus on scalability, performance, and maintainability. His expertise spans modern web technologies and cloud infrastructure, enabling the studio to deliver ambitious digital experiences without compromise. He's passionate about mentoring developers and advancing technical craft.",
  achievements: [
  "Architected platforms handling 10M+ daily users",
  "Open source contributor to major frameworks",
  "Technical speaker at developer conferences",
  "Led engineering teams at scale-ups and agencies"],

  projects: [
  "Real-time collaboration platform for creative teams",
  "Headless CMS implementation for enterprise client",
  "Progressive web app with offline capabilities"]

},
{
  id: 5,
  name: "Aria Patel",
  role: "Senior Art Director",
  discipline: "Visual Storytelling",
  category: "creative",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_191ce689f-1763296035010.png",
  alt: "Indian woman with long dark hair in burgundy top working on design tablet in creative workspace",
  bio: "Creating visual narratives that captivate audiences and elevate brand presence through thoughtful design.",
  expertise: ["Art Direction", "Visual Design", "Typography", "Brand Identity"],
  social: {
    linkedin: "https://linkedin.com",
    behance: "https://behance.net"
  },
  fullBio: "Aria's work combines editorial sophistication with digital innovation. Her visual storytelling approach creates memorable brand moments that resonate across touchpoints. She draws inspiration from art, fashion, and cultural movements to create work that feels both timeless and contemporary.",
  achievements: [
  "Art direction for campaigns winning 15+ industry awards",
  "Featured in design publications and exhibitions",
  "Adjunct professor teaching visual communication",
  "Jury member for international design competitions"],

  projects: [
  "Visual identity for cultural institution",
  "Campaign photography for luxury brand",
  "Editorial design for digital magazine"]

},
{
  id: 6,
  name: "Lucas Bergström",
  role: "Motion Designer",
  discipline: "Animation & Motion",
  category: "creative",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16f7d2a7c-1765801072396.png",
  alt: "Scandinavian man with beard in black t-shirt working on animation software in studio",
  bio: "Bringing brands to life through fluid motion design and cinematic animation that tells compelling stories.",
  expertise: ["Motion Graphics", "3D Animation", "Video Editing", "Visual Effects"],
  social: {
    behance: "https://behance.net",
    twitter: "https://twitter.com"
  },
  fullBio: "Lucas specializes in motion design that enhances storytelling and creates emotional impact. His work spans brand films, UI animations, and experimental motion pieces. He believes motion should feel purposeful and enhance the narrative rather than distract from it.",
  achievements: [
  "Created motion work for 100+ brand campaigns",
  "Animation featured in film festivals",
  "Tutorial creator for motion design community",
  "Collaborated with musicians on music videos"],

  projects: [
  "Brand film for product launch reaching 5M views",
  "UI animations for award-winning mobile app",
  "Experimental motion piece for art installation"]

},
{
  id: 7,
  name: "Nina Kowalski",
  role: "Content Strategist",
  discipline: "Editorial & Content",
  category: "strategy",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10099ac9e-1763300731841.png",
  alt: "Polish woman with short blonde hair in white blouse reviewing content on laptop in bright office",
  bio: "Crafting content strategies that engage audiences and build meaningful connections through authentic storytelling.",
  expertise: ["Content Strategy", "Editorial Planning", "Copywriting", "SEO"],
  social: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  fullBio: "Nina develops content strategies that balance brand voice with audience needs. Her editorial background informs her approach to creating content that educates, entertains, and inspires action. She believes great content emerges from understanding both the brand's story and the audience's journey.",
  achievements: [
  "Developed content strategies for 40+ brands",
  "Increased organic traffic by 300% for clients",
  "Published author on content marketing",
  "Workshop leader for content professionals"],

  projects: [
  "Content ecosystem for B2B SaaS company",
  "Editorial calendar for lifestyle brand",
  "Thought leadership program for executive team"]

},
{
  id: 8,
  name: "David Kim",
  role: "Frontend Engineer",
  discipline: "Interface Development",
  category: "technology",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9714e4b-1763296357268.png",
  alt: "Korean man in denim shirt coding on dual monitors in modern tech workspace",
  bio: "Building pixel-perfect interfaces with clean code and attention to performance and accessibility.",
  expertise: ["React", "TypeScript", "CSS Architecture", "Web Performance"],
  social: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  fullBio: "David specializes in translating design vision into production-ready code. His focus on performance, accessibility, and maintainability ensures digital experiences work beautifully for all users. He's passionate about modern web technologies and sharing knowledge with the developer community.",
  achievements: [
  "Built interfaces for 50+ web applications",
  "Contributor to open source UI libraries",
  "Technical writer for web development blogs",
  "Mentor in coding bootcamp programs"],

  projects: [
  "Component library used across enterprise",
  "High-performance e-commerce frontend",
  "Accessible web app for government services"]

}];


export default function TeamInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>(mockTeamMembers);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredMembers(mockTeamMembers);
    } else {
      setFilteredMembers(
        mockTeamMembers.filter((member) => member.category === activeFilter)
      );
    }
  }, [activeFilter]);

  if (!isHydrated) {
    return (
      <div className="py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="h-12 w-96 bg-muted/50 rounded-md animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) =>
            <div key={i} className="space-y-4">
                <div className="aspect-[3/4] bg-muted/50 rounded-md animate-pulse" />
                <div className="h-6 bg-muted/50 rounded animate-pulse" />
                <div className="h-4 bg-muted/50 rounded animate-pulse w-2/3" />
              </div>
            )}
          </div>
        </div>
      </div>);

  }

  return (
    <>
      <section className="py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Filter */}
          <div className="flex justify-center mb-16">
            <TeamFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter} />

          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMembers.map((member) =>
            <TeamMemberCard
              key={member.id}
              member={member}
              onViewProfile={setSelectedMember} />

            )}
          </div>

          {/* Empty State */}
          {filteredMembers.length === 0 &&
          <div className="text-center py-20">
              <p className="font-body text-lg text-text-secondary">
                No team members found in this category.
              </p>
            </div>
          }
        </div>
      </section>

      {/* Profile Modal */}
      <ProfileModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)} />

    </>);

}