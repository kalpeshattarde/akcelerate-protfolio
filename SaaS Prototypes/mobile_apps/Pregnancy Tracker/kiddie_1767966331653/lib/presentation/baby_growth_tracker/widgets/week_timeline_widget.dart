import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

class WeekTimelineWidget extends StatelessWidget {
  final int currentWeek;
  final int totalWeeks;
  final Function(int) onWeekSelected;

  const WeekTimelineWidget({
    super.key,
    required this.currentWeek,
    required this.totalWeeks,
    required this.onWeekSelected,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      height: 12.h,
      color: theme.colorScheme.surface,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.5.h),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Week $currentWeek of $totalWeeks',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  '${((currentWeek / totalWeeks) * 100).toStringAsFixed(0)}% Complete',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 2.w),
              itemCount: totalWeeks,
              itemBuilder: (context, index) {
                final week = index + 1;
                final isCurrentWeek = week == currentWeek;
                final isPastWeek = week < currentWeek;

                return GestureDetector(
                  onTap: () {
                    HapticFeedback.lightImpact();
                    onWeekSelected(week);
                  },
                  child: Container(
                    width: 14.w,
                    margin: EdgeInsets.symmetric(horizontal: 1.w),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 10.w,
                          height: 10.w,
                          decoration: BoxDecoration(
                            color: isCurrentWeek
                                ? theme.colorScheme.primary
                                : isPastWeek
                                    ? theme.colorScheme.primaryContainer
                                    : theme.colorScheme.surface,
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: isCurrentWeek || isPastWeek
                                  ? theme.colorScheme.primary
                                  : theme.colorScheme.outline
                                      .withValues(alpha: 0.3),
                              width: isCurrentWeek ? 2 : 1,
                            ),
                          ),
                          child: Center(
                            child: Text(
                              '$week',
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: isCurrentWeek
                                    ? theme.colorScheme.onPrimary
                                    : isPastWeek
                                        ? theme.colorScheme.primary
                                        : theme.colorScheme.onSurfaceVariant,
                                fontWeight: isCurrentWeek
                                    ? FontWeight.w700
                                    : FontWeight.w500,
                              ),
                            ),
                          ),
                        ),
                        if (isCurrentWeek) ...[
                          SizedBox(height: 0.5.h),
                          Container(
                            width: 4,
                            height: 4,
                            decoration: BoxDecoration(
                              color: theme.colorScheme.primary,
                              shape: BoxShape.circle,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
