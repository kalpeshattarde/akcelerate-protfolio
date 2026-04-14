import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class MacroProgressWidget extends StatelessWidget {
  final Map<String, dynamic> macroData;

  const MacroProgressWidget({
    Key? key,
    required this.macroData,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final carbsProgress = (macroData['carbs']['consumed'] as double) /
        (macroData['carbs']['target'] as double);
    final proteinProgress = (macroData['protein']['consumed'] as double) /
        (macroData['protein']['target'] as double);
    final fatsProgress = (macroData['fats']['consumed'] as double) /
        (macroData['fats']['target'] as double);

    return Container(
      padding: EdgeInsets.all(4.w),
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Theme.of(context).colorScheme.shadow,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Macronutrients',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  fontSize: 14.sp,
                ),
          ),
          SizedBox(height: 2.h),
          _buildMacroRow(
            context,
            'Carbs',
            carbsProgress,
            '${macroData['carbs']['consumed'].toInt()}g',
            '${macroData['carbs']['target'].toInt()}g',
            AppTheme.waterAccent,
          ),
          SizedBox(height: 1.5.h),
          _buildMacroRow(
            context,
            'Protein',
            proteinProgress,
            '${macroData['protein']['consumed'].toInt()}g',
            '${macroData['protein']['target'].toInt()}g',
            AppTheme.successState,
          ),
          SizedBox(height: 1.5.h),
          _buildMacroRow(
            context,
            'Fats',
            fatsProgress,
            '${macroData['fats']['consumed'].toInt()}g',
            '${macroData['fats']['target'].toInt()}g',
            AppTheme.warningState,
          ),
        ],
      ),
    );
  }

  Widget _buildMacroRow(
    BuildContext context,
    String name,
    double progress,
    String consumed,
    String target,
    Color color,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              name,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w500,
                    fontSize: 12.sp,
                  ),
            ),
            Text(
              '$consumed / $target',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                    fontSize: 10.sp,
                  ),
            ),
          ],
        ),
        SizedBox(height: 0.5.h),
        Container(
          height: 1.h,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(0.5.h),
            color: color.withValues(alpha: 0.2),
          ),
          child: FractionallySizedBox(
            alignment: Alignment.centerLeft,
            widthFactor: progress.clamp(0.0, 1.0),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(0.5.h),
                color: color,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
