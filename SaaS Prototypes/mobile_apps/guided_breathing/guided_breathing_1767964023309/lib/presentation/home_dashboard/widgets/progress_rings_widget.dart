import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class ProgressRingsWidget extends StatelessWidget {
  final double meditationProgress;
  final double breathingProgress;
  final double sleepProgress;

  const ProgressRingsWidget({
    Key? key,
    required this.meditationProgress,
    required this.breathingProgress,
    required this.sleepProgress,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Weekly Progress',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface,
              fontWeight: FontWeight.w600,
              fontSize: 16.sp,
            ),
          ),
          SizedBox(height: 2.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildProgressRing(
                title: 'Meditation',
                subtitle: '${(meditationProgress * 100).toInt()}%',
                progress: meditationProgress,
                color: AppTheme.lightTheme.colorScheme.secondary,
              ),
              _buildProgressRing(
                title: 'Breathing',
                subtitle: '${(breathingProgress * 100).toInt()}%',
                progress: breathingProgress,
                color: AppTheme.particleColor,
              ),
              _buildProgressRing(
                title: 'Sleep',
                subtitle: '${(sleepProgress * 100).toInt()}%',
                progress: sleepProgress,
                color: AppTheme.accentColor,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildProgressRing({
    required String title,
    required String subtitle,
    required double progress,
    required Color color,
  }) {
    return Column(
      children: [
        SizedBox(
          width: 20.w,
          height: 20.w,
          child: Stack(
            alignment: Alignment.center,
            children: [
              SizedBox(
                width: 20.w,
                height: 20.w,
                child: CircularProgressIndicator(
                  value: progress,
                  strokeWidth: 6,
                  backgroundColor: AppTheme
                      .lightTheme.colorScheme.onSurfaceVariant
                      .withValues(alpha: 0.2),
                  valueColor: AlwaysStoppedAnimation<Color>(color),
                ),
              ),
              Text(
                subtitle,
                style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  fontWeight: FontWeight.w600,
                  fontSize: 12.sp,
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: 1.h),
        Text(
          title,
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            fontSize: 10.sp,
          ),
        ),
      ],
    );
  }
}
