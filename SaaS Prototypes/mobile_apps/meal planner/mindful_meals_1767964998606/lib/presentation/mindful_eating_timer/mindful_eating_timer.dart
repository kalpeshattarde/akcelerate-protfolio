import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/ambient_sound_widget.dart';
import './widgets/completion_celebration_widget.dart';
import './widgets/mindfulness_prompt_widget.dart';
import './widgets/timer_controls_widget.dart';
import './widgets/timer_display_widget.dart';
import './widgets/timer_preset_widget.dart';

class MindfulEatingTimer extends StatefulWidget {
  const MindfulEatingTimer({Key? key}) : super(key: key);

  @override
  State<MindfulEatingTimer> createState() => _MindfulEatingTimerState();
}

class _MindfulEatingTimerState extends State<MindfulEatingTimer>
    with TickerProviderStateMixin {
  Timer? _timer;
  int _remainingSeconds = 600; // Default 10 minutes
  int _totalSeconds = 600;
  bool _isActive = false;
  bool _isPaused = false;
  bool _showCompletion = false;
  String _selectedSound = 'silence';

  late AnimationController _backgroundController;
  late Animation<Color?> _backgroundAnimation;

  // Mock data for progress tracking
  final List<Map<String, dynamic>> _completedSessions = [
    {"date": "2024-11-07", "duration": 15, "rating": "😊", "sound": "rain"},
    {"date": "2024-11-06", "duration": 10, "rating": "🙂", "sound": "forest"},
    {"date": "2024-11-05", "duration": 20, "rating": "😊", "sound": "silence"},
  ];

  @override
  void initState() {
    super.initState();
    _backgroundController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );

    _backgroundAnimation = ColorTween(
      begin: AppTheme.lightTheme.scaffoldBackgroundColor,
      end: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.05),
    ).animate(CurvedAnimation(
      parent: _backgroundController,
      curve: Curves.easeInOut,
    ));

    // Prevent screen from sleeping during active session
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
  }

  @override
  void dispose() {
    _timer?.cancel();
    _backgroundController.dispose();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
    super.dispose();
  }

  void _startTimer() {
    if (_remainingSeconds <= 0) return;

    setState(() {
      _isActive = true;
      _isPaused = false;
    });

    _backgroundController.forward();

    // Provide gentle haptic feedback
    HapticFeedback.lightImpact();

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        if (_remainingSeconds > 0) {
          _remainingSeconds--;

          // Gentle vibration prompts every 3 minutes
          if (_remainingSeconds % 180 == 0 && _remainingSeconds > 0) {
            HapticFeedback.selectionClick();
          }
        } else {
          _completeTimer();
        }
      });
    });
  }

  void _pauseTimer() {
    _timer?.cancel();
    setState(() {
      _isPaused = true;
    });
    HapticFeedback.lightImpact();
  }

  void _resetTimer() {
    _timer?.cancel();
    setState(() {
      _isActive = false;
      _isPaused = false;
      _remainingSeconds = _totalSeconds;
      _showCompletion = false;
    });
    _backgroundController.reverse();
    HapticFeedback.mediumImpact();
  }

  void _completeTimer() {
    _timer?.cancel();
    setState(() {
      _isActive = false;
      _showCompletion = true;
    });
    _backgroundController.reverse();

    // Completion haptic pattern
    HapticFeedback.heavyImpact();
    Future.delayed(const Duration(milliseconds: 200), () {
      HapticFeedback.lightImpact();
    });
  }

  void _setDuration(int seconds) {
    if (!_isActive) {
      setState(() {
        _totalSeconds = seconds;
        _remainingSeconds = seconds;
      });
    }
  }

  void _showCustomTimePicker() {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.lightTheme.colorScheme.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(4.w)),
      ),
      builder: (context) => Container(
        height: 40.h,
        padding: EdgeInsets.all(6.w),
        child: Column(
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(1.w),
              ),
            ),
            SizedBox(height: 3.h),
            Text(
              'Select Custom Duration',
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                fontSize: 14.sp,
                color: AppTheme.lightTheme.colorScheme.onSurface,
              ),
            ),
            SizedBox(height: 3.h),
            Expanded(
              child: Row(
                children: [
                  // Minutes picker
                  Expanded(
                    child: Column(
                      children: [
                        Text(
                          'Minutes',
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            fontSize: 11.sp,
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                        SizedBox(height: 1.h),
                        Expanded(
                          child: ListWheelScrollView.useDelegate(
                            itemExtent: 8.h,
                            physics: const FixedExtentScrollPhysics(),
                            childDelegate: ListWheelChildBuilderDelegate(
                              builder: (context, index) {
                                if (index < 0 || index > 60) return null;
                                return Container(
                                  alignment: Alignment.center,
                                  child: Text(
                                    index.toString().padLeft(2, '0'),
                                    style: AppTheme
                                        .lightTheme.textTheme.headlineSmall
                                        ?.copyWith(
                                      fontSize: 16.sp,
                                      color: AppTheme
                                          .lightTheme.colorScheme.onSurface,
                                    ),
                                  ),
                                );
                              },
                            ),
                            onSelectedItemChanged: (index) {
                              _setDuration(index * 60);
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 2.h),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.pop(context),
                    child: Text('Cancel'),
                  ),
                ),
                SizedBox(width: 3.w),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => Navigator.pop(context),
                    child: Text('Set Timer'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showSettings() {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.lightTheme.colorScheme.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(4.w)),
      ),
      builder: (context) => Container(
        padding: EdgeInsets.all(6.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              margin: EdgeInsets.only(bottom: 3.h),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(1.w),
              ),
            ),
            Text(
              'Timer Settings',
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                fontSize: 14.sp,
                color: AppTheme.lightTheme.colorScheme.onSurface,
              ),
            ),
            SizedBox(height: 3.h),
            AmbientSoundWidget(
              selectedSound: _selectedSound,
              onSoundSelected: (sound) {
                setState(() => _selectedSound = sound);
              },
            ),
            SizedBox(height: 3.h),
            Container(
              width: double.infinity,
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.surface,
                borderRadius: BorderRadius.circular(3.w),
                border: Border.all(
                  color: AppTheme.lightTheme.colorScheme.outline
                      .withValues(alpha: 0.2),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Progress Stats',
                    style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                      fontSize: 11.sp,
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
                  ),
                  SizedBox(height: 2.h),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Column(
                        children: [
                          Text(
                            '${_completedSessions.length}',
                            style: AppTheme.lightTheme.textTheme.headlineSmall
                                ?.copyWith(
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w600,
                              color: AppTheme.lightTheme.colorScheme.primary,
                            ),
                          ),
                          Text(
                            'Sessions',
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                              fontSize: 9.sp,
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                      Column(
                        children: [
                          Text(
                            '3',
                            style: AppTheme.lightTheme.textTheme.headlineSmall
                                ?.copyWith(
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w600,
                              color: AppTheme.lightTheme.colorScheme.secondary,
                            ),
                          ),
                          Text(
                            'Day Streak',
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                              fontSize: 9.sp,
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                      Column(
                        children: [
                          Text(
                            '45',
                            style: AppTheme.lightTheme.textTheme.headlineSmall
                                ?.copyWith(
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w600,
                              color: AppTheme.lightTheme.colorScheme.tertiary,
                            ),
                          ),
                          Text(
                            'Total Min',
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                              fontSize: 9.sp,
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(height: 4.h),
          ],
        ),
      ),
    );
  }

  void _logMeal() {
    // Add to completed sessions
    setState(() {
      _completedSessions.insert(0, {
        "date": DateTime.now().toString().split(' ')[0],
        "duration": (_totalSeconds / 60).round(),
        "rating": "😊",
        "sound": _selectedSound,
      });
      _showCompletion = false;
    });

    // Show success message
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Mindful meal logged successfully!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
      ),
    );

    _resetTimer();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: AnimatedBuilder(
        animation: _backgroundAnimation,
        builder: (context, child) {
          return Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  _backgroundAnimation.value ??
                      AppTheme.lightTheme.scaffoldBackgroundColor,
                  AppTheme.lightTheme.scaffoldBackgroundColor,
                ],
              ),
            ),
            child: SafeArea(
              child: Column(
                children: [
                  // Header
                  Padding(
                    padding:
                        EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                    child: Row(
                      children: [
                        Material(
                          color: Colors.transparent,
                          child: InkWell(
                            onTap: () => Navigator.pop(context),
                            borderRadius: BorderRadius.circular(6.w),
                            child: Container(
                              width: 12.w,
                              height: 12.w,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: AppTheme.lightTheme.colorScheme.surface,
                                boxShadow: [
                                  BoxShadow(
                                    color: AppTheme
                                        .lightTheme.colorScheme.shadow
                                        .withValues(alpha: 0.1),
                                    blurRadius: 4,
                                    offset: const Offset(0, 2),
                                  ),
                                ],
                              ),
                              child: CustomIconWidget(
                                iconName: 'close',
                                size: 5.w,
                                color:
                                    AppTheme.lightTheme.colorScheme.onSurface,
                              ),
                            ),
                          ),
                        ),
                        Expanded(
                          child: Text(
                            'Mindful Eating Timer',
                            textAlign: TextAlign.center,
                            style: AppTheme.lightTheme.textTheme.titleLarge
                                ?.copyWith(
                              fontSize: 14.sp,
                              color: AppTheme.lightTheme.colorScheme.onSurface,
                            ),
                          ),
                        ),
                        Material(
                          color: Colors.transparent,
                          child: InkWell(
                            onTap: _showSettings,
                            borderRadius: BorderRadius.circular(6.w),
                            child: Container(
                              width: 12.w,
                              height: 12.w,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: AppTheme.lightTheme.colorScheme.surface,
                                boxShadow: [
                                  BoxShadow(
                                    color: AppTheme
                                        .lightTheme.colorScheme.shadow
                                        .withValues(alpha: 0.1),
                                    blurRadius: 4,
                                    offset: const Offset(0, 2),
                                  ),
                                ],
                              ),
                              child: CustomIconWidget(
                                iconName: 'settings',
                                size: 5.w,
                                color:
                                    AppTheme.lightTheme.colorScheme.onSurface,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Main content
                  Expanded(
                    child: _showCompletion
                        ? Center(
                            child: Padding(
                              padding: EdgeInsets.symmetric(horizontal: 6.w),
                              child: CompletionCelebrationWidget(
                                onLogMeal: _logMeal,
                                onClose: () =>
                                    setState(() => _showCompletion = false),
                              ),
                            ),
                          )
                        : SingleChildScrollView(
                            padding: EdgeInsets.symmetric(horizontal: 4.w),
                            child: Column(
                              children: [
                                SizedBox(height: 4.h),

                                // Timer display
                                TimerDisplayWidget(
                                  remainingSeconds: _remainingSeconds,
                                  totalSeconds: _totalSeconds,
                                  isActive: _isActive && !_isPaused,
                                ),

                                SizedBox(height: 4.h),

                                // Timer controls
                                TimerControlsWidget(
                                  isActive: _isActive,
                                  isPaused: _isPaused,
                                  onStartPause: _isActive && !_isPaused
                                      ? _pauseTimer
                                      : _startTimer,
                                  onReset: _resetTimer,
                                ),

                                SizedBox(height: 4.h),

                                // Mindfulness prompt
                                MindfulnessPromptWidget(
                                  isActive: _isActive && !_isPaused,
                                ),

                                SizedBox(height: 4.h),

                                // Timer presets (only show when not active)
                                if (!_isActive && !_isPaused) ...[
                                  TimerPresetWidget(
                                    selectedDuration: _totalSeconds,
                                    onDurationSelected: _setDuration,
                                    onCustomTimePressed: _showCustomTimePicker,
                                  ),
                                  SizedBox(height: 4.h),
                                ],
                              ],
                            ),
                          ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
