import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SleepTimerModalWidget extends StatefulWidget {
  final Duration? currentTimer;
  final ValueChanged<Duration?> onTimerSet;

  const SleepTimerModalWidget({
    Key? key,
    this.currentTimer,
    required this.onTimerSet,
  }) : super(key: key);

  @override
  State<SleepTimerModalWidget> createState() => _SleepTimerModalWidgetState();
}

class _SleepTimerModalWidgetState extends State<SleepTimerModalWidget> {
  Duration? _selectedTimer;

  final List<Duration> _timerOptions = [
    const Duration(minutes: 5),
    const Duration(minutes: 10),
    const Duration(minutes: 15),
    const Duration(minutes: 30),
    const Duration(minutes: 45),
    const Duration(hours: 1),
    const Duration(hours: 2),
  ];

  @override
  void initState() {
    super.initState();
    _selectedTimer = widget.currentTimer;
  }

  String _formatDuration(Duration duration) {
    final minutes = duration.inMinutes;
    if (minutes < 60) {
      return '$minutes minutes';
    } else {
      final hours = duration.inHours;
      final remainingMinutes = minutes % 60;
      return remainingMinutes > 0
          ? '$hours hour $remainingMinutes minutes'
          : '$hours hour';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Handle bar
          Container(
            margin: EdgeInsets.only(top: 2.h),
            width: 12.w,
            height: 0.5.h,
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.outline
                  .withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          SizedBox(height: 3.h),
          // Title
          Text(
            'Sleep Timer',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Audio will stop after the selected time',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface
                  .withValues(alpha: 0.7),
            ),
          ),
          SizedBox(height: 4.h),
          // Timer options
          Flexible(
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: _timerOptions.length + 1, // +1 for "Off" option
              itemBuilder: (context, index) {
                if (index == 0) {
                  // Off option
                  return _buildTimerOption(
                    title: 'Off',
                    subtitle: 'Disable sleep timer',
                    duration: null,
                    isSelected: _selectedTimer == null,
                  );
                }

                final duration = _timerOptions[index - 1];
                return _buildTimerOption(
                  title: _formatDuration(duration),
                  subtitle: null,
                  duration: duration,
                  isSelected: _selectedTimer == duration,
                );
              },
            ),
          ),
          SizedBox(height: 2.h),
          // Action buttons
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.pop(context),
                    child: Text('Cancel'),
                  ),
                ),
                SizedBox(width: 4.w),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      widget.onTimerSet(_selectedTimer);
                      Navigator.pop(context);
                    },
                    child: Text('Set Timer'),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 2.h),
        ],
      ),
    );
  }

  Widget _buildTimerOption({
    required String title,
    String? subtitle,
    required Duration? duration,
    required bool isSelected,
  }) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedTimer = duration;
        });
      },
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 6.w, vertical: 1.h),
        padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: isSelected
              ? AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.1)
              : Colors.transparent,
          border: Border.all(
            color: isSelected
                ? AppTheme.lightTheme.colorScheme.secondary
                : AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.2),
            width: 1,
          ),
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  if (subtitle != null) ...[
                    SizedBox(height: 0.5.h),
                    Text(
                      subtitle,
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurface
                            .withValues(alpha: 0.7),
                      ),
                    ),
                  ],
                ],
              ),
            ),
            if (isSelected)
              CustomIconWidget(
                iconName: 'check_circle',
                color: AppTheme.lightTheme.colorScheme.secondary,
                size: 6.w,
              ),
          ],
        ),
      ),
    );
  }
}
