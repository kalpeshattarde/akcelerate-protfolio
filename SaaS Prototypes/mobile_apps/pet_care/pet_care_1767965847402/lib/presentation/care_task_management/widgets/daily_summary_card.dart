import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class DailySummaryCard extends StatelessWidget {
  final DateTime currentDate;
  final int totalTasks;
  final int completedTasks;
  final int upcomingTasks;
  final int overdueTasks;
  final List<Map<String, dynamic>> streakData;

  const DailySummaryCard({
    super.key,
    required this.currentDate,
    required this.totalTasks,
    required this.completedTasks,
    required this.upcomingTasks,
    required this.overdueTasks,
    required this.streakData,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final completionRate = totalTasks > 0 ? (completedTasks / totalTasks) : 0.0;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: theme.brightness == Brightness.light
                ? const Color(0x0A000000)
                : const Color(0x1A000000),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildHeader(theme),
          SizedBox(height: 2.h),
          _buildProgressSection(theme, completionRate),
          SizedBox(height: 2.h),
          _buildStatsRow(theme),
          if (streakData.isNotEmpty) ...[
            SizedBox(height: 2.h),
            _buildStreakSection(theme),
          ],
        ],
      ),
    );
  }

  Widget _buildHeader(ThemeData theme) {
    final dateString = _formatDate(currentDate);

    return Row(
      children: [
        Container(
          width: 12.w,
          height: 6.h,
          decoration: BoxDecoration(
            color: theme.brightness == Brightness.light
                ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
                : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Center(
            child: CustomIconWidget(
              iconName: 'today',
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF2B5F75)
                  : const Color(0xFF4A8BA3),
              size: 24,
            ),
          ),
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Today\'s Care Tasks',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
                overflow: TextOverflow.ellipsis,
              ),
              SizedBox(height: 0.5.h),
              Text(
                dateString,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                ),
              ),
            ],
          ),
        ),
        _buildCompletionBadge(theme),
      ],
    );
  }

  Widget _buildCompletionBadge(ThemeData theme) {
    final completionRate = totalTasks > 0 ? (completedTasks / totalTasks) : 0.0;
    final percentage = (completionRate * 100).round();

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: completionRate == 1.0
            ? const Color(0xFF28A745).withValues(alpha: 0.1)
            : completionRate >= 0.7
                ? theme.brightness == Brightness.light
                    ? const Color(0xFF7BA05B).withValues(alpha: 0.1)
                    : const Color(0xFF9BC474).withValues(alpha: 0.2)
                : theme.brightness == Brightness.light
                    ? const Color(0xFFE8A547).withValues(alpha: 0.1)
                    : const Color(0xFFEDB865).withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        '$percentage%',
        style: theme.textTheme.labelMedium?.copyWith(
          color: completionRate == 1.0
              ? const Color(0xFF28A745)
              : completionRate >= 0.7
                  ? theme.brightness == Brightness.light
                      ? const Color(0xFF7BA05B)
                      : const Color(0xFF9BC474)
                  : theme.brightness == Brightness.light
                      ? const Color(0xFFE8A547)
                      : const Color(0xFFEDB865),
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  Widget _buildProgressSection(ThemeData theme, double completionRate) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                'Daily Progress',
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            Text(
              '$completedTasks of $totalTasks completed',
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
              ),
            ),
          ],
        ),
        SizedBox(height: 1.h),
        LinearProgressIndicator(
          value: completionRate,
          backgroundColor: theme.brightness == Brightness.light
              ? const Color(0xFFE1E4E8)
              : const Color(0xFF30363D),
          valueColor: AlwaysStoppedAnimation<Color>(
            completionRate == 1.0
                ? const Color(0xFF28A745)
                : theme.brightness == Brightness.light
                    ? const Color(0xFF2B5F75)
                    : const Color(0xFF4A8BA3),
          ),
          minHeight: 1.h,
        ),
      ],
    );
  }

  Widget _buildStatsRow(ThemeData theme) {
    return Row(
      children: [
        Expanded(
          child: _buildStatItem(
            theme,
            'Upcoming',
            upcomingTasks.toString(),
            'schedule',
            theme.brightness == Brightness.light
                ? const Color(0xFF2B5F75)
                : const Color(0xFF4A8BA3),
          ),
        ),
        SizedBox(width: 2.w),
        Expanded(
          child: _buildStatItem(
            theme,
            'Completed',
            completedTasks.toString(),
            'check_circle',
            const Color(0xFF28A745),
          ),
        ),
        SizedBox(width: 2.w),
        Expanded(
          child: _buildStatItem(
            theme,
            'Overdue',
            overdueTasks.toString(),
            'warning',
            overdueTasks > 0
                ? theme.brightness == Brightness.light
                    ? const Color(0xFFF66A0A)
                    : const Color(0xFFFF8A3D)
                : theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
          ),
        ),
      ],
    );
  }

  Widget _buildStatItem(ThemeData theme, String label, String value,
      String iconName, Color color) {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
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
            size: 20,
          ),
          SizedBox(height: 1.h),
          Text(
            value,
            style: theme.textTheme.titleMedium?.copyWith(
              color: color,
              fontWeight: FontWeight.w700,
            ),
          ),
          SizedBox(height: 0.5.h),
          Text(
            label,
            style: theme.textTheme.labelSmall?.copyWith(
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF6A737D)
                  : const Color(0xFFADB5BD),
            ),
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }

  Widget _buildStreakSection(ThemeData theme) {
    final currentStreak =
        streakData.isNotEmpty ? streakData.first['streak'] as int : 0;
    final bestStreak =
        streakData.isNotEmpty ? streakData.first['bestStreak'] as int : 0;

    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: theme.brightness == Brightness.light
            ? const Color(0xFFE8A547).withValues(alpha: 0.1)
            : const Color(0xFFEDB865).withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: theme.brightness == Brightness.light
              ? const Color(0xFFE8A547).withValues(alpha: 0.3)
              : const Color(0xFFEDB865).withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: Column(
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'local_fire_department',
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE8A547)
                    : const Color(0xFFEDB865),
                size: 20,
              ),
              SizedBox(width: 2.w),
              Text(
                'Care Streak',
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 1.h),
          Row(
            children: [
              Expanded(
                child: Column(
                  children: [
                    Text(
                      currentStreak.toString(),
                      style: theme.textTheme.titleLarge?.copyWith(
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFFE8A547)
                            : const Color(0xFFEDB865),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    Text(
                      'Current',
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFF6A737D)
                            : const Color(0xFFADB5BD),
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                width: 1,
                height: 4.h,
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
              ),
              Expanded(
                child: Column(
                  children: [
                    Text(
                      bestStreak.toString(),
                      style: theme.textTheme.titleLarge?.copyWith(
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFFE8A547)
                            : const Color(0xFFEDB865),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    Text(
                      'Best',
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFF6A737D)
                            : const Color(0xFFADB5BD),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    final months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    final weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    return '${weekdays[date.weekday - 1]}, ${months[date.month - 1]} ${date.day}';
  }
}
