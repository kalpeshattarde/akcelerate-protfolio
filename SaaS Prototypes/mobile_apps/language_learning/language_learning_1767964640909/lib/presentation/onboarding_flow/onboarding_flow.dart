import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/ai_adaptation_widget.dart';
import './widgets/gamification_widget.dart';
import './widgets/language_selection_widget.dart';
import './widgets/learning_goals_widget.dart';
import './widgets/speech_features_widget.dart';

class OnboardingFlow extends StatefulWidget {
  const OnboardingFlow({Key? key}) : super(key: key);

  @override
  State<OnboardingFlow> createState() => _OnboardingFlowState();
}

class _OnboardingFlowState extends State<OnboardingFlow> {
  final PageController _pageController = PageController();
  int currentPage = 0;
  String selectedLanguage = 'es';
  int dailyMinutes = 15;
  String learningGoal = 'Travel';

  final List<Map<String, dynamic>> onboardingData = [
    {
      "title": "Welcome to LinguaFlow",
      "subtitle": "AI-powered language learning that adapts to you",
      "type": "language_selection",
    },
    {
      "title": "Smart AI Adaptation",
      "subtitle": "Personalized learning experience",
      "type": "ai_adaptation",
    },
    {
      "title": "Gamified Experience",
      "subtitle": "Stay motivated with rewards and achievements",
      "type": "gamification",
    },
    {
      "title": "Speech Recognition",
      "subtitle": "Perfect your pronunciation with AI feedback",
      "type": "speech_features",
    },
    {
      "title": "Set Your Goals",
      "subtitle": "Customize your learning journey",
      "type": "learning_goals",
    },
  ];

  void _nextPage() {
    if (currentPage < onboardingData.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _completeOnboarding();
    }
  }

  void _previousPage() {
    if (currentPage > 0) {
      _pageController.previousPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _skipOnboarding() {
    // Navigate directly to bottom navigation wrapper instead of home dashboard
    Navigator.pushReplacementNamed(context, '/main');
  }

  void _completeOnboarding() {
    // Navigate directly to bottom navigation wrapper instead of home dashboard
    Navigator.pushReplacementNamed(context, '/main');
  }

  void _onLanguageSelected(String languageCode) {
    setState(() {
      selectedLanguage = languageCode;
    });
  }

  void _onGoalSelected(int minutes, String goal) {
    setState(() {
      dailyMinutes = minutes;
      learningGoal = goal;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: SafeArea(
        child: Column(
          children: [
            // Top bar with skip button
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Back button (only show after first page)
                  currentPage > 0
                      ? GestureDetector(
                        onTap: _previousPage,
                        child: Container(
                          padding: EdgeInsets.all(2.w),
                          decoration: BoxDecoration(
                            color: AppTheme.lightTheme.colorScheme.surface,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(
                              color: AppTheme.lightTheme.colorScheme.outline
                                  .withValues(alpha: 0.2),
                            ),
                          ),
                          child: CustomIconWidget(
                            iconName: 'arrow_back',
                            color: AppTheme.lightTheme.colorScheme.onSurface,
                            size: 5.w,
                          ),
                        ),
                      )
                      : SizedBox(width: 10.w),

                  // Page indicator
                  Row(
                    children: List.generate(
                      onboardingData.length,
                      (index) => AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        margin: EdgeInsets.symmetric(horizontal: 1.w),
                        height: 1.h,
                        width: index == currentPage ? 6.w : 2.w,
                        decoration: BoxDecoration(
                          color:
                              index == currentPage
                                  ? AppTheme.lightTheme.colorScheme.primary
                                  : AppTheme.lightTheme.colorScheme.primary
                                      .withValues(alpha: 0.3),
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                    ),
                  ),

                  // Skip button
                  GestureDetector(
                    onTap: _skipOnboarding,
                    child: Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 4.w,
                        vertical: 2.w,
                      ),
                      decoration: BoxDecoration(
                        color: AppTheme.lightTheme.colorScheme.surface,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: AppTheme.lightTheme.colorScheme.outline
                              .withValues(alpha: 0.2),
                        ),
                      ),
                      child: Text(
                        'Skip',
                        style: AppTheme.lightTheme.textTheme.bodyMedium
                            ?.copyWith(
                              fontWeight: FontWeight.w500,
                              color: AppTheme.lightTheme.colorScheme.onSurface
                                  .withValues(alpha: 0.7),
                            ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Main content
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (index) {
                  setState(() {
                    currentPage = index;
                  });
                },
                itemCount: onboardingData.length,
                itemBuilder: (context, index) {
                  final data = onboardingData[index];

                  return SingleChildScrollView(
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    child: Column(
                      children: [
                        SizedBox(height: 2.h),

                        // Content based on type
                        _buildPageContent(data["type"] as String),

                        SizedBox(height: 4.h),
                      ],
                    ),
                  );
                },
              ),
            ),

            // Bottom navigation
            Container(
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.surface,
                border: Border(
                  top: BorderSide(
                    color: AppTheme.lightTheme.colorScheme.outline.withValues(
                      alpha: 0.1,
                    ),
                  ),
                ),
              ),
              child: Row(
                children: [
                  // Progress text
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          '${currentPage + 1} of ${onboardingData.length}',
                          style: AppTheme.lightTheme.textTheme.bodySmall
                              ?.copyWith(
                                color: AppTheme.lightTheme.colorScheme.onSurface
                                    .withValues(alpha: 0.6),
                              ),
                        ),
                        Text(
                          onboardingData[currentPage]["title"] as String,
                          style: AppTheme.lightTheme.textTheme.titleMedium
                              ?.copyWith(fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                  ),

                  SizedBox(width: 4.w),

                  // Next/Get Started button
                  ElevatedButton(
                    onPressed: _nextPage,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.lightTheme.colorScheme.primary,
                      foregroundColor:
                          AppTheme.lightTheme.colorScheme.onPrimary,
                      padding: EdgeInsets.symmetric(
                        horizontal: 6.w,
                        vertical: 3.w,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(25),
                      ),
                      elevation: 2,
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          currentPage == onboardingData.length - 1
                              ? 'Get Started'
                              : 'Next',
                          style: AppTheme.lightTheme.textTheme.titleMedium
                              ?.copyWith(
                                fontWeight: FontWeight.w600,
                                color:
                                    AppTheme.lightTheme.colorScheme.onPrimary,
                              ),
                        ),
                        SizedBox(width: 2.w),
                        CustomIconWidget(
                          iconName:
                              currentPage == onboardingData.length - 1
                                  ? 'rocket_launch'
                                  : 'arrow_forward',
                          color: AppTheme.lightTheme.colorScheme.onPrimary,
                          size: 5.w,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPageContent(String type) {
    switch (type) {
      case 'language_selection':
        return LanguageSelectionWidget(onLanguageSelected: _onLanguageSelected);
      case 'ai_adaptation':
        return const AiAdaptationWidget();
      case 'gamification':
        return const GamificationWidget();
      case 'speech_features':
        return const SpeechFeaturesWidget();
      case 'learning_goals':
        return LearningGoalsWidget(onGoalSelected: _onGoalSelected);
      default:
        return Container(
          height: 50.h,
          child: Center(
            child: Text(
              'Welcome to LinguaFlow!',
              style: AppTheme.lightTheme.textTheme.headlineLarge?.copyWith(
                fontWeight: FontWeight.bold,
                color: AppTheme.lightTheme.colorScheme.primary,
              ),
            ),
          ),
        );
    }
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }
}
