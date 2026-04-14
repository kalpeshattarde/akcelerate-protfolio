import 'package:flutter/material.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/main_navigation/main_navigation.dart';
import '../presentation/artist_profile/artist_profile.dart';
import '../presentation/playlist_detail/playlist_detail.dart';
import '../presentation/login_screen/login_screen.dart';
import '../presentation/signup_screen/signup_screen.dart';
import '../presentation/music_player/music_player.dart';

class AppRoutes {
  static const String initial = '/';
  static const String splash = '/splash-screen';
  static const String login = '/login-screen';
  static const String signup = '/signup-screen';
  static const String mainNavigation = '/main-navigation';
  static const String homeDashboard = '/home-dashboard';
  static const String searchAndDiscovery = '/search-and-discovery';
  static const String playlistManagement = '/playlist-management';
  static const String userProfileAndSettings = '/user-profile-and-settings';
  static const String artistProfile = '/artist-profile';
  static const String playlistDetail = '/playlist-detail';
  static const String musicPlayer = '/music-player';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    splash: (context) => const SplashScreen(),
    login: (context) => const LoginScreen(),
    signup: (context) => const SignupScreen(),
    mainNavigation: (context) => const MainNavigation(initialIndex: 0),
    homeDashboard: (context) => const MainNavigation(initialIndex: 0),
    searchAndDiscovery: (context) => const MainNavigation(initialIndex: 1),
    playlistManagement: (context) => const MainNavigation(initialIndex: 2),
    userProfileAndSettings: (context) => const MainNavigation(initialIndex: 3),
    artistProfile: (context) => const ArtistProfile(),
    playlistDetail: (context) => const PlaylistDetail(),
    musicPlayer: (context) => const MusicPlayer(),
  };
}
