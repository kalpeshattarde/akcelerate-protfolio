import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class TodaysTasksCardWidget extends StatelessWidget {
  final List<Map<String, dynamic>> tasks;
  final Function(int) onTaskComplete;
  final Function(int) onTaskReschedule;

  const TodaysTasksCardWidget({
    super.key,
    required this.tasks,
    required this.onTaskComplete,
    required this.onTaskReschedule,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Container(
        width: double.infinity,
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Today\'s Tasks',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                Container(
                  padding:
                      EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.primary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '${tasks.where((task) => !(task['isCompleted'] as bool)).length}',
                    style: theme.textTheme.labelMedium?.copyWith(
                      color: theme.colorScheme.primary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 2.h),
            tasks.isEmpty
                ? _buildEmptyState(context)
                : ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: tasks.length,
                    separatorBuilder: (context, index) => SizedBox(height: 1.h),
                    itemBuilder: (context, index) {
                      final task = tasks[index];
                      return _buildTaskItem(context, task, index);
                    },
                  ),
          ],
        ),
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 4.h),
      child: Column(
        children: [
          CustomIconWidget(
            iconName: 'task_alt',
            color: theme.colorScheme.primary.withValues(alpha: 0.5),
            size: 12.w,
          ),
          SizedBox(height: 2.h),
          Text(
            'All tasks completed!',
            style: theme.textTheme.titleMedium?.copyWith(
              color: theme.colorScheme.onSurface.withValues(alpha: 0.7),
            ),
          ),
          SizedBox(height: 0.5.h),
          Text(
            'Great job taking care of your pets',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurface.withValues(alpha: 0.5),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTaskItem(
      BuildContext context, Map<String, dynamic> task, int index) {
    final theme = Theme.of(context);
    final isCompleted = task['isCompleted'] as bool;
    final isOverdue = task['isOverdue'] as bool? ?? false;

    return Dismissible(
      key: Key('task_${task['id']}'),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        padding: EdgeInsets.only(right: 4.w),
        decoration: BoxDecoration(
          color: theme.colorScheme.primary,
          borderRadius: BorderRadius.circular(12),
        ),
        child: CustomIconWidget(
          iconName: 'check',
          color: Colors.white,
          size: 6.w,
        ),
      ),
      onDismissed: (direction) => onTaskComplete(index),
      child: GestureDetector(
        onLongPress: () => _showTaskOptions(context, index),
        child: Container(
          padding: EdgeInsets.all(3.w),
          decoration: BoxDecoration(
            color: isCompleted
                ? theme.colorScheme.primary.withValues(alpha: 0.05)
                : isOverdue
                    ? theme.colorScheme.error.withValues(alpha: 0.05)
                    : theme.colorScheme.surface,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isCompleted
                  ? theme.colorScheme.primary.withValues(alpha: 0.2)
                  : isOverdue
                      ? theme.colorScheme.error.withValues(alpha: 0.3)
                      : theme.colorScheme.outline.withValues(alpha: 0.2),
              width: 1,
            ),
          ),
          child: Row(
            children: [
              GestureDetector(
                onTap: () => onTaskComplete(index),
                child: Container(
                  width: 6.w,
                  height: 6.w,
                  decoration: BoxDecoration(
                    color: isCompleted
                        ? theme.colorScheme.primary
                        : Colors.transparent,
                    border: Border.all(
                      color: isCompleted
                          ? theme.colorScheme.primary
                          : theme.colorScheme.outline,
                      width: 2,
                    ),
                    borderRadius: BorderRadius.circular(3.w),
                  ),
                  child: isCompleted
                      ? CustomIconWidget(
                          iconName: 'check',
                          color: Colors.white,
                          size: 3.w,
                        )
                      : null,
                ),
              ),
              SizedBox(width: 3.w),
              Container(
                padding: EdgeInsets.all(2.w),
                decoration: BoxDecoration(
                  color: _getTaskTypeColor(task['type'] as String, theme)
                      .withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: CustomIconWidget(
                  iconName: _getTaskIcon(task['type'] as String),
                  color: _getTaskTypeColor(task['type'] as String, theme),
                  size: 4.w,
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      task['title'] as String,
                      style: theme.textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w500,
                        color: isCompleted
                            ? theme.colorScheme.onSurface.withValues(alpha: 0.6)
                            : theme.colorScheme.onSurface,
                        decoration:
                            isCompleted ? TextDecoration.lineThrough : null,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                    SizedBox(height: 0.5.h),
                    Row(
                      children: [
                        Text(
                          task['petName'] as String,
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurface
                                .withValues(alpha: 0.6),
                          ),
                        ),
                        Text(
                          ' • ',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurface
                                .withValues(alpha: 0.4),
                          ),
                        ),
                        Text(
                          task['time'] as String,
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: isOverdue
                                ? theme.colorScheme.error
                                : theme.colorScheme.onSurface
                                    .withValues(alpha: 0.6),
                            fontWeight:
                                isOverdue ? FontWeight.w600 : FontWeight.w400,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              if (isOverdue && !isCompleted)
                Container(
                  padding:
                      EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.error,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    'Overdue',
                    style: theme.textTheme.labelSmall?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  void _showTaskOptions(BuildContext context, int index) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(
                  color: Theme.of(context)
                      .colorScheme
                      .outline
                      .withValues(alpha: 0.3),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'check_circle',
                  color: Theme.of(context).colorScheme.primary,
                  size: 24,
                ),
                title: const Text('Mark Complete'),
                onTap: () {
                  Navigator.pop(context);
                  onTaskComplete(index);
                },
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'schedule',
                  color: Theme.of(context).colorScheme.secondary,
                  size: 24,
                ),
                title: const Text('Reschedule'),
                onTap: () {
                  Navigator.pop(context);
                  onTaskReschedule(index);
                },
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  String _getTaskIcon(String type) {
    switch (type.toLowerCase()) {
      case 'medication':
        return 'medication';
      case 'feeding':
        return 'restaurant';
      case 'exercise':
        return 'directions_walk';
      case 'grooming':
        return 'content_cut';
      case 'vet':
        return 'local_hospital';
      default:
        return 'task';
    }
  }

  Color _getTaskTypeColor(String type, ThemeData theme) {
    switch (type.toLowerCase()) {
      case 'medication':
        return theme.colorScheme.error;
      case 'feeding':
        return theme.colorScheme.tertiary;
      case 'exercise':
        return theme.colorScheme.primary;
      case 'grooming':
        return theme.colorScheme.secondary;
      case 'vet':
        return const Color(0xFF9C27B0);
      default:
        return theme.colorScheme.onSurface;
    }
  }
}
