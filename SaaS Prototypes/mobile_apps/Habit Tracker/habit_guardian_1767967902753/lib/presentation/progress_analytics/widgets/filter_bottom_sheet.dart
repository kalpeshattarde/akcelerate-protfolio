import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class FilterBottomSheet extends StatefulWidget {
  final List<String> selectedCategories;
  final String selectedTimeRange;
  final Function(List<String>, String) onFiltersApplied;

  const FilterBottomSheet({
    super.key,
    required this.selectedCategories,
    required this.selectedTimeRange,
    required this.onFiltersApplied,
  });

  @override
  State<FilterBottomSheet> createState() => _FilterBottomSheetState();
}

class _FilterBottomSheetState extends State<FilterBottomSheet>
    with SingleTickerProviderStateMixin {
  late AnimationController _slideController;
  late Animation<Offset> _slideAnimation;

  late List<String> _tempSelectedCategories;
  late String _tempSelectedTimeRange;

  final List<Map<String, dynamic>> categories = [
    {"name": "Health & Fitness", "icon": "fitness_center", "color": "forest"},
    {"name": "Mindfulness", "icon": "self_improvement", "color": "terracotta"},
    {"name": "Learning", "icon": "menu_book", "color": "gold"},
    {"name": "Productivity", "icon": "work", "color": "forest"},
    {"name": "Social", "icon": "people", "color": "terracotta"},
    {"name": "Creative", "icon": "palette", "color": "gold"},
  ];

  final List<String> timeRanges = [
    "Last 7 days",
    "Last 30 days",
    "Last 3 months",
    "Last 6 months",
    "Last year",
    "All time",
  ];

  @override
  void initState() {
    super.initState();
    _tempSelectedCategories = List.from(widget.selectedCategories);
    _tempSelectedTimeRange = widget.selectedTimeRange;

    _slideController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _slideController,
      curve: Curves.easeOut,
    ));

    _slideController.forward();
  }

  @override
  void dispose() {
    _slideController.dispose();
    super.dispose();
  }

  Color _getCategoryColor(String colorType, bool isDark) {
    switch (colorType) {
      case 'forest':
        return isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight;
      case 'terracotta':
        return isDark ? AppTheme.accentDark : AppTheme.accentLight;
      case 'gold':
        return isDark ? AppTheme.premiumDark : AppTheme.premiumLight;
      default:
        return isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight;
    }
  }

  void _toggleCategory(String categoryName) {
    HapticFeedback.lightImpact();
    setState(() {
      if (_tempSelectedCategories.contains(categoryName)) {
        _tempSelectedCategories.remove(categoryName);
      } else {
        _tempSelectedCategories.add(categoryName);
      }
    });
  }

  void _applyFilters() {
    HapticFeedback.mediumImpact();
    widget.onFiltersApplied(_tempSelectedCategories, _tempSelectedTimeRange);
    Navigator.pop(context);
  }

  void _resetFilters() {
    HapticFeedback.lightImpact();
    setState(() {
      _tempSelectedCategories.clear();
      _tempSelectedTimeRange = "Last 30 days";
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return SlideTransition(
      position: _slideAnimation,
      child: Container(
        decoration: BoxDecoration(
          color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Handle bar
            Container(
              margin: EdgeInsets.only(top: 2.h),
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: isDark
                    ? AppTheme.borderDark.withValues(alpha: 0.5)
                    : AppTheme.borderLight.withValues(alpha: 0.7),
                borderRadius: BorderRadius.circular(2),
              ),
            ),

            // Header
            Padding(
              padding: EdgeInsets.all(4.w),
              child: Row(
                children: [
                  Text(
                    'Filter Analytics',
                    style: theme.textTheme.titleLarge?.copyWith(
                      color: isDark
                          ? AppTheme.textPrimaryDark
                          : AppTheme.textPrimaryLight,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const Spacer(),
                  TextButton(
                    onPressed: _resetFilters,
                    child: Text(
                      'Reset',
                      style: theme.textTheme.labelLarge?.copyWith(
                        color:
                            isDark ? AppTheme.accentDark : AppTheme.accentLight,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            Expanded(
              child: SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Categories section
                    Text(
                      'Habit Categories',
                      style: theme.textTheme.titleMedium?.copyWith(
                        color: isDark
                            ? AppTheme.textPrimaryDark
                            : AppTheme.textPrimaryLight,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(height: 2.h),
                    Wrap(
                      spacing: 2.w,
                      runSpacing: 1.h,
                      children: categories.map((category) {
                        final categoryName = category["name"] as String;
                        final isSelected =
                            _tempSelectedCategories.contains(categoryName);
                        final categoryColor = _getCategoryColor(
                            category["color"] as String, isDark);

                        return GestureDetector(
                          onTap: () => _toggleCategory(categoryName),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            padding: EdgeInsets.symmetric(
                                horizontal: 4.w, vertical: 1.5.h),
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? categoryColor.withValues(alpha: 0.1)
                                  : (isDark
                                          ? AppTheme.borderDark
                                          : AppTheme.borderLight)
                                      .withValues(alpha: 0.3),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: isSelected
                                    ? categoryColor
                                    : (isDark
                                        ? AppTheme.borderDark
                                        : AppTheme.borderLight),
                                width: isSelected ? 2 : 1,
                              ),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                CustomIconWidget(
                                  iconName: category["icon"] as String,
                                  color: isSelected
                                      ? categoryColor
                                      : (isDark
                                          ? AppTheme.textSecondaryDark
                                          : AppTheme.textSecondaryLight),
                                  size: 16,
                                ),
                                SizedBox(width: 2.w),
                                Text(
                                  categoryName,
                                  style: theme.textTheme.labelMedium?.copyWith(
                                    color: isSelected
                                        ? categoryColor
                                        : (isDark
                                            ? AppTheme.textSecondaryDark
                                            : AppTheme.textSecondaryLight),
                                    fontWeight: isSelected
                                        ? FontWeight.w600
                                        : FontWeight.w400,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      }).toList(),
                    ),

                    SizedBox(height: 4.h),

                    // Time range section
                    Text(
                      'Time Range',
                      style: theme.textTheme.titleMedium?.copyWith(
                        color: isDark
                            ? AppTheme.textPrimaryDark
                            : AppTheme.textPrimaryLight,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(height: 2.h),
                    ...timeRanges.map((timeRange) {
                      final isSelected = _tempSelectedTimeRange == timeRange;

                      return GestureDetector(
                        onTap: () {
                          HapticFeedback.lightImpact();
                          setState(() {
                            _tempSelectedTimeRange = timeRange;
                          });
                        },
                        child: Container(
                          margin: EdgeInsets.only(bottom: 1.h),
                          padding: EdgeInsets.symmetric(
                              horizontal: 4.w, vertical: 2.h),
                          decoration: BoxDecoration(
                            color: isSelected
                                ? (isDark
                                        ? AppTheme.secondaryDark
                                        : AppTheme.secondaryLight)
                                    .withValues(alpha: 0.1)
                                : Colors.transparent,
                            borderRadius: BorderRadius.circular(12),
                            border: isSelected
                                ? Border.all(
                                    color: isDark
                                        ? AppTheme.secondaryDark
                                        : AppTheme.secondaryLight,
                                    width: 2,
                                  )
                                : null,
                          ),
                          child: Row(
                            children: [
                              CustomIconWidget(
                                iconName: isSelected
                                    ? 'radio_button_checked'
                                    : 'radio_button_unchecked',
                                color: isSelected
                                    ? (isDark
                                        ? AppTheme.secondaryDark
                                        : AppTheme.secondaryLight)
                                    : (isDark
                                        ? AppTheme.textSecondaryDark
                                        : AppTheme.textSecondaryLight),
                                size: 20,
                              ),
                              SizedBox(width: 3.w),
                              Text(
                                timeRange,
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  color: isSelected
                                      ? (isDark
                                          ? AppTheme.textPrimaryDark
                                          : AppTheme.textPrimaryLight)
                                      : (isDark
                                          ? AppTheme.textSecondaryDark
                                          : AppTheme.textSecondaryLight),
                                  fontWeight: isSelected
                                      ? FontWeight.w500
                                      : FontWeight.w400,
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    }).toList(),

                    SizedBox(height: 4.h),
                  ],
                ),
              ),
            ),

            // Apply button
            Container(
              padding: EdgeInsets.all(4.w),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _applyFilters,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: isDark
                        ? AppTheme.secondaryDark
                        : AppTheme.secondaryLight,
                    foregroundColor:
                        isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
                    padding: EdgeInsets.symmetric(vertical: 2.h),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: Text(
                    'Apply Filters',
                    style: theme.textTheme.labelLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ),

            SizedBox(height: MediaQuery.of(context).padding.bottom),
          ],
        ),
      ),
    );
  }
}
