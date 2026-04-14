import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';

/// Splash Screen with cinematic animations and AI service initialization
/// Provides branded app launch experience with glassmorphism effects
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _logoController;
  late AnimationController _cardController;
  late Animation<double> _logoScaleAnimation;
  late Animation<double> _logoFadeAnimation;
  late Animation<double> _card1Animation;
  late Animation<double> _card2Animation;
  late Animation<double> _card3Animation;

  bool _isInitializing = true;
  bool _hasError = false;
  String _statusMessage = 'Initializing AI Services...';

  @override
  void initState() {
    super.initState();
    _setupAnimations();
    _initializeApp();
  }

  void _setupAnimations() {
    // Logo animation controller
    _logoController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _logoScaleAnimation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(
        parent: _logoController,
        curve: const Interval(0.0, 0.6, curve: Curves.easeOutBack),
      ),
    );

    _logoFadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _logoController,
        curve: const Interval(0.0, 0.4, curve: Curves.easeIn),
      ),
    );

    // Floating cards animation controller
    _cardController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    _card1Animation = Tween<double>(begin: -100, end: 0).animate(
      CurvedAnimation(
        parent: _cardController,
        curve: const Interval(0.2, 0.8, curve: Curves.easeOutCubic),
      ),
    );

    _card2Animation = Tween<double>(begin: -150, end: 0).animate(
      CurvedAnimation(
        parent: _cardController,
        curve: const Interval(0.3, 0.9, curve: Curves.easeOutCubic),
      ),
    );

    _card3Animation = Tween<double>(begin: -200, end: 0).animate(
      CurvedAnimation(
        parent: _cardController,
        curve: const Interval(0.4, 1.0, curve: Curves.easeOutCubic),
      ),
    );

    // Start animations
    _logoController.forward();
    _cardController.forward();
  }

  Future<void> _initializeApp() async {
    try {
      // Simulate AI service initialization
      await Future.delayed(const Duration(milliseconds: 800));
      if (!mounted) return;

      setState(() {
        _statusMessage = 'Loading AI Models...';
      });

      await Future.delayed(const Duration(milliseconds: 800));
      if (!mounted) return;

      setState(() {
        _statusMessage = 'Preparing Video Processing...';
      });

      await Future.delayed(const Duration(milliseconds: 800));
      if (!mounted) return;

      // Check authentication status (simulated)
      final bool isAuthenticated = await _checkAuthStatus();

      // Navigate based on authentication
      if (!mounted) return;

      await Future.delayed(const Duration(milliseconds: 400));

      if (isAuthenticated) {
        Navigator.pushReplacementNamed(context, '/create-screen');
      } else {
        Navigator.pushReplacementNamed(context, '/onboarding-hero-screen');
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _hasError = true;
        _isInitializing = false;
        _statusMessage = 'Unable to connect to AI services';
      });

      // Show retry option after 5 seconds
      Timer(const Duration(seconds: 5), () {
        if (mounted && _hasError) {
          _showRetryOption();
        }
      });
    }
  }

  Future<bool> _checkAuthStatus() async {
    // Simulate authentication check
    await Future.delayed(const Duration(milliseconds: 300));
    // For demo purposes, return false to show onboarding
    return false;
  }

  void _showRetryOption() {
    if (!mounted) return;

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Text(
          'Connection Error',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        content: Text(
          'Unable to initialize AI services. Please check your internet connection and try again.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              Navigator.pushReplacementNamed(
                context,
                '/onboarding-hero-screen',
              );
            },
            child: const Text('Continue Offline'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop();
              setState(() {
                _hasError = false;
                _isInitializing = true;
                _statusMessage = 'Retrying...';
              });
              _initializeApp();
            },
            child: const Text('Retry'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _logoController.dispose();
    _cardController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    // Hide status bar for immersive experience
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);

    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [theme.colorScheme.primary, theme.colorScheme.secondary],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: Stack(
            children: [
              // Floating abstract video cards
              _buildFloatingCards(),

              // Main content
              Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Animated logo
                    _buildAnimatedLogo(theme),

                    SizedBox(height: 48.h),

                    // Loading indicator and status
                    if (_isInitializing) _buildLoadingIndicator(theme),

                    // Error state
                    if (_hasError) _buildErrorState(theme),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFloatingCards() {
    return Stack(
      children: [
        // Card 1 - Top right
        AnimatedBuilder(
          animation: _card1Animation,
          builder: (context, child) {
            return Positioned(
              top: 80.h + _card1Animation.value,
              right: 20.w,
              child: Transform.rotate(
                angle: 0.1,
                child: _buildGlassCard(
                  width: 120.w,
                  height: 80.h,
                  opacity: 0.15,
                ),
              ),
            );
          },
        ),

        // Card 2 - Left middle
        AnimatedBuilder(
          animation: _card2Animation,
          builder: (context, child) {
            return Positioned(
              top: 200.h + _card2Animation.value,
              left: 15.w,
              child: Transform.rotate(
                angle: -0.15,
                child: _buildGlassCard(
                  width: 100.w,
                  height: 140.h,
                  opacity: 0.12,
                ),
              ),
            );
          },
        ),

        // Card 3 - Bottom right
        AnimatedBuilder(
          animation: _card3Animation,
          builder: (context, child) {
            return Positioned(
              bottom: 100.h + _card3Animation.value,
              right: 30.w,
              child: Transform.rotate(
                angle: 0.2,
                child: _buildGlassCard(
                  width: 90.w,
                  height: 120.h,
                  opacity: 0.1,
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _buildGlassCard({
    required double width,
    required double height,
    required double opacity,
  }) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: opacity),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: Colors.white.withValues(alpha: 0.2),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
    );
  }

  Widget _buildAnimatedLogo(ThemeData theme) {
    return AnimatedBuilder(
      animation: _logoController,
      builder: (context, child) {
        return Opacity(
          opacity: _logoFadeAnimation.value,
          child: Transform.scale(
            scale: _logoScaleAnimation.value,
            child: Column(
              children: [
                // Logo icon
                Container(
                  width: 100.w,
                  height: 100.w,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(
                      color: Colors.white.withValues(alpha: 0.3),
                      width: 2,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.2),
                        blurRadius: 30,
                        offset: const Offset(0, 15),
                      ),
                    ],
                  ),
                  child: Center(
                    child: CustomIconWidget(
                      iconName: 'video_library',
                      color: Colors.white,
                      size: 50.sp,
                    ),
                  ),
                ),

                SizedBox(height: 24.h),

                // App name
                Text(
                  'CineAI Studio',
                  style: theme.textTheme.headlineLarge?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 1.2,
                    shadows: [
                      Shadow(
                        color: Colors.black.withValues(alpha: 0.3),
                        offset: const Offset(0, 4),
                        blurRadius: 8,
                      ),
                    ],
                  ),
                ),

                SizedBox(height: 8.h),

                // Tagline
                Text(
                  'AI-Powered Video Creation',
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: Colors.white.withValues(alpha: 0.9),
                    fontWeight: FontWeight.w400,
                    letterSpacing: 0.5,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildLoadingIndicator(ThemeData theme) {
    return Column(
      children: [
        SizedBox(
          width: 40.w,
          height: 40.w,
          child: CircularProgressIndicator(
            strokeWidth: 3,
            valueColor: AlwaysStoppedAnimation<Color>(
              Colors.white.withValues(alpha: 0.9),
            ),
          ),
        ),

        SizedBox(height: 16.h),

        Text(
          _statusMessage,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: Colors.white.withValues(alpha: 0.8),
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }

  Widget _buildErrorState(ThemeData theme) {
    return Column(
      children: [
        CustomIconWidget(
          iconName: 'error_outline',
          color: Colors.white.withValues(alpha: 0.9),
          size: 48.sp,
        ),

        SizedBox(height: 16.h),

        Padding(
          padding: EdgeInsets.symmetric(horizontal: 40.w),
          child: Text(
            _statusMessage,
            textAlign: TextAlign.center,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: Colors.white.withValues(alpha: 0.8),
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      ],
    );
  }
}
