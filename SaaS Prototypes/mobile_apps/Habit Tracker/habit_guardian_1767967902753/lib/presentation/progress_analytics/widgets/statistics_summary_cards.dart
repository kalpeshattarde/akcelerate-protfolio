import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class StatisticsSummaryCards extends StatefulWidget {
  const StatisticsSummaryCards({super.key});

  @override
  State<StatisticsSummaryCards> createState() => _StatisticsSummaryCardsState();
}

class _StatisticsSummaryCardsState extends State<StatisticsSummaryCards>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  final List<Map<String, dynamic>> statsData = [
    {
      "title": "Total Habits",
      "value": "12",
      "subtitle": "Active habits",
      "icon": "track_changes",
      "color": "forest",
      "trend": "+2 this month",
      "isPositive": true,
    },
    {
      "title": "Daily Completion",
      "value": "87%",
      "subtitle": "Average rate",
      "icon": "trending_up",
      "color": "terracotta",
      "trend": "+5% from last week",
      "isPositive": true,
    },
    {
      "title": "Most Consistent",
      "value": "Meditation",
      "subtitle": "28-day streak",
      "icon": "emoji_events",
      "color": "gold",
      "trend": "Personal best!",
      "isPositive": true,
    },
    {
      "title": "Improvement",
      "value": "+23%",
      "subtitle": "This month",
      "icon": "show_chart",
      "color": "forest",
      "trend": "Great progress",
      "isPositive": true,
    },
  ];

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    _pulseAnimation = Tween<double>(
      begin: 1.0,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));
    _pulseController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  Color _getStatColor(String colorType, bool isDark) {
    switch (colorType) {
      case 'forest':
        return isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight;
      case 'terracotta':
        return isDark ? AppTheme.accentDark : AppTheme.accentLight;
      case 'gold':
        return isDark ? AppTheme.premiumDark : AppTheme.premiumLight;
      default:
        return isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
            child: Text(
              'Statistics Summary',
              style: theme.textTheme.titleLarge?.copyWith(
                color: isDark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          SizedBox(height: 1.h),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 3.w,
              mainAxisSpacing: 2.h,
              childAspectRatio: 1.1,
            ),
            itemCount: statsData.length,
            itemBuilder: (context, index) {
              final stat = statsData[index];
              final statColor = _getStatColor(stat["color"] as String, isDark);

              return AnimatedBuilder(
                animation: _pulseAnimation,
                builder: (context, child) {
                  return Transform.scale(
                    scale: index == 2
                        ? _pulseAnimation.value
                        : 1.0, // Pulse the achievement card
                    child: Container(
                      padding: EdgeInsets.all(4.w),
                      decoration: BoxDecoration(
                        color: isDark
                            ? AppTheme.surfaceDark
                            : AppTheme.surfaceLight,
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
                        border: index == 2
                            ? Border.all(
                                color: statColor.withValues(alpha: 0.3),
                                width: 1,
                              )
                            : null,
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                padding: EdgeInsets.all(2.w),
                                decoration: BoxDecoration(
                                  color: statColor.withValues(alpha: 0.1),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: CustomIconWidget(
                                  iconName: stat["icon"] as String,
                                  color: statColor,
                                  size: 20,
                                ),
                              ),
                              if (stat["isPositive"] as bool)
                                Container(
                                  padding: EdgeInsets.symmetric(
                                    horizontal: 2.w,
                                    vertical: 0.5.h,
                                  ),
                                  decoration: BoxDecoration(
                                    color: (isDark
                                            ? AppTheme.successDark
                                            : AppTheme.successLight)
                                        .withValues(alpha: 0.1),
                                    borderRadius: BorderRadius.circular(6),
                                  ),
                                  child: CustomIconWidget(
                                    iconName: 'trending_up',
                                    color: isDark
                                        ? AppTheme.successDark
                                        : AppTheme.successLight,
                                    size: 12,
                                  ),
                                ),
                            ],
                          ),
                          SizedBox(height: 2.h),
                          Text(
                            stat["value"] as String,
                            style: theme.textTheme.headlineMedium?.copyWith(
                              color: isDark
                                  ? AppTheme.textPrimaryDark
                                  : AppTheme.textPrimaryLight,
                              fontWeight: FontWeight.w700,
                              fontSize: 20.sp,
                            ),
                          ),
                          SizedBox(height: 0.5.h),
                          Text(
                            stat["subtitle"] as String,
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: isDark
                                  ? AppTheme.textSecondaryDark
                                  : AppTheme.textSecondaryLight,
                            ),
                          ),
                          const Spacer(),
                          Container(
                            padding: EdgeInsets.symmetric(
                              horizontal: 2.w,
                              vertical: 0.5.h,
                            ),
                            decoration: BoxDecoration(
                              color: statColor.withValues(alpha: 0.05),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              stat["trend"] as String,
                              style: theme.textTheme.labelSmall?.copyWith(
                                color: statColor,
                                fontWeight: FontWeight.w500,
                                fontSize: 8.sp,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              );
            },
          ),
        ],
      ),
    );
  }
}
