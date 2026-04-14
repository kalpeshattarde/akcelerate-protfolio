import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/breathing_circle_widget.dart';
import './widgets/breathing_controls_widget.dart';
import './widgets/breathing_pattern_selector_widget.dart';
import './widgets/session_settings_widget.dart';

class BreathingExercise extends StatefulWidget {
  const BreathingExercise({Key? key}) : super(key: key);

  @override
  State<BreathingExercise> createState() => _BreathingExerciseState();
}

class _BreathingExerciseState extends State<BreathingExercise>
    with TickerProviderStateMixin {
  // Session state
  bool _isBreathing = false;
  bool _isPaused = false;
  String _currentPhase = 'Center yourself, breathe deeply';
  int _currentCycle = 0;
  int _totalCycles = 0;
  double _sessionProgress = 0.0;

  // Settings
  String _selectedPattern = '4-7-8';
  int _sessionDuration = 5; // minutes
  String _backgroundSound = 'none';

  // Timers and animations
  late AnimationController _breathingController;
  late AnimationController _progressController;
  late AnimationController _backgroundController;
  late Animation<double> _backgroundAnimation;

  // Pattern configurations with enhanced descriptions
  final Map<String, Map<String, dynamic>> _patterns = {
    '4-7-8': {
      'inhale': 4,
      'hold1': 7,
      'exhale': 8,
      'hold2': 0,
      'name': '4-7-8 Deep Rest',
      'description': 'Ancient breath for profound relaxation',
    },
    'box': {
      'inhale': 4,
      'hold1': 4,
      'exhale': 4,
      'hold2': 4,
      'name': 'Box Breathing',
      'description': 'Balanced breath for inner harmony',
    },
    'equal': {
      'inhale': 4,
      'hold1': 0,
      'exhale': 4,
      'hold2': 0,
      'name': 'Equal Breath',
      'description': 'Simple rhythm for mindful presence',
    },
    'triangle': {
      'inhale': 4,
      'hold1': 4,
      'exhale': 4,
      'hold2': 0,
      'name': 'Triangle Breath',
      'description': 'Three-part breath for balance',
    },
  };

  // Mindful phase messages
  final Map<String, String> _phaseMessages = {
    'Ready to begin': 'Center yourself, breathe deeply',
    'Get Ready...': 'Find your sacred space within',
    'Breathe In': 'Draw in peace and light',
    'Hold': 'Hold this moment of stillness',
    'Breathe Out': 'Release all that no longer serves',
    'Paused': 'Rest in this peaceful moment',
    'Resuming...': 'Return to your sacred breath',
    'Session Complete!': 'You are grounded and at peace',
  };

  @override
  void initState() {
    super.initState();
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);

    _breathingController = AnimationController(
      duration: Duration(seconds: _getTotalCycleDuration()),
      vsync: this,
    );

    _progressController = AnimationController(
      duration: Duration(minutes: _sessionDuration),
      vsync: this,
    );

    _backgroundController = AnimationController(
      duration: const Duration(seconds: 8),
      vsync: this,
    );

    _backgroundAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _backgroundController,
      curve: Curves.easeInOut,
    ));

    _calculateTotalCycles();
    _setupBreathingAnimation();
    _backgroundController.repeat(reverse: true);
  }

  @override
  void dispose() {
    SystemChrome.setPreferredOrientations(DeviceOrientation.values);
    _breathingController.dispose();
    _progressController.dispose();
    _backgroundController.dispose();
    super.dispose();
  }

  int _getTotalCycleDuration() {
    final pattern = _patterns[_selectedPattern]!;
    return (pattern['inhale'] as int) +
        (pattern['hold1'] as int) +
        (pattern['exhale'] as int) +
        (pattern['hold2'] as int);
  }

  void _calculateTotalCycles() {
    final cycleDuration = _getTotalCycleDuration();
    _totalCycles = (_sessionDuration * 60) ~/ cycleDuration;
  }

  void _setupBreathingAnimation() {
    _breathingController.addListener(() {
      if (!mounted) return;

      final pattern = _patterns[_selectedPattern]!;
      final progress = _breathingController.value;
      final totalDuration = _getTotalCycleDuration();

      double inhaleEnd = (pattern['inhale'] as int) / totalDuration;
      double hold1End = inhaleEnd + (pattern['hold1'] as int) / totalDuration;
      double exhaleEnd = hold1End + (pattern['exhale'] as int) / totalDuration;

      String newPhase;
      if (progress <= inhaleEnd) {
        newPhase = 'Breathe In';
        _triggerHapticFeedback();
      } else if (progress <= hold1End) {
        newPhase = 'Hold';
      } else if (progress <= exhaleEnd) {
        newPhase = 'Breathe Out';
        _triggerHapticFeedback();
      } else {
        newPhase = pattern['hold2'] > 0 ? 'Hold' : 'Ready';
      }

      if (newPhase != _currentPhase) {
        setState(() {
          _currentPhase = newPhase;
        });
      }
    });

    _breathingController.addStatusListener((status) {
      if (status == AnimationStatus.completed && _isBreathing) {
        setState(() {
          _currentCycle++;
          _sessionProgress = _currentCycle / _totalCycles;
        });

        if (_currentCycle >= _totalCycles) {
          _completeSession();
        } else {
          _breathingController.reset();
          _breathingController.forward();
        }
      }
    });
  }

  void _triggerHapticFeedback() async {
    HapticFeedback.lightImpact();
  }

  void _startBreathing() {
    setState(() {
      _isBreathing = true;
      _isPaused = false;
      if (_currentCycle == 0) {
        _currentPhase = 'Get Ready...';
      }
    });

    _progressController.forward();

    Future.delayed(const Duration(seconds: 3), () {
      if (_isBreathing && mounted) {
        _breathingController.forward();
      }
    });
  }

  void _pauseBreathing() {
    setState(() {
      _isPaused = true;
      _isBreathing = false;
      _currentPhase = 'Paused';
    });

    _breathingController.stop();
    _progressController.stop();
  }

  void _resumeBreathing() {
    setState(() {
      _isBreathing = true;
      _isPaused = false;
      _currentPhase = 'Resuming...';
    });

    _progressController.forward();
    _breathingController.forward();
  }

  void _stopBreathing() {
    setState(() {
      _isBreathing = false;
      _isPaused = false;
      _currentPhase = 'Ready to begin';
      _currentCycle = 0;
      _sessionProgress = 0.0;
    });

    _breathingController.reset();
    _progressController.reset();
  }

  void _completeSession() {
    setState(() {
      _isBreathing = false;
      _currentPhase = 'Session Complete!';
      _sessionProgress = 1.0;
    });

    _triggerHapticFeedback();

    // Enhanced completion with gentle delay
    Future.delayed(const Duration(milliseconds: 1500), () {
      if (mounted) {
        _showCompletionDialog();
      }
    });
  }

  void _showCompletionDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      barrierColor:
          AppTheme.lightTheme.colorScheme.scrim.withValues(alpha: 0.7),
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        elevation: 20,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        contentPadding: EdgeInsets.all(6.w),
        title: Column(
          children: [
            Container(
              width: 16.w,
              height: 16.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.secondary
                    .withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: CustomIconWidget(
                iconName: 'spa',
                color: AppTheme.lightTheme.colorScheme.secondary,
                size: 8.w,
              ),
            ),
            SizedBox(height: 2.h),
            Text(
              'Beautiful Work',
              style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                color: AppTheme.lightTheme.colorScheme.secondary,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'You have completed a $_sessionDuration-minute ${_patterns[_selectedPattern]!['name']} session with mindful presence.',
              style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                height: 1.6,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 3.h),
            Container(
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    AppTheme.lightTheme.colorScheme.secondary
                        .withValues(alpha: 0.05),
                    AppTheme.lightTheme.colorScheme.secondary
                        .withValues(alpha: 0.15),
                  ],
                ),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: AppTheme.lightTheme.colorScheme.secondary
                      .withValues(alpha: 0.2),
                  width: 1,
                ),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Breath Cycles:',
                          style: AppTheme.lightTheme.textTheme.bodySmall),
                      Text('$_currentCycle',
                          style: AppTheme.lightTheme.textTheme.titleMedium
                              ?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.secondary,
                          )),
                    ],
                  ),
                  SizedBox(height: 1.h),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Mindful Minutes:',
                          style: AppTheme.lightTheme.textTheme.bodySmall),
                      Text('$_sessionDuration',
                          style: AppTheme.lightTheme.textTheme.titleMedium
                              ?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.secondary,
                          )),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          Container(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
                _stopBreathing();
              },
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(vertical: 3.h),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: Text(
                'Continue Journey',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSecondary,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showPatternSelector() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => BreathingPatternSelectorWidget(
        selectedPattern: _selectedPattern,
        onPatternChanged: (pattern) {
          setState(() {
            _selectedPattern = pattern;
          });
          _breathingController.duration =
              Duration(seconds: _getTotalCycleDuration());
          _calculateTotalCycles();
          Navigator.pop(context);
        },
        onClose: () => Navigator.pop(context),
      ),
    );
  }

  void _showSessionSettings() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => SessionSettingsWidget(
        selectedDuration: _sessionDuration,
        selectedSound: _backgroundSound,
        onDurationChanged: (duration) {
          setState(() {
            _sessionDuration = duration;
          });
          _progressController.duration = Duration(minutes: duration);
          _calculateTotalCycles();
        },
        onSoundChanged: (sound) {
          setState(() {
            _backgroundSound = sound;
          });
        },
        onClose: () => Navigator.pop(context),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedBuilder(
        animation: _backgroundAnimation,
        builder: (context, child) {
          return Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Color.lerp(
                    AppTheme.lightTheme.colorScheme.primary,
                    AppTheme.lightTheme.colorScheme.secondary
                        .withValues(alpha: 0.1),
                    _backgroundAnimation.value * 0.3,
                  )!,
                  Color.lerp(
                    AppTheme.lightTheme.colorScheme.primaryContainer,
                    AppTheme.lightTheme.colorScheme.secondary
                        .withValues(alpha: 0.05),
                    _backgroundAnimation.value * 0.2,
                  )!,
                  AppTheme.lightTheme.colorScheme.surface,
                ],
                stops: const [0.0, 0.4, 1.0],
              ),
            ),
            child: SafeArea(
              child: Column(
                children: [
                  // Enhanced Header with better spacing
                  Padding(
                    padding: EdgeInsets.fromLTRB(4.w, 2.h, 4.w, 1.h),
                    child: Row(
                      children: [
                        GestureDetector(
                          onTap: () => Navigator.pop(context),
                          child: Container(
                            padding: EdgeInsets.all(3.w),
                            decoration: BoxDecoration(
                              color: AppTheme.lightTheme.colorScheme.surface
                                  .withValues(alpha: 0.9),
                              borderRadius: BorderRadius.circular(16),
                              boxShadow: [
                                BoxShadow(
                                  color: AppTheme.lightTheme.colorScheme.shadow,
                                  blurRadius: 12,
                                  offset: const Offset(0, 4),
                                ),
                              ],
                            ),
                            child: CustomIconWidget(
                              iconName: 'arrow_back',
                              color: AppTheme.lightTheme.colorScheme.onSurface,
                              size: 6.w,
                            ),
                          ),
                        ),
                        Expanded(
                          child: Column(
                            children: [
                              Text(
                                _patterns[_selectedPattern]!['name'],
                                style: AppTheme
                                    .lightTheme.textTheme.headlineSmall
                                    ?.copyWith(
                                  color:
                                      AppTheme.lightTheme.colorScheme.onSurface,
                                  fontWeight: FontWeight.w300,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              SizedBox(height: 0.5.h),
                              Text(
                                _patterns[_selectedPattern]!['description'],
                                style: AppTheme.lightTheme.textTheme.bodySmall
                                    ?.copyWith(
                                  color: AppTheme
                                      .lightTheme.colorScheme.onSurface
                                      .withValues(alpha: 0.7),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                        GestureDetector(
                          onTap: _showPatternSelector,
                          child: Container(
                            padding: EdgeInsets.all(3.w),
                            decoration: BoxDecoration(
                              color: AppTheme.lightTheme.colorScheme.surface
                                  .withValues(alpha: 0.9),
                              borderRadius: BorderRadius.circular(16),
                              boxShadow: [
                                BoxShadow(
                                  color: AppTheme.lightTheme.colorScheme.shadow,
                                  blurRadius: 12,
                                  offset: const Offset(0, 4),
                                ),
                              ],
                            ),
                            child: CustomIconWidget(
                              iconName: 'tune',
                              color: AppTheme.lightTheme.colorScheme.secondary,
                              size: 6.w,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Enhanced Session info with better design
                  if (_isBreathing || _isPaused)
                    Container(
                      margin: EdgeInsets.fromLTRB(4.w, 1.h, 4.w, 2.h),
                      padding: EdgeInsets.symmetric(
                          horizontal: 5.w, vertical: 2.5.h),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            AppTheme.lightTheme.colorScheme.surface
                                .withValues(alpha: 0.95),
                            AppTheme.lightTheme.colorScheme.surface
                                .withValues(alpha: 0.85),
                          ],
                        ),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.2),
                          width: 1,
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.lightTheme.colorScheme.secondary
                                .withValues(alpha: 0.1),
                            blurRadius: 20,
                            spreadRadius: 2,
                          ),
                        ],
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Column(
                            children: [
                              Text(
                                'Cycle',
                                style: AppTheme.lightTheme.textTheme.labelMedium
                                    ?.copyWith(
                                  color:
                                      AppTheme.lightTheme.colorScheme.secondary,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              SizedBox(height: 0.5.h),
                              Text(
                                '$_currentCycle / $_totalCycles',
                                style: AppTheme.lightTheme.textTheme.titleLarge
                                    ?.copyWith(
                                  fontWeight: FontWeight.w300,
                                ),
                              ),
                            ],
                          ),
                          Container(
                            width: 1,
                            height: 8.h,
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                                colors: [
                                  AppTheme.lightTheme.colorScheme.secondary
                                      .withValues(alpha: 0.2),
                                  AppTheme.lightTheme.colorScheme.secondary
                                      .withValues(alpha: 0.5),
                                  AppTheme.lightTheme.colorScheme.secondary
                                      .withValues(alpha: 0.2),
                                ],
                              ),
                            ),
                          ),
                          Column(
                            children: [
                              Text(
                                'Progress',
                                style: AppTheme.lightTheme.textTheme.labelMedium
                                    ?.copyWith(
                                  color:
                                      AppTheme.lightTheme.colorScheme.secondary,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              SizedBox(height: 0.5.h),
                              Text(
                                '${(_sessionProgress * 100).toInt()}%',
                                style: AppTheme.lightTheme.textTheme.titleLarge
                                    ?.copyWith(
                                  fontWeight: FontWeight.w300,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),

                  // Main breathing area with enhanced spacing
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Enhanced breathing circle
                        BreathingCircleWidget(
                          isBreathing: _isBreathing,
                          currentPhase: _currentPhase,
                          progress: _sessionProgress,
                          onTap: () {
                            if (_isBreathing) {
                              _pauseBreathing();
                            } else if (_isPaused) {
                              _resumeBreathing();
                            } else {
                              _startBreathing();
                            }
                          },
                        ),

                        SizedBox(height: 6.h),

                        // Enhanced phase instruction with mindful messaging
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 8.w, vertical: 3.h),
                          child: Column(
                            children: [
                              Text(
                                _phaseMessages[_currentPhase] ?? _currentPhase,
                                style: AppTheme
                                    .lightTheme.textTheme.headlineSmall
                                    ?.copyWith(
                                  color:
                                      AppTheme.lightTheme.colorScheme.onSurface,
                                  fontWeight: FontWeight.w300,
                                  height: 1.4,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              if (_isBreathing || _isPaused)
                                Container(
                                  margin: EdgeInsets.only(top: 2.h),
                                  height: 0.5.h,
                                  width: 20.w,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(2),
                                    gradient: LinearGradient(
                                      colors: [
                                        AppTheme
                                            .lightTheme.colorScheme.secondary
                                            .withValues(alpha: 0.3),
                                        AppTheme
                                            .lightTheme.colorScheme.secondary,
                                        AppTheme
                                            .lightTheme.colorScheme.secondary
                                            .withValues(alpha: 0.3),
                                      ],
                                    ),
                                  ),
                                ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Enhanced Controls
                  BreathingControlsWidget(
                    isBreathing: _isBreathing || _isPaused,
                    onPlayPause: () {
                      if (_isBreathing) {
                        _pauseBreathing();
                      } else if (_isPaused) {
                        _resumeBreathing();
                      } else {
                        _startBreathing();
                      }
                    },
                    onStop: _stopBreathing,
                    onSettings: _showSessionSettings,
                  ),

                  SizedBox(height: 3.h),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
