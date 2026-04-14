import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class PlaybackControlsWidget extends StatefulWidget {
  final bool isPlaying;
  final bool isLoading;
  final double playbackSpeed;
  final VoidCallback onPlayPause;
  final VoidCallback onSkipPrevious;
  final VoidCallback onSkipNext;
  final VoidCallback onRewind;
  final VoidCallback onFastForward;
  final Function(double) onSpeedChange;

  const PlaybackControlsWidget({
    Key? key,
    required this.isPlaying,
    required this.isLoading,
    required this.playbackSpeed,
    required this.onPlayPause,
    required this.onSkipPrevious,
    required this.onSkipNext,
    required this.onRewind,
    required this.onFastForward,
    required this.onSpeedChange,
  }) : super(key: key);

  @override
  State<PlaybackControlsWidget> createState() => _PlaybackControlsWidgetState();
}

class _PlaybackControlsWidgetState extends State<PlaybackControlsWidget>
    with TickerProviderStateMixin {
  late AnimationController _playButtonController;
  late AnimationController _pulseController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _pulseAnimation;
  bool _showSpeedSelector = false;

  @override
  void initState() {
    super.initState();
    _playButtonController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    )..repeat(reverse: true);

    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _playButtonController,
      curve: Curves.elasticOut,
    ));

    _pulseAnimation = Tween<double>(
      begin: 1.0,
      end: 1.1,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _playButtonController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(PlaybackControlsWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isPlaying != oldWidget.isPlaying) {
      if (widget.isPlaying) {
        _playButtonController.forward();
      } else {
        _playButtonController.reverse();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 3.h),
      child: Column(
        children: [
          // Speed selector
          AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            height: _showSpeedSelector ? 8.h : 0,
            child: _showSpeedSelector
                ? _buildSpeedSelector()
                : const SizedBox.shrink(),
          ),

          // Main controls
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              // Skip Previous
              _buildControlButton(
                icon: 'skip_previous',
                onTap: widget.onSkipPrevious,
                size: 8.w,
              ),

              // Rewind 15s
              _buildControlButton(
                icon: 'replay_15',
                onTap: widget.onRewind,
                size: 10.w,
              ),

              // Play/Pause
              _buildPlayButton(),

              // Fast Forward 30s
              _buildControlButton(
                icon: 'forward_30',
                onTap: widget.onFastForward,
                size: 10.w,
              ),

              // Skip Next
              _buildControlButton(
                icon: 'skip_next',
                onTap: widget.onSkipNext,
                size: 8.w,
              ),
            ],
          ),

          SizedBox(height: 2.h),

          // Secondary controls
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              // Speed control
              GestureDetector(
                onTap: () {
                  setState(() {
                    _showSpeedSelector = !_showSpeedSelector;
                  });
                },
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.surface
                        .withValues(alpha: 0.8),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.3),
                    ),
                  ),
                  child: Text(
                    '${widget.playbackSpeed}x',
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.secondary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),

              // Sleep Timer
              _buildSecondaryButton(
                icon: 'bedtime',
                label: 'Sleep',
                onTap: () => _showSleepTimerDialog(),
              ),

              // EQ
              _buildSecondaryButton(
                icon: 'equalizer',
                label: 'EQ',
                onTap: () => _showEQDialog(),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPlayButton() {
    return GestureDetector(
      onTapDown: (_) => _playButtonController.forward(),
      onTapUp: (_) => _playButtonController.reverse(),
      onTapCancel: () => _playButtonController.reverse(),
      onTap: widget.onPlayPause,
      child: AnimatedBuilder(
        animation: Listenable.merge([_scaleAnimation, _pulseAnimation]),
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value *
                (widget.isPlaying ? _pulseAnimation.value : 1.0),
            child: Container(
              width: 18.w,
              height: 18.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.secondary,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.lightTheme.colorScheme.secondary
                        .withValues(alpha: 0.3),
                    blurRadius: 20,
                    spreadRadius: 2,
                  ),
                ],
              ),
              child: widget.isLoading
                  ? CircularProgressIndicator(
                      color: AppTheme.lightTheme.colorScheme.onSecondary,
                      strokeWidth: 2,
                    )
                  : CustomIconWidget(
                      iconName: widget.isPlaying ? 'pause' : 'play_arrow',
                      color: AppTheme.lightTheme.colorScheme.onSecondary,
                      size: 8.w,
                    ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildControlButton({
    required String icon,
    required VoidCallback onTap,
    required double size,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: size + 4.w,
        height: size + 4.w,
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface.withValues(alpha: 0.8),
          shape: BoxShape.circle,
        ),
        child: CustomIconWidget(
          iconName: icon,
          color: AppTheme.lightTheme.colorScheme.onSurface,
          size: size,
        ),
      ),
    );
  }

  Widget _buildSecondaryButton({
    required String icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(2.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface
                  .withValues(alpha: 0.6),
              shape: BoxShape.circle,
            ),
            child: CustomIconWidget(
              iconName: icon,
              color: AppTheme.lightTheme.colorScheme.onSurface
                  .withValues(alpha: 0.7),
              size: 5.w,
            ),
          ),
          SizedBox(height: 0.5.h),
          Text(
            label,
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface
                  .withValues(alpha: 0.7),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSpeedSelector() {
    final speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: speeds.map((speed) {
          final isSelected = widget.playbackSpeed == speed;
          return GestureDetector(
            onTap: () {
              widget.onSpeedChange(speed);
              setState(() {
                _showSpeedSelector = false;
              });
            },
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
              decoration: BoxDecoration(
                color: isSelected
                    ? AppTheme.lightTheme.colorScheme.secondary
                    : AppTheme.lightTheme.colorScheme.surface
                        .withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(15),
              ),
              child: Text(
                '${speed}x',
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: isSelected
                      ? AppTheme.lightTheme.colorScheme.onSecondary
                      : AppTheme.lightTheme.colorScheme.onSurface,
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  void _showSleepTimerDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Sleep Timer'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: Text('15 minutes'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              title: Text('30 minutes'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              title: Text('1 hour'),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    );
  }

  void _showEQDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Equalizer'),
        content: Text('EQ settings would be implemented here'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
        ],
      ),
    );
  }
}
