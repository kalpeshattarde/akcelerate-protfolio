import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/breathing_animation_widget.dart';
import './widgets/habit_preview_card_widget.dart';
import './widgets/onboarding_page_widget.dart';
import './widgets/page_indicator_widget.dart';

/// Onboarding Flow screen with sanctuary-like habit tracking introduction
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
  final int _totalPages = 3;

  // Mock onboarding data
  final List<Map<String, dynamic>> _onboardingData = [
    {
      "title": "Welcome to Your Sanctuary",
      "description":
          "Discover a calming digital space designed for mindful habit building. Transform your daily routines into meaningful rituals with our contemplative approach.",
      "imageUrl":
          "https://images.unsplash.com/photo-1732577698099-b552fbae2163",
      "semanticLabel":
          "Peaceful mountain landscape with misty peaks and serene lake reflecting the sky at sunrise",
    },
    {
      "title": "Create Meaningful Habits",
      "description":
          "Build lasting habits through gentle guidance and emotional connection. Our intuitive creation process helps you establish routines that truly matter.",
      "imageUrl":
          "https://images.unsplash.com/photo-1644412448740-40e5b6ded2dc",
      "semanticLabel":
          "Person writing in a journal with a cup of coffee on a wooden table surrounded by plants",
    },
    {
      "title": "Track with Mindfulness",
      "description":
          "Experience progress tracking that feels like meditation. Watch your habits grow through breathing animations and gentle visual feedback.",
      "imageUrl":
          "https://images.unsplash.com/photo-1591343395902-1adcb454c4e2",
      "semanticLabel":
          "Person meditating in lotus position on a yoga mat in a bright room with natural lighting",
    },
  ];

  @override
  void initState() {
    super.initState();
    _initializeControllers();
  }

  void _initializeControllers() {
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
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
      body: FadeTransition(
        opacity: _fadeAnimation,
        child: Column(
          children: [
            // Skip button in top-right
            SafeArea(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: _skipOnboarding,
                      style: TextButton.styleFrom(
                        foregroundColor: isDark
                            ? AppTheme.textSecondaryDark
                            : AppTheme.textSecondaryLight,
                        padding: EdgeInsets.symmetric(
                            horizontal: 4.w, vertical: 1.h),
                      ),
                      child: Text(
                        'Skip',
                        style: GoogleFonts.inter(
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w500,
                          letterSpacing: 0.1,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Main content area
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: _onPageChanged,
                itemCount: _totalPages,
                itemBuilder: (context, index) {
                  return _buildPageContent(index);
                },
              ),
            ),

            // Page indicators
            Padding(
              padding: EdgeInsets.symmetric(vertical: 3.h),
              child: PageIndicatorWidget(
                currentPage: _currentPage,
                totalPages: _totalPages,
              ),
            ),

            // Bottom CTA button
            SafeArea(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
                child: SizedBox(
                  width: double.infinity,
                  height: 7.h,
                  child: ElevatedButton(
                    onPressed: _handleCTAPress,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: isDark
                          ? AppTheme.secondaryDark
                          : AppTheme.secondaryLight,
                      foregroundColor:
                          isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
                      elevation: 2.0,
                      shadowColor: (isDark ? Colors.white : Colors.black)
                          .withValues(alpha: 0.1),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(3.w),
                      ),
                    ),
                    child: Text(
                      _currentPage == _totalPages - 1
                          ? 'Get Started'
                          : 'Continue',
                      style: GoogleFonts.inter(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w500,
                        letterSpacing: 0.15,
                      ),
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

  /// Builds page content based on index
  Widget _buildPageContent(int index) {
    final pageData = _onboardingData[index];

    if (index == 1) {
      // Second page with habit creation preview
      return _buildHabitCreationPage(pageData);
    } else if (index == 2) {
      // Third page with progress tracking demonstration
      return _buildProgressTrackingPage(pageData);
    } else {
      // First page with welcome content
      return OnboardingPageWidget(
        title: pageData["title"] as String,
        description: pageData["description"] as String,
        imageUrl: pageData["imageUrl"] as String,
        semanticLabel: pageData["semanticLabel"] as String,
        isLastPage: index == _totalPages - 1,
      );
    }
  }

  /// Builds habit creation demonstration page
  Widget _buildHabitCreationPage(Map<String, dynamic> pageData) {
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 4.h),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Hero illustration
            Container(
              width: 80.w,
              height: 25.h,
              margin: EdgeInsets.only(bottom: 4.h),
              child: CustomImageWidget(
                imageUrl: pageData["imageUrl"] as String,
                width: 80.w,
                height: 25.h,
                fit: BoxFit.contain,
                semanticLabel: pageData["semanticLabel"] as String,
              ),
            ),

            // Title
            Text(
              pageData["title"] as String,
              style: GoogleFonts.playfairDisplay(
                fontSize: 20.sp,
                fontWeight: FontWeight.w600,
                color: Theme.of(context).brightness == Brightness.dark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                letterSpacing: 0.15,
                height: 1.3,
              ),
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),

            SizedBox(height: 2.h),

            // Description
            Text(
              pageData["description"] as String,
              style: GoogleFonts.inter(
                fontSize: 14.sp,
                fontWeight: FontWeight.w400,
                color: Theme.of(context).brightness == Brightness.dark
                    ? AppTheme.textSecondaryDark
                    : AppTheme.textSecondaryLight,
                letterSpacing: 0.25,
                height: 1.5,
              ),
              textAlign: TextAlign.center,
              maxLines: 4,
              overflow: TextOverflow.ellipsis,
            ),

            SizedBox(height: 4.h),

            // Interactive habit preview cards
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  HabitPreviewCardWidget(
                    habitName: "Morning Meditation",
                    habitIcon: "self_improvement",
                    progress: 0.75,
                    streak: 12,
                  ),
                  HabitPreviewCardWidget(
                    habitName: "Daily Reading",
                    habitIcon: "menu_book",
                    progress: 0.60,
                    streak: 8,
                  ),
                ],
              ),
            ),

            SizedBox(height: 4.h),
          ],
        ),
      ),
    );
  }

  /// Builds progress tracking demonstration page
  Widget _buildProgressTrackingPage(Map<String, dynamic> pageData) {
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 4.h),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Hero illustration
            Container(
              width: 80.w,
              height: 25.h,
              margin: EdgeInsets.only(bottom: 4.h),
              child: CustomImageWidget(
                imageUrl: pageData["imageUrl"] as String,
                width: 80.w,
                height: 25.h,
                fit: BoxFit.contain,
                semanticLabel: pageData["semanticLabel"] as String,
              ),
            ),

            // Title
            Text(
              pageData["title"] as String,
              style: GoogleFonts.playfairDisplay(
                fontSize: 20.sp,
                fontWeight: FontWeight.w600,
                color: Theme.of(context).brightness == Brightness.dark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                letterSpacing: 0.15,
                height: 1.3,
              ),
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),

            SizedBox(height: 2.h),

            // Description
            Text(
              pageData["description"] as String,
              style: GoogleFonts.inter(
                fontSize: 14.sp,
                fontWeight: FontWeight.w400,
                color: Theme.of(context).brightness == Brightness.dark
                    ? AppTheme.textSecondaryDark
                    : AppTheme.textSecondaryLight,
                letterSpacing: 0.25,
                height: 1.5,
              ),
              textAlign: TextAlign.center,
              maxLines: 4,
              overflow: TextOverflow.ellipsis,
            ),

            SizedBox(height: 6.h),

            // Breathing animation demonstration
            const BreathingAnimationWidget(),

            SizedBox(height: 3.h),

            // Animation description
            Text(
              'Experience mindful progress tracking',
              style: GoogleFonts.inter(
                fontSize: 12.sp,
                fontWeight: FontWeight.w400,
                color: Theme.of(context).brightness == Brightness.dark
                    ? AppTheme.textSecondaryDark
                    : AppTheme.textSecondaryLight,
                letterSpacing: 0.4,
                fontStyle: FontStyle.italic,
              ),
              textAlign: TextAlign.center,
            ),

            SizedBox(height: 4.h),
          ],
        ),
      ),
    );
  }

  /// Handles page change with haptic feedback
  void _onPageChanged(int page) {
    HapticFeedback.lightImpact();
    setState(() {
      _currentPage = page;
    });
  }

  /// Handles CTA button press
  void _handleCTAPress() {
    HapticFeedback.lightImpact();

    if (_currentPage == _totalPages - 1) {
      // Last page - navigate to authentication or dashboard
      Navigator.pushReplacementNamed(context, '/authentication-screen');
    } else {
      // Continue to next page
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  /// Handles skip button press
  void _skipOnboarding() {
    HapticFeedback.lightImpact();
    Navigator.pushReplacementNamed(context, '/authentication-screen');
  }
}
