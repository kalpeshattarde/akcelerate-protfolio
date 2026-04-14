import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class EstimatedTimelineWidget extends StatelessWidget {
  const EstimatedTimelineWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> timelineSteps = [
      {
        'title': 'Pickup',
        'time': 'Today, 10:00 AM - 12:00 PM',
        'status': 'pending',
        'icon': 'local_shipping',
      },
      {
        'title': 'Processing',
        'time': 'Tomorrow, 2:00 PM',
        'status': 'pending',
        'icon': 'settings',
      },
      {
        'title': 'Delivery',
        'time': 'Day after, 6:00 PM - 8:00 PM',
        'status': 'pending',
        'icon': 'home',
      },
    ];

    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Estimated Timeline',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                ),
          ),
          SizedBox(height: 3.h),
          ...timelineSteps.asMap().entries.map((entry) {
            final index = entry.key;
            final step = entry.value;
            final isLast = index == timelineSteps.length - 1;

            return _buildTimelineStep(
              context,
              step['title'] as String,
              step['time'] as String,
              step['icon'] as String,
              step['status'] as String,
              isLast,
            );
          }).toList(),
        ],
      ),
    );
  }

  Widget _buildTimelineStep(
    BuildContext context,
    String title,
    String time,
    String iconName,
    String status,
    bool isLast,
  ) {
    final isActive = status == 'active';
    final isCompleted = status == 'completed';
    final isPending = status == 'pending';

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Container(
              width: 10.w,
              height: 10.w,
              decoration: BoxDecoration(
                color: isCompleted
                    ? AppTheme.lightTheme.colorScheme.tertiary
                    : isActive
                        ? AppTheme.lightTheme.colorScheme.primary
                        : AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.3),
                shape: BoxShape.circle,
                border: Border.all(
                  color: isCompleted || isActive
                      ? Colors.transparent
                      : AppTheme.lightTheme.colorScheme.outline,
                  width: 2,
                ),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: isCompleted ? 'check' : iconName,
                  color: isCompleted || isActive
                      ? Colors.white
                      : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  size: 5.w,
                ),
              ),
            ),
            if (!isLast)
              Container(
                width: 2,
                height: 6.h,
                color: AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.3),
                margin: EdgeInsets.symmetric(vertical: 1.h),
              ),
          ],
        ),
        SizedBox(width: 4.w),
        Expanded(
          child: Padding(
            padding: EdgeInsets.only(bottom: isLast ? 0 : 2.h),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: isActive || isCompleted
                            ? AppTheme.lightTheme.colorScheme.onSurface
                            : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  time,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
