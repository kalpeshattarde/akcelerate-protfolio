import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class TodaySummaryWidget extends StatelessWidget {
  final Map<String, dynamic> todayData;

  const TodaySummaryWidget({
    Key? key,
    required this.todayData,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final feedingCount = todayData['feedingCount'] as int;
    final sleepHours = todayData['sleepHours'] as double;
    final diaperChanges = todayData['diaperChanges'] as int;

    return Container(
      width: double.infinity,
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow,
            blurRadius: 8,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'today',
                color: AppTheme.lightTheme.primaryColor,
                size: 6.w,
              ),
              SizedBox(width: 2.w),
              Text(
                "Today's Summary",
                style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                ),
              ),
            ],
          ),
          SizedBox(height: 3.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Expanded(
                child: _buildSummaryItem(
                  context,
                  'Feeding',
                  feedingCount.toString(),
                  'times',
                  feedingCount / 8.0,
                  AppTheme.lightTheme.colorScheme.secondary,
                  'restaurant',
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: _buildSummaryItem(
                  context,
                  'Sleep',
                  sleepHours.toStringAsFixed(1),
                  'hours',
                  sleepHours / 12.0,
                  AppTheme.lightTheme.primaryColor,
                  'bedtime',
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: _buildSummaryItem(
                  context,
                  'Diapers',
                  diaperChanges.toString(),
                  'changes',
                  diaperChanges / 10.0,
                  AppTheme.getSuccessColor(true),
                  'baby_changing_station',
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryItem(
    BuildContext context,
    String title,
    String value,
    String unit,
    double progress,
    Color color,
    String iconName,
  ) {
    return Column(
      children: [
        CircularPercentIndicator(
          radius: 8.w,
          lineWidth: 1.5.w,
          percent: progress > 1.0 ? 1.0 : progress,
          center: CustomIconWidget(
            iconName: iconName,
            color: color,
            size: 5.w,
          ),
          progressColor: color,
          backgroundColor: color.withValues(alpha: 0.2),
          circularStrokeCap: CircularStrokeCap.round,
        ),
        SizedBox(height: 1.h),
        Text(
          value,
          style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w700,
            color: color,
          ),
        ),
        Text(
          unit,
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          ),
          overflow: TextOverflow.ellipsis,
        ),
        SizedBox(height: 0.5.h),
        Text(
          title,
          style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
            fontWeight: FontWeight.w500,
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
          overflow: TextOverflow.ellipsis,
        ),
      ],
    );
  }
}
