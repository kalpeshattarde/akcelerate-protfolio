import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

/// Create account link at bottom for easy discovery
class CreateAccountWidget extends StatelessWidget {
  final VoidCallback onTap;

  const CreateAccountWidget({
    super.key,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: Padding(
        padding: EdgeInsets.symmetric(vertical: 2.h),
        child: RichText(
          textAlign: TextAlign.center,
          text: TextSpan(
            children: [
              TextSpan(
                text: 'New to sanctuary? ',
                style: GoogleFonts.inter(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w400,
                  color: isDark
                      ? AppTheme.textSecondaryDark
                      : AppTheme.textSecondaryLight,
                ),
              ),
              TextSpan(
                text: 'Create Account',
                style: GoogleFonts.inter(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w500,
                  color:
                      isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
                  decoration: TextDecoration.underline,
                  decorationColor:
                      isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
