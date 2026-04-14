import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class PlanMealModalWidget extends StatefulWidget {
  final Function(Map<String, dynamic>) onMealPlanned;

  const PlanMealModalWidget({
    Key? key,
    required this.onMealPlanned,
  }) : super(key: key);

  @override
  State<PlanMealModalWidget> createState() => _PlanMealModalWidgetState();
}

class _PlanMealModalWidgetState extends State<PlanMealModalWidget> {
  String selectedMealType = 'Breakfast';
  DateTime selectedDate = DateTime.now();
  final List<String> mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  final List<Map<String, dynamic>> suggestedMeals = [
    {
      "id": 1,
      "name": "Avocado Toast with Poached Egg",
      "type": "Breakfast",
      "calories": 320,
      "prepTime": "15 min",
      "image":
          "https://images.unsplash.com/photo-1634309783220-0faf630a6deb",
      "semanticLabel":
          "Golden brown toast topped with sliced avocado and a perfectly poached egg with runny yolk on a white plate"
    },
    {
      "id": 2,
      "name": "Mediterranean Quinoa Bowl",
      "type": "Lunch",
      "calories": 450,
      "prepTime": "25 min",
      "image":
          "https://images.unsplash.com/photo-1631880383152-f29099b0fd16",
      "semanticLabel":
          "Colorful bowl filled with quinoa, cherry tomatoes, cucumber, olives, and feta cheese drizzled with olive oil"
    },
    {
      "id": 3,
      "name": "Herb-Crusted Salmon",
      "type": "Dinner",
      "calories": 380,
      "prepTime": "30 min",
      "image":
          "https://images.unsplash.com/photo-1603073162475-cbebff32204e",
      "semanticLabel":
          "Perfectly cooked salmon fillet with herb crust served alongside roasted vegetables on a dark plate"
    },
    {
      "id": 4,
      "name": "Mixed Berry Smoothie Bowl",
      "type": "Snack",
      "calories": 280,
      "prepTime": "10 min",
      "image":
          "https://images.unsplash.com/photo-1610450620997-6921021865da",
      "semanticLabel":
          "Purple smoothie bowl topped with fresh blueberries, strawberries, granola, and coconut flakes in a white bowl"
    },
  ];

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Container(
      height: 80.h,
      decoration: BoxDecoration(
        color: isDarkMode ? AppTheme.backgroundDark : AppTheme.backgroundLight,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          _buildModalHeader(context, isDarkMode),
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildDateSelector(context, isDarkMode),
                  SizedBox(height: 3.h),
                  _buildMealTypeSelector(context, isDarkMode),
                  SizedBox(height: 3.h),
                  _buildSuggestedMeals(context, isDarkMode),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildModalHeader(BuildContext context, bool isDarkMode) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: isDarkMode ? AppTheme.dividerDark : AppTheme.dividerLight,
            width: 1,
          ),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Plan New Meal',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          GestureDetector(
            onTap: () => Navigator.pop(context),
            child: CustomIconWidget(
              iconName: 'close',
              color: isDarkMode
                  ? AppTheme.textPrimaryDark
                  : AppTheme.textPrimaryLight,
              size: 24,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDateSelector(BuildContext context, bool isDarkMode) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Select Date',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        SizedBox(height: 1.h),
        GestureDetector(
          onTap: () => _selectDate(context),
          child: Container(
            width: double.infinity,
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              color: isDarkMode ? AppTheme.surfaceDark : AppTheme.surfaceLight,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color:
                    isDarkMode ? AppTheme.dividerDark : AppTheme.dividerLight,
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '${selectedDate.day}/${selectedDate.month}/${selectedDate.year}',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                CustomIconWidget(
                  iconName: 'calendar_today',
                  color:
                      isDarkMode ? AppTheme.primaryDark : AppTheme.primaryLight,
                  size: 20,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildMealTypeSelector(BuildContext context, bool isDarkMode) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Meal Type',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        SizedBox(height: 1.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: mealTypes
              .map((type) => GestureDetector(
                    onTap: () => setState(() => selectedMealType = type),
                    child: Container(
                      padding:
                          EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                      decoration: BoxDecoration(
                        color: selectedMealType == type
                            ? (isDarkMode
                                ? AppTheme.primaryDark
                                : AppTheme.primaryLight)
                            : (isDarkMode
                                ? AppTheme.surfaceDark
                                : AppTheme.surfaceLight),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: selectedMealType == type
                              ? (isDarkMode
                                  ? AppTheme.primaryDark
                                  : AppTheme.primaryLight)
                              : (isDarkMode
                                  ? AppTheme.dividerDark
                                  : AppTheme.dividerLight),
                        ),
                      ),
                      child: Text(
                        type,
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: selectedMealType == type
                                  ? (isDarkMode
                                      ? AppTheme.onPrimaryDark
                                      : AppTheme.onPrimaryLight)
                                  : null,
                            ),
                      ),
                    ),
                  ))
              .toList(),
        ),
      ],
    );
  }

  Widget _buildSuggestedMeals(BuildContext context, bool isDarkMode) {
    final filteredMeals = suggestedMeals
        .where((meal) => (meal["type"] as String) == selectedMealType)
        .toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Suggested Meals',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        SizedBox(height: 1.h),
        ...filteredMeals
            .map((meal) => _buildMealCard(context, meal, isDarkMode))
            .toList(),
      ],
    );
  }

  Widget _buildMealCard(
      BuildContext context, Map<String, dynamic> meal, bool isDarkMode) {
    return GestureDetector(
      onTap: () {
        widget.onMealPlanned(meal);
        Navigator.pop(context);
      },
      child: Container(
        margin: EdgeInsets.only(bottom: 2.h),
        padding: EdgeInsets.all(3.w),
        decoration: BoxDecoration(
          color: isDarkMode ? AppTheme.cardDark : AppTheme.cardLight,
          borderRadius: BorderRadius.circular(AppTheme.cardBorderRadius),
          boxShadow: isDarkMode
              ? AppTheme.darkWellnessShadow
              : AppTheme.lightWellnessShadow,
        ),
        child: Row(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: CustomImageWidget(
                imageUrl: meal["image"] as String,
                width: 20.w,
                height: 10.h,
                fit: BoxFit.cover,
                semanticLabel: meal["semanticLabel"] as String,
              ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    meal["name"] as String,
                    style: Theme.of(context).textTheme.titleSmall,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: 0.5.h),
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'local_fire_department',
                        color: isDarkMode
                            ? AppTheme.secondaryDark
                            : AppTheme.secondaryLight,
                        size: 16,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        '${meal["calories"]} cal',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      SizedBox(width: 3.w),
                      CustomIconWidget(
                        iconName: 'schedule',
                        color: isDarkMode
                            ? AppTheme.secondaryDark
                            : AppTheme.secondaryLight,
                        size: 16,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        meal["prepTime"] as String,
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ],
              ),
            ),
            CustomIconWidget(
              iconName: 'add_circle',
              color: isDarkMode ? AppTheme.primaryDark : AppTheme.primaryLight,
              size: 24,
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(Duration(days: 30)),
    );
    if (picked != null && picked != selectedDate) {
      setState(() => selectedDate = picked);
    }
  }
}