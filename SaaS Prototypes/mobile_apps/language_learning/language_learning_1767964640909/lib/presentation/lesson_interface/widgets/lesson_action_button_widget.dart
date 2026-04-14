import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class LessonActionButtonWidget extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isEnabled;
  final bool isCorrect;
  final bool showResult;
  final bool isLoading;

  const LessonActionButtonWidget({
    Key? key,
    required this.text,
    required this.onPressed,
    this.isEnabled = true,
    this.isCorrect = false,
    this.showResult = false,
    this.isLoading = false,
  }) : super(key: key);

  @override
  State<LessonActionButtonWidget> createState() =>
      _LessonActionButtonWidgetState();
}

class _LessonActionButtonWidgetState extends State<LessonActionButtonWidget>
    with TickerProviderStateMixin {
  late AnimationController _celebrationController;
  late AnimationController _pulseController;
  late Animation<double> _celebrationAnimation;
  late Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();
    _celebrationController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    _celebrationAnimation = Tween<double>(begin: 1.0, end: 1.1).animate(
      CurvedAnimation(parent: _celebrationController, curve: Curves.elasticOut),
    );
    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.05).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _celebrationController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(LessonActionButtonWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.showResult && widget.isCorrect && !oldWidget.showResult) {
      _triggerCelebration();
    }
    if (widget.isEnabled && !oldWidget.isEnabled) {
      _startPulse();
    } else if (!widget.isEnabled && oldWidget.isEnabled) {
      _stopPulse();
    }
  }

  void _triggerCelebration() {
    _celebrationController.forward().then((_) {
      _celebrationController.reverse();
    });
  }

  void _startPulse() {
    _pulseController.repeat(reverse: true);
  }

  void _stopPulse() {
    _pulseController.stop();
    _pulseController.reset();
  }

  Color _getButtonColor() {
    if (!widget.isEnabled) {
      return AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.3);
    }
    if (widget.showResult) {
      return widget.isCorrect
          ? AppTheme.lightTheme.colorScheme.primary
          : AppTheme.lightTheme.colorScheme.error;
    }
    return AppTheme.lightTheme.colorScheme.primary;
  }

  Color _getTextColor() {
    if (!widget.isEnabled) {
      return AppTheme.lightTheme.colorScheme.onSurfaceVariant
          .withValues(alpha: 0.5);
    }
    return Colors.white;
  }

  IconData? _getButtonIcon() {
    if (widget.isLoading) return null;
    if (widget.showResult) {
      return widget.isCorrect ? Icons.check : Icons.refresh;
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: AnimatedBuilder(
        animation: Listenable.merge([_celebrationAnimation, _pulseAnimation]),
        builder: (context, child) {
          return Transform.scale(
            scale: widget.showResult && widget.isCorrect
                ? _celebrationAnimation.value
                : (widget.isEnabled ? _pulseAnimation.value : 1.0),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                boxShadow: widget.isEnabled
                    ? [
                        BoxShadow(
                          color: _getButtonColor().withValues(alpha: 0.3),
                          blurRadius: 12,
                          offset: const Offset(0, 4),
                        ),
                      ]
                    : null,
              ),
              child: ElevatedButton(
                onPressed: widget.isEnabled && !widget.isLoading
                    ? widget.onPressed
                    : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: _getButtonColor(),
                  foregroundColor: _getTextColor(),
                  elevation: widget.isEnabled ? 4 : 0,
                  padding: EdgeInsets.symmetric(vertical: 2.h),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    if (widget.isLoading) ...[
                      SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          valueColor:
                              AlwaysStoppedAnimation<Color>(_getTextColor()),
                        ),
                      ),
                      SizedBox(width: 2.w),
                    ],
                    if (_getButtonIcon() != null && !widget.isLoading) ...[
                      Icon(
                        _getButtonIcon(),
                        size: 20,
                        color: _getTextColor(),
                      ),
                      SizedBox(width: 2.w),
                    ],
                    Text(
                      widget.text,
                      style:
                          AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                        color: _getTextColor(),
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
