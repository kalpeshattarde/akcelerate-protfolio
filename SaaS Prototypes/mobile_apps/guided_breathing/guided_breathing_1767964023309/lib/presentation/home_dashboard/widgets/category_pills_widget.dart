import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class CategoryPillsWidget extends StatefulWidget {
  final Function(String) onCategorySelected;

  const CategoryPillsWidget({
    Key? key,
    required this.onCategorySelected,
  }) : super(key: key);

  @override
  State<CategoryPillsWidget> createState() => _CategoryPillsWidgetState();
}

class _CategoryPillsWidgetState extends State<CategoryPillsWidget> {
  String selectedCategory = 'All';

  final List<Map<String, dynamic>> categories = [
    {'name': 'All', 'color': AppTheme.lightTheme.colorScheme.secondary},
    {'name': 'Anxiety', 'color': AppTheme.errorColor},
    {'name': 'Sleep', 'color': AppTheme.particleColor},
    {'name': 'Focus', 'color': AppTheme.warningColor},
    {'name': 'Relaxation', 'color': AppTheme.accentColor},
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 6.h,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 4.w),
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final category = categories[index];
          final isSelected = selectedCategory == category['name'];

          return Padding(
            padding: EdgeInsets.only(right: 3.w),
            child: GestureDetector(
              onTap: () {
                setState(() {
                  selectedCategory = category['name'];
                });
                widget.onCategorySelected(category['name']);
              },
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: isSelected
                      ? category['color']
                      : AppTheme.lightTheme.colorScheme.surface,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: isSelected
                        ? category['color']
                        : AppTheme.lightTheme.colorScheme.onSurfaceVariant
                            .withValues(alpha: 0.3),
                    width: 1,
                  ),
                ),
                child: Center(
                  child: Text(
                    category['name'],
                    style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                      color: isSelected
                          ? AppTheme.lightTheme.colorScheme.onPrimary
                          : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      fontWeight:
                          isSelected ? FontWeight.w600 : FontWeight.w400,
                      fontSize: 11.sp,
                    ),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
