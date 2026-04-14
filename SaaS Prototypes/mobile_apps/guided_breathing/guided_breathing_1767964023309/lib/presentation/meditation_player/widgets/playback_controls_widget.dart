import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class PlaybackControlsWidget extends StatelessWidget {
  final bool isPlaying;
  final VoidCallback onPlayPause;
  final VoidCallback onSkipBackward;
  final VoidCallback onSkipForward;
  final double volume;
  final ValueChanged<double> onVolumeChanged;
  final bool hapticEnabled;
  final VoidCallback onHapticToggle;

  const PlaybackControlsWidget({
    Key? key,
    required this.isPlaying,
    required this.onPlayPause,
    required this.onSkipBackward,
    required this.onSkipForward,
    required this.volume,
    required this.onVolumeChanged,
    required this.hapticEnabled,
    required this.onHapticToggle,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 3.h),
      child: Column(
        children: [
          // Volume slider
          Container(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface
                  .withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'volume_down',
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  size: 20,
                ),
                Expanded(
                  child: Slider(
                    value: volume,
                    onChanged: onVolumeChanged,
                    activeColor: AppTheme.lightTheme.colorScheme.secondary,
                    inactiveColor: AppTheme
                        .lightTheme.colorScheme.onSurfaceVariant
                        .withValues(alpha: 0.3),
                  ),
                ),
                CustomIconWidget(
                  iconName: 'volume_up',
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  size: 20,
                ),
              ],
            ),
          ),
          SizedBox(height: 4.h),
          // Main playback controls
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              // Skip backward 15s
              GestureDetector(
                onTap: () {
                  if (hapticEnabled) {
                    HapticFeedback.lightImpact();
                  }
                  onSkipBackward();
                },
                child: Container(
                  padding: EdgeInsets.all(3.w),
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.surface
                        .withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    children: [
                      CustomIconWidget(
                        iconName: 'replay_15',
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                        size: 28,
                      ),
                    ],
                  ),
                ),
              ),
              // Play/Pause button
              GestureDetector(
                onTap: () {
                  if (hapticEnabled) {
                    HapticFeedback.mediumImpact();
                  }
                  onPlayPause();
                },
                child: Container(
                  width: 20.w,
                  height: 20.w,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        AppTheme.lightTheme.colorScheme.secondary,
                        AppTheme.lightTheme.colorScheme.tertiary,
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(50),
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.lightTheme.colorScheme.secondary
                            .withValues(alpha: 0.4),
                        blurRadius: 15,
                        spreadRadius: 2,
                      ),
                    ],
                  ),
                  child: Center(
                    child: CustomIconWidget(
                      iconName: isPlaying ? 'pause' : 'play_arrow',
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                      size: 36,
                    ),
                  ),
                ),
              ),
              // Skip forward 15s
              GestureDetector(
                onTap: () {
                  if (hapticEnabled) {
                    HapticFeedback.lightImpact();
                  }
                  onSkipForward();
                },
                child: Container(
                  padding: EdgeInsets.all(3.w),
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.surface
                        .withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    children: [
                      CustomIconWidget(
                        iconName: 'forward_15',
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                        size: 28,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 3.h),
          // Additional controls
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              // Bookmark
              GestureDetector(
                onTap: () {
                  if (hapticEnabled) {
                    HapticFeedback.lightImpact();
                  }
                  // Add bookmark functionality
                },
                child: Container(
                  padding: EdgeInsets.all(2.w),
                  child: Column(
                    children: [
                      CustomIconWidget(
                        iconName: 'bookmark_border',
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                        size: 24,
                      ),
                      SizedBox(height: 0.5.h),
                      Text(
                        'Bookmark',
                        style:
                            AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                          color:
                              AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              // Haptic feedback toggle
              GestureDetector(
                onTap: onHapticToggle,
                child: Container(
                  padding: EdgeInsets.all(2.w),
                  child: Column(
                    children: [
                      CustomIconWidget(
                        iconName: hapticEnabled ? 'vibration' : 'phone_android',
                        color: hapticEnabled
                            ? AppTheme.lightTheme.colorScheme.secondary
                            : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                        size: 24,
                      ),
                      SizedBox(height: 0.5.h),
                      Text(
                        'Haptic',
                        style:
                            AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                          color: hapticEnabled
                              ? AppTheme.lightTheme.colorScheme.secondary
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              // Share
              GestureDetector(
                onTap: () {
                  if (hapticEnabled) {
                    HapticFeedback.lightImpact();
                  }
                  // Add share functionality
                },
                child: Container(
                  padding: EdgeInsets.all(2.w),
                  child: Column(
                    children: [
                      CustomIconWidget(
                        iconName: 'share',
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                        size: 24,
                      ),
                      SizedBox(height: 0.5.h),
                      Text(
                        'Share',
                        style:
                            AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                          color:
                              AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
