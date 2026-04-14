import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class ProviderAvailabilityWidget extends StatefulWidget {
  final Map<String, dynamic> availabilityData;

  const ProviderAvailabilityWidget({
    super.key,
    required this.availabilityData,
  });

  @override
  State<ProviderAvailabilityWidget> createState() =>
      _ProviderAvailabilityWidgetState();
}

class _ProviderAvailabilityWidgetState
    extends State<ProviderAvailabilityWidget> {
  DateTime _selectedDate = DateTime.now();
  String? _selectedTimeSlot;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: Text(
              'Availability Calendar',
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
          ),

          SizedBox(height: 2.h),

          // Date selector
          Container(
            height: 10.h,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              itemCount: 14, // Next 14 days
              separatorBuilder: (context, index) => SizedBox(width: 2.w),
              itemBuilder: (context, index) {
                final date = DateTime.now().add(Duration(days: index));
                final isSelected = _selectedDate.day == date.day &&
                    _selectedDate.month == date.month;
                final isAvailable = _isDateAvailable(date);

                return _buildDateCard(
                  context,
                  date,
                  isSelected,
                  isAvailable,
                );
              },
            ),
          ),

          SizedBox(height: 3.h),

          // Time slots
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: Text(
              'Available Time Slots',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
          ),

          SizedBox(height: 2.h),

          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: _buildTimeSlots(context),
          ),

          SizedBox(height: 3.h),

          // Response time indicator
          Container(
            margin: EdgeInsets.symmetric(horizontal: 4.w),
            padding: EdgeInsets.all(3.w),
            decoration: BoxDecoration(
              color: colorScheme.secondary.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: colorScheme.secondary.withValues(alpha: 0.3),
                width: 1,
              ),
            ),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'schedule',
                  color: colorScheme.secondary,
                  size: 20,
                ),
                SizedBox(width: 2.w),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Response Time',
                        style: theme.textTheme.titleSmall?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: colorScheme.secondary,
                        ),
                      ),
                      Text(
                        'Usually responds within ${widget.availabilityData['responseTime'] ?? '2 hours'}',
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDateCard(
    BuildContext context,
    DateTime date,
    bool isSelected,
    bool isAvailable,
  ) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    final dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    final monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    return GestureDetector(
      onTap: isAvailable
          ? () {
              setState(() {
                _selectedDate = date;
                _selectedTimeSlot = null; // Reset time slot selection
              });
            }
          : null,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: 16.w,
        padding: EdgeInsets.symmetric(vertical: 1.5.h),
        decoration: BoxDecoration(
          color: isSelected
              ? colorScheme.primary
              : isAvailable
                  ? colorScheme.surface
                  : colorScheme.surface.withValues(alpha: 0.5),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected
                ? colorScheme.primary
                : isAvailable
                    ? colorScheme.outline.withValues(alpha: 0.3)
                    : colorScheme.outline.withValues(alpha: 0.1),
            width: 1,
          ),
        ),
        child: Column(
          children: [
            Text(
              dayNames[date.weekday % 7],
              style: theme.textTheme.labelSmall?.copyWith(
                color: isSelected
                    ? Colors.white
                    : isAvailable
                        ? colorScheme.onSurfaceVariant
                        : colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
                fontWeight: FontWeight.w500,
              ),
            ),
            SizedBox(height: 0.5.h),
            Text(
              '${date.day}',
              style: theme.textTheme.titleMedium?.copyWith(
                color: isSelected
                    ? Colors.white
                    : isAvailable
                        ? colorScheme.onSurface
                        : colorScheme.onSurface.withValues(alpha: 0.5),
                fontWeight: FontWeight.w600,
              ),
            ),
            Text(
              monthNames[date.month - 1],
              style: theme.textTheme.labelSmall?.copyWith(
                color: isSelected
                    ? Colors.white
                    : isAvailable
                        ? colorScheme.onSurfaceVariant
                        : colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
                fontWeight: FontWeight.w400,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTimeSlots(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    final availableSlots = _getAvailableSlotsForDate(_selectedDate);

    if (availableSlots.isEmpty) {
      return Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: colorScheme.outline.withValues(alpha: 0.2),
            width: 1,
          ),
        ),
        child: Column(
          children: [
            CustomIconWidget(
              iconName: 'schedule',
              color: colorScheme.onSurfaceVariant,
              size: 32,
            ),
            SizedBox(height: 1.h),
            Text(
              'No available slots for this date',
              style: theme.textTheme.titleMedium?.copyWith(
                color: colorScheme.onSurfaceVariant,
                fontWeight: FontWeight.w500,
              ),
            ),
            Text(
              'Please select another date',
              style: theme.textTheme.bodySmall?.copyWith(
                color: colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
      );
    }

    return Wrap(
      spacing: 2.w,
      runSpacing: 1.h,
      children: availableSlots.map((slot) {
        final isSelected = _selectedTimeSlot == slot['time'];
        final isBooked = slot['isBooked'] as bool? ?? false;

        return GestureDetector(
          onTap: !isBooked
              ? () {
                  setState(() {
                    _selectedTimeSlot = slot['time'] as String?;
                  });
                }
              : null,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: EdgeInsets.symmetric(
              horizontal: 4.w,
              vertical: 1.5.h,
            ),
            decoration: BoxDecoration(
              color: isSelected
                  ? colorScheme.primary
                  : isBooked
                      ? colorScheme.surface.withValues(alpha: 0.5)
                      : colorScheme.surface,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: isSelected
                    ? colorScheme.primary
                    : isBooked
                        ? colorScheme.outline.withValues(alpha: 0.2)
                        : colorScheme.outline.withValues(alpha: 0.3),
                width: 1,
              ),
            ),
            child: Text(
              slot['time'] as String? ?? '',
              style: theme.textTheme.labelMedium?.copyWith(
                color: isSelected
                    ? Colors.white
                    : isBooked
                        ? colorScheme.onSurfaceVariant.withValues(alpha: 0.5)
                        : colorScheme.onSurface,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  bool _isDateAvailable(DateTime date) {
    // Mock availability logic
    final weekday = date.weekday;
    final unavailableDates =
        widget.availabilityData['unavailableDates'] as List? ?? [];

    // Check if date is in unavailable dates
    final dateString =
        '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
    if (unavailableDates.contains(dateString)) {
      return false;
    }

    // Check working days (assuming Monday to Saturday)
    return weekday != 7; // Not Sunday
  }

  List<Map<String, dynamic>> _getAvailableSlotsForDate(DateTime date) {
    // Mock time slots based on date
    final baseSlots = [
      {'time': '09:00 AM', 'isBooked': false},
      {'time': '10:00 AM', 'isBooked': false},
      {'time': '11:00 AM', 'isBooked': true},
      {'time': '12:00 PM', 'isBooked': false},
      {'time': '02:00 PM', 'isBooked': false},
      {'time': '03:00 PM', 'isBooked': false},
      {'time': '04:00 PM', 'isBooked': true},
      {'time': '05:00 PM', 'isBooked': false},
    ];

    // Filter based on current time if it's today
    if (date.day == DateTime.now().day &&
        date.month == DateTime.now().month &&
        date.year == DateTime.now().year) {
      final currentHour = DateTime.now().hour;
      return baseSlots.where((slot) {
        final timeString = slot['time'] as String;
        final hour = _parseHour(timeString);
        return hour > currentHour;
      }).toList();
    }

    return baseSlots;
  }

  int _parseHour(String timeString) {
    final parts = timeString.split(' ');
    final timePart = parts[0];
    final period = parts[1];

    final hourMinute = timePart.split(':');
    int hour = int.parse(hourMinute[0]);

    if (period == 'PM' && hour != 12) {
      hour += 12;
    } else if (period == 'AM' && hour == 12) {
      hour = 0;
    }

    return hour;
  }
}
