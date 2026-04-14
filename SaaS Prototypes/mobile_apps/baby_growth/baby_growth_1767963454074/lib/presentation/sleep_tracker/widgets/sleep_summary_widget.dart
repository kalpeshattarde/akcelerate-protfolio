import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SleepSummaryWidget extends StatelessWidget {
  final Duration totalSleep;
  final Duration daySleep;
  final Duration nightSleep;

  const SleepSummaryWidget({
    Key? key,
    required this.totalSleep,
    required this.daySleep,
    required this.nightSleep,
  }) : super(key: key);

  String _formatDuration(Duration duration) {
    int hours = duration.inHours;
    int minutes = duration.inMinutes.remainder(60);
    return '${hours}h ${minutes}m';
  }

  double _getProgressValue(Duration duration, Duration total) {
    if (total.inMinutes == 0) return 0.0;
    return duration.inMinutes / total.inMinutes;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(4.w),
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Today\'s Sleep',
                style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              Text(
                DateTime.now().toString().split(' ')[0],
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
          SizedBox(height: 3.h),
          Center(
            child: Column(
              children: [
                Text(
                  _formatDuration(totalSleep),
                  style: AppTheme.lightTheme.textTheme.headlineLarge?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.primary,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                Text(
                  'Total Sleep',
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 4.h),
          Row(
            children: [
              Expanded(
                child: _buildSleepTypeCard(
                  'Day Sleep',
                  daySleep,
                  'wb_sunny',
                  AppTheme.lightTheme.colorScheme.secondary,
                  _getProgressValue(daySleep, totalSleep),
                ),
              ),
              SizedBox(width: 4.w),
              Expanded(
                child: _buildSleepTypeCard(
                  'Night Sleep',
                  nightSleep,
                  'nights_stay',
                  AppTheme.lightTheme.colorScheme.primary,
                  _getProgressValue(nightSleep, totalSleep),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSleepTypeCard(
    String title,
    Duration duration,
    String iconName,
    Color color,
    double progress,
  ) {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(3.w),
        border: Border.all(
          color: color.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        children: [
          CustomIconWidget(
            iconName: iconName,
            color: color,
            size: 6.w,
          ),
          SizedBox(height: 1.h),
          Text(
            title,
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: color,
              fontWeight: FontWeight.w500,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 0.5.h),
          Text(
            _formatDuration(duration),
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: color,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          LinearProgressIndicator(
            value: progress,
            backgroundColor: color.withValues(alpha: 0.2),
            valueColor: AlwaysStoppedAnimation<Color>(color),
            minHeight: 0.5.h,
          ),
        ],
      ),
    );
  }
}
