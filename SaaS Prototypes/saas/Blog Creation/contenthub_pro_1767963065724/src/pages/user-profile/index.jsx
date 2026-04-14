import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import AchievementBadges from './components/AchievementBadges';
import ArticleGrid from './components/ArticleGrid';
import ActivityFeed from './components/ActivityFeed';
import FollowersModal from './components/FollowersModal';
import ProfileSidebar from './components/ProfileSidebar';

const UserProfile = () => {
  const [searchParams] = useSearchParams();
  const profileId = searchParams?.get('id');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [followersModalType, setFollowersModalType] = useState('followers');
  const [currentUser] = useState({
    id: 'current-user-123',
    name: 'Current User',
    email: 'current@example.com',
    role: 'creator'
  });

  // Mock user data
  const mockUser = {
    id: profileId || 'user-123',
    name: 'Sarah Johnson',
    username: 'sarahjohnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    bio: `Passionate content creator and digital marketing strategist with 5+ years of experience. I love sharing insights about technology, design, and entrepreneurship. Always learning, always growing.`,
    location: 'San Francisco, CA',
    joinedDate: 'March 2021',
    isVerified: true,
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/sarahjohnson', icon: 'Twitter' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/sarahjohnson', icon: 'Linkedin' },
      { platform: 'Website', url: 'https://sarahjohnson.com', icon: 'Globe' }
    ]
  };

  const mockStats = {
    articlesCount: 47,
    followersCount: 2847,
    followingCount: 156,
    totalViews: 125400
  };

  const mockAchievements = [
    {
      id: 1,
      title: 'First Article',
      description: 'Published your first article',
      icon: 'FileText',
      tier: 'bronze',
      earnedDate: '2021-03-15'
    },
    {
      id: 2,
      title: 'Popular Writer',
      description: 'Reached 1K total views',
      icon: 'TrendingUp',
      tier: 'silver',
      earnedDate: '2021-06-20'
    },
    {
      id: 3,
      title: 'Community Favorite',
      description: 'Received 100 likes on a single article',
      icon: 'Heart',
      tier: 'gold',
      earnedDate: '2021-09-10'
    },
    {
      id: 4,
      title: 'Consistent Creator',
      description: 'Published 10 articles in a month',
      icon: 'Calendar',
      tier: 'platinum',
      progress: { current: 8, total: 10 }
    },
    {
      id: 5,
      title: 'Engagement Master',
      description: 'Maintain 90%+ response rate',
      icon: 'MessageCircle',
      tier: 'gold',
      progress: { current: 94, total: 100 }
    },
    {
      id: 6,
      title: 'Thought Leader',
      description: 'Gain 1000 followers',
      icon: 'Users',
      tier: 'platinum',
      progress: { current: 847, total: 1000 }
    }
  ];

  const mockArticles = [
    {
      id: 1,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt: 'Exploring the latest trends and technologies that will shape web development in the coming year, from AI integration to new frameworks.',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      category: 'technology',
      publishedAt: '2024-01-15T10:00:00Z',
      readTime: 8,
      views: 15420,
      likes: 342,
      comments: 28,
      status: 'published'
    },
    {
      id: 2,
      title: 'Building Accessible User Interfaces: A Complete Guide',
      excerpt: 'Learn how to create inclusive web experiences that work for everyone, including users with disabilities.',
      thumbnail: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600&h=400&fit=crop',
      category: 'design',
      publishedAt: '2024-01-10T14:30:00Z',
      readTime: 12,
      views: 8930,
      likes: 156,
      comments: 19,
      status: 'published'
    },
    {
      id: 3,
      title: 'Scaling Your Startup: Lessons from Silicon Valley',
      excerpt: 'Key insights and strategies for growing your startup from idea to successful business.',
      thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
      category: 'business',
      publishedAt: '2024-01-05T09:15:00Z',
      readTime: 6,
      views: 12750,
      likes: 289,
      comments: 45,
      status: 'published'
    },
    {
      id: 4,
      title: 'The Art of Minimalist Design in Digital Products',
      excerpt: 'How to create beautiful, functional designs by embracing simplicity and focusing on what matters most.',
      thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop',
      category: 'design',
      publishedAt: '2023-12-28T16:45:00Z',
      readTime: 5,
      views: 6840,
      likes: 198,
      comments: 12,
      status: 'published'
    },
    {
      id: 5,
      title: 'Remote Work Best Practices for Creative Teams',
      excerpt: 'Tips and tools for maintaining creativity and collaboration in distributed teams.',
      thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
      category: 'lifestyle',
      publishedAt: '2023-12-20T11:20:00Z',
      readTime: 7,
      views: 9560,
      likes: 234,
      comments: 31,
      status: 'published'
    },
    {
      id: 6,
      title: 'Understanding React Server Components',
      excerpt: 'A deep dive into React Server Components and how they can improve your application performance.',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
      category: 'technology',
      publishedAt: '2023-12-15T13:10:00Z',
      readTime: 10,
      views: 18200,
      likes: 412,
      comments: 67,
      status: 'draft'
    }
  ];

  const mockActivities = [
    {
      id: 1,
      type: 'article_published',
      description: 'Published a new article',
      timestamp: '2024-01-15T10:00:00Z',
      target: {
        type: 'article',
        id: 1,
        title: 'The Future of Web Development: Trends to Watch in 2024',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
        category: 'Technology'
      }
    },
    {
      id: 2,
      type: 'achievement_earned',
      description: 'Earned a new achievement',
      timestamp: '2024-01-14T15:30:00Z',
      target: {
        type: 'achievement',
        title: 'Popular Writer',
        description: 'Reached 1K total views'
      }
    },
    {
      id: 3,
      type: 'user_followed',
      description: 'Started following a new author',
      timestamp: '2024-01-13T09:20:00Z',
      target: {
        type: 'user',
        id: 'user-456',
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      }
    },
    {
      id: 4,
      type: 'comment_posted',
      description: 'Commented on an article',
      timestamp: '2024-01-12T14:45:00Z',
      target: {
        type: 'article',
        id: 2,
        title: 'Building Accessible User Interfaces',
        thumbnail: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600&h=400&fit=crop',
        category: 'Design'
      }
    },
    {
      id: 5,
      type: 'article_liked',
      description: 'Liked an article',
      timestamp: '2024-01-11T11:15:00Z',
      target: {
        type: 'article',
        id: 3,
        title: 'Scaling Your Startup: Lessons from Silicon Valley',
        thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
        category: 'Business'
      }
    }
  ];

  const mockFollowers = [
    {
      id: 'follower-1',
      name: 'Alex Chen',
      username: 'alexchen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Frontend developer passionate about React and TypeScript'
    },
    {
      id: 'follower-2',
      name: 'Maria Garcia',
      username: 'mariagarcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'UX designer creating delightful user experiences'
    },
    {
      id: 'follower-3',
      name: 'David Kim',
      username: 'davidkim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      bio: 'Product manager and startup enthusiast'
    },
    {
      id: 'follower-4',
      name: 'Emily Johnson',
      username: 'emilyjohnson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      bio: 'Content strategist and digital marketing expert'
    },
    {
      id: 'follower-5',
      name: 'Michael Brown',
      username: 'michaelbrown',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Full-stack developer and tech blogger'
    }
  ];

  const mockRelatedAuthors = [
    {
      id: 'author-1',
      name: 'Jessica Lee',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
      articlesCount: 23
    },
    {
      id: 'author-2',
      name: 'Robert Wilson',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      articlesCount: 31
    },
    {
      id: 'author-3',
      name: 'Lisa Zhang',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      articlesCount: 18
    }
  ];

  const isOwnProfile = !profileId || profileId === currentUser?.id;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleEditProfile = () => {
    // Edit profile logic would go here
    console.log('Edit profile clicked');
  };

  const handleImageUpload = (file) => {
    // Image upload logic would go here
    console.log('Image uploaded:', file);
  };

  const handleShowFollowers = (type) => {
    setFollowersModalType(type);
    setShowFollowersModal(true);
  };

  useEffect(() => {
    // Simulate checking follow status
    if (!isOwnProfile) {
      setIsFollowing(Math.random() > 0.5);
    }
  }, [profileId, isOwnProfile]);

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} notificationCount={3} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <ProfileHeader
                user={mockUser}
                isOwnProfile={isOwnProfile}
                isFollowing={isFollowing}
                onFollow={handleFollow}
                onEditProfile={handleEditProfile}
                onImageUpload={handleImageUpload}
              />

              <ProfileStats stats={mockStats} />

              <AchievementBadges achievements={mockAchievements} />

              <ArticleGrid articles={mockArticles} isOwnProfile={isOwnProfile} />

              <ActivityFeed activities={mockActivities} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ProfileSidebar
                  user={mockUser}
                  relatedAuthors={mockRelatedAuthors}
                  recentActivity={mockActivities}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Followers Modal */}
      <FollowersModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        followers={mockFollowers}
        type={followersModalType}
      />
    </div>
  );
};

export default UserProfile;