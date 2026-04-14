import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class RecordCardWidget extends StatefulWidget {
  final Map<String, dynamic> record;
  final VoidCallback? onTap;
  final VoidCallback? onEdit;
  final bool isSelected;
  final Function(bool)? onSelectionChanged;

  const RecordCardWidget({
    Key? key,
    required this.record,
    this.onTap,
    this.onEdit,
    this.isSelected = false,
    this.onSelectionChanged,
  }) : super(key: key);

  @override
  State<RecordCardWidget> createState() => _RecordCardWidgetState();
}

class _RecordCardWidgetState extends State<RecordCardWidget>
    with SingleTickerProviderStateMixin {
  bool _isExpanded = false;
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
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  String _getCategoryIcon(String category) {
    switch (category.toLowerCase()) {
      case 'growth':
        return 'trending_up';
      case 'feeding':
        return 'restaurant';
      case 'sleep':
        return 'bedtime';
      case 'milestone':
        return 'star';
      default:
        return 'event_note';
    }
  }

  Color _getCategoryColor(String category) {
    switch (category.toLowerCase()) {
      case 'growth':
        return AppTheme.getSuccessColor(true);
      case 'feeding':
        return AppTheme.lightTheme.colorScheme.secondary;
      case 'sleep':
        return AppTheme.lightTheme.colorScheme.primary;
      case 'milestone':
        return AppTheme.getWarningColor(true);
      default:
        return AppTheme.lightTheme.colorScheme.onSurfaceVariant;
    }
  }

  void _toggleExpanded() {
    setState(() {
      _isExpanded = !_isExpanded;
      if (_isExpanded) {
        _animationController.forward();
      } else {
        _animationController.reverse();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final category = widget.record['category'] as String? ?? 'General';
    final timestamp = widget.record['timestamp'] as DateTime? ?? DateTime.now();
    final title = widget.record['title'] as String? ?? 'Record';
    final description = widget.record['description'] as String? ?? '';
    final value = widget.record['value'] as String? ?? '';
    final unit = widget.record['unit'] as String? ?? '';
    final hasPhoto = widget.record['hasPhoto'] as bool? ?? false;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: widget.isSelected
            ? Border.all(
                color: AppTheme.lightTheme.colorScheme.primary,
                width: 2,
              )
            : null,
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          InkWell(
            onTap: () {
              if (widget.onSelectionChanged != null) {
                widget.onSelectionChanged!(!widget.isSelected);
              } else {
                _toggleExpanded();
                widget.onTap?.call();
              }
            },
            borderRadius: BorderRadius.circular(12),
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Row(
                children: [
                  if (widget.onSelectionChanged != null)
                    Padding(
                      padding: EdgeInsets.only(right: 3.w),
                      child: Checkbox(
                        value: widget.isSelected,
                        onChanged: (value) =>
                            widget.onSelectionChanged!(value ?? false),
                        activeColor: AppTheme.lightTheme.colorScheme.primary,
                      ),
                    ),
                  Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      color: _getCategoryColor(category).withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: CustomIconWidget(
                      iconName: _getCategoryIcon(category),
                      size: 20,
                      color: _getCategoryColor(category),
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                title,
                                style: AppTheme.lightTheme.textTheme.titleMedium
                                    ?.copyWith(
                                  fontWeight: FontWeight.w600,
                                  color:
                                      AppTheme.lightTheme.colorScheme.onSurface,
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            if (hasPhoto)
                              Padding(
                                padding: EdgeInsets.only(left: 2.w),
                                child: CustomIconWidget(
                                  iconName: 'photo_camera',
                                  size: 16,
                                  color: AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                                ),
                              ),
                          ],
                        ),
                        SizedBox(height: 0.5.h),
                        Row(
                          children: [
                            Text(
                              '${timestamp.hour.toString().padLeft(2, '0')}:${timestamp.minute.toString().padLeft(2, '0')}',
                              style: AppTheme.lightTheme.textTheme.bodySmall
                                  ?.copyWith(
                                color: AppTheme
                                    .lightTheme.colorScheme.onSurfaceVariant,
                              ),
                            ),
                            if (value.isNotEmpty) ...[
                              SizedBox(width: 2.w),
                              Container(
                                width: 4,
                                height: 4,
                                decoration: BoxDecoration(
                                  color: AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                                  shape: BoxShape.circle,
                                ),
                              ),
                              SizedBox(width: 2.w),
                              Text(
                                '$value $unit',
                                style: AppTheme.lightTheme.textTheme.bodySmall
                                    ?.copyWith(
                                  color: AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ],
                        ),
                      ],
                    ),
                  ),
                  if (widget.onSelectionChanged == null)
                    CustomIconWidget(
                      iconName: _isExpanded ? 'expand_less' : 'expand_more',
                      size: 20,
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                ],
              ),
            ),
          ),
          AnimatedBuilder(
            animation: _expandAnimation,
            builder: (context, child) {
              return ClipRect(
                child: Align(
                  alignment: Alignment.topCenter,
                  heightFactor: _expandAnimation.value,
                  child: child,
                ),
              );
            },
            child: Container(
              width: double.infinity,
              padding: EdgeInsets.fromLTRB(4.w, 0, 4.w, 4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Divider(
                    color: AppTheme.lightTheme.colorScheme.outline
                        .withValues(alpha: 0.3),
                    height: 1,
                  ),
                  SizedBox(height: 2.h),
                  if (description.isNotEmpty) ...[
                    Text(
                      'Details',
                      style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                      ),
                    ),
                    SizedBox(height: 1.h),
                    Text(
                      description,
                      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                      ),
                    ),
                    SizedBox(height: 2.h),
                  ],
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: widget.onEdit,
                          icon: CustomIconWidget(
                            iconName: 'edit',
                            size: 16,
                            color: AppTheme.lightTheme.colorScheme.primary,
                          ),
                          label: Text('Edit'),
                          style: OutlinedButton.styleFrom(
                            padding: EdgeInsets.symmetric(vertical: 1.5.h),
                          ),
                        ),
                      ),
                      SizedBox(width: 3.w),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () {
                            // Share functionality
                          },
                          icon: CustomIconWidget(
                            iconName: 'share',
                            size: 16,
                            color: AppTheme.lightTheme.colorScheme.primary,
                          ),
                          label: Text('Share'),
                          style: OutlinedButton.styleFrom(
                            padding: EdgeInsets.symmetric(vertical: 1.5.h),
                          ),
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
    );
  }
}
