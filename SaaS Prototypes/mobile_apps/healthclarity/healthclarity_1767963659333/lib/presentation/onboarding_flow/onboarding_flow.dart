import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/calorie_goal_setup_widget.dart';
import './widgets/macro_preferences_widget.dart';
import './widgets/water_intake_setup_widget.dart';

class OnboardingFlow extends StatefulWidget {
  const OnboardingFlow({Key? key}) : super(key: key);

  @override
  State<OnboardingFlow> createState() => _OnboardingFlowState();
}

class _OnboardingFlowState extends State<OnboardingFlow>
    with TickerProviderStateMixin {
  late PageController _pageController;
  late AnimationController _progressAnimationController;
  late Animation<double> _progressAnimation;

  int _currentPage = 0;
  final int _totalPages = 3;

  // User preferences
  int _calorieGoal = 2000;
  Map<String, double> _macroPreferences = {
    'carbs': 50.0,
    'protein': 25.0,
    'fats': 25.0,
  };
  int _waterTarget = 8;

  // Validation states
  bool _isCalorieGoalValid = true;
  bool _areMacrosValid = true;
  bool _isWaterTargetValid = true;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();

    _progressAnimationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _progressAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _progressAnimationController,
      curve: Curves.easeInOut,
    ));

    _updateProgress();
  }

  @override
  void dispose() {
    _pageController.dispose();
    _progressAnimationController.dispose();
    super.dispose();
  }

  void _updateProgress() {
    final progress = (_currentPage + 1) / _totalPages;
    _progressAnimationController.animateTo(progress);
  }

  void _nextPage() {
    if (_currentPage < _totalPages - 1) {
      if (_validateCurrentPage()) {
        _pageController.nextPage(
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeInOut,
        );
      }
    } else {
      _completeOnboarding();
    }
  }

  void _previousPage() {
    if (_currentPage > 0) {
      _pageController.previousPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _skipOnboarding() {
    _completeOnboarding();
  }

  bool _validateCurrentPage() {
    switch (_currentPage) {
      case 0:
        return _isCalorieGoalValid &&
            _calorieGoal >= 1200 &&
            _calorieGoal <= 4000;
      case 1:
        final total = _macroPreferences.values.reduce((a, b) => a + b);
        return _areMacrosValid && (total - 100).abs() <= 0.1;
      case 2:
        return _isWaterTargetValid && _waterTarget >= 1 && _waterTarget <= 8;
      default:
        return true;
    }
  }

  void _completeOnboarding() {
    // Provide haptic feedback
    HapticFeedback.lightImpact();

    // Navigate to dashboard with welcome message
    Navigator.pushReplacementNamed(context, '/dashboard-home');

    // Show welcome snackbar
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Welcome to HealthClarity! Your nutrition journey starts now.',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: Colors.white,
          ),
        ),
        backgroundColor: AppTheme.successState,
        duration: const Duration(seconds: 3),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        margin: EdgeInsets.all(4.w),
      ),
    );
  }

  String _getPageTitle() {
    switch (_currentPage) {
      case 0:
        return 'Welcome to HealthClarity';
      case 1:
        return 'Customize Your Macros';
      case 2:
        return 'Stay Hydrated';
      default:
        return '';
    }
  }

  String _getPageSubtitle() {
    switch (_currentPage) {
      case 0:
        return 'Let\'s set up your daily calorie goal to get started';
      case 1:
        return 'Balance your macronutrients for optimal nutrition';
      case 2:
        return 'Set your daily water intake target';
      default:
        return '';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryBackgroundLight,
      body: SafeArea(
        child: Column(
          children: [
            // Header with Progress
            Container(
              padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
              child: Column(
                children: [
                  // Progress Bar
                  Container(
                    width: double.infinity,
                    height: 1.h,
                    decoration: BoxDecoration(
                      color: AppTheme.neutralGray.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(0.5.h),
                    ),
                    child: AnimatedBuilder(
                      animation: _progressAnimation,
                      builder: (context, child) {
                        return FractionallySizedBox(
                          alignment: Alignment.centerLeft,
                          widthFactor: _progressAnimation.value,
                          child: Container(
                            decoration: BoxDecoration(
                              color: AppTheme.calorieAccent,
                              borderRadius: BorderRadius.circular(0.5.h),
                            ),
                          ),
                        );
                      },
                    ),
                  ),

                  SizedBox(height: 2.h),

                  // Page Indicator
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(_totalPages, (index) {
                      return AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        margin: EdgeInsets.symmetric(horizontal: 1.w),
                        width: index == _currentPage ? 6.w : 2.w,
                        height: 2.w,
                        decoration: BoxDecoration(
                          color: index == _currentPage
                              ? AppTheme.calorieAccent
                              : AppTheme.neutralGray.withValues(alpha: 0.3),
                          borderRadius: BorderRadius.circular(1.w),
                        ),
                      );
                    }),
                  ),

                  SizedBox(height: 2.h),

                  // Step Counter
                  Text(
                    'Step ${_currentPage + 1} of $_totalPages',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.textMediumEmphasisLight,
                    ),
                  ),
                ],
              ),
            ),

            // Page Content
            Expanded(
              child: PageView(
                controller: _pageController,
                onPageChanged: (index) {
                  setState(() {
                    _currentPage = index;
                  });
                  _updateProgress();
                  HapticFeedback.selectionClick();
                },
                children: [
                  // Page 1: Calorie Goal Setup
                  CalorieGoalSetupWidget(
                    initialGoal: _calorieGoal,
                    onGoalSet: (goal) {
                      setState(() {
                        _calorieGoal = goal;
                        _isCalorieGoalValid = goal >= 1200 && goal <= 4000;
                      });
                    },
                  ),

                  // Page 2: Macro Preferences
                  MacroPreferencesWidget(
                    initialMacros: _macroPreferences,
                    onMacrosSet: (macros) {
                      setState(() {
                        _macroPreferences = macros;
                        final total = macros.values.reduce((a, b) => a + b);
                        _areMacrosValid = (total - 100).abs() <= 0.1;
                      });
                    },
                  ),

                  // Page 3: Water Intake Setup
                  WaterIntakeSetupWidget(
                    initialTarget: _waterTarget,
                    onTargetSet: (target) {
                      setState(() {
                        _waterTarget = target;
                        _isWaterTargetValid = target >= 1 && target <= 8;
                      });
                    },
                  ),
                ],
              ),
            ),

            // Bottom Navigation
            Container(
              padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 3.h),
              child: Column(
                children: [
                  // Main Action Button
                  SizedBox(
                    width: double.infinity,
                    height: 6.h,
                    child: ElevatedButton(
                      onPressed: _validateCurrentPage() ? _nextPage : null,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _validateCurrentPage()
                            ? AppTheme.calorieAccent
                            : AppTheme.neutralGray.withValues(alpha: 0.3),
                        foregroundColor: Colors.white,
                        elevation: _validateCurrentPage() ? 2 : 0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: Text(
                        _currentPage == _totalPages - 1
                            ? 'Get Started'
                            : 'Next',
                        style:
                            AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),

                  SizedBox(height: 2.h),

                  // Secondary Actions
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Back Button
                      _currentPage > 0
                          ? TextButton(
                              onPressed: _previousPage,
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  CustomIconWidget(
                                    iconName: 'arrow_back_ios',
                                    color: AppTheme.textMediumEmphasisLight,
                                    size: 4.w,
                                  ),
                                  SizedBox(width: 1.w),
                                  Text(
                                    'Back',
                                    style: AppTheme
                                        .lightTheme.textTheme.bodyMedium
                                        ?.copyWith(
                                      color: AppTheme.textMediumEmphasisLight,
                                    ),
                                  ),
                                ],
                              ),
                            )
                          : const SizedBox.shrink(),

                      // Skip Button
                      TextButton(
                        onPressed: _skipOnboarding,
                        child: Text(
                          'Skip for now',
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            color: AppTheme.textMediumEmphasisLight,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
