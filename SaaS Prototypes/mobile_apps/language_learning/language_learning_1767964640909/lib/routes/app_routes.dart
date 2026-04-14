import 'package:flutter/material.dart';
import '../presentation/cultural_immersion/cultural_immersion.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/social_features_hub/social_features_hub.dart';
import '../presentation/pronunciation_practice/pronunciation_practice.dart';
import '../presentation/login_screen/login_screen.dart';
import '../presentation/onboarding_flow/onboarding_flow.dart';
import '../presentation/bottom_navigation/bottom_navigation_wrapper.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String progressAnalytics = '/progress-analytics';
  static const String culturalImmersion = '/cultural-immersion';
  static const String splash = '/splash-screen';
  static const String socialFeaturesHub = '/social-features-hub';
  static const String homeDashboard = '/home-dashboard';
  static const String pronunciationPractice = '/pronunciation-practice';
  static const String loginScreen = '/login-screen';
  static const String onboardingFlow = '/onboarding-flow';
  static const String settingsAndProfile = '/settings-and-profile';
  static const String lessonInterface = '/lesson-interface';
  static const String main = '/main';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    main: (context) => const BottomNavigationWrapper(),
    progressAnalytics: (context) {
      final args = ModalRoute.of(context)?.settings.arguments as int? ?? 2;
      return BottomNavigationWrapper(initialIndex: args);
    },
    culturalImmersion: (context) => const CulturalImmersion(),
    splash: (context) => const SplashScreen(),
    socialFeaturesHub: (context) => const SocialFeaturesHub(),
    homeDashboard: (context) {
      final args = ModalRoute.of(context)?.settings.arguments as int? ?? 0;
      return BottomNavigationWrapper(initialIndex: args);
    },
    pronunciationPractice: (context) => PronunciationPractice(),
    loginScreen: (context) => const LoginScreen(),
    onboardingFlow: (context) => const OnboardingFlow(),
    settingsAndProfile: (context) {
      final args = ModalRoute.of(context)?.settings.arguments as int? ?? 3;
      return BottomNavigationWrapper(initialIndex: args);
    },
    lessonInterface: (context) {
      final args = ModalRoute.of(context)?.settings.arguments as int? ?? 1;
      return BottomNavigationWrapper(initialIndex: args);
    },
    // TODO: Add your other routes here
  };
}
