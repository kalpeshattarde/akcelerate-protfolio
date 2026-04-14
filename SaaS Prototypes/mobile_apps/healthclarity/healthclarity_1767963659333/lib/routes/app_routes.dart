import 'package:flutter/material.dart';

import '../presentation/about_app/about_app_screen.dart';
import '../presentation/food_log_history/food_log_history.dart';
import '../presentation/main_layout/main_layout.dart';
import '../presentation/onboarding_flow/onboarding_flow.dart';
import '../presentation/splash_screen/splash_screen.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String splash = '/splash-screen';
  static const String mainLayout = '/main-layout';
  static const String foodLogHistory = '/food-log-history';
  static const String onboardingFlow = '/onboarding-flow';

  // Legacy routes for backward compatibility
  static const String dashboardHome = '/dashboard-home';
  static const String waterTracking = '/water-tracking';
  static const String profileAndSettings = '/profile-and-settings';
  static const String foodSearchAndLogging = '/food-search-and-logging';
  static const String aboutApp = '/about-app';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    splash: (context) => const SplashScreen(),
    mainLayout: (context) => const MainLayout(),
    foodLogHistory: (context) => const FoodLogHistory(),
    onboardingFlow: (context) => const OnboardingFlow(),

    // Legacy routes redirecting to main layout with appropriate tab
    dashboardHome: (context) => const MainLayout(initialIndex: 0),
    foodSearchAndLogging: (context) => const MainLayout(initialIndex: 1),
    waterTracking: (context) => const MainLayout(initialIndex: 2),
    profileAndSettings: (context) => const MainLayout(initialIndex: 3),
    // TODO: Add your other routes here
    aboutApp: (context) => const AboutAppScreen(),
  };
}
