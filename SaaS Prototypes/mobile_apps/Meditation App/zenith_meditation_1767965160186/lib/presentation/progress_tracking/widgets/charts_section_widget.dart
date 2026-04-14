import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class ChartsSectionWidget extends StatefulWidget {
  final List<Map<String, dynamic>> weeklyData;
  final List<Map<String, dynamic>> durationTrends;
  final List<Map<String, dynamic>> moodData;

  const ChartsSectionWidget({
    Key? key,
    required this.weeklyData,
    required this.durationTrends,
    required this.moodData,
  }) : super(key: key);

  @override
  State<ChartsSectionWidget> createState() => _ChartsSectionWidgetState();
}

class _ChartsSectionWidgetState extends State<ChartsSectionWidget>
    with TickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow,
            blurRadius: 15,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(4.w),
            child: TabBar(
              controller: _tabController,
              tabs: const [
                Tab(text: 'Weekly'),
                Tab(text: 'Duration'),
                Tab(text: 'Mood'),
              ],
            ),
          ),
          SizedBox(
            height: 35.h,
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildWeeklyChart(),
                _buildDurationChart(),
                _buildMoodChart(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildWeeklyChart() {
    return Container(
      padding: EdgeInsets.all(4.w),
      child: Semantics(
        label: "Weekly Meditation Frequency Bar Chart",
        child: BarChart(
          BarChartData(
            alignment: BarChartAlignment.spaceAround,
            maxY: 60,
            barTouchData: BarTouchData(enabled: true),
            titlesData: FlTitlesData(
              show: true,
              bottomTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  getTitlesWidget: (value, meta) {
                    const days = [
                      'Mon',
                      'Tue',
                      'Wed',
                      'Thu',
                      'Fri',
                      'Sat',
                      'Sun'
                    ];
                    return Text(
                      days[value.toInt() % days.length],
                      style: AppTheme.lightTheme.textTheme.bodySmall,
                    );
                  },
                ),
              ),
              leftTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  getTitlesWidget: (value, meta) {
                    return Text(
                      '${value.toInt()}m',
                      style: AppTheme.lightTheme.textTheme.bodySmall,
                    );
                  },
                ),
              ),
              topTitles:
                  const AxisTitles(sideTitles: SideTitles(showTitles: false)),
              rightTitles:
                  const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            ),
            borderData: FlBorderData(show: false),
            barGroups: widget.weeklyData.asMap().entries.map((entry) {
              return BarChartGroupData(
                x: entry.key,
                barRods: [
                  BarChartRodData(
                    toY: (entry.value['minutes'] as num).toDouble(),
                    color: AppTheme.lightTheme.colorScheme.secondary,
                    width: 4.w,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ],
              );
            }).toList(),
          ),
        ),
      ),
    );
  }

  Widget _buildDurationChart() {
    return Container(
      padding: EdgeInsets.all(4.w),
      child: Semantics(
        label: "Session Duration Trends Line Chart",
        child: LineChart(
          LineChartData(
            gridData: const FlGridData(show: true),
            titlesData: FlTitlesData(
              show: true,
              bottomTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  getTitlesWidget: (value, meta) {
                    return Text(
                      'Week ${value.toInt() + 1}',
                      style: AppTheme.lightTheme.textTheme.bodySmall,
                    );
                  },
                ),
              ),
              leftTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  getTitlesWidget: (value, meta) {
                    return Text(
                      '${value.toInt()}m',
                      style: AppTheme.lightTheme.textTheme.bodySmall,
                    );
                  },
                ),
              ),
              topTitles:
                  const AxisTitles(sideTitles: SideTitles(showTitles: false)),
              rightTitles:
                  const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            ),
            borderData: FlBorderData(show: false),
            lineBarsData: [
              LineChartBarData(
                spots: widget.durationTrends.asMap().entries.map((entry) {
                  return FlSpot(
                    entry.key.toDouble(),
                    (entry.value['duration'] as num).toDouble(),
                  );
                }).toList(),
                isCurved: true,
                color: AppTheme.lightTheme.colorScheme.secondary,
                barWidth: 3,
                dotData: const FlDotData(show: true),
                belowBarData: BarAreaData(
                  show: true,
                  color: AppTheme.lightTheme.colorScheme.secondary
                      .withValues(alpha: 0.2),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMoodChart() {
    return Container(
      padding: EdgeInsets.all(4.w),
      child: Semantics(
        label: "Mood Tracking Correlation Pie Chart",
        child: PieChart(
          PieChartData(
            sections: widget.moodData.map((mood) {
              return PieChartSectionData(
                value: (mood['percentage'] as num).toDouble(),
                title: '${mood['percentage']}%',
                color: _getMoodColor(mood['mood'] as String),
                radius: 15.w,
                titleStyle: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              );
            }).toList(),
            centerSpaceRadius: 8.w,
            sectionsSpace: 2,
          ),
        ),
      ),
    );
  }

  Color _getMoodColor(String mood) {
    switch (mood.toLowerCase()) {
      case 'calm':
        return AppTheme.lightTheme.colorScheme.tertiary;
      case 'focused':
        return AppTheme.lightTheme.colorScheme.secondary;
      case 'relaxed':
        return AppTheme.lightTheme.colorScheme.primary;
      case 'energized':
        return Colors.orange;
      default:
        return AppTheme.lightTheme.colorScheme.outline;
    }
  }
}
