import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SleepTimerWidget extends StatefulWidget {
  final bool isTimerActive;
  final Duration currentDuration;
  final VoidCallback onStartStop;

  const SleepTimerWidget({
    Key? key,
    required this.isTimerActive,
    required this.currentDuration,
    required this.onStartStop,
  }) : super(key: key);

  @override
  State<SleepTimerWidget> createState() => _SleepTimerWidgetState();
}

class _SleepTimerWidgetState extends State<SleepTimerWidget>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    _pulseAnimation = Tween<double>(
      begin: 1.0,
      end: 1.1,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));

    if (widget.isTimerActive) {
      _pulseController.repeat(reverse: true);
    }
  }

  @override
  void didUpdateWidget(SleepTimerWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isTimerActive && !oldWidget.isTimerActive) {
      _pulseController.repeat(reverse: true);
    } else if (!widget.isTimerActive && oldWidget.isTimerActive) {
      _pulseController.stop();
      _pulseController.reset();
    }
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  String _formatDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    String hours = twoDigits(duration.inHours);
    String minutes = twoDigits(duration.inMinutes.remainder(60));
    String seconds = twoDigits(duration.inSeconds.remainder(60));
    return '$hours:$minutes:$seconds';
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1),
            AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.05),
          ],
        ),
        borderRadius: BorderRadius.circular(4.w),
      ),
      child: Column(
        children: [
          Text(
            widget.isTimerActive ? 'Sleep Session Active' : 'Start Sleep Timer',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.primary,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 3.h),
          AnimatedBuilder(
            animation: _pulseAnimation,
            builder: (context, child) {
              return Transform.scale(
                scale: widget.isTimerActive ? _pulseAnimation.value : 1.0,
                child: GestureDetector(
                  onTap: widget.onStartStop,
                  child: Container(
                    width: 30.w,
                    height: 30.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: widget.isTimerActive
                          ? AppTheme.lightTheme.colorScheme.error
                          : AppTheme.lightTheme.colorScheme.primary,
                      boxShadow: [
                        BoxShadow(
                          color: widget.isTimerActive
                              ? AppTheme.lightTheme.colorScheme.error
                                  .withValues(alpha: 0.3)
                              : AppTheme.lightTheme.colorScheme.primary
                                  .withValues(alpha: 0.3),
                          blurRadius: 20,
                          spreadRadius: 5,
                        ),
                      ],
                    ),
                    child: Center(
                      child: CustomIconWidget(
                        iconName: widget.isTimerActive ? 'stop' : 'play_arrow',
                        color: Colors.white,
                        size: 8.w,
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
          SizedBox(height: 3.h),
          Text(
            _formatDuration(widget.currentDuration),
            style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface,
              fontWeight: FontWeight.w700,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            widget.isTimerActive
                ? 'Tap to stop and save session'
                : 'Tap to start tracking sleep',
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
