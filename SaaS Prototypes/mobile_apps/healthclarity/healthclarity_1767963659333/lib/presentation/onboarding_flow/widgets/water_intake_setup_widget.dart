import 'dart:math';

import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

// Add this import for sin function

class WaterIntakeSetupWidget extends StatefulWidget {
  final Function(int) onTargetSet;
  final int initialTarget;

  const WaterIntakeSetupWidget({
    Key? key,
    required this.onTargetSet,
    this.initialTarget = 8,
  }) : super(key: key);

  @override
  State<WaterIntakeSetupWidget> createState() => _WaterIntakeSetupWidgetState();
}

class _WaterIntakeSetupWidgetState extends State<WaterIntakeSetupWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _waveAnimation;
  int _selectedTarget = 8;
  String? _errorMessage;

  final List<int> _targetOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  @override
  void initState() {
    super.initState();
    _selectedTarget = widget.initialTarget;

    _animationController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    _waveAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));

    _animationController.repeat();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _selectTarget(int target) {
    setState(() {
      _selectedTarget = target;
      _errorMessage = null;
    });

    if (target < 1 || target > 8) {
      setState(() {
        _errorMessage = 'Water target must be between 1-8 glasses';
      });
      return;
    }

    widget.onTargetSet(target);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        width: double.infinity,
        padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            SizedBox(height: 2.h),

            // Animated Water Visual - Reduced size
            Container(
              width: 35.w,
              height: 35.w,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // Water Glass Container
                  Container(
                    width: 30.w,
                    height: 35.w,
                    decoration: BoxDecoration(
                      color: Colors.transparent,
                      border: Border.all(
                        color: AppTheme.waterAccent,
                        width: 3,
                      ),
                      borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(6.w),
                        bottomRight: Radius.circular(6.w),
                        topLeft: Radius.circular(1.5.w),
                        topRight: Radius.circular(1.5.w),
                      ),
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(6.w),
                        bottomRight: Radius.circular(6.w),
                        topLeft: Radius.circular(1.5.w),
                        topRight: Radius.circular(1.5.w),
                      ),
                      child: Stack(
                        children: [
                          // Water Fill
                          Positioned(
                            bottom: 0,
                            left: 0,
                            right: 0,
                            child: Container(
                              height: (30.w * _selectedTarget / 8),
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  begin: Alignment.topCenter,
                                  end: Alignment.bottomCenter,
                                  colors: [
                                    AppTheme.waterAccent.withValues(alpha: 0.6),
                                    AppTheme.waterAccent.withValues(alpha: 0.8),
                                  ],
                                ),
                              ),
                            ),
                          ),
                          // Animated Wave Effect
                          AnimatedBuilder(
                            animation: _waveAnimation,
                            builder: (context, child) {
                              return Positioned(
                                bottom: (30.w * _selectedTarget / 8) - 1.5.w,
                                left: 0,
                                right: 0,
                                child: Container(
                                  height: 3.w,
                                  child: CustomPaint(
                                    painter: WavePainter(
                                      animationValue: _waveAnimation.value,
                                      color: AppTheme.waterAccent,
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                  // Water Droplets - Reduced size
                  Positioned(
                    top: 0,
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: List.generate(3, (index) {
                        return AnimatedBuilder(
                          animation: _waveAnimation,
                          builder: (context, child) {
                            final delay = index * 0.3;
                            final animValue =
                                (_waveAnimation.value + delay) % 1.0;
                            return Transform.translate(
                              offset: Offset(0, animValue * 1.5.w),
                              child: Container(
                                margin: EdgeInsets.symmetric(horizontal: 0.5.w),
                                width: 1.w,
                                height: 1.5.w,
                                decoration: BoxDecoration(
                                  color: AppTheme.waterAccent,
                                  borderRadius: BorderRadius.circular(0.75.w),
                                ),
                              ),
                            );
                          },
                        );
                      }),
                    ),
                  ),
                ],
              ),
            ),

            SizedBox(height: 3.h),

            // Title and Description
            Text(
              'Water Intake Goal',
              style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                color: AppTheme.primaryTextLight,
                fontWeight: FontWeight.w700,
              ),
              textAlign: TextAlign.center,
            ),

            SizedBox(height: 1.h),

            Text(
              'Set your daily water intake target to stay hydrated throughout the day',
              style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                color: AppTheme.textMediumEmphasisLight,
              ),
              textAlign: TextAlign.center,
            ),

            SizedBox(height: 3.h),

            // Target Selection - Made more compact
            Container(
              width: 85.w,
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: AppTheme.cardLight,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.shadowLight,
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Text(
                    'Daily Target',
                    style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                      color: AppTheme.primaryTextLight,
                      fontWeight: FontWeight.w600,
                    ),
                  ),

                  SizedBox(height: 2.h),

                  // Glass Selection Grid - Improved layout
                  Container(
                    constraints: BoxConstraints(
                      maxHeight: 25.h, // Set max height to prevent overflow
                    ),
                    child: GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 4,
                        childAspectRatio: 1.0,
                        crossAxisSpacing: 2.5.w,
                        mainAxisSpacing: 1.5.h,
                      ),
                      itemCount: _targetOptions.length,
                      itemBuilder: (context, index) {
                        final target = _targetOptions[index];
                        final isSelected = target == _selectedTarget;
                        return GestureDetector(
                          onTap: () => _selectTarget(target),
                          child: Container(
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? AppTheme.waterAccent
                                  : Colors.transparent,
                              border: Border.all(
                                color: AppTheme.waterAccent,
                                width: 2,
                              ),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                CustomIconWidget(
                                  iconName: 'local_drink',
                                  color: isSelected
                                      ? Colors.white
                                      : AppTheme.waterAccent,
                                  size: 5.5.w,
                                ),
                                SizedBox(height: 0.3.h),
                                Text(
                                  target.toString(),
                                  style: AppTheme
                                      .lightTheme.textTheme.labelMedium
                                      ?.copyWith(
                                    color: isSelected
                                        ? Colors.white
                                        : AppTheme.waterAccent,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),

                  SizedBox(height: 2.h),

                  // Selected Target Display
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.5.h),
                    decoration: BoxDecoration(
                      color: AppTheme.waterAccent.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CustomIconWidget(
                          iconName: 'local_drink',
                          color: AppTheme.waterAccent,
                          size: 4.5.w,
                        ),
                        SizedBox(width: 2.w),
                        Text(
                          '$_selectedTarget glasses per day',
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            color: AppTheme.waterAccent,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            SizedBox(height: 1.5.h),

            // Helper Text
            Text(
              'Recommended: 8 glasses (64 oz) per day',
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.textDisabledLight,
              ),
              textAlign: TextAlign.center,
            ),

            // Error Message
            _errorMessage != null
                ? Container(
                    margin: EdgeInsets.only(top: 1.h),
                    padding:
                        EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                    child: Text(
                      _errorMessage!,
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.errorState,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  )
                : const SizedBox.shrink(),

            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }
}

class WavePainter extends CustomPainter {
  final double animationValue;
  final Color color;

  WavePainter({
    required this.animationValue,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color.withValues(alpha: 0.8)
      ..style = PaintingStyle.fill;

    final path = Path();
    final waveHeight = size.height * 0.3;
    final waveLength = size.width;

    path.moveTo(0, size.height / 2);

    for (double x = 0; x <= size.width; x++) {
      final y = size.height / 2 +
          waveHeight *
              (0.5 *
                  sin((x / waveLength * 2 * pi) + (animationValue * 2 * pi)));
      path.lineTo(x, y);
    }

    path.lineTo(size.width, size.height);
    path.lineTo(0, size.height);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
