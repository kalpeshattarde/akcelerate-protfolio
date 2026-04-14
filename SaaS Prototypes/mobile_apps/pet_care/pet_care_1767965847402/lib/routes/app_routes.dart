import 'package:flutter/material.dart';
import '../presentation/emergency_resources/emergency_resources.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/pet_profile_management/pet_profile_management.dart';
import '../presentation/home_dashboard/home_dashboard.dart';
import '../presentation/medication_management/medication_management.dart';
import '../presentation/onboarding_flow/onboarding_flow.dart';
import '../presentation/medical_records/medical_records.dart';
import '../presentation/health_analytics/health_analytics.dart';
import '../presentation/veterinary_appointments/veterinary_appointments.dart';
import '../presentation/settings_and_profile/settings_and_profile.dart';
import '../presentation/care_task_management/care_task_management.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String emergencyResources = '/emergency-resources';
  static const String splash = '/splash-screen';
  static const String petProfileManagement = '/pet-profile-management';
  static const String homeDashboard = '/home-dashboard';
  static const String medicationManagement = '/medication-management';
  static const String onboardingFlow = '/onboarding-flow';
  static const String medicalRecords = '/medical-records';
  static const String healthAnalytics = '/health-analytics';
  static const String veterinaryAppointments = '/veterinary-appointments';
  static const String settingsAndProfile = '/settings-and-profile';
  static const String careTaskManagement = '/care-task-management';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    emergencyResources: (context) => const EmergencyResources(),
    splash: (context) => const SplashScreen(),
    petProfileManagement: (context) => const PetProfileManagement(),
    homeDashboard: (context) => const HomeDashboard(),
    medicationManagement: (context) => const MedicationManagement(),
    onboardingFlow: (context) => const OnboardingFlow(),
    medicalRecords: (context) => const MedicalRecords(),
    healthAnalytics: (context) => const HealthAnalytics(),
    veterinaryAppointments: (context) => const VeterinaryAppointments(),
    settingsAndProfile: (context) => const SettingsAndProfile(),
    careTaskManagement: (context) => const CareTaskManagement(),
    // TODO: Add your other routes here
  };
}