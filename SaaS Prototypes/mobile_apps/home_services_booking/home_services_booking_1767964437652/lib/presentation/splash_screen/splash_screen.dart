import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
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
  late AnimationController _gradientAnimationController;
  late AnimationController _particleAnimationController;
  late AnimationController _loadingAnimationController;

  late Animation<double> _logoScaleAnimation;
  late Animation<double> _logoFadeAnimation;
  late Animation<double> _gradientAnimation;
  late Animation<double> _particleAnimation;
  late Animation<double> _loadingAnimation;

  bool _isInitialized = false;
  bool _hasError = false;
  String _loadingText = 'Initializing ServicePro...';

  @override
  void initState() {
    super.initState();
    _setupAnimations();
    _startSplashSequence();
  }

  void _setupAnimations() {
    // Logo morphing animation
    _logoAnimationController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    _logoScaleAnimation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(
        parent: _logoAnimationController,
        curve: const Interval(0.0, 0.7, curve: Curves.elasticOut),
      ),
    );

    _logoFadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _logoAnimationController,
        curve: const Interval(0.0, 0.5, curve: Curves.easeOut),
      ),
    );

    // Gradient background animation
    _gradientAnimationController = AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );

    _gradientAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _gradientAnimationController,
        curve: Curves.easeInOut,
      ),
    );

    // Particle effects animation
    _particleAnimationController = AnimationController(
      duration: const Duration(milliseconds: 4000),
      vsync: this,
    )..repeat();

    _particleAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _particleAnimationController,
        curve: Curves.linear,
      ),
    );

    // Loading indicator animation
    _loadingAnimationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat();

    _loadingAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _loadingAnimationController,
        curve: Curves.easeInOut,
      ),
    );
  }

  Future<void> _startSplashSequence() async {
    try {
      // Hide system status bar for premium experience
      SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersive);

      // Start animations
      _logoAnimationController.forward();
      _gradientAnimationController.forward();

      // Simulate initialization tasks
      await _performInitializationTasks();

      // Wait for minimum splash duration
      await Future.delayed(const Duration(milliseconds: 3000));

      if (mounted) {
        _navigateToNextScreen();
      }
    } catch (e) {
      setState(() {
        _hasError = true;
        _loadingText = 'Something went wrong. Retrying...';
      });
      _handleError();
    }
  }

  Future<void> _performInitializationTasks() async {
    // Simulate loading user preferences
    setState(() => _loadingText = 'Loading preferences...');
    await Future.delayed(const Duration(milliseconds: 800));

    // Simulate fetching service availability
    setState(() => _loadingText = 'Fetching services...');
    await Future.delayed(const Duration(milliseconds: 700));

    // Simulate preparing cached widgets
    setState(() => _loadingText = 'Preparing interface...');
    await Future.delayed(const Duration(milliseconds: 900));

    setState(() {
      _isInitialized = true;
      _loadingText = 'Ready to go!';
    });
  }

  void _handleError() async {
    // Gentle shake animation for error
    for (int i = 0; i < 3; i++) {
      await Future.delayed(const Duration(milliseconds: 100));
      if (mounted) {
        setState(() {});
      }
    }

    // Retry after delay
    await Future.delayed(const Duration(milliseconds: 2000));
    if (mounted) {
      setState(() {
        _hasError = false;
        _loadingText = 'Retrying...';
      });
      _startSplashSequence();
    }
  }

  void _navigateToNextScreen() {
    // Restore system UI
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);

    // Navigation logic based on user state
    // For demo purposes, we'll navigate to onboarding
    // In real app, check authentication and user state
    Navigator.pushReplacementNamed(context, '/onboarding-tutorial');
  }

  @override
  void dispose() {
    _logoAnimationController.dispose();
    _gradientAnimationController.dispose();
    _particleAnimationController.dispose();
    _loadingAnimationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedBuilder(
        animation: Listenable.merge([
          _gradientAnimation,
          _logoScaleAnimation,
          _logoFadeAnimation,
          _particleAnimation,
          _loadingAnimation,
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
                  Color.lerp(
                    AppTheme.lightTheme.colorScheme.primary,
                    AppTheme.lightTheme.colorScheme.secondary,
                    _gradientAnimation.value * 0.3,
                  )!,
                  Color.lerp(
                    AppTheme.lightTheme.colorScheme.secondary,
                    AppTheme.lightTheme.colorScheme.tertiary,
                    _gradientAnimation.value * 0.5,
                  )!,
                  Color.lerp(
                    AppTheme.lightTheme.colorScheme.primary,
                    AppTheme.lightTheme.colorScheme.secondary,
                    _gradientAnimation.value * 0.7,
                  )!,
                ],
                stops: [
                  0.0 + (_gradientAnimation.value * 0.1),
                  0.5 + (_gradientAnimation.value * 0.2),
                  1.0,
                ],
              ),
            ),
            child: SafeArea(
              child: Stack(
                children: [
                  // Particle effects background
                  _buildParticleEffects(),

                  // Main content
                  Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Logo with morphing animation
                        Transform.scale(
                          scale: _logoScaleAnimation.value,
                          child: Opacity(
                            opacity: _logoFadeAnimation.value,
                            child: _buildLogo(),
                          ),
                        ),

                        SizedBox(height: 8.h),

                        // Loading indicator and text
                        _buildLoadingSection(),
                      ],
                    ),
                  ),

                  // Error retry button
                  if (_hasError) _buildRetryButton(),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildLogo() {
    return Container(
      width: 32.w,
      height: 32.w,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(6.w),
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow.withValues(
              alpha: 0.3,
            ),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: 'home_repair_service',
              color: AppTheme.lightTheme.colorScheme.surface,
              size: 12.w,
            ),
            SizedBox(height: 1.h),
            Text(
              'ServicePro',
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                color: AppTheme.lightTheme.colorScheme.surface,
                fontWeight: FontWeight.w700,
                letterSpacing: 0.5,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildParticleEffects() {
    return Positioned.fill(
      child: CustomPaint(
        painter: ParticleEffectsPainter(
          animationValue: _particleAnimation.value,
          primaryColor: AppTheme.lightTheme.colorScheme.surface.withValues(
            alpha: 0.1,
          ),
          secondaryColor: AppTheme.lightTheme.colorScheme.surface.withValues(
            alpha: 0.05,
          ),
        ),
      ),
    );
  }

  Widget _buildLoadingSection() {
    return Column(
      children: [
        // Loading indicator with particle effects
        SizedBox(
          width: 12.w,
          height: 12.w,
          child: Stack(
            children: [
              // Background circle
              Container(
                width: 12.w,
                height: 12.w,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppTheme.lightTheme.colorScheme.surface.withValues(
                    alpha: 0.2,
                  ),
                ),
              ),
              // Animated progress indicator
              CircularProgressIndicator(
                value: _isInitialized ? 1.0 : null,
                strokeWidth: 3,
                valueColor: AlwaysStoppedAnimation<Color>(
                  AppTheme.lightTheme.colorScheme.surface,
                ),
                backgroundColor: AppTheme.lightTheme.colorScheme.surface
                    .withValues(alpha: 0.3),
              ),
            ],
          ),
        ),

        SizedBox(height: 3.h),

        // Loading text with fade animation
        AnimatedOpacity(
          opacity: _hasError ? 0.7 : 1.0,
          duration: const Duration(milliseconds: 300),
          child: Text(
            _loadingText,
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.surface,
              fontWeight: FontWeight.w500,
              letterSpacing: 0.3,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ],
    );
  }

  Widget _buildRetryButton() {
    return Positioned(
      bottom: 10.h,
      left: 0,
      right: 0,
      child: Center(
        child: ElevatedButton(
          onPressed: () {
            setState(() {
              _hasError = false;
              _loadingText = 'Retrying...';
            });
            _startSplashSequence();
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: AppTheme.lightTheme.colorScheme.surface,
            foregroundColor: AppTheme.lightTheme.colorScheme.primary,
            padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 2.h),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8.0),
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              CustomIconWidget(
                iconName: 'refresh',
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 20,
              ),
              SizedBox(width: 2.w),
              Text(
                'Retry',
                style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ParticleEffectsPainter extends CustomPainter {
  final double animationValue;
  final Color primaryColor;
  final Color secondaryColor;

  ParticleEffectsPainter({
    required this.animationValue,
    required this.primaryColor,
    required this.secondaryColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;

    // Generate particles based on animation value
    for (int i = 0; i < 20; i++) {
      final progress = (animationValue + (i * 0.1)) % 1.0;
      final x =
          (size.width * 0.1) + (size.width * 0.8 * ((i * 37) % 100) / 100);
      final y = size.height * progress;
      final opacity = (1.0 - progress) * 0.6;

      paint.color =
          i % 2 == 0
              ? primaryColor.withValues(alpha: opacity)
              : secondaryColor.withValues(alpha: opacity);

      final radius = 2.0 + (3.0 * (1.0 - progress));
      canvas.drawCircle(Offset(x, y), radius, paint);
    }

    // Add floating service icons
    for (int i = 0; i < 8; i++) {
      final progress = (animationValue * 0.5 + (i * 0.125)) % 1.0;
      final x = size.width * 0.2 + (size.width * 0.6 * ((i * 73) % 100) / 100);
      final y = size.height * 0.2 + (size.height * 0.6 * progress);
      final opacity = (1.0 - progress) * 0.3;

      paint.color = primaryColor.withValues(alpha: opacity);

      // Draw small service-related shapes
      final rect = Rect.fromCenter(
        center: Offset(x, y),
        width: 4.0,
        height: 4.0,
      );
      canvas.drawRRect(
        RRect.fromRectAndRadius(rect, const Radius.circular(2.0)),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(ParticleEffectsPainter oldDelegate) {
    return oldDelegate.animationValue != animationValue;
  }
}
