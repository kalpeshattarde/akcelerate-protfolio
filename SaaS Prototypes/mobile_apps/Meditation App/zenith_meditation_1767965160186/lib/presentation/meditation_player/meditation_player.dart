import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import './widgets/additional_controls_widget.dart';
import './widgets/background_sounds_modal_widget.dart';
import './widgets/breathing_circle_widget.dart';
import './widgets/playback_controls_widget.dart';
import './widgets/progress_bar_widget.dart';
import './widgets/session_header_widget.dart';
import './widgets/sleep_timer_modal_widget.dart';

class MeditationPlayer extends StatefulWidget {
  const MeditationPlayer({Key? key}) : super(key: key);

  @override
  State<MeditationPlayer> createState() => _MeditationPlayerState();
}

class _MeditationPlayerState extends State<MeditationPlayer>
    with TickerProviderStateMixin {
  // Audio state
  bool _isPlaying = false;
  Duration _currentPosition = const Duration(minutes: 5, seconds: 30);
  Duration _totalDuration = const Duration(minutes: 15, seconds: 0);
  double _playbackSpeed = 1.0;

  // UI state
  bool _isBookmarked = false;
  Duration? _sleepTimer;
  List<String> _backgroundSounds = [];

  // Animation controllers
  late AnimationController _particleController;
  late AnimationController _gradientController;

  // Mock session data
  final Map<String, dynamic> _sessionData = {
    'id': 1,
    'title': 'Deep Relaxation Journey',
    'instructor': 'Sarah Chen',
    'category': 'Sleep',
    'duration': 15,
    'description':
        'A gentle guided meditation to help you unwind and prepare for restful sleep.',
    'image':
        'https://images.unsplash.com/photo-1644211891657-6e33dac9429a',
    'semanticLabel':
        'Peaceful woman with closed eyes in meditation pose, sitting cross-legged in soft natural lighting',
  };

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  }

  void _initializeAnimations() {
    _particleController = AnimationController(
      duration: const Duration(seconds: 20),
      vsync: this,
    )..repeat();

    _gradientController = AnimationController(
      duration: const Duration(seconds: 8),
      vsync: this,
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _particleController.dispose();
    _gradientController.dispose();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
    super.dispose();
  }

  void _togglePlayPause() {
    setState(() {
      _isPlaying = !_isPlaying;
    });

    if (_isPlaying) {
      HapticFeedback.lightImpact();
    }
  }

  void _rewind() {
    setState(() {
      _currentPosition = Duration(
        seconds: (_currentPosition.inSeconds - 15)
            .clamp(0, _totalDuration.inSeconds),
      );
    });
    HapticFeedback.selectionClick();
  }

  void _fastForward() {
    setState(() {
      _currentPosition = Duration(
        seconds: (_currentPosition.inSeconds + 15)
            .clamp(0, _totalDuration.inSeconds),
      );
    });
    HapticFeedback.selectionClick();
  }

  void _onSeek(Duration position) {
    setState(() {
      _currentPosition = position;
    });
  }

  void _onSpeedChanged(double speed) {
    setState(() {
      _playbackSpeed = speed;
    });
    HapticFeedback.selectionClick();
  }

  void _toggleBookmark() {
    setState(() {
      _isBookmarked = !_isBookmarked;
    });
    HapticFeedback.lightImpact();
  }

  void _showSleepTimerModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => SleepTimerModalWidget(
        currentTimer: _sleepTimer,
        onTimerSet: (timer) {
          setState(() {
            _sleepTimer = timer;
          });
        },
      ),
    );
  }

  void _showBackgroundSoundsModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => BackgroundSoundsModalWidget(
        selectedSounds: _backgroundSounds,
        onSoundsChanged: (sounds) {
          setState(() {
            _backgroundSounds = sounds;
          });
        },
      ),
    );
  }

  void _onBackPressed() {
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              const Color(0xFF1A1A2E).withValues(alpha: 0.95),
              const Color(0xFF16213E).withValues(alpha: 0.9),
              const Color(0xFF0F3460).withValues(alpha: 0.85),
            ],
            stops: [
              0.0 + _gradientController.value * 0.2,
              0.5 + _gradientController.value * 0.1,
              1.0,
            ],
          ),
        ),
        child: Stack(
          children: [
            // Animated particles background
            AnimatedBuilder(
              animation: _particleController,
              builder: (context, child) {
                return CustomPaint(
                  painter: ParticlesPainter(_particleController.value),
                  size: Size.infinite,
                );
              },
            ),
            // Main content
            SafeArea(
              child: Column(
                children: [
                  // Header
                  SessionHeaderWidget(
                    sessionTitle: _sessionData['title'],
                    isBookmarked: _isBookmarked,
                    onBackPressed: _onBackPressed,
                    onBookmarkPressed: _toggleBookmark,
                  ),
                  SizedBox(height: 4.h),
                  // Breathing circle visualization
                  Expanded(
                    flex: 3,
                    child: Center(
                      child: BreathingCircleWidget(
                        isPlaying: _isPlaying,
                        onTap: _togglePlayPause,
                      ),
                    ),
                  ),
                  SizedBox(height: 4.h),
                  // Progress bar
                  ProgressBarWidget(
                    currentPosition: _currentPosition,
                    totalDuration: _totalDuration,
                    onSeek: _onSeek,
                  ),
                  SizedBox(height: 4.h),
                  // Playback controls
                  PlaybackControlsWidget(
                    isPlaying: _isPlaying,
                    onPlayPause: _togglePlayPause,
                    onRewind: _rewind,
                    onFastForward: _fastForward,
                    playbackSpeed: _playbackSpeed,
                    onSpeedChanged: _onSpeedChanged,
                  ),
                  SizedBox(height: 2.h),
                  // Additional controls
                  AdditionalControlsWidget(
                    isSleepTimerActive: _sleepTimer != null,
                    sleepTimerDuration: _sleepTimer,
                    onSleepTimerPressed: _showSleepTimerModal,
                    onBackgroundSoundsPressed: _showBackgroundSoundsModal,
                    hasBackgroundSounds: _backgroundSounds.isNotEmpty,
                  ),
                  SizedBox(height: 2.h),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ParticlesPainter extends CustomPainter {
  final double animationValue;

  ParticlesPainter(this.animationValue);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white.withValues(alpha: 0.1)
      ..style = PaintingStyle.fill;

    // Draw floating particles
    for (int i = 0; i < 20; i++) {
      final x = (size.width * 0.1 + (i * 47) % size.width.toInt()) +
          (animationValue * 50 * (i % 3 - 1));
      final y = (size.height * 0.2 + (i * 73) % size.height.toInt()) +
          (animationValue * 30 * (i % 2 == 0 ? 1 : -1));

      final radius = 1.0 + (i % 3) * 0.5;

      canvas.drawCircle(
        Offset(x % size.width, y % size.height),
        radius,
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}