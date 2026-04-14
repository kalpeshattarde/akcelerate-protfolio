import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class RecipeSuggestionsWidget extends StatelessWidget {
  final Function(Map<String, dynamic>) onRecipeSelected;

  const RecipeSuggestionsWidget({
    Key? key,
    required this.onRecipeSelected,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 25.h,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
            child: Row(
              children: [
                Text(
                  'Recipe Suggestions',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                        fontWeight: FontWeight.w600,
                      ),
                ),
                const Spacer(),
                GestureDetector(
                  onTap: () =>
                      Navigator.pushNamed(context, '/recipe-discovery'),
                  child: Text(
                    'View All',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.primary,
                          fontWeight: FontWeight.w500,
                        ),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              itemCount: _seasonalRecipes.length,
              itemBuilder: (context, index) {
                final recipe = _seasonalRecipes[index];
                return Container(
                  width: 45.w,
                  margin: EdgeInsets.only(right: 3.w),
                  child: GestureDetector(
                    onTap: () => onRecipeSelected(recipe),
                    child: Container(
                      decoration: BoxDecoration(
                        color: AppTheme.lightTheme.colorScheme.surface,
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.lightTheme.colorScheme.shadow
                                .withValues(alpha: 0.08),
                            blurRadius: 4,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            flex: 3,
                            child: ClipRRect(
                              borderRadius: const BorderRadius.only(
                                topLeft: Radius.circular(12),
                                topRight: Radius.circular(12),
                              ),
                              child: CustomImageWidget(
                                imageUrl: recipe['image'] as String,
                                width: double.infinity,
                                height: double.infinity,
                                fit: BoxFit.cover,
                                semanticLabel:
                                    recipe['semanticLabel'] as String,
                              ),
                            ),
                          ),
                          Expanded(
                            flex: 2,
                            child: Padding(
                              padding: EdgeInsets.all(3.w),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    recipe['name'] as String,
                                    style: Theme.of(context)
                                        .textTheme
                                        .bodyMedium
                                        ?.copyWith(
                                          color: AppTheme
                                              .lightTheme.colorScheme.onSurface,
                                          fontWeight: FontWeight.w500,
                                        ),
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                  const Spacer(),
                                  Row(
                                    children: [
                                      Container(
                                        padding: EdgeInsets.symmetric(
                                            horizontal: 2.w, vertical: 0.5.h),
                                        decoration: BoxDecoration(
                                          color: _getMealTypeColor(
                                                  recipe['type'] as String)
                                              .withValues(alpha: 0.2),
                                          borderRadius:
                                              BorderRadius.circular(8),
                                        ),
                                        child: Text(
                                          (recipe['type'] as String)
                                              .toUpperCase(),
                                          style: Theme.of(context)
                                              .textTheme
                                              .bodySmall
                                              ?.copyWith(
                                                color: _getMealTypeColor(
                                                    recipe['type'] as String),
                                                fontWeight: FontWeight.w500,
                                                fontSize: 9.sp,
                                              ),
                                        ),
                                      ),
                                      const Spacer(),
                                      Text(
                                        '${recipe['calories']} cal',
                                        style: Theme.of(context)
                                            .textTheme
                                            .bodySmall
                                            ?.copyWith(
                                              color: AppTheme.lightTheme
                                                  .colorScheme.onSurface
                                                  .withValues(alpha: 0.7),
                                              fontSize: 10.sp,
                                            ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Color _getMealTypeColor(String mealType) {
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

  static const List<Map<String, dynamic>> _seasonalRecipes = [
    {
      "id": 1,
      "name": "Autumn Harvest Bowl",
      "type": "lunch",
      "description":
          "Roasted butternut squash with quinoa and pomegranate seeds",
      "calories": 420,
      "prepTime": "30 min",
      "image":
          "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf",
      "semanticLabel":
          "Colorful bowl with roasted butternut squash, quinoa, and pomegranate seeds on a wooden table",
      "seasonal": true
    },
    {
      "id": 2,
      "name": "Warm Spiced Oatmeal",
      "type": "breakfast",
      "description": "Creamy oats with cinnamon, apple, and walnuts",
      "calories": 290,
      "prepTime": "10 min",
      "image":
          "https://images.unsplash.com/photo-1531405042595-53358975dfcf",
      "semanticLabel":
          "Bowl of creamy oatmeal topped with sliced apples, walnuts, and cinnamon in a white bowl",
      "seasonal": true
    },
    {
      "id": 3,
      "name": "Roasted Root Vegetables",
      "type": "dinner",
      "description": "Seasonal root vegetables with herbs and olive oil",
      "calories": 350,
      "prepTime": "45 min",
      "image":
          "https://images.unsplash.com/photo-1602170587354-455eb6c116c4",
      "semanticLabel":
          "Colorful roasted root vegetables including carrots, parsnips, and beets on a baking sheet",
      "seasonal": true
    },
    {
      "id": 4,
      "name": "Green Smoothie Bowl",
      "type": "breakfast",
      "description":
          "Nutrient-packed smoothie with spinach, banana, and chia seeds",
      "calories": 260,
      "prepTime": "5 min",
      "image":
          "https://images.unsplash.com/photo-1595394422883-954bb0a7e0df",
      "semanticLabel":
          "Green smoothie bowl topped with fresh berries, granola, and chia seeds on a marble surface",
      "seasonal": false
    },
    {
      "id": 5,
      "name": "Mediterranean Quinoa Salad",
      "type": "lunch",
      "description": "Fresh quinoa salad with cucumber, tomatoes, and feta",
      "calories": 380,
      "prepTime": "15 min",
      "image":
          "https://images.unsplash.com/photo-1735385391178-f65c2e9b638d",
      "semanticLabel":
          "Colorful quinoa salad with diced cucumber, cherry tomatoes, and crumbled feta cheese in a white bowl",
      "seasonal": false
    },
  ];
}