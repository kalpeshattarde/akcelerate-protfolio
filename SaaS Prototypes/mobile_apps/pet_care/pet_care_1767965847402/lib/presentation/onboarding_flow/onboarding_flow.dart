import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import './widgets/interactive_demo_widget.dart';
import './widgets/navigation_buttons_widget.dart';
import './widgets/onboarding_page_widget.dart';
import './widgets/page_indicator_widget.dart';

class OnboardingFlow extends StatefulWidget {
  const OnboardingFlow({super.key});

  @override
  State<OnboardingFlow> createState() => _OnboardingFlowState();
}

class _OnboardingFlowState extends State<OnboardingFlow>
    with TickerProviderStateMixin {
  late PageController _pageController;
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;

  int _currentPage = 0;
  bool _showInteractiveDemo = false;

  // Mock data for onboarding pages
  final List<Map<String, dynamic>> _onboardingData = [
    {
      "title": "Track Your Pet's Health Journey",
      "subtitle":
          "Keep comprehensive medical records, vaccination schedules, and health analytics all in one secure place.",
      "image":
          "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "bulletPoints": [
        "Complete medical history tracking with photo documentation",
        "Automated vaccination reminders and schedule management",
        "Visual health trends and analytics for better care decisions"
      ],
      "demoType": "swipe"
    },
    {
      "title": "Never Miss Important Care Tasks",
      "subtitle":
          "Smart reminders ensure your pet gets medications, meals, and grooming exactly when needed.",
      "image":
          "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "bulletPoints": [
        "Medication scheduling with dosage instructions and refill alerts",
        "Feeding schedule management with portion size tracking",
        "Grooming reminders for baths, nail trims, and dental care"
      ],
      "demoType": "longPress"
    },
    {
      "title": "Comprehensive Health Analytics",
      "subtitle":
          "Visualize your pet's health patterns, weight trends, and activity levels with detailed charts and insights.",
      "image":
          "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "bulletPoints": [
        "Weight and growth tracking with visual chart displays",
        "Exercise logging for walks, playtime, and activity levels",
        "Health trend analytics with patterns and recommendations"
      ],
      "demoType": "pullRefresh"
    },
    {
      "title": "Emergency Resources & Quick Access",
      "subtitle":
          "Instant access to emergency contacts, veterinary clinics, and critical pet information when you need it most.",
      "image":
          "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "bulletPoints": [
        "Emergency contact quick access for vet clinics and poison control",
        "Weather-based outdoor activity notifications and safety alerts",
        "Veterinarian report generation and PDF export for appointments"
      ],
      "demoType": "swipe"
    },
    {
      "title": "Manage Multiple Pets Effortlessly",
      "subtitle":
          "Perfect for families with multiple pets - organize care routines, share access with family members, and track expenses.",
      "image":
          "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "bulletPoints": [
        "Multiple pet profile creation with breed, age, and microchip data",
        "Family sharing with multiple user access and care delegation",
        "Pet expense tracking for food, medical bills, and supplies"
      ],
      "demoType": "longPress"
    }
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
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
  }

  @override
  void dispose() {
    _pageController.dispose();
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.colorScheme.surface,
      body: SafeArea(
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: Column(
            children: [
              // Skip button in top right
              _buildTopBar(),

              // Main content
              Expanded(
                child: PageView.builder(
                  controller: _pageController,
                  onPageChanged: _onPageChanged,
                  itemCount: _onboardingData.length,
                  itemBuilder: (context, index) {
                    final pageData = _onboardingData[index];
                    return OnboardingPageWidget(
                      imagePath: pageData["image"],
                      title: pageData["title"],
                      subtitle: pageData["subtitle"],
                      bulletPoints: List<String>.from(pageData["bulletPoints"]),
                      showInteractiveDemo:
                          _showInteractiveDemo && index == _currentPage,
                      onInteraction: () =>
                          _handleInteractiveDemo(pageData["demoType"]),
                    );
                  },
                ),
              ),

              // Interactive demo overlay
              if (_showInteractiveDemo)
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 6.w),
                  child: InteractiveDemoWidget(
                    demoType: _onboardingData[_currentPage]["demoType"],
                    onComplete: () {
                      setState(() {
                        _showInteractiveDemo = false;
                      });
                      HapticFeedback.mediumImpact();
                    },
                  ),
                ),

              SizedBox(height: 2.h),

              // Page indicator
              PageIndicatorWidget(
                currentPage: _currentPage,
                totalPages: _onboardingData.length,
                pageController: _pageController,
              ),

              // Navigation buttons
              NavigationButtonsWidget(
                currentPage: _currentPage,
                totalPages: _onboardingData.length,
                onNext: _nextPage,
                onSkip: _skipOnboarding,
                onGetStarted: _completeOnboarding,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTopBar() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 1.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Logo or app name
          Text(
            'PetCare Tracker',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.primary,
              fontWeight: FontWeight.w700,
            ),
          ),

          // Skip button
          if (_currentPage < _onboardingData.length - 1)
            TextButton(
              onPressed: _skipOnboarding,
              child: Text(
                'Skip',
                style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
        ],
      ),
    );
  }

  void _onPageChanged(int page) {
    setState(() {
      _currentPage = page;
      _showInteractiveDemo = false;
    });

    // Haptic feedback on page change
    HapticFeedback.selectionClick();
  }

  void _nextPage() {
    if (_currentPage < _onboardingData.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _skipOnboarding() {
    // Navigate to home dashboard
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/home-dashboard',
      (route) => false,
    );
  }

  void _completeOnboarding() {
    // Mark onboarding as completed and navigate to home
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/home-dashboard',
      (route) => false,
    );
  }

  void _handleInteractiveDemo(String demoType) {
    setState(() {
      _showInteractiveDemo = true;
    });

    // Provide haptic feedback
    HapticFeedback.lightImpact();
  }
}
