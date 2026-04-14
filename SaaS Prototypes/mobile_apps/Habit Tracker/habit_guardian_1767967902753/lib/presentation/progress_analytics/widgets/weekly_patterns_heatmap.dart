import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class WeeklyPatternsHeatmap extends StatefulWidget {
  const WeeklyPatternsHeatmap({super.key});

  @override
  State<WeeklyPatternsHeatmap> createState() => _WeeklyPatternsHeatmapState();
}

class _WeeklyPatternsHeatmapState extends State<WeeklyPatternsHeatmap> {
  final List<String> weekDays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ];
  final List<String> timeSlots = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];

  // Mock completion intensity data (0.0 to 1.0)
  final List<List<double>> heatmapData = [
    [0.9, 0.8, 0.6, 0.4, 0.7, 0.5, 0.3], // 6AM
    [0.7, 0.9, 0.8, 0.6, 0.8, 0.4, 0.2], // 9AM
    [0.3, 0.4, 0.5, 0.7, 0.6, 0.3, 0.4], // 12PM
    [0.2, 0.3, 0.4, 0.6, 0.5, 0.4, 0.3], // 3PM
    [0.6, 0.7, 0.8, 0.9, 0.8, 0.6, 0.5], // 6PM
    [0.8, 0.9, 0.7, 0.6, 0.7, 0.8, 0.9], // 9PM
  ];

  String? selectedCell;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.white.withValues(alpha: 0.05)
                : Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Weekly Patterns',
            style: theme.textTheme.titleLarge?.copyWith(
              color:
                  isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Optimal completion times revealed',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: isDark
                  ? AppTheme.textSecondaryDark
                  : AppTheme.textSecondaryLight,
            ),
          ),
          SizedBox(height: 3.h),

          // Heatmap grid
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Column(
              children: [
                // Day headers
                Row(
                  children: [
                    SizedBox(width: 12.w), // Space for time labels
                    ...weekDays
                        .map((day) => Container(
                              width: 10.w,
                              padding: EdgeInsets.symmetric(vertical: 1.h),
                              child: Text(
                                day,
                                textAlign: TextAlign.center,
                                style: theme.textTheme.labelMedium?.copyWith(
                                  color: isDark
                                      ? AppTheme.textSecondaryDark
                                      : AppTheme.textSecondaryLight,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ))
                        .toList(),
                  ],
                ),

                // Heatmap cells
                ...heatmapData.asMap().entries.map((timeEntry) {
                  final timeIndex = timeEntry.key;
                  final dayData = timeEntry.value;

                  return Row(
                    children: [
                      // Time label
                      Container(
                        width: 12.w,
                        padding: EdgeInsets.symmetric(vertical: 1.h),
                        child: Text(
                          timeSlots[timeIndex],
                          style: theme.textTheme.labelMedium?.copyWith(
                            color: isDark
                                ? AppTheme.textSecondaryDark
                                : AppTheme.textSecondaryLight,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),

                      // Day cells
                      ...dayData.asMap().entries.map((dayEntry) {
                        final dayIndex = dayEntry.key;
                        final intensity = dayEntry.value;
                        final cellKey = '${timeIndex}_$dayIndex';
                        final isSelected = selectedCell == cellKey;

                        return GestureDetector(
                          onTap: () {
                            setState(() {
                              selectedCell = isSelected ? null : cellKey;
                            });
                          },
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            width: 10.w,
                            height: 6.h,
                            margin: EdgeInsets.all(0.5.w),
                            decoration: BoxDecoration(
                              color: _getHeatmapColor(intensity, isDark),
                              borderRadius: BorderRadius.circular(6),
                              border: isSelected
                                  ? Border.all(
                                      color: isDark
                                          ? AppTheme.accentDark
                                          : AppTheme.accentLight,
                                      width: 2,
                                    )
                                  : null,
                              boxShadow: isSelected
                                  ? [
                                      BoxShadow(
                                        color: (isDark
                                                ? AppTheme.accentDark
                                                : AppTheme.accentLight)
                                            .withValues(alpha: 0.3),
                                        blurRadius: 4,
                                        spreadRadius: 1,
                                      ),
                                    ]
                                  : null,
                            ),
                            child: isSelected
                                ? Center(
                                    child: Text(
                                      '${(intensity * 100).toInt()}%',
                                      style:
                                          theme.textTheme.labelSmall?.copyWith(
                                        color: intensity > 0.5
                                            ? (isDark
                                                ? AppTheme.primaryDark
                                                : AppTheme.primaryLight)
                                            : (isDark
                                                ? AppTheme.textPrimaryDark
                                                : AppTheme.textPrimaryLight),
                                        fontWeight: FontWeight.w600,
                                        fontSize: 8.sp,
                                      ),
                                    ),
                                  )
                                : null,
                          ),
                        );
                      }).toList(),
                    ],
                  );
                }).toList(),
              ],
            ),
          ),

          SizedBox(height: 3.h),

          // Legend
          Row(
            children: [
              Text(
                'Less',
                style: theme.textTheme.labelSmall?.copyWith(
                  color: isDark
                      ? AppTheme.textSecondaryDark
                      : AppTheme.textSecondaryLight,
                ),
              ),
              SizedBox(width: 2.w),
              ...List.generate(5, (index) {
                final intensity = (index + 1) / 5;
                return Container(
                  width: 4.w,
                  height: 2.h,
                  margin: EdgeInsets.symmetric(horizontal: 0.5.w),
                  decoration: BoxDecoration(
                    color: _getHeatmapColor(intensity, isDark),
                    borderRadius: BorderRadius.circular(2),
                  ),
                );
              }),
              SizedBox(width: 2.w),
              Text(
                'More',
                style: theme.textTheme.labelSmall?.copyWith(
                  color: isDark
                      ? AppTheme.textSecondaryDark
                      : AppTheme.textSecondaryLight,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Color _getHeatmapColor(double intensity, bool isDark) {
    final baseColor = isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight;
    final backgroundColor =
        isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight;

    if (intensity == 0.0) {
      return backgroundColor;
    }

    return Color.lerp(
      backgroundColor,
      baseColor,
      intensity,
    )!;
  }
}
