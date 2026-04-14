import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_image_widget.dart';

/// Timeline scrubber with thumbnail preview
class VideoTimelineWidget extends StatefulWidget {
  final double currentPosition;
  final double duration;
  final ValueChanged<double> onSeek;
  final String thumbnail;
  final String semanticLabel;

  const VideoTimelineWidget({
    super.key,
    required this.currentPosition,
    required this.duration,
    required this.onSeek,
    required this.thumbnail,
    required this.semanticLabel,
  });

  @override
  State<VideoTimelineWidget> createState() => _VideoTimelineWidgetState();
}

class _VideoTimelineWidgetState extends State<VideoTimelineWidget> {
  bool _isDragging = false;
  bool _showThumbnailPreview = false;
  double _previewPosition = 0.0;

  String _formatDuration(double seconds) {
    final duration = Duration(seconds: seconds.toInt());
    final minutes = duration.inMinutes;
    final secs = duration.inSeconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Thumbnail Preview
          if (_showThumbnailPreview)
            Padding(
              padding: EdgeInsets.only(bottom: 1.h),
              child: Container(
                width: 30.w,
                height: 15.h,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: theme.colorScheme.primary,
                    width: 2,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.5),
                      blurRadius: 10,
                      spreadRadius: 2,
                    ),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: Stack(
                    fit: StackFit.expand,
                    children: [
                      CustomImageWidget(
                        imageUrl: widget.thumbnail,
                        width: double.infinity,
                        height: double.infinity,
                        fit: BoxFit.cover,
                        semanticLabel: widget.semanticLabel,
                      ),
                      Positioned(
                        bottom: 1.h,
                        left: 0,
                        right: 0,
                        child: Center(
                          child: Container(
                            padding: EdgeInsets.symmetric(
                              horizontal: 2.w,
                              vertical: 0.5.h,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.black.withValues(alpha: 0.7),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              _formatDuration(_previewPosition),
                              style: theme.textTheme.labelSmall?.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

          // Timeline Slider
          Row(
            children: [
              // Current Time
              Text(
                _formatDuration(widget.currentPosition),
                style: theme.textTheme.labelSmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w500,
                ),
              ),

              SizedBox(width: 2.w),

              // Slider
              Expanded(
                child: GestureDetector(
                  onLongPressStart: (details) {
                    setState(() => _showThumbnailPreview = true);
                  },
                  onLongPressEnd: (details) {
                    setState(() => _showThumbnailPreview = false);
                  },
                  child: SliderTheme(
                    data: SliderThemeData(
                      trackHeight: 4,
                      thumbShape: const RoundSliderThumbShape(
                        enabledThumbRadius: 8,
                      ),
                      overlayShape: const RoundSliderOverlayShape(
                        overlayRadius: 16,
                      ),
                      activeTrackColor: theme.colorScheme.primary,
                      inactiveTrackColor: Colors.white.withValues(alpha: 0.3),
                      thumbColor: Colors.white,
                      overlayColor: theme.colorScheme.primary.withValues(
                        alpha: 0.3,
                      ),
                    ),
                    child: Slider(
                      value: widget.currentPosition,
                      min: 0.0,
                      max: widget.duration,
                      onChanged: (value) {
                        setState(() {
                          _isDragging = true;
                          _previewPosition = value;
                        });
                        widget.onSeek(value);
                      },
                      onChangeEnd: (value) {
                        setState(() => _isDragging = false);
                      },
                    ),
                  ),
                ),
              ),

              SizedBox(width: 2.w),

              // Duration
              Text(
                _formatDuration(widget.duration),
                style: theme.textTheme.labelSmall?.copyWith(
                  color: Colors.white,
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
