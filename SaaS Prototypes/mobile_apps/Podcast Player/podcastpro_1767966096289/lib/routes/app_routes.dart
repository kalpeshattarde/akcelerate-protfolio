import 'package:flutter/material.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/home_dashboard/home_dashboard.dart';
import '../presentation/login_screen/login_screen.dart';
import '../presentation/onboarding_flow/onboarding_flow.dart';
import '../presentation/podcast_detail_screen/podcast_detail_screen.dart';
import '../presentation/search_and_discovery/search_and_discovery.dart';
import '../presentation/downloads_and_library/downloads_and_library.dart';
import '../presentation/audio_player_screen/audio_player_screen.dart';
import '../presentation/profile_screen/profile_screen.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String splash = '/splash-screen';
  static const String homeDashboard = '/home-dashboard';
  static const String login = '/login-screen';
  static const String onboardingFlow = '/onboarding-flow';
  static const String podcastDetail = '/podcast-detail-screen';
  static const String searchAndDiscovery = '/search-and-discovery';
  static const String downloadsAndLibrary = '/downloads-and-library';
  static const String audioPlayer = '/audio-player-screen';
  static const String profile = '/profile-screen';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    splash: (context) => const SplashScreen(),
    homeDashboard: (context) => const HomeDashboard(),
    login: (context) => const LoginScreen(),
    onboardingFlow: (context) => const OnboardingFlow(),
    podcastDetail: (context) => const PodcastDetailScreen(),
    searchAndDiscovery: (context) => const SearchAndDiscovery(),
    downloadsAndLibrary: (context) => const DownloadsAndLibrary(),
    audioPlayer: (context) => const AudioPlayerScreen(),
    profile: (context) => const ProfileScreen(),
    // TODO: Add your other routes here
  };
}
