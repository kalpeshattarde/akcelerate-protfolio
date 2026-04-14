import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import './food_entry_widget.dart';

class MealSectionWidget extends StatefulWidget {
  final String mealType;
  final List<Map<String, dynamic>> foodEntries;
  final double totalCalories;
  final String timestamp;
  final Function(Map<String, dynamic>) onEditPortion;
  final Function(Map<String, dynamic>) onDuplicate;
  final Function(Map<String, dynamic>) onMoveMeal;
  final Function(Map<String, dynamic>) onDelete;
  final Function(Map<String, dynamic>) onViewDetails;
  final Function(Map<String, dynamic>) onAddToFavorites;
  final Function(Map<String, dynamic>) onShareMeal;

  const MealSectionWidget({
    super.key,
    required this.mealType,
    required this.foodEntries,
    required this.totalCalories,
    required this.timestamp,
    required this.onEditPortion,
    required this.onDuplicate,
    required this.onMoveMeal,
    required this.onDelete,
    required this.onViewDetails,
    required this.onAddToFavorites,
    required this.onShareMeal,
  });

  @override
  State<MealSectionWidget> createState() => _MealSectionWidgetState();
}

class _MealSectionWidgetState extends State<MealSectionWidget> {
  bool _isExpanded = true;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          InkWell(
            onTap: () {
              setState(() {
                _isExpanded = !_isExpanded;
              });
            },
            borderRadius: BorderRadius.circular(12),
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.mealType,
                          style: AppTheme.lightTheme.textTheme.titleLarge
                              ?.copyWith(
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        SizedBox(height: 0.5.h),
                        Text(
                          widget.timestamp,
                          style:
                              AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                            color: AppTheme.neutralGray,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        '${widget.totalCalories.toStringAsFixed(0)} kcal',
                        style:
                            AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                          color: AppTheme.calorieAccent,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      SizedBox(height: 0.5.h),
                      Text(
                        '${widget.foodEntries.length} items',
                        style:
                            AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                          color: AppTheme.neutralGray,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(width: 2.w),
                  AnimatedRotation(
                    turns: _isExpanded ? 0.5 : 0,
                    duration: const Duration(milliseconds: 200),
                    child: CustomIconWidget(
                      iconName: 'keyboard_arrow_down',
                      color: AppTheme.neutralGray,
                      size: 24,
                    ),
                  ),
                ],
              ),
            ),
          ),
          AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            height: _isExpanded ? null : 0,
            child: _isExpanded
                ? Column(
                    children: [
                      Divider(
                        height: 1,
                        color: AppTheme.lightTheme.colorScheme.outline,
                      ),
                      ...widget.foodEntries.map((entry) => FoodEntryWidget(
                            foodEntry: entry,
                            onEditPortion: widget.onEditPortion,
                            onDuplicate: widget.onDuplicate,
                            onMoveMeal: widget.onMoveMeal,
                            onDelete: widget.onDelete,
                            onViewDetails: widget.onViewDetails,
                            onAddToFavorites: widget.onAddToFavorites,
                            onShareMeal: widget.onShareMeal,
                          )),
                    ],
                  )
                : const SizedBox.shrink(),
          ),
        ],
      ),
    );
  }
}
