import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class AchievementBadgesWidget extends StatefulWidget {
  final List<Map<String, dynamic>> achievements;

  const AchievementBadgesWidget({
    super.key,
    required this.achievements,
  });

  @override
  State<AchievementBadgesWidget> createState() =>
      _AchievementBadgesWidgetState();
}

class _AchievementBadgesWidgetState extends State<AchievementBadgesWidget>
    with TickerProviderStateMixin {
  late List<AnimationController> _controllers;
  late List<Animation<double>> _scaleAnimations;
  late List<Animation<double>> _rotationAnimations;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
  }

  void _initializeAnimations() {
    _controllers = List.generate(
      widget.achievements.length,
      (index) => AnimationController(
        duration: Duration(milliseconds: 800 + (index * 200)),
        vsync: this,
      ),
    );

    _scaleAnimations = _controllers
        .map((controller) =>
            Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(
              parent: controller,
              curve: Curves.elasticOut,
            )))
        .toList();

    _rotationAnimations = _controllers
        .map((controller) =>
            Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(
              parent: controller,
              curve: Curves.easeInOut,
            )))
        .toList();

    // Start animations with staggered delay
    for (int i = 0; i < _controllers.length; i++) {
      Future.delayed(Duration(milliseconds: i * 150), () {
        if (mounted) {
          _controllers[i].forward();
        }
      });
    }
  }

  @override
  void dispose() {
    for (final controller in _controllers) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    if (widget.achievements.isEmpty) {
      return const SizedBox.shrink();
    }

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
          // Header
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              children: [
                Container(
                  padding: EdgeInsets.all(2.w),
                  decoration: BoxDecoration(
                    color:
                        (isDark ? AppTheme.premiumDark : AppTheme.premiumLight)
                            .withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: CustomIconWidget(
                    iconName: 'emoji_events',
                    color:
                        isDark ? AppTheme.premiumDark : AppTheme.premiumLight,
                    size: 24,
                  ),
                ),
                SizedBox(width: 3.w),
                Text(
                  'Achievements',
                  style: theme.textTheme.titleLarge?.copyWith(
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),

          // Achievement badges
          Container(
            height: 25.h,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              itemCount: widget.achievements.length,
              separatorBuilder: (context, index) => SizedBox(width: 4.w),
              itemBuilder: (context, index) {
                final achievement = widget.achievements[index];

                return AnimatedBuilder(
                  animation: _controllers[index],
                  builder: (context, child) {
                    return Transform.scale(
                      scale: _scaleAnimations[index].value,
                      child: Transform.rotate(
                        angle: _rotationAnimations[index].value * 0.1,
                        child: _buildAchievementBadge(
                          achievement,
                          theme,
                          isDark,
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),

          SizedBox(height: 2.h),
        ],
      ),
    );
  }

  Widget _buildAchievementBadge(
    Map<String, dynamic> achievement,
    ThemeData theme,
    bool isDark,
  ) {
    final title = achievement['title'] as String;
    final description = achievement['description'] as String;
    final iconName = achievement['icon'] as String;
    final isUnlocked = achievement['unlocked'] as bool;
    final unlockedDate = achievement['unlockedDate'] as DateTime?;

    return Container(
      width: 40.w,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        gradient: isUnlocked
            ? LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  (isDark ? AppTheme.premiumDark : AppTheme.premiumLight)
                      .withValues(alpha: 0.2),
                  (isDark ? AppTheme.accentDark : AppTheme.accentLight)
                      .withValues(alpha: 0.1),
                ],
              )
            : null,
        color: !isUnlocked
            ? (isDark ? AppTheme.borderDark : AppTheme.borderLight)
                .withValues(alpha: 0.3)
            : null,
        borderRadius: BorderRadius.circular(16),
        border: isUnlocked
            ? Border.all(
                color: (isDark ? AppTheme.premiumDark : AppTheme.premiumLight)
                    .withValues(alpha: 0.3),
                width: 2,
              )
            : null,
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Badge icon
          Container(
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              color: isUnlocked
                  ? (isDark ? AppTheme.premiumDark : AppTheme.premiumLight)
                      .withValues(alpha: 0.2)
                  : (isDark
                          ? AppTheme.textSecondaryDark
                          : AppTheme.textSecondaryLight)
                      .withValues(alpha: 0.2),
              shape: BoxShape.circle,
              boxShadow: isUnlocked
                  ? [
                      BoxShadow(
                        color: (isDark
                                ? AppTheme.premiumDark
                                : AppTheme.premiumLight)
                            .withValues(alpha: 0.3),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ]
                  : null,
            ),
            child: CustomIconWidget(
              iconName: iconName,
              color: isUnlocked
                  ? (isDark ? AppTheme.premiumDark : AppTheme.premiumLight)
                  : (isDark
                      ? AppTheme.textSecondaryDark
                      : AppTheme.textSecondaryLight),
              size: 32,
            ),
          ),

          SizedBox(height: 3.h),

          // Badge title with flexible sizing
          Flexible(
            child: Text(
              title,
              style: theme.textTheme.titleMedium?.copyWith(
                color: isUnlocked
                    ? (isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight)
                    : (isDark
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight),
                fontWeight: FontWeight.w600,
                fontSize: 14.sp,
              ),
              textAlign: TextAlign.center,
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
              softWrap: true,
            ),
          ),

          SizedBox(height: 1.h),

          // Badge description with flexible sizing
          Flexible(
            child: Text(
              description,
              style: theme.textTheme.bodySmall?.copyWith(
                color: isUnlocked
                    ? (isDark
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight)
                    : (isDark
                            ? AppTheme.textSecondaryDark
                            : AppTheme.textSecondaryLight)
                        .withValues(alpha: 0.7),
                height: 1.3,
                fontSize: 10.sp,
              ),
              textAlign: TextAlign.center,
              maxLines: 4,
              overflow: TextOverflow.ellipsis,
              softWrap: true,
            ),
          ),

          if (isUnlocked && unlockedDate != null) ...[
            SizedBox(height: 2.h),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 1.h),
              decoration: BoxDecoration(
                color: (isDark ? AppTheme.successDark : AppTheme.successLight)
                    .withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                'Unlocked ${unlockedDate.day}/${unlockedDate.month}/${unlockedDate.year}',
                style: theme.textTheme.bodySmall?.copyWith(
                  color: isDark ? AppTheme.successDark : AppTheme.successLight,
                  fontWeight: FontWeight.w500,
                  fontSize: 9.sp,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
