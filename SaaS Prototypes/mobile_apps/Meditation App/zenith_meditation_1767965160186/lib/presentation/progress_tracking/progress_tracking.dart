import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/achievements_section_widget.dart';
import './widgets/calendar_view_widget.dart';
import './widgets/charts_section_widget.dart';
import './widgets/circular_progress_widget.dart';
import './widgets/metrics_cards_widget.dart';
import './widgets/streak_counter_widget.dart';

class ProgressTracking extends StatefulWidget {
  const ProgressTracking({Key? key}) : super(key: key);

  @override
  State<ProgressTracking> createState() => _ProgressTrackingState();
}

class _ProgressTrackingState extends State<ProgressTracking> {
  bool _isLoading = false;

  // Mock data for progress tracking
  final List<Map<String, dynamic>> _metricsData = [
    {
      'icon': 'check_circle',
      'value': 127,
      'label': 'Total Sessions\nCompleted',
    },
    {
      'icon': 'schedule',
      'value': '18 min',
      'label': 'Average Session\nLength',
    },
    {
      'icon': 'favorite',
      'value': 'Mindfulness',
      'label': 'Favorite\nMeditation Type',
    },
    {
      'icon': 'psychology',
      'value': 2340,
      'label': 'Mindfulness\nMinutes Earned',
    },
  ];

  final List<Map<String, dynamic>> _weeklyData = [
    {'day': 'Mon', 'minutes': 25},
    {'day': 'Tue', 'minutes': 30},
    {'day': 'Wed', 'minutes': 15},
    {'day': 'Thu', 'minutes': 45},
    {'day': 'Fri', 'minutes': 20},
    {'day': 'Sat', 'minutes': 35},
    {'day': 'Sun', 'minutes': 40},
  ];

  final List<Map<String, dynamic>> _durationTrends = [
    {'week': 1, 'duration': 15},
    {'week': 2, 'duration': 18},
    {'week': 3, 'duration': 22},
    {'week': 4, 'duration': 25},
    {'week': 5, 'duration': 20},
    {'week': 6, 'duration': 28},
  ];

  final List<Map<String, dynamic>> _moodData = [
    {'mood': 'Calm', 'percentage': 35},
    {'mood': 'Focused', 'percentage': 28},
    {'mood': 'Relaxed', 'percentage': 22},
    {'mood': 'Energized', 'percentage': 15},
  ];

  final List<Map<String, dynamic>> _achievements = [
    {
      'id': 1,
      'title': 'First Steps',
      'description': 'Complete your first meditation session',
      'icon': 'star',
      'unlocked': true,
      'requirement': 'Complete 1 session',
    },
    {
      'id': 2,
      'title': 'Week Warrior',
      'description': 'Meditate for 7 consecutive days',
      'icon': 'local_fire_department',
      'unlocked': true,
      'requirement': 'Meditate for 7 days in a row',
    },
    {
      'id': 3,
      'title': 'Mindful Master',
      'description': 'Complete 100 meditation sessions',
      'icon': 'psychology',
      'unlocked': true,
      'requirement': 'Complete 100 sessions',
    },
    {
      'id': 4,
      'title': 'Time Keeper',
      'description': 'Meditate for 1000 minutes total',
      'icon': 'schedule',
      'unlocked': true,
      'requirement': 'Accumulate 1000 minutes',
    },
    {
      'id': 5,
      'title': 'Zen Master',
      'description': 'Complete a 30-minute session',
      'icon': 'self_improvement',
      'unlocked': false,
      'requirement': 'Complete one 30-minute session',
    },
    {
      'id': 6,
      'title': 'Monthly Goal',
      'description': 'Reach your monthly meditation goal',
      'icon': 'emoji_events',
      'unlocked': false,
      'requirement': 'Complete monthly goal',
    },
  ];

