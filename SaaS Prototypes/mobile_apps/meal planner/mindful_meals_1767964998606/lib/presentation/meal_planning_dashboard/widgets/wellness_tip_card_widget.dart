import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class WellnessTipCardWidget extends StatelessWidget {
  final Map<String, dynamic> tipData;

  const WellnessTipCardWidget({
    Key? key,
    required this.tipData,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Container(
      width: double.infinity,
      margin: EdgeInsets.symmetric(horizontal: 4.w),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            (isDarkMode ? AppTheme.secondaryDark : AppTheme.secondaryLight)
                .withValues(alpha: 0.1),
            (isDarkMode ? AppTheme.accentDark : AppTheme.accentLight)
                .withValues(alpha: 0.05),
          ],
        ),
        borderRadius: BorderRadius.circular(AppTheme.cardBorderRadius),
        border: Border.all(
          color: (isDarkMode ? AppTheme.secondaryDark : AppTheme.secondaryLight)
              .withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: EdgeInsets.all(2.w),
                decoration: BoxDecoration(
                  color: isDarkMode
                      ? AppTheme.secondaryDark
                      : AppTheme.secondaryLight,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: CustomIconWidget(
                  iconName: 'lightbulb_outline',
                  color: isDarkMode
                      ? AppTheme.onSecondaryDark
                      : AppTheme.onSecondaryLight,
                  size: 20,
                ),
              ),
              SizedBox(width: 3.w),
              Text(
                "This Week's Focus",
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      color: isDarkMode
                          ? AppTheme.secondaryDark
                          : AppTheme.secondaryLight,
                    ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          Text(
            tipData["title"] as String,
            style: Theme.of(context).textTheme.titleSmall,
          ),
          SizedBox(height: 1.h),
          Text(
            tipData["description"] as String,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: isDarkMode
                      ? AppTheme.textSecondaryDark
                      : AppTheme.textSecondaryLight,
                  height: 1.4,
                ),
          ),
          if (tipData["tips"] != null) ...[
            SizedBox(height: 2.h),
            ...(tipData["tips"] as List<String>)
                .map((tip) => Padding(
                      padding: EdgeInsets.only(bottom: 0.5.h),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            margin: EdgeInsets.only(top: 1.h, right: 2.w),
                            width: 1.w,
                            height: 1.w,
                            decoration: BoxDecoration(
                              color: isDarkMode
                                  ? AppTheme.secondaryDark
                                  : AppTheme.secondaryLight,
                              shape: BoxShape.circle,
                            ),
                          ),
                          Expanded(
                            child: Text(
                              tip,
                              style: Theme.of(context)
                                  .textTheme
                                  .bodySmall
                                  ?.copyWith(
                                    color: isDarkMode
                                        ? AppTheme.textSecondaryDark
                                        : AppTheme.textSecondaryLight,
                                  ),
                            ),
                          ),
                        ],
                      ),
                    ))
                .toList(),
          ],
        ],
      ),
    );
  }
}
