import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../theme/app_theme.dart';
import '../../widgets/custom_icon_widget.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _logoAnimationController;
  late AnimationController _backgroundAnimationController;
  late Animation<double> _logoScaleAnimation;
  late Animation<double> _logoFadeAnimation;
  late Animation<double> _backgroundAnimation;

  bool _isInitializing = true;
  String _initializationStatus = 'Initializing...';

  @override
  void initState() {
    super.initState();
    _setupAnimations();
    _startInitialization();
  }

  void _setupAnimations() {
    // Logo animation controller
    _logoAnimationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    // Background animation controller
    _backgroundAnimationController = AnimationController(
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
        curve: const Interval(0.0, 0.8, curve: Curves.easeInOut),
      ),
    );

    // Background gradient animation
    _backgroundAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _backgroundAnimationController,
        curve: Curves.easeInOut,
      ),
    );

    // Start animations
    _backgroundAnimationController.forward();
    _logoAnimationController.forward();
  }

  Future<void> _startInitialization() async {
    try {
      // Simulate checking existing baby profiles
      setState(() {
        _initializationStatus = 'Checking profiles...';
      });
      await Future.delayed(const Duration(milliseconds: 800));

      // Simulate loading growth data cache
      setState(() {
        _initializationStatus = 'Loading data...';
      });
      await Future.delayed(const Duration(milliseconds: 600));

      // Simulate preparing milestone databases
      setState(() {
        _initializationStatus = 'Preparing milestones...';
      });
      await Future.delayed(const Duration(milliseconds: 700));

      // Simulate validating data integrity
      setState(() {
        _initializationStatus = 'Validating data...';
      });
      await Future.delayed(const Duration(milliseconds: 500));

      setState(() {
        _isInitializing = false;
        _initializationStatus = 'Ready!';
      });

      // Wait a bit more to show completion
      await Future.delayed(const Duration(milliseconds: 400));

      // Navigate based on user state
      _navigateToNextScreen();
    } catch (e) {
      // Handle initialization errors
      setState(() {
        _isInitializing = false;
        _initializationStatus = 'Ready!';
      });
      _navigateToNextScreen();
    }
  }

  void _navigateToNextScreen() {
    // Simulate user state check
    final bool hasExistingProfile = _checkExistingProfile();
    final bool hasIncompleteSetup = _checkIncompleteSetup();

    if (hasExistingProfile && !hasIncompleteSetup) {
      // User with complete profile goes to dashboard
      Navigator.pushReplacementNamed(context, '/dashboard-home');
    } else if (hasIncompleteSetup) {
      // User with incomplete setup resumes profile creation
      Navigator.pushReplacementNamed(context, '/baby-profile-setup');
    } else {
      // First-time user sees onboarding
      Navigator.pushReplacementNamed(context, '/baby-profile-setup');
    }
  }

  bool _checkExistingProfile() {
    // Mock logic - in real app, check SharedPreferences or local database
    return false; // Simulate first-time user
  }

  bool _checkIncompleteSetup() {
    // Mock logic - in real app, check if profile creation was interrupted
    return false;
  }

  @override
  void dispose() {
    _logoAnimationController.dispose();
    _backgroundAnimationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedBuilder(
        animation: _backgroundAnimation,
        builder: (context, child) {
          return Container(
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  Color.lerp(
                    AppTheme.lightTheme.colorScheme.primary.withValues(
                      alpha: 0.1,
                    ),
                    AppTheme.lightTheme.colorScheme.primary.withValues(
                      alpha: 0.3,
                    ),
                    _backgroundAnimation.value,
                  )!,
                  Color.lerp(
                    AppTheme.lightTheme.colorScheme.secondary.withValues(
                      alpha: 0.1,
                    ),
                    AppTheme.lightTheme.colorScheme.secondary.withValues(
                      alpha: 0.2,
                    ),
                    _backgroundAnimation.value,
                  )!,
                  Color.lerp(
                    AppTheme.lightTheme.colorScheme.tertiary.withValues(
                      alpha: 0.05,
                    ),
                    AppTheme.lightTheme.colorScheme.tertiary.withValues(
                      alpha: 0.15,
                    ),
                    _backgroundAnimation.value,
                  )!,
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
                        child: FadeTransition(
                          opacity: _logoFadeAnimation,
                          child: _buildLogoSection(),
                        ),
                      );
                    },
                  ),

                  SizedBox(height: 8.h),

                  // Loading Section
                  _buildLoadingSection(),

                  // Spacer to balance layout
                  const Spacer(flex: 3),

                  // App Version and Credits
                  _buildFooterSection(),

                  SizedBox(height: 4.h),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildLogoSection() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // App Logo Container
        Container(
          width: 25.w,
          height: 25.w,
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(20.0),
            boxShadow: [
              BoxShadow(
                color: AppTheme.lightTheme.colorScheme.shadow,
                blurRadius: 20.0,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: Center(
            child: CustomIconWidget(
              iconName: 'child_care',
              color: AppTheme.lightTheme.colorScheme.primary,
              size: 12.w,
            ),
          ),
        ),

        SizedBox(height: 3.h),

        // App Name
        Text(
          'BabyTracker',
          style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface,
            fontWeight: FontWeight.w700,
            letterSpacing: 0.5,
          ),
          textAlign: TextAlign.center,
        ),

        SizedBox(height: 1.h),

        // App Tagline
        Text(
          'Track Your Baby\'s Journey',
          style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface.withValues(
              alpha: 0.7,
            ),
            fontWeight: FontWeight.w400,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildLoadingSection() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Loading Indicator
        SizedBox(
          width: 8.w,
          height: 8.w,
          child: CircularProgressIndicator(
            strokeWidth: 3.0,
            valueColor: AlwaysStoppedAnimation<Color>(
              AppTheme.lightTheme.colorScheme.primary,
            ),
            backgroundColor: AppTheme.lightTheme.colorScheme.primary.withValues(
              alpha: 0.2,
            ),
          ),
        ),

        SizedBox(height: 2.h),

        // Initialization Status
        AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          child: Text(
            _initializationStatus,
            key: ValueKey<String>(_initializationStatus),
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface.withValues(
                alpha: 0.8,
              ),
              fontWeight: FontWeight.w500,
            ),
            textAlign: TextAlign.center,
          ),
        ),

        SizedBox(height: 1.h),

        // Progress Dots
        _buildProgressDots(),
      ],
    );
  }

  Widget _buildProgressDots() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(4, (index) {
        return AnimatedContainer(
          duration: Duration(milliseconds: 300 + (index * 100)),
          margin: EdgeInsets.symmetric(horizontal: 1.w),
          width: _isInitializing ? 2.w : 1.5.w,
          height: _isInitializing ? 2.w : 1.5.w,
          decoration: BoxDecoration(
            color:
                _isInitializing
                    ? AppTheme.lightTheme.colorScheme.primary.withValues(
                      alpha: 0.6,
                    )
                    : AppTheme.lightTheme.colorScheme.tertiary,
            borderRadius: BorderRadius.circular(1.w),
          ),
        );
      }),
    );
  }

  Widget _buildFooterSection() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // App Version
        Text(
          'Version 1.0.0',
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface.withValues(
              alpha: 0.5,
            ),
            fontSize: 10.sp,
          ),
        ),

        SizedBox(height: 0.5.h),

        // Credits
        Text(
          'Made with ❤️ for Parents',
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface.withValues(
              alpha: 0.6,
            ),
            fontSize: 10.sp,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}
