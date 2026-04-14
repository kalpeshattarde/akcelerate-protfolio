import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/baby_header_widget.dart';
import './widgets/feeding_summary_widget.dart';
import './widgets/growth_progress_widget.dart';
import './widgets/quick_actions_widget.dart';
import './widgets/recent_achievements_widget.dart';
import './widgets/sleep_pattern_widget.dart';
import './widgets/today_summary_widget.dart';

class DashboardHome extends StatefulWidget {
  const DashboardHome({Key? key}) : super(key: key);

  @override
  State<DashboardHome> createState() => _DashboardHomeState();
}

class _DashboardHomeState extends State<DashboardHome>
    with TickerProviderStateMixin {
  int _currentIndex = 0;
  late AnimationController _refreshController;
  bool _isRefreshing = false;

  // Mock data for baby profile
  final Map<String, dynamic> babyData = {
    "name": "Emma Rose",
    "birthDate": "2024-07-15",
    "photo":
        "https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  // Mock data for today's summary
  final Map<String, dynamic> todayData = {
    "feedingCount": 6,
    "sleepHours": 8.5,
    "diaperChanges": 7,
  };

  // Mock data for recent achievements
  final List<Map<String, dynamic>> achievements = [
    {
      "id": 1,
      "title": "First Smile",
      "description": "Emma smiled for the first time!",
      "achievedDate": "2024-08-20",
      "category": "social",
    },
    {
      "id": 2,
      "title": "Holds Head Up",
      "description": "Can hold head up during tummy time",
      "achievedDate": "2024-08-18",
      "category": "physical",
    },
    {
      "id": 3,
      "title": "Follows Objects",
      "description": "Tracks moving objects with eyes",
      "achievedDate": "2024-08-15",
      "category": "cognitive",
    },
  ];

  // Mock data for growth progress
  final Map<String, dynamic> growthData = {
    "weightHistory": [
      {"date": "2024-07-15", "value": 7.2},
      {"date": "2024-07-22", "value": 7.8},
      {"date": "2024-07-29", "value": 8.1},
      {"date": "2024-08-05", "value": 8.6},
      {"date": "2024-08-12", "value": 9.0},
      {"date": "2024-08-19", "value": 9.4},
      {"date": "2024-08-26", "value": 9.8},
    ],
    "heightHistory": [
      {"date": "2024-07-15", "value": 19.5},
      {"date": "2024-07-22", "value": 20.1},
      {"date": "2024-07-29", "value": 20.6},
      {"date": "2024-08-05", "value": 21.2},
      {"date": "2024-08-12", "value": 21.7},
      {"date": "2024-08-19", "value": 22.1},
      {"date": "2024-08-26", "value": 22.5},
    ],
  };

  // Mock data for feeding summary
  final Map<String, dynamic> feedingData = {
    "lastFeedTime": "2024-09-02T01:30:00.000Z",
    "lastFeedType": "Breast",
    "nextSuggestedTime": "2024-09-02T04:30:00.000Z",
    "todayFeedings": 6,
  };

  // Mock data for sleep pattern
  final Map<String, dynamic> sleepData = {
    "dayHours": 3.5,
    "nightHours": 5.0,
    "lastSleepTime": "2024-09-02T00:45:00.000Z",
    "sleepQuality": "good",
  };

  @override
  void initState() {
    super.initState();
    _refreshController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
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

    // Simulate data refresh
    await Future.delayed(const Duration(seconds: 2));

    _refreshController.reverse();
    setState(() {
      _isRefreshing = false;
    });

    Fluttertoast.showToast(
      msg: "Data refreshed successfully!",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppTheme.getSuccessColor(true),
      textColor: Colors.white,
    );
  }

  void _handleQuickAction(String action) {
    String message = '';
    switch (action) {
      case 'feed':
        message = 'Opening feeding log...';
        Navigator.pushNamed(context, '/feeding-log');
        break;
      case 'sleep':
        message = 'Opening sleep tracker...';
        Navigator.pushNamed(context, '/sleep-tracker');
        break;
      case 'diaper':
        message = 'Diaper change logged!';
        break;
      case 'weight':
        message = 'Opening growth tracking...';
        Navigator.pushNamed(context, '/growth-tracking');
        break;
    }

    Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppTheme.lightTheme.primaryColor,
      textColor: Colors.white,
    );
  }

  void _onBottomNavTap(int index) {
    setState(() {
      _currentIndex = index;
    });

    switch (index) {
      case 0:
        // Already on home
        break;
      case 1:
        Navigator.pushNamed(context, '/growth-tracking');
        break;
      case 2:
        Navigator.pushNamed(context, '/milestone-tracker');
        break;
      case 3:
        Navigator.pushNamed(context, '/historical-records');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: RefreshIndicator(
        onRefresh: _handleRefresh,
        color: colorScheme.primary,
        backgroundColor: colorScheme.surface,
        child: CustomScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          slivers: [
            SliverToBoxAdapter(
              child: Column(
                children: [
                  BabyHeaderWidget(babyData: babyData),
                  SizedBox(height: 2.h),
                  TodaySummaryWidget(todayData: todayData),
                  SizedBox(height: 2.h),
                  QuickActionsWidget(
                    onFeedTap: () => _handleQuickAction('feed'),
                    onSleepTap: () => _handleQuickAction('sleep'),
                    onDiaperTap: () => _handleQuickAction('diaper'),
                    onWeightTap: () => _handleQuickAction('weight'),
                  ),
                  SizedBox(height: 2.h),
                  RecentAchievementsWidget(achievements: achievements),
                  SizedBox(height: 1.h),
                  GrowthProgressWidget(growthData: growthData),
                  SizedBox(height: 1.h),
                  FeedingSummaryWidget(feedingData: feedingData),
                  SizedBox(height: 1.h),
                  SleepPatternWidget(sleepData: sleepData),
                  SizedBox(height: 10.h), // Bottom padding for FAB
                ],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _handleQuickAction('feed'),
        backgroundColor: colorScheme.primary,
        foregroundColor: colorScheme.onPrimary,
        elevation: 6.0,
        child: CustomIconWidget(
          iconName: 'add',
          color: colorScheme.onPrimary,
          size: 7.w,
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomAppBar(
        height: 8.h,
        color: colorScheme.surface,
        elevation: 8.0,
        notchMargin: 8.0,
        shape: const CircularNotchedRectangle(),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildBottomNavItem(0, 'home', 'Home'),
            _buildBottomNavItem(1, 'trending_up', 'Growth'),
            SizedBox(width: 12.w), // Space for FAB
            _buildBottomNavItem(2, 'emoji_events', 'Milestones'),
            _buildBottomNavItem(3, 'more_horiz', 'More'),
          ],
        ),
      ),
    );
  }

  Widget _buildBottomNavItem(int index, String iconName, String label) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final isSelected = _currentIndex == index;
    final color =
        isSelected ? colorScheme.primary : colorScheme.onSurfaceVariant;

    return GestureDetector(
      onTap: () => _onBottomNavTap(index),
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 1.h),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CustomIconWidget(
              iconName: iconName,
              color: color,
              size: isSelected ? 6.w : 5.5.w,
            ),
            SizedBox(height: 0.5.h),
            Text(
              label,
              style: theme.textTheme.labelSmall?.copyWith(
                color: color,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
