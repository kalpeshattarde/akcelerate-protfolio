import 'package:flutter/material.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/sleep_sounds_library/sleep_sounds_library.dart';
import '../presentation/authentication_screen/authentication_screen.dart';
import '../presentation/onboarding_flow/onboarding_flow.dart';
import '../presentation/breathing_exercise/breathing_exercise.dart';
import '../presentation/meditation_player/meditation_player.dart';
import '../widgets/main_app_wrapper.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String splash = '/splash-screen';
  static const String sleepSoundsLibrary = '/sleep-sounds-library';
  static const String homeDashboard = '/home-dashboard';
  static const String meditationLibrary = '/meditation-library';
  static const String userProfile = '/user-profile';
  static const String progressTracking = '/progress-tracking';
  static const String authentication = '/authentication-screen';
  static const String onboardingFlow = '/onboarding-flow';
  static const String breathingExercise = '/breathing-exercise';
  static const String meditationPlayer = '/meditation-player';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    splash: (context) => const SplashScreen(),
    sleepSoundsLibrary: (context) => const SleepSoundsLibrary(),
    homeDashboard: (context) => const MainAppWrapper(initialIndex: 0),
    meditationLibrary: (context) => const MainAppWrapper(initialIndex: 1),
    progressTracking: (context) => const MainAppWrapper(initialIndex: 2),
    userProfile: (context) => const MainAppWrapper(initialIndex: 3),
    authentication: (context) => const AuthenticationScreen(),
    onboardingFlow: (context) => const OnboardingFlow(),
    breathingExercise: (context) => const BreathingExercise(),
    meditationPlayer: (context) => const MeditationPlayer(),
    // TODO: Add your other routes here
  };
}
