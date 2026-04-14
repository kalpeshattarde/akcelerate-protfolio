import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/ai_feedback_widget.dart';
import './widgets/cultural_context_widget.dart';
import './widgets/mouth_animation_widget.dart';
import './widgets/practice_modes_widget.dart';
import './widgets/progress_tracking_widget.dart';
import './widgets/pronunciation_header_widget.dart';
import './widgets/recording_widget.dart';
import './widgets/target_word_widget.dart';

class PronunciationPractice extends StatefulWidget {
  @override
  State<PronunciationPractice> createState() => _PronunciationPracticeState();
}

class _PronunciationPracticeState extends State<PronunciationPractice>
    with TickerProviderStateMixin {
  // Current session data
  String _currentWord = "Hello";
  String _currentPhoneme = "ə";
  int _sessionProgress = 45;
  double _accuracyScore = 78.5;
  double _playbackSpeed = 1.0;
  String _selectedAccent = "American";
  String _selectedPracticeMode = "word_repetition";
  bool _isAnimating = false;
  String? _userRecordingPath;
  double _currentVolume = 0.0;

  // Mock data
  final List<Map<String, dynamic>> _regionalVariations = [
    {
      "region": "American English",
      "flag": "https://flagcdn.com/w40/us.png",
      "pronunciation": "/həˈloʊ/",
      "description":
          "Standard American pronunciation with clear 'o' sound and slight emphasis on the second syllable.",
    },
    {
      "region": "British English",
      "flag": "https://flagcdn.com/w40/gb.png",
      "pronunciation": "/həˈləʊ/",
      "description":
          "British pronunciation with a more rounded 'o' sound and crisp consonants.",
    },
    {
      "region": "Australian English",
      "flag": "https://flagcdn.com/w40/au.png",
      "pronunciation": "/həˈləʊ/",
      "description":
          "Australian accent with a slightly flattened vowel sound and relaxed articulation.",
    },
    {
      "region": "Canadian English",
      "flag": "https://flagcdn.com/w40/ca.png",
      "pronunciation": "/həˈloʊ/",
      "description":
          "Canadian pronunciation similar to American but with subtle differences in vowel quality.",
    },
  ];

  final List<Map<String, dynamic>> _usageScenarios = [
    {
      "context": "Professional Meeting",
      "example": "Hello, everyone. Thank you for joining today's presentation.",
      "explanation":
          "Formal greeting used in business settings to address a group professionally.",
    },
    {
      "context": "Casual Conversation",
      "example": "Hello! How are you doing today?",
      "explanation":
          "Friendly, informal greeting used with friends, family, or acquaintances.",
    },
    {
      "context": "Phone Call",
      "example": "Hello, this is Sarah speaking. How may I help you?",
      "explanation":
          "Standard phone greeting that identifies the speaker and offers assistance.",
    },
    {
      "context": "First Meeting",
      "example":
          "Hello, nice to meet you. I'm John from the marketing department.",
      "explanation":
          "Polite introduction when meeting someone for the first time in a professional context.",
    },
  ];

  final List<Map<String, dynamic>> _progressData = [
    {"date": "2025-08-18", "score": 65},
    {"date": "2025-08-19", "score": 72},
    {"date": "2025-08-20", "score": 68},
    {"date": "2025-08-21", "score": 75},
    {"date": "2025-08-22", "score": 78},
  ];

  final Map<String, double> _phonemeAnalysis = {
    "h": 85.0,
    "ə": 78.5,
    "l": 82.3,
    "oʊ": 74.2,
  };

  final List<String> _recommendedExercises = [
    "Practice tongue twisters with 'l' sounds to improve clarity",
    "Record yourself saying common greetings and compare with native speakers",
    "Focus on vowel pronunciation with minimal pairs exercises",
    "Practice conversation starters in different social contexts",
    "Work on stress patterns in multi-syllable words",
  ];

  final List<String> _problematicSounds = ["oʊ", "l"];
  final List<String> _improvementSuggestions = [
    "Focus on rounding your lips more when pronouncing the 'o' sound in 'hello'",
    "Practice the 'l' sound by placing your tongue tip against your upper teeth",
    "Try slowing down your speech to ensure each phoneme is clearly articulated",
    "Record yourself daily and compare with native speaker models for consistency",
  ];

  @override
  void initState() {
    super.initState();
    _startSession();
  }

  void _startSession() {
    // Initialize session with haptic feedback
    HapticFeedback.lightImpact();
  }

  void _onBackPressed() {
    Navigator.pop(context);
  }

  void _onSpeedChanged(double speed) {
    setState(() {
      _playbackSpeed = speed;
    });
    HapticFeedback.selectionClick();
  }

  void _onAccentChanged(String accent) {
    setState(() {
      _selectedAccent = accent;
    });
    HapticFeedback.selectionClick();
  }

  void _onRecordingComplete(String? recordingPath) {
    setState(() {
      _userRecordingPath = recordingPath;
      _isAnimating = false;
    });

    if (recordingPath != null) {
      // Simulate AI analysis
      Future.delayed(Duration(seconds: 1), () {
        if (mounted) {
          setState(() {
            _accuracyScore = 78.5 + (DateTime.now().millisecond % 20) - 10;
            _sessionProgress = (_sessionProgress + 15).clamp(0, 100);
          });
          HapticFeedback.mediumImpact();
        }
      });
    }
  }

  void _onVolumeChanged(double volume) {
    setState(() {
      _currentVolume = volume;
      _isAnimating = volume > 0.3;
    });
  }

  void _onModeChanged(String mode) {
    setState(() {
      _selectedPracticeMode = mode;
    });
    HapticFeedback.selectionClick();
  }

  void _onStartPractice() {
    HapticFeedback.mediumImpact();
    // Navigate to specific practice mode or show practice dialog
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Starting Practice Session'),
        content: Text(
            'Beginning $_selectedPracticeMode practice mode with the word "$_currentWord".'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Start'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: SafeArea(
        child: Column(
          children: [
            PronunciationHeaderWidget(
              currentWord: _currentWord,
              sessionProgress: _sessionProgress,
              accuracyScore: _accuracyScore,
              onBackPressed: _onBackPressed,
            ),
            Expanded(
              child: SingleChildScrollView(
                physics: BouncingScrollPhysics(),
                child: Column(
                  children: [
                    TargetWordWidget(
                      targetWord: _currentWord,
                      phoneticTranscription: "/həˈloʊ/",
                      audioUrl: "https://example.com/hello.mp3",
                      playbackSpeed: _playbackSpeed,
                      selectedAccent: _selectedAccent,
                      onSpeedChanged: _onSpeedChanged,
                      onAccentChanged: _onAccentChanged,
                    ),
                    MouthAnimationWidget(
                      currentPhoneme: _currentPhoneme,
                      isAnimating: _isAnimating,
                    ),
                    RecordingWidget(
                      onRecordingComplete: _onRecordingComplete,
                      onVolumeChanged: _onVolumeChanged,
                    ),
                    if (_userRecordingPath != null) ...[
                      AiFeedbackWidget(
                        pronunciationScore: _accuracyScore,
                        problematicSounds: _problematicSounds,
                        improvementSuggestions: _improvementSuggestions,
                        userRecordingPath: _userRecordingPath,
                        nativeRecordingPath:
                            "https://example.com/native_hello.mp3",
                      ),
                    ],
                    CulturalContextWidget(
                      targetWord: _currentWord,
                      regionalVariations: _regionalVariations,
                      usageScenarios: _usageScenarios,
                    ),
                    PracticeModesWidget(
                      selectedMode: _selectedPracticeMode,
                      onModeChanged: _onModeChanged,
                      onStartPractice: _onStartPractice,
                    ),
                    ProgressTrackingWidget(
                      progressData: _progressData,
                      phonemeAnalysis: _phonemeAnalysis,
                      recommendedExercises: _recommendedExercises,
                    ),
                    SizedBox(height: 4.h),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),

      // Floating action button for quick actions
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.pushNamed(context, '/progress-analytics');
        },
        icon: CustomIconWidget(
          iconName: 'analytics',
          color: AppTheme.lightTheme.colorScheme.onPrimary,
          size: 6.w,
        ),
        label: Text(
          'View Analytics',
          style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onPrimary,
          ),
        ),
      ),

      // Bottom navigation for quick access
      bottomNavigationBar: Container(
        padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 8,
              offset: Offset(0, -2),
            ),
          ],
        ),
        child: SafeArea(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildQuickActionButton(
                'Home',
                'home',
                () => Navigator.pushNamed(context, '/home-dashboard'),
              ),
              _buildQuickActionButton(
                'Lessons',
                'school',
                () => Navigator.pushNamed(context, '/lesson-interface'),
              ),
              _buildQuickActionButton(
                'Social',
                'people',
                () => Navigator.pushNamed(context, '/social-features-hub'),
              ),
              _buildQuickActionButton(
                'Settings',
                'settings',
                () => Navigator.pushNamed(context, '/settings-and-profile'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQuickActionButton(
      String label, String iconName, VoidCallback onTap) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap();
      },
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          CustomIconWidget(
            iconName: iconName,
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            size: 6.w,
          ),
          SizedBox(height: 0.5.h),
          Text(
            label,
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
        ],
      ),
    );
  }
}
