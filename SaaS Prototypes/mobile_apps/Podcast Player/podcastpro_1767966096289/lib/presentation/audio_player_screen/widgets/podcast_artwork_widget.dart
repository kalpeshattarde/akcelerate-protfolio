import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class PodcastArtworkWidget extends StatefulWidget {
  final String? imageUrl; // Made optional to support hiding the image
  final String podcastTitle;
  final String episodeTitle;
  final bool isPlaying;
  final VoidCallback onTap;
  final VoidCallback onLongPress;
  final bool showArtwork; // New parameter to control image visibility

  const PodcastArtworkWidget({
    Key? key,
    this.imageUrl, // Made optional
    required this.podcastTitle,
    required this.episodeTitle,
    required this.isPlaying,
    required this.onTap,
    required this.onLongPress,
    this.showArtwork = true, // Default to showing artwork
  }) : super(key: key);

  @override
  State<PodcastArtworkWidget> createState() => _PodcastArtworkWidgetState();
}

class _PodcastArtworkWidgetState extends State<PodcastArtworkWidget>
    with TickerProviderStateMixin {
  late AnimationController _rotationController;
  late AnimationController _breathingController;
  late AnimationController _glowController;
  late Animation<double> _rotationAnimation;
  late Animation<double> _breathingAnimation;
  late Animation<double> _glowAnimation;

  @override
  void initState() {
    super.initState();

    _rotationController = AnimationController(
      duration: const Duration(seconds: 20),
      vsync: this,
    );

    _breathingController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    )..repeat(reverse: true);

    _glowController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat(reverse: true);

    _rotationAnimation = Tween<double>(
      begin: 0,
      end: 1,
    ).animate(CurvedAnimation(
      parent: _rotationController,
      curve: Curves.linear,
    ));

    _breathingAnimation = Tween<double>(
      begin: 1.0,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _breathingController,
      curve: Curves.easeInOut,
    ));

    _glowAnimation = Tween<double>(
      begin: 0.3,
      end: 0.8,
    ).animate(CurvedAnimation(
      parent: _glowController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _rotationController.dispose();
    _breathingController.dispose();
    _glowController.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(PodcastArtworkWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isPlaying != oldWidget.isPlaying) {
      if (widget.isPlaying) {
        _rotationController.repeat();
      } else {
        _rotationController.stop();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      onLongPress: widget.onLongPress,
      child: Container(
        width: double.infinity,
        height: 50.h,
        child: Column(
          children: [
            // Artwork with animations - conditionally shown
            if (widget.showArtwork && widget.imageUrl != null)
              Expanded(
                child: AnimatedBuilder(
                  animation: Listenable.merge([
                    _rotationAnimation,
                    _breathingAnimation,
                    _glowAnimation,
                  ]),
                  builder: (context, child) {
                    return Transform.scale(
                      scale: widget.isPlaying ? _breathingAnimation.value : 1.0,
                      child: Transform.rotate(
                        angle: widget.isPlaying
                            ? _rotationAnimation.value * 2 * 3.14159
                            : 0,
                        child: Container(
                          width: 70.w,
                          height: 70.w,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                color: AppTheme.lightTheme.colorScheme.secondary
                                    .withValues(
                                        alpha: widget.isPlaying
                                            ? _glowAnimation.value
                                            : 0.2),
                                blurRadius: 30,
                                spreadRadius: 5,
                              ),
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.1),
                                blurRadius: 20,
                                offset: const Offset(0, 10),
                              ),
                            ],
                          ),
                          child: ClipOval(
                            child: CustomImageWidget(
                              imageUrl: widget.imageUrl!,
                              width: 70.w,
                              height: 70.w,
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              )
            else if (!widget.showArtwork)
              // Show only a minimal audio icon when artwork is hidden
              Expanded(
                child: Center(
                  child: Container(
                    width: 20.w,
                    height: 20.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.1),
                    ),
                    child: CustomIconWidget(
                      iconName: 'headphones',
                      size: 8.w,
                      color: AppTheme.lightTheme.colorScheme.secondary,
                    ),
                  ),
                ),
              ),

            SizedBox(height: widget.showArtwork ? 4.h : 2.h),

            // Episode info
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 6.w),
              child: Column(
                children: [
                  // Episode title
                  Text(
                    widget.episodeTitle,
                    style:
                        AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                      fontWeight: FontWeight.w700,
                    ),
                    textAlign: TextAlign.center,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),

                  SizedBox(height: 1.h),

                  // Podcast title
                  Text(
                    widget.podcastTitle,
                    style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurface
                          .withValues(alpha: 0.7),
                      fontWeight: FontWeight.w500,
                    ),
                    textAlign: TextAlign.center,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
