import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class WaterProgressRingWidget extends StatefulWidget {
  final double currentIntake;
  final double dailyGoal;

  const WaterProgressRingWidget({
    Key? key,
    required this.currentIntake,
    required this.dailyGoal,
  }) : super(key: key);

  @override
  State<WaterProgressRingWidget> createState() =>
      _WaterProgressRingWidgetState();
}

class _WaterProgressRingWidgetState extends State<WaterProgressRingWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _progressAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 280),
      vsync: this,
    );

    _progressAnimation = Tween<double>(
      begin: 0.0,
      end: widget.currentIntake / widget.dailyGoal,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));

    _animationController.forward();
  }

  @override
  void didUpdateWidget(WaterProgressRingWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.currentIntake != widget.currentIntake) {
      _progressAnimation = Tween<double>(
        begin: _progressAnimation.value,
        end: widget.currentIntake / widget.dailyGoal,
      ).animate(CurvedAnimation(
        parent: _animationController,
        curve: Curves.easeInOut,
      ));
      _animationController.reset();
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
    final percentage =
        ((widget.currentIntake / widget.dailyGoal) * 100).clamp(0, 100);

    return Container(
      padding: EdgeInsets.all(4.w),
      child: Column(
        children: [
          // Progress Ring
          SizedBox(
            width: 50.w,
            height: 50.w,
            child: AnimatedBuilder(
              animation: _progressAnimation,
              builder: (context, child) {
                return CustomPaint(
                  painter: WaterProgressPainter(
                    progress: _progressAnimation.value,
                    strokeWidth: 3.w,
                  ),
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          '${widget.currentIntake.toInt()}',
                          style: AppTheme.lightTheme.textTheme.headlineMedium
                              ?.copyWith(
                            color: AppTheme.waterAccent,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        Text(
                          'oz',
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            color: AppTheme.textMediumEmphasisLight,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          SizedBox(height: 2.h),
          // Progress Text
          Text(
            '${percentage.toInt()}% of daily goal',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: AppTheme.waterAccent,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Goal: ${widget.dailyGoal.toInt()} oz',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.textMediumEmphasisLight,
            ),
          ),
        ],
      ),
    );
  }
}

class WaterProgressPainter extends CustomPainter {
  final double progress;
  final double strokeWidth;

  WaterProgressPainter({
    required this.progress,
    required this.strokeWidth,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width - strokeWidth) / 2;

    // Background circle
    final backgroundPaint = Paint()
      ..color = AppTheme.waterAccent.withValues(alpha: 0.1)
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    canvas.drawCircle(center, radius, backgroundPaint);

    // Progress arc
    final progressPaint = Paint()
      ..shader = LinearGradient(
        colors: [
          AppTheme.waterAccent.withValues(alpha: 0.7),
          AppTheme.waterAccent,
        ],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ).createShader(Rect.fromCircle(center: center, radius: radius))
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    const startAngle = -3.14159 / 2; // Start from top
    final sweepAngle = 2 * 3.14159 * progress;

    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      startAngle,
      sweepAngle,
      false,
      progressPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
