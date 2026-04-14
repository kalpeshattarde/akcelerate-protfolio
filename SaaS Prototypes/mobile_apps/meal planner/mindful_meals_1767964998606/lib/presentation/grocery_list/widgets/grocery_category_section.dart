import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import './grocery_item_card.dart';

class GroceryCategorySection extends StatefulWidget {
  final String categoryName;
  final String iconName;
  final List<Map<String, dynamic>> items;
  final Function(String itemId, bool isCompleted) onItemToggle;
  final Function(String itemId) onItemEdit;
  final Function(String itemId) onItemRemove;
  final Function(String itemId, String note) onItemAddNote;
  final bool isExpanded;
  final Function() onToggleExpanded;

  const GroceryCategorySection({
    Key? key,
    required this.categoryName,
    required this.iconName,
    required this.items,
    required this.onItemToggle,
    required this.onItemEdit,
    required this.onItemRemove,
    required this.onItemAddNote,
    required this.isExpanded,
    required this.onToggleExpanded,
  }) : super(key: key);

  @override
  State<GroceryCategorySection> createState() => _GroceryCategorySectionState();
}

class _GroceryCategorySectionState extends State<GroceryCategorySection>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _expandAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _expandAnimation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );

    if (widget.isExpanded) {
      _animationController.value = 1.0;
    }
  }

  @override
  void didUpdateWidget(GroceryCategorySection oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isExpanded != oldWidget.isExpanded) {
      if (widget.isExpanded) {
        _animationController.forward();
      } else {
        _animationController.reverse();
      }
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final completedItems =
        widget.items.where((item) => item['isCompleted'] == true).toList();
    final activeItems =
        widget.items.where((item) => item['isCompleted'] != true).toList();
    final allItems = [...activeItems, ...completedItems];

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.cardColor,
        borderRadius: BorderRadius.circular(AppTheme.cardBorderRadius),
        boxShadow: AppTheme.lightWellnessShadow,
      ),
      child: Column(
        children: [
          InkWell(
            onTap: widget.onToggleExpanded,
            borderRadius: BorderRadius.circular(AppTheme.cardBorderRadius),
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              child: Row(
                children: [
                  Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.primary
                          .withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: CustomIconWidget(
                      iconName: widget.iconName,
                      color: AppTheme.lightTheme.colorScheme.primary,
                      size: 20,
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.categoryName,
                          style: AppTheme.lightTheme.textTheme.titleMedium
                              ?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        Text(
                          '${widget.items.length} items',
                          style:
                              AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                  AnimatedRotation(
                    turns: widget.isExpanded ? 0.5 : 0,
                    duration: const Duration(milliseconds: 300),
                    child: CustomIconWidget(
                      iconName: 'keyboard_arrow_down',
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      size: 24,
                    ),
                  ),
                ],
              ),
            ),
          ),
          SizeTransition(
            sizeFactor: _expandAnimation,
            child: widget.items.isNotEmpty
                ? Column(
                    children: [
                      Container(
                        height: 1,
                        color: AppTheme.lightTheme.dividerColor,
                        margin: EdgeInsets.symmetric(horizontal: 4.w),
                      ),
                      ListView.separated(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        padding: EdgeInsets.symmetric(
                            horizontal: 4.w, vertical: 1.h),
                        itemCount: allItems.length,
                        separatorBuilder: (context, index) =>
                            SizedBox(height: 1.h),
                        itemBuilder: (context, index) {
                          final item = allItems[index];
                          return GroceryItemCard(
                            item: item,
                            onToggle: (isCompleted) =>
                                widget.onItemToggle(item['id'], isCompleted),
                            onEdit: () => widget.onItemEdit(item['id']),
                            onRemove: () => widget.onItemRemove(item['id']),
                            onAddNote: (note) =>
                                widget.onItemAddNote(item['id'], note),
                          );
                        },
                      ),
                    ],
                  )
                : Container(
                    padding: EdgeInsets.all(4.w),
                    child: Text(
                      'No items in this category',
                      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                        fontStyle: FontStyle.italic,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}