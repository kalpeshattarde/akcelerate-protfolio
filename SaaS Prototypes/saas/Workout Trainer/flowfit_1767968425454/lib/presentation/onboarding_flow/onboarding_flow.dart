import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../routes/app_routes.dart';
import './widgets/duration_selection_widget.dart';
import './widgets/equipment_selection_widget.dart';
import './widgets/fitness_level_widget.dart';
import './widgets/frequency_selection_widget.dart';
import './widgets/goal_selection_widget.dart';

class OnboardingFlow extends StatefulWidget {
  const OnboardingFlow({super.key});

  @override
  State<OnboardingFlow> createState() => _OnboardingFlowState();
}

class _OnboardingFlowState extends State<OnboardingFlow> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  // User selections
  String? _selectedGoal;
  String? _selectedFitnessLevel;
  List<String> _selectedEquipment = [];
  int _weeklyFrequency = 3;
  int _workoutDuration = 30;

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  bool _canContinue() {
    switch (_currentPage) {
      case 0:
        return _selectedGoal != null;
      case 1:
        return _selectedFitnessLevel != null;
      case 2:
        return _selectedEquipment.isNotEmpty;
      case 3:
        return true; // Frequency always has default value
      case 4:
        return true; // Duration always has default value
      default:
        return false;
    }
  }

  void _handleContinue() {
    HapticFeedback.lightImpact();

    if (_currentPage < 4) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _completeOnboarding();
    }
  }

  void _completeOnboarding() async {
    // Save onboarding completion
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('hasCompletedOnboarding', true);

    // Navigate to main app
    if (mounted) {
      Navigator.pushReplacementNamed(context, AppRoutes.navigationContainer);
    }
  }

  void _handleSkip() async {
    HapticFeedback.lightImpact();

    // Save onboarding completion when skipping
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('hasCompletedOnboarding', true);

    // Navigate to main app using navigation container
    if (mounted) {
      Navigator.pushReplacementNamed(context, AppRoutes.navigationContainer);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.colorScheme.surface,
      appBar: _buildAppBar(theme),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: PageView(
                controller: _pageController,
                physics: const NeverScrollableScrollPhysics(),
                onPageChanged: (index) {
                  setState(() => _currentPage = index);
                },
                children: [
                  GoalSelectionWidget(
                    selectedGoal: _selectedGoal,
                    onGoalSelected: (goal) {
                      setState(() => _selectedGoal = goal);
                    },
                  ),
                  FitnessLevelWidget(
                    selectedLevel: _selectedFitnessLevel,
                    onLevelSelected: (level) {
                      setState(() => _selectedFitnessLevel = level);
                    },
                  ),
                  EquipmentSelectionWidget(
                    selectedEquipment: _selectedEquipment,
                    onEquipmentChanged: (equipment) {
                      setState(() => _selectedEquipment = equipment);
                    },
                  ),
                  FrequencySelectionWidget(
                    frequency: _weeklyFrequency,
                    onFrequencyChanged: (frequency) {
                      setState(() => _weeklyFrequency = frequency);
                    },
                  ),
                  DurationSelectionWidget(
                    duration: _workoutDuration,
                    onDurationSelected: (duration) {
                      setState(() => _workoutDuration = duration);
                    },
                  ),
                ],
              ),
            ),
            _buildBottomSection(theme),
          ],
        ),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(ThemeData theme) {
    return AppBar(
      backgroundColor: theme.colorScheme.surface,
      elevation: 0,
      automaticallyImplyLeading: false,
      title: Row(
        children: [
          Expanded(
            child: Container(
              height: 4,
              decoration: BoxDecoration(
                color: theme.colorScheme.primaryContainer,
                borderRadius: BorderRadius.circular(2),
              ),
              child: LayoutBuilder(
                builder: (context, constraints) {
                  return Stack(
                    children: [
                      AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        width: constraints.maxWidth * ((_currentPage + 1) / 5),
                        height: 4,
                        decoration: BoxDecoration(
                          color: theme.colorScheme.primary,
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
          ),
          const SizedBox(width: 12),
          Text(
            '${_currentPage + 1} of 5',
            style: theme.textTheme.labelMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: _handleSkip,
          style: TextButton.styleFrom(
            foregroundColor: theme.colorScheme.onSurfaceVariant.withValues(
              alpha: 0.6,
            ),
          ),
          child: Text(
            'Skip',
            style: theme.textTheme.labelLarge?.copyWith(
              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
            ),
          ),
        ),
        const SizedBox(width: 8),
      ],
    );
  }

  Widget _buildBottomSection(ThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color: theme.colorScheme.shadow.withValues(alpha: 0.08),
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SmoothPageIndicator(
            controller: _pageController,
            count: 5,
            effect: ExpandingDotsEffect(
              activeDotColor: theme.colorScheme.primary,
              dotColor: theme.colorScheme.primaryContainer,
              dotHeight: 8,
              dotWidth: 8,
              expansionFactor: 3,
              spacing: 8,
            ),
          ),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: _canContinue() ? _handleContinue : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: theme.colorScheme.primary,
                foregroundColor: theme.colorScheme.onPrimary,
                disabledBackgroundColor: theme.colorScheme.primaryContainer,
                disabledForegroundColor: theme.colorScheme.onPrimaryContainer
                    .withValues(alpha: 0.4),
                elevation: _canContinue() ? 2 : 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: Text(
                _currentPage == 4 ? 'Get Started ✨' : 'Continue',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  color:
                      _canContinue()
                          ? theme.colorScheme.onPrimary
                          : theme.colorScheme.onPrimaryContainer.withValues(
                            alpha: 0.4,
                          ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCelebrationDialog() {
    final theme = Theme.of(context);

    return Dialog(
      backgroundColor: Colors.transparent,
      child: Container(
        padding: const EdgeInsets.all(32),
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(24),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TweenAnimationBuilder<double>(
              tween: Tween(begin: 0.0, end: 1.0),
              duration: const Duration(milliseconds: 600),
              curve: Curves.elasticOut,
              builder: (context, value, child) {
                return Transform.scale(
                  scale: value,
                  child: Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primaryContainer,
                      shape: BoxShape.circle,
                    ),
                    child: Center(
                      child: Text('✨', style: TextStyle(fontSize: 40 * value)),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 24),
            Text(
              'You\'re all set!',
              style: theme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w700,
                color: theme.colorScheme.onSurface,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 12),
            Text(
              'Let\'s start your fitness journey',
              style: theme.textTheme.bodyLarge?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
