import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SleepQualitySelectorWidget extends StatelessWidget {
  final String? selectedQuality;
  final Function(String) onQualitySelected;

  const SleepQualitySelectorWidget({
    Key? key,
    this.selectedQuality,
    required this.onQualitySelected,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final qualities = [
      {
        'value': 'peaceful',
        'label': 'Peaceful',
        'icon': 'sentiment_satisfied',
        'color': AppTheme.getSuccessColor(true),
      },
      {
        'value': 'normal',
        'label': 'Normal',
        'icon': 'sentiment_neutral',
        'color': AppTheme.lightTheme.colorScheme.primary,
      },
      {
        'value': 'restless',
        'label': 'Restless',
        'icon': 'sentiment_dissatisfied',
        'color': AppTheme.getWarningColor(true),
      },
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Sleep Quality',
          style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        Row(
          children: qualities.map((quality) {
            final isSelected = selectedQuality == quality['value'];
            final color = quality['color'] as Color;

            return Expanded(
              child: GestureDetector(
                onTap: () => onQualitySelected(quality['value'] as String),
                child: Container(
                  margin: EdgeInsets.symmetric(horizontal: 1.w),
                  padding: EdgeInsets.symmetric(vertical: 2.h),
                  decoration: BoxDecoration(
                    color: isSelected
                        ? color.withValues(alpha: 0.1)
                        : AppTheme.lightTheme.colorScheme.surface,
                    borderRadius: BorderRadius.circular(3.w),
                    border: Border.all(
                      color: isSelected
                          ? color
                          : AppTheme.lightTheme.colorScheme.outline
                              .withValues(alpha: 0.3),
                      width: isSelected ? 2 : 1,
                    ),
                  ),
                  child: Column(
                    children: [
                      CustomIconWidget(
                        iconName: quality['icon'] as String,
                        color: isSelected
                            ? color
                            : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                        size: 6.w,
                      ),
                      SizedBox(height: 1.h),
                      Text(
                        quality['label'] as String,
                        style:
                            AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                          color: isSelected
                              ? color
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                          fontWeight:
                              isSelected ? FontWeight.w600 : FontWeight.w400,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}
