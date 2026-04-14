import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _logoAnimationController;
  late AnimationController _loadingAnimationController;
  late Animation<double> _logoScaleAnimation;
  late Animation<double> _logoFadeAnimation;
  late Animation<double> _loadingAnimation;

  bool _isInitialized = false;
  String _loadingText = "Initializing AI systems...";
  double _loadingProgress = 0.0;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _startSplashSequence();
  }

  void _initializeAnimations() {
    // Logo animation controller
    _logoAnimationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    // Loading animation controller
    _loadingAnimationController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    // Logo scale animation
    _logoScaleAnimation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(
        parent: _logoAnimationController,
        curve: Curves.elasticOut,
      ),
    );

    // Logo fade animation
    _logoFadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _logoAnimationController,
        curve: Curves.easeInOut,
      ),
    );

    // Loading progress animation
    _loadingAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _loadingAnimationController,
        curve: Curves.easeInOut,
      ),
    );

    // Start logo animation
    _logoAnimationController.forward();
  }

  Future<void> _startSplashSequence() async {
    // Start loading animation after logo appears
    await Future.delayed(const Duration(milliseconds: 800));
    _loadingAnimationController.forward();

    // Simulate initialization tasks
    await _performInitializationTasks();

    // Navigate to appropriate screen
    await _navigateToNextScreen();
  }

  Future<void> _performInitializationTasks() async {
    final tasks = [
      {"text": "Initializing AI systems...", "duration": 600},
      {"text": "Loading personalized content...", "duration": 500},
      {"text": "Syncing user preferences...", "duration": 400},
      {"text": "Preparing offline content...", "duration": 500},
      {"text": "Finalizing setup...", "duration": 300},
    ];

    for (int i = 0; i < tasks.length; i++) {
      if (mounted) {
        setState(() {
          _loadingText = tasks[i]["text"] as String;
          _loadingProgress = (i + 1) / tasks.length;
        });
      }
      await Future.delayed(Duration(milliseconds: tasks[i]["duration"] as int));
    }

    if (mounted) {
      setState(() {
        _isInitialized = true;
      });
    }
  }

  Future<void> _navigateToNextScreen() async {
    await Future.delayed(const Duration(milliseconds: 500));

    if (!mounted) return;

    // Skip authentication check and navigate directly based on first-time user status
    final isFirstTime = await _checkFirstTimeUser();

    String nextRoute;
    if (isFirstTime) {
      nextRoute = '/onboarding-flow';
    } else {
      // Navigate directly to home dashboard without authentication
      nextRoute = '/home-dashboard';
    }

    Navigator.pushReplacementNamed(context, nextRoute);
  }

  Future<bool> _checkFirstTimeUser() async {
    // Simulate first time user check
    await Future.delayed(const Duration(milliseconds: 100));
    return true; // Mock: first time user
  }

  @override
  void dispose() {
    _logoAnimationController.dispose();
    _loadingAnimationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              AppTheme.lightTheme.colorScheme.primary,
              AppTheme.lightTheme.colorScheme.primaryContainer,
              AppTheme.lightTheme.colorScheme.secondary,
            ],
            stops: const [0.0, 0.6, 1.0],
          ),
        ),
        child: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Spacer to push content to center
              const Spacer(flex: 2),

              // Animated Logo Section
              AnimatedBuilder(
                animation: _logoAnimationController,
                builder: (context, child) {
                  return Transform.scale(
                    scale: _logoScaleAnimation.value,
                    child: Opacity(
                      opacity: _logoFadeAnimation.value,
                      child: _buildLogo(),
                    ),
                  );
                },
              ),

              SizedBox(height: 4.h),

              // App Name
              AnimatedBuilder(
                animation: _logoAnimationController,
                builder: (context, child) {
                  return Opacity(
                    opacity: _logoFadeAnimation.value,
                    child: Text(
                      'LinguaFlow',
                      style: AppTheme.lightTheme.textTheme.headlineLarge
                          ?.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 1.2,
                          ),
                    ),
                  );
                },
              ),

              SizedBox(height: 1.h),

              // Tagline
              AnimatedBuilder(
                animation: _logoAnimationController,
                builder: (context, child) {
                  return Opacity(
                    opacity: _logoFadeAnimation.value * 0.8,
                    child: Text(
                      'AI-Powered Language Learning',
                      style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                        color: Colors.white.withValues(alpha: 0.9),
                        fontWeight: FontWeight.w300,
                      ),
                    ),
                  );
                },
              ),

              const Spacer(flex: 1),

              // Loading Section
              AnimatedBuilder(
                animation: _loadingAnimationController,
                builder: (context, child) {
                  return Opacity(
                    opacity: _loadingAnimation.value,
                    child: _buildLoadingSection(),
                  );
                },
              ),

              const Spacer(flex: 1),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLogo() {
    return Container(
      width: 25.w,
      height: 25.w,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.2),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Background pattern
          Container(
            width: 20.w,
            height: 20.w,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  AppTheme.lightTheme.colorScheme.primary.withValues(
                    alpha: 0.1,
                  ),
                  AppTheme.lightTheme.colorScheme.secondary.withValues(
                    alpha: 0.1,
                  ),
                ],
              ),
              borderRadius: BorderRadius.circular(15),
            ),
          ),
          // Main logo icon
          CustomIconWidget(
            iconName: 'translate',
            color: AppTheme.lightTheme.colorScheme.primary,
            size: 12.w,
          ),
          // Accent elements
          Positioned(
            top: 2.w,
            right: 2.w,
            child: Container(
              width: 3.w,
              height: 3.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.tertiary,
                borderRadius: BorderRadius.circular(1.5.w),
              ),
            ),
          ),
          Positioned(
            bottom: 2.w,
            left: 2.w,
            child: Container(
              width: 2.w,
              height: 2.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.secondary,
                borderRadius: BorderRadius.circular(1.w),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoadingSection() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10.w),
      child: Column(
        children: [
          // Loading text
          Text(
            _loadingText,
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: Colors.white.withValues(alpha: 0.8),
              fontWeight: FontWeight.w400,
            ),
            textAlign: TextAlign.center,
          ),

          SizedBox(height: 2.h),

          // Progress bar
          Container(
            width: double.infinity,
            height: 0.8.h,
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(0.4.h),
            ),
            child: Stack(
              children: [
                AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  width: _loadingProgress * 80.w,
                  height: 0.8.h,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(0.4.h),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.white.withValues(alpha: 0.3),
                        blurRadius: 8,
                        spreadRadius: 1,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          SizedBox(height: 1.h),

          // Progress percentage
          Text(
            '${(_loadingProgress * 100).toInt()}%',
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: Colors.white.withValues(alpha: 0.6),
              fontWeight: FontWeight.w300,
            ),
          ),

          SizedBox(height: 2.h),

          // Loading indicator dots
          _buildLoadingDots(),
        ],
      ),
    );
  }

  Widget _buildLoadingDots() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(3, (index) {
        return AnimatedBuilder(
          animation: _loadingAnimationController,
          builder: (context, child) {
            final delay = index * 0.2;
            final animationValue = (_loadingAnimation.value - delay).clamp(
              0.0,
              1.0,
            );
            final opacity = (animationValue * 2).clamp(0.0, 1.0);

            return Container(
              margin: EdgeInsets.symmetric(horizontal: 0.5.w),
              child: Opacity(
                opacity: opacity,
                child: Container(
                  width: 1.5.w,
                  height: 1.5.w,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(0.75.w),
                  ),
                ),
              ),
            );
          },
        );
      }),
    );
  }
}
