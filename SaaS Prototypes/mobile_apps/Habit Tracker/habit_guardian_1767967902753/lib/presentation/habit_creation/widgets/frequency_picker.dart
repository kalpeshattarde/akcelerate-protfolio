import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class FrequencyPicker extends StatefulWidget {
  final String selectedFrequency;
  final List<String> customDays;
  final Function(String) onFrequencyChanged;
  final Function(List<String>) onCustomDaysChanged;

  const FrequencyPicker({
    super.key,
    required this.selectedFrequency,
    required this.customDays,
    required this.onFrequencyChanged,
    required this.onCustomDaysChanged,
  });

  @override
  State<FrequencyPicker> createState() => _FrequencyPickerState();
}

class _FrequencyPickerState extends State<FrequencyPicker>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late Animation<double> _breathingAnimation;

  final List<String> frequencies = ['Daily', 'Weekly', 'Custom'];
  final List<String> weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  @override
  void initState() {
    super.initState();
    _initializeBreathingAnimation();
  }

  void _initializeBreathingAnimation() {
    _breathingController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    );

    _breathingAnimation = Tween<double>(
      begin: 0.98,
      end: 1.02,
    ).animate(CurvedAnimation(
      parent: _breathingController,
      curve: Curves.easeInOut,
    ));

    _breathingController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _breathingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Frequency',
          style: theme.textTheme.titleMedium?.copyWith(
            color:
                isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        _buildFrequencyOptions(context, isDark),
        if (widget.selectedFrequency == 'Custom') ...[
          SizedBox(height: 3.h),
          _buildCustomDaySelector(context, isDark),
        ],
      ],
    );
  }

  Widget _buildFrequencyOptions(BuildContext context, bool isDark) {
    return Container(
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
        children: frequencies.map((frequency) {
          final isSelected = widget.selectedFrequency == frequency;
          final isLast = frequency == frequencies.last;

          return Column(
            children: [
              Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () {
                    HapticFeedback.lightImpact();
                    widget.onFrequencyChanged(frequency);
                  },
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    width: double.infinity,
                    padding:
                        EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                    child: Row(
                      children: [
                        Radio<String>(
                          value: frequency,
                          groupValue: widget.selectedFrequency,
                          onChanged: (value) {
                            if (value != null) {
                              HapticFeedback.lightImpact();
                              widget.onFrequencyChanged(value);
                            }
                          },
                          activeColor: isDark
                              ? AppTheme.secondaryDark
                              : AppTheme.secondaryLight,
                        ),
                        SizedBox(width: 3.w),
                        Expanded(
                          child: Text(
                            frequency,
                            style:
                                Theme.of(context).textTheme.bodyLarge?.copyWith(
                                      color: isSelected
                                          ? (isDark
                                              ? AppTheme.secondaryDark
                                              : AppTheme.secondaryLight)
                                          : (isDark
                                              ? AppTheme.textPrimaryDark
                                              : AppTheme.textPrimaryLight),
                                      fontWeight: isSelected
                                          ? FontWeight.w600
                                          : FontWeight.w400,
                                    ),
                          ),
                        ),
                        if (isSelected)
                          CustomIconWidget(
                            iconName: 'check_circle',
                            size: 5.w,
                            color: isDark
                                ? AppTheme.secondaryDark
                                : AppTheme.secondaryLight,
                          ),
                      ],
                    ),
                  ),
                ),
              ),
              if (!isLast)
                Divider(
                  height: 1,
                  color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
                ),
            ],
          );
        }).toList(),
      ),
    );
  }

  Widget _buildCustomDaySelector(BuildContext context, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Select Days',
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
                color: isDark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                fontWeight: FontWeight.w500,
              ),
        ),
        SizedBox(height: 2.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: weekDays.map((day) {
            final isSelected = widget.customDays.contains(day);

            return AnimatedBuilder(
              animation: _breathingAnimation,
              builder: (context, child) {
                return Transform.scale(
                  scale: isSelected ? _breathingAnimation.value : 1.0,
                  child: GestureDetector(
                    onTap: () {
                      HapticFeedback.lightImpact();
                      final updatedDays = List<String>.from(widget.customDays);
                      if (isSelected) {
                        updatedDays.remove(day);
                      } else {
                        updatedDays.add(day);
                      }
                      widget.onCustomDaysChanged(updatedDays);
                    },
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                      padding: EdgeInsets.symmetric(
                          horizontal: 4.w, vertical: 1.5.h),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? (isDark
                                ? AppTheme.accentDark
                                : AppTheme.accentLight)
                            : (isDark
                                ? AppTheme.surfaceDark
                                : AppTheme.surfaceLight),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: isSelected
                              ? (isDark
                                  ? AppTheme.accentDark
                                  : AppTheme.accentLight)
                              : (isDark
                                  ? AppTheme.borderDark
                                  : AppTheme.borderLight),
                          width: 1.5,
                        ),
                        boxShadow: isSelected
                            ? [
                                BoxShadow(
                                  color: (isDark
                                          ? AppTheme.accentDark
                                          : AppTheme.accentLight)
                                      .withValues(alpha: 0.3),
                                  blurRadius: 8,
                                  offset: const Offset(0, 2),
                                ),
                              ]
                            : null,
                      ),
                      child: Text(
                        day.substring(0, 3),
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: isSelected
                                  ? (isDark
                                      ? AppTheme.primaryDark
                                      : AppTheme.primaryLight)
                                  : (isDark
                                      ? AppTheme.textSecondaryDark
                                      : AppTheme.textSecondaryLight),
                              fontWeight: isSelected
                                  ? FontWeight.w600
                                  : FontWeight.w400,
                            ),
                      ),
                    ),
                  ),
                );
              },
            );
          }).toList(),
        ),
      ],
    );
  }
}
