import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late AnimationController _progressController;
  late AnimationController _fadeController;

  late Animation<double> _breathingAnimation;
  late Animation<double> _progressAnimation;
  late Animation<double> _fadeAnimation;

  bool _isInitialized = false;
  bool _showRetry = false;
  String _statusText = 'Initializing...';

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _startSplashSequence();
  }

  void _initializeAnimations() {
    // Breathing animation for logo
    _breathingController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    );

    _breathingAnimation = Tween<double>(
      begin: 0.95,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _breathingController,
      curve: Curves.easeInOut,
    ));

    // Progress animation
    _progressController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );

    _progressAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _progressController,
      curve: Curves.easeInOut,
    ));

    // Fade animation for transitions
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeIn,
    ));

    // Start animations
    _breathingController.repeat(reverse: true);
    _fadeController.forward();
  }

  Future<void> _startSplashSequence() async {
    try {
      // Start progress animation
      _progressController.forward();

      // Simulate initialization tasks
      await _performInitializationTasks();

      if (mounted) {
        setState(() {
          _isInitialized = true;
          _statusText = 'Welcome to Habit Guardian';
        });

        // Wait a moment before navigation
        await Future.delayed(const Duration(milliseconds: 800));

        if (mounted) {
          _navigateToNextScreen();
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _showRetry = true;
          _statusText = 'Connection timeout';
        });
      }
    }
  }

  Future<void> _performInitializationTasks() async {
    // Simulate checking authentication status
    await Future.delayed(const Duration(milliseconds: 800));

    // Simulate loading user preferences
    await Future.delayed(const Duration(milliseconds: 600));

    // Simulate syncing habit data
    await Future.delayed(const Duration(milliseconds: 800));

    // Simulate preparing cached content
    await Future.delayed(const Duration(milliseconds: 400));
  }

  void _navigateToNextScreen() {
    // Mock authentication check - in real app, check actual auth status
    final bool isAuthenticated = false; // Mock value
    final bool isFirstTime = true; // Mock value

    String nextRoute;
    if (isAuthenticated) {
      nextRoute = '/habit-dashboard';
    } else if (isFirstTime) {
      nextRoute = '/onboarding-flow';
    } else {
      nextRoute = '/authentication-screen';
    }

    Navigator.pushReplacementNamed(context, nextRoute);
  }

  void _retryInitialization() {
    setState(() {
      _showRetry = false;
      _statusText = 'Retrying...';
    });

    _progressController.reset();
    _startSplashSequence();
  }

  @override
  void dispose() {
    _breathingController.dispose();
    _progressController.dispose();
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.dark,
          statusBarBrightness: Brightness.light,
        ),
        child: SafeArea(
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: SizedBox(
              width: 100.w,
              height: 100.h,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Spacer to push content to center
                  SizedBox(height: 20.h),

                  // Animated Logo Section
                  _buildAnimatedLogo(),

                  SizedBox(height: 8.h),

                  // App Name
                  _buildAppName(),

                  SizedBox(height: 4.h),

                  // Tagline
                  _buildTagline(),

                  // Spacer to push progress to bottom
                  const Spacer(),

                  // Progress Section
                  _buildProgressSection(),

                  SizedBox(height: 8.h),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAnimatedLogo() {
    return AnimatedBuilder(
      animation: _breathingAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _breathingAnimation.value,
          child: Container(
            width: 32.w,
            height: 32.w,
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.secondary,
              borderRadius: BorderRadius.circular(16.w),
              boxShadow: [
                BoxShadow(
                  color: AppTheme.lightTheme.colorScheme.secondary
                      .withValues(alpha: 0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            child: Center(
              child: CustomIconWidget(
                iconName: 'self_improvement',
                color: AppTheme.lightTheme.colorScheme.onSecondary,
                size: 16.w,
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildAppName() {
    return Text(
      'Habit Guardian',
      style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
        color: AppTheme.lightTheme.colorScheme.onSurface,
        fontWeight: FontWeight.w700,
        letterSpacing: -0.5,
      ),
      textAlign: TextAlign.center,
    );
  }

  Widget _buildTagline() {
    return Text(
      'Your sanctuary for mindful habits',
      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.2,
      ),
      textAlign: TextAlign.center,
    );
  }

  Widget _buildProgressSection() {
    return Container(
      width: 80.w,
      child: Column(
        children: [
          // Status Text
          Text(
            _statusText,
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              fontWeight: FontWeight.w500,
            ),
            textAlign: TextAlign.center,
          ),

          SizedBox(height: 2.h),

          // Progress Indicator or Retry Button
          _showRetry ? _buildRetryButton() : _buildProgressIndicator(),
        ],
      ),
    );
  }

  Widget _buildProgressIndicator() {
    return Container(
      height: 4,
      width: 60.w,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(2),
      ),
      child: AnimatedBuilder(
        animation: _progressAnimation,
        builder: (context, child) {
          return FractionallySizedBox(
            alignment: Alignment.centerLeft,
            widthFactor: _progressAnimation.value,
            child: Container(
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.tertiary,
                borderRadius: BorderRadius.circular(2),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.lightTheme.colorScheme.tertiary
                        .withValues(alpha: 0.4),
                    blurRadius: 4,
                    offset: const Offset(0, 1),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildRetryButton() {
    return ElevatedButton.icon(
      onPressed: _retryInitialization,
      icon: CustomIconWidget(
        iconName: 'refresh',
        color: AppTheme.lightTheme.colorScheme.onSecondary,
        size: 18,
      ),
      label: Text(
        'Retry',
        style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
          color: AppTheme.lightTheme.colorScheme.onSecondary,
          fontWeight: FontWeight.w600,
        ),
      ),
      style: ElevatedButton.styleFrom(
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        foregroundColor: AppTheme.lightTheme.colorScheme.onSecondary,
        padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 1.5.h),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        elevation: 2,
      ),
    );
  }
}
