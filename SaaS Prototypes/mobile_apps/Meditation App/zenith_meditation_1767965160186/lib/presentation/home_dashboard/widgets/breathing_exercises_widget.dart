import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class BreathingExercisesWidget extends StatefulWidget {
  final List<Map<String, dynamic>> breathingExercises;
  final Function(Map<String, dynamic>) onExerciseTap;

  const BreathingExercisesWidget({
    Key? key,
    required this.breathingExercises,
    required this.onExerciseTap,
  }) : super(key: key);

  @override
  State<BreathingExercisesWidget> createState() =>
      _BreathingExercisesWidgetState();
}

class _BreathingExercisesWidgetState extends State<BreathingExercisesWidget>
    with TickerProviderStateMixin {
  late List<AnimationController> _animationControllers;
  late List<Animation<double>> _scaleAnimations;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
  }

  void _initializeAnimations() {
    _animationControllers = List.generate(
      widget.breathingExercises.length,
      (index) => AnimationController(
        duration: const Duration(seconds: 4),
        vsync: this,
      ),
    );

    _scaleAnimations = _animationControllers.map((controller) {
      return Tween<double>(begin: 0.8, end: 1.2).animate(
        CurvedAnimation(parent: controller, curve: Curves.easeInOut),
      );
    }).toList();

    // Start animations with different delays
    for (int i = 0; i < _animationControllers.length; i++) {
      Future.delayed(Duration(milliseconds: i * 500), () {
        if (mounted) {
          _animationControllers[i].repeat(reverse: true);
        }
      });
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
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Text(
            "Breathing Exercises",
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  fontWeight: FontWeight.w700,
                ),
          ),
        ),
        SizedBox(height: 2.h),
        SizedBox(
          height: 18.h,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            itemCount: widget.breathingExercises.length,
            itemBuilder: (context, index) {
              final exercise = widget.breathingExercises[index];

              return Container(
                width: 40.w,
                margin: EdgeInsets.only(right: 3.w),
                child: GestureDetector(
                  onTap: () => widget.onExerciseTap(exercise),
                  child: Container(
                    padding: EdgeInsets.all(4.w),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.lightTheme.colorScheme.shadow,
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Animated Breathing Circle
                        AnimatedBuilder(
                          animation: _scaleAnimations[index],
                          builder: (context, child) {
                            return Transform.scale(
                              scale: _scaleAnimations[index].value,
                              child: Container(
                                width: 12.w,
                                height: 12.w,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  gradient: RadialGradient(
                                    colors: [
                                      AppTheme.lightTheme.colorScheme.secondary
                                          .withValues(alpha: 0.3),
                                      AppTheme.lightTheme.colorScheme.secondary
                                          .withValues(alpha: 0.1),
                                    ],
                                  ),
                                  border: Border.all(
                                    color: AppTheme
                                        .lightTheme.colorScheme.secondary,
                                    width: 2,
                                  ),
                                ),
                                child: CustomIconWidget(
                                  iconName: 'air',
                                  color:
                                      AppTheme.lightTheme.colorScheme.secondary,
                                  size: 24,
                                ),
                              ),
                            );
                          },
                        ),
                        SizedBox(height: 2.h),
                        Text(
                          exercise["name"] as String,
                          style: Theme.of(context)
                              .textTheme
                              .titleSmall
                              ?.copyWith(
                                color:
                                    AppTheme.lightTheme.colorScheme.onSurface,
                                fontWeight: FontWeight.w600,
                              ),
                          textAlign: TextAlign.center,
                          overflow: TextOverflow.ellipsis,
                          maxLines: 1,
                        ),
                        SizedBox(height: 0.5.h),
                        Text(
                          exercise["pattern"] as String,
                          style:
                              Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: AppTheme.lightTheme.colorScheme
                                        .onSurfaceVariant,
                                  ),
                          textAlign: TextAlign.center,
                          overflow: TextOverflow.ellipsis,
                          maxLines: 1,
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
