import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class PreferenceSelectionWidget extends StatefulWidget {
  final Function(String experienceLevel, int sessionLength)
      onPreferencesSelected;

  const PreferenceSelectionWidget({
    Key? key,
    required this.onPreferencesSelected,
  }) : super(key: key);

  @override
  State<PreferenceSelectionWidget> createState() =>
      _PreferenceSelectionWidgetState();
}

class _PreferenceSelectionWidgetState extends State<PreferenceSelectionWidget> {
  String selectedExperience = 'beginner';
  int selectedDuration = 10;

  final List<Map<String, dynamic>> experienceLevels = [
    {'id': 'beginner', 'title': 'Beginner', 'description': 'New to meditation'},
    {
      'id': 'intermediate',
      'title': 'Intermediate',
      'description': 'Some experience'
    },
    {
      'id': 'advanced',
      'title': 'Advanced',
      'description': 'Regular practitioner'
    },
  ];

  final List<int> sessionDurations = [5, 10, 15, 20];

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100.w,
      padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 4.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Personalize Your Experience',
            style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w700,
              color: AppTheme.lightTheme.colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 2.h),
          Text(
            'Help us customize your meditation journey',
            style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 4.h),

          // Experience Level Section
          Text(
            'Experience Level',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
              color: AppTheme.lightTheme.colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 2.h),
          Container(
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.2),
              ),
            ),
            child: Column(
              children: experienceLevels.map((level) {
                final isSelected = selectedExperience == level['id'];
                final isFirst = experienceLevels.first == level;
                final isLast = experienceLevels.last == level;

                return GestureDetector(
                  onTap: () {
                    setState(() {
                      selectedExperience = level['id'];
                    });
                    widget.onPreferencesSelected(
                        selectedExperience, selectedDuration);
                  },
                  child: Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 4.w, vertical: 3.h),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.1)
                          : Colors.transparent,
                      borderRadius: BorderRadius.only(
                        topLeft:
                            isFirst ? const Radius.circular(12) : Radius.zero,
                        topRight:
                            isFirst ? const Radius.circular(12) : Radius.zero,
                        bottomLeft:
                            isLast ? const Radius.circular(12) : Radius.zero,
                        bottomRight:
                            isLast ? const Radius.circular(12) : Radius.zero,
                      ),
                      border: !isLast
                          ? Border(
                              bottom: BorderSide(
                                color: AppTheme.lightTheme.colorScheme.outline
                                    .withValues(alpha: 0.1),
                              ),
                            )
                          : null,
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                level['title'],
                                style: AppTheme.lightTheme.textTheme.titleSmall
                                    ?.copyWith(
                                  fontWeight: FontWeight.w600,
                                  color:
                                      AppTheme.lightTheme.colorScheme.onSurface,
                                ),
                              ),
                              SizedBox(height: 0.5.h),
                              Text(
                                level['description'],
                                style: AppTheme.lightTheme.textTheme.bodySmall
                                    ?.copyWith(
                                  color: AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                                ),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          width: 5.w,
                          height: 5.w,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: isSelected
                                  ? AppTheme.lightTheme.colorScheme.secondary
                                  : AppTheme.lightTheme.colorScheme.outline,
                              width: 2,
                            ),
                            color: isSelected
                                ? AppTheme.lightTheme.colorScheme.secondary
                                : Colors.transparent,
                          ),
                          child: isSelected
                              ? Center(
                                  child: Container(
                                    width: 2.w,
                                    height: 2.w,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: AppTheme
                                          .lightTheme.colorScheme.onSecondary,
                                    ),
                                  ),
                                )
                              : null,
                        ),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
          ),

          SizedBox(height: 4.h),

          // Session Duration Section
          Text(
            'Preferred Session Length',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
              color: AppTheme.lightTheme.colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 2.h),
          Row(
            children: sessionDurations.map((duration) {
              final isSelected = selectedDuration == duration;

              return Expanded(
                child: GestureDetector(
                  onTap: () {
                    setState(() {
                      selectedDuration = duration;
                    });
                    widget.onPreferencesSelected(
                        selectedExperience, selectedDuration);
                  },
                  child: Container(
                    margin: EdgeInsets.only(
                      right: duration != sessionDurations.last ? 2.w : 0,
                    ),
                    padding: EdgeInsets.symmetric(vertical: 2.h),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? AppTheme.lightTheme.colorScheme.secondary
                          : AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: isSelected
                            ? AppTheme.lightTheme.colorScheme.secondary
                            : AppTheme.lightTheme.colorScheme.outline
                                .withValues(alpha: 0.2),
                      ),
                      boxShadow: isSelected
                          ? [
                              BoxShadow(
                                color: AppTheme.lightTheme.colorScheme.secondary
                                    .withValues(alpha: 0.3),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              ),
                            ]
                          : null,
                    ),
                    child: Center(
                      child: Text(
                        '${duration}min',
                        style:
                            AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: isSelected
                              ? AppTheme.lightTheme.colorScheme.onSecondary
                              : AppTheme.lightTheme.colorScheme.onSurface,
                        ),
                      ),
                    ),
                  ),
                ),
              );
            }).toList(),
          ),

          const Spacer(),

          SizedBox(
            width: double.infinity,
            height: 7.h,
            child: ElevatedButton(
              onPressed: () {
                widget.onPreferencesSelected(
                    selectedExperience, selectedDuration);
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
                foregroundColor: AppTheme.lightTheme.colorScheme.onSecondary,
                elevation: 4,
                shadowColor: AppTheme.lightTheme.colorScheme.secondary
                    .withValues(alpha: 0.3),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: Text(
                'Continue',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: AppTheme.lightTheme.colorScheme.onSecondary,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
