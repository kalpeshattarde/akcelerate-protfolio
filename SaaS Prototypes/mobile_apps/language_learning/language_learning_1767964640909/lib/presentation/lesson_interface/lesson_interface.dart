import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/audio_matching_widget.dart';
import './widgets/cultural_context_widget.dart';
import './widgets/fill_blank_widget.dart';
import './widgets/image_association_widget.dart';
import './widgets/lesson_action_button_widget.dart';
import './widgets/lesson_header_widget.dart';
import './widgets/multiple_choice_widget.dart';
import './widgets/speech_recognition_widget.dart';

class LessonInterface extends StatefulWidget {
  const LessonInterface({Key? key}) : super(key: key);

  @override
  State<LessonInterface> createState() => _LessonInterfaceState();
}

class _LessonInterfaceState extends State<LessonInterface>
    with TickerProviderStateMixin {
  int _currentExerciseIndex = 0;
  int _xpPoints = 1250;
  bool _showResult = false;
  bool _isLoading = false;
  bool _isCulturalContextExpanded = false;

  // Exercise states
  int? _selectedMultipleChoice;
  String? _fillBlankAnswer;
  int? _selectedAudioMatch;
  Map<String, String> _imageMatches = {};
  String? _speechResult;
  double? _speechAccuracy;

  late AnimationController _transitionController;
  late Animation<Offset> _slideAnimation;

  // Mock lesson data
  final List<Map<String, dynamic>> _exercises = [
    {
      "type": "multiple_choice",
      "question": "What does 'Bonjour' mean in English?",
      "options": ["Good morning", "Good evening", "Goodbye", "Thank you"],
      "correctIndex": 0,
      "xpReward": 10,
    },
    {
      "type": "fill_blank",
      "sentence": "Je ___ français.",
      "correctAnswer": "parle",
      "suggestions": ["parle", "mange", "bois", "dors"],
      "xpReward": 15,
    },
    {
      "type": "audio_matching",
      "word": "Merci",
      "audioUrl": "https://example.com/audio/merci.mp3",
      "options": ["Thank you", "Please", "Excuse me", "You're welcome"],
      "correctIndex": 0,
      "xpReward": 12,
    },
    {
      "type": "image_association",
      "imageWords": [
        {
          "id": "img1",
          "imageUrl":
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
          "correctWord": "montagne"
        },
        {
          "id": "img2",
          "imageUrl":
              "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=300&fit=crop",
          "correctWord": "lac"
        }
      ],
      "wordOptions": [
        {"word": "montagne"},
        {"word": "lac"},
        {"word": "forêt"},
        {"word": "rivière"}
      ],
      "xpReward": 20,
    },
    {
      "type": "speech_recognition",
      "targetWord": "Bonjour",
      "pronunciationGuide": "/bon-ZHOOR/",
      "xpReward": 25,
    }
  ];

  final Map<String, dynamic> _culturalData = {
    "title": "French Greetings Culture",
    "description":
        "In France, greetings are an important part of social interaction. The way you greet someone depends on the time of day, your relationship with the person, and the formality of the situation.",
    "imageUrl":
        "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=300&fit=crop",
    "facts": [
      "French people typically greet with 'Bonjour' until around 6 PM, then switch to 'Bonsoir'",
      "In formal situations, a handshake is common, while friends and family often exchange kisses on the cheek",
      "Always greet shopkeepers when entering and leaving stores - it's considered polite"
    ],
    "traditions": [
      "La bise (cheek kissing) varies by region - some areas do 2 kisses, others do 3 or 4",
      "Business meetings always start with formal greetings and handshakes"
    ]
  };

  @override
  void initState() {
    super.initState();
    _transitionController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _slideAnimation = Tween<Offset>(
      begin: const Offset(1.0, 0.0),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _transitionController,
      curve: Curves.easeInOut,
    ));
    _transitionController.forward();
  }

  @override
  void dispose() {
    _transitionController.dispose();
    super.dispose();
  }

  void _showExitDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(
            'Exit Lesson?',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          content: Text(
            'Your progress will be saved. Are you sure you want to exit?',
            style: AppTheme.lightTheme.textTheme.bodyMedium,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text(
                'Cancel',
                style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                ),
              ),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
                Navigator.pushReplacementNamed(context, '/home-dashboard');
              },
              child: const Text('Exit'),
            ),
          ],
        );
      },
    );
  }

  void _handleMultipleChoiceSelection(int index) {
    setState(() {
      _selectedMultipleChoice = index;
    });
  }

  void _handleFillBlankSubmission(String answer) {
    setState(() {
      _fillBlankAnswer = answer;
    });
  }

  void _handleAudioMatchSelection(int index) {
    setState(() {
      _selectedAudioMatch = index;
    });
  }

  void _handleImageMatch(String imageId, String word) {
    setState(() {
      _imageMatches[imageId] = word;
    });
  }

  void _handleSpeechResult(String result) {
    setState(() {
      _speechResult = result;
      // Simulate accuracy calculation
      final currentExercise = _exercises[_currentExerciseIndex];
      final targetWord =
          (currentExercise['targetWord'] as String).toLowerCase();
      final similarity = _calculateSimilarity(result.toLowerCase(), targetWord);
      _speechAccuracy = similarity;
    });
  }

  double _calculateSimilarity(String a, String b) {
    if (a == b) return 1.0;
    if (a.contains(b) || b.contains(a)) return 0.8;
    return 0.4; // Mock similarity calculation
  }

  bool _isCurrentExerciseCompleted() {
    final currentExercise = _exercises[_currentExerciseIndex];
    switch (currentExercise['type']) {
      case 'multiple_choice':
        return _selectedMultipleChoice != null;
      case 'fill_blank':
        return _fillBlankAnswer != null && _fillBlankAnswer!.isNotEmpty;
      case 'audio_matching':
        return _selectedAudioMatch != null;
      case 'image_association':
        final imageWords = currentExercise['imageWords'] as List;
        return _imageMatches.length == imageWords.length;
      case 'speech_recognition':
        return _speechResult != null && _speechResult!.isNotEmpty;
      default:
        return false;
    }
  }

  bool _isCurrentAnswerCorrect() {
    final currentExercise = _exercises[_currentExerciseIndex];
    switch (currentExercise['type']) {
      case 'multiple_choice':
        return _selectedMultipleChoice == currentExercise['correctIndex'];
      case 'fill_blank':
        return _fillBlankAnswer?.toLowerCase().trim() ==
            (currentExercise['correctAnswer'] as String).toLowerCase().trim();
      case 'audio_matching':
        return _selectedAudioMatch == currentExercise['correctIndex'];
      case 'image_association':
        final imageWords = currentExercise['imageWords'] as List;
        return imageWords.every((imageData) {
          final imageId = imageData['id'] as String;
          final correctWord = imageData['correctWord'] as String;
          return _imageMatches[imageId] == correctWord;
        });
      case 'speech_recognition':
        return _speechAccuracy != null && _speechAccuracy! >= 0.6;
      default:
        return false;
    }
  }

  void _handleActionButton() {
    if (!_showResult) {
      // Show result
      setState(() {
        _showResult = true;
      });

      // Add haptic feedback for correct answers
      if (_isCurrentAnswerCorrect()) {
        HapticFeedback.lightImpact();
        // Award XP
        final xpReward = _exercises[_currentExerciseIndex]['xpReward'] as int;
        setState(() {
          _xpPoints += xpReward;
        });
      } else {
        HapticFeedback.mediumImpact();
      }
    } else {
      // Move to next exercise or complete lesson
      if (_currentExerciseIndex < _exercises.length - 1) {
        _nextExercise();
      } else {
        _completeLesson();
      }
    }
  }

  void _nextExercise() {
    setState(() {
      _isLoading = true;
    });

    Future.delayed(const Duration(milliseconds: 500), () {
      setState(() {
        _currentExerciseIndex++;
        _showResult = false;
        _isLoading = false;

        // Reset exercise states
        _selectedMultipleChoice = null;
        _fillBlankAnswer = null;
        _selectedAudioMatch = null;
        _imageMatches.clear();
        _speechResult = null;
        _speechAccuracy = null;
      });

      // Animate transition
      _transitionController.reset();
      _transitionController.forward();
    });
  }

  void _completeLesson() {
    // Show completion celebration
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              CustomIconWidget(
                iconName: 'celebration',
                color: AppTheme.lightTheme.colorScheme.tertiary,
                size: 64,
              ),
              SizedBox(height: 2.h),
              Text(
                'Lesson Complete!',
                style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w700,
                  color: AppTheme.lightTheme.colorScheme.primary,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 1.h),
              Text(
                'You earned ${_exercises.fold(0, (sum, ex) => sum + (ex['xpReward'] as int))} XP!',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.tertiary,
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 3.h),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pop();
                  Navigator.pushReplacementNamed(context, '/home-dashboard');
                },
                child: const Text('Continue'),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildCurrentExercise() {
    final currentExercise = _exercises[_currentExerciseIndex];

    switch (currentExercise['type']) {
      case 'multiple_choice':
        return MultipleChoiceWidget(
          question: currentExercise['question'] as String,
          options: (currentExercise['options'] as List).cast<String>(),
          selectedIndex: _selectedMultipleChoice,
          correctIndex: currentExercise['correctIndex'] as int,
          showResult: _showResult,
          onOptionSelected: _handleMultipleChoiceSelection,
        );
      case 'fill_blank':
        return FillBlankWidget(
          sentence: currentExercise['sentence'] as String,
          correctAnswer: currentExercise['correctAnswer'] as String,
          suggestions: (currentExercise['suggestions'] as List).cast<String>(),
          onAnswerSubmitted: _handleFillBlankSubmission,
          showResult: _showResult,
          userAnswer: _fillBlankAnswer,
        );
      case 'audio_matching':
        return AudioMatchingWidget(
          word: currentExercise['word'] as String,
          audioUrl: currentExercise['audioUrl'] as String,
          options: (currentExercise['options'] as List).cast<String>(),
          correctIndex: currentExercise['correctIndex'] as int,
          onOptionSelected: _handleAudioMatchSelection,
          showResult: _showResult,
          selectedIndex: _selectedAudioMatch,
        );
      case 'image_association':
        return ImageAssociationWidget(
          imageWords: (currentExercise['imageWords'] as List)
              .cast<Map<String, dynamic>>(),
          wordOptions: (currentExercise['wordOptions'] as List)
              .cast<Map<String, dynamic>>(),
          onMatch: _handleImageMatch,
          showResult: _showResult,
          userMatches: _imageMatches,
        );
      case 'speech_recognition':
        return SpeechRecognitionWidget(
          targetWord: currentExercise['targetWord'] as String,
          pronunciationGuide: currentExercise['pronunciationGuide'] as String,
          onSpeechResult: _handleSpeechResult,
          showResult: _showResult,
          userSpeech: _speechResult,
          accuracyScore: _speechAccuracy,
        );
      default:
        return Container(
          padding: EdgeInsets.all(4.w),
          child: Text(
            'Unknown exercise type',
            style: AppTheme.lightTheme.textTheme.bodyLarge,
          ),
        );
    }
  }

  String _getActionButtonText() {
    if (_isLoading) return 'Loading...';
    if (!_showResult) return 'Check Answer';
    if (_currentExerciseIndex < _exercises.length - 1) return 'Continue';
    return 'Complete Lesson';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: Column(
        children: [
          LessonHeaderWidget(
            currentProgress: _currentExerciseIndex + 1,
            totalProgress: _exercises.length,
            xpPoints: _xpPoints,
            onExitPressed: _showExitDialog,
          ),
          Expanded(
            child: SlideTransition(
              position: _slideAnimation,
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    SizedBox(height: 2.h),
                    _buildCurrentExercise(),
                    SizedBox(height: 3.h),
                    CulturalContextWidget(
                      culturalData: _culturalData,
                      isExpanded: _isCulturalContextExpanded,
                      onToggleExpanded: () {
                        setState(() {
                          _isCulturalContextExpanded =
                              !_isCulturalContextExpanded;
                        });
                      },
                    ),
                    SizedBox(height: 2.h),
                  ],
                ),
              ),
            ),
          ),
          LessonActionButtonWidget(
            text: _getActionButtonText(),
            onPressed: _handleActionButton,
            isEnabled: _isCurrentExerciseCompleted(),
            isCorrect: _isCurrentAnswerCorrect(),
            showResult: _showResult,
            isLoading: _isLoading,
          ),
        ],
      ),
    );
  }
}
