import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/achievement_badge_widget.dart';
import './widgets/chart_widget.dart';
import './widgets/date_range_selector_widget.dart';
import './widgets/export_options_widget.dart';
import './widgets/metrics_card_widget.dart';
import './widgets/mood_timeline_widget.dart';

class ProgressAnalytics extends StatefulWidget {
  const ProgressAnalytics({Key? key}) : super(key: key);

  @override
  State<ProgressAnalytics> createState() => _ProgressAnalyticsState();
}

class _ProgressAnalyticsState extends State<ProgressAnalytics>
    with TickerProviderStateMixin {
  String _selectedDateRange = '1M';
  int _selectedTabIndex = 2; // Progress tab active
  late TabController _tabController;

  // Mock data for analytics
  final List<Map<String, dynamic>> _metricsData = [
    {
      'title': 'Anxiety Reduction',
      'percentage': '70%',
      'description':
          'Significant improvement in anxiety levels through consistent breathing practice',
      'progressColor': AppTheme.successColor,
      'progressValue': 0.7,
    },
    {
      'title': 'Sleep Quality',
      'percentage': '85%',
      'description':
          'Better sleep patterns with meditation and bedtime routines',
      'progressColor': AppTheme.secondaryLight,
      'progressValue': 0.85,
    },
    {
      'title': 'Mood Enhancement',
      'percentage': '76%',
      'description': 'Improved emotional well-being and daily mood stability',
      'progressColor': AppTheme.particleColor,
      'progressValue': 0.76,
    },
  ];

  final List<Map<String, dynamic>> _breathingSessionData = [
    {'label': 'Mon', 'value': 3},
    {'label': 'Tue', 'value': 5},
    {'label': 'Wed', 'value': 2},
    {'label': 'Thu', 'value': 7},
    {'label': 'Fri', 'value': 4},
    {'label': 'Sat', 'value': 6},
    {'label': 'Sun', 'value': 8},
  ];

  final List<Map<String, dynamic>> _sleepQualityData = [
    {'label': 'Week 1', 'value': 6.2},
    {'label': 'Week 2', 'value': 7.1},
    {'label': 'Week 3', 'value': 7.8},
    {'label': 'Week 4', 'value': 8.5},
  ];

  final List<Map<String, dynamic>> _moodData = [
    {'date': '12/1', 'level': 3, 'note': 'Feeling neutral'},
    {'date': '12/2', 'level': 4, 'note': 'Good meditation session'},
    {'date': '12/3', 'level': 2, 'note': 'Stressful day at work'},
    {'date': '12/4', 'level': 5, 'note': 'Amazing breathing exercise'},
    {'date': '12/5', 'level': 4, 'note': 'Consistent practice paying off'},
    {'date': '12/6', 'level': 5, 'note': 'Best sleep in weeks'},
    {'date': '12/7', 'level': 4, 'note': 'Feeling balanced'},
  ];

  final List<Map<String, dynamic>> _achievementsData = [
    {
      'title': '7-Day Streak',
      'description': 'Consistent daily practice',
      'iconName': 'local_fire_department',
      'isUnlocked': true,
      'unlockedDate': DateTime.now().subtract(const Duration(days: 2)),
    },
    {
      'title': 'Breathing Master',
      'description': '100 breathing sessions',
      'iconName': 'air',
      'isUnlocked': true,
      'unlockedDate': DateTime.now().subtract(const Duration(days: 5)),
    },
    {
      'title': 'Sleep Champion',
      'description': '30 nights of better sleep',
      'iconName': 'bedtime',
      'isUnlocked': false,
      'unlockedDate': null,
    },
    {
      'title': 'Zen Master',
      'description': '500 minutes meditated',
      'iconName': 'self_improvement',
      'isUnlocked': true,
      'unlockedDate': DateTime.now().subtract(const Duration(days: 10)),
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this, initialIndex: 2);
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
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              AppTheme.primaryLight,
              AppTheme.secondaryLight,
              AppTheme.particleColor,
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              _buildHeader(),
              DateRangeSelectorWidget(
                selectedRange: _selectedDateRange,
                onRangeChanged: (range) {
                  setState(() {
                    _selectedDateRange = range;
                  });
                },
              ),
              Expanded(
                child: RefreshIndicator(
                  onRefresh: _refreshAnalytics,
                  color: AppTheme.secondaryLight,
                  backgroundColor: AppTheme.lightTheme.colorScheme.surface,
                  child: SingleChildScrollView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    child: Column(
                      children: [
                        _buildMetricsSection(),
                        _buildChartsSection(),
                        _buildMoodSection(),
                        _buildAchievementsSection(),
                        _buildExportSection(),
                        SizedBox(height: 10.h), // Bottom padding for tab bar
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: _buildBottomNavigation(),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Container(
              width: 10.w,
              height: 10.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.surface
                    .withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: 'arrow_back',
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  size: 5.w,
                ),
              ),
            ),
          ),
          SizedBox(width: 4.w),
          Expanded(
            child: Text(
              'Progress Analytics',
              style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurface,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          GestureDetector(
            onTap: _showFilterOptions,
            child: Container(
              width: 10.w,
              height: 10.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.surface
                    .withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: 'tune',
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  size: 5.w,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMetricsSection() {
    return Column(
      children: _metricsData.map((metric) {
        return MetricsCardWidget(
          title: metric['title'] as String,
          percentage: metric['percentage'] as String,
          description: metric['description'] as String,
          progressColor: metric['progressColor'] as Color,
          progressValue: metric['progressValue'] as double,
        );
      }).toList(),
    );
  }

  Widget _buildChartsSection() {
    return Column(
      children: [
        ChartWidget(
          title: 'Breathing Sessions This Week',
          chartData: _breathingSessionData,
          chartType: 'bar',
        ),
        ChartWidget(
          title: 'Sleep Quality Trend',
          chartData: _sleepQualityData,
          chartType: 'line',
        ),
      ],
    );
  }

  Widget _buildMoodSection() {
    return MoodTimelineWidget(moodData: _moodData);
  }

  Widget _buildAchievementsSection() {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppTheme.shadowLight,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Achievements',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  fontWeight: FontWeight.w600,
                ),
              ),
              Text(
                '${_achievementsData.where((a) => a['isUnlocked'] == true).length}/${_achievementsData.length}',
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: AppTheme.secondaryLight,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          SizedBox(
            height: 20.h,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _achievementsData.length,
              itemBuilder: (context, index) {
                final achievement = _achievementsData[index];
                return AchievementBadgeWidget(
                  title: achievement['title'] as String,
                  description: achievement['description'] as String,
                  iconName: achievement['iconName'] as String,
                  isUnlocked: achievement['isUnlocked'] as bool,
                  unlockedDate: achievement['unlockedDate'] as DateTime?,
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExportSection() {
    return ExportOptionsWidget(
      onExportPDF: _exportPDF,
      onExportCSV: _exportCSV,
      onShare: _shareProgress,
    );
  }

  Widget _buildBottomNavigation() {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color: AppTheme.shadowLight,
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: TabBar(
          controller: _tabController,
          onTap: (index) {
            setState(() {
              _selectedTabIndex = index;
            });
            _navigateToTab(index);
          },
          tabs: [
            Tab(
              icon: CustomIconWidget(
                iconName: 'home',
                color: _selectedTabIndex == 0
                    ? AppTheme.secondaryLight
                    : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 6.w,
              ),
              text: 'Home',
            ),
            Tab(
              icon: CustomIconWidget(
                iconName: 'air',
                color: _selectedTabIndex == 1
                    ? AppTheme.secondaryLight
                    : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 6.w,
              ),
              text: 'Breathe',
            ),
            Tab(
              icon: CustomIconWidget(
                iconName: 'analytics',
                color: _selectedTabIndex == 2
                    ? AppTheme.secondaryLight
                    : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 6.w,
              ),
              text: 'Progress',
            ),
            Tab(
              icon: CustomIconWidget(
                iconName: 'library_music',
                color: _selectedTabIndex == 3
                    ? AppTheme.secondaryLight
                    : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 6.w,
              ),
              text: 'Library',
            ),
            Tab(
              icon: CustomIconWidget(
                iconName: 'person',
                color: _selectedTabIndex == 4
                    ? AppTheme.secondaryLight
                    : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 6.w,
              ),
              text: 'Profile',
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _refreshAnalytics() async {
    // Simulate API call to refresh analytics data
    await Future.delayed(const Duration(seconds: 1));
    setState(() {
      // Update data here if needed
    });
  }

  void _showFilterOptions() {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.lightTheme.colorScheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return Container(
          padding: EdgeInsets.all(4.w),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Filter Options',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 2.h),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'air',
                  color: AppTheme.secondaryLight,
                  size: 6.w,
                ),
                title: Text(
                  'Breathing Sessions Only',
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurface,
                  ),
                ),
                onTap: () => Navigator.pop(context),
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'bedtime',
                  color: AppTheme.secondaryLight,
                  size: 6.w,
                ),
                title: Text(
                  'Sleep Data Only',
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurface,
                  ),
                ),
                onTap: () => Navigator.pop(context),
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'mood',
                  color: AppTheme.secondaryLight,
                  size: 6.w,
                ),
                title: Text(
                  'Mood Tracking Only',
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurface,
                  ),
                ),
                onTap: () => Navigator.pop(context),
              ),
              SizedBox(height: 2.h),
            ],
          ),
        );
      },
    );
  }

  void _exportPDF() {
    // Implement PDF export functionality
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Generating PDF report...',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _exportCSV() {
    // Implement CSV export functionality
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Exporting CSV data...',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _shareProgress() {
    // Implement social sharing functionality
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Sharing progress...',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _navigateToTab(int index) {
    switch (index) {
      case 0:
        Navigator.pushReplacementNamed(context, '/home-dashboard');
        break;
      case 1:
        Navigator.pushReplacementNamed(context, '/breathing-exercise');
        break;
      case 2:
        // Already on progress analytics
        break;
      case 3:
        Navigator.pushReplacementNamed(context, '/meditation-library');
        break;
      case 4:
        Navigator.pushReplacementNamed(context, '/profile-settings');
        break;
    }
  }
}
