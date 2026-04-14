import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class FloatingPlayButtonWidget extends StatefulWidget {
  final bool isPlaying;
  final VoidCallback? onPlayPause;
  final ScrollController scrollController;

  const FloatingPlayButtonWidget({
    Key? key,
    this.isPlaying = false,
    this.onPlayPause,
    required this.scrollController,
  }) : super(key: key);

  @override
  State<FloatingPlayButtonWidget> createState() =>
      _FloatingPlayButtonWidgetState();
}

class _FloatingPlayButtonWidgetState extends State<FloatingPlayButtonWidget>
    with TickerProviderStateMixin {
  late AnimationController _morphController;
  late AnimationController _pulseController;
  late Animation<double> _morphAnimation;
  late Animation<double> _pulseAnimation;
  late Animation<double> _scaleAnimation;

  bool _isVisible = false;
  double _scrollOffset = 0.0;

  @override
  void initState() {
    super.initState();

    _morphController = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );

    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _morphAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _morphController,
      curve: Curves.elasticOut,
    ));

    _pulseAnimation = Tween<double>(
      begin: 1.0,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));

    _scaleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _morphController,
      curve: Curves.elasticOut,
    ));

    widget.scrollController.addListener(_onScroll);

    if (widget.isPlaying) {
      _pulseController.repeat(reverse: true);
    }
  }

  @override
  void dispose() {
    _morphController.dispose();
    _pulseController.dispose();
    widget.scrollController.removeListener(_onScroll);
    super.dispose();
  }

  @override
  void didUpdateWidget(FloatingPlayButtonWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isPlaying != oldWidget.isPlaying) {
      if (widget.isPlaying) {
        _pulseController.repeat(reverse: true);
      } else {
        _pulseController.stop();
        _pulseController.reset();
      }
    }
  }

  void _onScroll() {
    final newOffset = widget.scrollController.offset;
    setState(() {
      _scrollOffset = newOffset;
    });

    // Show button when scrolled past header
    final shouldShow = newOffset > 60.h;
    if (shouldShow != _isVisible) {
      setState(() {
        _isVisible = shouldShow;
      });

      if (_isVisible) {
        _morphController.forward();
      } else {
        _morphController.reverse();
      }
    }
  }

  void _handlePlayPause() {
    // Trigger morphing animation
    _morphController.forward().then((_) {
      _morphController.reverse();
    });

    widget.onPlayPause?.call();
  }

  Widget _buildPlayIcon() {
    return AnimatedBuilder(
      animation: _morphAnimation,
      builder: (context, child) {
        return Transform.rotate(
          angle: _morphAnimation.value * 0.5,
          child: CustomIconWidget(
            iconName: widget.isPlaying ? 'pause' : 'play_arrow',
            size: 32,
            color: AppTheme.lightTheme.colorScheme.onSecondary,
          ),
        );
      },
    );
  }

  Widget _buildPulseEffect() {
    if (!widget.isPlaying) return const SizedBox.shrink();

    return AnimatedBuilder(
      animation: _pulseAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _pulseAnimation.value,
          child: Container(
            width: 20.w,
            height: 20.w,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppTheme.lightTheme.colorScheme.secondary
                  .withValues(alpha: 0.3),
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Positioned(
            right: 6.w,
            bottom: 12.h,
            child: GestureDetector(
              onTap: _handlePlayPause,
              child: Container(
                width: 16.w,
                height: 16.w,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    _buildPulseEffect(),
                    Container(
                      width: 16.w,
                      height: 16.w,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: AppTheme.lightTheme.colorScheme.secondary,
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.lightTheme.colorScheme.secondary
                                .withValues(alpha: 0.4),
                            blurRadius: 12,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: _buildPlayIcon(),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
