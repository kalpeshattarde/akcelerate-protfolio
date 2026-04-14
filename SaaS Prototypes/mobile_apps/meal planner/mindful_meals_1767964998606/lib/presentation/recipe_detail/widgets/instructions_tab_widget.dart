import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class InstructionsTabWidget extends StatefulWidget {
  final List<Map<String, dynamic>> instructions;

  const InstructionsTabWidget({
    Key? key,
    required this.instructions,
  }) : super(key: key);

  @override
  State<InstructionsTabWidget> createState() => _InstructionsTabWidgetState();
}

class _InstructionsTabWidgetState extends State<InstructionsTabWidget> {
  int? _activeTimerStep;
  int _timerSeconds = 0;
  bool _isTimerRunning = false;

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      padding: EdgeInsets.all(4.w),
      itemCount: widget.instructions.length,
      separatorBuilder: (context, index) => SizedBox(height: 3.h),
      itemBuilder: (context, index) {
        final instruction = widget.instructions[index];
        final stepNumber = index + 1;
        final hasTimer = instruction['timer'] != null;
        final isActiveTimer = _activeTimerStep == index;

        return Container(
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: AppTheme.lightTheme.colorScheme.outline
                  .withValues(alpha: 0.2),
              width: 1,
            ),
            boxShadow: [
              BoxShadow(
                color: AppTheme.lightTheme.colorScheme.shadow
                    .withValues(alpha: 0.1),
                blurRadius: 8,
                offset: Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 8.w,
                    height: 8.w,
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.primary,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Center(
                      child: Text(
                        stepNumber.toString(),
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.onPrimary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          instruction['step'] as String,
                          style:
                              AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onSurface,
                            height: 1.6,
                            fontSize: 16.sp,
                          ),
                        ),
                        if (hasTimer) ...[
                          SizedBox(height: 2.h),
                          _buildTimerSection(instruction, index),
                        ],
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildTimerSection(Map<String, dynamic> instruction, int stepIndex) {
    final timerMinutes = instruction['timer'] as int;
    final isActiveTimer = _activeTimerStep == stepIndex;

    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.primaryContainer
            .withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          CustomIconWidget(
            iconName: 'timer',
            color: AppTheme.lightTheme.colorScheme.primary,
            size: 20,
          ),
          SizedBox(width: 2.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  isActiveTimer
                      ? _formatTime(_timerSeconds)
                      : '$timerMinutes minutes',
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                if (isActiveTimer && _isTimerRunning)
                  Text(
                    'Timer running...',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () => _toggleTimer(stepIndex, timerMinutes),
            style: ElevatedButton.styleFrom(
              backgroundColor: isActiveTimer && _isTimerRunning
                  ? AppTheme.lightTheme.colorScheme.error
                  : AppTheme.lightTheme.colorScheme.primary,
              foregroundColor: AppTheme.lightTheme.colorScheme.onPrimary,
              padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
              minimumSize: Size(0, 0),
            ),
            child: Text(
              isActiveTimer && _isTimerRunning ? 'Stop' : 'Start',
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onPrimary,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _toggleTimer(int stepIndex, int minutes) {
    setState(() {
      if (_activeTimerStep == stepIndex && _isTimerRunning) {
        // Stop current timer
        _isTimerRunning = false;
        _activeTimerStep = null;
        _timerSeconds = 0;
      } else {
        // Start new timer
        _activeTimerStep = stepIndex;
        _timerSeconds = minutes * 60;
        _isTimerRunning = true;
        _startCountdown();
      }
    });
  }

  void _startCountdown() {
    if (!_isTimerRunning) return;

    Future.delayed(Duration(seconds: 1), () {
      if (_isTimerRunning && _timerSeconds > 0) {
        setState(() {
          _timerSeconds--;
        });
        _startCountdown();
      } else if (_timerSeconds == 0) {
        setState(() {
          _isTimerRunning = false;
          _activeTimerStep = null;
        });
        _showTimerComplete();
      }
    });
  }

  void _showTimerComplete() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Timer completed! Check your cooking step.'),
        duration: Duration(seconds: 3),
        behavior: SnackBarBehavior.floating,
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
      ),
    );
  }

  String _formatTime(int seconds) {
    final minutes = seconds ~/ 60;
    final remainingSeconds = seconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${remainingSeconds.toString().padLeft(2, '0')}';
  }
}
