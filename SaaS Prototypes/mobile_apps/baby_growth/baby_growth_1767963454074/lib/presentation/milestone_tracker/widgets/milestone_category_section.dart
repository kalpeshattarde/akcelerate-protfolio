import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import './milestone_card_widget.dart';

class MilestoneCategorySection extends StatefulWidget {
  final String categoryTitle;
  final List<Map<String, dynamic>> milestones;
  final Function(int milestoneId, bool isCompleted) onMilestoneToggle;
  final Function(Map<String, dynamic> milestone) onMilestoneDetails;
  final Function(Map<String, dynamic> milestone) onAddNote;
  final Function(Map<String, dynamic> milestone) onSetReminder;

  const MilestoneCategorySection({
    Key? key,
    required this.categoryTitle,
    required this.milestones,
    required this.onMilestoneToggle,
    required this.onMilestoneDetails,
    required this.onAddNote,
    required this.onSetReminder,
  }) : super(key: key);

  @override
  State<MilestoneCategorySection> createState() =>
      _MilestoneCategorySectionState();
}

class _MilestoneCategorySectionState extends State<MilestoneCategorySection> {
  bool _isExpanded = true;

  Color _getCategoryColor() {
    switch (widget.categoryTitle.toLowerCase()) {
      case 'motor skills':
        return AppTheme.lightTheme.colorScheme.tertiary;
      case 'language':
        return AppTheme.lightTheme.colorScheme.secondary;
      case 'social':
        return AppTheme.lightTheme.colorScheme.primary;
      case 'cognitive':
        return const Color(0xFFFF9800);
      default:
        return AppTheme.lightTheme.colorScheme.primary;
    }
  }

  int get _completedCount {
    return widget.milestones
        .where((milestone) => milestone['isCompleted'] == true)
        .length;
  }

  double get _completionPercentage {
    if (widget.milestones.isEmpty) return 0.0;
    return _completedCount / widget.milestones.length;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          InkWell(
            onTap: () {
              setState(() {
                _isExpanded = !_isExpanded;
              });
            },
            borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
            child: Container(
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                color: _getCategoryColor().withValues(alpha: 0.1),
                borderRadius: BorderRadius.vertical(
                  top: const Radius.circular(16),
                  bottom: _isExpanded ? Radius.zero : const Radius.circular(16),
                ),
              ),
              child: Row(
                children: [
                  Container(
                    width: 12.w,
                    height: 12.w,
                    decoration: BoxDecoration(
                      color: _getCategoryColor(),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Center(
                      child: CustomIconWidget(
                        iconName: _getCategoryIcon(),
                        color: Colors.white,
                        size: 6.w,
                      ),
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.categoryTitle,
                          style: AppTheme.lightTheme.textTheme.titleMedium
                              ?.copyWith(
                            fontWeight: FontWeight.w600,
                            color: AppTheme.lightTheme.colorScheme.onSurface,
                          ),
                        ),
                        SizedBox(height: 0.5.h),
                        Row(
                          children: [
                            Expanded(
                              child: Container(
                                height: 0.8.h,
                                decoration: BoxDecoration(
                                  color: _getCategoryColor()
                                      .withValues(alpha: 0.2),
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: FractionallySizedBox(
                                  alignment: Alignment.centerLeft,
                                  widthFactor: _completionPercentage,
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: _getCategoryColor(),
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(width: 2.w),
                            Text(
                              '$_completedCount/${widget.milestones.length}',
                              style: AppTheme.lightTheme.textTheme.bodySmall
                                  ?.copyWith(
                                fontWeight: FontWeight.w500,
                                color: _getCategoryColor(),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  CustomIconWidget(
                    iconName: _isExpanded ? 'expand_less' : 'expand_more',
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    size: 6.w,
                  ),
                ],
              ),
            ),
          ),
          AnimatedCrossFade(
            duration: const Duration(milliseconds: 300),
            crossFadeState: _isExpanded
                ? CrossFadeState.showSecond
                : CrossFadeState.showFirst,
            firstChild: const SizedBox.shrink(),
            secondChild: Padding(
              padding: EdgeInsets.all(4.w),
              child: Column(
                children: widget.milestones.map((milestone) {
                  return Padding(
                    padding: EdgeInsets.only(
                      bottom: milestone == widget.milestones.last ? 0 : 1.h,
                    ),
                    child: MilestoneCardWidget(
                      milestone: milestone,
                      categoryColor: _getCategoryColor(),
                      onToggle: (isCompleted) => widget.onMilestoneToggle(
                          milestone['id'], isCompleted),
                      onTap: () => widget.onMilestoneDetails(milestone),
                      onAddNote: () => widget.onAddNote(milestone),
                      onSetReminder: () => widget.onSetReminder(milestone),
                    ),
                  );
                }).toList(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  String _getCategoryIcon() {
    switch (widget.categoryTitle.toLowerCase()) {
      case 'motor skills':
        return 'directions_run';
      case 'language':
        return 'record_voice_over';
      case 'social':
        return 'people';
      case 'cognitive':
        return 'psychology';
      default:
        return 'star';
    }
  }
}
