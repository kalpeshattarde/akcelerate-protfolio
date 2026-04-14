import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

/// Interactive habit preview card with terracotta progress indicators
class HabitPreviewCardWidget extends StatelessWidget {
  final String habitName;
  final String habitIcon;
  final double progress;
  final int streak;

  const HabitPreviewCardWidget({
    super.key,
    required this.habitName,
    required this.habitIcon,
    required this.progress,
    required this.streak,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      width: 70.w,
      padding: EdgeInsets.all(4.w),
      margin: EdgeInsets.symmetric(horizontal: 2.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(4.w),
        boxShadow: [
          BoxShadow(
            color:
                (isDark ? Colors.white : Colors.black).withValues(alpha: 0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Habit header with icon and name
          Row(
            children: [
              Container(
                padding: EdgeInsets.all(2.w),
                decoration: BoxDecoration(
                  color: (isDark
                          ? AppTheme.secondaryDark
                          : AppTheme.secondaryLight)
                      .withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(2.w),
                ),
                child: CustomIconWidget(
                  iconName: habitIcon,
                  color:
                      isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
                  size: 5.w,
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Text(
                  habitName,
                  style: GoogleFonts.inter(
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w500,
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                    letterSpacing: 0.1,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),

          SizedBox(height: 3.h),

          // Progress indicator with terracotta accent
          Row(
            children: [
              Expanded(
                child: Container(
                  height: 1.h,
                  decoration: BoxDecoration(
                    color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
                    borderRadius: BorderRadius.circular(0.5.h),
                  ),
                  child: FractionallySizedBox(
                    alignment: Alignment.centerLeft,
                    widthFactor: progress,
                    child: Container(
                      decoration: BoxDecoration(
                        color:
                            isDark ? AppTheme.accentDark : AppTheme.accentLight,
                        borderRadius: BorderRadius.circular(0.5.h),
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(width: 3.w),
              Text(
                '${(progress * 100).toInt()}%',
                style: GoogleFonts.inter(
                  fontSize: 12.sp,
                  fontWeight: FontWeight.w500,
                  color: isDark ? AppTheme.accentDark : AppTheme.accentLight,
                  letterSpacing: 0.4,
                ),
              ),
            ],
          ),

          SizedBox(height: 2.h),

          // Streak information
          Row(
            children: [
              CustomIconWidget(
                iconName: 'local_fire_department',
                color: isDark ? AppTheme.premiumDark : AppTheme.premiumLight,
                size: 4.w,
              ),
              SizedBox(width: 2.w),
              Text(
                '$streak day streak',
                style: GoogleFonts.inter(
                  fontSize: 12.sp,
                  fontWeight: FontWeight.w400,
                  color: isDark
                      ? AppTheme.textSecondaryDark
                      : AppTheme.textSecondaryLight,
                  letterSpacing: 0.25,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
