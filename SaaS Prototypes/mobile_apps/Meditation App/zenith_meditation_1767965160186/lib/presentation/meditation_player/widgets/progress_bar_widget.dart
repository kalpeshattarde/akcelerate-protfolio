import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class ProgressBarWidget extends StatefulWidget {
  final Duration currentPosition;
  final Duration totalDuration;
  final ValueChanged<Duration> onSeek;

  const ProgressBarWidget({
    Key? key,
    required this.currentPosition,
    required this.totalDuration,
    required this.onSeek,
  }) : super(key: key);

  @override
  State<ProgressBarWidget> createState() => _ProgressBarWidgetState();
}

class _ProgressBarWidgetState extends State<ProgressBarWidget> {
  bool _isDragging = false;
  double _dragValue = 0.0;

  String _formatDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    final minutes = twoDigits(duration.inMinutes.remainder(60));
    final seconds = twoDigits(duration.inSeconds.remainder(60));
    return '$minutes:$seconds';
  }

  double get _progressValue {
    if (_isDragging) return _dragValue;
    if (widget.totalDuration.inMilliseconds == 0) return 0.0;
    return widget.currentPosition.inMilliseconds /
        widget.totalDuration.inMilliseconds;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 6.w),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                _formatDuration(_isDragging
                    ? Duration(
                        milliseconds:
                            (_dragValue * widget.totalDuration.inMilliseconds)
                                .round())
                    : widget.currentPosition),
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface
                      .withValues(alpha: 0.7),
                  fontWeight: FontWeight.w500,
                ),
              ),
              Text(
                _formatDuration(widget.totalDuration),
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface
                      .withValues(alpha: 0.7),
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          SizedBox(height: 1.h),
          GestureDetector(
            onTapDown: (details) {
              final RenderBox box = context.findRenderObject() as RenderBox;
              final Offset localPosition =
                  box.globalToLocal(details.globalPosition);
              final double progress =
                  (localPosition.dx / box.size.width).clamp(0.0, 1.0);
              final Duration newPosition = Duration(
                milliseconds:
                    (progress * widget.totalDuration.inMilliseconds).round(),
              );
              widget.onSeek(newPosition);
            },
            child: Container(
              height: 6.h,
              child: SliderTheme(
                data: SliderTheme.of(context).copyWith(
                  trackHeight: 0.8.h,
                  thumbShape: RoundSliderThumbShape(enabledThumbRadius: 2.w),
                  overlayShape: RoundSliderOverlayShape(overlayRadius: 4.w),
                  activeTrackColor: AppTheme.lightTheme.colorScheme.secondary,
                  inactiveTrackColor: AppTheme.lightTheme.colorScheme.outline
                      .withValues(alpha: 0.3),
                  thumbColor: AppTheme.lightTheme.colorScheme.secondary,
                  overlayColor: AppTheme.lightTheme.colorScheme.secondary
                      .withValues(alpha: 0.2),
                ),
                child: Slider(
                  value: _progressValue.clamp(0.0, 1.0),
                  onChanged: (value) {
                    setState(() {
                      _isDragging = true;
                      _dragValue = value;
                    });
                  },
                  onChangeEnd: (value) {
                    setState(() {
                      _isDragging = false;
                    });
                    final Duration newPosition = Duration(
                      milliseconds:
                          (value * widget.totalDuration.inMilliseconds).round(),
                    );
                    widget.onSeek(newPosition);
                  },
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
