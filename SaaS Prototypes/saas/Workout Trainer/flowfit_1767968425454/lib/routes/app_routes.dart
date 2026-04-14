import 'package:flutter/material.dart';

import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/navigation_container/navigation_container_screen.dart';
import '../presentation/onboarding_flow/onboarding_flow.dart';
import '../presentation/workout_player_screen/workout_player_screen.dart';

/// Application routes configuration
class AppRoutes {
  // Route constants
  static const String initial = splashScreen;
  static const String splashScreen = '/splash-screen';
  static const String onboardingFlow = '/onboarding-flow';
  static const String navigationContainer = '/navigation-container';
  static const String homeTodayScreen = '/home-today-screen';
  static const String workoutsLibraryScreen = '/workouts-library-screen';
  static const String programsScreen = '/programs-screen';
  static const String progressTrackingScreen = '/progress-tracking-screen';
  static const String profileSettingsScreen = '/profile-settings-screen';
  static const String workoutPlayerScreen = '/workout-player-screen';

  /// Routes map
  static Map<String, WidgetBuilder> get routes => {
    splashScreen: (context) => const SplashScreen(),
    onboardingFlow: (context) => const OnboardingFlow(),
    navigationContainer: (context) => const NavigationContainerScreen(),
    workoutPlayerScreen: (context) => const WorkoutPlayerScreen(),
  };
}
