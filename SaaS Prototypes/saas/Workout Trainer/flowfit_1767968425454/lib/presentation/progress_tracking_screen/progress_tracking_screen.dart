import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/activity_calendar_widget.dart';
import './widgets/metrics_cards_widget.dart';
import './widgets/stats_overview_widget.dart';
import './widgets/time_period_selector_widget.dart';
import './widgets/workout_frequency_chart_widget.dart';

/// Progress Tracking Screen displaying fitness journey metrics and charts
class ProgressTrackingScreen extends StatefulWidget {
  const ProgressTrackingScreen({super.key});

  @override
  State<ProgressTrackingScreen> createState() => _ProgressTrackingScreenState();
}

class _ProgressTrackingScreenState extends State<ProgressTrackingScreen> {
  String _selectedPeriod = 'Weekly';
  DateTime _focusedDay = DateTime.now();
  DateTime _selectedDay = DateTime.now();
  bool _isRefreshing = false;
  bool _isLoading = false;

  // Mock data for current week stats
  final Map<String, dynamic> _weeklyStats = {
    'workoutsCompleted': 5,
    'activeMinutes': 180,
    'caloriesBurned': 850,
    'consistencyScore': 0.71,
  };

  // Mock data for workout frequency chart
  final List<Map<String, dynamic>> _weeklyChartData = [
    {'label': 'Mon', 'value': 1},
    {'label': 'Tue', 'value': 2},
    {'label': 'Wed', 'value': 1},
    {'label': 'Thu', 'value': 0},
    {'label': 'Fri', 'value': 1},
    {'label': 'Sat', 'value': 2},
    {'label': 'Sun', 'value': 1},
  ];

  final List<Map<String, dynamic>> _monthlyChartData = [
    {'label': 'W1', 'value': 4},
    {'label': 'W2', 'value': 5},
    {'label': 'W3', 'value': 3},
    {'label': 'W4', 'value': 6},
  ];

  final List<Map<String, dynamic>> _yearlyChartData = [
    {'label': 'Jan', 'value': 15},
    {'label': 'Feb', 'value': 18},
    {'label': 'Mar', 'value': 20},
    {'label': 'Apr', 'value': 22},
    {'label': 'May', 'value': 19},
    {'label': 'Jun', 'value': 24},
    {'label': 'Jul', 'value': 26},
    {'label': 'Aug', 'value': 23},
    {'label': 'Sep', 'value': 25},
    {'label': 'Oct', 'value': 28},
    {'label': 'Nov', 'value': 27},
    {'label': 'Dec', 'value': 30},
  ];

  // Mock workout events for calendar
  final Map<DateTime, List<Map<String, dynamic>>> _workoutEvents = {
    DateTime(2025, 12, 9): [
      {'type': 'Strength', 'intensity': 'high'},
    ],
    DateTime(2025, 12, 8): [
      {'type': 'Cardio', 'intensity': 'medium'},
    ],
    DateTime(2025, 12, 6): [
      {'type': 'Yoga', 'intensity': 'low'},
    ],
    DateTime(2025, 12, 5): [
      {'type': 'HIIT', 'intensity': 'high'},
    ],
    DateTime(2025, 12, 3): [
      {'type': 'Strength', 'intensity': 'medium'},
    ],
  };

