import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class AdditionalControlsWidget extends StatefulWidget {
  final bool isSleepTimerActive;
  final Duration? sleepTimerDuration;
  final VoidCallback onSleepTimerPressed;
  final VoidCallback onBackgroundSoundsPressed;
  final bool hasBackgroundSounds;

  const AdditionalControlsWidget({
    Key? key,
    required this.isSleepTimerActive,
    this.sleepTimerDuration,
    required this.onSleepTimerPressed,
    required this.onBackgroundSoundsPressed,
    required this.hasBackgroundSounds,
  }) : super(key: key);

  @override
  State<AdditionalControlsWidget> createState() =>
      _AdditionalControlsWidgetState();
}

class _AdditionalControlsWidgetState extends State<AdditionalControlsWidget> {
  String _formatSleepTimer(Duration duration) {
    final minutes = duration.inMinutes;
    if (minutes < 60) {
      return '${minutes}m';
    } else {
      final hours = duration.inHours;
      final remainingMinutes = minutes % 60;
      return remainingMinutes > 0
          ? '${hours}h ${remainingMinutes}m'
          : '${hours}h';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 2.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          // Sleep Timer
          GestureDetector(
            onTap: widget.onSleepTimerPressed,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                color: widget.isSleepTimerActive
                    ? AppTheme.lightTheme.colorScheme.secondary
                        .withValues(alpha: 0.2)
                    : AppTheme.lightTheme.colorScheme.surface
                        .withValues(alpha: 0.2),
                border: Border.all(
                  color: widget.isSleepTimerActive
                      ? AppTheme.lightTheme.colorScheme.secondary
                      : AppTheme.lightTheme.colorScheme.outline
                          .withValues(alpha: 0.3),
                  width: 1,
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  CustomIconWidget(
                    iconName: 'bedtime',
                    color: widget.isSleepTimerActive
                        ? AppTheme.lightTheme.colorScheme.secondary
                        : AppTheme.lightTheme.colorScheme.onSurface,
                    size: 6.w,
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    widget.isSleepTimerActive &&
                            widget.sleepTimerDuration != null
                        ? _formatSleepTimer(widget.sleepTimerDuration!)
                        : 'Sleep Timer',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: widget.isSleepTimerActive
                          ? AppTheme.lightTheme.colorScheme.secondary
                          : AppTheme.lightTheme.colorScheme.onSurface
                              .withValues(alpha: 0.7),
                      fontWeight: FontWeight.w500,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
          // Background Sounds
          GestureDetector(
            onTap: widget.onBackgroundSoundsPressed,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                color: widget.hasBackgroundSounds
                    ? AppTheme.lightTheme.colorScheme.secondary
                        .withValues(alpha: 0.2)
                    : AppTheme.lightTheme.colorScheme.surface
                        .withValues(alpha: 0.2),
                border: Border.all(
                  color: widget.hasBackgroundSounds
                      ? AppTheme.lightTheme.colorScheme.secondary
                      : AppTheme.lightTheme.colorScheme.outline
                          .withValues(alpha: 0.3),
                  width: 1,
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  CustomIconWidget(
                    iconName: 'waves',
                    color: widget.hasBackgroundSounds
                        ? AppTheme.lightTheme.colorScheme.secondary
                        : AppTheme.lightTheme.colorScheme.onSurface,
                    size: 6.w,
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    'Sounds',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: widget.hasBackgroundSounds
                          ? AppTheme.lightTheme.colorScheme.secondary
                          : AppTheme.lightTheme.colorScheme.onSurface
                              .withValues(alpha: 0.7),
                      fontWeight: FontWeight.w500,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
