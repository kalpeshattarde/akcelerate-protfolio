import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/breathing_exercises_widget.dart';
import './widgets/continue_listening_widget.dart';
import './widgets/daily_meditation_card_widget.dart';
import './widgets/greeting_section_widget.dart';
import './widgets/quick_sessions_widget.dart';

class HomeDashboard extends StatefulWidget {
  const HomeDashboard({Key? key}) : super(key: key);

  @override
  State<HomeDashboard> createState() => _HomeDashboardState();
}

class _HomeDashboardState extends State<HomeDashboard> {
  bool _isRefreshing = false;

  // Mock data for the dashboard
  final Map<String, dynamic> _dailyMeditation = {
    "id": 1,
    "title": "Morning Mindfulness",
    "description":
        "Start your day with peaceful awareness and gentle breathing",
    "duration": 15,
    "backgroundImage":
        "https://images.unsplash.com/photo-1513374654938-eb9403b7c948",
    "semanticLabel":
        "Serene sunrise over calm lake with mountains in background, perfect for morning meditation",
    "category": "Mindfulness"
  };

  final List<Map<String, dynamic>> _quickSessions = [
    {
      "id": 1,
      "title": "Quick Calm",
      "duration": 5,
      "image": "https://images.unsplash.com/photo-1712954719421-c89e8afb96d3",
      "semanticLabel":
          "Person sitting in lotus position on wooden dock overlooking peaceful lake at sunset",
      "category": "Stress Relief"
    },
    {
      "id": 2,
      "title": "Focus Boost",
      "duration": 10,
      "image": "https://images.unsplash.com/photo-1695486825984-b2bfb9a751d9",
      "semanticLabel":
          "Zen garden with carefully arranged stones and raked sand patterns for meditation focus",
      "category": "Focus"
    },
    {
      "id": 3,
      "title": "Energy Reset",
      "duration": 7,
      "image": "https://images.unsplash.com/photo-1603478868394-0981bb3ae520",
      "semanticLabel":
          "Woman in white clothing meditating in bright sunlit room with plants and natural light",
      "category": "Energy"
    },
    {
      "id": 4,
      "title": "Sleep Prep",
      "duration": 8,
      "image": "https://images.unsplash.com/photo-1673727667979-d3c7f37cee77",
      "semanticLabel":
          "Peaceful bedroom scene with soft lighting and comfortable bedding for sleep meditation",
      "category": "Sleep"
    },
  ];

  final List<Map<String, dynamic>> _recentSessions = [
    {
      "id": 1,
      "title": "Deep Sleep Stories",
      "category": "Sleep",
      "progress": 0.65,
      "image": "https://images.unsplash.com/photo-1555693743-5c938ed86215",
      "semanticLabel":
          "Peaceful forest path with dappled sunlight filtering through tall trees creating a calming atmosphere",
    },
    {
      "id": 2,
      "title": "Anxiety Relief",
      "category": "Stress Relief",
      "progress": 0.35,
      "image": "https://images.unsplash.com/photo-1628688841502-f9322dcf305f",
      "semanticLabel":
          "Tranquil mountain lake reflecting cloudy sky with misty peaks in the distance for stress relief",
    },
  ];

  final List<Map<String, dynamic>> _breathingExercises = [
    {
      "id": 1,
      "name": "4-7-8 Breathing",
      "pattern": "4-7-8",
      "description": "Inhale for 4, hold for 7, exhale for 8",
      "duration": 5
    },
    {
      "id": 2,
      "name": "Box Breathing",
      "pattern": "4-4-4-4",
      "description": "Equal counts for inhale, hold, exhale, hold",
      "duration": 10
    },
    {
      "id": 3,
      "name": "Calm Breathing",
      "pattern": "4-6",
      "description": "Inhale for 4, exhale for 6",
      "duration": 8
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: _buildAppBar(),
      body: RefreshIndicator(
        onRefresh: _handleRefresh,
        color: AppTheme.lightTheme.colorScheme.secondary,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: SafeArea(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Greeting Section
                GreetingSectionWidget(
                  userName: "Sarah",
                  currentStreak: 7,
                ),
                SizedBox(height: 2.h),

                // Daily Meditation Card
                DailyMeditationCardWidget(
                  dailyMeditation: _dailyMeditation,
                  onStartPressed: _startDailyMeditation,
                ),
                SizedBox(height: 4.h),

                // Quick Sessions
                QuickSessionsWidget(
                  quickSessions: _quickSessions,
                  onSessionTap: _startQuickSession,
                ),
                SizedBox(height: 4.h),

                // Continue Listening
                ContinueListeningWidget(
                  recentSessions: _recentSessions,
                  onResumePressed: _resumeSession,
                ),
                SizedBox(height: 4.h),

                // Breathing Exercises
                BreathingExercisesWidget(
                  breathingExercises: _breathingExercises,
                  onExerciseTap: _startBreathingExercise,
                ),
                SizedBox(height: 4.h),
              ],
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _openMeditationTimer,
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        child: CustomIconWidget(
          iconName: 'timer',
          color: AppTheme.lightTheme.colorScheme.onSecondary,
          size: 24,
        ),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      elevation: 0,
      title: Text(
        "HeadSpace",
        style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.secondary,
              fontWeight: FontWeight.w700,
            ),
      ),
      actions: [
        IconButton(
          onPressed: _openSearch,
          icon: CustomIconWidget(
            iconName: 'search',
            color: AppTheme.lightTheme.colorScheme.onSurface,
            size: 24,
          ),
        ),
        SizedBox(width: 2.w),
      ],
    );
  }

  Future<void> _handleRefresh() async {
    setState(() {
      _isRefreshing = true;
    });

    // Simulate refresh delay
    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isRefreshing = false;
    });
  }

  void _startDailyMeditation() {
    Navigator.pushNamed(context, '/meditation-player');
  }

  void _startQuickSession(Map<String, dynamic> session) {
    Navigator.pushNamed(context, '/meditation-player');
  }

  void _resumeSession(Map<String, dynamic> session) {
    Navigator.pushNamed(context, '/meditation-player');
  }

  void _startBreathingExercise(Map<String, dynamic> exercise) {
    Navigator.pushNamed(context, '/breathing-exercise');
  }

  void _openMeditationTimer() {
    Navigator.pushNamed(context, '/meditation-player');
  }

  void _openSearch() {
    Navigator.pushNamed(context, '/meditation-library');
  }
}
