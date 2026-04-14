import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class ProgressChartWidget extends StatefulWidget {
  final double completionPercentage;

  const ProgressChartWidget({
    super.key,
    required this.completionPercentage,
  });

  @override
  State<ProgressChartWidget> createState() => _ProgressChartWidgetState();
}

class _ProgressChartWidgetState extends State<ProgressChartWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _initializeAnimation();
  }

  void _initializeAnimation() {
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _animation = Tween<double>(
      begin: 0.0,
      end: widget.completionPercentage,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeOutCubic,
    ));

    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
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
          // Chart title
          Text(
            'Progress Overview',
            style: theme.textTheme.titleLarge?.copyWith(
              color:
                  isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
              fontWeight: FontWeight.w600,
            ),
          ),

          SizedBox(height: 3.h),

          // Circular progress chart
          Center(
            child: SizedBox(
              width: 50.w,
              height: 50.w,
              child: AnimatedBuilder(
                animation: _animation,
                builder: (context, child) {
                  return Stack(
                    alignment: Alignment.center,
                    children: [
                      // Background circle
                      Container(
                        width: 50.w,
                        height: 50.w,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: (isDark
                                  ? AppTheme.borderDark
                                  : AppTheme.borderLight)
                              .withValues(alpha: 0.3),
                        ),
                      ),

                      // Progress pie chart
                      PieChart(
                        PieChartData(
                          startDegreeOffset: -90,
                          sectionsSpace: 0,
                          centerSpaceRadius: 18.w,
                          sections: [
                            // Completed section
                            PieChartSectionData(
                              value: _animation.value,
                              color: isDark
                                  ? AppTheme.secondaryDark
                                  : AppTheme.secondaryLight,
                              radius: 4.w,
                              showTitle: false,
                            ),
                            // Remaining section
                            PieChartSectionData(
                              value: 100 - _animation.value,
                              color: (isDark
                                      ? AppTheme.borderDark
                                      : AppTheme.borderLight)
                                  .withValues(alpha: 0.3),
                              radius: 4.w,
                              showTitle: false,
                            ),
                          ],
                        ),
                      ),

                      // Center percentage text
                      Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            '${_animation.value.toInt()}%',
                            style: theme.textTheme.headlineMedium?.copyWith(
                              color: isDark
                                  ? AppTheme.secondaryDark
                                  : AppTheme.secondaryLight,
                              fontWeight: FontWeight.w700,
                              letterSpacing: -0.5,
                            ),
                          ),
                          Text(
                            'Complete',
                            style: theme.textTheme.bodyMedium?.copyWith(
                              color: isDark
                                  ? AppTheme.textSecondaryDark
                                  : AppTheme.textSecondaryLight,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ],
                  );
                },
              ),
            ),
          ),

          SizedBox(height: 3.h),

          // Progress description
          Container(
            width: double.infinity,
            padding: EdgeInsets.all(3.w),
            decoration: BoxDecoration(
              color: (isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight)
                  .withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              widget.completionPercentage >= 80
                  ? 'Excellent progress! You\'re doing great with this habit.'
                  : widget.completionPercentage >= 60
                      ? 'Good progress! Keep up the consistent effort.'
                      : widget.completionPercentage >= 40
                          ? 'Making progress! Stay focused on your goal.'
                          : 'Getting started! Every step counts towards building this habit.',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: isDark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                height: 1.5,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}
