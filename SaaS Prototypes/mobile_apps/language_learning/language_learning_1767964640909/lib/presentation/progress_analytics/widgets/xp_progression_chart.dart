import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class XpProgressionChart extends StatefulWidget {
  final List<Map<String, dynamic>> xpData;
  final int currentXp;
  final int nextLevelXp;

  const XpProgressionChart({
    Key? key,
    required this.xpData,
    required this.currentXp,
    required this.nextLevelXp,
  }) : super(key: key);

  @override
  State<XpProgressionChart> createState() => _XpProgressionChartState();
}

class _XpProgressionChartState extends State<XpProgressionChart>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
        duration: const Duration(milliseconds: 1500), vsync: this);
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
    final progressToNextLevel = (widget.currentXp % 1000) / 1000.0;
    final currentLevel = (widget.currentXp / 1000).floor() + 1;
    final averageXpPerDay = widget.xpData.isNotEmpty
        ? widget.xpData.map((e) => e['xp'] as int).reduce((a, b) => a + b) /
            widget.xpData.length
        : 0.0;

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
            Text('XP Progression',
                style: AppTheme.lightTheme.textTheme.titleLarge
                    ?.copyWith(fontWeight: FontWeight.w600)),
            Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                decoration: BoxDecoration(
                    gradient: LinearGradient(colors: [
                      AppTheme.lightTheme.primaryColor,
                      AppTheme.lightTheme.primaryColor.withValues(alpha: 0.8),
                    ], begin: Alignment.topLeft, end: Alignment.bottomRight),
                    borderRadius: BorderRadius.circular(20)),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  CustomIconWidget(
                      iconName: 'star', size: 16, color: Colors.white),
                  SizedBox(width: 1.w),
                  Text('Level $currentLevel',
                      style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                          color: Colors.white, fontWeight: FontWeight.w600)),
                ])),
          ]),
          SizedBox(height: 2.h),
          AnimatedBuilder(
              animation: _animation,
              builder: (context, child) {
                return Column(children: [
                  Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('${widget.currentXp} XP',
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                                    color: AppTheme.lightTheme.colorScheme
                                        .onSurfaceVariant)),
                        Text('${widget.nextLevelXp} XP',
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                                    color: AppTheme.lightTheme.colorScheme
                                        .onSurfaceVariant)),
                      ]),
                  SizedBox(height: 1.h),
                  LinearProgressIndicator(
                      value: progressToNextLevel * _animation.value,
                      backgroundColor: AppTheme.lightTheme.colorScheme.outline
                          .withValues(alpha: 0.2),
                      valueColor: AlwaysStoppedAnimation<Color>(
                          AppTheme.lightTheme.primaryColor),
                      minHeight: 8),
                ]);
              }),
          SizedBox(height: 3.h),
          SizedBox(
              height: 25.h,
              child: AnimatedBuilder(
                  animation: _animation,
                  builder: (context, child) {
                    return LineChart(LineChartData(
                        gridData: FlGridData(
                            show: true,
                            drawVerticalLine: false,
                            horizontalInterval: 100,
                            getDrawingHorizontalLine: (value) {
                              return FlLine(
                                  color: AppTheme.lightTheme.colorScheme.outline
                                      .withValues(alpha: 0.2),
                                  strokeWidth: 1);
                            }),
                        titlesData: FlTitlesData(
                            show: true,
                            rightTitles: const AxisTitles(
                                sideTitles: SideTitles(showTitles: false)),
                            topTitles: const AxisTitles(
                                sideTitles: SideTitles(showTitles: false)),
                            bottomTitles: AxisTitles(
                                sideTitles: SideTitles(
                                    showTitles: true,
                                    reservedSize: 30,
                                    interval: 1,
                                    getTitlesWidget: (value, meta) {
                                      if (value.toInt() <
                                          widget.xpData.length) {
                                        return Padding(
                                            padding: EdgeInsets.only(top: 1.h),
                                            child: Text(
                                                widget.xpData[value.toInt()]
                                                    ['day'] as String,
                                                style: AppTheme.lightTheme
                                                    .textTheme.bodySmall
                                                    ?.copyWith(
                                                        color: AppTheme
                                                            .lightTheme
                                                            .colorScheme
                                                            .onSurfaceVariant,
                                                        fontSize: 10.sp)));
                                      }
                                      return const Text('');
                                    })),
                            leftTitles: AxisTitles(
                                sideTitles: SideTitles(
                                    showTitles: true,
                                    interval: 100,
                                    reservedSize: 40,
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
                                    }))),
                        borderData: FlBorderData(show: false),
                        minX: 0,
                        maxX: (widget.xpData.length - 1).toDouble(),
                        minY: 0,
                        maxY: widget.xpData
                                .map((e) => e['xp'] as int)
                                .reduce((a, b) => a > b ? a : b)
                                .toDouble() *
                            1.2,
                        lineBarsData: [
                          LineChartBarData(
                              spots: widget.xpData.asMap().entries.map((entry) {
                                return FlSpot(
                                    entry.key.toDouble(),
                                    (entry.value['xp'] as int).toDouble() *
                                        _animation.value);
                              }).toList(),
                              isCurved: true,
                              gradient: LinearGradient(
                                  colors: [
                                    AppTheme.lightTheme.primaryColor,
                                    AppTheme.lightTheme.colorScheme.tertiary,
                                  ],
                                  begin: Alignment.centerLeft,
                                  end: Alignment.centerRight),
                              barWidth: 3,
                              isStrokeCapRound: true,
                              dotData: FlDotData(
                                  show: true,
                                  getDotPainter:
                                      (spot, percent, barData, index) {
                                    return FlDotCirclePainter(
                                        radius: 4,
                                        color: AppTheme
                                            .lightTheme.colorScheme.surface,
                                        strokeWidth: 2,
                                        strokeColor:
                                            AppTheme.lightTheme.primaryColor);
                                  }),
                              belowBarData: BarAreaData(
                                  show: true,
                                  gradient: LinearGradient(
                                      colors: [
                                        AppTheme.lightTheme.primaryColor
                                            .withValues(alpha: 0.2),
                                        AppTheme.lightTheme.colorScheme.tertiary
                                            .withValues(alpha: 0.1),
                                      ],
                                      begin: Alignment.topCenter,
                                      end: Alignment.bottomCenter))),
                        ],
                        lineTouchData: LineTouchData(
                            enabled: true,
                            touchTooltipData: LineTouchTooltipData(
                                tooltipBorder: BorderSide(
                                    color: AppTheme
                                        .lightTheme.colorScheme.outline
                                        .withValues(alpha: 0.3)),
                                getTooltipItems:
                                    (List<LineBarSpot> touchedBarSpots) {
                                  return touchedBarSpots.map((barSpot) {
                                    return LineTooltipItem(
                                        '${barSpot.y.toInt()} XP',
                                        AppTheme
                                            .lightTheme.textTheme.bodySmall!);
                                  }).toList();
                                }))));
                  })),
          SizedBox(height: 2.h),
          Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
            _buildXpStat('Total XP', '${widget.currentXp}'),
            _buildXpStat('Daily Avg', '${averageXpPerDay.round()}'),
            _buildXpStat('To Next Level',
                '${widget.nextLevelXp - (widget.currentXp % 1000)}'),
          ]),
        ]));
  }

  Widget _buildXpStat(String label, String value) {
    return Column(children: [
      Text(value,
          style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
              color: AppTheme.lightTheme.primaryColor,
              fontWeight: FontWeight.w600)),
      SizedBox(height: 0.5.h),
      Text(label,
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant)),
    ]);
  }
}
