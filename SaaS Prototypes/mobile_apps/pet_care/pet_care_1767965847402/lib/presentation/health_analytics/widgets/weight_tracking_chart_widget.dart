import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class WeightTrackingChartWidget extends StatefulWidget {
  final List<Map<String, dynamic>> weightData;
  final String selectedPetId;

  const WeightTrackingChartWidget({
    super.key,
    required this.weightData,
    required this.selectedPetId,
  });

  @override
  State<WeightTrackingChartWidget> createState() =>
      _WeightTrackingChartWidgetState();
}

class _WeightTrackingChartWidgetState extends State<WeightTrackingChartWidget> {
  int? touchedIndex;

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
      child: LineChart(
        LineChartData(
          gridData: FlGridData(
            show: true,
            drawVerticalLine: false,
            horizontalInterval: 1,
            getDrawingHorizontalLine: (value) {
              return FlLine(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
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
                getTitlesWidget: (value, meta) =>
                    _buildBottomTitle(value, theme),
              ),
            ),
            leftTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                interval: 5,
                reservedSize: 40,
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
          minX: 0,
          maxX: (filteredData.length - 1).toDouble(),
          minY: _getMinWeight() - 2,
          maxY: _getMaxWeight() + 2,
          lineBarsData: [
            LineChartBarData(
              spots: _buildSpots(),
              isCurved: true,
              gradient: LinearGradient(
                colors: [
                  theme.brightness == Brightness.light
                      ? const Color(0xFF2B5F75)
                      : const Color(0xFF4A8BA3),
                  theme.brightness == Brightness.light
                      ? const Color(0xFF7BA05B)
                      : const Color(0xFF9BC474),
                ],
              ),
              barWidth: 3,
              isStrokeCapRound: true,
              dotData: FlDotData(
                show: true,
                getDotPainter: (spot, percent, barData, index) {
                  return FlDotCirclePainter(
                    radius: 4,
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF2B5F75)
                        : const Color(0xFF4A8BA3),
                    strokeWidth: 2,
                    strokeColor: theme.colorScheme.surface,
                  );
                },
              ),
              belowBarData: BarAreaData(
                show: true,
                gradient: LinearGradient(
                  colors: [
                    (theme.brightness == Brightness.light
                            ? const Color(0xFF2B5F75)
                            : const Color(0xFF4A8BA3))
                        .withValues(alpha: 0.3),
                    (theme.brightness == Brightness.light
                            ? const Color(0xFF7BA05B)
                            : const Color(0xFF9BC474))
                        .withValues(alpha: 0.1),
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
            ),
          ],
          lineTouchData: LineTouchData(
            enabled: true,
            touchCallback:
                (FlTouchEvent event, LineTouchResponse? touchResponse) {
              setState(() {
                if (touchResponse != null &&
                    touchResponse.lineBarSpots != null) {
                  touchedIndex = touchResponse.lineBarSpots!.first.spotIndex;
                } else {
                  touchedIndex = null;
                }
              });
            },
            getTouchedSpotIndicator:
                (LineChartBarData barData, List<int> spotIndexes) {
              return spotIndexes.map((spotIndex) {
                return TouchedSpotIndicatorData(
                  FlLine(
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF2B5F75)
                        : const Color(0xFF4A8BA3),
                    strokeWidth: 2,
                  ),
                  FlDotData(
                    getDotPainter: (spot, percent, barData, index) {
                      return FlDotCirclePainter(
                        radius: 6,
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFF2B5F75)
                            : const Color(0xFF4A8BA3),
                        strokeWidth: 3,
                        strokeColor: theme.colorScheme.surface,
                      );
                    },
                  ),
                );
              }).toList();
            },
            touchTooltipData: LineTouchTooltipData(
              tooltipBgColor: theme.colorScheme.surface,
              getTooltipItems: (List<LineBarSpot> touchedBarSpots) {
                return touchedBarSpots.map((barSpot) {
                  final dataPoint = filteredData[barSpot.spotIndex];
                  return LineTooltipItem(
                    '${dataPoint["weight"]} lbs\n${dataPoint["date"]}',
                    TextStyle(
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF1B1F23)
                          : const Color(0xFFE8EAED),
                      fontWeight: FontWeight.w500,
                      fontSize: 12.sp,
                    ),
                  );
                }).toList();
              },
            ),
          ),
        ),
      ),
    );
  }

  List<Map<String, dynamic>> _getFilteredData() {
    return (widget.weightData as List)
        .where((data) =>
            (data as Map<String, dynamic>)["petId"] == widget.selectedPetId)
        .map((data) => data as Map<String, dynamic>)
        .toList();
  }

  List<FlSpot> _buildSpots() {
    final filteredData = _getFilteredData();
    return filteredData.asMap().entries.map((entry) {
      return FlSpot(
        entry.key.toDouble(),
        (entry.value["weight"] as double),
      );
    }).toList();
  }

  double _getMinWeight() {
    final filteredData = _getFilteredData();
    if (filteredData.isEmpty) return 0;
    return filteredData
        .map((data) => data["weight"] as double)
        .reduce((a, b) => a < b ? a : b);
  }

  double _getMaxWeight() {
    final filteredData = _getFilteredData();
    if (filteredData.isEmpty) return 100;
    return filteredData
        .map((data) => data["weight"] as double)
        .reduce((a, b) => a > b ? a : b);
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
      '${value.toInt()}',
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
              iconName: 'monitor_weight',
              size: 48,
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF6A737D)
                  : const Color(0xFFADB5BD),
            ),
            SizedBox(height: 2.h),
            Text(
              'No weight data available',
              style: theme.textTheme.bodyLarge?.copyWith(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'Start logging your pet\'s weight to see trends',
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