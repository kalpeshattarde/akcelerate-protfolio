import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MealSlotWidget extends StatelessWidget {
  final String mealType;
  final String dateKey;
  final Map<String, dynamic>? meal;
  final Function(String, String, Map<String, dynamic>) onMealPlanned;
  final Function(String, String) onMealRemoved;
  final Function(String, String, Map<String, dynamic>) onMealEdited;

  const MealSlotWidget({
    Key? key,
    required this.mealType,
    required this.dateKey,
    this.meal,
    required this.onMealPlanned,
    required this.onMealRemoved,
    required this.onMealEdited,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool hasMeal = meal != null;

    return GestureDetector(
      onTap: () => _showMealOptions(context),
      onLongPress: hasMeal ? () => _showMealContextMenu(context) : null,
      child: Container(
        width: double.infinity,
        padding: EdgeInsets.all(3.w),
        decoration: BoxDecoration(
          color: hasMeal
              ? AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.05)
              : AppTheme.lightTheme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: hasMeal
                ? AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.3)
                : AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.2),
            width: 1,
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                color: _getMealTypeColor().withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(8),
              ),
              child: hasMeal && meal!['image'] != null
                  ? ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: CustomImageWidget(
                        imageUrl: meal!['image'] as String,
                        width: 12.w,
                        height: 12.w,
                        fit: BoxFit.cover,
                        semanticLabel:
                            meal!['semanticLabel'] as String? ?? 'Meal image',
                      ),
                    )
                  : Center(
                      child: CustomIconWidget(
                        iconName: _getMealTypeIcon(),
                        color: _getMealTypeColor(),
                        size: 20,
                      ),
                    ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        _getMealTypeTitle(),
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: AppTheme.lightTheme.colorScheme.onSurface
                                  .withValues(alpha: 0.7),
                              fontWeight: FontWeight.w500,
                              letterSpacing: 0.5,
                            ),
                      ),
                      const Spacer(),
                      if (hasMeal)
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 2.w, vertical: 0.5.h),
                          decoration: BoxDecoration(
                            color: AppTheme.lightTheme.colorScheme.secondary
                                .withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            '${meal!['calories']} cal',
                            style: Theme.of(context)
                                .textTheme
                                .bodySmall
                                ?.copyWith(
                                  color:
                                      AppTheme.lightTheme.colorScheme.secondary,
                                  fontWeight: FontWeight.w500,
                                  fontSize: 10.sp,
                                ),
                          ),
                        ),
                    ],
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    hasMeal
                        ? (meal!['name'] as String)
                        : 'Tap to add ${mealType.toLowerCase()}',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: hasMeal
                              ? AppTheme.lightTheme.colorScheme.onSurface
                              : AppTheme.lightTheme.colorScheme.onSurface
                                  .withValues(alpha: 0.5),
                          fontWeight:
                              hasMeal ? FontWeight.w500 : FontWeight.w400,
                        ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  if (hasMeal && meal!['description'] != null) ...[
                    SizedBox(height: 0.5.h),
                    Text(
                      meal!['description'] as String,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onSurface
                                .withValues(alpha: 0.6),
                          ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ],
              ),
            ),
            if (!hasMeal)
              CustomIconWidget(
                iconName: 'add_circle_outline',
                color: AppTheme.lightTheme.colorScheme.primary
                    .withValues(alpha: 0.5),
                size: 20,
              ),
          ],
        ),
      ),
    );
  }

  Color _getMealTypeColor() {
    switch (mealType) {
      case 'breakfast':
        return AppTheme.lightTheme.colorScheme.secondary;
      case 'lunch':
        return AppTheme.lightTheme.colorScheme.primary;
      case 'dinner':
        return AppTheme.lightTheme.colorScheme.tertiary;
      default:
        return AppTheme.lightTheme.colorScheme.outline;
    }
  }

  String _getMealTypeIcon() {
    switch (mealType) {
      case 'breakfast':
        return 'wb_sunny';
      case 'lunch':
        return 'wb_sunny_outlined';
      case 'dinner':
        return 'nights_stay';
      default:
        return 'restaurant';
    }
  }

  String _getMealTypeTitle() {
    return mealType.toUpperCase();
  }

  void _showMealOptions(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _MealSelectionModal(
        mealType: mealType,
        dateKey: dateKey,
        currentMeal: meal,
        onMealSelected: (selectedMeal) {
          onMealPlanned(dateKey, mealType, selectedMeal);
        },
      ),
    );
  }

  void _showMealContextMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20),
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
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
            ListTile(
              leading: CustomIconWidget(
                iconName: 'edit',
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 24,
              ),
              title: Text(
                'Edit Meal',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
              ),
              onTap: () {
                Navigator.pop(context);
                if (meal != null) {
                  onMealEdited(dateKey, mealType, meal!);
                }
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'delete_outline',
                color: AppTheme.lightTheme.colorScheme.error,
                size: 24,
              ),
              title: Text(
                'Remove Meal',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.error,
                    ),
              ),
              onTap: () {
                Navigator.pop(context);
                onMealRemoved(dateKey, mealType);
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'copy',
                color: AppTheme.lightTheme.colorScheme.onSurface,
                size: 24,
              ),
              title: Text(
                'Copy to Another Day',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
              ),
              onTap: () {
                Navigator.pop(context);
                // TODO: Implement copy functionality
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'visibility',
                color: AppTheme.lightTheme.colorScheme.onSurface,
                size: 24,
              ),
              title: Text(
                'View Recipe',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
              ),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/recipe-detail');
              },
            ),
            SizedBox(height: 4.h),
          ],
        ),
      ),
    );
  }
}

