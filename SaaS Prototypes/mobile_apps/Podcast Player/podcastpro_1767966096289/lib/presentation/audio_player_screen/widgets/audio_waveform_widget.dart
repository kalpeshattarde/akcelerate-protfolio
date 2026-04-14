import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class AudioWaveformWidget extends StatefulWidget {
  final double progress;
  final Duration currentPosition;
  final Duration totalDuration;
  final Function(double) onSeek;
  final List<double> waveformData;
  final List<Map<String, dynamic>> chapters;

  const AudioWaveformWidget({
    Key? key,
    required this.progress,
    required this.currentPosition,
    required this.totalDuration,
    required this.onSeek,
    required this.waveformData,
    required this.chapters,
  }) : super(key: key);

  @override
  State<AudioWaveformWidget> createState() => _AudioWaveformWidgetState();
}

class _AudioWaveformWidgetState extends State<AudioWaveformWidget>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;
  bool _isDragging = false;
  double _dragPosition = 0.0;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat(reverse: true);

    _pulseAnimation = Tween<double>(
      begin: 0.8,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 20.h,
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Column(
        children: [
          // Chapter markers
          _buildChapterMarkers(),
          SizedBox(height: 1.h),
          // Waveform
          Expanded(
            child: GestureDetector(
              onPanStart: (details) {
                setState(() {
                  _isDragging = true;
                });
              },
              onPanUpdate: (details) {
                final RenderBox box = context.findRenderObject() as RenderBox;
                final localPosition = box.globalToLocal(details.globalPosition);
                final progress =
                    (localPosition.dx / box.size.width).clamp(0.0, 1.0);
                setState(() {
                  _dragPosition = progress;
                });
              },
              onPanEnd: (details) {
                widget.onSeek(_dragPosition);
                setState(() {
                  _isDragging = false;
                });
              },
              child: CustomPaint(
                painter: WaveformPainter(
                  waveformData: widget.waveformData,
                  progress: _isDragging ? _dragPosition : widget.progress,
                  pulseAnimation: _pulseAnimation,
                  isDragging: _isDragging,
                  primaryColor: AppTheme.lightTheme.colorScheme.secondary,
                  backgroundColor: AppTheme.lightTheme.colorScheme.onSurface
                      .withValues(alpha: 0.2),
                ),
                size: Size.infinite,
              ),
            ),
          ),
          SizedBox(height: 1.h),
          // Time indicators
          _buildTimeIndicators(),
        ],
      ),
    );
  }

  Widget _buildChapterMarkers() {
    return SizedBox(
      height: 3.h,
      child: Stack(
        children: widget.chapters.map((chapter) {
          final chapterProgress =
              (chapter['startTime'] as int) / widget.totalDuration.inSeconds;
          return Positioned(
            left: chapterProgress * 88.w,
            child: Container(
              width: 0.5.w,
              height: 3.h,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.secondary
                    .withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(1),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildTimeIndicators() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          _formatDuration(_isDragging
              ? Duration(
                  seconds:
                      (_dragPosition * widget.totalDuration.inSeconds).round())
              : widget.currentPosition),
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.secondary,
            fontWeight: FontWeight.w600,
          ),
        ),
        Text(
          _formatDuration(widget.totalDuration),
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface
                .withValues(alpha: 0.7),
          ),
        ),
      ],
    );
  }

  String _formatDuration(Duration duration) {
    final hours = duration.inHours;
    final minutes = duration.inMinutes.remainder(60);
    final seconds = duration.inSeconds.remainder(60);

    if (hours > 0) {
      return '${hours.toString().padLeft(2, '0')}:${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
    }
    return '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }
}

class WaveformPainter extends CustomPainter {
  final List<double> waveformData;
  final double progress;
  final Animation<double> pulseAnimation;
  final bool isDragging;
  final Color primaryColor;
  final Color backgroundColor;

  WaveformPainter({
    required this.waveformData,
    required this.progress,
    required this.pulseAnimation,
    required this.isDragging,
    required this.primaryColor,
    required this.backgroundColor,
  }) : super(repaint: pulseAnimation);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..strokeWidth = 2.0
      ..strokeCap = StrokeCap.round;

    final barWidth = size.width / waveformData.length;
    final centerY = size.height / 2;

    for (int i = 0; i < waveformData.length; i++) {
      final x = i * barWidth + barWidth / 2;
      final barHeight = waveformData[i] * size.height * 0.8;
      final isPlayed = (i / waveformData.length) <= progress;

      // Apply pulse effect to current position
      final currentProgress = progress * waveformData.length;
      final distanceFromCurrent = (i - currentProgress).abs();
      final pulseEffect = distanceFromCurrent < 3 ? pulseAnimation.value : 1.0;

      paint.color = isPlayed
          ? primaryColor.withValues(alpha: isDragging ? 0.9 : 0.8)
          : backgroundColor;

      final adjustedHeight = barHeight * pulseEffect;

      canvas.drawLine(
        Offset(x, centerY - adjustedHeight / 2),
        Offset(x, centerY + adjustedHeight / 2),
        paint,
      );
    }

    // Draw progress indicator
    if (isDragging) {
      final indicatorX = progress * size.width;
      final indicatorPaint = Paint()
        ..color = primaryColor
        ..strokeWidth = 3.0;

      canvas.drawLine(
        Offset(indicatorX, 0),
        Offset(indicatorX, size.height),
        indicatorPaint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
