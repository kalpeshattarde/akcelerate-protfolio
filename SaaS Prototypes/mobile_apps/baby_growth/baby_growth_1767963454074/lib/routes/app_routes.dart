import 'package:flutter/material.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/growth_tracking/growth_tracking.dart';
import '../presentation/historical_records/historical_records.dart';
import '../presentation/milestone_tracker/milestone_tracker.dart';
import '../presentation/baby_profile_setup/baby_profile_setup.dart';
import '../presentation/feeding_log/feeding_log.dart';
import '../presentation/dashboard_home/dashboard_home.dart';
import '../presentation/sleep_tracker/sleep_tracker.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String splash = '/splash-screen';
  static const String growthTracking = '/growth-tracking';
  static const String historicalRecords = '/historical-records';
  static const String milestoneTracker = '/milestone-tracker';
  static const String babyProfileSetup = '/baby-profile-setup';
  static const String feedingLog = '/feeding-log';
  static const String dashboardHome = '/dashboard-home';
  static const String sleepTracker = '/sleep-tracker';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    splash: (context) => const SplashScreen(),
    growthTracking: (context) => const GrowthTracking(),
    historicalRecords: (context) => const HistoricalRecords(),
    milestoneTracker: (context) => const MilestoneTracker(),
    babyProfileSetup: (context) => const BabyProfileSetup(),
    feedingLog: (context) => const FeedingLog(),
    dashboardHome: (context) => const DashboardHome(),
    sleepTracker: (context) => const SleepTracker(),
    // TODO: Add your other routes here
  };
}
