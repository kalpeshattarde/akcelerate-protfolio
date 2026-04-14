import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class AchievementShowcaseWidget extends StatefulWidget {
  final List<Map<String, dynamic>> achievements;

  const AchievementShowcaseWidget({
    super.key,
    required this.achievements,
  });

  @override
  State<AchievementShowcaseWidget> createState() =>
      _AchievementShowcaseWidgetState();
}

class _AchievementShowcaseWidgetState extends State<AchievementShowcaseWidget>
    with TickerProviderStateMixin {
  late AnimationController _celebrationController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _rotationAnimation;
  int? _celebratingIndex;

  @override
  void initState() {
    super.initState();
    _initializeCelebrationAnimation();
  }

  void _initializeCelebrationAnimation() {
    _celebrationController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _celebrationController,
      curve: Curves.elasticOut,
    ));

    _rotationAnimation = Tween<double>(
      begin: 0.0,
      end: 0.1,
    ).animate(CurvedAnimation(
      parent: _celebrationController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _celebrationController.dispose();
    super.dispose();
  }

  void _handleAchievementTap(int index) {
    HapticFeedback.mediumImpact();

    setState(() {
      _celebratingIndex = index;
    });

    _celebrationController.forward().then((_) {
      _celebrationController.reverse().then((_) {
        if (mounted) {
          setState(() {
            _celebratingIndex = null;
          });
        }
      });
    });

    _showAchievementDetails(widget.achievements[index]);
  }

  void _handleAchievementLongPress(int index) {
    HapticFeedback.heavyImpact();
    _showSharingOptions(widget.achievements[index]);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 1.h),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'emoji_events',
                  color: AppTheme.lightTheme.colorScheme.tertiary,
                  size: 24,
                ),
                SizedBox(width: 2.w),
                Text(
                  'Achievements',
                  style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                    color: isDark
                        ? AppTheme.darkTheme.colorScheme.onSurface
                        : AppTheme.lightTheme.colorScheme.onSurface,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 1.h),
          Container(
            height: 25.h,
            child: widget.achievements.isEmpty
                ? _buildEmptyState(isDark)
                : ListView.builder(
                    scrollDirection: Axis.horizontal,
                    padding: EdgeInsets.symmetric(horizontal: 2.w),
                    itemCount: widget.achievements.length,
                    itemBuilder: (context, index) {
                      return _buildAchievementBadge(
                        context,
                        achievement: widget.achievements[index],
                        index: index,
                        isDark: isDark,
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(bool isDark) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.symmetric(horizontal: 2.w),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: isDark
            ? AppTheme.darkTheme.colorScheme.surface
            : AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
          style: BorderStyle.solid,
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: 'emoji_events',
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            size: 48,
          ),
          SizedBox(height: 2.h),
          Text(
            'Start Your Journey',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: isDark
                  ? AppTheme.darkTheme.colorScheme.onSurface
                  : AppTheme.lightTheme.colorScheme.onSurface,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Complete habits to unlock achievements',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: isDark
                  ? AppTheme.darkTheme.colorScheme.onSurfaceVariant
                  : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildAchievementBadge(
    BuildContext context, {
    required Map<String, dynamic> achievement,
    required int index,
    required bool isDark,
  }) {
    final isEarned = achievement['earned'] as bool? ?? false;
    final isCelebrating = _celebratingIndex == index;

    return AnimatedBuilder(
      animation: _celebrationController,
      builder: (context, child) {
        return Transform.scale(
          scale: isCelebrating ? _scaleAnimation.value : 1.0,
          child: Transform.rotate(
            angle: isCelebrating ? _rotationAnimation.value : 0.0,
            child: Container(
              width: 35.w,
              margin: EdgeInsets.symmetric(horizontal: 2.w),
              child: GestureDetector(
                onTap: () => _handleAchievementTap(index),
                onLongPress:
                    isEarned ? () => _handleAchievementLongPress(index) : null,
                child: Container(
                  padding: EdgeInsets.all(3.w),
                  decoration: BoxDecoration(
                    gradient: isEarned
                        ? LinearGradient(
                            colors: [
                              AppTheme.lightTheme.colorScheme.tertiary
                                  .withValues(alpha: 0.2),
                              AppTheme.lightTheme.colorScheme.secondary
                                  .withValues(alpha: 0.1),
                            ],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          )
                        : null,
                    color: !isEarned
                        ? (isDark
                            ? AppTheme.darkTheme.colorScheme.surface
                            : AppTheme.lightTheme.colorScheme.surface)
                        : null,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: isEarned
                          ? AppTheme.lightTheme.colorScheme.tertiary
                              .withValues(alpha: 0.4)
                          : AppTheme.lightTheme.colorScheme.outline
                              .withValues(alpha: 0.3),
                      width: isEarned ? 2 : 1,
                    ),
                    boxShadow: isEarned
                        ? [
                            BoxShadow(
                              color: AppTheme.lightTheme.colorScheme.tertiary
                                  .withValues(alpha: 0.2),
                              blurRadius: 8,
                              offset: const Offset(0, 4),
                            ),
                          ]
                        : null,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Badge icon
                      Container(
                        padding: EdgeInsets.all(3.w),
                        decoration: BoxDecoration(
                          color: isEarned
                              ? AppTheme.lightTheme.colorScheme.tertiary
                              : AppTheme.lightTheme.colorScheme.onSurfaceVariant
                                  .withValues(alpha: 0.3),
                          shape: BoxShape.circle,
                        ),
                        child: CustomIconWidget(
                          iconName:
                              achievement['icon'] as String? ?? 'emoji_events',
                          color: isEarned
                              ? AppTheme.lightTheme.colorScheme.onTertiary
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                          size: 32,
                        ),
                      ),

                      SizedBox(height: 2.h),

                      // Achievement title
                      Text(
                        achievement['title'] as String? ?? 'Achievement',
                        style:
                            AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                          color: isEarned
                              ? (isDark
                                  ? AppTheme.darkTheme.colorScheme.onSurface
                                  : AppTheme.lightTheme.colorScheme.onSurface)
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                          fontWeight:
                              isEarned ? FontWeight.w600 : FontWeight.w500,
                        ),
                        textAlign: TextAlign.center,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),

                      SizedBox(height: 1.h),

                      // Achievement description
                      Text(
                        achievement['description'] as String? ?? 'Keep going!',
                        style:
                            AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                          color: isEarned
                              ? (isDark
                                  ? AppTheme
                                      .darkTheme.colorScheme.onSurfaceVariant
                                  : AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant)
                              : AppTheme.lightTheme.colorScheme.onSurfaceVariant
                                  .withValues(alpha: 0.7),
                        ),
                        textAlign: TextAlign.center,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),

                      if (isEarned) ...[
                        SizedBox(height: 1.h),
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 2.w, vertical: 0.5.h),
                          decoration: BoxDecoration(
                            color: AppTheme.lightTheme.colorScheme.tertiary,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            'Earned',
                            style: AppTheme.lightTheme.textTheme.labelSmall
                                ?.copyWith(
                              color: AppTheme.lightTheme.colorScheme.onTertiary,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  void _showAchievementDetails(Map<String, dynamic> achievement) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        title: Row(
          children: [
            Container(
              padding: EdgeInsets.all(2.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.tertiary,
                shape: BoxShape.circle,
              ),
              child: CustomIconWidget(
                iconName: achievement['icon'] as String? ?? 'emoji_events',
                color: AppTheme.lightTheme.colorScheme.onTertiary,
                size: 24,
              ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Text(
                achievement['title'] as String? ?? 'Achievement',
                style: AppTheme.lightTheme.textTheme.titleLarge,
              ),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              achievement['description'] as String? ??
                  'Great job on your progress!',
              style: AppTheme.lightTheme.textTheme.bodyMedium,
            ),
            if (achievement['earnedDate'] != null) ...[
              SizedBox(height: 2.h),
              Text(
                'Earned on ${achievement['earnedDate']}',
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.tertiary,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Close',
              style: TextStyle(
                color: AppTheme.lightTheme.colorScheme.primary,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showSharingOptions(Map<String, dynamic> achievement) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        ),
        padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 3.h),
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
              'Share Achievement',
              style: AppTheme.lightTheme.textTheme.titleLarge,
            ),
            SizedBox(height: 3.h),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildShareOption(
                  icon: 'share',
                  label: 'Share',
                  onTap: () {
                    Navigator.pop(context);
                    // Handle sharing
                  },
                ),
                _buildShareOption(
                  icon: 'content_copy',
                  label: 'Copy',
                  onTap: () {
                    Navigator.pop(context);
                    // Handle copying
                  },
                ),
                _buildShareOption(
                  icon: 'download',
                  label: 'Save',
                  onTap: () {
                    Navigator.pop(context);
                    // Handle saving
                  },
                ),
              ],
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  Widget _buildShareOption({
    required String icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(3.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.primary
                  .withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: CustomIconWidget(
              iconName: icon,
              color: AppTheme.lightTheme.colorScheme.primary,
              size: 24,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            label,
            style: AppTheme.lightTheme.textTheme.bodySmall,
          ),
        ],
      ),
    );
  }
}
