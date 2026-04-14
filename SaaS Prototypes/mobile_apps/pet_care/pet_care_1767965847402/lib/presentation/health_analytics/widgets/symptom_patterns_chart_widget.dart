import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class SymptomPatternsChartWidget extends StatefulWidget {
  final List<Map<String, dynamic>> symptomData;
  final String selectedPetId;

  const SymptomPatternsChartWidget({
    super.key,
    required this.symptomData,
    required this.selectedPetId,
  });

  @override
  State<SymptomPatternsChartWidget> createState() =>
      _SymptomPatternsChartWidgetState();
}

class _SymptomPatternsChartWidgetState
    extends State<SymptomPatternsChartWidget> {
  int touchedIndex = -1;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final filteredData = _getFilteredData();

    if (filteredData.isEmpty) {
      return _buildEmptyState(theme);
    }

    return Container(
      height: 30.h,
      padding: EdgeInsets.all(4.w),
      child: Column(
        children: [
          Expanded(
            child: PieChart(
              PieChartData(
                pieTouchData: PieTouchData(
                  touchCallback:
                      (FlTouchEvent event, PieTouchResponse? pieTouchResponse) {
                    setState(() {
                      if (pieTouchResponse != null &&
                          pieTouchResponse.touchedSection != null) {
                        touchedIndex = pieTouchResponse
                            .touchedSection!.touchedSectionIndex;
                      } else {
                        touchedIndex = -1;
                      }
                    });
                  },
                ),
                borderData: FlBorderData(show: false),
                sectionsSpace: 2,
                centerSpaceRadius: 8.w,
                sections: _buildPieChartSections(theme),
              ),
            ),
          ),
          SizedBox(height: 2.h),
          _buildLegend(theme),
        ],
      ),
    );
  }

  List<Map<String, dynamic>> _getFilteredData() {
    final Map<String, int> symptomCounts = {};

    for (final data in widget.symptomData) {
      final dataMap = data;
      if (dataMap["petId"] == widget.selectedPetId) {
        final symptom = dataMap["symptom"] as String;
        symptomCounts[symptom] = (symptomCounts[symptom] ?? 0) + 1;
      }
    }

    return symptomCounts.entries
        .map((entry) => {
              "symptom": entry.key,
              "count": entry.value,
            })
        .toList();
  }

  List<PieChartSectionData> _buildPieChartSections(ThemeData theme) {
    final filteredData = _getFilteredData();
    final total =
        filteredData.fold<int>(0, (sum, data) => sum + (data["count"] as int));

    final colors = [
      theme.brightness == Brightness.light
          ? const Color(0xFF2B5F75)
          : const Color(0xFF4A8BA3),
      theme.brightness == Brightness.light
          ? const Color(0xFF7BA05B)
          : const Color(0xFF9BC474),
      theme.brightness == Brightness.light
          ? const Color(0xFFE8A547)
          : const Color(0xFFEDB865),
      theme.brightness == Brightness.light
          ? const Color(0xFFD73A49)
          : const Color(0xFFFF6B7A),
      theme.brightness == Brightness.light
          ? const Color(0xFFF66A0A)
          : const Color(0xFFFF8A3D),
    ];

    return filteredData.asMap().entries.map((entry) {
      final index = entry.key;
      final data = entry.value;
      final count = data["count"] as int;
      final percentage = (count / total * 100);
      final isSelected = index == touchedIndex;

      return PieChartSectionData(
        color: colors[index % colors.length],
        value: count.toDouble(),
        title: isSelected ? '${percentage.toStringAsFixed(1)}%' : '',
        radius: isSelected ? 12.w : 10.w,
        titleStyle: TextStyle(
          fontSize: 11.sp,
          fontWeight: FontWeight.w600,
          color: Colors.white,
        ),
        titlePositionPercentageOffset: 0.6,
      );
    }).toList();
  }

  Widget _buildLegend(ThemeData theme) {
    final filteredData = _getFilteredData();
    final colors = [
      theme.brightness == Brightness.light
          ? const Color(0xFF2B5F75)
          : const Color(0xFF4A8BA3),
      theme.brightness == Brightness.light
          ? const Color(0xFF7BA05B)
          : const Color(0xFF9BC474),
      theme.brightness == Brightness.light
          ? const Color(0xFFE8A547)
          : const Color(0xFFEDB865),
      theme.brightness == Brightness.light
          ? const Color(0xFFD73A49)
          : const Color(0xFFFF6B7A),
      theme.brightness == Brightness.light
          ? const Color(0xFFF66A0A)
          : const Color(0xFFFF8A3D),
    ];

    return Wrap(
      spacing: 4.w,
      runSpacing: 1.h,
      children: filteredData.asMap().entries.map((entry) {
        final index = entry.key;
        final data = entry.value;

        return Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 3.w,
              height: 3.w,
              decoration: BoxDecoration(
                color: colors[index % colors.length],
                shape: BoxShape.circle,
              ),
            ),
            SizedBox(width: 2.w),
            Text(
              '${data["symptom"]} (${data["count"]})',
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        );
      }).toList(),
    );
  }

  Widget _buildEmptyState(ThemeData theme) {
    return Container(
      height: 30.h,
      padding: EdgeInsets.all(4.w),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: 'health_and_safety',
              size: 48,
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF6A737D)
                  : const Color(0xFFADB5BD),
            ),
            SizedBox(height: 2.h),
            Text(
              'No symptom data available',
              style: theme.textTheme.bodyLarge?.copyWith(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'Start logging symptoms to identify patterns',
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
