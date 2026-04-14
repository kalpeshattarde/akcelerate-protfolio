import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';
import 'dart:math'; // Add this import for math operations

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class BreathingCircleWidget extends StatefulWidget {
  final VoidCallback onTap;

  const BreathingCircleWidget({
    Key? key,
    required this.onTap,
  }) : super(key: key);

  @override
  State<BreathingCircleWidget> createState() => _BreathingCircleWidgetState();
}

class _BreathingCircleWidgetState extends State<BreathingCircleWidget>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late AnimationController _particleController;
  late Animation<double> _breathingAnimation;
  late Animation<double> _particleAnimation;

  @override
  void initState() {
    super.initState();

    // Breathing circle animation
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

    // Particle animation
    _particleController = AnimationController(
      duration: const Duration(seconds: 6),
      vsync: this,
    );

    _particleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _particleController,
      curve: Curves.linear,
    ));

    // Start animations
    _breathingController.repeat(reverse: true);
    _particleController.repeat();
  }

  @override
  void dispose() {
    _breathingController.dispose();
    _particleController.dispose();
    super.dispose();
  }

  void _handleTap() {
    HapticFeedback.mediumImpact();
    widget.onTap();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        width: 60.w,
        height: 60.w,
        child: Stack(
          alignment: Alignment.center,
          children: [
            // Animated particles
            AnimatedBuilder(
              animation: _particleAnimation,
              builder: (context, child) {
                return CustomPaint(
                  size: Size(60.w, 60.w),
                  painter: ParticlePainter(
                    animation: _particleAnimation.value,
                    particleColor: AppTheme.particleColor,
                  ),
                );
              },
            ),

            // Breathing circle
            AnimatedBuilder(
              animation: _breathingAnimation,
              builder: (context, child) {
                return Transform.scale(
                  scale: _breathingAnimation.value,
                  child: Container(
                    width: 40.w,
                    height: 40.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: RadialGradient(
                        colors: [
                          AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.8),
                          AppTheme.lightTheme.colorScheme.primary
                              .withValues(alpha: 0.6),
                          AppTheme.particleColor.withValues(alpha: 0.4),
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
                      child: Text(
                        'Start\nBreathing',
                        textAlign: TextAlign.center,
                        style:
                            AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.onPrimary,
                          fontWeight: FontWeight.w600,
                          fontSize: 14.sp,
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class ParticlePainter extends CustomPainter {
  final double animation;
  final Color particleColor;

  ParticlePainter({
    required this.animation,
    required this.particleColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = particleColor.withValues(alpha: 0.6)
      ..style = PaintingStyle.fill;

    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2;

    // Draw floating particles
    for (int i = 0; i < 12; i++) {
      final angle = (i * 30.0) + (animation * 360.0);
      final particleRadius = radius * 0.8;
      final x = center.dx + particleRadius * cos(angle * pi / 180);
      final y = center.dy + particleRadius * sin(angle * pi / 180);

      final particleSize = 2.0 + (sin(animation * 2 * pi + i) * 1.0);
      canvas.drawCircle(Offset(x, y), particleSize, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}