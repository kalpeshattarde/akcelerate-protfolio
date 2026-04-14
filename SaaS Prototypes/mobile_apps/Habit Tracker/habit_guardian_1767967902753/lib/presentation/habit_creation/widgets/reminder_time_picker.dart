import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class ReminderTimePicker extends StatefulWidget {
  final TimeOfDay? selectedTime;
  final Function(TimeOfDay?) onTimeChanged;

  const ReminderTimePicker({
    super.key,
    this.selectedTime,
    required this.onTimeChanged,
  });

  @override
  State<ReminderTimePicker> createState() => _ReminderTimePickerState();
}

class _ReminderTimePickerState extends State<ReminderTimePicker> {
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
              'Reminder Time',
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
          decoration: BoxDecoration(
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
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: () => _selectTime(context),
              borderRadius: BorderRadius.circular(12),
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                decoration: BoxDecoration(
                  color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
                  ),
                ),
                child: Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'access_time',
                      size: 6.w,
                      color: widget.selectedTime != null
                          ? (isDark
                              ? AppTheme.secondaryDark
                              : AppTheme.secondaryLight)
                          : (isDark
                              ? AppTheme.textSecondaryDark
                              : AppTheme.textSecondaryLight),
                    ),
                    SizedBox(width: 4.w),
                    Expanded(
                      child: Text(
                        widget.selectedTime != null
                            ? _formatTime(widget.selectedTime!)
                            : 'Select reminder time',
                        style: theme.textTheme.bodyLarge?.copyWith(
                          color: widget.selectedTime != null
                              ? (isDark
                                  ? AppTheme.textPrimaryDark
                                  : AppTheme.textPrimaryLight)
                              : (isDark
                                  ? AppTheme.textSecondaryDark
                                  : AppTheme.textSecondaryLight),
                          fontWeight: widget.selectedTime != null
                              ? FontWeight.w500
                              : FontWeight.w400,
                        ),
                      ),
                    ),
                    if (widget.selectedTime != null)
                      GestureDetector(
                        onTap: () {
                          HapticFeedback.lightImpact();
                          widget.onTimeChanged(null);
                        },
                        child: Container(
                          padding: EdgeInsets.all(1.w),
                          decoration: BoxDecoration(
                            color: (isDark
                                    ? AppTheme.warningDark
                                    : AppTheme.warningLight)
                                .withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: CustomIconWidget(
                            iconName: 'close',
                            size: 4.w,
                            color: isDark
                                ? AppTheme.warningDark
                                : AppTheme.warningLight,
                          ),
                        ),
                      )
                    else
                      CustomIconWidget(
                        iconName: 'keyboard_arrow_right',
                        size: 6.w,
                        color: isDark
                            ? AppTheme.textSecondaryDark
                            : AppTheme.textSecondaryLight,
                      ),
                  ],
                ),
              ),
            ),
          ),
        ),
        if (widget.selectedTime != null) ...[
          SizedBox(height: 2.h),
          Container(
            padding: EdgeInsets.all(3.w),
            decoration: BoxDecoration(
              color: (isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight)
                  .withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color:
                    (isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight)
                        .withValues(alpha: 0.3),
              ),
            ),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'notifications',
                  size: 5.w,
                  color:
                      isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
                ),
                SizedBox(width: 3.w),
                Expanded(
                  child: Text(
                    'You\'ll receive a gentle reminder at ${_formatTime(widget.selectedTime!)}',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: isDark
                          ? AppTheme.secondaryDark
                          : AppTheme.secondaryLight,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ],
    );
  }

  Future<void> _selectTime(BuildContext context) async {
    HapticFeedback.lightImpact();

    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: widget.selectedTime ?? TimeOfDay.now(),
      builder: (BuildContext context, Widget? child) {
        final theme = Theme.of(context);
        final isDark = theme.brightness == Brightness.dark;

        return Theme(
          data: theme.copyWith(
            timePickerTheme: TimePickerThemeData(
              backgroundColor:
                  isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
              hourMinuteTextColor:
                  isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
              hourMinuteColor:
                  isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
              dialHandColor:
                  isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
              dialBackgroundColor:
                  isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
              dialTextColor:
                  isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
              entryModeIconColor:
                  isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
              dayPeriodTextColor:
                  isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
              dayPeriodColor:
                  isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
              dayPeriodBorderSide: BorderSide(
                color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
            ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null && picked != widget.selectedTime) {
      HapticFeedback.selectionClick();
      widget.onTimeChanged(picked);
    }
  }

  String _formatTime(TimeOfDay time) {
    final hour = time.hourOfPeriod;
    final minute = time.minute.toString().padLeft(2, '0');
    final period = time.period == DayPeriod.am ? 'AM' : 'PM';
    final displayHour = hour == 0 ? 12 : hour;

    return '$displayHour:$minute $period';
  }
}
