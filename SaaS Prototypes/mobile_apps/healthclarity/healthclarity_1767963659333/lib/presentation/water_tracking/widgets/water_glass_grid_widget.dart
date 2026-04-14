import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class WaterGlassGridWidget extends StatefulWidget {
  final int totalGlasses;
  final int filledGlasses;
  final Function(int) onGlassTap;
  final Function(int) onGlassLongPress;

  const WaterGlassGridWidget({
    Key? key,
    required this.totalGlasses,
    required this.filledGlasses,
    required this.onGlassTap,
    required this.onGlassLongPress,
  }) : super(key: key);

  @override
  State<WaterGlassGridWidget> createState() => _WaterGlassGridWidgetState();
}

class _WaterGlassGridWidgetState extends State<WaterGlassGridWidget>
    with TickerProviderStateMixin {
  late List<AnimationController> _animationControllers;
  late List<Animation<double>> _fillAnimations;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
  }

  void _initializeAnimations() {
    _animationControllers = List.generate(
      widget.totalGlasses,
      (index) => AnimationController(
        duration: const Duration(milliseconds: 280),
        vsync: this,
      ),
    );

    _fillAnimations = _animationControllers
        .map((controller) => Tween<double>(
              begin: 0.0,
              end: 1.0,
            ).animate(CurvedAnimation(
              parent: controller,
              curve: Curves.easeInOut,
            )))
        .toList();

    // Animate filled glasses
    for (int i = 0; i < widget.filledGlasses; i++) {
      _animationControllers[i].forward();
    }
  }

  @override
  void didUpdateWidget(WaterGlassGridWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.filledGlasses != widget.filledGlasses) {
      _updateAnimations();
    }
  }

  void _updateAnimations() {
    for (int i = 0; i < widget.totalGlasses; i++) {
      if (i < widget.filledGlasses) {
        _animationControllers[i].forward();
      } else {
        _animationControllers[i].reverse();
      }
    }
  }

  @override
  void dispose() {
    for (var controller in _animationControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 4,
          crossAxisSpacing: 3.w,
          mainAxisSpacing: 2.h,
          childAspectRatio: 0.8,
        ),
        itemCount: widget.totalGlasses,
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () => widget.onGlassTap(index),
            onLongPress: () => widget.onGlassLongPress(index),
            child: AnimatedBuilder(
              animation: _fillAnimations[index],
              builder: (context, child) {
                return Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    color: AppTheme.lightTheme.colorScheme.surface,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.05),
                        blurRadius: 4,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      // Glass outline
                      Container(
                        width: 12.w,
                        height: 15.h,
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: AppTheme.waterAccent.withValues(alpha: 0.3),
                            width: 2,
                          ),
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      // Water fill animation
                      Positioned(
                        bottom: 4,
                        child: Container(
                          width: 10.w,
                          height: (12.h * _fillAnimations[index].value),
                          decoration: BoxDecoration(
                            color: AppTheme.waterAccent.withValues(
                              alpha: 0.7 + (0.3 * _fillAnimations[index].value),
                            ),
                            borderRadius: BorderRadius.circular(6),
                          ),
                        ),
                      ),
                      // Glass icon
                      CustomIconWidget(
                        iconName: 'local_drink',
                        color: index < widget.filledGlasses
                            ? AppTheme.waterAccent
                            : AppTheme.neutralGray.withValues(alpha: 0.5),
                        size: 6.w,
                      ),
                    ],
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
