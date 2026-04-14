import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class StarRatingWidget extends StatefulWidget {
  final int rating;
  final ValueChanged<int>? onRatingChanged;
  final double size;
  final bool enabled;

  const StarRatingWidget({
    super.key,
    this.rating = 0,
    this.onRatingChanged,
    this.size = 48.0,
    this.enabled = true,
  });

  @override
  State<StarRatingWidget> createState() => _StarRatingWidgetState();
}

class _StarRatingWidgetState extends State<StarRatingWidget>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;
  int _currentRating = 0;
  int _hoveredRating = 0;

  @override
  void initState() {
    super.initState();
    _currentRating = widget.rating;
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.elasticOut,
    ));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  Color _getStarColor(int starIndex) {
    final rating = _hoveredRating > 0 ? _hoveredRating : _currentRating;

    if (starIndex <= rating) {
      // Color transition from red (1-star) to green (5-star)
      if (rating == 1) return const Color(0xFFEF4444); // Red
      if (rating == 2) return const Color(0xFFF97316); // Orange
      if (rating == 3) return const Color(0xFFF59E0B); // Yellow
      if (rating == 4) return const Color(0xFF84CC16); // Light Green
      if (rating == 5) return const Color(0xFF22C55E); // Green
    }

    return AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.3);
  }

  void _onStarTap(int rating) {
    if (!widget.enabled) return;

    setState(() {
      _currentRating = rating;
    });

    // Haptic feedback
    HapticFeedback.lightImpact();

    // Scale animation
    _animationController.forward().then((_) {
      _animationController.reverse();
    });

    widget.onRatingChanged?.call(rating);
  }

  void _onStarHover(int rating) {
    if (!widget.enabled) return;

    setState(() {
      _hoveredRating = rating;
    });
  }

  void _onStarHoverExit() {
    if (!widget.enabled) return;

    setState(() {
      _hoveredRating = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(5, (index) {
        final starIndex = index + 1;
        final isSelected =
            starIndex <= (_hoveredRating > 0 ? _hoveredRating : _currentRating);

        return MouseRegion(
          onEnter: (_) => _onStarHover(starIndex),
          onExit: (_) => _onStarHoverExit(),
          child: GestureDetector(
            onTap: () => _onStarTap(starIndex),
            child: AnimatedBuilder(
              animation: _scaleAnimation,
              builder: (context, child) {
                return Transform.scale(
                  scale: (_hoveredRating == starIndex ||
                          _currentRating == starIndex)
                      ? _scaleAnimation.value
                      : 1.0,
                  child: Container(
                    padding: EdgeInsets.all(4.w),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      curve: Curves.easeInOut,
                      child: CustomIconWidget(
                        iconName: isSelected ? 'star' : 'star_border',
                        color: _getStarColor(starIndex),
                        size: widget.size,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        );
      }),
    );
  }
}
