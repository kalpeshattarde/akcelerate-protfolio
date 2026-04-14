import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class LearningGoalsWidget extends StatefulWidget {
  final Function(int, String) onGoalSelected;

  const LearningGoalsWidget({Key? key, required this.onGoalSelected})
    : super(key: key);

  @override
  State<LearningGoalsWidget> createState() => _LearningGoalsWidgetState();
}

class _LearningGoalsWidgetState extends State<LearningGoalsWidget> {
  int selectedTimeIndex = 1; // Default to 15 minutes
  String selectedGoal = 'Travel';

  final List<Map<String, dynamic>> timeCommitments = [
    {
      "minutes": 5,
      "title": "Quick Start",
      "description": "Perfect for busy schedules",
      "icon": "flash_on",
      "color": Colors.orange,
    },
    {
      "minutes": 15,
      "title": "Steady Progress",
      "description": "Recommended for most learners",
      "icon": "trending_up",
      "color": Colors.green,
    },
    {
      "minutes": 30,
      "title": "Fast Track",
      "description": "Accelerated learning path",
      "icon": "rocket_launch",
      "color": Colors.blue,
    },
    {
      "minutes": 45,
      "title": "Intensive",
      "description": "Maximum progress potential",
      "icon": "local_fire_department",
      "color": Colors.red,
    },
  ];

