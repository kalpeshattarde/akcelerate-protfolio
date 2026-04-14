import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class TimerControlsWidget extends StatelessWidget {
  final bool isActive;
  final bool isPaused;
  final VoidCallback onStartPause;
  final VoidCallback onReset;

  const TimerControlsWidget({
    Key? key,
    required this.isActive,
    required this.isPaused,
    required this.onStartPause,
    required this.onReset,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        // Reset button
        if (isActive || isPaused)
          Container(
            margin: EdgeInsets.only(right: 4.w),
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: onReset,
                borderRadius: BorderRadius.circular(12.w),
                child: Container(
                  width: 12.w,
                  height: 12.w,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: AppTheme.lightTheme.colorScheme.surface,
                    border: Border.all(
                      color: AppTheme.lightTheme.colorScheme.outline
                          .withValues(alpha: 0.3),
                      width: 1,
                    ),
                  ),
                  child: CustomIconWidget(
                    iconName: 'refresh',
                    size: 5.w,
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
            ),
          ),
        // Main start/pause button
        Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onStartPause,
            borderRadius: BorderRadius.circular(16.w),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              width: 16.w,
              height: 16.w,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isActive && !isPaused
                    ? AppTheme.lightTheme.colorScheme.secondary
                    : AppTheme.lightTheme.colorScheme.primary,
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.lightTheme.colorScheme.shadow
                        .withValues(alpha: 0.2),
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: CustomIconWidget(
                iconName: isActive && !isPaused ? 'pause' : 'play_arrow',
                size: 8.w,
                color: AppTheme.lightTheme.colorScheme.onPrimary,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
