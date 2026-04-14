import 'package:flutter/material.dart';
import '../presentation/baby_growth_tracker/baby_growth_tracker.dart';
import '../presentation/main_dashboard/main_dashboard.dart';
import '../presentation/welcome_onboarding/welcome_onboarding.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/contraction_timer/contraction_timer.dart';
import '../presentation/nutrition_health_reports/nutrition_health_reports.dart';
import '../presentation/wellness_tips_content/wellness_tips_content.dart';
import '../presentation/due_date_calculator/due_date_calculator.dart';
import '../presentation/pregnancy_setup_questionnaire/pregnancy_setup_questionnaire.dart';
import '../presentation/user_profile_settings/user_profile_settings.dart';
import '../presentation/kick_counter/kick_counter.dart';
import '../presentation/appointment_manager/appointment_manager.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String babyGrowthTracker = '/baby-growth-tracker';
  static const String mainDashboard = '/main-dashboard';
  static const String welcomeOnboarding = '/welcome-onboarding';
  static const String splash = '/splash-screen';
  static const String contractionTimer = '/contraction-timer';
  static const String nutritionHealthReports = '/nutrition-health-reports';
  static const String wellnessTipsContent = '/wellness-tips-content';
  static const String dueDateCalculator = '/due-date-calculator';
  static const String pregnancySetupQuestionnaire =
      '/pregnancy-setup-questionnaire';
  static const String userProfileSettings = '/user-profile-settings';
  static const String kickCounter = '/kick-counter';
  static const String appointmentManager = '/appointment-manager';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    babyGrowthTracker: (context) => const BabyGrowthTracker(),
    mainDashboard: (context) => const MainDashboard(),
    welcomeOnboarding: (context) => const WelcomeOnboarding(),
    splash: (context) => const SplashScreen(),
    contractionTimer: (context) => const ContractionTimer(),
    nutritionHealthReports: (context) => const NutritionHealthReports(),
    wellnessTipsContent: (context) => const WellnessTipsContent(),
    dueDateCalculator: (context) => const DueDateCalculator(),
    pregnancySetupQuestionnaire: (context) =>
        const PregnancySetupQuestionnaire(),
    userProfileSettings: (context) => const UserProfileSettings(),
    kickCounter: (context) => const KickCounter(),
    appointmentManager: (context) => const AppointmentManager(),
    // TODO: Add your other routes here
  };
}
