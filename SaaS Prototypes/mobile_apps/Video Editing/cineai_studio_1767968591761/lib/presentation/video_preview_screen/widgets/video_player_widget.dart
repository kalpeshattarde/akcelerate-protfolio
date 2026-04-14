import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_image_widget.dart';

/// Video player widget with zoom and gesture support
class VideoPlayerWidget extends StatefulWidget {
  final String videoUrl;
  final String thumbnail;
  final String semanticLabel;
  final bool isPlaying;
  final bool isLoading;
  final bool isBuffering;
  final double zoomLevel;
  final ValueChanged<double> onZoomChange;

  const VideoPlayerWidget({
    super.key,
    required this.videoUrl,
    required this.thumbnail,
    required this.semanticLabel,
    required this.isPlaying,
    required this.isLoading,
    required this.isBuffering,
    required this.zoomLevel,
    required this.onZoomChange,
  });

  @override
  State<VideoPlayerWidget> createState() => _VideoPlayerWidgetState();
}

class _VideoPlayerWidgetState extends State<VideoPlayerWidget> {
  double _baseScale = 1.0;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onScaleStart: (details) {
        _baseScale = widget.zoomLevel;
      },
      onScaleUpdate: (details) {
        widget.onZoomChange(details.scale);
      },
      child: Container(
        color: Colors.black,
        child: Center(
          child: Transform.scale(
            scale: widget.zoomLevel,
            child: AspectRatio(
              aspectRatio: 16 / 9,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  // Video Thumbnail/Player
                  CustomImageWidget(
                    imageUrl: widget.thumbnail,
                    width: double.infinity,
                    height: double.infinity,
                    fit: BoxFit.cover,
                    semanticLabel: widget.semanticLabel,
                  ),

                  // Gradient Overlay for cinematic effect
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.black.withValues(alpha: 0.3),
                          Colors.transparent,
                          Colors.black.withValues(alpha: 0.3),
                        ],
                        stops: const [0.0, 0.5, 1.0],
                      ),
                    ),
                  ),

                  // Buffering Indicator
                  if (widget.isBuffering)
                    Center(
                      child: Container(
                        padding: EdgeInsets.all(4.w),
                        decoration: BoxDecoration(
                          color: Colors.black.withValues(alpha: 0.5),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: CircularProgressIndicator(
                          valueColor: AlwaysStoppedAnimation<Color>(
                            Theme.of(context).colorScheme.primary,
                          ),
                        ),
                      ),
                    ),

                  // Zoom Level Indicator
                  if (widget.zoomLevel > 1.0)
                    Positioned(
                      top: 10.h,
                      right: 4.w,
                      child: Container(
                        padding: EdgeInsets.symmetric(
                          horizontal: 3.w,
                          vertical: 1.h,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.black.withValues(alpha: 0.7),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          '${(widget.zoomLevel * 100).toInt()}%',
                          style: Theme.of(context).textTheme.labelSmall
                              ?.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w600,
                              ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
