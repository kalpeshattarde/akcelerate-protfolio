import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class GoalSelectionWidget extends StatefulWidget {
  final Function(String) onGoalSelected;

  const GoalSelectionWidget({
    Key? key,
    required this.onGoalSelected,
  }) : super(key: key);

  @override
  State<GoalSelectionWidget> createState() => _GoalSelectionWidgetState();
}

class _GoalSelectionWidgetState extends State<GoalSelectionWidget> {
  String? selectedGoal;

  final List<Map<String, dynamic>> goals = [
    {
      'id': 'stress_relief',
      'title': 'Stress Relief',
      'description': 'Find calm and reduce daily stress',
      'icon': 'spa',
      'color': const Color(0xFF7FB069),
    },
    {
      'id': 'better_sleep',
      'title': 'Better Sleep',
      'description': 'Improve sleep quality and relaxation',
      'icon': 'bedtime',
      'color': const Color(0xFF6B73FF),
    },
    {
      'id': 'focus_improvement',
      'title': 'Focus Improvement',
      'description': 'Enhance concentration and mindfulness',
      'icon': 'psychology',
      'color': const Color(0xFFFF6B6B),
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100.w,
      padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 4.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'What\'s your meditation goal?',
            style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w700,
              color: AppTheme.lightTheme.colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 2.h),
          Text(
            'Choose your primary focus to personalize your experience',
            style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 4.h),
          Expanded(
            child: ListView.separated(
              itemCount: goals.length,
              separatorBuilder: (context, index) => SizedBox(height: 2.h),
              itemBuilder: (context, index) {
                final goal = goals[index];
                final isSelected = selectedGoal == goal['id'];

                return GestureDetector(
                  onTap: () {
                    setState(() {
                      selectedGoal = goal['id'];
                    });
                    widget.onGoalSelected(goal['id']);
                  },
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    padding: EdgeInsets.all(4.w),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.1)
                          : AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: isSelected
                            ? AppTheme.lightTheme.colorScheme.secondary
                            : AppTheme.lightTheme.colorScheme.outline
                                .withValues(alpha: 0.2),
                        width: isSelected ? 2 : 1,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: isSelected
                              ? AppTheme.lightTheme.colorScheme.secondary
                                  .withValues(alpha: 0.2)
                              : AppTheme.lightTheme.colorScheme.shadow
                                  .withValues(alpha: 0.05),
                          blurRadius: isSelected ? 12 : 8,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 12.w,
                          height: 12.w,
                          decoration: BoxDecoration(
                            color:
                                (goal['color'] as Color).withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(
                            child: CustomIconWidget(
                              iconName: goal['icon'],
                              color: goal['color'],
                              size: 6.w,
                            ),
                          ),
                        ),
                        SizedBox(width: 4.w),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                goal['title'],
                                style: AppTheme.lightTheme.textTheme.titleMedium
                                    ?.copyWith(
                                  fontWeight: FontWeight.w600,
                                  color:
                                      AppTheme.lightTheme.colorScheme.onSurface,
                                ),
                              ),
                              SizedBox(height: 0.5.h),
                              Text(
                                goal['description'],
                                style: AppTheme.lightTheme.textTheme.bodyMedium
                                    ?.copyWith(
                                  color: AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                                ),
                              ),
                            ],
                          ),
                        ),
                        if (isSelected)
                          Container(
                            width: 6.w,
                            height: 6.w,
                            decoration: BoxDecoration(
                              color: AppTheme.lightTheme.colorScheme.secondary,
                              shape: BoxShape.circle,
                            ),
                            child: Center(
                              child: CustomIconWidget(
                                iconName: 'check',
                                color:
                                    AppTheme.lightTheme.colorScheme.onSecondary,
                                size: 4.w,
                              ),
                            ),
                          ),
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
