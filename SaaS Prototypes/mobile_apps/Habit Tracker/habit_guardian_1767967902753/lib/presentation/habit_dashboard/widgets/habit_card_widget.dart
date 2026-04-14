import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

/// Individual habit card widget with breathing animation and quick actions
class HabitCardWidget extends StatefulWidget {
  final Map<String, dynamic> habit;
  final VoidCallback onTap;
  final VoidCallback onComplete;
  final VoidCallback onSkip;
  final VoidCallback onAddNote;
  final VoidCallback onLongPress;

  const HabitCardWidget({
    super.key,
    required this.habit,
    required this.onTap,
    required this.onComplete,
    required this.onSkip,
    required this.onAddNote,
    required this.onLongPress,
  });

  @override
  State<HabitCardWidget> createState() => _HabitCardWidgetState();
}

class _HabitCardWidgetState extends State<HabitCardWidget>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late AnimationController _slideController;
  late Animation<double> _breathingAnimation;
  late Animation<Offset> _slideAnimation;
  bool _isSlideOpen = false;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
  }

  void _initializeAnimations() {
    // Breathing animation for completed habits
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

    // Slide animation for quick actions
    _slideController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _slideAnimation = Tween<Offset>(
      begin: Offset.zero,
      end: const Offset(-0.3, 0),
    ).animate(CurvedAnimation(
      parent: _slideController,
      curve: Curves.easeInOut,
    ));

    // Start breathing animation if habit is completed
    if (widget.habit['isCompleted'] == true) {
      _breathingController.repeat(reverse: true);
    }
  }

  @override
  void dispose() {
    _breathingController.dispose();
    _slideController.dispose();
    super.dispose();
  }

  void _toggleSlide() {
    setState(() {
      _isSlideOpen = !_isSlideOpen;
      if (_isSlideOpen) {
        _slideController.forward();
      } else {
        _slideController.reverse();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final bool isCompleted = widget.habit['isCompleted'] ?? false;
    final int streak = widget.habit['streak'] ?? 0;
    final String habitName = widget.habit['name'] ?? '';
    final String category = widget.habit['category'] ?? '';

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Stack(
        children: [
          // Quick actions background
          _buildQuickActionsBackground(),

          // Main habit card
          SlideTransition(
            position: _slideAnimation,
            child: AnimatedBuilder(
              animation: _breathingAnimation,
              builder: (context, child) {
                return Transform.scale(
                  scale: isCompleted ? _breathingAnimation.value : 1.0,
                  child: GestureDetector(
                    onTap: widget.onTap,
                    onLongPress: () {
                      HapticFeedback.mediumImpact();
                      widget.onLongPress();
                    },
                    onHorizontalDragEnd: (details) {
                      if (details.primaryVelocity! > 0 && _isSlideOpen) {
                        _toggleSlide();
                      } else if (details.primaryVelocity! < 0 &&
                          !_isSlideOpen) {
                        _toggleSlide();
                      }
                    },
                    child: Container(
                      decoration: BoxDecoration(
                        color: AppTheme.lightTheme.cardColor,
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: [
                          BoxShadow(
                            color: isCompleted
                                ? AppTheme.premiumLight.withValues(alpha: 0.3)
                                : AppTheme.shadowLight,
                            blurRadius: isCompleted ? 12 : 8,
                            offset: const Offset(0, 4),
                          ),
                        ],
                        border: isCompleted
                            ? Border.all(
                                color: AppTheme.premiumLight
                                    .withValues(alpha: 0.5),
                                width: 1,
                              )
                            : null,
                      ),
                      child: Padding(
                        padding: EdgeInsets.all(4.w),
                        child: Row(
                          children: [
                            // Completion status indicator
                            _buildCompletionIndicator(isCompleted),

                            SizedBox(width: 3.w),

                            // Habit details
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    habitName,
                                    style: AppTheme
                                        .lightTheme.textTheme.titleMedium
                                        ?.copyWith(
                                      fontWeight: FontWeight.w600,
                                      color: isCompleted
                                          ? AppTheme.secondaryLight
                                          : AppTheme.textPrimaryLight,
                                    ),
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                  SizedBox(height: 1.h),
                                  Row(
                                    children: [
                                      // Category badge
                                      Container(
                                        padding: EdgeInsets.symmetric(
                                          horizontal: 2.w,
                                          vertical: 0.5.h,
                                        ),
                                        decoration: BoxDecoration(
                                          color: AppTheme.accentLight
                                              .withValues(alpha: 0.1),
                                          borderRadius:
                                              BorderRadius.circular(8),
                                        ),
                                        child: Text(
                                          category,
                                          style: AppTheme
                                              .lightTheme.textTheme.bodySmall
                                              ?.copyWith(
                                            color: AppTheme.accentLight,
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                      ),

                                      SizedBox(width: 2.w),

                                      // Streak indicator
                                      if (streak > 0) ...[
                                        CustomIconWidget(
                                          iconName: 'local_fire_department',
                                          color: AppTheme.accentLight,
                                          size: 16,
                                        ),
                                        SizedBox(width: 1.w),
                                        Text(
                                          '$streak day${streak > 1 ? 's' : ''}',
                                          style: AppTheme
                                              .lightTheme.textTheme.bodySmall
                                              ?.copyWith(
                                            color: AppTheme.accentLight,
                                            fontWeight: FontWeight.w600,
                                          ),
                                        ),
                                      ],
                                    ],
                                  ),
                                ],
                              ),
                            ),

                            // Quick complete button
                            if (!isCompleted) _buildQuickCompleteButton(),
                          ],
                        ),
                      ),
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

  Widget _buildCompletionIndicator(bool isCompleted) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      width: 6.w,
      height: 6.w,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: isCompleted ? AppTheme.secondaryLight : Colors.transparent,
        border: Border.all(
          color: isCompleted ? AppTheme.secondaryLight : AppTheme.borderLight,
          width: 2,
        ),
      ),
      child: isCompleted
          ? CustomIconWidget(
              iconName: 'check',
              color: AppTheme.primaryLight,
              size: 16,
            )
          : null,
    );
  }

  Widget _buildQuickCompleteButton() {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        widget.onComplete();
      },
      child: Container(
        padding: EdgeInsets.all(2.w),
        decoration: BoxDecoration(
          color: AppTheme.secondaryLight.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: CustomIconWidget(
          iconName: 'check_circle_outline',
          color: AppTheme.secondaryLight,
          size: 20,
        ),
      ),
    );
  }

  Widget _buildQuickActionsBackground() {
    return Positioned.fill(
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
        decoration: BoxDecoration(
          color: AppTheme.surfaceLight,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            // Complete action
            _buildQuickAction(
              icon: 'check_circle',
              color: AppTheme.successLight,
              onTap: widget.onComplete,
            ),

            // Skip action
            _buildQuickAction(
              icon: 'skip_next',
              color: AppTheme.warningLight,
              onTap: widget.onSkip,
            ),

            // Add note action
            _buildQuickAction(
              icon: 'note_add',
              color: AppTheme.accentLight,
              onTap: widget.onAddNote,
            ),

            SizedBox(width: 4.w),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickAction({
    required String icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap();
        _toggleSlide();
      },
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 1.w),
        padding: EdgeInsets.all(3.w),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: CustomIconWidget(
          iconName: icon,
          color: color,
          size: 20,
        ),
      ),
    );
  }
}
