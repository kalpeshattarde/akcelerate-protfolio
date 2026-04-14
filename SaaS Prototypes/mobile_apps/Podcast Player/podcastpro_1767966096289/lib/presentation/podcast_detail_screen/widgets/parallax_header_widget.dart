import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class ParallaxHeaderWidget extends StatefulWidget {
  final Map<String, dynamic> podcastData;
  final ScrollController scrollController;
  final VoidCallback? onSubscribe;
  final VoidCallback? onShare;
  final bool isSubscribed;

  const ParallaxHeaderWidget({
    Key? key,
    required this.podcastData,
    required this.scrollController,
    this.onSubscribe,
    this.onShare,
    this.isSubscribed = false,
  }) : super(key: key);

  @override
  State<ParallaxHeaderWidget> createState() => _ParallaxHeaderWidgetState();
}

class _ParallaxHeaderWidgetState extends State<ParallaxHeaderWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _subscribeAnimationController;
  late Animation<double> _subscribeScaleAnimation;
  double _scrollOffset = 0.0;

  @override
  void initState() {
    super.initState();
    _subscribeAnimationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _subscribeScaleAnimation = Tween<double>(
      begin: 1.0,
      end: 1.1,
    ).animate(CurvedAnimation(
      parent: _subscribeAnimationController,
      curve: Curves.elasticOut,
    ));

    widget.scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _subscribeAnimationController.dispose();
    widget.scrollController.removeListener(_onScroll);
    super.dispose();
  }

  void _onScroll() {
    setState(() {
      _scrollOffset = widget.scrollController.offset;
    });
  }

  void _handleSubscribe() {
    _subscribeAnimationController.forward().then((_) {
      _subscribeAnimationController.reverse();
    });
    widget.onSubscribe?.call();
  }

  Color _extractDominantColor() {
    // Simulated color extraction from artwork
    return AppTheme.lightTheme.colorScheme.secondary;
  }

  Widget _buildAmbientBackground() {
    final dominantColor = _extractDominantColor();
    final parallaxOffset = _scrollOffset * 0.5;

    return Transform.translate(
      offset: Offset(0, -parallaxOffset),
      child: Container(
        height: 50.h + parallaxOffset,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              dominantColor.withValues(alpha: 0.3),
              dominantColor.withValues(alpha: 0.1),
              Colors.transparent,
            ],
            stops: const [0.0, 0.7, 1.0],
          ),
        ),
      ),
    );
  }

  Widget _buildArtworkSection() {
    final parallaxOffset = _scrollOffset * 0.3;
    final scale = 1.0 - (_scrollOffset / 1000).clamp(0.0, 0.3);

    return Transform.translate(
      offset: Offset(0, -parallaxOffset),
      child: Transform.scale(
        scale: scale,
        child: Container(
          margin: EdgeInsets.symmetric(horizontal: 8.w),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: CustomImageWidget(
              imageUrl: widget.podcastData['artwork'] as String? ?? '',
              width: 50.w,
              height: 50.w,
              fit: BoxFit.cover,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPodcastInfo() {
    final opacity = (1.0 - (_scrollOffset / 200)).clamp(0.0, 1.0);

    return Opacity(
      opacity: opacity,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 6.w),
        child: Column(
          children: [
            SizedBox(height: 3.h),
            Text(
              widget.podcastData['title'] as String? ?? '',
              style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w700,
                color: AppTheme.lightTheme.colorScheme.onSurface,
              ),
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            SizedBox(height: 1.h),
            Text(
              widget.podcastData['creator'] as String? ?? '',
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                fontWeight: FontWeight.w500,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 1.h),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildStatItem(
                  icon: 'people',
                  value: widget.podcastData['subscribers'] as String? ?? '0',
                  label: 'Subscribers',
                ),
                SizedBox(width: 6.w),
                _buildStatItem(
                  icon: 'star',
                  value: widget.podcastData['rating'] as String? ?? '0.0',
                  label: 'Rating',
                ),
                SizedBox(width: 6.w),
                _buildStatItem(
                  icon: 'library_music',
                  value: widget.podcastData['episodeCount'] as String? ?? '0',
                  label: 'Episodes',
                ),
              ],
            ),
            SizedBox(height: 3.h),
            Text(
              widget.podcastData['description'] as String? ?? '',
              style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                height: 1.5,
              ),
              textAlign: TextAlign.center,
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
            ),
            SizedBox(height: 3.h),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                AnimatedBuilder(
                  animation: _subscribeScaleAnimation,
                  builder: (context, child) {
                    return Transform.scale(
                      scale: _subscribeScaleAnimation.value,
                      child: ElevatedButton.icon(
                        onPressed: _handleSubscribe,
                        icon: CustomIconWidget(
                          iconName: widget.isSubscribed ? 'check' : 'add',
                          size: 20,
                          color: AppTheme.lightTheme.colorScheme.onSecondary,
                        ),
                        label: Text(
                          widget.isSubscribed ? 'Subscribed' : 'Subscribe',
                          style: AppTheme.lightTheme.textTheme.labelLarge
                              ?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onSecondary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: widget.isSubscribed
                              ? AppTheme.lightTheme.colorScheme.secondary
                                  .withValues(alpha: 0.8)
                              : AppTheme.lightTheme.colorScheme.secondary,
                          padding: EdgeInsets.symmetric(
                              horizontal: 6.w, vertical: 1.5.h),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(25),
                          ),
                        ),
                      ),
                    );
                  },
                ),
                SizedBox(width: 4.w),
                OutlinedButton.icon(
                  onPressed: widget.onShare,
                  icon: CustomIconWidget(
                    iconName: 'share',
                    size: 20,
                    color: AppTheme.lightTheme.colorScheme.secondary,
                  ),
                  label: Text(
                    'Share',
                    style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.secondary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  style: OutlinedButton.styleFrom(
                    padding:
                        EdgeInsets.symmetric(horizontal: 6.w, vertical: 1.5.h),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(25),
                    ),
                    side: BorderSide(
                      color: AppTheme.lightTheme.colorScheme.secondary,
                      width: 1.5,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem({
    required String icon,
    required String value,
    required String label,
  }) {
    return Column(
      children: [
        CustomIconWidget(
          iconName: icon,
          size: 20,
          color: AppTheme.lightTheme.colorScheme.secondary,
        ),
        SizedBox(height: 0.5.h),
        Text(
          value,
          style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.w600,
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
        ),
        Text(
          label,
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return SliverToBoxAdapter(
      child: Container(
        height: 80.h,
        child: Stack(
          children: [
            _buildAmbientBackground(),
            Positioned(
              top: 15.h,
              left: 0,
              right: 0,
              child: _buildArtworkSection(),
            ),
            Positioned(
              top: 40.h,
              left: 0,
              right: 0,
              child: _buildPodcastInfo(),
            ),
          ],
        ),
      ),
    );
  }
}
