import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class WeeklyViewWidget extends StatefulWidget {
  final List<Map<String, dynamic>> weeklyData;
  final Function(int) onWeekChanged;

  const WeeklyViewWidget({
    super.key,
    required this.weeklyData,
    required this.onWeekChanged,
  });

  @override
  State<WeeklyViewWidget> createState() => _WeeklyViewWidgetState();
}

class _WeeklyViewWidgetState extends State<WeeklyViewWidget>
    with SingleTickerProviderStateMixin {
  late PageController _pageController;
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;
  int _currentWeekIndex = 0;

  final List<String> _weekDays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _initializeFadeAnimation();
  }

  void _initializeFadeAnimation() {
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeInOut,
    ));

    _fadeController.forward();
  }

  @override
  void dispose() {
    _pageController.dispose();
    _fadeController.dispose();
    super.dispose();
  }

  void _onPageChanged(int index) {
    setState(() {
      _currentWeekIndex = index;
    });
    widget.onWeekChanged(index);

    _fadeController.reset();
    _fadeController.forward();
    HapticFeedback.lightImpact();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.white.withValues(alpha: 0.05)
                : Colors.black.withValues(alpha: 0.08),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header with navigation
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Weekly Progress',
                  style: theme.textTheme.titleLarge?.copyWith(
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Row(
                  children: [
                    // Previous week button
                    Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: _currentWeekIndex > 0
                            ? () {
                                _pageController.previousPage(
                                  duration: const Duration(milliseconds: 300),
                                  curve: Curves.easeInOut,
                                );
                              }
                            : null,
                        borderRadius: BorderRadius.circular(8),
                        child: Container(
                          padding: EdgeInsets.all(1.w),
                          child: CustomIconWidget(
                            iconName: 'chevron_left',
                            color: _currentWeekIndex > 0
                                ? (isDark
                                    ? AppTheme.textPrimaryDark
                                    : AppTheme.textPrimaryLight)
                                : (isDark
                                    ? AppTheme.textSecondaryDark
                                    : AppTheme.textSecondaryLight),
                            size: 20,
                          ),
                        ),
                      ),
                    ),

                    SizedBox(width: 2.w),

                    // Week indicator
                    Text(
                      'Week ${_currentWeekIndex + 1}',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: isDark
                            ? AppTheme.textSecondaryDark
                            : AppTheme.textSecondaryLight,
                        fontWeight: FontWeight.w500,
                      ),
                    ),

                    SizedBox(width: 2.w),

                    // Next week button
                    Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: _currentWeekIndex < widget.weeklyData.length - 1
                            ? () {
                                _pageController.nextPage(
                                  duration: const Duration(milliseconds: 300),
                                  curve: Curves.easeInOut,
                                );
                              }
                            : null,
                        borderRadius: BorderRadius.circular(8),
                        child: Container(
                          padding: EdgeInsets.all(1.w),
                          child: CustomIconWidget(
                            iconName: 'chevron_right',
                            color:
                                _currentWeekIndex < widget.weeklyData.length - 1
                                    ? (isDark
                                        ? AppTheme.textPrimaryDark
                                        : AppTheme.textPrimaryLight)
                                    : (isDark
                                        ? AppTheme.textSecondaryDark
                                        : AppTheme.textSecondaryLight),
                            size: 20,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Weekly grid with swipe navigation
          SizedBox(
            height: 20.h,
            child: PageView.builder(
              controller: _pageController,
              onPageChanged: _onPageChanged,
              itemCount: widget.weeklyData.length,
              itemBuilder: (context, weekIndex) {
                final weekData = widget.weeklyData[weekIndex];
                final days = weekData['days'] as List<Map<String, dynamic>>;

                return FadeTransition(
                  opacity: _fadeAnimation,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    child: Column(
                      children: [
                        // Day labels
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: _weekDays
                              .map((day) => Expanded(
                                    child: Text(
                                      day,
                                      style:
                                          theme.textTheme.bodySmall?.copyWith(
                                        color: isDark
                                            ? AppTheme.textSecondaryDark
                                            : AppTheme.textSecondaryLight,
                                        fontWeight: FontWeight.w500,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ))
                              .toList(),
                        ),

                        SizedBox(height: 2.h),

                        // Completion dots
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: days.map((dayData) {
                            final isCompleted = dayData['completed'] as bool;
                            final date = dayData['date'] as DateTime;
                            final isToday = DateTime.now().day == date.day &&
                                DateTime.now().month == date.month &&
                                DateTime.now().year == date.year;

                            return Expanded(
                              child: Center(
                                child: Container(
                                  width: 8.w,
                                  height: 8.w,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: isCompleted
                                        ? (isDark
                                            ? AppTheme.secondaryDark
                                            : AppTheme.secondaryLight)
                                        : (isDark
                                            ? AppTheme.borderDark
                                            : AppTheme.borderLight),
                                    border: isToday
                                        ? Border.all(
                                            color: isDark
                                                ? AppTheme.accentDark
                                                : AppTheme.accentLight,
                                            width: 2,
                                          )
                                        : null,
                                  ),
                                  child: isCompleted
                                      ? Center(
                                          child: CustomIconWidget(
                                            iconName: 'check',
                                            color: isDark
                                                ? AppTheme.primaryDark
                                                : AppTheme.primaryLight,
                                            size: 16,
                                          ),
                                        )
                                      : null,
                                ),
                              ),
                            );
                          }).toList(),
                        ),

                        SizedBox(height: 3.h),

                        // Week summary
                        Container(
                          width: double.infinity,
                          padding: EdgeInsets.all(3.w),
                          decoration: BoxDecoration(
                            color: (isDark
                                    ? AppTheme.premiumDark
                                    : AppTheme.premiumLight)
                                .withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Week Completion',
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  color: isDark
                                      ? AppTheme.textPrimaryDark
                                      : AppTheme.textPrimaryLight,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              Text(
                                '${weekData['completedDays']}/${weekData['totalDays']} days',
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  color: isDark
                                      ? AppTheme.premiumDark
                                      : AppTheme.premiumLight,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),

          SizedBox(height: 2.h),
        ],
      ),
    );
  }
}
