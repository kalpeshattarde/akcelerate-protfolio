import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class BreathingCircleWidget extends StatefulWidget {
  final bool isBreathing;
  final String currentPhase;
  final double progress;
  final VoidCallback? onTap;

  const BreathingCircleWidget({
    Key? key,
    required this.isBreathing,
    required this.currentPhase,
    required this.progress,
    this.onTap,
  }) : super(key: key);

  @override
  State<BreathingCircleWidget> createState() => _BreathingCircleWidgetState();
}

class _BreathingCircleWidgetState extends State<BreathingCircleWidget>
    with TickerProviderStateMixin {
  late AnimationController _scaleController;
  late AnimationController _glowController;
  late AnimationController _rotationController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _glowAnimation;
  late Animation<double> _rotationAnimation;
  late Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();
    _scaleController = AnimationController(
      duration: const Duration(milliseconds: 4000),
      vsync: this,
    );
    _glowController = AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );
    _rotationController = AnimationController(
      duration: const Duration(seconds: 20),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(
      begin: 0.85,
      end: 1.15,
    ).animate(CurvedAnimation(
      parent: _scaleController,
      curve: Curves.easeInOut,
    ));

    _glowAnimation = Tween<double>(
      begin: 0.4,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _glowController,
      curve: Curves.easeInOut,
    ));

    _rotationAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _rotationController,
      curve: Curves.linear,
    ));

    _pulseAnimation = Tween<double>(
      begin: 0.95,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _glowController,
      curve: Curves.easeInOut,
    ));

    _glowController.repeat(reverse: true);
    _rotationController.repeat();
  }

  @override
  void didUpdateWidget(BreathingCircleWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isBreathing != oldWidget.isBreathing) {
      if (widget.isBreathing) {
        _scaleController.repeat(reverse: true);
      } else {
        _scaleController.stop();
        _scaleController.animateTo(0.0,
            duration: const Duration(milliseconds: 500));
      }
    }
  }

  @override
  void dispose() {
    _scaleController.dispose();
    _glowController.dispose();
    _rotationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      child: Container(
        width: 75.w,
        height: 75.w,
        child: Stack(
          alignment: Alignment.center,
          children: [
            // Outermost ambient glow
            AnimatedBuilder(
              animation: _glowAnimation,
              builder: (context, child) {
                return Container(
                  width: 85.w,
                  height: 85.w,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.lightTheme.colorScheme.secondary
                            .withValues(alpha: _glowAnimation.value * 0.15),
                        blurRadius: 60,
                        spreadRadius: 20,
                      ),
                    ],
                  ),
                );
              },
            ),

            // Rotating background mandala
            AnimatedBuilder(
              animation: _rotationAnimation,
              builder: (context, child) {
                return Transform.rotate(
                  angle: _rotationAnimation.value * 2 * 3.14159,
                  child: Container(
                    width: 70.w,
                    height: 70.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: RadialGradient(
                        colors: [
                          Colors.transparent,
                          AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.05),
                          AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.1),
                        ],
                        stops: const [0.0, 0.7, 1.0],
                      ),
                    ),
                    child: CustomPaint(
                      painter: _MandalaPattern(
                        color: AppTheme.lightTheme.colorScheme.secondary
                            .withValues(alpha: 0.1),
                      ),
                    ),
                  ),
                );
              },
            ),

            // Main breathing circle
            AnimatedBuilder(
              animation: Listenable.merge([
                widget.isBreathing ? _scaleAnimation : _pulseAnimation,
                _glowAnimation
              ]),
              builder: (context, child) {
                double scale = widget.isBreathing
                    ? _scaleAnimation.value
                    : _pulseAnimation.value;

                return Transform.scale(
                  scale: scale,
                  child: Container(
                    width: 55.w,
                    height: 55.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: RadialGradient(
                        colors: [
                          AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.9),
                          AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.6),
                          AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.3),
                          AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.1),
                        ],
                        stops: const [0.0, 0.4, 0.7, 1.0],
                      ),
                      border: Border.all(
                        color: AppTheme.lightTheme.colorScheme.secondary
                            .withValues(alpha: 0.8),
                        width: 2.5,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.4),
                          blurRadius: 30,
                          spreadRadius: 5,
                        ),
                        BoxShadow(
                          color: AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.2),
                          blurRadius: 60,
                          spreadRadius: 10,
                        ),
                      ],
                    ),
                    child: Center(
                      child: AnimatedBuilder(
                        animation: _glowAnimation,
                        builder: (context, child) {
                          return Transform.scale(
                            scale: 0.6 + (_glowAnimation.value * 0.2),
                            child: Container(
                              width: 25.w,
                              height: 25.w,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                gradient: RadialGradient(
                                  colors: [
                                    AppTheme.lightTheme.colorScheme.secondary
                                        .withValues(alpha: 0.8),
                                    AppTheme.lightTheme.colorScheme.secondary
                                        .withValues(alpha: 0.4),
                                  ],
                                ),
                              ),
                              child: Center(
                                child: CustomIconWidget(
                                  iconName: widget.isBreathing
                                      ? (widget.currentPhase.contains('In')
                                          ? 'keyboard_arrow_up'
                                          : widget.currentPhase.contains('Out')
                                              ? 'keyboard_arrow_down'
                                              : 'more_horiz')
                                      : 'spa',
                                  color:
                                      AppTheme.lightTheme.colorScheme.surface,
                                  size: 8.w,
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                );
              },
            ),

            // Progress ring
            if (widget.progress > 0)
              SizedBox(
                width: 78.w,
                height: 78.w,
                child: Stack(
                  children: [
                    // Background ring
                    SizedBox(
                      width: 78.w,
                      height: 78.w,
                      child: CircularProgressIndicator(
                        value: 1.0,
                        strokeWidth: 3,
                        backgroundColor: Colors.transparent,
                        valueColor: AlwaysStoppedAnimation<Color>(
                          AppTheme.lightTheme.colorScheme.outline
                              .withValues(alpha: 0.2),
                        ),
                      ),
                    ),
                    // Progress ring with gradient effect
                    SizedBox(
                      width: 78.w,
                      height: 78.w,
                      child: CircularProgressIndicator(
                        value: widget.progress,
                        strokeWidth: 3,
                        backgroundColor: Colors.transparent,
                        valueColor: AlwaysStoppedAnimation<Color>(
                          AppTheme.lightTheme.colorScheme.secondary,
                        ),
                        strokeCap: StrokeCap.round,
                      ),
                    ),
                  ],
                ),
              ),

            // Gentle tap hint for non-breathing state
            if (!widget.isBreathing)
              Positioned(
                bottom: 0,
                child: AnimatedBuilder(
                  animation: _glowAnimation,
                  builder: (context, child) {
                    return Opacity(
                      opacity: 0.3 + (_glowAnimation.value * 0.4),
                      child: Container(
                        padding: EdgeInsets.symmetric(
                            horizontal: 3.w, vertical: 1.h),
                        decoration: BoxDecoration(
                          color: AppTheme.lightTheme.colorScheme.surface
                              .withValues(alpha: 0.9),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: AppTheme.lightTheme.colorScheme.secondary
                                .withValues(alpha: 0.3),
                            width: 1,
                          ),
                        ),
                        child: Text(
                          'Tap to begin',
                          style: AppTheme.lightTheme.textTheme.labelSmall
                              ?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.secondary,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
          ],
        ),
      ),
    );
  }
}

// Custom painter for mandala pattern
class _MandalaPattern extends CustomPainter {
  final Color color;

  _MandalaPattern({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = 1.0
      ..style = PaintingStyle.stroke;

    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2;

    // Draw concentric circles with decreasing opacity
    for (int i = 1; i <= 6; i++) {
      paint.color = color.withValues(alpha: color.alpha * (0.8 - (i * 0.1)));
      canvas.drawCircle(center, radius * (i / 6), paint);
    }

    // Draw radial lines
    for (int i = 0; i < 12; i++) {
      final angle = (i * 30) * (3.14159 / 180);
      final start = Offset(
        center.dx + (radius * 0.3) * math.cos(angle),
        center.dy + (radius * 0.3) * math.sin(angle),
      );
      final end = Offset(
        center.dx + (radius * 0.9) * math.cos(angle),
        center.dy + (radius * 0.9) * math.sin(angle),
      );

      paint.color = color.withValues(alpha: color.alpha * 0.4);
      canvas.drawLine(start, end, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
