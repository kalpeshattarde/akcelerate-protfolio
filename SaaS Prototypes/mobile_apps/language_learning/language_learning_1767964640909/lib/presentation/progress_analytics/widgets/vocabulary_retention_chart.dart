import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class VocabularyRetentionChart extends StatefulWidget {
  final List<Map<String, dynamic>> retentionData;

  const VocabularyRetentionChart({
    Key? key,
    required this.retentionData,
  }) : super(key: key);

  @override
  State<VocabularyRetentionChart> createState() =>
      _VocabularyRetentionChartState();
}

class _VocabularyRetentionChartState extends State<VocabularyRetentionChart>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
        duration: const Duration(milliseconds: 1000), vsync: this);
    _animation = Tween<double>(begin: 0.0, end: 1.0).animate(
        CurvedAnimation(parent: _animationController, curve: Curves.easeInOut));
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
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
            Text('Vocabulary Retention',
                style: AppTheme.lightTheme.textTheme.titleLarge
                    ?.copyWith(fontWeight: FontWeight.w600)),
            Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 0.5.h),
                decoration: BoxDecoration(
                    color:
                        AppTheme.lightTheme.primaryColor.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(12)),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  CustomIconWidget(
                      iconName: 'schedule',
                      size: 16,
                      color: AppTheme.lightTheme.primaryColor),
                  SizedBox(width: 1.w),
                  Text('Next Review: 2h',
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                          color: AppTheme.lightTheme.primaryColor,
                          fontWeight: FontWeight.w500)),
                ])),
          ]),
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
                            horizontalInterval: 20,
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
                                          widget.retentionData.length) {
                                        return Padding(
                                            padding: EdgeInsets.only(top: 1.h),
                                            child: Text(
                                                widget.retentionData[value
                                                        .toInt()][
                                                    'period'] as String,
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
                                    interval: 20,
                                    reservedSize: 40,
                                    getTitlesWidget: (value, meta) {
                                      return Text('${value.toInt()}%',
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
                        maxX: (widget.retentionData.length - 1).toDouble(),
                        minY: 0,
                        maxY: 100,
                        lineBarsData: [
                          LineChartBarData(
                              spots: widget.retentionData
                                  .asMap()
                                  .entries
                                  .map((entry) {
                                return FlSpot(
                                    entry.key.toDouble(),
                                    (entry.value['retention'] as double) *
                                        _animation.value);
                              }).toList(),
                              isCurved: true,
                              color: AppTheme.lightTheme.primaryColor,
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
                                  color: AppTheme.lightTheme.primaryColor
                                      .withValues(alpha: 0.1))),
                          // Forgetting curve reference line
                          LineChartBarData(
                              spots: widget.retentionData
                                  .asMap()
                                  .entries
                                  .map((entry) {
                                final forgettingCurve =
                                    100 * (1 - (entry.key * 0.15));
                                return FlSpot(
                                    entry.key.toDouble(),
                                    forgettingCurve.clamp(20.0, 100.0) *
                                        _animation.value);
                              }).toList(),
                              isCurved: true,
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant
                                  .withValues(alpha: 0.5),
                              barWidth: 2,
                              isStrokeCapRound: true,
                              dashArray: [5, 5],
                              dotData: const FlDotData(show: false),
                              belowBarData: BarAreaData(show: false)),
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
                                    if (barSpot.barIndex == 0) {
                                      return LineTooltipItem(
                                          '${barSpot.y.toInt()}% retention',
                                          AppTheme
                                              .lightTheme.textTheme.bodySmall!);
                                    }
                                    return null;
                                  }).toList();
                                }))));
                  })),
          SizedBox(height: 2.h),
          Row(children: [
            Container(
                width: 4.w, height: 2, color: AppTheme.lightTheme.primaryColor),
            SizedBox(width: 2.w),
            Text('Your Retention',
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant)),
            SizedBox(width: 4.w),
            Container(
                width: 4.w,
                height: 2,
                decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                        .withValues(alpha: 0.5)),
                child: CustomPaint(
                    painter: DashedLinePainter(
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                            .withValues(alpha: 0.5)))),
            SizedBox(width: 2.w),
            Text('Forgetting Curve',
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant)),
          ]),
        ]));
  }
}

class DashedLinePainter extends CustomPainter {
  final Color color;

  DashedLinePainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = 2;

    const dashWidth = 3.0;
    const dashSpace = 3.0;
    double startX = 0;

    while (startX < size.width) {
      canvas.drawLine(Offset(startX, size.height / 2),
          Offset(startX + dashWidth, size.height / 2), paint);
      startX += dashWidth + dashSpace;
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
