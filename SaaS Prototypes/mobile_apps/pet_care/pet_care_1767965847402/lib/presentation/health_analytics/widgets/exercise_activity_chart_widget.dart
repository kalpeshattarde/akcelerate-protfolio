import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class ExerciseActivityChartWidget extends StatefulWidget {
  final List<Map<String, dynamic>> exerciseData;
  final String selectedPetId;

  const ExerciseActivityChartWidget({
    super.key,
    required this.exerciseData,
    required this.selectedPetId,
  });

  @override
  State<ExerciseActivityChartWidget> createState() =>
      _ExerciseActivityChartWidgetState();
}

class _ExerciseActivityChartWidgetState
    extends State<ExerciseActivityChartWidget> {
  int touchedIndex = -1;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final filteredData = _getFilteredData();

    if (filteredData.isEmpty) {
      return _buildEmptyState(theme);
    }

    return Container(
      height: 25.h,
      padding: EdgeInsets.all(4.w),
      child: BarChart(
        BarChartData(
          alignment: BarChartAlignment.spaceAround,
          maxY: _getMaxActivity() + 10,
          barTouchData: BarTouchData(
            enabled: true,
            touchCallback: (FlTouchEvent event, BarTouchResponse? response) {
              setState(() {
                if (response != null && response.spot != null) {
                  touchedIndex = response.spot!.touchedBarGroupIndex;
                } else {
                  touchedIndex = -1;
                }
              });
            },
            touchTooltipData: BarTouchTooltipData(
              tooltipBgColor: theme.colorScheme.surface,
              getTooltipItem: (group, groupIndex, rod, rodIndex) {
                final dataPoint = filteredData[groupIndex];
                final activityType = rodIndex == 0 ? 'Walks' : 'Playtime';
                final value =
                    rodIndex == 0 ? dataPoint["walks"] : dataPoint["playtime"];
                return BarTooltipItem(
                  '$activityType\n${value} min\n${dataPoint["date"]}',
                  TextStyle(
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF1B1F23)
                        : const Color(0xFFE8EAED),
                    fontWeight: FontWeight.w500,
                    fontSize: 11.sp,
                  ),
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
                getTitlesWidget: (value, meta) =>
                    _buildBottomTitle(value, theme),
                reservedSize: 38,
              ),
            ),
            leftTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                reservedSize: 40,
                interval: 20,
                getTitlesWidget: (value, meta) => _buildLeftTitle(value, theme),
              ),
            ),
          ),
          borderData: FlBorderData(
            show: true,
            border: Border.all(
              color: theme.brightness == Brightness.light
                  ? const Color(0xFFE1E4E8)
                  : const Color(0xFF30363D),
            ),
          ),
          barGroups: _buildBarGroups(theme),
          gridData: FlGridData(
            show: true,
            drawVerticalLine: false,
            horizontalInterval: 20,
            getDrawingHorizontalLine: (value) {
              return FlLine(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
                strokeWidth: 1,
              );
            },
          ),
        ),
      ),
    );
  }

  List<Map<String, dynamic>> _getFilteredData() {
    return (widget.exerciseData as List)
        .where((data) =>
            (data as Map<String, dynamic>)["petId"] == widget.selectedPetId)
        .map((data) => data as Map<String, dynamic>)
        .toList();
  }

  double _getMaxActivity() {
    final filteredData = _getFilteredData();
    if (filteredData.isEmpty) return 100;

    double maxValue = 0;
    for (final data in filteredData) {
      final walks = (data["walks"] as int).toDouble();
      final playtime = (data["playtime"] as int).toDouble();
      if (walks > maxValue) maxValue = walks;
      if (playtime > maxValue) maxValue = playtime;
    }
    return maxValue;
  }

  List<BarChartGroupData> _buildBarGroups(ThemeData theme) {
    final filteredData = _getFilteredData();

    return filteredData.asMap().entries.map((entry) {
      final index = entry.key;
      final data = entry.value;
      final isSelected = index == touchedIndex;

      return BarChartGroupData(
        x: index,
        barRods: [
          BarChartRodData(
            toY: (data["walks"] as int).toDouble(),
            color: isSelected
                ? (theme.brightness == Brightness.light
                        ? const Color(0xFF2B5F75)
                        : const Color(0xFF4A8BA3))
                    .withValues(alpha: 0.8)
                : (theme.brightness == Brightness.light
                    ? const Color(0xFF2B5F75)
                    : const Color(0xFF4A8BA3)),
            width: 3.w,
            borderRadius: BorderRadius.circular(4),
            backDrawRodData: BackgroundBarChartRodData(
              show: true,
              toY: _getMaxActivity() + 10,
              color: theme.brightness == Brightness.light
                  ? const Color(0xFFE1E4E8)
                  : const Color(0xFF30363D),
            ),
          ),
          BarChartRodData(
            toY: (data["playtime"] as int).toDouble(),
            color: isSelected
                ? (theme.brightness == Brightness.light
                        ? const Color(0xFF7BA05B)
                        : const Color(0xFF9BC474))
                    .withValues(alpha: 0.8)
                : (theme.brightness == Brightness.light
                    ? const Color(0xFF7BA05B)
                    : const Color(0xFF9BC474)),
            width: 3.w,
            borderRadius: BorderRadius.circular(4),
          ),
        ],
        barsSpace: 1.w,
      );
    }).toList();
  }

  Widget _buildBottomTitle(double value, ThemeData theme) {
    final filteredData = _getFilteredData();
    if (value.toInt() >= filteredData.length) return const SizedBox();

    final date = filteredData[value.toInt()]["date"] as String;
    final parts = date.split('/');

    return Padding(
      padding: EdgeInsets.only(top: 1.h),
      child: Text(
        '${parts[0]}/${parts[1]}',
        style: TextStyle(
          color: theme.brightness == Brightness.light
              ? const Color(0xFF6A737D)
              : const Color(0xFFADB5BD),
          fontSize: 10.sp,
          fontWeight: FontWeight.w400,
        ),
      ),
    );
  }

  Widget _buildLeftTitle(double value, ThemeData theme) {
    return Text(
      '${value.toInt()}m',
      style: TextStyle(
        color: theme.brightness == Brightness.light
            ? const Color(0xFF6A737D)
            : const Color(0xFFADB5BD),
        fontSize: 10.sp,
        fontWeight: FontWeight.w400,
      ),
    );
  }

  Widget _buildEmptyState(ThemeData theme) {
    return Container(
      height: 25.h,
      padding: EdgeInsets.all(4.w),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: 'directions_run',
              size: 48,
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF6A737D)
                  : const Color(0xFFADB5BD),
            ),
            SizedBox(height: 2.h),
            Text(
              'No exercise data available',
              style: theme.textTheme.bodyLarge?.copyWith(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'Start logging walks and playtime to see activity trends',
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF959DA5)
                    : const Color(0xFF6A737D),
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}