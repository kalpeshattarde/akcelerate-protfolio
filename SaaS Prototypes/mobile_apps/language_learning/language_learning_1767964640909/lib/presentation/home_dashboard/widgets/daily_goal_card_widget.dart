import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class DailyGoalCardWidget extends StatefulWidget {
  final int completedGoals;
  final int totalGoals;
  final String motivationalMessage;

  const DailyGoalCardWidget({
    Key? key,
    required this.completedGoals,
    required this.totalGoals,
    required this.motivationalMessage,
  }) : super(key: key);

  @override
  State<DailyGoalCardWidget> createState() => _DailyGoalCardWidgetState();
}

class _DailyGoalCardWidgetState extends State<DailyGoalCardWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _progressAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    final double targetProgress = widget.completedGoals / widget.totalGoals;
    _progressAnimation = Tween<double>(
      begin: 0.0,
      end: targetProgress.clamp(0.0, 1.0),
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));

    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final bool isCompleted = widget.completedGoals >= widget.totalGoals;

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: isCompleted
              ? [
                  AppTheme.getSuccessColor(true).withValues(alpha: 0.1),
                  AppTheme.getSuccessColor(true).withValues(alpha: 0.05),
                ]
              : [
                  AppTheme.lightTheme.colorScheme.primary
                      .withValues(alpha: 0.1),
                  AppTheme.lightTheme.colorScheme.primary
                      .withValues(alpha: 0.05),
                ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isCompleted
              ? AppTheme.getSuccessColor(true).withValues(alpha: 0.3)
              : AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName:
                    isCompleted ? 'check_circle' : 'radio_button_unchecked',
                color: isCompleted
                    ? AppTheme.getSuccessColor(true)
                    : AppTheme.lightTheme.colorScheme.primary,
                size: 24,
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Text(
                  'Daily Goal',
                  style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: isCompleted
                        ? AppTheme.getSuccessColor(true)
                        : AppTheme.lightTheme.colorScheme.primary,
                  ),
                ),
              ),
              Text(
                '${widget.completedGoals}/${widget.totalGoals}',
                style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: isCompleted
                      ? AppTheme.getSuccessColor(true)
                      : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),

          // Circular Progress Indicator
          Center(
            child: SizedBox(
              width: 25.w,
              height: 25.w,
              child: AnimatedBuilder(
                animation: _progressAnimation,
                builder: (context, child) {
                  return Stack(
                    children: [
                      // Background Circle
                      Container(
                        width: 25.w,
                        height: 25.w,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.grey.withValues(alpha: 0.1),
                        ),
                      ),
                      // Progress Circle
                      SizedBox(
                        width: 25.w,
                        height: 25.w,
                        child: CircularProgressIndicator(
                          value: _progressAnimation.value,
                          strokeWidth: 8,
                          backgroundColor: Colors.grey.withValues(alpha: 0.2),
                          valueColor: AlwaysStoppedAnimation<Color>(
                            isCompleted
                                ? AppTheme.getSuccessColor(true)
                                : AppTheme.lightTheme.colorScheme.primary,
                          ),
                        ),
                      ),
                      // Center Text
                      Positioned.fill(
                        child: Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                '${(_progressAnimation.value * 100).round()}%',
                                style: AppTheme
                                    .lightTheme.textTheme.headlineSmall
                                    ?.copyWith(
                                  fontWeight: FontWeight.w700,
                                  color: isCompleted
                                      ? AppTheme.getSuccessColor(true)
                                      : AppTheme.lightTheme.colorScheme.primary,
                                ),
                              ),
                              if (isCompleted)
                                CustomIconWidget(
                                  iconName: 'celebration',
                                  color: AppTheme.getAccentColor(true),
                                  size: 16,
                                ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
          ),
          SizedBox(height: 2.h),

          // Motivational Message
          Center(
            child: Text(
              widget.motivationalMessage,
              style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                fontStyle: FontStyle.italic,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}
