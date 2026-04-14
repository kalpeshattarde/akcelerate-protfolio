import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SleepPatternWidget extends StatelessWidget {
  final List<Map<String, dynamic>> weeklyData;

  const SleepPatternWidget({
    Key? key,
    required this.weeklyData,
  }) : super(key: key);

  String _getDayName(int dayIndex) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[dayIndex % 7];
  }

  double _getMaxHours() {
    double max = 0;
    for (var data in weeklyData) {
      double total =
          (data['dayHours'] as double) + (data['nightHours'] as double);
      if (total > max) max = total;
    }
    return max > 0 ? max + 2 : 16; // Add padding or default to 16 hours
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
                'Weekly Sleep Pattern',
                style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              CustomIconWidget(
                iconName: 'insights',
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 5.w,
              ),
            ],
          ),
          SizedBox(height: 3.h),
          weeklyData.isEmpty
              ? _buildEmptyState()
              : Column(
                  children: [
                    SizedBox(
                      height: 25.h,
                      child: BarChart(
                        BarChartData(
                          alignment: BarChartAlignment.spaceAround,
                          maxY: _getMaxHours(),
                          barTouchData: BarTouchData(
                            enabled: true,
                            touchTooltipData: BarTouchTooltipData(
                              tooltipBgColor:
                                  AppTheme.lightTheme.colorScheme.surface,
                              tooltipBorder: BorderSide(
                                color: AppTheme.lightTheme.colorScheme.outline,
                              ),
                              getTooltipItem:
                                  (group, groupIndex, rod, rodIndex) {
                                String dayName = _getDayName(group.x);
                                String sleepType =
                                    rodIndex == 0 ? 'Day' : 'Night';
                                return BarTooltipItem(
                                  '$dayName\n$sleepType: ${rod.toY.toStringAsFixed(1)}h',
                                  AppTheme.lightTheme.textTheme.bodySmall!,
                                );
                              },
                            ),
                          ),
                          titlesData: FlTitlesData(
                            show: true,
                            rightTitles: const AxisTitles(
                              sideTitles: SideTitles(showTitles: false),
                            ),
                            topTitles: const AxisTitles(
                              sideTitles: SideTitles(showTitles: false),
                            ),
                            bottomTitles: AxisTitles(
                              sideTitles: SideTitles(
                                showTitles: true,
                                getTitlesWidget:
                                    (double value, TitleMeta meta) {
                                  return Padding(
                                    padding: EdgeInsets.only(top: 1.h),
                                    child: Text(
                                      _getDayName(value.toInt()),
                                      style: AppTheme
                                          .lightTheme.textTheme.bodySmall
                                          ?.copyWith(
                                        color: AppTheme.lightTheme.colorScheme
                                            .onSurfaceVariant,
                                      ),
                                    ),
                                  );
                                },
                                reservedSize: 3.h,
                              ),
                            ),
                            leftTitles: AxisTitles(
                              sideTitles: SideTitles(
                                showTitles: true,
                                interval: 2,
                                getTitlesWidget:
                                    (double value, TitleMeta meta) {
                                  return Text(
                                    '${value.toInt()}h',
                                    style: AppTheme
                                        .lightTheme.textTheme.bodySmall
                                        ?.copyWith(
                                      color: AppTheme.lightTheme.colorScheme
                                          .onSurfaceVariant,
                                    ),
                                  );
                                },
                                reservedSize: 8.w,
                              ),
                            ),
                          ),
                          borderData: FlBorderData(show: false),
                          barGroups: weeklyData.asMap().entries.map((entry) {
                            int index = entry.key;
                            Map<String, dynamic> data = entry.value;
                            return BarChartGroupData(
                              x: index,
                              barRods: [
                                BarChartRodData(
                                  toY: data['dayHours'] as double,
                                  color:
                                      AppTheme.lightTheme.colorScheme.secondary,
                                  width: 3.w,
                                  borderRadius: BorderRadius.circular(1.w),
                                ),
                                BarChartRodData(
                                  toY: data['nightHours'] as double,
                                  color:
                                      AppTheme.lightTheme.colorScheme.primary,
                                  width: 3.w,
                                  borderRadius: BorderRadius.circular(1.w),
                                ),
                              ],
                            );
                          }).toList(),
                          gridData: FlGridData(
                            show: true,
                            drawVerticalLine: false,
                            horizontalInterval: 2,
                            getDrawingHorizontalLine: (value) {
                              return FlLine(
                                color: AppTheme.lightTheme.colorScheme.outline
                                    .withValues(alpha: 0.2),
                                strokeWidth: 1,
                              );
                            },
                          ),
                        ),
                      ),
                    ),
                    SizedBox(height: 2.h),
                    _buildLegend(),
                    SizedBox(height: 2.h),
                    _buildWeeklyStats(),
                  ],
                ),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        children: [
          SizedBox(height: 4.h),
          CustomIconWidget(
            iconName: 'bar_chart',
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            size: 12.w,
          ),
          SizedBox(height: 2.h),
          Text(
            'No sleep data available',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Track sleep for a few days to see patterns',
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 4.h),
        ],
      ),
    );
  }

  Widget _buildLegend() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _buildLegendItem(
          'Day Sleep',
          AppTheme.lightTheme.colorScheme.secondary,
        ),
        SizedBox(width: 6.w),
        _buildLegendItem(
          'Night Sleep',
          AppTheme.lightTheme.colorScheme.primary,
        ),
      ],
    );
  }

  Widget _buildLegendItem(String label, Color color) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 3.w,
          height: 3.w,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(1.w),
          ),
        ),
        SizedBox(width: 2.w),
        Text(
          label,
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          ),
        ),
      ],
    );
  }

  Widget _buildWeeklyStats() {
    if (weeklyData.isEmpty) return const SizedBox.shrink();

    double totalDayHours = 0;
    double totalNightHours = 0;
    for (var data in weeklyData) {
      totalDayHours += data['dayHours'] as double;
      totalNightHours += data['nightHours'] as double;
    }

    double avgDayHours = totalDayHours / weeklyData.length;
    double avgNightHours = totalNightHours / weeklyData.length;
    double avgTotalHours = avgDayHours + avgNightHours;

    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(3.w),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1),
        ),
      ),
      child: Column(
        children: [
          Text(
            'Weekly Averages',
            style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.primary,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatItem(
                'Total',
                '${avgTotalHours.toStringAsFixed(1)}h',
                AppTheme.lightTheme.colorScheme.primary,
              ),
              _buildStatItem(
                'Day',
                '${avgDayHours.toStringAsFixed(1)}h',
                AppTheme.lightTheme.colorScheme.secondary,
              ),
              _buildStatItem(
                'Night',
                '${avgNightHours.toStringAsFixed(1)}h',
                AppTheme.lightTheme.colorScheme.primary,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem(String label, String value, Color color) {
    return Column(
      children: [
        Text(
          value,
          style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
            color: color,
            fontWeight: FontWeight.w600,
          ),
        ),
        Text(
          label,
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          ),
        ),
      ],
    );
  }
}