import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MouthAnimationWidget extends StatefulWidget {
  final String currentPhoneme;
  final bool isAnimating;

  const MouthAnimationWidget({
    Key? key,
    required this.currentPhoneme,
    required this.isAnimating,
  }) : super(key: key);

  @override
  State<MouthAnimationWidget> createState() => _MouthAnimationWidgetState();
}

class _MouthAnimationWidgetState extends State<MouthAnimationWidget>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _mouthAnimation;
  late Animation<double> _tongueAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: Duration(milliseconds: 800),
      vsync: this,
    );

    _mouthAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );

    _tongueAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.elasticOut),
    );
  }

  @override
  void didUpdateWidget(MouthAnimationWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isAnimating && !oldWidget.isAnimating) {
      _animationController.repeat(reverse: true);
    } else if (!widget.isAnimating && oldWidget.isAnimating) {
      _animationController.stop();
      _animationController.reset();
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
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      padding: EdgeInsets.all(6.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 12,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'record_voice_over',
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 6.w,
              ),
              SizedBox(width: 2.w),
              Text(
                'Mouth Movement Guide',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 3.h),
          Container(
            width: 60.w,
            height: 30.h,
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.2),
                width: 2,
              ),
            ),
            child: AnimatedBuilder(
              animation: _animationController,
              builder: (context, child) {
                return CustomPaint(
                  painter: MouthAnimationPainter(
                    phoneme: widget.currentPhoneme,
                    mouthProgress: _mouthAnimation.value,
                    tongueProgress: _tongueAnimation.value,
                    isAnimating: widget.isAnimating,
                  ),
                  size: Size(60.w, 30.h),
                );
              },
            ),
          ),
          SizedBox(height: 3.h),
          Container(
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.primary
                  .withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              children: [
                Text(
                  'Phoneme: /${widget.currentPhoneme}/',
                  style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 1.h),
                Text(
                  _getPhonemeInstructions(widget.currentPhoneme),
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _getPhonemeInstructions(String phoneme) {
    switch (phoneme.toLowerCase()) {
      case 'æ':
        return 'Open mouth wide, tongue low and forward. Like saying "cat".';
      case 'ɪ':
        return 'Slightly open mouth, tongue high and forward. Like saying "bit".';
      case 'ʊ':
        return 'Round lips slightly, tongue high and back. Like saying "book".';
      case 'ə':
        return 'Relaxed mouth position, neutral tongue. Like saying "about".';
      case 'θ':
        return 'Place tongue between teeth, blow air gently. Like saying "think".';
      case 'ð':
        return 'Place tongue between teeth, vibrate vocal cords. Like saying "this".';
      default:
        return 'Watch the mouth movement and tongue position carefully.';
    }
  }
}

class MouthAnimationPainter extends CustomPainter {
  final String phoneme;
  final double mouthProgress;
  final double tongueProgress;
  final bool isAnimating;

  MouthAnimationPainter({
    required this.phoneme,
    required this.mouthProgress,
    required this.tongueProgress,
    required this.isAnimating,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppTheme.lightTheme.colorScheme.onSurface
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    final fillPaint = Paint()
      ..color = AppTheme.lightTheme.colorScheme.surface
      ..style = PaintingStyle.fill;

    final center = Offset(size.width / 2, size.height / 2);

    // Draw face outline
    canvas.drawOval(
      Rect.fromCenter(
        center: center,
        width: size.width * 0.8,
        height: size.height * 0.9,
      ),
      fillPaint,
    );

    canvas.drawOval(
      Rect.fromCenter(
        center: center,
        width: size.width * 0.8,
        height: size.height * 0.9,
      ),
      paint,
    );

    // Draw mouth based on phoneme
    _drawMouth(canvas, size, center, paint, fillPaint);

    // Draw tongue position
    _drawTongue(canvas, size, center, paint);

    // Draw teeth if needed
    if (_needsTeeth(phoneme)) {
      _drawTeeth(canvas, size, center, paint);
    }
  }

  void _drawMouth(
      Canvas canvas, Size size, Offset center, Paint paint, Paint fillPaint) {
    final mouthCenter = Offset(center.dx, center.dy + size.height * 0.1);
    double mouthWidth = size.width * 0.3;
    double mouthHeight = size.height * 0.1;

    // Adjust mouth shape based on phoneme
    switch (phoneme.toLowerCase()) {
      case 'æ':
        mouthHeight *= (1.5 + mouthProgress * 0.5);
        break;
      case 'ɪ':
        mouthWidth *= (0.8 + mouthProgress * 0.2);
        mouthHeight *= (0.6 + mouthProgress * 0.4);
        break;
      case 'ʊ':
        mouthWidth *= (0.6 + mouthProgress * 0.2);
        mouthHeight *= (0.8 + mouthProgress * 0.3);
        break;
      case 'ə':
        mouthWidth *= (0.7 + mouthProgress * 0.3);
        mouthHeight *= (0.5 + mouthProgress * 0.3);
        break;
    }

    // Draw mouth opening
    canvas.drawOval(
      Rect.fromCenter(
        center: mouthCenter,
        width: mouthWidth,
        height: mouthHeight,
      ),
      fillPaint..color = Colors.black.withValues(alpha: 0.8),
    );

    canvas.drawOval(
      Rect.fromCenter(
        center: mouthCenter,
        width: mouthWidth,
        height: mouthHeight,
      ),
      paint,
    );
  }

  void _drawTongue(Canvas canvas, Size size, Offset center, Paint paint) {
    final tongueCenter = Offset(center.dx, center.dy + size.height * 0.15);
    final tonguePaint = Paint()
      ..color = Colors.pink.withValues(alpha: 0.7)
      ..style = PaintingStyle.fill;

    double tongueX = tongueCenter.dx;
    double tongueY = tongueCenter.dy;

    // Adjust tongue position based on phoneme
    switch (phoneme.toLowerCase()) {
      case 'æ':
        tongueY += size.height * 0.05 * tongueProgress;
        break;
      case 'ɪ':
        tongueY -= size.height * 0.03 * tongueProgress;
        tongueX -= size.width * 0.02 * tongueProgress;
        break;
      case 'ʊ':
        tongueY -= size.height * 0.02 * tongueProgress;
        tongueX += size.width * 0.03 * tongueProgress;
        break;
      case 'θ':
      case 'ð':
        tongueY -= size.height * 0.08 * tongueProgress;
        break;
    }

    // Draw tongue
    canvas.drawOval(
      Rect.fromCenter(
        center: Offset(tongueX, tongueY),
        width: size.width * 0.15,
        height: size.height * 0.08,
      ),
      tonguePaint,
    );
  }

  void _drawTeeth(Canvas canvas, Size size, Offset center, Paint paint) {
    final teethPaint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.fill;

    final teethOutline = Paint()
      ..color = AppTheme.lightTheme.colorScheme.outline
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;

    // Draw upper teeth
    for (int i = 0; i < 6; i++) {
      final x = center.dx - size.width * 0.12 + (i * size.width * 0.04);
      final y = center.dy + size.height * 0.05;

      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromCenter(
            center: Offset(x, y),
            width: size.width * 0.03,
            height: size.height * 0.06,
          ),
          Radius.circular(2),
        ),
        teethPaint,
      );

      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromCenter(
            center: Offset(x, y),
            width: size.width * 0.03,
            height: size.height * 0.06,
          ),
          Radius.circular(2),
        ),
        teethOutline,
      );
    }
  }

  bool _needsTeeth(String phoneme) {
    return ['θ', 'ð'].contains(phoneme.toLowerCase());
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
