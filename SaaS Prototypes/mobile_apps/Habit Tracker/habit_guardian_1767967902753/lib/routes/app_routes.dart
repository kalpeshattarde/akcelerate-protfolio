import 'package:flutter/material.dart';
import '../presentation/progress_analytics/progress_analytics.dart';
import '../presentation/habit_detail/habit_detail.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/habit_dashboard/habit_dashboard.dart';
import '../presentation/user_profile/user_profile.dart';
import '../presentation/authentication_screen/authentication_screen.dart';
import '../presentation/onboarding_flow/onboarding_flow.dart';
import '../presentation/habit_creation/habit_creation.dart';
import '../presentation/community_challenges/community_challenges.dart';
import '../presentation/notifications_center/notifications_center.dart';
import '../presentation/reflection_journal/reflection_journal.dart';

class AppRoutes {
  // Main navigation routes
  static const String initial = '/';
  static const String habitDashboard = '/habit-dashboard';
  static const String habitCreation = '/habit-creation';
  static const String progressAnalytics = '/progress-analytics';
  static const String userProfile = '/user-profile';

  // Secondary routes
  static const String habitDetail = '/habit-detail';
  static const String splash = '/splash-screen';
  static const String authentication = '/authentication-screen';
  static const String onboardingFlow = '/onboarding-flow';
  static const String communityChallenges = '/community-challenges';
  static const String notificationsCenter = '/notifications-center';
  static const String reflectionJournal = '/reflection-journal';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    habitDashboard: (context) => const HabitDashboard(),
    habitCreation: (context) => const HabitCreation(),
    progressAnalytics: (context) => const ProgressAnalytics(),
    userProfile: (context) => const UserProfile(),
    habitDetail: (context) => const HabitDetail(),
    splash: (context) => const SplashScreen(),
    authentication: (context) => const AuthenticationScreen(),
    onboardingFlow: (context) => const OnboardingFlow(),
    communityChallenges: (context) => const CommunityChallenges(),
    notificationsCenter: (context) => const NotificationsCenter(),
    reflectionJournal: (context) => const ReflectionJournal(),
  };
}
