import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class RecipeCardWidget extends StatelessWidget {
  final Map<String, dynamic> recipe;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;

  const RecipeCardWidget({
    Key? key,
    required this.recipe,
    this.onTap,
    this.onLongPress,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      onLongPress: onLongPress,
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
        decoration: BoxDecoration(
          color: isDark ? AppTheme.cardDark : AppTheme.cardLight,
          borderRadius: BorderRadius.circular(AppTheme.cardBorderRadius),
          boxShadow:
              isDark ? AppTheme.darkWellnessShadow : AppTheme.lightWellnessShadow,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Hero Image
            ClipRRect(
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(AppTheme.cardBorderRadius),
                topRight: Radius.circular(AppTheme.cardBorderRadius),
              ),
              child: Stack(
                children: [
                  CustomImageWidget(
                    imageUrl: recipe['image'] as String,
                    width: double.infinity,
                    height: 25.h,
                    fit: BoxFit.cover,
                    semanticLabel: recipe['semanticLabel'] as String,
                  ),
                  // Mindful eating badge
                  if (recipe['isMindful'] == true)
                    Positioned(
                      top: 2.h,
                      right: 3.w,
                      child: Container(
                        padding: EdgeInsets.symmetric(
                            horizontal: 2.w, vertical: 0.5.h),
                        decoration: BoxDecoration(
                          color: isDark
                              ? AppTheme.primaryDark
                              : AppTheme.primaryLight,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            CustomIconWidget(
                              iconName: 'spa',
                              color: isDark
                                  ? AppTheme.onPrimaryDark
                                  : AppTheme.onPrimaryLight,
                              size: 12,
                            ),
                            SizedBox(width: 1.w),
                            Text(
                              'Mindful',
                              style: Theme.of(context)
                                  .textTheme
                                  .labelSmall
                                  ?.copyWith(
                                    color: isDark
                                        ? AppTheme.onPrimaryDark
                                        : AppTheme.onPrimaryLight,
                                    fontWeight: FontWeight.w500,
                                  ),
                            ),
                          ],
                        ),
                      ),
                    ),
                ],
              ),
            ),

            // Content
            Padding(
              padding: EdgeInsets.all(4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Recipe Title
                  Text(
                    recipe['title'] as String,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),

                  SizedBox(height: 1.h),

                  // Recipe Details Row
                  Row(
                    children: [
                      // Preparation Time
                      Expanded(
                        child: Row(
                          children: [
                            CustomIconWidget(
                              iconName: 'access_time',
                              color: isDark
                                  ? AppTheme.textSecondaryDark
                                  : AppTheme.textSecondaryLight,
                              size: 16,
                            ),
                            SizedBox(width: 1.w),
                            Text(
                              recipe['prepTime'] as String,
                              style: Theme.of(context)
                                  .textTheme
                                  .bodySmall
                                  ?.copyWith(
                                    color: isDark
                                        ? AppTheme.textSecondaryDark
                                        : AppTheme.textSecondaryLight,
                                  ),
                            ),
                          ],
                        ),
                      ),

                      // Difficulty Level
                      Row(
                        children: [
                          CustomIconWidget(
                            iconName: _getDifficultyIcon(
                                recipe['difficulty'] as String),
                            color: _getDifficultyColor(
                                recipe['difficulty'] as String, isDark),
                            size: 16,
                          ),
                          SizedBox(width: 1.w),
                          Text(
                            recipe['difficulty'] as String,
                            style: Theme.of(context)
                                .textTheme
                                .bodySmall
                                ?.copyWith(
                                  color: _getDifficultyColor(
                                      recipe['difficulty'] as String, isDark),
                                  fontWeight: FontWeight.w500,
                                ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _getDifficultyIcon(String difficulty) {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'sentiment_very_satisfied';
      case 'medium':
        return 'sentiment_satisfied';
      case 'hard':
        return 'sentiment_neutral';
      default:
        return 'help_outline';
    }
  }

  Color _getDifficultyColor(String difficulty, bool isDark) {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return isDark ? AppTheme.successDark : AppTheme.successLight;
      case 'medium':
        return isDark ? AppTheme.warningDark : AppTheme.warningLight;
      case 'hard':
        return isDark ? AppTheme.errorDark : AppTheme.errorLight;
      default:
        return isDark
            ? AppTheme.textSecondaryDark
            : AppTheme.textSecondaryLight;
    }
  }
}