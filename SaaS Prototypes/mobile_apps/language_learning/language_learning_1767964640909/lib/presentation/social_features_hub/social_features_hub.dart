import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/conversation_room_card_widget.dart';
import './widgets/discussion_forum_card_widget.dart';
import './widgets/friend_card_widget.dart';
import './widgets/leaderboard_card_widget.dart';
import './widgets/study_group_card_widget.dart';

class SocialFeaturesHub extends StatefulWidget {
  const SocialFeaturesHub({Key? key}) : super(key: key);

  @override
  State<SocialFeaturesHub> createState() => _SocialFeaturesHubState();
}

class _SocialFeaturesHubState extends State<SocialFeaturesHub>
    with TickerProviderStateMixin {
  late TabController _tabController;
  int _selectedIndex = 0;
  bool _hasNewActivities = true;

  // Mock data for friends
  final List<Map<String, dynamic>> _friends = [
    {
      "id": 1,
      "name": "Emma Rodriguez",
      "avatar":
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isOnline": true,
      "currentStreak": 15,
      "level": 8,
      "recentAchievements": [
        {"name": "Grammar Master", "icon": "school"}
      ]
    },
    {
      "id": 2,
      "name": "Marcus Chen",
      "avatar":
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isOnline": false,
      "currentStreak": 7,
      "level": 5,
      "recentAchievements": [
        {"name": "Vocabulary Builder", "icon": "book"}
      ]
    },
    {
      "id": 3,
      "name": "Sofia Andersson",
      "avatar":
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isOnline": true,
      "currentStreak": 23,
      "level": 12,
      "recentAchievements": [
        {"name": "Conversation Pro", "icon": "chat"}
      ]
    },
    {
      "id": 4,
      "name": "Ahmed Hassan",
      "avatar":
          "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isOnline": false,
      "currentStreak": 3,
      "level": 3,
      "recentAchievements": []
    }
  ];

  // Mock data for leaderboard
  final List<Map<String, dynamic>> _leaderboard = [
    {
      "id": 1,
      "name": "Sofia Andersson",
      "avatar":
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      "xp": 15420,
      "weeklyXp": 2850,
      "previousRank": 2
    },
    {
      "id": 2,
      "name": "David Kim",
      "avatar":
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      "xp": 14890,
      "weeklyXp": 2650,
      "previousRank": 1
    },
    {
      "id": 3,
      "name": "Emma Rodriguez",
      "avatar":
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      "xp": 14200,
      "weeklyXp": 2400,
      "previousRank": 3
    },
    {
      "id": 4,
      "name": "You",
      "avatar":
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      "xp": 13850,
      "weeklyXp": 2200,
      "previousRank": 5
    },
    {
      "id": 5,
      "name": "Marcus Chen",
      "avatar":
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      "xp": 13500,
      "weeklyXp": 2100,
      "previousRank": 4
    }
  ];

  // Mock data for study groups
  final List<Map<String, dynamic>> _studyGroups = [
    {
      "id": 1,
      "name": "Spanish Conversation Circle",
      "description":
          "Practice conversational Spanish with fellow learners. Focus on everyday topics and cultural discussions.",
      "language": "Spanish",
      "level": "Intermediate",
      "members": [
        {
          "avatar":
              "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          "avatar":
              "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          "avatar":
              "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          "avatar":
              "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          "avatar":
              "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ],
      "maxMembers": 12,
      "isActive": true,
      "hasActiveDiscussion": true,
      "isMember": false
    },
    {
      "id": 2,
      "name": "French Grammar Masters",
      "description":
          "Deep dive into French grammar rules, conjugations, and complex sentence structures.",
      "language": "French",
      "level": "Advanced",
      "members": [
        {
          "avatar":
              "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          "avatar":
              "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          "avatar":
              "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ],
      "maxMembers": 8,
      "isActive": false,
      "hasActiveDiscussion": false,
      "isMember": true
    },
    {
      "id": 3,
      "name": "German Beginners Unite",
      "description":
          "Start your German journey with other beginners. Learn basic vocabulary and pronunciation together.",
      "language": "German",
      "level": "Beginner",
      "members": [
        {
          "avatar":
              "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          "avatar":
              "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ],
      "maxMembers": 15,
      "isActive": true,
      "hasActiveDiscussion": true,
      "isMember": false
    }
  ];

  // Mock data for conversation rooms
  final List<Map<String, dynamic>> _conversationRooms = [
    {
      "id": 1,
      "topic": "Travel Stories & Adventures",
      "language": "English",
      "skillLevel": "Intermediate",
      "participants": [
        {
          "avatar":
              "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          "avatar":
              "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          "avatar":
              "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ],
      "maxParticipants": 6,
      "isLive": true,
      "duration": "45 min"
    },
    {
      "id": 2,
      "topic": "Business Spanish Networking",
      "language": "Spanish",
      "skillLevel": "Advanced",
      "participants": [
        {
          "avatar":
              "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          "avatar":
              "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ],
      "maxParticipants": 4,
      "isLive": false,
      "duration": "30 min"
    }
  ];

  // Mock data for discussion forums
  final List<Map<String, dynamic>> _discussions = [
    {
      "id": 1,
      "title": "Best strategies for memorizing irregular verbs?",
      "preview":
          "I'm struggling with Spanish irregular verbs. What techniques have worked best for you? Looking for practical tips and memory tricks.",
      "category": "Grammar",
      "author": {
        "name": "Emma Rodriguez",
        "avatar":
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      "replies": 23,
      "likes": 45,
      "hasExpertAnswer": true,
      "lastActivity": "2 hours ago",
      "isHot": true
    },
    {
      "id": 2,
      "title": "French pronunciation: Rolling R's",
      "preview":
          "Native French speakers, how do you properly roll your R's? I've been practicing for months but still can't get it right.",
      "category": "Pronunciation",
      "author": {
        "name": "Marcus Chen",
        "avatar":
            "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      "replies": 18,
      "likes": 32,
      "hasExpertAnswer": false,
      "lastActivity": "5 hours ago",
      "isHot": false
    },
    {
      "id": 3,
      "title": "Cultural differences in German business etiquette",
      "preview":
          "Planning to work in Germany soon. What are the key cultural differences I should be aware of in professional settings?",
      "category": "Culture",
      "author": {
        "name": "Sofia Andersson",
        "avatar":
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      "replies": 12,
      "likes": 28,
      "hasExpertAnswer": true,
      "lastActivity": "1 day ago",
      "isHot": false
    }
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _tabController.addListener(() {
      if (!_tabController.indexIsChanging) {
        setState(() {
          _selectedIndex = _tabController.index;
        });
      }
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Row(
          children: [
            Text(
              'Social Hub',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
            ),
            if (_hasNewActivities) ...[
              SizedBox(width: 2.w),
              Container(
                width: 2.w,
                height: 2.w,
                decoration: BoxDecoration(
                  color: Colors.red,
                  shape: BoxShape.circle,
                ),
              ),
            ],
          ],
        ),
        actions: [
          IconButton(
            onPressed: () {
              // Handle notifications
            },
            icon: Stack(
              children: [
                CustomIconWidget(
                  iconName: 'notifications_outlined',
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  size: 24,
                ),
                if (_hasNewActivities)
                  Positioned(
                    right: 0,
                    top: 0,
                    child: Container(
                      width: 2.w,
                      height: 2.w,
                      decoration: BoxDecoration(
                        color: Colors.red,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
              ],
            ),
          ),
          IconButton(
            onPressed: () {
              Navigator.pushNamed(context, '/settings-and-profile');
            },
            icon: CustomIconWidget(
              iconName: 'person_outline',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CustomIconWidget(
                    iconName: 'people_outline',
                    color: _selectedIndex == 0
                        ? AppTheme.lightTheme.colorScheme.primary
                        : AppTheme.lightTheme.colorScheme.onSurface
                            .withValues(alpha: 0.6),
                    size: 20,
                  ),
                  SizedBox(width: 1.w),
                  Text('Friends'),
                ],
              ),
            ),
            Tab(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CustomIconWidget(
                    iconName: 'leaderboard',
                    color: _selectedIndex == 1
                        ? AppTheme.lightTheme.colorScheme.primary
                        : AppTheme.lightTheme.colorScheme.onSurface
                            .withValues(alpha: 0.6),
                    size: 20,
                  ),
                  SizedBox(width: 1.w),
                  Text('Leaderboard'),
                ],
              ),
            ),
            Tab(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CustomIconWidget(
                    iconName: 'groups',
                    color: _selectedIndex == 2
                        ? AppTheme.lightTheme.colorScheme.primary
                        : AppTheme.lightTheme.colorScheme.onSurface
                            .withValues(alpha: 0.6),
                    size: 20,
                  ),
                  SizedBox(width: 1.w),
                  Text('Groups'),
                ],
              ),
            ),
          ],
        ),
      ),
      body: SafeArea(
        child: TabBarView(
          controller: _tabController,
          children: [
            _buildFriendsTab(),
            _buildLeaderboardTab(),
            _buildGroupsTab(),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _showQuickActionSheet(context);
        },
        child: CustomIconWidget(
          iconName: 'add',
          color: Colors.white,
          size: 24,
        ),
      ),
    );
  }

  Widget _buildFriendsTab() {
    return RefreshIndicator(
      onRefresh: () async {
        // Simulate refresh
        await Future.delayed(Duration(seconds: 1));
        setState(() {
          _hasNewActivities = false;
        });
      },
      child: CustomScrollView(
        slivers: [
          // Online friends section
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Row(
                children: [
                  CustomIconWidget(
                    iconName: 'circle',
                    color: Colors.green,
                    size: 12,
                  ),
                  SizedBox(width: 2.w),
                  Text(
                    'Online Now',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                  Spacer(),
                  TextButton(
                    onPressed: () {
                      // Handle find friends
                    },
                    child: Text('Find Friends'),
                  ),
                ],
              ),
            ),
          ),

          // Friends list
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final friend = _friends[index];
                return FriendCardWidget(
                  friend: friend,
                  onTap: () {
                    // Handle friend profile view
                  },
                );
              },
              childCount: _friends.length,
            ),
          ),

          // Language exchange section
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 2.h),
                  Text(
                    'Language Exchange Partners',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                  SizedBox(height: 1.h),
                  Card(
                    child: Padding(
                      padding: EdgeInsets.all(4.w),
                      child: Column(
                        children: [
                          CustomIconWidget(
                            iconName: 'language',
                            color: AppTheme.lightTheme.colorScheme.primary,
                            size: 48,
                          ),
                          SizedBox(height: 2.h),
                          Text(
                            'Connect with Native Speakers',
                            style: Theme.of(context)
                                .textTheme
                                .titleMedium
                                ?.copyWith(
                                  fontWeight: FontWeight.w600,
                                ),
                            textAlign: TextAlign.center,
                          ),
                          SizedBox(height: 1.h),
                          Text(
                            'Practice with native speakers and help others learn your language',
                            style: Theme.of(context).textTheme.bodyMedium,
                            textAlign: TextAlign.center,
                          ),
                          SizedBox(height: 2.h),
                          ElevatedButton(
                            onPressed: () {
                              // Handle language exchange matching
                            },
                            child: Text('Find Exchange Partner'),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLeaderboardTab() {
    return RefreshIndicator(
      onRefresh: () async {
        await Future.delayed(Duration(seconds: 1));
      },
      child: CustomScrollView(
        slivers: [
          // Time period selector
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Row(
                children: [
                  Text(
                    'Weekly Rankings',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                  Spacer(),
                  SegmentedButton<String>(
                    segments: [
                      ButtonSegment(value: 'week', label: Text('Week')),
                      ButtonSegment(value: 'month', label: Text('Month')),
                    ],
                    selected: {'week'},
                    onSelectionChanged: (Set<String> selection) {
                      // Handle time period change
                    },
                  ),
                ],
              ),
            ),
          ),

          // Leaderboard list
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final user = _leaderboard[index];
                return LeaderboardCardWidget(
                  user: user,
                  rank: index + 1,
                  isCurrentUser: user['name'] == 'You',
                );
              },
              childCount: _leaderboard.length,
            ),
          ),

          // Motivational section
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Card(
                color: AppTheme.lightTheme.colorScheme.primary
                    .withValues(alpha: 0.1),
                child: Padding(
                  padding: EdgeInsets.all(4.w),
                  child: Column(
                    children: [
                      CustomIconWidget(
                        iconName: 'emoji_events',
                        color: AppTheme.lightTheme.colorScheme.tertiary,
                        size: 48,
                      ),
                      SizedBox(height: 2.h),
                      Text(
                        'Keep Learning!',
                        style:
                            Theme.of(context).textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.w600,
                                ),
                      ),
                      SizedBox(height: 1.h),
                      Text(
                        'You need 350 more XP to reach 3rd place. Complete today\'s lessons to climb the leaderboard!',
                        style: Theme.of(context).textTheme.bodyMedium,
                        textAlign: TextAlign.center,
                      ),
                      SizedBox(height: 2.h),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.pushNamed(context, '/lesson-interface');
                        },
                        child: Text('Start Learning'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGroupsTab() {
    return RefreshIndicator(
      onRefresh: () async {
        await Future.delayed(Duration(seconds: 1));
      },
      child: CustomScrollView(
        slivers: [
          // Live conversation rooms
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Text(
                'Live Conversation Rooms',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ),
          ),

          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final room = _conversationRooms[index];
                return ConversationRoomCardWidget(
                  room: room,
                  onJoin: () {
                    // Handle join conversation room
                  },
                );
              },
              childCount: _conversationRooms.length,
            ),
          ),

          // Study groups
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Text(
                'Study Groups',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ),
          ),

          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final group = _studyGroups[index];
                return StudyGroupCardWidget(
                  group: group,
                  onJoin: () {
                    // Handle join study group
                  },
                  onTap: () {
                    // Handle view study group
                  },
                );
              },
              childCount: _studyGroups.length,
            ),
          ),

          // Discussion forums
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Text(
                'Discussion Forums',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ),
          ),

          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final discussion = _discussions[index];
                return DiscussionForumCardWidget(
                  discussion: discussion,
                  onTap: () {
                    // Handle view discussion
                  },
                );
              },
              childCount: _discussions.length,
            ),
          ),

          // Bottom padding
          SliverToBoxAdapter(
            child: SizedBox(height: 10.h),
          ),
        ],
      ),
    );
  }

  void _showQuickActionSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            SizedBox(height: 3.h),
            Text(
              'Quick Actions',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
            ),
            SizedBox(height: 3.h),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'person_add',
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 24,
              ),
              title: Text('Invite Friends'),
              subtitle: Text('Share LinguaFlow with friends'),
              onTap: () {
                Navigator.pop(context);
                // Handle invite friends
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'group_add',
                color: AppTheme.lightTheme.colorScheme.secondary,
                size: 24,
              ),
              title: Text('Create Study Group'),
              subtitle: Text('Start a new learning community'),
              onTap: () {
                Navigator.pop(context);
                // Handle create study group
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'chat',
                color: AppTheme.lightTheme.colorScheme.tertiary,
                size: 24,
              ),
              title: Text('Start Conversation Room'),
              subtitle: Text('Host a live speaking session'),
              onTap: () {
                Navigator.pop(context);
                // Handle start conversation room
              },
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }
}
