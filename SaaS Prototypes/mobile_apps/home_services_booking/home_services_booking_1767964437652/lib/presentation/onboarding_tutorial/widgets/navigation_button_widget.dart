import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class NavigationButtonWidget extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isEnabled;
  final bool isPrimary;
  final IconData? icon;

  const NavigationButtonWidget({
    super.key,
    required this.text,
    required this.onPressed,
    this.isEnabled = true,
    this.isPrimary = true,
    this.icon,
  });

  @override
  State<NavigationButtonWidget> createState() => _NavigationButtonWidgetState();
}

class _NavigationButtonWidgetState extends State<NavigationButtonWidget>
    with TickerProviderStateMixin {
  late AnimationController _pressController;
  late AnimationController _rippleController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _rippleAnimation;

  @override
  void initState() {
    super.initState();
    _pressController = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
    );
    _rippleController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _pressController,
      curve: Curves.easeInOut,
    ));

    _rippleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _rippleController,
      curve: Curves.easeOut,
    ));
  }

  @override
  void dispose() {
    _pressController.dispose();
    _rippleController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: GestureDetector(
            onTapDown: (_) => _handleTapDown(),
            onTapUp: (_) => _handleTapUp(),
            onTapCancel: () => _handleTapCancel(),
            onTap: widget.isEnabled ? widget.onPressed : null,
            child: Stack(
              alignment: Alignment.center,
              children: [
                _buildRippleEffect(),
                _buildButton(),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildRippleEffect() {
    return AnimatedBuilder(
      animation: _rippleAnimation,
      builder: (context, child) {
        return Container(
          width: 80.w * _rippleAnimation.value,
          height: 7.h * _rippleAnimation.value,
          decoration: BoxDecoration(
            color: widget.isPrimary
                ? AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.2)
                : Colors.white.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(25),
          ),
        );
      },
    );
  }

  Widget _buildButton() {
    return Container(
      width: 80.w,
      height: 7.h,
      decoration: BoxDecoration(
        gradient: widget.isPrimary
            ? LinearGradient(
                colors: [
                  AppTheme.lightTheme.colorScheme.primary,
                  AppTheme.lightTheme.colorScheme.primaryContainer,
                ],
              )
            : null,
        color: widget.isPrimary ? null : Colors.white.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(25),
        border: widget.isPrimary
            ? null
            : Border.all(
                color: Colors.white.withValues(alpha: 0.3),
                width: 1,
              ),
        boxShadow: widget.isPrimary
            ? [
                BoxShadow(
                  color: AppTheme.lightTheme.colorScheme.primary
                      .withValues(alpha: 0.3),
                  blurRadius: 15,
                  offset: const Offset(0, 5),
                ),
              ]
            : null,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (widget.icon != null) ...[
            CustomIconWidget(
              iconName: _getIconName(widget.icon!),
              color: widget.isPrimary
                  ? AppTheme.lightTheme.colorScheme.onPrimary
                  : Colors.white,
              size: 6.w,
            ),
            SizedBox(width: 2.w),
          ],
          Text(
            widget.text,
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: widget.isPrimary
                  ? AppTheme.lightTheme.colorScheme.onPrimary
                  : Colors.white,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  void _handleTapDown() {
    if (widget.isEnabled) {
      _pressController.forward();
    }
  }

  void _handleTapUp() {
    if (widget.isEnabled) {
      _pressController.reverse();
      _rippleController.forward().then((_) {
        _rippleController.reset();
      });
    }
  }

  void _handleTapCancel() {
    if (widget.isEnabled) {
      _pressController.reverse();
    }
  }

  String _getIconName(IconData icon) {
    if (icon == Icons.arrow_forward) return 'arrow_forward';
    if (icon == Icons.check) return 'check';
    if (icon == Icons.skip_next) return 'skip_next';
    return 'arrow_forward';
  }
}
