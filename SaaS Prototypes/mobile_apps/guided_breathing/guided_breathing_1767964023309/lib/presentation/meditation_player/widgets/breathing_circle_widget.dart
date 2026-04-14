import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class BreathingCircleWidget extends StatefulWidget {
  final bool isVisible;
  final bool isPlaying;
  final VoidCallback onToggle;

  const BreathingCircleWidget({
    Key? key,
    required this.isVisible,
    required this.isPlaying,
    required this.onToggle,
  }) : super(key: key);

  @override
  State<BreathingCircleWidget> createState() => _BreathingCircleWidgetState();
}

class _BreathingCircleWidgetState extends State<BreathingCircleWidget>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late Animation<double> _breathingAnimation;
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();

    // Breathing circle animation (4 seconds cycle)
    _breathingController = AnimationController(
      duration: const Duration(seconds: 4),
      vsync: this,
    );

    _breathingAnimation = Tween<double>(
      begin: 0.8,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _breathingController,
      curve: Curves.easeInOut,
    ));

    // Pulse animation for visual feedback
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _pulseAnimation = Tween<double>(
      begin: 1.0,
      end: 1.1,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));

    if (widget.isPlaying) {
      _startBreathingAnimation();
    }
  }

  @override
  void didUpdateWidget(BreathingCircleWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isPlaying != oldWidget.isPlaying) {
      if (widget.isPlaying) {
        _startBreathingAnimation();
      } else {
        _stopBreathingAnimation();
      }
    }
  }

  void _startBreathingAnimation() {
    _breathingController.repeat(reverse: true);
    _pulseController.repeat(reverse: true);
  }

  void _stopBreathingAnimation() {
    _breathingController.stop();
    _pulseController.stop();
  }

  @override
  void dispose() {
    _breathingController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.isVisible) {
      return const SizedBox.shrink();
    }

    return GestureDetector(
      onTap: widget.onToggle,
      child: Container(
        width: 60.w,
        height: 60.w,
        alignment: Alignment.center,
        child: AnimatedBuilder(
          animation: Listenable.merge([_breathingAnimation, _pulseAnimation]),
          builder: (context, child) {
            return Transform.scale(
              scale: _breathingAnimation.value * _pulseAnimation.value,
              child: Container(
                width: 45.w,
                height: 45.w,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [
                      AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.3),
                      AppTheme.lightTheme.colorScheme.tertiary
                          .withValues(alpha: 0.6),
                      AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.8),
                    ],
                    stops: const [0.0, 0.7, 1.0],
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.4),
                      blurRadius: 20,
                      spreadRadius: 5,
                    ),
                  ],
                ),
                child: Container(
                  margin: EdgeInsets.all(2.w),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: AppTheme.lightTheme.colorScheme.surface
                        .withValues(alpha: 0.1),
                    border: Border.all(
                      color: AppTheme.lightTheme.colorScheme.onSurface
                          .withValues(alpha: 0.3),
                      width: 1,
                    ),
                  ),
                  child: Center(
                    child: Text(
                      widget.isPlaying ? 'Breathe' : 'Tap to Start',
                      style:
                          AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                        fontWeight: FontWeight.w500,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
