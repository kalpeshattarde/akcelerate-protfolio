import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class GoalSelectionWidget extends StatefulWidget {
  final Function(List<String>) onGoalsSelected;
  final List<String> selectedGoals;

  const GoalSelectionWidget({
    Key? key,
    required this.onGoalsSelected,
    required this.selectedGoals,
  }) : super(key: key);

  @override
  State<GoalSelectionWidget> createState() => _GoalSelectionWidgetState();
}

class _GoalSelectionWidgetState extends State<GoalSelectionWidget> {
  final List<Map<String, dynamic>> goals = [
    {
      'title': 'Reduce Stress',
      'key': 'stress',
      'description': 'Find calm in daily chaos',
      'icon': 'self_improvement',
      'color': Color(0xFF4CAF50),
    },
    {
      'title': 'Better Sleep',
      'key': 'sleep',
      'description': 'Improve sleep quality naturally',
      'icon': 'bedtime',
      'color': Color(0xFF2196F3),
    },
    {
      'title': 'Manage Anxiety',
      'key': 'anxiety',
      'description': 'Build tools for anxious moments',
      'icon': 'psychology',
      'color': Color(0xFF9C27B0),
    },
    {
      'title': 'Increase Focus',
      'key': 'focus',
      'description': 'Enhance concentration and clarity',
      'icon': 'center_focus_strong',
      'color': Color(0xFFFF9800),
    },
    {
      'title': 'Emotional Balance',
      'key': 'balance',
      'description': 'Cultivate inner peace',
      'icon': 'balance',
      'color': Color(0xFF607D8B),
    },
    {
      'title': 'General Wellness',
      'key': 'wellness',
      'description': 'Overall mental health improvement',
      'icon': 'favorite',
      'color': Color(0xFFE91E63),
    },
  ];

  void _toggleGoal(String goalKey) {
    HapticFeedback.selectionClick();
    List<String> updatedGoals = List.from(widget.selectedGoals);

    if (updatedGoals.contains(goalKey)) {
      updatedGoals.remove(goalKey);
    } else {
      updatedGoals.add(goalKey);
    }

    widget.onGoalsSelected(updatedGoals);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          'What Are Your Wellness Goals?',
          style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface,
            fontWeight: FontWeight.w600,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 2.h),
        Text(
          'Select all that apply to personalize your experience',
          style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 4.h),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 3.w,
            mainAxisSpacing: 2.h,
            childAspectRatio: 1.1,
          ),
          itemCount: goals.length,
          itemBuilder: (context, index) {
            return _buildGoalCard(goals[index]);
          },
        ),
      ],
    );
  }

  Widget _buildGoalCard(Map<String, dynamic> goal) {
    final bool isSelected = widget.selectedGoals.contains(goal['key']);

    return GestureDetector(
      onTap: () => _toggleGoal(goal['key']),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: isSelected
              ? AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.2)
              : AppTheme.lightTheme.colorScheme.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected
                ? AppTheme.lightTheme.colorScheme.secondary
                : AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.3),
            width: isSelected ? 2 : 1,
          ),
          boxShadow: [
            BoxShadow(
              color:
                  AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.1),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                color: isSelected
                    ? goal['color']
                    : goal['color'].withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: goal['icon'],
                  color: Colors.white,
                  size: 24,
                ),
              ),
            ),
            SizedBox(height: 2.h),
            Text(
              goal['title'],
              style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurface,
                fontWeight: FontWeight.w600,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 0.5.h),
            Text(
              goal['description'],
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            if (isSelected) ...[
              SizedBox(height: 1.h),
              CustomIconWidget(
                iconName: 'check_circle',
                color: AppTheme.lightTheme.colorScheme.secondary,
                size: 20,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
