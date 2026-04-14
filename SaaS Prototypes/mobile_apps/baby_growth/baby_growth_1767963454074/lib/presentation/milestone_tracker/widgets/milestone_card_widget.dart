import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MilestoneCardWidget extends StatelessWidget {
  final Map<String, dynamic> milestone;
  final Color categoryColor;
  final Function(bool) onToggle;
  final VoidCallback onTap;
  final VoidCallback onAddNote;
  final VoidCallback onSetReminder;

  const MilestoneCardWidget({
    Key? key,
    required this.milestone,
    required this.categoryColor,
    required this.onToggle,
    required this.onTap,
    required this.onAddNote,
    required this.onSetReminder,
  }) : super(key: key);

  Color get _statusColor {
    final status = milestone['status'] as String;
    switch (status) {
      case 'achieved':
        return AppTheme.lightTheme.colorScheme.tertiary;
      case 'emerging':
        return const Color(0xFFFFB800);
      case 'upcoming':
        return AppTheme.lightTheme.colorScheme.onSurfaceVariant;
      default:
        return AppTheme.lightTheme.colorScheme.onSurfaceVariant;
    }
  }

  String get _statusText {
    final status = milestone['status'] as String;
    switch (status) {
      case 'achieved':
        return 'Achieved';
      case 'emerging':
        return 'Emerging';
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Not Started';
    }
  }

  @override
  Widget build(BuildContext context) {
    final isCompleted = milestone['isCompleted'] as bool? ?? false;
    final title = milestone['title'] as String? ?? '';
    final description = milestone['description'] as String? ?? '';
    final ageRange = milestone['ageRange'] as String? ?? '';
    final hasNote =
        milestone['note'] != null && (milestone['note'] as String).isNotEmpty;
    final hasReminder = milestone['hasReminder'] as bool? ?? false;

    return Dismissible(
      key: Key('milestone_${milestone['id']}'),
      background: Container(
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.tertiary,
          borderRadius: BorderRadius.circular(12),
        ),
        alignment: Alignment.centerLeft,
        padding: EdgeInsets.only(left: 4.w),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: 'check_circle',
              color: Colors.white,
              size: 6.w,
            ),
            SizedBox(height: 0.5.h),
            Text(
              'Complete',
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
      secondaryBackground: Container(
        decoration: BoxDecoration(
          color: const Color(0xFFFF9800),
          borderRadius: BorderRadius.circular(12),
        ),
        alignment: Alignment.centerRight,
        padding: EdgeInsets.only(right: 4.w),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: 'note_add',
              color: Colors.white,
              size: 6.w,
            ),
            SizedBox(height: 0.5.h),
            Text(
              'Add Note',
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
      confirmDismiss: (direction) async {
        if (direction == DismissDirection.startToEnd) {
          onToggle(!isCompleted);
        } else if (direction == DismissDirection.endToStart) {
          onAddNote();
        }
        return false; // Don't actually dismiss
      },
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: isCompleted
                ? AppTheme.lightTheme.colorScheme.tertiary
                    .withValues(alpha: 0.05)
                : AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isCompleted
                  ? AppTheme.lightTheme.colorScheme.tertiary
                      .withValues(alpha: 0.3)
                  : AppTheme.lightTheme.colorScheme.outline
                      .withValues(alpha: 0.2),
              width: 1,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: AppTheme.lightTheme.textTheme.titleSmall
                              ?.copyWith(
                            fontWeight: FontWeight.w600,
                            color: isCompleted
                                ? AppTheme.lightTheme.colorScheme.tertiary
                                : AppTheme.lightTheme.colorScheme.onSurface,
                            decoration:
                                isCompleted ? TextDecoration.lineThrough : null,
                          ),
                        ),
                        SizedBox(height: 0.5.h),
                        Text(
                          description,
                          style:
                              AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant,
                            height: 1.3,
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Switch(
                    value: isCompleted,
                    onChanged: onToggle,
                    activeColor: AppTheme.lightTheme.colorScheme.tertiary,
                    materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  ),
                ],
              ),
              SizedBox(height: 2.h),
              Row(
                children: [
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                    decoration: BoxDecoration(
                      color: _statusColor.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      _statusText,
                      style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                        color: _statusColor,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  SizedBox(width: 2.w),
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                    decoration: BoxDecoration(
                      color: categoryColor.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      ageRange,
                      style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                        color: categoryColor,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  const Spacer(),
                  if (hasNote)
                    Padding(
                      padding: EdgeInsets.only(right: 1.w),
                      child: CustomIconWidget(
                        iconName: 'note',
                        color: const Color(0xFFFF9800),
                        size: 4.w,
                      ),
                    ),
                  if (hasReminder)
                    CustomIconWidget(
                      iconName: 'notifications_active',
                      color: AppTheme.lightTheme.colorScheme.secondary,
                      size: 4.w,
                    ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
