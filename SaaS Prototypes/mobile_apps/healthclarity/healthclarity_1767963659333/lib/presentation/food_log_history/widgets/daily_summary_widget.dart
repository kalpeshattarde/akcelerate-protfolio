import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class DailySummaryWidget extends StatelessWidget {
  final double totalCalories;
  final double calorieGoal;
  final double totalCarbs;
  final double totalProtein;
  final double totalFats;
  final double carbGoal;
  final double proteinGoal;
  final double fatGoal;

  const DailySummaryWidget({
    super.key,
    required this.totalCalories,
    required this.calorieGoal,
    required this.totalCarbs,
    required this.totalProtein,
    required this.totalFats,
    required this.carbGoal,
    required this.proteinGoal,
    required this.fatGoal,
  });

  @override
  Widget build(BuildContext context) {
    final calorieProgress = totalCalories / calorieGoal;
    final carbProgress = totalCarbs / carbGoal;
    final proteinProgress = totalProtein / proteinGoal;
    final fatProgress = totalFats / fatGoal;

    return Card(
      margin: EdgeInsets.all(4.w),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Daily Summary',
              style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 2.h),

            // Calorie Progress
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Calories',
                  style: AppTheme.lightTheme.textTheme.titleMedium,
                ),
                Text(
                  '${totalCalories.toStringAsFixed(0)} / ${calorieGoal.toStringAsFixed(0)} kcal',
                  style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                    color: AppTheme.calorieAccent,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            SizedBox(height: 1.h),
            LinearProgressIndicator(
              value: calorieProgress.clamp(0.0, 1.0),
              backgroundColor: AppTheme.calorieAccent.withValues(alpha: 0.2),
              valueColor: AlwaysStoppedAnimation<Color>(AppTheme.calorieAccent),
              minHeight: 1.h,
            ),
            SizedBox(height: 2.h),

            // Macro Breakdown
            Text(
              'Macronutrients',
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 1.h),

            // Carbs Progress
            _buildMacroProgress(
              'Carbohydrates',
              totalCarbs,
              carbGoal,
              carbProgress,
              AppTheme.waterAccent,
            ),
            SizedBox(height: 1.h),

            // Protein Progress
            _buildMacroProgress(
              'Protein',
              totalProtein,
              proteinGoal,
              proteinProgress,
              AppTheme.successState,
            ),
            SizedBox(height: 1.h),

            // Fats Progress
            _buildMacroProgress(
              'Fats',
              totalFats,
              fatGoal,
              fatProgress,
              AppTheme.warningState,
            ),
            SizedBox(height: 2.h),

            // Macro Distribution Chart
            _buildMacroDistribution(),
          ],
        ),
      ),
    );
  }

  Widget _buildMacroProgress(
    String label,
    double current,
    double goal,
    double progress,
    Color color,
  ) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: AppTheme.lightTheme.textTheme.bodyLarge,
            ),
            Text(
              '${current.toStringAsFixed(0)}g / ${goal.toStringAsFixed(0)}g',
              style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                color: color,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
        SizedBox(height: 0.5.h),
        LinearProgressIndicator(
          value: progress.clamp(0.0, 1.0),
          backgroundColor: color.withValues(alpha: 0.2),
          valueColor: AlwaysStoppedAnimation<Color>(color),
          minHeight: 0.8.h,
        ),
      ],
    );
  }

  Widget _buildMacroDistribution() {
    final totalMacros = totalCarbs + totalProtein + totalFats;

    if (totalMacros == 0) {
      return Container(
        height: 3.h,
        decoration: BoxDecoration(
          color: AppTheme.neutralGray.withValues(alpha: 0.2),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Center(
          child: Text(
            'No macros logged yet',
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.neutralGray,
            ),
          ),
        ),
      );
    }

    final carbPercentage = (totalCarbs / totalMacros) * 100;
    final proteinPercentage = (totalProtein / totalMacros) * 100;
    final fatPercentage = (totalFats / totalMacros) * 100;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Macro Distribution',
          style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 1.h),
        Container(
          height: 3.h,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Row(
              children: [
                if (carbPercentage > 0)
                  Expanded(
                    flex: carbPercentage.round(),
                    child: Container(color: AppTheme.waterAccent),
                  ),
                if (proteinPercentage > 0)
                  Expanded(
                    flex: proteinPercentage.round(),
                    child: Container(color: AppTheme.successState),
                  ),
                if (fatPercentage > 0)
                  Expanded(
                    flex: fatPercentage.round(),
                    child: Container(color: AppTheme.warningState),
                  ),
              ],
            ),
          ),
        ),
        SizedBox(height: 1.h),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildMacroLegend('Carbs', carbPercentage, AppTheme.waterAccent),
            _buildMacroLegend(
                'Protein', proteinPercentage, AppTheme.successState),
            _buildMacroLegend('Fats', fatPercentage, AppTheme.warningState),
          ],
        ),
      ],
    );
  }

  Widget _buildMacroLegend(String label, double percentage, Color color) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 3.w,
          height: 3.w,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
          ),
        ),
        SizedBox(width: 1.w),
        Text(
          '$label ${percentage.toStringAsFixed(0)}%',
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}
