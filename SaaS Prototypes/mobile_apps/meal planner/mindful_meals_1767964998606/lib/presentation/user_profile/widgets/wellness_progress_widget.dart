import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class WellnessProgressWidget extends StatelessWidget {
  final double mindfulEatingProgress;
  final double mealPlanningProgress;
  final double seasonalEatingProgress;

  const WellnessProgressWidget({
    Key? key,
    required this.mindfulEatingProgress,
    required this.mealPlanningProgress,
    required this.seasonalEatingProgress,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: double.infinity,
          height: 25.h,
          child: Semantics(
            label:
                "Wellness Progress Chart showing mindful eating, meal planning, and seasonal eating progress",
            child: PieChart(
              PieChartData(
                sections: [
                  PieChartSectionData(
                    value: mindfulEatingProgress,
                    color: AppTheme.lightTheme.colorScheme.primary,
                    title: '${mindfulEatingProgress.toInt()}%',
                    radius: 8.w,
                    titleStyle:
                        Theme.of(context).textTheme.labelMedium?.copyWith(
                              color: AppTheme.lightTheme.colorScheme.onPrimary,
                              fontWeight: FontWeight.w600,
                            ),
                  ),
                  PieChartSectionData(
                    value: mealPlanningProgress,
                    color: AppTheme.lightTheme.colorScheme.secondary,
                    title: '${mealPlanningProgress.toInt()}%',
                    radius: 8.w,
                    titleStyle: Theme.of(context)
                        .textTheme
                        .labelMedium
                        ?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.onSecondary,
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                  PieChartSectionData(
                    value: seasonalEatingProgress,
                    color: AppTheme.lightTheme.colorScheme.tertiary,
                    title: '${seasonalEatingProgress.toInt()}%',
                    radius: 8.w,
                    titleStyle:
                        Theme.of(context).textTheme.labelMedium?.copyWith(
                              color: AppTheme.lightTheme.colorScheme.onTertiary,
                              fontWeight: FontWeight.w600,
                            ),
                  ),
                ],
                centerSpaceRadius: 12.w,
                sectionsSpace: 2,
              ),
            ),
          ),
        ),
        SizedBox(height: 2.h),
        _buildProgressLegend(context),
      ],
    );
  }

  Widget _buildProgressLegend(BuildContext context) {
    return Column(
      children: [
        _buildLegendItem(
          context,
          'Mindful Eating',
          AppTheme.lightTheme.colorScheme.primary,
          mindfulEatingProgress,
        ),
        SizedBox(height: 1.h),
        _buildLegendItem(
          context,
          'Meal Planning',
          AppTheme.lightTheme.colorScheme.secondary,
          mealPlanningProgress,
        ),
        SizedBox(height: 1.h),
        _buildLegendItem(
          context,
          'Seasonal Eating',
          AppTheme.lightTheme.colorScheme.tertiary,
          seasonalEatingProgress,
        ),
      ],
    );
  }

  Widget _buildLegendItem(
      BuildContext context, String label, Color color, double progress) {
    return Row(
      children: [
        Container(
          width: 3.w,
          height: 3.w,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
          ),
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: Text(
            label,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                ),
          ),
        ),
        Text(
          '${progress.toInt()}%',
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurface,
                fontWeight: FontWeight.w600,
              ),
        ),
      ],
    );
  }
}