class _MealSelectionModal extends StatefulWidget {
  final String mealType;
  final String dateKey;
  final Map<String, dynamic>? currentMeal;
  final Function(Map<String, dynamic>) onMealSelected;

  const _MealSelectionModal({
    Key? key,
    required this.mealType,
    required this.dateKey,
    this.currentMeal,
    required this.onMealSelected,
  }) : super(key: key);

  @override
  State<_MealSelectionModal> createState() => _MealSelectionModalState();
}

class _MealSelectionModalState extends State<_MealSelectionModal> {
  final TextEditingController _searchController = TextEditingController();
  List<Map<String, dynamic>> _filteredRecipes = [];

  final List<Map<String, dynamic>> _mockRecipes = [
    {
      "id": 1,
      "name": "Avocado Toast with Poached Egg",
      "type": "breakfast",
      "description": "Creamy avocado on sourdough with perfectly poached egg",
      "calories": 320,
      "prepTime": "10 min",
      "image":
          "https://images.unsplash.com/photo-1600753871518-4ab710ae2918",
      "semanticLabel":
          "Sliced avocado on toasted bread topped with a poached egg and herbs on a white plate"
    },
    {
      "id": 2,
      "name": "Greek Yogurt Berry Bowl",
      "type": "breakfast",
      "description": "Protein-rich Greek yogurt with fresh berries and granola",
      "calories": 280,
      "prepTime": "5 min",
      "image":
          "https://images.unsplash.com/photo-1531159713871-a2cb8b772c84",
      "semanticLabel":
          "Bowl of white Greek yogurt topped with mixed berries and granola on a wooden table"
    },
    {
      "id": 3,
      "name": "Quinoa Buddha Bowl",
      "type": "lunch",
      "description":
          "Nutritious quinoa with roasted vegetables and tahini dressing",
      "calories": 450,
      "prepTime": "25 min",
      "image":
          "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf",
      "semanticLabel":
          "Colorful bowl with quinoa, roasted vegetables, chickpeas, and green tahini dressing"
    },
    {
      "id": 4,
      "name": "Mediterranean Wrap",
      "type": "lunch",
      "description": "Fresh vegetables, hummus, and feta in a whole wheat wrap",
      "calories": 380,
      "prepTime": "8 min",
      "image":
          "https://images.unsplash.com/photo-1658708009339-cae435c7d672",
      "semanticLabel":
          "Whole wheat wrap filled with fresh vegetables, hummus, and feta cheese cut in half"
    },
    {
      "id": 5,
      "name": "Herb-Crusted Salmon",
      "type": "dinner",
      "description": "Pan-seared salmon with herbs and roasted asparagus",
      "calories": 520,
      "prepTime": "20 min",
      "image":
          "https://images.unsplash.com/photo-1612948928166-84bfaf28b975",
      "semanticLabel":
          "Grilled salmon fillet with herb crust served with roasted asparagus on a white plate"
    },
    {
      "id": 6,
      "name": "Vegetable Stir-Fry",
      "type": "dinner",
      "description":
          "Colorful mixed vegetables with ginger-soy sauce over brown rice",
      "calories": 390,
      "prepTime": "15 min",
      "image":
          "https://images.unsplash.com/photo-1733361206008-f5d6f9c03f46",
      "semanticLabel":
          "Colorful stir-fried vegetables with broccoli, carrots, and bell peppers in a dark wok"
    },
  ];

