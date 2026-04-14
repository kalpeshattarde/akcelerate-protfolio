import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

/// Reports tab content showing weekly trends and health overview
class ReportsTabContent extends StatelessWidget {
  const ReportsTabContent({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    // Mock weekly data for charts
    final List<Map<String, dynamic>> weeklyData = [
      {"day": "Mon", "weight": 68.5, "bloodPressure": 118},
      {"day": "Tue", "weight": 68.7, "bloodPressure": 120},
      {"day": "Wed", "weight": 68.6, "bloodPressure": 119},
      {"day": "Thu", "weight": 68.8, "bloodPressure": 121},
      {"day": "Fri", "weight": 69.0, "bloodPressure": 120},
      {"day": "Sat", "weight": 69.1, "bloodPressure": 118},
      {"day": "Sun", "weight": 69.2, "bloodPressure": 119},
    ];

    return SingleChildScrollView(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header section
          Text(
            "Weekly Reports",
            style: theme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            "Track your health trends over time",
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 3.h),

          // Weight trend chart
          _buildChartCard(
            context,
            title: "Weight Trend",
            subtitle: "Last 7 days",
            icon: "monitor_weight",
            color: const Color(0xFFE8B4B8),
            chart: _buildWeightChart(context, weeklyData),
          ),
          SizedBox(height: 2.h),

          // Blood pressure chart
          _buildChartCard(
            context,
            title: "Blood Pressure",
            subtitle: "Systolic readings",
            icon: "favorite",
            color: const Color(0xFFA8C4A2),
            chart: _buildBloodPressureChart(context, weeklyData),
          ),
          SizedBox(height: 2.h),

          // Health summary cards
          _buildHealthSummarySection(context),
          SizedBox(height: 3.h),

          // Export button
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text("Report exported successfully"),
                    duration: Duration(seconds: 2),
                  ),
                );
              },
              icon: CustomIconWidget(
                iconName: 'download',
                color: theme.colorScheme.onPrimary,
                size: 20,
              ),
              label: const Text("Export PDF Report"),
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(vertical: 1.5.h),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12.0),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChartCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required String icon,
    required Color color,
    required Widget chart,
  }) {
    final theme = Theme.of(context);

    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12.0),
        boxShadow: [
          BoxShadow(
            color: theme.colorScheme.shadow.withValues(alpha: 0.08),
            blurRadius: 8.0,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: EdgeInsets.all(2.w),
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: CustomIconWidget(
                  iconName: icon,
                  color: color,
                  size: 24,
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                    Text(
                      subtitle,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 3.h),
          chart,
        ],
      ),
    );
  }

  Widget _buildWeightChart(
      BuildContext context, List<Map<String, dynamic>> data) {
    final theme = Theme.of(context);

    return SizedBox(
      height: 200,
      child: Semantics(
        label: "Weight Trend Line Chart showing weekly weight measurements",
        child: LineChart(
          LineChartData(
            gridData: FlGridData(
              show: true,
              drawVerticalLine: false,
              horizontalInterval: 0.5,
              getDrawingHorizontalLine: (value) {
                return FlLine(
                  color: theme.colorScheme.outline.withValues(alpha: 0.2),
                  strokeWidth: 1,
                );
              },
            ),
            titlesData: FlTitlesData(
              leftTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  reservedSize: 40,
                  getTitlesWidget: (value, meta) {
                    return Text(
                      value.toStringAsFixed(1),
                      style: theme.textTheme.labelSmall,
                    );
                  },
                ),
              ),
              bottomTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  getTitlesWidget: (value, meta) {
                    if (value.toInt() >= 0 && value.toInt() < data.length) {
                      return Text(
                        data[value.toInt()]["day"] as String,
                        style: theme.textTheme.labelSmall,
                      );
                    }
                    return const Text("");
                  },
                ),
              ),
              rightTitles:
                  const AxisTitles(sideTitles: SideTitles(showTitles: false)),
              topTitles:
                  const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            ),
            borderData: FlBorderData(show: false),
            minX: 0,
            maxX: (data.length - 1).toDouble(),
            minY: 68.0,
            maxY: 70.0,
            lineBarsData: [
              LineChartBarData(
                spots: data.asMap().entries.map((entry) {
                  return FlSpot(
                    entry.key.toDouble(),
                    (entry.value["weight"] as double),
                  );
                }).toList(),
                isCurved: true,
                color: const Color(0xFFE8B4B8),
                barWidth: 3,
                isStrokeCapRound: true,
                dotData: FlDotData(
                  show: true,
                  getDotPainter: (spot, percent, barData, index) {
                    return FlDotCirclePainter(
                      radius: 4,
                      color: const Color(0xFFE8B4B8),
                      strokeWidth: 2,
                      strokeColor: theme.colorScheme.surface,
                    );
                  },
                ),
                belowBarData: BarAreaData(
                  show: true,
                  color: const Color(0xFFE8B4B8).withValues(alpha: 0.2),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBloodPressureChart(
      BuildContext context, List<Map<String, dynamic>> data) {
    final theme = Theme.of(context);

    return SizedBox(
      height: 200,
      child: Semantics(
        label: "Blood Pressure Bar Chart showing daily systolic readings",
        child: BarChart(
          BarChartData(
            alignment: BarChartAlignment.spaceAround,
            maxY: 130,
            minY: 110,
            barTouchData: BarTouchData(enabled: false),
            titlesData: FlTitlesData(
              leftTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  reservedSize: 40,
                  getTitlesWidget: (value, meta) {
                    return Text(
                      value.toInt().toString(),
                      style: theme.textTheme.labelSmall,
                    );
                  },
                ),
              ),
              bottomTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  getTitlesWidget: (value, meta) {
                    if (value.toInt() >= 0 && value.toInt() < data.length) {
                      return Text(
                        data[value.toInt()]["day"] as String,
                        style: theme.textTheme.labelSmall,
                      );
                    }
                    return const Text("");
                  },
                ),
              ),
              rightTitles:
                  const AxisTitles(sideTitles: SideTitles(showTitles: false)),
              topTitles:
                  const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            ),
            gridData: FlGridData(
              show: true,
              drawVerticalLine: false,
              horizontalInterval: 5,
              getDrawingHorizontalLine: (value) {
                return FlLine(
                  color: theme.colorScheme.outline.withValues(alpha: 0.2),
                  strokeWidth: 1,
                );
              },
            ),
            borderData: FlBorderData(show: false),
            barGroups: data.asMap().entries.map((entry) {
              return BarChartGroupData(
                x: entry.key,
                barRods: [
                  BarChartRodData(
                    toY: (entry.value["bloodPressure"] as int).toDouble(),
                    color: const Color(0xFFA8C4A2),
                    width: 16,
                    borderRadius:
                        const BorderRadius.vertical(top: Radius.circular(4)),
                  ),
                ],
              );
            }).toList(),
          ),
        ),
      ),
    );
  }

  Widget _buildHealthSummarySection(BuildContext context) {
    final theme = Theme.of(context);

    final List<Map<String, dynamic>> summaryData = [
      {
        "title": "Average Weight",
        "value": "69.0 kg",
        "change": "+0.7 kg",
        "isPositive": true,
        "icon": "monitor_weight",
        "color": const Color(0xFFE8B4B8),
      },
      {
        "title": "Average BP",
        "value": "119/78",
        "change": "Normal",
        "isPositive": true,
        "icon": "favorite",
        "color": const Color(0xFFA8C4A2),
      },
      {
        "title": "Habits Streak",
        "value": "7 days",
        "change": "Keep going!",
        "isPositive": true,
        "icon": "local_fire_department",
        "color": const Color(0xFFE8C4A0),
      },
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Health Summary",
          style: theme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        SizedBox(height: 2.h),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: summaryData.length,
          separatorBuilder: (context, index) => SizedBox(height: 1.5.h),
          itemBuilder: (context, index) {
            final item = summaryData[index];
            return Container(
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: (item["color"] as Color).withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12.0),
              ),
              child: Row(
                children: [
                  Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      color: item["color"] as Color,
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: CustomIconWidget(
                      iconName: item["icon"] as String,
                      color: Colors.white,
                      size: 24,
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          item["title"] as String,
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                        Text(
                          item["value"] as String,
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                            color: theme.colorScheme.onSurface,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                    decoration: BoxDecoration(
                      color: (item["isPositive"] as bool)
                          ? const Color(0xFFA8C4A2).withValues(alpha: 0.2)
                          : const Color(0xFFD4A5A5).withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: Text(
                      item["change"] as String,
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: (item["isPositive"] as bool)
                            ? const Color(0xFFA8C4A2)
                            : const Color(0xFFD4A5A5),
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ],
    );
  }
}
