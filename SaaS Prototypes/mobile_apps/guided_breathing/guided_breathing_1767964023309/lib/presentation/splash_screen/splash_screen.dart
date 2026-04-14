import 'dart:math' as math;
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
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
  late AnimationController _particleAnimationController;
  late Animation<double> _logoScaleAnimation;
  late Animation<double> _logoFadeAnimation;
  late Animation<double> _particleAnimation;

  bool _isInitialized = false;
  String _loadingText = "Initializing...";

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

    // Particle animation controller
    _particleAnimationController = AnimationController(
      duration: const Duration(seconds: 4),
      vsync: this,
    );

    // Logo scale animation
    _logoScaleAnimation = Tween<double>(
      begin: 0.5,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _logoAnimationController,
      curve: Curves.elasticOut,
    ));

    // Logo fade animation
    _logoFadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _logoAnimationController,
      curve: const Interval(0.0, 0.6, curve: Curves.easeIn),
    ));

    // Particle animation
    _particleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _particleAnimationController,
      curve: Curves.linear,
    ));

    // Start animations
    _logoAnimationController.forward();
    _particleAnimationController.repeat();
  }

  Future<void> _initializeApp() async {
    try {
      // Simulate app initialization tasks
      setState(() {
        _loadingText = "Loading preferences...";
      });
      await Future.delayed(const Duration(milliseconds: 800));

      setState(() {
        _loadingText = "Preparing meditation library...";
      });
      await Future.delayed(const Duration(milliseconds: 600));

      setState(() {
        _loadingText = "Setting up breathing guides...";
      });
      await Future.delayed(const Duration(milliseconds: 700));

      setState(() {
        _loadingText = "Almost ready...";
      });
      await Future.delayed(const Duration(milliseconds: 500));

      setState(() {
        _isInitialized = true;
      });

      // Navigate to appropriate screen after initialization
      await Future.delayed(const Duration(milliseconds: 300));
      _navigateToNextScreen();
    } catch (e) {
      // Handle initialization errors
      setState(() {
        _loadingText = "Retry in 5 seconds...";
      });
      await Future.delayed(const Duration(seconds: 5));
      _initializeApp();
    }
  }

  void _navigateToNextScreen() {
    // Navigation logic based on user status
    // For demo purposes, navigating to onboarding flow
    Navigator.pushReplacementNamed(context, '/onboarding-flow');
  }

  @override
  void dispose() {
    _logoAnimationController.dispose();
    _particleAnimationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.light.copyWith(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.light,
        ),
        child: Container(
          width: double.infinity,
          height: double.infinity,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                const Color(0xFF1a237e), // Deep cosmic blue
                const Color(0xFF4a148c), // Rich purple
                const Color(0xFF7b1fa2), // Animated particle color
                const Color(0xFF1a237e)
                    .withValues(alpha: 0.9), // Fade back to blue
              ],
              stops: const [0.0, 0.4, 0.7, 1.0],
            ),
          ),
          child: Stack(
            children: [
              // Enhanced animated particle background
              _buildParticleBackground(),

              // Main content with better centering
              Center(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 5.w),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      // Animated logo section - perfectly centered
                      _buildAnimatedLogo(),

                      SizedBox(height: 12.h),

                      // Loading indicator and text - perfectly centered
                      _buildLoadingSection(),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildParticleBackground() {
    return AnimatedBuilder(
      animation: _particleAnimation,
      builder: (context, child) {
        return CustomPaint(
          painter: EnhancedParticlesPainter(_particleAnimation.value),
          size: Size(100.w, 100.h),
        );
      },
    );
  }

  Widget _buildAnimatedLogo() {
    return AnimatedBuilder(
      animation: _logoAnimationController,
      builder: (context, child) {
        return FadeTransition(
          opacity: _logoFadeAnimation,
          child: ScaleTransition(
            scale: _logoScaleAnimation,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // App logo/icon
                Container(
                  width: 28.w,
                  height: 28.w,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: RadialGradient(
                      colors: [
                        const Color(0xFFe1bee7), // Soft lavender
                        const Color(0xFFe1bee7).withValues(alpha: 0.4),
                        Colors.transparent,
                      ],
                      stops: const [0.0, 0.7, 1.0],
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFFe1bee7).withValues(alpha: 0.4),
                        blurRadius: 25,
                        spreadRadius: 8,
                      ),
                      BoxShadow(
                        color: const Color(0xFFe1bee7).withValues(alpha: 0.2),
                        blurRadius: 40,
                        spreadRadius: 15,
                      ),
                    ],
                  ),
                  child: Center(
                    child: CustomIconWidget(
                      iconName: 'air',
                      color: Colors.white,
                      size: 14.w,
                    ),
                  ),
                ),

                SizedBox(height: 4.h),

                // App name - perfectly centered
                Text(
                  'BreathEase',
                  textAlign: TextAlign.center,
                  style: AppTheme.lightTheme.textTheme.headlineLarge?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 1.5,
                    fontSize: 32.sp,
                    shadows: [
                      Shadow(
                        color: Colors.black.withValues(alpha: 0.3),
                        offset: const Offset(0, 2),
                        blurRadius: 4,
                      ),
                    ],
                  ),
                ),

                SizedBox(height: 1.5.h),

                // App tagline - perfectly centered
                Text(
                  'Find Your Inner Peace',
                  textAlign: TextAlign.center,
                  style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                    color: Colors.white.withValues(alpha: 0.9),
                    letterSpacing: 0.8,
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w400,
                    shadows: [
                      Shadow(
                        color: Colors.black.withValues(alpha: 0.2),
                        offset: const Offset(0, 1),
                        blurRadius: 2,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildLoadingSection() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Loading indicator
        Container(
          width: 6.w,
          height: 6.w,
          child: CircularProgressIndicator(
            strokeWidth: 2.5,
            valueColor: AlwaysStoppedAnimation<Color>(
              const Color(0xFFe1bee7), // Soft lavender accent
            ),
            backgroundColor: Colors.white.withValues(alpha: 0.2),
          ),
        ),

        SizedBox(height: 3.h),

        // Loading text - perfectly centered
        AnimatedSwitcher(
          duration: const Duration(milliseconds: 400),
          transitionBuilder: (Widget child, Animation<double> animation) {
            return FadeTransition(
              opacity: animation,
              child: SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(0, 0.3),
                  end: Offset.zero,
                ).animate(animation),
                child: child,
              ),
            );
          },
          child: Text(
            _loadingText,
            key: ValueKey(_loadingText),
            textAlign: TextAlign.center,
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: Colors.white.withValues(alpha: 0.8),
              letterSpacing: 0.5,
              fontSize: 14.sp,
              fontWeight: FontWeight.w400,
              shadows: [
                Shadow(
                  color: Colors.black.withValues(alpha: 0.2),
                  offset: const Offset(0, 1),
                  blurRadius: 2,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class EnhancedParticlesPainter extends CustomPainter {
  final double animationValue;

  EnhancedParticlesPainter(this.animationValue);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;

    // Generate evenly distributed twinkling stars/particles
    const int particleCount = 80;
    final Random random = Random(42); // Fixed seed for consistent positioning

    for (int i = 0; i < particleCount; i++) {
      // Better distribution across screen
      final double x = (random.nextDouble() * size.width);
      final double y = (random.nextDouble() * size.height);

      // Create layered twinkling effect
      final double phase = (animationValue + i * 0.08) % 1.0;
      final double twinkle = (math.sin(phase * 2 * math.pi) + 1) / 2;

      // Different particle sizes and intensities
      final double baseSize = random.nextDouble() * 2 + 1;
      final double particleSize = baseSize + twinkle * (baseSize * 0.6);

      // Varied opacity for depth
      final double baseOpacity = 0.3 + random.nextDouble() * 0.4;
      final double opacity = (baseOpacity * twinkle).clamp(0.1, 0.8);

      paint.color = const Color(0xFFe1bee7).withValues(alpha: opacity);

      // Draw enhanced star shape with multiple layers
      _drawEnhancedStar(canvas, paint, Offset(x, y), particleSize);

      // Add subtle glow effect for larger particles
      if (particleSize > 2.5) {
        paint.color = const Color(0xFFe1bee7).withValues(alpha: opacity * 0.3);
        _drawCircularGlow(canvas, paint, Offset(x, y), particleSize * 1.8);
      }
    }

    // Add some larger floating particles for depth
    for (int i = 0; i < 15; i++) {
      final double x = (random.nextDouble() * size.width);
      final double y = (random.nextDouble() * size.height);

      final double driftPhase = (animationValue * 0.5 + i * 0.15) % 1.0;
      final double drift = math.sin(driftPhase * 2 * math.pi) * 20;

      final double floatX = x + drift;
      final double floatY = y + (animationValue * 50 % size.height);

      final double opacity =
          (0.2 + 0.3 * math.sin(animationValue * 3 + i)).clamp(0.1, 0.5);

      paint.color = const Color(0xFFe1bee7).withValues(alpha: opacity);
      _drawCircularGlow(
          canvas, paint, Offset(floatX % size.width, floatY), 8 + i % 4);
    }
  }

  void _drawEnhancedStar(
      Canvas canvas, Paint paint, Offset center, double size) {
    final Path path = Path();
    const int points = 4;
    const double angle = math.pi / points;

    for (int i = 0; i < points * 2; i++) {
      final double radius = i.isEven ? size : size * 0.4;
      final double currentAngle = i * angle;
      final double x = center.dx + radius * math.cos(currentAngle);
      final double y = center.dy + radius * math.sin(currentAngle);

      if (i == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    }
    path.close();
    canvas.drawPath(path, paint);
  }

  void _drawCircularGlow(
      Canvas canvas, Paint paint, Offset center, double radius) {
    canvas.drawCircle(center, radius, paint);
  }

  @override
  bool shouldRepaint(EnhancedParticlesPainter oldDelegate) {
    return oldDelegate.animationValue != animationValue;
  }
}