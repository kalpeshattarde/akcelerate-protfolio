import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class CalorieRingWidget extends StatefulWidget {
  final int consumedCalories;
  final int totalCalories;
  final bool isReducedMotion;

  const CalorieRingWidget({
    Key? key,
    required this.consumedCalories,
    required this.totalCalories,
    this.isReducedMotion = false,
  }) : super(key: key);

  @override
  State<CalorieRingWidget> createState() => _CalorieRingWidgetState();
}

class _CalorieRingWidgetState extends State<CalorieRingWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 280),
      vsync: this,
    );

    _animation = Tween<double>(
      begin: 0.0,
      end: widget.consumedCalories / widget.totalCalories,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));

    if (widget.isReducedMotion) {
      _animationController.value =
          widget.consumedCalories / widget.totalCalories;
    } else {
      _animationController.forward();
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final remainingCalories = widget.totalCalories - widget.consumedCalories;

    return Container(
      width: 70.w,
      height: 70.w,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Ring Progress
          SizedBox(
            width: 70.w,
            height: 70.w,
            child: AnimatedBuilder(
              animation: _animation,
              builder: (context, child) {
                return CustomPaint(
                  painter: CalorieRingPainter(
                    progress: _animation.value,
                    strokeWidth: 3.w,
                  ),
                );
              },
            ),
          ),
          // Center Content
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                '${widget.consumedCalories}',
                style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                      color: AppTheme.calorieAccent,
                      fontWeight: FontWeight.w700,
                      fontSize: 24.sp,
                    ),
              ),
              Text(
                'kcal consumed',
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                      fontSize: 10.sp,
                    ),
              ),
              SizedBox(height: 1.h),
              Text(
                '$remainingCalories left',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onSurface,
                      fontSize: 12.sp,
                      fontWeight: FontWeight.w500,
                    ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class CalorieRingPainter extends CustomPainter {
  final double progress;
  final double strokeWidth;

  CalorieRingPainter({
    required this.progress,
    required this.strokeWidth,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width - strokeWidth) / 2;

    // Background ring
    final backgroundPaint = Paint()
      ..color = AppTheme.calorieAccent.withValues(alpha: 0.1)
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    canvas.drawCircle(center, radius, backgroundPaint);

    // Progress ring with gradient
    final progressPaint = Paint()
      ..shader = LinearGradient(
        colors: [
          AppTheme.calorieAccent,
          AppTheme.calorieAccent.withValues(alpha: 0.8),
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(Rect.fromCircle(center: center, radius: radius))
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final sweepAngle = 2 * 3.14159 * progress;
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -3.14159 / 2, // Start from top
      sweepAngle,
      false,
      progressPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return oldDelegate is CalorieRingPainter &&
        oldDelegate.progress != progress;
  }
}
