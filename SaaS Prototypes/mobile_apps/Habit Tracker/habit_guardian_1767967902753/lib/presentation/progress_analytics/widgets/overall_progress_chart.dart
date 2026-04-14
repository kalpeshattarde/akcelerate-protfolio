import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class OverallProgressChart extends StatefulWidget {
  final String timePeriod;

  const OverallProgressChart({
    super.key,
    required this.timePeriod,
  });

  @override
  State<OverallProgressChart> createState() => _OverallProgressChartState();
}

class _OverallProgressChartState extends State<OverallProgressChart>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;
  int touchedIndex = -1;

  final List<Map<String, dynamic>> weeklyData = [
    {"day": "Mon", "completion": 85.0},
    {"day": "Tue", "completion": 92.0},
    {"day": "Wed", "completion": 78.0},
    {"day": "Thu", "completion": 95.0},
    {"day": "Fri", "completion": 88.0},
    {"day": "Sat", "completion": 76.0},
    {"day": "Sun", "completion": 82.0},
  ];

  final List<Map<String, dynamic>> monthlyData = [
    {"week": "W1", "completion": 85.0},
    {"week": "W2", "completion": 88.0},
    {"week": "W3", "completion": 92.0},
    {"week": "W4", "completion": 78.0},
  ];

  final List<Map<String, dynamic>> yearlyData = [
    {"month": "Jan", "completion": 75.0},
    {"month": "Feb", "completion": 82.0},
    {"month": "Mar", "completion": 88.0},
    {"month": "Apr", "completion": 85.0},
    {"month": "May", "completion": 92.0},
    {"month": "Jun", "completion": 89.0},
    {"month": "Jul", "completion": 94.0},
    {"month": "Aug", "completion": 87.0},
    {"month": "Sep", "completion": 91.0},
    {"month": "Oct", "completion": 86.0},
    {"month": "Nov", "completion": 93.0},
    {"month": "Dec", "completion": 88.0},
  ];

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get currentData {
    switch (widget.timePeriod) {
      case 'Week':
        return weeklyData;
      case 'Month':
        return monthlyData;
      case 'Year':
        return yearlyData;
      default:
        return weeklyData;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.white.withValues(alpha: 0.05)
                : Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Overall Progress',
            style: theme.textTheme.titleLarge?.copyWith(
              color:
                  isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Completion rates over ${widget.timePeriod.toLowerCase()}',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: isDark
                  ? AppTheme.textSecondaryDark
                  : AppTheme.textSecondaryLight,
            ),
          ),
          SizedBox(height: 3.h),
          SizedBox(
            height: 25.h,
            child: AnimatedBuilder(
              animation: _animation,
              builder: (context, child) {
                return LineChart(
                  LineChartData(
                    gridData: FlGridData(
                      show: true,
                      drawVerticalLine: false,
                      horizontalInterval: 20,
                      getDrawingHorizontalLine: (value) {
                        return FlLine(
                          color: isDark
                              ? AppTheme.borderDark.withValues(alpha: 0.3)
                              : AppTheme.borderLight.withValues(alpha: 0.5),
                          strokeWidth: 1,
                        );
                      },
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
                          reservedSize: 30,
                          interval: 1,
                          getTitlesWidget: (double value, TitleMeta meta) {
                            final index = value.toInt();
                            if (index >= 0 && index < currentData.length) {
                              final label = widget.timePeriod == 'Week'
                                  ? (currentData[index]["day"] as String)
                                  : widget.timePeriod == 'Month'
                                      ? (currentData[index]["week"] as String)
                                      : (currentData[index]["month"] as String);
                              return SideTitleWidget(
                                axisSide: meta.axisSide,
                                child: Text(
                                  label,
                                  style: theme.textTheme.bodySmall?.copyWith(
                                    color: isDark
                                        ? AppTheme.textSecondaryDark
                                        : AppTheme.textSecondaryLight,
                                  ),
                                ),
                              );
                            }
                            return const Text('');
                          },
                        ),
                      ),
                      leftTitles: AxisTitles(
                        sideTitles: SideTitles(
                          showTitles: true,
                          interval: 20,
                          reservedSize: 40,
                          getTitlesWidget: (double value, TitleMeta meta) {
                            return Text(
                              '${value.toInt()}%',
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: isDark
                                    ? AppTheme.textSecondaryDark
                                    : AppTheme.textSecondaryLight,
                              ),
                            );
                          },
                        ),
                      ),
                    ),
                    borderData: FlBorderData(
                      show: true,
                      border: Border.all(
                        color: isDark
                            ? AppTheme.borderDark.withValues(alpha: 0.3)
                            : AppTheme.borderLight.withValues(alpha: 0.5),
                      ),
                    ),
                    minX: 0,
                    maxX: (currentData.length - 1).toDouble(),
                    minY: 0,
                    maxY: 100,
                    lineTouchData: LineTouchData(
                      enabled: true,
                      touchTooltipData: LineTouchTooltipData(
                        tooltipBgColor: isDark
                            ? AppTheme.textPrimaryDark.withValues(alpha: 0.9)
                            : AppTheme.textPrimaryLight.withValues(alpha: 0.9),
                        getTooltipItems: (List<LineBarSpot> touchedBarSpots) {
                          return touchedBarSpots.map((barSpot) {
                            return LineTooltipItem(
                              '${barSpot.y.toStringAsFixed(1)}%',
                              TextStyle(
                                color: isDark
                                    ? AppTheme.primaryDark
                                    : AppTheme.primaryLight,
                                fontWeight: FontWeight.w500,
                              ),
                            );
                          }).toList();
                        },
                      ),
                    ),
                    lineBarsData: [
                      LineChartBarData(
                        spots: currentData.asMap().entries.map((entry) {
                          final index = entry.key;
                          final completion =
                              (entry.value["completion"] as double) *
                                  _animation.value;
                          return FlSpot(index.toDouble(), completion);
                        }).toList(),
                        isCurved: true,
                        gradient: LinearGradient(
                          colors: [
                            isDark ? AppTheme.accentDark : AppTheme.accentLight,
                            isDark
                                ? AppTheme.premiumDark
                                : AppTheme.premiumLight,
                          ],
                        ),
                        barWidth: 3,
                        isStrokeCapRound: true,
                        dotData: FlDotData(
                          show: true,
                          getDotPainter: (spot, percent, barData, index) {
                            return FlDotCirclePainter(
                              radius: 4,
                              color: isDark
                                  ? AppTheme.accentDark
                                  : AppTheme.accentLight,
                              strokeWidth: 2,
                              strokeColor: isDark
                                  ? AppTheme.surfaceDark
                                  : AppTheme.surfaceLight,
                            );
                          },
                        ),
                        belowBarData: BarAreaData(
                          show: true,
                          gradient: LinearGradient(
                            colors: [
                              (isDark
                                      ? AppTheme.accentDark
                                      : AppTheme.accentLight)
                                  .withValues(alpha: 0.3),
                              (isDark
                                      ? AppTheme.premiumDark
                                      : AppTheme.premiumLight)
                                  .withValues(alpha: 0.1),
                            ],
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}