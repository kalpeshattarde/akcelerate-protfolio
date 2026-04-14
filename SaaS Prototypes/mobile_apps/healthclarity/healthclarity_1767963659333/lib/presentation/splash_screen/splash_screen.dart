import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _logoAnimationController;
  late Animation<double> _logoScaleAnimation;
  late Animation<double> _logoFadeAnimation;

  bool _isLoading = true;
  String _loadingStatus = 'Initializing nutrition tracker...';
  bool _hasError = false;
  int _retryCount = 0;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _startInitialization();
  }

  void _initializeAnimations() {
    _logoAnimationController = AnimationController(
      duration: const Duration(milliseconds: 280),
      vsync: this,
    );

    // Check for reduced motion preference
    final bool reduceMotion = MediaQuery.of(context).disableAnimations;

    if (reduceMotion) {
      // Jump animation for accessibility
      _logoScaleAnimation = Tween<double>(
        begin: 1.0,
        end: 1.0,
      ).animate(_logoAnimationController);

      _logoFadeAnimation = Tween<double>(
        begin: 1.0,
        end: 1.0,
      ).animate(_logoAnimationController);
    } else {
      // Smooth scale and fade animation
      _logoScaleAnimation = Tween<double>(
        begin: 0.8,
        end: 1.0,
      ).animate(CurvedAnimation(
        parent: _logoAnimationController,
        curve: Curves.easeOutBack,
      ));

      _logoFadeAnimation = Tween<double>(
        begin: 0.0,
        end: 1.0,
      ).animate(CurvedAnimation(
        parent: _logoAnimationController,
        curve: Curves.easeIn,
      ));
    }

    _logoAnimationController.forward();
  }

  Future<void> _startInitialization() async {
    try {
      // Simulate loading local food database cache
      await _loadFoodDatabase();

      // Check user preferences for dark mode
      await _loadUserPreferences();

      // Initialize calorie goal settings
      await _loadCalorieSettings();

      // Prepare macro nutrient tracking data
      await _prepareMacroData();

      // Determine navigation path
      await _determineNavigationPath();
    } catch (e) {
      if (_retryCount < 3) {
        _retryCount++;
        setState(() {
          _loadingStatus = 'Retrying initialization... ($_retryCount/3)';
        });
        await Future.delayed(const Duration(seconds: 1));
        _startInitialization();
      } else {
        setState(() {
          _hasError = true;
          _loadingStatus = 'Failed to initialize. Please try again.';
        });
      }
    }
  }

  Future<void> _loadFoodDatabase() async {
    setState(() {
      _loadingStatus = 'Loading food database...';
    });

    // Simulate database loading with timeout
    await Future.delayed(const Duration(milliseconds: 800));

    // Simulate potential timeout
    if (_retryCount == 0 && DateTime.now().millisecond % 10 == 0) {
      throw Exception('Database timeout');
    }
  }

  Future<void> _loadUserPreferences() async {
    setState(() {
      _loadingStatus = 'Loading preferences...';
    });
    await Future.delayed(const Duration(milliseconds: 400));
  }

  Future<void> _loadCalorieSettings() async {
    setState(() {
      _loadingStatus = 'Initializing calorie tracking...';
    });
    await Future.delayed(const Duration(milliseconds: 500));
  }

  Future<void> _prepareMacroData() async {
    setState(() {
      _loadingStatus = 'Preparing macro tracking...';
    });
    await Future.delayed(const Duration(milliseconds: 300));
  }

  Future<void> _determineNavigationPath() async {
    setState(() {
      _loadingStatus = 'Almost ready...';
    });
    await Future.delayed(const Duration(milliseconds: 500));

    setState(() {
      _isLoading = false;
    });

    // Navigate based on user status
    await Future.delayed(const Duration(milliseconds: 500));

    if (mounted) {
      // Check if user has existing goals (simulated)
      final bool hasExistingGoals = DateTime.now().millisecond % 2 == 0;

      if (hasExistingGoals) {
        Navigator.pushReplacementNamed(context, '/dashboard-home');
      } else {
        Navigator.pushReplacementNamed(context, '/onboarding-flow');
      }
    }
  }

  void _retryInitialization() {
    setState(() {
      _hasError = false;
      _isLoading = true;
      _retryCount = 0;
      _loadingStatus = 'Retrying initialization...';
    });
    _startInitialization();
  }

  @override
  void dispose() {
    _logoAnimationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: SafeArea(
        child: Semantics(
          label: _isLoading
              ? _loadingStatus
              : 'HealthClarity nutrition tracker ready',
          child: Container(
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  AppTheme.lightTheme.scaffoldBackgroundColor,
                  AppTheme.lightTheme.scaffoldBackgroundColor
                      .withValues(alpha: 0.95),
                ],
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Logo Section
                Expanded(
                  flex: 3,
                  child: Center(
                    child: AnimatedBuilder(
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
                  ),
                ),

                // Loading Section
                Expanded(
                  flex: 1,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (_isLoading && !_hasError) ...[
                        SizedBox(
                          width: 6.w,
                          height: 6.w,
                          child: CircularProgressIndicator(
                            strokeWidth: 2.5,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              AppTheme.calorieAccent,
                            ),
                          ),
                        ),
                        SizedBox(height: 3.h),
                        Text(
                          _loadingStatus,
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            color: AppTheme.textMediumEmphasisLight,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                      if (_hasError) ...[
                        CustomIconWidget(
                          iconName: 'error_outline',
                          color: AppTheme.errorState,
                          size: 8.w,
                        ),
                        SizedBox(height: 2.h),
                        Text(
                          _loadingStatus,
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            color: AppTheme.errorState,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        SizedBox(height: 3.h),
                        ElevatedButton(
                          onPressed: _retryInitialization,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppTheme.calorieAccent,
                            foregroundColor: Colors.white,
                            padding: EdgeInsets.symmetric(
                              horizontal: 8.w,
                              vertical: 1.5.h,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          child: Text(
                            'Try Again',
                            style: AppTheme.lightTheme.textTheme.labelLarge
                                ?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),

                // Version Info
                Padding(
                  padding: EdgeInsets.only(bottom: 4.h),
                  child: Text(
                    'Version 1.0.0',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.textDisabledLight,
                      fontSize: 10.sp,
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

  Widget _buildLogo() {
    return Container(
      width: 25.w,
      height: 25.w,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: AppTheme.shadowLight,
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Center(
        child: CustomIconWidget(
          iconName: 'restaurant',
          color: AppTheme.calorieAccent,
          size: 18.w,
        ),
      ),
    );
  }
}
