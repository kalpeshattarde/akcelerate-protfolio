import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class AiAdaptationWidget extends StatefulWidget {
  const AiAdaptationWidget({Key? key}) : super(key: key);

  @override
  State<AiAdaptationWidget> createState() => _AiAdaptationWidgetState();
}

class _AiAdaptationWidgetState extends State<AiAdaptationWidget>
    with TickerProviderStateMixin {
  late AnimationController _difficultyController;
  late AnimationController _brainController;
  late Animation<double> _difficultyAnimation;
  late Animation<double> _brainAnimation;

  int currentDifficulty = 3;
  bool isAnalyzing = false;

  @override
  void initState() {
    super.initState();
    _difficultyController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _brainController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    _difficultyAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _difficultyController, curve: Curves.easeInOut),
    );
    _brainAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _brainController, curve: Curves.elasticOut),
    );

    _startAnimation();
  }

  void _startAnimation() async {
    await Future.delayed(const Duration(milliseconds: 500));
    _brainController.forward();
    await Future.delayed(const Duration(milliseconds: 1000));
    _difficultyController.forward();

    // Simulate difficulty adjustment
    await Future.delayed(const Duration(milliseconds: 2000));
    setState(() {
      isAnalyzing = true;
    });

    for (int i = 0; i < 3; i++) {
      await Future.delayed(const Duration(milliseconds: 800));
      setState(() {
        currentDifficulty = (currentDifficulty % 5) + 1;
      });
    }

    setState(() {
      isAnalyzing = false;
    });
  }

  @override
  void dispose() {
    _difficultyController.dispose();
    _brainController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(height: 4.h),
        AnimatedBuilder(
          animation: _brainAnimation,
          builder: (context, child) {
            return Transform.scale(
              scale: 0.5 + (_brainAnimation.value * 0.5),
              child: Container(
                width: 30.w,
                height: 30.w,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    colors: [
                      AppTheme.lightTheme.colorScheme.primary,
                      AppTheme.lightTheme.colorScheme.secondary,
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.lightTheme.colorScheme.primary
                          .withValues(alpha: 0.3),
                      blurRadius: 20,
                      spreadRadius: 5,
                    ),
                  ],
                ),
                child: Center(
                  child: CustomIconWidget(
                    iconName: 'psychology',
                    color: AppTheme.lightTheme.colorScheme.onPrimary,
                    size: 15.w,
                  ),
                ),
              ),
            );
          },
        ),
        SizedBox(height: 4.h),
        Text(
          'AI-Powered Learning',
          style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 2.h),
        Text(
          'Our AI adapts to your learning style and pace,\ncreating a personalized experience just for you',
          style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface
                .withValues(alpha: 0.7),
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 6.h),
        Container(
          padding: EdgeInsets.all(4.w),
          margin: EdgeInsets.symmetric(horizontal: 6.w),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: AppTheme.lightTheme.colorScheme.outline
                  .withValues(alpha: 0.2),
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 10,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            children: [
              Row(
                children: [
                  CustomIconWidget(
                    iconName: 'tune',
                    color: AppTheme.lightTheme.colorScheme.primary,
                    size: 6.w,
                  ),
                  SizedBox(width: 3.w),
                  Text(
                    'Difficulty Level',
                    style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const Spacer(),
                  if (isAnalyzing)
                    SizedBox(
                      width: 4.w,
                      height: 4.w,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(
                          AppTheme.lightTheme.colorScheme.primary,
                        ),
                      ),
                    ),
                ],
              ),
              SizedBox(height: 3.h),
              AnimatedBuilder(
                animation: _difficultyAnimation,
                builder: (context, child) {
                  return Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: List.generate(5, (index) {
                      final isActive = index < currentDifficulty;
                      final animationValue = _difficultyAnimation.value;

                      return AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        width: 12.w,
                        height: 2.h + (index * 0.5.h),
                        decoration: BoxDecoration(
                          color: isActive
                              ? AppTheme.lightTheme.colorScheme.primary
                                  .withValues(
                                  alpha: 0.3 + (animationValue * 0.7),
                                )
                              : AppTheme.lightTheme.colorScheme.outline
                                  .withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(4),
                        ),
                      );
                    }),
                  );
                },
              ),
              SizedBox(height: 2.h),
              Text(
                isAnalyzing
                    ? 'Analyzing your performance...'
                    : 'Perfectly calibrated for you!',
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface
                      .withValues(alpha: 0.6),
                  fontStyle: FontStyle.italic,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
        SizedBox(height: 4.h),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildFeatureCard('Smart\nRecommendations', 'lightbulb'),
            _buildFeatureCard('Progress\nTracking', 'trending_up'),
            _buildFeatureCard('Adaptive\nContent', 'auto_fix_high'),
          ],
        ),
      ],
    );
  }

  Widget _buildFeatureCard(String title, String iconName) {
    return Container(
      width: 25.w,
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.2),
        ),
      ),
      child: Column(
        children: [
          CustomIconWidget(
            iconName: iconName,
            color: AppTheme.lightTheme.colorScheme.primary,
            size: 6.w,
          ),
          SizedBox(height: 1.h),
          Text(
            title,
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              fontWeight: FontWeight.w500,
              color: AppTheme.lightTheme.colorScheme.primary,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
