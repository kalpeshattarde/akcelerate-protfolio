import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SubscriptionCardWidget extends StatelessWidget {
  final Map<String, dynamic> subscriptionData;
  final VoidCallback onUpgrade;

  const SubscriptionCardWidget({
    Key? key,
    required this.subscriptionData,
    required this.onUpgrade,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool isPremium = subscriptionData["isPremium"] as bool;
    final String planName = subscriptionData["planName"] as String;
    final String? expiryDate = subscriptionData["expiryDate"] as String?;
    final List<String> features =
        (subscriptionData["features"] as List).cast<String>();

    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(bottom: 2.h),
      decoration: BoxDecoration(
        gradient: isPremium
            ? LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  AppTheme.lightTheme.colorScheme.tertiary,
                  AppTheme.lightTheme.colorScheme.tertiary
                      .withValues(alpha: 0.8),
                ],
              )
            : null,
        color: isPremium ? null : AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(4.w),
        border: isPremium
            ? null
            : Border.all(
                color: AppTheme.lightTheme.dividerColor,
                width: 1,
              ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 12,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Padding(
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  decoration: BoxDecoration(
                    color: isPremium
                        ? Colors.white.withValues(alpha: 0.2)
                        : AppTheme.lightTheme.primaryColor
                            .withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(2.w),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      CustomIconWidget(
                        iconName:
                            isPremium ? 'workspace_premium' : 'account_circle',
                        color: isPremium
                            ? Colors.white
                            : AppTheme.lightTheme.primaryColor,
                        size: 4.w,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        planName,
                        style:
                            AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                          color: isPremium
                              ? Colors.white
                              : AppTheme.lightTheme.primaryColor,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
                Spacer(),
                if (isPremium && expiryDate != null)
                  Text(
                    "Expires: $expiryDate",
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: isPremium
                          ? Colors.white.withValues(alpha: 0.8)
                          : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
              ],
            ),
            SizedBox(height: 2.h),
            Text(
              isPremium ? "Premium Features Active" : "Upgrade to Premium",
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                color: isPremium
                    ? Colors.white
                    : AppTheme.lightTheme.colorScheme.onSurface,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 1.h),
            ...features
                .take(3)
                .map((feature) => Padding(
                      padding: EdgeInsets.only(bottom: 0.5.h),
                      child: Row(
                        children: [
                          CustomIconWidget(
                            iconName: 'check_circle',
                            color: isPremium
                                ? Colors.white.withValues(alpha: 0.9)
                                : AppTheme.lightTheme.colorScheme.primary,
                            size: 4.w,
                          ),
                          SizedBox(width: 2.w),
                          Expanded(
                            child: Text(
                              feature,
                              style: AppTheme.lightTheme.textTheme.bodyMedium
                                  ?.copyWith(
                                color: isPremium
                                    ? Colors.white.withValues(alpha: 0.9)
                                    : AppTheme.lightTheme.colorScheme.onSurface,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                    ))
                .toList(),
            if (!isPremium) ...[
              SizedBox(height: 2.h),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: onUpgrade,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.lightTheme.primaryColor,
                    foregroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(vertical: 1.5.h),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(3.w),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CustomIconWidget(
                        iconName: 'upgrade',
                        color: Colors.white,
                        size: 4.w,
                      ),
                      SizedBox(width: 2.w),
                      Text(
                        "Upgrade Now",
                        style:
                            AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
