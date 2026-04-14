import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';


class AuthToggleButton extends StatefulWidget {
  final bool isLogin;
  final ValueChanged<bool> onToggle;

  const AuthToggleButton({
    super.key,
    required this.isLogin,
    required this.onToggle,
  });

  @override
  State<AuthToggleButton> createState() => _AuthToggleButtonState();
}

class _AuthToggleButtonState extends State<AuthToggleButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _slideAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));

    if (!widget.isLogin) {
      _animationController.value = 1.0;
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(AuthToggleButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isLogin != oldWidget.isLogin) {
      if (widget.isLogin) {
        _animationController.reverse();
      } else {
        _animationController.forward();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      width: 85.w,
      height: 6.h,
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: colorScheme.outline.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Stack(
        children: [
          // Sliding background
          AnimatedBuilder(
            animation: _slideAnimation,
            builder: (context, child) {
              return Positioned(
                left: _slideAnimation.value * 42.5.w,
                top: 2,
                bottom: 2,
                child: Container(
                  width: 42.5.w - 2,
                  decoration: BoxDecoration(
                    color: colorScheme.primary,
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              );
            },
          ),

          // Toggle buttons
          Row(
            children: [
              // Login button
              Expanded(
                child: GestureDetector(
                  onTap: () {
                    if (!widget.isLogin) {
                      widget.onToggle(true);
                    }
                  },
                  child: Container(
                    height: double.infinity,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Center(
                      child: AnimatedDefaultTextStyle(
                        duration: const Duration(milliseconds: 200),
                        style: TextStyle(
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w600,
                          color: widget.isLogin
                              ? colorScheme.onPrimary
                              : colorScheme.onSurfaceVariant,
                        ),
                        child: const Text('Login'),
                      ),
                    ),
                  ),
                ),
              ),

              // Sign Up button
              Expanded(
                child: GestureDetector(
                  onTap: () {
                    if (widget.isLogin) {
                      widget.onToggle(false);
                    }
                  },
                  child: Container(
                    height: double.infinity,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Center(
                      child: AnimatedDefaultTextStyle(
                        duration: const Duration(milliseconds: 200),
                        style: TextStyle(
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w600,
                          color: !widget.isLogin
                              ? colorScheme.onPrimary
                              : colorScheme.onSurfaceVariant,
                        ),
                        child: const Text('Sign Up'),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}