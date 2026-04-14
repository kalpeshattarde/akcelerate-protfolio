import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';
import 'package:fl_chart/fl_chart.dart';

/// Widget for displaying weekly kick counter statistics
class WeeklyStatsWidget extends StatelessWidget {
  final List<Map<String, dynamic>> sessionHistory;

  const WeeklyStatsWidget({
    super.key,
    required this.sessionHistory,
  });

  Map<String, dynamic> _calculateWeeklyStats() {
    if (sessionHistory.isEmpty) {
      return {
        'averageKicks': 0.0,
        'totalSessions': 0,
        'averageDuration': 0.0,
        'dailyData': <Map<String, dynamic>>[],
      };
    }

    final now = DateTime.now();
    final weekAgo = now.subtract(const Duration(days: 7));

    final weekSessions = sessionHistory.where((session) {
      final date = session["date"] as DateTime;
      return date.isAfter(weekAgo);
    }).toList();

    if (weekSessions.isEmpty) {
      return {
        'averageKicks': 0.0,
        'totalSessions': 0,
        'averageDuration': 0.0,
        'dailyData': <Map<String, dynamic>>[],
      };
    }

    final totalKicks = weekSessions.fold<int>(
      0,
      (sum, session) => sum + (session["kickCount"] as int),
    );

    final totalDuration = weekSessions.fold<Duration>(
      Duration.zero,
      (sum, session) => sum + (session["duration"] as Duration),
    );

    // Calculate daily data for chart
    final dailyData = <Map<String, dynamic>>[];
    for (int i = 6; i >= 0; i--) {
      final day = now.subtract(Duration(days: i));
      final daySessions = weekSessions.where((session) {
        final date = session["date"] as DateTime;
        return date.day == day.day &&
            date.month == day.month &&
            date.year == day.year;
      }).toList();

      final dayKicks = daySessions.fold<int>(
        0,
        (sum, session) => sum + (session["kickCount"] as int),
      );

      dailyData.add({
        'day': day,
        'kicks': dayKicks,
        'sessions': daySessions.length,
      });
    }

    return {
      'averageKicks': totalKicks / weekSessions.length,
      'totalSessions': weekSessions.length,
      'averageDuration': totalDuration.inMinutes / weekSessions.length,
      'dailyData': dailyData,
    };
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final stats = _calculateWeeklyStats();
    final dailyData = stats['dailyData'] as List<Map<String, dynamic>>;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: theme.colorScheme.outline.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.analytics_outlined,
                size: 24,
                color: theme.colorScheme.primary,
              ),
              SizedBox(width: 2.w),
              Text(
                'Weekly Overview',
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 3.h),

          // Stats row
          Row(
            children: [
              Expanded(
                child: _buildStatCard(
                  'Avg Kicks',
                  '${(stats['averageKicks'] as double).toStringAsFixed(1)}',
                  Icons.touch_app_rounded,
                  theme,
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: _buildStatCard(
                  'Sessions',
                  '${stats['totalSessions']}',
                  Icons.event_available_outlined,
                  theme,
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: _buildStatCard(
                  'Avg Time',
                  '${(stats['averageDuration'] as double).toStringAsFixed(0)}m',
                  Icons.timer_outlined,
                  theme,
                ),
              ),
            ],
          ),

          if (dailyData.isNotEmpty) ...[
            SizedBox(height: 3.h),

            // Chart
            SizedBox(
              height: 20.h,
              child: Semantics(
                label: 'Weekly kick count bar chart showing daily activity',
                child: BarChart(
                  BarChartData(
                    alignment: BarChartAlignment.spaceAround,
                    maxY: dailyData.fold<double>(
                          0,
                          (max, data) => (data['kicks'] as int) > max
                              ? (data['kicks'] as int).toDouble()
                              : max,
                        ) *
                        1.2,
                    barTouchData: BarTouchData(
                      enabled: true,
                      touchTooltipData: BarTouchTooltipData(
                        tooltipBgColor: theme.colorScheme.surface,
                        getTooltipItem: (group, groupIndex, rod, rodIndex) {
                          final data = dailyData[groupIndex];
                          return BarTooltipItem(
                            '${data['kicks']} kicks\n${data['sessions']} sessions',
                            theme.textTheme.bodySmall!.copyWith(
                              color: theme.colorScheme.onSurface,
                            ),
                          );
                        },
                      ),
                    ),
                    titlesData: FlTitlesData(
                      show: true,
                      bottomTitles: AxisTitles(
                        sideTitles: SideTitles(
                          showTitles: true,
                          getTitlesWidget: (value, meta) {
                            if (value.toInt() >= 0 &&
                                value.toInt() < dailyData.length) {
                              final data = dailyData[value.toInt()];
                              final day = data['day'] as DateTime;
                              final dayNames = [
                                'S',
                                'M',
                                'T',
                                'W',
                                'T',
                                'F',
                                'S'
                              ];
                              return Text(
                                dayNames[day.weekday % 7],
                                style: theme.textTheme.bodySmall?.copyWith(
                                  color: theme.colorScheme.onSurfaceVariant,
                                ),
                              );
                            }
                            return const SizedBox.shrink();
                          },
                        ),
                      ),
                      leftTitles: const AxisTitles(
                        sideTitles: SideTitles(showTitles: false),
                      ),
                      topTitles: const AxisTitles(
                        sideTitles: SideTitles(showTitles: false),
                      ),
                      rightTitles: const AxisTitles(
                        sideTitles: SideTitles(showTitles: false),
                      ),
                    ),
                    gridData: FlGridData(
                      show: true,
                      drawVerticalLine: false,
                      horizontalInterval: 5,
                      getDrawingHorizontalLine: (value) {
                        return FlLine(
                          color:
                              theme.colorScheme.outline.withValues(alpha: 0.1),
                          strokeWidth: 1,
                        );
                      },
                    ),
                    borderData: FlBorderData(show: false),
                    barGroups: dailyData.asMap().entries.map((entry) {
                      final index = entry.key;
                      final data = entry.value;
                      final kicks = data['kicks'] as int;

                      return BarChartGroupData(
                        x: index,
                        barRods: [
                          BarChartRodData(
                            toY: kicks.toDouble(),
                            color: theme.colorScheme.primary,
                            width: 16,
                            borderRadius: const BorderRadius.vertical(
                              top: Radius.circular(4),
                            ),
                          ),
                        ],
                      );
                    }).toList(),
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildStatCard(
    String label,
    String value,
    IconData icon,
    ThemeData theme,
  ) {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Icon(
            icon,
            size: 20,
            color: theme.colorScheme.primary,
          ),
          SizedBox(height: 1.h),
          Text(
            value,
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
              color: theme.colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 0.5.h),
          Text(
            label,
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}