import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SignupLinkWidget extends StatefulWidget {
  final VoidCallback onSignupTap;

  const SignupLinkWidget({
    Key? key,
    required this.onSignupTap,
  }) : super(key: key);

  @override
  State<SignupLinkWidget> createState() => _SignupLinkWidgetState();
}

class _SignupLinkWidgetState extends State<SignupLinkWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _magneticController;
  late Animation<double> _magneticAnimation;
  bool _isHovered = false;

  @override
  void initState() {
    super.initState();
    _magneticController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _magneticAnimation = Tween<double>(
      begin: 1.0,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _magneticController,
      curve: Curves.elasticOut,
    ));
  }

  @override
  void dispose() {
    _magneticController.dispose();
    super.dispose();
  }

  void _handleTapDown(TapDownDetails details) {
    setState(() {
      _isHovered = true;
    });
    _magneticController.forward();
  }

  void _handleTapUp(TapUpDetails details) {
    setState(() {
      _isHovered = false;
    });
    _magneticController.reverse();
  }

  void _handleTapCancel() {
    setState(() {
      _isHovered = false;
    });
    _magneticController.reverse();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 4.h),
      child: Center(
        child: AnimatedBuilder(
          animation: _magneticAnimation,
          builder: (context, child) {
            return Transform.scale(
              scale: _magneticAnimation.value,
              child: GestureDetector(
                onTapDown: _handleTapDown,
                onTapUp: _handleTapUp,
                onTapCancel: _handleTapCancel,
                onTap: widget.onSignupTap,
                child: Container(
                  padding: EdgeInsets.symmetric(
                    horizontal: 8.w,
                    vertical: 2.h,
                  ),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(25),
                    gradient: _isHovered
                        ? LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: [
                              AppTheme.lightTheme.colorScheme.secondary
                                  .withValues(alpha: 0.1),
                              AppTheme.lightTheme.colorScheme.secondary
                                  .withValues(alpha: 0.05),
                            ],
                          )
                        : null,
                    border: Border.all(
                      color: _isHovered
                          ? AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.3)
                          : Colors.transparent,
                      width: 1,
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'New to PodcastPro? ',
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.onSurface
                              .withValues(alpha: 0.7),
                        ),
                      ),
                      Text(
                        'Sign Up',
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.secondary,
                          fontWeight: FontWeight.w600,
                          decoration:
                              _isHovered ? TextDecoration.underline : null,
                        ),
                      ),
                      SizedBox(width: 2.w),
                      AnimatedRotation(
                        turns: _isHovered ? 0.1 : 0.0,
                        duration: const Duration(milliseconds: 300),
                        child: CustomIconWidget(
                          iconName: 'arrow_forward',
                          color: AppTheme.lightTheme.colorScheme.secondary,
                          size: 4.w,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
