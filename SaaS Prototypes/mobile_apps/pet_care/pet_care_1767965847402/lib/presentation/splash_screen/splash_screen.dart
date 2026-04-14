import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import './widgets/animated_logo_widget.dart';
import './widgets/loading_indicator_widget.dart';
import './widgets/trust_badges_widget.dart';

/// Splash Screen providing branded app launch experience while initializing pet care services
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _backgroundController;
  late Animation<Color?> _backgroundGradientStart;
  late Animation<Color?> _backgroundGradientEnd;

  String _loadingText = 'Initializing...';
  bool _showRetryOption = false;
  bool _isInitializing = true;

  // Mock data for initialization simulation
  final List<Map<String, dynamic>> _initializationSteps = [
    {'step': 'Checking authentication...', 'duration': 800},
    {'step': 'Loading pet profiles...', 'duration': 600},
    {'step': 'Syncing medical reminders...', 'duration': 700},
    {'step': 'Preparing offline cache...', 'duration': 500},
  ];

  @override
  void initState() {
    super.initState();
    _initializeBackgroundAnimation();
    _startInitialization();
  }

  void _initializeBackgroundAnimation() {
    _backgroundController = AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );

    _backgroundGradientStart = ColorTween(
      begin: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1),
      end: AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.15),
    ).animate(CurvedAnimation(
      parent: _backgroundController,
      curve: Curves.easeInOut,
    ));

    _backgroundGradientEnd = ColorTween(
      begin: AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.05),
      end: AppTheme.lightTheme.colorScheme.tertiary.withValues(alpha: 0.1),
    ).animate(CurvedAnimation(
      parent: _backgroundController,
      curve: Curves.easeInOut,
    ));

    _backgroundController.repeat(reverse: true);
  }

  Future<void> _startInitialization() async {
    try {
      // Simulate initialization steps
      for (int i = 0; i < _initializationSteps.length; i++) {
        if (!mounted) return;

        final step = _initializationSteps[i];
        setState(() {
          _loadingText = step['step'] as String;
        });

        await Future.delayed(Duration(milliseconds: step['duration'] as int));
      }

      // Simulate network check and data loading
      await _performInitializationTasks();

      if (mounted) {
        _navigateToNextScreen();
      }
    } catch (e) {
      if (mounted) {
        _handleInitializationError();
      }
    }
  }

  Future<void> _performInitializationTasks() async {
    // Simulate checking authentication status
    final isAuthenticated = await _checkAuthenticationStatus();

    // Simulate loading user data
    if (isAuthenticated) {
      await _loadUserPetProfiles();
      await _syncMedicalReminders();
    }

    // Simulate preparing offline cache
    await _prepareOfflineCache();
  }

  Future<bool> _checkAuthenticationStatus() async {
    // Simulate authentication check
    await Future.delayed(const Duration(milliseconds: 300));
    // Mock: Return true for existing users, false for new users
    return DateTime.now().millisecondsSinceEpoch % 3 != 0;
  }

  Future<void> _loadUserPetProfiles() async {
    // Simulate loading pet profiles
    await Future.delayed(const Duration(milliseconds: 400));
  }

  Future<void> _syncMedicalReminders() async {
    // Simulate syncing medical reminders
    await Future.delayed(const Duration(milliseconds: 300));
  }

  Future<void> _prepareOfflineCache() async {
    // Simulate preparing offline data cache
    await Future.delayed(const Duration(milliseconds: 200));
  }

  void _navigateToNextScreen() {
    setState(() {
      _isInitializing = false;
      _loadingText = 'Ready!';
    });

    // Determine navigation path based on user state
    Future.delayed(const Duration(milliseconds: 500), () {
      if (!mounted) return;

      _determineNavigationPath();
    });
  }

  void _determineNavigationPath() {
    // Mock navigation logic
    final now = DateTime.now();
    final userType = now.millisecondsSinceEpoch % 4;

    String targetRoute;
    switch (userType) {
      case 0:
        // New user - show onboarding
        targetRoute = '/onboarding-flow';
        break;
      case 1:
        // Returning user without pets
        targetRoute = '/pet-profile-management';
        break;
      case 2:
        // User with pets but needs setup
        targetRoute = '/home-dashboard';
        break;
      default:
        // Authenticated user with complete setup
        targetRoute = '/home-dashboard';
    }

    Navigator.pushReplacementNamed(context, targetRoute);
  }

  void _handleInitializationError() {
    setState(() {
      _loadingText = 'Connection timeout';
      _showRetryOption = true;
      _isInitializing = false;
    });

    // Auto-retry after 5 seconds
    Future.delayed(const Duration(seconds: 5), () {
      if (mounted && _showRetryOption) {
        _retryInitialization();
      }
    });
  }

  void _retryInitialization() {
    setState(() {
      _loadingText = 'Retrying...';
      _showRetryOption = false;
      _isInitializing = true;
    });

    _startInitialization();
  }

  @override
  void dispose() {
    _backgroundController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedBuilder(
        animation: _backgroundController,
        builder: (context, child) {
          return Container(
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  _backgroundGradientStart.value ??
                      AppTheme.lightTheme.colorScheme.surface,
                  AppTheme.lightTheme.colorScheme.surface,
                  _backgroundGradientEnd.value ??
                      AppTheme.lightTheme.colorScheme.surface,
                ],
                stops: const [0.0, 0.5, 1.0],
              ),
            ),
            child: SafeArea(
              child: Column(
                children: [
                  // Status bar spacing
                  SizedBox(height: 8.h),

                  // Main content area
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Animated logo with paw prints
                        const AnimatedLogoWidget(),

                        SizedBox(height: 8.h),

                        // Loading indicator and text
                        LoadingIndicatorWidget(
                          loadingText: _loadingText,
                          showProgress: _isInitializing,
                        ),

                        // Retry button (shown on error)
                        _showRetryOption
                            ? Column(
                                children: [
                                  SizedBox(height: 3.h),
                                  ElevatedButton(
                                    onPressed: _retryInitialization,
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: AppTheme
                                          .lightTheme.colorScheme.primary,
                                      foregroundColor: AppTheme
                                          .lightTheme.colorScheme.onPrimary,
                                      padding: EdgeInsets.symmetric(
                                        horizontal: 8.w,
                                        vertical: 1.5.h,
                                      ),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                    ),
                                    child: Text(
                                      'Retry',
                                      style: AppTheme
                                          .lightTheme.textTheme.labelLarge
                                          ?.copyWith(
                                        color: AppTheme
                                            .lightTheme.colorScheme.onPrimary,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ),
                                ],
                              )
                            : const SizedBox.shrink(),
                      ],
                    ),
                  ),

                  // Trust badges at bottom
                  const TrustBadgesWidget(),

                  SizedBox(height: 4.h),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