  final List<Map<String, dynamic>> learningGoals = [
    {
      "goal": "Travel",
      "description": "Essential phrases for your adventures",
      "icon": "flight",
      "color": Colors.blue,
    },
    {
      "goal": "Business",
      "description": "Professional communication skills",
      "icon": "business_center",
      "color": Colors.indigo,
    },
    {
      "goal": "Academic",
      "description": "Study abroad preparation",
      "icon": "school",
      "color": Colors.purple,
    },
    {
      "goal": "Personal",
      "description": "Connect with family and friends",
      "icon": "favorite",
      "color": Colors.pink,
    },
    {
      "goal": "Culture",
      "description": "Explore literature and media",
      "icon": "library_books",
      "color": Colors.teal,
    },
    {
      "goal": "General",
      "description": "Well-rounded language skills",
      "icon": "language",
      "color": Colors.orange,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(height: 4.h),
        Text(
          'Set Your Goals',
          style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 2.h),
        Text(
          'Choose your daily commitment and learning focus\nto create your personalized journey',
          style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface.withValues(
              alpha: 0.7,
            ),
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 4.h),

        // Daily Commitment Section
        Container(
          padding: EdgeInsets.all(4.w),
          margin: EdgeInsets.symmetric(horizontal: 4.w),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: AppTheme.lightTheme.colorScheme.outline.withValues(
                alpha: 0.2,
              ),
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 10,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CustomIconWidget(
                    iconName: 'schedule',
                    color: AppTheme.lightTheme.colorScheme.primary,
                    size: 6.w,
                  ),
                  SizedBox(width: 3.w),
                  Text(
                    'Daily Commitment',
                    style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 3.h),
              SizedBox(
                height: 12.h,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: timeCommitments.length,
                  itemBuilder: (context, index) {
                    final commitment = timeCommitments[index];
                    final isSelected = index == selectedTimeIndex;

                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          selectedTimeIndex = index;
                        });
                        widget.onGoalSelected(
                          commitment["minutes"] as int,
                          selectedGoal,
                        );
                      },
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        width: 35.w,
                        margin: EdgeInsets.only(right: 3.w),
                        padding: EdgeInsets.all(3.w),
                        decoration: BoxDecoration(
                          color:
                              isSelected
                                  ? (commitment["color"] as Color).withValues(
                                    alpha: 0.1,
                                  )
                                  : AppTheme.lightTheme.colorScheme.surface,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color:
                                isSelected
                                    ? (commitment["color"] as Color)
                                    : AppTheme.lightTheme.colorScheme.outline
                                        .withValues(alpha: 0.3),
                            width: isSelected ? 2 : 1,
                          ),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconWidget(
                              iconName: commitment["icon"] as String,
                              color:
                                  isSelected
                                      ? (commitment["color"] as Color)
                                      : AppTheme
                                          .lightTheme
                                          .colorScheme
                                          .onSurface
                                          .withValues(alpha: 0.6),
                              size: 6.w,
                            ),
                            SizedBox(height: 1.h),
                            Text(
                              '${commitment["minutes"]} min',
                              style: AppTheme.lightTheme.textTheme.titleMedium
                                  ?.copyWith(
                                    fontWeight: FontWeight.bold,
                                    color:
                                        isSelected
                                            ? (commitment["color"] as Color)
                                            : AppTheme
                                                .lightTheme
                                                .colorScheme
                                                .onSurface,
                                  ),
                            ),
                            Text(
                              commitment["title"] as String,
                              style: AppTheme.lightTheme.textTheme.bodySmall
                                  ?.copyWith(
                                    color:
                                        isSelected
                                            ? (commitment["color"] as Color)
                                            : AppTheme
                                                .lightTheme
                                                .colorScheme
                                                .onSurface
                                                .withValues(alpha: 0.7),
                                  ),
                              textAlign: TextAlign.center,
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
        ),

        SizedBox(height: 4.h),

        // Learning Goals Section
        Container(
          padding: EdgeInsets.all(4.w),
          margin: EdgeInsets.symmetric(horizontal: 4.w),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: AppTheme.lightTheme.colorScheme.outline.withValues(
                alpha: 0.2,
              ),
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 10,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CustomIconWidget(
                    iconName: 'flag',
                    color: AppTheme.lightTheme.colorScheme.primary,
                    size: 6.w,
                  ),
                  SizedBox(width: 3.w),
                  Text(
                    'Learning Focus',
                    style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 3.h),
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 3.w,
                  mainAxisSpacing: 2.h,
                  childAspectRatio: 3.0,
                ),
                itemCount: learningGoals.length,
                itemBuilder: (context, index) {
                  final goal = learningGoals[index];
                  final isSelected = goal["goal"] == selectedGoal;

                  return GestureDetector(
                    onTap: () {
                      setState(() {
                        selectedGoal = goal["goal"] as String;
                      });
                      widget.onGoalSelected(
                        timeCommitments[selectedTimeIndex]["minutes"] as int,
                        selectedGoal,
                      );
                    },
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      padding: EdgeInsets.all(2.5.w),
                      decoration: BoxDecoration(
                        color:
                            isSelected
                                ? (goal["color"] as Color).withValues(
                                  alpha: 0.1,
                                )
                                : AppTheme.lightTheme.colorScheme.surface,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color:
                              isSelected
                                  ? (goal["color"] as Color)
                                  : AppTheme.lightTheme.colorScheme.outline
                                      .withValues(alpha: 0.3),
                          width: isSelected ? 2 : 1,
                        ),
                      ),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: EdgeInsets.only(top: 0.5.h),
                            child: CustomIconWidget(
                              iconName: goal["icon"] as String,
                              color:
                                  isSelected
                                      ? (goal["color"] as Color)
                                      : AppTheme
                                          .lightTheme
                                          .colorScheme
                                          .onSurface
                                          .withValues(alpha: 0.6),
                              size: 4.5.w,
                            ),
                          ),
                          SizedBox(width: 2.w),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  goal["goal"] as String,
                                  style: AppTheme
                                      .lightTheme
                                      .textTheme
                                      .titleSmall
                                      ?.copyWith(
                                        fontWeight: FontWeight.w600,
                                        color:
                                            isSelected
                                                ? (goal["color"] as Color)
                                                : AppTheme
                                                    .lightTheme
                                                    .colorScheme
                                                    .onSurface,
                                        fontSize: 13.sp,
                                      ),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                SizedBox(height: 0.3.h),
                                Flexible(
                                  child: Text(
                                    goal["description"] as String,
                                    style: AppTheme
                                        .lightTheme
                                        .textTheme
                                        .bodySmall
                                        ?.copyWith(
                                          color:
                                              isSelected
                                                  ? (goal["color"] as Color)
                                                      .withValues(alpha: 0.8)
                                                  : AppTheme
                                                      .lightTheme
                                                      .colorScheme
                                                      .onSurface
                                                      .withValues(alpha: 0.6),
                                          fontSize: 10.sp,
                                          height: 1.2,
                                        ),
                                    maxLines: 3,
                                    overflow: TextOverflow.ellipsis,
                                    softWrap: true,
                                  ),
                                ),
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
        ),

        SizedBox(height: 4.h),

        // Summary card
        Container(
          padding: EdgeInsets.all(4.w),
          margin: EdgeInsets.symmetric(horizontal: 6.w),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1),
                AppTheme.lightTheme.colorScheme.secondary.withValues(
                  alpha: 0.1,
                ),
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: AppTheme.lightTheme.colorScheme.primary.withValues(
                alpha: 0.3,
              ),
            ),
          ),
          child: Column(
            children: [
              CustomIconWidget(
                iconName: 'check_circle',
                color: AppTheme.getSuccessColor(true),
                size: 8.w,
              ),
              SizedBox(height: 2.h),
              Text(
                'Your Learning Plan',
                style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.lightTheme.colorScheme.primary,
                ),
              ),
              SizedBox(height: 1.h),
              Text(
                '${timeCommitments[selectedTimeIndex]["minutes"]} minutes daily • $selectedGoal focused',
                style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface.withValues(
                    alpha: 0.8,
                  ),
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
