import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class CalorieGoalSetupWidget extends StatefulWidget {
  final Function(int) onGoalSet;
  final int initialGoal;

  const CalorieGoalSetupWidget({
    Key? key,
    required this.onGoalSet,
    this.initialGoal = 2000,
  }) : super(key: key);

  @override
  State<CalorieGoalSetupWidget> createState() => _CalorieGoalSetupWidgetState();
}

class _CalorieGoalSetupWidgetState extends State<CalorieGoalSetupWidget>
    with SingleTickerProviderStateMixin {
  late TextEditingController _goalController;
  late AnimationController _animationController;
  late Animation<double> _progressAnimation;
  int _currentGoal = 2000;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _currentGoal = widget.initialGoal;
    _goalController = TextEditingController(text: _currentGoal.toString());

    _animationController = AnimationController(
      duration: const Duration(milliseconds: 280),
      vsync: this,
    );

    _progressAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));

    _animationController.forward();
  }

  @override
  void dispose() {
    _goalController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  void _validateAndSetGoal(String value) {
    setState(() {
      _errorMessage = null;
    });

    if (value.isEmpty) {
      setState(() {
        _errorMessage = 'Please enter a calorie goal';
      });
      return;
    }

    final goal = int.tryParse(value);
    if (goal == null) {
      setState(() {
        _errorMessage = 'Please enter a valid number';
      });
      return;
    }

    if (goal < 1200 || goal > 4000) {
      setState(() {
        _errorMessage = 'Calorie goal must be between 1200-4000';
      });
      return;
    }

    setState(() {
      _currentGoal = goal;
    });

    widget.onGoalSet(goal);
    _animationController.reset();
    _animationController.forward();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 4.h),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Animated Calorie Ring Preview
          Container(
            width: 60.w,
            height: 60.w,
            child: Stack(
              alignment: Alignment.center,
              children: [
                // Background Ring
                Container(
                  width: 60.w,
                  height: 60.w,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: AppTheme.calorieAccent.withValues(alpha: 0.1),
                      width: 8,
                    ),
                  ),
                ),
                // Animated Progress Ring
                AnimatedBuilder(
                  animation: _progressAnimation,
                  builder: (context, child) {
                    return CustomPaint(
                      size: Size(60.w, 60.w),
                      painter: CalorieRingPainter(
                        progress: _progressAnimation.value * 0.65,
                        strokeWidth: 8,
                        color: AppTheme.calorieAccent,
                      ),
                    );
                  },
                ),
                // Center Content
                Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      _currentGoal.toString(),
                      style:
                          AppTheme.lightTheme.textTheme.headlineLarge?.copyWith(
                        color: AppTheme.calorieAccent,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    Text(
                      'kcal goal',
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.textMediumEmphasisLight,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          SizedBox(height: 6.h),

          // Title and Description
          Text(
            'Set Your Daily Goal',
            style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
              color: AppTheme.primaryTextLight,
              fontWeight: FontWeight.w700,
            ),
            textAlign: TextAlign.center,
          ),

          SizedBox(height: 2.h),

          Text(
            'Enter your daily calorie target to start tracking your nutrition journey',
            style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
              color: AppTheme.textMediumEmphasisLight,
            ),
            textAlign: TextAlign.center,
          ),

          SizedBox(height: 4.h),

          // Goal Input Field
          Container(
            width: 80.w,
            child: TextFormField(
              controller: _goalController,
              keyboardType: TextInputType.number,
              inputFormatters: [
                FilteringTextInputFormatter.digitsOnly,
                LengthLimitingTextInputFormatter(4),
              ],
              style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                color: AppTheme.primaryTextLight,
                fontWeight: FontWeight.w600,
              ),
              textAlign: TextAlign.center,
              decoration: InputDecoration(
                labelText: 'Daily Calorie Goal',
                suffixText: 'kcal',
                suffixStyle: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.textMediumEmphasisLight,
                ),
                errorText: _errorMessage,
                errorStyle: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: AppTheme.errorState,
                ),
                contentPadding: EdgeInsets.symmetric(
                  horizontal: 4.w,
                  vertical: 2.h,
                ),
              ),
              onChanged: _validateAndSetGoal,
            ),
          ),

          SizedBox(height: 2.h),

          // Helper Text
          Text(
            'Recommended range: 1200-4000 calories',
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.textDisabledLight,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class CalorieRingPainter extends CustomPainter {
  final double progress;
  final double strokeWidth;
  final Color color;

  CalorieRingPainter({
    required this.progress,
    required this.strokeWidth,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width - strokeWidth) / 2;

    final paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    const startAngle = -90 * 3.14159 / 180;
    final sweepAngle = 2 * 3.14159 * progress;

    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      startAngle,
      sweepAngle,
      false,
      paint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
