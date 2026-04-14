import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../core/app_export.dart';

/// Splash Screen provides branded app launch experience while initializing FlowFit services
/// Displays for 2-3 seconds with breathing logo animation and determines user navigation path
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _breathingController;
  late Animation<double> _breathingAnimation;
  bool _isInitializing = true;
  String _statusMessage = 'Initializing...';
  bool _hasCompletedOnboarding = false; // Default to false, will be checked during initialization

  @override
  void initState() {
    super.initState();
    _setupBreathingAnimation();
    _initializeApp();
  }

  /// Setup breathing animation for logo
  void _setupBreathingAnimation() {
    _breathingController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    _breathingAnimation = Tween<double>(begin: 0.95, end: 1.05).animate(
      CurvedAnimation(parent: _breathingController, curve: Curves.easeInOut),
    );

    _breathingController.repeat(reverse: true);
  }

  /// Initialize app services and determine navigation path
  Future<void> _initializeApp() async {
    try {
      // Simulate checking authentication status
      setState(() => _statusMessage = 'Checking authentication...');
      await Future.delayed(const Duration(milliseconds: 800));

      // Simulate loading user preferences
      setState(() => _statusMessage = 'Loading preferences...');
      await Future.delayed(const Duration(milliseconds: 600));

      // Simulate syncing health integrations
      setState(() => _statusMessage = 'Syncing health data...');
      await Future.delayed(const Duration(milliseconds: 700));

      // Simulate preparing cached workout data
      setState(() => _statusMessage = 'Preparing workouts...');
      await Future.delayed(const Duration(milliseconds: 600));

      setState(() => _isInitializing = false);

      // Navigate to appropriate screen
      if (mounted) {
        Navigator.pushReplacementNamed(
          context,
          _hasCompletedOnboarding
              ? AppRoutes
                  .navigationContainer // Changed from homeTodayScreen
              : AppRoutes.onboardingFlow,
        );
      }
    } catch (e) {
      // Handle initialization errors
      _handleInitializationError();
    }
  }

  /// Handle initialization errors with retry option
  void _handleInitializationError() {
    if (!mounted) return;

    showDialog(
      context: context,
      barrierDismissible: false,
      builder:
          (context) => AlertDialog(
            title: const Text('Connection Issue'),
            content: const Text(
              'Unable to initialize FlowFit. Please check your connection and try again.',
            ),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                  setState(() {
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
    _breathingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    // Set system UI overlay style to match brand
    SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.light,
        systemNavigationBarColor: theme.colorScheme.primary,
        systemNavigationBarIconBrightness: Brightness.light,
      ),
    );

    return Scaffold(
      body: Container(
        width: size.width,
        height: size.height,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              theme.colorScheme.primary,
              theme.colorScheme.primary.withValues(alpha: 0.8),
              theme.colorScheme.primaryContainer,
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Spacer(flex: 2),

              // Logo with breathing animation
              AnimatedBuilder(
                animation: _breathingAnimation,
                builder: (context, child) {
                  return Transform.scale(
                    scale: _breathingAnimation.value,
                    child: child,
                  );
                },
                child: Container(
                  width: 120,
                  height: 120,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(32),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.1),
                        blurRadius: 24,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: Center(
                    child: CustomIconWidget(
                      iconName: 'fitness_center',
                      color: theme.colorScheme.primary,
                      size: 64,
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 24),

              // App name
              Text(
                'FlowFit',
                style: theme.textTheme.headlineLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 1.2,
                ),
              ),

              const SizedBox(height: 8),

              // Tagline
              Text(
                'Your Daily Workout Companion',
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: Colors.white.withValues(alpha: 0.9),
                  fontWeight: FontWeight.w400,
                ),
              ),

              const Spacer(flex: 2),

              // Loading indicator and status
              if (_isInitializing) ...[
                SizedBox(
                  width: 32,
                  height: 32,
                  child: CircularProgressIndicator(
                    strokeWidth: 3,
                    valueColor: AlwaysStoppedAnimation<Color>(
                      Colors.white.withValues(alpha: 0.9),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  _statusMessage,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: Colors.white.withValues(alpha: 0.8),
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ],

              const SizedBox(height: 48),
            ],
          ),
        ),
      ),
    );
  }
}