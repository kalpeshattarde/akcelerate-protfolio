import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/achievement_gallery_widget.dart';
import './widgets/proficiency_radar_chart.dart';
import './widgets/skill_performance_cards.dart';
import './widgets/social_comparison_widget.dart';
import './widgets/streak_calendar_widget.dart';
import './widgets/vocabulary_retention_chart.dart';
import './widgets/weekly_learning_chart.dart';
import './widgets/xp_progression_chart.dart';

class ProgressAnalytics extends StatefulWidget {
  const ProgressAnalytics({Key? key}) : super(key: key);

  @override
  State<ProgressAnalytics> createState() => _ProgressAnalyticsState();
}

class _ProgressAnalyticsState extends State<ProgressAnalytics>
    with TickerProviderStateMixin {
  late TabController _tabController;
  bool _isRefreshing = false;
  String _selectedTimePeriod = 'Week';
  final List<String> _timePeriods = ['Week', 'Month', 'Year'];

  // Mock data for analytics
  final Map<String, double> _skillData = {
    'Listening': 7.5,
    'Speaking': 6.8,
    'Reading': 8.2,
    'Writing': 6.5,
  };

  final List<Map<String, dynamic>> _weeklyData = [
    {'day': 'Mon', 'minutes': 45},
    {'day': 'Tue', 'minutes': 30},
    {'day': 'Wed', 'minutes': 60},
    {'day': 'Thu', 'minutes': 25},
    {'day': 'Fri', 'minutes': 55},
    {'day': 'Sat', 'minutes': 40},
    {'day': 'Sun', 'minutes': 35},
  ];

  final List<Map<String, dynamic>> _retentionData = [
    {'period': '1h', 'retention': 95.0},
    {'period': '1d', 'retention': 85.0},
    {'period': '3d', 'retention': 75.0},
    {'period': '1w', 'retention': 68.0},
    {'period': '2w', 'retention': 62.0},
    {'period': '1m', 'retention': 58.0},
  ];

  final List<Map<String, dynamic>> _streakData = List.generate(28, (index) {
    return {
      'day': index + 1,
      'completed': index < 15 || (index >= 18 && index < 25),
      'isToday': index == 20,
    };
  });

  final List<Map<String, dynamic>> _xpData = [
    {'day': 'Mon', 'xp': 120},
    {'day': 'Tue', 'xp': 95},
    {'day': 'Wed', 'xp': 150},
    {'day': 'Thu', 'xp': 80},
    {'day': 'Fri', 'xp': 140},
    {'day': 'Sat', 'xp': 110},
    {'day': 'Sun', 'xp': 90},
  ];

  final List<Map<String, dynamic>> _achievements = [
    {
      'title': 'First Steps',
      'description': 'Complete your first lesson',
      'icon': 'school',
      'earned': true,
      'earnedDate': '2025-08-15',
    },
    {
      'title': 'Week Warrior',
      'description': 'Maintain a 7-day streak',
      'icon': 'local_fire_department',
      'earned': true,
      'earnedDate': '2025-08-18',
    },
    {
      'title': 'Vocabulary Master',
      'description': 'Learn 100 new words',
      'icon': 'book',
      'earned': true,
      'earnedDate': '2025-08-20',
    },
    {
      'title': 'Social Butterfly',
      'description': 'Connect with 5 language partners',
      'icon': 'people',
      'earned': false,
      'earnedDate': null,
    },
    {
      'title': 'Perfect Score',
      'description': 'Get 100% accuracy in a lesson',
      'icon': 'star',
      'earned': true,
      'earnedDate': '2025-08-19',
    },
    {
      'title': 'Marathon Runner',
      'description': 'Maintain a 30-day streak',
      'icon': 'emoji_events',
      'earned': false,
      'earnedDate': null,
    },
  ];

  final List<Map<String, dynamic>> _skillsData = [
    {
      'name': 'Listening',
      'currentLevel': 7.5,
      'maxLevel': 10.0,
      'icon': 'hearing',
      'strengths': ['Audio comprehension', 'Native speaker recognition'],
      'improvements': ['Fast speech understanding', 'Accent variations'],
      'recommendations': [
        'Practice with podcast episodes at 1.2x speed',
        'Focus on regional accent training modules',
        'Try conversation practice with native speakers',
      ],
    },
    {
      'name': 'Speaking',
      'currentLevel': 6.8,
      'maxLevel': 10.0,
      'icon': 'record_voice_over',
      'strengths': ['Pronunciation accuracy', 'Vocabulary usage'],
      'improvements': ['Fluency speed', 'Complex sentence structure'],
      'recommendations': [
        'Increase daily speaking practice to 15 minutes',
        'Focus on complex grammar patterns in speech',
        'Practice storytelling and descriptive exercises',
      ],
    },
    {
      'name': 'Reading',
      'currentLevel': 8.2,
      'maxLevel': 10.0,
      'icon': 'menu_book',
      'strengths': ['Comprehension speed', 'Context understanding'],
      'improvements': ['Technical vocabulary', 'Idiomatic expressions'],
      'recommendations': [
        'Read news articles in your target language',
        'Practice with technical and academic texts',
        'Focus on idiom and phrase recognition',
      ],
    },
    {
      'name': 'Writing',
      'currentLevel': 6.5,
      'maxLevel': 10.0,
      'icon': 'edit',
      'strengths': ['Grammar accuracy', 'Basic sentence structure'],
      'improvements': ['Creative expression', 'Advanced punctuation'],
      'recommendations': [
        'Practice creative writing exercises daily',
        'Focus on advanced grammar structures',
        'Try writing short stories and essays',
      ],
    },
  ];

  final Map<String, dynamic> _userStats = {
    'rank': 23,
    'weeklyXp': 785,
    'streak': 15,
    'accuracy': 87,
  };

  final List<Map<String, dynamic>> _peerData = [
    {'weeklyXp': 650, 'streak': 12, 'accuracy': 82},
    {'weeklyXp': 720, 'streak': 8, 'accuracy': 89},
    {'weeklyXp': 580, 'streak': 20, 'accuracy': 85},
    {'weeklyXp': 690, 'streak': 15, 'accuracy': 78},
    {'weeklyXp': 750, 'streak': 10, 'accuracy': 91},
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _handleRefresh() async {
    setState(() {
      _isRefreshing = true;
    });

    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isRefreshing = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text('Progress Analytics'),
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        elevation: 0,
        actions: [
          PopupMenuButton<String>(
            icon: CustomIconWidget(
              iconName: 'more_vert',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
            onSelected: (value) {
              if (value == 'export') {
                _showExportDialog();
              } else if (value == 'settings') {
                Navigator.pushNamed(context, '/settings-and-profile');
              }
            },
            itemBuilder: (context) => [
              PopupMenuItem(
                value: 'export',
                child: Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'file_download',
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                      size: 20,
                    ),
                    SizedBox(width: 2.w),
                    Text('Export Progress'),
                  ],
                ),
              ),
              PopupMenuItem(
                value: 'settings',
                child: Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'settings',
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                      size: 20,
                    ),
                    SizedBox(width: 2.w),
                    Text('Settings'),
                  ],
                ),
              ),
            ],
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(
              icon: CustomIconWidget(
                iconName: 'analytics',
                size: 20,
                color: AppTheme.lightTheme.primaryColor,
              ),
              text: 'Overview',
            ),
            Tab(
              icon: CustomIconWidget(
                iconName: 'trending_up',
                size: 20,
                color: AppTheme.lightTheme.primaryColor,
              ),
              text: 'Skills',
            ),
            Tab(
              icon: CustomIconWidget(
                iconName: 'people',
                size: 20,
                color: AppTheme.lightTheme.primaryColor,
              ),
              text: 'Social',
            ),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildOverviewTab(),
          _buildSkillsTab(),
          _buildSocialTab(),
        ],
      ),
    );
  }

  Widget _buildOverviewTab() {
    return RefreshIndicator(
      onRefresh: _handleRefresh,
      color: AppTheme.lightTheme.primaryColor,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        child: SafeArea(
          child: Column(
            children: [
              SizedBox(height: 2.h),
              _buildTimePeriodSelector(),
              SizedBox(height: 2.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: ProficiencyRadarChart(skillData: _skillData),
              ),
              SizedBox(height: 3.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: WeeklyLearningChart(
                  weeklyData: _weeklyData,
                  weeklyGoal: 300,
                ),
              ),
              SizedBox(height: 3.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: VocabularyRetentionChart(retentionData: _retentionData),
              ),
              SizedBox(height: 3.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: StreakCalendarWidget(
                  streakData: _streakData,
                  currentStreak: 15,
                ),
              ),
              SizedBox(height: 3.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: XpProgressionChart(
                  xpData: _xpData,
                  currentXp: 2785,
                  nextLevelXp: 3000,
                ),
              ),
              SizedBox(height: 3.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: AchievementGalleryWidget(achievements: _achievements),
              ),
              SizedBox(height: 4.h),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSkillsTab() {
    return RefreshIndicator(
      onRefresh: _handleRefresh,
      color: AppTheme.lightTheme.primaryColor,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        child: SafeArea(
          child: Column(
            children: [
              SizedBox(height: 2.h),
              SkillPerformanceCards(skillsData: _skillsData),
              SizedBox(height: 4.h),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSocialTab() {
    return RefreshIndicator(
      onRefresh: _handleRefresh,
      color: AppTheme.lightTheme.primaryColor,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        child: SafeArea(
          child: Column(
            children: [
              SizedBox(height: 2.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: SocialComparisonWidget(
                  userStats: _userStats,
                  peerData: _peerData,
                ),
              ),
              SizedBox(height: 3.h),
              _buildQuickActions(),
              SizedBox(height: 4.h),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTimePeriodSelector() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w),
      padding: EdgeInsets.all(1.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: _timePeriods.map((period) {
          final isSelected = _selectedTimePeriod == period;
          return Expanded(
            child: GestureDetector(
              onTap: () {
                setState(() {
                  _selectedTimePeriod = period;
                });
              },
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: EdgeInsets.symmetric(vertical: 1.5.h),
                decoration: BoxDecoration(
                  color: isSelected
                      ? AppTheme.lightTheme.primaryColor
                      : Colors.transparent,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Center(
                  child: Text(
                    period,
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: isSelected
                          ? Colors.white
                          : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      fontWeight:
                          isSelected ? FontWeight.w600 : FontWeight.w400,
                    ),
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildQuickActions() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Quick Actions',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 2.h),
          Row(
            children: [
              Expanded(
                child: _buildActionCard(
                  'Find Study Partners',
                  'Connect with learners',
                  'people',
                  () => Navigator.pushNamed(context, '/social-features-hub'),
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: _buildActionCard(
                  'Join Leaderboard',
                  'Compete with friends',
                  'leaderboard',
                  () => Navigator.pushNamed(context, '/social-features-hub'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActionCard(
      String title, String subtitle, String iconName, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: AppTheme.lightTheme.primaryColor.withValues(alpha: 0.2),
            width: 1,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: [
            Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.primaryColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: iconName,
                  size: 24,
                  color: AppTheme.lightTheme.primaryColor,
                ),
              ),
            ),
            SizedBox(height: 2.h),
            Text(
              title,
              style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w600,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 0.5.h),
            Text(
              subtitle,
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  void _showExportDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          child: Container(
            padding: EdgeInsets.all(6.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                CustomIconWidget(
                  iconName: 'file_download',
                  size: 48,
                  color: AppTheme.lightTheme.primaryColor,
                ),
                SizedBox(height: 2.h),
                Text(
                  'Export Progress',
                  style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 1.h),
                Text(
                  'Share your learning progress with teachers or study partners',
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 3.h),
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton(
                        onPressed: () => Navigator.of(context).pop(),
                        child: Text('Cancel'),
                      ),
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                          // Handle export functionality
                        },
                        child: Text('Export'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
