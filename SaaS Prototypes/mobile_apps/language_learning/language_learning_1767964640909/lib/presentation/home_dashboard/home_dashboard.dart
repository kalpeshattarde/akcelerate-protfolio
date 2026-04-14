import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/ai_recommended_lessons_widget.dart';
import './widgets/continuing_lesson_widget.dart';
import './widgets/daily_goal_card_widget.dart';
import './widgets/quick_access_toolbar_widget.dart';
import './widgets/recent_achievements_widget.dart';
import './widgets/social_elements_widget.dart';
import './widgets/user_header_widget.dart';

class HomeDashboard extends StatefulWidget {
  const HomeDashboard({Key? key}) : super(key: key);

  @override
  State<HomeDashboard> createState() => _HomeDashboardState();
}

class _HomeDashboardState extends State<HomeDashboard>
    with TickerProviderStateMixin {
  late AnimationController _refreshController;
  late Animation<double> _refreshAnimation;
  bool _isRefreshing = false;

  // Mock user data
  final Map<String, dynamic> userData = {
    "name": "Sarah Chen",
    "avatar":
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    "streakCount": 15,
    "currentXP": 2850,
    "nextLevelXP": 3000,
    "currentLevel": 12,
  };

  // Mock daily goal data
  final Map<String, dynamic> dailyGoalData = {
    "completedGoals": 3,
    "totalGoals": 5,
    "motivationalMessage": "You're doing great! Keep up the momentum!",
  };

  // Mock AI recommended lessons
  final List<Map<String, dynamic>> recommendedLessons = [
    {
      "id": 1,
      "title": "Advanced Conversation Skills",
      "description":
          "Master natural dialogue patterns and cultural nuances in everyday conversations.",
      "difficulty": "Advanced",
      "duration": 25,
      "image":
          "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      "id": 2,
      "title": "Business Spanish Essentials",
      "description":
          "Professional vocabulary and phrases for workplace communication.",
      "difficulty": "Intermediate",
      "duration": 20,
      "image":
          "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      "id": 3,
      "title": "Grammar Fundamentals",
      "description":
          "Build a strong foundation with essential grammar rules and structures.",
      "difficulty": "Beginner",
      "duration": 15,
      "image":
          "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  // Mock recent achievements
  final List<Map<String, dynamic>> recentAchievements = [
    {
      "id": 1,
      "title": "Streak Master",
      "description":
          "Maintained a 15-day learning streak! Your consistency is paying off.",
      "icon": "local_fire_department",
      "unlockedAt": "2025-08-21",
    },
    {
      "id": 2,
      "title": "Grammar Guru",
      "description": "Completed 50 grammar exercises with 95% accuracy.",
      "icon": "school",
      "unlockedAt": "2025-08-20",
    },
    {
      "id": 3,
      "title": "Conversation Champion",
      "description":
          "Successfully completed 10 conversation practice sessions.",
      "icon": "chat",
      "unlockedAt": "2025-08-19",
    },
  ];

  // Mock continuing lesson
  final Map<String, dynamic> continuingLesson = {
    "id": 4,
    "title": "Travel Spanish: Airport & Hotels",
    "description":
        "Essential phrases for navigating airports and hotel check-ins.",
    "progress": 65.0,
    "image":
        "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400",
  };

  // Mock friend activities
  final List<Map<String, dynamic>> friendActivities = [
    {
      "id": 1,
      "name": "Alex Rodriguez",
      "avatar":
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      "activity": "Completed Advanced Grammar lesson",
      "timestamp": "2 hours ago",
    },
    {
      "id": 2,
      "name": "Maria Santos",
      "avatar":
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
      "activity": "Earned 'Pronunciation Pro' badge",
      "timestamp": "4 hours ago",
    },
    {
      "id": 3,
      "name": "David Kim",
      "avatar":
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
      "activity": "Reached Level 8 milestone",
      "timestamp": "6 hours ago",
    },
  ];

  // Mock leaderboard
  final List<Map<String, dynamic>> leaderboard = [
    {
      "id": 1,
      "name": "Emma Wilson",
      "avatar":
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      "level": 15,
      "xp": 4250,
    },
    {
      "id": 2,
      "name": "Sarah Chen",
      "avatar":
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      "level": 12,
      "xp": 2850,
    },
    {
      "id": 3,
      "name": "James Thompson",
      "avatar":
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      "level": 11,
      "xp": 2640,
    },
  ];

  @override
  void initState() {
    super.initState();
    _refreshController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    _refreshAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _refreshController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _refreshController.dispose();
    super.dispose();
  }

  Future<void> _handleRefresh() async {
    if (_isRefreshing) return;

    setState(() {
      _isRefreshing = true;
    });

    _refreshController.forward();

    // Simulate API call delay
    await Future.delayed(const Duration(seconds: 2));

    _refreshController.reverse();

    setState(() {
      _isRefreshing = false;
    });
  }

  void _handleLessonTap(Map<String, dynamic> lesson) {
    Navigator.pushNamed(context, '/lesson-interface');
  }

  void _handleResumeTap(Map<String, dynamic> lesson) {
    Navigator.pushNamed(context, '/lesson-interface');
  }

  void _handleToolTap(String toolId) {
    // Handle quick access tool tap
    print('Tool tapped: $toolId');
  }

  void _handleViewAllFriends() {
    Navigator.pushNamed(context, '/social-features-hub');
  }

  void _handleViewLeaderboard() {
    Navigator.pushNamed(context, '/social-features-hub');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _handleRefresh,
          color: AppTheme.lightTheme.colorScheme.primary,
          child: CustomScrollView(
            slivers: [
              // App Bar
              SliverAppBar(
                floating: true,
                snap: true,
                backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
                elevation: 0,
                title: Row(
                  children: [
                    Text(
                      'LinguaFlow',
                      style:
                          AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                        color: AppTheme.lightTheme.colorScheme.primary,
                      ),
                    ),
                    const Spacer(),
                    AnimatedBuilder(
                      animation: _refreshAnimation,
                      builder: (context, child) {
                        return Transform.rotate(
                          angle: _refreshAnimation.value * 2 * 3.14159,
                          child: IconButton(
                            onPressed: _isRefreshing ? null : _handleRefresh,
                            icon: CustomIconWidget(
                              iconName: 'refresh',
                              color: _isRefreshing
                                  ? AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant
                                  : AppTheme.lightTheme.colorScheme.primary,
                              size: 24,
                            ),
                          ),
                        );
                      },
                    ),
                    IconButton(
                      onPressed: () =>
                          Navigator.pushNamed(context, '/settings-and-profile'),
                      icon: CustomIconWidget(
                        iconName: 'person',
                        color: AppTheme.lightTheme.colorScheme.primary,
                        size: 24,
                      ),
                    ),
                  ],
                ),
              ),

              // Main Content
              SliverToBoxAdapter(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: 2.h),

                    // User Header
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 4.w),
                      child: UserHeaderWidget(
                        userName: userData['name'] as String,
                        userAvatar: userData['avatar'] as String,
                        streakCount: userData['streakCount'] as int,
                        currentXP: userData['currentXP'] as int,
                        nextLevelXP: userData['nextLevelXP'] as int,
                        currentLevel: userData['currentLevel'] as int,
                      ),
                    ),
                    SizedBox(height: 3.h),

                    // Daily Goal Card
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 4.w),
                      child: DailyGoalCardWidget(
                        completedGoals: dailyGoalData['completedGoals'] as int,
                        totalGoals: dailyGoalData['totalGoals'] as int,
                        motivationalMessage:
                            dailyGoalData['motivationalMessage'] as String,
                      ),
                    ),
                    SizedBox(height: 3.h),

                    // Continuing Lesson
                    ContinuingLessonWidget(
                      continuingLesson: continuingLesson,
                      onResumeTap: _handleResumeTap,
                    ),
                    SizedBox(height: 3.h),

                    // AI Recommended Lessons
                    AIRecommendedLessonsWidget(
                      recommendedLessons: recommendedLessons,
                      onLessonTap: _handleLessonTap,
                    ),
                    SizedBox(height: 3.h),

                    // Quick Access Toolbar
                    QuickAccessToolbarWidget(
                      onToolTap: _handleToolTap,
                    ),
                    SizedBox(height: 3.h),

                    // Recent Achievements
                    RecentAchievementsWidget(
                      achievements: recentAchievements,
                    ),
                    SizedBox(height: 3.h),

                    // Social Elements
                    SocialElementsWidget(
                      friendActivities: friendActivities,
                      leaderboard: leaderboard,
                      onViewAllFriends: _handleViewAllFriends,
                      onViewLeaderboard: _handleViewLeaderboard,
                    ),
                    SizedBox(height: 4.h),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),

      // Floating Action Button
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => Navigator.pushNamed(context, '/lesson-interface'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        foregroundColor: Colors.white,
        icon: CustomIconWidget(
          iconName: 'play_arrow',
          color: Colors.white,
          size: 24,
        ),
        label: Text(
          'Start Learning',
          style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}
