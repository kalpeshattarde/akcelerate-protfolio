import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MotivationalInsightsSection extends StatefulWidget {
  const MotivationalInsightsSection({super.key});

  @override
  State<MotivationalInsightsSection> createState() =>
      _MotivationalInsightsSectionState();
}

class _MotivationalInsightsSectionState
    extends State<MotivationalInsightsSection>
    with SingleTickerProviderStateMixin {
  late AnimationController _shimmerController;
  late Animation<double> _shimmerAnimation;

  final List<Map<String, dynamic>> insights = [
    {
      "type": "achievement",
      "title": "Consistency Champion",
      "message":
          "You've maintained your meditation habit for 28 consecutive days! Your dedication to mindfulness is creating lasting positive changes in your daily routine.",
      "icon": "emoji_events",
      "color": "gold",
    },
    {
      "type": "improvement",
      "title": "Evening Momentum",
      "message":
          "Your completion rates are 23% higher in the evening hours. Consider scheduling more habits during your natural peak performance window.",
      "icon": "insights",
      "color": "terracotta",
    },
    {
      "type": "encouragement",
      "title": "Weekend Warrior",
      "message":
          "While weekday consistency is strong, weekend habits need attention. Small adjustments to your Saturday routine could boost overall success by 15%.",
      "icon": "psychology",
      "color": "forest",
    },
  ];

  @override
  void initState() {
    super.initState();
    _shimmerController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    _shimmerAnimation = Tween<double>(
      begin: -1.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _shimmerController,
      curve: Curves.easeInOut,
    ));
    _shimmerController.repeat();
  }

  @override
  void dispose() {
    _shimmerController.dispose();
    super.dispose();
  }

  Color _getInsightColor(String colorType, bool isDark) {
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

  void _shareInsight(String insight) {
    HapticFeedback.lightImpact();
    // In a real app, this would use the share package
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Insight shared successfully!'),
        backgroundColor: Theme.of(context).brightness == Brightness.dark
            ? AppTheme.successDark
            : AppTheme.successLight,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
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
              AnimatedBuilder(
                animation: _shimmerAnimation,
                builder: (context, child) {
                  return Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          (isDark
                                  ? AppTheme.premiumDark
                                  : AppTheme.premiumLight)
                              .withValues(alpha: 0.1),
                          (isDark
                                  ? AppTheme.premiumDark
                                  : AppTheme.premiumLight)
                              .withValues(alpha: 0.3),
                          (isDark
                                  ? AppTheme.premiumDark
                                  : AppTheme.premiumLight)
                              .withValues(alpha: 0.1),
                        ],
                        stops: [
                          0.0,
                          (_shimmerAnimation.value + 1) / 2,
                          1.0,
                        ],
                        begin: Alignment.centerLeft,
                        end: Alignment.centerRight,
                      ),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: CustomIconWidget(
                      iconName: 'auto_awesome',
                      color:
                          isDark ? AppTheme.premiumDark : AppTheme.premiumLight,
                      size: 20,
                    ),
                  );
                },
              ),
              SizedBox(width: 3.w),
              Text(
                'AI Insights',
                style: theme.textTheme.titleLarge?.copyWith(
                  color: isDark
                      ? AppTheme.textPrimaryDark
                      : AppTheme.textPrimaryLight,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 1.h),
          Text(
            'Personalized encouragement based on your progress',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: isDark
                  ? AppTheme.textSecondaryDark
                  : AppTheme.textSecondaryLight,
            ),
          ),
          SizedBox(height: 3.h),
          ...insights.map((insight) {
            final insightColor =
                _getInsightColor(insight["color"] as String, isDark);

            return Container(
              margin: EdgeInsets.only(bottom: 3.h),
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    insightColor.withValues(alpha: 0.05),
                    insightColor.withValues(alpha: 0.02),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: insightColor.withValues(alpha: 0.2),
                  width: 1,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.all(2.w),
                        decoration: BoxDecoration(
                          color: insightColor.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: CustomIconWidget(
                          iconName: insight["icon"] as String,
                          color: insightColor,
                          size: 20,
                        ),
                      ),
                      SizedBox(width: 3.w),
                      Expanded(
                        child: Text(
                          insight["title"] as String,
                          style: theme.textTheme.titleMedium?.copyWith(
                            color: isDark
                                ? AppTheme.textPrimaryDark
                                : AppTheme.textPrimaryLight,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      IconButton(
                        onPressed: () =>
                            _shareInsight(insight["message"] as String),
                        icon: CustomIconWidget(
                          iconName: 'share',
                          color: isDark
                              ? AppTheme.textSecondaryDark
                              : AppTheme.textSecondaryLight,
                          size: 20,
                        ),
                        tooltip: 'Share insight',
                      ),
                    ],
                  ),
                  SizedBox(height: 2.h),
                  Text(
                    insight["message"] as String,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: isDark
                          ? AppTheme.textPrimaryDark
                          : AppTheme.textPrimaryLight,
                      height: 1.5,
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
