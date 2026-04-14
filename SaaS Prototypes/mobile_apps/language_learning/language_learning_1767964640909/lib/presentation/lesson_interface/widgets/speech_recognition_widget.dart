import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class SpeechRecognitionWidget extends StatefulWidget {
  final String targetWord;
  final String pronunciationGuide;
  final Function(String) onSpeechResult;
  final bool showResult;
  final String? userSpeech;
  final double? accuracyScore;

  const SpeechRecognitionWidget({
    Key? key,
    required this.targetWord,
    required this.pronunciationGuide,
    required this.onSpeechResult,
    this.showResult = false,
    this.userSpeech,
    this.accuracyScore,
  }) : super(key: key);

  @override
  State<SpeechRecognitionWidget> createState() =>
      _SpeechRecognitionWidgetState();
}

class _SpeechRecognitionWidgetState extends State<SpeechRecognitionWidget>
    with TickerProviderStateMixin {
  bool _isListening = false;
  bool _isPlayingExample = false;
  late AnimationController _pulseController;
  late AnimationController _mouthController;
  late Animation<double> _pulseAnimation;
  late Animation<double> _mouthAnimation;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    _mouthController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.2).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
    _mouthAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _mouthController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _mouthController.dispose();
    super.dispose();
  }

  void _startListening() {
    setState(() {
      _isListening = true;
    });
    _pulseController.repeat(reverse: true);

    // Simulate speech recognition
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted && _isListening) {
        _stopListening();
        // Simulate speech result
        widget.onSpeechResult(widget.targetWord);
      }
    });
  }

  void _stopListening() {
    setState(() {
      _isListening = false;
    });
    _pulseController.stop();
    _pulseController.reset();
  }

  void _playExample() {
    setState(() {
      _isPlayingExample = true;
    });
    _mouthController.forward();

    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _isPlayingExample = false;
        });
        _mouthController.reverse();
      }
    });
  }

  Color _getAccuracyColor() {
    if (widget.accuracyScore == null)
      return AppTheme.lightTheme.colorScheme.outline;

    if (widget.accuracyScore! >= 0.8) {
      return AppTheme.lightTheme.colorScheme.primary;
    } else if (widget.accuracyScore! >= 0.6) {
      return AppTheme.lightTheme.colorScheme.tertiary;
    } else {
      return AppTheme.lightTheme.colorScheme.error;
    }
  }

  String _getAccuracyText() {
    if (widget.accuracyScore == null) return 'Not scored';

    if (widget.accuracyScore! >= 0.8) {
      return 'Excellent!';
    } else if (widget.accuracyScore! >= 0.6) {
      return 'Good!';
    } else {
      return 'Try again';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: double.infinity,
          padding: EdgeInsets.all(4.w),
          margin: EdgeInsets.symmetric(horizontal: 4.w),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: AppTheme.lightTheme.colorScheme.outline,
              width: 1,
            ),
          ),
          child: Column(
            children: [
              Text(
                'Practice pronunciation',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 2.h),
              Text(
                widget.targetWord,
                style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.primary,
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 1.h),
              Text(
                widget.pronunciationGuide,
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  fontStyle: FontStyle.italic,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
        SizedBox(height: 3.h),
        // Mouth Animation
        Container(
          margin: EdgeInsets.symmetric(horizontal: 4.w),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              // Example Audio Button
              GestureDetector(
                onTap: _isPlayingExample ? null : _playExample,
                child: Container(
                  width: 20.w,
                  height: 20.w,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: _isPlayingExample
                        ? AppTheme.lightTheme.colorScheme.tertiary
                        : AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.2),
                    border: Border.all(
                      color: AppTheme.lightTheme.colorScheme.tertiary,
                      width: 2,
                    ),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CustomIconWidget(
                        iconName: _isPlayingExample ? 'pause' : 'volume_up',
                        color: _isPlayingExample
                            ? Colors.white
                            : AppTheme.lightTheme.colorScheme.tertiary,
                        size: 24,
                      ),
                      SizedBox(height: 0.5.h),
                      Text(
                        'Listen',
                        style:
                            AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                          color: _isPlayingExample
                              ? Colors.white
                              : AppTheme.lightTheme.colorScheme.tertiary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              // Mouth Animation
              AnimatedBuilder(
                animation: _mouthAnimation,
                builder: (context, child) {
                  return Container(
                    width: 25.w,
                    height: 25.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: AppTheme.lightTheme.colorScheme.surface,
                      border: Border.all(
                        color: AppTheme.lightTheme.colorScheme.outline,
                        width: 2,
                      ),
                    ),
                    child: CustomPaint(
                      painter: MouthAnimationPainter(
                        animationValue: _mouthAnimation.value,
                        color: AppTheme.lightTheme.colorScheme.primary,
                      ),
                    ),
                  );
                },
              ),
              // Record Button
              GestureDetector(
                onTap: _isListening ? _stopListening : _startListening,
                child: AnimatedBuilder(
                  animation: _pulseAnimation,
                  builder: (context, child) {
                    return Transform.scale(
                      scale: _isListening ? _pulseAnimation.value : 1.0,
                      child: Container(
                        width: 20.w,
                        height: 20.w,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: _isListening
                              ? AppTheme.lightTheme.colorScheme.error
                              : AppTheme.lightTheme.colorScheme.primary,
                          boxShadow: _isListening
                              ? [
                                  BoxShadow(
                                    color: AppTheme.lightTheme.colorScheme.error
                                        .withValues(alpha: 0.3),
                                    blurRadius: 20,
                                    spreadRadius: 5,
                                  ),
                                ]
                              : null,
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconWidget(
                              iconName: _isListening ? 'stop' : 'mic',
                              color: Colors.white,
                              size: 24,
                            ),
                            SizedBox(height: 0.5.h),
                            Text(
                              _isListening ? 'Stop' : 'Record',
                              style: AppTheme.lightTheme.textTheme.labelSmall
                                  ?.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
        if (widget.showResult) ...[
          SizedBox(height: 3.h),
          Container(
            margin: EdgeInsets.symmetric(horizontal: 4.w),
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              color: _getAccuracyColor().withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: _getAccuracyColor(),
                width: 1,
              ),
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    CustomIconWidget(
                      iconName: widget.accuracyScore != null &&
                              widget.accuracyScore! >= 0.6
                          ? 'check_circle'
                          : 'cancel',
                      color: _getAccuracyColor(),
                      size: 24,
                    ),
                    SizedBox(width: 2.w),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _getAccuracyText(),
                            style: AppTheme.lightTheme.textTheme.titleSmall
                                ?.copyWith(
                              color: _getAccuracyColor(),
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          if (widget.accuracyScore != null) ...[
                            SizedBox(height: 0.5.h),
                            Text(
                              'Accuracy: ${(widget.accuracyScore! * 100).toInt()}%',
                              style: AppTheme.lightTheme.textTheme.bodySmall
                                  ?.copyWith(
                                color: AppTheme
                                    .lightTheme.colorScheme.onSurfaceVariant,
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                  ],
                ),
                if (widget.userSpeech != null &&
                    widget.userSpeech!.isNotEmpty) ...[
                  SizedBox(height: 2.h),
                  Container(
                    width: double.infinity,
                    padding: EdgeInsets.all(3.w),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: AppTheme.lightTheme.colorScheme.outline,
                        width: 1,
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'You said:',
                          style: AppTheme.lightTheme.textTheme.labelMedium
                              ?.copyWith(
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        SizedBox(height: 0.5.h),
                        Text(
                          widget.userSpeech!,
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ],
    );
  }
}

class MouthAnimationPainter extends CustomPainter {
  final double animationValue;
  final Color color;

  MouthAnimationPainter({
    required this.animationValue,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    final center = Offset(size.width / 2, size.height / 2);

    // Draw mouth shape based on animation value
    final mouthWidth = 30 + (animationValue * 20);
    final mouthHeight = 5 + (animationValue * 15);

    final mouthRect = RRect.fromRectAndRadius(
      Rect.fromCenter(
        center: Offset(center.dx, center.dy + 10),
        width: mouthWidth,
        height: mouthHeight,
      ),
      Radius.circular(mouthHeight / 2),
    );

    canvas.drawRRect(mouthRect, paint);

    // Draw eyes
    final eyePaint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    canvas.drawCircle(
      Offset(center.dx - 15, center.dy - 15),
      3,
      eyePaint,
    );

    canvas.drawCircle(
      Offset(center.dx + 15, center.dy - 15),
      3,
      eyePaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
