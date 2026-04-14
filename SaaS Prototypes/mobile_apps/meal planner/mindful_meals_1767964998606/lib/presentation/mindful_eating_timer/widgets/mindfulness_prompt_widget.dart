import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MindfulnessPromptWidget extends StatefulWidget {
  final bool isActive;

  const MindfulnessPromptWidget({
    Key? key,
    required this.isActive,
  }) : super(key: key);

  @override
  State<MindfulnessPromptWidget> createState() =>
      _MindfulnessPromptWidgetState();
}

class _MindfulnessPromptWidgetState extends State<MindfulnessPromptWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  int _currentPromptIndex = 0;

  final List<String> _prompts = [
    'Notice the colors and textures on your plate',
    'Take a deep breath and appreciate each flavor',
    'Chew slowly and mindfully',
    'Feel grateful for this nourishing meal',
    'Notice how the food makes you feel',
    'Breathe between bites and stay present',
    'Appreciate the journey from farm to table',
    'Listen to your body\'s hunger signals',
  ];

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));

    _animationController.forward();
    _startPromptRotation();
  }

  void _startPromptRotation() {
    if (widget.isActive) {
      Future.delayed(const Duration(minutes: 2), () {
        if (mounted && widget.isActive) {
          _rotatePrompt();
        }
      });
    }
  }

  void _rotatePrompt() {
    _animationController.reverse().then((_) {
      if (mounted) {
        setState(() {
          _currentPromptIndex = (_currentPromptIndex + 1) % _prompts.length;
        });
        _animationController.forward();
        _startPromptRotation();
      }
    });
  }

  @override
  void didUpdateWidget(MindfulnessPromptWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isActive && !oldWidget.isActive) {
      _startPromptRotation();
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 80.w,
      padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 4.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(4.w),
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.08),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          CustomIconWidget(
            iconName: 'self_improvement',
            size: 6.w,
            color: AppTheme.lightTheme.colorScheme.primary,
          ),
          SizedBox(height: 2.h),
          FadeTransition(
            opacity: _fadeAnimation,
            child: Text(
              widget.isActive
                  ? _prompts[_currentPromptIndex]
                  : 'Take a moment to center yourself before eating',
              textAlign: TextAlign.center,
              style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                fontSize: 12.sp,
                height: 1.4,
                color: AppTheme.lightTheme.colorScheme.onSurface,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
