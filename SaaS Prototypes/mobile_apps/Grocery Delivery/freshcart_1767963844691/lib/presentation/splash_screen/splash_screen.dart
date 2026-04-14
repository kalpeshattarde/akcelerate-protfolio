import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _logoAnimationController;
  late AnimationController _floatingIconsController;
  late Animation<double> _logoScaleAnimation;
  late Animation<double> _logoOpacityAnimation;
  late Animation<double> _floatingAnimation;

  bool _isInitialized = false;
  String _loadingText = 'Initializing...';

  @override
  void initState() {
    super.initState();
    _setupAnimations();
    _initializeApp();
  }

  void _setupAnimations() {
    // Logo animation controller
    _logoAnimationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    // Floating icons animation controller
    _floatingIconsController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    );

    // Logo scale animation
    _logoScaleAnimation = Tween<double>(
      begin: 0.8,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _logoAnimationController,
      curve: Curves.elasticOut,
    ));

    // Logo opacity animation
    _logoOpacityAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _logoAnimationController,
      curve: const Interval(0.0, 0.6, curve: Curves.easeInOut),
    ));

    // Floating animation for grocery icons
    _floatingAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _floatingIconsController,
      curve: Curves.easeInOut,
    ));

    // Start animations
    _logoAnimationController.forward();
    _floatingIconsController.repeat(reverse: true);
  }

  Future<void> _initializeApp() async {
    try {
      // Simulate initialization tasks
      await Future.delayed(const Duration(milliseconds: 500));

      setState(() {
        _loadingText = 'Loading preferences...';
      });
      await _loadUserPreferences();

      setState(() {
        _loadingText = 'Checking location...';
      });
      await _checkLocationPermissions();

      setState(() {
        _loadingText = 'Preparing fresh products...';
      });
      await _prepareCachedData();

      setState(() {
        _loadingText = 'Almost ready...';
      });
      await Future.delayed(const Duration(milliseconds: 800));

      setState(() {
        _isInitialized = true;
      });

      // Navigate after initialization
      await Future.delayed(const Duration(milliseconds: 500));
      _navigateToNextScreen();
    } catch (e) {
      // Handle initialization errors
      _showRetryOption();
    }
  }

  Future<void> _loadUserPreferences() async {
    // Simulate loading user preferences
    await Future.delayed(const Duration(milliseconds: 600));
  }

  Future<void> _checkLocationPermissions() async {
    // Simulate checking location permissions
    await Future.delayed(const Duration(milliseconds: 400));
  }

  Future<void> _prepareCachedData() async {
    // Simulate preparing cached product data
    await Future.delayed(const Duration(milliseconds: 700));
  }

  void _navigateToNextScreen() {
    // Simulate authentication check and navigation logic
    final bool isAuthenticated = false; // This would be actual auth check
    final bool isFirstTime = true; // This would be actual first-time check

    if (isAuthenticated) {
      Navigator.pushReplacementNamed(context, '/home-screen');
    } else if (isFirstTime) {
      Navigator.pushReplacementNamed(context, '/onboarding-screen');
    } else {
      Navigator.pushReplacementNamed(context, '/authentication-screen');
    }
  }

  void _showRetryOption() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Text(
          'Connection Issue',
          style: AppTheme.lightTheme.textTheme.titleMedium,
        ),
        content: Text(
          'Unable to initialize the app. Please check your connection and try again.',
          style: AppTheme.lightTheme.textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
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
    _logoAnimationController.dispose();
    _floatingIconsController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.colorScheme.primary,
      body: Center(
        child: Container(
          width: double.infinity,
          height: double.infinity,
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Color(0xFFF8F9FA),
                Color(0xFFE8F5E8),
              ],
            ),
          ),
          child: SafeArea(
            child: Stack(
              children: [
                // Floating grocery icons background
                _buildFloatingIcons(),

                // Main content
                Column(
                  children: [
                    Expanded(
                      child: Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            // App logo with animation
                            AnimatedBuilder(
                              animation: _logoAnimationController,
                              builder: (context, child) {
                                return Transform.scale(
                                  scale: _logoScaleAnimation.value,
                                  child: Opacity(
                                    opacity: _logoOpacityAnimation.value,
                                    child: _buildAppLogo(),
                                  ),
                                );
                              },
                            ),

                            SizedBox(height: 6.h),

                            // Loading indicator and text
                            _buildLoadingSection(),
                          ],
                        ),
                      ),
                    ),

                    // Bottom branding
                    _buildBottomBranding(),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAppLogo() {
    return Container(
      width: 25.w,
      height: 25.w,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.15),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: 'shopping_cart',
            color: AppTheme.lightTheme.colorScheme.primary,
            size: 8.w,
          ),
          SizedBox(height: 1.h),
          Text(
            'FreshCart',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.primary,
              fontWeight: FontWeight.w700,
              fontSize: 12.sp,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoadingSection() {
    return Column(
      children: [
        // Loading indicator
        SizedBox(
          width: 6.w,
          height: 6.w,
          child: CircularProgressIndicator(
            strokeWidth: 2,
            valueColor: AlwaysStoppedAnimation<Color>(
              AppTheme.lightTheme.colorScheme.primary,
            ),
          ),
        ),

        SizedBox(height: 2.h),

        // Loading text
        AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          child: Text(
            _loadingText,
            key: ValueKey(_loadingText),
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              fontSize: 11.sp,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFloatingIcons() {
    return AnimatedBuilder(
      animation: _floatingAnimation,
      builder: (context, child) {
        return Stack(
          children: [
            // Apple icon
            Positioned(
              top: 15.h + (_floatingAnimation.value * 2.h),
              left: 10.w,
              child: Opacity(
                opacity: 0.3,
                child: CustomIconWidget(
                  iconName: 'apple',
                  color: AppTheme.lightTheme.colorScheme.secondary,
                  size: 4.w,
                ),
              ),
            ),

            // Carrot icon
            Positioned(
              top: 25.h - (_floatingAnimation.value * 1.5.h),
              right: 15.w,
              child: Opacity(
                opacity: 0.25,
                child: CustomIconWidget(
                  iconName: 'eco',
                  color: AppTheme.lightTheme.colorScheme.tertiary,
                  size: 3.5.w,
                ),
              ),
            ),

            // Leaf icon
            Positioned(
              bottom: 30.h + (_floatingAnimation.value * 1.h),
              left: 20.w,
              child: Opacity(
                opacity: 0.2,
                child: CustomIconWidget(
                  iconName: 'local_florist',
                  color: AppTheme.lightTheme.colorScheme.primary,
                  size: 3.w,
                ),
              ),
            ),

            // Shopping bag icon
            Positioned(
              bottom: 35.h - (_floatingAnimation.value * 2.h),
              right: 25.w,
              child: Opacity(
                opacity: 0.3,
                child: CustomIconWidget(
                  iconName: 'shopping_bag',
                  color: AppTheme.lightTheme.colorScheme.secondary,
                  size: 4.5.w,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _buildBottomBranding() {
    return Padding(
      padding: EdgeInsets.only(bottom: 4.h),
      child: Column(
        children: [
          Text(
            'Fresh groceries delivered',
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              fontSize: 10.sp,
            ),
          ),
          SizedBox(height: 0.5.h),
          Text(
            'to your doorstep',
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              fontSize: 10.sp,
            ),
          ),
        ],
      ),
    );
  }
}
