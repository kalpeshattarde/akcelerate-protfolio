import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class CategorySelector extends StatefulWidget {
  final String? selectedCategory;
  final Function(String) onCategorySelected;

  const CategorySelector({
    super.key,
    this.selectedCategory,
    required this.onCategorySelected,
  });

  @override
  State<CategorySelector> createState() => _CategorySelectorState();
}

class _CategorySelectorState extends State<CategorySelector> {
  final List<Map<String, dynamic>> categories = [
    {'name': 'Health', 'icon': 'favorite', 'color': Color(0xFF4A7C59)},
    {'name': 'Fitness', 'icon': 'fitness_center', 'color': Color(0xFFC17B5A)},
    {
      'name': 'Mindfulness',
      'icon': 'self_improvement',
      'color': Color(0xFFD4A574)
    },
    {'name': 'Learning', 'icon': 'school', 'color': Color(0xFF6B9B7A)},
    {'name': 'Productivity', 'icon': 'work', 'color': Color(0xFFB8956A)},
    {'name': 'Social', 'icon': 'people', 'color': Color(0xFF8B7355)},
    {'name': 'Creative', 'icon': 'palette', 'color': Color(0xFF9C8B7A)},
    {
      'name': 'Finance',
      'icon': 'account_balance_wallet',
      'color': Color(0xFF7A8B6B)
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Category',
          style: theme.textTheme.titleMedium?.copyWith(
            color:
                isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        SizedBox(
          height: 12.h,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: EdgeInsets.symmetric(horizontal: 1.w),
            itemCount: categories.length,
            separatorBuilder: (context, index) => SizedBox(width: 3.w),
            itemBuilder: (context, index) {
              final category = categories[index];
              final isSelected = widget.selectedCategory == category['name'];

              return _buildCategoryChip(
                context,
                category,
                isSelected,
                isDark,
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildCategoryChip(
    BuildContext context,
    Map<String, dynamic> category,
    bool isSelected,
    bool isDark,
  ) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        widget.onCategorySelected(category['name']);
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        width: 20.w,
        padding: EdgeInsets.symmetric(vertical: 2.h, horizontal: 2.w),
        decoration: BoxDecoration(
          color: isSelected
              ? (category['color'] as Color).withValues(alpha: 0.15)
              : (isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected
                ? (category['color'] as Color)
                : (isDark ? AppTheme.borderDark : AppTheme.borderLight),
            width: isSelected ? 2.0 : 1.0,
          ),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: (category['color'] as Color).withValues(alpha: 0.3),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ]
              : [
                  BoxShadow(
                    color: isDark
                        ? Colors.white.withValues(alpha: 0.05)
                        : Colors.black.withValues(alpha: 0.08),
                    blurRadius: 4,
                    offset: const Offset(0, 1),
                  ),
                ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: category['icon'],
              size: 6.w,
              color: isSelected
                  ? (category['color'] as Color)
                  : (isDark
                      ? AppTheme.textSecondaryDark
                      : AppTheme.textSecondaryLight),
            ),
            SizedBox(height: 1.h),
            Text(
              category['name'],
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: isSelected
                        ? (category['color'] as Color)
                        : (isDark
                            ? AppTheme.textSecondaryDark
                            : AppTheme.textSecondaryLight),
                    fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                  ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}
