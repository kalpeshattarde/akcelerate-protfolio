'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import CategoryCard from './CategoryCard';
import DiscussionCard from './DiscussionCard';
import MemberCard from './MemberCard';
import StudyGroupCard from './StudyGroupCard';
import ResourceCard from './ResourceCard';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  topics: number;
  posts: number;
  lastActivity: string;
  color: string;
}

interface Discussion {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    avatarAlt: string;
    badge: string;
  };
  category: string;
  replies: number;
  views: number;
  likes: number;
  lastReply: string;
  isPinned: boolean;
  hasInstructorReply: boolean;
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  avatarAlt: string;
  role: string;
  expertise: string[];
  contributions: number;
  helpfulAnswers: number;
  joinedDate: string;
  isOnline: boolean;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  members: Array<{
    avatar: string;
    avatarAlt: string;
  }>;
  totalMembers: number;
  meetingSchedule: string;
  nextMeeting: string;
  isOpen: boolean;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  author: string;
  downloads: number;
  rating: number;
  uploadedDate: string;
  fileSize: string;
}

const CommunityInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<'discussions' | 'members' | 'groups' | 'resources'>('discussions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const categories: Category[] = [
  {
    id: 'mindfulness',
    name: 'Mindfulness & Meditation',
    description: 'Explore practices for cultivating presence, awareness, and inner peace in your learning journey.',
    icon: 'SparklesIcon',
    topics: 342,
    posts: 2847,
    lastActivity: '5 min ago',
    color: 'bg-primary'
  },
  {
    id: 'productivity',
    name: 'Productive Learning',
    description: 'Share strategies for effective study habits, time management, and sustainable learning practices.',
    icon: 'LightBulbIcon',
    topics: 428,
    posts: 3621,
    lastActivity: '12 min ago',
    color: 'bg-accent'
  },
  {
    id: 'technology',
    name: 'Technology & Development',
    description: 'Discuss programming, web development, and emerging technologies with fellow learners.',
    icon: 'CodeBracketIcon',
    topics: 567,
    posts: 4892,
    lastActivity: '8 min ago',
    color: 'bg-secondary'
  },
  {
    id: 'business',
    name: 'Business & Leadership',
    description: 'Connect with professionals exploring entrepreneurship, management, and career growth.',
    icon: 'BriefcaseIcon',
    topics: 389,
    posts: 3156,
    lastActivity: '15 min ago',
    color: 'bg-success'
  },
  {
    id: 'creative',
    name: 'Creative Arts',
    description: 'Share your creative journey in design, writing, music, and visual arts.',
    icon: 'PaintBrushIcon',
    topics: 294,
    posts: 2473,
    lastActivity: '22 min ago',
    color: 'bg-warning'
  },
  {
    id: 'wellness',
    name: 'Health & Wellness',
    description: 'Discuss holistic well-being, nutrition, fitness, and mental health practices.',
    icon: 'HeartIcon',
    topics: 312,
    posts: 2689,
    lastActivity: '18 min ago',
    color: 'bg-error'
  }];


  const discussions: Discussion[] = [
  {
    id: '1',
    title: 'How do you maintain focus during long study sessions?',
    excerpt: 'I\'ve been struggling to stay focused when studying for more than 2 hours. I\'ve tried the Pomodoro technique, but I still find my mind wandering. What strategies have worked for you?',
    author: {
      name: 'Sarah Chen',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18a713e78-1763297858426.png",
      avatarAlt: 'Professional headshot of Asian woman with long black hair in white blouse',
      badge: 'Active Learner'
    },
    category: 'Productive Learning',
    replies: 24,
    views: 342,
    likes: 18,
    lastReply: '5 min ago',
    isPinned: true,
    hasInstructorReply: true
  },
  {
    id: '2',
    title: 'Mindful morning routines that changed my learning',
    excerpt: 'After implementing a 20-minute mindfulness practice before studying, I\'ve noticed significant improvements in retention and comprehension. Here\'s what I do...',
    author: {
      name: 'Marcus Johnson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17b502726-1763293415212.png",
      avatarAlt: 'Professional headshot of African American man with short hair in navy blazer',
      badge: 'Mentor'
    },
    category: 'Mindfulness & Meditation',
    replies: 31,
    views: 487,
    likes: 42,
    lastReply: '12 min ago',
    isPinned: false,
    hasInstructorReply: false
  },
  {
    id: '3',
    title: 'Best practices for learning React in 2025',
    excerpt: 'I\'m transitioning from Vue to React and looking for recommendations on learning resources and project ideas. What would you suggest for someone with intermediate JavaScript knowledge?',
    author: {
      name: 'Elena Rodriguez',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13001812c-1763294224827.png",
      avatarAlt: 'Professional headshot of Hispanic woman with brown hair in gray sweater',
      badge: 'New Member'
    },
    category: 'Technology & Development',
    replies: 19,
    views: 256,
    likes: 15,
    lastReply: '18 min ago',
    isPinned: false,
    hasInstructorReply: true
  },
  {
    id: '4',
    title: 'Building a sustainable side business while learning',
    excerpt: 'I\'ve been balancing full-time work, learning new skills, and building a side business. Here are some lessons I\'ve learned about time management and prioritization...',
    author: {
      name: 'David Park',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11a2a08ae-1763295050712.png",
      avatarAlt: 'Professional headshot of Asian man with glasses in blue shirt',
      badge: 'Contributor'
    },
    category: 'Business & Leadership',
    replies: 27,
    views: 398,
    likes: 33,
    lastReply: '25 min ago',
    isPinned: false,
    hasInstructorReply: false
  },
  {
    id: '5',
    title: 'Overcoming creative blocks: A designer\'s perspective',
    excerpt: 'Creative blocks are inevitable, but I\'ve developed a toolkit of strategies that help me push through. Sharing what works for me in hopes it helps others...',
    author: {
      name: 'Olivia Martinez',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_179d264c2-1763294988724.png",
      avatarAlt: 'Professional headshot of Caucasian woman with blonde hair in black top',
      badge: 'Active Learner'
    },
    category: 'Creative Arts',
    replies: 16,
    views: 223,
    likes: 21,
    lastReply: '32 min ago',
    isPinned: false,
    hasInstructorReply: false
  }];


  const members: Member[] = [
  {
    id: '1',
    name: 'Dr. Amelia Foster',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2d3f8ee-1763296078446.png",
    avatarAlt: 'Professional headshot of Caucasian woman with red hair in professional attire',
    role: 'Mindfulness Instructor',
    expertise: ['Meditation', 'Stress Management', 'Focus Techniques'],
    contributions: 342,
    helpfulAnswers: 187,
    joinedDate: 'January 2023',
    isOnline: true
  },
  {
    id: '2',
    name: 'James Wilson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1253f34e5-1763292117062.png",
    avatarAlt: 'Professional headshot of Caucasian man with beard in casual shirt',
    role: 'Senior Developer',
    expertise: ['React', 'TypeScript', 'Node.js'],
    contributions: 428,
    helpfulAnswers: 256,
    joinedDate: 'March 2022',
    isOnline: true
  },
  {
    id: '3',
    name: 'Priya Sharma',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b48e387b-1763295656019.png",
    avatarAlt: 'Professional headshot of Indian woman with long dark hair in blue blouse',
    role: 'Business Coach',
    expertise: ['Leadership', 'Strategy', 'Communication'],
    contributions: 289,
    helpfulAnswers: 142,
    joinedDate: 'June 2023',
    isOnline: false
  },
  {
    id: '4',
    name: 'Alex Thompson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18b3032f0-1763296677645.png",
    avatarAlt: 'Professional headshot of Caucasian man with short hair in gray sweater',
    role: 'UX Designer',
    expertise: ['Design Thinking', 'Figma', 'User Research'],
    contributions: 367,
    helpfulAnswers: 198,
    joinedDate: 'September 2022',
    isOnline: true
  },
  {
    id: '5',
    name: 'Maya Patel',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11ca0f56f-1763296594616.png",
    avatarAlt: 'Professional headshot of Indian woman with curly hair in white top',
    role: 'Wellness Expert',
    expertise: ['Nutrition', 'Yoga', 'Holistic Health'],
    contributions: 312,
    helpfulAnswers: 167,
    joinedDate: 'April 2023',
    isOnline: false
  },
  {
    id: '6',
    name: 'Robert Kim',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e9358cd0-1763293605302.png",
    avatarAlt: 'Professional headshot of Asian man in dark suit',
    role: 'Marketing Strategist',
    expertise: ['Digital Marketing', 'SEO', 'Content Strategy'],
    contributions: 294,
    helpfulAnswers: 153,
    joinedDate: 'July 2023',
    isOnline: true
  }];


  const studyGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'Morning Meditation Circle',
    description: 'Start your day with guided meditation and mindfulness practices. Perfect for beginners and experienced practitioners alike.',
    category: 'Mindfulness',
    members: [
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' },
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' },
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' }],

    totalMembers: 24,
    meetingSchedule: 'Daily at 7:00 AM EST',
    nextMeeting: 'Tomorrow, 7:00 AM',
    isOpen: true
  },
  {
    id: '2',
    name: 'React Mastery Cohort',
    description: 'Weekly deep dives into React patterns, best practices, and real-world project building. Collaborative learning with code reviews.',
    category: 'Technology',
    members: [
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' },
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' },
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' }],

    totalMembers: 18,
    meetingSchedule: 'Wednesdays at 6:00 PM EST',
    nextMeeting: 'Dec 27, 6:00 PM',
    isOpen: true
  },
  {
    id: '3',
    name: 'Entrepreneurship Roundtable',
    description: 'Monthly discussions on building sustainable businesses, sharing challenges, and celebrating wins with fellow entrepreneurs.',
    category: 'Business',
    members: [
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' },
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' },
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' }],

    totalMembers: 15,
    meetingSchedule: 'First Friday of month at 5:00 PM EST',
    nextMeeting: 'Jan 5, 5:00 PM',
    isOpen: false
  },
  {
    id: '4',
    name: 'Creative Writing Workshop',
    description: 'Bi-weekly sessions for sharing work, giving feedback, and exploring creative writing techniques in a supportive environment.',
    category: 'Creative Arts',
    members: [
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' },
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' },
    { avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14c0c8d68-1763299875414.png", avatarAlt: 'Member profile photo' }],

    totalMembers: 12,
    meetingSchedule: 'Every other Sunday at 3:00 PM EST',
    nextMeeting: 'Dec 31, 3:00 PM',
    isOpen: true
  }];


  const resources: Resource[] = [
  {
    id: '1',
    title: 'Mindful Learning: A Complete Guide',
    description: 'Comprehensive PDF guide covering techniques for integrating mindfulness into your study routine for better retention and reduced stress.',
    type: 'PDF',
    author: 'Dr. Amelia Foster',
    downloads: 1247,
    rating: 4.8,
    uploadedDate: 'Dec 15, 2024',
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    title: 'React Hooks Deep Dive',
    description: 'Video series exploring advanced React Hooks patterns with real-world examples and best practices for modern applications.',
    type: 'Video',
    author: 'James Wilson',
    downloads: 892,
    rating: 4.9,
    uploadedDate: 'Dec 10, 2024',
    fileSize: '450 MB'
  },
  {
    id: '3',
    title: 'Guided Meditation for Focus',
    description: 'Audio collection of 10-minute guided meditations specifically designed to enhance concentration before study sessions.',
    type: 'Audio',
    author: 'Dr. Amelia Foster',
    downloads: 2134,
    rating: 4.7,
    uploadedDate: 'Dec 8, 2024',
    fileSize: '85 MB'
  },
  {
    id: '4',
    title: 'Business Strategy Templates',
    description: 'Downloadable templates for business planning, market analysis, and strategic decision-making frameworks.',
    type: 'PDF',
    author: 'Priya Sharma',
    downloads: 678,
    rating: 4.6,
    uploadedDate: 'Dec 5, 2024',
    fileSize: '1.8 MB'
  },
  {
    id: '5',
    title: 'Design Thinking Workshop Recording',
    description: 'Full recording of our recent design thinking workshop with interactive exercises and case study analysis.',
    type: 'Video',
    author: 'Alex Thompson',
    downloads: 543,
    rating: 4.8,
    uploadedDate: 'Dec 1, 2024',
    fileSize: '680 MB'
  },
  {
    id: '6',
    title: 'Wellness Routine Planner',
    description: 'Printable planner for tracking daily wellness habits, nutrition, exercise, and mindfulness practices.',
    type: 'PDF',
    author: 'Maya Patel',
    downloads: 1456,
    rating: 4.9,
    uploadedDate: 'Nov 28, 2024',
    fileSize: '3.2 MB'
  }];


  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveTab('discussions');
  };

  const handleDiscussionClick = (discussionId: string) => {
    if (!isHydrated) return;
    console.log('Opening discussion:', discussionId);
  };

  const handleMemberClick = (memberId: string) => {
    if (!isHydrated) return;
    console.log('Viewing member profile:', memberId);
  };

  const handleJoinGroup = (groupId: string) => {
    if (!isHydrated) return;
    console.log('Joining study group:', groupId);
  };

  const handleDownloadResource = (resourceId: string) => {
    if (!isHydrated) return;
    console.log('Downloading resource:', resourceId);
  };

  const filteredDiscussions = selectedCategory === 'all' ?
  discussions :
  discussions.filter((d) => d.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-muted rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) =>
              <div key={i} className="h-48 bg-muted rounded-xl" />
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h2 className="font-headline text-3xl font-semibold text-foreground mb-2">
                Discussion Categories
              </h2>
              <p className="font-body text-muted-foreground">
                Explore topics that resonate with your learning journey
              </p>
            </div>
            <div className="relative">
              <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-80 pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300" />

            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) =>
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category.id)} />

            )}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-6 py-4 font-cta font-medium text-sm transition-all duration-300 relative ${
              activeTab === 'discussions' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
              }>

              Discussions
              {activeTab === 'discussions' &&
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              }
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-6 py-4 font-cta font-medium text-sm transition-all duration-300 relative ${
              activeTab === 'members' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
              }>

              Members
              {activeTab === 'members' &&
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              }
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-6 py-4 font-cta font-medium text-sm transition-all duration-300 relative ${
              activeTab === 'groups' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
              }>

              Study Groups
              {activeTab === 'groups' &&
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              }
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-4 font-cta font-medium text-sm transition-all duration-300 relative ${
              activeTab === 'resources' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
              }>

              Resources
              {activeTab === 'resources' &&
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              }
            </button>
          </div>

          {activeTab === 'discussions' &&
          <div className="space-y-4">
              {selectedCategory !== 'all' &&
            <div className="flex items-center gap-2 mb-6">
                  <button
                onClick={() => setSelectedCategory('all')}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-300">

                    <Icon name="XMarkIcon" size={16} />
                    <span className="text-sm font-medium">Clear filter</span>
                  </button>
                </div>
            }
              {filteredDiscussions.map((discussion) =>
            <DiscussionCard
              key={discussion.id}
              discussion={discussion}
              onClick={() => handleDiscussionClick(discussion.id)} />

            )}
            </div>
          }

          {activeTab === 'members' &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) =>
            <MemberCard
              key={member.id}
              member={member}
              onClick={() => handleMemberClick(member.id)} />

            )}
            </div>
          }

          {activeTab === 'groups' &&
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyGroups.map((group) =>
            <StudyGroupCard
              key={group.id}
              group={group}
              onJoin={() => handleJoinGroup(group.id)} />

            )}
            </div>
          }

          {activeTab === 'resources' &&
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource) =>
            <ResourceCard
              key={resource.id}
              resource={resource}
              onDownload={() => handleDownloadResource(resource.id)} />

            )}
            </div>
          }
        </section>

        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-2xl p-8 lg:p-12 text-center">
          <Icon name="ChatBubbleLeftRightIcon" size={48} className="text-primary mx-auto mb-6" />
          <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">
            Start Your First Discussion
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have a question or insight to share? Our community is here to support your learning journey with thoughtful conversations and meaningful connections.
          </p>
          <button className="px-8 py-4 font-cta font-semibold text-primary-foreground bg-primary rounded-lg hover:shadow-cta transition-all duration-300 hover:-translate-y-0.5">
            Create New Discussion
          </button>
        </section>
      </div>
    </div>);

};

export default CommunityInteractive;