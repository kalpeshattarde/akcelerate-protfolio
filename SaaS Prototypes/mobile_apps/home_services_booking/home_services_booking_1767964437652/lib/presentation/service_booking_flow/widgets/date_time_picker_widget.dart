import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class DateTimePickerWidget extends StatefulWidget {
  final DateTime? selectedDate;
  final String? selectedTimeSlot;
  final Function(DateTime) onDateChanged;
  final Function(String) onTimeSlotChanged;

  const DateTimePickerWidget({
    super.key,
    this.selectedDate,
    this.selectedTimeSlot,
    required this.onDateChanged,
    required this.onTimeSlotChanged,
  });

  @override
  State<DateTimePickerWidget> createState() => _DateTimePickerWidgetState();
}

class _DateTimePickerWidgetState extends State<DateTimePickerWidget>
    with TickerProviderStateMixin {
  late AnimationController _calendarController;
  late Animation<double> _calendarAnimation;

  late PageController _pageController;
  DateTime _currentMonth = DateTime.now();

  final List<Map<String, dynamic>> _timeSlots = [
    {'time': '8:00 AM', 'available': true, 'popular': false},
    {'time': '9:00 AM', 'available': true, 'popular': true},
    {'time': '10:00 AM', 'available': true, 'popular': true},
    {'time': '11:00 AM', 'available': false, 'popular': false},
    {'time': '12:00 PM', 'available': true, 'popular': false},
    {'time': '1:00 PM', 'available': true, 'popular': true},
    {'time': '2:00 PM', 'available': true, 'popular': true},
    {'time': '3:00 PM', 'available': false, 'popular': false},
    {'time': '4:00 PM', 'available': true, 'popular': false},
    {'time': '5:00 PM', 'available': true, 'popular': true},
    {'time': '6:00 PM', 'available': true, 'popular': false},
    {'time': '7:00 PM', 'available': false, 'popular': false},
  ];

  @override
  void initState() {
    super.initState();
    _calendarController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _calendarAnimation = CurvedAnimation(
      parent: _calendarController,
      curve: Curves.easeInOut,
    );
    _pageController = PageController();
    _calendarController.forward();
  }

  @override
  void dispose() {
    _calendarController.dispose();
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Select Date & Time',
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          SizedBox(height: 2.h),
          _buildCalendarHeader(theme, colorScheme),
          SizedBox(height: 2.h),
          _buildCalendar(theme, colorScheme),
          SizedBox(height: 3.h),
          _buildTimeSlots(theme, colorScheme),
        ],
      ),
    );
  }

  Widget _buildCalendarHeader(ThemeData theme, ColorScheme colorScheme) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          '${_getMonthName(_currentMonth.month)} ${_currentMonth.year}',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        Row(
          children: [
            IconButton(
              onPressed: _previousMonth,
              icon: CustomIconWidget(
                iconName: 'chevron_left',
                color: colorScheme.onSurface,
                size: 6.w,
              ),
            ),
            IconButton(
              onPressed: _nextMonth,
              icon: CustomIconWidget(
                iconName: 'chevron_right',
                color: colorScheme.onSurface,
                size: 6.w,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildCalendar(ThemeData theme, ColorScheme colorScheme) {
    return AnimatedBuilder(
      animation: _calendarAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _calendarAnimation.value,
          child: Container(
            decoration: BoxDecoration(
              color: colorScheme.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: colorScheme.outline.withValues(alpha: 0.2),
              ),
            ),
            child: Column(
              children: [
                _buildWeekDayHeaders(theme, colorScheme),
                _buildCalendarDays(theme, colorScheme),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildWeekDayHeaders(ThemeData theme, ColorScheme colorScheme) {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return Container(
      padding: EdgeInsets.symmetric(vertical: 1.h),
      decoration: BoxDecoration(
        color: colorScheme.primary.withValues(alpha: 0.05),
        borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
      ),
      child: Row(
        children: weekDays.map((day) {
          return Expanded(
            child: Text(
              day,
              style: theme.textTheme.labelMedium?.copyWith(
                color: colorScheme.primary,
                fontWeight: FontWeight.w600,
              ),
              textAlign: TextAlign.center,
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildCalendarDays(ThemeData theme, ColorScheme colorScheme) {
    final firstDayOfMonth =
        DateTime(_currentMonth.year, _currentMonth.month, 1);
    final lastDayOfMonth =
        DateTime(_currentMonth.year, _currentMonth.month + 1, 0);
    final firstWeekday = firstDayOfMonth.weekday % 7;
    final daysInMonth = lastDayOfMonth.day;

    final today = DateTime.now();
    final isCurrentMonth =
        _currentMonth.month == today.month && _currentMonth.year == today.year;

    return Padding(
      padding: EdgeInsets.all(2.w),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 7,
          childAspectRatio: 1,
        ),
        itemCount: firstWeekday + daysInMonth,
        itemBuilder: (context, index) {
          if (index < firstWeekday) {
            return const SizedBox();
          }

          final day = index - firstWeekday + 1;
          final date = DateTime(_currentMonth.year, _currentMonth.month, day);
          final isToday = isCurrentMonth && day == today.day;
          final isSelected = widget.selectedDate != null &&
              date.year == widget.selectedDate!.year &&
              date.month == widget.selectedDate!.month &&
              date.day == widget.selectedDate!.day;
          final isPast =
              date.isBefore(DateTime.now().subtract(const Duration(days: 1)));
          final isAvailable = !isPast && _isDayAvailable(date);

          return GestureDetector(
            onTap: isAvailable ? () => widget.onDateChanged(date) : null,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              margin: EdgeInsets.all(0.5.w),
              decoration: BoxDecoration(
                color: isSelected
                    ? colorScheme.primary
                    : isToday
                        ? colorScheme.primary.withValues(alpha: 0.1)
                        : Colors.transparent,
                borderRadius: BorderRadius.circular(8),
                border: isToday && !isSelected
                    ? Border.all(color: colorScheme.primary, width: 1)
                    : null,
              ),
              child: Center(
                child: Text(
                  day.toString(),
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: isSelected
                        ? colorScheme.onPrimary
                        : isPast
                            ? colorScheme.onSurfaceVariant
                                .withValues(alpha: 0.5)
                            : isToday
                                ? colorScheme.primary
                                : colorScheme.onSurface,
                    fontWeight: isSelected || isToday
                        ? FontWeight.w600
                        : FontWeight.w400,
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildTimeSlots(ThemeData theme, ColorScheme colorScheme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Available Time Slots',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 1.h),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 2.w,
            mainAxisSpacing: 1.h,
            childAspectRatio: 2.5,
          ),
          itemCount: _timeSlots.length,
          itemBuilder: (context, index) {
            final slot = _timeSlots[index];
            final time = slot['time'] as String;
            final isAvailable = slot['available'] as bool;
            final isPopular = slot['popular'] as bool;
            final isSelected = widget.selectedTimeSlot == time;

            return GestureDetector(
              onTap: isAvailable ? () => widget.onTimeSlotChanged(time) : null,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                decoration: BoxDecoration(
                  color: isSelected
                      ? colorScheme.primary
                      : isAvailable
                          ? colorScheme.surface
                          : colorScheme.outline.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: isSelected
                        ? colorScheme.primary
                        : isAvailable
                            ? isPopular
                                ? colorScheme.secondary
                                : colorScheme.outline.withValues(alpha: 0.3)
                            : colorScheme.outline.withValues(alpha: 0.2),
                    width: isSelected || isPopular ? 2 : 1,
                  ),
                ),
                child: Stack(
                  children: [
                    Center(
                      child: Text(
                        time,
                        style: theme.textTheme.labelMedium?.copyWith(
                          color: isSelected
                              ? colorScheme.onPrimary
                              : isAvailable
                                  ? colorScheme.onSurface
                                  : colorScheme.onSurfaceVariant
                                      .withValues(alpha: 0.5),
                          fontWeight: isSelected || isPopular
                              ? FontWeight.w600
                              : FontWeight.w400,
                        ),
                      ),
                    ),
                    if (isPopular && !isSelected)
                      Positioned(
                        top: 1,
                        right: 1,
                        child: Container(
                          width: 2.w,
                          height: 2.w,
                          decoration: BoxDecoration(
                            color: colorScheme.secondary,
                            shape: BoxShape.circle,
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  void _previousMonth() {
    setState(() {
      _currentMonth = DateTime(_currentMonth.year, _currentMonth.month - 1);
    });
  }

  void _nextMonth() {
    setState(() {
      _currentMonth = DateTime(_currentMonth.year, _currentMonth.month + 1);
    });
  }

  String _getMonthName(int month) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return months[month - 1];
  }

  bool _isDayAvailable(DateTime date) {
    // Mock availability logic - in real app, this would check provider availability
    final weekday = date.weekday;
    return weekday != DateTime.sunday; // No service on Sundays
  }
}
