import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class HabitPerformanceGrid extends StatefulWidget {
  const HabitPerformanceGrid({super.key});

  @override
  State<HabitPerformanceGrid> createState() => _HabitPerformanceGridState();
}

class _HabitPerformanceGridState extends State<HabitPerformanceGrid>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late Animation<double> _breathingAnimation;
  int hoveredIndex = -1;

  final List<Map<String, dynamic>> habitData = [
    {
      "name": "Morning Meditation",
      "completion": 92.0,
      "icon": "self_improvement",
      "color": "forest",
    },
    {
      "name": "Daily Exercise",
      "completion": 85.0,
      "icon": "fitness_center",
      "color": "terracotta",
    },
    {
      "name": "Read 30 Minutes",
      "completion": 78.0,
      "icon": "menu_book",
      "color": "gold",
    },
    {
      "name": "Drink 8 Glasses Water",
      "completion": 95.0,
      "icon": "local_drink",
      "color": "forest",
    },
    {
      "name": "Journal Writing",
      "completion": 73.0,
      "icon": "edit_note",
      "color": "terracotta",
    },
    {
      "name": "Sleep 8 Hours",
      "completion": 88.0,
      "icon": "bedtime",
      "color": "gold",
    },
  ];

  @override
  void initState() {
    super.initState();
    _breathingController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    );
    _breathingAnimation = Tween<double>(
      begin: 1.0,
      end: 1.02,
    ).animate(CurvedAnimation(
      parent: _breathingController,
      curve: Curves.easeInOut,
    ));
    _breathingController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _breathingController.dispose();
    super.dispose();
  }

  Color _getHabitColor(String colorType, bool isDark) {
    switch (colorType) {
      case 'forest':
        return isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight;
      case 'terracotta':
        return isDark ? AppTheme.accentDark : AppTheme.accentLight;
      case 'gold':
        return isDark ? AppTheme.premiumDark : AppTheme.premiumLight;
      default:
        return isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight;
    }
  }

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
            'Habit Performance',
            style: theme.textTheme.titleLarge?.copyWith(
              color:
                  isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Individual habit success rates',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: isDark
                  ? AppTheme.textSecondaryDark
                  : AppTheme.textSecondaryLight,
            ),
          ),
          SizedBox(height: 3.h),
          ...habitData.asMap().entries.map((entry) {
            final index = entry.key;
            final habit = entry.value;
            final completion = habit["completion"] as double;
            final habitColor = _getHabitColor(habit["color"] as String, isDark);

            return AnimatedBuilder(
              animation: _breathingAnimation,
              builder: (context, child) {
                return Transform.scale(
                  scale:
                      hoveredIndex == index ? _breathingAnimation.value : 1.0,
                  child: GestureDetector(
                    onTapDown: (_) => setState(() => hoveredIndex = index),
                    onTapUp: (_) => setState(() => hoveredIndex = -1),
                    onTapCancel: () => setState(() => hoveredIndex = -1),
                    child: Container(
                      margin: EdgeInsets.only(bottom: 2.h),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: EdgeInsets.all(2.w),
                                decoration: BoxDecoration(
                                  color: habitColor.withValues(alpha: 0.1),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: CustomIconWidget(
                                  iconName: habit["icon"] as String,
                                  color: habitColor,
                                  size: 20,
                                ),
                              ),
                              SizedBox(width: 3.w),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      habit["name"] as String,
                                      style:
                                          theme.textTheme.titleMedium?.copyWith(
                                        color: isDark
                                            ? AppTheme.textPrimaryDark
                                            : AppTheme.textPrimaryLight,
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                    SizedBox(height: 0.5.h),
                                    Text(
                                      '${completion.toStringAsFixed(1)}% completion',
                                      style:
                                          theme.textTheme.bodySmall?.copyWith(
                                        color: isDark
                                            ? AppTheme.textSecondaryDark
                                            : AppTheme.textSecondaryLight,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Text(
                                '${completion.toStringAsFixed(0)}%',
                                style: theme.textTheme.titleMedium?.copyWith(
                                  color: habitColor,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 1.h),
                          Container(
                            height: 8,
                            decoration: BoxDecoration(
                              color: isDark
                                  ? AppTheme.borderDark.withValues(alpha: 0.3)
                                  : AppTheme.borderLight.withValues(alpha: 0.5),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: FractionallySizedBox(
                              alignment: Alignment.centerLeft,
                              widthFactor: completion / 100,
                              child: Container(
                                decoration: BoxDecoration(
                                  gradient: LinearGradient(
                                    colors: [
                                      habitColor,
                                      habitColor.withValues(alpha: 0.8),
                                    ],
                                  ),
                                  borderRadius: BorderRadius.circular(4),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            );
          }).toList(),
        ],
      ),
    );
  }
}
