import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

/// Forgot password link with sophisticated serif typography
class ForgotPasswordWidget extends StatelessWidget {
  final VoidCallback onTap;

  const ForgotPasswordWidget({
    super.key,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Align(
      alignment: Alignment.centerRight,
      child: GestureDetector(
        onTap: onTap,
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 1.h),
          child: Text(
            'Forgot Password?',
            style: GoogleFonts.playfairDisplay(
              fontSize: 13.sp,
              fontWeight: FontWeight.w400,
              color: isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
              decoration: TextDecoration.underline,
              decorationColor:
                  isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
            ),
          ),
        ),
      ),
    );
  }
}
