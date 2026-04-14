import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SubscriptionCardWidget extends StatelessWidget {
  final String planName;
  final String renewalDate;
  final bool isActive;
  final VoidCallback onManageSubscription;
  final VoidCallback onUpgrade;

  const SubscriptionCardWidget({
    Key? key,
    required this.planName,
    required this.renewalDate,
    required this.isActive,
    required this.onManageSubscription,
    required this.onUpgrade,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: isActive
              ? [
                  AppTheme.lightTheme.colorScheme.secondary,
                  AppTheme.lightTheme.colorScheme.primary,
                ]
              : [
                  AppTheme.lightTheme.colorScheme.surface,
                  AppTheme.lightTheme.colorScheme.surface,
                ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isActive
              ? Colors.transparent
              : AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: isActive
                      ? AppTheme.lightTheme.colorScheme.onPrimary
                          .withValues(alpha: 0.2)
                      : AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    CustomIconWidget(
                      iconName: isActive ? 'star' : 'star_border',
                      color: isActive
                          ? AppTheme.lightTheme.colorScheme.onPrimary
                          : AppTheme.lightTheme.colorScheme.secondary,
                      size: 4.w,
                    ),
                    SizedBox(width: 2.w),
                    Text(
                      planName,
                      style: Theme.of(context).textTheme.labelMedium?.copyWith(
                            color: isActive
                                ? AppTheme.lightTheme.colorScheme.onPrimary
                                : AppTheme.lightTheme.colorScheme.secondary,
                            fontWeight: FontWeight.w600,
                          ),
                    ),
                  ],
                ),
              ),
              const Spacer(),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                decoration: BoxDecoration(
                  color: isActive
                      ? AppTheme.successColor.withValues(alpha: 0.2)
                      : AppTheme.warningColor.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  isActive ? 'Active' : 'Inactive',
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: isActive
                            ? AppTheme.successColor
                            : AppTheme.warningColor,
                        fontWeight: FontWeight.w500,
                      ),
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          Text(
            isActive ? 'Renews on $renewalDate' : 'Expired on $renewalDate',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: isActive
                      ? AppTheme.lightTheme.colorScheme.onPrimary
                          .withValues(alpha: 0.8)
                      : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                ),
          ),
          SizedBox(height: 3.h),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: onManageSubscription,
                  style: OutlinedButton.styleFrom(
                    foregroundColor: isActive
                        ? AppTheme.lightTheme.colorScheme.onPrimary
                        : AppTheme.lightTheme.colorScheme.secondary,
                    side: BorderSide(
                      color: isActive
                          ? AppTheme.lightTheme.colorScheme.onPrimary
                              .withValues(alpha: 0.5)
                          : AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.5),
                    ),
                    padding: EdgeInsets.symmetric(vertical: 2.h),
                  ),
                  child: Text('Manage'),
                ),
              ),
              if (!isActive) ...[
                SizedBox(width: 3.w),
                Expanded(
                  child: ElevatedButton(
                    onPressed: onUpgrade,
                    style: ElevatedButton.styleFrom(
                      padding: EdgeInsets.symmetric(vertical: 2.h),
                    ),
                    child: Text('Upgrade'),
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }
}
