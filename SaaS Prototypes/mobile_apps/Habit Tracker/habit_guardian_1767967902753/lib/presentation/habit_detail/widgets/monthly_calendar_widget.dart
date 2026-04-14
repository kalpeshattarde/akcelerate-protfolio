import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';
import 'package:table_calendar/table_calendar.dart';

import '../../../core/app_export.dart';

class MonthlyCalendarWidget extends StatefulWidget {
  final Map<DateTime, bool> habitData;
  final Function(DateTime, String) onDateLongPress;

  const MonthlyCalendarWidget({
    super.key,
    required this.habitData,
    required this.onDateLongPress,
  });

  @override
  State<MonthlyCalendarWidget> createState() => _MonthlyCalendarWidgetState();
}

class _MonthlyCalendarWidgetState extends State<MonthlyCalendarWidget> {
  late DateTime _focusedDay;
  DateTime? _selectedDay;
  CalendarFormat _calendarFormat = CalendarFormat.month;

  @override
  void initState() {
    super.initState();
    _focusedDay = DateTime.now();
    _selectedDay = DateTime.now();
  }

  void _showContextMenu(BuildContext context, DateTime date) {
    HapticFeedback.mediumImpact();

    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => _buildContextMenu(context, date),
    );
  }

  Widget _buildContextMenu(BuildContext context, DateTime date) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Handle bar
          Container(
            width: 12.w,
            height: 4,
            margin: EdgeInsets.only(top: 2.h),
            decoration: BoxDecoration(
              color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
              borderRadius: BorderRadius.circular(2),
            ),
          ),

          Padding(
            padding: EdgeInsets.all(4.w),
            child: Column(
              children: [
                // Date header
                Text(
                  '${date.day}/${date.month}/${date.year}',
                  style: theme.textTheme.titleLarge?.copyWith(
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                    fontWeight: FontWeight.w600,
                  ),
                ),

                SizedBox(height: 3.h),

                // Context menu options
                _buildMenuOption(
                  context,
                  'Add Note',
                  'note_add',
                  () {
                    Navigator.pop(context);
                    widget.onDateLongPress(date, 'add_note');
                  },
                  isDark,
                ),

                _buildMenuOption(
                  context,
                  'Mark Complete',
                  'check_circle',
                  () {
                    Navigator.pop(context);
                    widget.onDateLongPress(date, 'mark_complete');
                  },
                  isDark,
                ),

                _buildMenuOption(
                  context,
                  'View Details',
                  'info',
                  () {
                    Navigator.pop(context);
                    widget.onDateLongPress(date, 'view_details');
                  },
                  isDark,
                ),

                SizedBox(height: 2.h),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMenuOption(
    BuildContext context,
    String title,
    String iconName,
    VoidCallback onTap,
    bool isDark,
  ) {
    final theme = Theme.of(context);

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          width: double.infinity,
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 3.h),
          child: Row(
            children: [
              Container(
                padding: EdgeInsets.all(2.w),
                decoration: BoxDecoration(
                  color: (isDark
                          ? AppTheme.secondaryDark
                          : AppTheme.secondaryLight)
                      .withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: CustomIconWidget(
                  iconName: iconName,
                  color:
                      isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
                  size: 20,
                ),
              ),
              SizedBox(width: 4.w),
              Text(
                title,
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: isDark
                      ? AppTheme.textPrimaryDark
                      : AppTheme.textPrimaryLight,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(16),
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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Text(
              'Monthly Overview',
              style: theme.textTheme.titleLarge?.copyWith(
                color: isDark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),

          // Calendar
          TableCalendar<bool>(
            firstDay: DateTime.utc(2020, 1, 1),
            lastDay: DateTime.utc(2030, 12, 31),
            focusedDay: _focusedDay,
            selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
            calendarFormat: _calendarFormat,
            eventLoader: (day) {
              return widget.habitData[day] == true ? [true] : [];
            },
            startingDayOfWeek: StartingDayOfWeek.monday,
            calendarStyle: CalendarStyle(
              outsideDaysVisible: false,
              weekendTextStyle: theme.textTheme.bodyMedium?.copyWith(
                    color: isDark
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight,
                  ) ??
                  const TextStyle(),
              holidayTextStyle: theme.textTheme.bodyMedium?.copyWith(
                    color: isDark
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight,
                  ) ??
                  const TextStyle(),

              // Default day styling
              defaultTextStyle: theme.textTheme.bodyMedium?.copyWith(
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                  ) ??
                  const TextStyle(),

              // Today styling
              todayDecoration: BoxDecoration(
                color: (isDark ? AppTheme.accentDark : AppTheme.accentLight)
                    .withValues(alpha: 0.3),
                shape: BoxShape.circle,
                border: Border.all(
                  color: isDark ? AppTheme.accentDark : AppTheme.accentLight,
                  width: 2,
                ),
              ),
              todayTextStyle: theme.textTheme.bodyMedium?.copyWith(
                    color: isDark ? AppTheme.accentDark : AppTheme.accentLight,
                    fontWeight: FontWeight.w600,
                  ) ??
                  const TextStyle(),

              // Selected day styling
              selectedDecoration: BoxDecoration(
                color:
                    isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
                shape: BoxShape.circle,
              ),
              selectedTextStyle: theme.textTheme.bodyMedium?.copyWith(
                    color:
                        isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
                    fontWeight: FontWeight.w600,
                  ) ??
                  const TextStyle(),

              // Completed days styling
              markerDecoration: BoxDecoration(
                color: isDark ? AppTheme.premiumDark : AppTheme.premiumLight,
                shape: BoxShape.circle,
              ),
              markersMaxCount: 1,
              markerMargin: const EdgeInsets.symmetric(horizontal: 1.5),
            ),
            headerStyle: HeaderStyle(
              formatButtonVisible: false,
              titleCentered: true,
              leftChevronIcon: CustomIconWidget(
                iconName: 'chevron_left',
                color: isDark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                size: 20,
              ),
              rightChevronIcon: CustomIconWidget(
                iconName: 'chevron_right',
                color: isDark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                size: 20,
              ),
              titleTextStyle: theme.textTheme.titleMedium?.copyWith(
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                    fontWeight: FontWeight.w600,
                  ) ??
                  const TextStyle(),
            ),
            daysOfWeekStyle: DaysOfWeekStyle(
              weekdayStyle: theme.textTheme.bodySmall?.copyWith(
                    color: isDark
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight,
                    fontWeight: FontWeight.w500,
                  ) ??
                  const TextStyle(),
              weekendStyle: theme.textTheme.bodySmall?.copyWith(
                    color: isDark
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight,
                    fontWeight: FontWeight.w500,
                  ) ??
                  const TextStyle(),
            ),
            onDaySelected: (selectedDay, focusedDay) {
              setState(() {
                _selectedDay = selectedDay;
                _focusedDay = focusedDay;
              });
              HapticFeedback.lightImpact();
            },
            onDayLongPressed: (selectedDay, focusedDay) {
              _showContextMenu(context, selectedDay);
            },
            onPageChanged: (focusedDay) {
              setState(() {
                _focusedDay = focusedDay;
              });
            },
          ),

          SizedBox(height: 2.h),

          // Legend
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildLegendItem(
                  'Completed',
                  isDark ? AppTheme.premiumDark : AppTheme.premiumLight,
                  theme,
                  isDark,
                ),
                _buildLegendItem(
                  'Today',
                  isDark ? AppTheme.accentDark : AppTheme.accentLight,
                  theme,
                  isDark,
                ),
                _buildLegendItem(
                  'Selected',
                  isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
                  theme,
                  isDark,
                ),
              ],
            ),
          ),

          SizedBox(height: 2.h),
        ],
      ),
    );
  }

  Widget _buildLegendItem(
      String label, Color color, ThemeData theme, bool isDark) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
          ),
        ),
        SizedBox(width: 2.w),
        Text(
          label,
          style: theme.textTheme.bodySmall?.copyWith(
            color: isDark
                ? AppTheme.textSecondaryDark
                : AppTheme.textSecondaryLight,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}
