import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/continue_program_card_widget.dart';
import './widgets/daily_recommendation_card_widget.dart';
import './widgets/energy_level_modal_widget.dart';
import './widgets/greeting_header_widget.dart';
import './widgets/quick_start_section_widget.dart';
import './widgets/today_goals_widget.dart';

/// Home/Today Screen - Primary dashboard with daily workout motivation
class HomeTodayScreen extends StatefulWidget {
  const HomeTodayScreen({super.key});

  @override
  State<HomeTodayScreen> createState() => _HomeTodayScreenState();
}

class _HomeTodayScreenState extends State<HomeTodayScreen> {
  bool _isLoading = false;
  String _selectedEnergyLevel = 'Medium';

  // Mock data for daily recommendation
  final Map<String, dynamic> _dailyRecommendation = {
    'id': 1,
    'title': 'Full Body Strength',
    'thumbnail':
        'https://img.rocket.new/generatedImages/rocket_gen_img_1af5cc034-1764671662179.png',
    'semanticLabel':
        'Woman performing strength training exercises with dumbbells in a bright gym setting',
    'duration': 30,
    'difficulty': 'Intermediate',
    'calories': 250,
    'description':
        'Build strength with compound movements targeting all major muscle groups',
  };

  // Mock data for active program
  final Map<String, dynamic> _activeProgram = {
    'id': 1,
    'title': '30-Day Core Challenge',
    'completedDays': 12,
    'totalDays': 30,
    'nextSession': 'Plank Variations',
  };

  // Mock data for quick start workouts
  final List<Map<String, dynamic>> _quickWorkouts = [
    {
      'id': 1,
      'title': '15 Min HIIT',
      'thumbnail':
          'https://img.rocket.new/generatedImages/rocket_gen_img_15abcb1b6-1764657990924.png',
      'semanticLabel':
          'Person doing high-intensity interval training exercises in a modern fitness studio',
      'duration': 15,
      'difficulty': 'Beginner',
    },
    {
      'id': 2,
      'title': '30 Min Yoga',
      'thumbnail':
          'https://img.rocket.new/generatedImages/rocket_gen_img_1dd1d8f9f-1765016856023.png',
      'semanticLabel':
          'Woman practicing yoga poses on a mat in a peaceful indoor environment',
      'duration': 30,
      'difficulty': 'Beginner',
    },
    {
      'id': 3,
      'title': '45 Min Cardio',
      'thumbnail':
          'https://img.rocket.new/generatedImages/rocket_gen_img_1d9012db6-1764730666719.png',
      'semanticLabel':
          'Person running on a treadmill in a well-lit gym with cardio equipment',
      'duration': 45,
      'difficulty': 'Advanced',
    },
  ];

  // Mock data for today's goals
  final Map<String, dynamic> _todayGoals = {
    'activeMinutes': 25,
    'activeMinutesGoal': 30,
    'calories': 180,
    'caloriesGoal': 250,
    'workouts': 1,
    'workoutsGoal': 1,
  };

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(kToolbarHeight + 16),
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
                theme.colorScheme.surface,
              ],
            ),
            border: Border(
              bottom: BorderSide(
                color: theme.colorScheme.outline.withValues(alpha: 0.1),
                width: 1,
              ),
            ),
          ),
          child: SafeArea(
            bottom: false,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  // App Logo/Name
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: [
                              theme.colorScheme.primary,
                              theme.colorScheme.primary.withValues(alpha: 0.7),
                            ],
                          ),
                          borderRadius: BorderRadius.circular(12),
                          boxShadow: [
                            BoxShadow(
                              color: theme.colorScheme.primary.withValues(
                                alpha: 0.3,
                              ),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: Icon(
                          Icons.fitness_center_rounded,
                          color: theme.colorScheme.onPrimary,
                          size: 20,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Text(
                        'FlowFit',
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w800,
                          letterSpacing: -0.5,
                          fontSize: 22,
                        ),
                      ),
                    ],
                  ),
                  // Action buttons
                  Container(
                    decoration: BoxDecoration(
                      color: theme.colorScheme.surfaceContainerHighest
                          .withValues(alpha: 0.5),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: IconButton(
                      icon: CustomIconWidget(
                        iconName: 'notifications_outlined',
                        color: theme.colorScheme.onSurface,
                        size: 22,
                      ),
                      onPressed: () {
                        HapticFeedback.lightImpact();
                        // Navigate to notifications
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: _handleRefresh,
        color: theme.colorScheme.primary,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Greeting header with streak
              GreetingHeaderWidget(userName: 'Alex', currentStreak: 7),

              SizedBox(height: 1.h),

              // Daily recommendation card
              DailyRecommendationCardWidget(
                workout: _dailyRecommendation,
                onStartWorkout: _handleStartWorkout,
              ),

              SizedBox(height: 2.h),

              // Continue program card
              ContinueProgramCardWidget(
                program: _activeProgram,
                onContinue: _handleContinueProgram,
              ),

              SizedBox(height: 2.h),

              // Quick start section
              QuickStartSectionWidget(
                quickWorkouts: _quickWorkouts,
                onWorkoutTap: _handleQuickWorkoutTap,
              ),

              SizedBox(height: 2.h),

              // Today's goals
              TodayGoalsWidget(goals: _todayGoals),

              SizedBox(height: 2.h),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _showEnergyLevelModal,
        backgroundColor: theme.colorScheme.primary,
        foregroundColor: theme.colorScheme.onPrimary,
        icon: CustomIconWidget(
          iconName: 'bolt',
          color: theme.colorScheme.onPrimary,
          size: 24,
        ),
        label: Text(
          'Energy Level',
          style: theme.textTheme.labelLarge?.copyWith(
            color: theme.colorScheme.onPrimary,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }

  Future<void> _handleRefresh() async {
    setState(() {
      _isLoading = true;
    });

    // Simulate API call
    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      _isLoading = false;
    });

    if (mounted) {
      HapticFeedback.lightImpact();
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Recommendations updated ✨'),
          duration: const Duration(seconds: 2),
          behavior: SnackBarBehavior.floating,
          backgroundColor: Theme.of(context).colorScheme.primary,
        ),
      );
    }
  }

  void _handleStartWorkout() {
    HapticFeedback.mediumImpact();
    Navigator.pushNamed(
      context,
      '/workout-player-screen',
      arguments: _dailyRecommendation,
    );
  }

  void _handleContinueProgram() {
    HapticFeedback.lightImpact();
    Navigator.pushNamed(context, '/programs-screen', arguments: _activeProgram);
  }

  void _handleQuickWorkoutTap(Map<String, dynamic> workout) {
    HapticFeedback.lightImpact();
    Navigator.pushNamed(context, '/workout-player-screen', arguments: workout);
  }

  void _showEnergyLevelModal() {
    HapticFeedback.lightImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder:
          (context) => EnergyLevelModalWidget(
            onEnergySelected: (level) {
              setState(() {
                _selectedEnergyLevel = level;
              });
              HapticFeedback.mediumImpact();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Energy level set to $level'),
                  duration: const Duration(seconds: 2),
                  behavior: SnackBarBehavior.floating,
                  backgroundColor: Theme.of(context).colorScheme.primary,
                ),
              );
            },
          ),
    );
  }
}
