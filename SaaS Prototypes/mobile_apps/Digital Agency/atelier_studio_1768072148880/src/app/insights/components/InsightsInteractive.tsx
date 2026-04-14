'use client';

import { useState, useEffect } from 'react';
import InsightCard from './InsightCard';
import FeaturedInsight from './FeaturedInsight';
import CategoryFilter from './CategoryFilter';
import NewsletterSignup from './NewsletterSignup';
import SearchBar from './SearchBar';

interface Author {
  name: string;
  role: string;
  image: string;
  alt: string;
}

interface Insight {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishDate: string;
  author: Author;
  image: string;
  alt: string;
  slug: string;
  isFeatured?: boolean;
}

const mockInsights: Insight[] = [
{
  id: 1,
  title: "The Art of Digital Restraint: Why Less Creates More Impact",
  excerpt: "In an era of digital excess, we explore how intentional minimalism and strategic restraint create more powerful brand experiences. True innovation lies not in adding more, but in knowing what to remove.",
  category: "Craft Manifesto",
  readTime: 8,
  publishDate: "Dec 15, 2025",
  author: {
    name: "Elena Rodriguez",
    role: "Creative Director",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15e71e268-1763298836552.png",
    alt: "Professional woman with dark hair in black blazer smiling confidently"
  },
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14e5e6040-1765771949714.png",
  alt: "Minimalist workspace with single plant and clean white desk",
  slug: "art-of-digital-restraint",
  isFeatured: true
},
{
  id: 2,
  title: "Beyond Trends: Building Timeless Digital Experiences",
  excerpt: "While design trends come and go, certain principles remain constant. We examine the intersection of contemporary aesthetics and enduring design philosophy to create work that transcends temporal boundaries.",
  category: "Industry Commentary",
  readTime: 6,
  publishDate: "Dec 12, 2025",
  author: {
    name: "Marcus Chen",
    role: "Design Strategist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1862a17e8-1763296436277.png",
    alt: "Asian man with glasses in navy sweater looking thoughtful"
  },
  image: "https://images.unsplash.com/photo-1599420186917-468a49a78a63",
  alt: "Modern laptop on wooden desk with architectural sketches"
},
{
  id: 3,
  title: "The Renaissance of Web Typography: A Return to Craft",
  excerpt: "Variable fonts and advanced CSS capabilities are ushering in a new era of typographic expression online. We explore how digital typography is finally catching up to centuries of print tradition.",
  category: "Cultural Connections",
  readTime: 10,
  publishDate: "Dec 10, 2025",
  author: {
    name: "Sofia Andersson",
    role: "Type Director",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d8f9ca7e-1765286043112.png",
    alt: "Blonde woman in white shirt with warm smile in bright studio"
  },
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17fe5c568-1765179212801.png",
  alt: "Close-up of elegant serif typography on printed page"
},
{
  id: 4,
  title: "Collaborative Creation: Co-Authoring Brand Narratives",
  excerpt: "The most successful projects emerge from true partnerships between agency and client. We share insights from recent collaborations that transformed brand challenges into creative opportunities.",
  category: "Client Collaborations",
  readTime: 7,
  publishDate: "Dec 8, 2025",
  author: {
    name: "James Morrison",
    role: "Strategy Lead",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1627541da-1765612681118.png",
    alt: "Man with beard in gray suit jacket smiling professionally"
  },
  image: "https://images.unsplash.com/photo-1590402494628-9b9acf0b90ae",
  alt: "Team collaboration session with sticky notes on glass wall"
},
{
  id: 5,
  title: "Motion as Meaning: The Language of Digital Animation",
  excerpt: "Animation is more than decoration—it's a fundamental communication tool. We break down how thoughtful motion design guides attention, conveys personality, and enhances user understanding.",
  category: "Craft Manifesto",
  readTime: 9,
  publishDate: "Dec 5, 2025",
  author: {
    name: "Aisha Patel",
    role: "Motion Designer",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_191ce689f-1763296035010.png",
    alt: "Indian woman with long dark hair in burgundy top smiling warmly"
  },
  image: "https://images.unsplash.com/photo-1731946933806-e7317205a63d",
  alt: "Abstract flowing motion graphics in blue and purple gradients"
},
{
  id: 6,
  title: "Sustainable Design: The Ethics of Digital Craft",
  excerpt: "As digital creators, we have a responsibility to consider the environmental and social impact of our work. Exploring how sustainable thinking shapes better design decisions.",
  category: "Industry Commentary",
  readTime: 8,
  publishDate: "Dec 3, 2025",
  author: {
    name: "Lucas Bergström",
    role: "Sustainability Advisor",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19254133b-1765314260906.png",
    alt: "Man with short blonde hair in green shirt outdoors"
  },
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dbcc631f-1764670328753.png",
  alt: "Green sustainable architecture with plants integrated into building"
},
{
  id: 7,
  title: "The Museum as Digital Canvas: Cultural Institution Innovation",
  excerpt: "Museums and galleries are reimagining visitor experiences through digital innovation. Case studies from recent cultural collaborations that bridge physical and digital spaces.",
  category: "Cultural Connections",
  readTime: 11,
  publishDate: "Nov 30, 2025",
  author: {
    name: "Isabella Rossi",
    role: "Cultural Partnerships",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1908e3d35-1765222080801.png",
    alt: "Woman with curly brown hair in black turtleneck with artistic expression"
  },
  image: "https://images.unsplash.com/photo-1600577937202-66ca16fdb69b",
  alt: "Modern art museum interior with dramatic lighting and sculptures"
},
{
  id: 8,
  title: "Brand Evolution in Real-Time: Adaptive Identity Systems",
  excerpt: "Static brand guidelines are giving way to dynamic systems that respond to context. How we're helping brands maintain consistency while embracing flexibility.",
  category: "Client Collaborations",
  readTime: 7,
  publishDate: "Nov 28, 2025",
  author: {
    name: "David Kim",
    role: "Brand Architect",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_114e23dcc-1763293763893.png",
    alt: "Korean man in navy blazer with confident professional demeanor"
  },
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12eda10c4-1765955334170.png",
  alt: "Dynamic brand identity elements morphing across digital screens"
},
{
  id: 9,
  title: "The Poetry of Code: When Engineering Becomes Art",
  excerpt: "Beautiful code isn't just functional—it's elegant, intentional, and crafted with care. Celebrating the artistry in technical excellence and the engineers who create it.",
  category: "Craft Manifesto",
  readTime: 6,
  publishDate: "Nov 25, 2025",
  author: {
    name: "Nina Kowalski",
    role: "Lead Engineer",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_163c92d91-1763297997435.png",
    alt: "Woman with short dark hair in black shirt with focused expression"
  },
  image: "https://images.unsplash.com/photo-1622858674121-e8cb8b5e6d9f",
  alt: "Clean code on dark screen with elegant syntax highlighting"
}];


