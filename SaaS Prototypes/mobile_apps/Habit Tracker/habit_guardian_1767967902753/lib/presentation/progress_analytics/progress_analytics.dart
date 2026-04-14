import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/filter_bottom_sheet.dart';
import './widgets/habit_performance_grid.dart';
import './widgets/motivational_insights_section.dart';
import './widgets/overall_progress_chart.dart';
import './widgets/statistics_summary_cards.dart';
import './widgets/streak_analysis_section.dart';
import './widgets/time_period_selector.dart';
import './widgets/weekly_patterns_heatmap.dart';

class ProgressAnalytics extends StatefulWidget {
  const ProgressAnalytics({super.key});

  @override
  State<ProgressAnalytics> createState() => _ProgressAnalyticsState();
}

class _ProgressAnalyticsState extends State<ProgressAnalytics>
    with TickerProviderStateMixin {
  late AnimationController _refreshController;
  late Animation<double> _refreshAnimation;

  String _selectedTimePeriod = 'Week';
  List<String> _selectedCategories = [];
  String _selectedTimeRange = 'Last 30 days';
  bool _isRefreshing = false;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
  }

  void _initializeAnimations() {
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

    setState(() => _isRefreshing = true);
    HapticFeedback.mediumImpact();

    _refreshController.forward();

    // Simulate data refresh
    await Future.delayed(const Duration(milliseconds: 1500));

    _refreshController.reset();
    setState(() => _isRefreshing = false);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Analytics updated successfully'),
          backgroundColor: Theme.of(context).brightness == Brightness.dark
              ? AppTheme.successDark
              : AppTheme.successLight,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          margin: EdgeInsets.all(4.w),
        ),
      );
    }
  }

  void _showFilterBottomSheet() {
    HapticFeedback.lightImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => SizedBox(
        height: 80.h,
        child: FilterBottomSheet(
          selectedCategories: _selectedCategories,
          selectedTimeRange: _selectedTimeRange,
          onFiltersApplied: (categories, timeRange) {
            setState(() {
              _selectedCategories = categories;
              _selectedTimeRange = timeRange;
            });
          },
        ),
      ),
    );
  }

  void _exportData() {
    HapticFeedback.mediumImpact();
    // In a real app, this would export analytics data
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Analytics data exported successfully'),
        backgroundColor: Theme.of(context).brightness == Brightness.dark
            ? AppTheme.accentDark
            : AppTheme.accentLight,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        margin: EdgeInsets.all(4.w),
        action: SnackBarAction(
          label: 'View',
          textColor: Theme.of(context).brightness == Brightness.dark
              ? AppTheme.primaryDark
              : AppTheme.primaryLight,
          onPressed: () {
            // Open exported file
          },
        ),
      ),
    );
  }

  Widget _buildEmptyState() {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Center(
      child: Container(
        padding: EdgeInsets.all(8.w),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: EdgeInsets.all(6.w),
              decoration: BoxDecoration(
                color:
                    (isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight)
                        .withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: CustomIconWidget(
                iconName: 'analytics',
                color:
                    isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
                size: 48,
              ),
            ),
            SizedBox(height: 4.h),
            Text(
              'Start Your Journey',
              style: theme.textTheme.headlineSmall?.copyWith(
                color: isDark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 2.h),
            Text(
              'Create your first habit to begin tracking your progress and unlock meaningful insights.',
              textAlign: TextAlign.center,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: isDark
                    ? AppTheme.textSecondaryDark
                    : AppTheme.textSecondaryLight,
                height: 1.5,
              ),
            ),
            SizedBox(height: 4.h),
            ElevatedButton.icon(
              onPressed: () => Navigator.pushNamed(context, '/habit-creation'),
              icon: CustomIconWidget(
                iconName: 'add_circle',
                color: isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
                size: 20,
              ),
              label: Text('Create First Habit'),
              style: ElevatedButton.styleFrom(
                backgroundColor:
                    isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
                foregroundColor:
                    isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
                padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final hasData = true; // In real app, check if user has habits

    return Scaffold(
      backgroundColor: isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
      body: SafeArea(
        child: Column(
          children: [
            // Header with actions
            Container(
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              child: Row(
                children: [
                  Text(
                    'Progress Analytics',
                    style: theme.textTheme.headlineSmall?.copyWith(
                      color: isDark
                          ? AppTheme.textPrimaryDark
                          : AppTheme.textPrimaryLight,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const Spacer(),
                  IconButton(
                    onPressed: _showFilterBottomSheet,
                    icon: CustomIconWidget(
                      iconName: 'tune',
                      color: isDark
                          ? AppTheme.textSecondaryDark
                          : AppTheme.textSecondaryLight,
                      size: 24,
                    ),
                    tooltip: 'Filter analytics',
                  ),
                  IconButton(
                    onPressed: _exportData,
                    icon: CustomIconWidget(
                      iconName: 'file_download',
                      color: isDark
                          ? AppTheme.textSecondaryDark
                          : AppTheme.textSecondaryLight,
                      size: 24,
                    ),
                    tooltip: 'Export data',
                  ),
                ],
              ),
            ),

            // Content
            Expanded(
              child: hasData
                  ? RefreshIndicator(
                      onRefresh: _handleRefresh,
                      color: isDark
                          ? AppTheme.secondaryDark
                          : AppTheme.secondaryLight,
                      backgroundColor:
                          isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
                      child: SingleChildScrollView(
                        physics: const AlwaysScrollableScrollPhysics(),
                        child: AnimatedBuilder(
                          animation: _refreshAnimation,
                          builder: (context, child) {
                            return Opacity(
                              opacity: _isRefreshing ? 0.7 : 1.0,
                              child: Column(
                                children: [
                                  // Time period selector
                                  TimePeriodSelector(
                                    selectedPeriod: _selectedTimePeriod,
                                    onPeriodChanged: (period) {
                                      HapticFeedback.lightImpact();
                                      setState(
                                          () => _selectedTimePeriod = period);
                                    },
                                  ),

                                  // Overall progress chart
                                  OverallProgressChart(
                                    timePeriod: _selectedTimePeriod,
                                  ),

                                  // Statistics summary cards
                                  const StatisticsSummaryCards(),

                                  // Habit performance grid
                                  const HabitPerformanceGrid(),

                                  // Streak analysis
                                  const StreakAnalysisSection(),

                                  // Weekly patterns heatmap
                                  const WeeklyPatternsHeatmap(),

                                  // Motivational insights
                                  const MotivationalInsightsSection(),

                                  SizedBox(height: 4.h),
                                ],
                              ),
                            );
                          },
                        ),
                      ),
                    )
                  : _buildEmptyState(),
            ),
          ],
        ),
      ),
    );
  }
}
