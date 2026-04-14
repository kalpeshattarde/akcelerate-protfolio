import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _logoController;
  late AnimationController _backgroundController;
  late AnimationController _loadingController;

  late Animation<double> _logoScaleAnimation;
  late Animation<double> _logoOpacityAnimation;
  late Animation<double> _backgroundColorAnimation;
  late Animation<double> _loadingOpacityAnimation;

  bool _isInitializing = true;
  double _initializationProgress = 0.0;

  // Mock featured podcast artwork for dynamic color extraction
  final List<String> _featuredArtwork = [
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop',
  ];

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _startInitialization();
  }

  void _initializeAnimations() {
    // Logo breathing animation with elastic physics
    _logoController = AnimationController(
        duration: const Duration(milliseconds: 2000), vsync: this);

    // Background color transition animation
    _backgroundController = AnimationController(
        duration: const Duration(milliseconds: 3000), vsync: this);

    // Loading indicator animation
    _loadingController = AnimationController(
        duration: const Duration(milliseconds: 1500), vsync: this);

    // Logo scale animation with elastic curve
    _logoScaleAnimation = Tween<double>(begin: 0.8, end: 1.0).animate(
        CurvedAnimation(parent: _logoController, curve: Curves.elasticOut));

    // Logo opacity animation
    _logoOpacityAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
        CurvedAnimation(
            parent: _logoController,
            curve: const Interval(0.0, 0.6, curve: Curves.easeOut)));

    // Background color animation for ambient lighting
    _backgroundColorAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
        CurvedAnimation(
            parent: _backgroundController, curve: Curves.easeInOut));

    // Loading indicator opacity
    _loadingOpacityAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
        CurvedAnimation(
            parent: _loadingController,
            curve: const Interval(0.3, 1.0, curve: Curves.easeIn)));

    // Start animations
    _logoController.forward();
    _backgroundController.repeat(reverse: true);
    _loadingController.forward();
  }

  Future<void> _startInitialization() async {
    try {
      // Simulate critical background tasks with realistic timing
      await _performInitializationTasks();

      // Navigate based on user state
      await _navigateToNextScreen();
    } catch (e) {
      // Handle initialization errors gracefully
      await _handleInitializationError();
    }
  }

  Future<void> _performInitializationTasks() async {
    final tasks = [
      _authenticateUserSession(),
      _loadPersonalizedRecommendations(),
      _cacheEssentialMetadata(),
      _prepareAudioPlaybackEngine(),
    ];

    for (int i = 0; i < tasks.length; i++) {
      await tasks[i];
      setState(() {
        _initializationProgress = (i + 1) / tasks.length;
      });

      // Small delay for visual feedback
      await Future.delayed(const Duration(milliseconds: 200));
    }
  }

  Future<void> _authenticateUserSession() async {
    // Simulate session authentication
    await Future.delayed(const Duration(milliseconds: 600));
  }

  Future<void> _loadPersonalizedRecommendations() async {
    // Simulate AI-powered content loading
    await Future.delayed(const Duration(milliseconds: 800));
  }

  Future<void> _cacheEssentialMetadata() async {
    // Simulate podcast metadata caching
    await Future.delayed(const Duration(milliseconds: 500));
  }

  Future<void> _prepareAudioPlaybackEngine() async {
    // Simulate audio engine initialization
    await Future.delayed(const Duration(milliseconds: 700));
  }

  Future<void> _navigateToNextScreen() async {
    setState(() {
      _isInitializing = false;
    });

    // Wait for completion animation
    await Future.delayed(const Duration(milliseconds: 500));

    // Mock user authentication state
    final bool isAuthenticated = DateTime.now().millisecond % 3 == 0;
    final bool isFirstTime = DateTime.now().millisecond % 4 == 0;

    if (!mounted) return;

    if (isFirstTime) {
      Navigator.pushReplacementNamed(context, '/onboarding-flow');
    } else if (isAuthenticated) {
      Navigator.pushReplacementNamed(context, '/home-dashboard');
    } else {
      Navigator.pushReplacementNamed(context, '/login-screen');
    }
  }

  Future<void> _handleInitializationError() async {
    // Retry after 5 seconds on network timeout
    await Future.delayed(const Duration(seconds: 5));
    if (mounted) {
      _startInitialization();
    }
  }

  Color _getDynamicBackgroundColor() {
    // Simulate dynamic color extraction from podcast artwork
    final colors = [
      const Color(0xFF1A1A1A),
      const Color(0xFF2D1B69),
      const Color(0xFF1B4332),
      const Color(0xFF7209B7),
    ];

    final colorIndex =
        (_backgroundColorAnimation.value * colors.length).floor() %
            colors.length;
    return colors[colorIndex];
  }

  @override
  void dispose() {
    _logoController.dispose();
    _backgroundController.dispose();
    _loadingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Hide status bar for full-screen cinematic experience
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersive);

    return Scaffold(
        body: AnimatedBuilder(
            animation: Listenable.merge([
              _logoController,
              _backgroundController,
              _loadingController,
            ]),
            builder: (context, child) {
              return Container(
                  width: double.infinity,
                  height: double.infinity,
                  decoration: BoxDecoration(
                      gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                        _getDynamicBackgroundColor(),
                        _getDynamicBackgroundColor().withValues(alpha: 0.8),
                        AppTheme.lightTheme.scaffoldBackgroundColor
                            .withValues(alpha: 0.9),
                      ],
                          stops: const [
                        0.0,
                        0.6,
                        1.0
                      ])),
                  child: Stack(children: [
                    // Glassmorphism backdrop blur effect
                    Positioned.fill(
                        child: Container(
                            decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: 0.1)))),

                    // Main content
                    Center(
                        child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                          // Dynamic brand logo with breathing animation
                          Transform.scale(
                              scale: _logoScaleAnimation.value,
                              child: Opacity(
                                  opacity: _logoOpacityAnimation.value,
                                  child: Container(
                                      width: 25.w,
                                      height: 25.w,
                                      decoration: BoxDecoration(
                                          shape: BoxShape.circle,
                                          gradient: LinearGradient(
                                              begin: Alignment.topLeft,
                                              end: Alignment.bottomRight,
                                              colors: [
                                                AppTheme.lightTheme.colorScheme
                                                    .secondary,
                                                AppTheme.lightTheme.colorScheme
                                                    .secondary
                                                    .withValues(alpha: 0.8),
                                              ]),
                                          boxShadow: [
                                            BoxShadow(
                                                color: AppTheme.lightTheme
                                                    .colorScheme.secondary
                                                    .withValues(alpha: 0.3),
                                                blurRadius: 20,
                                                spreadRadius: 5),
                                          ]),
                                      child: Center(
                                          child: CustomIconWidget(
                                              iconName: 'podcasts',
                                              color: Colors.white,
                                              size: 12.w))))),

                          SizedBox(height: 3.h),

                          // App name with elegant typography
                          Opacity(
                              opacity: _logoOpacityAnimation.value,
                              child: Text('PodcastPro',
                                  style: AppTheme
                                      .lightTheme.textTheme.headlineLarge
                                      ?.copyWith(
                                          color: Colors.white,
                                          fontWeight: FontWeight.w700,
                                          letterSpacing: 1.2,
                                          shadows: [
                                        Shadow(
                                            color: Colors.black
                                                .withValues(alpha: 0.3),
                                            offset: const Offset(0, 2),
                                            blurRadius: 4),
                                      ]))),

                          SizedBox(height: 1.h),

                          // Tagline
                          Opacity(
                              opacity: _logoOpacityAnimation.value * 0.8,
                              child: Text('Premium Audio Experience',
                                  style: AppTheme.lightTheme.textTheme.bodyLarge
                                      ?.copyWith(
                                          color: Colors.white
                                              .withValues(alpha: 0.9),
                                          fontWeight: FontWeight.w400,
                                          letterSpacing: 0.5))),

                          SizedBox(height: 8.h),

                          // Loading indicator with progress
                          Opacity(
                              opacity: _loadingOpacityAnimation.value,
                              child: Column(children: [
                                // Progress indicator
                                Container(
                                    width: 60.w,
                                    height: 0.5.h,
                                    decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(2),
                                        color: Colors.white
                                            .withValues(alpha: 0.2)),
                                    child: FractionallySizedBox(
                                        alignment: Alignment.centerLeft,
                                        widthFactor: _initializationProgress,
                                        child: Container(
                                            decoration: BoxDecoration(
                                                borderRadius:
                                                    BorderRadius.circular(2),
                                                gradient:
                                                    LinearGradient(colors: [
                                                  AppTheme.lightTheme
                                                      .colorScheme.secondary,
                                                  AppTheme.lightTheme
                                                      .colorScheme.secondary
                                                      .withValues(alpha: 0.8),
                                                ]))))),

                                SizedBox(height: 2.h),

                                // Loading text
                                Text(
                                    _isInitializing
                                        ? 'Initializing AI Discovery...'
                                        : 'Ready to Launch',
                                    style: AppTheme
                                        .lightTheme.textTheme.bodyMedium
                                        ?.copyWith(
                                            color: Colors.white
                                                .withValues(alpha: 0.7),
                                            fontWeight: FontWeight.w400)),
                              ])),
                        ])),

                    // Ambient lighting particles effect
                    ...List.generate(6, (index) {
                      return Positioned(
                          left: (index * 15.w) % 100.w,
                          top: (index * 20.h) % 100.h,
                          child: Opacity(
                              opacity:
                                  0.1 + (_backgroundColorAnimation.value * 0.2),
                              child: Container(
                                  width: 4.w,
                                  height: 4.w,
                                  decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color:
                                          Colors.white.withValues(alpha: 0.3),
                                      boxShadow: [
                                        BoxShadow(
                                            color: Colors.white
                                                .withValues(alpha: 0.2),
                                            blurRadius: 10,
                                            spreadRadius: 2),
                                      ]))));
                    }),
                  ]));
            }));
  }
}
