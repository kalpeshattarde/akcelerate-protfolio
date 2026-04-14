import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/benefit_card_widget.dart';
import './widgets/hero_illustration_widget.dart';

/// Welcome Onboarding Screen
/// Introduces expecting mothers to the app's supportive pregnancy tracking capabilities
/// through emotionally resonant visuals and clear value propositions
class WelcomeOnboarding extends StatefulWidget {
  const WelcomeOnboarding({super.key});

  @override
  State<WelcomeOnboarding> createState() => _WelcomeOnboardingState();
}

class _WelcomeOnboardingState extends State<WelcomeOnboarding> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  // Benefit highlights data
  final List<Map<String, dynamic>> _benefits = [
    {
      "icon": "favorite",
      "title": "Comprehensive Tracking",
      "description":
          "Monitor your pregnancy journey with detailed week-by-week insights, baby growth visualization, and milestone tracking.",
    },
    {
      "icon": "medical_services",
      "title": "Expert Guidance",
      "description":
          "Access healthcare-grade information, appointment management, and personalized wellness tips from medical professionals.",
    },
    {
      "icon": "groups",
      "title": "Community Support",
      "description":
          "Connect with other expecting mothers, share experiences, and receive emotional support throughout your journey.",
    },
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _onPageChanged(int page) {
    setState(() {
      _currentPage = page;
    });
    HapticFeedback.lightImpact();
  }

  void _navigateToNextScreen() {
    HapticFeedback.mediumImpact();
    Navigator.pushNamed(context, '/due-date-calculator');
  }

  void _navigateToExistingUser() {
    HapticFeedback.lightImpact();
    Navigator.pushNamed(context, '/main-dashboard');
  }

  void _skipOnboarding() {
    HapticFeedback.lightImpact();
    Navigator.pushNamed(context, '/due-date-calculator');
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: SafeArea(
        child: Column(
          children: [
            // Skip button in top-right corner
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: _skipOnboarding,
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 8,
                    ),
                  ),
                  child: Text(
                    'Skip',
                    style: theme.textTheme.labelLarge?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
              ),
            ),

            // Hero illustration with parallax effect
            Expanded(
              flex: 5,
              child: HeroIllustrationWidget(
                currentPage: _currentPage,
              ),
            ),

            // Content section
            Expanded(
              flex: 6,
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  children: [
                    // Large headline
                    Text(
                      'Your Pregnancy Journey Companion',
                      style: theme.textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                        color: theme.colorScheme.onSurface,
                        height: 1.3,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 24),

                    // Swipeable benefit cards carousel
                    Expanded(
                      child: PageView.builder(
                        controller: _pageController,
                        onPageChanged: _onPageChanged,
                        itemCount: _benefits.length,
                        itemBuilder: (context, index) {
                          return BenefitCardWidget(
                            icon: _benefits[index]["icon"] as String,
                            title: _benefits[index]["title"] as String,
                            description:
                                _benefits[index]["description"] as String,
                          );
                        },
                      ),
                    ),

                    // Page indicators
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      child: SmoothPageIndicator(
                        controller: _pageController,
                        count: _benefits.length,
                        effect: ExpandingDotsEffect(
                          activeDotColor: theme.colorScheme.primary,
                          dotColor:
                              theme.colorScheme.primary.withValues(alpha: 0.3),
                          dotHeight: 8,
                          dotWidth: 8,
                          expansionFactor: 3,
                          spacing: 8,
                        ),
                      ),
                    ),

                    // Primary CTA button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: _navigateToNextScreen,
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        child: Text(
                          'Get Started',
                          style: theme.textTheme.titleMedium?.copyWith(
                            color: theme.colorScheme.onPrimary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),

                    // Secondary link for existing users
                    TextButton(
                      onPressed: _navigateToExistingUser,
                      style: TextButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                      child: Text(
                        'I\'m Already Tracking',
                        style: theme.textTheme.labelLarge?.copyWith(
                          color: theme.colorScheme.primary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Trust signals and certifications
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CustomIconWidget(
                          iconName: 'verified_user',
                          size: 16,
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Healthcare-Grade Accuracy',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                        const SizedBox(width: 16),
                        CustomIconWidget(
                          iconName: 'lock',
                          size: 16,
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Privacy Protected',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
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
