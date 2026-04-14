import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

/// Refined greeting header with elegant typography and profile icon
class GreetingHeaderWidget extends StatelessWidget {
  final VoidCallback onProfileTap;

  const GreetingHeaderWidget({
    super.key,
    required this.onProfileTap,
  });

  String _getGreeting() {
    final hour = DateTime.now().hour;
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  String _getUserName() {
    // Mock user name - in real app this would come from user data
    return 'Sarah';
  }

  @override
  Widget build(BuildContext context) {
    // Check if there's a back button that would be shown
    final hasLeading = ModalRoute.of(context)?.canPop ?? false;

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppTheme.primaryLight,
        boxShadow: [
          BoxShadow(
            color: AppTheme.shadowLight.withAlpha(20),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Padding(
        padding: EdgeInsets.fromLTRB(
            4.w, // Consistent left padding
            2.5.h,
            4.w, // Balanced right padding
            3.h),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Add back button if navigation can pop - always positioned at the left
            if (hasLeading) ...[
              GestureDetector(
                onTap: () => Navigator.of(context).pop(),
                child: Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: AppTheme.secondaryLight.withAlpha(26),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    Icons.arrow_back_ios_new_rounded,
                    size: 18,
                    color: AppTheme.secondaryLight,
                  ),
                ),
              ),
              SizedBox(width: 3.w), // Spacing after back button
            ],

            // Left side: Stacked greeting typography with proper constraints
            Expanded(
              child: Container(
                padding: EdgeInsets.only(
                  left: hasLeading
                      ? 0
                      : 2.w, // Extra padding only when no back button
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Greeting text in soft gray/muted green
                    Text(
                      _getGreeting(),
                      style: GoogleFonts.inter(
                        fontSize: 16,
                        fontWeight: FontWeight.w400,
                        color: AppTheme.textSecondaryLight,
                        letterSpacing: 0.3,
                        height: 1.25,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),

                    SizedBox(height: 0.5.h),

                    // User name in larger, bold, deep green
                    Text(
                      _getUserName(),
                      style: GoogleFonts.inter(
                        fontSize: 24,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.secondaryLight,
                        letterSpacing: -0.5,
                        height: 1.2,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
            ),

            // Breathing space between text and icon
            SizedBox(width: 3.w),

            // Right side: Rounded profile icon in warm-toned circle
            GestureDetector(
              onTap: onProfileTap,
              child: Container(
                width: 56,
                height: 56,
                decoration: BoxDecoration(
                  color: AppTheme.accentLight.withAlpha(31),
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: AppTheme.accentLight.withAlpha(51),
                    width: 1,
                  ),
                ),
                child: Center(
                  child: Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      color: AppTheme.accentLight,
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Icon(
                      Icons.person_outline_rounded,
                      size: 16,
                      color: AppTheme.primaryLight,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
