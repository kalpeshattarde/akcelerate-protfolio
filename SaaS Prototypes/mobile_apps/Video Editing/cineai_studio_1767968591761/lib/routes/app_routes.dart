import 'package:flutter/material.dart';
import '../presentation/create_screen/create_screen.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/video_preview_screen/video_preview_screen.dart';
import '../presentation/video_editor_screen/video_editor_screen.dart';
import '../presentation/effects_library_screen/effects_library_screen.dart';
import '../presentation/onboarding_hero_screen/onboarding_hero_screen.dart';
import '../presentation/user_profile_screen/user_profile_screen.dart';
import '../presentation/library_screen/library_screen.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String create = '/create-screen';
  static const String splash = '/splash-screen';
  static const String videoPreview = '/video-preview-screen';
  static const String videoEditor = '/video-editor-screen';
  static const String effectsLibrary = '/effects-library-screen';
  static const String onboardingHero = '/onboarding-hero-screen';
  static const String userProfile = '/user-profile-screen';
  static const String library = '/library-screen';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    create: (context) => const CreateScreen(),
    splash: (context) => const SplashScreen(),
    videoPreview: (context) => const VideoPreviewScreen(),
    videoEditor: (context) => const VideoEditorScreen(),
    effectsLibrary: (context) => const EffectsLibraryScreen(),
    onboardingHero: (context) => const OnboardingHeroScreen(),
    userProfile: (context) => const UserProfileScreen(),
    library: (context) => const LibraryScreen(),
    // TODO: Add your other routes here
  };
}
