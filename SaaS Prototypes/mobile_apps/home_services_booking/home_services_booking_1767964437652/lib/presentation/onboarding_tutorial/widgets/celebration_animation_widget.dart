import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class CelebrationAnimationWidget extends StatefulWidget {
  final bool isVisible;
  final VoidCallback? onComplete;

  const CelebrationAnimationWidget({
    super.key,
    required this.isVisible,
    this.onComplete,
  });

  @override
  State<CelebrationAnimationWidget> createState() =>
      _CelebrationAnimationWidgetState();
}

class _CelebrationAnimationWidgetState extends State<CelebrationAnimationWidget>
    with TickerProviderStateMixin {
  late AnimationController _confettiController;
  late AnimationController _scaleController;
  late Animation<double> _confettiAnimation;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _confettiController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    _scaleController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _confettiAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _confettiController,
      curve: Curves.easeOut,
    ));

    _scaleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _scaleController,
      curve: Curves.elasticOut,
    ));
  }

  @override
  void didUpdateWidget(CelebrationAnimationWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isVisible && !oldWidget.isVisible) {
      _startCelebration();
    }
  }

  void _startCelebration() {
    _scaleController.forward();
    _confettiController.forward().then((_) {
      widget.onComplete?.call();
    });
  }

  @override
  void dispose() {
    _confettiController.dispose();
    _scaleController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.isVisible) return const SizedBox.shrink();

    return Positioned.fill(
      child: Stack(
        children: [
          _buildConfettiEffect(),
          _buildCelebrationIcon(),
        ],
      ),
    );
  }

  Widget _buildConfettiEffect() {
    return AnimatedBuilder(
      animation: _confettiAnimation,
      builder: (context, child) {
        return CustomPaint(
          size: Size(100.w, 100.h),
          painter: ConfettiPainter(
            animation: _confettiAnimation,
          ),
        );
      },
    );
  }

  Widget _buildCelebrationIcon() {
    return Center(
      child: AnimatedBuilder(
        animation: _scaleAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: Container(
              width: 20.w,
              height: 20.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.primary,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.lightTheme.colorScheme.primary
                        .withValues(alpha: 0.4),
                    blurRadius: 20,
                    spreadRadius: 5,
                  ),
                ],
              ),
              child: CustomIconWidget(
                iconName: 'check',
                color: AppTheme.lightTheme.colorScheme.onPrimary,
                size: 10.w,
              ),
            ),
          );
        },
      ),
    );
  }
}

class ConfettiPainter extends CustomPainter {
  final Animation<double> animation;
  final List<ConfettiParticle> particles = [];

  ConfettiPainter({required this.animation}) {
    if (particles.isEmpty) {
      for (int i = 0; i < 50; i++) {
        particles.add(ConfettiParticle());
      }
    }
  }

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;

    for (final particle in particles) {
      final progress = animation.value;
      final x = particle.startX * size.width +
          particle.velocityX * progress * size.width;
      final y = particle.startY * size.height +
          particle.velocityY * progress * size.height +
          0.5 * 9.8 * progress * progress * size.height * 0.1;

      if (y < size.height) {
        paint.color = particle.color.withValues(
          alpha: (1.0 - progress) * 0.8,
        );

        canvas.save();
        canvas.translate(x, y);
        canvas.rotate(particle.rotation * progress * 6.28);
        canvas.drawRRect(
          RRect.fromRectAndRadius(
            Rect.fromCenter(
              center: Offset.zero,
              width: particle.size,
              height: particle.size,
            ),
            const Radius.circular(2),
          ),
          paint,
        );
        canvas.restore();
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

class ConfettiParticle {
  final double startX;
  final double startY;
  final double velocityX;
  final double velocityY;
  final double size;
  final double rotation;
  final Color color;

  ConfettiParticle()
      : startX =
            0.3 + (0.4 * (DateTime.now().millisecondsSinceEpoch % 1000) / 1000),
        startY =
            0.2 + (0.2 * (DateTime.now().microsecondsSinceEpoch % 1000) / 1000),
        velocityX =
            -0.5 + (DateTime.now().millisecondsSinceEpoch % 1000) / 1000,
        velocityY = -0.3 -
            (0.5 * (DateTime.now().microsecondsSinceEpoch % 1000) / 1000),
        size = 4 + (6 * (DateTime.now().millisecondsSinceEpoch % 100) / 100),
        rotation = (DateTime.now().microsecondsSinceEpoch % 1000) / 1000,
        color = [
          Colors.red,
          Colors.blue,
          Colors.green,
          Colors.yellow,
          Colors.purple,
          Colors.orange,
        ][(DateTime.now().millisecondsSinceEpoch % 6)];
}
