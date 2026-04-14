import 'dart:async';

import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/goal_selection_widget.dart';
import './widgets/onboarding_page_widget.dart';
import './widgets/page_indicator_widget.dart';
import './widgets/preference_selection_widget.dart';

class OnboardingFlow extends StatefulWidget {
  const OnboardingFlow({Key? key}) : super(key: key);

  @override
  State<OnboardingFlow> createState() => _OnboardingFlowState();
}

class _OnboardingFlowState extends State<OnboardingFlow>
    with TickerProviderStateMixin {
  late PageController _pageController;
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;
  Timer? _autoAdvanceTimer;

  int _currentPage = 0;
  String? _selectedGoal;
  String _selectedExperience = 'beginner';
  int _selectedDuration = 10;
  bool _showGoalSelection = false;
  bool _showPreferenceSelection = false;

  final List<Map<String, dynamic>> _onboardingData = [
    {
      'title': 'Discover Inner Peace',
      'description':
          'Begin your journey to mindfulness with guided meditations designed to calm your mind and reduce stress.',
      'imageUrl':
          'https://images.unsplash.com/photo-1694715728232-eec73eda4aca',
      'semanticLabel':
          'Peaceful woman sitting in lotus position meditating in a serene natural setting with soft morning light',
    },
    {
      'title': 'Master Your Breath',
      'description':
          'Learn powerful breathing techniques that will help you find balance and enhance your focus throughout the day.',
      'imageUrl':
          'https://images.unsplash.com/photo-1679771650989-1d79c12c79a9',
      'semanticLabel':
          'Close-up of hands in mudra position during meditation with soft natural lighting and peaceful atmosphere',
    },
    {
      'title': 'Track Your Progress',
      'description':
          'Monitor your meditation journey with detailed insights and celebrate your achievements along the way.',
      'imageUrl':
          'https://images.unsplash.com/photo-1708447135682-0d3d1c385ce2',
      'semanticLabel':
          'Meditation progress tracking interface showing charts and statistics on a modern smartphone screen',
    },
    {
      'title': 'Premium Experience',
      'description':
          'Access exclusive content, advanced features, and personalized recommendations for your wellness journey.',
      'imageUrl':
          'https://images.unsplash.com/photo-1675448803748-3a8b6ee2ce77',
      'semanticLabel':
          'Elegant meditation space with premium cushions, candles, and plants creating a luxurious wellness environment',
    },
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _fadeController, curve: Curves.easeInOut),
    );
    _fadeController.forward();
    _startAutoAdvanceTimer();
  }

  @override
  void dispose() {
    _pageController.dispose();
    _fadeController.dispose();
    _autoAdvanceTimer?.cancel();
    super.dispose();
  }

  void _startAutoAdvanceTimer() {
    _autoAdvanceTimer?.cancel();
    _autoAdvanceTimer = Timer(const Duration(seconds: 8), () {
      if (_currentPage < _onboardingData.length - 1 &&
          !_showGoalSelection &&
          !_showPreferenceSelection) {
        _nextPage();
      }
    });
  }

  void _nextPage() {
    if (_currentPage < _onboardingData.length - 1) {
      setState(() {
        _currentPage++;
      });
      _pageController.animateToPage(
        _currentPage,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
      _startAutoAdvanceTimer();
    } else if (_currentPage == _onboardingData.length - 1 &&
        !_showGoalSelection) {
      setState(() {
        _showGoalSelection = true;
      });
    }
  }

  void _previousPage() {
    if (_showPreferenceSelection) {
      setState(() {
        _showPreferenceSelection = false;
        _showGoalSelection = true;
      });
    } else if (_showGoalSelection) {
      setState(() {
        _showGoalSelection = false;
      });
    } else if (_currentPage > 0) {
      setState(() {
        _currentPage--;
      });
      _pageController.animateToPage(
        _currentPage,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
      _startAutoAdvanceTimer();
    }
  }

  void _skipOnboarding() {
    Navigator.pushReplacementNamed(context, '/authentication-screen');
  }

  void _onGoalSelected(String goal) {
    setState(() {
      _selectedGoal = goal;
      _showGoalSelection = false;
      _showPreferenceSelection = true;
    });
  }

  void _onPreferencesSelected(String experience, int duration) {
    setState(() {
      _selectedExperience = experience;
      _selectedDuration = duration;
    });

    // Save preferences and navigate to authentication
    _completeOnboarding();
  }

  void _completeOnboarding() {
    // Here you would typically save the user preferences
    // For now, we'll just navigate to the authentication screen
    Navigator.pushReplacementNamed(context, '/authentication-screen');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: WillPopScope(
        onWillPop: () async {
          if (_showPreferenceSelection ||
              _showGoalSelection ||
              _currentPage > 0) {
            _previousPage();
            return false;
          }
          return true;
        },
        child: Stack(
          children: [
            // Background gradient
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    AppTheme.lightTheme.scaffoldBackgroundColor,
                    AppTheme.lightTheme.colorScheme.surface
                        .withValues(alpha: 0.8),
                  ],
                ),
              ),
            ),

            // Main content
            FadeTransition(
              opacity: _fadeAnimation,
              child: _showPreferenceSelection
                  ? PreferenceSelectionWidget(
                      onPreferencesSelected: _onPreferencesSelected,
                    )
                  : _showGoalSelection
                      ? GoalSelectionWidget(
                          onGoalSelected: _onGoalSelected,
                        )
                      : PageView.builder(
                          controller: _pageController,
                          onPageChanged: (index) {
                            setState(() {
                              _currentPage = index;
                            });
                            _startAutoAdvanceTimer();
                          },
                          itemCount: _onboardingData.length,
                          itemBuilder: (context, index) {
                            final data = _onboardingData[index];
                            return OnboardingPageWidget(
                              title: data['title'],
                              description: data['description'],
                              imageUrl: data['imageUrl'],
                              semanticLabel: data['semanticLabel'],
                              isLastPage: index == _onboardingData.length - 1,
                              onGetStarted: _nextPage,
                            );
                          },
                        ),
            ),

            // Skip button
            if (!_showGoalSelection && !_showPreferenceSelection)
              Positioned(
                top: MediaQuery.of(context).padding.top + 4.h,
                right: 4.w,
                child: Container(
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.surface
                        .withValues(alpha: 0.9),
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.lightTheme.colorScheme.shadow
                            .withValues(alpha: 0.15),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: TextButton(
                    onPressed: _skipOnboarding,
                    style: TextButton.styleFrom(
                      foregroundColor:
                          AppTheme.lightTheme.colorScheme.onSurface,
                      padding: EdgeInsets.symmetric(
                          horizontal: 5.w, vertical: 1.2.h),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    child: Text(
                      'Skip',
                      style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                      ),
                    ),
                  ),
                ),
              ),

            // Back button for goal and preference screens
            if (_showGoalSelection || _showPreferenceSelection)
              Positioned(
                top: MediaQuery.of(context).padding.top + 2.h,
                left: 6.w,
                child: GestureDetector(
                  onTap: _previousPage,
                  child: Container(
                    width: 10.w,
                    height: 10.w,
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.lightTheme.colorScheme.shadow
                              .withValues(alpha: 0.1),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Center(
                      child: CustomIconWidget(
                        iconName: 'arrow_back',
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                        size: 5.w,
                      ),
                    ),
                  ),
                ),
              ),

            // Page indicators
            if (!_showGoalSelection && !_showPreferenceSelection)
              Positioned(
                bottom: 12.h,
                left: 0,
                right: 0,
                child: PageIndicatorWidget(
                  currentPage: _currentPage,
                  totalPages: _onboardingData.length,
                ),
              ),

            // Next button for non-last pages
            if (!_showGoalSelection &&
                !_showPreferenceSelection &&
                _currentPage < _onboardingData.length - 1)
              Positioned(
                bottom: 6.h,
                right: 6.w,
                child: GestureDetector(
                  onTap: _nextPage,
                  child: Container(
                    width: 14.w,
                    height: 14.w,
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.secondary,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.3),
                          blurRadius: 12,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Center(
                      child: CustomIconWidget(
                        iconName: 'arrow_forward',
                        color: AppTheme.lightTheme.colorScheme.onSecondary,
                        size: 6.w,
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
