import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class StreakAnalysisSection extends StatefulWidget {
  const StreakAnalysisSection({super.key});

  @override
  State<StreakAnalysisSection> createState() => _StreakAnalysisSectionState();
}

class _StreakAnalysisSectionState extends State<StreakAnalysisSection>
    with SingleTickerProviderStateMixin {
  late AnimationController _celebrationController;
  late Animation<double> _celebrationAnimation;

  final List<Map<String, dynamic>> streakData = [
    {
      "habit": "Morning Meditation",
      "currentStreak": 28,
      "longestStreak": 45,
      "icon": "self_improvement",
      "isActive": true,
    },
    {
      "habit": "Daily Exercise",
      "currentStreak": 15,
      "longestStreak": 32,
      "icon": "fitness_center",
      "isActive": true,
    },
    {
      "habit": "Read 30 Minutes",
      "currentStreak": 0,
      "longestStreak": 21,
      "icon": "menu_book",
      "isActive": false,
    },
    {
      "habit": "Drink Water",
      "currentStreak": 42,
      "longestStreak": 42,
      "icon": "local_drink",
      "isActive": true,
    },
  ];

  @override
  void initState() {
    super.initState();
    _celebrationController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );
    _celebrationAnimation = Tween<double>(
      begin: 0.8,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _celebrationController,
      curve: Curves.elasticOut,
    ));
    _celebrationController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _celebrationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.white.withValues(alpha: 0.05)
                : Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                'Streak Analysis',
                style: theme.textTheme.titleLarge?.copyWith(
                  color: isDark
                      ? AppTheme.textPrimaryDark
                      : AppTheme.textPrimaryLight,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const Spacer(),
              AnimatedBuilder(
                animation: _celebrationAnimation,
                builder: (context, child) {
                  return Transform.scale(
                    scale: _celebrationAnimation.value,
                    child: Container(
                      padding: EdgeInsets.all(1.5.w),
                      decoration: BoxDecoration(
                        color: (isDark
                                ? AppTheme.premiumDark
                                : AppTheme.premiumLight)
                            .withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: CustomIconWidget(
                        iconName: 'local_fire_department',
                        color: isDark
                            ? AppTheme.premiumDark
                            : AppTheme.premiumLight,
                        size: 20,
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
          SizedBox(height: 1.h),
          Text(
            'Current streaks and achievements',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: isDark
                  ? AppTheme.textSecondaryDark
                  : AppTheme.textSecondaryLight,
            ),
          ),
          SizedBox(height: 3.h),
          ...streakData.map((streak) {
            final isActive = streak["isActive"] as bool;
            final currentStreak = streak["currentStreak"] as int;
            final longestStreak = streak["longestStreak"] as int;
            final isNewRecord =
                currentStreak == longestStreak && currentStreak > 0;

            return Container(
              margin: EdgeInsets.only(bottom: 2.h),
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: isActive
                    ? (isDark
                            ? AppTheme.secondaryDark
                            : AppTheme.secondaryLight)
                        .withValues(alpha: 0.05)
                    : (isDark ? AppTheme.borderDark : AppTheme.borderLight)
                        .withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(12),
                border: isNewRecord
                    ? Border.all(
                        color: isDark
                            ? AppTheme.premiumDark
                            : AppTheme.premiumLight,
                        width: 2,
                      )
                    : null,
              ),
              child: Row(
                children: [
                  Container(
                    padding: EdgeInsets.all(2.5.w),
                    decoration: BoxDecoration(
                      color: isActive
                          ? (isDark
                                  ? AppTheme.secondaryDark
                                  : AppTheme.secondaryLight)
                              .withValues(alpha: 0.1)
                          : (isDark
                                  ? AppTheme.textSecondaryDark
                                  : AppTheme.textSecondaryLight)
                              .withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: CustomIconWidget(
                      iconName: streak["icon"] as String,
                      color: isActive
                          ? (isDark
                              ? AppTheme.secondaryDark
                              : AppTheme.secondaryLight)
                          : (isDark
                              ? AppTheme.textSecondaryDark
                              : AppTheme.textSecondaryLight),
                      size: 24,
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              streak["habit"] as String,
                              style: theme.textTheme.titleMedium?.copyWith(
                                color: isDark
                                    ? AppTheme.textPrimaryDark
                                    : AppTheme.textPrimaryLight,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            if (isNewRecord) ...[
                              SizedBox(width: 2.w),
                              Container(
                                padding: EdgeInsets.symmetric(
                                  horizontal: 2.w,
                                  vertical: 0.5.h,
                                ),
                                decoration: BoxDecoration(
                                  color: isDark
                                      ? AppTheme.premiumDark
                                      : AppTheme.premiumLight,
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Text(
                                  'NEW RECORD!',
                                  style: theme.textTheme.labelSmall?.copyWith(
                                    color: isDark
                                        ? AppTheme.primaryDark
                                        : AppTheme.primaryLight,
                                    fontWeight: FontWeight.w600,
                                    fontSize: 8.sp,
                                  ),
                                ),
                              ),
                            ],
                          ],
                        ),
                        SizedBox(height: 0.5.h),
                        Row(
                          children: [
                            Text(
                              'Current: ',
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: isDark
                                    ? AppTheme.textSecondaryDark
                                    : AppTheme.textSecondaryLight,
                              ),
                            ),
                            Text(
                              '$currentStreak days',
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: isActive
                                    ? (isDark
                                        ? AppTheme.secondaryDark
                                        : AppTheme.secondaryLight)
                                    : (isDark
                                        ? AppTheme.textSecondaryDark
                                        : AppTheme.textSecondaryLight),
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            SizedBox(width: 4.w),
                            Text(
                              'Best: ',
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: isDark
                                    ? AppTheme.textSecondaryDark
                                    : AppTheme.textSecondaryLight,
                              ),
                            ),
                            Text(
                              '$longestStreak days',
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: isDark
                                    ? AppTheme.premiumDark
                                    : AppTheme.premiumLight,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  if (isActive)
                    Container(
                      padding: EdgeInsets.all(1.w),
                      decoration: BoxDecoration(
                        color: (isDark
                                ? AppTheme.successDark
                                : AppTheme.successLight)
                            .withValues(alpha: 0.1),
                        shape: BoxShape.circle,
                      ),
                      child: CustomIconWidget(
                        iconName: 'check_circle',
                        color: isDark
                            ? AppTheme.successDark
                            : AppTheme.successLight,
                        size: 16,
                      ),
                    ),
                ],
              ),
            );
          }).toList(),
        ],
      ),
    );
  }
}
