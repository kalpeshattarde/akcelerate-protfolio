import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class GoalSettingSection extends StatefulWidget {
  final int? targetValue;
  final String selectedUnit;
  final Function(int?) onTargetChanged;
  final Function(String) onUnitChanged;

  const GoalSettingSection({
    super.key,
    this.targetValue,
    required this.selectedUnit,
    required this.onTargetChanged,
    required this.onUnitChanged,
  });

  @override
  State<GoalSettingSection> createState() => _GoalSettingSectionState();
}

class _GoalSettingSectionState extends State<GoalSettingSection> {
  final List<String> units = [
    'times',
    'minutes',
    'hours',
    'pages',
    'glasses',
    'steps',
    'km',
    'miles',
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              'Goal Setting',
              style: theme.textTheme.titleMedium?.copyWith(
                color: isDark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(width: 2.w),
            Text(
              '(Optional)',
              style: theme.textTheme.bodySmall?.copyWith(
                color: isDark
                    ? AppTheme.textSecondaryDark
                    : AppTheme.textSecondaryLight,
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ),
        SizedBox(height: 2.h),
        Container(
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
            ),
            boxShadow: [
              BoxShadow(
                color: isDark
                    ? Colors.white.withValues(alpha: 0.05)
                    : Colors.black.withValues(alpha: 0.08),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            children: [
              _buildTargetValueSection(context, isDark),
              SizedBox(height: 3.h),
              _buildUnitSelector(context, isDark),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTargetValueSection(BuildContext context, bool isDark) {
    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Target Value',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: isDark
                          ? AppTheme.textPrimaryDark
                          : AppTheme.textPrimaryLight,
                      fontWeight: FontWeight.w500,
                    ),
              ),
              SizedBox(height: 1.h),
              Container(
                height: 6.h,
                decoration: BoxDecoration(
                  color: isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
                  ),
                ),
                child: Row(
                  children: [
                    _buildStepperButton(
                      context,
                      CustomIconWidget(
                        iconName: 'remove',
                        size: 5.w,
                        color: isDark
                            ? AppTheme.textPrimaryDark
                            : AppTheme.textPrimaryLight,
                      ),
                      () => _decrementTarget(),
                      isDark,
                    ),
                    Expanded(
                      child: Center(
                        child: Text(
                          widget.targetValue?.toString() ?? '0',
                          style:
                              Theme.of(context).textTheme.titleLarge?.copyWith(
                                    color: isDark
                                        ? AppTheme.textPrimaryDark
                                        : AppTheme.textPrimaryLight,
                                    fontWeight: FontWeight.w600,
                                  ),
                        ),
                      ),
                    ),
                    _buildStepperButton(
                      context,
                      CustomIconWidget(
                        iconName: 'add',
                        size: 5.w,
                        color: isDark
                            ? AppTheme.textPrimaryDark
                            : AppTheme.textPrimaryLight,
                      ),
                      () => _incrementTarget(),
                      isDark,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildStepperButton(
    BuildContext context,
    Widget icon,
    VoidCallback onPressed,
    bool isDark,
  ) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {
          HapticFeedback.lightImpact();
          onPressed();
        },
        borderRadius: BorderRadius.circular(8),
        child: Container(
          width: 12.w,
          height: 6.h,
          decoration: BoxDecoration(
            border: Border(
              right: BorderSide(
                color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
                width: 1,
              ),
            ),
          ),
          child: Center(child: icon),
        ),
      ),
    );
  }

  Widget _buildUnitSelector(BuildContext context, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Unit',
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: isDark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                fontWeight: FontWeight.w500,
              ),
        ),
        SizedBox(height: 1.h),
        Container(
          width: double.infinity,
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
          decoration: BoxDecoration(
            color: isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
            ),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: widget.selectedUnit,
              isExpanded: true,
              icon: CustomIconWidget(
                iconName: 'keyboard_arrow_down',
                size: 6.w,
                color: isDark
                    ? AppTheme.textSecondaryDark
                    : AppTheme.textSecondaryLight,
              ),
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                  ),
              dropdownColor:
                  isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
              items: units.map((String unit) {
                return DropdownMenuItem<String>(
                  value: unit,
                  child: Text(
                    unit,
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          color: isDark
                              ? AppTheme.textPrimaryDark
                              : AppTheme.textPrimaryLight,
                        ),
                  ),
                );
              }).toList(),
              onChanged: (String? newValue) {
                if (newValue != null) {
                  HapticFeedback.lightImpact();
                  widget.onUnitChanged(newValue);
                }
              },
            ),
          ),
        ),
      ],
    );
  }

  void _incrementTarget() {
    final currentValue = widget.targetValue ?? 0;
    widget.onTargetChanged(currentValue + 1);
  }

  void _decrementTarget() {
    final currentValue = widget.targetValue ?? 0;
    if (currentValue > 0) {
      widget.onTargetChanged(currentValue - 1);
    }
  }
}
