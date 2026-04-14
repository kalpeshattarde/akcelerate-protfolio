import 'package:flutter/material.dart';
import '../presentation/service_dashboard/service_dashboard.dart';
import '../presentation/live_service_tracking/live_service_tracking.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/service_rating_review/service_rating_review.dart';
import '../presentation/provider_profile/provider_profile.dart';
import '../presentation/onboarding_tutorial/onboarding_tutorial.dart';
import '../presentation/service_history/service_history.dart';
import '../presentation/service_booking_flow/service_booking_flow.dart';
import '../presentation/settings_profile/settings_profile.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String serviceDashboard = '/service-dashboard';
  static const String liveServiceTracking = '/live-service-tracking';
  static const String splash = '/splash-screen';
  static const String serviceRatingReview = '/service-rating-review';
  static const String providerProfile = '/provider-profile';
  static const String onboardingTutorial = '/onboarding-tutorial';
  static const String serviceHistory = '/service-history';
  static const String serviceBookingFlow = '/service-booking-flow';
  static const String settingsProfile = '/settings-profile';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    serviceDashboard: (context) => const ServiceDashboard(),
    liveServiceTracking: (context) => const LiveServiceTracking(),
    splash: (context) => const SplashScreen(),
    serviceRatingReview: (context) => const ServiceRatingReview(),
    providerProfile: (context) => const ProviderProfile(),
    onboardingTutorial: (context) => const OnboardingTutorial(),
    serviceHistory: (context) => const ServiceHistory(),
    serviceBookingFlow: (context) => const ServiceBookingFlow(),
    settingsProfile: (context) => const SettingsProfile(),
    // TODO: Add your other routes here
  };
}
