import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class BreathingCircleWidget extends StatefulWidget {
  final bool isPlaying;
  final VoidCallback onTap;

  const BreathingCircleWidget({
    Key? key,
    required this.isPlaying,
    required this.onTap,
  }) : super(key: key);

  @override
  State<BreathingCircleWidget> createState() => _BreathingCircleWidgetState();
}

class _BreathingCircleWidgetState extends State<BreathingCircleWidget>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late AnimationController _rippleController;
  late Animation<double> _breathingAnimation;
  late Animation<double> _rippleAnimation;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
  }

  void _initializeAnimations() {
    _breathingController = AnimationController(
      duration: const Duration(seconds: 4),
      vsync: this,
    );

    _rippleController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _breathingAnimation = Tween<double>(
      begin: 0.8,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _breathingController,
      curve: Curves.easeInOut,
    ));

    _rippleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _rippleController,
      curve: Curves.easeOut,
    ));

    if (widget.isPlaying) {
      _startBreathingAnimation();
    }
  }

  void _startBreathingAnimation() {
    _breathingController.repeat(reverse: true);
  }

  void _stopBreathingAnimation() {
    _breathingController.stop();
    _breathingController.reset();
  }

  void _triggerRipple() {
    _rippleController.forward().then((_) {
      _rippleController.reset();
    });
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

  @override
  void dispose() {
    _breathingController.dispose();
    _rippleController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        _triggerRipple();
        widget.onTap();
      },
      child: Container(
        width: 60.w,
        height: 60.w,
        child: Stack(
          alignment: Alignment.center,
          children: [
            // Ripple effect
            AnimatedBuilder(
              animation: _rippleAnimation,
              builder: (context, child) {
                return Container(
                  width: 60.w * (1 + _rippleAnimation.value * 0.3),
                  height: 60.w * (1 + _rippleAnimation.value * 0.3),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 1 - _rippleAnimation.value),
                      width: 2,
                    ),
                  ),
                );
              },
            ),
            // Main breathing circle
            AnimatedBuilder(
              animation: _breathingAnimation,
              builder: (context, child) {
                return Transform.scale(
                  scale: widget.isPlaying ? _breathingAnimation.value : 1.0,
                  child: Container(
                    width: 45.w,
                    height: 45.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: RadialGradient(
                        colors: [
                          AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.8),
                          AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.4),
                          AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.1),
                        ],
                        stops: const [0.0, 0.7, 1.0],
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.3),
                          blurRadius: 20,
                          spreadRadius: 5,
                        ),
                      ],
                    ),
                    child: Center(
                      child: Container(
                        width: 25.w,
                        height: 25.w,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: AppTheme.lightTheme.colorScheme.secondary,
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.lightTheme.colorScheme.secondary
                                  .withValues(alpha: 0.5),
                              blurRadius: 15,
                              spreadRadius: 2,
                            ),
                          ],
                        ),
                        child: Center(
                          child: CustomIconWidget(
                            iconName: widget.isPlaying ? 'pause' : 'play_arrow',
                            color: AppTheme.lightTheme.colorScheme.onSecondary,
                            size: 8.w,
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
            // Outer glow ring
            Container(
              width: 65.w,
              height: 65.w,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: AppTheme.lightTheme.colorScheme.secondary
                      .withValues(alpha: 0.2),
                  width: 1,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
