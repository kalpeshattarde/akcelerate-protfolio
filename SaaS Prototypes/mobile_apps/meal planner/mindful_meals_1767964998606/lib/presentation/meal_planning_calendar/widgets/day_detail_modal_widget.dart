import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import './meal_slot_widget.dart';

class DayDetailModalWidget extends StatelessWidget {
  final DateTime selectedDate;
  final List<Map<String, dynamic>> dayMeals;
  final Function(String, String, Map<String, dynamic>) onMealPlanned;
  final Function(String, String) onMealRemoved;
  final Function(String, String, Map<String, dynamic>) onMealEdited;

  const DayDetailModalWidget({
    Key? key,
    required this.selectedDate,
    required this.dayMeals,
    required this.onMealPlanned,
    required this.onMealRemoved,
    required this.onMealEdited,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final dateKey =
        '${selectedDate.year}-${selectedDate.month.toString().padLeft(2, '0')}-${selectedDate.day.toString().padLeft(2, '0')}';

    return Container(
      height: 70.h,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
      ),
      child: Column(
        children: [
          Container(
            width: 12.w,
            height: 0.5.h,
            margin: EdgeInsets.symmetric(vertical: 2.h),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.outline
                  .withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _getDayName(selectedDate.weekday),
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              color: AppTheme.lightTheme.colorScheme.onSurface,
                              fontWeight: FontWeight.w600,
                            ),
                      ),
                      Text(
                        '${_getMonthName(selectedDate.month)} ${selectedDate.day}, ${selectedDate.year}',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: AppTheme.lightTheme.colorScheme.onSurface
                                  .withValues(alpha: 0.7),
                            ),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: CustomIconWidget(
                    iconName: 'close',
                    color: AppTheme.lightTheme.colorScheme.onSurface,
                    size: 24,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 2.h),
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Column(
                children: [
                  _buildNutritionSummary(),
                  SizedBox(height: 3.h),
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
                  SizedBox(height: 4.h),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNutritionSummary() {
    final totalCalories = dayMeals.fold<int>(
        0, (sum, meal) => sum + ((meal['calories'] as int?) ?? 0));
    final mealCount = dayMeals.length;

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.2),
        ),
      ),
      child: Column(
        children: [
          Text(
            'Daily Summary',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  fontWeight: FontWeight.w600,
                ),
          ),
          SizedBox(height: 2.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildSummaryItem(
                'Meals Planned',
                '$mealCount/3',
                AppTheme.lightTheme.colorScheme.primary,
              ),
              Container(
                width: 1,
                height: 6.h,
                color: AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.2),
              ),
              _buildSummaryItem(
                'Total Calories',
                '$totalCalories cal',
                AppTheme.lightTheme.colorScheme.secondary,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryItem(String label, String value, Color color) {
    return Column(
      children: [
        Text(
          value,
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                color: color,
                fontWeight: FontWeight.w700,
              ),
        ),
        SizedBox(height: 0.5.h),
        Text(
          label,
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurface
                    .withValues(alpha: 0.7),
                fontWeight: FontWeight.w500,
              ),
        ),
      ],
    );
  }

  Map<String, dynamic>? _getMealByType(
      List<Map<String, dynamic>> meals, String type) {
    try {
      return meals.firstWhere((meal) => (meal['type'] as String) == type);
    } catch (e) {
      return null;
    }
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
}