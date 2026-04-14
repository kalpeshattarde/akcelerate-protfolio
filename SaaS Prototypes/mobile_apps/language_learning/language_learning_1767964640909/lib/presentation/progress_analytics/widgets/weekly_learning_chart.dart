import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class WeeklyLearningChart extends StatefulWidget {
  final List<Map<String, dynamic>> weeklyData;
  final int weeklyGoal;

  const WeeklyLearningChart({
    Key? key,
    required this.weeklyData,
    required this.weeklyGoal,
  }) : super(key: key);

  @override
  State<WeeklyLearningChart> createState() => _WeeklyLearningChartState();
}

class _WeeklyLearningChartState extends State<WeeklyLearningChart>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
        duration: const Duration(milliseconds: 1200), vsync: this);
    _animation = Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(
        parent: _animationController, curve: Curves.easeOutCubic));
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final totalMinutes = widget.weeklyData
        .fold<int>(0, (sum, day) => sum + (day['minutes'] as int));
    final goalProgress = (totalMinutes / widget.weeklyGoal).clamp(0.0, 1.0);

    return Container(
        width: double.infinity,
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                  color: Colors.black.withValues(alpha: 0.05),
                  blurRadius: 10,
                  offset: const Offset(0, 2)),
            ]),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Text('Weekly Learning Time',
                style: AppTheme.lightTheme.textTheme.titleLarge
                    ?.copyWith(fontWeight: FontWeight.w600)),
            Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                decoration: BoxDecoration(
                    color: goalProgress >= 1.0
                        ? AppTheme.lightTheme.colorScheme.tertiary
                            .withValues(alpha: 0.2)
                        : AppTheme.lightTheme.primaryColor
                            .withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(20)),
                child: Text('${totalMinutes}/${widget.weeklyGoal} min',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: goalProgress >= 1.0
                            ? AppTheme.lightTheme.colorScheme.tertiary
                            : AppTheme.lightTheme.primaryColor,
                        fontWeight: FontWeight.w600))),
          ]),
          SizedBox(height: 2.h),
          AnimatedBuilder(
              animation: _animation,
              builder: (context, child) {
                return LinearProgressIndicator(
                    value: goalProgress * _animation.value,
                    backgroundColor: AppTheme.lightTheme.colorScheme.outline
                        .withValues(alpha: 0.2),
                    valueColor: AlwaysStoppedAnimation<Color>(
                        goalProgress >= 1.0
                            ? AppTheme.lightTheme.colorScheme.tertiary
                            : AppTheme.lightTheme.primaryColor),
                    minHeight: 8);
              }),
          SizedBox(height: 3.h),
          SizedBox(
              height: 25.h,
              child: AnimatedBuilder(
                  animation: _animation,
                  builder: (context, child) {
                    return BarChart(BarChartData(
                        alignment: BarChartAlignment.spaceAround,
                        maxY: widget.weeklyData
                                .map((e) => e['minutes'] as int)
                                .reduce((a, b) => a > b ? a : b)
                                .toDouble() *
                            1.2,
                        barTouchData: BarTouchData(
                            enabled: true,
                            touchTooltipData: BarTouchTooltipData(
                                tooltipBorder: BorderSide(
                                    color: AppTheme
                                        .lightTheme.colorScheme.outline
                                        .withValues(alpha: 0.3)),
                                getTooltipItem:
                                    (group, groupIndex, rod, rodIndex) {
                                  return BarTooltipItem(
                                      '${rod.toY.round()} min',
                                      AppTheme.lightTheme.textTheme.bodySmall!);
                                })),
                        titlesData: FlTitlesData(
                            show: true,
                            rightTitles: const AxisTitles(
                                sideTitles: SideTitles(showTitles: false)),
                            topTitles: const AxisTitles(
                                sideTitles: SideTitles(showTitles: false)),
                            bottomTitles: AxisTitles(
                                sideTitles: SideTitles(
                                    showTitles: true,
                                    getTitlesWidget: (value, meta) {
                                      if (value.toInt() <
                                          widget.weeklyData.length) {
                                        return Padding(
                                            padding: EdgeInsets.only(top: 1.h),
                                            child: Text(
                                                widget.weeklyData[value.toInt()]
                                                    ['day'] as String,
                                                style: AppTheme.lightTheme
                                                    .textTheme.bodySmall
                                                    ?.copyWith(
                                                        color: AppTheme
                                                            .lightTheme
                                                            .colorScheme
                                                            .onSurfaceVariant)));
                                      }
                                      return const Text('');
                                    },
                                    reservedSize: 30)),
                            leftTitles: AxisTitles(
                                sideTitles: SideTitles(
                                    showTitles: true,
                                    interval: 30,
                                    getTitlesWidget: (value, meta) {
                                      return Text('${value.toInt()}',
                                          style: AppTheme
                                              .lightTheme.textTheme.bodySmall
                                              ?.copyWith(
                                                  color: AppTheme
                                                      .lightTheme
                                                      .colorScheme
                                                      .onSurfaceVariant,
                                                  fontSize: 10.sp));
                                    },
                                    reservedSize: 40))),
                        borderData: FlBorderData(show: false),
                        barGroups:
                            widget.weeklyData.asMap().entries.map((entry) {
                          final index = entry.key;
                          final data = entry.value;
                          final minutes = data['minutes'] as int;

                          return BarChartGroupData(x: index, barRods: [
                            BarChartRodData(
                                toY: minutes.toDouble() * _animation.value,
                                color: minutes >= (widget.weeklyGoal / 7)
                                    ? AppTheme.lightTheme.colorScheme.tertiary
                                    : AppTheme.lightTheme.primaryColor,
                                width: 6.w,
                                borderRadius: BorderRadius.circular(4),
                                backDrawRodData: BackgroundBarChartRodData(
                                    show: true,
                                    toY: widget.weeklyData
                                            .map((e) => e['minutes'] as int)
                                            .reduce((a, b) => a > b ? a : b)
                                            .toDouble() *
                                        1.2,
                                    color: AppTheme
                                        .lightTheme.colorScheme.outline
                                        .withValues(alpha: 0.1))),
                          ]);
                        }).toList(),
                        gridData: FlGridData(
                            show: true,
                            drawVerticalLine: false,
                            horizontalInterval: 30,
                            getDrawingHorizontalLine: (value) {
                              return FlLine(
                                  color: AppTheme.lightTheme.colorScheme.outline
                                      .withValues(alpha: 0.2),
                                  strokeWidth: 1);
                            })));
                  })),
        ]));
  }
}
