import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class GreetingHeaderWidget extends StatelessWidget {
  final String userName;
  final String greeting;

  const GreetingHeaderWidget({
    Key? key,
    required this.userName,
    required this.greeting,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  greeting,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: isDarkMode
                            ? AppTheme.textSecondaryDark
                            : AppTheme.textSecondaryLight,
                      ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  userName,
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          GestureDetector(
            onTap: () => Navigator.pushNamed(context, '/user-profile'),
            child: Container(
              width: 12.w,
              height: 6.h,
              decoration: BoxDecoration(
                color:
                    isDarkMode ? AppTheme.primaryDark : AppTheme.primaryLight,
                shape: BoxShape.circle,
                boxShadow: isDarkMode
                    ? AppTheme.darkWellnessShadow
                    : AppTheme.lightWellnessShadow,
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: 'person',
                  color: isDarkMode
                      ? AppTheme.onPrimaryDark
                      : AppTheme.onPrimaryLight,
                  size: 24,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}