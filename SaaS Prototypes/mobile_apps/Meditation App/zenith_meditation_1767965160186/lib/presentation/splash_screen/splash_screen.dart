import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/breathing_logo_widget.dart';
import './widgets/gradient_background_widget.dart';
import './widgets/loading_indicator_widget.dart';
import './widgets/retry_button_widget.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;

  double _loadingProgress = 0.0;
  bool _showRetryButton = false;
  bool _isInitializing = true;
  String _currentTask = 'Initializing meditation services...';

  final List<String> _initializationTasks = [
    'Checking authentication status...',
    'Loading user preferences...',
    'Syncing meditation content...',
    'Preparing offline capabilities...',
    'Finalizing setup...',
  ];

  @override
  void initState() {
    super.initState();
    _setupAnimations();
    _initializeApp();
  }

  void _setupAnimations() {
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 800),
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

  Future<void> _initializeApp() async {
    try {
      setState(() {
        _isInitializing = true;
        _showRetryButton = false;
        _loadingProgress = 0.0;
      });

      // Check network connectivity
      final connectivityResult = await Connectivity().checkConnectivity();
      if (connectivityResult == ConnectivityResult.none) {
        await Future.delayed(const Duration(seconds: 5));
        if (mounted) {
          setState(() {
            _showRetryButton = true;
            _isInitializing = false;
          });
        }
        return;
      }

      // Simulate initialization tasks with real operations
      for (int i = 0; i < _initializationTasks.length; i++) {
        if (!mounted) return;

        setState(() {
          _currentTask = _initializationTasks[i];
          _loadingProgress = (i + 1) / _initializationTasks.length;
        });

        await _performInitializationTask(i);
        await Future.delayed(const Duration(milliseconds: 600));
      }

      // Complete initialization
      await Future.delayed(const Duration(milliseconds: 500));

      if (mounted) {
        await _navigateToNextScreen();
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _showRetryButton = true;
          _isInitializing = false;
        });
      }
    }
  }

  Future<void> _performInitializationTask(int taskIndex) async {
    switch (taskIndex) {
      case 0: // Check authentication status
        final prefs = await SharedPreferences.getInstance();
        final isLoggedIn = prefs.getBool('isLoggedIn') ?? false;
        await prefs.setBool('authChecked', true);
        break;
      case 1: // Load user preferences
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString(
            'lastInitialized', DateTime.now().toIso8601String());
        break;
      case 2: // Sync meditation content
        // Simulate content sync
        await Future.delayed(const Duration(milliseconds: 800));
        break;
      case 3: // Prepare offline capabilities
        final prefs = await SharedPreferences.getInstance();
        await prefs.setBool('offlineReady', true);
        break;
      case 4: // Finalize setup
        await Future.delayed(const Duration(milliseconds: 400));
        break;
    }
  }

  Future<void> _navigateToNextScreen() async {
    final prefs = await SharedPreferences.getInstance();
    final isFirstTime = prefs.getBool('isFirstTime') ?? true;
    final isLoggedIn = prefs.getBool('isLoggedIn') ?? false;

    // Add haptic feedback
    HapticFeedback.lightImpact();

    String nextRoute;
    if (isFirstTime) {
      nextRoute = '/onboarding-flow';
    } else if (!isLoggedIn) {
      nextRoute = '/authentication-screen';
    } else {
      nextRoute = '/home-dashboard';
    }

    // Fade out animation before navigation
    await _fadeController.reverse();

    if (mounted) {
      Navigator.pushReplacementNamed(context, nextRoute);
    }
  }

  void _handleRetry() {
    HapticFeedback.selectionClick();
    _initializeApp();
  }

  @override
  void dispose() {
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.light.copyWith(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.dark,
        ),
        child: SafeArea(
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: Stack(
              children: [
                // Gradient background with glow effects
                const GradientBackgroundWidget(),

                // Main content
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Breathing logo animation
                      const BreathingLogoWidget(),

                      SizedBox(height: 3.h),

                      // App name
                      Text(
                        'HeadSpace',
                        style: AppTheme.lightTheme.textTheme.headlineMedium
                            ?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.onSurface,
                          fontSize: 20.sp,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 1.2,
                        ),
                      ),

                      SizedBox(height: 1.h),

                      // Tagline
                      Text(
                        'Find Your Inner Peace',
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color:
                              AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                          fontSize: 13.sp,
                          fontWeight: FontWeight.w400,
                          letterSpacing: 0.5,
                        ),
                      ),

                      SizedBox(height: 8.h),

                      // Loading indicator or retry button
                      _showRetryButton
                          ? RetryButtonWidget(onRetry: _handleRetry)
                          : _isInitializing
                              ? LoadingIndicatorWidget(
                                  progress: _loadingProgress)
                              : const SizedBox.shrink(),
                    ],
                  ),
                ),

                // Version info at bottom
                Positioned(
                  bottom: 4.h,
                  left: 0,
                  right: 0,
                  child: Center(
                    child: Text(
                      'Version 1.0.0',
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                            .withValues(alpha: 0.6),
                        fontSize: 10.sp,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
