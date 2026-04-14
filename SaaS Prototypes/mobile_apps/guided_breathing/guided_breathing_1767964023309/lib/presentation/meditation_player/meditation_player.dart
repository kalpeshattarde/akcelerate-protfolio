import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/animated_background_widget.dart';
import './widgets/breathing_circle_widget.dart';
import './widgets/playback_controls_widget.dart';
import './widgets/session_header_widget.dart';

class MeditationPlayer extends StatefulWidget {
  const MeditationPlayer({Key? key}) : super(key: key);

  @override
  State<MeditationPlayer> createState() => _MeditationPlayerState();
}

class _MeditationPlayerState extends State<MeditationPlayer>
    with TickerProviderStateMixin {
  // Audio playback state
  bool _isPlaying = false;
  double _progress = 0.0;
  String _remainingTime = "12:45";
  double _volume = 0.7;

  // UI state
  bool _breathingCircleVisible = true;
  bool _hapticEnabled = true;
  bool _isBookmarked = false;

  // Session data
  final List<Map<String, dynamic>> _sessionData = [
    {
      "id": 1,
      "title": "Deep Sleep Meditation",
      "instructor": "Sarah Chen",
      "duration": 765, // 12:45 in seconds "category": "Sleep",
      "description":
          "A gentle guided meditation designed to help you drift into peaceful, restorative sleep. Perfect for those struggling with insomnia or restless nights.",
      "audioUrl": "https://example.com/audio/deep-sleep-meditation.mp3",
      "isDownloaded": true,
      "rating": 4.8,
      "plays": 125000,
    },
    {
      "id": 2,
      "title": "Anxiety Relief Session",
      "instructor": "Dr. Michael Torres",
      "duration": 900, // 15:00 in seconds "category": "Anxiety",
      "description":
          "Scientifically-backed breathing techniques and mindfulness practices to reduce anxiety and promote inner calm.",
      "audioUrl": "https://example.com/audio/anxiety-relief.mp3",
      "isDownloaded": false,
      "rating": 4.9,
      "plays": 89000,
    },
    {
      "id": 3,
      "title": "Morning Focus Boost",
      "instructor": "Emma Rodriguez",
      "duration": 480, // 8:00 in seconds "category": "Focus",
      "description":
          "Start your day with clarity and purpose. This energizing meditation enhances concentration and mental sharpness.",
      "audioUrl": "https://example.com/audio/morning-focus.mp3",
      "isDownloaded": true,
      "rating": 4.7,
      "plays": 67000,
    },
  ];

  late Map<String, dynamic> _currentSession;
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();

    // Initialize with first session
    _currentSession = _sessionData.first;

    // Setup fade animation for UI transitions
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeInOut,
    ));

    _fadeController.forward();

    // Prevent screen from turning off during meditation
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);

    // Start mock progress simulation
    _startProgressSimulation();
  }

  void _startProgressSimulation() {
    // Simulate audio progress for demo purposes
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted && _isPlaying) {
        setState(() {
          _progress += 0.001; // Increment progress
          if (_progress >= 1.0) {
            _progress = 1.0;
            _isPlaying = false;
            _showCompletionDialog();
          } else {
            // Update remaining time
            final totalSeconds = (_currentSession["duration"] as int);
            final remainingSeconds = (totalSeconds * (1 - _progress)).round();
            final minutes = remainingSeconds ~/ 60;
            final seconds = remainingSeconds % 60;
            _remainingTime =
                "${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}";
          }
        });
        _startProgressSimulation();
      }
    });
  }

  @override
  void dispose() {
    _fadeController.dispose();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
    super.dispose();
  }

  void _togglePlayPause() {
    setState(() {
      _isPlaying = !_isPlaying;
    });

    if (_isPlaying) {
      _startProgressSimulation();
    }

    if (_hapticEnabled) {
      HapticFeedback.mediumImpact();
    }
  }

  void _skipBackward() {
    setState(() {
      _progress = (_progress - 0.05).clamp(0.0, 1.0);
      // Recalculate remaining time
      final totalSeconds = (_currentSession["duration"] as int);
      final remainingSeconds = (totalSeconds * (1 - _progress)).round();
      final minutes = remainingSeconds ~/ 60;
      final seconds = remainingSeconds % 60;
      _remainingTime =
          "${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}";
    });
  }

  void _skipForward() {
    setState(() {
      _progress = (_progress + 0.05).clamp(0.0, 1.0);
      // Recalculate remaining time
      final totalSeconds = (_currentSession["duration"] as int);
      final remainingSeconds = (totalSeconds * (1 - _progress)).round();
      final minutes = remainingSeconds ~/ 60;
      final seconds = remainingSeconds % 60;
      _remainingTime =
          "${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}";
    });
  }

  void _toggleBreathingCircle() {
    setState(() {
      _breathingCircleVisible = !_breathingCircleVisible;
    });

    if (_hapticEnabled) {
      HapticFeedback.lightImpact();
    }
  }

  void _toggleHaptic() {
    setState(() {
      _hapticEnabled = !_hapticEnabled;
    });

    HapticFeedback.lightImpact();
  }

  void _closePlayer() {
    _fadeController.reverse().then((_) {
      Navigator.of(context).pop();
    });
  }

  void _showCompletionDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        title: Text(
          'Session Complete!',
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
          textAlign: TextAlign.center,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CustomIconWidget(
              iconName: 'check_circle',
              color: AppTheme.successColor,
              size: 48,
            ),
            SizedBox(height: 2.h),
            Text(
              'How are you feeling?',
              style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurface,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 2.h),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildMoodButton('😌', 'Calm'),
                _buildMoodButton('😊', 'Happy'),
                _buildMoodButton('😴', 'Sleepy'),
                _buildMoodButton('🧘', 'Peaceful'),
              ],
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _closePlayer();
            },
            child: Text(
              'Done',
              style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                color: AppTheme.lightTheme.colorScheme.secondary,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMoodButton(String emoji, String label) {
    return GestureDetector(
      onTap: () {
        if (_hapticEnabled) {
          HapticFeedback.lightImpact();
        }
        // Save mood selection
      },
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(2.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface
                  .withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              emoji,
              style: TextStyle(fontSize: 24),
            ),
          ),
          SizedBox(height: 0.5.h),
          Text(
            label,
            style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        onVerticalDragEnd: (details) {
          // Swipe down to dismiss
          if (details.primaryVelocity != null &&
              details.primaryVelocity! > 300) {
            _closePlayer();
          }
        },
        child: Stack(
          children: [
            // Animated background
            const AnimatedBackgroundWidget(),

            // Main content
            SafeArea(
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: Column(
                  children: [
                    // Session header with progress
                    SessionHeaderWidget(
                      sessionTitle: _currentSession["title"] as String,
                      instructorName: _currentSession["instructor"] as String,
                      remainingTime: _remainingTime,
                      progress: _progress,
                      onClose: _closePlayer,
                    ),

                    // Spacer
                    const Spacer(flex: 1),

                    // Breathing circle (optional)
                    BreathingCircleWidget(
                      isVisible: _breathingCircleVisible,
                      isPlaying: _isPlaying,
                      onToggle: _toggleBreathingCircle,
                    ),

                    // Spacer
                    const Spacer(flex: 2),

                    // Playback controls
                    PlaybackControlsWidget(
                      isPlaying: _isPlaying,
                      onPlayPause: _togglePlayPause,
                      onSkipBackward: _skipBackward,
                      onSkipForward: _skipForward,
                      volume: _volume,
                      onVolumeChanged: (value) {
                        setState(() {
                          _volume = value;
                        });
                      },
                      hapticEnabled: _hapticEnabled,
                      onHapticToggle: _toggleHaptic,
                    ),

                    SizedBox(height: 2.h),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
