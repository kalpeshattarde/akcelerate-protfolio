import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class SearchHeaderWidget extends StatelessWidget {
  final TextEditingController controller;
  final Function(String) onSearchChanged;
  final VoidCallback onVoiceSearch;

  const SearchHeaderWidget({
    super.key,
    required this.controller,
    required this.onSearchChanged,
    required this.onVoiceSearch,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color: theme.colorScheme.shadow.withValues(alpha: 0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Search Bar
          Container(
            decoration: BoxDecoration(
              color: theme.scaffoldBackgroundColor,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: theme.colorScheme.outline.withValues(alpha: 0.3),
                width: 1,
              ),
            ),
            child: TextField(
              controller: controller,
              onChanged: onSearchChanged,
              style: theme.textTheme.bodyLarge,
              decoration: InputDecoration(
                hintText: 'Search articles, tips, topics...',
                hintStyle: theme.textTheme.bodyLarge?.copyWith(
                  color:
                      theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
                ),
                prefixIcon: Padding(
                  padding: EdgeInsets.all(3.w),
                  child: CustomIconWidget(
                    iconName: 'search',
                    size: 24,
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                suffixIcon: controller.text.isNotEmpty
                    ? Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: CustomIconWidget(
                              iconName: 'clear',
                              size: 20,
                              color: theme.colorScheme.onSurfaceVariant,
                            ),
                            onPressed: () {
                              controller.clear();
                              onSearchChanged('');
                            },
                            tooltip: 'Clear search',
                          ),
                          Container(
                            width: 1,
                            height: 24,
                            color: theme.colorScheme.outline
                                .withValues(alpha: 0.3),
                          ),
                          IconButton(
                            icon: CustomIconWidget(
                              iconName: 'mic',
                              size: 24,
                              color: theme.colorScheme.primary,
                            ),
                            onPressed: onVoiceSearch,
                            tooltip: 'Voice search',
                          ),
                        ],
                      )
                    : IconButton(
                        icon: CustomIconWidget(
                          iconName: 'mic',
                          size: 24,
                          color: theme.colorScheme.primary,
                        ),
                        onPressed: onVoiceSearch,
                        tooltip: 'Voice search',
                      ),
                border: InputBorder.none,
                contentPadding: EdgeInsets.symmetric(
                  horizontal: 4.w,
                  vertical: 1.5.h,
                ),
              ),
            ),
          ),

          SizedBox(height: 1.5.h),

          // Quick Search Suggestions
          Wrap(
            spacing: 2.w,
            runSpacing: 1.h,
            children: [
              _buildQuickSearchChip(
                context,
                'Nutrition',
                Icons.restaurant_outlined,
              ),
              _buildQuickSearchChip(
                context,
                'Exercise',
                Icons.fitness_center_outlined,
              ),
              _buildQuickSearchChip(
                context,
                'Mental Health',
                Icons.psychology_outlined,
              ),
              _buildQuickSearchChip(
                context,
                'Sleep',
                Icons.bedtime_outlined,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildQuickSearchChip(
    BuildContext context,
    String label,
    IconData icon,
  ) {
    final theme = Theme.of(context);

    return InkWell(
      onTap: () {
        controller.text = label;
        onSearchChanged(label);
      },
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 0.8.h),
        decoration: BoxDecoration(
          color: theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: theme.colorScheme.primary.withValues(alpha: 0.3),
            width: 1,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 16,
              color: theme.colorScheme.primary,
            ),
            SizedBox(width: 1.w),
            Text(
              label,
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.primary,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
