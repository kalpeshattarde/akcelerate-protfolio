import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class DifficultySlider extends StatefulWidget {
  final double difficulty;
  final Function(double) onDifficultyChanged;

  const DifficultySlider({
    super.key,
    required this.difficulty,
    required this.onDifficultyChanged,
  });

  @override
  State<DifficultySlider> createState() => _DifficultySliderState();
}

class _DifficultySliderState extends State<DifficultySlider> {
  final List<Map<String, dynamic>> difficultyLevels = [
    {
      'level': 1.0,
      'label': 'Easy',
      'description': 'Simple to maintain daily',
      'color': Color(0xFF6B9B7A),
      'icon': 'sentiment_satisfied',
    },
    {
      'level': 2.0,
      'label': 'Medium',
      'description': 'Requires some effort',
      'color': Color(0xFFD4A574),
      'icon': 'sentiment_neutral',
    },
    {
      'level': 3.0,
      'label': 'Hard',
      'description': 'Challenging but rewarding',
      'color': Color(0xFFC17B5A),
      'icon': 'sentiment_very_satisfied',
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Difficulty Level',
          style: theme.textTheme.titleMedium?.copyWith(
            color:
                isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        Container(
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
            ),
            boxShadow: [
              BoxShadow(
                color: isDark
                    ? Colors.white.withValues(alpha: 0.05)
                    : Colors.black.withValues(alpha: 0.08),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            children: [
              _buildSlider(context, isDark),
              SizedBox(height: 3.h),
              _buildDifficultyInfo(context, isDark),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSlider(BuildContext context, bool isDark) {
    final currentLevel = _getCurrentDifficultyLevel();

    return Column(
      children: [
        SliderTheme(
          data: SliderTheme.of(context).copyWith(
            activeTrackColor:
                isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
            inactiveTrackColor:
                (isDark ? AppTheme.borderDark : AppTheme.borderLight)
                    .withValues(alpha: 0.3),
            thumbColor: currentLevel['color'],
            thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 12),
            overlayColor: currentLevel['color'].withValues(alpha: 0.2),
            overlayShape: const RoundSliderOverlayShape(overlayRadius: 20),
            trackHeight: 6.0,
            valueIndicatorColor: currentLevel['color'],
            valueIndicatorTextStyle:
                Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
          ),
          child: Slider(
            value: widget.difficulty,
            min: 1.0,
            max: 3.0,
            divisions: 2,
            label: currentLevel['label'],
            onChanged: (value) {
              HapticFeedback.selectionClick();
              widget.onDifficultyChanged(value);
            },
          ),
        ),
        SizedBox(height: 2.h),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: difficultyLevels.map((level) {
            final isSelected = widget.difficulty == level['level'];

            return Expanded(
              child: Column(
                children: [
                  CustomIconWidget(
                    iconName: level['icon'],
                    size: 6.w,
                    color: isSelected
                        ? level['color']
                        : (isDark
                            ? AppTheme.textSecondaryDark
                            : AppTheme.textSecondaryLight),
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    level['label'],
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: isSelected
                              ? level['color']
                              : (isDark
                                  ? AppTheme.textSecondaryDark
                                  : AppTheme.textSecondaryLight),
                          fontWeight:
                              isSelected ? FontWeight.w600 : FontWeight.w400,
                        ),
                  ),
                ],
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildDifficultyInfo(BuildContext context, bool isDark) {
    final currentLevel = _getCurrentDifficultyLevel();

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: (currentLevel['color'] as Color).withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: (currentLevel['color'] as Color).withValues(alpha: 0.3),
        ),
      ),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(2.w),
            decoration: BoxDecoration(
              color: currentLevel['color'],
              borderRadius: BorderRadius.circular(8),
            ),
            child: CustomIconWidget(
              iconName: currentLevel['icon'],
              size: 5.w,
              color: Colors.white,
            ),
          ),
          SizedBox(width: 4.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${currentLevel['label']} Difficulty',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: currentLevel['color'],
                        fontWeight: FontWeight.w600,
                      ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  currentLevel['description'],
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: (currentLevel['color'] as Color)
                            .withValues(alpha: 0.8),
                        height: 1.3,
                      ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Map<String, dynamic> _getCurrentDifficultyLevel() {
    return difficultyLevels.firstWhere(
      (level) => level['level'] == widget.difficulty,
      orElse: () => difficultyLevels[0],
    );
  }
}
