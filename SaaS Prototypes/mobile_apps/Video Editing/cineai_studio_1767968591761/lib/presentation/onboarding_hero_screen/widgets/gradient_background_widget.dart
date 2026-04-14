import 'package:flutter/material.dart';
import 'dart:ui';
import 'dart:math' as math;

/// Enhanced animated gradient background with uplifting cinematic light effects
/// Transitions between vibrant purple, pink, blue, and gold tones with sparkle effects
class GradientBackgroundWidget extends StatefulWidget {
  const GradientBackgroundWidget({super.key});

  @override
  State<GradientBackgroundWidget> createState() =>
      _GradientBackgroundWidgetState();
}

class _GradientBackgroundWidgetState extends State<GradientBackgroundWidget>
    with TickerProviderStateMixin {
  late AnimationController _gradientController;
  late AnimationController _sparkleController;
  late Animation<double> _gradientAnimation;
  late Animation<double> _sparkleAnimation;

  @override
  void initState() {
    super.initState();

    // Gradient animation
    _gradientController = AnimationController(
      duration: const Duration(seconds: 6),
      vsync: this,
    )..repeat(reverse: true);

    _gradientAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _gradientController, curve: Curves.easeInOutSine),
    );

    // Sparkle animation
    _sparkleController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    )..repeat();

    _sparkleAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _sparkleController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _gradientController.dispose();
    _sparkleController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: Listenable.merge([_gradientAnimation, _sparkleAnimation]),
      builder: (context, child) {
        return Stack(
          children: [
            // Base animated gradient
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Color.lerp(
                      const Color(0xFF9C6FD9), // Bright purple
                      const Color(0xFF42B6FF), // Sky blue
                      _gradientAnimation.value,
                    )!,
                    Color.lerp(
                      const Color(0xFFFF3D7F), // Energizing pink
                      const Color(0xFFFFD700), // Inspiring gold
                      _gradientAnimation.value,
                    )!,
                    Color.lerp(
                      const Color(0xFF42B6FF), // Sky blue
                      const Color(0xFFFF3D7F), // Energizing pink
                      _gradientAnimation.value,
                    )!,
                    Color.lerp(
                      const Color(0xFF00E5FF), // Energetic cyan
                      const Color(0xFF9C6FD9), // Bright purple
                      _gradientAnimation.value,
                    )!,
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  stops: const [0.0, 0.3, 0.7, 1.0],
                ),
              ),
            ),
            // Blur effect for dreamy look
            BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 80, sigmaY: 80),
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      Colors.white.withValues(alpha: 0.15),
                      Colors.white.withValues(alpha: 0.08),
                      Colors.white.withValues(alpha: 0.12),
                    ],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                ),
              ),
            ),
            // Sparkle/shimmer effect overlay
            Positioned.fill(
              child: CustomPaint(
                painter: _SparklePainter(animation: _sparkleAnimation.value),
              ),
            ),
          ],
        );
      },
    );
  }
}

/// Custom painter for sparkle/shimmer effects
class _SparklePainter extends CustomPainter {
  final double animation;
  final math.Random _random = math.Random(
    42,
  ); // Fixed seed for consistent pattern

  _SparklePainter({required this.animation});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white.withValues(alpha: 0.3)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 4);

    // Generate sparkle points
    for (int i = 0; i < 30; i++) {
      final x = _random.nextDouble() * size.width;
      final y = _random.nextDouble() * size.height;

      // Calculate sparkle opacity based on animation
      final sparklePhase = (animation + (i / 30)) % 1.0;
      final opacity = (math.sin(sparklePhase * math.pi * 2) + 1) / 2;

      final sparklePaint = Paint()
        ..color = Colors.white.withValues(alpha: opacity * 0.4)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3);

      // Draw sparkle
      canvas.drawCircle(Offset(x, y), 2.0 + (opacity * 2), sparklePaint);
    }
  }

  @override
  bool shouldRepaint(_SparklePainter oldDelegate) =>
      animation != oldDelegate.animation;
}
