import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class QuickActionsWidget extends StatelessWidget {
  final VoidCallback onFeedTap;
  final VoidCallback onSleepTap;
  final VoidCallback onDiaperTap;
  final VoidCallback onWeightTap;

  const QuickActionsWidget({
    Key? key,
    required this.onFeedTap,
    required this.onSleepTap,
    required this.onDiaperTap,
    required this.onWeightTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _buildQuickActionButton(
            context,
            'Feed',
            'restaurant',
            AppTheme.lightTheme.colorScheme.secondary,
            onFeedTap,
          ),
          _buildQuickActionButton(
            context,
            'Sleep',
            'bedtime',
            AppTheme.lightTheme.primaryColor,
            onSleepTap,
          ),
          _buildQuickActionButton(
            context,
            'Diaper',
            'baby_changing_station',
            AppTheme.getSuccessColor(true),
            onDiaperTap,
          ),
          _buildQuickActionButton(
            context,
            'Weight',
            'monitor_weight',
            AppTheme.getWarningColor(true),
            onWeightTap,
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActionButton(
    BuildContext context,
    String label,
    String iconName,
    Color color,
    VoidCallback onTap,
  ) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 18.w,
        height: 18.w,
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: color.withValues(alpha: 0.3),
            width: 1,
          ),
          boxShadow: [
            BoxShadow(
              color: color.withValues(alpha: 0.2),
              blurRadius: 8,
              offset: Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: iconName,
              color: color,
              size: 7.w,
            ),
            SizedBox(height: 1.h),
            Text(
              label,
              style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                fontWeight: FontWeight.w600,
                color: color,
              ),
              textAlign: TextAlign.center,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}
