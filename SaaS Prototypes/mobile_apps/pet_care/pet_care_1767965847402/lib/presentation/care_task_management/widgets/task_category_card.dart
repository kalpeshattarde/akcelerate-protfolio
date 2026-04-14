import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class TaskCategoryCard extends StatelessWidget {
  final String title;
  final String iconName;
  final int taskCount;
  final int completedCount;
  final List<Map<String, dynamic>> tasks;
  final bool isExpanded;
  final VoidCallback onToggleExpanded;
  final Function(int) onTaskComplete;
  final Function(int) onTaskReschedule;
  final Function(int) onTaskSkip;
  final Function(int) onTaskAddNote;

  const TaskCategoryCard({
    super.key,
    required this.title,
    required this.iconName,
    required this.taskCount,
    required this.completedCount,
    required this.tasks,
    required this.isExpanded,
    required this.onToggleExpanded,
    required this.onTaskComplete,
    required this.onTaskReschedule,
    required this.onTaskSkip,
    required this.onTaskAddNote,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final progress = taskCount > 0 ? completedCount / taskCount : 0.0;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: theme.brightness == Brightness.light
                ? const Color(0x0A000000)
                : const Color(0x1A000000),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          _buildHeader(theme, progress),
          if (isExpanded) _buildTaskList(theme),
        ],
      ),
    );
  }

  Widget _buildHeader(ThemeData theme, double progress) {
    return InkWell(
      onTap: onToggleExpanded,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
        child: Row(
          children: [
            Container(
              width: 12.w,
              height: 6.h,
              decoration: BoxDecoration(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
                    : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: iconName,
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF2B5F75)
                      : const Color(0xFF4A8BA3),
                  size: 24,
                ),
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
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      Container(
                        padding: EdgeInsets.symmetric(
                            horizontal: 2.w, vertical: 0.5.h),
                        decoration: BoxDecoration(
                          color: completedCount == taskCount && taskCount > 0
                              ? const Color(0xFF28A745).withValues(alpha: 0.1)
                              : theme.brightness == Brightness.light
                                  ? const Color(0xFFE8A547)
                                      .withValues(alpha: 0.1)
                                  : const Color(0xFFEDB865)
                                      .withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          '$completedCount/$taskCount',
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: completedCount == taskCount && taskCount > 0
                                ? const Color(0xFF28A745)
                                : theme.brightness == Brightness.light
                                    ? const Color(0xFFE8A547)
                                    : const Color(0xFFEDB865),
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 1.h),
                  Row(
                    children: [
                      Expanded(
                        child: LinearProgressIndicator(
                          value: progress,
                          backgroundColor: theme.brightness == Brightness.light
                              ? const Color(0xFFE1E4E8)
                              : const Color(0xFF30363D),
                          valueColor: AlwaysStoppedAnimation<Color>(
                            completedCount == taskCount && taskCount > 0
                                ? const Color(0xFF28A745)
                                : theme.brightness == Brightness.light
                                    ? const Color(0xFF2B5F75)
                                    : const Color(0xFF4A8BA3),
                          ),
                        ),
                      ),
                      SizedBox(width: 2.w),
                      AnimatedRotation(
                        turns: isExpanded ? 0.5 : 0,
                        duration: const Duration(milliseconds: 200),
                        child: CustomIconWidget(
                          iconName: 'keyboard_arrow_down',
                          color: theme.brightness == Brightness.light
                              ? const Color(0xFF6A737D)
                              : const Color(0xFFADB5BD),
                          size: 20,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTaskList(ThemeData theme) {
    return Container(
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            color: theme.brightness == Brightness.light
                ? const Color(0xFFE1E4E8)
                : const Color(0xFF30363D),
            width: 1,
          ),
        ),
      ),
      child: ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: tasks.length,
        separatorBuilder: (context, index) => Divider(
          height: 1,
          color: theme.brightness == Brightness.light
              ? const Color(0xFFE1E4E8)
              : const Color(0xFF30363D),
        ),
        itemBuilder: (context, index) {
          final task = tasks[index];
          return _buildTaskItem(theme, task, index);
        },
      ),
    );
  }

  Widget _buildTaskItem(ThemeData theme, Map<String, dynamic> task, int index) {
    final isCompleted = task['isCompleted'] as bool;
    final petName = task['petName'] as String;
    final taskName = task['taskName'] as String;
    final scheduledTime = task['scheduledTime'] as String;
    final notes = task['notes'] as String?;

    return Dismissible(
      key: Key('task_${task['id']}'),
      background: _buildSwipeBackground(theme, true),
      secondaryBackground: _buildSwipeBackground(theme, false),
      onDismissed: (direction) {
        if (direction == DismissDirection.startToEnd) {
          onTaskComplete(index);
        } else {
          _showQuickActions(theme, index);
        }
      },
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
        child: Row(
          children: [
            GestureDetector(
              onTap: () => onTaskComplete(index),
              child: Container(
                width: 6.w,
                height: 6.w,
                decoration: BoxDecoration(
                  color: isCompleted
                      ? const Color(0xFF28A745)
                      : Colors.transparent,
                  border: Border.all(
                    color: isCompleted
                        ? const Color(0xFF28A745)
                        : theme.brightness == Brightness.light
                            ? const Color(0xFFE1E4E8)
                            : const Color(0xFF30363D),
                    width: 2,
                  ),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: isCompleted
                    ? CustomIconWidget(
                        iconName: 'check',
                        color: Colors.white,
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
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          taskName,
                          style: theme.textTheme.bodyMedium?.copyWith(
                            fontWeight: FontWeight.w500,
                            decoration:
                                isCompleted ? TextDecoration.lineThrough : null,
                            color: isCompleted
                                ? theme.brightness == Brightness.light
                                    ? const Color(0xFF6A737D)
                                    : const Color(0xFFADB5BD)
                                : null,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      Text(
                        scheduledTime,
                        style: theme.textTheme.labelSmall?.copyWith(
                          color: theme.brightness == Brightness.light
                              ? const Color(0xFF6A737D)
                              : const Color(0xFFADB5BD),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 0.5.h),
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.symmetric(
                            horizontal: 2.w, vertical: 0.5.h),
                        decoration: BoxDecoration(
                          color: theme.brightness == Brightness.light
                              ? const Color(0xFF7BA05B).withValues(alpha: 0.1)
                              : const Color(0xFF9BC474).withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          petName,
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: theme.brightness == Brightness.light
                                ? const Color(0xFF7BA05B)
                                : const Color(0xFF9BC474),
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                      if (notes != null && notes.isNotEmpty) ...[
                        SizedBox(width: 2.w),
                        CustomIconWidget(
                          iconName: 'note',
                          color: theme.brightness == Brightness.light
                              ? const Color(0xFFE8A547)
                              : const Color(0xFFEDB865),
                          size: 16,
                        ),
                      ],
                    ],
                  ),
                ],
              ),
            ),
            GestureDetector(
              onTap: () => _showQuickActions(theme, index),
              child: Container(
                padding: EdgeInsets.all(2.w),
                child: CustomIconWidget(
                  iconName: 'more_vert',
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                  size: 20,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSwipeBackground(ThemeData theme, bool isComplete) {
    return Container(
      alignment: isComplete ? Alignment.centerLeft : Alignment.centerRight,
      padding: EdgeInsets.symmetric(horizontal: 6.w),
      color: isComplete
          ? const Color(0xFF28A745).withValues(alpha: 0.1)
          : theme.brightness == Brightness.light
              ? const Color(0xFFE8A547).withValues(alpha: 0.1)
              : const Color(0xFFEDB865).withValues(alpha: 0.2),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: isComplete ? 'check_circle' : 'more_horiz',
            color: isComplete
                ? const Color(0xFF28A745)
                : theme.brightness == Brightness.light
                    ? const Color(0xFFE8A547)
                    : const Color(0xFFEDB865),
            size: 24,
          ),
          SizedBox(height: 0.5.h),
          Text(
            isComplete ? 'Complete' : 'Actions',
            style: theme.textTheme.labelSmall?.copyWith(
              color: isComplete
                  ? const Color(0xFF28A745)
                  : theme.brightness == Brightness.light
                      ? const Color(0xFFE8A547)
                      : const Color(0xFFEDB865),
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  void _showQuickActions(ThemeData theme, int index) {
    // This would typically show a bottom sheet with quick actions
    // For now, we'll call the respective callbacks
    onTaskReschedule(index);
  }
}