  @override
  void initState() {
    super.initState();
    _filteredRecipes = _mockRecipes
        .where((recipe) => (recipe['type'] as String) == widget.mealType)
        .toList();
  }

  void _filterRecipes(String query) {
    setState(() {
      _filteredRecipes = _mockRecipes.where((recipe) {
        final matchesType = (recipe['type'] as String) == widget.mealType;
        final matchesQuery = query.isEmpty ||
            (recipe['name'] as String)
                .toLowerCase()
                .contains(query.toLowerCase()) ||
            (recipe['description'] as String)
                .toLowerCase()
                .contains(query.toLowerCase());
        return matchesType && matchesQuery;
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80.h,
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
                  child: Text(
                    'Select ${widget.mealType.toLowerCase()}',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.onSurface,
                          fontWeight: FontWeight.w600,
                        ),
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
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
            child: TextField(
              controller: _searchController,
              onChanged: _filterRecipes,
              decoration: InputDecoration(
                hintText: 'Search recipes...',
                prefixIcon: Padding(
                  padding: EdgeInsets.all(3.w),
                  child: CustomIconWidget(
                    iconName: 'search',
                    color: AppTheme.lightTheme.colorScheme.onSurface
                        .withValues(alpha: 0.5),
                    size: 20,
                  ),
                ),
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              itemCount: _filteredRecipes.length,
              itemBuilder: (context, index) {
                final recipe = _filteredRecipes[index];
                return Container(
                  margin: EdgeInsets.only(bottom: 2.h),
                  child: ListTile(
                    contentPadding: EdgeInsets.all(3.w),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                      side: BorderSide(
                        color: AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.2),
                      ),
                    ),
                    leading: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: CustomImageWidget(
                        imageUrl: recipe['image'] as String,
                        width: 15.w,
                        height: 15.w,
                        fit: BoxFit.cover,
                        semanticLabel: recipe['semanticLabel'] as String,
                      ),
                    ),
                    title: Text(
                      recipe['name'] as String,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onSurface,
                            fontWeight: FontWeight.w500,
                          ),
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 0.5.h),
                        Text(
                          recipe['description'] as String,
                          style: Theme.of(context)
                              .textTheme
                              .bodySmall
                              ?.copyWith(
                                color: AppTheme.lightTheme.colorScheme.onSurface
                                    .withValues(alpha: 0.7),
                              ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        SizedBox(height: 1.h),
                        Row(
                          children: [
                            Container(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 2.w, vertical: 0.5.h),
                              decoration: BoxDecoration(
                                color: AppTheme.lightTheme.colorScheme.secondary
                                    .withValues(alpha: 0.2),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                '${recipe['calories']} cal',
                                style: Theme.of(context)
                                    .textTheme
                                    .bodySmall
                                    ?.copyWith(
                                      color: AppTheme
                                          .lightTheme.colorScheme.secondary,
                                      fontWeight: FontWeight.w500,
                                      fontSize: 10.sp,
                                    ),
                              ),
                            ),
                            SizedBox(width: 2.w),
                            Container(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 2.w, vertical: 0.5.h),
                              decoration: BoxDecoration(
                                color: AppTheme.lightTheme.colorScheme.primary
                                    .withValues(alpha: 0.2),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                recipe['prepTime'] as String,
                                style: Theme.of(context)
                                    .textTheme
                                    .bodySmall
                                    ?.copyWith(
                                      color: AppTheme
                                          .lightTheme.colorScheme.primary,
                                      fontWeight: FontWeight.w500,
                                      fontSize: 10.sp,
                                    ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    onTap: () {
                      Navigator.pop(context);
                      widget.onMealSelected(recipe);
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
