import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class GrowthProgressWidget extends StatelessWidget {
  final Map<String, dynamic> growthData;

  const GrowthProgressWidget({
    Key? key,
    required this.growthData,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final weightData =
        (growthData['weightHistory'] as List).cast<Map<String, dynamic>>();
    final heightData =
        (growthData['heightHistory'] as List).cast<Map<String, dynamic>>();

    return Container(
      width: double.infinity,
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow,
            blurRadius: 8,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  CustomIconWidget(
                    iconName: 'trending_up',
                    color: AppTheme.lightTheme.primaryColor,
                    size: 6.w,
                  ),
                  SizedBox(width: 2.w),
                  Text(
                    'Growth Progress',
                    style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
              GestureDetector(
                onTap: () => Navigator.pushNamed(context, '/growth-tracking'),
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  decoration: BoxDecoration(
                    color:
                        AppTheme.lightTheme.primaryColor.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    'View Details',
                    style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                      color: AppTheme.lightTheme.primaryColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 3.h),
          Row(
            children: [
              Expanded(
                child: _buildGrowthStat(
                  'Weight',
                  '${weightData.isNotEmpty ? weightData.last['value'] : 0} lbs',
                  weightData.length >= 2
                      ? (weightData.last['value'] as double) -
                          (weightData[weightData.length - 2]['value'] as double)
                      : 0.0,
                  AppTheme.lightTheme.colorScheme.secondary,
                ),
              ),
              SizedBox(width: 4.w),
              Expanded(
                child: _buildGrowthStat(
                  'Height',
                  '${heightData.isNotEmpty ? heightData.last['value'] : 0} in',
                  heightData.length >= 2
                      ? (heightData.last['value'] as double) -
                          (heightData[heightData.length - 2]['value'] as double)
                      : 0.0,
                  AppTheme.lightTheme.primaryColor,
                ),
              ),
            ],
          ),
          SizedBox(height: 3.h),
          Container(
            height: 20.h,
            child: weightData.isEmpty
                ? _buildEmptyChart(context)
                : LineChart(
                    LineChartData(
                      gridData: FlGridData(show: false),
                      titlesData: FlTitlesData(show: false),
                      borderData: FlBorderData(show: false),
                      lineBarsData: [
                        LineChartBarData(
                          spots: weightData.asMap().entries.map((entry) {
                            return FlSpot(entry.key.toDouble(),
                                entry.value['value'] as double);
                          }).toList(),
                          isCurved: true,
                          color: AppTheme.lightTheme.colorScheme.secondary,
                          barWidth: 3,
                          dotData: FlDotData(show: false),
                          belowBarData: BarAreaData(
                            show: true,
                            color: AppTheme.lightTheme.colorScheme.secondary
                                .withValues(alpha: 0.1),
                          ),
                        ),
                      ],
                      minY: weightData.isNotEmpty
                          ? weightData
                                  .map((e) => e['value'] as double)
                                  .reduce((a, b) => a < b ? a : b) -
                              1
                          : 0,
                      maxY: weightData.isNotEmpty
                          ? weightData
                                  .map((e) => e['value'] as double)
                                  .reduce((a, b) => a > b ? a : b) +
                              1
                          : 10,
                    ),
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildGrowthStat(
      String label, String value, double change, Color color) {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: color.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            value,
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
              color: color,
            ),
            overflow: TextOverflow.ellipsis,
          ),
          SizedBox(height: 0.5.h),
          Row(
            children: [
              CustomIconWidget(
                iconName: change >= 0 ? 'arrow_upward' : 'arrow_downward',
                color: change >= 0
                    ? AppTheme.getSuccessColor(true)
                    : AppTheme.getErrorColor(true),
                size: 3.w,
              ),
              SizedBox(width: 1.w),
              Text(
                '${change.abs().toStringAsFixed(1)}',
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: change >= 0
                      ? AppTheme.getSuccessColor(true)
                      : AppTheme.getErrorColor(true),
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyChart(BuildContext context) {
    return Container(
      width: double.infinity,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: 'show_chart',
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                .withValues(alpha: 0.5),
            size: 8.w,
          ),
          SizedBox(height: 1.h),
          Text(
            'No growth data yet',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
        ],
      ),
    );
  }
}
