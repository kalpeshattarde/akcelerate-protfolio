import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class TimerPresetWidget extends StatelessWidget {
  final int selectedDuration;
  final Function(int) onDurationSelected;
  final VoidCallback onCustomTimePressed;

  const TimerPresetWidget({
    Key? key,
    required this.selectedDuration,
    required this.onDurationSelected,
    required this.onCustomTimePressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final presetDurations = [
      {'minutes': 10, 'label': '10 min'},
      {'minutes': 15, 'label': '15 min'},
      {'minutes': 20, 'label': '20 min'},
    ];

    return Container(
      width: 80.w,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(3.w),
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.08),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Timer Duration',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              fontSize: 12.sp,
              color: AppTheme.lightTheme.colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 2.h),
          Row(
            children: [
              ...presetDurations.map((preset) {
                final minutes = preset['minutes'] as int;
                final label = preset['label'] as String;
                final isSelected = selectedDuration == minutes * 60;

                return Expanded(
                  child: Container(
                    margin: EdgeInsets.only(right: 2.w),
                    child: Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: () => onDurationSelected(minutes * 60),
                        borderRadius: BorderRadius.circular(2.w),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          padding: EdgeInsets.symmetric(vertical: 2.h),
                          decoration: BoxDecoration(
                            color: isSelected
                                ? AppTheme.lightTheme.colorScheme.primary
                                : AppTheme.lightTheme.colorScheme.outline
                                    .withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(2.w),
                            border: Border.all(
                              color: isSelected
                                  ? AppTheme.lightTheme.colorScheme.primary
                                  : AppTheme.lightTheme.colorScheme.outline
                                      .withValues(alpha: 0.3),
                              width: 1,
                            ),
                          ),
                          child: Text(
                            label,
                            textAlign: TextAlign.center,
                            style: AppTheme.lightTheme.textTheme.bodyMedium
                                ?.copyWith(
                              fontSize: 11.sp,
                              fontWeight: isSelected
                                  ? FontWeight.w600
                                  : FontWeight.w400,
                              color: isSelected
                                  ? AppTheme.lightTheme.colorScheme.onPrimary
                                  : AppTheme.lightTheme.colorScheme.onSurface,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              }).toList(),
            ],
          ),
          SizedBox(height: 2.h),
          Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: onCustomTimePressed,
              borderRadius: BorderRadius.circular(2.w),
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(vertical: 2.h),
                decoration: BoxDecoration(
                  color: Colors.transparent,
                  borderRadius: BorderRadius.circular(2.w),
                  border: Border.all(
                    color: AppTheme.lightTheme.colorScheme.outline
                        .withValues(alpha: 0.3),
                    width: 1,
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CustomIconWidget(
                      iconName: 'schedule',
                      size: 4.w,
                      color: AppTheme.lightTheme.colorScheme.primary,
                    ),
                    SizedBox(width: 2.w),
                    Text(
                      'Custom Time',
                      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                        fontSize: 11.sp,
                        color: AppTheme.lightTheme.colorScheme.primary,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
