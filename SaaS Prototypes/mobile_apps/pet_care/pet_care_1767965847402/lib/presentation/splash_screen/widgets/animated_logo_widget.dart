import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

/// Animated logo widget with subtle paw print animation for splash screen
class AnimatedLogoWidget extends StatefulWidget {
  const AnimatedLogoWidget({super.key});

  @override
  State<AnimatedLogoWidget> createState() => _AnimatedLogoWidgetState();
}

class _AnimatedLogoWidgetState extends State<AnimatedLogoWidget>
    with TickerProviderStateMixin {
  late AnimationController _logoController;
  late AnimationController _pawController;
  late Animation<double> _logoScale;
  late Animation<double> _logoOpacity;
  late Animation<double> _pawOpacity;
  late Animation<Offset> _pawPosition;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _startAnimations();
  }

  void _initializeAnimations() {
    // Logo animation controller
    _logoController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    // Paw animation controller
    _pawController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    // Logo scale animation
    _logoScale = Tween<double>(
      begin: 0.8,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _logoController,
      curve: Curves.elasticOut,
    ));

    // Logo opacity animation
    _logoOpacity = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _logoController,
      curve: const Interval(0.0, 0.6, curve: Curves.easeIn),
    ));

    // Paw opacity animation
    _pawOpacity = Tween<double>(
      begin: 0.0,
      end: 0.6,
    ).animate(CurvedAnimation(
      parent: _pawController,
      curve: const Interval(0.3, 0.8, curve: Curves.easeInOut),
    ));

    // Paw position animation
    _pawPosition = Tween<Offset>(
      begin: const Offset(0.0, 0.2),
      end: const Offset(0.0, 0.0),
    ).animate(CurvedAnimation(
      parent: _pawController,
      curve: const Interval(0.2, 0.7, curve: Curves.easeOut),
    ));
  }

  void _startAnimations() {
    _logoController.forward();
    Future.delayed(const Duration(milliseconds: 300), () {
      if (mounted) {
        _pawController.forward();
      }
    });
  }

  @override
  void dispose() {
    _logoController.dispose();
    _pawController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: Listenable.merge([_logoController, _pawController]),
      builder: (context, child) {
        return Stack(
          alignment: Alignment.center,
          children: [
            // Animated paw prints background
            Positioned(
              top: 20.h,
              left: 15.w,
              child: SlideTransition(
                position: _pawPosition,
                child: FadeTransition(
                  opacity: _pawOpacity,
                  child: CustomIconWidget(
                    iconName: 'pets',
                    size: 6.w,
                    color: AppTheme.lightTheme.colorScheme.primary
                        .withValues(alpha: 0.3),
                  ),
                ),
              ),
            ),
            Positioned(
              top: 25.h,
              right: 20.w,
              child: SlideTransition(
                position: _pawPosition,
                child: FadeTransition(
                  opacity: _pawOpacity,
                  child: Transform.rotate(
                    angle: 0.3,
                    child: CustomIconWidget(
                      iconName: 'pets',
                      size: 5.w,
                      color: AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.4),
                    ),
                  ),
                ),
              ),
            ),
            Positioned(
              bottom: 25.h,
              left: 25.w,
              child: SlideTransition(
                position: _pawPosition,
                child: FadeTransition(
                  opacity: _pawOpacity,
                  child: Transform.rotate(
                    angle: -0.2,
                    child: CustomIconWidget(
                      iconName: 'pets',
                      size: 4.w,
                      color: AppTheme.lightTheme.colorScheme.tertiary
                          .withValues(alpha: 0.3),
                    ),
                  ),
                ),
              ),
            ),

            // Main logo container
            ScaleTransition(
              scale: _logoScale,
              child: FadeTransition(
                opacity: _logoOpacity,
                child: Container(
                  width: 35.w,
                  height: 35.w,
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.surface,
                    borderRadius: BorderRadius.circular(20.w),
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.lightTheme.colorScheme.primary
                            .withValues(alpha: 0.2),
                        blurRadius: 20,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // App icon
                      CustomIconWidget(
                        iconName: 'pets',
                        size: 12.w,
                        color: AppTheme.lightTheme.colorScheme.primary,
                      ),
                      SizedBox(height: 2.h),
                      // App name
                      Text(
                        'PetCare',
                        style:
                            AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.primary,
                          fontWeight: FontWeight.w700,
                          fontSize: 5.w,
                        ),
                      ),
                      Text(
                        'Tracker',
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.secondary,
                          fontWeight: FontWeight.w500,
                          fontSize: 3.5.w,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
