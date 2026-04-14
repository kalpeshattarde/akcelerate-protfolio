import 'package:flutter/material.dart';
import '../presentation/progress_analytics/progress_analytics.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/home_dashboard/home_dashboard.dart';
import '../presentation/meditation_library/meditation_library.dart';
import '../presentation/login_screen/login_screen.dart';
import '../presentation/onboarding_flow/onboarding_flow.dart';
import '../presentation/profile_settings/profile_settings.dart';
import '../presentation/breathing_exercise/breathing_exercise.dart';
import '../presentation/meditation_player/meditation_player.dart';
import '../presentation/sleep_stories/sleep_stories.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String progressAnalytics = '/progress-analytics';
  static const String splash = '/splash-screen';
  static const String homeDashboard = '/home-dashboard';
  static const String meditationLibrary = '/meditation-library';
  static const String login = '/login-screen';
  static const String onboardingFlow = '/onboarding-flow';
  static const String profileSettings = '/profile-settings';
  static const String breathingExercise = '/breathing-exercise';
  static const String meditationPlayer = '/meditation-player';
  static const String sleepStories = '/sleep-stories';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    progressAnalytics: (context) => const ProgressAnalytics(),
    splash: (context) => const SplashScreen(),
    homeDashboard: (context) => const HomeDashboard(),
    meditationLibrary: (context) => const MeditationLibrary(),
    login: (context) => const LoginScreen(),
    onboardingFlow: (context) => const OnboardingFlow(),
    profileSettings: (context) => const ProfileSettings(),
    breathingExercise: (context) => const BreathingExercise(),
    meditationPlayer: (context) => const MeditationPlayer(),
    sleepStories: (context) => const SleepStories(),
    // TODO: Add your other routes here
  };
}
