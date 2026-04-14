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
  late AnimationController _fadeController;
  late AnimationController _scaleController;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;
  bool _isLoading = true;
  double _loadingProgress = 0.0;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _startSplashSequence();
  }

  void _initializeAnimations() {
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _scaleController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeInOut,
    ));

    _scaleAnimation = Tween<double>(
      begin: 0.8,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _scaleController,
      curve: Curves.elasticOut,
    ));

    _fadeController.forward();
    _scaleController.forward();
  }

  Future<void> _startSplashSequence() async {
    // Simulate app initialization tasks
    await _performInitializationTasks();

    // Add haptic feedback before navigation
    HapticFeedback.lightImpact();

    // Navigate to home screen after splash
    if (mounted) {
      Future.delayed(const Duration(seconds: 3), () {
        Navigator.pushReplacementNamed(context, '/main-navigation');
      });
    }
  }

  Future<void> _performInitializationTasks() async {
    final tasks = [
      _loadServiceAreas(),
      _fetchPricingData(),
      _checkUserSession(),
      _prepareCachedOrderHistory(),
    ];

    for (int i = 0; i < tasks.length; i++) {
      await tasks[i];
      if (mounted) {
        setState(() {
          _loadingProgress = (i + 1) / tasks.length;
        });
      }
      // Small delay between tasks for visual feedback
      await Future.delayed(const Duration(milliseconds: 300));
    }

    // Final delay to show complete loading
    await Future.delayed(const Duration(milliseconds: 500));

    if (mounted) {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _loadServiceAreas() async {
    // Simulate loading service areas
    await Future.delayed(const Duration(milliseconds: 400));
  }

  Future<void> _fetchPricingData() async {
    // Simulate fetching pricing data
    await Future.delayed(const Duration(milliseconds: 350));
  }

  Future<void> _checkUserSession() async {
    // Simulate checking user session
    await Future.delayed(const Duration(milliseconds: 300));
  }

  Future<void> _prepareCachedOrderHistory() async {
    // Simulate preparing cached order history
    await Future.delayed(const Duration(milliseconds: 450));
  }

  @override
  void dispose() {
    _fadeController.dispose();
    _scaleController.dispose();
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
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              AppTheme.lightTheme.primaryColor,
              AppTheme.lightTheme.primaryColor.withValues(alpha: 0.8),
              AppTheme.lightTheme.colorScheme.tertiary.withValues(alpha: 0.6),
            ],
            stops: const [0.0, 0.6, 1.0],
          ),
        ),
        child: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                flex: 3,
                child: Center(
                  child: AnimatedBuilder(
                    animation:
                        Listenable.merge([_fadeAnimation, _scaleAnimation]),
                    builder: (context, child) {
                      return Transform.scale(
                        scale: _scaleAnimation.value,
                        child: Opacity(
                          opacity: _fadeAnimation.value,
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              _buildLogo(),
                              SizedBox(height: 3.h),
                              _buildAppName(),
                              SizedBox(height: 1.h),
                              _buildTagline(),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ),
              Expanded(
                flex: 1,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _buildLoadingIndicator(),
                    SizedBox(height: 2.h),
                    _buildLoadingText(),
                  ],
                ),
              ),
              SizedBox(height: 4.h),
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
      child: Center(
        child: CustomIconWidget(
          iconName: 'local_laundry_service',
          color: AppTheme.lightTheme.primaryColor,
          size: 12.w,
        ),
      ),
    );
  }

  Widget _buildAppName() {
    return Text(
      'LaundryFlow',
      style: AppTheme.lightTheme.textTheme.headlineLarge?.copyWith(
        color: Colors.white,
        fontWeight: FontWeight.w700,
        letterSpacing: 1.2,
      ),
    );
  }

  Widget _buildTagline() {
    return Text(
      'Your Laundry, Simplified',
      style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
        color: Colors.white.withValues(alpha: 0.9),
        fontWeight: FontWeight.w400,
        letterSpacing: 0.5,
      ),
    );
  }

  Widget _buildLoadingIndicator() {
    return SizedBox(
      width: 60.w,
      child: Column(
        children: [
          LinearProgressIndicator(
            value: _loadingProgress,
            backgroundColor: Colors.white.withValues(alpha: 0.3),
            valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
            minHeight: 4,
          ),
          SizedBox(height: 1.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Loading...',
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: Colors.white.withValues(alpha: 0.8),
                  fontSize: 10.sp,
                ),
              ),
              Text(
                '${(_loadingProgress * 100).toInt()}%',
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: Colors.white.withValues(alpha: 0.8),
                  fontSize: 10.sp,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLoadingText() {
    final loadingTexts = [
      'Initializing services...',
      'Loading service areas...',
      'Fetching pricing data...',
      'Checking user session...',
      'Preparing order history...',
    ];

    final currentTextIndex =
        (_loadingProgress * (loadingTexts.length - 1)).floor();
    final displayText = currentTextIndex < loadingTexts.length
        ? loadingTexts[currentTextIndex]
        : 'Ready to go!';

    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      child: Text(
        displayText,
        key: ValueKey(displayText),
        style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
          color: Colors.white.withValues(alpha: 0.7),
          fontSize: 11.sp,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
