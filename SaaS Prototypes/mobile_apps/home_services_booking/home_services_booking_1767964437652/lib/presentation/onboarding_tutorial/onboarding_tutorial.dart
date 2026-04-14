import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import './widgets/celebration_animation_widget.dart';
import './widgets/navigation_button_widget.dart';
import './widgets/page_indicator_widget.dart';
import './widgets/tutorial_page_widget.dart';

class OnboardingTutorial extends StatefulWidget {
  const OnboardingTutorial({super.key});

  @override
  State<OnboardingTutorial> createState() => _OnboardingTutorialState();
}

class _OnboardingTutorialState extends State<OnboardingTutorial>
    with TickerProviderStateMixin {
  late PageController _pageController;

  int _currentPage = 0;
  bool _showCelebration = false;
  bool _motionSensitivityEnabled = true;

  final List<Map<String, dynamic>> _tutorialData = [
    {
      "title": "Professional Cleaning Services",
      "description":
          "Book experienced cleaning professionals for deep cleaning, regular maintenance, and specialized sanitization services.",
      "imageUrl":
          "https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "gradientColors": [const Color(0xFF2563EB), const Color(0xFF10B981)],
      "isInteractive": true,
      "interactionHint": "Tap to explore cleaning services",
    },
    {
      "title": "Plumbing & Electrical Work",
      "description":
          "Connect with certified plumbers and electricians for repairs, installations, and emergency services with real-time tracking.",
      "imageUrl":
          "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1000&q=60",
      "gradientColors": [const Color(0xFFF59E0B), const Color(0xFF2563EB)],
      "isInteractive": true,
      "interactionHint": "Track your technician",
    },
    {
      "title": "Complete Home Solutions",
      "description":
          "From gardening and painting to appliance repair and maintenance - access all home services with quality assurance.",
      "imageUrl":
          "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "gradientColors": [const Color(0xFF2563EB), const Color(0xFF10B981)],
      "isInteractive": true,
      "interactionHint": "Rate your experience",
    },
  ];

  @override
  void initState() {
    super.initState();
    _initializeControllers();
    _loadMotionSettings();
  }

  void _initializeControllers() {
    _pageController = PageController();
  }

  void _loadMotionSettings() {
    // In a real app, this would load from SharedPreferences
    setState(() {
      _motionSensitivityEnabled = true;
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
      backgroundColor: AppTheme.lightTheme.colorScheme.surface,
      body: Stack(
        children: [
          _buildPageView(),
          _buildBottomNavigation(),
          CelebrationAnimationWidget(
            isVisible: _showCelebration,
            onComplete: _handleCelebrationComplete,
          ),
        ],
      ),
    );
  }

  Widget _buildPageView() {
    return PageView.builder(
      controller: _pageController,
      onPageChanged: _handlePageChanged,
      itemCount: _tutorialData.length,
      itemBuilder: (context, index) {
        final data = _tutorialData[index];
        return TutorialPageWidget(
          title: data["title"] as String,
          description: data["description"] as String,
          imageUrl: data["imageUrl"] as String,
          gradientColors: data["gradientColors"] as List<Color>,
          isInteractive: data["isInteractive"] as bool,
          interactionHint: data["interactionHint"] as String,
          onInteraction: () => _handleInteraction(index),
        );
      },
    );
  }

  Widget _buildBottomNavigation() {
    return Positioned(
      bottom: 8.h,
      left: 0,
      right: 0,
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 6.w),
        child: Column(
          children: [
            PageIndicatorWidget(
              currentPage: _currentPage,
              totalPages: _tutorialData.length,
              activeColor: Colors.white,
              inactiveColor: Colors.white.withValues(alpha: 0.4),
            ),
            SizedBox(height: 4.h),
            Row(
              children: [
                if (_currentPage > 0)
                  Expanded(
                    child: NavigationButtonWidget(
                      text: 'Previous',
                      onPressed: _handlePrevious,
                      isPrimary: false,
                    ),
                  ),
                if (_currentPage > 0) SizedBox(width: 4.w),
                Expanded(
                  child: NavigationButtonWidget(
                    text: _getNextButtonText(),
                    onPressed: _handleNext,
                    isPrimary: true,
                    icon: _getNextButtonIcon(),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _handlePageChanged(int page) {
    setState(() {
      _currentPage = page;
    });

    _triggerHapticFeedback();
  }

  void _handleInteraction(int pageIndex) {
    _triggerHapticFeedback();

    // Simulate interactive tutorial behavior
    switch (pageIndex) {
      case 0:
        _showTooltip('Great! You\'ve discovered our cleaning services');
        break;
      case 1:
        _showTooltip('Excellent! You can now track plumbers and electricians');
        break;
      case 2:
        _showTooltip('Amazing! You know about all our home services');
        break;
    }
  }

  void _handlePrevious() {
    if (_currentPage > 0) {
      _pageController.previousPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
      _triggerHapticFeedback();
    }
  }

  void _handleNext() {
    if (_currentPage < _tutorialData.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _handleGetStarted();
    }
    _triggerHapticFeedback();
  }

  void _handleGetStarted() {
    setState(() {
      _showCelebration = true;
    });
    _triggerHapticFeedback();
  }

  void _handleCelebrationComplete() {
    _navigateToServiceDashboard();
  }

  void _navigateToServiceDashboard() {
    Navigator.pushReplacementNamed(context, '/service-dashboard');
  }

  void _navigateToAuthentication() {
    Navigator.pushReplacementNamed(context, '/authentication-screen');
  }

  void _triggerHapticFeedback() {
    if (_motionSensitivityEnabled) {
      HapticFeedback.lightImpact();
    }
  }

  void _showTooltip(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          message,
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: Colors.white,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        duration: const Duration(seconds: 2),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }

  String _getNextButtonText() {
    return _currentPage == _tutorialData.length - 1 ? 'Get Started' : 'Next';
  }

  IconData? _getNextButtonIcon() {
    return _currentPage == _tutorialData.length - 1
        ? Icons.check
        : Icons.arrow_forward;
  }
}
