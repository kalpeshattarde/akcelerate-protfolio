import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

/// App logo widget with sanctuary-like design and terracotta underline
class AppLogoWidget extends StatelessWidget {
  const AppLogoWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // App Logo with breathing animation
        Container(
          width: 20.w,
          height: 20.w,
          decoration: BoxDecoration(
            color: isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: isDark
                    ? Colors.white.withValues(alpha: 0.1)
                    : Colors.black.withValues(alpha: 0.1),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Center(
            child: CustomIconWidget(
              iconName: 'self_improvement',
              color: isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
              size: 8.w,
            ),
          ),
        ),

        SizedBox(height: 2.h),

        // App Name with elegant typography
        Text(
          'Habit Guardian',
          style: GoogleFonts.inter(
            fontSize: 18.sp,
            fontWeight: FontWeight.w600,
            color:
                isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
            letterSpacing: 0.5,
          ),
        ),

        SizedBox(height: 0.5.h),

        // Terracotta underline for brand recognition
        Container(
          width: 15.w,
          height: 0.3.h,
          decoration: BoxDecoration(
            color: isDark ? AppTheme.accentDark : AppTheme.accentLight,
            borderRadius: BorderRadius.circular(2),
          ),
        ),
      ],
    );
  }
}