const categories = [
"All Insights",
"Craft Manifesto",
"Industry Commentary",
"Cultural Connections",
"Client Collaborations"];


const InsightsInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const filteredInsights = mockInsights.filter((insight) => {
    const matchesCategory = activeCategory === "All Insights" || insight.category === activeCategory;
    const matchesSearch = searchQuery === "" ||
    insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredInsight = filteredInsights.find((insight) => insight.isFeatured);
  const regularInsights = filteredInsights.filter((insight) => !insight.isFeatured);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Hero Section */}
          <div className="mb-16 space-y-8">
            <div className="space-y-4">
              <h1 className="font-headline text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Creative
                <br />
                Insights
              </h1>
              <p className="font-body text-xl text-text-secondary max-w-2xl leading-relaxed">
                Thoughts on craft, culture, and the evolving landscape of digital creation.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="w-full lg:w-auto">
                <SearchBar onSearch={() => {}} />
              </div>
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={() => {}} />

            </div>
          </div>

          {/* Featured Insight */}
          {featuredInsight &&
          <div className="mb-20">
              <FeaturedInsight insight={featuredInsight} />
            </div>
          }

          {/* Insights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {regularInsights.map((insight) =>
            <InsightCard key={insight.id} insight={insight} />
            )}
          </div>

          {/* Newsletter Signup */}
          <NewsletterSignup />
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Hero Section */}
        <div className="mb-16 space-y-8">
          <div className="space-y-4">
            <h1 className="font-headline text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              Creative
              <br />
              Insights
            </h1>
            <p className="font-body text-xl text-text-secondary max-w-2xl leading-relaxed">
              Thoughts on craft, culture, and the evolving landscape of digital creation.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="w-full lg:w-auto">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory} />

          </div>
        </div>

        {/* Featured Insight */}
        {featuredInsight &&
        <div className="mb-20">
            <FeaturedInsight insight={featuredInsight} />
          </div>
        }

        {/* Insights Grid */}
        {regularInsights.length > 0 ?
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {regularInsights.map((insight) =>
          <InsightCard key={insight.id} insight={insight} />
          )}
          </div> :

        <div className="text-center py-20">
            <p className="font-body text-lg text-text-secondary">
              No insights found matching your criteria.
            </p>
          </div>
        }

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </div>
    </div>);

};

export default InsightsInteractive;