  // Mock metrics data
  final Map<String, dynamic> _metricsData = {
    'personalBests': [
      {'exercise': 'Push-ups', 'value': '50 reps'},
      {'exercise': 'Plank Hold', 'value': '2:30 min'},
      {'exercise': 'Squats', 'value': '75 reps'},
    ],
    'currentStreak': 5,
    'longestStreak': 12,
    'favoriteCategories': [
      {'name': 'Strength Training', 'count': 24},
      {'name': 'HIIT', 'count': 18},
      {'name': 'Yoga', 'count': 12},
    ],
    'milestones': [
      {'badge': '🔥', 'name': '7-Day Streak'},
      {'badge': '💪', 'name': '50 Workouts'},
      {'badge': '⭐', 'name': '100 Hours'},
    ],
  };

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar(
        title: 'Progress',
        style: CustomAppBarStyle.large,
        height: 80,
        actions: [
          IconButton(
            icon: CustomIconWidget(
              iconName: 'filter_list',
              color: theme.colorScheme.onSurface,
              size: 22,
            ),
            onPressed: _showFilterOptions,
          ),
          IconButton(
            icon: CustomIconWidget(
              iconName: 'share',
              color: theme.colorScheme.onSurface,
              size: 22,
            ),
            onPressed: _shareProgress,
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _refreshData,
              child: SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: 2.h),
                    StatsOverviewWidget(
                      workoutsCompleted:
                          _weeklyStats['workoutsCompleted'] as int,
                      activeMinutes: _weeklyStats['activeMinutes'] as int,
                      caloriesBurned: _weeklyStats['caloriesBurned'] as int,
                      consistencyScore:
                          _weeklyStats['consistencyScore'] as double,
                    ),
                    SizedBox(height: 2.h),
                    TimePeriodSelectorWidget(
                      selectedPeriod: _selectedPeriod,
                      onPeriodChanged: _handlePeriodChange,
                    ),
                    SizedBox(height: 2.h),
                    WorkoutFrequencyChartWidget(
                      chartData: _getChartDataForPeriod(),
                      period: _selectedPeriod,
                    ),
                    SizedBox(height: 2.h),
                    ActivityCalendarWidget(
                      focusedDay: _focusedDay,
                      selectedDay: _selectedDay,
                      onDaySelected: _handleDaySelected,
                      workoutEvents: _workoutEvents,
                    ),
                    SizedBox(height: 2.h),
                    MetricsCardsWidget(metricsData: _metricsData),
                    SizedBox(height: 10.h),
                  ],
                ),
              ),
            ),
    );
  }

  List<Map<String, dynamic>> _getChartDataForPeriod() {
    if (_selectedPeriod == 'Weekly') {
      return _weeklyChartData;
    } else if (_selectedPeriod == 'Monthly') {
      return _monthlyChartData;
    } else {
      return _yearlyChartData;
    }
  }

  void _handlePeriodChange(String period) {
    setState(() {
      _selectedPeriod = period;
    });
  }

  void _handleDaySelected(DateTime selectedDay, DateTime focusedDay) {
    setState(() {
      _selectedDay = selectedDay;
      _focusedDay = focusedDay;
    });

    final normalizedDay = DateTime(
      selectedDay.year,
      selectedDay.month,
      selectedDay.day,
    );
    final workouts = _workoutEvents[normalizedDay];

    if (workouts != null && workouts.isNotEmpty) {
      _showWorkoutDetails(selectedDay, workouts);
    }
  }

  Future<void> _refreshData() async {
    setState(() {
      _isRefreshing = true;
    });

    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      _isRefreshing = false;
    });

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Progress data synced successfully'),
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      );
    }
  }

  void _showFilterOptions() {
    final theme = Theme.of(context);

    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
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
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 2.h),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'fitness_center',
                  color: theme.colorScheme.primary,
                  size: 24,
                ),
                title: const Text('Strength Training'),
                onTap: () => Navigator.pop(context),
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'directions_run',
                  color: theme.colorScheme.primary,
                  size: 24,
                ),
                title: const Text('Cardio'),
                onTap: () => Navigator.pop(context),
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'self_improvement',
                  color: theme.colorScheme.primary,
                  size: 24,
                ),
                title: const Text('Yoga'),
                onTap: () => Navigator.pop(context),
              ),
              SizedBox(height: 2.h),
            ],
          ),
        );
      },
    );
  }

  void _shareProgress() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Progress image generated and ready to share'),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _showWorkoutDetails(DateTime date, List<Map<String, dynamic>> workouts) {
    final theme = Theme.of(context);

    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Container(
          padding: EdgeInsets.all(4.w),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Workout Details',
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 1.h),
              Text(
                '${date.month}/${date.day}/${date.year}',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              SizedBox(height: 2.h),
              ...workouts.map((workout) {
                return ListTile(
                  leading: CustomIconWidget(
                    iconName: 'fitness_center',
                    color: theme.colorScheme.primary,
                    size: 24,
                  ),
                  title: Text(workout['type'] as String),
                  subtitle: Text('Intensity: ${workout['intensity']}'),
                );
              }),
              SizedBox(height: 2.h),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Repeat Workout'),
                ),
              ),
              SizedBox(height: 2.h),
            ],
          ),
        );
      },
    );
  }
}
