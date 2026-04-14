import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class TutorialPageWidget extends StatefulWidget {
  final String title;
  final String description;
  final String imageUrl;
  final List<Color> gradientColors;
  final VoidCallback? onInteraction;
  final bool isInteractive;
  final String interactionHint;

  const TutorialPageWidget({
    super.key,
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.gradientColors,
    this.onInteraction,
    this.isInteractive = false,
    this.interactionHint = '',
  });

  @override
  State<TutorialPageWidget> createState() => _TutorialPageWidgetState();
}

class _TutorialPageWidgetState extends State<TutorialPageWidget>
    with TickerProviderStateMixin {
  late AnimationController _fadeController;
  late AnimationController _scaleController;
  late AnimationController _particleController;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;
  late Animation<double> _particleAnimation;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _startAnimations();
  }

  void _initializeAnimations() {
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _scaleController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );
    _particleController = AnimationController(
      duration: const Duration(milliseconds: 2000),
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

    _particleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _particleController,
      curve: Curves.easeInOut,
    ));
  }

  void _startAnimations() {
    Future.delayed(const Duration(milliseconds: 200), () {
      if (mounted) {
        _fadeController.forward();
        _scaleController.forward();
        _particleController.repeat();
      }
    });
  }

  @override
  void dispose() {
    _fadeController.dispose();
    _scaleController.dispose();
    _particleController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: double.infinity,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: widget.gradientColors,
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
          child: Column(
            children: [
              // Flexible image section that adapts to content
              Flexible(
                flex: 5,
                child: _buildImageSection(),
              ),
              SizedBox(height: 3.h),
              // Flexible content section with proper constraints
              Flexible(
                flex: 4,
                child: _buildContentSection(),
              ),
              SizedBox(height: 2.h),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildImageSection() {
    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Container(
            constraints: BoxConstraints(
              maxHeight: 40.h,
              minHeight: 25.h,
            ),
            child: Stack(
              alignment: Alignment.center,
              children: [
                _buildParticleEffect(),
                _buildMainImage(),
                if (widget.isInteractive) _buildInteractiveOverlay(),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildParticleEffect() {
    return AnimatedBuilder(
      animation: _particleAnimation,
      builder: (context, child) {
        return CustomPaint(
          size: Size(80.w, 35.h),
          painter: ParticleEffectPainter(
            animation: _particleAnimation,
            colors: widget.gradientColors,
          ),
        );
      },
    );
  }

  Widget _buildMainImage() {
    return Container(
      width: 70.w,
      height: 32.h,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: CustomImageWidget(
          imageUrl: widget.imageUrl,
          width: 70.w,
          height: 32.h,
          fit: BoxFit.cover,
        ),
      ),
    );
  }

  Widget _buildInteractiveOverlay() {
    return Positioned.fill(
      child: GestureDetector(
        onTap: () {
          widget.onInteraction?.call();
          _triggerInteractionAnimation();
        },
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            color: Colors.white.withValues(alpha: 0.1),
            border: Border.all(
              color: Colors.white.withValues(alpha: 0.3),
              width: 2,
            ),
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CustomIconWidget(
                  iconName: 'touch_app',
                  color: Colors.white,
                  size: 8.w,
                ),
                SizedBox(height: 1.h),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  child: Text(
                    widget.interactionHint,
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
                    textAlign: TextAlign.center,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildContentSection() {
    return AnimatedBuilder(
      animation: _fadeAnimation,
      builder: (context, child) {
        return Opacity(
          opacity: _fadeAnimation.value,
          child: Container(
            constraints: BoxConstraints(
              maxHeight: 25.h,
              minHeight: 15.h,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Title with proper constraints
                Flexible(
                  flex: 2,
                  child: Text(
                    widget.title,
                    style:
                        AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 20.sp,
                    ),
                    textAlign: TextAlign.center,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                SizedBox(height: 1.5.h),
                // Description with proper spacing and overflow handling
                Flexible(
                  flex: 3,
                  child: SingleChildScrollView(
                    physics: const BouncingScrollPhysics(),
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 2.w),
                      child: Text(
                        widget.description,
                        style:
                            AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                          color: Colors.white.withValues(alpha: 0.9),
                          height: 1.4,
                          fontSize: 14.sp,
                        ),
                        textAlign: TextAlign.center,
                        maxLines: 6,
                        overflow: TextOverflow.fade,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  void _triggerInteractionAnimation() {
    _scaleController.reset();
    _scaleController.forward();
  }
}

class ParticleEffectPainter extends CustomPainter {
  final Animation<double> animation;
  final List<Color> colors;

  ParticleEffectPainter({
    required this.animation,
    required this.colors,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.fill
      ..strokeWidth = 2;

    for (int i = 0; i < 15; i++) {
      final progress = (animation.value + i * 0.1) % 1.0;
      final x = size.width * 0.5 + (size.width * 0.3 * (i % 3 - 1)) * progress;
      final y = size.height * 0.5 +
          (size.height * 0.2 * ((i ~/ 3) % 3 - 1)) * progress;

      paint.color = colors[i % colors.length].withValues(
        alpha: (1.0 - progress) * 0.6,
      );

      canvas.drawCircle(
        Offset(x, y),
        (1.0 - progress) * 4 + 2,
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
