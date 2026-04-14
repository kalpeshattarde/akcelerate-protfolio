import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class FilterBottomSheetWidget extends StatefulWidget {
  final Map<String, List<String>> filterOptions;
  final Map<String, String> selectedFilters;
  final Function(Map<String, String>) onFiltersChanged;

  const FilterBottomSheetWidget({
    Key? key,
    required this.filterOptions,
    required this.selectedFilters,
    required this.onFiltersChanged,
  }) : super(key: key);

  @override
  State<FilterBottomSheetWidget> createState() =>
      _FilterBottomSheetWidgetState();
}

class _FilterBottomSheetWidgetState extends State<FilterBottomSheetWidget> {
  late Map<String, String> _tempFilters;
  final Map<String, bool> _expandedSections = {};

  @override
  void initState() {
    super.initState();
    _tempFilters = Map.from(widget.selectedFilters);

    // Initialize expanded state for all sections
    for (String category in widget.filterOptions.keys) {
      _expandedSections[category] = true;
    }
  }

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      height: 80.h,
      decoration: BoxDecoration(
        color: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
      ),
      child: Column(
        children: [
          // Handle Bar
          Container(
            margin: EdgeInsets.only(top: 1.h),
            width: 12.w,
            height: 0.5.h,
            decoration: BoxDecoration(
              color: isDark ? AppTheme.dividerDark : AppTheme.dividerLight,
              borderRadius: BorderRadius.circular(10),
            ),
          ),

          // Header
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Filter Recipes',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                ),
                TextButton(
                  onPressed: () {
                    setState(() {
                      _tempFilters.clear();
                    });
                  },
                  child: Text(
                    'Clear All',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: isDark
                              ? AppTheme.primaryDark
                              : AppTheme.primaryLight,
                          fontWeight: FontWeight.w500,
                        ),
                  ),
                ),
              ],
            ),
          ),

          Divider(
            color: isDark ? AppTheme.dividerDark : AppTheme.dividerLight,
            height: 1,
          ),

          // Filter Options
          Expanded(
            child: ListView(
              padding: EdgeInsets.all(4.w),
              children: widget.filterOptions.entries.map((entry) {
                return _buildFilterSection(entry.key, entry.value, isDark);
              }).toList(),
            ),
          ),

          // Action Buttons
          Container(
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
              border: Border(
                top: BorderSide(
                  color: isDark ? AppTheme.dividerDark : AppTheme.dividerLight,
                  width: 1,
                ),
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.pop(context),
                    child: Text('Cancel'),
                  ),
                ),
                SizedBox(width: 4.w),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      widget.onFiltersChanged(_tempFilters);
                      Navigator.pop(context);
                    },
                    child: Text('Apply Filters'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterSection(
      String category, List<String> options, bool isDark) {
    final bool isExpanded = _expandedSections[category] ?? false;

    return Card(
      margin: EdgeInsets.only(bottom: 2.h),
      child: Column(
        children: [
          ListTile(
            title: Text(
              _formatCategoryName(category),
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
            ),
            trailing: CustomIconWidget(
              iconName: isExpanded ? 'expand_less' : 'expand_more',
              color: isDark
                  ? AppTheme.textSecondaryDark
                  : AppTheme.textSecondaryLight,
              size: 24,
            ),
            onTap: () {
              setState(() {
                _expandedSections[category] = !isExpanded;
              });
            },
          ),
          if (isExpanded) ...[
            Divider(
              color: isDark ? AppTheme.dividerDark : AppTheme.dividerLight,
              height: 1,
            ),
            Padding(
              padding: EdgeInsets.all(4.w),
              child: Wrap(
                spacing: 2.w,
                runSpacing: 1.h,
                children: options.map((option) {
                  final bool isSelected = _tempFilters[category] == option;

                  return GestureDetector(
                    onTap: () {
                      setState(() {
                        if (isSelected) {
                          _tempFilters.remove(category);
                        } else {
                          _tempFilters[category] = option;
                        }
                      });
                    },
                    child: Container(
                      padding:
                          EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? (isDark
                                ? AppTheme.primaryDark
                                : AppTheme.primaryLight)
                            : Colors.transparent,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: isSelected
                              ? (isDark
                                  ? AppTheme.primaryDark
                                  : AppTheme.primaryLight)
                              : (isDark
                                  ? AppTheme.dividerDark
                                  : AppTheme.dividerLight),
                          width: 1,
                        ),
                      ),
                      child: Text(
                        option,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: isSelected
                                  ? (isDark
                                      ? AppTheme.onPrimaryDark
                                      : AppTheme.onPrimaryLight)
                                  : (isDark
                                      ? AppTheme.textPrimaryDark
                                      : AppTheme.textPrimaryLight),
                              fontWeight: isSelected
                                  ? FontWeight.w600
                                  : FontWeight.w400,
                            ),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
          ],
        ],
      ),
    );
  }

  String _formatCategoryName(String category) {
    return category
        .split('_')
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(' ');
  }
}
