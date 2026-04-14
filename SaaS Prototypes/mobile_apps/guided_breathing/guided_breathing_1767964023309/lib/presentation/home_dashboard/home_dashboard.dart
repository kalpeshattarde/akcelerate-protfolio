import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/breathing_circle_widget.dart';
import './widgets/category_pills_widget.dart';
import './widgets/emergency_panic_button_widget.dart';
import './widgets/progress_rings_widget.dart';
import './widgets/quick_access_cards_widget.dart';
import './widgets/wellness_greeting_widget.dart';

class HomeDashboard extends StatefulWidget {
  const HomeDashboard({Key? key}) : super(key: key);

  @override
  State<HomeDashboard> createState() => _HomeDashboardState();
}

class _HomeDashboardState extends State<HomeDashboard>
    with TickerProviderStateMixin {
  late AnimationController _backgroundController;
  late Animation<double> _backgroundAnimation;

  int _currentBottomNavIndex = 0;
  bool _isRefreshing = false;

  // Mock user data
  final String userName = "Sarah";
  final int currentStreak = 7;
  final double meditationProgress = 0.75;
  final double breathingProgress = 0.60;
  final double sleepProgress = 0.85;

  @override
  void initState() {
    super.initState();

    // Background gradient animation
    _backgroundController = AnimationController(
      duration: const Duration(seconds: 8),
      vsync: this,
    );

    _backgroundAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _backgroundController, curve: Curves.easeInOut),
    );

    _backgroundController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _backgroundController.dispose();
    super.dispose();
  }

  Future<void> _handleRefresh() async {
    setState(() {
      _isRefreshing = true;
    });

    // Simulate data refresh
    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isRefreshing = false;
    });

    HapticFeedback.lightImpact();
  }

  void _handleBreathingTap() {
    Navigator.pushNamed(context, '/breathing-exercise');
  }

  void _handleMeditationTap() {
    Navigator.pushNamed(context, '/meditation-library');
  }

  void _handleSleepStoriesTap() {
    Navigator.pushNamed(context, '/sleep-stories');
  }

  void _handleRecentSessionsTap() {
    Navigator.pushNamed(context, '/meditation-player');
  }

  void _handleCategorySelected(String category) {
    // Filter content based on selected category
    HapticFeedback.selectionClick();
  }

  void _handleEmergencyTap() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: AppTheme.lightTheme.colorScheme.surface,
          title: Text(
            'Crisis Support',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface,
            ),
          ),
          content: Text(
            'Immediate breathing exercise starting now. Focus on your breath and follow the guide.',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                Navigator.pushNamed(context, '/breathing-exercise');
              },
              child: Text(
                'Start Now',
                style: TextStyle(
                  color: AppTheme.lightTheme.colorScheme.secondary,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  void _handleBottomNavTap(int index) {
    setState(() {
      _currentBottomNavIndex = index;
    });

    HapticFeedback.selectionClick();

    switch (index) {
      case 0:
        // Already on home
        break;
      case 1:
        Navigator.pushNamed(context, '/breathing-exercise');
        break;
      case 2:
        Navigator.pushNamed(context, '/progress-analytics');
        break;
      case 3:
        Navigator.pushNamed(context, '/meditation-library');
        break;
      case 4:
        Navigator.pushNamed(context, '/profile-settings');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: AnimatedBuilder(
        animation: _backgroundAnimation,
        builder: (context, child) {
          return Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Color.lerp(
                    AppTheme.lightTheme.colorScheme.primary,
                    AppTheme.lightTheme.colorScheme.secondary,
                    _backgroundAnimation.value,
                  )!,
                  Color.lerp(
                    AppTheme.lightTheme.colorScheme.secondary,
                    AppTheme.particleColor,
                    _backgroundAnimation.value,
                  )!,
                ],
              ),
            ),
            child: SafeArea(
              child: Stack(
                children: [
                  // Main content
                  RefreshIndicator(
                    onRefresh: _handleRefresh,
                    color: AppTheme.lightTheme.colorScheme.secondary,
                    backgroundColor: AppTheme.lightTheme.colorScheme.surface,
                    child: SingleChildScrollView(
                      physics: const AlwaysScrollableScrollPhysics(),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(height: 2.h),

                          // Greeting section
                          WellnessGreetingWidget(
                            userName: userName,
                            currentStreak: currentStreak,
                          ),

                          SizedBox(height: 4.h),

                          // Breathing circle hero section
                          Center(
                            child: BreathingCircleWidget(
                              onTap: _handleBreathingTap,
                            ),
                          ),

                          SizedBox(height: 4.h),

                          // Quick access cards
                          QuickAccessCardsWidget(
                            onMeditationTap: _handleMeditationTap,
                            onSleepStoriesTap: _handleSleepStoriesTap,
                            onRecentSessionsTap: _handleRecentSessionsTap,
                          ),

                          SizedBox(height: 3.h),

                          // Progress rings
                          ProgressRingsWidget(
                            meditationProgress: meditationProgress,
                            breathingProgress: breathingProgress,
                            sleepProgress: sleepProgress,
                          ),

                          SizedBox(height: 3.h),

                          // Category pills
                          CategoryPillsWidget(
                            onCategorySelected: _handleCategorySelected,
                          ),

                          SizedBox(
                            height: 3.h,
                          ), // Updated bottom padding - removed FAB reference
                        ],
                      ),
                    ),
                  ),

                  // Emergency panic button
                  EmergencyPanicButtonWidget(onTap: _handleEmergencyTap),

                  // Loading overlay
                  if (_isRefreshing)
                    Container(
                      color: Colors.black.withValues(alpha: 0.3),
                      child: const Center(child: CircularProgressIndicator()),
                    ),
                ],
              ),
            ),
          );
        },
      ),

      // Bottom Navigation Bar
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentBottomNavIndex,
        onTap: _handleBottomNavTap,
        type: BottomNavigationBarType.fixed,
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        selectedItemColor: AppTheme.lightTheme.colorScheme.secondary,
        unselectedItemColor: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
        elevation: 8,
        items: [
          BottomNavigationBarItem(
            icon: CustomIconWidget(
              iconName: 'home',
              color: _currentBottomNavIndex == 0
                  ? AppTheme.lightTheme.colorScheme.secondary
                  : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              size: 24,
            ),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: CustomIconWidget(
              iconName: 'air',
              color: _currentBottomNavIndex == 1
                  ? AppTheme.lightTheme.colorScheme.secondary
                  : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              size: 24,
            ),
            label: 'Breathe',
          ),
          BottomNavigationBarItem(
            icon: CustomIconWidget(
              iconName: 'analytics',
              color: _currentBottomNavIndex == 2
                  ? AppTheme.lightTheme.colorScheme.secondary
                  : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              size: 24,
            ),
            label: 'Progress',
          ),
          BottomNavigationBarItem(
            icon: CustomIconWidget(
              iconName: 'library_music',
              color: _currentBottomNavIndex == 3
                  ? AppTheme.lightTheme.colorScheme.secondary
                  : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              size: 24,
            ),
            label: 'Library',
          ),
          BottomNavigationBarItem(
            icon: CustomIconWidget(
              iconName: 'person',
              color: _currentBottomNavIndex == 4
                  ? AppTheme.lightTheme.colorScheme.secondary
                  : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              size: 24,
            ),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
