import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class AchievementGalleryWidget extends StatefulWidget {
  final List<Map<String, dynamic>> achievements;

  const AchievementGalleryWidget({
    Key? key,
    required this.achievements,
  }) : super(key: key);

  @override
  State<AchievementGalleryWidget> createState() =>
      _AchievementGalleryWidgetState();
}

class _AchievementGalleryWidgetState extends State<AchievementGalleryWidget>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late List<AnimationController> _badgeAnimationControllers;
  late List<Animation<double>> _badgeAnimations;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _badgeAnimationControllers = List.generate(
      widget.achievements.length,
      (index) => AnimationController(
        duration: Duration(milliseconds: 600 + (index * 100)),
        vsync: this,
      ),
    );

    _badgeAnimations = _badgeAnimationControllers.map((controller) {
      return Tween<double>(begin: 0.0, end: 1.0).animate(
        CurvedAnimation(parent: controller, curve: Curves.elasticOut),
      );
    }).toList();

    _animationController.forward();

    // Stagger badge animations
    for (int i = 0; i < _badgeAnimationControllers.length; i++) {
      Future.delayed(Duration(milliseconds: i * 150), () {
        if (mounted) {
          _badgeAnimationControllers[i].forward();
        }
      });
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    for (var controller in _badgeAnimationControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final earnedAchievements =
        widget.achievements.where((a) => a['earned'] == true).length;
    final totalAchievements = widget.achievements.length;
    final completionPercentage =
        (earnedAchievements / totalAchievements * 100).round();

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Achievement Gallery',
                style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.colorScheme.tertiary
                      .withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  '$earnedAchievements/$totalAchievements ($completionPercentage%)',
                  style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.tertiary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 3.h),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              crossAxisSpacing: 3.w,
              mainAxisSpacing: 2.h,
              childAspectRatio: 0.8,
            ),
            itemCount: widget.achievements.length,
            itemBuilder: (context, index) {
              final achievement = widget.achievements[index];
              final isEarned = achievement['earned'] as bool;
              final title = achievement['title'] as String;
              final description = achievement['description'] as String;
              final iconName = achievement['icon'] as String;
              final earnedDate = achievement['earnedDate'] as String?;

              return AnimatedBuilder(
                animation: _badgeAnimations[index],
                builder: (context, child) {
                  return Transform.scale(
                    scale: _badgeAnimations[index].value,
                    child: GestureDetector(
                      onTap: () =>
                          _showAchievementDetails(context, achievement),
                      child: Container(
                        decoration: BoxDecoration(
                          color: isEarned
                              ? AppTheme.lightTheme.colorScheme.surface
                              : AppTheme.lightTheme.colorScheme.outline
                                  .withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(12),
                          border: isEarned
                              ? Border.all(
                                  color: AppTheme
                                      .lightTheme.colorScheme.tertiary
                                      .withValues(alpha: 0.3),
                                  width: 2,
                                )
                              : Border.all(
                                  color: AppTheme.lightTheme.colorScheme.outline
                                      .withValues(alpha: 0.2),
                                  width: 1,
                                ),
                          boxShadow: isEarned
                              ? [
                                  BoxShadow(
                                    color: AppTheme
                                        .lightTheme.colorScheme.tertiary
                                        .withValues(alpha: 0.2),
                                    blurRadius: 8,
                                    offset: const Offset(0, 2),
                                  ),
                                ]
                              : null,
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              width: 12.w,
                              height: 12.w,
                              decoration: BoxDecoration(
                                color: isEarned
                                    ? AppTheme.lightTheme.colorScheme.tertiary
                                    : AppTheme.lightTheme.colorScheme.outline
                                        .withValues(alpha: 0.3),
                                shape: BoxShape.circle,
                                boxShadow: isEarned
                                    ? [
                                        BoxShadow(
                                          color: AppTheme
                                              .lightTheme.colorScheme.tertiary
                                              .withValues(alpha: 0.4),
                                          blurRadius: 6,
                                          offset: const Offset(0, 2),
                                        ),
                                      ]
                                    : null,
                              ),
                              child: Center(
                                child: CustomIconWidget(
                                  iconName: iconName,
                                  size: 24,
                                  color: isEarned
                                      ? Colors.white
                                      : AppTheme.lightTheme.colorScheme
                                          .onSurfaceVariant
                                          .withValues(alpha: 0.5),
                                ),
                              ),
                            ),
                            SizedBox(height: 1.h),
                            Text(
                              title,
                              style: AppTheme.lightTheme.textTheme.bodySmall
                                  ?.copyWith(
                                color: isEarned
                                    ? AppTheme.lightTheme.colorScheme.onSurface
                                    : AppTheme
                                        .lightTheme.colorScheme.onSurfaceVariant
                                        .withValues(alpha: 0.6),
                                fontWeight: isEarned
                                    ? FontWeight.w600
                                    : FontWeight.w400,
                              ),
                              textAlign: TextAlign.center,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            if (isEarned && earnedDate != null) ...[
                              SizedBox(height: 0.5.h),
                              Text(
                                earnedDate,
                                style: AppTheme.lightTheme.textTheme.bodySmall
                                    ?.copyWith(
                                  color: AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                                  fontSize: 9.sp,
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ],
                        ),
                      ),
                    ),
                  );
                },
              );
            },
          ),
          SizedBox(height: 3.h),
          Row(
            children: [
              Expanded(
                child: _buildCategoryProgress('Learning', 3, 5),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: _buildCategoryProgress('Social', 2, 4),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: _buildCategoryProgress('Streak', 4, 6),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryProgress(String category, int earned, int total) {
    final progress = earned / total;

    return Column(
      children: [
        Text(
          category,
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            fontWeight: FontWeight.w500,
          ),
        ),
        SizedBox(height: 1.h),
        LinearProgressIndicator(
          value: progress,
          backgroundColor:
              AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
          valueColor: AlwaysStoppedAnimation<Color>(
            AppTheme.lightTheme.colorScheme.tertiary,
          ),
          minHeight: 4,
        ),
        SizedBox(height: 0.5.h),
        Text(
          '$earned/$total',
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            fontSize: 10.sp,
          ),
        ),
      ],
    );
  }

  void _showAchievementDetails(
      BuildContext context, Map<String, dynamic> achievement) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          child: Container(
            padding: EdgeInsets.all(6.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 20.w,
                  height: 20.w,
                  decoration: BoxDecoration(
                    color: achievement['earned'] as bool
                        ? AppTheme.lightTheme.colorScheme.tertiary
                        : AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.3),
                    shape: BoxShape.circle,
                    boxShadow: achievement['earned'] as bool
                        ? [
                            BoxShadow(
                              color: AppTheme.lightTheme.colorScheme.tertiary
                                  .withValues(alpha: 0.4),
                              blurRadius: 12,
                              offset: const Offset(0, 4),
                            ),
                          ]
                        : null,
                  ),
                  child: Center(
                    child: CustomIconWidget(
                      iconName: achievement['icon'] as String,
                      size: 32,
                      color: achievement['earned'] as bool
                          ? Colors.white
                          : AppTheme.lightTheme.colorScheme.onSurfaceVariant
                              .withValues(alpha: 0.5),
                    ),
                  ),
                ),
                SizedBox(height: 3.h),
                Text(
                  achievement['title'] as String,
                  style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 1.h),
                Text(
                  achievement['description'] as String,
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                  textAlign: TextAlign.center,
                ),
                if (achievement['earned'] as bool &&
                    achievement['earnedDate'] != null) ...[
                  SizedBox(height: 2.h),
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.tertiary
                          .withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      'Earned on ${achievement['earnedDate']}',
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.tertiary,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
                SizedBox(height: 3.h),
                TextButton(
                  onPressed: () => Navigator.of(context).pop(),
                  child: Text('Close'),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
