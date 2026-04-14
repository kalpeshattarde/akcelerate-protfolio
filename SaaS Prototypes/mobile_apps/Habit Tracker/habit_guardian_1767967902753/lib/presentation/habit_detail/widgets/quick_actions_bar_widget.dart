import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class QuickActionsBarWidget extends StatelessWidget {
  final bool isCompletedToday;
  final VoidCallback onCompleteToday;
  final VoidCallback onAddNote;
  final VoidCallback onShareProgress;
  final VoidCallback onArchiveHabit;

  const QuickActionsBarWidget({
    super.key,
    required this.isCompletedToday,
    required this.onCompleteToday,
    required this.onAddNote,
    required this.onShareProgress,
    required this.onArchiveHabit,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.white.withValues(alpha: 0.05)
                : Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                // Complete Today button (primary action)
                Expanded(
                  child: Material(
                    color: Colors.transparent,
                    child: InkWell(
                      onTap: () {
                        HapticFeedback.mediumImpact();
                        onCompleteToday();
                      },
                      borderRadius: BorderRadius.circular(12),
                      child: Container(
                        padding: EdgeInsets.symmetric(vertical: 2.5.h),
                        decoration: BoxDecoration(
                          color: isCompletedToday
                              ? (isDark
                                  ? AppTheme.successDark
                                  : AppTheme.successLight)
                              : (isDark
                                  ? AppTheme.secondaryDark
                                  : AppTheme.secondaryLight),
                          borderRadius: BorderRadius.circular(12),
                          boxShadow: [
                            BoxShadow(
                              color: (isCompletedToday
                                      ? (isDark
                                          ? AppTheme.successDark
                                          : AppTheme.successLight)
                                      : (isDark
                                          ? AppTheme.secondaryDark
                                          : AppTheme.secondaryLight))
                                  .withValues(alpha: 0.3),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconWidget(
                              iconName: isCompletedToday
                                  ? 'check_circle'
                                  : 'radio_button_unchecked',
                              color: isDark
                                  ? AppTheme.primaryDark
                                  : AppTheme.primaryLight,
                              size: 20,
                            ),
                            SizedBox(width: 2.w),
                            Flexible(
                              child: Text(
                                isCompletedToday
                                    ? 'Completed'
                                    : 'Complete Today',
                                style: theme.textTheme.titleMedium?.copyWith(
                                  color: isDark
                                      ? AppTheme.primaryDark
                                      : AppTheme.primaryLight,
                                  fontWeight: FontWeight.w600,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),

            SizedBox(height: 2.h),

            // Secondary actions grid
            Row(
              children: [
                // Add Note
                Expanded(
                  child: _buildSecondaryAction(
                    'Add Note',
                    'note_add',
                    onAddNote,
                    theme,
                    isDark,
                  ),
                ),

                SizedBox(width: 3.w),

                // Share Progress
                Expanded(
                  child: _buildSecondaryAction(
                    'Share',
                    'share',
                    onShareProgress,
                    theme,
                    isDark,
                  ),
                ),

                SizedBox(width: 3.w),

                // Archive Habit
                Expanded(
                  child: _buildSecondaryAction(
                    'Archive',
                    'archive',
                    onArchiveHabit,
                    theme,
                    isDark,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSecondaryAction(
    String label,
    String iconName,
    VoidCallback onTap,
    ThemeData theme,
    bool isDark,
  ) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {
          HapticFeedback.lightImpact();
          onTap();
        },
        borderRadius: BorderRadius.circular(12),
        child: Container(
          constraints: BoxConstraints(
            minHeight: 8.h,
          ),
          padding: EdgeInsets.symmetric(
            horizontal: 2.w,
            vertical: 1.5.h,
          ),
          decoration: BoxDecoration(
            color: (isDark ? AppTheme.borderDark : AppTheme.borderLight)
                .withValues(alpha: 0.3),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: (isDark ? AppTheme.borderDark : AppTheme.borderLight)
                  .withValues(alpha: 0.5),
              width: 1,
            ),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomIconWidget(
                iconName: iconName,
                color: isDark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                size: 18,
              ),
              SizedBox(height: 0.8.h),
              Flexible(
                child: Text(
                  label,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                    fontWeight: FontWeight.w500,
                    fontSize: 10.sp,
                  ),
                  maxLines: 2,
                  textAlign: TextAlign.center,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
