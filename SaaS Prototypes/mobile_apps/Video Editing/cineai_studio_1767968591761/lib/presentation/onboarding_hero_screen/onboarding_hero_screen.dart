import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import './widgets/gradient_background_widget.dart';
import './widgets/onboarding_content_widget.dart';
import './widgets/onboarding_content_page_two_widget.dart';
import './widgets/onboarding_content_page_three_widget.dart';

/// Onboarding Hero Screen - First-time user introduction
/// Features animated floating video cards with glassmorphism effects
/// Demonstrates AI video creation capabilities through immersive storytelling
class OnboardingHeroScreen extends StatefulWidget {
  const OnboardingHeroScreen({super.key});

  @override
  State<OnboardingHeroScreen> createState() => _OnboardingHeroScreenState();
}

class _OnboardingHeroScreenState extends State<OnboardingHeroScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  @override
  void initState() {
    super.initState();
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.light,
        systemNavigationBarColor: Colors.transparent,
        systemNavigationBarIconBrightness: Brightness.light,
      ),
    );
  }

  @override
  void dispose() {
    _pageController.dispose();
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.dark,
        systemNavigationBarColor: Colors.white,
        systemNavigationBarIconBrightness: Brightness.dark,
      ),
    );
    super.dispose();
  }

  void _handleNext() {
    HapticFeedback.mediumImpact();
    _pageController.nextPage(
      duration: const Duration(milliseconds: 400),
      curve: Curves.easeInOut,
    );
  }

  void _handleGetStarted() {
    HapticFeedback.mediumImpact();
    Navigator.pushReplacementNamed(context, '/create-screen');
  }

  void _handleSkip() {
    HapticFeedback.lightImpact();
    Navigator.pushReplacementNamed(context, '/create-screen');
  }

  void _handlePageChanged(int page) {
    setState(() {
      _currentPage = page;
    });
    HapticFeedback.selectionClick();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      extendBody: true,
      body: Stack(
        children: [
          const GradientBackgroundWidget(),
          PageView(
            controller: _pageController,
            onPageChanged: _handlePageChanged,
            physics: const BouncingScrollPhysics(),
            children: [
              OnboardingContentWidget(
                currentPage: _currentPage,
                onNext: _handleNext,
                onSkip: _handleSkip,
              ),
              OnboardingContentPageTwoWidget(
                currentPage: _currentPage,
                onNext: _handleNext,
                onSkip: _handleSkip,
              ),
              OnboardingContentPageThreeWidget(
                currentPage: _currentPage,
                onGetStarted: _handleGetStarted,
                onSkip: _handleSkip,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
