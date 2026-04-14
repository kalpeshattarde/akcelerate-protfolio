import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SleepLogWidget extends StatelessWidget {
  final List<Map<String, dynamic>> sleepSessions;
  final Function(int) onEdit;
  final Function(int) onDelete;

  const SleepLogWidget({
    Key? key,
    required this.sleepSessions,
    required this.onEdit,
    required this.onDelete,
  }) : super(key: key);

  String _formatTime(DateTime dateTime) {
    String hour = dateTime.hour.toString().padLeft(2, '0');
    String minute = dateTime.minute.toString().padLeft(2, '0');
    return '$hour:$minute';
  }

  String _formatDuration(Duration duration) {
    int hours = duration.inHours;
    int minutes = duration.inMinutes.remainder(60);
    return '${hours}h ${minutes}m';
  }

  Color _getSleepTypeColor(String type) {
    switch (type.toLowerCase()) {
      case 'night':
        return AppTheme.lightTheme.colorScheme.primary;
      case 'nap':
        return AppTheme.lightTheme.colorScheme.secondary;
      default:
        return AppTheme.lightTheme.colorScheme.tertiary;
    }
  }

  String _getSleepTypeIcon(String type) {
    switch (type.toLowerCase()) {
      case 'night':
        return 'nights_stay';
      case 'nap':
        return 'wb_sunny';
      default:
        return 'bedtime';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(4.w),
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Sleep Log',
                  style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  '${sleepSessions.length} sessions',
                  style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
          sleepSessions.isEmpty
              ? Padding(
                  padding: EdgeInsets.all(4.w),
                  child: Center(
                    child: Column(
                      children: [
                        CustomIconWidget(
                          iconName: 'bedtime',
                          color:
                              AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                          size: 12.w,
                        ),
                        SizedBox(height: 2.h),
                        Text(
                          'No sleep sessions recorded yet',
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                        SizedBox(height: 1.h),
                        Text(
                          'Start tracking your baby\'s sleep patterns',
                          style:
                              AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                )
              : ListView.separated(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: sleepSessions.length,
                  separatorBuilder: (context, index) => Divider(
                    color: AppTheme.lightTheme.colorScheme.outline
                        .withValues(alpha: 0.2),
                    height: 1,
                  ),
                  itemBuilder: (context, index) {
                    final session = sleepSessions[index];
                    final startTime = session['startTime'] as DateTime;
                    final endTime = session['endTime'] as DateTime?;
                    final duration = session['duration'] as Duration;
                    final type = session['type'] as String;
                    final quality = session['quality'] as String?;
                    final notes = session['notes'] as String?;

                    return Slidable(
                      key: ValueKey(session['id']),
                      endActionPane: ActionPane(
                        motion: const ScrollMotion(),
                        children: [
                          SlidableAction(
                            onPressed: (context) => onEdit(index),
                            backgroundColor:
                                AppTheme.lightTheme.colorScheme.primary,
                            foregroundColor: Colors.white,
                            icon: Icons.edit,
                            label: 'Edit',
                          ),
                          SlidableAction(
                            onPressed: (context) => onDelete(index),
                            backgroundColor:
                                AppTheme.lightTheme.colorScheme.error,
                            foregroundColor: Colors.white,
                            icon: Icons.delete,
                            label: 'Delete',
                          ),
                        ],
                      ),
                      child: Padding(
                        padding: EdgeInsets.all(4.w),
                        child: Row(
                          children: [
                            Container(
                              width: 12.w,
                              height: 12.w,
                              decoration: BoxDecoration(
                                color: _getSleepTypeColor(type)
                                    .withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(2.w),
                              ),
                              child: Center(
                                child: CustomIconWidget(
                                  iconName: _getSleepTypeIcon(type),
                                  color: _getSleepTypeColor(type),
                                  size: 6.w,
                                ),
                              ),
                            ),
                            SizedBox(width: 3.w),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        '${type.toUpperCase()} SLEEP',
                                        style: AppTheme
                                            .lightTheme.textTheme.labelMedium
                                            ?.copyWith(
                                          color: _getSleepTypeColor(type),
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      Text(
                                        _formatDuration(duration),
                                        style: AppTheme
                                            .lightTheme.textTheme.titleMedium
                                            ?.copyWith(
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: 0.5.h),
                                  Row(
                                    children: [
                                      Text(
                                        _formatTime(startTime),
                                        style: AppTheme
                                            .lightTheme.textTheme.bodyMedium,
                                      ),
                                      Text(
                                        ' - ',
                                        style: AppTheme
                                            .lightTheme.textTheme.bodyMedium
                                            ?.copyWith(
                                          color: AppTheme.lightTheme.colorScheme
                                              .onSurfaceVariant,
                                        ),
                                      ),
                                      Text(
                                        endTime != null
                                            ? _formatTime(endTime)
                                            : 'Active',
                                        style: AppTheme
                                            .lightTheme.textTheme.bodyMedium
                                            ?.copyWith(
                                          color: endTime != null
                                              ? AppTheme.lightTheme.colorScheme
                                                  .onSurface
                                              : AppTheme.lightTheme.colorScheme
                                                  .primary,
                                        ),
                                      ),
                                    ],
                                  ),
                                  if (quality != null) ...[
                                    SizedBox(height: 0.5.h),
                                    Row(
                                      children: [
                                        CustomIconWidget(
                                          iconName: quality == 'peaceful'
                                              ? 'sentiment_satisfied'
                                              : quality == 'restless'
                                                  ? 'sentiment_dissatisfied'
                                                  : 'sentiment_neutral',
                                          color: quality == 'peaceful'
                                              ? AppTheme.getSuccessColor(true)
                                              : quality == 'restless'
                                                  ? AppTheme.getWarningColor(
                                                      true)
                                                  : AppTheme
                                                      .lightTheme
                                                      .colorScheme
                                                      .onSurfaceVariant,
                                          size: 4.w,
                                        ),
                                        SizedBox(width: 1.w),
                                        Text(
                                          quality.toUpperCase(),
                                          style: AppTheme
                                              .lightTheme.textTheme.labelSmall
                                              ?.copyWith(
                                            color: quality == 'peaceful'
                                                ? AppTheme.getSuccessColor(true)
                                                : quality == 'restless'
                                                    ? AppTheme.getWarningColor(
                                                        true)
                                                    : AppTheme
                                                        .lightTheme
                                                        .colorScheme
                                                        .onSurfaceVariant,
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                  if (notes != null && notes.isNotEmpty) ...[
                                    SizedBox(height: 0.5.h),
                                    Text(
                                      notes,
                                      style: AppTheme
                                          .lightTheme.textTheme.bodySmall
                                          ?.copyWith(
                                        color: AppTheme.lightTheme.colorScheme
                                            .onSurfaceVariant,
                                        fontStyle: FontStyle.italic,
                                      ),
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
        ],
      ),
    );
  }
}