  final Map<DateTime, List<Map<String, dynamic>>> _meditationHistory = {
    DateTime(2024, 11, 15): [
      {
        'title': 'Morning Mindfulness',
        'type': 'Mindfulness',
        'duration': 15,
      },
      {
        'title': 'Evening Breathing',
        'type': 'Breathing',
        'duration': 10,
      },
    ],
    DateTime(2024, 11, 14): [
      {
        'title': 'Focus Session',
        'type': 'Focus',
        'duration': 20,
      },
    ],
    DateTime(2024, 11, 13): [
      {
        'title': 'Sleep Meditation',
        'type': 'Sleep',
        'duration': 25,
      },
    ],
    DateTime(2024, 11, 12): [
      {
        'title': 'Stress Relief',
        'type': 'Mindfulness',
        'duration': 18,
      },
      {
        'title': 'Deep Breathing',
        'type': 'Breathing',
        'duration': 12,
      },
    ],
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Progress Tracking',
          style: AppTheme.lightTheme.appBarTheme.titleTextStyle,
        ),
        backgroundColor: AppTheme.lightTheme.appBarTheme.backgroundColor,
        elevation: AppTheme.lightTheme.appBarTheme.elevation,
        automaticallyImplyLeading: true,
        actions: [
          Container(
            margin: EdgeInsets.only(right: 1.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: AppTheme.lightTheme.colorScheme.outline.withAlpha(51),
                width: 1,
              ),
            ),
            child: IconButton(
              onPressed: _exportProgress,
              icon: CustomIconWidget(
                iconName: 'file_download',
                color: AppTheme.lightTheme.colorScheme.onSurface,
                size: 5.w,
              ),
            ),
          ),
          Container(
            margin: EdgeInsets.only(right: 4.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: AppTheme.lightTheme.colorScheme.outline.withAlpha(51),
                width: 1,
              ),
            ),
            child: IconButton(
              onPressed: _showFilterOptions,
              icon: CustomIconWidget(
                iconName: 'filter_list',
                color: AppTheme.lightTheme.colorScheme.onSurface,
                size: 5.w,
              ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _refreshData,
          color: AppTheme.lightTheme.colorScheme.secondary,
          child: _isLoading
              ? Center(
                  child: CircularProgressIndicator(
                    color: AppTheme.lightTheme.colorScheme.secondary,
                  ),
                )
              : SingleChildScrollView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  padding: EdgeInsets.only(
                    left: 4.w,
                    right: 4.w,
                    top: 2.h,
                    bottom: 12.h, // Bottom navigation space
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Streak Counter with improved mobile layout
                      StreakCounterWidget(
                        streakDays: 12,
                        weeklyMinutes: 210,
                      ),

                      SizedBox(height: 3.h), // Consistent spacing

                      // Circular Progress with proper padding
                      CircularProgressWidget(
                        progressPercentage: 78.5,
                        currentMinutes: 1570,
                        goalMinutes: 2000,
                      ),

                      SizedBox(height: 3.h), // Consistent spacing

                      // Metrics Cards with consistent heights
                      MetricsCardsWidget(
                        metricsData: _metricsData,
                      ),

                      SizedBox(height: 4.h), // Section spacing

                      // Charts Section
                      ChartsSectionWidget(
                        weeklyData: _weeklyData,
                        durationTrends: _durationTrends,
                        moodData: _moodData,
                      ),

                      SizedBox(height: 4.h), // Section spacing

                      // Achievements Section
                      AchievementsSectionWidget(
                        achievements: _achievements,
                      ),

                      SizedBox(height: 4.h), // Section spacing

                      // Calendar View
                      CalendarViewWidget(
                        meditationHistory: _meditationHistory,
                      ),
                    ],
                  ),
                ),
        ),
      ),
    );
  }

  Future<void> _refreshData() async {
    setState(() {
      _isLoading = true;
    });

    // Simulate data refresh
    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isLoading = false;
    });

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Progress data updated successfully!'),
          backgroundColor: AppTheme.lightTheme.colorScheme.tertiary,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      );
    }
  }

  void _onCalendarPressed() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CalendarViewWidget(
          meditationHistory: _meditationHistory,
        ),
      ),
    );
  }

  void _exportProgress() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20),
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.outline,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            SizedBox(height: 3.h),
            Text(
              'Export Progress Report',
              style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w700,
                fontSize: 18.sp,
              ),
            ),
            SizedBox(height: 3.h),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'picture_as_pdf',
                color: Colors.red,
                size: 6.w,
              ),
              title: const Text('Export as PDF'),
              subtitle: const Text('Detailed progress report with charts'),
              onTap: () {
                Navigator.pop(context);
                _generatePDFReport();
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'table_chart',
                color: Colors.green,
                size: 6.w,
              ),
              title: const Text('Export as CSV'),
              subtitle: const Text('Raw data for external analysis'),
              onTap: () {
                Navigator.pop(context);
                _generateCSVReport();
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'share',
                color: AppTheme.lightTheme.colorScheme.secondary,
                size: 6.w,
              ),
              title: const Text('Share Progress'),
              subtitle: const Text('Share your achievements on social media'),
              onTap: () {
                Navigator.pop(context);
                _shareProgress();
              },
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  void _showFilterOptions() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20),
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.outline,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            SizedBox(height: 3.h),
            Text(
              'Filter Progress Data',
              style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w700,
                fontSize: 18.sp,
              ),
            ),
            SizedBox(height: 3.h),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'date_range',
                color: AppTheme.lightTheme.colorScheme.secondary,
                size: 6.w,
              ),
              title: const Text('Last 7 Days'),
              onTap: () {
                Navigator.pop(context);
                _applyDateFilter(7);
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'calendar_month',
                color: AppTheme.lightTheme.colorScheme.secondary,
                size: 6.w,
              ),
              title: const Text('Last 30 Days'),
              onTap: () {
                Navigator.pop(context);
                _applyDateFilter(30);
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'category',
                color: AppTheme.lightTheme.colorScheme.secondary,
                size: 6.w,
              ),
              title: const Text('By Meditation Type'),
              onTap: () {
                Navigator.pop(context);
                _showCategoryFilter();
              },
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  void _generatePDFReport() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('PDF report generated successfully!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.tertiary,
        behavior: SnackBarBehavior.floating,
        action: SnackBarAction(
          label: 'View',
          textColor: Colors.white,
          onPressed: () {},
        ),
      ),
    );
  }

  void _generateCSVReport() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('CSV data exported successfully!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.tertiary,
        behavior: SnackBarBehavior.floating,
        action: SnackBarAction(
          label: 'Open',
          textColor: Colors.white,
          onPressed: () {},
        ),
      ),
    );
  }

  void _shareProgress() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Progress shared successfully!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.tertiary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _applyDateFilter(int days) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Showing data for last $days days'),
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _showCategoryFilter() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Filter by Category'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CheckboxListTile(
              title: const Text('Mindfulness'),
              value: true,
              onChanged: (value) {},
            ),
            CheckboxListTile(
              title: const Text('Breathing'),
              value: true,
              onChanged: (value) {},
            ),
            CheckboxListTile(
              title: const Text('Sleep'),
              value: false,
              onChanged: (value) {},
            ),
            CheckboxListTile(
              title: const Text('Focus'),
              value: true,
              onChanged: (value) {},
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: const Text('Category filter applied'),
                  backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
                  behavior: SnackBarBehavior.floating,
                ),
              );
            },
            child: const Text('Apply'),
          ),
        ],
      ),
    );
  }
}
