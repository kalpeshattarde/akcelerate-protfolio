import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class GroceryItemCard extends StatefulWidget {
  final Map<String, dynamic> item;
  final Function(bool isCompleted) onToggle;
  final Function() onEdit;
  final Function() onRemove;
  final Function(String note) onAddNote;

  const GroceryItemCard({
    Key? key,
    required this.item,
    required this.onToggle,
    required this.onEdit,
    required this.onRemove,
    required this.onAddNote,
  }) : super(key: key);

  @override
  State<GroceryItemCard> createState() => _GroceryItemCardState();
}

class _GroceryItemCardState extends State<GroceryItemCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;
  bool _isCompleted = false;

  @override
  void initState() {
    super.initState();
    _isCompleted = widget.item['isCompleted'] ?? false;
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void didUpdateWidget(GroceryItemCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item['isCompleted'] != oldWidget.item['isCompleted']) {
      setState(() {
        _isCompleted = widget.item['isCompleted'] ?? false;
      });
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _handleToggle() {
    _animationController.forward().then((_) {
      _animationController.reverse();
      setState(() {
        _isCompleted = !_isCompleted;
      });
      widget.onToggle(_isCompleted);
    });
  }

  void _showNoteDialog() {
    final TextEditingController noteController = TextEditingController();
    noteController.text = widget.item['note'] ?? '';

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Add Note',
          style: AppTheme.lightTheme.textTheme.titleMedium,
        ),
        content: TextField(
          controller: noteController,
          decoration: const InputDecoration(
            hintText: 'Enter your note...',
            border: OutlineInputBorder(),
          ),
          maxLines: 3,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Cancel',
              style: TextStyle(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              widget.onAddNote(noteController.text);
              Navigator.pop(context);
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isCompleted = _isCompleted;
    final itemName = widget.item['name'] ?? '';
    final quantity = widget.item['quantity'] ?? '';
    final sourceMeal = widget.item['sourceMeal'] ?? '';
    final note = widget.item['note'] ?? '';

    return ScaleTransition(
      scale: _scaleAnimation,
      child: Slidable(
        key: ValueKey(widget.item['id']),
        startActionPane: ActionPane(
          motion: const ScrollMotion(),
          children: [
            SlidableAction(
              onPressed: (context) => _handleToggle(),
              backgroundColor: AppTheme.lightTheme.colorScheme.primary,
              foregroundColor: AppTheme.lightTheme.colorScheme.onPrimary,
              icon: isCompleted ? Icons.undo : Icons.check,
              label: isCompleted ? 'Undo' : 'Complete',
              borderRadius: BorderRadius.circular(8),
            ),
          ],
        ),
        endActionPane: ActionPane(
          motion: const ScrollMotion(),
          children: [
            SlidableAction(
              onPressed: (context) => widget.onEdit(),
              backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
              foregroundColor: AppTheme.lightTheme.colorScheme.onSecondary,
              icon: Icons.edit,
              label: 'Edit',
              borderRadius: BorderRadius.circular(8),
            ),
            SlidableAction(
              onPressed: (context) => _showNoteDialog(),
              backgroundColor: AppTheme.lightTheme.colorScheme.tertiary,
              foregroundColor: AppTheme.lightTheme.colorScheme.onTertiary,
              icon: Icons.note_add,
              label: 'Note',
              borderRadius: BorderRadius.circular(8),
            ),
            SlidableAction(
              onPressed: (context) => widget.onRemove(),
              backgroundColor: AppTheme.lightTheme.colorScheme.error,
              foregroundColor: AppTheme.lightTheme.colorScheme.onError,
              icon: Icons.delete,
              label: 'Remove',
              borderRadius: BorderRadius.circular(8),
            ),
          ],
        ),
        child: Container(
          padding: EdgeInsets.all(3.w),
          decoration: BoxDecoration(
            color: isCompleted
                ? AppTheme.lightTheme.colorScheme.surface.withValues(alpha: 0.5)
                : AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: isCompleted
                  ? AppTheme.lightTheme.dividerColor
                  : Colors.transparent,
              width: 1,
            ),
          ),
          child: Row(
            children: [
              GestureDetector(
                onTap: _handleToggle,
                child: Container(
                  width: 6.w,
                  height: 6.w,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: isCompleted
                          ? AppTheme.lightTheme.colorScheme.primary
                          : AppTheme.lightTheme.dividerColor,
                      width: 2,
                    ),
                    color: isCompleted
                        ? AppTheme.lightTheme.colorScheme.primary
                        : Colors.transparent,
                  ),
                  child: isCompleted
                      ? CustomIconWidget(
                          iconName: 'check',
                          color: AppTheme.lightTheme.colorScheme.onPrimary,
                          size: 16,
                        )
                      : null,
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      itemName,
                      style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                        decoration:
                            isCompleted ? TextDecoration.lineThrough : null,
                        color: isCompleted
                            ? AppTheme.lightTheme.colorScheme.onSurfaceVariant
                            : AppTheme.lightTheme.colorScheme.onSurface,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    if (quantity.isNotEmpty) ...[
                      SizedBox(height: 0.5.h),
                      Text(
                        quantity,
                        style:
                            AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                          color: isCompleted
                              ? AppTheme.lightTheme.colorScheme.onSurfaceVariant
                                  .withValues(alpha: 0.7)
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                    if (sourceMeal.isNotEmpty) ...[
                      SizedBox(height: 0.5.h),
                      Row(
                        children: [
                          CustomIconWidget(
                            iconName: 'restaurant',
                            color: AppTheme.lightTheme.colorScheme.primary,
                            size: 12,
                          ),
                          SizedBox(width: 1.w),
                          Text(
                            'From: $sourceMeal',
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                              color: AppTheme.lightTheme.colorScheme.primary,
                              fontSize: 10.sp,
                            ),
                          ),
                        ],
                      ),
                    ],
                    if (note.isNotEmpty) ...[
                      SizedBox(height: 0.5.h),
                      Row(
                        children: [
                          CustomIconWidget(
                            iconName: 'note',
                            color: AppTheme.lightTheme.colorScheme.secondary,
                            size: 12,
                          ),
                          SizedBox(width: 1.w),
                          Expanded(
                            child: Text(
                              note,
                              style: AppTheme.lightTheme.textTheme.bodySmall
                                  ?.copyWith(
                                color:
                                    AppTheme.lightTheme.colorScheme.secondary,
                                fontSize: 10.sp,
                                fontStyle: FontStyle.italic,
                              ),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ],
                ),
              ),
              CustomIconWidget(
                iconName: 'drag_handle',
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                    .withValues(alpha: 0.5),
                size: 20,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
