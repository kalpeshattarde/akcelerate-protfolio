import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:sizer/sizer.dart';
import 'dart:math'; // Add this import for sin function

import '../../../core/app_export.dart';

class SoundCard extends StatefulWidget {
  final Map<String, dynamic> soundData;
  final VoidCallback onTap;
  final VoidCallback onDownload;
  final VoidCallback onFavorite;
  final VoidCallback onShare;
  final bool isPlaying;
  final bool isDownloaded;
  final bool isFavorite;

  const SoundCard({
    Key? key,
    required this.soundData,
    required this.onTap,
    required this.onDownload,
    required this.onFavorite,
    required this.onShare,
    this.isPlaying = false,
    this.isDownloaded = false,
    this.isFavorite = false,
  }) : super(key: key);

  @override
  State<SoundCard> createState() => _SoundCardState();
}

class _SoundCardState extends State<SoundCard> with TickerProviderStateMixin {
  late AnimationController _waveController;
  late Animation<double> _waveAnimation;

  @override
  void initState() {
    super.initState();
    _waveController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    _waveAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _waveController, curve: Curves.easeInOut),
    );

    if (widget.isPlaying) {
      _waveController.repeat();
    }
  }

  @override
  void didUpdateWidget(SoundCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isPlaying && !oldWidget.isPlaying) {
      _waveController.repeat();
    } else if (!widget.isPlaying && oldWidget.isPlaying) {
      _waveController.stop();
    }
  }

  @override
  void dispose() {
    _waveController.dispose();
    super.dispose();
  }

  void _showContextMenu() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              margin: EdgeInsets.only(top: 1.h, bottom: 2.h),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.outline,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            _buildContextMenuItem(
              icon: 'download',
              title: widget.isDownloaded ? 'Downloaded' : 'Download',
              onTap: widget.isDownloaded ? null : widget.onDownload,
            ),
            _buildContextMenuItem(
              icon: widget.isFavorite ? 'favorite' : 'favorite_border',
              title: widget.isFavorite
                  ? 'Remove from Favorites'
                  : 'Add to Favorites',
              onTap: widget.onFavorite,
            ),
            _buildContextMenuItem(
              icon: 'queue_music',
              title: 'Create Mix',
              onTap: () {
                Navigator.pop(context);
                // Handle create mix
              },
            ),
            _buildContextMenuItem(
              icon: 'share',
              title: 'Share',
              onTap: widget.onShare,
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  Widget _buildContextMenuItem({
    required String icon,
    required String title,
    required VoidCallback? onTap,
  }) {
    return ListTile(
      leading: CustomIconWidget(
        iconName: icon,
        color: onTap != null
            ? AppTheme.lightTheme.colorScheme.onSurface
            : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
        size: 24,
      ),
      title: Text(
        title,
        style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
          color: onTap != null
              ? AppTheme.lightTheme.colorScheme.onSurface
              : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
        ),
      ),
      onTap: onTap != null
          ? () {
              Navigator.pop(context);
              onTap();
            }
          : null,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Slidable(
      key: ValueKey(widget.soundData['id']),
      startActionPane: ActionPane(
        motion: const ScrollMotion(),
        children: [
          SlidableAction(
            onPressed: (_) => widget.onTap(),
            backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
            foregroundColor: AppTheme.lightTheme.colorScheme.onSecondary,
            icon: Icons.play_arrow,
            label: 'Play',
            borderRadius: BorderRadius.circular(12),
          ),
        ],
      ),
      endActionPane: ActionPane(
        motion: const ScrollMotion(),
        children: [
          SlidableAction(
            onPressed: (_) => widget.onDownload(),
            backgroundColor: AppTheme.lightTheme.colorScheme.tertiary,
            foregroundColor: AppTheme.lightTheme.colorScheme.onTertiary,
            icon: Icons.download,
            label: 'Download',
            borderRadius: BorderRadius.circular(12),
          ),
        ],
      ),
      child: GestureDetector(
        onTap: widget.onTap,
        onLongPress: _showContextMenu,
        child: Container(
          margin: EdgeInsets.symmetric(horizontal: 1.w, vertical: 1.h),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: AppTheme.lightTheme.colorScheme.shadow,
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
            border: widget.isPlaying
                ? Border.all(
                    color: AppTheme.lightTheme.colorScheme.secondary,
                    width: 2,
                  )
                : null,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Image and status indicators
              Stack(
                children: [
                  ClipRRect(
                    borderRadius:
                        const BorderRadius.vertical(top: Radius.circular(16)),
                    child: CustomImageWidget(
                      imageUrl: widget.soundData['image'] as String,
                      width: double.infinity,
                      height: 20.h,
                      fit: BoxFit.cover,
                      semanticLabel:
                          widget.soundData['semanticLabel'] as String,
                    ),
                  ),
                  // Status indicators
                  Positioned(
                    top: 1.h,
                    right: 2.w,
                    child: Row(
                      children: [
                        if (widget.isDownloaded) ...[
                          Container(
                            padding: EdgeInsets.all(1.w),
                            decoration: BoxDecoration(
                              color: AppTheme.lightTheme.colorScheme.tertiary,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: CustomIconWidget(
                              iconName: 'download_done',
                              color: AppTheme.lightTheme.colorScheme.onTertiary,
                              size: 16,
                            ),
                          ),
                          SizedBox(width: 1.w),
                        ],
                        if (widget.isFavorite) ...[
                          Container(
                            padding: EdgeInsets.all(1.w),
                            decoration: BoxDecoration(
                              color: AppTheme.lightTheme.colorScheme.secondary,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: CustomIconWidget(
                              iconName: 'favorite',
                              color:
                                  AppTheme.lightTheme.colorScheme.onSecondary,
                              size: 16,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                  // Play button overlay
                  if (widget.isPlaying)
                    Positioned.fill(
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.black.withValues(alpha: 0.3),
                          borderRadius: const BorderRadius.vertical(
                              top: Radius.circular(16)),
                        ),
                        child: Center(
                          child: Container(
                            padding: EdgeInsets.all(3.w),
                            decoration: BoxDecoration(
                              color: AppTheme.lightTheme.colorScheme.secondary,
                              shape: BoxShape.circle,
                            ),
                            child: CustomIconWidget(
                              iconName: 'stop',
                              color:
                                  AppTheme.lightTheme.colorScheme.onSecondary,
                              size: 32,
                            ),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
              // Content
              Padding(
                padding: EdgeInsets.all(3.w),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.soundData['name'] as String,
                      style: AppTheme.lightTheme.textTheme.titleMedium,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    SizedBox(height: 0.5.h),
                    Row(
                      children: [
                        CustomIconWidget(
                          iconName: 'access_time',
                          color:
                              AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                          size: 16,
                        ),
                        SizedBox(width: 1.w),
                        Text(
                          widget.soundData['duration'] as String,
                          style: AppTheme.lightTheme.textTheme.bodySmall,
                        ),
                        const Spacer(),
                        if (widget.isDownloaded)
                          Text(
                            widget.soundData['size'] as String,
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                              color: AppTheme.lightTheme.colorScheme.tertiary,
                            ),
                          ),
                      ],
                    ),
                    SizedBox(height: 1.h),
                    // Waveform visualization
                    Container(
                      height: 4.h,
                      width: double.infinity,
                      child: widget.isPlaying
                          ? AnimatedBuilder(
                              animation: _waveAnimation,
                              builder: (context, child) {
                                return CustomPaint(
                                  painter: WaveformPainter(
                                    progress: _waveAnimation.value,
                                    color: AppTheme
                                        .lightTheme.colorScheme.secondary,
                                  ),
                                  size: Size(double.infinity, 4.h),
                                );
                              },
                            )
                          : CustomPaint(
                              painter: WaveformPainter(
                                progress: 0.0,
                                color: AppTheme.lightTheme.colorScheme.outline,
                              ),
                              size: Size(double.infinity, 4.h),
                            ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class WaveformPainter extends CustomPainter {
  final double progress;
  final Color color;

  WaveformPainter({required this.progress, required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = 2
      ..style = PaintingStyle.fill;

    final barCount = 20;
    final barWidth = size.width / barCount;
    final centerY = size.height / 2;

    for (int i = 0; i < barCount; i++) {
      final x = i * barWidth + barWidth / 2;
      final normalizedI = i / barCount;
      final wave = (normalizedI * 2 * 3.14159 * 3 + progress * 2 * 3.14159);
      final height = (sin(wave) * 0.5 + 0.5) * size.height * 0.8;

      final rect = RRect.fromRectAndRadius(
        Rect.fromCenter(
          center: Offset(x, centerY),
          width: barWidth * 0.6,
          height: height,
        ),
        const Radius.circular(1),
      );

      canvas.drawRRect(rect, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}