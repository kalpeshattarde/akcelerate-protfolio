import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class PatternRecognitionWidget extends StatelessWidget {
  final double averageDuration;
  final double averageInterval;
  final int contractionCount;

  const PatternRecognitionWidget({
    super.key,
    required this.averageDuration,
    required this.averageInterval,
    required this.contractionCount,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
            theme.colorScheme.secondaryContainer.withValues(alpha: 0.2),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: theme.colorScheme.primary.withValues(alpha: 0.2),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'analytics_outlined',
                color: theme.colorScheme.primary,
                size: 24,
              ),
              SizedBox(width: 2.w),
              Text(
                'Pattern Recognition',
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          Row(
            children: [
              Expanded(
                child: _buildStatCard(
                  theme,
                  'Avg Duration',
                  '${averageDuration.toStringAsFixed(1)} min',
                  Icons.timer_outlined,
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: _buildStatCard(
                  theme,
                  'Avg Interval',
                  averageInterval > 0
                      ? '${averageInterval.toStringAsFixed(1)} min'
                      : 'N/A',
                  Icons.schedule_outlined,
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          _buildStatCard(
            theme,
            'Total Contractions',
            '$contractionCount recorded',
            Icons.format_list_numbered_outlined,
            fullWidth: true,
          ),
          SizedBox(height: 2.h),
          _buildLaborProgressIndicator(theme),
        ],
      ),
    );
  }

  Widget _buildStatCard(
    ThemeData theme,
    String label,
    String value,
    IconData icon, {
    bool fullWidth = false,
  }) {
    return Container(
      width: fullWidth ? double.infinity : null,
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: icon
                    .toString()
                    .split('.')
                    .last
                    .replaceAll('IconData(U+', '')
                    .replaceAll(')', ''),
                color: theme.colorScheme.primary,
                size: 20,
              ),
              SizedBox(width: 2.w),
              Expanded(
                child: Text(
                  label,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 1.h),
          Text(
            value,
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
              color: theme.colorScheme.primary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLaborProgressIndicator(ThemeData theme) {
    String progressText;
    double progressValue;
    Color progressColor;

    if (averageInterval <= 0) {
      progressText = 'Keep tracking to identify patterns';
      progressValue = 0.2;
      progressColor = theme.colorScheme.onSurfaceVariant;
    } else if (averageInterval > 10) {
      progressText = 'Early labor - contractions are irregular';
      progressValue = 0.3;
      progressColor = Colors.blue;
    } else if (averageInterval > 5) {
      progressText = 'Active labor may be approaching';
      progressValue = 0.6;
      progressColor = Colors.orange;
    } else {
      progressText = 'Active labor pattern detected';
      progressValue = 0.9;
      progressColor = theme.colorScheme.error;
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Labor Progress',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            CustomIconWidget(
              iconName: 'info_outline',
              color: theme.colorScheme.onSurfaceVariant,
              size: 20,
            ),
          ],
        ),
        SizedBox(height: 1.h),
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: LinearProgressIndicator(
            value: progressValue,
            minHeight: 12,
            backgroundColor: theme.colorScheme.outline.withValues(alpha: 0.2),
            valueColor: AlwaysStoppedAnimation<Color>(progressColor),
          ),
        ),
        SizedBox(height: 1.h),
        Text(
          progressText,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: progressColor,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}
