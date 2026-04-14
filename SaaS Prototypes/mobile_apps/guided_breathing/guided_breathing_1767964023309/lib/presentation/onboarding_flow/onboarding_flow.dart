import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/animated_background_widget.dart';
import './widgets/goal_selection_widget.dart';
import './widgets/page_indicator_widget.dart';
import './widgets/technique_selection_widget.dart';

class OnboardingFlow extends StatefulWidget {
  const OnboardingFlow({Key? key}) : super(key: key);

  @override
  State<OnboardingFlow> createState() => _OnboardingFlowState();
}

class _OnboardingFlowState extends State<OnboardingFlow> {
  final PageController _pageController = PageController();
  int _currentPage = 0;
  String _selectedTechnique = '4-7-8';
  List<String> _selectedGoals = [];

  final List<Map<String, dynamic>> _onboardingData = [
    {
      'title': 'Welcome to BreathEase',
      'subtitle': 'Your journey to wellness begins with a single breath',
      'description':
          'Discover the power of guided breathing exercises, meditation, and sleep enhancement tools designed to reduce anxiety and improve your overall well-being.',
    },
    {
      'title': 'Try a Breathing Technique',
      'subtitle': 'Experience the calming power of controlled breathing',
      'description':
          'Choose a technique below and tap the circle to feel the rhythm. Let the gentle vibrations guide your breath.',
    },
    {
      'title': 'Set Your Wellness Goals',
      'subtitle': 'Personalize your BreathEase experience',
      'description':
          'Tell us what you\'d like to achieve so we can recommend the best content for your journey.',
    },
  ];

  void _nextPage() {
    if (_currentPage < _onboardingData.length - 1) {
      HapticFeedback.lightImpact();
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _completeOnboarding();
    }
  }

  void _previousPage() {
    if (_currentPage > 0) {
      HapticFeedback.lightImpact();
      _pageController.previousPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _skipOnboarding() {
    HapticFeedback.lightImpact();
    _completeOnboarding();
  }

  void _completeOnboarding() {
    // Save onboarding completion status and user preferences
    Navigator.pushReplacementNamed(context, '/home-dashboard');
  }

  void _onPageChanged(int page) {
    setState(() {
      _currentPage = page;
    });
  }

  void _onTechniqueSelected(String technique) {
    setState(() {
      _selectedTechnique = technique;
    });
  }

  void _onGoalsSelected(List<String> goals) {
    setState(() {
      _selectedGoals = goals;
    });
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedBackgroundWidget(
        child: SafeArea(
          child: Column(
            children: [
              // Top bar with skip button
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // Back button (only show after first page)
                    _currentPage > 0
                        ? GestureDetector(
                            onTap: _previousPage,
                            child: Container(
                              padding: EdgeInsets.all(2.w),
                              decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: CustomIconWidget(
                                iconName: 'arrow_back',
                                color:
                                    AppTheme.lightTheme.colorScheme.onSurface,
                                size: 24,
                              ),
                            ),
                          )
                        : const SizedBox(width: 40),
                    // Skip button
                    GestureDetector(
                      onTap: _skipOnboarding,
                      child: Container(
                        padding: EdgeInsets.symmetric(
                            horizontal: 4.w, vertical: 1.h),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          'Skip',
                          style: AppTheme.lightTheme.textTheme.labelLarge
                              ?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onSurface,
                            fontWeight: FontWeight.w500,
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
                  onPageChanged: _onPageChanged,
                  itemCount: _onboardingData.length,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: EdgeInsets.symmetric(horizontal: 6.w),
                      child: Column(
                        children: [
                          SizedBox(height: 4.h),

                          // Page content
                          Expanded(
                            child: SingleChildScrollView(
                              child: Column(
                                children: [
                                  // Title and description
                                  Text(
                                    _onboardingData[index]['title'],
                                    style: AppTheme
                                        .lightTheme.textTheme.headlineMedium
                                        ?.copyWith(
                                      color: AppTheme
                                          .lightTheme.colorScheme.onSurface,
                                      fontWeight: FontWeight.w700,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                  SizedBox(height: 2.h),
                                  Text(
                                    _onboardingData[index]['subtitle'],
                                    style: AppTheme
                                        .lightTheme.textTheme.titleMedium
                                        ?.copyWith(
                                      color: AppTheme.lightTheme.colorScheme
                                          .onSurfaceVariant,
                                      fontWeight: FontWeight.w500,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                  SizedBox(height: 3.h),
                                  Text(
                                    _onboardingData[index]['description'],
                                    style: AppTheme
                                        .lightTheme.textTheme.bodyLarge
                                        ?.copyWith(
                                      color: AppTheme.lightTheme.colorScheme
                                          .onSurfaceVariant,
                                      height: 1.5,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                  SizedBox(height: 4.h),

                                  // Page-specific content
                                  if (index == 0) ...[
                                    // Welcome page - Info card only
                                    SizedBox(height: 4.h),
                                    Container(
                                      padding: EdgeInsets.all(4.w),
                                      decoration: BoxDecoration(
                                        color:
                                            Colors.white.withValues(alpha: 0.1),
                                        borderRadius: BorderRadius.circular(16),
                                      ),
                                      child: Row(
                                        children: [
                                          CustomIconWidget(
                                            iconName: 'info',
                                            color: AppTheme.lightTheme
                                                .colorScheme.secondary,
                                            size: 24,
                                          ),
                                          SizedBox(width: 3.w),
                                          Expanded(
                                            child: Text(
                                              'Experience guided breathing exercises and meditation designed for your wellness journey',
                                              style: AppTheme.lightTheme
                                                  .textTheme.bodyMedium
                                                  ?.copyWith(
                                                color: AppTheme.lightTheme
                                                    .colorScheme.onSurface,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ] else if (index == 1) ...[
                                    // Technique selection page
                                    TechniqueSelectionWidget(
                                      onTechniqueSelected: _onTechniqueSelected,
                                      selectedTechnique: _selectedTechnique,
                                    ),
                                    SizedBox(height: 4.h),
                                  ] else if (index == 2) ...[
                                    // Goal selection page
                                    GoalSelectionWidget(
                                      onGoalsSelected: _onGoalsSelected,
                                      selectedGoals: _selectedGoals,
                                    ),
                                  ],

                                  SizedBox(height: 4.h),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),

              // Bottom section with page indicator and next button
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 3.h),
                child: Column(
                  children: [
                    // Page indicator
                    PageIndicatorWidget(
                      currentPage: _currentPage,
                      totalPages: _onboardingData.length,
                    ),
                    SizedBox(height: 3.h),

                    // Next/Start button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: (_currentPage == 2 && _selectedGoals.isEmpty)
                            ? null
                            : _nextPage,
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              AppTheme.lightTheme.colorScheme.secondary,
                          foregroundColor:
                              AppTheme.lightTheme.colorScheme.onSecondary,
                          padding: EdgeInsets.symmetric(vertical: 2.h),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(24),
                          ),
                          elevation: 4,
                        ),
                        child: Text(
                          _currentPage == _onboardingData.length - 1
                              ? 'Start Your Journey'
                              : 'Next',
                          style: AppTheme.lightTheme.textTheme.titleMedium
                              ?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onSecondary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
