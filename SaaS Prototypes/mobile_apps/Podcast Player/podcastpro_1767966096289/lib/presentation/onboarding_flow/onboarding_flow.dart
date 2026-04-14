import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import './widgets/animated_cta_button_widget.dart';
import './widgets/feature_demo_overlay_widget.dart';
import './widgets/onboarding_page_widget.dart';
import './widgets/progress_indicator_widget.dart';

class OnboardingFlow extends StatefulWidget {
  const OnboardingFlow({Key? key}) : super(key: key);

  @override
  State<OnboardingFlow> createState() => _OnboardingFlowState();
}

class _OnboardingFlowState extends State<OnboardingFlow>
    with TickerProviderStateMixin {
  late PageController _pageController;
  late AnimationController _parallaxController;
  late Animation<double> _parallaxAnimation;

  int _currentPage = 0;
  bool _showOverlay = false;
  String _overlayTitle = '';
  String _overlayDescription = '';
  bool _isLoading = false;

  final List<Map<String, dynamic>> _onboardingData = [
    {
      "title": "AI-Powered Recommendations",
      "description":
          "Discover your next favorite podcast with intelligent suggestions tailored to your listening habits and preferences.",
      "imageUrl":
          "https://images.unsplash.com/photo-1589254065878-42c9da997008?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "backgroundColor": const Color(0xFF6366F1),
      "demoTitle": "Smart Discovery",
      "demoDescription":
          "Our AI analyzes your listening patterns, favorite genres, and episode completion rates to suggest podcasts you'll love. Long-press any recommendation card to preview episodes instantly."
    },
    {
      "title": "Gesture-Rich Controls",
      "description":
          "Navigate effortlessly with intuitive swipe gestures, interactive waveforms, and seamless preview functionality.",
      "imageUrl":
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "backgroundColor": const Color(0xFF8B5CF6),
      "demoTitle": "Intuitive Gestures",
      "demoDescription":
          "Swipe to skip chapters, pinch to peek at episode details, and use velocity-based scrolling for natural navigation. Interactive waveforms let you scrub to any moment instantly."
    },
    {
      "title": "Offline Capabilities",
      "description":
          "Download episodes with smart quality selection and enjoy uninterrupted listening anywhere, anytime.",
      "imageUrl":
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "backgroundColor": const Color(0xFF06B6D4),
      "demoTitle": "Smart Downloads",
      "demoDescription":
          "Automatic quality adjustment based on your connection, batch downloads for entire series, and intelligent storage management to keep your favorite content always available."
    },
    {
      "title": "Smart Notifications",
      "description":
          "Stay updated with personalized alerts for new episodes, trending content, and listening reminders.",
      "imageUrl":
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "backgroundColor": const Color(0xFFEF4444),
      "demoTitle": "Intelligent Alerts",
      "demoDescription":
          "Get notified about new episodes from your subscriptions, trending podcasts in your interests, and gentle reminders to continue listening to started episodes."
    }
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _parallaxController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _parallaxAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _parallaxController,
      curve: Curves.easeInOut,
    ));

    _parallaxController.forward();
  }

  @override
  void dispose() {
    _pageController.dispose();
    _parallaxController.dispose();
    super.dispose();
  }

  void _nextPage() {
    if (_currentPage < _onboardingData.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _getStarted();
    }
  }

  void _skipOnboarding() {
    Navigator.pushReplacementNamed(context, '/login-screen');
  }

  void _getStarted() async {
    setState(() {
      _isLoading = true;
    });

    // Simulate onboarding completion
    await Future.delayed(const Duration(milliseconds: 1500));

    if (mounted) {
      Navigator.pushReplacementNamed(context, '/login-screen');
    }
  }

  void _showFeatureDemo(int pageIndex) {
    final data = _onboardingData[pageIndex];
    setState(() {
      _showOverlay = true;
      _overlayTitle = data["demoTitle"] as String;
      _overlayDescription = data["demoDescription"] as String;
    });
  }

  void _hideOverlay() {
    setState(() {
      _showOverlay = false;
    });
  }

  String _getButtonText() {
    return _currentPage == _onboardingData.length - 1 ? 'Get Started' : 'Next';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: Stack(
        children: [
          // Main content
          Column(
            children: [
              // Skip button
              SafeArea(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      GestureDetector(
                        onTap: _skipOnboarding,
                        child: Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 4.w, vertical: 1.h),
                          decoration: BoxDecoration(
                            color: AppTheme.lightTheme.colorScheme.surface
                                .withValues(alpha: 0.8),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: AppTheme.lightTheme.colorScheme.outline
                                  .withValues(alpha: 0.2),
                            ),
                          ),
                          child: Text(
                            'Skip',
                            style: AppTheme.lightTheme.textTheme.labelMedium
                                ?.copyWith(
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // PageView
              Expanded(
                child: AnimatedBuilder(
                  animation: _parallaxAnimation,
                  builder: (context, child) {
                    return Transform.translate(
                      offset: Offset(0, (1 - _parallaxAnimation.value) * 50),
                      child: Opacity(
                        opacity: _parallaxAnimation.value,
                        child: PageView.builder(
                          controller: _pageController,
                          onPageChanged: (index) {
                            setState(() {
                              _currentPage = index;
                            });
                          },
                          itemCount: _onboardingData.length,
                          itemBuilder: (context, index) {
                            final data = _onboardingData[index];
                            return OnboardingPageWidget(
                              title: data["title"] as String,
                              description: data["description"] as String,
                              imageUrl: data["imageUrl"] as String,
                              backgroundColor: data["backgroundColor"] as Color,
                              onLongPress: () => _showFeatureDemo(index),
                            );
                          },
                        ),
                      ),
                    );
                  },
                ),
              ),

              // Bottom section with progress and CTA
              SafeArea(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 3.h),
                  child: Column(
                    children: [
                      // Progress indicator
                      ProgressIndicatorWidget(
                        currentPage: _currentPage,
                        totalPages: _onboardingData.length,
                      ),

                      SizedBox(height: 4.h),

                      // CTA Button
                      AnimatedCtaButtonWidget(
                        text: _getButtonText(),
                        onPressed: _nextPage,
                        isLoading: _isLoading,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),

          // Feature demo overlay
          if (_showOverlay)
            FeatureDemoOverlayWidget(
              title: _overlayTitle,
              description: _overlayDescription,
              onClose: _hideOverlay,
            ),
        ],
      ),
    );
  }
}
