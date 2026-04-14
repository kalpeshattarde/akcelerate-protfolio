import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';
import './meal_slot_widget.dart';

class WeeklyViewWidget extends StatelessWidget {
  final DateTime currentWeek;
  final Map<String, List<Map<String, dynamic>>> weeklyMeals;
  final Function(String, String, Map<String, dynamic>) onMealPlanned;
  final Function(String, String) onMealRemoved;
  final Function(String, String, Map<String, dynamic>) onMealEdited;

  const WeeklyViewWidget({
    Key? key,
    required this.currentWeek,
    required this.weeklyMeals,
    required this.onMealPlanned,
    required this.onMealRemoved,
    required this.onMealEdited,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final startOfWeek =
        currentWeek.subtract(Duration(days: currentWeek.weekday - 1));

    return SingleChildScrollView(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Column(
        children: List.generate(7, (index) {
          final date = startOfWeek.add(Duration(days: index));
          final dateKey =
              '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
          final dayMeals = weeklyMeals[dateKey] ?? [];

          return Container(
            margin: EdgeInsets.only(bottom: 3.h),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface,
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: AppTheme.lightTheme.colorScheme.shadow
                      .withValues(alpha: 0.08),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: double.infinity,
                  padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                  decoration: BoxDecoration(
                    color: _isToday(date)
                        ? AppTheme.lightTheme.colorScheme.primary
                            .withValues(alpha: 0.1)
                        : AppTheme.lightTheme.colorScheme.surface,
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(16),
                      topRight: Radius.circular(16),
                    ),
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 12.w,
                        height: 12.w,
                        decoration: BoxDecoration(
                          color: _isToday(date)
                              ? AppTheme.lightTheme.colorScheme.primary
                              : AppTheme.lightTheme.colorScheme.primary
                                  .withValues(alpha: 0.2),
                          shape: BoxShape.circle,
                        ),
                        child: Center(
                          child: Text(
                            date.day.toString(),
                            style: Theme.of(context)
                                .textTheme
                                .titleMedium
                                ?.copyWith(
                                  color: _isToday(date)
                                      ? AppTheme
                                          .lightTheme.colorScheme.onPrimary
                                      : AppTheme.lightTheme.colorScheme.primary,
                                  fontWeight: FontWeight.w600,
                                ),
                          ),
                        ),
                      ),
                      SizedBox(width: 3.w),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _getDayName(date.weekday),
                            style: Theme.of(context)
                                .textTheme
                                .titleMedium
                                ?.copyWith(
                                  color:
                                      AppTheme.lightTheme.colorScheme.onSurface,
                                  fontWeight: FontWeight.w600,
                                ),
                          ),
                          Text(
                            '${_getMonthName(date.month)} ${date.day}',
                            style:
                                Theme.of(context).textTheme.bodySmall?.copyWith(
                                      color: AppTheme
                                          .lightTheme.colorScheme.onSurface
                                          .withValues(alpha: 0.7),
                                    ),
                          ),
                        ],
                      ),
                      const Spacer(),
                      if (dayMeals.isNotEmpty)
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 2.w, vertical: 0.5.h),
                          decoration: BoxDecoration(
                            color: AppTheme.lightTheme.colorScheme.secondary
                                .withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            '${dayMeals.length} meal${dayMeals.length > 1 ? 's' : ''}',
                            style: Theme.of(context)
                                .textTheme
                                .bodySmall
                                ?.copyWith(
                                  color:
                                      AppTheme.lightTheme.colorScheme.secondary,
                                  fontWeight: FontWeight.w500,
                                ),
                          ),
                        ),
                    ],
                  ),
                ),
                Padding(
                  padding: EdgeInsets.all(4.w),
                  child: Column(
                    children: [
                      MealSlotWidget(
                        mealType: 'breakfast',
                        dateKey: dateKey,
                        meal: _getMealByType(dayMeals, 'breakfast'),
                        onMealPlanned: onMealPlanned,
                        onMealRemoved: onMealRemoved,
                        onMealEdited: onMealEdited,
                      ),
                      SizedBox(height: 2.h),
                      MealSlotWidget(
                        mealType: 'lunch',
                        dateKey: dateKey,
                        meal: _getMealByType(dayMeals, 'lunch'),
                        onMealPlanned: onMealPlanned,
                        onMealRemoved: onMealRemoved,
                        onMealEdited: onMealEdited,
                      ),
                      SizedBox(height: 2.h),
                      MealSlotWidget(
                        mealType: 'dinner',
                        dateKey: dateKey,
                        meal: _getMealByType(dayMeals, 'dinner'),
                        onMealPlanned: onMealPlanned,
                        onMealRemoved: onMealRemoved,
                        onMealEdited: onMealEdited,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        }),
      ),
    );
  }

  bool _isToday(DateTime date) {
    final now = DateTime.now();
    return date.year == now.year &&
        date.month == now.month &&
        date.day == now.day;
  }

  String _getDayName(int weekday) {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];
    return days[weekday - 1];
  }

  String _getMonthName(int month) {
    const months = [
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
    return months[month - 1];
  }

  Map<String, dynamic>? _getMealByType(
      List<Map<String, dynamic>> meals, String type) {
    try {
      return meals.firstWhere((meal) => (meal['type'] as String) == type);
    } catch (e) {
      return null;
    }
  }
}
