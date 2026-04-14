import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

/// Habits tab content showing daily tracking with tap-to-log functionality
class HabitsTabContent extends StatefulWidget {
  const HabitsTabContent({super.key});

  @override
  State<HabitsTabContent> createState() => _HabitsTabContentState();
}

class _HabitsTabContentState extends State<HabitsTabContent> {
  // Mock habits data with tracking state
  final List<Map<String, dynamic>> habitsData = [
    {
      "id": 1,
      "name": "Water Intake",
      "icon": "water_drop",
      "target": 8,
      "current": 5,
      "unit": "glasses",
      "color": const Color(0xFF64B5F6),
      "streak": 7,
    },
    {
      "id": 2,
      "name": "Prenatal Vitamins",
      "icon": "medication",
      "target": 1,
      "current": 1,
      "unit": "dose",
      "color": const Color(0xFFE8B4B8),
      "streak": 14,
    },
    {
      "id": 3,
      "name": "Exercise",
      "icon": "directions_walk",
      "target": 30,
      "current": 20,
      "unit": "minutes",
      "color": const Color(0xFFA8C4A2),
      "streak": 3,
    },
    {
      "id": 4,
      "name": "Sleep",
      "icon": "bedtime",
      "target": 8,
      "current": 7,
      "unit": "hours",
      "color": const Color(0xFFD4A5A5),
      "streak": 5,
    },
  ];

  void _incrementHabit(int index) {
    setState(() {
      final current = habitsData[index]["current"] as int;
      final target = habitsData[index]["target"] as int;
      if (current < target) {
        habitsData[index]["current"] = current + 1;
      }
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("${habitsData[index]["name"]} logged!"),
        duration: const Duration(seconds: 1),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return SingleChildScrollView(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header section
          Text(
            "Daily Habits",
            style: theme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            "Build healthy routines for you and your baby",
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 3.h),

          // Habits list
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: habitsData.length,
            separatorBuilder: (context, index) => SizedBox(height: 2.h),
            itemBuilder: (context, index) {
              final habit = habitsData[index];
              final progress =
                  (habit["current"] as int) / (habit["target"] as int);
              final isComplete = habit["current"] >= habit["target"];

              return Container(
                padding: EdgeInsets.all(4.w),
                decoration: BoxDecoration(
                  color: theme.colorScheme.surface,
                  borderRadius: BorderRadius.circular(12.0),
                  border: isComplete
                      ? Border.all(
                          color:
                              (habit["color"] as Color).withValues(alpha: 0.5),
                          width: 2.0,
                        )
                      : null,
                  boxShadow: [
                    BoxShadow(
                      color: theme.colorScheme.shadow.withValues(alpha: 0.08),
                      blurRadius: 8.0,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Row(
                      children: [
                        // Icon
                        Container(
                          padding: EdgeInsets.all(2.w),
                          decoration: BoxDecoration(
                            color: (habit["color"] as Color)
                                .withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                          child: CustomIconWidget(
                            iconName: habit["icon"] as String,
                            color: habit["color"] as Color,
                            size: 24,
                          ),
                        ),
                        SizedBox(width: 3.w),

                        // Name and progress
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Text(
                                    habit["name"] as String,
                                    style:
                                        theme.textTheme.titleMedium?.copyWith(
                                      fontWeight: FontWeight.w600,
                                      color: theme.colorScheme.onSurface,
                                    ),
                                  ),
                                  if (isComplete) ...[
                                    SizedBox(width: 2.w),
                                    CustomIconWidget(
                                      iconName: 'check_circle',
                                      color: habit["color"] as Color,
                                      size: 20,
                                    ),
                                  ],
                                ],
                              ),
                              SizedBox(height: 0.5.h),
                              Text(
                                "${habit["current"]}/${habit["target"]} ${habit["unit"]}",
                                style: theme.textTheme.bodySmall?.copyWith(
                                  color: theme.colorScheme.onSurfaceVariant,
                                ),
                              ),
                            ],
                          ),
                        ),

                        // Streak badge
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 2.w, vertical: 0.5.h),
                          decoration: BoxDecoration(
                            color:
                                const Color(0xFFE8C4A0).withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              CustomIconWidget(
                                iconName: 'local_fire_department',
                                color: const Color(0xFFE8C4A0),
                                size: 16,
                              ),
                              SizedBox(width: 1.w),
                              Text(
                                "${habit["streak"]} days",
                                style: theme.textTheme.labelSmall?.copyWith(
                                  color: theme.colorScheme.onSurface,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 2.h),

                    // Progress bar
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4.0),
                      child: LinearProgressIndicator(
                        value: progress > 1.0 ? 1.0 : progress,
                        backgroundColor:
                            (habit["color"] as Color).withValues(alpha: 0.2),
                        valueColor: AlwaysStoppedAnimation<Color>(
                            habit["color"] as Color),
                        minHeight: 8.0,
                      ),
                    ),
                    SizedBox(height: 2.h),

                    // Action button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed:
                            isComplete ? null : () => _incrementHabit(index),
                        icon: CustomIconWidget(
                          iconName: isComplete ? 'check' : 'add',
                          color: isComplete
                              ? theme.colorScheme.onSurface
                                  .withValues(alpha: 0.5)
                              : theme.colorScheme.onPrimary,
                          size: 20,
                        ),
                        label: Text(
                            isComplete ? "Completed" : "Log ${habit["unit"]}"),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isComplete
                              ? theme.colorScheme.surface
                              : habit["color"] as Color,
                          foregroundColor: isComplete
                              ? theme.colorScheme.onSurface
                                  .withValues(alpha: 0.5)
                              : Colors.white,
                          elevation: isComplete ? 0 : 2,
                          padding: EdgeInsets.symmetric(vertical: 1.5.h),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
