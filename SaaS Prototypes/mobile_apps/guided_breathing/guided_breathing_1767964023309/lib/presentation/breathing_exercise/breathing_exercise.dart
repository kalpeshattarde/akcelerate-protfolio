import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/breathing_circle_widget.dart';
import './widgets/breathing_controls_widget.dart';
import './widgets/session_complete_widget.dart';
import './widgets/session_timer_widget.dart';
import './widgets/technique_selector_widget.dart';

class BreathingExercise extends StatefulWidget {
  const BreathingExercise({Key? key}) : super(key: key);

  @override
  State<BreathingExercise> createState() => _BreathingExerciseState();
}

class _BreathingExerciseState extends State<BreathingExercise>
    with TickerProviderStateMixin {
  // Session state
  bool _isPlaying = false;
  bool _isSessionComplete = false;
  String _selectedTechnique = '4-7-8 Breathing';
  String _currentBreathingPhase = 'Tap to start';
  Duration _sessionDuration = const Duration(minutes: 5);
  Duration _remainingTime = const Duration(minutes: 5);

  // Animation controllers
  late AnimationController _backgroundController;
  late AnimationController _breathingPhaseController;
  late Animation<Color?> _backgroundAnimation;

  // Timers and phase management
  late Timer _sessionTimer;
  late Timer _breathingTimer;
  int _currentPhaseIndex = 0;
  bool _showTechniqueSelector = false;
  bool _showSessionComplete = false;

  // Breathing patterns
  final Map<String, List<Map<String, dynamic>>> _breathingPatterns = {
    '4-7-8 Breathing': [
      {'phase': 'Inhale', 'duration': 4, 'instruction': 'Breathe in slowly'},
      {'phase': 'Hold', 'duration': 7, 'instruction': 'Hold your breath'},
      {'phase': 'Exhale', 'duration': 8, 'instruction': 'Breathe out slowly'},
    ],
    'Box Breathing': [
      {'phase': 'Inhale', 'duration': 4, 'instruction': 'Breathe in'},
      {'phase': 'Hold', 'duration': 4, 'instruction': 'Hold'},
      {'phase': 'Exhale', 'duration': 4, 'instruction': 'Breathe out'},
      {'phase': 'Hold', 'duration': 4, 'instruction': 'Hold'},
    ],
    'Deep Breathing': [
      {'phase': 'Inhale', 'duration': 6, 'instruction': 'Deep breath in'},
      {'phase': 'Exhale', 'duration': 6, 'instruction': 'Slow breath out'},
    ],
    'Coherent Breathing': [
      {'phase': 'Inhale', 'duration': 5, 'instruction': 'Breathe in'},
      {'phase': 'Exhale', 'duration': 5, 'instruction': 'Breathe out'},
    ],
  };

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _lockOrientation();
  }

  void _initializeAnimations() {
    _backgroundController = AnimationController(
      duration: const Duration(seconds: 10),
      vsync: this,
    );

    _backgroundAnimation = ColorTween(
      begin: AppTheme.lightTheme.scaffoldBackgroundColor,
      end: AppTheme.lightTheme.scaffoldBackgroundColor.withValues(alpha: 0.8),
    ).animate(CurvedAnimation(
      parent: _backgroundController,
      curve: Curves.easeInOut,
    ));

    _breathingPhaseController = AnimationController(
      duration: const Duration(seconds: 1),
      vsync: this,
    );

    _backgroundController.repeat(reverse: true);
  }

  void _lockOrientation() {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
    ]);
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  }

  @override
  void dispose() {
    _backgroundController.dispose();
    _breathingPhaseController.dispose();
    if (_sessionTimer.isActive) _sessionTimer.cancel();
    if (_breathingTimer.isActive) _breathingTimer.cancel();
    SystemChrome.setPreferredOrientations(DeviceOrientation.values);
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
    super.dispose();
  }

  void _togglePlayPause() {
    setState(() {
      _isPlaying = !_isPlaying;
    });

    if (_isPlaying) {
      _startSession();
    } else {
      _pauseSession();
    }
  }

  void _startSession() {
    _startSessionTimer();
    _startBreathingCycle();
    _triggerHapticFeedback();
  }

  void _pauseSession() {
    if (_sessionTimer.isActive) _sessionTimer.cancel();
    if (_breathingTimer.isActive) _breathingTimer.cancel();
  }

  void _startSessionTimer() {
    _sessionTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        if (_remainingTime.inSeconds > 0) {
          _remainingTime = Duration(seconds: _remainingTime.inSeconds - 1);
        } else {
          _completeSession();
        }
      });
    });
  }

  void _startBreathingCycle() {
    final pattern = _breathingPatterns[_selectedTechnique]!;
    _currentPhaseIndex = 0;
    _executeBreathingPhase(pattern);
  }

  void _executeBreathingPhase(List<Map<String, dynamic>> pattern) {
    if (!_isPlaying) return;

    final currentPhase = pattern[_currentPhaseIndex];
    setState(() {
      _currentBreathingPhase = currentPhase['phase'];
    });

    _triggerHapticFeedback();

    _breathingTimer = Timer(
      Duration(seconds: currentPhase['duration']),
      () {
        _currentPhaseIndex = (_currentPhaseIndex + 1) % pattern.length;
        _executeBreathingPhase(pattern);
      },
    );
  }

  void _triggerHapticFeedback() {
    HapticFeedback.lightImpact();
  }

  void _completeSession() {
    setState(() {
      _isPlaying = false;
      _isSessionComplete = true;
      _showSessionComplete = true;
      _currentBreathingPhase = 'Complete';
    });

    if (_sessionTimer.isActive) _sessionTimer.cancel();
    if (_breathingTimer.isActive) _breathingTimer.cancel();

    _triggerHapticFeedback();
  }

  void _selectTechnique(String technique) {
    setState(() {
      _selectedTechnique = technique;
      _showTechniqueSelector = false;
      if (_isPlaying) {
        _pauseSession();
        _isPlaying = false;
        _currentBreathingPhase = 'Tap to start';
      }
    });
  }

  void _resetSession() {
    setState(() {
      _isPlaying = false;
      _isSessionComplete = false;
      _showSessionComplete = false;
      _currentBreathingPhase = 'Tap to start';
      _remainingTime = _sessionDuration;
      _currentPhaseIndex = 0;
    });

    if (_sessionTimer.isActive) _sessionTimer.cancel();
    if (_breathingTimer.isActive) _breathingTimer.cancel();
  }

  void _startNewSession() {
    _resetSession();
    setState(() {
      _showSessionComplete = false;
    });
  }

  void _closeSession() {
    Navigator.pop(context);
  }

  void _showSettings() {
    // Settings implementation would go here
    HapticFeedback.selectionClick();
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
                  AppTheme.lightTheme.scaffoldBackgroundColor,
                  AppTheme.lightTheme.scaffoldBackgroundColor
                      .withValues(alpha: 0.9),
                  AppTheme.lightTheme.colorScheme.secondary
                      .withValues(alpha: 0.1),
                ],
                stops: const [0.0, 0.7, 1.0],
              ),
            ),
            child: SafeArea(
              child: Stack(
                children: [
                  // Floating particles background
                  Positioned.fill(
                    child: CustomPaint(
                      painter: BackgroundParticlesPainter(),
                    ),
                  ),
                  // Main content
                  Column(
                    children: [
                      // Close button
                      Padding(
                        padding: EdgeInsets.symmetric(
                            horizontal: 4.w, vertical: 2.h),
                        child: Row(
                          children: [
                            GestureDetector(
                              onTap: _closeSession,
                              child: Container(
                                padding: EdgeInsets.all(2.w),
                                decoration: BoxDecoration(
                                  color: AppTheme.lightTheme.colorScheme.surface
                                      .withValues(alpha: 0.2),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: CustomIconWidget(
                                  iconName: 'keyboard_arrow_down',
                                  color: AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                                  size: 24,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      // Session timer
                      SessionTimerWidget(
                        sessionDuration: _sessionDuration,
                        remainingTime: _remainingTime,
                        techniqueName: _selectedTechnique,
                      ),
                      // Breathing circle
                      Expanded(
                        child: Center(
                          child: BreathingCircleWidget(
                            breathingPhase: _currentBreathingPhase,
                            isPlaying: _isPlaying,
                            technique: _selectedTechnique.split(' ')[0],
                            onTap: _togglePlayPause,
                          ),
                        ),
                      ),
                      // Controls
                      BreathingControlsWidget(
                        isPlaying: _isPlaying,
                        onPlayPause: _togglePlayPause,
                        onTechniqueSelect: () {
                          setState(() {
                            _showTechniqueSelector = true;
                          });
                        },
                        onSettings: _showSettings,
                        selectedTechnique: _selectedTechnique,
                      ),
                      SizedBox(height: 4.h),
                    ],
                  ),
                  // Technique selector modal
                  if (_showTechniqueSelector)
                    Positioned.fill(
                      child: GestureDetector(
                        onTap: () {
                          setState(() {
                            _showTechniqueSelector = false;
                          });
                        },
                        child: Container(
                          color: Colors.black.withValues(alpha: 0.5),
                          child: Align(
                            alignment: Alignment.bottomCenter,
                            child: GestureDetector(
                              onTap:
                                  () {}, // Prevent closing when tapping modal
                              child: TechniqueSelectorWidget(
                                selectedTechnique: _selectedTechnique,
                                onTechniqueSelected: _selectTechnique,
                                onClose: () {
                                  setState(() {
                                    _showTechniqueSelector = false;
                                  });
                                },
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  // Session complete modal
                  if (_showSessionComplete)
                    Positioned.fill(
                      child: Container(
                        color: Colors.black.withValues(alpha: 0.7),
                        child: Align(
                          alignment: Alignment.bottomCenter,
                          child: SessionCompleteWidget(
                            sessionDuration: _sessionDuration,
                            technique: _selectedTechnique,
                            onNewSession: _startNewSession,
                            onClose: _closeSession,
                          ),
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

class BackgroundParticlesPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppTheme.particleColor.withValues(alpha: 0.3)
      ..style = PaintingStyle.fill;

    // Draw scattered particles
    for (int i = 0; i < 20; i++) {
      final x = (i * 47) % size.width;
      final y = (i * 73) % size.height;
      final radius = 1.0 + (i % 3);
      canvas.drawCircle(Offset(x, y), radius, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// Timer import
